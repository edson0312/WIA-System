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
    
    // Toggle confirm password visibility
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const confirmPasswordField = document.getElementById('confirmPassword');
    
    if (toggleConfirmPassword && confirmPasswordField) {
        toggleConfirmPassword.addEventListener('click', function() {
            if (confirmPasswordField.type === 'password') {
                confirmPasswordField.type = 'text';
                toggleConfirmPassword.textContent = 'Hide';
            } else {
                confirmPasswordField.type = 'password';
                toggleConfirmPassword.textContent = 'Show';
            }
        });
    }
    
    // Form validation
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const username = document.getElementById('username').value.trim();
            const role = document.getElementById('role').value;
            const password = document.getElementById('password').value.trim();
            const confirmPassword = document.getElementById('confirmPassword').value.trim();
            
            // Simple validation
            if (fullName === '') {
                alert('Please enter your full name');
                return;
            }
            
            if (email === '') {
                alert('Please enter your email address');
                return;
            }
            
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            if (username === '') {
                alert('Please enter a username');
                return;
            }
            
            if (role === '' || role === null) {
                alert('Please select a role');
                return;
            }
            
            if (password === '') {
                alert('Please enter a password');
                return;
            }
            
            if (password.length < 8) {
                alert('Password must be at least 8 characters long');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            // Here you would typically send the signup data to your server
            console.log('Signup attempt:', { fullName, email, username, role });
            
            // For the mockup, we'll just show a success message
            alert('Account created successfully! You can now log in.');
            window.location.href = 'index.html';
        });
    }
}); 