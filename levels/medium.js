document.addEventListener("DOMContentLoaded", async () => {
  // Medium level word puzzles
  const puzzleData = {
    medium: [
      {
        grid: [
          ["S", "I", "N", "G", "E", "R", "T", "A", "R", "L"],
          ["R", "U", "k", "O", "A", "I", "B", "C", "E", "T"],
          ["O", "M", "N", "K", "I", "R", "Z", "A", "O", "U"],
          ["S", "W", "Q", "F", "M", "I", "F", "L", "N", "L"],
          ["E", "V", "U", "B", "L", "S", "I", "O", "I", "I"],
          ["T", "A", "E", "O", "I", "O", "L", "C", "O", "P"],
          ["X", "S", "E", "A", "J", "S", "W", "K", "N", "S"],
          ["V", "E", "N", "T", "K", "T", "B", "E", "S", "O"],
          ["L", "I", "L", "A", "C", "E", "U", "U", "R", "O"],
          ["G", "U", "A", "R", "D", "M", "D", "V", "T", "N"],
        ],
        words: [
          "SUNFLOWER",
          "SINGER",
          "ROSE",
          "LILAC",
          "IRIS",
          "QUEEN",
          "BOAT",
          "TULIP",
          "ONION",
          "GUARD",
          "BUD",
          "STEM",
          "LEAF",
          "VASE", "SOON", "AIM", "RAT", "LOCK"
        ],
      },
      {
        grid: [
          ["W", "C", "M", "A", "N", "G", "O", "Z", "O", "O"],
          ["T", "L", "U", "K", "S", "L", "E", "M", "O", "N"],
          ["O", "O", "S", "T", "E", "L", "P", "O", "S", "T"],
          ["D", "U", "I", "G", "Q", "I", "R", "G", "Y", "M"],
          ["A", "D", "C", "V", "A", "E", "A", "O", "O", "Q"],
          ["Y", "Y", "B", "N", "Y", "R", "Z", "A", "S", "F"],
          ["M", "X", "O", "A", "T", "K", "F", "T", "W", "I"],
          ["U", "Z", "L", "D", "A", "I", "S", "Y", "I", "S"],
          ["S", "P", "E", "G", "I", "O", "N", "T", "M", "H"],
          ["T", "I", "N", "S", "T", "R", "U", "M", "E", "T"],
        ],
        words: [
          "PIANO", "MANGO", "POST", "MUSIC", "GOAT", "GYM", "TODAY", "MUST", "DAISY", "LEG", "SWIM", "PLAYER", "PEGION", "CLOUDY", "LEMON", "FISH", "INSTRUMET", "ART", "ZOO"
        ]
      },
      {
        grid: [
          ["T", "O", "O", "T", "H", "P", "A", "S", "T", "E"],
          ["H", "W", "C", "X", "G", "O", "T", "B", "J", "G"],
          ["E", "E", "A", "A", " ", "I", "U", "O", "E", "U"],
          ["S", "D", "Z", "T", "R", "O", "R", "Y", "R", "E"],
          ["C", "N", "I", "W", "E", "R", "V", "L", "R", "R"],
          ["R", "E", "S", "A", "C", "R", "O", " ", "Y", "N"],
          ["E", "S", "P", "R", "W", "O", "T", "M", "B", "I"],
          ["A", "D", "E", "T", "C", "M", "L", "Z", "L", "C"],
          ["M", "Y", "P", "E", "A", "R", "L", "D", "U", "A"],
          ["M", "O", "N", "A", "L", "I", "S", "A", "E", " "],
        ],
        words: [
          "MONALISA",
          "BLUE",
          "WATER",
          "WEDNESDY",
          "CARROM",
          "THESCREAM",
          "TOOTHPASTE",
          "JERRY",
          "PEPSI",
          "GUERNICA",
          "ART",
          "GIRL",
          "PEARL", "BOY", "GOT", "COLD"
        ],
      },
    ],
  }

  // Game state
  const gameState = {
    grid: [],
    targetWords: [],
    foundWords: [],
    currentScore: 0,
    maxScore: 0,
    selectedCells: [],
    isSelecting: false,
    currentDirection: null,
    gameTime: 480, // 8 minutes in seconds
    originalGameTime: 480,
    timerInterval: null,
    isGameRunning: false,
    hintsShown: false,
    wordPositions: {},
    colorIndex: 1,
    activeSelections: {},
    currentDifficulty: "medium",
    currentPuzzleIndex: 0,
  }

  // DOM elements
  const wordGrid = document.getElementById("wordGrid")
  const targetWordsContainer = document.getElementById("targetWords")
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
  wordGrid.addEventListener("mousedown", handleStartSelection)
  wordGrid.addEventListener("touchstart", handleStartSelection, { passive: false })
  wordGrid.addEventListener("mouseup", handleEndSelection)
  wordGrid.addEventListener("touchend", handleEndSelection)
  wordGrid.addEventListener("mousemove", handleCellHover)
  wordGrid.addEventListener("touchmove", handleCellHover, { passive: false })

  // Add click event to target words for individual hints
  targetWordsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("target-word") && !e.target.classList.contains("found")) {
      const word = e.target.textContent
      showWordHint(word)
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
    gameState.foundWords = []
    gameState.currentScore = 0
    gameState.selectedCells = []
    gameState.isSelecting = false
    gameState.currentDirection = null
    gameState.isGameRunning = false
    gameState.hintsShown = false
    gameState.wordPositions = {}
    gameState.activeSelections = {}
    gameState.colorIndex = 1

    // Generate a new grid and target words
    generateGrid()
    generateTargetWords()

    // Update UI
    updateScore()
    renderTargetWords()
    updateTimerDisplay()

    // Reset UI elements
    updateStartStopButton()
    decreaseTimeBtn.disabled = false
    increaseTimeBtn.disabled = false
    hintBtn.innerHTML = '<i class="fas fa-lightbulb"></i> Hint'
    wordGrid.classList.remove("game-over")
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
      }, index * 3) // Staggered animation, slightly faster for more cells
    })

    // Animate target words
    const targetWords = document.querySelectorAll(".target-word")
    targetWords.forEach((word, index) => {
      word.style.opacity = "0"
      word.style.transform = "translateY(20px)"

      setTimeout(
        () => {
          word.style.transition = "opacity 0.3s ease, transform 0.3s ease"
          word.style.opacity = "1"
          word.style.transform = "translateY(0)"
        },
        300 + index * 40,
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
      case "hard":
        window.location.href = "hard.html"
        break
      case "expert":
        window.location.href = "expert.html"
        break
      case "numbers":
        window.location.href = "numbers.html"
        break
      case "medium":
      default:
        // Stay on current page for medium
        gameState.currentDifficulty = "medium"
        gameState.currentPuzzleIndex = 0

        // Stop game if running
        if (gameState.isGameRunning) {
          stopGame()
        }

        initGame()
        showMessage("Switched to Medium difficulty!", "success")
        break
    }
  }

  function switchToNextGrid() {
    // Show loading animation
    wordGrid.classList.add("loading")

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
      gameState.foundWords = []
      gameState.currentScore = 0
      gameState.selectedCells = []
      gameState.isSelecting = false
      gameState.currentDirection = null
      gameState.hintsShown = false
      gameState.wordPositions = {}
      gameState.activeSelections = {}
      gameState.colorIndex = 1

      // Reset timer to original time
      gameState.gameTime = gameState.originalGameTime

      // Generate new grid and targets
      generateGrid()
      generateTargetWords()

      // Update UI
      updateScore()
      renderTargetWords()
      updateTimerDisplay()

      // Reset UI elements
      hintBtn.innerHTML = '<i class="fas fa-lightbulb"></i> Hint'
      wordGrid.classList.remove("game-over", "loading")
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
      // Fallback to first medium puzzle
      gameState.grid = puzzleData.medium[0].grid
    }

    renderGrid()
  }

  function generateTargetWords() {
    const currentPuzzles = puzzleData[gameState.currentDifficulty]
    if (currentPuzzles && currentPuzzles[gameState.currentPuzzleIndex]) {
      gameState.targetWords = currentPuzzles[gameState.currentPuzzleIndex].words
    } else {
      // Fallback to first medium puzzle
      gameState.targetWords = puzzleData.medium[0].words
    }

    // Calculate max score (150 points per word for medium difficulty)
    gameState.maxScore = gameState.targetWords.length * 150
    maxScoreElement.textContent = gameState.maxScore

    // Pre-calculate all word positions for hints
    findWordPositions()
  }

  function findWordPositions() {
    console.log("Finding word positions for grid:", gameState.currentPuzzleIndex)
    gameState.wordPositions = {}

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

    gameState.targetWords.forEach((word, index) => {
      gameState.wordPositions[word] = []
      const wordLength = word.length

      console.log(`Searching for word: ${word}`)

      // Search through the grid
      for (let row = 0; row < gameState.grid.length; row++) {
        for (let col = 0; col < gameState.grid[0].length; col++) {
          // Check all directions
          for (const dir of directions) {
            let found = true
            const positions = []

            // Check each character in the word
            for (let i = 0; i < wordLength; i++) {
              const newRow = row + dir.dr * i
              const newCol = col + dir.dc * i

              // Check if within bounds
              if (newRow < 0 || newRow >= gameState.grid.length || newCol < 0 || newCol >= gameState.grid[0].length) {
                found = false
                break
              }

              // Check if character matches (case insensitive)
              const gridChar = gameState.grid[newRow][newCol].toUpperCase()
              const targetChar = word[i].toUpperCase()

              if (gridChar !== targetChar) {
                found = false
                break
              }

              positions.push({ row: newRow, col: newCol })
            }

            if (found) {
              console.log(`Found ${word} at position (${row},${col}) in direction ${dir.type}`)
              gameState.wordPositions[word].push({
                direction: dir,
                positions: positions,
                directionType: dir.type,
              })
            }
          }
        }
      }

      console.log(`Total occurrences found for ${word}:`, gameState.wordPositions[word].length)
    })

    console.log("All word positions:", gameState.wordPositions)
  }

  function renderGrid() {
    wordGrid.innerHTML = ""

    gameState.grid.forEach((row, rowIndex) => {
      row.forEach((cellValue, colIndex) => {
        const cell = document.createElement("div")
        cell.className = "cell"
        cell.textContent = cellValue.toUpperCase()
        cell.dataset.row = rowIndex
        cell.dataset.col = colIndex
        cell.tabIndex = 0 // Make cells focusable for keyboard navigation
        cell.setAttribute("role", "button")
        cell.setAttribute("aria-label", `Cell at row ${rowIndex + 1}, column ${colIndex + 1}, letter ${cellValue}`)

        wordGrid.appendChild(cell)
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

  function renderTargetWords() {
    targetWordsContainer.innerHTML = ""

    gameState.targetWords.forEach((word, index) => {
      const wordElement = document.createElement("div")
      const colorClass = gameState.foundWords.includes(word) ? `found found-${(index % 5) + 1}` : ""

      wordElement.className = `target-word ${colorClass}`
      wordElement.textContent = word.toUpperCase()
      wordElement.dataset.word = word
      wordElement.dataset.colorIndex = (index % 5) + 1
      wordElement.tabIndex = 0 // Make focusable
      wordElement.setAttribute("role", "button")

      if (gameState.foundWords.includes(word)) {
        wordElement.setAttribute("aria-label", `Word ${word} found`)
      } else {
        wordElement.setAttribute("aria-label", `Find word ${word}`)
      }

      // Add hint class for color coding if hints are shown
      if (gameState.hintsShown && !gameState.foundWords.includes(word)) {
        wordElement.classList.add(`hint-${(index % 5) + 1}`)
      }

      targetWordsContainer.appendChild(wordElement)
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

    // Get the selected word sequence
    const selectedWord = gameState.selectedCells.map((cell) => cell.textContent).join("")

    // Check if it's a target word (case insensitive)
    const targetWord = gameState.targetWords.find((word) => word.toUpperCase() === selectedWord.toUpperCase())

    if (targetWord) {
      // Mark as found if not already found
      if (!gameState.foundWords.includes(targetWord)) {
        const wordIndex = gameState.targetWords.indexOf(targetWord)
        const colorIndex = (wordIndex % 5) + 1

        gameState.foundWords.push(targetWord)
        gameState.currentScore += 150 // 150 points per word for medium difficulty
        updateScore()

        // Mark cells as found with the correct color
        gameState.selectedCells.forEach((cell) => {
          // Remove selection classes
          removeSelectionClasses(cell)

          // Add found class with color
          cell.classList.add("found", `found-${colorIndex}`)
        })

        // Store this selection
        gameState.activeSelections[targetWord] = {
          cells: [...gameState.selectedCells],
          colorIndex: colorIndex,
        }

        // Update target words display
        renderTargetWords()

        // Play success sound
        playSound("success")

        // Show success message
        showMessage(`Found ${targetWord.toUpperCase()}! +150 points`, "success")

        // Check if all words are found
        if (gameState.foundWords.length === gameState.targetWords.length) {
          endGame(true)
        }
      } else {
        playSound("error")
        showMessage("Already found this word!", "success")
        clearCurrentSelection()
      }
    } else if (gameState.selectedCells.length > 1) {
      // Not a target word - deselect
      playSound("error")
      showMessage("Not a target word!", "success")
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

    // Skip if cell is already part of a found word
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

    gameState.gameTime = Math.min(900, gameState.gameTime + 30) // Maximum 15 minutes
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
    showMessage("Game started! Find the words!", "success")

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
    wordGrid.classList.add("game-over")

    // Update button state
    updateStartStopButton()
    decreaseTimeBtn.disabled = false
    increaseTimeBtn.disabled = false

    // Disable grid interaction
    updateGridInteraction()

    if (isWin) {
      playSound("win")
      showMessage(
        `Congratulations! You found all words in ${formatTime(gameState.originalGameTime - gameState.gameTime)}!`,
        "success",
      )
    } else {
      playSound("lose")
      // Show game over overlay
      showGameOverOverlay()
    }
  }

  function showGameOverOverlay() {
    const foundCount = gameState.foundWords.length
    const totalCount = gameState.targetWords.length

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
    wordGrid.classList.remove("game-over")
    timerMinutesElement.classList.remove("timer-warning")
    timerSecondsElement.classList.remove("timer-warning")

    // Start timer again
    gameState.timerInterval = setInterval(updateTimer, 1000)
    showMessage("Time extended! Keep searching!", "success")

    playSound("extend")
  }

  function acceptFate() {
    gameOverOverlay.classList.remove("show")
    const foundCount = gameState.foundWords.length
    const totalCount = gameState.targetWords.length
    showMessage(`Game over! You found ${foundCount} of ${totalCount} words.`, "success")
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
      showMessage("Hints shown! Click on words for specific hints.", "success")
    } else {
      hintBtn.innerHTML = '<i class="fas fa-lightbulb"></i> Hint'
      showMessage("Hints hidden", "success")
    }

    // Update target words display
    renderTargetWords()
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
    gameState.targetWords.forEach((word, index) => {
      if (!gameState.foundWords.includes(word)) {
        const colorIndex = (index % 5) + 1
        console.log(`Showing hint for ${word} with color ${colorIndex}`)

        if (gameState.wordPositions[word] && gameState.wordPositions[word].length > 0) {
          // Show first occurrence of each word
          const firstOccurrence = gameState.wordPositions[word][0]
          console.log(`First occurrence positions:`, firstOccurrence.positions)

          firstOccurrence.positions.forEach((pos) => {
            const cell = document.querySelector(`.cell[data-row="${pos.row}"][data-col="${pos.col}"]`)
            if (cell && !cell.classList.contains("found")) {
              cell.classList.add(`hint-${colorIndex}`)
              console.log(`Added hint-${colorIndex} to cell at (${pos.row}, ${pos.col})`)
            }
          })
        } else {
          console.log(`No positions found for word: ${word}`)
        }
      }
    })
  }

  function showWordHint(word) {
    if (!gameState.hintsShown) {
      showMessage("Enable hints first!", "success")
      return
    }

    if (gameState.foundWords.includes(word)) {
      showMessage("You already found this word!", "success")
      return
    }

    console.log(`Showing individual hint for: ${word}`)

    // Clear all hint classes first
    clearAllHints()

    // Find the index of the word for color coding
    const wordIndex = gameState.targetWords.indexOf(word)
    const colorIndex = (wordIndex % 5) + 1

    console.log(`Word index: ${wordIndex}, Color index: ${colorIndex}`)

    // Highlight all occurrences of this word
    if (gameState.wordPositions[word] && gameState.wordPositions[word].length > 0) {
      console.log(`Found ${gameState.wordPositions[word].length} occurrences`)

      gameState.wordPositions[word].forEach((occurrence, occIndex) => {
        console.log(`Occurrence ${occIndex}:`, occurrence.positions)
        occurrence.positions.forEach((pos) => {
          const cell = document.querySelector(`.cell[data-row="${pos.row}"][data-col="${pos.col}"]`)
          if (cell && !cell.classList.contains("found")) {
            cell.classList.add(`hint-${colorIndex}`)
            console.log(`Added hint-${colorIndex} to cell at (${pos.row}, ${pos.col})`)
          }
        })
      })

      showMessage(`Showing hints for ${word.toUpperCase()}`, "success")
    } else {
      console.log(`No positions found for ${word}`)
      showMessage(`No hints available for ${word.toUpperCase()}`, "success")
    }

    // Update target words display to show the highlighted word
    renderTargetWords()
  }
})
