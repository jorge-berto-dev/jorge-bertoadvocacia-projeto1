// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initAOS();
    initMobileMenu();
    initSmoothScroll();
    initHeaderScroll();
    initCounterAnimation();
    initNewsletterForm();
});

// ========================================
// AOS ANIMATION
// ========================================

function initAOS() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });
}

// ========================================
// MOBILE MENU
// ========================================

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    const overlay = document.querySelector('.mobile-menu-overlay');
    
    // Open mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Change hamburger to X
            hamburger.innerHTML = '<i class="fa-solid fa-times"></i>';
        });
    }
    
    // Close mobile menu
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        
        // Change X back to hamburger
        if (hamburger) {
            hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
    }
    
    if (closeMenu) {
        closeMenu.addEventListener('click', closeMobileMenu);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeMobileMenu);
    }
    
    // Close menu when clicking on a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
}

// ========================================
// SMOOTH SCROLL
// ========================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip empty anchors
            if (href === '#' || href === '#!') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// HEADER SCROLL EFFECT
// ========================================

function initHeaderScroll() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ========================================
// COUNTER ANIMATION
// ========================================

function initCounterAnimation() {
    const counters = document.querySelectorAll('.numero');
    let hasAnimated = false;
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                counters.forEach(counter => {
                    animateCounter(counter);
                });
            }
        });
    }, observerOptions);
    
    const numerosSection = document.querySelector('.numeros');
    if (numerosSection) {
        observer.observe(numerosSection);
    }
}

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        
        if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };
    
    updateCounter();
}

// ========================================
// NEWSLETTER FORM
// ========================================

function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('emailNewsletter');
    const message = document.getElementById('newsletterMessage');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            // Basic validation
            if (email === '') {
                showMessage('Por favor, preencha seu e-mail.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('Por favor, insira um e-mail válido.', 'error');
                return;
            }
            
            // Success message
            showMessage('E-mail cadastrado com sucesso!', 'success');
            form.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                message.textContent = '';
            }, 5000);
        });
    }
    
    function showMessage(text, type) {
        message.textContent = text;
        message.style.color = type === 'error' ? '#ff6b6b' : '#C9A959';
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// ========================================
// ACTIVE NAVIGATION LINK
// ========================================

window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// CARD HOVER ENHANCEMENTS
// ========================================

const areaCards = document.querySelectorAll('.area-card');

areaCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.card-icon i');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(5deg)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.card-icon i');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// ========================================
// LOADING ANIMATION
// ========================================

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Fade in hero content
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
        }, 100);
    }
    
    if (heroImage) {
        setTimeout(() => {
            heroImage.style.opacity = '1';
        }, 300);
    }
});

// ========================================
// PREVENT SCROLL WHEN MOBILE MENU IS OPEN
// ========================================

const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenu) {
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                if (mobileMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            }
        });
    });
    
    observer.observe(mobileMenu, {
        attributes: true
    });
}

// ========================================
// ACCESSIBILITY IMPROVEMENTS
// ========================================

// Add keyboard navigation for mobile menu
document.addEventListener('keydown', function(e) {
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        
        const hamburger = document.getElementById('hamburger');
        if (hamburger) {
            hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
    }
});

// Focus management for mobile menu
const hamburger = document.getElementById('hamburger');
const closeMenu = document.getElementById('closeMenu');

if (hamburger && closeMenu) {
    hamburger.addEventListener('click', function() {
        setTimeout(() => {
            closeMenu.focus();
        }, 300);
    });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce function for scroll events
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for performance optimization
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Lazy load images (if needed)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ========================================
// ANALYTICS TRACKING (Placeholder)
// ========================================

// Track CTA button clicks
const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-contact');

ctaButtons.forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        const buttonHref = this.getAttribute('href');
        
        console.log(`CTA Clicked: ${buttonText} | Destination: ${buttonHref}`);
        
        // Add your analytics tracking code here
        // Example: gtag('event', 'click', { 'event_category': 'CTA', 'event_label': buttonText });
    });
});

// Track WhatsApp button clicks
const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');

whatsappButtons.forEach(button => {
    button.addEventListener('click', function() {
        console.log('WhatsApp button clicked');
        // Add your analytics tracking code here
    });
});

// Track newsletter submissions
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function() {
        console.log('Newsletter form submitted');
        // Add your analytics tracking code here
    });
}

// ========================================
// CONSOLE WELCOME MESSAGE
// ========================================

console.log('%c[ESCRITÓRIO] Advogados', 'color: #0B1E33; font-size: 24px; font-weight: bold;');
console.log('%cSoluções jurídicas sob medida ⚖️', 'color: #C9A959; font-size: 16px;');
console.log('%cDireito empresarial estratégico desde 2004', 'color: #2C3E50; font-size: 12px;');

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================

// Animate elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const animateOnScroll = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all sections
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    animateOnScroll.observe(section);
});

// ========================================
// DYNAMIC YEAR IN FOOTER
// ========================================

const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-bottom p');

if (footerText) {
    footerText.textContent = footerText.textContent.replace('2025', currentYear);
}

// ========================================
// SMOOTH ICON TRANSITIONS
// ========================================

// Add smooth transitions to all icons on hover
const allIcons = document.querySelectorAll('i');

allIcons.forEach(icon => {
    icon.style.transition = 'all 0.3s ease';
});
