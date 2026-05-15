/* ================================================
   ANTALYA PIZZERIA — App Logic
   GSAP ScrollTrigger + Preloader + Animations
   ================================================ */

(function () {
    'use strict';

    // ============ GSAP Setup ============
    gsap.registerPlugin(ScrollTrigger);

    // ============ Frame Sequence Config ============
    const FRAME_COUNT = 124;
    const FRAME_PATH = (i) => `frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;

    const canvas = document.getElementById('heroCanvas');
    const ctx = canvas.getContext('2d', { alpha: false }); // Performance-Boost durch Deaktivieren von Alpha
    const images = [];
    let loadedCount = 0;
    const frameState = { currentIndex: 0 };

    // ============ Canvas Sizing (Retina Ready) ============
    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        
        // CSS display size
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        
        // Internal pixel resolution
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        
        renderFrame(frameState.currentIndex);
    }

    function renderFrame(index) {
        if (!images[index] || !images[index].complete) return;
        const img = images[index];
        // Qualitätseinstellungen
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Cover-fit mit Zoom-Bremse für Mobile
        const wScale = canvas.width / img.width;
        const hScale = canvas.height / img.height;
        let scale = Math.max(wScale, hScale);

        // Speziell für Mobile (Portrait): Wenn der Zoom zu stark wäre, begrenzen wir ihn
        if (canvas.height > canvas.width) {
            scale = Math.min(scale, wScale * 1.6); // Verhindert extremen Ausschnitt
        }

        // Zentrierung: Wir schieben das Bild auf dem Handy etwas höher, 
        // damit die Pizza (die meist mittig/unten liegt) perfekt sichtbar ist.
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) * (canvas.height > canvas.width ? 0.4 : 0.5);
        
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }



    // ============ Load Frames ============
    function loadFrames() {
        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            img.onload = () => { 
                loadedCount++; 
                if (i === 1) renderFrame(0); // Ersten Frame sofort zeichnen, sobald da
            };
            img.src = FRAME_PATH(i);
            images[i - 1] = img;
        }
    }

    // ============ Scroll Animations ============
    function initAnimations() {
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        renderFrame(0);

        // Frame sequence on scroll
        gsap.to(frameState, {
            currentIndex: FRAME_COUNT - 1,
            snap: 'currentIndex',
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.5,
            },
            onUpdate: () => renderFrame(Math.round(frameState.currentIndex)),
        });

        // Hero text overlays
        const introEl = document.getElementById('heroIntro');

        if (introEl) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: '.hero-section',
                    start: '60% top',
                    end: '85% top',
                    scrub: true,
                },
            })
            .fromTo(introEl, { opacity: 1, y: 0 }, { opacity: 0, y: -50 });
        }

        // Section animations
        initIntersectionObserver();

        // Nav scroll effect
        initNavScroll();
    }

    // ============ Intersection Observer for Sections ============
    function initIntersectionObserver() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const delay = parseFloat(entry.target.dataset.delay || 0);
                        setTimeout(() => entry.target.classList.add('animated'), delay * 1000);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
        );

        document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));
    }

    // ============ Nav Scroll ============
    function initNavScroll() {
        const nav = document.getElementById('mainNav');
        const backToTop = document.getElementById('backToTop');

        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            if (y > 80) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }

            if (backToTop) {
                if (y > 600) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            }
        });

        if (backToTop) {
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    // ============ Mobile Menu ============
    const burger = document.getElementById('navBurger');
    const mobileMenu = document.getElementById('mobileMenu');

    if (burger && mobileMenu) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            mobileMenu.classList.toggle('open');
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        });

        mobileMenu.querySelectorAll('.mobile-link').forEach((link) => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // ============ Smooth Scroll for Anchor Links ============
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ============ Start ============
    loadFrames();
    initAnimations();
})();
