document.addEventListener('DOMContentLoaded', function() {
    // Get all filter buttons and product cards
    const filterButtons = document.querySelectorAll('[data-filter]');
    const productCards = document.querySelectorAll('.product-grid .card');
    const sortSelect = document.querySelector('#sort-select');

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-outline');
            });

            // Add active class to clicked button
            button.classList.remove('btn-outline');
            button.classList.add('btn-primary');

            const filterValue = button.getAttribute('data-filter');

            // Show/hide product cards based on filter
            productCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    // Add animation
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Add sorting functionality
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const sortValue = sortSelect.value;
            const productGrid = document.querySelector('.product-grid');
            const cards = Array.from(productCards);

            cards.sort((a, b) => {
                const titleA = a.querySelector('.card-title').textContent;
                const titleB = b.querySelector('.card-title').textContent;
                const priceA = parseFloat(a.getAttribute('data-price'));
                const priceB = parseFloat(b.getAttribute('data-price'));

                switch (sortValue) {
                    case 'price-asc':
                        return priceA - priceB;
                    case 'price-desc':
                        return priceB - priceA;
                    case 'alphabetical':
                        return titleA.localeCompare(titleB);
                    default:
                        return 0;
                }
            });

            // Re-append sorted cards
            cards.forEach(card => productGrid.appendChild(card));
        });
    }

    // Initialize with "All" filter active
    document.querySelector('[data-filter="all"]').click();
}); 