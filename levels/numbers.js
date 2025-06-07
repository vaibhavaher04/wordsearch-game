document.addEventListener('DOMContentLoaded', function() {
    // Game state
    const gameState = {
        grid: [],
        targetNumbers: [],
        foundNumbers: [],
        currentScore: 0,
        maxScore: 0,
        selectedCells: [],
        isSelecting: false,
        currentDirection: null,
        gameTime: 180, // 3 minutes in seconds
        timerInterval: null,
        isGameRunning: false,
        hintsShown: false,
        numberPositions: {} // Stores positions of all target numbers
    };

    // DOM elements
    const numberGrid = document.getElementById('numberGrid');
    const targetNumbersContainer = document.getElementById('targetNumbers');
    const currentScoreElement = document.getElementById('currentScore');
    const maxScoreElement = document.getElementById('maxScore');
    const newGridBtn = document.getElementById('newGridBtn');
    const mainMenuBtn = document.getElementById('mainMenuBtn');
    const messageElement = document.getElementById('message');
    const timerMinutesElement = document.getElementById('timerMinutes');
    const timerSecondsElement = document.getElementById('timerSeconds');
    const decreaseTimeBtn = document.getElementById('decreaseTime');
    const increaseTimeBtn = document.getElementById('increaseTime');
    const startTimerBtn = document.getElementById('startTimer');
    const hintBtn = document.getElementById('hintBtn');

    // Initialize the game
    initGame();

    // Event listeners
    newGridBtn.addEventListener('click', initGame);
    mainMenuBtn.addEventListener('click', () => {
        alert('Returning to main menu...');
    });
    decreaseTimeBtn.addEventListener('click', decreaseGameTime);
    increaseTimeBtn.addEventListener('click', increaseGameTime);
    startTimerBtn.addEventListener('click', startGame);
    hintBtn.addEventListener('click', toggleHints);

    // Touch/mouse event handlers
    numberGrid.addEventListener('mousedown', handleStartSelection);
    numberGrid.addEventListener('touchstart', handleStartSelection);
    numberGrid.addEventListener('mouseup', handleEndSelection);
    numberGrid.addEventListener('touchend', handleEndSelection);
    numberGrid.addEventListener('mousemove', handleCellHover);
    numberGrid.addEventListener('touchmove', handleCellHover);

    // Add click event to target numbers for individual hints
    targetNumbersContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('target-number') && !e.target.classList.contains('found')) {
            const number = e.target.textContent;
            showNumberHint(number);
        }
    });

    function initGame() {
        // Clear any existing timer
        if (gameState.timerInterval) {
            clearInterval(gameState.timerInterval);
            gameState.timerInterval = null;
        }
        
        // Reset game state
        gameState.foundNumbers = [];
        gameState.currentScore = 0;
        gameState.selectedCells = [];
        gameState.isSelecting = false;
        gameState.currentDirection = null;
        gameState.isGameRunning = false;
        gameState.hintsShown = false;
        gameState.numberPositions = {};
        
        // Generate a new grid and target numbers
        generateGrid();
        generateTargetNumbers();
        
        // Update UI
        updateScore();
        renderTargetNumbers();
        updateTimerDisplay();
        
        // Reset UI elements
        startTimerBtn.textContent = 'Start Game';
        startTimerBtn.disabled = false;
        decreaseTimeBtn.disabled = false;
        increaseTimeBtn.disabled = false;
        hintBtn.innerHTML = '<i class="fas fa-lightbulb"></i> Hint';
        numberGrid.classList.remove('game-over');
        timerMinutesElement.classList.remove('timer-warning');
        timerSecondsElement.classList.remove('timer-warning');
        
        // Enable/disable grid interaction based on game state
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.style.pointerEvents = gameState.isGameRunning ? 'auto' : 'none';
            cell.style.opacity = gameState.isGameRunning ? '1' : '0.7';
        });
        
        showMessage('Set your time and click Start Game!', 'success');
    }

    function resetGame() {
        // Clear any existing timer
        if (gameState.timerInterval) {
            clearInterval(gameState.timerInterval);
        }
        
        // Reset game state
        gameState.foundNumbers = [];
        gameState.currentScore = 0;
        gameState.selectedCells = [];
        gameState.isSelecting = false;
        gameState.currentDirection = null;
        gameState.gameTime = 180; // Reset to 3 minutes
        gameState.timerInterval = null;
        gameState.isGameRunning = false;
        gameState.hintsShown = false;
        gameState.numberPositions = {};
        
        // Reset UI
        startTimerBtn.textContent = 'Start Game';
        numberGrid.classList.remove('game-over');
        timerMinutesElement.classList.remove('timer-warning');
        timerSecondsElement.classList.remove('timer-warning');
    }

    function generateGrid() {
        // This would come from your JSON in a real app
        // For now, using a sample grid
        gameState.grid = [
            ["6", "5", "0", "6", "1", "9", "2", "1", "9", "3", "1"],
            ["8", "7", "8", "6", "4", "1", "9", "2", "4", "0", "3"],
            ["9", "7", "4", "6", "1", "3", "1", "1", "4", "0", "1"],
            ["6", "8", "3", "0", "1", "1", "2", "5", "8", "0", "4"],
            ["2", "7", "9", "3", "1", "2", "2", "2", "2", "1", "6"],
            ["3", "6", "4", "1", "9", "4", "3", "1", "9", "6", "2"],
            ["4", "0", "4", "1", "2", "9", "6", "4", "7", "5", "0"],
            ["5", "6", "6", "5", "0", "3", "0", "1", "4", "0", "2"],
            ["8", "3", "0", "6", "8", "9", "6", "1", "1", "4", "6"],
            ["8", "0", "7", "3", "1", "6", "0", "5", "6", "7", "3"],
            ["2", "5", "9", "3", "7", "0", "0", "5", "4", "3", "5"]
        ];
        
        // Render the grid
        renderGrid();
    }

    function generateTargetNumbers() {
        // This would come from your JSON in a real app
        // For now, using sample target numbers
        gameState.targetNumbers = [
            "00543", "01660", "05610", "10411", "10993", 
            "19240", "1931", "25937", "26458", "29160", 
            "29741", "30112", "36067", "41047", "44432", 
            "46878", "53620", "61766", "76506", "80731", 
            "83612", "88543", "90147", "93134", "98912"
        ];
        
        // Calculate max score (50 points per number)
        gameState.maxScore = gameState.targetNumbers.length * 50;
        maxScoreElement.textContent = gameState.maxScore;
        
        // Pre-calculate all number positions for hints
        findNumberPositions();
    }

    function findNumberPositions() {
        gameState.numberPositions = {};
        
        // Check all 8 possible directions
        const directions = [
            { dr: 0, dc: 1 },   // right
            { dr: 0, dc: -1 },  // left
            { dr: 1, dc: 0 },   // down
            { dr: -1, dc: 0 },  // up
            { dr: 1, dc: 1 },  // down-right
            { dr: 1, dc: -1 }, // down-left
            { dr: -1, dc: 1 }, // up-right
            { dr: -1, dc: -1 } // up-left
        ];
        
        gameState.targetNumbers.forEach((number, index) => {
            gameState.numberPositions[number] = [];
            const numLength = number.length;
            
            // Search through the grid
            for (let row = 0; row < gameState.grid.length; row++) {
                for (let col = 0; col < gameState.grid[0].length; col++) {
                    // Check all directions
                    for (const dir of directions) {
                        let found = true;
                        const positions = [];
                        
                        // Check each character in the number
                        for (let i = 0; i < numLength; i++) {
                            const newRow = row + dir.dr * i;
                            const newCol = col + dir.dc * i;
                            
                            // Check if within bounds
                            if (newRow < 0 || newRow >= gameState.grid.length || 
                                newCol < 0 || newCol >= gameState.grid[0].length) {
                                found = false;
                                break;
                            }
                            
                            // Check if character matches
                            if (gameState.grid[newRow][newCol] !== number[i]) {
                                found = false;
                                break;
                            }
                            
                            positions.push({ row: newRow, col: newCol });
                        }
                        
                        if (found) {
                            gameState.numberPositions[number].push({
                                direction: dir,
                                positions: positions
                            });
                        }
                    }
                }
            }
        });
    }

    function renderGrid() {
        numberGrid.innerHTML = '';
        
        gameState.grid.forEach((row, rowIndex) => {
            row.forEach((cellValue, colIndex) => {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.textContent = cellValue;
                cell.dataset.row = rowIndex;
                cell.dataset.col = colIndex;
                
                // Disable interaction if game isn't running
                if (!gameState.isGameRunning) {
                    cell.style.pointerEvents = 'none';
                    cell.style.opacity = '0.7';
                }
                
                numberGrid.appendChild(cell);
            });
        });
    }

    function renderTargetNumbers() {
        targetNumbersContainer.innerHTML = '';
        
        gameState.targetNumbers.forEach((number, index) => {
            const numberElement = document.createElement('div');
            numberElement.className = gameState.foundNumbers.includes(number) 
                ? 'target-number found' 
                : 'target-number';
            numberElement.textContent = number;
            numberElement.dataset.number = number;
            
            // Add hint class for color coding
            if (gameState.hintsShown) {
                numberElement.classList.add(`hint-${(index % 5) + 1}`);
            }
            
            targetNumbersContainer.appendChild(numberElement);
        });
    }

    function handleStartSelection(e) {
        if (!gameState.isGameRunning) return;
        e.preventDefault();
        
        const cell = getCellFromEvent(e);
        if (!cell || cell.classList.contains('found')) return;
        
        gameState.isSelecting = true;
        gameState.selectedCells = [cell];
        cell.classList.add('selected');
        gameState.currentDirection = null;
    }

    function handleEndSelection(e) {
        if (!gameState.isGameRunning || !gameState.isSelecting) return;
        e.preventDefault();
        
        gameState.isSelecting = false;
        
        // Get the selected number sequence
        const selectedNumber = gameState.selectedCells.map(cell => cell.textContent).join('');
        
        // Check if it's a target number
        if (gameState.targetNumbers.includes(selectedNumber)) {
            // Mark as found if not already found
            if (!gameState.foundNumbers.includes(selectedNumber)) {
                gameState.foundNumbers.push(selectedNumber);
                gameState.currentScore += 50;
                updateScore();
                
                // Mark cells as found
                gameState.selectedCells.forEach(cell => {
                    cell.classList.remove('selected');
                    cell.classList.add('found');
                });
                
                // Update target numbers display
                renderTargetNumbers();
                
                // Show success message
                showMessage(`Found ${selectedNumber}! +50 points`, 'success');
                
                // Check if all numbers are found
                if (gameState.foundNumbers.length === gameState.targetNumbers.length) {
                    endGame(true);
                }
            } else {
                showMessage('Already found this number!', 'success');
            }
        } else if (gameState.selectedCells.length > 1) {
            // Not a target number - deselect
            showMessage('Not a target number!', 'success');
        }
        
        // Deselect all cells
        gameState.selectedCells.forEach(cell => {
            cell.classList.remove('selected');
        });
        gameState.selectedCells = [];
    }

    function handleCellHover(e) {
        if (!gameState.isGameRunning || !gameState.isSelecting) return;
        e.preventDefault();
        
        const cell = getCellFromEvent(e);
        if (!cell || cell.classList.contains('found')) return;
        
        // If this is the first cell, we've already handled it in startSelection
        if (gameState.selectedCells.length === 1 && gameState.selectedCells[0] === cell) return;
        
        // Check if the cell is adjacent to the last selected cell
        if (gameState.selectedCells.length > 0) {
            const lastCell = gameState.selectedCells[gameState.selectedCells.length - 1];
            const lastRow = parseInt(lastCell.dataset.row);
            const lastCol = parseInt(lastCell.dataset.col);
            const currentRow = parseInt(cell.dataset.row);
            const currentCol = parseInt(cell.dataset.col);
            
            // Determine direction if not set
            if (!gameState.currentDirection) {
                const rowDiff = currentRow - lastRow;
                const colDiff = currentCol - lastCol;
                
                // Only allow straight lines (horizontal, vertical, diagonal)
                if (Math.abs(rowDiff) <= 1 && Math.abs(colDiff) <= 1 && !(rowDiff === 0 && colDiff === 0)) {
                    gameState.currentDirection = { row: rowDiff, col: colDiff };
                } else {
                    return; // Not adjacent
                }
            } else {
                // Check if continuing in the same direction
                const expectedRow = parseInt(gameState.selectedCells[gameState.selectedCells.length - 1].dataset.row) + gameState.currentDirection.row;
                const expectedCol = parseInt(gameState.selectedCells[gameState.selectedCells.length - 1].dataset.col) + gameState.currentDirection.col;
                
                if (currentRow !== expectedRow || currentCol !== expectedCol) {
                    return; // Not continuing in the same direction
                }
            }
        }
        
        // Add to selection if not already selected
        if (!gameState.selectedCells.includes(cell)) {
            cell.classList.add('selected');
            gameState.selectedCells.push(cell);
        }
    }

    function getCellFromEvent(e) {
        let clientX, clientY;
        
        if (e.type.includes('touch')) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        
        const element = document.elementFromPoint(clientX, clientY);
        return element && element.classList.contains('cell') ? element : null;
    }

    function updateScore() {
        currentScoreElement.textContent = gameState.currentScore;
    }

    function showMessage(text, type) {
        messageElement.textContent = text;
        messageElement.className = 'message ' + type;
        messageElement.classList.add('show');
        
        setTimeout(() => {
            messageElement.classList.remove('show');
        }, 2000);
    }

    function decreaseGameTime() {
        if (gameState.isGameRunning) return;
        
        gameState.gameTime = Math.max(60, gameState.gameTime - 30); // Minimum 1 minute
        updateTimerDisplay();
    }

    function increaseGameTime() {
        if (gameState.isGameRunning) return;
        
        gameState.gameTime = Math.min(600, gameState.gameTime + 30); // Maximum 10 minutes
        updateTimerDisplay();
    }

    function updateTimerDisplay() {
        const minutes = Math.floor(gameState.gameTime / 60);
        const seconds = gameState.gameTime % 60;
        
        timerMinutesElement.textContent = minutes.toString().padStart(2, '0');
        timerSecondsElement.textContent = seconds.toString().padStart(2, '0');
    }

    function startGame() {
        if (gameState.isGameRunning) return;
        
        gameState.isGameRunning = true;
        startTimerBtn.textContent = 'Game Running...';
        startTimerBtn.disabled = true;
        decreaseTimeBtn.disabled = true;
        increaseTimeBtn.disabled = true;
        
        // Enable grid interaction
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.style.pointerEvents = 'auto';
            cell.style.opacity = '1';
        });
        
        // Start timer
        gameState.timerInterval = setInterval(updateTimer, 1000);
        showMessage('Game started! Find the numbers!', 'success');
    }

    function updateTimer() {
        gameState.gameTime--;
        updateTimerDisplay();
        
        // Flash timer when under 30 seconds
        if (gameState.gameTime <= 30) {
            timerMinutesElement.classList.add('timer-warning');
            timerSecondsElement.classList.add('timer-warning');
        }
        
        // End game when time runs out
        if (gameState.gameTime <= 0) {
            endGame(false);
        }
    }

    function endGame(isWin) {
        clearInterval(gameState.timerInterval);
        gameState.isGameRunning = false;
        numberGrid.classList.add('game-over');
        
        // Disable grid interaction
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.style.pointerEvents = 'none';
        });
        
        if (isWin) {
            showMessage(`Congratulations! You found all numbers in ${formatTime(180 - gameState.gameTime)}!`, 'success');
        } else {
            const foundCount = gameState.foundNumbers.length;
            const totalCount = gameState.targetNumbers.length;
            showMessage(`Time's up! You found ${foundCount} of ${totalCount} numbers.`, 'success');
        }
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    }

    function toggleHints() {
        if (!gameState.isGameRunning) {
            showMessage('Start the game first!', 'success');
            return;
        }
        
        gameState.hintsShown = !gameState.hintsShown;
        
        // Clear all hint classes first
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            for (let i = 1; i <= 5; i++) {
                cell.classList.remove(`hint-${i}`);
            }
        });
        
        // Update target numbers display
        renderTargetNumbers();
        
        if (gameState.hintsShown) {
            // Show all hints
            showAllHints();
            hintBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Hints';
            showMessage('Hints shown! Click on numbers for specific hints.', 'success');
        } else {
            hintBtn.innerHTML = '<i class="fas fa-lightbulb"></i> Hint';
            showMessage('Hints hidden', 'success');
        }
    }

    function showAllHints() {
        gameState.targetNumbers.forEach((number, index) => {
            if (!gameState.foundNumbers.includes(number) && gameState.numberPositions[number]) {
                // Show first occurrence of each number
                const firstOccurrence = gameState.numberPositions[number][0];
                if (firstOccurrence) {
                    firstOccurrence.positions.forEach(pos => {
                        const cell = document.querySelector(`.cell[data-row="${pos.row}"][data-col="${pos.col}"]`);
                        if (cell && !cell.classList.contains('found')) {
                            cell.classList.add(`hint-${(index % 5) + 1}`);
                        }
                    });
                }
            }
        });
    }

    function showNumberHint(number) {
        if (!gameState.hintsShown) {
            showMessage('Enable hints first!', 'success');
            return;
        }
        
        if (gameState.foundNumbers.includes(number)) {
            showMessage('You already found this number!', 'success');
            return;
        }
        
        // Clear all hint classes first
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            for (let i = 1; i <= 5; i++) {
                cell.classList.remove(`hint-${i}`);
            }
        });
        
        // Find the index of the number for color coding
        const numberIndex = gameState.targetNumbers.indexOf(number);
        const hintClass = `hint-${(numberIndex % 5) + 1}`;
        
        // Highlight all occurrences of this number
        if (gameState.numberPositions[number]) {
            gameState.numberPositions[number].forEach(occurrence => {
                occurrence.positions.forEach(pos => {
                    const cell = document.querySelector(`.cell[data-row="${pos.row}"][data-col="${pos.col}"]`);
                    if (cell && !cell.classList.contains('found')) {
                        cell.classList.add(hintClass);
                    }
                });
            });
        }
        
        // Also highlight the number in the target list
        const numberElement = document.querySelector(`.target-number[data-number="${number}"]`);
        if (numberElement) {
            numberElement.classList.add(hintClass);
        }
        
        showMessage(`Showing hints for ${number}`, 'success');
    }
});