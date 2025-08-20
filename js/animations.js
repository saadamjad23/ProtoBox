// Animations and Scroll Effects

function initAnimations() {
    // Counter animation for stats
    animateCounters();
    
    // Scroll-triggered animations
    initScrollAnimations();
    
    // Mouse trail effect
    initMouseTrail();
}

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number, .stat-item h3');
    const speed = 200;

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target') || counter.textContent.replace(/\D/g, ''));
        const count = +counter.innerText.replace(/\D/g, '');
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment) + (counter.textContent.includes('+') ? '+' : '');
            setTimeout(() => animateCounter(counter), 1);
        } else {
            counter.innerText = target + (counter.textContent.includes('+') ? '+' : '');
        }
    };

    // Intersection Observer for counters
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-number, .stat-item h3');
                counters.forEach(counter => animateCounter(counter));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observe sections with counters
    const statSections = document.querySelectorAll('.tech-stats, .about-stats');
    statSections.forEach(section => observer.observe(section));
}

// Scroll-triggered animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('.service-card, .portfolio-item, .team-member, .testimonial-card, .about-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });
}

// Mouse trail effect
function initMouseTrail() {
    const trail = [];
    const maxTrailLength = 20;

    document.addEventListener('mousemove', (e) => {
        const dot = document.createElement('div');
        dot.className = 'mouse-trail';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #ffd700;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            animation: fadeOut 1s ease-out forwards;
        `;

        document.body.appendChild(dot);
        trail.push(dot);

        if (trail.length > maxTrailLength) {
            const oldDot = trail.shift();
            oldDot.remove();
        }
    });
}

// Add CSS for animations
const animationCSS = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0);
        }
    }

    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;

// Inject animation CSS
const style = document.createElement('style');
style.textContent = animationCSS;
document.head.appendChild(style);

// Utility function to show notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'info' ? '#ffd700' : '#ff6b6b'};
        color: ${type === 'info' ? '#000000' : '#ffffff'};
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
} 