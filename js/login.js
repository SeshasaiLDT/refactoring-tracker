const VALID_USERNAME = 'Discount-Tire-Devs';
const VALID_PASSWORD = 'VisionPOSDevs';

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'index.html';
    } else {
        errorMessage.textContent = 'Invalid username or password';
    }
}

// Check if user is already logged in
window.addEventListener('load', () => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'index.html';
    }
});
