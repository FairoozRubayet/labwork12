// portfolio.js - SPECIFIC FOR PORTFOLIO PAGES

console.log("Portfolio page script loaded");

// ===========================================
// PORTFOLIO PAGE FUNCTIONALITY
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
  console.log("Initializing portfolio page features...");
  
  // 1. IMAGE ZOOM FUNCTIONALITY
  const portfolioImages = document.querySelectorAll('.portfolio-content img');
  
  portfolioImages.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.style.transition = 'transform 0.3s ease';
    
    img.addEventListener('click', function() {
      if (this.classList.contains('zoomed')) {
        // Zoom out
        this.style.transform = 'scale(1)';
        this.style.cursor = 'zoom-in';
        this.classList.remove('zoomed');
      } else {
        // Zoom in
        this.style.transform = 'scale(1.5)';
        this.style.cursor = 'zoom-out';
        this.classList.add('zoomed');
      }
    });
    
    // Reset zoom on mouse leave
    img.addEventListener('mouseleave', function() {
      if (this.classList.contains('zoomed')) {
        this.style.transform = 'scale(1)';
        this.style.cursor = 'zoom-in';
        this.classList.remove('zoomed');
      }
    });
  });
  
  // 2. ANIMATED COUNTERS
  const counterElements = document.querySelectorAll('.counter-animate');
  
  if (counterElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const target = parseInt(element.getAttribute('data-target'));
          const duration = 2000; // 2 seconds
          const increment = target / (duration / 16); // 60fps
          let current = 0;
          
          const updateCounter = () => {
            if (current < target) {
              current += increment;
              element.textContent = Math.ceil(current);
              requestAnimationFrame(updateCounter);
            } else {
              element.textContent = target;
            }
          };
          
          updateCounter();
          observer.unobserve(element);
        }
      });
    }, { threshold: 0.5 });
    
    counterElements.forEach(counter => observer.observe(counter));
  }
  
  // 3. RESPONSIVE NAVIGATION
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  if (navbarToggler && navbarCollapse) {
    // Close menu when clicking a link (mobile)
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 992) { // Bootstrap lg breakpoint
          const bsCollapse = new bootstrap.Collapse(navbarCollapse);
          bsCollapse.hide();
        }
      });
    });
    
    // Add smooth scrolling to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only process internal page anchors
        if (href.startsWith('#') && href.length > 1) {
          e.preventDefault();
          const target = document.querySelector(href);
          
          if (target) {
            // Close mobile menu if open
            if (window.innerWidth <= 992 && navbarCollapse.classList.contains('show')) {
              const bsCollapse = new bootstrap.Collapse(navbarCollapse);
              bsCollapse.hide();
            }
            
            // Smooth scroll
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  }
  
  // 4. LAZY LOAD IMAGES
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        // Fade in image
        img.onload = () => {
          setTimeout(() => {
            img.style.opacity = '1';
          }, 100);
        };
        
        imageObserver.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => imageObserver.observe(img));
  
  // 5. BACK TO TOP BUTTON
  const backToTopBtn = document.createElement('button');
  backToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
  backToTopBtn.className = 'btn btn-primary btn-back-to-top';
  backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
  `;
  
  document.body.appendChild(backToTopBtn);
  
  // Show/hide button
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.display = 'flex';
      setTimeout(() => {
        backToTopBtn.style.opacity = '1';
      }, 10);
    } else {
      backToTopBtn.style.opacity = '0';
      setTimeout(() => {
        if (window.pageYOffset <= 300) {
          backToTopBtn.style.display = 'none';
        }
      }, 300);
    }
  });
  
  // Scroll to top
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // 6. INTERACTIVE ELEMENTS
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // 7. PRINT OPTIMIZATION
  const printBtn = document.createElement('button');
  printBtn.innerHTML = '<i class="bi bi-printer me-2"></i>Print Page';
  printBtn.className = 'btn btn-outline-secondary';
  printBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 30px;
    z-index: 1000;
  `;
  
  document.body.appendChild(printBtn);
  
  printBtn.addEventListener('click', () => {
    window.print();
  });
  
  // 8. ADDITIONAL RESPONSIVE ADJUSTMENTS
  function adjustForMobile() {
    const isMobile = window.innerWidth <= 768;
    
    // Adjust font sizes for mobile
    if (isMobile) {
      document.querySelectorAll('h1').forEach(h1 => {
        h1.style.fontSize = '2rem';
      });
      
      document.querySelectorAll('h2').forEach(h2 => {
        h2.style.fontSize = '1.5rem';
      });
      
      document.querySelectorAll('.lead').forEach(lead => {
        lead.style.fontSize = '1.1rem';
      });
    }
    
    // Adjust image max width
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
    });
  }
  
  // Initial adjustment
  adjustForMobile();
  
  // Adjust on resize
  window.addEventListener('resize', adjustForMobile);
  
  // 9. ADD CSS FOR PORTFOLIO PAGES
  const portfolioStyles = document.createElement('style');
  portfolioStyles.textContent = `
    /* Portfolio page specific styles */
    @media (max-width: 768px) {
      .portfolio-hero {
        padding: 50px 0 !important;
      }
      
      .portfolio-hero h1 {
        font-size: 2rem !important;
      }
      
      .portfolio-content {
        padding: 0 15px;
      }
      
      .btn-back-to-top {
        bottom: 20px;
        right: 20px;
        width: 45px;
        height: 45px;
      }
    }
    
    @media (max-width: 576px) {
      .portfolio-hero {
        padding: 40px 0 !important;
      }
      
      .portfolio-hero h1 {
        font-size: 1.75rem !important;
      }
      
      .tech-stack {
        justify-content: center;
      }
      
      .btn-lg {
        padding: 10px 20px;
        font-size: 1rem;
      }
    }
    
    /* Print styles */
    @media print {
      .btn-back-to-top,
      .navbar,
      .btn-outline-secondary {
        display: none !important;
      }
      
      body {
        font-size: 12pt;
      }
      
      .portfolio-hero {
        background: white !important;
        color: black !important;
        padding: 20px 0 !important;
      }
      
      .portfolio-content img {
        max-width: 100% !important;
        page-break-inside: avoid;
      }
    }
    
    /* Animation classes */
    .fade-in {
      animation: fadeIn 1s ease;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .slide-up {
      animation: slideUp 0.8s ease;
    }
    
    @keyframes slideUp {
      from { 
        opacity: 0;
        transform: translateY(30px);
      }
      to { 
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  
  document.head.appendChild(portfolioStyles);
  
  // 10. ADD INITIAL ANIMATIONS
  setTimeout(() => {
    document.querySelectorAll('.portfolio-content > *').forEach((element, index) => {
      element.classList.add('fade-in');
      element.style.animationDelay = `${index * 0.1}s`;
    });
  }, 300);
  
  console.log("Portfolio page features initialized");
});

// ===========================================
// SHARE FUNCTIONALITY
// ===========================================

function sharePortfolio() {
  if (navigator.share) {
    // Use Web Share API if available
    navigator.share({
      title: document.title,
      text: 'Check out this portfolio project',
      url: window.location.href
    });
  } else {
    // Fallback: Copy to clipboard
    const tempInput = document.createElement('input');
    tempInput.value = window.location.href;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    
    // Show notification
    const notification = document.createElement('div');
    notification.textContent = 'Link copied to clipboard!';
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #28a745;
      color: white;
      padding: 10px 20px;
      border-radius: 5px;
      z-index: 10000;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}

// ===========================================
// DARK MODE TOGGLE FOR PORTFOLIO PAGES
// ===========================================

(function addDarkModeToggle() {
  // Only add if not already present
  if (document.getElementById('darkModeToggle')) return;
  
  const darkModeToggle = document.createElement('button');
  darkModeToggle.id = 'darkModeToggle';
  darkModeToggle.innerHTML = '🌙';
  darkModeToggle.title = 'Toggle Dark Mode';
  darkModeToggle.style.cssText = `
    position: fixed;
    bottom: 90px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #667eea;
    color: white;
    border: none;
    font-size: 20px;
    cursor: pointer;
    z-index: 999;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  `;
  
  document.body.appendChild(darkModeToggle);
  
  // Load saved theme
  const savedTheme = localStorage.getItem('portfolioTheme') || 'light';
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '☀️';
    darkModeToggle.style.backgroundColor = '#333';
  }
  
  // Toggle theme
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('portfolioTheme', 'dark');
      darkModeToggle.innerHTML = '☀️';
      darkModeToggle.style.backgroundColor = '#333';
    } else {
      localStorage.setItem('portfolioTheme', 'light');
      darkModeToggle.innerHTML = '🌙';
      darkModeToggle.style.backgroundColor = '#667eea';
    }
  });
  
  // Add dark mode styles
  const darkModeStyles = document.createElement('style');
  darkModeStyles.textContent = `
    body.dark-mode {
      background-color: #121212;
      color: #e0e0e0;
    }
    
    body.dark-mode .navbar {
      background-color: #1e1e1e !important;
      border-bottom: 1px solid #333;
    }
    
    body.dark-mode .navbar-brand,
    body.dark-mode .nav-link {
      color: #e0e0e0 !important;
    }
    
    body.dark-mode .portfolio-hero {
      background: linear-gradient(135deg, #333 0%, #555 100%) !important;
    }
    
    body.dark-mode .card {
      background-color: #1e1e1e;
      border-color: #333;
    }
    
    body.dark-mode .feature-card {
      background-color: #1e1e1e;
      border-color: #333;
    }
    
    body.dark-mode .tech-tag {
      background-color: #2d2d2d;
      border-color: #444;
      color: #e0e0e0;
    }
    
    body.dark-mode footer {
      background-color: #0a0a0a !important;
    }
  `;
  
  document.head.appendChild(darkModeStyles);
})();