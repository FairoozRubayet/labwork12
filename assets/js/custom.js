// ===========================================
// 1. LOADER FUNCTIONALITY
// ===========================================

function hideLoaderNow() {
  var loader = document.getElementById('simplePageLoader');
  if (loader) {
    console.log("Hiding loader...");
    
    loader.classList.add('hide-loader');
    loader.style.opacity = '0';
    loader.style.visibility = 'hidden';
    
    setTimeout(function() {
      loader.style.display = 'none';
      
      setTimeout(function() {
        if (loader && loader.parentNode) {
          loader.parentNode.removeChild(loader);
          console.log("Loader removed from DOM");
        }
      }, 500);
    }, 500);
  }
}

window.addEventListener('load', function() {
  console.log("Page loaded, hiding loader...");
  hideLoaderNow();
});

setTimeout(function() {
  console.log("Safety timeout: Hiding loader...");
  hideLoaderNow();
}, 3000);

document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM ready, will hide loader soon...");
  setTimeout(hideLoaderNow, 1000);
});

// ===========================================
// 2. REGULAR PAGE FUNCTIONALITY
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
  console.log("Setting up page functionality...");
  
  // Mobile navigation toggle
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navmenu = document.querySelector('#navmenu');
  
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function(e) {
      e.preventDefault();
      navmenu.classList.toggle('active');
      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
    });
  }

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('#navmenu a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navmenu.classList.remove('active');
      if (mobileNavToggle) {
        mobileNavToggle.classList.add('bi-list');
        mobileNavToggle.classList.remove('bi-x');
      }
    });
  });

  // Header scroll effect
  const header = document.getElementById('header');
  const scrollTop = document.getElementById('scroll-top');
  
  function toggleHeaderScroll() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
      if (scrollTop) scrollTop.classList.add('active');
    } else {
      header.classList.remove('scrolled');
      if (scrollTop) scrollTop.classList.remove('active');
    }
  }

  window.addEventListener('scroll', toggleHeaderScroll);
  toggleHeaderScroll();

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  // Portfolio lightbox (if using GLightbox)
  if (typeof GLightbox !== 'undefined') {
    const lightbox = GLightbox({
      selector: '.glightbox'
    });
  }

  // Simple hover effects for buttons
  var buttons = document.querySelectorAll('.btn');
  buttons.forEach(function(btn) {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
    });
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
  
  console.log("Page functionality setup complete!");
});

