// Check if user is logged in with correct credentials
window.addEventListener('load', () => {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }
    renderRequests();
});

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function renderRequests() {
    const requestsList = document.getElementById('requests-list');
    const requests = JSON.parse(localStorage.getItem('requests') || '[]');
    
    if (requests.length === 0) {
        requestsList.innerHTML = '<p class="no-requests">No requests found</p>';
        return;
    }
      // Sort requests by date, oldest first
    requests.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    
    requestsList.innerHTML = requests.map((request, index) => `
        <div class="request-card">
            <div class="request-header">
                <span class="request-filename">${request.filename}</span>
                <span class="request-date">${formatDate(request.timestamp)}</span>
            </div>
            <div class="request-type">Request Type: ${request.requestType}</div>
            <div class="request-description">${request.description}</div>
            <div class="request-actions">
                <button class="delete-btn" onclick="deleteRequest(${index})">Delete Request</button>
            </div>
        </div>
    `).join('');
}

function deleteRequest(index) {
    if (confirm('Are you sure you want to delete this request?')) {
        const requests = JSON.parse(localStorage.getItem('requests') || '[]');
        requests.splice(index, 1);
        localStorage.setItem('requests', JSON.stringify(requests));
        renderRequests();
    }
}

// Check login status and render requests
window.addEventListener('load', () => {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }
    renderRequests();
});
