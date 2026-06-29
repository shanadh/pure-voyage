/* ==========================================================================
   PURE VOYAGE - TROPICAL BLISS LAKSHADWEEP ESCAPE INTERACTIVE SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 0. Global Package Switcher
    // ==========================================
    const pkgBtns = document.querySelectorAll('.pkg-btn');
    document.body.setAttribute('data-active-pkg', 'monsoon');

    pkgBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const pkg = btn.getAttribute('data-pkg');
            pkgBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.body.setAttribute('data-active-pkg', pkg);
        });
    });

    // ==========================================
    // 1. Sticky Navigation & Header Adjustments
    // ==========================================
    const header = document.getElementById('header');
    const backToTop = document.getElementById('back-to-top');

    const handleScroll = () => {
        const scrollY = window.scrollY;

        // Sticky Navbar Toggle
        if (scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to Top Button Visibility
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger initial execution in case of page refresh


    // ==========================================
    // 2. Smooth Scroll & Back to Top behavior
    // ==========================================
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    // ==========================================
    // 3. Mobile Navigation Drawer Toggle
    // ==========================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerClose = document.getElementById('drawer-close');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    const openDrawer = () => {
        mobileDrawer.classList.add('open');
        drawerOverlay.classList.add('visible');
        document.body.style.overflow = 'hidden'; // Lock body scroll when menu is open
    };

    const closeDrawer = () => {
        mobileDrawer.classList.remove('open');
        drawerOverlay.classList.remove('visible');
        document.body.style.overflow = ''; // Unlock body scroll
    };

    mobileToggle.addEventListener('click', openDrawer);
    drawerClose.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);

    // Close drawer when a link is clicked
    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeDrawer();
        });
    });


    // ==========================================
    // 4. Scrollspy (Highlight active nav link)
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');

    const scrollSpy = () => {
        const scrollPosition = window.scrollY + 120; // offset header height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
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
    };

    window.addEventListener('scroll', scrollSpy);


    // ==========================================
    // 5. Custom Image Gallery Lightbox
    // ==========================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightboxBtn = document.getElementById('close-lightbox');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    
    let currentIndex = 0;
    const galleryImagesData = [];

    // Map and collect data from elements
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('.gallery-image');
        galleryImagesData.push({
            src: img.getAttribute('src'),
            alt: img.getAttribute('alt')
        });

        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    const openLightbox = (index) => {
        currentIndex = index;
        updateLightboxContent();
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeLightbox = () => {
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restore scroll
    };

    const updateLightboxContent = () => {
        const data = galleryImagesData[currentIndex];
        lightboxImg.setAttribute('src', data.src);
        lightboxImg.setAttribute('alt', data.alt);
        lightboxCaption.textContent = data.alt;
    };

    const showNextImage = () => {
        currentIndex = (currentIndex + 1) % galleryImagesData.length;
        updateLightboxContent();
    };

    const showPrevImage = () => {
        currentIndex = (currentIndex - 1 + galleryImagesData.length) % galleryImagesData.length;
        updateLightboxContent();
    };

    // Event listeners for lightbox controls
    closeLightboxBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', showNextImage);
    prevBtn.addEventListener('click', showPrevImage);

    // Close on overlay click (not on image or nav buttons)
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrapper')) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('open')) return;

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        }
    });


    // ==========================================
    // 6. Interactive Booking Form & WhatsApp Redirect
    // ==========================================
    const bookingForm = document.getElementById('booking-form');

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('form-name').value.trim();
        const phone = document.getElementById('form-phone').value.trim();
        const date = document.getElementById('form-date').value;
        const guests = document.getElementById('form-guests').value;
        const message = document.getElementById('form-message').value.trim();

        // Validate values
        if (!name || !phone || !date || !guests) {
            alert('Please fill out all required fields.');
            return;
        }

        // Format dates beautifully (e.g. 28 Jun 2026)
        const travelDate = new Date(date);
        const formattedDate = travelDate.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });

        // WhatsApp Details
        const whatsappNumber = '918593895718'; // +91 8593895718 without symbols
        
        // Build message content
        let textMessage = `*Pure Voyage - Booking Request*\n\n`;
        const activePkg = document.body.getAttribute('data-active-pkg') || 'monsoon';
        const pkgDisplayName = activePkg === 'monsoon' ? 'Monsoon Special Package' : 'Regular Season Package';
        textMessage += `I want to book the *Tropical Bliss (Lakshadweep Escape - ${pkgDisplayName})* package.\n\n`;
        textMessage += `*Guest Details:*\n`;
        textMessage += `• *Name:* ${name}\n`;
        textMessage += `• *Phone:* ${phone}\n`;
        textMessage += `• *Departure Date:* ${formattedDate}\n`;
        textMessage += `• *Number of Guests:* ${guests}\n`;
        
        if (message) {
            textMessage += `\n*Special Notes & Customisations:*\n${message}\n`;
        }

        // Encode message text
        const encodedText = encodeURIComponent(textMessage);

        // Construct API URL
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

        // Open in new tab/window
        window.open(whatsappUrl, '_blank');
    });


    // ==========================================
    // 7. Scroll-Reveal Animations (IntersectionObserver)
    // ==========================================
    // Elements to reveal on scroll
    const itemsToReveal = [];

    // Select elements and add the base class dynamically for progressive enhancement
    const queryList = [
        '.section-header', 
        '.highlight-card', 
        '.itinerary-card', 
        '.inc-exc-card', 
        '.gallery-item', 
        '.pricing-info', 
        '#pricing-value-card-monsoon', 
        '#pricing-value-card-normal', 
        '#contact-info-panel', 
        '#contact-form-panel'
    ];

    queryList.forEach(query => {
        document.querySelectorAll(query).forEach(el => {
            el.classList.add('reveal-element');
            itemsToReveal.push(el);
        });
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add active class to animate
                entry.target.classList.add('active');
                // Unobserve after showing to avoid repeat animations
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15, // trigger when 15% is visible
        rootMargin: '0px 0px -50px 0px' // offset bottom trigger slightly
    });

    // Observe elements
    itemsToReveal.forEach(item => {
        revealObserver.observe(item);
    });

});
