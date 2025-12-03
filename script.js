document.addEventListener('DOMContentLoaded', () => {
    // ===============================
    // Mobile Menu Toggle
    // ===============================
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileClose = document.querySelector('.mobile-close');

    const openMobileMenu = () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeMobileMenu = () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    hamburger?.addEventListener('click', openMobileMenu);
    mobileClose?.addEventListener('click', closeMobileMenu);

    // Close mobile menu when clicking links
    document.querySelectorAll('.mobile-links a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && mobileMenu.classList.contains('active') &&
            !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // ===============================
    // Mobile Dropdowns
    // ===============================
    document.querySelectorAll('.mobile-dropdown .dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const content = this.nextElementSibling;
            const icon = this.querySelector('i');

            // Close other dropdowns
            document.querySelectorAll('.mobile-dropdown .dropdown-content').forEach(otherContent => {
                if (otherContent !== content) {
                    otherContent.classList.remove('active');
                    const otherIcon = otherContent.previousElementSibling.querySelector('i');
                    otherIcon.classList.remove('fa-minus');
                    otherIcon.classList.add('fa-plus');
                }
            });

            // Toggle current
            content.classList.toggle('active');
            icon.classList.toggle('fa-plus');
            icon.classList.toggle('fa-minus');
        });
    });

    // ===============================
    // Service Dropdowns
    // ===============================
    document.querySelectorAll('.service-dropdown-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const content = btn.nextElementSibling;

            document.querySelectorAll('.service-dropdown-btn').forEach(otherBtn => {
                if (otherBtn !== btn) {
                    otherBtn.nextElementSibling.classList.remove('active');
                    otherBtn.classList.remove('active');
                }
            });

            content.classList.toggle('active');
            btn.classList.toggle('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.service-dropdown')) {
            document.querySelectorAll('.service-dropdown-btn').forEach(btn => {
                btn.nextElementSibling.classList.remove('active');
                btn.classList.remove('active');
            });
        }
    });

    // ===============================
    // Blog Read More/Less
    // ===============================
    document.querySelectorAll('.read-more-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const blogText = btn.closest('.blog-content').querySelector('.blog-text');
            const isExpanded = blogText.classList.contains('expanded');
            blogText.classList.toggle('expanded', !isExpanded);
            btn.innerHTML = !isExpanded
                ? 'Read Less <i class="fas fa-chevron-up"></i>'
                : 'Read More <i class="fas fa-chevron-down"></i>';

            if (!isExpanded) btn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    });

    // ===============================
    // Smooth Anchor Scroll
    // ===============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();

            closeMobileMenu();

            const offset = document.querySelector('header').offsetHeight + 20;
            window.scrollTo({
                top: target.offsetTop - offset,
                behavior: 'smooth'
            });
        });
    });

    // ===============================
    // Back to Top Button
    // ===============================
    const header = document.querySelector('header');
    const backToTop = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        if (header) header.style.background = window.scrollY > 100 ? 'rgba(26,26,26,0.98)' : 'rgba(26,26,26,0.95)';
        backToTop?.classList.toggle('visible', window.scrollY > 500);
    });

    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===============================
    // Newsletter Form
    // ===============================
    document.querySelectorAll('.newsletter-form').forEach(form => {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const input = form.querySelector('input[type="email"]');
            const button = form.querySelector('button[type="submit"]');

            if (!input.value.trim()) return alert('Please enter a valid email.');

            const originalText = button.textContent;
            button.textContent = 'Subscribed!';
            button.style.background = '#28a745';

            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
                form.reset();
            }, 2000);
        });
    });

    // ===============================
    // Intersection Observer Animations
    // ===============================
    const animateElements = document.querySelectorAll('.service-card, .blog-card, .about-content, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animateElements.forEach(el => observer.observe(el));
});
