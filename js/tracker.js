// Check if user is logged in
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    updateAuthButtons();
    return isLoggedIn;
}

function updateAuthButtons() {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const viewRequestsBtn = document.getElementById('view-requests-btn');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (loginBtn && logoutBtn) {
        loginBtn.style.display = isLoggedIn ? 'none' : 'block';
        logoutBtn.style.display = isLoggedIn ? 'block' : 'none';
        if (viewRequestsBtn) {
            viewRequestsBtn.style.display = isLoggedIn ? 'block' : 'none';
        }
    }
}

// Check authentication
if (localStorage.getItem('isLoggedIn') !== 'true') {
    location.href = 'login.html';
}

let files = JSON.parse(localStorage.getItem('files') || '[]');
const filesContainer = document.getElementById('files-container');
const addFileBtn = document.getElementById('add-file-btn');
const addFileForm = document.getElementById('add-file-form');

// Event Listeners
addFileBtn.addEventListener('click', () => {
    addFileForm.classList.toggle('hidden');
});

// Main functionality
function addFile() {
    if (!localStorage.getItem('isLoggedIn')) {
        alert('Please login to add files');
        return;
    }

    const fileNameInput = document.getElementById('new-file-name');
    const fileName = fileNameInput.value.trim();
    
    if (!fileName) {
        alert('Please enter a file name');
        return;
    }

    const files = JSON.parse(localStorage.getItem('files') || '[]');
    
    // Check if file already exists
    if (files.some(file => file.name === fileName)) {
        alert('A file with this name already exists');
        return;
    }

    files.push({
        name: fileName,
        refactored: false,
        tested: false,
        filepath: '',
        description: ''
    });
    
    localStorage.setItem('files', JSON.stringify(files));
    fileNameInput.value = '';
    document.getElementById('add-file-form').classList.add('hidden');
    renderFiles();
    updateStats();
    
    alert('File added successfully!');
}

function toggleRefactored(id) {
    const file = files.find(f => f.id === id);
    if (file) {
        file.refactored = !file.refactored;
        localStorage.setItem('files', JSON.stringify(files));
        renderFiles();
        updateStats();
    }
}

function toggleTested(id) {
    const file = files.find(f => f.id === id);
    if (file) {
        file.tested = !file.tested;
        localStorage.setItem('files', JSON.stringify(files));
        renderFiles();
        updateStats();
    }
}

function renderFiles() {
    const filesContainer = document.getElementById('files-container');
    const files = JSON.parse(localStorage.getItem('files') || '[]');
    const isLoggedIn = checkLoginStatus();
    
    filesContainer.innerHTML = '';
    
    files.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        
        const fileHeader = document.createElement('div');
        fileHeader.className = 'file-header';        const headerContent = `
            <div class="file-grid">
                <div class="file-name-section">
                    <span class="file-name">${file.name}</span>
                    ${isLoggedIn ? `<button class="delete-btn" onclick="deleteFile(${index})">Delete</button>` : ''}
                </div>
                <div class="checkbox-section">
                    <span class="checkbox-label">Refactored:</span>
                    <div class="checkbox-wrapper">
                        <input type="checkbox" id="refactored-${index}"
                            ${file.refactored ? 'checked' : ''}
                            ${isLoggedIn ? '' : 'disabled'}
                            onchange="updateFileStatus(${index}, 'refactored', this.checked)">
                        <span class="tooltip">${getRefactoredFileName(file.name)}</span>
                    </div>
                </div>
                <div class="checkbox-section">
                    <span class="checkbox-label">Tests:</span>
                    <div class="checkbox-wrapper">
                        <input type="checkbox" id="tested-${index}"
                            ${file.tested ? 'checked' : ''}
                            ${isLoggedIn ? '' : 'disabled'}
                            onchange="updateFileStatus(${index}, 'tested', this.checked)">
                        <span class="tooltip">${getTestFileName(file.name)}</span>
                    </div>
                </div>
            </div>`;
        
        fileHeader.innerHTML = headerContent;

        const fileDetails = document.createElement('div');
        fileDetails.className = 'file-details';
        fileDetails.innerHTML = `
            <div class="details-group">
                <label for="filepath-${index}">File Path:</label>
                <input type="text" 
                    id="filepath-${index}"
                    class="filepath-input"
                    value="${file.filepath || ''}"
                    ${isLoggedIn ? '' : 'disabled'}
                    onchange="updateFileDetails(${index}, 'filepath', this.value)">
            </div>
            <div class="details-group">
                <label for="description-${index}">Refactoring Description:</label>
                <textarea id="description-${index}"
                    class="description-textarea"
                    ${isLoggedIn ? '' : 'disabled'}
                    onchange="updateFileDetails(${index}, 'description', this.value)">${file.description || ''}</textarea>
            </div>`;

        fileItem.appendChild(fileHeader);
        fileItem.appendChild(fileDetails);
        
        fileHeader.addEventListener('click', (e) => {
            if (!e.target.matches('input')) {
                fileDetails.classList.toggle('expanded');
            }
        });

        filesContainer.appendChild(fileItem);
    });
}

