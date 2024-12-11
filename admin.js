// Check admin authentication
function checkAdminAuth() {
    const adminAuthToken = localStorage.getItem('adminAuthToken');
    
    if (!adminAuthToken) {
        window.location.href = 'admin-login.html';
        return;
    }

    const tokenData = JSON.parse(adminAuthToken);
    const currentTime = new Date().getTime();
    const tokenAge = currentTime - tokenData.timestamp;

    // Check if token is expired (24 hours)
    if (tokenAge > 24 * 60 * 60 * 1000) {
        localStorage.removeItem('adminAuthToken');
        window.location.href = 'admin-login.html';
        return;
    }
    
    // Update UI with admin info
    document.querySelector('.user-name').textContent = tokenData.fullName;
    document.querySelector('.user-avatar').textContent = 'AD';
}

// Run auth check when page loads
checkAdminAuth();

// Handle admin logout
document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('adminAuthToken');
    window.location.href = 'admin-login.html';
});

// Modal functions
function showAddUserModal() {
    document.getElementById('addUserModal').style.display = 'block';
}

function showAddMeterModal() {
    document.getElementById('addMeterModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Handle form submissions
document.getElementById('addUserForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    // Add user logic here
    console.log('Adding new user:', Object.fromEntries(formData));
    closeModal('addUserModal');
});

document.getElementById('addMeterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    // Add meter logic here
    console.log('Adding new meter:', Object.fromEntries(formData));
    closeModal('addMeterModal');
});

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
} 