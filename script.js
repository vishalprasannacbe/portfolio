// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Allow default behavior for external links
            const href = this.getAttribute('href');
            if (!href.startsWith('#')) {
                return; // Allow page navigation for external links
            }
            // Close menu after a small delay to allow smooth scroll to start
            setTimeout(() => {
                navLinks.classList.remove('active');
            }, 100);
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-container') && !event.target.closest('.nav-links a')) {
            navLinks.classList.remove('active');
        }
    });
}

// Auto-hide navbar on scroll
const navbar = document.querySelector('.navbar');
let lastScrollPosition = 0;
let isScrolling = false;
let scrollTimeout;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Show navbar when scrolling up
    if (currentScroll < lastScrollPosition) {
        navbar.style.transform = 'translateY(0)';
        navbar.style.opacity = '1';
    } 
    // Hide navbar when scrolling down (but only after scrolling more than 50px)
    else if (currentScroll > lastScrollPosition && currentScroll > 50) {
        navbar.style.transform = 'translateY(-100%)';
        navbar.style.opacity = '0.8';
    }
    
    lastScrollPosition = currentScroll;
    
    // Clear existing timeout
    clearTimeout(scrollTimeout);
    
    // Show navbar again after scrolling stops for 1 second
    scrollTimeout = setTimeout(() => {
        navbar.style.transform = 'translateY(0)';
        navbar.style.opacity = '1';
    }, 1000);
});

// Add transition styles to navbar
navbar.style.transition = 'transform 0.3s ease, opacity 0.3s ease';

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Typing animation for changing text
const texts = ['Student', 'Developer', 'Problem Solver', 'Innovator'];
let currentIndex = 0;
const changingTexts = document.querySelectorAll('.changing-text, .changing-text-2');

function typeEffect() {
    changingTexts.forEach(el => {
        el.textContent = texts[currentIndex];
        el.style.animation = 'none';
        setTimeout(() => {
            el.style.animation = 'fadeIn 0.5s ease';
        }, 100);
    });
    currentIndex = (currentIndex + 1) % texts.length;
}

setInterval(typeEffect, 3000);

// Active navigation highlight on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideIn 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Screenshot Modal Gallery
document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality disabled - screenshots won't expand
    // Images display as static thumbnails only
});
