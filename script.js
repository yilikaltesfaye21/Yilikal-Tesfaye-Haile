import { gsap } from 'gsap';
import { ScrollTrigger } from 'https://cdn.jsdelivr.net/npm/gsap@3.12.2/ScrollTrigger.min.js';
import * as config from './config.js';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

function init() {
    // Apply configuration
    applyConfig();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize animations
    initAnimations();
    
    // Initialize project filtering
    initProjectFilters();
    
    // Initialize Email.js for contact form functionality
    initEmailJs();
}

function applyConfig() {
    // Apply customizations from config file
    document.documentElement.style.setProperty('--primary-color', config.primaryColor);
    document.documentElement.style.setProperty('--accent-color', config.accentColor);
    document.documentElement.style.setProperty('--dark-color', config.darkColor);
    
    // Update content from config
    document.querySelectorAll('.hero-content h1 span').forEach(el => {
        el.textContent = config.name;
    });
    
    document.querySelector('.tagline').textContent = config.tagline;
    document.querySelector('.logo').textContent = config.initials;
    
    // Update page title
    document.title = `${config.name} | Personal Website`;
    
    // Update contact information from config
    document.querySelector('.email-value').textContent = config.email;
    document.querySelector('.phone-value').textContent = config.phone;
    document.querySelector('.location-value').textContent = config.location;
    
    // Update social links
    document.querySelectorAll('.social-links a').forEach(link => {
        const platform = link.getAttribute('data-platform');
        if (platform === 'linkedin') link.href = config.linkedinUrl;
        if (platform === 'github') link.href = config.githubUrl;
        if (platform === 'twitter') link.href = config.twitterUrl;
        if (platform === 'researchgate') link.href = config.researchGateUrl;
    });
    
    // Add CV URL from config
    const cvButtons = document.querySelectorAll('.cv-download-btn');
    cvButtons.forEach(btn => {
        btn.href = config.cvUrl;
    });
}

function initNavigation() {
    const navLinks = document.querySelectorAll('nav ul li a');
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    const header = document.querySelector('header');
    
    // Handle nav link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Close mobile menu if open
            navMenu.classList.remove('show');
            
            // Navigate to section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });
    
    // Handle mobile menu toggle
    mobileMenuButton.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });
    
    // Handle scroll event to change header style
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

function initAnimations() {
    // Hero section animations
    gsap.from('.hero-content', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.5
    });
    
    gsap.from('.hero-graphic', {
        opacity: 0,
        x: 50,
        duration: 1,
        delay: 0.8
    });
    
    // Sections animation on scroll
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top 70%',
            onEnter: () => section.classList.add('active'),
            once: true
        });
    });
    
    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-level');
    
    ScrollTrigger.create({
        trigger: '.skills',
        start: 'top 80%',
        onEnter: () => {
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = 0;
                gsap.to(bar, {
                    width: width,
                    duration: 1.5,
                    ease: 'power2.out'
                });
            });
        },
        once: true
    });
    
    // Stat cards animation
    const statCards = document.querySelectorAll('.stat-card');
    
    ScrollTrigger.create({
        trigger: '.about-stats',
        start: 'top 80%',
        onEnter: () => {
            gsap.from(statCards, {
                opacity: 0,
                y: 30,
                stagger: 0.2,
                duration: 0.8
            });
        },
        once: true
    });
    
    // Project cards animation
    const projectCards = document.querySelectorAll('.project-card');
    
    ScrollTrigger.create({
        trigger: '.projects-grid',
        start: 'top 80%',
        onEnter: () => {
            gsap.from(projectCards, {
                opacity: 0,
                y: 30,
                stagger: 0.15,
                duration: 0.8
            });
        },
        once: true
    });
    
    // Education timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    ScrollTrigger.create({
        trigger: '.education-timeline',
        start: 'top 80%',
        onEnter: () => {
            gsap.from(timelineItems, {
                opacity: 0,
                x: -50,
                stagger: 0.3,
                duration: 0.8
            });
        },
        once: true
    });
    
    // Publications animation
    const publications = document.querySelectorAll('.publication');
    
    ScrollTrigger.create({
        trigger: '.publications-list',
        start: 'top 80%',
        onEnter: () => {
            gsap.from(publications, {
                opacity: 0,
                y: 30,
                stagger: 0.2,
                duration: 0.8
            });
        },
        once: true
    });
    
    // Services animation
    const serviceCards = document.querySelectorAll('.service-card');
    
    ScrollTrigger.create({
        trigger: '.services-grid',
        start: 'top 80%',
        onEnter: () => {
            gsap.from(serviceCards, {
                opacity: 0,
                y: 30,
                stagger: 0.2,
                duration: 0.8
            });
        },
        once: true
    });
}

function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Get filter value
            const filter = btn.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || filter === category) {
                    card.style.display = 'block';
                    gsap.to(card, {
                        opacity: 1,
                        y: 0,
                        duration: 0.4
                    });
                } else {
                    gsap.to(card, {
                        opacity: 0,
                        y: 20,
                        duration: 0.4,
                        onComplete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

function initContactForm() {
    // Contact form functionality moved to React component and Email.js
    // This function is kept for backwards compatibility
    console.log("Contact form initialized with Email.js");
}

function initEmailJs() {
    // Initialize Email.js with user ID from config
    emailjs.init(config.emailjsUserId);
}