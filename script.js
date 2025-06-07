// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  // Load high score
  loadHighScore()

  // Create floating letters
  createFloatingLetters()

  // Add card animations
  animateCards()

  // Add interactive effects
  addInteractiveEffects()

  // Add keyboard navigation
  addKeyboardNavigation()
}

// Load and display high score from localStorage
function loadHighScore() {
  const highScore = localStorage.getItem("wordSearchHighScore") || 0
  const highScoreElement = document.getElementById("highScore")
  if (highScoreElement) {
    // Animate the score counting up
    animateNumber(highScoreElement, 0, Number.parseInt(highScore), 1000)
  }
}

// Animate number counting up
function animateNumber(element, start, end, duration) {
  const startTime = performance.now()

  function updateNumber(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Easing function for smooth animation
    const easeOut = 1 - Math.pow(1 - progress, 3)
    const current = Math.floor(start + (end - start) * easeOut)

    element.textContent = current.toLocaleString()

    if (progress < 1) {
      requestAnimationFrame(updateNumber)
    }
  }

  requestAnimationFrame(updateNumber)
}

// Create floating letters animation
function createFloatingLetters() {
  const container = document.getElementById("floatingLetters")
  if (!container) return

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const numberOfLetters = window.innerWidth < 768 ? 8 : 15

  // Clear existing letters
  container.innerHTML = ""

  for (let i = 0; i < numberOfLetters; i++) {
    createFloatingLetter(container, letters)
  }

  // Create new letters periodically
  setInterval(() => {
    if (container.children.length < numberOfLetters) {
      createFloatingLetter(container, letters)
    }
  }, 2000)
}

function createFloatingLetter(container, letters) {
  const letter = document.createElement("div")
  letter.className = "floating-letter"
  letter.textContent = letters[Math.floor(Math.random() * letters.length)]

  // Random horizontal position
  letter.style.left = Math.random() * 100 + "%"

  // Random animation delay
  letter.style.animationDelay = Math.random() * 5 + "s"

  // Random animation duration
  letter.style.animationDuration = 10 + Math.random() * 10 + "s"

  container.appendChild(letter)

  // Remove letter after animation completes
  setTimeout(() => {
    if (letter.parentNode) {
      letter.parentNode.removeChild(letter)
    }
  }, 15000)
}

// Animate cards on scroll/load
function animateCards() {
  const cards = document.querySelectorAll(".difficulty-card")

  // Add loading class for initial animation
  cards.forEach((card, index) => {
    card.style.animationDelay = index * 0.1 + "s"
    card.classList.add("loading")
  })

  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  cards.forEach((card) => observer.observe(card))
}

// Add interactive effects to cards
function addInteractiveEffects() {
  const cards = document.querySelectorAll(".difficulty-card")

  cards.forEach((card) => {
    // Add ripple effect on click
    card.addEventListener("click", function (e) {
      createRippleEffect(e, this)
    })

    // Add tilt effect on mouse move
    card.addEventListener("mousemove", function (e) {
      if (window.innerWidth > 768) {
        // Only on desktop
        addTiltEffect(e, this)
      }
    })

    // Reset tilt on mouse leave
    card.addEventListener("mouseleave", function () {
      this.style.transform = ""
    })

    // Add sound feedback (if you want to add audio later)
    card.addEventListener("mouseenter", function () {
      // Placeholder for hover sound
      this.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
    })
  })
}

// Create ripple effect on click
function createRippleEffect(event, element) {
  const ripple = document.createElement("div")
  const rect = element.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2

  ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `

  element.style.position = "relative"
  element.appendChild(ripple)

  // Remove ripple after animation
  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.parentNode.removeChild(ripple)
    }
  }, 600)
}

// Add tilt effect based on mouse position
function addTiltEffect(event, element) {
  const rect = element.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  const deltaX = (event.clientX - centerX) / (rect.width / 2)
  const deltaY = (event.clientY - centerY) / (rect.height / 2)

  const tiltX = deltaY * 10 // Max 10 degrees
  const tiltY = deltaX * -10 // Max 10 degrees

  element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`
}

// Add keyboard navigation
function addKeyboardNavigation() {
  const cards = document.querySelectorAll(".difficulty-card")

  document.addEventListener("keydown", (e) => {
    const focusedElement = document.activeElement
    const currentIndex = Array.from(cards).indexOf(focusedElement)

    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        e.preventDefault()
        const nextIndex = (currentIndex + 1) % cards.length
        cards[nextIndex].focus()
        break

      case "ArrowUp":
      case "ArrowLeft":
        e.preventDefault()
        const prevIndex = currentIndex === 0 ? cards.length - 1 : currentIndex - 1
        cards[prevIndex].focus()
        break

      case "Enter":
      case " ":
        if (cards.includes(focusedElement)) {
          e.preventDefault()
          focusedElement.click()
        }
        break
    }
  })
}

// Add CSS for ripple animation
const style = document.createElement("style")
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Handle window resize
window.addEventListener("resize", () => {
  // Recreate floating letters with appropriate count for screen size
  createFloatingLetters()
})

// Performance optimization: Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
  document.documentElement.style.setProperty("--transition", "all 0.2s ease")
}

// Add service worker for offline functionality (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("ServiceWorker registration successful")
      })
      .catch((err) => {
        console.log("ServiceWorker registration failed")
      })
  })
}
