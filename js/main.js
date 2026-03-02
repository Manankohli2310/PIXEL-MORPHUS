document.addEventListener('DOMContentLoaded', () => {

    const userStatus = localStorage.getItem('userStatus');
    const header = document.querySelector('.main-header');

    if (!header) {
        console.error("Header element (.main-header) not found on index.html");
        return;
    }

    if (userStatus === 'loggedIn') {
        // --- LOGGED-IN USER VIEW ---
        const userName = localStorage.getItem('userName');
        const userPicture = localStorage.getItem('userPicture');
        
        header.innerHTML = `
            <div class="user-info">
                <img src="${userPicture || 'assets/images/default-avatar.png'}" alt="Profile Picture" class="profile-picture">
                <div class="welcome-message">
                    Welcome, <span id="user-name">${userName || 'User'}</span>!
                </div>
            </div>
            <button id="logout-btn" class="logout-button">Logout</button>
        `;

        document.getElementById('logout-btn').addEventListener('click', () => {
            console.log("User clicked logout from main.js.");
            // THE FIX: Clear all stored user data to ensure a clean slate.
            localStorage.clear(); 
            window.location.href = 'login.html';
        });

    } else if (userStatus === 'skipped') {
        // --- GUEST (SKIPPED) USER VIEW ---
        console.log("User has skipped login. Building guest header for main.js.");
        
        header.innerHTML = `
            <div class="site-title">
                Pixel<span>Morphus</span>
            </div>
            <a href="login.html" id="login-btn" class="login-button">Login</a>
        `;
        
        document.getElementById('login-btn').addEventListener('click', (event) => {
            event.preventDefault();
            console.log("Guest is going back to login.");
            // Clear the 'skipped' status so the login modal appears correctly.
            localStorage.removeItem('userStatus');
            window.location.href = 'login.html';
        });

    } else {
        // --- NO STATUS FOUND ---
        // If someone tries to access this page without a session, send them back.
        console.log("No user session found on main.js. Redirecting to login page.");
        window.location.href = 'login.html';
    }
});