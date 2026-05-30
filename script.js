// ============================================
// NAVIGATION & SCROLL EFFECTS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Navbar active link update on scroll
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
});

// ============================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ============================================
// CONTACT FORM HANDLER
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('nameInput').value.trim();
        const email = document.getElementById('emailInput').value.trim();
        const message = document.getElementById('messageInput').value.trim();

        // Basic validation
        if (!name || !email || !message) {
            showAlert('Please fill in all fields', 'warning');
            return;
        }

        if (!isValidEmail(email)) {
            showAlert('Please enter a valid email address', 'warning');
            return;
        }

        // Create mailto link
        const mailtoLink = `mailto:mishraanshika167@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\n\nEmail: ${email}\n\nMessage: ${message}`)}`;

        // Open default email client
        window.location.href = mailtoLink;

        // Show success message
        showAlert('Opening your email client... The message will be pre-filled!', 'success');

        // Reset form
        contactForm.reset();

        // Reset button state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;

        // Optional: Log for debugging
        console.log('Contact form submitted with:', {
            name,
            email,
            message
        });
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Alert notification system
function showAlert(message, type = 'info') {
    // Create alert div
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    // Insert at the top of the body
    document.body.insertBefore(alertDiv, document.body.firstChild);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// ============================================
// SCROLL ANIMATIONS - FADE IN ON SCROLL
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards and major elements
document.querySelectorAll('.highlight-card, .certificate-card, .skill-category, .experience-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ============================================
// SKILL BARS ANIMATION ON SCROLL
// ============================================

const skillBarsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress-bar');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s ease';
                    bar.style.width = width;
                }, 100);
            });
            skillBarsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    skillBarsObserver.observe(skillsSection);
}

// ============================================
// COUNTER ANIMATION (Optional - for statistics)
// ============================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 50);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 50);
}

// ============================================
// NAVBAR COLLAPSE ON LINK CLICK (Mobile)
// ============================================

const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (navbarToggler) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
}

// ============================================
// LAZY LOADING FOR IMAGES (if needed)
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ============================================
// TOOLTIP INITIALIZATION (Bootstrap)
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// ============================================
// COPY TO CLIPBOARD FUNCTIONALITY
// ============================================

function copyToClipboard(text, feedbackElement) {
    navigator.clipboard.writeText(text).then(() => {
        showAlert('Copied to clipboard!', 'success');
        if (feedbackElement) {
            feedbackElement.textContent = '✓ Copied!';
            setTimeout(() => {
                feedbackElement.textContent = 'Copy';
            }, 2000);
        }
    }).catch(err => {
        showAlert('Failed to copy', 'danger');
    });
}

// ============================================
// PRINT FUNCTIONALITY
// ============================================

function printPortfolio() {
    window.print();
}

// ============================================
// DARK MODE TOGGLE (Optional Feature)
// ============================================

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

function createScrollToTopButton() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.id = 'scrollToTopBtn';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #3498db, #e74c3c);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 999;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        font-size: 20px;
    `;

    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollToTopBtn.addEventListener('mouseenter', () => {
        scrollToTopBtn.style.transform = 'scale(1.1)';
    });

    scrollToTopBtn.addEventListener('mouseleave', () => {
        scrollToTopBtn.style.transform = 'scale(1)';
    });
}

createScrollToTopButton();

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
    // Press 'H' to go to Home
    if (e.key === 'h' || e.key === 'H') {
        document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
    }
    // Press 'C' to go to Contact
    if (e.key === 'c' || e.key === 'C') {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }
});

// ============================================
// FORM INPUT VALIDATION
// ============================================

function validateFormInputs() {
    const inputs = document.querySelectorAll('.form-control');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.type === 'email') {
                this.classList.toggle('is-invalid', !isValidEmail(this.value));
            } else if (this.value.trim() === '') {
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-invalid');
            }
        });

        input.addEventListener('input', function() {
            this.classList.remove('is-invalid');
        });
    });
}

validateFormInputs();

// ============================================
// PORTFOLIO STATS (Optional Enhancement)
// ============================================

const portfolioStats = {
    projects: 15,
    experience: 9,
    skills: 20,
    certifications: 4
};

// ============================================
// CONSOLE MESSAGES
// ============================================

console.log('%c Welcome to Anshika Mishra\'s Portfolio! 👋', 'font-size: 20px; font-weight: bold; color: #3498db;');
console.log('%c Feel free to explore and connect! ', 'font-size: 14px; color: #2c3e50;');

// ============================================
// PAGE LOAD ANIMATION
// ============================================

window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    console.log('Portfolio loaded successfully!');
});

// ============================================
// PERFORMANCE MONITORING
// ============================================

if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page Load Time: ' + pageLoadTime + 'ms');
        }, 0);
    });
}

// ============================================
// UTILITY FUNCTION: GET QUERY PARAMETERS
// ============================================

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// ============================================
// INITIALIZE ON DOM READY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    // All initialization code should be here
});

// Prevent console errors in production
if (typeof console === "undefined") {
    console = { log: function() {} };
}