// Back to Top functionality
document.addEventListener('DOMContentLoaded', function() {
  const backToTopBtn = document.getElementById('backToTop');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

// ===========================================
// 3. CONTACT FORM FUNCTIONALITY (REQUIRED TASK)
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
  console.log("Initializing contact form...");
  
  // Generate random helper tag
  function generateHelperTag() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `FE24-JS-CF-${result}`;
  }

  // Initialize helper tag
  const helperTag = generateHelperTag();
  console.log("Generated helper tag:", helperTag);

  // Form handling
  const contactForm = document.getElementById('contactForm');
  const resultsContainer = document.getElementById('formResults');
  const averageContainer = document.getElementById('averageRating');
  const notificationContainer = document.getElementById('formNotification');
  
  if (contactForm) {
    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Collect form data
      const formData = {
        name: document.getElementById('name').value.trim(),
        surname: document.getElementById('surname').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        address: document.getElementById('address').value.trim(),
        rating1: parseFloat(document.getElementById('rating1').value),
        rating2: parseFloat(document.getElementById('rating2').value),
        rating3: parseFloat(document.getElementById('rating3').value),
        helperTag: helperTag
      };

      // Print to console
      console.log("Form data submitted:", formData);

      // Display results
      displayFormResults(formData);
      
      // Calculate and display average
      calculateAndDisplayAverage(formData);
      
      // Show success notification
      showSuccessNotification();
    });
  }

  // Function to display form results
  function displayFormResults(data) {
    if (!resultsContainer) return;
    
    const resultsHTML = `
      <div class="form-results">
        <h4>Submitted Data:</h4>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Surname:</strong> ${data.surname}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone number:</strong> ${data.phone}</p>
        <p><strong>Address:</strong> ${data.address}</p>
        <p><strong>Rating 1:</strong> ${data.rating1}</p>
        <p><strong>Rating 2:</strong> ${data.rating2}</p>
        <p><strong>Rating 3:</strong> ${data.rating3}</p>
        <p><strong>Helper tag:</strong> ${data.helperTag}</p>
      </div>
    `;
    
    resultsContainer.innerHTML = resultsHTML;
    resultsContainer.style.display = 'block';
  }

  // Function to calculate and display average
  function calculateAndDisplayAverage(data) {
    if (!averageContainer) return;
    
    const average = ((data.rating1 + data.rating2 + data.rating3) / 3).toFixed(1);
    
    // Determine color based on average
    let colorClass = '';
    if (average >= 0 && average < 4) {
      colorClass = 'rating-red';
    } else if (average >= 4 && average < 7) {
      colorClass = 'rating-orange';
    } else if (average >= 7 && average <= 10) {
      colorClass = 'rating-green';
    }
    
    averageContainer.innerHTML = `
      <div class="average-rating">
        <h4>Average Rating:</h4>
        <p class="${colorClass}"><strong>${data.name} ${data.surname}: ${average}</strong></p>
      </div>
    `;
    averageContainer.style.display = 'block';
  }

  // Function to show success notification
  function showSuccessNotification() {
    if (!notificationContainer) return;
    
    notificationContainer.innerHTML = `
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        <i class="bi bi-check-circle me-2"></i>
        Form submitted successfully!
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      const alert = notificationContainer.querySelector('.alert');
      if (alert) {
        alert.classList.remove('show');
        setTimeout(() => {
          notificationContainer.innerHTML = '';
        }, 150);
      }
    }, 5000);
  }
});


// ===========================================
// 4. OPTIONAL TASK: REAL-TIME VALIDATION
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
  // Phone number input - SIMPLE VERSION
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    // Add placeholder text for guidance
    phoneInput.placeholder = "e.g., +37064906375";
    
    phoneInput.addEventListener('input', function(e) {
      // Allow user to type freely
      validateForm();
    });
  }
  
  // Real-time validation
  const nameInput = document.getElementById('name');
  const surnameInput = document.getElementById('surname');
  const emailInput = document.getElementById('email');
  const addressInput = document.getElementById('address');
  const ratingInputs = [
    document.getElementById('rating1'),
    document.getElementById('rating2'),
    document.getElementById('rating3')
  ];
  
  // Rating color update based on value
  function updateRatingColor(input, valueDisplay) {
    if (!input || !valueDisplay) return;
    
    const value = parseInt(input.value);
    
    // Remove all color classes
    valueDisplay.classList.remove('rating-red', 'rating-orange', 'rating-green');
    
    // Add appropriate color class
    if (value >= 1 && value < 4) {
      valueDisplay.classList.add('rating-red');
    } else if (value >= 4 && value < 7) {
      valueDisplay.classList.add('rating-orange');
    } else if (value >= 7 && value <= 10) {
      valueDisplay.classList.add('rating-green');
    }
  }
  
  // SIMPLE VALIDATION FUNCTIONS
  
  function validateName(input) {
    const value = input.value.trim();
    
    if (!value) {
      input.classList.add('is-invalid');
      return false;
    }
    
    // Simple check: at least 2 characters
    if (value.length < 2) {
      input.classList.add('is-invalid');
      return false;
    }
    
    input.classList.remove('is-invalid');
    return true;
  }
  
  function validateEmail(input) {
    const value = input.value.trim();
    
    if (!value) {
      input.classList.add('is-invalid');
      return false;
    }
    
    // Simple email check: has @ and .
    if (!value.includes('@') || !value.includes('.')) {
      input.classList.add('is-invalid');
      return false;
    }
    
    input.classList.remove('is-invalid');
    return true;
  }
  
  function validatePhone(input) {
    const value = input.value.trim();
    
    if (!value) {
      input.classList.add('is-invalid');
      return false;
    }
    
    // Remove all non-digits
    const digitsOnly = value.replace(/\D/g, '');
    
    // Simple check: must have at least 9 digits total
    // +370 (3 digits) + 6 more digits = minimum 9 digits
    if (digitsOnly.length < 9) {
      input.classList.add('is-invalid');
      return false;
    }
    
    // Optional: check if starts with 370 (Lithuanian country code)
    if (!digitsOnly.startsWith('370')) {
      // If user typed +370, it will be removed by replace(/\D/g, '')
      // So we check if digits start with 370
      input.classList.add('is-invalid');
      return false;
    }
    
    input.classList.remove('is-invalid');
    return true;
  }
  
  function validateAddress(input) {
    const value = input.value.trim();
    
    if (!value || value.length < 5) {
      input.classList.add('is-invalid');
      return false;
    }
    
    input.classList.remove('is-invalid');
    return true;
  }
  
  function validateRating(input) {
    const value = parseFloat(input.value);
    return !isNaN(value) && value >= 1 && value <= 10;
  }
  
  // Add validation events
  if (nameInput) {
    nameInput.addEventListener('input', function() {
      validateName(this);
      validateForm();
    });
  }
  
  if (surnameInput) {
    surnameInput.addEventListener('input', function() {
      validateName(this);
      validateForm();
    });
  }
  
  if (emailInput) {
    emailInput.addEventListener('input', function() {
      validateEmail(this);
      validateForm();
    });
  }
  
  if (phoneInput) {
    phoneInput.addEventListener('input', function() {
      validatePhone(this);
      validateForm();
    });
  }
  
  if (addressInput) {
    addressInput.addEventListener('input', function() {
      validateAddress(this);
      validateForm();
    });
  }
  
  // Rating value displays with color updates
  ratingInputs.forEach((input, index) => {
    if (input) {
      const valueDisplay = document.getElementById(`rating${index + 1}Value`);
      
      // Initialize color
      if (valueDisplay) {
        updateRatingColor(input, valueDisplay);
      }
      
      input.addEventListener('input', function() {
        if (valueDisplay) {
          valueDisplay.textContent = this.value;
          updateRatingColor(input, valueDisplay);
        }
        validateForm();
      });
    }
  });
  
  // Form validation function
  function validateForm() {
    const submitBtn = document.getElementById('submitBtn');
    if (!submitBtn) return;
    
    const isNameValid = nameInput ? validateName(nameInput) : false;
    const isSurnameValid = surnameInput ? validateName(surnameInput) : false;
    const isEmailValid = emailInput ? validateEmail(emailInput) : false;
    const isPhoneValid = phoneInput ? validatePhone(phoneInput) : false;
    const isAddressValid = addressInput ? validateAddress(addressInput) : false;
    const areRatingsValid = ratingInputs.every(input => input && validateRating(input));
    
    const isFormValid = isNameValid && isSurnameValid && isEmailValid && 
                       isPhoneValid && isAddressValid && areRatingsValid;
    
    submitBtn.disabled = !isFormValid;
    
    return isFormValid;
  }
  
  // Initialize form validation
  validateForm();
});

// ===========================================
// 5. EMERGENCY FIX - HIDE LOADER
// ===========================================

(function emergencyHide() {
  console.log("Emergency hide function running...");
  
  var checkLoader = setInterval(function() {
    var loader = document.getElementById('simplePageLoader');
    if (loader) {
      loader.style.cssText = 'opacity: 0 !important; visibility: hidden !important; display: none !important;';
      
      setTimeout(function() {
        if (loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
        clearInterval(checkLoader);
      }, 100);
    }
  }, 100);
  
  setTimeout(function() {
    clearInterval(checkLoader);
  }, 5000);
})();

// Memory Game Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Game configuration
    const gameConfig = {
        easy: { rows: 3, cols: 4, totalPairs: 6 },
        hard: { rows: 4, cols: 6, totalPairs: 12 }
    };

    // Card data - Font Awesome icons
    const cardData = [
        'fas fa-heart', 'fas fa-star', 'fas fa-moon', 
        'fas fa-sun', 'fas fa-cloud', 'fas fa-bolt',
        'fas fa-gem', 'fas fa-rocket', 'fas fa-crown',
        'fas fa-tree', 'fas fa-flag', 'fas fa-key'
    ];

    // Game state
    let gameState = {
        difficulty: 'easy',
        cards: [],
        flippedCards: [],
        matchedPairs: 0,
        moves: 0,
        gameStarted: false,
        gameOver: false,
        timer: 0,
        timerInterval: null,
        bestScores: {
            easy: localStorage.getItem('memoryBestEasy') || 0,
            hard: localStorage.getItem('memoryBestHard') || 0
        }
    };

    // DOM Elements
    const gameBoard = document.getElementById('game-board');
    const difficultySelect = document.getElementById('difficulty');
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const movesDisplay = document.getElementById('moves');
    const matchesDisplay = document.getElementById('matches');
    const timerDisplay = document.getElementById('timer');
    const winMessage = document.getElementById('win-message');
    const bestEasyDisplay = document.getElementById('best-easy');
    const bestHardDisplay = document.getElementById('best-hard');

    // Initialize best scores display
    updateBestScoresDisplay();

    // Initialize game
    initGame();

    // Event Listeners
    difficultySelect.addEventListener('change', function() {
        gameState.difficulty = this.value;
        initGame();
    });

    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', initGame);

    // Initialize game board
    function initGame() {
        stopTimer();
        resetGameState();
        createCards();
        renderBoard();
        updateStatsDisplay();
        winMessage.classList.remove('show');
    }

    // Start game
    function startGame() {
        if (gameState.gameStarted) return;
        
        gameState.gameStarted = true;
        startTimer();
        
        // Enable all cards
        document.querySelectorAll('.memory-card').forEach(card => {
            card.style.pointerEvents = 'auto';
        });
    }

    // Create cards based on difficulty
    function createCards() {
        const config = gameConfig[gameState.difficulty];
        const pairsNeeded = config.totalPairs;
        
        // Get required number of unique cards
        const selectedCards = cardData.slice(0, pairsNeeded);
        
        // Create pairs
        let cards = [];
        selectedCards.forEach(icon => {
            cards.push({ icon, matched: false });
            cards.push({ icon, matched: false });
        });
        
        // Shuffle cards
        gameState.cards = shuffleArray(cards);
    }

    // Render game board
    function renderBoard() {
        const config = gameConfig[gameState.difficulty];
        gameBoard.innerHTML = '';
        gameBoard.className = 'game-board ' + gameState.difficulty;
        
        gameState.cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'memory-card';
            cardElement.dataset.index = index;
            
            cardElement.innerHTML = `
                <div class="memory-card-inner">
                    <div class="memory-card-front">?</div>
                    <div class="memory-card-back">
                        <i class="${card.icon}"></i>
                    </div>
                </div>
            `;
            
            if (card.matched) {
                cardElement.classList.add('matched');
            }
            
            cardElement.addEventListener('click', () => flipCard(index));
            cardElement.style.pointerEvents = gameState.gameStarted ? 'auto' : 'none';
            
            gameBoard.appendChild(cardElement);
        });
    }

    // Flip card
    function flipCard(index) {
        if (!gameState.gameStarted || gameState.gameOver) return;
        
        const card = gameState.cards[index];
        const cardElement = document.querySelector(`.memory-card[data-index="${index}"]`);
        
        // Check if card can be flipped
        if (card.matched || cardElement.classList.contains('flipped') || 
            gameState.flippedCards.length >= 2) {
            return;
        }
        
        // Flip card
        cardElement.classList.add('flipped');
        gameState.flippedCards.push({ index, card });
        
        // Check for match when two cards are flipped
        if (gameState.flippedCards.length === 2) {
            gameState.moves++;
            updateStatsDisplay();
            
            const card1 = gameState.flippedCards[0];
            const card2 = gameState.flippedCards[1];
            
            if (card1.card.icon === card2.card.icon) {
                // Match found
                gameState.cards[card1.index].matched = true;
                gameState.cards[card2.index].matched = true;
                gameState.matchedPairs++;
                
                document.querySelector(`.memory-card[data-index="${card1.index}"]`).classList.add('matched');
                document.querySelector(`.memory-card[data-index="${card2.index}"]`).classList.add('matched');
                
                gameState.flippedCards = [];
                
                // Check for win
                if (gameState.matchedPairs === gameConfig[gameState.difficulty].totalPairs) {
                    gameWon();
                }
            } else {
                // No match - flip back after delay
                setTimeout(() => {
                    document.querySelector(`.memory-card[data-index="${card1.index}"]`).classList.remove('flipped');
                    document.querySelector(`.memory-card[data-index="${card2.index}"]`).classList.remove('flipped');
                    gameState.flippedCards = [];
                }, 1000);
            }
        }
    }

    // Game won
    function gameWon() {
        gameState.gameOver = true;
        stopTimer();
        
        // Update best score if applicable
        updateBestScore();
        
        // Show win message
        const timeSpent = formatTime(gameState.timer);
        winMessage.innerHTML = `
            <h3>🎉 Congratulations! 🎉</h3>
            <p>You won in ${gameState.moves} moves and ${timeSpent}!</p>
            <p>Difficulty: ${gameState.difficulty.charAt(0).toUpperCase() + gameState.difficulty.slice(1)}</p>
        `;
        winMessage.classList.add('show');
    }

    // Update best score
    function updateBestScore() {
        const currentBest = gameState.bestScores[gameState.difficulty];
        
        if (currentBest === 0 || gameState.moves < currentBest) {
            gameState.bestScores[gameState.difficulty] = gameState.moves;
            localStorage.setItem(`memoryBest${gameState.difficulty.charAt(0).toUpperCase() + gameState.difficulty.slice(1)}`, gameState.moves);
            updateBestScoresDisplay();
        }
    }

    // Update best scores display
    function updateBestScoresDisplay() {
        bestEasyDisplay.textContent = gameState.bestScores.easy 
            ? `${gameState.bestScores.easy} moves` 
            : 'No score yet';
            
        bestHardDisplay.textContent = gameState.bestScores.hard 
            ? `${gameState.bestScores.hard} moves` 
            : 'No score yet';
    }

    // Update stats display
    function updateStatsDisplay() {
        movesDisplay.textContent = gameState.moves;
        matchesDisplay.textContent = `${gameState.matchedPairs}/${gameConfig[gameState.difficulty].totalPairs}`;
    }

    // Timer functions
    function startTimer() {
        gameState.timer = 0;
        updateTimerDisplay();
        
        gameState.timerInterval = setInterval(() => {
            gameState.timer++;
            updateTimerDisplay();
        }, 1000);
    }

    function stopTimer() {
        if (gameState.timerInterval) {
            clearInterval(gameState.timerInterval);
            gameState.timerInterval = null;
        }
    }

    function updateTimerDisplay() {
        timerDisplay.textContent = formatTime(gameState.timer);
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    }

    // Reset game state
    function resetGameState() {
        gameState.flippedCards = [];
        gameState.matchedPairs = 0;
        gameState.moves = 0;
        gameState.gameStarted = false;
        gameState.gameOver = false;
        gameState.timer = 0;
    }

    // Utility function to shuffle array
    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
});

// ===========================================
// ENHANCED HOVER EFFECTS & INTERACTIVE ELEMENTS
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
  console.log("Setting up enhanced hover effects and interactive elements...");
  
  // 1. PORTFOLIO ITEMS ENHANCED HOVER EFFECTS
  const portfolioItems = document.querySelectorAll('.portfolio-item, .service-item, .card');
  
  portfolioItems.forEach(item => {
    // Add initial transition
    item.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
      this.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)';
      
      // Add border glow effect
      this.style.border = '2px solid rgba(102, 126, 234, 0.3)';
      
      // Highlight title if exists
      const title = this.querySelector('h3, h4, .card-title');
      if (title) {
        title.style.color = '#667eea';
        title.style.transition = 'color 0.3s ease';
      }
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = '';
      this.style.border = '';
      
      const title = this.querySelector('h3, h4, .card-title');
      if (title) {
        title.style.color = '';
      }
    });
  });
  
  // 2. SKILL BARS ANIMATION ON SCROLL
  const skillBars = document.querySelectorAll('.progress-bar');
  
  function animateSkillBars() {
    skillBars.forEach(bar => {
      const width = bar.style.width || bar.getAttribute('aria-valuenow') + '%';
      bar.style.width = '0%';
      
      setTimeout(() => {
        bar.style.width = width;
        bar.style.transition = 'width 1.5s ease-in-out';
      }, 300);
    });
  }
  
  // Animate skill bars when they come into view
  const observerOptions = {
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe skill section
  const skillsSection = document.querySelector('#skills');
  if (skillsSection) {
    observer.observe(skillsSection);
  }
  
  // 3. INTERACTIVE NAVIGATION INDICATOR
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#navmenu a');
  
  function updateNavigationIndicator() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
        link.style.color = '#667eea';
        link.style.fontWeight = 'bold';
      } else {
        link.style.color = '';
        link.style.fontWeight = '';
      }
    });
  }
  
  window.addEventListener('scroll', updateNavigationIndicator);
  
  // 4. TYPING ANIMATION EFFECT (For hero section)
  const heroText = document.querySelector('.hero-title, .display-4');
  if (heroText && heroText.textContent) {
    const originalText = heroText.textContent;
    heroText.textContent = '';
    let i = 0;
    
    function typeWriter() {
      if (i < originalText.length) {
        heroText.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    }
    
    // Start typing animation when hero section is in view
    const heroObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        typeWriter();
        heroObserver.unobserve(entries[0].target);
      }
    });
    
    heroObserver.observe(heroText);
  }
  
  // 5. PARALLAX SCROLLING EFFECT
  const parallaxElements = document.querySelectorAll('.parallax, .bg-image');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = element.getAttribute('data-speed') || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
  
  // 6. INTERACTIVE TIMELINE (For experience/education)
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(50px)';
    item.style.transition = 'all 0.6s ease';
    
    // Animate on scroll
    const itemObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateX(0)';
        }, index * 200); // Staggered animation
        itemObserver.unobserve(entries[0].target);
      }
    });
    
    itemObserver.observe(item);
    
    // Add hover effect
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateX(10px) scale(1.02)';
      this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateX(0) scale(1)';
      this.style.boxShadow = '';
    });
  });
  
  // 7. COUNTER ANIMATION (For stats/numbers)
  const counters = document.querySelectorAll('.counter');
  
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const increment = target / 200;
    let current = 0;
    
    function updateCounter() {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current);
        setTimeout(updateCounter, 10);
      } else {
        counter.textContent = target;
      }
    }
    
    // Start counter when in view
    const counterObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        updateCounter();
        counterObserver.unobserve(entries[0].target);
      }
    });
    
    counterObserver.observe(counter);
  });
  
  // 8. IMAGE ZOOM ON HOVER
  const zoomImages = document.querySelectorAll('.img-zoom');
  
  zoomImages.forEach(img => {
    img.style.transition = 'transform 0.5s ease';
    
    img.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1)';
    });
    
    img.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
  
  // 9. DARK/LIGHT MODE TOGGLE
  const themeToggle = document.createElement('button');
  themeToggle.id = 'themeToggle';
  themeToggle.innerHTML = '🌙';
  themeToggle.title = 'Toggle Dark Mode';
  themeToggle.setAttribute('aria-label', 'Toggle theme');
  
  Object.assign(themeToggle.style, {
    position: 'fixed',
    bottom: '90px',
    right: '30px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    zIndex: '999',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease'
  });
  
  // Load saved theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '☀️';
  }
  
  // Add to body
  document.body.appendChild(themeToggle);
  
  // Toggle theme
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
      themeToggle.innerHTML = '☀️';
      themeToggle.style.backgroundColor = '#333';
    } else {
      localStorage.setItem('theme', 'light');
      themeToggle.innerHTML = '🌙';
      themeToggle.style.backgroundColor = '#667eea';
    }
  });
  
  // Hover effect for theme toggle
  themeToggle.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1) rotate(15deg)';
    this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
  });
  
  themeToggle.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1) rotate(0)';
    this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
  });
  
  // 10. INTERACTIVE PROGRESS TRACKER (For skills)
  const progressItems = document.querySelectorAll('.progress');
  
  progressItems.forEach(progress => {
    const bar = progress.querySelector('.progress-bar');
    const percentage = bar.getAttribute('aria-valuenow');
    
    progress.addEventListener('mouseenter', function() {
      // Show percentage tooltip
      const tooltip = document.createElement('div');
      tooltip.className = 'progress-tooltip';
      tooltip.textContent = `${percentage}%`;
      tooltip.style.cssText = `
        position: absolute;
        top: -35px;
        left: 50%;
        transform: translateX(-50%);
        background: #667eea;
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 12px;
        white-space: nowrap;
        z-index: 100;
      `;
      
      // Arrow
      const arrow = document.createElement('div');
      arrow.style.cssText = `
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 5px solid transparent;
        border-top-color: #667eea;
      `;
      
      tooltip.appendChild(arrow);
      this.appendChild(tooltip);
      
      // Pulse animation for bar
      bar.style.animation = 'pulse 1s infinite';
    });
    
    progress.addEventListener('mouseleave', function() {
      const tooltip = this.querySelector('.progress-tooltip');
      if (tooltip) {
        tooltip.remove();
      }
      bar.style.animation = '';
    });
  });
  
  // 11. ENHANCED BUTTON EFFECTS
  const allButtons = document.querySelectorAll('.btn:not(.memory-game-btn)');
  
  allButtons.forEach(btn => {
    // Add ripple effect
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        top: ${y}px;
        left: ${x}px;
        pointer-events: none;
      `;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
    
    // Enhanced hover
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px) scale(1.05)';
      this.style.boxShadow = '0 15px 30px rgba(102, 126, 234, 0.3)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = '';
    });
  });
  
  // 12. INTERACTIVE FILTER FOR PORTFOLIO (if exists)
  const filterButtons = document.querySelectorAll('.filter-btn, .portfolio-filter button');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      this.style.backgroundColor = '#667eea';
      this.style.color = 'white';
      
      // Add click animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });
  
  // 13. LAZY LOAD IMAGES WITH FADE IN
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
          img.style.opacity = '1';
        }, 100);
        
        imageObserver.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => imageObserver.observe(img));
  
  // 14. SCROLL PROGRESS INDICATOR
  const progressIndicator = document.createElement('div');
  progressIndicator.id = 'scrollProgress';
  progressIndicator.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    width: 0%;
    z-index: 9999;
    transition: width 0.1s ease;
  `;
  
  document.body.appendChild(progressIndicator);
  
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressIndicator.style.width = scrolled + '%';
  });
  
  // 15. ADD CSS ANIMATIONS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.7; }
      100% { opacity: 1; }
    }
    
    .dark-mode {
      background-color: #1a1a1a;
      color: #f0f0f0;
    }
    
    .dark-mode .card,
    .dark-mode .portfolio-item,
    .dark-mode .service-item {
      background-color: #2d2d2d;
      color: #f0f0f0;
    }
    
    .dark-mode .btn-light {
      background-color: #444;
      color: #f0f0f0;
    }
    
    .active-nav {
      color: #667eea !important;
      font-weight: bold !important;
    }
  `;
  
  document.head.appendChild(style);
  
  console.log("Enhanced hover effects and interactive elements setup complete!");
});

