document.addEventListener("DOMContentLoaded", async () => {
  // Load puzzle data
  const puzzleData = {
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
          "619", // horizontal: row 0, cols 2-4 (0,6,1)
          "240", // horizontal: row 1, cols 3-5 (6,4,1)
          "807", // horizontal: row 2, cols 1-3 (7,4,6)
          "394", // vertical: col 0, rows 2-4 (9,6,2)
          "297", // vertical: col 1, rows 3-5 (8,7,6)
          "314", // vertical: col 2, rows 4-6 (9,4,4)
          "6740", // diagonal: (0,4)→(1,5)→(2,6) (1,1,1)
          "0146", // diagonal: (3,1)→(4,2)→(5,3) (8,9,1)
          "6383", // diagonal: (2,0)→(3,1)→(4,2) (9,8,9)
          "0452", // diagonal: (2,1)→(3,2)→(4,3) (7,3,1)
          "1175", // diagonal: (1,1)→(2,2)→(3,3) (7,4,0)
          "5373", // diagonal: (0,8)→(1,9)→(2,10) (9,0,1)
        ],
      },
      {
        grid: [
          ["1", "2", "3", "4", "5", "4", "7", "4", "9", "0", "1"],
          ["2", "3", "4", "9", "6", "7", "8", "5", "0", "1", "2"],
          ["3", "4", "0", "6", "7", "8", "4", "0", "1", "9", "0"],
          ["4", "8", "6", "7", "8", "1", "0", "1", "5", "0", "4"],
          ["5", "6", "7", "8", "5", "0", "1", "0", "1", "4", "5"],
          ["6", "7", "8", "2", "0", "1", "8", "4", "4", "5", "6"],
          ["7", "8", "3", "0", "1", "1", "5", "4", "5", "6", "7"],
          ["8", "0", "0", "1", "7", "9", "4", "5", "6", "7", "8"],
          ["9", "0", "1", "3", "1", "4", "5", "6", "7", "8", "9"],
          ["0", "1", "5", "6", "4", "5", "6", "7", "8", "6", "0"],
          ["1", "2", "8", "4", "5", "6", "7", "8", "4", "0", "1"],
        ],
        words: [
          "8456", // horizontal: row 0, cols 0-2
          "9456", // horizontal: row 0, cols 3-5
          "6782", // horizontal: row 0, cols 6-8
          "5010", // horizontal: row 1, cols 0-2
          "3406", // horizontal: row 1, cols 3-5
          "8401", // horizontal: row 1, cols 6-8
          "1456", // vertical: col 0, rows 0-2
          "1710", // vertical: col 1, rows 0-2
          "8769", // vertical: col 2, rows 0-2
          "3971", // diagonal: (0,0)→(1,1)→(2,2)
          "7016", // diagonal: (0,1)→(1,2)→(2,3)
          "5741", // diagonal: (0,2)→(1,3)→(2,4)
        ],
      },
      {
        grid: [
          ["9", "8", "7", "4", "1", "4", "3", "2", "1", "8", "1"],
          ["8", "7", "9", "2", "7", "3", "2", "1", "0", "9", "8"],
          ["7", "5", "3", "8", "3", "2", "1", "9", "8", "2", "6"],
          ["6", "4", "7", "3", "2", "1", "3", "6", "9", "5", "2"],
          ["5", "5", "5", "2", "1", "1", "4", "1", "4", "3", "5"],
          ["4", "3", "2", "1", "8", "2", "6", "3", "6", "0", "7"],
          ["3", "2", "1", "6", "9", "1", "2", "9", "5", "8", "3"],
          ["2", "1", "4", "6", "4", "1", "6", "3", "9", "3", "6"],
          ["1", "0", "3", "1", "0", "3", "9", "6", "3", "5", "1"],
          ["3", "1", "6", "9", "4", "8", "5", "3", "4", "1", "0"],
          ["0", "8", "1", "6", "0", "4", "3", "3", "1", "0", "9"],
        ],
        words: [
          "91295", // horizontal: row 0, cols 0-2
          "19826", // horizontal: row 0, cols 3-5
          "55521", // horizontal: row 0, cols 6-8
          "01369", // horizontal: row 1, cols 0-2
          "08935", // horizontal: row 1, cols 3-5
          "47231", // horizontal: row 1, cols 6-8
          "98765", // vertical: col 0, rows 0-2
          "73610", // vertical: col 1, rows 0-2
          "33109", // vertical: col 2, rows 0-2
          "89253", // diagonal: (0,0)→(1,1)→(2,2)
          "57397", // diagonal: (0,1)→(1,2)→(2,3)
          "03123", // diagonal: (0,2)→(1,3)→(2,4)
        ],
      },
    ],
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

  // Add keyboard navigation for accessibility
  document.addEventListener("keydown", handleKeyboardNavigation)

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

    // Add entrance animations
    addEntranceAnimations()

    showMessage("Set your time and click Start Game!", "success")
  }

  function addEntranceAnimations() {
    // Animate grid cells
    const cells = document.querySelectorAll(".cell")
    cells.forEach((cell, index) => {
      cell.style.opacity = "0"
      cell.style.transform = "scale(0.5)"

      setTimeout(() => {
        cell.style.transition = "opacity 0.3s ease, transform 0.3s ease"
        cell.style.opacity = "1"
        cell.style.transform = "scale(1)"
      }, index * 5) // Staggered animation
    })

    // Animate target numbers
    const targetNumbers = document.querySelectorAll(".target-number")
    targetNumbers.forEach((number, index) => {
      number.style.opacity = "0"
      number.style.transform = "translateY(20px)"

      setTimeout(
        () => {
          number.style.transition = "opacity 0.3s ease, transform 0.3s ease"
          number.style.opacity = "1"
          number.style.transform = "translateY(0)"
        },
        300 + index * 50,
      ) // Staggered animation after grid
    })
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
      newGridBtn.innerHTML = '<i class="fas fa-sync-alt"></i> New Grid'

      // Update grid interaction
      updateGridInteraction()

      // Add entrance animations
      addEntranceAnimations()

      showMessage("New grid generated!", "success")
    }, 800) // Small delay for loading animation
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
    console.log("Finding number positions for grid:", gameState.currentPuzzleIndex)
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

      console.log(`Searching for number: ${number}`)

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

              // Check if character matches
              const gridChar = gameState.grid[newRow][newCol].toString()
              const targetChar = number[i].toString()

              if (gridChar !== targetChar) {
                found = false
                break
              }

              positions.push({ row: newRow, col: newCol })
            }

            if (found) {
              console.log(`Found ${number} at position (${row},${col}) in direction ${dir.type}`)
              gameState.numberPositions[number].push({
                direction: dir,
                positions: positions,
                directionType: dir.type,
              })
            }
          }
        }
      }

      console.log(`Total occurrences found for ${number}:`, gameState.numberPositions[number].length)
    })

    console.log("All number positions:", gameState.numberPositions)
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
        cell.tabIndex = 0 // Make cells focusable for keyboard navigation
        cell.setAttribute("role", "button")
        cell.setAttribute("aria-label", `Cell at row ${rowIndex + 1}, column ${colIndex + 1}, value ${cellValue}`)

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

      if (!gameState.isGameRunning) {
        cell.setAttribute("aria-disabled", "true")
      } else {
        cell.removeAttribute("aria-disabled")
      }
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
      numberElement.tabIndex = 0 // Make focusable
      numberElement.setAttribute("role", "button")

      if (gameState.foundNumbers.includes(number)) {
        numberElement.setAttribute("aria-label", `Number ${number} found`)
      } else {
        numberElement.setAttribute("aria-label", `Find number ${number}`)
      }

      // Add hint class for color coding if hints are shown
      if (gameState.hintsShown && !gameState.foundNumbers.includes(number)) {
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

    // Add sound effect (if enabled)
    playSound("select")
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

        // Play success sound
        playSound("success")

        // Show success message
        showMessage(`Found ${targetNumber}! +50 points`, "success")

        // Check if all numbers are found
        if (gameState.foundNumbers.length === gameState.targetNumbers.length) {
          endGame(true)
        }
      } else {
        playSound("error")
        showMessage("Already found this number!", "success")
        clearCurrentSelection()
      }
    } else if (gameState.selectedCells.length > 1) {
      // Not a target number - deselect
      playSound("error")
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

      // Play soft sound for selection continuation
      playSound("hover")
    }
  }

  function handleKeyboardNavigation(e) {
    if (!gameState.isGameRunning) return

    const focusedElement = document.activeElement

    // Handle keyboard selection for grid cells
    if (focusedElement && focusedElement.classList.contains("cell")) {
      const row = Number.parseInt(focusedElement.dataset.row)
      const col = Number.parseInt(focusedElement.dataset.col)

      switch (e.key) {
        case "Enter":
        case " ":
          // Toggle selection on Enter or Space
          e.preventDefault()
          if (!gameState.selectedCells.includes(focusedElement)) {
            handleStartSelection({
              preventDefault: () => { },
              type: "keyboard",
              target: focusedElement,
            })
          } else {
            handleEndSelection({
              preventDefault: () => { },
              type: "keyboard",
            })
          }
          break

        case "ArrowUp":
          e.preventDefault()
          navigateGrid(row - 1, col)
          break

        case "ArrowDown":
          e.preventDefault()
          navigateGrid(row + 1, col)
          break

        case "ArrowLeft":
          e.preventDefault()
          navigateGrid(row, col - 1)
          break

        case "ArrowRight":
          e.preventDefault()
          navigateGrid(row, col + 1)
          break
      }
    }
  }

  function navigateGrid(row, col) {
    const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`)
    if (cell) {
      cell.focus()
    }
  }

  function playSound(type) {
    // Placeholder for sound effects
    // You can implement actual sound effects here
    console.log(`Playing ${type} sound`)
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

    if (e.type === "keyboard") {
      return e.target
    }

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

    // Add animation to score update
    currentScoreElement.style.transform = "scale(1.2)"
    setTimeout(() => {
      currentScoreElement.style.transform = "scale(1)"
    }, 200)
  }

  function showMessage(text, type) {
    messageElement.textContent = text
    messageElement.className = "message " + type
    messageElement.classList.add("show")

    setTimeout(() => {
      messageElement.classList.remove("show")
    }, 3000)
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

    // Play start sound
    playSound("start")
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
      playSound("win")
      showMessage(
        `Congratulations! You found all numbers in ${formatTime(gameState.originalGameTime - gameState.gameTime)}!`,
        "success",
      )
    } else {
      playSound("lose")
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

    playSound("extend")
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
    clearAllHints()

    if (gameState.hintsShown) {
      // Show all hints
      showAllHints()
      hintBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Hints'
      showMessage("Hints shown! Click on numbers for specific hints.", "success")
    } else {
      hintBtn.innerHTML = '<i class="fas fa-lightbulb"></i> Hint'
      showMessage("Hints hidden", "success")
    }

    // Update target numbers display
    renderTargetNumbers()
  }

  function clearAllHints() {
    const cells = document.querySelectorAll(".cell")
    cells.forEach((cell) => {
      if (!cell.classList.contains("found")) {
        for (let i = 1; i <= 5; i++) {
          cell.classList.remove(`hint-${i}`)
        }
      }
    })
  }

  function showAllHints() {
    console.log("Showing all hints...")
    gameState.targetNumbers.forEach((number, index) => {
      if (!gameState.foundNumbers.includes(number)) {
        const colorIndex = (index % 5) + 1
        console.log(`Showing hint for ${number} with color ${colorIndex}`)

        if (gameState.numberPositions[number] && gameState.numberPositions[number].length > 0) {
          // Show first occurrence of each number
          const firstOccurrence = gameState.numberPositions[number][0]
          console.log(`First occurrence positions:`, firstOccurrence.positions)

          firstOccurrence.positions.forEach((pos) => {
            const cell = document.querySelector(`.cell[data-row="${pos.row}"][data-col="${pos.col}"]`)
            if (cell && !cell.classList.contains("found")) {
              cell.classList.add(`hint-${colorIndex}`)
              console.log(`Added hint-${colorIndex} to cell at (${pos.row}, ${pos.col})`)
            }
          })
        } else {
          console.log(`No positions found for number: ${number}`)
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

    console.log(`Showing individual hint for: ${number}`)

    // Clear all hint classes first
    clearAllHints()

    // Find the index of the number for color coding
    const numberIndex = gameState.targetNumbers.indexOf(number)
    const colorIndex = (numberIndex % 5) + 1

    console.log(`Number index: ${numberIndex}, Color index: ${colorIndex}`)

    // Highlight all occurrences of this number
    if (gameState.numberPositions[number] && gameState.numberPositions[number].length > 0) {
      console.log(`Found ${gameState.numberPositions[number].length} occurrences`)

      gameState.numberPositions[number].forEach((occurrence, occIndex) => {
        console.log(`Occurrence ${occIndex}:`, occurrence.positions)
        occurrence.positions.forEach((pos) => {
          const cell = document.querySelector(`.cell[data-row="${pos.row}"][data-col="${pos.col}"]`)
          if (cell && !cell.classList.contains("found")) {
            cell.classList.add(`hint-${colorIndex}`)
            console.log(`Added hint-${colorIndex} to cell at (${pos.row}, ${pos.col})`)
          }
        })
      })

      showMessage(`Showing hints for ${number}`, "success")
    } else {
      console.log(`No positions found for ${number}`)
      showMessage(`No hints available for ${number}`, "success")
    }

    // Update target numbers display to show the highlighted number
    renderTargetNumbers()
  }
})
