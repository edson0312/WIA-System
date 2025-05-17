document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const togglePassword = document.getElementById('togglePassword');
    const passwordField = document.getElementById('password');
    
    if (togglePassword && passwordField) {
        togglePassword.addEventListener('click', function() {
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                togglePassword.textContent = 'Hide';
            } else {
                passwordField.type = 'password';
                togglePassword.textContent = 'Show';
            }
        });
    }
    
    // Form validation
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            
            if (username === '') {
                alert('Please enter your username or email');
                return;
            }
            
            if (password === '') {
                alert('Please enter your password');
                return;
            }
            
            // Here you would typically send the login data to your server
            console.log('Login attempt:', { username });
            
            // For the mockup, we'll redirect to the proposals list page
            window.location.href = 'proposal-list.html';
        });
    }
}); 