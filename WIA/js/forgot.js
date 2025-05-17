document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const forgotForm = document.getElementById('forgotForm');
    
    if (forgotForm) {
        forgotForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            
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
            
            // Here you would typically send the recovery request to your server
            console.log('Recovery request for:', { email });
            
            // For the mockup, we'll just show a success message
            alert('If an account with this email exists, we\'ve sent recovery instructions to your email.');
            window.location.href = 'index.html';
        });
    }
}); 