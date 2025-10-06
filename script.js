// ===================================
// Mobile Menu Toggle
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // Animate hamburger to X
            this.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }
        });
    });
});

// ===================================
// Smooth Scrolling
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Navbar Scroll Effect
// ===================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }

    lastScroll = currentScroll;
});

// ===================================
// Intersection Observer for Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all pricing cards
document.querySelectorAll('.pricing-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe contact items
document.querySelectorAll('.contact-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
});

// ===================================
// Pricing Card Hover Effects
// ===================================
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderColor = 'var(--color-accent)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.borderColor = 'transparent';
    });
});

// ===================================
// QR Code Generation
// ===================================
// Generate QR code for contact information
function generateQRCode() {
    const qrCodeElement = document.getElementById('qrCode');

    // Contact information for QR code
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Anahit - Yepiq Custom Dressmaking
TEL:7473557146
EMAIL:info@yepiq.com
URL:www.yepiq.com
NOTE:Professional Custom Dressmaking - 10% off first order
END:VCARD`;

    // Using a QR code API service
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(vcard)}`;

    if (qrCodeElement) {
        qrCodeElement.src = qrApiUrl;
    }
}

// Generate QR code on page load
window.addEventListener('load', generateQRCode);

// ===================================
// Scroll Progress Indicator
// ===================================
function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    // You can add a progress bar element if desired
    // document.getElementById('progressBar').style.width = scrolled + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ===================================
// Pricing Card Click Animation
// ===================================
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(212, 175, 55, 0.3)';
        ripple.style.width = '100px';
        ripple.style.height = '100px';
        ripple.style.marginLeft = '-50px';
        ripple.style.marginTop = '-50px';
        ripple.style.left = e.clientX - this.getBoundingClientRect().left + 'px';
        ripple.style.top = e.clientY - this.getBoundingClientRect().top + 'px';
        ripple.style.animation = 'ripple 0.6s ease-out';

        this.style.position = 'relative';
        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            opacity: 1;
            transform: scale(0);
        }
        to {
            opacity: 0;
            transform: scale(4);
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Lazy Loading for Images
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// Contact Information Copy to Clipboard
// ===================================
document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.tagName !== 'A' || !this.href.startsWith('mailto:') && !this.href.startsWith('tel:')) {
            e.preventDefault();

            // Copy to clipboard
            const textToCopy = this.textContent;
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Show confirmation
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                this.style.color = '#50C878';

                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.color = '';
                }, 2000);
            });
        }
    });
});

// ===================================
// Discount Badge Animation
// ===================================
const discountBadge = document.querySelector('.discount-badge');
if (discountBadge) {
    setInterval(() => {
        discountBadge.style.transform = 'scale(1.1)';
        setTimeout(() => {
            discountBadge.style.transform = 'scale(1)';
        }, 300);
    }, 5000);
}

// ===================================
// Form Validation (if contact form is added)
// ===================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^\d{10}$/;
    return re.test(phone.replace(/\D/g, ''));
}

// ===================================
// Page Load Animation
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// Console Message
// ===================================
console.log('%c Yepiq - Custom Dressmaking ', 'background: #D4AF37; color: white; font-size: 20px; padding: 10px;');
console.log('%c Crafted with elegance and precision ', 'color: #D4AF37; font-size: 12px;');
