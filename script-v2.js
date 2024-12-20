// Feature tabs functionality
function initFeatureTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.feature-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and panels
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            tab.classList.add('active');
            const panel = document.getElementById(tab.dataset.tab);
            panel.classList.add('active');
        });
    });
}

// Simulate live data updates
function updateLiveData() {
    const speedValue = document.querySelector('.live-data .value');
    setInterval(() => {
        const speed = Math.floor(Math.random() * 30) + 50;
        speedValue.textContent = `${speed} km/h`;
    }, 3000);
}

// Initialize features
document.addEventListener('DOMContentLoaded', () => {
    initFeatureTabs();
    updateLiveData();
}); 