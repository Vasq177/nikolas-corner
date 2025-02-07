document.addEventListener('DOMContentLoaded', function() {
    // Get all filter buttons and recipe cards
    const filterButtons = document.querySelectorAll('[data-filter]');
    const recipeCards = document.querySelectorAll('[data-category]');

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

            // Show/hide recipe cards based on filter
            recipeCards.forEach(card => {
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
    const sortSelect = document.querySelector('#sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const sortValue = sortSelect.value;
            const recipeGrid = document.querySelector('.recipe-grid');
            const cards = Array.from(recipeCards);

            cards.sort((a, b) => {
                const titleA = a.querySelector('.card-title').textContent;
                const titleB = b.querySelector('.card-title').textContent;

                switch (sortValue) {
                    case 'alphabetical':
                        return titleA.localeCompare(titleB);
                    case 'alphabetical-reverse':
                        return titleB.localeCompare(titleA);
                    case 'difficulty-asc':
                        return getDifficulty(a) - getDifficulty(b);
                    case 'difficulty-desc':
                        return getDifficulty(b) - getDifficulty(a);
                    default:
                        return 0;
                }
            });

            // Re-append sorted cards
            cards.forEach(card => recipeGrid.appendChild(card));
        });
    }

    // Helper function to get difficulty level
    function getDifficulty(card) {
        const difficultyMap = {
            'Beginner': 1,
            'Intermediate': 2,
            'Advanced': 3,
            'Expert': 4
        };
        const difficultyBadge = card.querySelector('.badge:nth-child(2)');
        return difficultyMap[difficultyBadge.textContent] || 0;
    }
}); 