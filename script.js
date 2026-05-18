// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Swiper for Hero Slider
    if (document.querySelector('.hero-slider')) {
        const heroSwiper = new Swiper('.hero-slider', {
            slidesPerView: 1,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            speed: 1200,
            loop: true,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.hero-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.hero-next',
                prevEl: '.hero-prev',
            }
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('ph-list');
                icon.classList.add('ph-x');
            } else {
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            }
        });
    }

    // Sticky Navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Initialize Swiper for Services (Manual — swipe/drag only)
    if (document.querySelector('.services-slider')) {
        const servicesSwiper = new Swiper('.services-slider', {
            slidesPerView: 1.2,
            spaceBetween: 20,
            loop: false,
            grabCursor: true,
            allowTouchMove: true,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: true,
            touchEventsTarget: 'container',
            breakpoints: {
                480: { slidesPerView: 1.5, spaceBetween: 20 },
                640: { slidesPerView: 2,   spaceBetween: 24 },
                992: { slidesPerView: 3,   spaceBetween: 28 },
                1200: { slidesPerView: 4,  spaceBetween: 30 }
            },
            pagination: {
                el: '.services-pagination',
                clickable: true,
            }
        });
    }

    // Initialize Swiper for Doctors
    if (document.querySelector('.doctors-slider')) {
        const doctorsSwiper = new Swiper('.doctors-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            breakpoints: {
                640: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
                1200: { slidesPerView: 4 }
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            }
        });
    }

    // Initialize Swiper for Testimonials
    if (document.querySelector('.testimonials-slider')) {
        const testimonialsSwiper = new Swiper('.testimonials-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            breakpoints: {
                768: { slidesPerView: 1.5 },
                1024: { slidesPerView: 2 }
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            }
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        header.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            item.classList.toggle('active');
        });
    });

    // Number Counter Animation
    const counters = document.querySelectorAll('.stat-num');
    const speed = 200; // lower is faster

    const startCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +(counter.innerText.replace(/,/g, ''));
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc).toLocaleString();
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = target.toLocaleString();
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    };

    const counterObserver = new IntersectionObserver(startCounters, { threshold: 0.5 });
    counters.forEach(counter => counterObserver.observe(counter));

    // Scroll Reveal Animations
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;
        
        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    document.querySelector('.mobile-menu-btn i').classList.replace('ph-x', 'ph-list');
                }
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});