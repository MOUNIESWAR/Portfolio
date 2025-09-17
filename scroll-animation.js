document.addEventListener('DOMContentLoaded', () => {
    // Fade-in animation for sections
    const fadeInSections = document.querySelectorAll('.fade-in-section');
 
    if (fadeInSections.length > 0) {
        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');

                    const skillCards = entry.target.querySelectorAll('.skill-card');
                    if (skillCards.length > 0) {
                        skillCards.forEach((card, index) => {
                            card.style.transitionDelay = `${index * 75}ms`;
                        });
                    }

                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
 
        fadeInSections.forEach(section => {
            sectionObserver.observe(section);
        });
    }
 
    // Active navigation link highlighting on scroll
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('header, section[id]');
 
    if (navLinks.length > 0 && sections.length > 0) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            rootMargin: '-50% 0px -50% 0px' // Trigger when section is in the middle of the viewport
        });
 
        sections.forEach(section => {
            navObserver.observe(section);
        });
    }

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        const openIcon = mobileMenuButton.querySelector('.open-icon');
        const closeIcon = mobileMenuButton.querySelector('.close-icon');

        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            // Toggle icons
            openIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        });

        // Close mobile menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                    // Reset icons to closed state
                    openIcon.classList.remove('hidden');
                    closeIcon.classList.add('hidden');
                }
            });
        });
    }
});