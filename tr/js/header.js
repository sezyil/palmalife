// Load header dynamically
document.addEventListener('DOMContentLoaded', function() {
    // Determine the correct path based on current page location
    let headerPath = 'includes/header.html';
    
    // If we're in pages/ directory, go up one level
    if (window.location.pathname.includes('/pages/')) {
        headerPath = '../includes/header.html';
    }
    
    console.log('Loading header from:', headerPath);
    
    fetch(headerPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            // Find the header element or create one
            let existingHeader = document.querySelector('header');
            let existingPanelMenu = document.querySelector('.panel_menu');
            
            if (existingHeader) {
                existingHeader.outerHTML = data;
            } else {
                // If no header exists, insert it after body tag
                document.body.insertAdjacentHTML('afterbegin', data);
            }
            
            // Fix header links and images based on current page location
            fixHeaderElements();
            
            console.log('Header loaded successfully');
        })
        .catch(error => {
            console.error('Error loading header:', error);
            // Fallback: try alternative path
            let fallbackPath = window.location.pathname.includes('/pages/') ? '../../includes/header.html' : 'includes/header.html';
            console.log('Trying fallback path:', fallbackPath);
            
            fetch(fallbackPath)
                .then(response => response.text())
                .then(data => {
                    let existingHeader = document.querySelector('header');
                    if (existingHeader) {
                        existingHeader.outerHTML = data;
                    } else {
                        document.body.insertAdjacentHTML('afterbegin', data);
                    }
                    
                    // Fix header links and images based on current page location
                    fixHeaderElements();
                    
                    console.log('Header loaded with fallback path');
                })
                .catch(fallbackError => {
                    console.error('Fallback also failed:', fallbackError);
                });
        });
});

// Function to fix header links and images based on current page location
function fixHeaderElements() {
    const isInPagesDirectory = window.location.pathname.includes('/pages/');
    const isInDoublePages = window.location.pathname.includes('/pages/pages/');
    const headerLinks = document.querySelectorAll('header a[href]');
    const headerLogos = document.querySelectorAll('header img[src*="assets/images/logo"]');
    const headerImages = document.querySelectorAll('header img[src*="assets/images"]');
    
    console.log('Fixing header elements for:', isInDoublePages ? 'double pages directory' : (isInPagesDirectory ? 'pages directory' : 'root directory'));
    
    // Fix header links
    headerLinks.forEach(link => {
        const currentHref = link.getAttribute('href');
        
        if (isInDoublePages) {
            // If we're in pages/pages/ directory
            if (currentHref === 'index.html') {
                link.href = '../../index.html';
            } else if (currentHref.startsWith('pages/')) {
                link.href = currentHref.replace('pages/', '');
            }
        } else if (isInPagesDirectory) {
            // If we're in pages/ directory
            if (currentHref === 'index.html') {
                link.href = '../index.html';
            } else if (currentHref.startsWith('pages/')) {
                link.href = currentHref.replace('pages/', '');
            }
        }
        // If we're in root directory, keep links as they are
    });
    
    // Fix header logos and images
    const allHeaderImages = [...headerLogos, ...headerImages];
    allHeaderImages.forEach(img => {
        const currentSrc = img.getAttribute('src');
        
        if (isInDoublePages) {
            // If we're in pages/pages/ directory
            if (currentSrc.startsWith('assets/images/')) {
                img.src = '../../' + currentSrc;
            }
        } else if (isInPagesDirectory) {
            // If we're in pages/ directory
            if (currentSrc.startsWith('assets/images/')) {
                img.src = '../' + currentSrc;
            }
        }
        // If we're in root directory, keep paths as they are
    });
    
    console.log('Header elements fixed successfully');
} 