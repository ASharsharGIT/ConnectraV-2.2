(function() {
    'use strict';
    
    // Initialize preloader tech visuals
    function initPreloaderVisuals() {
        const preloader = document.getElementById('preloader');
        if (!preloader) return;

        // Create tech grid background
        const techGrid = new window.TechVisuals.TechGrid(preloader);
        techGrid.init();

        // Add data flow cables
        const dataFlow = new window.TechVisuals.DataFlowCables(preloader);
        dataFlow.init();

        // Add network visualization (desktop only)
        if (window.innerWidth > 768) {
            const network = new window.TechVisuals.NetworkVisualization(preloader);
            network.init();
        }

        // Add data packets
        const packets = new window.TechVisuals.DataPackets(preloader);
        packets.init();
    }

    // Initialize on DOM load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPreloaderVisuals);
    } else {
        initPreloaderVisuals();
    }
})();