document.addEventListener('DOMContentLoaded', () => {
    
    // Mobile Hamburger Menu
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3D Card Tilt Effect
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation based on cursor position relative to center
            const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset transform when mouse leaves
            card.style.transform = 'rotateX(0) rotateY(0)';
            card.style.transition = 'transform 0.5s ease';
        });
        
        card.addEventListener('mouseenter', () => {
            // Remove transition during hover for instant response
            card.style.transition = 'none';
        });
    });

    // Dynamically add animation classes to elements
    const elementsToAnimate = document.querySelectorAll('.section-header, .service-card, .timeline-item, .card-wrapper, .echo-card, .contact-container');
    elementsToAnimate.forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        const delay = (index % 3) * 100; 
        if(delay > 0) el.classList.add(`delay-${delay}`);
    });

    // Scroll Animations (Intersection Observer)
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // Hero 3-Banner Slider Logic
    const sliderTrack = document.getElementById('sliderTrack');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const dots = document.querySelectorAll('.dot');
    
    if (sliderTrack && slides.length > 0) {
        let currentIndex = 0;
        let slideInterval;
        const autoSlideDelay = 4500; // 4.5 seconds

        const updateSlider = (index) => {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            currentIndex = index;

            sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

            dots.forEach((dot, idx) => {
                if (idx === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };

        const startAutoSlide = () => {
            stopAutoSlide();
            slideInterval = setInterval(() => {
                updateSlider(currentIndex + 1);
            }, autoSlideDelay);
        };

        const stopAutoSlide = () => {
            if (slideInterval) clearInterval(slideInterval);
        };

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                updateSlider(currentIndex + 1);
                startAutoSlide();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                updateSlider(currentIndex - 1);
                startAutoSlide();
            });
        }

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const targetIdx = parseInt(dot.getAttribute('data-index'), 10);
                updateSlider(targetIdx);
                startAutoSlide();
            });
        });

        // Pause auto-sliding when mouse is hovering over hero slider
        const heroSlider = document.querySelector('.hero-slider');
        if (heroSlider) {
            heroSlider.addEventListener('mouseenter', stopAutoSlide);
            heroSlider.addEventListener('mouseleave', startAutoSlide);
        }

        // Initialize auto-sliding
        startAutoSlide();
    }


    // ---- Occasions slider ----
    const occTrack = document.getElementById("occTrack");
    const occPrev = document.getElementById("occPrev");
    const occNext = document.getElementById("occNext");
    if (occTrack && occPrev && occNext) {
        occPrev.addEventListener("click", () => occTrack.scrollBy({ left: -220, behavior: "smooth" }));
        occNext.addEventListener("click", () => occTrack.scrollBy({ left: 220, behavior: "smooth" }));
    }

    // ---- Featured cards slider (with smooth auto-slide) ----
    const featTrack = document.getElementById("featTrack");
    const featPrev = document.getElementById("featPrev");
    const featNext = document.getElementById("featNext");

    if (featTrack) {
        let featSlideInterval = null;

        const getScrollAmount = () => {
            const firstCard = featTrack.querySelector(".feat-card");
            return firstCard ? firstCard.offsetWidth + 24 : 224;
        };

        const slideNextCard = () => {
            const step = getScrollAmount();
            const maxScroll = featTrack.scrollWidth - featTrack.clientWidth;
            
            // Loop back to start if near or at the end
            if (featTrack.scrollLeft >= maxScroll - 20) {
                featTrack.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                featTrack.scrollBy({ left: step, behavior: "smooth" });
            }
        };

        const slidePrevCard = () => {
            const step = getScrollAmount();
            if (featTrack.scrollLeft <= 20) {
                featTrack.scrollTo({ left: featTrack.scrollWidth - featTrack.clientWidth, behavior: "smooth" });
            } else {
                featTrack.scrollBy({ left: -step, behavior: "smooth" });
            }
        };

        const startAutoSlide = () => {
            clearInterval(featSlideInterval);
            featSlideInterval = setInterval(slideNextCard, 2500);
        };

        const stopAutoSlide = () => {
            clearInterval(featSlideInterval);
            featSlideInterval = null;
        };

        if (featNext) {
            featNext.addEventListener("click", () => {
                slideNextCard();
                startAutoSlide();
            });
        }

        if (featPrev) {
            featPrev.addEventListener("click", () => {
                slidePrevCard();
                startAutoSlide();
            });
        }

        const featOuter = featTrack.closest(".feat-cards-outer") || featTrack;
        featOuter.addEventListener("mouseenter", stopAutoSlide);
        featOuter.addEventListener("mouseleave", startAutoSlide);
        featTrack.addEventListener("touchstart", stopAutoSlide, { passive: true });
        featTrack.addEventListener("touchend", () => {
            setTimeout(startAutoSlide, 1500);
        }, { passive: true });

        // Start auto slide
        startAutoSlide();
    }


    // ---- Staggered Occasion items entrance ----
    const occItems = document.querySelectorAll(".occ-item");
    const occObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            occItems.forEach((item, i) => {
                setTimeout(() => {
                    item.classList.add("occ-visible");
                }, i * 80);
            });
            occObserver.disconnect();
        }
    }, { threshold: 0.2 });
    if (occItems.length) occObserver.observe(occItems[0].closest("section"));

    // Occasion click active pulse
    occItems.forEach(item => {
        item.addEventListener("click", () => {
            occItems.forEach(i => i.classList.remove("active-occ"));
            item.classList.add("active-occ");
        });
    });

    // ---- General scroll reveal ----
    const revealEls = document.querySelectorAll(
        ".feat-card, .testi-card, .why-feat, .why-quote, .why-header-wrap, .g-item, .process-card, .process-showcase, .nl-inner, .contact-container, .feat-sidebar"
    );
    revealEls.forEach((el, i) => {
        el.classList.add("reveal");
        if (i % 4 === 1) el.classList.add("reveal-delay-1");
        else if (i % 4 === 2) el.classList.add("reveal-delay-2");
        else if (i % 4 === 3) el.classList.add("reveal-delay-3");
    });

    const revObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                revObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    document.querySelectorAll(".reveal").forEach(el => revObserver.observe(el));

    // ---- Gallery Category Filter Logic ----
    const filterBtns = document.querySelectorAll(".g-filter");
    const galleryItems = document.querySelectorAll(".g-item");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            galleryItems.forEach(item => {
                const category = item.getAttribute("data-category");
                if (filterValue === "all" || category === filterValue) {
                    item.classList.remove("filtered-out");
                    item.style.animation = "fadeInScale 0.45s ease forwards";
                } else {
                    item.classList.add("filtered-out");
                }
            });
        });
    });

    // ---- Gallery Lightbox Modal Controller ----
    const lightbox = document.getElementById("galleryLightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxTag = document.getElementById("lightboxTag");
    const lightboxTitle = document.getElementById("lightboxTitle");
    const lightboxDesc = document.getElementById("lightboxDesc");
    const lightboxCounter = document.getElementById("lightboxCounter");
    const lightboxClose = document.getElementById("lightboxClose");
    const lightboxPrev = document.getElementById("lightboxPrev");
    const lightboxNext = document.getElementById("lightboxNext");

    if (lightbox && galleryItems.length > 0) {
        let currentGalleryIndex = 0;

        // Collect visible gallery item data
        const getGalleryData = () => {
            const visibleItems = Array.from(galleryItems).filter(item => !item.classList.contains("filtered-out"));
            return visibleItems.map(item => {
                const img = item.querySelector("img");
                const tag = item.querySelector(".g-tag");
                const title = item.querySelector("h3");
                const desc = item.querySelector("p");
                return {
                    src: img ? img.getAttribute("src") : "",
                    alt: img ? img.getAttribute("alt") : "Gallery Image",
                    tag: tag ? tag.textContent : "Real Celebration",
                    title: title ? title.textContent : "",
                    desc: desc ? desc.textContent : ""
                };
            });
        };

        const updateLightboxContent = (index) => {
            const data = getGalleryData();
            if (data.length === 0) return;

            if (index < 0) index = data.length - 1;
            if (index >= data.length) index = 0;
            currentGalleryIndex = index;

            const item = data[currentGalleryIndex];

            // Smooth fade transition
            lightboxImg.style.opacity = "0";
            lightboxImg.style.transform = "scale(0.96)";

            setTimeout(() => {
                lightboxImg.src = item.src;
                lightboxImg.alt = item.alt;
                if (lightboxTag) lightboxTag.textContent = item.tag;
                if (lightboxTitle) lightboxTitle.textContent = item.title;
                if (lightboxDesc) lightboxDesc.textContent = item.desc;
                if (lightboxCounter) lightboxCounter.textContent = `${currentGalleryIndex + 1} / ${data.length}`;

                lightboxImg.style.opacity = "1";
                lightboxImg.style.transform = "scale(1)";
            }, 150);
        };

        const openLightbox = (index) => {
            currentGalleryIndex = index;
            updateLightboxContent(currentGalleryIndex);
            lightbox.classList.add("active");
            lightbox.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden"; // Lock background scroll
        };

        const closeLightbox = () => {
            lightbox.classList.remove("active");
            lightbox.setAttribute("aria-hidden", "true");
            document.body.style.overflow = "";
        };

        // Attach click to all gallery items
        galleryItems.forEach(item => {
            item.addEventListener("click", () => {
                const data = getGalleryData();
                const imgSrc = item.querySelector("img")?.getAttribute("src");
                const idx = data.findIndex(d => d.src === imgSrc);
                openLightbox(idx !== -1 ? idx : 0);
            });
        });

        if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
        if (lightboxPrev) lightboxPrev.addEventListener("click", () => updateLightboxContent(currentGalleryIndex - 1));
        if (lightboxNext) lightboxNext.addEventListener("click", () => updateLightboxContent(currentGalleryIndex + 1));

        // Click outside image to close
        const backdrop = lightbox.querySelector(".lightbox-backdrop");
        if (backdrop) backdrop.addEventListener("click", closeLightbox);

        // Keyboard navigation (Esc to close, Left/Right arrows)
        window.addEventListener("keydown", (e) => {
            if (!lightbox.classList.contains("active")) return;
            if (e.key === "Escape") closeLightbox();
            else if (e.key === "ArrowLeft") updateLightboxContent(currentGalleryIndex - 1);
            else if (e.key === "ArrowRight") updateLightboxContent(currentGalleryIndex + 1);
        });
    }



    // ---- Premium Occasions Auto-Slider ----
    const occT = document.getElementById("occTrack");
    const occP = document.getElementById("occPrev");
    const occN = document.getElementById("occNext");
    const occItemEls = document.querySelectorAll(".occ-item");

    if (occT && occP && occN) {
        let occAutoInterval;
        let occActiveIdx = 0;

        function scrollToOccItem(idx) {
            if (idx < 0) idx = occItemEls.length - 1;
            if (idx >= occItemEls.length) idx = 0;
            occActiveIdx = idx;

            occItemEls.forEach(i => i.classList.remove("selected"));
            occItemEls[occActiveIdx].classList.add("selected");

            const item = occItemEls[occActiveIdx];
            const trackRect = occT.getBoundingClientRect();
            const itemRect = item.getBoundingClientRect();
            const scrollLeft = occT.scrollLeft + (itemRect.left - trackRect.left) - (trackRect.width / 2) + (itemRect.width / 2);
            occT.scrollTo({ left: scrollLeft, behavior: "smooth" });
        }

        function startOccAuto() {
            clearInterval(occAutoInterval);
            occAutoInterval = setInterval(() => {
                scrollToOccItem(occActiveIdx + 1);
            }, 2800);
        }

        occP.addEventListener("click", () => { scrollToOccItem(occActiveIdx - 1); startOccAuto(); });
        occN.addEventListener("click", () => { scrollToOccItem(occActiveIdx + 1); startOccAuto(); });

        occItemEls.forEach((item, i) => {
            item.addEventListener("click", () => { scrollToOccItem(i); startOccAuto(); });
        });

        occT.addEventListener("mouseenter", () => clearInterval(occAutoInterval));
        occT.addEventListener("mouseleave", startOccAuto);

        // Init first item selected
        occItemEls[0].classList.add("selected");
        startOccAuto();
    }


});