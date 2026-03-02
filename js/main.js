document.addEventListener('DOMContentLoaded', () => {

    const userStatus = localStorage.getItem('userStatus');
    const header = document.querySelector('.main-header');

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
            console.log("User clicked logout.");
            localStorage.clear(); 
            window.location.href = 'login.html';
        });

    } else if (userStatus === 'skipped') {
        // --- GUEST (SKIPPED) USER VIEW ---
        console.log("User has skipped login. Building guest header.");
        
        header.innerHTML = `
            <div class="site-title">
                Pixel<span>Morphus</span>
            </div>
            <a href="login.html" id="login-btn" class="login-button">Login</a>
        `;
        
        document.getElementById('login-btn').addEventListener('click', (event) => {
            event.preventDefault();
            console.log("Guest is going back to login.");
            localStorage.removeItem('userStatus');
            // The stray 'C' character has been removed from the next line.
            window.location.href = 'login.html';
        });

    } else {
        // --- NO STATUS FOUND ---
        // If someone tries to access this page without a session, send them back.
        console.log("No user session found. Redirecting to login page.");
        window.location.href = 'login.html';
    }
});