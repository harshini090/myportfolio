// ============================================
// PREMIUM MINIMAL PORTFOLIO - JavaScript
// Sophisticated animations and interactions
// ============================================

// ========== Intersection Observer Setup ==========
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -10% 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      fadeInObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animatable elements
const initScrollAnimations = () => {
  const elements = document.querySelectorAll(
    '.section-header, .project-card, .timeline-item, .credentials-group'
  );
  
  elements.forEach(el => {
    fadeInObserver.observe(el);
  });
};

// ========== Project Filtering ==========
const setupProjectFilter = () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter projects with stagger effect
      projectCards.forEach((card, index) => {
        const categories = card.dataset.category.split(' ');
        const shouldShow = filter === 'all' || categories.includes(filter);

        if (shouldShow) {
          card.style.display = 'grid';
          // Reset and re-trigger animation
          card.classList.remove('in-view');
          setTimeout(() => {
            card.classList.add('in-view');
          }, index * 100);
        } else {
          card.classList.remove('in-view');
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
};

// ========== Theme Toggle with Image Switching ==========
const setupThemeToggle = () => {
  const themeToggle = document.querySelector('.theme-toggle');
  
  if (!themeToggle) return;
  
  // Check for saved theme preference or default to system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'light' || (!savedTheme && !systemPrefersDark)) {
    document.body.classList.add('light-mode');
    updateThemeImages('light');
  } else {
    updateThemeImages('dark');
  }
  
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    // Save preference
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    
    // Update all theme-aware images
    updateThemeImages(isLight ? 'light' : 'dark');
  });
};

// ========== Update Theme Images ==========
const updateThemeImages = (theme) => {
  const themeIcons = document.querySelectorAll('.project-theme-icon');
  
  themeIcons.forEach(icon => {
    const darkSrc = icon.dataset.dark;
    const lightSrc = icon.dataset.light;
    
    if (theme === 'light' && lightSrc) {
      icon.src = lightSrc;
    } else if (theme === 'dark' && darkSrc) {
      icon.src = darkSrc;
    }
  });
};

// ========== Smooth Scroll ==========
const setupSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') {
        e.preventDefault();
        return;
      }
      
      const target = document.querySelector(targetId);
      
      if (target) {
        e.preventDefault();
        const navHeight = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
};

// ========== Parallax Effect ==========
const setupParallax = () => {
  const heroInner = document.querySelector('.hero-inner');
  
  if (!heroInner) return;
  
  let ticking = false;
  
  const updateParallax = () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.4;
    
    if (scrolled < window.innerHeight) {
      heroInner.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      heroInner.style.opacity = 1 - (scrolled / window.innerHeight) * 0.6;
    }
    
    ticking = false;
  };
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
};

// ========== Scroll Indicator Hide ==========
const setupScrollIndicator = () => {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  
  if (!scrollIndicator) return;
  
  let ticking = false;
  
  const updateIndicator = () => {
    const scrolled = window.pageYOffset;
    
    if (scrolled > 200) {
      scrollIndicator.style.opacity = '0';
      scrollIndicator.style.pointerEvents = 'none';
    } else {
      scrollIndicator.style.opacity = '1';
      scrollIndicator.style.pointerEvents = 'auto';
    }
    
    ticking = false;
  };
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateIndicator);
      ticking = true;
    }
  }, { passive: true });
};

// ========== Enhanced Navigation Scroll Effect ==========
const setupNavScroll = () => {
  const nav = document.querySelector('.nav');
  let lastScroll = 0;
  let ticking = false;
  
  const updateNav = () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 100) {
      nav.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
    } else {
      nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
    ticking = false;
  };
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateNav);
      ticking = true;
    }
  }, { passive: true });
};

// ========== Cursor Follow Effect (Subtle) ==========
const setupCursorEffect = () => {
  // Only on larger screens
  if (window.innerWidth < 768) return;
  
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    mouseX = (e.clientX - rect.left - rect.width / 2) / 50;
    mouseY = (e.clientY - rect.top - rect.height / 2) / 50;
  });
  
  const animateCursor = () => {
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;
    
    const profileGlow = document.querySelector('.profile-glow');
    if (profileGlow) {
      profileGlow.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.05)`;
    }
    
    requestAnimationFrame(animateCursor);
  };
  
  animateCursor();
};

// ========== Project Card Hover Effects ==========
const setupProjectHoverEffects = () => {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    const visual = card.querySelector('.project-visual');
    
    card.addEventListener('mouseenter', () => {
      visual.style.transform = 'scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      visual.style.transform = 'scale(1)';
    });
  });
};

// ========== Staggered Animation Delays ==========
const applyStaggeredDelays = () => {
  const projectCards = document.querySelectorAll('.project-card');
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });
  
  timelineItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
  });
};

// ========== Keyboard Navigation Enhancement ==========
const setupKeyboardNav = () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  filterBtns.forEach((btn, index) => {
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextBtn = filterBtns[index + 1] || filterBtns[0];
        nextBtn.focus();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevBtn = filterBtns[index - 1] || filterBtns[filterBtns.length - 1];
        prevBtn.focus();
      }
    });
  });
};

// ========== Enhanced Link Interactions ==========
const setupLinkEffects = () => {
  const links = document.querySelectorAll('.project-link, .contact-link, .cert-item');
  
  links.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });
};

// ========== Lazy Loading Images ==========
const setupLazyLoading = () => {
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.dataset.src || img.src;
    });
  } else {
    // Fallback for older browsers
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
};

// ========== Performance Optimization ==========
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// ========== Window Resize Handler ==========
const setupResizeHandler = () => {
  const handleResize = debounce(() => {
    // Recalculate layouts if needed
    console.log('Window resized');
  }, 250);
  
  window.addEventListener('resize', handleResize);
};

// ========== Preload Critical Resources ==========
const preloadResources = () => {
  // Preload fonts
  const fontLinks = [
    'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&display=swap',
    'https://fonts.googleapis.com/css2?family=General+Sans:wght@300;400;500;600&display=swap'
  ];
  
  fontLinks.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    document.head.appendChild(link);
  });
};

// ========== Accessibility Announcements ==========
const announceToScreenReader = (message) => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  document.body.appendChild(announcement);
  
  setTimeout(() => announcement.remove(), 1000);
};

// Add screen reader only utility class
const addA11yStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }
  `;
  document.head.appendChild(style);
};

// ========== Initialize Everything ==========
const init = () => {
  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePortfolio);
  } else {
    initializePortfolio();
  }
};

const initializePortfolio = () => {
  console.log('🎨 Initializing premium portfolio...');
  
  // Core functionality
  initScrollAnimations();
  setupProjectFilter();
  setupThemeToggle();
  setupSmoothScroll();
  
  // Visual enhancements
  setupParallax();
  setupScrollIndicator();
  setupNavScroll();
  setupCursorEffect();
  setupProjectHoverEffects();
  
  // Layout & timing
  applyStaggeredDelays();
  
  // Accessibility & interaction
  setupKeyboardNav();
  setupLinkEffects();
  addA11yStyles();
  
  // Performance
  setupLazyLoading();
  setupResizeHandler();
  
  // Add loaded class for any additional transitions
  document.body.classList.add('loaded');
  
  console.log('✨ Portfolio initialized successfully!');
};

// ========== Start the Application ==========
init();

// ========== Export for Module Systems ==========
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    init,
    debounce,
    throttle,
    announceToScreenReader
  };
}