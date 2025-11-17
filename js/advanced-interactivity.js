/**
 * ADVANCED INTERACTIVITY SYSTEM
 * Comprehensive click-based interactions for Connectra website
 * Includes: Modals, Expandable Cards, Slide Panels, Accordions, Tabs, Tooltips, and more
 */

// ========================================
// CORE SYSTEM INITIALIZATION
// ========================================

class ConnectraInteractivity {
    constructor() {
        this.modals = new Map();
        this.slidePanels = new Map();
        this.activeElements = new Set();
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeAll());
        } else {
            this.initializeAll();
        }
    }

    initializeAll() {
        console.log('🚀 Connectra Advanced Interactivity: Initializing...');
        
        this.initModals();
        this.initExpandableCards();
        this.initSlidePanels();
        this.initAccordions();
        this.initTabs();
        this.initTooltips();
        this.initFloatingActions();
        this.initInteractiveTimeline();
        this.initStatRevealers();
        this.initRippleEffects();
        this.initKeyboardNavigation();
        
        console.log('✅ Connectra Advanced Interactivity: Ready!');
    }

    // ========================================
    // 1. MODAL SYSTEM
    // ========================================

    initModals() {
        // Create modal triggers from data attributes
        document.querySelectorAll('[data-modal-trigger]').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = trigger.getAttribute('data-modal-trigger');
                this.openModal(modalId);
            });
        });

        // Close modal on overlay click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.closeModal(e.target.querySelector('.modal-container').getAttribute('data-modal-id'));
            }
        });

        // Close modal on close button
        document.querySelectorAll('.modal-close').forEach(closeBtn => {
            closeBtn.addEventListener('click', () => {
                const modal = closeBtn.closest('.modal-overlay');
                if (modal) {
                    this.closeModal(modal.querySelector('.modal-container').getAttribute('data-modal-id'));
                }
            });
        });

        // ESC key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal-overlay.active').forEach(modal => {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                });
            }
        });
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            this.activeElements.add(modalId);
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            this.activeElements.delete(modalId);
        }
    }

    // ========================================
    // 2. EXPANDABLE CARDS
    // ========================================

    initExpandableCards() {
        document.querySelectorAll('.expandable-card').forEach(card => {
            const trigger = card.querySelector('.expand-trigger') || card;
            
            trigger.addEventListener('click', (e) => {
                if (e.target.classList.contains('expand-trigger') || e.currentTarget === card) {
                    e.stopPropagation();
                    
                    // Close other expanded cards in the same container
                    const container = card.parentElement;
                    container.querySelectorAll('.expandable-card.expanded').forEach(otherCard => {
                        if (otherCard !== card) {
                            otherCard.classList.remove('expanded');
                        }
                    });
                    
                    // Toggle current card
                    card.classList.toggle('expanded');
                    
                    // Trigger reveal animation if content has it
                    if (card.classList.contains('expanded')) {
                        const expandedContent = card.querySelector('.card-expanded');
                        if (expandedContent) {
                            this.animateReveal(expandedContent);
                        }
                    }
                }
            });
        });
    }

    // ========================================
    // 3. SLIDE-OUT PANELS (CONVERTED TO MODALS)
    // ========================================

    initSlidePanels() {
        // Panel triggers now open modals instead
        document.querySelectorAll('[data-panel-trigger]').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const panelId = trigger.getAttribute('data-panel-trigger');
                // Convert panel to modal
                this.openModal(panelId);
            });
        });

        // Convert slide-panel class to modal-overlay for consistency
        document.querySelectorAll('.slide-panel').forEach(panel => {
            if (!panel.classList.contains('modal-overlay')) {
                panel.classList.add('modal-overlay');
                
                // Convert structure to modal format
                const header = panel.querySelector('.slide-panel-header');
                const content = panel.querySelector('.slide-panel-content');
                const closeBtn = panel.querySelector('.slide-panel-close');
                
                if (header && content) {
                    // Create modal container if doesn't exist
                    let container = panel.querySelector('.modal-container');
                    if (!container) {
                        container = document.createElement('div');
                        container.className = 'modal-container';
                        container.setAttribute('data-modal-id', panel.id);
                        
                        // Move content to modal structure
                        const modalHeader = document.createElement('div');
                        modalHeader.className = 'modal-header';
                        modalHeader.innerHTML = header.innerHTML;
                        
                        const modalBody = document.createElement('div');
                        modalBody.className = 'modal-body';
                        modalBody.innerHTML = content.innerHTML;
                        
                        // Add close button
                        const modalClose = document.createElement('button');
                        modalClose.className = 'modal-close';
                        modalClose.innerHTML = '<i class="fas fa-times"></i>';
                        
                        container.appendChild(modalClose);
                        container.appendChild(modalHeader);
                        container.appendChild(modalBody);
                        
                        panel.innerHTML = '';
                        panel.appendChild(container);
                    }
                }
            }
        });
    }

    openSlidePanel(panelId) {
        // Now just opens as modal
        this.openModal(panelId);
    }

    // ========================================
    // 4. ACCORDION SYSTEM
    // ========================================

    initAccordions() {
        document.querySelectorAll('.accordion-item, .faq-item').forEach(item => {
            const header = item.querySelector('.accordion-header, .faq-question');
            
            if (header) {
                header.addEventListener('click', () => {
                    const container = item.closest('.accordion-container, .contact-faq');
                    const multipleOpen = container?.getAttribute('data-multiple') === 'true';
                    
                    // Close other items if not multiple mode
                    if (!multipleOpen) {
                        container?.querySelectorAll('.accordion-item.active, .faq-item.active').forEach(otherItem => {
                            if (otherItem !== item) {
                                otherItem.classList.remove('active');
                            }
                        });
                    }
                    
                    // Toggle current item
                    item.classList.toggle('active');
                    
                    // Animate content
                    const content = item.querySelector('.accordion-content, .faq-answer');
                    if (item.classList.contains('active') && content) {
                        this.animateReveal(content);
                    }
                });
            }
        });
    }

    // ========================================
    // 5. TAB SYSTEM
    // ========================================

    initTabs() {
        document.querySelectorAll('.tabs-container').forEach(container => {
            const buttons = container.querySelectorAll('.tab-button');
            const contents = container.querySelectorAll('.tab-content');
            
            buttons.forEach((button, index) => {
                button.addEventListener('click', () => {
                    // Remove active class from all buttons and contents
                    buttons.forEach(btn => btn.classList.remove('active'));
                    contents.forEach(content => content.classList.remove('active'));
                    
                    // Add active class to clicked button and corresponding content
                    button.classList.add('active');
                    contents[index]?.classList.add('active');
                    
                    // Trigger animation
                    if (contents[index]) {
                        this.animateReveal(contents[index]);
                    }
                });
            });
            
            // Activate first tab by default
            if (buttons.length > 0 && !container.querySelector('.tab-button.active')) {
                buttons[0].click();
            }
        });
    }

    // ========================================
    // 6. TOOLTIP SYSTEM
    // ========================================

    initTooltips() {
        document.querySelectorAll('.tooltip-trigger').forEach(trigger => {
            // Show on hover
            trigger.addEventListener('mouseenter', () => {
                trigger.classList.add('active');
            });
            
            trigger.addEventListener('mouseleave', () => {
                trigger.classList.remove('active');
            });
            
            // Toggle on click for mobile
            trigger.addEventListener('click', (e) => {
                if ('ontouchstart' in window) {
                    e.preventDefault();
                    trigger.classList.toggle('active');
                }
            });
        });
        
        // Close tooltips when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.tooltip-trigger')) {
                document.querySelectorAll('.tooltip-trigger.active').forEach(trigger => {
                    trigger.classList.remove('active');
                });
            }
        });
    }

    // ========================================
    // 7. FLOATING ACTION BUTTONS - DISABLED
    // ========================================

    initFloatingActions() {
        // Floating action buttons disabled - removing intrusive UI elements
        // No calculator, chat, or comparison buttons on bottom right
    }

    createDefaultFloatingActions() {
        // Disabled - no floating buttons created
    }

    handleFabAction(action) {
        // Disabled
    }

    // ========================================
    // 8. INTERACTIVE TIMELINE
    // ========================================

    initInteractiveTimeline() {
        document.querySelectorAll('.timeline-item').forEach(item => {
            item.addEventListener('click', () => {
                // Close other timeline items
                const container = item.closest('.interactive-timeline');
                container?.querySelectorAll('.timeline-item.expanded').forEach(other => {
                    if (other !== item) other.classList.remove('expanded');
                });
                
                // Toggle current item
                item.classList.toggle('expanded');
                
                // Animate details reveal
                if (item.classList.contains('expanded')) {
                    const details = item.querySelector('.timeline-details');
                    if (details) {
                        this.animateReveal(details);
                    }
                }
            });
        });
    }

    // ========================================
    // 9. STAT REVEALERS
    // ========================================

    initStatRevealers() {
        document.querySelectorAll('.stat-revealer').forEach(stat => {
            stat.addEventListener('click', () => {
                stat.classList.toggle('revealed');
                
                // Animate breakdown bars
                if (stat.classList.contains('revealed')) {
                    setTimeout(() => {
                        stat.querySelectorAll('.breakdown-fill').forEach((fill, index) => {
                            setTimeout(() => {
                                fill.style.transform = 'scaleX(1)';
                            }, index * 100);
                        });
                    }, 100);
                } else {
                    stat.querySelectorAll('.breakdown-fill').forEach(fill => {
                        fill.style.transform = 'scaleX(0)';
                    });
                }
            });
        });
    }

    // ========================================
    // 10. RIPPLE EFFECTS
    // ========================================

    initRippleEffects() {
        document.querySelectorAll('.ripple-effect').forEach(element => {
            element.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                
                const rect = element.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                element.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    // ========================================
    // 11. KEYBOARD NAVIGATION
    // ========================================

    initKeyboardNavigation() {
        // Tab navigation for accordions
        document.querySelectorAll('.accordion-header').forEach(header => {
            header.setAttribute('tabindex', '0');
            header.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    header.click();
                }
            });
        });

        // Tab navigation for tabs
        document.querySelectorAll('.tab-button').forEach(button => {
            button.setAttribute('tabindex', '0');
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
            });
        });

        // Arrow key navigation for tabs
        document.querySelectorAll('.tabs-nav').forEach(nav => {
            const buttons = Array.from(nav.querySelectorAll('.tab-button'));
            
            buttons.forEach((button, index) => {
                button.addEventListener('keydown', (e) => {
                    let newIndex;
                    
                    if (e.key === 'ArrowRight') {
                        newIndex = (index + 1) % buttons.length;
                        buttons[newIndex].focus();
                        buttons[newIndex].click();
                    } else if (e.key === 'ArrowLeft') {
                        newIndex = (index - 1 + buttons.length) % buttons.length;
                        buttons[newIndex].focus();
                        buttons[newIndex].click();
                    }
                });
            });
        });
    }

    // ========================================
    // UTILITY FUNCTIONS
    // ========================================

    animateReveal(element) {
        if (!element) return;
        
        // Add stagger animation to children if they exist
        const children = element.querySelectorAll('[data-reveal]');
        children.forEach((child, index) => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                child.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    showLoadingState(element) {
        if (!element) return;
        
        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay active';
        overlay.innerHTML = '<div class="loading-spinner"></div>';
        
        element.style.position = 'relative';
        element.appendChild(overlay);
        
        return overlay;
    }

    hideLoadingState(overlay) {
        if (overlay) {
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 300);
        }
    }
}

