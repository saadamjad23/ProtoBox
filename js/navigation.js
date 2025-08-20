// Navigation JavaScript

function applyTheme(themeKey) {
	const root = document.documentElement;
	if (!themeKey || themeKey === 'default') {
		root.removeAttribute('data-theme');
	} else {
		root.setAttribute('data-theme', themeKey);
	}
	try {
		localStorage.setItem('preferred-theme', themeKey || 'default');
	} catch {}
}

function initNavigation() {
	// Apply persisted theme early
	try {
		const saved = localStorage.getItem('preferred-theme');
		applyTheme(saved || 'default');
	} catch {
		applyTheme('default');
	}

	// Mobile Navigation Toggle
	const hamburger = document.querySelector('.hamburger');
	const navMenu = document.querySelector('.nav-menu');

	if (hamburger && navMenu) {
		hamburger.addEventListener('click', () => {
			hamburger.classList.toggle('active');
			navMenu.classList.toggle('active');
		});

		// Close mobile menu when clicking on a link
		document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
			hamburger.classList.remove('active');
			navMenu.classList.remove('active');
		}));
	}

	// Navbar background change on scroll
	window.addEventListener('scroll', () => {
		const navbar = document.querySelector('.navbar');
		if (navbar) {
			if (window.scrollY > 100) {
				navbar.classList.add('scrolled');
			} else {
				navbar.classList.remove('scrolled');
			}
		}
	});

	// Smooth scrolling for navigation links
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

	// Theme switcher wiring
	const switcher = document.getElementById('theme-switcher');
	if (switcher) {
		try {
			const saved = localStorage.getItem('preferred-theme');
			switcher.value = saved || 'default';
		} catch {}
		switcher.addEventListener('change', (e) => {
			applyTheme(e.target.value);
		});
	}
} 