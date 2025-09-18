document.addEventListener('DOMContentLoaded', function() {
    const navHTML = `
        <header class="header">
            <nav class="nav-container">
                <div class="nav-left">
                    <a href="home.html" class="logo">Virgina Knaggs</a>
                    <button class="theme-toggle" id="theme-toggle" title="Toggle dark mode">
                        <span id="theme-icon">🌙</span>
                    </button>
                </div>
                <ul class="nav-menu" id="nav-menu">
                    <li><a href="home.html" class="nav-link">Home</a></li>
                    <li><a href="work.html" class="nav-link">Work</a></li>
                    <li><a href="about.html" class="nav-link">About</a></li>
                    <li><a href="contact.html" class="nav-link">Contact</a></li>
                </ul>
                <button class="mobile-menu-btn" id="mobile-menu-btn">
                    <div class="hamburger"></div>
                </button>
            </nav>
        </header>
    `;
    
    document.getElementById('nav-placeholder').innerHTML = navHTML;
    
    setActiveNavigation();
    initializeTheme();
    initializeMobileMenu();
    initializeHeaderScrollEffect();
});

function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage || 
           (currentPage === 'home.html' && link.getAttribute('href') === 'home.html')) {
            link.classList.add('active');
        }
    });
}

function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navMenu.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-link')) {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

function initializeHeaderScrollEffect() {
    function updateHeaderStyles() {
        const header = document.querySelector('.header');
        if (!header) return;
        
        if (window.scrollY > 50) {
            header.style.background = '';
            header.style.boxShadow = '';
            header.classList.add('scrolled');
        } else {
            header.style.background = '';
            header.style.boxShadow = '';
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateHeaderStyles);
    
    updateHeaderStyles();
    
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            setTimeout(updateHeaderStyles, 10);
        });
    }
}