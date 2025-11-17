/* ============================================
   DYNAMIC TECH VISUALS GENERATOR
   Creates flowing data, cables, and tech effects
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // DATA FLOW CABLES GENERATOR
    // ============================================
    class DataFlowCables {
        constructor(container) {
            this.container = container;
            this.cables = [];
            this.maxCables = window.innerWidth > 768 ? 8 : 3;
        }

        init() {
            const flowContainer = document.createElement('div');
            flowContainer.className = 'data-flow-container';
            this.container.appendChild(flowContainer);

            // Create cables continuously
            setInterval(() => this.createCable(flowContainer), 1500);
            
            // Initial cables
            for (let i = 0; i < 3; i++) {
                setTimeout(() => this.createCable(flowContainer), i * 500);
            }
        }

        createCable(parent) {
            const cable = document.createElement('div');
            const isVertical = Math.random() > 0.5;
            
            cable.className = isVertical ? 'data-cable vertical' : 'data-cable';
            
            // Random positioning
            if (isVertical) {
                cable.style.left = Math.random() * 100 + '%';
                cable.style.top = '-200px';
            } else {
                cable.style.top = Math.random() * 100 + '%';
                cable.style.left = '-200px';
            }
            
            // Random speed
            const speed = (Math.random() * 2 + 2) + 's';
            cable.style.animationDuration = speed;
            cable.style.animationDelay = Math.random() * 0.5 + 's';
            
            parent.appendChild(cable);
            
            // Remove after animation
            setTimeout(() => cable.remove(), parseFloat(speed) * 1000 + 500);
        }
    }

    // ============================================
    // BINARY DATA STREAM GENERATOR
    // ============================================
    class BinaryStream {
        constructor(container) {
            this.container = container;
        }

        init() {
            if (window.innerWidth <= 768) return; // Skip on mobile

            setInterval(() => this.createStream(), 2000);
            
            // Initial streams
            for (let i = 0; i < 5; i++) {
                setTimeout(() => this.createStream(), i * 400);
            }
        }

        generateBinary() {
            let binary = '';
            const length = Math.floor(Math.random() * 20) + 30;
            for (let i = 0; i < length; i++) {
                binary += Math.random() > 0.5 ? '1' : '0';
                if (i % 8 === 7) binary += ' ';
            }
            return binary;
        }

        createStream() {
            const stream = document.createElement('div');
            stream.className = 'binary-stream';
            stream.textContent = this.generateBinary();
            stream.style.left = Math.random() * 90 + '%';
            stream.style.top = '-50px';
            stream.style.animationDuration = (Math.random() * 3 + 4) + 's';
            stream.style.animationDelay = Math.random() * 1 + 's';
            
            this.container.appendChild(stream);
            
            setTimeout(() => stream.remove(), 6000);
        }
    }

    // ============================================
    // DATA PACKETS GENERATOR
    // ============================================
    class DataPackets {
        constructor(container) {
            this.container = container;
        }

        init() {
            setInterval(() => this.createPacket(), 800);
            
            // Initial packets
            for (let i = 0; i < 3; i++) {
                setTimeout(() => this.createPacket(), i * 300);
            }
        }

        createPacket() {
            const packet = document.createElement('div');
            packet.className = 'data-packet';
            
            // Random start position
            packet.style.left = Math.random() * 30 + '%';
            packet.style.top = Math.random() * 80 + 10 + '%';
            
            // Random color variation
            const colors = ['#D4AF37', '#00D9FF', '#9D4EDD'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            packet.style.background = color;
            packet.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
            
            // Random speed
            packet.style.animationDuration = (Math.random() * 2 + 3) + 's';
            packet.style.animationDelay = Math.random() * 0.5 + 's';
            
            this.container.appendChild(packet);
            
            setTimeout(() => packet.remove(), 5000);
        }
    }

    // ============================================
    // NETWORK NODES & CONNECTIONS
    // ============================================
    class NetworkVisualization {
        constructor(container) {
            this.container = container;
            this.nodes = [];
            this.nodeCount = window.innerWidth > 768 ? 12 : 6;
        }

        init() {
            const networkContainer = document.createElement('div');
            networkContainer.className = 'network-nodes';
            this.container.appendChild(networkContainer);

            // Create nodes
            for (let i = 0; i < this.nodeCount; i++) {
                this.createNode(networkContainer, i);
            }

            // Create connections between nodes
            setTimeout(() => this.createConnections(networkContainer), 500);
        }

        createNode(parent, index) {
            const node = document.createElement('div');
            node.className = 'network-node';
            
            // Position nodes in a grid-like pattern with randomness
            const col = index % 4;
            const row = Math.floor(index / 4);
            node.style.left = (col * 25 + 10 + Math.random() * 10) + '%';
            node.style.top = (row * 30 + 15 + Math.random() * 15) + '%';
            
            node.style.animationDelay = (index * 0.2) + 's';
            
            parent.appendChild(node);
            this.nodes.push(node);
        }

        createConnections(parent) {
            // Connect nearby nodes
            for (let i = 0; i < this.nodes.length; i++) {
                for (let j = i + 1; j < this.nodes.length; j++) {
                    if (Math.random() > 0.7) { // 30% chance of connection
                        this.connectNodes(parent, this.nodes[i], this.nodes[j]);
                    }
                }
            }
        }

        connectNodes(parent, node1, node2) {
            const rect1 = node1.getBoundingClientRect();
            const rect2 = node2.getBoundingClientRect();
            const parentRect = parent.getBoundingClientRect();

            const x1 = rect1.left - parentRect.left + rect1.width / 2;
            const y1 = rect1.top - parentRect.top + rect1.height / 2;
            const x2 = rect2.left - parentRect.left + rect2.width / 2;
            const y2 = rect2.top - parentRect.top + rect2.height / 2;

            const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

            const connection = document.createElement('div');
            connection.className = 'network-connection';
            connection.style.width = length + 'px';
            connection.style.left = x1 + 'px';
            connection.style.top = y1 + 'px';
            connection.style.transform = `rotate(${angle}deg)`;
            connection.style.animationDelay = Math.random() * 2 + 's';

            parent.appendChild(connection);
        }
    }

    // ============================================
    // TECH GRID BACKGROUND
    // ============================================
    class TechGrid {
        constructor(container) {
            this.container = container;
        }

        init() {
            const grid = document.createElement('div');
            grid.className = 'tech-grid-background';
            this.container.appendChild(grid);
        }
    }

    // ============================================
    // SCANNING LINE EFFECT
    // ============================================
    class ScanLine {
        constructor(container) {
            this.container = container;
        }

        init() {
            const scanLine = document.createElement('div');
            scanLine.className = 'scan-line';
            this.container.appendChild(scanLine);
        }
    }

    // ============================================
    // DIGITAL RAIN (Matrix style)
    // ============================================
    class DigitalRain {
        constructor(container) {
            this.container = container;
        }

        init() {
            if (window.innerWidth <= 768) return; // Skip on mobile

            setInterval(() => this.createRain(), 3000);
            
            for (let i = 0; i < 3; i++) {
                setTimeout(() => this.createRain(), i * 1000);
            }
        }

        generateCode() {
            const chars = '0123456789ABCDEFabcdef<>[]{}()';
            let code = '';
            const lines = Math.floor(Math.random() * 5) + 3;
            
            for (let i = 0; i < lines; i++) {
                const length = Math.floor(Math.random() * 10) + 5;
                for (let j = 0; j < length; j++) {
                    code += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                code += '\n';
            }
            return code;
        }

        createRain() {
            const rain = document.createElement('div');
            rain.className = 'digital-rain';
            rain.textContent = this.generateCode();
            rain.style.left = Math.random() * 90 + '%';
            rain.style.top = '-100px';
            rain.style.animationDuration = (Math.random() * 4 + 6) + 's';
            
            this.container.appendChild(rain);
            
            setTimeout(() => rain.remove(), 10000);
        }
    }

    // ============================================
    // INITIALIZE ALL TECH VISUALS
    // ============================================
    function initTechVisuals() {
        // Wait for DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }

        function init() {
            console.log('🎨 Initializing Tech Visuals...');

            // Get all hero sections
            const heroSections = document.querySelectorAll('.hero-section');
            
            heroSections.forEach((section, index) => {
                // Add tech grid to all hero sections
                const techGrid = new TechGrid(section);
                techGrid.init();

                // Add data flow cables
                const dataFlow = new DataFlowCables(section);
                dataFlow.init();

                // Add data packets
                const packets = new DataPackets(section);
                packets.init();

                // Add scanning line (only to first hero)
                if (index === 0) {
                    const scanLine = new ScanLine(section);
                    scanLine.init();
                }

                // Add network visualization (desktop only)
                if (window.innerWidth > 768) {
                    const network = new NetworkVisualization(section);
                    network.init();
                }
            });

            // Add binary streams to services section
            const servicesSection = document.querySelector('.services');
            if (servicesSection && window.innerWidth > 768) {
                const binaryStream = new BinaryStream(servicesSection);
                binaryStream.init();
            }

            // Add digital rain to about section
            const aboutSection = document.querySelector('.about-preview');
            if (aboutSection && window.innerWidth > 768) {
                const digitalRain = new DigitalRain(aboutSection);
                digitalRain.init();
            }

            console.log('✅ Tech Visuals Initialized!');
        }
    }

    // Auto-initialize
    initTechVisuals();

    // Export for global access
    window.TechVisuals = {
        DataFlowCables,
        BinaryStream,
        DataPackets,
        NetworkVisualization,
        TechGrid,
        ScanLine,
        DigitalRain
    };

})();