// ===========================================
// FIXED BACK TO TOP BUTTON ENHANCEMENT
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
  const backToTopBtn = document.getElementById('backToTop') || document.getElementById('scroll-top');
  
  if (backToTopBtn) {
    // Enhanced scroll detection
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
            backToTopBtn.style.transform = 'translateY(0)';
          } else {
            backToTopBtn.classList.remove('show');
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
            backToTopBtn.style.transform = 'translateY(20px)';
          }
          ticking = false;
        });
        ticking = true;
      }
    });
    
    // Enhanced click with animation
    backToTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Add click animation
      this.style.transform = 'scale(0.9)';
      setTimeout(() => {
        this.style.transform = '';
      }, 200);
      
      // Smooth scroll
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Enhanced hover effects
    backToTopBtn.addEventListener('mouseenter', function() {
      if (this.classList.contains('show')) {
        this.style.transform = 'translateY(-5px) rotate(360deg)';
        this.style.transition = 'all 0.5s ease';
        this.style.boxShadow = '0 15px 30px rgba(102, 126, 234, 0.4)';
      }
    });
    
    backToTopBtn.addEventListener('mouseleave', function() {
      if (this.classList.contains('show')) {
        this.style.transform = 'translateY(0) rotate(0)';
        this.style.boxShadow = '';
      }
    });
    
    // Check initial state
    setTimeout(() => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
      }
    }, 1000);
  }
});

