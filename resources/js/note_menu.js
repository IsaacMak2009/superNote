document.addEventListener('DOMContentLoaded', () => {
    let currentOpenMenu = null;

    // Handle kebab menu clicks
    document.addEventListener('click', (e) => {
        const kebabButton = e.target.closest('.kebab-button');
        const kebabMenu = e.target.closest('.kebab-menu');
        const menuItem = e.target.closest('[role="menuitem"]');

        // Clicked on a kebab button
        if (kebabButton) {
            e.preventDefault();
            e.stopPropagation();
            
            const menu = kebabButton.parentElement.querySelector('.kebab-menu');
            const wasOpen = menu.classList.contains('hidden');

            // Close any open menus
            closeAllMenus();

            // Toggle current menu
            if (wasOpen) {
                menu.classList.remove('hidden');
                kebabButton.setAttribute('aria-expanded', 'true');
                currentOpenMenu = menu;
            }
        }
        // Clicked outside menu
        else if (!kebabMenu && currentOpenMenu) {
            closeAllMenus();
        }
        
        // Handle menu item clicks
        if (menuItem) {
            closeAllMenus();
            // Add specific handling for menu items here if needed
        }
    });

    // Handle Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && currentOpenMenu) {
            closeAllMenus();
        }
    });

    function closeAllMenus() {
        document.querySelectorAll('.kebab-menu').forEach(menu => {
            menu.classList.add('hidden');
            menu.previousElementSibling.setAttribute('aria-expanded', 'false');
        });
        currentOpenMenu = null;
    }
});