// ========================================
// SPECIFIC PAGE INTERACTIONS
// ========================================

class IndexPageInteractions {
    constructor() {
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            this.init();
        }
    }

    init() {
        this.initProjectModals();
        this.initServiceCardsExpand();
        this.initStatsClickReveal();
        this.initPartnerTooltips();
    }

    initProjectModals() {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', () => {
                const projectTitle = card.querySelector('.project-title')?.textContent;
                const projectCategory = card.querySelector('.project-category')?.textContent;
                const projectDescription = card.querySelector('.project-description')?.innerHTML;
                
                this.showProjectModal(projectTitle, projectCategory, projectDescription);
            });
        });
    }

    showProjectModal(title, category, description) {
        // Create modal if doesn't exist
        let modal = document.getElementById('projectModal');
        if (!modal) {
            modal = this.createProjectModal();
            document.body.appendChild(modal);
        }

        // Populate modal
        modal.querySelector('.modal-title').textContent = title;
        modal.querySelector('.modal-subtitle').textContent = category;
        modal.querySelector('.modal-body').innerHTML = description;

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    createProjectModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.id = 'projectModal';
        modal.innerHTML = `
            <div class="modal-container" data-modal-id="projectModal">
                <button class="modal-close" aria-label="Close modal">
                    <i class="fas fa-times"></i>
                </button>
                <div class="modal-header">
                    <h2 class="modal-title"></h2>
                    <p class="modal-subtitle"></p>
                </div>
                <div class="modal-body"></div>
            </div>
        `;

        // Add close handler
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        return modal;
    }

    initServiceCardsExpand() {
        document.querySelectorAll('.service-card.primary, .service-card.secondary').forEach(card => {
            if (!card.classList.contains('expandable-card')) {
                card.classList.add('expandable-card');
                
                // Create expand trigger if doesn't exist
                if (!card.querySelector('.expand-trigger')) {
                    const trigger = document.createElement('button');
                    trigger.className = 'expand-trigger';
                    trigger.innerHTML = '<i class="fas fa-chevron-down"></i>';
                    trigger.setAttribute('aria-label', 'Expand service details');
                    card.appendChild(trigger);
                }
            }
        });
    }

    initStatsClickReveal() {
        // Stats click reveal disabled - stats display as simple counters only
        // No interactive breakdown feature
    }

    createStatBreakdown(total) {
        const breakdown = document.createElement('div');
        breakdown.className = 'stat-breakdown';
        
        // Generate sample breakdown data based on total
        const breakdowns = this.generateBreakdownData(parseInt(total));
        
        breakdown.innerHTML = breakdowns.map(item => `
            <div class="breakdown-item">
                <span>${item.label}</span>
                <span>${item.value}</span>
            </div>
            <div class="breakdown-bar">
                <div class="breakdown-fill" style="width: ${item.percentage}%"></div>
            </div>
        `).join('');
        
        return breakdown;
    }

    generateBreakdownData(total) {
        // Generate realistic breakdown based on total value
        if (total === 28) {
            return [
                { label: 'In Saudi Arabia', value: '25 years', percentage: 89 },
                { label: 'In Egypt', value: '3 years', percentage: 11 }
            ];
        } else if (total === 3500) {
            return [
                { label: 'Government', value: '1200+', percentage: 34 },
                { label: 'Enterprise', value: '1500+', percentage: 43 },
                { label: 'SMB', value: '800+', percentage: 23 }
            ];
        } else if (total === 2500) {
            return [
                { label: 'Active Clients', value: '1800', percentage: 72 },
                { label: 'Completed Projects', value: '700', percentage: 28 }
            ];
        }
        
        return [];
    }

    initPartnerTooltips() {
        // Tooltips disabled for partner badges - users can simply click them
        // Keeping method for compatibility but not adding tooltips
    }
}

