// Navigation
document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form validation
document.getElementById('inquiry-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add form validation and submission logic here
});

// Dynamic coordinate updates
function updateCoordinates() {
    const lat = document.querySelector('.lat');
    const lng = document.querySelector('.lng');
    
    setInterval(() => {
        const randomLat = (51.5074 + (Math.random() - 0.5) * 0.01).toFixed(4);
        const randomLng = (0.1278 + (Math.random() - 0.5) * 0.01).toFixed(4);
        
        lat.textContent = `${randomLat}° N`;
        lng.textContent = `${randomLng}° W`;
    }, 2000);
}

// Particle effect for background
function createParticles() {
    const hero = document.querySelector('.hero');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        hero.appendChild(particle);
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = 5 + Math.random() * 5;
        
        particle.style.cssText = `
            left: ${x}%;
            top: ${y}%;
            animation: float ${duration}s infinite linear;
        `;
    }
}

// Enhanced vehicle tracking animation
function initializeTrackingAnimation() {
    const map = document.querySelector('.map-visualization');
    const vehicle = document.querySelector('.vehicle-marker');
    let angle = 0;

    function moveVehicle() {
        // Calculate position on the circular path
        const radius = map.offsetWidth * 0.35;
        const centerX = map.offsetWidth / 2;
        const centerY = map.offsetHeight / 2;
        
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        vehicle.style.left = `${x}px`;
        vehicle.style.top = `${y}px`;
        
        // Rotate vehicle in movement direction
        vehicle.style.transform = `rotate(${angle * (180/Math.PI) + 90}deg)`;
        
        angle += 0.02;
        requestAnimationFrame(moveVehicle);
    }

    moveVehicle();
}

// Add radar scanning effect
function initializeRadarScan() {
    const radar = document.createElement('div');
    radar.className = 'radar-scan';
    document.querySelector('.map-visualization').appendChild(radar);
}

// Add pulsing GPS signals
function addGPSSignals() {
    const map = document.querySelector('.map-visualization');
    setInterval(() => {
        const signal = document.createElement('div');
        signal.className = 'gps-signal';
        signal.style.left = Math.random() * 100 + '%';
        signal.style.top = Math.random() * 100 + '%';
        map.appendChild(signal);
        
        setTimeout(() => signal.remove(), 2000);
    }, 1000);
}

// Live tracking dashboard functionality
function initializeDashboard() {
    const speedValue = document.querySelector('.speed-value');
    const statusValue = document.querySelector('.status-value');
    const engineValue = document.querySelector('.engine-value');
    const engineBtn = document.querySelector('.engine-btn');
    
    // Simulate real-time speed updates
    setInterval(() => {
        const speed = Math.floor(Math.random() * 40) + 40;
        speedValue.textContent = `${speed} km/h`;
    }, 3000);
    
    // Engine control simulation
    let engineRunning = true;
    engineBtn.addEventListener('click', () => {
        engineRunning = !engineRunning;
        engineValue.textContent = engineRunning ? 'Running' : 'Stopped';
        engineValue.style.color = engineRunning ? '#2563eb' : '#ef4444';
        engineBtn.style.borderColor = engineRunning ? '#2563eb' : '#ef4444';
    });
    
    // Add random vehicle dots
    const radarDisplay = document.querySelector('.radar-display');
    function addVehicleDot() {
        const dot = document.createElement('div');
        dot.className = 'vehicle-dot';
        const angle = Math.random() * 360;
        const distance = 20 + Math.random() * 60;
        dot.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--primary-color);
            border-radius: 50%;
            left: ${50 + Math.cos(angle * Math.PI / 180) * distance}%;
            top: ${50 + Math.sin(angle * Math.PI / 180) * distance}%;
            box-shadow: 0 0 10px var(--primary-color);
        `;
        radarDisplay.appendChild(dot);
        setTimeout(() => dot.remove(), 4000);
    }
    
    setInterval(addVehicleDot, 2000);
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    updateCoordinates();
    createParticles();
    initializeTrackingAnimation();
    initializeRadarScan();
    addGPSSignals();
    initializeDashboard();
});

// Add this to your existing script.js
document.querySelectorAll('.mobile-nav .nav-item').forEach(item => {
    item.addEventListener('click', function() {
        // Remove active class from all items
        document.querySelectorAll('.mobile-nav .nav-item').forEach(i => {
            i.classList.remove('active');
        });
        // Add active class to clicked item
        this.classList.add('active');
    });
});

// Animate numbers when section comes into view
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-value');
    const options = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseFloat(target.getAttribute('data-value'));
                animateValue(target, 0, finalValue, 2000);
                observer.unobserve(target);
            }
        });
    }, options);

    stats.forEach(stat => observer.observe(stat));
}

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + (element.getAttribute('data-suffix') || '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Add hover effects for benefit cards
function initializeBenefitCards() {
    const cards = document.querySelectorAll('.benefit-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.benefit-icon i');
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            
            // Add glowing effect
            card.style.boxShadow = `0 0 20px ${getComputedStyle(document.documentElement)
                .getPropertyValue('--primary-color')}33`;
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.benefit-icon i');
            icon.style.transform = 'scale(1) rotate(0)';
            card.style.boxShadow = 'none';
        });
    });
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateNumbers();
    initializeBenefitCards();
    
    // Add smooth reveal animation for cards
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}); 