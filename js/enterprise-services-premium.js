/**
 * ============================================
 * CONNECTRA - ENTERPRISE ICT SOLUTIONS PREMIUM
 * Ultra-Premium Interactive JavaScript Features
 * Author: Connectra Design Team
 * Version: 1.0
 * ============================================
 */

(function() {
    'use strict';

    // Check if we're on mobile to disable certain effects
    const isMobile = window.innerWidth <= 768 || 
                     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    /**
     * ============================================
     * MAGNETIC CURSOR EFFECT FOR SERVICE CARDS
     * ============================================
     */
    class MagneticEffect {
        constructor(element, strength = 0.3) {
            this.element = element;
            this.strength = strength;
            this.boundingRect = null;
            this.init();
        }

        init() {
            if (isMobile) return;

            this.element.addEventListener('mouseenter', () => {
                this.boundingRect = this.element.getBoundingClientRect();
                this.element.classList.add('magnetic-active');
            });

            this.element.addEventListener('mousemove', (e) => {
                this.handleMouseMove(e);
            });

            this.element.addEventListener('mouseleave', () => {
                this.reset();
            });
        }

        handleMouseMove(e) {
            if (!this.boundingRect) return;

            const x = e.clientX - this.boundingRect.left;
            const y = e.clientY - this.boundingRect.top;

            const centerX = this.boundingRect.width / 2;
            const centerY = this.boundingRect.height / 2;

            const deltaX = (x - centerX) * this.strength;
            const deltaY = (y - centerY) * this.strength;

            this.element.style.transform = `translate(${deltaX}px, ${deltaY}px) translateY(-15px) scale(1.02)`;
        }

        reset() {
            this.element.classList.remove('magnetic-active');
            this.element.style.transform = '';
            this.boundingRect = null;
        }
    }

    /**
     * ============================================
     * 3D TILT EFFECT ON CARD HOVER
     * ============================================
     */
    class TiltEffect {
        constructor(element, maxTilt = 8) {
            this.element = element;
            this.maxTilt = maxTilt;
            this.cardContent = element.querySelector('.card-content');
            this.init();
        }

        init() {
            if (isMobile) return;

            this.element.addEventListener('mousemove', (e) => {
                this.handleTilt(e);
            });

            this.element.addEventListener('mouseleave', () => {
                this.reset();
            });
        }

        handleTilt(e) {
            const rect = this.element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -this.maxTilt;
            const rotateY = ((x - centerX) / centerX) * this.maxTilt;

            this.element.style.transform = `
                translateY(-15px) 
                scale(1.02) 
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
            `;

            if (this.cardContent) {
                this.cardContent.style.transform = `translateZ(30px)`;
            }
        }

        reset() {
            this.element.style.transform = '';
            if (this.cardContent) {
                this.cardContent.style.transform = '';
            }
        }
    }

    /**
     * ============================================
     * PARTICLE EFFECT ON HOVER
     * ============================================
     */
    class ParticleEffect {
        constructor(element) {
            this.element = element;
            this.particles = [];
            this.isHovered = false;
            this.animationFrame = null;
            this.init();
        }

        init() {
            if (isMobile) return;

            this.element.addEventListener('mouseenter', () => {
                this.startParticles();
            });

            this.element.addEventListener('mouseleave', () => {
                this.stopParticles();
            });
        }

        createParticle() {
            const particle = document.createElement('div');
            particle.className = 'service-particle';
            
            const rect = this.element.getBoundingClientRect();
            const angle = Math.random() * Math.PI * 2;
            const distance = 50 + Math.random() * 50;
            const size = 3 + Math.random() * 5;

            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, rgba(212, 175, 55, 0.8), rgba(212, 175, 55, 0));
                border-radius: 50%;
                pointer-events: none;
                z-index: 100;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                opacity: 0;
            `;

            this.element.appendChild(particle);

            // Animate particle
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;

            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);

            setTimeout(() => {
                particle.style.transition = 'all 1.5s cubic-bezier(0.23, 1, 0.32, 1)';
                particle.style.opacity = '1';
                particle.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px))`;
            }, 10);

            setTimeout(() => {
                particle.style.opacity = '0';
            }, 1000);

            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1500);
        }

        startParticles() {
            this.isHovered = true;
            this.animateParticles();
        }

        animateParticles() {
            if (!this.isHovered) return;

            this.createParticle();

            this.animationFrame = setTimeout(() => {
                this.animateParticles();
            }, 200);
        }

        stopParticles() {
            this.isHovered = false;
            if (this.animationFrame) {
                clearTimeout(this.animationFrame);
            }
        }
    }

    /**
     * ============================================
     * PREMIUM HOVER GLOW EFFECT
     * ============================================
     */
    class GlowEffect {
        constructor(element) {
            this.element = element;
            this.glowLayer = null;
            this.init();
        }

        init() {
            this.glowLayer = document.createElement('div');
            this.glowLayer.className = 'premium-glow-layer';
            this.glowLayer.style.cssText = `
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

            this.element.style.position = 'relative';
            this.element.appendChild(this.glowLayer);

            this.element.addEventListener('mouseenter', () => {
                this.glowLayer.style.opacity = '1';
            });

            this.element.addEventListener('mousemove', (e) => {
                this.updateGlow(e);
            });

            this.element.addEventListener('mouseleave', () => {
                this.glowLayer.style.opacity = '0';
            });
        }

        updateGlow(e) {
            const rect = this.element.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            this.glowLayer.style.setProperty('--mouse-x', `${x}%`);
            this.glowLayer.style.setProperty('--mouse-y', `${y}%`);
        }
    }

    /**
     * ============================================
     * ANIMATED COUNTER FOR STATS
     * ============================================
     */
    class AnimatedCounter {
        constructor(element) {
            this.element = element;
            this.target = parseInt(element.getAttribute('data-target') || element.textContent);
            this.duration = 2000;
            this.hasAnimated = false;
            this.init();
        }

        init() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.hasAnimated) {
                        this.animate();
                        this.hasAnimated = true;
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(this.element);
        }

        animate() {
            const start = 0;
            const increment = this.target / (this.duration / 16);
            let current = start;

            const timer = setInterval(() => {
                current += increment;
                if (current >= this.target) {
                    this.element.textContent = this.target;
                    clearInterval(timer);
                } else {
                    this.element.textContent = Math.floor(current);
                }
            }, 16);
        }
    }

    /**
     * ============================================
     * SCROLL REVEAL ANIMATION WITH STAGGER
     * ============================================
     */
    class ScrollReveal {
        constructor() {
            this.init();
        }

        init() {
            const cards = document.querySelectorAll('.services .service-card');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 100);
                    }
                });
            }, { threshold: 0.1 });

            cards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(50px)';
                card.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
                observer.observe(card);
            });
        }
    }

    /**
     * ============================================
     * INITIALIZE ALL PREMIUM EFFECTS
     * ============================================
     */
    function initPremiumEffects() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }

        function init() {
            // Get all service cards
            const serviceCards = document.querySelectorAll('.services .service-card');

            if (serviceCards.length === 0) {
                console.log('No service cards found');
                return;
            }

            // Apply effects to each card
            serviceCards.forEach(card => {
                // Magnetic effect
                new MagneticEffect(card, 0.2);

                // 3D Tilt effect
                new TiltEffect(card, 5);

                // Particle effect
                new ParticleEffect(card);

                // Glow effect
                if (!isMobile) {
                    new GlowEffect(card);
                }
            });

            // Initialize scroll reveal
            new ScrollReveal();

            // Initialize animated counters
            const counters = document.querySelectorAll('[data-target]');
            counters.forEach(counter => new AnimatedCounter(counter));

            console.log('✨ Premium effects initialized for', serviceCards.length, 'cards');
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
            console.log('⚡ Reduced effects mode enabled for performance');
        }

        // Check for battery level
        if ('getBattery' in navigator) {
            navigator.getBattery().then(battery => {
                if (battery.level < 0.2 && !battery.charging) {
                    document.body.classList.add('battery-saver');
                    console.log('🔋 Battery saver mode enabled');
                }
            });
        }
    }

    // Initialize everything
    checkPerformance();
    initPremiumEffects();

    // Re-initialize on resize (debounced)
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            console.log('♻️ Reinitializing effects after resize');
            initPremiumEffects();
        }, 250);
    });

    // Export for external use
    window.ConnectraServicesPremium = {
        MagneticEffect,
        TiltEffect,
        ParticleEffect,
        GlowEffect,
        AnimatedCounter,
        ScrollReveal
    };

    console.log('🎨 Connectra Enterprise Services Premium - Loaded Successfully');
})();
