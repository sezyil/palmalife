// Load footer dynamically
document.addEventListener('DOMContentLoaded', function() {
    // Determine the correct path based on current page location
    let footerPath = 'includes/footer.html';
    
    // If we're in pages/ directory, go up one level
    if (window.location.pathname.includes('/pages/')) {
        footerPath = '../includes/footer.html';
    }
    
    console.log('Loading footer from:', footerPath);
    
    fetch(footerPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            // Find the footer element or create one
            let existingFooter = document.querySelector('footer');
            if (existingFooter) {
                existingFooter.outerHTML = data;
            } else {
                // If no footer exists, append it before closing body tag
                document.body.insertAdjacentHTML('beforeend', data);
            }
            
            // Fix footer links based on current page location
            fixFooterLinks();
            
            console.log('Footer loaded successfully');
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
});

// Function to fix footer links based on current page location
function fixFooterLinks() {
    console.log('Footer loaded successfully - no path fixing needed');
} 