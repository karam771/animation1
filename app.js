/* ================================================
   ANTALYA PIZZERIA — App Logic
   GSAP ScrollTrigger + Preloader + Animations
   ================================================ */

(function () {
    'use strict';

    // ============ GSAP Setup ============
    gsap.registerPlugin(ScrollTrigger);

    // ============ Frame Sequence Config ============
    const FRAME_COUNT = 192;
    const FRAME_PATH = (i) => `frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;

    const canvas = document.getElementById('heroCanvas');
    const ctx = canvas.getContext('2d');
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
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Cover-fit
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }

    // ============ Preloader ============
    const preloader = document.getElementById('preloader');
    const preloaderBar = document.getElementById('preloaderBar');
    const preloaderText = document.getElementById('preloaderText');
    const PRELOAD_THRESHOLD = 30; // Nur auf die ersten 30 Frames warten für schnelleren Start
    let isInitialized = false;

    function updatePreloader() {
        // Fortschritt basierend auf dem Schwellenwert berechnen (bis max 100%)
        const pct = Math.min(100, Math.round((loadedCount / PRELOAD_THRESHOLD) * 100));
        preloaderBar.style.width = pct + '%';
        preloaderText.textContent = `Laden... ${pct}%`;

        // Ausblenden, sobald der Schwellenwert erreicht ist
        if (loadedCount >= PRELOAD_THRESHOLD && !isInitialized) {
            isInitialized = true;
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.style.overflow = '';
                initAnimations();
            }, 400);
        }
    }

    // ============ Load Frames ============
    function loadFrames() {
        document.body.style.overflow = 'hidden';
        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            img.onload = () => { loadedCount++; updatePreloader(); };
            img.onerror = () => { loadedCount++; updatePreloader(); };
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
})();
