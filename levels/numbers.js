document.addEventListener("DOMContentLoaded", async () => {
  // Load puzzle data
  let puzzleData = null
  try {
    const response = await fetch("../data/fallbackPuzzles.json")
    puzzleData = await response.json()
  } catch (error) {
    console.error("Failed to load puzzle data:", error)
    // Fallback data if JSON fails to load
    puzzleData = {
      numbers: [
        {
          grid: [
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
            ["2", "5", "9", "3", "7", "0", "0", "5", "4", "3", "5"],
          ],
          words: [
            "00543",
            "01660",
            "05610",
            "10411",
            "10993",
            "19240",
            "1931",
            "25937",
            "26458",
            "29160",
            "29741",
            "30112",
            "36067",
            "41047",
            "44432",
            "46878",
            "53620",
            "61766",
            "76506",
            "80731",
            "83612",
            "88543",
            "90147",
            "93134",
            "98912",
          ],
        },
        {
          grid: [
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
            ["9", "8", "7", "6", "5", "4", "3", "2", "1", "0"],
            ["2", "4", "6", "8", "0", "1", "3", "5", "7", "9"],
            ["9", "7", "5", "3", "1", "0", "8", "6", "4", "2"],
            ["1", "3", "5", "7", "9", "2", "4", "6", "8", "0"],
            ["0", "8", "6", "4", "2", "9", "7", "5", "3", "1"],
            ["5", "0", "5", "0", "5", "0", "5", "0", "5", "0"],
            ["1", "1", "2", "3", "5", "8", "1", "3", "2", "1"],
            ["9", "9", "8", "7", "6", "5", "4", "3", "2", "1"],
            ["1", "0", "0", "1", "1", "0", "1", "0", "0", "1"],
          ],
          words: ["123456", "987654", "246810", "135790", "505050", "112358", "998765", "100110"],
        },
        {
          grid: [
            ["3", "1", "4", "1", "5", "9", "2", "6", "5", "3"],
            ["5", "8", "9", "7", "9", "3", "2", "3", "8", "4"],
            ["6", "2", "6", "4", "3", "3", "8", "3", "2", "7"],
            ["9", "5", "0", "2", "8", "8", "4", "1", "9", "7"],
            ["1", "6", "9", "3", "9", "9", "3", "7", "5", "1"],
            ["0", "5", "8", "2", "1", "9", "7", "4", "4", "5"],
            ["9", "0", "2", "8", "8", "4", "1", "9", "7", "1"],
            ["6", "3", "2", "7", "9", "5", "0", "2", "8", "8"],
            ["4", "1", "9", "7", "1", "6", "9", "3", "9", "9"],
            ["3", "2", "3", "8", "4", "6", "2", "6", "4", "3"],
          ],
          words: ["314159", "589793", "238462", "643383", "279502", "884197", "169399", "375105"],
        },
      ],
    }
  }

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
    originalGameTime: 180,
    timerInterval: null,
    isGameRunning: false,
    hintsShown: false,
    numberPositions: {},
    colorIndex: 1,
    activeSelections: {},
    currentDifficulty: "numbers",
    currentPuzzleIndex: 0,
  }

  // DOM elements
  const numberGrid = document.getElementById("numberGrid")
  const targetNumbersContainer = document.getElementById("targetNumbers")
  const currentScoreElement = document.getElementById("currentScore")
  const maxScoreElement = document.getElementById("maxScore")
  const newGridBtn = document.getElementById("newGridBtn")
  const mainMenuBtn = document.getElementById("mainMenuBtn")
  const messageElement = document.getElementById("message")
  const timerMinutesElement = document.getElementById("timerMinutes")
  const timerSecondsElement = document.getElementById("timerSeconds")
  const decreaseTimeBtn = document.getElementById("decreaseTime")
  const increaseTimeBtn = document.getElementById("increaseTime")
  const startStopBtn = document.getElementById("startStopBtn")
  const hintBtn = document.getElementById("hintBtn")
  const difficultySelect = document.getElementById("difficultySelect")
  const gameOverOverlay = document.getElementById("gameOverOverlay")
  const extendTimeBtn = document.getElementById("extendTimeBtn")
  const acceptFateBtn = document.getElementById("acceptFateBtn")
  const foundCountElement = document.getElementById("foundCount")
  const totalCountElement = document.getElementById("totalCount")

  // Initialize the game
  initGame()

  // Event listeners
  newGridBtn.addEventListener("click", switchToNextGrid)
  mainMenuBtn.addEventListener("click", () => {
    window.location.href = "../index.html"
  })
  decreaseTimeBtn.addEventListener("click", decreaseGameTime)
  increaseTimeBtn.addEventListener("click", increaseGameTime)
  startStopBtn.addEventListener("click", toggleGame)
  hintBtn.addEventListener("click", toggleHints)
  difficultySelect.addEventListener("change", changeDifficulty)
  extendTimeBtn.addEventListener("click", extendTime)
  acceptFateBtn.addEventListener("click", acceptFate)

  // Touch/mouse event handlers
  numberGrid.addEventListener("mousedown", handleStartSelection)
  numberGrid.addEventListener("touchstart", handleStartSelection, { passive: false })
  numberGrid.addEventListener("mouseup", handleEndSelection)
  numberGrid.addEventListener("touchend", handleEndSelection)
  numberGrid.addEventListener("mousemove", handleCellHover)
  numberGrid.addEventListener("touchmove", handleCellHover, { passive: false })

  // Add click event to target numbers for individual hints
  targetNumbersContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("target-number") && !e.target.classList.contains("found")) {
      const number = e.target.textContent
      showNumberHint(number)
    }
  })

  function initGame() {
    // Clear any existing timer
    if (gameState.timerInterval) {
      clearInterval(gameState.timerInterval)
      gameState.timerInterval = null
    }

    // Reset game state
    gameState.foundNumbers = []
    gameState.currentScore = 0
    gameState.selectedCells = []
    gameState.isSelecting = false
    gameState.currentDirection = null
    gameState.isGameRunning = false
    gameState.hintsShown = false
    gameState.numberPositions = {}
    gameState.activeSelections = {}
    gameState.colorIndex = 1

    // Generate a new grid and target numbers
    generateGrid()
    generateTargetNumbers()

    // Update UI
    updateScore()
    renderTargetNumbers()
    updateTimerDisplay()

    // Reset UI elements
    updateStartStopButton()
    decreaseTimeBtn.disabled = false
    increaseTimeBtn.disabled = false
    hintBtn.innerHTML = '<i class="fas fa-lightbulb"></i> Hint'
    numberGrid.classList.remove("game-over")
    timerMinutesElement.classList.remove("timer-warning")
    timerSecondsElement.classList.remove("timer-warning")
    gameOverOverlay.classList.remove("show")

    // Enable/disable grid interaction based on game state
    updateGridInteraction()

    showMessage("Set your time and click Start Game!", "success")
  }

  function changeDifficulty() {
    const selectedDifficulty = difficultySelect.value

    // Redirect to appropriate HTML file based on difficulty
    switch (selectedDifficulty) {
      case "easy":
        window.location.href = "easy.html"
        break
      case "medium":
        window.location.href = "medium.html"
        break
      case "hard":
        window.location.href = "hard.html"
        break
      case "expert":
        window.location.href = "expert.html"
        break
      case "numbers":
      default:
        // Stay on current page for numbers
        gameState.currentDifficulty = "numbers"
        gameState.currentPuzzleIndex = 0

        // Stop game if running
        if (gameState.isGameRunning) {
          stopGame()
        }

        initGame()
        showMessage("Switched to Numbers difficulty!", "success")
        break
    }
  }

  function switchToNextGrid() {
    // Show loading animation
    numberGrid.classList.add("loading")

    // Disable the button temporarily
    newGridBtn.disabled = true
    newGridBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...'

    // Stop game if running but don't clear timer interval yet
    const wasRunning = gameState.isGameRunning
    if (gameState.isGameRunning) {
      gameState.isGameRunning = false
      updateStartStopButton()
      updateGridInteraction()
      clearAllSelections()
      gameState.isSelecting = false
    }

    // Clear timer interval
    if (gameState.timerInterval) {
      clearInterval(gameState.timerInterval)
      gameState.timerInterval = null
    }

    setTimeout(() => {
      // Get current puzzles for the difficulty
      const currentPuzzles = puzzleData[gameState.currentDifficulty]
      if (currentPuzzles && currentPuzzles.length > 1) {
        gameState.currentPuzzleIndex = (gameState.currentPuzzleIndex + 1) % currentPuzzles.length
      }

      // Reset game state for new grid
      gameState.foundNumbers = []
      gameState.currentScore = 0
      gameState.selectedCells = []
      gameState.isSelecting = false
      gameState.currentDirection = null
      gameState.hintsShown = false
      gameState.numberPositions = {}
      gameState.activeSelections = {}
      gameState.colorIndex = 1

      // Reset timer to original time
      gameState.gameTime = gameState.originalGameTime

      // Generate new grid and targets
      generateGrid()
      generateTargetNumbers()

      // Update UI
      updateScore()
      renderTargetNumbers()
      updateTimerDisplay()

      // Reset UI elements
      hintBtn.innerHTML = '<i class="fas fa-lightbulb"></i> Hint'
      numberGrid.classList.remove("game-over", "loading")
      timerMinutesElement.classList.remove("timer-warning")
      timerSecondsElement.classList.remove("timer-warning")
      gameOverOverlay.classList.remove("show")

      // Re-enable controls
      decreaseTimeBtn.disabled = false
      increaseTimeBtn.disabled = false
      newGridBtn.disabled = false
      newGridBtn.innerHTML = "New Grid"

      // Update grid interaction
      updateGridInteraction()

      showMessage("New grid generated!", "success")
    }, 500) // Small delay for loading animation
  }

  function generateGrid() {
    const currentPuzzles = puzzleData[gameState.currentDifficulty]
    if (currentPuzzles && currentPuzzles[gameState.currentPuzzleIndex]) {
      gameState.grid = currentPuzzles[gameState.currentPuzzleIndex].grid
    } else {
      // Fallback to first numbers puzzle
      gameState.grid = puzzleData.numbers[0].grid
    }

    renderGrid()
  }

  function generateTargetNumbers() {
    const currentPuzzles = puzzleData[gameState.currentDifficulty]
    if (currentPuzzles && currentPuzzles[gameState.currentPuzzleIndex]) {
      gameState.targetNumbers = currentPuzzles[gameState.currentPuzzleIndex].words
    } else {
      // Fallback to first numbers puzzle
      gameState.targetNumbers = puzzleData.numbers[0].words
    }

    // Calculate max score (50 points per number)
    gameState.maxScore = gameState.targetNumbers.length * 50
    maxScoreElement.textContent = gameState.maxScore

    // Pre-calculate all number positions for hints
    findNumberPositions()
  }

  function findNumberPositions() {
    gameState.numberPositions = {}

    // Check all 8 possible directions
    const directions = [
      { dr: 0, dc: 1, type: "horizontal" }, // right
      { dr: 0, dc: -1, type: "horizontal" }, // left
      { dr: 1, dc: 0, type: "vertical" }, // down
      { dr: -1, dc: 0, type: "vertical" }, // up
      { dr: 1, dc: 1, type: "diagonal" }, // down-right
      { dr: 1, dc: -1, type: "diagonal" }, // down-left
      { dr: -1, dc: 1, type: "diagonal" }, // up-right
      { dr: -1, dc: -1, type: "diagonal" }, // up-left
    ]

    gameState.targetNumbers.forEach((number, index) => {
      gameState.numberPositions[number] = []
      const numLength = number.length

      // Search through the grid
      for (let row = 0; row < gameState.grid.length; row++) {
        for (let col = 0; col < gameState.grid[0].length; col++) {
          // Check all directions
          for (const dir of directions) {
            let found = true
            const positions = []

            // Check each character in the number
            for (let i = 0; i < numLength; i++) {
              const newRow = row + dir.dr * i
              const newCol = col + dir.dc * i

              // Check if within bounds
              if (newRow < 0 || newRow >= gameState.grid.length || newCol < 0 || newCol >= gameState.grid[0].length) {
                found = false
                break
              }

              // Check if character matches (case insensitive for letters)
              const gridChar = gameState.grid[newRow][newCol].toString().toLowerCase()
              const targetChar = number[i].toString().toLowerCase()

              if (gridChar !== targetChar) {
                found = false
                break
              }

              positions.push({ row: newRow, col: newCol })
            }

            if (found) {
              gameState.numberPositions[number].push({
                direction: dir,
                positions: positions,
                directionType: dir.type,
              })
            }
          }
        }
      }
    })
  }

  function renderGrid() {
    numberGrid.innerHTML = ""

    // Set grid columns based on grid width
    const gridWidth = gameState.grid[0] ? gameState.grid[0].length : 10
    numberGrid.style.gridTemplateColumns = `repeat(${gridWidth}, 1fr)`

    gameState.grid.forEach((row, rowIndex) => {
      row.forEach((cellValue, colIndex) => {
        const cell = document.createElement("div")
        cell.className = "cell"
        cell.textContent = cellValue
        cell.dataset.row = rowIndex
        cell.dataset.col = colIndex

        numberGrid.appendChild(cell)
      })
    })

    updateGridInteraction()
  }

  function updateGridInteraction() {
    const cells = document.querySelectorAll(".cell")
    cells.forEach((cell) => {
      cell.style.pointerEvents = gameState.isGameRunning ? "auto" : "none"
      cell.style.opacity = gameState.isGameRunning ? "1" : "0.7"
    })
  }

  function renderTargetNumbers() {
    targetNumbersContainer.innerHTML = ""

    gameState.targetNumbers.forEach((number, index) => {
      const numberElement = document.createElement("div")
      const colorClass = gameState.foundNumbers.includes(number) ? `found found-${(index % 5) + 1}` : ""

      numberElement.className = `target-number ${colorClass}`
      numberElement.textContent = number
      numberElement.dataset.number = number
      numberElement.dataset.colorIndex = (index % 5) + 1

      // Add hint class for color coding
      if (gameState.hintsShown) {
        numberElement.classList.add(`hint-${(index % 5) + 1}`)
      }

      targetNumbersContainer.appendChild(numberElement)
    })
  }

  function handleStartSelection(e) {
    if (!gameState.isGameRunning) return
    e.preventDefault()

    const cell = getCellFromEvent(e)
    if (!cell) return

    // Clear any existing selection
    clearAllSelections()

    gameState.isSelecting = true
    gameState.selectedCells = [cell]
    gameState.currentDirection = null

    // Assign a color index for this selection
    gameState.colorIndex = (gameState.colorIndex % 5) + 1

    // Add selection class
    cell.classList.add(`selected-${gameState.colorIndex}`)
  }

  function handleEndSelection(e) {
    if (!gameState.isGameRunning || !gameState.isSelecting) return
    e.preventDefault()

    gameState.isSelecting = false

    // Get the selected number sequence
    const selectedNumber = gameState.selectedCells.map((cell) => cell.textContent).join("")

    // Check if it's a target number (case insensitive)
    const targetNumber = gameState.targetNumbers.find((num) => num.toLowerCase() === selectedNumber.toLowerCase())

    if (targetNumber) {
      // Mark as found if not already found
      if (!gameState.foundNumbers.includes(targetNumber)) {
        const numberIndex = gameState.targetNumbers.indexOf(targetNumber)
        const colorIndex = (numberIndex % 5) + 1

        gameState.foundNumbers.push(targetNumber)
        gameState.currentScore += 50
        updateScore()

        // Mark cells as found with the correct color
        gameState.selectedCells.forEach((cell) => {
          // Remove selection classes
          removeSelectionClasses(cell)

          // Add found class with color
          cell.classList.add("found", `found-${colorIndex}`)
        })

        // Store this selection
        gameState.activeSelections[targetNumber] = {
          cells: [...gameState.selectedCells],
          colorIndex: colorIndex,
        }

        // Update target numbers display
        renderTargetNumbers()

        // Show success message
        showMessage(`Found ${targetNumber}! +50 points`, "success")

        // Check if all numbers are found
        if (gameState.foundNumbers.length === gameState.targetNumbers.length) {
          endGame(true)
        }
      } else {
        showMessage("Already found this number!", "success")
        clearCurrentSelection()
      }
    } else if (gameState.selectedCells.length > 1) {
      // Not a target number - deselect
      showMessage("Not a target number!", "success")
      clearCurrentSelection()
    } else {
      clearCurrentSelection()
    }
  }

  function handleCellHover(e) {
    if (!gameState.isGameRunning || !gameState.isSelecting) return
    e.preventDefault()

    const cell = getCellFromEvent(e)
    if (!cell) return

    // Skip if cell is already part of a found number
    if (cell.classList.contains("found")) return

    // If this is the first cell, we've already handled it in startSelection
    if (gameState.selectedCells.length === 1 && gameState.selectedCells[0] === cell) return

    // Check if the cell is adjacent to the last selected cell
    if (gameState.selectedCells.length > 0) {
      const lastCell = gameState.selectedCells[gameState.selectedCells.length - 1]
      const lastRow = Number.parseInt(lastCell.dataset.row)
      const lastCol = Number.parseInt(lastCell.dataset.col)
      const currentRow = Number.parseInt(cell.dataset.row)
      const currentCol = Number.parseInt(cell.dataset.col)

      // Determine direction if not set
      if (!gameState.currentDirection) {
        const rowDiff = currentRow - lastRow
        const colDiff = currentCol - lastCol

        // Only allow straight lines (horizontal, vertical, diagonal)
        if (Math.abs(rowDiff) <= 1 && Math.abs(colDiff) <= 1 && !(rowDiff === 0 && colDiff === 0)) {
          gameState.currentDirection = {
            row: rowDiff,
            col: colDiff,
            type: getDirectionType(rowDiff, colDiff),
          }

          // Add direction class to first cell
          addDirectionClass(gameState.selectedCells[0], gameState.currentDirection.type)
        } else {
          return // Not adjacent
        }
      } else {
        // Check if continuing in the same direction
        const expectedRow =
          Number.parseInt(gameState.selectedCells[gameState.selectedCells.length - 1].dataset.row) +
          gameState.currentDirection.row
        const expectedCol =
          Number.parseInt(gameState.selectedCells[gameState.selectedCells.length - 1].dataset.col) +
          gameState.currentDirection.col

        if (currentRow !== expectedRow || currentCol !== expectedCol) {
          return // Not continuing in the same direction
        }
      }
    }

    // Add to selection if not already selected
    if (!gameState.selectedCells.includes(cell)) {
      // Add selection class with current color
      cell.classList.add(`selected-${gameState.colorIndex}`)

      // Add direction class if we know the direction
      if (gameState.currentDirection) {
        addDirectionClass(cell, gameState.currentDirection.type)
      }

      gameState.selectedCells.push(cell)
    }
  }

  function getDirectionType(rowDiff, colDiff) {
    if (rowDiff === 0) return "horizontal"
    if (colDiff === 0) return "vertical"
    return "diagonal"
  }

  function addDirectionClass(cell, directionType) {
    cell.classList.add(`selected-${directionType}`)
  }

  function removeSelectionClasses(cell) {
    // Remove all selection classes
    for (let i = 1; i <= 5; i++) {
      cell.classList.remove(`selected-${i}`)
    }
    cell.classList.remove("selected-horizontal", "selected-vertical", "selected-diagonal")
  }

  function clearCurrentSelection() {
    // Clear current selection
    gameState.selectedCells.forEach((cell) => {
      removeSelectionClasses(cell)
    })
    gameState.selectedCells = []
  }

  function clearAllSelections() {
    // Clear all temporary selections
    document.querySelectorAll(".cell").forEach((cell) => {
      if (!cell.classList.contains("found")) {
        removeSelectionClasses(cell)
      }
    })
    gameState.selectedCells = []
  }

  function getCellFromEvent(e) {
    let clientX, clientY

    if (e.type.includes("touch")) {
      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
      } else if (e.changedTouches && e.changedTouches.length > 0) {
        clientX = e.changedTouches[0].clientX
        clientY = e.changedTouches[0].clientY
      } else {
        return null
      }
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    const element = document.elementFromPoint(clientX, clientY)
    return element && element.classList.contains("cell") ? element : null
  }

  function updateScore() {
    currentScoreElement.textContent = gameState.currentScore
  }

  function showMessage(text, type) {
    messageElement.textContent = text
    messageElement.className = "message " + type
    messageElement.classList.add("show")

    setTimeout(() => {
      messageElement.classList.remove("show")
    }, 2000)
  }

  function decreaseGameTime() {
    if (gameState.isGameRunning) return

    gameState.gameTime = Math.max(60, gameState.gameTime - 30) // Minimum 1 minute
    gameState.originalGameTime = gameState.gameTime
    updateTimerDisplay()
  }

  function increaseGameTime() {
    if (gameState.isGameRunning) return

    gameState.gameTime = Math.min(600, gameState.gameTime + 30) // Maximum 10 minutes
    gameState.originalGameTime = gameState.gameTime
    updateTimerDisplay()
  }

  function updateTimerDisplay() {
    const minutes = Math.floor(gameState.gameTime / 60)
    const seconds = gameState.gameTime % 60

    timerMinutesElement.textContent = minutes.toString().padStart(2, "0")
    timerSecondsElement.textContent = seconds.toString().padStart(2, "0")
  }

  function toggleGame() {
    if (gameState.isGameRunning) {
      stopGame()
    } else {
      startGame()
    }
  }

  function startGame() {
    if (gameState.isGameRunning) return

    gameState.isGameRunning = true
    updateStartStopButton()
    decreaseTimeBtn.disabled = true
    increaseTimeBtn.disabled = true

    // Enable grid interaction
    updateGridInteraction()

    // Start timer
    gameState.timerInterval = setInterval(updateTimer, 1000)
    showMessage("Game started! Find the numbers!", "success")
  }

  function stopGame() {
    if (!gameState.isGameRunning) return

    gameState.isGameRunning = false
    clearInterval(gameState.timerInterval)
    gameState.timerInterval = null

    updateStartStopButton()
    decreaseTimeBtn.disabled = false
    increaseTimeBtn.disabled = false

    // Disable grid interaction
    updateGridInteraction()

    // Clear any active selections
    clearAllSelections()
    gameState.isSelecting = false

    showMessage("Game stopped!", "success")
  }

  function updateStartStopButton() {
    if (gameState.isGameRunning) {
      startStopBtn.innerHTML = '<i class="fas fa-stop"></i> Stop Game'
      startStopBtn.className = "game-btn stop-btn"
    } else {
      startStopBtn.innerHTML = '<i class="fas fa-play"></i> Start Game'
      startStopBtn.className = "game-btn start-btn"
    }
  }

  function updateTimer() {
    gameState.gameTime--
    updateTimerDisplay()

    // Flash timer when under 30 seconds
    if (gameState.gameTime <= 30) {
      timerMinutesElement.classList.add("timer-warning")
      timerSecondsElement.classList.add("timer-warning")
    }

    // End game when time runs out
    if (gameState.gameTime <= 0) {
      endGame(false)
    }
  }

  function endGame(isWin) {
    clearInterval(gameState.timerInterval)
    gameState.isGameRunning = false
    numberGrid.classList.add("game-over")

    // Update button state
    updateStartStopButton()
    decreaseTimeBtn.disabled = false
    increaseTimeBtn.disabled = false

    // Disable grid interaction
    updateGridInteraction()

    if (isWin) {
      showMessage(
        `Congratulations! You found all numbers in ${formatTime(gameState.originalGameTime - gameState.gameTime)}!`,
        "success",
      )
    } else {
      // Show game over overlay
      showGameOverOverlay()
    }
  }

  function showGameOverOverlay() {
    const foundCount = gameState.foundNumbers.length
    const totalCount = gameState.targetNumbers.length

    foundCountElement.textContent = foundCount
    totalCountElement.textContent = totalCount

    gameOverOverlay.classList.add("show")
  }

  function extendTime() {
    gameState.gameTime += 60 // Add 1 minute
    gameState.originalGameTime += 60
    gameOverOverlay.classList.remove("show")

    // Restart the game
    gameState.isGameRunning = true
    updateStartStopButton()
    updateGridInteraction()
    numberGrid.classList.remove("game-over")
    timerMinutesElement.classList.remove("timer-warning")
    timerSecondsElement.classList.remove("timer-warning")

    // Start timer again
    gameState.timerInterval = setInterval(updateTimer, 1000)
    showMessage("Time extended! Keep searching!", "success")
  }

  function acceptFate() {
    gameOverOverlay.classList.remove("show")
    const foundCount = gameState.foundNumbers.length
    const totalCount = gameState.targetNumbers.length
    showMessage(`Game over! You found ${foundCount} of ${totalCount} numbers.`, "success")
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  function toggleHints() {
    if (!gameState.isGameRunning) {
      showMessage("Start the game first!", "success")
      return
    }

    gameState.hintsShown = !gameState.hintsShown

    // Clear all hint classes first
    const cells = document.querySelectorAll(".cell")
    cells.forEach((cell) => {
      if (!cell.classList.contains("found")) {
        for (let i = 1; i <= 5; i++) {
          cell.classList.remove(`hint-${i}`)
        }
      }
    })

    // Update target numbers display
    renderTargetNumbers()

    if (gameState.hintsShown) {
      // Show all hints
      showAllHints()
      hintBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Hints'
      showMessage("Hints shown! Click on numbers for specific hints.", "success")
    } else {
      hintBtn.innerHTML = '<i class="fas fa-lightbulb"></i> Hint'
      showMessage("Hints hidden", "success")
    }
  }

  function showAllHints() {
    gameState.targetNumbers.forEach((number, index) => {
      if (!gameState.foundNumbers.includes(number) && gameState.numberPositions[number]) {
        // Show first occurrence of each number
        const firstOccurrence = gameState.numberPositions[number][0]
        if (firstOccurrence) {
          const colorIndex = (index % 5) + 1
          firstOccurrence.positions.forEach((pos) => {
            const cell = document.querySelector(`.cell[data-row="${pos.row}"][data-col="${pos.col}"]`)
            if (cell && !cell.classList.contains("found")) {
              cell.classList.add(`hint-${colorIndex}`)
            }
          })
        }
      }
    })
  }

  function showNumberHint(number) {
    if (!gameState.hintsShown) {
      showMessage("Enable hints first!", "success")
      return
    }

    if (gameState.foundNumbers.includes(number)) {
      showMessage("You already found this number!", "success")
      return
    }

    // Clear all hint classes first
    const cells = document.querySelectorAll(".cell")
    cells.forEach((cell) => {
      if (!cell.classList.contains("found")) {
        for (let i = 1; i <= 5; i++) {
          cell.classList.remove(`hint-${i}`)
        }
      }
    })

    // Find the index of the number for color coding
    const numberIndex = gameState.targetNumbers.indexOf(number)
    const colorIndex = (numberIndex % 5) + 1

    // Highlight all occurrences of this number
    if (gameState.numberPositions[number]) {
      gameState.numberPositions[number].forEach((occurrence) => {
        occurrence.positions.forEach((pos) => {
          const cell = document.querySelector(`.cell[data-row="${pos.row}"][data-col="${pos.col}"]`)
          if (cell && !cell.classList.contains("found")) {
            cell.classList.add(`hint-${colorIndex}`)
          }
        })
      })
    }

    // Also highlight the number in the target list
    const numberElement = document.querySelector(`.target-number[data-number="${number}"]`)
    if (numberElement) {
      numberElement.classList.add(`hint-${colorIndex}`)
    }

    showMessage(`Showing hints for ${number}`, "success")
  }
})
