/* ============================================
   CONNECTRA HIGH-TECH JAVASCRIPT
   Advanced Interactive Features & Animations
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // PARTICLE SYSTEM
    // ============================================
    class ParticleSystem {
        constructor() {
            this.container = document.createElement('div');
            this.container.className = 'particle-container';
            this.particles = [];
            this.maxParticles = 50;
        }

        init() {
            document.body.prepend(this.container);
            this.createParticles();
        }

        createParticles() {
            for (let i = 0; i < this.maxParticles; i++) {
                setTimeout(() => this.addParticle(), i * 100);
            }
        }

        addParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random positioning
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
            particle.style.animationDelay = Math.random() * 5 + 's';
            
            // Random colors
            const colors = ['#D4AF37', '#00D9FF', '#9D4EDD'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            this.container.appendChild(particle);
            this.particles.push(particle);
            
            // Remove and recreate for infinite loop
            particle.addEventListener('animationend', () => {
                particle.remove();
                this.addParticle();
            });
        }
    }

    // ============================================
    // ADVANCED COUNTER ANIMATION
    // ============================================
    class CounterAnimation {
        constructor(element, options = {}) {
            this.element = element;
            this.target = parseInt(element.getAttribute('data-target')) || 0;
            this.duration = options.duration || 2000;
            this.suffix = element.getAttribute('data-suffix') || '';
            this.prefix = element.getAttribute('data-prefix') || '';
            this.decimals = options.decimals || 0;
            this.started = false;
        }

        easeOutExpo(t) {
            return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        }

        animate() {
            if (this.started) return;
            this.started = true;

            const startTime = performance.now();
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / this.duration, 1);
                const easedProgress = this.easeOutExpo(progress);
                const current = Math.floor(easedProgress * this.target);

                this.element.textContent = this.prefix + 
                    current.toLocaleString() + 
                    this.suffix;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    this.element.textContent = this.prefix + 
                        this.target.toLocaleString() + 
                        this.suffix;
                }
            };

            requestAnimationFrame(animate);
        }
    }

    // ============================================
    // 3D CARD TILT EFFECT
    // ============================================
    class TiltEffect {
        constructor(element, options = {}) {
            this.element = element;
            this.maxTilt = options.maxTilt || 10;
            this.perspective = options.perspective || 1000;
            this.scale = options.scale || 1.05;
            this.speed = options.speed || 400;
            
            this.init();
        }

        init() {
            this.element.style.transformStyle = 'preserve-3d';
            this.element.style.transition = `transform ${this.speed}ms cubic-bezier(0.23, 1, 0.32, 1)`;
            
            this.element.addEventListener('mouseenter', (e) => this.onMouseEnter(e));
            this.element.addEventListener('mousemove', (e) => this.onMouseMove(e));
            this.element.addEventListener('mouseleave', (e) => this.onMouseLeave(e));
        }

        onMouseEnter(e) {
            this.element.style.willChange = 'transform';
        }

        onMouseMove(e) {
            const rect = this.element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * this.maxTilt;
            const rotateY = ((centerX - x) / centerX) * this.maxTilt;
            
            this.element.style.transform = `
                perspective(${this.perspective}px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale3d(${this.scale}, ${this.scale}, ${this.scale})
            `;
        }

        onMouseLeave(e) {
            this.element.style.transform = `
                perspective(${this.perspective}px)
                rotateX(0deg)
                rotateY(0deg)
                scale3d(1, 1, 1)
            `;
            this.element.style.willChange = 'auto';
        }
    }

    // ============================================
    // CIRCUIT LINES ANIMATION
    // ============================================
    class CircuitLines {
        constructor(container) {
            this.container = container;
            this.lines = [];
            this.maxLines = 8;
        }

        init() {
            const circuitBg = document.createElement('div');
            circuitBg.className = 'circuit-bg';
            this.container.appendChild(circuitBg);
            
            this.createLines(circuitBg);
        }

        createLines(parent) {
            for (let i = 0; i < this.maxLines; i++) {
                const line = document.createElement('div');
                line.className = 'circuit-line';
                
                if (Math.random() > 0.5) {
                    line.classList.add('vertical');
                    line.style.left = Math.random() * 100 + '%';
                } else {
                    line.style.top = Math.random() * 100 + '%';
                    line.style.width = Math.random() * 200 + 100 + 'px';
                }
                
                line.style.animationDelay = Math.random() * 4 + 's';
                line.style.animationDuration = (Math.random() * 3 + 3) + 's';
                
                parent.appendChild(line);
                this.lines.push(line);
            }
        }
    }

    // ============================================
    // HEXAGON PATTERN BACKGROUND
    // ============================================
    class HexPattern {
        constructor(container) {
            this.container = container;
        }

        init() {
            const pattern = document.createElement('div');
            pattern.className = 'hex-pattern';
            this.container.style.position = 'relative';
            this.container.appendChild(pattern);
        }
    }

    // ============================================
    // DATA VISUALIZATION BARS
    // ============================================
    class DataVisualization {
        constructor(element) {
            this.element = element;
            this.percentage = parseInt(element.getAttribute('data-percentage')) || 0;
            this.animated = false;
        }

        animate() {
            if (this.animated) return;
            this.animated = true;

            const bar = this.element.querySelector('.data-bar-fill');
            if (bar) {
                setTimeout(() => {
                    bar.style.width = this.percentage + '%';
                }, 100);
            }
        }
    }

    // ============================================
    // SCROLL REVEAL SYSTEM
    // ============================================
    class ScrollReveal {
        constructor() {
            this.elements = [];
            this.threshold = 0.1;
        }

        init() {
            this.elements = document.querySelectorAll('.reveal-tech');
            
            const observerOptions = {
                threshold: this.threshold,
                rootMargin: '0px 0px -100px 0px'
            };

            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, observerOptions);

            this.elements.forEach(el => this.observer.observe(el));
        }
    }

    // ============================================
    // INTERACTIVE STATS OBSERVER
    // ============================================
    class StatsObserver {
        constructor() {
            this.counters = [];
            this.dataBars = [];
        }

        init() {
            // Initialize counters
            const counterElements = document.querySelectorAll('[data-target]');
            counterElements.forEach(el => {
                this.counters.push(new CounterAnimation(el));
            });

            // Initialize data bars
            const dataBarElements = document.querySelectorAll('[data-percentage]');
            dataBarElements.forEach(el => {
                this.dataBars.push(new DataVisualization(el));
            });

            // Observe when elements come into view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = this.counters.find(c => c.element === entry.target);
                        if (counter) {
                            counter.animate();
                        }

                        const dataBar = this.dataBars.find(d => d.element === entry.target);
                        if (dataBar) {
                            dataBar.animate();
                        }
                    }
                });
            }, { threshold: 0.3 });

            [...counterElements, ...dataBarElements].forEach(el => observer.observe(el));
        }
    }

    // ============================================
    // NEON BUTTON EFFECTS
    // ============================================
    class NeonButtons {
        init() {
            const buttons = document.querySelectorAll('.tech-button');
            
            buttons.forEach(button => {
                button.addEventListener('mouseenter', (e) => {
                    this.createRipple(e, button);
                });
            });
        }

        createRipple(event, button) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            button.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        }
    }

    // ============================================
    // TIMELINE ANIMATION
    // ============================================
    class TimelineAnimation {
        init() {
            const timelineItems = document.querySelectorAll('.timeline-item');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.animationDelay = '0s';
                            entry.target.style.opacity = '1';
                        }, index * 200);
                    }
                });
            }, { threshold: 0.2 });

            timelineItems.forEach(item => observer.observe(item));
        }
    }

    // ============================================
    // HOLOGRAPHIC CARD EFFECTS
    // ============================================
    class HolographicCards {
        init() {
            const cards = document.querySelectorAll('.holo-card');
            
            cards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    card.style.setProperty('--mouse-x', x + 'px');
                    card.style.setProperty('--mouse-y', y + 'px');
                });
            });
        }
    }

    // ============================================
    // PARALLAX SCROLL EFFECT
    // ============================================
    class ParallaxScroll {
        constructor() {
            this.elements = [];
        }

        init() {
            this.elements = document.querySelectorAll('[data-parallax]');
            
            if (this.elements.length > 0) {
                window.addEventListener('scroll', () => this.update(), { passive: true });
                this.update();
            }
        }

        update() {
            const scrollY = window.pageYOffset;

            this.elements.forEach(el => {
                const speed = parseFloat(el.getAttribute('data-parallax')) || 0.5;
                const rect = el.getBoundingClientRect();
                const elementTop = rect.top + scrollY;
                const elementHeight = rect.height;
                
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const yPos = -(scrollY - elementTop) * speed;
                    el.style.transform = `translate3d(0, ${yPos}px, 0)`;
                }
            });
        }
    }

    // ============================================
    // PERFORMANCE MONITOR
    // ============================================
    class PerformanceMonitor {
        constructor() {
            this.fps = 0;
            this.lastTime = performance.now();
            this.frames = 0;
        }

        init() {
            // Reduce animations on low-end devices
            this.checkPerformance();
            
            // Respect user's motion preferences
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                document.body.classList.add('reduced-motion');
            }
        }

        checkPerformance() {
            const measureFPS = () => {
                this.frames++;
                const currentTime = performance.now();
                
                if (currentTime >= this.lastTime + 1000) {
                    this.fps = Math.round((this.frames * 1000) / (currentTime - this.lastTime));
                    this.frames = 0;
                    this.lastTime = currentTime;
                    
                    // If FPS is consistently low, reduce effects
                    if (this.fps < 30) {
                        document.body.classList.add('low-performance');
                    }
                }
                
                requestAnimationFrame(measureFPS);
            };
            
            requestAnimationFrame(measureFPS);
        }
    }

    // ============================================
    // INITIALIZE ALL SYSTEMS
    // ============================================
    function initHighTech() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }

        function init() {
            console.log('🚀 Connectra High-Tech Systems Initializing...');

            // Performance check first
            const perfMonitor = new PerformanceMonitor();
            perfMonitor.init();

            // Initialize particle system (desktop only)
            if (window.innerWidth > 768) {
                const particles = new ParticleSystem();
                particles.init();
            }

            // Initialize 3D tilt effects
            document.querySelectorAll('.holo-card, .stat-3d-card').forEach(card => {
                new TiltEffect(card, {
                    maxTilt: 8,
                    perspective: 1000,
                    scale: 1.03,
                    speed: 400
                });
            });

            // Initialize circuit lines
            document.querySelectorAll('section').forEach((section, index) => {
                if (index % 2 === 0) {
                    const circuits = new CircuitLines(section);
                    circuits.init();
                }
            });

            // Initialize hex patterns
            document.querySelectorAll('.hero-section, .cta-section').forEach(section => {
                const hexPattern = new HexPattern(section);
                hexPattern.init();
            });

            // Initialize stats observer
            const statsObserver = new StatsObserver();
            statsObserver.init();

            // Initialize scroll reveal
            const scrollReveal = new ScrollReveal();
            scrollReveal.init();

            // Initialize neon buttons
            const neonButtons = new NeonButtons();
            neonButtons.init();

            // Initialize timeline
            const timeline = new TimelineAnimation();
            timeline.init();

            // Initialize holographic cards
            const holoCards = new HolographicCards();
            holoCards.init();

            // Initialize parallax
            const parallax = new ParallaxScroll();
            parallax.init();

            console.log('✅ All High-Tech Systems Online!');
        }
    }

    // Auto-initialize
    initHighTech();

    // Export for global access
    window.ConnectraHighTech = {
        ParticleSystem,
        CounterAnimation,
        TiltEffect,
        CircuitLines,
        HexPattern,
        DataVisualization,
        ScrollReveal,
        StatsObserver,
        NeonButtons,
        TimelineAnimation,
        HolographicCards,
        ParallaxScroll,
        PerformanceMonitor
    };

})();
