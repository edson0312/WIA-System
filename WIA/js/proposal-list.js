document.addEventListener('DOMContentLoaded', function() {
    // References to DOM elements
    const searchInput = document.getElementById('searchInput');
    const filterType = document.getElementById('filterType');
    const proposalsTable = document.getElementById('proposalsTable');
    const newProposalBtn = document.getElementById('newProposalBtn');
    const confirmModal = document.getElementById('confirmModal');
    const cancelDeleteBtn = document.getElementById('cancelDelete');
    const confirmDeleteBtn = document.getElementById('confirmDelete');
    const sortableHeaders = document.querySelectorAll('th.sortable');
    
    let tableRows = Array.from(proposalsTable.querySelectorAll('tbody tr'));
    let currentRow; // To track which row is being deleted
    let currentSortColumn = 'proposalCode'; // Default sort column
    let currentSortDirection = 'asc'; // Default sort direction
    let isMobile = window.innerWidth < 768; // Check if device is mobile
    
    // Handle resize events for responsive behavior
    window.addEventListener('resize', function() {
        isMobile = window.innerWidth < 768;
        // Adjust table behavior for mobile if needed
        handleMobileTableView();
    });
    
    // Handle mobile-specific table view adjustments
    function handleMobileTableView() {
        if (isMobile) {
            // Add mobile-specific behavior
            addMobileTableBehavior();
        }
    }
    
    // Add mobile-specific behavior to tables
    function addMobileTableBehavior() {
        // Make sure the table container can be scrolled horizontally on touch devices
        const tableContainer = document.querySelector('.table-container');
        if (tableContainer) {
            tableContainer.style.overflowX = 'auto';
            tableContainer.style.WebkitOverflowScrolling = 'touch';
        }
        
        // Add swipe detection for mobile devices to improve UX
        // This is a simple implementation - a production app might use a library
        let startX, startY;
        
        tableContainer.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, false);
        
        // This prevents the whole page from scrolling when user is trying to scroll the table
        tableContainer.addEventListener('touchmove', function(e) {
            if (Math.abs(e.touches[0].clientX - startX) > Math.abs(e.touches[0].clientY - startY)) {
                e.preventDefault();
            }
        }, { passive: false });
    }
    
    // Apply mobile-specific behavior on page load
    handleMobileTableView();
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        filterTable();
    });
    
    // Filter by transaction type
    filterType.addEventListener('change', function() {
        filterTable();
    });
    
    // Filter table based on search input and selected filter
    function filterTable() {
        const searchTerm = searchInput.value.toLowerCase();
        const filterValue = filterType.value;
        
        tableRows.forEach(row => {
            const proposalCode = row.cells[0].textContent.toLowerCase();
            const lastName = row.cells[1].textContent.toLowerCase();
            const firstName = row.cells[2].textContent.toLowerCase();
            const transactionType = row.cells[4].textContent;
            
            const matchesSearch = 
                proposalCode.includes(searchTerm) || 
                lastName.includes(searchTerm) || 
                firstName.includes(searchTerm);
                
            const matchesFilter = 
                filterValue === 'all' || 
                transactionType === filterValue;
                
            if (matchesSearch && matchesFilter) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }
    
    // Sorting functionality
    sortableHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const column = this.getAttribute('data-column');
            const isAsc = currentSortColumn === column && currentSortDirection === 'asc';
            
            // Clear previous sort indicators
            sortableHeaders.forEach(h => {
                h.classList.remove('sorted-asc', 'sorted-desc');
            });
            
            // Set new sort direction and indicator
            currentSortDirection = isAsc ? 'desc' : 'asc';
            currentSortColumn = column;
            this.classList.add(isAsc ? 'sorted-desc' : 'sorted-asc');
            
            // Sort the table
            sortTable(column, currentSortDirection);
        });
    });
    
    // Sort table function
    function sortTable(column, direction) {
        const tbody = proposalsTable.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        
        // Sort rows
        rows.sort((a, b) => {
            let aValue = a.querySelector(`td:nth-child(${getColumnIndex(column)})`).textContent.trim();
            let bValue = b.querySelector(`td:nth-child(${getColumnIndex(column)})`).textContent.trim();
            
            // Handle numeric values
            if (!isNaN(aValue) && !isNaN(bValue)) {
                aValue = parseFloat(aValue);
                bValue = parseFloat(bValue);
            }
            
            // Compare values
            if (aValue < bValue) {
                return direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
        
        // Reorder rows in the table
        rows.forEach(row => {
            tbody.appendChild(row);
        });
    }
    
    // Helper function to get the column index
    function getColumnIndex(columnName) {
        const headers = Array.from(proposalsTable.querySelectorAll('th'));
        for (let i = 0; i < headers.length; i++) {
            if (headers[i].getAttribute('data-column') === columnName) {
                return i + 1; // 1-based index for querySelectorAll
            }
        }
        return 1; // Default to first column
    }
    
    // New Proposal button
    newProposalBtn.addEventListener('click', function() {
        // Navigate to the new proposal form
        window.location.href = 'new-proposal.html';
    });
    
    // Add event listeners to Edit and Delete buttons
    document.querySelectorAll('.btn-edit').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const proposalCode = row.querySelector('td:first-child').textContent;
            window.location.href = `new-proposal.html?edit=${proposalCode}`;
        });
    });
    
    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', function() {
            currentRow = this.closest('tr');
            confirmModal.style.display = 'flex';
        });
    });
    
    // Add event listeners to Create Policy and Create SOA buttons
    document.querySelectorAll('.btn-create').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const proposalCode = row.querySelector('td:first-child').textContent;
            const buttonType = this.textContent;
            
            if (buttonType === 'Create Policy') {
                alert(`Creating policy for proposal: ${proposalCode}`);
                // In a real application, you would redirect to a form or make an API call
            } else if (buttonType === 'Create SOA') {
                alert(`Creating SOA for proposal: ${proposalCode}`);
                // In a real application, you would redirect to a form or make an API call
            }
        });
    });
    
    // Modal event listeners
    cancelDeleteBtn.addEventListener('click', function() {
        confirmModal.style.display = 'none';
    });
    
    confirmDeleteBtn.addEventListener('click', function() {
        // Delete the row (in a real app, you would call an API)
        if (currentRow) {
            currentRow.remove();
            confirmModal.style.display = 'none';
            
            // Show success message
            alert('Proposal deleted successfully');
        }
    });
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === confirmModal) {
            confirmModal.style.display = 'none';
        }
    });
    
    // Setup user menu dropdown
    const userMenu = document.querySelector('.user-menu');
    if (userMenu) {
        userMenu.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
    
    // Pagination (simplified for mockup)
    const pageButtons = document.querySelectorAll('.btn-page');
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                document.querySelector('.btn-page.active').classList.remove('active');
                this.classList.add('active');
                
                // In a real app, this would load the appropriate page of data
                if (this.textContent !== 'Previous' && this.textContent !== 'Next') {
                    console.log(`Loading page ${this.textContent}`);
                }
            }
        });
    });
    
    // Set initial sort state
    const defaultSortHeader = document.querySelector(`th[data-column="${currentSortColumn}"]`);
    if (defaultSortHeader) {
        defaultSortHeader.classList.add('sorted-asc');
        sortTable(currentSortColumn, currentSortDirection);
    }
}); 