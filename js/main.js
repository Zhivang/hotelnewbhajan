/**
 * HOTEL NEW BHAJAN - MAIN JAVASCRIPT
 * Handles mobile menu, scroll animations, and sticky navbar
 */

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE MENU TOGGLE =====
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            // Toggle active class on hamburger icon
            this.classList.toggle('active');
            
            // Toggle active class on navigation menu
            navLinks.classList.toggle('active');
            
            // Prevent body scrolling when mobile menu is open
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
        });
        
        // Close mobile menu when a link is clicked
        const menuLinks = navLinks.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }
    
    // ===== STICKY NAVBAR WITH SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow to navbar when scrolled
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // ===== SCROLL ANIMATIONS (FADE IN) =====
    // This observes elements and adds 'visible' class when they enter viewport
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing after animation (comment out to repeat on scroll)
                // fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Start animation slightly before element enters viewport
    });
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
    
    // ===== ACTIVE NAVIGATION LINK HIGHLIGHTING =====
    // Highlights the current page in the navigation menu
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksAll = document.querySelectorAll('.nav-links a:not(.btn)');
    
    navLinksAll.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === '/' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    // Provides smooth scrolling for in-page anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default if it's a valid anchor (not just "#")
            if (href !== '#' && href !== '') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ===== MENU CATEGORY FILTERING (for menu.html page) =====
    const categoryButtons = document.querySelectorAll('.cat-btn');
    const menuCards = document.querySelectorAll('.menu-card');
    
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const category = this.textContent.trim().toLowerCase();
                
                // Filter menu items
                menuCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (category === 'all favorites' || cardCategory === category) {
                        card.style.display = 'flex';
                        // Re-trigger fade animation
                        card.classList.remove('visible');
                        setTimeout(() => card.classList.add('visible'), 10);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // ===== FORM SUBMISSION HANDLER (for contact.html) =====
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            
            // Here you would normally send the data to a server
            // For this static site, we'll just show a success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }
    
    // ===== PARALLAX EFFECT FOR HERO SECTIONS =====
    // Adds subtle parallax movement to hero background images
    const heroSections = document.querySelectorAll('.hero');
    
    window.addEventListener('scroll', function() {
        heroSections.forEach(hero => {
            const scrollPosition = window.pageYOffset;
            const heroPosition = hero.offsetTop;
            const heroHeight = hero.offsetHeight;
            
            // Only apply parallax if hero is in viewport
            if (scrollPosition + window.innerHeight > heroPosition && scrollPosition < heroPosition + heroHeight) {
                const yPos = (scrollPosition - heroPosition) * 0.5; // Parallax speed multiplier
                hero.style.backgroundPosition = `center ${yPos}px`;
            }
        });
    });
    
    console.log('Hotel New Bhajan - Website initialized successfully');
});