// ===========================================
// ENHANCED NAVIGATION HOVER EFFECTS
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
  console.log("Setting up enhanced navigation hover effects...");
  
  // 1. ENHANCED NAVIGATION LINKS HOVER EFFECTS
  const navLinks = document.querySelectorAll('#navmenu a, .navbar-nav a, .nav-link, .nav-item a');
  
  navLinks.forEach(link => {
    // Skip if it's a dropdown toggle
    if (link.classList.contains('dropdown-toggle')) return;
    
    // Add initial styles
    link.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    link.style.position = 'relative';
    link.style.overflow = 'hidden';
    
    // Create underline element
    const underline = document.createElement('span');
    underline.className = 'nav-underline';
    underline.style.cssText = `
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #667eea, #764ba2);
      transition: width 0.3s ease;
      border-radius: 2px;
    `;
    
    // Add underline to link
    link.appendChild(underline);
    
    // Create glow effect element
    const glow = document.createElement('span');
    glow.className = 'nav-glow';
    glow.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      background: radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.4s ease;
      z-index: -1;
    `;
    
    link.appendChild(glow);
    
    // Hover effects
    link.addEventListener('mouseenter', function(e) {
      // Scale and color change
      this.style.transform = 'translateY(-2px) scale(1.05)';
      this.style.color = '#667eea';
      
      // Underline animation
      const underline = this.querySelector('.nav-underline');
      underline.style.width = '100%';
      
      // Glow animation
      const glow = this.querySelector('.nav-glow');
      glow.style.width = '150px';
      glow.style.height = '150px';
      glow.style.opacity = '1';
      
      // Add text shadow for emphasis
      this.style.textShadow = '0 2px 10px rgba(102, 126, 234, 0.3)';
      
      // Add subtle background for desktop nav
      if (window.innerWidth > 768) {
        this.style.backgroundColor = 'rgba(102, 126, 234, 0.1)';
        this.style.padding = '8px 15px';
        this.style.borderRadius = '25px';
      }
    });
    
    link.addEventListener('mouseleave', function() {
      // Reset transform and color
      this.style.transform = 'translateY(0) scale(1)';
      this.style.color = '';
      this.style.textShadow = '';
      
      // Reset underline
      const underline = this.querySelector('.nav-underline');
      underline.style.width = '0';
      
      // Reset glow
      const glow = this.querySelector('.nav-glow');
      glow.style.width = '0';
      glow.style.height = '0';
      glow.style.opacity = '0';
      
      // Reset background
      this.style.backgroundColor = '';
      this.style.padding = '';
    });
    
    // Click effect
    link.addEventListener('mousedown', function() {
      this.style.transform = 'translateY(1px) scale(0.98)';
    });
    
    link.addEventListener('mouseup', function() {
      this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    // Touch device adaptation
    link.addEventListener('touchstart', function() {
      this.classList.add('nav-touch-active');
      this.style.transform = 'scale(0.95)';
    });
    
    link.addEventListener('touchend', function() {
      this.classList.remove('nav-touch-active');
      this.style.transform = '';
    });
  });
  
  // 2. DROPDOWN MENU ENHANCEMENTS
  const dropdownMenus = document.querySelectorAll('.dropdown-menu');
  
  dropdownMenus.forEach(menu => {
    menu.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    menu.style.transform = 'translateY(-10px) scale(0.95)';
    menu.style.opacity = '0';
    menu.style.visibility = 'hidden';
    menu.style.display = 'block';
    
    // Show/hide with animation
    const parent = menu.parentElement;
    
    parent.addEventListener('mouseenter', function() {
      menu.style.transform = 'translateY(0) scale(1)';
      menu.style.opacity = '1';
      menu.style.visibility = 'visible';
      menu.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
    });
    
    parent.addEventListener('mouseleave', function() {
      menu.style.transform = 'translateY(-10px) scale(0.95)';
      menu.style.opacity = '0';
      menu.style.visibility = 'hidden';
      menu.style.boxShadow = '';
    });
    
    // Dropdown item hover effects
    const dropdownItems = menu.querySelectorAll('.dropdown-item');
    
    dropdownItems.forEach(item => {
      item.style.transition = 'all 0.3s ease';
      item.style.position = 'relative';
      item.style.overflow = 'hidden';
      
      // Add background slide effect
      const slideBg = document.createElement('span');
      slideBg.className = 'dropdown-slide-bg';
      slideBg.style.cssText = `
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
        transition: left 0.3s ease;
        z-index: -1;
      `;
      
      item.appendChild(slideBg);
      
      item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px)';
        this.style.color = '#667eea';
        
        const slideBg = this.querySelector('.dropdown-slide-bg');
        slideBg.style.left = '0';
      });
      
      item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
        this.style.color = '';
        
        const slideBg = this.querySelector('.dropdown-slide-bg');
        slideBg.style.left = '-100%';
      });
    });
  });
  
  // 3. MOBILE MENU TOGGLE ENHANCEMENT
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  
  if (mobileToggle) {
    mobileToggle.style.transition = 'all 0.3s ease';
    
    mobileToggle.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.2) rotate(90deg)';
      this.style.color = '#667eea';
      this.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.3)';
    });
    
    mobileToggle.addEventListener('mouseleave', function() {
      if (!document.querySelector('#navmenu.active')) {
        this.style.transform = '';
        this.style.color = '';
        this.style.boxShadow = '';
      }
    });
  }
});

// ===========================================
// ENHANCED EXPERIENCE SECTION INTERACTIVITY
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
  console.log("Setting up enhanced experience section interactivity...");
  
  // 1. EXPERIENCE TIMELINE ITEMS
  const experienceItems = document.querySelectorAll('.timeline-item, .experience-item, .work-item, .education-item');
  
  experienceItems.forEach((item, index) => {
    // Add initial styles
    item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    item.style.position = 'relative';
    item.style.overflow = 'hidden';
    
    // Create gradient border effect
    item.style.border = '2px solid transparent';
    item.style.background = 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #667eea, #764ba2) border-box';
    item.style.borderRadius = '15px';
    
    // Add shadow depth
    item.style.boxShadow = '0 5px 15px rgba(0,0,0,0.08)';
    
    // Create hover overlay
    const hoverOverlay = document.createElement('div');
    hoverOverlay.className = 'experience-hover-overlay';
    hoverOverlay.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 1;
      pointer-events: none;
    `;
    
    item.appendChild(hoverOverlay);
    
    // Create glow effect
    const glowEffect = document.createElement('div');
    glowEffect.className = 'experience-glow';
    glowEffect.style.cssText = `
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(45deg, #667eea, #764ba2, #667eea);
      border-radius: 17px;
      opacity: 0;
      filter: blur(10px);
      transition: opacity 0.4s ease;
      z-index: -1;
    `;
    
    item.parentElement.insertBefore(glowEffect, item);
    
    // Create floating element effect
    const floatElement = document.createElement('div');
    floatElement.className = 'experience-float';
    floatElement.style.cssText = `
      position: absolute;
      top: 10px;
      right: 10px;
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      transform: scale(0);
      transition: transform 0.3s ease;
      z-index: 2;
    `;
    
    // Add number or icon
    floatElement.innerHTML = `<i class="fas fa-briefcase"></i>`;
    item.appendChild(floatElement);
    
    // Hover effects
    item.addEventListener('mouseenter', function(e) {
      // Main item effects
      this.style.transform = 'translateY(-10px) scale(1.02)';
      this.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.15)';
      this.style.borderColor = '#667eea';
      
      // Show overlay
      const overlay = this.querySelector('.experience-hover-overlay');
      overlay.style.opacity = '1';
      
      // Show glow effect
      const glow = this.previousElementSibling;
      if (glow && glow.classList.contains('experience-glow')) {
        glow.style.opacity = '0.5';
      }
      
      // Show float element
      const float = this.querySelector('.experience-float');
      float.style.transform = 'scale(1) rotate(360deg)';
      
      // Highlight title
      const title = this.querySelector('h3, h4, .experience-title');
      if (title) {
        title.style.color = '#667eea';
        title.style.transform = 'translateX(10px)';
        title.style.transition = 'all 0.3s ease';
      }
      
      // Highlight date
      const date = this.querySelector('.date, .time-period, .experience-date');
      if (date) {
        date.style.color = '#764ba2';
        date.style.fontWeight = 'bold';
      }
      
      // Animate description lines
      const descriptions = this.querySelectorAll('p, li, .experience-description');
      descriptions.forEach((desc, i) => {
        desc.style.transform = 'translateX(5px)';
        desc.style.transition = `transform 0.3s ease ${i * 0.1}s`;
      });
      
      // Add pulse animation to company/role
      const company = this.querySelector('.company, .role, .institution');
      if (company) {
        company.style.animation = 'pulse 2s infinite';
      }
    });
    
    item.addEventListener('mouseleave', function() {
      // Reset main item effects
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.08)';
      this.style.borderColor = 'transparent';
      
      // Hide overlay
      const overlay = this.querySelector('.experience-hover-overlay');
      overlay.style.opacity = '0';
      
      // Hide glow effect
      const glow = this.previousElementSibling;
      if (glow && glow.classList.contains('experience-glow')) {
        glow.style.opacity = '0';
      }
      
      // Hide float element
      const float = this.querySelector('.experience-float');
      float.style.transform = 'scale(0) rotate(0)';
      
      // Reset title
      const title = this.querySelector('h3, h4, .experience-title');
      if (title) {
        title.style.color = '';
        title.style.transform = '';
      }
      
      // Reset date
      const date = this.querySelector('.date, .time-period, .experience-date');
      if (date) {
        date.style.color = '';
        date.style.fontWeight = '';
      }
      
      // Reset description lines
      const descriptions = this.querySelectorAll('p, li, .experience-description');
      descriptions.forEach(desc => {
        desc.style.transform = '';
      });
      
      // Remove pulse animation
      const company = this.querySelector('.company, .role, .institution');
      if (company) {
        company.style.animation = '';
      }
    });
    
    // Click effect
    item.addEventListener('mousedown', function() {
      this.style.transform = 'translateY(-5px) scale(0.98)';
    });
    
    item.addEventListener('mouseup', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
  });
  
  // 2. EXPERIENCE TIMELINE LINES/CONNECTORS
  const timelineLines = document.querySelectorAll('.timeline::before, .timeline-line, .connector, .vertical-line');
  
  timelineLines.forEach(line => {
    // Add initial styles
    line.style.transition = 'all 0.5s ease';
    line.style.position = 'relative';
    
    // Create animated dots along the line
    if (line.classList.contains('timeline::before') || line.style.height) {
      // For vertical timeline lines
      const dotCount = 10;
      for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'timeline-dot';
        dot.style.cssText = `
          position: absolute;
          left: 50%;
          top: ${(i * 100) / (dotCount - 1)}%;
          width: 8px;
          height: 8px;
          background: #667eea;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          opacity: 0.3;
          transition: all 0.3s ease;
        `;
        
        line.appendChild(dot);
        
        // Dot hover effect
        dot.addEventListener('mouseenter', function() {
          this.style.width = '15px';
          this.style.height = '15px';
          this.style.opacity = '1';
          this.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
          this.style.boxShadow = '0 0 15px rgba(102, 126, 234, 0.5)';
        });
        
        dot.addEventListener('mouseleave', function() {
          this.style.width = '8px';
          this.style.height = '8px';
          this.style.opacity = '0.3';
          this.style.background = '#667eea';
          this.style.boxShadow = 'none';
        });
      }
    }
    
    // Line hover effects
    line.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1)';
      
      // Change line color with gradient
      if (this.style.backgroundColor) {
        this.style.background = 'linear-gradient(180deg, #667eea, #764ba2)';
        this.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.4)';
      }
      
      // Animate dots
      const dots = this.querySelectorAll('.timeline-dot');
      dots.forEach((dot, i) => {
        setTimeout(() => {
          dot.style.transform = 'translate(-50%, -50%) scale(1.5)';
          dot.style.opacity = '1';
          setTimeout(() => {
            dot.style.transform = 'translate(-50%, -50%) scale(1)';
          }, 300);
        }, i * 100);
      });
    });
    
    line.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      
      if (this.style.background && this.style.background.includes('gradient')) {
        this.style.background = '';
      }
      
      // Reset dots
      const dots = this.querySelectorAll('.timeline-dot');
      dots.forEach(dot => {
        dot.style.transform = 'translate(-50%, -50%) scale(1)';
        dot.style.opacity = '0.3';
      });
    });
  });
  
  // 3. EXPERIENCE BADGES/TAGS
  const experienceBadges = document.querySelectorAll('.badge, .tag, .skill-tag, .tech-stack');
  
  experienceBadges.forEach(badge => {
    badge.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    badge.style.cursor = 'pointer';
    
    // Add initial 3D effect
    badge.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    badge.style.transform = 'translateZ(0)';
    
    badge.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px) scale(1.1) translateZ(10px)';
      this.style.boxShadow = '0 15px 30px rgba(102, 126, 234, 0.3)';
      this.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
      this.style.color = 'white';
      
      // Add floating animation
      this.style.animation = 'float 3s ease-in-out infinite';
      
      // Add text pop effect
      const text = this.textContent;
      this.innerHTML = '';
      text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        span.style.transition = 'transform 0.3s ease';
        span.style.transform = 'translateY(0)';
        
        setTimeout(() => {
          span.style.transform = 'translateY(-5px)';
          setTimeout(() => {
            span.style.transform = 'translateY(0)';
          }, 150);
        }, i * 50);
        
        this.appendChild(span);
      });
    });
    
    badge.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1) translateZ(0)';
      this.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
      this.style.background = '';
      this.style.color = '';
      this.style.animation = '';
      
      // Restore original text
      const spans = this.querySelectorAll('span');
      if (spans.length > 0) {
        this.textContent = Array.from(spans).map(span => span.textContent).join('');
      }
    });
    
    // Click effect
    badge.addEventListener('mousedown', function() {
      this.style.transform = 'translateY(-2px) scale(0.95) translateZ(5px)';
    });
    
    badge.addEventListener('mouseup', function() {
      this.style.transform = 'translateY(-5px) scale(1.1) translateZ(10px)';
    });
  });
  
  // 4. EXPERIENCE DETAILS EXPAND/COLLAPSE
  const experienceDetails = document.querySelectorAll('.experience-details, .job-description');
  
  experienceDetails.forEach(details => {
    const parentItem = details.closest('.timeline-item, .experience-item');
    
    if (parentItem && details.textContent.length > 100) {
      // Create "Read More" button
      const readMoreBtn = document.createElement('button');
      readMoreBtn.className = 'read-more-btn';
      readMoreBtn.innerHTML = '<i class="fas fa-chevron-down"></i> Read More';
      readMoreBtn.style.cssText = `
        margin-top: 10px;
        padding: 5px 15px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        font-size: 12px;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 5px;
      `;
      
      // Initially hide some content
      details.style.maxHeight = '100px';
      details.style.overflow = 'hidden';
      details.style.position = 'relative';
      
      // Add gradient fade at bottom
      const fadeOverlay = document.createElement('div');
      fadeOverlay.className = 'details-fade';
      fadeOverlay.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 40px;
        background: linear-gradient(transparent, white);
        pointer-events: none;
      `;
      
      details.appendChild(fadeOverlay);
      details.parentElement.insertBefore(readMoreBtn, details.nextSibling);
      
      // Toggle expand/collapse
      readMoreBtn.addEventListener('click', function() {
        if (details.style.maxHeight === '100px') {
          details.style.maxHeight = 'none';
          fadeOverlay.style.display = 'none';
          this.innerHTML = '<i class="fas fa-chevron-up"></i> Read Less';
          this.style.transform = 'rotateX(180deg)';
        } else {
          details.style.maxHeight = '100px';
          fadeOverlay.style.display = 'block';
          this.innerHTML = '<i class="fas fa-chevron-down"></i> Read More';
          this.style.transform = 'rotateX(0)';
        }
      });
      
      // Hover effect for button
      readMoreBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.3)';
      });
      
      readMoreBtn.addEventListener('mouseleave', function() {
        if (!details.style.maxHeight || details.style.maxHeight === '100px') {
          this.style.transform = '';
        }
        this.style.boxShadow = '';
      });
    }
  });
  
  // 5. ADD CSS ANIMATIONS FOR EXPERIENCE SECTION
  const experienceStyles = document.createElement('style');
  experienceStyles.textContent = `
    @keyframes float {
      0%, 100% {
        transform: translateY(0) scale(1.1) translateZ(10px);
      }
      50% {
        transform: translateY(-10px) scale(1.15) translateZ(15px);
      }
    }
    
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.8;
        transform: scale(1.05);
      }
    }
    
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(-30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    .experience-item:hover .experience-description {
      animation: slideIn 0.5s ease forwards;
    }
    
    .nav-touch-active {
      background-color: rgba(102, 126, 234, 0.1) !important;
      transform: scale(0.95) !important;
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
      .nav-underline {
        display: none;
      }
      
      .experience-item {
        margin: 10px 0;
      }
      
      .experience-float {
        width: 30px !important;
        height: 30px !important;
        font-size: 12px;
      }
    }
    
    /* Print adjustments */
    @media print {
      .experience-hover-overlay,
      .experience-glow,
      .experience-float,
      .read-more-btn,
      .nav-underline,
      .nav-glow {
        display: none !important;
      }
      
      .experience-item {
        box-shadow: none !important;
        border: 1px solid #ddd !important;
      }
    }
  `;
  
  document.head.appendChild(experienceStyles);
  
  console.log("Enhanced experience section interactivity setup complete!");
});

// ===========================================
// COMPREHENSIVE RESPONSIVE DESIGN & INTERACTIVE ELEMENTS
// (Without duplicate theme changer)
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
  console.log("Setting up comprehensive responsive design and interactive elements...");
  
  // 1. RESPONSIVE NAVIGATION ENHANCEMENTS
  function enhanceResponsiveNavigation() {
    const navMenu = document.querySelector('#navmenu');
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    
    if (mobileToggle && navMenu) {
      // Enhanced mobile menu animation
      mobileToggle.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Animate hamburger to X
        this.style.transition = 'transform 0.3s ease';
        if (navMenu.classList.contains('active')) {
          this.style.transform = 'rotate(0deg)';
        } else {
          this.style.transform = 'rotate(90deg)';
        }
        
        // Slide in/out animation for mobile menu
        if (navMenu.classList.contains('active')) {
          navMenu.style.transform = 'translateX(100%)';
          navMenu.style.opacity = '0';
          setTimeout(() => {
            navMenu.classList.remove('active');
          }, 300);
        } else {
          navMenu.classList.add('active');
          setTimeout(() => {
            navMenu.style.transform = 'translateX(0)';
            navMenu.style.opacity = '1';
          }, 10);
        }
      });
      
      // Close menu when clicking outside on mobile
      document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
          if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('active')) {
            mobileToggle.click();
          }
        }
      });
    }
    
    // Responsive navigation styles
    function updateNavStyles() {
      const navLinks = document.querySelectorAll('#navmenu a');
      const isMobile = window.innerWidth <= 768;
      
      navLinks.forEach(link => {
        if (isMobile) {
          link.style.padding = '15px 20px';
          link.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
          link.style.width = '100%';
          link.style.textAlign = 'center';
          link.style.transition = 'all 0.3s ease';
        } else {
          link.style.padding = '';
          link.style.borderBottom = '';
          link.style.width = '';
          link.style.textAlign = '';
        }
      });
    }
    
    window.addEventListener('resize', updateNavStyles);
    updateNavStyles();
  }
  
  // 2. RESPONSIVE HERO SECTION
  function enhanceResponsiveHero() {
    const heroSection = document.querySelector('.hero, #hero, .home');
    
    if (heroSection) {
      // Parallax effect for desktop only
      if (window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
          const scrolled = window.pageYOffset;
          const rate = scrolled * -0.5;
          heroSection.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
      }
      
      // Dynamic font sizes for hero text
      function adjustHeroText() {
        const heroTitles = heroSection.querySelectorAll('h1, h2, .display-4, .hero-title');
        const isMobile = window.innerWidth <= 768;
        
        heroTitles.forEach(title => {
          if (isMobile) {
            title.style.fontSize = '2rem';
            title.style.lineHeight = '1.2';
          } else {
            title.style.fontSize = '';
            title.style.lineHeight = '';
          }
        });
      }
      
      window.addEventListener('resize', adjustHeroText);
      adjustHeroText();
    }
  }
  
  // 3. RESPONSIVE PORTFOLIO GRID
  function enhanceResponsivePortfolio() {
    const portfolioItems = document.querySelectorAll('.portfolio-item, .project-card');
    const portfolioContainer = document.querySelector('.portfolio-container, .projects-grid');
    
    if (portfolioContainer) {
      // Masonry-like layout for desktop, stacked for mobile
      function adjustPortfolioLayout() {
        const isMobile = window.innerWidth <= 768;
        
        portfolioItems.forEach(item => {
          if (isMobile) {
            item.style.marginBottom = '30px';
            item.style.width = '100%';
          } else {
            item.style.marginBottom = '';
            item.style.width = '';
          }
        });
        
        // Add staggered animation for desktop
        if (!isMobile) {
          portfolioItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.style.animation = 'fadeInUp 0.6s ease forwards';
            item.style.opacity = '0';
          });
        }
      }
      
      // Interactive hover effects
      portfolioItems.forEach(item => {
        // Add touch feedback for mobile
        item.addEventListener('touchstart', function() {
          this.style.transform = 'scale(0.98)';
        });
        
        item.addEventListener('touchend', function() {
          this.style.transform = 'scale(1)';
        });
        
        // Enhanced hover for desktop
        if (window.innerWidth > 768) {
          item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03)';
            this.style.boxShadow = '0 30px 60px rgba(0,0,0,0.2)';
            this.style.zIndex = '10';
            
            // Highlight project tech stack
            const techStack = this.querySelector('.tech-stack, .tags');
            if (techStack) {
              techStack.style.transform = 'translateY(0)';
              techStack.style.opacity = '1';
            }
          });
          
          item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
            this.style.zIndex = '';
            
            const techStack = this.querySelector('.tech-stack, .tags');
            if (techStack) {
              techStack.style.transform = '';
              techStack.style.opacity = '';
            }
          });
        }
      });
      
      window.addEventListener('resize', adjustPortfolioLayout);
      adjustPortfolioLayout();
    }
  }
  
  // 4. RESPONSIVE SKILLS SECTION
  function enhanceResponsiveSkills() {
    const skillsSection = document.querySelector('#skills, .skills-section');
    
    if (skillsSection) {
      // Animate skill bars when in viewport
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.progress-bar');
            skillBars.forEach((bar, index) => {
              const width = bar.style.width || bar.getAttribute('aria-valuenow') + '%';
              bar.style.width = '0%';
              
              setTimeout(() => {
                bar.style.width = width;
                bar.style.transition = `width 1.5s ease ${index * 0.2}s`;
                
                // Add percentage counter animation
                const percentage = bar.getAttribute('aria-valuenow');
                const counter = document.createElement('span');
                counter.className = 'skill-percentage';
                counter.textContent = '0%';
                counter.style.cssText = `
                  position: absolute;
                  right: 10px;
                  top: -25px;
                  background: #667eea;
                  color: white;
                  padding: 2px 8px;
                  border-radius: 10px;
                  font-size: 12px;
                  font-weight: bold;
                `;
                
                bar.parentElement.style.position = 'relative';
                bar.parentElement.appendChild(counter);
                
                // Animate counter
                let count = 0;
                const interval = setInterval(() => {
                  if (count >= percentage) {
                    clearInterval(interval);
                  } else {
                    count++;
                    counter.textContent = `${count}%`;
                  }
                }, 1500 / percentage);
              }, 300);
            });
            
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      
      observer.observe(skillsSection);
      
      // Responsive skill layout
      function adjustSkillsLayout() {
        const skillItems = skillsSection.querySelectorAll('.skill-item, .skill-card');
        const isMobile = window.innerWidth <= 768;
        
        skillItems.forEach(item => {
          if (isMobile) {
            item.style.marginBottom = '20px';
            item.style.padding = '15px';
          } else {
            item.style.marginBottom = '';
            item.style.padding = '';
          }
        });
      }
      
      window.addEventListener('resize', adjustSkillsLayout);
      adjustSkillsLayout();
    }
  }
  
  // 5. RESPONSIVE CONTACT FORM
  function enhanceResponsiveContact() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      // Adjust form layout for mobile
      function adjustFormLayout() {
        const formGroups = contactForm.querySelectorAll('.form-group, .mb-3');
        const isMobile = window.innerWidth <= 768;
        
        formGroups.forEach(group => {
          if (isMobile) {
            group.style.marginBottom = '20px';
            
            // Stack labels above inputs
            const label = group.querySelector('label');
            const input = group.querySelector('input, textarea, select');
            
            if (label && input) {
              label.style.display = 'block';
              label.style.marginBottom = '5px';
              label.style.fontWeight = 'bold';
              input.style.width = '100%';
            }
          } else {
            group.style.marginBottom = '';
            
            const label = group.querySelector('label');
            const input = group.querySelector('input, textarea, select');
            
            if (label && input) {
              label.style.display = '';
              label.style.marginBottom = '';
              input.style.width = '';
            }
          }
        });
      }
      
      // Enhanced form interactions
      const formInputs = contactForm.querySelectorAll('input, textarea');
      
      formInputs.forEach(input => {
        // Add floating label effect
        const label = input.previousElementSibling;
        if (label && label.tagName === 'LABEL') {
          input.addEventListener('focus', function() {
            label.style.transform = 'translateY(-25px)';
            label.style.fontSize = '12px';
            label.style.color = '#667eea';
            label.style.transition = 'all 0.3s ease';
          });
          
          input.addEventListener('blur', function() {
            if (!this.value) {
              label.style.transform = '';
              label.style.fontSize = '';
              label.style.color = '';
            }
          });
        }
        
        // Character counter for textarea
        if (input.tagName === 'TEXTAREA') {
          const charCount = document.createElement('div');
          charCount.className = 'char-count';
          charCount.style.cssText = `
            text-align: right;
            font-size: 12px;
            color: #666;
            margin-top: 5px;
          `;
          charCount.textContent = `0/${input.maxLength || '∞'}`;
          
          input.parentElement.appendChild(charCount);
          
          input.addEventListener('input', function() {
            const currentLength = this.value.length;
            const maxLength = this.maxLength || '∞';
            charCount.textContent = `${currentLength}/${maxLength}`;
            
            // Change color based on length
            if (maxLength !== '∞' && currentLength > maxLength * 0.8) {
              charCount.style.color = currentLength >= maxLength ? '#dc3545' : '#ffc107';
            }
          });
        }
      });
      
      // // Submit button animation
      // const submitBtn = contactForm.querySelector('button[type="submit"]');
      // if (submitBtn) {
      //   submitBtn.addEventListener('click', function() {
      //     if (!contactForm.checkValidity()) return;
          
      //     // Loading animation
      //     const originalText = this.innerHTML;
      //     this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      //     this.disabled = true;
          
      //     // Simulate sending (replace with actual AJAX)
      //     setTimeout(() => {
      //       this.innerHTML = '<i class="fas fa-check"></i> Sent!';
      //       this.style.background = '#28a745';
            
      //       setTimeout(() => {
      //         this.innerHTML = originalText;
      //         this.disabled = false;
      //         this.style.background = '';
      //       }, 2000);
      //     }, 1500);
      //   });
      // }
      
      window.addEventListener('resize', adjustFormLayout);
      adjustFormLayout();
    }
  }
  
  // 6. RESPONSIVE MEMORY GAME
  function enhanceResponsiveMemoryGame() {
    const gameBoard = document.getElementById('game-board');
    
    if (gameBoard) {
      function adjustGameBoard() {
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth <= 1024;
        
        if (isMobile) {
          // Smaller cards for mobile
          document.querySelectorAll('.memory-card').forEach(card => {
            card.style.width = '60px';
            card.style.height = '80px';
            card.style.fontSize = '1.5em';
          });
          
          // Adjust game controls
          const gameControls = document.querySelector('.game-controls');
          if (gameControls) {
            gameControls.style.flexDirection = 'column';
            gameControls.style.gap = '10px';
          }
        } else if (isTablet) {
          // Medium cards for tablet
          document.querySelectorAll('.memory-card').forEach(card => {
            card.style.width = '70px';
            card.style.height = '90px';
          });
        } else {
          // Original size for desktop
          document.querySelectorAll('.memory-card').forEach(card => {
            card.style.width = '80px';
            card.style.height = '100px';
          });
          
          const gameControls = document.querySelector('.game-controls');
          if (gameControls) {
            gameControls.style.flexDirection = '';
            gameControls.style.gap = '';
          }
        }
      }
      
      // Touch swipe support for mobile game
      let touchStartX = 0;
      let touchStartY = 0;
      
      gameBoard.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      });
      
      gameBoard.addEventListener('touchend', function(e) {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Swipe detection (optional for future features)
        if (Math.abs(diffX) > 50 || Math.abs(diffY) > 50) {
          // Could add swipe gestures for game controls
        }
      });
      
      window.addEventListener('resize', adjustGameBoard);
      adjustGameBoard();
    }
  }
  
  // 7. RESPONSIVE TYPOGRAPHY
  function enhanceResponsiveTypography() {
    function adjustTypography() {
      const isMobile = window.innerWidth <= 768;
      const isTablet = window.innerWidth <= 1024;
      
      // Adjust heading sizes
      const headings = {
        'h1': isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
        'h2': isMobile ? '1.75rem' : isTablet ? '2rem' : '2.5rem',
        'h3': isMobile ? '1.5rem' : isTablet ? '1.75rem' : '2rem',
        'h4': isMobile ? '1.25rem' : isTablet ? '1.5rem' : '1.75rem',
        'p': isMobile ? '1rem' : '1.1rem',
        '.lead': isMobile ? '1.1rem' : '1.25rem'
      };
      
      Object.entries(headings).forEach(([selector, size]) => {
        document.querySelectorAll(selector).forEach(element => {
          element.style.fontSize = size;
          element.style.lineHeight = '1.4';
        });
      });
      
      // Adjust container padding
      const containers = document.querySelectorAll('.container, .section');
      containers.forEach(container => {
        if (isMobile) {
          container.style.paddingLeft = '20px';
          container.style.paddingRight = '20px';
        } else if (isTablet) {
          container.style.paddingLeft = '40px';
          container.style.paddingRight = '40px';
        } else {
          container.style.paddingLeft = '';
          container.style.paddingRight = '';
        }
      });
    }
    
    window.addEventListener('resize', adjustTypography);
    adjustTypography();
  }
  
  // 8. INTERACTIVE ELEMENTS FOR ENGAGEMENT
  function addInteractiveElements() {
    // 8.1 Scroll Progress Indicator
    const progressBar = document.createElement('div');
    progressBar.id = 'pageScrollProgress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #667eea, #764ba2);
      width: 0%;
      z-index: 10000;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    });
    
    // 8.2 Interactive Background Particles (Lightweight)
    function createInteractiveBackground() {
      if (window.innerWidth > 768) { // Only on desktop
        const particlesContainer = document.createElement('div');
        particlesContainer.id = 'interactiveParticles';
        particlesContainer.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
          overflow: hidden;
        `;
        
        document.body.appendChild(particlesContainer);
        
        // Create particles
        const particleCount = 20;
        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement('div');
          particle.className = 'particle';
          
          const size = Math.random() * 10 + 5;
          const posX = Math.random() * 100;
          const posY = Math.random() * 100;
          const duration = Math.random() * 20 + 10;
          const delay = Math.random() * 5;
          
          particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(102, 126, 234, 0.1);
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
          `;
          
          particlesContainer.appendChild(particle);
        }
        
        // Add mouse interaction
        document.addEventListener('mousemove', (e) => {
          const particles = document.querySelectorAll('.particle');
          const mouseX = e.clientX / window.innerWidth;
          const mouseY = e.clientY / window.innerHeight;
          
          particles.forEach((particle, index) => {
            const speed = 0.05;
            const x = (mouseX - 0.5) * 100 * speed;
            const y = (mouseY - 0.5) * 100 * speed;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
          });
        });
      }
    }
    
    // 8.3 Animated Scroll to Section
    const scrollTriggers = document.querySelectorAll('[data-scroll-to]');
    
    scrollTriggers.forEach(trigger => {
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-scroll-to');
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Add visual feedback
          targetElement.style.boxShadow = '0 0 0 5px rgba(102, 126, 234, 0.3)';
          setTimeout(() => {
            targetElement.style.boxShadow = '';
          }, 1000);
        }
      });
    });
    
    // 8.4 Dynamic Content Loading (Lazy Load)
    const lazyElements = document.querySelectorAll('[data-lazy-src], [data-lazy-bg]');
    
    const lazyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          
          if (element.hasAttribute('data-lazy-src')) {
            element.src = element.getAttribute('data-lazy-src');
            element.removeAttribute('data-lazy-src');
          }
          
          if (element.hasAttribute('data-lazy-bg')) {
            element.style.backgroundImage = `url(${element.getAttribute('data-lazy-bg')})`;
            element.removeAttribute('data-lazy-bg');
            element.style.opacity = '0';
            element.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
              element.style.opacity = '1';
            }, 100);
          }
          
          lazyObserver.unobserve(element);
        }
      });
    }, { threshold: 0.1 });
    
    lazyElements.forEach(element => lazyObserver.observe(element));
    
    createInteractiveBackground();
  }
  
  // 9. PERFORMANCE OPTIMIZATIONS
  function addPerformanceOptimizations() {
    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Re-run responsive adjustments
        enhanceResponsiveNavigation();
        enhanceResponsiveHero();
        enhanceResponsivePortfolio();
        enhanceResponsiveSkills();
        enhanceResponsiveContact();
        enhanceResponsiveMemoryGame();
        enhanceResponsiveTypography();
      }, 250);
    });
    
    // Request Animation Frame for smooth animations
    function smoothScrollTo(target) {
      const startPosition = window.pageYOffset;
      const targetPosition = target.getBoundingClientRect().top + startPosition;
      const distance = targetPosition - startPosition;
      const duration = 1000;
      let start = null;
      
      function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      }
      
      function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      }
      
      requestAnimationFrame(animation);
    }
    
    // Apply to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) smoothScrollTo(target);
      });
    });
  }
  
  // 10. ADD GLOBAL CSS ANIMATIONS AND STYLES
  function addGlobalStyles() {
    const styles = document.createElement('style');
    styles.textContent = `
      /* Responsive Design Enhancements */
      @media (max-width: 768px) {
        .container {
          padding-left: 20px !important;
          padding-right: 20px !important;
        }
        
        .section {
          padding: 60px 0 !important;
        }
        
        .hero-section {
          padding: 80px 0 !important;
        }
        
        .btn {
          padding: 12px 24px !important;
          font-size: 14px !important;
        }
        
        .card {
          margin-bottom: 20px !important;
        }
        
        .navbar-brand {
          font-size: 1.2rem !important;
        }
      }
      
      @media (max-width: 480px) {
        h1 { font-size: 1.8rem !important; }
        h2 { font-size: 1.5rem !important; }
        h3 { font-size: 1.3rem !important; }
        
        .display-4 {
          font-size: 2rem !important;
        }
        
        .game-board {
          gap: 5px !important;
        }
        
        .memory-card {
          width: 55px !important;
          height: 70px !important;
        }
      }
      
      /* Animations */
      @keyframes floatParticle {
        0%, 100% {
          transform: translateY(0) translateX(0);
        }
        50% {
          transform: translateY(-20px) translateX(10px);
        }
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
          opacity: 1;
        }
        50% {
          transform: scale(1.05);
          opacity: 0.8;
        }
      }
      
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      /* Interactive Elements */
      .interactive-hover {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
      }
      
      .interactive-hover:hover {
        transform: translateY(-5px) !important;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
      }
      
      /* Loading States */
      .loading {
        position: relative;
        overflow: hidden;
      }
      
      .loading::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        animation: loading 1.5s infinite;
      }
      
      @keyframes loading {
        to {
          left: 100%;
        }
      }
      
      /* Print Styles */
      @media print {
        #pageScrollProgress,
        #interactiveParticles,
        .mobile-nav-toggle,
        .game-controls button:not(.start-btn) {
          display: none !important;
        }
        
        body {
          background: white !important;
          color: black !important;
        }
        
        .container {
          max-width: 100% !important;
        }
        
        a[href]::after {
          content: " (" attr(href) ")";
        }
      }
      
      /* Reduced Motion */
      @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `;
    
    document.head.appendChild(styles);
  }
  
  // Initialize all enhancements
  enhanceResponsiveNavigation();
  enhanceResponsiveHero();
  enhanceResponsivePortfolio();
  enhanceResponsiveSkills();
  enhanceResponsiveContact();
  enhanceResponsiveMemoryGame();
  enhanceResponsiveTypography();
  addInteractiveElements();
  addPerformanceOptimizations();
  addGlobalStyles();
  
  console.log("Comprehensive responsive design and interactive elements setup complete!");
});

// ===========================================
// DEVICE AND ORIENTATION DETECTION
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
  // Detect device type and orientation
  function detectDeviceAndOrientation() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isPortrait = window.innerHeight > window.innerWidth;
    
    document.body.classList.toggle('mobile-device', isMobile);
    document.body.classList.toggle('desktop-device', !isMobile);
    document.body.classList.toggle('portrait', isPortrait);
    document.body.classList.toggle('landscape', !isPortrait);
    
    // Store in session for CSS adjustments
    sessionStorage.setItem('deviceType', isMobile ? 'mobile' : 'desktop');
    sessionStorage.setItem('orientation', isPortrait ? 'portrait' : 'landscape');
    
    // Adjust viewport for mobile
    if (isMobile) {
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
      }
    }
  }
  
  // Detect changes in orientation
  window.addEventListener('orientationchange', function() {
    setTimeout(detectDeviceAndOrientation, 100);
  });
  
  // Initial detection
  detectDeviceAndOrientation();
  
  // Add CSS for device-specific adjustments
  const deviceStyles = document.createElement('style');
  deviceStyles.textContent = `
    .mobile-device .desktop-only {
      display: none !important;
    }
    
    .desktop-device .mobile-only {
      display: none !important;
    }
    
    .portrait .landscape-only {
      display: none !important;
    }
    
    .landscape .portrait-only {
      display: none !important;
    }
    
    /* Touch device optimizations */
    @media (hover: none) and (pointer: coarse) {
      .interactive-hover {
        transform: none !important;
      }
      
      .interactive-hover:active {
        transform: scale(0.98) !important;
      }
      
      /* Larger touch targets */
      .btn, button, a {
        min-height: 44px;
        min-width: 44px;
      }
    }
  `;
  
  document.head.appendChild(deviceStyles);
});

// ===========================================
// 4. PROFILE IMAGE HOVER EFFECTS
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
  console.log("Setting up profile image hover effects...");
  
  // Find ONLY the specific profile images you want to target
  const profileImages = document.querySelectorAll('img');
  
  profileImages.forEach(img => {
    // Check if it's one of the specific profile images
    const src = img.src.toLowerCase();
    const alt = img.alt.toLowerCase();
    const className = img.className.toLowerCase();
    
    // Target ONLY fairooz-profile and fairooz-square images
    // Avoid portfolio images that already have hover effects
    const isTargetImage = (
      src.includes('fairooz-profile') || 
      src.includes('fairooz-square') ||
      src.includes('fairooz') && (src.includes('profile') || src.includes('square')) ||
      alt.includes('fairooz') && (alt.includes('profile') || alt.includes('square'))
    );
    
    // Make sure it's not a portfolio image (assuming portfolio images have specific classes)
    const isPortfolioImage = (
      img.classList.contains('portfolio-img') ||
      img.classList.contains('project-img') ||
      img.parentElement.classList.contains('portfolio-item') ||
      img.parentElement.classList.contains('project-item') ||
      src.includes('portfolio') ||
      src.includes('project')
    );
    
    if (isTargetImage && !isPortfolioImage) {
      console.log("Found specific profile image to add effects to:", img.src);
      
      // Check if image already has hover effects applied (has profile-wrapper parent)
      if (img.closest('.profile-wrapper')) {
        console.log("Image already has hover effects, skipping...");
        return;
      }
      
      // Add hover effects
      img.style.transition = 'all 0.3s ease';
      img.style.cursor = 'pointer';
      
      // Create wrapper
      const wrapper = document.createElement('div');
      wrapper.className = 'fairooz-profile-wrapper';
      
      // Apply consistent rounded square corners
      wrapper.style.cssText = `
        position: relative;
        display: inline-block;
        overflow: hidden;
        border-radius: 15px;
      `;
      
      // Apply same border-radius to image
      img.style.borderRadius = '15px';
      
      // Wrap the image
      img.parentNode.insertBefore(wrapper, img);
      wrapper.appendChild(img);
      
      // Add hover effect
      wrapper.addEventListener('mouseenter', function() {
        img.style.transform = 'scale(1.1)';
        img.style.filter = 'brightness(1.1)';
        this.style.boxShadow = '0 0 25px rgba(102, 126, 234, 0.4)';
        this.style.border = '3px solid rgba(102, 126, 234, 0.2)';
      });
      
      wrapper.addEventListener('mouseleave', function() {
        img.style.transform = 'scale(1)';
        img.style.filter = 'brightness(1)';
        this.style.boxShadow = '';
        this.style.border = '';
      });
      
      // Click to view larger
      wrapper.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation(); // Prevent event bubbling
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'profile-modal';
        modal.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          cursor: pointer;
        `;
        
        const modalImg = document.createElement('img');
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalImg.style.cssText = `
          max-width: 90%;
          max-height: 90%;
          border-radius: 15px;
          box-shadow: 0 0 50px rgba(0,0,0,0.5);
        `;
        
        modal.appendChild(modalImg);
        document.body.appendChild(modal);
        
        // Close modal on click
        modal.addEventListener('click', function() {
          document.body.removeChild(modal);
        });
      });
    }
  });
  
  // Add CSS styles only for these specific images
  const profileStyles = document.createElement('style');
  profileStyles.textContent = `
    /* Styles only for fairooz profile images */
    .fairooz-profile-wrapper {
      transition: all 0.3s ease !important;
    }
    
    .fairooz-profile-wrapper:hover {
      transform: translateY(-5px) !important;
    }
    
    @media (max-width: 768px) {
      .fairooz-profile-wrapper:hover {
        transform: scale(1.05) !important;
      }
    }
    
    /* Ensure consistent rounded square corners */
    .fairooz-profile-wrapper,
    .fairooz-profile-wrapper img {
      border-radius: 15px !important;
    }
  `;
  
  document.head.appendChild(profileStyles);
});