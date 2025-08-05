// Gallery Filter JavaScript - New Approach
$(document).ready(function () {
    const categoryButtons = document.querySelectorAll('.gallery-category');
    let currentCategory = 'general'; // Track current active category
    
    // Initialize all galleries but keep them hidden initially
    $('.gallery-content').each(function() {
        const itemCount = $(this).find('.item').length;
        
        $(this).owlCarousel({
            loop: true, // Always enable loop
            margin: 5,
            nav: true,
            dots: false,
            center: true, // Always center
            navText: ["<i class='bi bi-arrow-left-short'></i>", "<i class='bi bi-arrow-right-short'></i>"],
            responsive: {
                0: { items: 1 },
                600: { items: 2 },
                1000: { items: 2 }
            }
        });
    });
    
    // Function to show specific gallery
    function showGallery(category) {
        currentCategory = category; // Update current category
        
        // Hide all galleries
        $('.gallery-content').hide();
        
        // Show selected gallery
        const targetGallery = $('#' + category + '-gallery');
        targetGallery.show();
        
        // Refresh the carousel to ensure proper display
        setTimeout(() => {
            targetGallery.trigger('refresh.owl.carousel');
        }, 100);
    }
    
    // Add click event listeners to category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get category from data attribute
            const category = this.getAttribute('data-category');

            // Show appropriate gallery
            showGallery(category);
        });
    });
    
    // Fullscreen gallery button click handler
    $('#fullscreen-gallery-btn').click(function() {
        // Get the first image link from current category's lightbox
        const firstLink = $('#' + currentCategory + '-lightbox a[data-fslightbox]').first();
        if (firstLink.length) {
            firstLink[0].click(); // Trigger the lightbox
        }
    });
    
    // Initialize with general gallery
    showGallery('general');
});