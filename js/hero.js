// Hero Section JavaScript

function initHero() {
    // Interactive floating elements
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach(element => {
        element.addEventListener('click', () => {
            // Add click animation
            element.style.transform = 'scale(1.3) rotate(360deg)';
            element.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                element.style.transform = '';
                element.style.transition = '';
            }, 500);
            
            // Show tooltip or info
            showElementInfo(element);
        });
        
        element.addEventListener('mouseenter', () => {
            element.style.animationPlayState = 'paused';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.animationPlayState = 'running';
        });
    });

    // Initialize creative quotes rotation
    initCreativeQuotes();
    
    // Initialize particle effects
    initParticleEffects();
}

// Creative quotes rotation
const creativeQuotes = [
    {
        text: "Innovation distinguishes between a leader and a follower",
        author: "Steve Jobs"
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams",
        author: "Eleanor Roosevelt"
    },
    {
        text: "Technology is best when it brings people together",
        author: "Matt Mullenweg"
    },
    {
        text: "The only way to do great work is to love what you do",
        author: "Steve Jobs"
    },
    {
        text: "Innovation is the ability to see change as an opportunity, not a threat",
        author: "Steve Jobs"
    }
];

function initCreativeQuotes() {
    const quoteElement = document.querySelector('.creative-quote');
    if (!quoteElement) return;
    
    let currentQuoteIndex = 0;
    
    setInterval(() => {
        currentQuoteIndex = (currentQuoteIndex + 1) % creativeQuotes.length;
        const quote = creativeQuotes[currentQuoteIndex];
        
        quoteElement.style.opacity = '0';
        quoteElement.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            quoteElement.querySelector('.quote-text').textContent = quote.text;
            quoteElement.querySelector('.quote-author').textContent = `- ${quote.author}`;
            
            quoteElement.style.opacity = '1';
            quoteElement.style.transform = 'translateY(0)';
        }, 300);
    }, 5000);
}

// Particle effects
function initParticleEffects() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 50; i++) {
        createParticle(hero);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        pointer-events: none;
        animation: particleFloat 10s linear infinite;
    `;
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    
    container.appendChild(particle);
}

function showElementInfo(element) {
    const icons = {
        'fa-code': 'Web Development',
        'fa-mobile-alt': 'Mobile Apps',
        'fa-cloud': 'Cloud Services',
        'fa-brain': 'AI/ML Solutions'
    };
    
    const iconClass = Array.from(element.querySelector('i').classList).find(cls => cls.startsWith('fa-'));
    const serviceName = icons[iconClass] || 'Technology';
    
    showNotification(`Explore our ${serviceName} services!`, 'info');
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}); 