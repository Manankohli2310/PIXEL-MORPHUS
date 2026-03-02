document.addEventListener('DOMContentLoaded', () => {
    // This script is for the template selection page (portfolio-morph.html)

    const userStatus = localStorage.getItem('userStatus');
    const header = document.querySelector('.main-header');

    if (!header) {
        console.error("Header element not found on this page!");
        return;
    }

    // --- 1. HEADER LOGIC ---
    const loginPageUrl = '../login.html'; // Path is relative to this file's location
    if (userStatus === 'loggedIn') {
        const userName = localStorage.getItem('userName');
        const userPicture = localStorage.getItem('userPicture');
        header.innerHTML = `<div class="user-info"><img src="${userPicture || '../assets/images/default-avatar.png'}" alt="Profile Picture" class="profile-picture"><div class="welcome-message">Welcome, <span id="user-name">${userName || 'User'}</span>!</div></div><button id="logout-btn" class="logout-button">Logout</button>`;
        
        document.getElementById('logout-btn').addEventListener('click', () => {
            console.log("User clicked logout from portfolio.js.");
            // THE FIX: Clear all stored user data to ensure a clean slate.
            localStorage.clear();
            window.location.href = loginPageUrl; 
        });

    } else if (userStatus === 'skipped') {
        header.innerHTML = `<div class="site-title">Portfolio<span>Morph</span></div><a href="${loginPageUrl}" id="login-btn" class="login-button">Login</a>`;
    
    } else {
        // If no status at all, protect the page
        window.location.href = loginPageUrl;
        return;
    }

    // --- 2. GLOBAL THEME LOGIC (FOR IMAGES) ---

    function setTheme(theme) {
        // a) Save the choice to localStorage
        localStorage.setItem('selectedTheme', theme);

        // b) Update the toggle buttons
        document.querySelectorAll('#global-theme-controls .control-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === theme);
        });

        // c) Update the preview images
        document.querySelectorAll('.template-card[data-template-id]').forEach(card => {
            const lightImage = card.querySelector('.card-preview-image[data-theme-img="light"]');
            const darkImage = card.querySelector('.card-preview-image[data-theme-img="dark"]');

            if (lightImage && darkImage) {
                lightImage.classList.toggle('active', theme === 'light');
                darkImage.classList.toggle('active', theme === 'dark');
            }
        });
    }

    // Add click listeners to theme buttons
    document.querySelectorAll('#global-theme-controls .control-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setTheme(btn.dataset.theme);
        });
    });
    
    // --- 3. INITIALIZATION ---

    // On page load, set the theme from memory or default to light
    const savedTheme = localStorage.getItem('selectedTheme') || 'light';
    setTheme(savedTheme);
});