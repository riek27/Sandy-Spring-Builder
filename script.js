document.addEventListener('DOMContentLoaded', function() {
    // ===============================
    // Mobile Menu Toggle
    // ===============================
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileClose = document.querySelector('.mobile-close');

    const toggleMobileMenu = () => {
        if (!mobileMenu) return;
        const isActive = mobileMenu.classList.contains('active');
        mobileMenu.classList.toggle('active', !isActive);
        document.body.style.overflow = !isActive ? 'hidden' : 'auto';
    };

    if (hamburger) hamburger.addEventListener('click', toggleMobileMenu);
    if (mobileClose) mobileClose.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when clicking links
    document.querySelectorAll('.mobile-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Mobile Dropdowns
    document.querySelectorAll('.mobile-dropdown .dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');

            // Close all other dropdowns
            document.querySelectorAll('.mobile-dropdown .dropdown-content').forEach(c => {
                if (c !== content) {
                    c.classList.remove('active');
                    const otherIcon = c.previousElementSibling.querySelector('i');
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

    // Close mobile menu when clicking outside
    document.addEventListener('click', e => {
        if (mobileMenu && mobileMenu.classList.contains('active') &&
            !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // ===============================
    // Service Dropdown
    // ===============================
    document.querySelectorAll('.service-dropdown-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();

            const content = btn.nextElementSibling;
            const isActive = content.classList.contains('active');

            document.querySelectorAll('.service-dropdown-btn').forEach(otherBtn => {
                if (otherBtn !== btn) {
                    otherBtn.nextElementSibling.classList.remove('active');
                    otherBtn.classList.remove('active');
                }
            });

            content.classList.toggle('active', !isActive);
            btn.classList.toggle('active', !isActive);
        });
    });

    document.addEventListener('click', e => {
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
        btn.addEventListener('click', function() {
            const blogText = this.closest('.blog-content').querySelector('.blog-text');
            const isExpanded = blogText.classList.contains('expanded');
            blogText.classList.toggle('expanded', !isExpanded);
            this.innerHTML = !isExpanded 
                ? 'Read Less <i class="fas fa-chevron-up"></i>' 
                : 'Read More <i class="fas fa-chevron-down"></i>';
            if (!isExpanded) this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    });

    // ===============================
    // Testimonial Slider
    // ===============================
    const track = document.querySelector('.testimonial-track');
    if (track) {
        const slides = Array.from(track.children);
        const dots = document.querySelectorAll('.slider-dot');
        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');
        let currentSlide = 0;
        let autoSlideInterval;

        const updateSlider = () => {
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
        };

        const startAutoSlide = () => autoSlideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        }, 6000);

        const stopAutoSlide = () => clearInterval(autoSlideInterval);

        nextBtn?.addEventListener('click', () => { stopAutoSlide(); currentSlide = (currentSlide + 1) % slides.length; updateSlider(); startAutoSlide(); });
        prevBtn?.addEventListener('click', () => { stopAutoSlide(); currentSlide = (currentSlide - 1 + slides.length) % slides.length; updateSlider(); startAutoSlide(); });
        dots.forEach((dot, i) => dot.addEventListener('click', () => { stopAutoSlide(); currentSlide = i; updateSlider(); startAutoSlide(); }));

        const slider = document.querySelector('.testimonial-slider');
        slider?.addEventListener('mouseenter', stopAutoSlide);
        slider?.addEventListener('mouseleave', startAutoSlide);

        startAutoSlide();
    }

    // ===============================
    // Gallery Modal
    // ===============================
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('imageModal');
    if (galleryItems.length && modal) {
        const modalImg = modal.querySelector('img');
        let currentIndex = 0;

        const openModal = i => {
            currentIndex = i;
            modalImg.src = galleryItems[i].querySelector('img').src;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => { modal.classList.remove('active'); document.body.style.overflow = 'auto'; };
        const nextImage = () => { currentIndex = (currentIndex + 1) % galleryItems.length; modalImg.src = galleryItems[currentIndex].querySelector('img').src; };
        const prevImage = () => { currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length; modalImg.src = galleryItems[currentIndex].querySelector('img').src; };

        galleryItems.forEach((item, i) => item.addEventListener('click', () => openModal(i)));
        modal.querySelector('.modal-close')?.addEventListener('click', closeModal);
        modal.querySelector('.modal-next')?.addEventListener('click', nextImage);
        modal.querySelector('.modal-prev')?.addEventListener('click', prevImage);
        modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

        document.addEventListener('keydown', e => {
            if (modal.classList.contains('active')) {
                if (e.key === 'Escape') closeModal();
                if (e.key === 'ArrowRight') nextImage();
                if (e.key === 'ArrowLeft') prevImage();
            }
        });
    }

    // ===============================
    // Smooth Scroll for Anchor Links
    // ===============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();

            if (mobileMenu) { mobileMenu.classList.remove('active'); document.body.style.overflow = 'auto'; }

            const offset = document.querySelector('header').offsetHeight + 20;
            window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
        });
    });

    // ===============================
    // Back to Top
    // ===============================
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (header) header.style.background = window.scrollY > 100 ? 'rgba(26,26,26,0.98)' : 'rgba(26,26,26,0.95)';
        backToTop?.classList.toggle('visible', window.scrollY > 500);
    });
    backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // ===============================
    // Newsletter Form
    // ===============================
    document.querySelectorAll('.newsletter-form').forEach(form => {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const input = form.querySelector('input[type="email"]');
            const button = form.querySelector('button[type="submit"]');
            if (!input.value) return alert('Please enter a valid email.');

            const originalText = button.textContent;
            button.textContent = 'Subscribed!';
            button.style.background = '#28a745';
            setTimeout(() => { button.textContent = originalText; button.style.background = ''; form.reset(); }, 2000);
        });
    });

    // ===============================
    // Intersection Observer Animations
    // ===============================
    const animateOnScroll = () => {
        document.querySelectorAll('.service-card, .blog-card, .about-content, .contact-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.service-card, .blog-card, .about-content, .contact-item').forEach(el => observer.observe(el));
    };
    animateOnScroll();
});
