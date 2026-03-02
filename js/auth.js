// This function handles the response from Google Sign-In. Unchanged.
function handleCredentialResponse(response) {
    console.log("Google Sign-In successful. Storing user information...");
    const payloadBase64 = response.credential.split('.')[1];
    const decodedPayload = atob(payloadBase64);
    const userInfo = JSON.parse(decodedPayload);

    localStorage.setItem('userStatus', 'loggedIn');
    localStorage.setItem('googleUserId', userInfo.sub);
    localStorage.setItem('userName', userInfo.name);
    localStorage.setItem('userEmail', userInfo.email);
    localStorage.setItem('userPicture', userInfo.picture);
    
    console.log("User data stored. Redirecting...");
    window.location.href = 'index.html';
}

window.handleCredentialResponse = handleCredentialResponse;


document.addEventListener('DOMContentLoaded', () => {
    // --- THIS IS THE CORE OF THE NEW LOGIC ---
    // The page always loads. We only check the status when "Get Started" is clicked.

    const getStartedBtn = document.getElementById('get-started-btn');
    const loginModal = document.getElementById('login-modal');
    const closeModalBtn = document.querySelector('.close-btn');
    const skipLink = document.querySelector('.skip-link-modal');

    // --- Event Listeners ---
    
    // When the "Get Started" button is clicked...
    getStartedBtn.addEventListener('click', () => {
        const userStatus = localStorage.getItem('userStatus');

        if (userStatus === 'loggedIn') {
            // If they have a real Google login, bypass the modal and go straight to the app.
            console.log("Returning logged-in user. Redirecting directly.");
            window.location.href = 'index.html';
        } else {
            // If they are a new user OR a 'skipped' user, show the login modal.
            // The 'skipped' status will have been cleared if they clicked "Login" on the index page.
            console.log("New or skipped user. Showing login modal.");
            loginModal.classList.remove('hidden');
        }
    });

    closeModalBtn.addEventListener('click', () => {
        loginModal.classList.add('hidden');
    });

    loginModal.addEventListener('click', (event) => {
        if (event.target === loginModal) {
            loginModal.classList.add('hidden');
        }
    });

    // When the user clicks the "Skip for now" link inside the modal
    skipLink.addEventListener('click', (event) => {
        event.preventDefault(); 
        console.log("User chose to skip login.");
        localStorage.setItem('userStatus', 'skipped');
        window.location.href = 'index.html';
    });
});