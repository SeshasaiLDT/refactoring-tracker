// Utility functions for the tracker

function getRefactoredFileName(originalName) {
    const extension = originalName.split('.').pop();
    const baseName = originalName.slice(0, -(extension.length + 1));
    return `${baseName}_refactored.${extension}`;
}

function getTestFileName(originalName) {
    const extension = originalName.split('.').pop();
    const baseName = originalName.slice(0, -(extension.length + 1));
    return `${baseName}_refactored_tests.${extension}`;
}

function updateStats() {
    const files = JSON.parse(localStorage.getItem('files') || '[]');
    
    document.getElementById('total-files').textContent = files.length;
    document.getElementById('refactored-files').textContent = 
        files.filter(file => file.refactored).length;
    document.getElementById('tested-files').textContent = 
        files.filter(file => file.tested).length;
}

function redirectToLogin() {
    window.location.href = 'login.html';
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    updateAuthButtons();
}
