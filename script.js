// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize enhanced animations
    createEnhancedFloatingLetters();
    createFloatingParticles();
    createWordBubbles();
    
    // Initialize audio
    const backgroundMusic = document.getElementById('background-music');
    
    // Play background music when user interacts with the page
    document.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            backgroundMusic.volume = 0.3;
            backgroundMusic.play().catch(error => {
                console.log('Auto-play prevented:', error);
            });
        }
    }, { once: true });
    
    // Load high score from localStorage
    const highScore = localStorage.getItem('wordSearchHighScore') || 0;
    document.getElementById('high-score').textContent = highScore;
    
    // Add interactive effects to buttons
    addButtonEffects();
    
    // Add mouse trail effect
    addMouseTrail();
});

// Create enhanced floating letters animation
function createEnhancedFloatingLetters() {
    const container = document.querySelector('.floating-letters');
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const numLetters = 30;
    
    for (let i = 0; i < numLetters; i++) {
        const letter = document.createElement('div');
        letter.classList.add('floating-letter');
        
        // Add glow effect to some letters
        if (Math.random() > 0.7) {
            letter.classList.add('glow');
        }
        
        letter.textContent = letters[Math.floor(Math.random() * letters.length)];
        
        // Random position
        letter.style.left = `${Math.random() * 100}%`;
        
        // Random delay
        letter.style.animationDelay = `${Math.random() * 20}s`;
        
        // Random duration
        letter.style.animationDuration = `${15 + Math.random() * 15}s`;
        
        // Random size
        letter.style.fontSize = `${1.5 + Math.random() * 2}rem`;
        
        container.appendChild(letter);
    }
}

// Create floating particles
function createFloatingParticles() {
    const container = document.querySelector('.floating-particles');
    const numParticles = 25;
    
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        
        // Random delay
        particle.style.animationDelay = `${Math.random() * 15}s`;
        
        // Random duration
        particle.style.animationDuration = `${10 + Math.random() * 10}s`;
        
        // Random size
        const size = 2 + Math.random() * 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        container.appendChild(particle);
    }
}

// Create word bubbles
function createWordBubbles() {
    const container = document.querySelector('.word-bubbles');
    const words = [
        'SEARCH', 'FIND', 'WORD', 'PUZZLE', 'GAME', 'FUN', 'PLAY', 'SOLVE',
        'LETTERS', 'GRID', 'CHALLENGE', 'BRAIN', 'THINK', 'DISCOVER'
    ];
    const numBubbles = 6;
    
    for (let i = 0; i < numBubbles; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('word-bubble');
        bubble.textContent = words[Math.floor(Math.random() * words.length)];
        
        // Random position
        bubble.style.left = `${Math.random() * 80}%`;
        
        // Random delay
        bubble.style.animationDelay = `${Math.random() * 25}s`;
        
        // Random duration
        bubble.style.animationDuration = `${20 + Math.random() * 15}s`;
        
        container.appendChild(bubble);
    }
}

// Add interactive button effects
function addButtonEffects() {
    const buttons = document.querySelectorAll('.level-btn');
    
    buttons.forEach(button => {
        // Add ripple effect on click
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = (e.clientX - button.offsetLeft) + 'px';
            ripple.style.top = (e.clientY - button.offsetTop) + 'px';
            ripple.style.width = ripple.style.height = '20px';
            ripple.style.marginLeft = ripple.style.marginTop = '-10px';
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Add hover sound effect (if you have audio files)
        button.addEventListener('mouseenter', function() {
            // You can add a hover sound effect here
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Add mouse trail effect
function addMouseTrail() {
    const trail = [];
    const trailLength = 8;
    
    document.addEventListener('mousemove', function(e) {
        // Create trail dot
        const dot = document.createElement('div');
        dot.style.position = 'fixed';
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
        dot.style.width = '6px';
        dot.style.height = '6px';
        dot.style.background = 'rgba(255, 255, 255, 0.6)';
        dot.style.borderRadius = '50%';
        dot.style.pointerEvents = 'none';
        dot.style.zIndex = '1000';
        dot.style.transition = 'opacity 0.5s ease-out';
        
        document.body.appendChild(dot);
        trail.push(dot);
        
        // Remove old trail dots
        if (trail.length > trailLength) {
            const oldDot = trail.shift();
            oldDot.style.opacity = '0';
            setTimeout(() => {
                if (oldDot.parentNode) {
                    oldDot.parentNode.removeChild(oldDot);
                }
            }, 500);
        }
    });
}