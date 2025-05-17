document.addEventListener('DOMContentLoaded', function() {
    // References to DOM elements
    const dateInput = document.getElementById('date');
    const proposalCodeInput = document.getElementById('proposalCode');
    const coverFromInput = document.getElementById('coverFrom');
    const coverToInput = document.getElementById('coverTo');
    const cancelBtn = document.getElementById('cancelBtn');
    const saveProposalBtn = document.getElementById('saveProposalBtn');
    const previewBtn = document.getElementById('previewBtn');
    const newProposalForm = document.getElementById('newProposalForm');
    const codeSelect = document.getElementById('code');
    const agentCodeInput = document.getElementById('agentCode');
    
    // Check if device is mobile for responsive behavior
    let isMobile = window.innerWidth < 768;
    
    // Handle resize events
    window.addEventListener('resize', function() {
        isMobile = window.innerWidth < 768;
        adjustForMobile();
    });
    
    // Adjust UI elements for mobile view
    function adjustForMobile() {
        if (isMobile) {
            // Enhance form fields for mobile input
            enhanceMobileFormExperience();
        }
    }
    
    // Make form more mobile-friendly
    function enhanceMobileFormExperience() {
        // Increase tap target sizes on mobile
        const formLabels = document.querySelectorAll('label');
        formLabels.forEach(label => {
            label.style.paddingBottom = '8px';
        });
        
        // Ensure date picker works well on mobile
        if (coverFromInput) {
            // Some mobile browsers need explicit type="date"
            coverFromInput.setAttribute('type', 'date');
        }
        
        // Ensure select fields show properly on all mobile browsers
        const selectFields = document.querySelectorAll('select');
        selectFields.forEach(select => {
            select.style.backgroundSize = '12px';
            select.style.backgroundPosition = 'right 10px center';
        });
        
        // Add autocapitalize to name fields for better mobile keyboard experience
        const nameFields = [
            document.getElementById('firstName'),
            document.getElementById('lastName')
        ];
        nameFields.forEach(field => {
            if (field) {
                field.setAttribute('autocapitalize', 'words');
            }
        });
    }
    
    // Apply mobile adjustments on page load
    adjustForMobile();
    
    // Set current date
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    dateInput.value = formattedDate;
    
    // Generate proposal code
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4 digit random number
    proposalCodeInput.value = `PROP-${currentDate.getFullYear()}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${randomNum}`;
    
    // Handle Code selection to control Agent Code field
    codeSelect.addEventListener('change', function() {
        if (this.value === 'IH') {
            // If In House is selected, keep Agent Code disabled
            agentCodeInput.disabled = true;
            agentCodeInput.value = '';
        } else {
            // For any other code, enable Agent Code field
            agentCodeInput.disabled = false;
        }
    });
    
    // Handle cover period calculation
    coverFromInput.addEventListener('change', function() {
        if (this.value) {
            const fromDate = new Date(this.value);
            const toDate = new Date(fromDate);
            toDate.setFullYear(toDate.getFullYear() + 1);
            toDate.setDate(toDate.getDate() - 1); // Subtract one day to make it exactly 1 year
            coverToInput.value = formatDate(toDate);
        } else {
            coverToInput.value = '';
        }
    });
    
    // Format date as YYYY-MM-DD
    function formatDate(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    // Handle cancel button
    cancelBtn.addEventListener('click', function() {
        navigateToList();
    });
    
    function navigateToList() {
        window.location.href = 'proposal-list.html';
    }
    
    // Preview button - generate PDF preview
    previewBtn.addEventListener('click', function() {
        // First validate the form
        if (!validateForm()) {
            return;
        }
        
        // In a real implementation, this would generate a PDF and display it
        // For mockup purposes, we'll show a message
        alert('Generating PDF preview of the proposal...');
        
        // Simulate opening a PDF in a new tab
        const proposalCode = document.getElementById('proposalCode').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        
        // Create a simple data object to pass to the preview
        const proposalData = {
            proposalCode: proposalCode,
            date: document.getElementById('date').value,
            name: `${firstName} ${lastName}`,
            vehicleType: document.getElementById('vehicleType').value,
            insuranceProvider: document.getElementById('insuranceProvider').value,
            coverPeriod: `${document.getElementById('coverFrom').value} to ${document.getElementById('coverTo').value}`
        };
        
        // In a real implementation, you would generate a PDF and open it
        // For this mockup, we'll simulate opening a preview page
        // window.open(`proposal-preview.html?data=${encodeURIComponent(JSON.stringify(proposalData))}`, '_blank');
        console.log('Preview data:', proposalData);
    });
    
    // Form submission - triggered by Save button
    saveProposalBtn.addEventListener('click', function() {
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // In a real app, we would send the form data to the server
        // For this mockup, we'll just show an alert and redirect
        alert('Proposal saved successfully!');
        navigateToList();
    });
    
    // Form validation
    function validateForm() {
        // Check for required fields
        const requiredFields = newProposalForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                // Remove error class when field is focused
                field.addEventListener('focus', function() {
                    this.classList.remove('error');
                }, { once: true });
            }
        });
        
        if (!isValid) {
            alert('Please fill all required fields.');
            return false;
        }
        
        return true;
    }
}); 