class ServicesPageInteractions {
    constructor() {
        if (window.location.pathname.includes('services.html')) {
            this.init();
        }
    }

    init() {
        this.initServiceNavigatorTabs();
        this.initPartnerDetailsPanels();
        this.initFeatureCardsExpand();
    }

    initServiceNavigatorTabs() {
        const navigator = document.querySelector('.services-navigator');
        if (navigator && !navigator.querySelector('.tabs-container')) {
            // Convert service navigator to tabs
            navigator.classList.add('tabs-container');
        }
    }

    initPartnerDetailsPanels() {
        document.querySelectorAll('.partner-badge').forEach(badge => {
            badge.setAttribute('data-panel-trigger', 'partnerDetailsPanel');
            
            badge.addEventListener('click', () => {
                const partnerName = badge.textContent;
                this.showPartnerDetails(partnerName);
            });
        });

        // Create panel if doesn't exist
        if (!document.getElementById('partnerDetailsPanel')) {
            this.createPartnerDetailsPanel();
        }
    }

    showPartnerDetails(partnerName) {
        const panel = document.getElementById('partnerDetailsPanel');
        if (panel) {
            panel.querySelector('.slide-panel-title').textContent = partnerName;
            panel.querySelector('.slide-panel-content').innerHTML = this.getPartnerDetails(partnerName);
            panel.classList.add('active');
        }
    }

