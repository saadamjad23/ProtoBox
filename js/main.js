// Main JavaScript File - Loads all sections dynamically

// Section loader function
async function loadSection(sectionId, filePath) {
    try {
        const response = await fetch(filePath);
        const html = await response.text();
        document.getElementById(sectionId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading section ${sectionId}:`, error);
    }
}

// Load all sections when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    // Apply persisted theme ASAP to avoid FOUC
    try {
        const savedTheme = localStorage.getItem('preferred-theme');
        if (savedTheme && savedTheme !== 'default') {
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    } catch {}

    // Load all sections
    await Promise.all([
        loadSection('navigation-section', 'sections/navigation.html'),
        loadSection('hero-section', 'sections/hero.html'),
        loadSection('about-section', 'sections/about.html'),
        loadSection('services-section', 'sections/services.html'),
        loadSection('portfolio-section', 'sections/portfolio.html'),
        loadSection('team-section', 'sections/team.html'),
        loadSection('testimonials-section', 'sections/testimonials.html'),
        loadSection('contact-section', 'sections/contact.html'),
        loadSection('footer-section', 'sections/footer.html')
    ]);

    // Initialize all functionality after sections are loaded
    console.log('All sections loaded successfully!');
    
    // Trigger any initialization functions from other JS files
    if (typeof initNavigation === 'function') initNavigation();
    if (typeof initHero === 'function') initHero();
    if (typeof initAnimations === 'function') initAnimations();
    if (typeof initContact === 'function') initContact();
    
    // Dispatch event to notify that sections are loaded
    window.dispatchEvent(new Event('sectionsLoaded'));
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Global utility functions
window.utils = {
    debounce,
    loadSection
}; 