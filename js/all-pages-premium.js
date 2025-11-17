/**
 * ============================================
 * CONNECTRA - ALL PAGES PREMIUM INTERACTIVITY
 * Ultra-Premium Interactive Features for All Pages
 * Author: Connectra Design Team
 * Version: 2.0
 * ============================================
 */

(function() {
    'use strict';

    // Device detection
    const isMobile = window.innerWidth <= 768 || 
                     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouch = 'ontouchstart' in window;

    /**
     * ============================================
     * UNIVERSAL MAGNETIC EFFECT
     * Works on all interactive cards across pages
     * ============================================
     */
    class UniversalMagneticEffect {
        constructor(selector = '.feature-card, .additional-card, .contact-card, .process-step, .security-layer, .arch-layer, .service-nav-grid .nav-item', strength = 0.15) {
            this.elements = document.querySelectorAll(selector);
            this.strength = strength;
            this.init();
        }

        init() {
            if (isMobile || isTouch) return;

            this.elements.forEach(element => {
                let boundingRect = null;

                element.addEventListener('mouseenter', () => {
                    boundingRect = element.getBoundingClientRect();
                });

                element.addEventListener('mousemove', (e) => {
                    if (!boundingRect) return;

                    const x = e.clientX - boundingRect.left;
                    const y = e.clientY - boundingRect.top;
                    const centerX = boundingRect.width / 2;
                    const centerY = boundingRect.height / 2;

                    const deltaX = (x - centerX) * this.strength;
                    const deltaY = (y - centerY) * this.strength;

                    element.style.transform = `translate(${deltaX}px, ${deltaY}px) translateY(-10px)`;
                });

                element.addEventListener('mouseleave', () => {
                    element.style.transform = '';
                    boundingRect = null;
                });
            });
        }
    }

    /**
     * ============================================
     * 3D TILT EFFECT FOR CARDS
     * ============================================
     */
    class Universal3DTilt {
        constructor(selector = '.feature-card, .additional-card, .contact-card, .stats-grid .stat-card', maxTilt = 5) {
            this.elements = document.querySelectorAll(selector);
            this.maxTilt = maxTilt;
            this.init();
        }

        init() {
            if (isMobile || isTouch) return;

            this.elements.forEach(element => {
                element.addEventListener('mousemove', (e) => {
                    const rect = element.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    const rotateX = ((y - centerY) / centerY) * -this.maxTilt;
                    const rotateY = ((x - centerX) / centerX) * this.maxTilt;

                    element.style.transform = `
                        perspective(1000px) 
                        rotateX(${rotateX}deg) 
                        rotateY(${rotateY}deg)
                        translateY(-10px)
                    `;
                });

                element.addEventListener('mouseleave', () => {
                    element.style.transform = '';
                });
            });
        }
    }

    /**
     * ============================================
     * ANIMATED COUNTER FOR STATS
     * ============================================
     */
    class AnimatedCounter {
        constructor(selector = '[data-target]') {
            this.elements = document.querySelectorAll(selector);
            this.init();
        }

        init() {
            this.elements.forEach(element => {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && !element.classList.contains('counted')) {
                            this.animateCounter(element);
                            element.classList.add('counted');
                        }
                    });
                }, { threshold: 0.5 });

                observer.observe(element);
            });
        }

        animateCounter(element) {
            const target = parseInt(element.getAttribute('data-target'));
            const suffix = element.getAttribute('data-suffix') || '';
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current) + suffix;
                }
            }, 16);
        }
    }

    /**
     * ============================================
     * SCROLL REVEAL WITH STAGGER
     * ============================================
     */
    class UniversalScrollReveal {
        constructor(selector = '.feature-card, .additional-card, .process-step, .security-layer, .arch-layer') {
            this.elements = document.querySelectorAll(selector);
            this.init();
        }

        init() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 100);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            this.elements.forEach(element => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(50px)';
                element.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
                observer.observe(element);
            });
        }
    }

    /**
     * ============================================
     * FORM VALIDATION & ENHANCEMENT
     * ============================================
     */
    class FormEnhancement {
        constructor(selector = '.contact-form form, form.quote-form') {
            this.forms = document.querySelectorAll(selector);
            this.init();
        }

        init() {
            this.forms.forEach(form => {
                const inputs = form.querySelectorAll('input, textarea, select');
                
                inputs.forEach(input => {
                    // Add floating label effect
                    input.addEventListener('focus', () => {
                        const label = input.previousElementSibling;
                        if (label && label.tagName === 'LABEL') {
                            label.style.color = '#D4AF37';
                            label.style.transform = 'translateY(-5px)';
                        }
                    });

                    input.addEventListener('blur', () => {
                        const label = input.previousElementSibling;
                        if (label && label.tagName === 'LABEL') {
                            label.style.color = '';
                            label.style.transform = '';
                        }
                    });

                    // Add validation
                    input.addEventListener('invalid', (e) => {
                        e.preventDefault();
                        input.style.borderColor = '#E53E3E';
                        this.showValidationMessage(input);
                    });

                    input.addEventListener('input', () => {
                        if (input.checkValidity()) {
                            input.style.borderColor = '#48BB78';
                        }
                    });
                });

                // Form submission
                form.addEventListener('submit', (e) => {
                    const submitBtn = form.querySelector('[type="submit"]');
                    if (submitBtn) {
                        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                        submitBtn.disabled = true;
                    }
                });
            });
        }

        showValidationMessage(input) {
            const message = input.validationMessage;
            const errorDiv = document.createElement('div');
            errorDiv.className = 'validation-error';
            errorDiv.style.cssText = `
                color: #E53E3E;
                font-size: 0.85rem;
                margin-top: 0.25rem;
                animation: slideDown 0.3s ease;
            `;
            errorDiv.textContent = message;

            const existing = input.parentElement.querySelector('.validation-error');
            if (existing) {
                existing.remove();
            }

            input.parentElement.appendChild(errorDiv);

            setTimeout(() => {
                errorDiv.remove();
                input.style.borderColor = '';
            }, 3000);
        }
    }

    /**
     * ============================================
     * SMOOTH SCROLL TO ANCHOR
     * ============================================
     */
    class SmoothScroll {
        constructor(selector = 'a[href^="#"]') {
            this.links = document.querySelectorAll(selector);
            this.init();
        }

        init() {
            this.links.forEach(link => {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    if (href === '#') return;

                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        const offset = 100; // Navbar height
                        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });

                        // Update URL without jumping
                        history.pushState(null, null, href);
                    }
                });
            });
        }
    }

    /**
     * ============================================
     * HOVER GLOW EFFECT
     * ============================================
     */
    class HoverGlow {
        constructor(selector = '.feature-card, .additional-card, .contact-card') {
            this.elements = document.querySelectorAll(selector);
            this.init();
        }

        init() {
            if (isMobile || isTouch) return;

            this.elements.forEach(element => {
                const glowLayer = document.createElement('div');
                glowLayer.className = 'hover-glow-layer';
                glowLayer.style.cssText = `
                    position: absolute;
                    inset: -20px;
                    background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
                        rgba(212, 175, 55, 0.15) 0%, 
                        transparent 50%);
                    border-radius: 24px;
                    opacity: 0;
                    transition: opacity 0.4s ease;
                    pointer-events: none;
                    z-index: -1;
                `;

                if (getComputedStyle(element).position === 'static') {
                    element.style.position = 'relative';
                }

                element.appendChild(glowLayer);

                element.addEventListener('mouseenter', () => {
                    glowLayer.style.opacity = '1';
                });

                element.addEventListener('mousemove', (e) => {
                    const rect = element.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;

                    glowLayer.style.setProperty('--mouse-x', `${x}%`);
                    glowLayer.style.setProperty('--mouse-y', `${y}%`);
                });

                element.addEventListener('mouseleave', () => {
                    glowLayer.style.opacity = '0';
                });
            });
        }
    }

    /**
     * ============================================
     * PROGRESS BAR ANIMATION
     * ============================================
     */
    class ProgressBarAnimation {
        constructor(selector = '.data-bar') {
            this.bars = document.querySelectorAll(selector);
            this.init();
        }

        init() {
            this.bars.forEach(bar => {
                const fill = bar.querySelector('.data-bar-fill');
                if (!fill) return;

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const percentage = fill.style.width || '0%';
                            fill.style.width = '0%';
                            
                            setTimeout(() => {
                                fill.style.transition = 'width 2s cubic-bezier(0.23, 1, 0.32, 1)';
                                fill.style.width = percentage;
                            }, 100);

                            observer.unobserve(bar);
                        }
                    });
                }, { threshold: 0.5 });

                observer.observe(bar);
            });
        }
    }

    /**
     * ============================================
     * NAVIGATION HIGHLIGHT ON SCROLL
     * ============================================
     */
    class NavigationHighlight {
        constructor() {
            this.sections = document.querySelectorAll('section[id]');
            this.navLinks = document.querySelectorAll('.service-nav-grid .nav-item');
            this.init();
        }

        init() {
            if (this.sections.length === 0 || this.navLinks.length === 0) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        this.updateActiveLink(id);
                    }
                });
            }, {
                threshold: 0.3,
                rootMargin: '-100px 0px -60% 0px'
            });

            this.sections.forEach(section => observer.observe(section));
        }

        updateActiveLink(id) {
            this.navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === `#${id}`) {
                    link.style.background = 'linear-gradient(135deg, #D4AF37, #FFD700)';
                    link.style.color = '#FFFFFF';
                    link.style.transform = 'translateY(-5px)';
                } else {
                    link.style.background = '';
                    link.style.color = '';
                    link.style.transform = '';
                }
            });
        }
    }

    /**
     * ============================================
     * PARALLAX EFFECT FOR HERO SECTIONS
     * ============================================
     */
    class ParallaxHero {
        constructor(selector = '.services-hero, .about-hero, .contact-hero') {
            this.heroes = document.querySelectorAll(selector);
            this.init();
        }

        init() {
            if (isMobile) return;

            this.heroes.forEach(hero => {
                window.addEventListener('scroll', () => {
                    const scrolled = window.pageYOffset;
                    const rate = scrolled * 0.3;

                    if (scrolled < hero.offsetHeight) {
                        hero.style.transform = `translateY(${rate}px)`;
                    }
                });
            });
        }
    }

    /**
     * ============================================
     * INITIALIZE ALL EFFECTS
     * ============================================
     */
    function initAllPremiumEffects() {
        // Wait for DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }

        function init() {
            console.log('🎨 Initializing All-Pages Premium Effects...');

            // Initialize all effects
            new UniversalMagneticEffect();
            new Universal3DTilt();
            new AnimatedCounter();
            new UniversalScrollReveal();
            new FormEnhancement();
            new SmoothScroll();
            new HoverGlow();
            new ProgressBarAnimation();
            new NavigationHighlight();
            new ParallaxHero();
            new ManagedServicesReveal();
            new NetworkServicesReveal();
            new DataCenterServicesReveal();
            new CybersecurityServicesReveal();

            console.log('✨ All-Pages Premium Effects Loaded Successfully!');
        }
    }

    /**
     * ============================================
     * MANAGED SERVICES INTERACTIVE REVEAL
     * ============================================
     */
    class ManagedServicesReveal {
        constructor() {
            this.mainCard = document.getElementById('main-managed-card');
            this.expandBtn = this.mainCard?.querySelector('.expand-services-btn');
            this.subServicesGrid = document.getElementById('sub-services-grid');
            this.isExpanded = false;
            this.init();
        }

        init() {
            if (!this.mainCard || !this.expandBtn || !this.subServicesGrid) return;

            // Click on button
            this.expandBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggle();
            });

            // Click on main card
            this.mainCard.addEventListener('click', () => {
                this.toggle();
            });
        }

        toggle() {
            this.isExpanded = !this.isExpanded;

            if (this.isExpanded) {
                this.mainCard.classList.add('expanded');
                this.subServicesGrid.classList.add('revealed');
                this.expandBtn.querySelector('span').textContent = 'Show Less';
            } else {
                this.mainCard.classList.remove('expanded');
                this.subServicesGrid.classList.remove('revealed');
                this.expandBtn.querySelector('span').textContent = 'Explore Our Services';
            }
        }
    }

    /**
     * ============================================
     * NETWORK INFRASTRUCTURE INTERACTIVE REVEAL
     * ============================================
     */
    class NetworkServicesReveal {
        constructor() {
            this.mainCard = document.getElementById('main-network-card');
            this.expandBtn = this.mainCard?.querySelector('.expand-services-btn');
            this.subServicesGrid = document.getElementById('sub-network-grid');
            this.isExpanded = false;
            this.init();
        }

        init() {
            if (!this.mainCard || !this.expandBtn || !this.subServicesGrid) return;

            // Click on button
            this.expandBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggle();
            });

            // Click on main card
            this.mainCard.addEventListener('click', () => {
                this.toggle();
            });
        }

        toggle() {
            this.isExpanded = !this.isExpanded;

            if (this.isExpanded) {
                this.mainCard.classList.add('expanded');
                this.subServicesGrid.classList.add('revealed');
                this.expandBtn.querySelector('span').textContent = 'Show Less';
            } else {
                this.mainCard.classList.remove('expanded');
                this.subServicesGrid.classList.remove('revealed');
                this.expandBtn.querySelector('span').textContent = 'View Network Solutions';
            }
        }
    }

    /**
     * ============================================
     * DATA CENTER INTERACTIVE REVEAL
     * ============================================
     */
    class DataCenterServicesReveal {
        constructor() {
            this.mainCard = document.getElementById('main-datacenter-card');
            this.expandBtn = this.mainCard?.querySelector('.expand-services-btn');
            this.subServicesGrid = document.getElementById('sub-datacenter-grid');
            this.isExpanded = false;
            this.init();
        }

        init() {
            if (!this.mainCard || !this.expandBtn || !this.subServicesGrid) return;

            // Click on button
            this.expandBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggle();
            });

            // Click on main card
            this.mainCard.addEventListener('click', () => {
                this.toggle();
            });
        }

        toggle() {
            this.isExpanded = !this.isExpanded;

            if (this.isExpanded) {
                this.mainCard.classList.add('expanded');
                this.subServicesGrid.classList.add('revealed');
                this.expandBtn.querySelector('span').textContent = 'Show Less';
            } else {
                this.mainCard.classList.remove('expanded');
                this.subServicesGrid.classList.remove('revealed');
                this.expandBtn.querySelector('span').textContent = 'Explore Solutions';
            }
        }
    }

    /**
     * ============================================
     * CYBERSECURITY INTERACTIVE REVEAL
     * ============================================
     */
    class CybersecurityServicesReveal {
        constructor() {
            this.mainCard = document.getElementById('main-cybersecurity-card');
            this.expandBtn = this.mainCard?.querySelector('.expand-services-btn');
            this.subServicesGrid = document.getElementById('sub-cybersecurity-grid');
            this.isExpanded = false;
            this.init();
        }

        init() {
            if (!this.mainCard || !this.expandBtn || !this.subServicesGrid) return;

            // Click on button
            this.expandBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggle();
            });

            // Click on main card
            this.mainCard.addEventListener('click', () => {
                this.toggle();
            });
        }

        toggle() {
            this.isExpanded = !this.isExpanded;

            if (this.isExpanded) {
                this.mainCard.classList.add('expanded');
                this.subServicesGrid.classList.add('revealed');
                this.expandBtn.querySelector('span').textContent = 'Show Less';
            } else {
                this.mainCard.classList.remove('expanded');
                this.subServicesGrid.classList.remove('revealed');
                this.expandBtn.querySelector('span').textContent = 'View Security Solutions';
            }
        }
    }

    /**
     * ============================================
     * PERFORMANCE MONITORING
     * ============================================
     */
    function checkPerformance() {
        // Disable heavy effects on low-end devices
        if (navigator.deviceMemory && navigator.deviceMemory < 4) {
            document.body.classList.add('reduced-effects');
            console.log('⚡ Reduced effects mode enabled');
        }

        // Check battery
        if ('getBattery' in navigator) {
            navigator.getBattery().then(battery => {
                if (battery.level < 0.2 && !battery.charging) {
                    document.body.classList.add('battery-saver');
                    console.log('🔋 Battery saver mode enabled');
                }
            });
        }
    }

    // Start everything
    checkPerformance();
    initAllPremiumEffects();

    // Export for external use
    window.ConnectraAllPagesPremium = {
        UniversalMagneticEffect,
        Universal3DTilt,
        AnimatedCounter,
        UniversalScrollReveal,
        FormEnhancement,
        SmoothScroll,
        HoverGlow,
        ProgressBarAnimation,
        NavigationHighlight,
        ParallaxHero,
        ManagedServicesReveal,
        NetworkServicesReveal,
        DataCenterServicesReveal,
        CybersecurityServicesReveal
    };

})();