    getPartnerDetails(partnerName) {
        const details = {
            'Cisco': 'Gold Partner since 2010. Specializing in network infrastructure, security solutions, and collaboration tools.',
            'Microsoft': 'Certified Partner with expertise in cloud solutions, enterprise applications, and security platforms.',
            'VMware': 'Enterprise Partner focusing on virtualization, cloud infrastructure, and digital workspace solutions.',
            // Add more partners as needed
        };

        return `
            <div data-reveal>
                <p>${details[partnerName] || 'Trusted technology partner providing cutting-edge solutions.'}</p>
                <h4 style="color: #D4AF37; margin-top: 2rem;">Partnership Benefits</h4>
                <ul>
                    <li>Priority technical support</li>
                    <li>Early access to new technologies</li>
                    <li>Competitive pricing for clients</li>
                    <li>Certified expert team</li>
                </ul>
            </div>
        `;
    }

    createPartnerDetailsPanel() {
        const panel = document.createElement('div');
        panel.className = 'slide-panel';
        panel.id = 'partnerDetailsPanel';
        panel.innerHTML = `
            <div class="slide-panel-header">
                <h3 class="slide-panel-title">Partner Details</h3>
                <button class="slide-panel-close" aria-label="Close panel">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="slide-panel-content"></div>
        `;
        document.body.appendChild(panel);
    }

