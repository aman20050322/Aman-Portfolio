document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       1. Navigation Menu Toggle
       ========================================= */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    /* =========================================
       2. Scroll Effects for Navbar
       ========================================= */
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* =========================================
       3. Active Navigation Link on Scroll
       ========================================= */
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });

    /* =========================================
       4. Intersection Observer for Fade-in Animations
       ========================================= */
    const faders = document.querySelectorAll('.fade-in-up');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    /* =========================================
       5. Initialize hero animations
       ========================================= */
    // Add appear class to hero elements immediately
    setTimeout(() => {
        const heroElements = document.querySelectorAll('#home .fade-in-up');
        heroElements.forEach(el => el.classList.add('appear'));
    }, 100);

    /* =========================================
       6. Form Submission Prevention (Demo)
       ========================================= */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
            btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            contactForm.reset();
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
            }, 3000);
        });
    }
});
