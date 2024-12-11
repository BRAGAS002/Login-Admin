// Admin credentials (in a real application, these would be stored securely on the server)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123',
    fullName: 'System Administrator'
};

document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');

    // Verify admin credentials
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Store admin session with a distinct key from user session
        localStorage.setItem('adminAuthToken', JSON.stringify({
            username: username,
            role: 'admin',
            fullName: ADMIN_CREDENTIALS.fullName,
            timestamp: new Date().getTime()
        }));
        
        // Redirect to admin dashboard
        window.location.href = 'admin.html';
    } else {
        errorDiv.style.display = 'block';
        errorDiv.textContent = 'Invalid admin credentials';
    }
});

// Check for admin authentication
document.addEventListener('DOMContentLoaded', function() {
    const adminAuthToken = localStorage.getItem('adminAuthToken');
    
    if (adminAuthToken) {
        const tokenData = JSON.parse(adminAuthToken);
        const currentTime = new Date().getTime();
        const tokenAge = currentTime - tokenData.timestamp;
        
        // Check if token is less than 24 hours old
        if (tokenAge < 24 * 60 * 60 * 1000) {
            window.location.href = 'admin.html';
        } else {
            // Clear expired token
            localStorage.removeItem('adminAuthToken');
        }
    }
});

// Add reCAPTCHA verification specific to admin login
grecaptcha.ready(function() {
    grecaptcha.execute('6LeAmpgqAAAAAJoIMEJwORbx7ZKsmODLUEQD64K6', {action: 'admin_login'})
        .then(function(token) {
            const recaptchaTokenField = document.createElement('input');
            recaptchaTokenField.type = 'hidden';
            recaptchaTokenField.name = 'g-recaptcha-response';
            recaptchaTokenField.value = token;
            document.getElementById('adminLoginForm').appendChild(recaptchaTokenField);
        });
}); 