    initFeatureCardsExpand() {
        document.querySelectorAll('.feature-card').forEach(card => {
            card.classList.add('ripple-effect');
        });
    }
}

class AboutPageInteractions {
    constructor() {
        if (window.location.pathname.includes('about.html')) {
            this.init();
        }
    }

    init() {
        this.enhanceTimeline();
        this.initExpertiseAccordions();
        this.initPartnershipTierModals();
    }

    enhanceTimeline() {
        document.querySelectorAll('.timeline-item').forEach(item => {
            if (!item.classList.contains('interactive-timeline-item')) {
                item.classList.add('interactive-timeline-item');
                
                // Add details section if doesn't exist
                if (!item.querySelector('.timeline-details')) {
                    const content = item.querySelector('.timeline-content');
                    const details = document.createElement('div');
                    details.className = 'timeline-details';
                    details.innerHTML = '<p data-reveal>Click to see more detailed information about this milestone.</p>';
                    content?.appendChild(details);
                }
            }
        });
    }

    initExpertiseAccordions() {
        document.querySelectorAll('.expertise-category').forEach(category => {
            if (!category.classList.contains('accordion-item')) {
                category.classList.add('accordion-item');
                
                const header = category.querySelector('.category-header');
                if (header && !header.classList.contains('accordion-header')) {
                    header.classList.add('accordion-header');
                    
                    // Add accordion icon
                    const icon = document.createElement('div');
                    icon.className = 'accordion-icon';
                    icon.innerHTML = '<i class="fas fa-chevron-down"></i>';
                    header.appendChild(icon);
                }
                
                const content = category.querySelector('.category-content');
                if (content && !content.classList.contains('accordion-content')) {
                    content.classList.add('accordion-content');
                    const body = document.createElement('div');
                    body.className = 'accordion-body';
                    body.innerHTML = content.innerHTML;
                    content.innerHTML = '';
                    content.appendChild(body);
                }
            }
        });
    }

    initPartnershipTierModals() {
        document.querySelectorAll('.tier-item').forEach(tier => {
            tier.style.cursor = 'pointer';
            tier.classList.add('ripple-effect');
            
            tier.addEventListener('click', () => {
                const tierLevel = tier.querySelector('.tier-badge span')?.textContent;
                const partners = Array.from(tier.querySelectorAll('.tier-partners span')).map(s => s.textContent);
                this.showTierModal(tierLevel, partners);
            });
        });
    }