function updateFileStatus(index, field, value) {
    const files = JSON.parse(localStorage.getItem('files') || '[]');
    files[index][field] = value;
    localStorage.setItem('files', JSON.stringify(files));
    updateStats();
}

function updateFileDetails(index, field, value) {
    const files = JSON.parse(localStorage.getItem('files') || '[]');
    files[index][field] = value;
    localStorage.setItem('files', JSON.stringify(files));
}

// Request Modal Functions
function openRequestModal() {
    document.getElementById('modal-overlay').style.display = 'block';
    document.getElementById('request-modal').style.display = 'block';
}

function closeRequestModal() {
    document.getElementById('modal-overlay').style.display = 'none';
    document.getElementById('request-modal').style.display = 'none';
}

function handleRequest(e) {
    e.preventDefault();
    const filename = document.getElementById('request-filename').value;
    const requestType = document.getElementById('request-type').value;
    const description = document.getElementById('request-description').value;
    
    if (!filename || !requestType || !description) {
        alert('Please fill in all fields');
        return;
    }

    const requests = JSON.parse(localStorage.getItem('requests') || '[]');
    const newRequest = {
        filename,
        requestType,
        description,
        timestamp: new Date().toISOString(),
        status: 'pending'
    };
    
    requests.push(newRequest);
    localStorage.setItem('requests', JSON.stringify(requests));
    
    alert('Request submitted successfully!');
    closeRequestModal();
    e.target.reset();
}

// Update Stats with Percentages
function updateStats() {
    const files = JSON.parse(localStorage.getItem('files') || '[]');
    const totalFiles = files.length;
    const refactoredFiles = files.filter(file => file.refactored).length;
    const testedFiles = files.filter(file => file.tested).length;
    
    document.getElementById('total-files').textContent = totalFiles;
    document.getElementById('refactored-files').textContent = refactoredFiles;
    document.getElementById('tested-files').textContent = testedFiles;
    
    const refactoredPercentage = totalFiles ? Math.round((refactoredFiles / totalFiles) * 100) : 0;
    const testedPercentage = totalFiles ? Math.round((testedFiles / totalFiles) * 100) : 0;
    
    document.getElementById('refactored-percentage').textContent = `(${refactoredPercentage}%)`;
    document.getElementById('tested-percentage').textContent = `(${testedPercentage}%)`;
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    renderFiles();
    updateStats();
    updateAuthButtons();
    
    const addFileBtn = document.getElementById('add-file-btn');
    if (addFileBtn) {
        addFileBtn.addEventListener('click', () => {
            if (!localStorage.getItem('isLoggedIn')) {
                alert('Please login to add files');
                return;
            }
            document.getElementById('add-file-form').classList.toggle('hidden');
        });
    }

    // Add event listener for the add file form
    const addFileForm = document.getElementById('add-file-form');
    if (addFileForm) {
        addFileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            addFile();
        });
    }

    const requestBtn = document.getElementById('request-btn');
    if (requestBtn) {
        requestBtn.addEventListener('click', openRequestModal);
    }

    const requestForm = document.getElementById('request-form');
    if (requestForm) {
        requestForm.addEventListener('submit', handleRequest);
    }

    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeRequestModal);
    }
});

function deleteFile(index) {
    if (!localStorage.getItem('isLoggedIn')) {
        alert('Please login to delete files');
        return;
    }

    if (confirm('Are you sure you want to delete this file?')) {
        const files = JSON.parse(localStorage.getItem('files') || '[]');
        files.splice(index, 1);
        localStorage.setItem('files', JSON.stringify(files));
        renderFiles();
        updateStats();
    }
}
