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

    // ==========================================
    // PREMIUM CUSTOM CURSOR & INTERACTION SYSTEM
    // ==========================================
    const initCustomCursor = () => {
        // Disable on touch devices or small screens
        if ('ontouchstart' in window || window.innerWidth <= 1024 || window.matchMedia('(pointer: coarse)').matches) {
            return;
        }

        // Load GSAP dynamically for ultra-smooth 60fps interpolation
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        script.onload = () => {
            setupCursorLogic();
        };
        script.onerror = () => {
            // High-end vanilla requestAnimationFrame fallback if CDN fails
            setupCursorFallback();
        };
        document.head.appendChild(script);
    };

    const setupCursorLogic = () => {
        const cursorDot = document.createElement('div');
        cursorDot.className = 'custom-cursor';
        const cursorRing = document.createElement('div');
        cursorRing.className = 'custom-cursor-ring';
        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorRing);

        let mouseX = 0;
        let mouseY = 0;

        // Mousemove logic with GSAP smooth follow
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            gsap.to(cursorDot, {
                x: mouseX,
                y: mouseY,
                duration: 0.08,
                overwrite: 'auto'
            });

            gsap.to(cursorRing, {
                x: mouseX,
                y: mouseY,
                duration: 0.35,
                ease: 'power3.out',
                overwrite: 'auto'
            });

            // occasional particle spark
            if (Math.random() < 0.04) {
                createSpark(mouseX, mouseY);
            }
        });

        // Click Ripple & squeeze animation
        window.addEventListener('mousedown', (e) => {
            const ripple = document.createElement('div');
            ripple.className = 'cursor-ripple';
            ripple.style.left = e.clientX + 'px';
            ripple.style.top = e.clientY + 'px';
            document.body.appendChild(ripple);

            gsap.fromTo(cursorRing, 
                { scale: 0.8 }, 
                { scale: 1, duration: 0.3, ease: 'back.out(2)' }
            );

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        // Floating sparks generator
        const createSpark = (x, y) => {
            const spark = document.createElement('div');
            spark.className = 'cursor-spark';
            spark.style.left = x + 'px';
            spark.style.top = y + 'px';
            
            // Random colors (teal vs orange)
            const color = Math.random() > 0.5 ? '#17c3b2' : '#f47c48';
            spark.style.backgroundColor = color;
            spark.style.boxShadow = `0 0 8px ${color}`;

            document.body.appendChild(spark);

            gsap.to(spark, {
                x: `+=${(Math.random() - 0.5) * 60}`,
                y: `-=${Math.random() * 80 + 30}`,
                opacity: 0,
                scale: 0.1,
                duration: Math.random() * 0.8 + 0.6,
                ease: 'power1.out',
                onComplete: () => spark.remove()
            });
        };

        // Hover expand selectors
        const hoverTargets = 'a, button, .btn, .service-card, .doctor-card, .facility-card, .faq-header, .swiper-button-next, .swiper-button-prev, .swiper-pagination-bullet';
        
        document.body.addEventListener('mouseenter', (e) => {
            const target = e.target.closest(hoverTargets);
            if (target) {
                cursorDot.classList.add('hovered');
                cursorRing.classList.add('hovered');
                
                // Soft card scaling
                const card = target.closest('.service-card, .doctor-card');
                if (card) {
                    gsap.to(card, {
                        scale: 1.03,
                        boxShadow: '0 15px 35px rgba(40, 76, 116, 0.12)',
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                }
            }
        }, true);

        document.body.addEventListener('mouseleave', (e) => {
            const target = e.target.closest(hoverTargets);
            if (target) {
                cursorDot.classList.remove('hovered');
                cursorRing.classList.remove('hovered');
                
                const card = target.closest('.service-card, .doctor-card');
                if (card) {
                    gsap.to(card, {
                        scale: 1,
                        boxShadow: 'none',
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                }
            }
        }, true);

        // Magnetic CTA Effect
        const magneticTargets = '.btn-primary, .btn-teal-pill';
        
        document.body.addEventListener('mousemove', (e) => {
            const magneticBtn = e.target.closest(magneticTargets);
            if (magneticBtn) {
                const rect = magneticBtn.getBoundingClientRect();
                const btnX = rect.left + rect.width / 2;
                const btnY = rect.top + rect.height / 2;
                const distOffset = 60;

                const deltaX = e.clientX - btnX;
                const deltaY = e.clientY - btnY;
                const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                if (dist < distOffset) {
                    gsap.to(magneticBtn, {
                        x: deltaX * 0.35,
                        y: deltaY * 0.35,
                        duration: 0.3,
                        overwrite: 'auto',
                        ease: 'power2.out'
                    });
                    
                    gsap.to(cursorRing, {
                        x: btnX + deltaX * 0.15,
                        y: btnY + deltaY * 0.15,
                        width: 52,
                        height: 52,
                        duration: 0.2,
                        overwrite: 'auto'
                    });
                } else {
                    resetMagnetic(magneticBtn);
                }
            }
        });

        document.body.addEventListener('mouseleave', (e) => {
            const magneticBtn = e.target.closest(magneticTargets);
            if (magneticBtn) {
                resetMagnetic(magneticBtn);
            }
        }, true);

        const resetMagnetic = (el) => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1.1, 0.4)'
            });
        };
    };

    const setupCursorFallback = () => {
        const cursorDot = document.createElement('div');
        cursorDot.className = 'custom-cursor';
        const cursorRing = document.createElement('div');
        cursorRing.className = 'custom-cursor-ring';
        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorRing);

        let mouseX = 0;
        let mouseY = 0;
        let ringX = 0;
        let ringY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        const render = () => {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;

            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';

            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);

        window.addEventListener('mousedown', (e) => {
            const ripple = document.createElement('div');
            ripple.className = 'cursor-ripple';
            ripple.style.left = e.clientX + 'px';
            ripple.style.top = e.clientY + 'px';
            document.body.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });

        const hoverTargets = 'a, button, .btn, .service-card, .doctor-card, .facility-card, .faq-header';
        document.body.addEventListener('mouseenter', (e) => {
            if (e.target.matches(hoverTargets) || e.target.closest(hoverTargets)) {
                cursorDot.classList.add('hovered');
                cursorRing.classList.add('hovered');
            }
        }, true);

        document.body.addEventListener('mouseleave', (e) => {
            if (e.target.matches(hoverTargets) || e.target.closest(hoverTargets)) {
                cursorDot.classList.remove('hovered');
                cursorRing.classList.remove('hovered');
            }
        }, true);
    };

    // Run cursor activation
    initCustomCursor();
});