// This function MUST be defined in the global scope to be found by the Google script.
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
    
    console.log("User data stored. Redirecting to index.html...");
    window.location.href = 'index.html';
}

// Make the function explicitly available on the window object for robustness.
window.handleCredentialResponse = handleCredentialResponse;


document.addEventListener('DOMContentLoaded', () => {

    // Pre-flight check: If the user already has a valid session, send them to the app.
    const initialUserStatus = localStorage.getItem('userStatus');
    if (initialUserStatus === 'loggedIn' || initialUserStatus === 'skipped') {
        console.log(`User has existing status: "${initialUserStatus}". Redirecting to index.html.`);
        window.location.href = 'index.html';
        return; 
    }

    const getStartedBtn = document.getElementById('get-started-btn');
    const loginModal = document.getElementById('login-modal');
    const closeModalBtn = document.querySelector('.close-btn');
    const skipLink = document.querySelector('.skip-link-modal');

    getStartedBtn.addEventListener('click', () => {
        loginModal.classList.remove('hidden');
    });

    closeModalBtn.addEventListener('click', () => {
        loginModal.classList.add('hidden');
    });

    loginModal.addEventListener('click', (event) => {
        if (event.target === loginModal) {
            loginModal.classList.add('hidden');
        }
    });

    skipLink.addEventListener('click', (event) => {
        event.preventDefault(); 
        localStorage.setItem('userStatus', 'skipped');
        window.location.href = 'index.html';
    });
});