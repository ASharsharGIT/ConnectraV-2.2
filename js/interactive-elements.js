/* ============================================
   INTERACTIVE ELEMENTS
   Accordions, Tabs, Modals, Interactive Features
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // ACCORDION FUNCTIONALITY
    // ============================================
    class Accordion {
        constructor(element) {
            this.element = element;
            this.headers = element.querySelectorAll('.accordion-header');
            this.init();
        }

        init() {
            this.headers.forEach(header => {
                header.addEventListener('click', () => this.toggle(header));
            });
        }

        toggle(header) {
            const item = header.parentElement;
            const content = item.querySelector('.accordion-content');
            const isActive = item.classList.contains('active');

            // Close all items
            this.element.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
                const c = i.querySelector('.accordion-content');
                if (c) c.style.maxHeight = null;
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        }
    }

    // ============================================
    // TABS FUNCTIONALITY
    // ============================================
    class Tabs {
        constructor(element) {
            this.element = element;
            this.tabButtons = element.querySelectorAll('.tab-button');
            this.tabContents = element.querySelectorAll('.tab-content');
            this.init();
        }

        init() {
            this.tabButtons.forEach((button, index) => {
                button.addEventListener('click', () => this.switchTab(index));
            });
        }

        switchTab(index) {
            // Remove active from all
            this.tabButtons.forEach(btn => btn.classList.remove('active'));
            this.tabContents.forEach(content => content.classList.remove('active'));

            // Add active to clicked
            this.tabButtons[index].classList.add('active');
            this.tabContents[index].classList.add('active');
        }
    }

    // ============================================
    // IMAGE LIGHTBOX
    // ============================================
    class Lightbox {
        constructor() {
            this.images = document.querySelectorAll('[data-lightbox]');
            this.init();
        }

        init() {
            this.images.forEach(img => {
                img.style.cursor = 'pointer';
                img.addEventListener('click', () => this.open(img.src));
            });

            // Create lightbox overlay
            this.overlay = document.createElement('div');
            this.overlay.className = 'lightbox-overlay';
            this.overlay.innerHTML = `
                <div class="lightbox-content">
                    <button class="lightbox-close">&times;</button>
                    <img src="" alt="" class="lightbox-image">
                </div>
            `;
            document.body.appendChild(this.overlay);

            this.overlay.querySelector('.lightbox-close').addEventListener('click', () => this.close());
            this.overlay.addEventListener('click', (e) => {
                if (e.target === this.overlay) this.close();
            });
        }

        open(src) {
            this.overlay.querySelector('.lightbox-image').src = src;
            this.overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        close() {
            this.overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // ============================================
    // VIDEO PLAYER CONTROLS
    // ============================================
    class VideoPlayer {
        constructor(element) {
            this.container = element;
            this.video = element.querySelector('video');
            this.playBtn = element.querySelector('.play-btn');
            this.init();
        }

        init() {
            if (this.playBtn) {
                this.playBtn.addEventListener('click', () => this.togglePlay());
            }

            if (this.video) {
                this.video.addEventListener('click', () => this.togglePlay());
            }
        }

        togglePlay() {
            if (this.video.paused) {
                this.video.play();
                if (this.playBtn) this.playBtn.style.display = 'none';
            } else {
                this.video.pause();
                if (this.playBtn) this.playBtn.style.display = 'flex';
            }
        }
    }

    // ============================================
    // HOVER REVEAL CARDS
    // ============================================
    class HoverReveal {
        constructor() {
            this.cards = document.querySelectorAll('[data-hover-reveal]');
            this.init();
        }

        init() {
            this.cards.forEach(card => {
                const reveal = card.querySelector('.hover-reveal-content');
                if (reveal) {
                    card.addEventListener('mouseenter', () => {
                        reveal.style.opacity = '1';
                        reveal.style.transform = 'translateY(0)';
                    });
                    card.addEventListener('mouseleave', () => {
                        reveal.style.opacity = '0';
                        reveal.style.transform = 'translateY(20px)';
                    });
                }
            });
        }
    }

    // ============================================
    // NUMBER COUNTER ON SCROLL
    // ============================================
    class ScrollCounter {
        constructor() {
            this.counters = document.querySelectorAll('[data-counter]');
            this.init();
        }

        init() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                        this.animateCounter(entry.target);
                        entry.target.classList.add('counted');
                    }
                });
            }, { threshold: 0.5 });

            this.counters.forEach(counter => observer.observe(counter));
        }

        animateCounter(element) {
            const target = parseInt(element.getAttribute('data-counter'));
            const duration = 2000;
            const start = 0;
            const startTime = performance.now();

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const current = Math.floor(progress * target);

                element.textContent = current.toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    element.textContent = target.toLocaleString();
                }
            };

            requestAnimationFrame(animate);
        }
    }

    // ============================================
    // MODAL POPUP
    // ============================================
    class Modal {
        constructor() {
            this.triggers = document.querySelectorAll('[data-modal]');
            this.init();
        }

        init() {
            this.triggers.forEach(trigger => {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    const modalId = trigger.getAttribute('data-modal');
                    this.open(modalId);
                });
            });

            // Close buttons
            document.querySelectorAll('.modal-close').forEach(btn => {
                btn.addEventListener('click', () => this.closeAll());
            });

            // Close on overlay click
            document.querySelectorAll('.modal-overlay').forEach(overlay => {
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) this.closeAll();
                });
            });
        }

        open(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }

        closeAll() {
            document.querySelectorAll('.modal-overlay').forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.style.overflow = '';
        }
    }

    // ============================================
    // READ MORE / LESS TOGGLE
    // ============================================
    class ReadMore {
        constructor() {
            this.elements = document.querySelectorAll('[data-read-more]');
            this.init();
        }

        init() {
            this.elements.forEach(element => {
                const content = element.querySelector('.read-more-content');
                const toggle = element.querySelector('.read-more-toggle');

                if (content && toggle) {
                    toggle.addEventListener('click', () => {
                        content.classList.toggle('expanded');
                        toggle.textContent = content.classList.contains('expanded') 
                            ? 'Read Less' 
                            : 'Read More';
                    });
                }
            });
        }
    }

    // ============================================
    // INITIALIZE ALL INTERACTIVE ELEMENTS
    // ============================================
    function initInteractive() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }

        function init() {
            console.log('🎮 Initializing Interactive Elements...');

            // Initialize accordions
            document.querySelectorAll('.accordion').forEach(el => {
                new Accordion(el);
            });

            // Initialize tabs
            document.querySelectorAll('.tabs').forEach(el => {
                new Tabs(el);
            });

            // Initialize lightbox
            if (document.querySelectorAll('[data-lightbox]').length > 0) {
                new Lightbox();
            }

            // Initialize video players
            document.querySelectorAll('.video-container').forEach(el => {
                new VideoPlayer(el);
            });

            // Initialize hover reveals
            new HoverReveal();

            // Initialize scroll counters
            new ScrollCounter();

            // Initialize modals
            new Modal();

            // Initialize read more
            new ReadMore();

            console.log('✅ Interactive Elements Ready!');
        }
    }

    // Auto-initialize
    initInteractive();

    // Export for global access
    window.InteractiveElements = {
        Accordion,
        Tabs,
        Lightbox,
        VideoPlayer,
        HoverReveal,
        ScrollCounter,
        Modal,
        ReadMore
    };

})();