    showTierModal(tierLevel, partners) {
        let modal = document.getElementById('tierModal');
        if (!modal) {
            modal = this.createTierModal();
            document.body.appendChild(modal);
        }

        modal.querySelector('.modal-title').textContent = tierLevel;
        modal.querySelector('.modal-body').innerHTML = `
            <h3>Partnership Benefits</h3>
            <p>Our ${tierLevel} status provides exclusive advantages:</p>
            <ul>
                ${partners.map(p => `<li><strong>${p}</strong> - Full technical support and latest solutions</li>`).join('')}
            </ul>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    createTierModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.id = 'tierModal';
        modal.innerHTML = `
            <div class="modal-container" data-modal-id="tierModal">
                <button class="modal-close" aria-label="Close modal">
                    <i class="fas fa-times"></i>
                </button>
                <div class="modal-header">
                    <h2 class="modal-title"></h2>
                </div>
                <div class="modal-body"></div>
            </div>
        `;

        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });

        return modal;
    }
}

class ContactPageInteractions {
    constructor() {
        if (window.location.pathname.includes('contact.html')) {
            this.init();
        }
    }

    init() {
        this.initOfficeLocationModals();
        this.enhanceFAQ();
        this.initQuickOptions();
    }

    initOfficeLocationModals() {
        document.querySelectorAll('.location-card').forEach(card => {
            card.style.cursor = 'pointer';
            card.classList.add('ripple-effect');
            
            card.addEventListener('click', () => {
                const officeName = card.querySelector('h3')?.textContent;
                const details = card.innerHTML;
                this.showOfficeModal(officeName, details);
            });
        });
    }

    showOfficeModal(officeName, details) {
        let modal = document.getElementById('officeModal');
        if (!modal) {
            modal = this.createOfficeModal();
            document.body.appendChild(modal);
        }

        modal.querySelector('.modal-title').textContent = officeName;
        modal.querySelector('.modal-body').innerHTML = `
            ${details}
            <div style="margin-top: 2rem;">
                <h3 style="color: #D4AF37;">Get Directions</h3>
                <p>Contact us for detailed directions to this office location.</p>
                <button class="cta-button primary" onclick="window.location.href='#contactForm'">
                    Contact This Office
                </button>
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    createOfficeModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.id = 'officeModal';
        modal.innerHTML = `
            <div class="modal-container" data-modal-id="officeModal">
                <button class="modal-close" aria-label="Close modal">
                    <i class="fas fa-times"></i>
                </button>
                <div class="modal-header">
                    <h2 class="modal-title"></h2>
                </div>
                <div class="modal-body"></div>
            </div>
        `;

        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });

        return modal;
    }

    enhanceFAQ() {
        // FAQ is already an accordion, just ensure proper classes
        document.querySelectorAll('.faq-item').forEach(item => {
            if (!item.classList.contains('accordion-item')) {
                item.classList.add('accordion-item');
            }
            
            const question = item.querySelector('.faq-question');
            if (question && !question.classList.contains('accordion-header')) {
                question.classList.add('accordion-header');
            }
            
            const answer = item.querySelector('.faq-answer');
            if (answer && !answer.classList.contains('accordion-content')) {
                answer.classList.add('accordion-content');
                const body = document.createElement('div');
                body.className = 'accordion-body';
                body.innerHTML = answer.innerHTML;
                answer.innerHTML = '';
                answer.appendChild(body);
            }
        });
    }

    initQuickOptions() {
        document.querySelectorAll('.quick-option').forEach(option => {
            option.classList.add('ripple-effect');
        });
    }
}

// ========================================
// INITIALIZE EVERYTHING
// ========================================

// Main interactivity system
const connectraInteractivity = new ConnectraInteractivity();

// Page-specific interactions
const indexInteractions = new IndexPageInteractions();
const servicesInteractions = new ServicesPageInteractions();
const aboutInteractions = new AboutPageInteractions();
const contactInteractions = new ContactPageInteractions();

// Export for external use
window.ConnectraInteractivity = {
    main: connectraInteractivity,
    openModal: (id) => connectraInteractivity.openModal(id),
    closeModal: (id) => connectraInteractivity.closeModal(id),
    openPanel: (id) => connectraInteractivity.openSlidePanel(id)
};

console.log('🎉 Connectra Advanced Interactivity System Loaded Successfully!');
