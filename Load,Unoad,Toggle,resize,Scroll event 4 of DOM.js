class EventsDemo {
    constructor() {
        this.currentTab = 'load';
        this.isLoggingPaused = false;
        this.eventCount = 0;
        this.lastScrollY = 0;
        
        this.initializeEventListeners();
        this.logEvent('SYSTEM', 'Events demo initialized', 'system');
    }
    
    initializeEventListeners() {
        // Tab navigation
        this.setupTabs();
        
        // Load/Unload events
        this.setupLoadEvents();
        
        // Scroll events
        this.setupScrollEvents();
        
        // Resize events
        this.setupResizeEvents();
        
        // Toggle events
        this.setupToggleEvents();
        
        // Event log controls
        this.setupEventLog();
    }
    
    setupTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.dataset.tab;
                
                // Update active tab button
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Show corresponding content
                tabContents.forEach(content => content.classList.remove('active'));
                document.getElementById(tabId).classList.add('active');
                
                this.currentTab = tabId;
                this.logEvent('TAB', `Switched to ${tabId} tab`, 'system');
            });
        });
    }
    
    setupLoadEvents() {
        // Window load event
        window.addEventListener('load', () => {
            document.getElementById('loadStatus').textContent = 'Page fully loaded!';
            document.getElementById('loadStatus').className = 'status loaded';
            this.logEvent('LOAD', 'Window fully loaded', 'load');
        });
        
        // DOMContentLoaded event
        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('domContentStatus').textContent = 'DOM content loaded!';
            document.getElementById('domContentStatus').className = 'status loaded';
            
            // Animate progress bar
            const progress = document.getElementById('domProgress');
            let width = 0;
            const interval = setInterval(() => {
                if (width >= 100) {
                    clearInterval(interval);
                } else {
                    width += 5;
                    progress.style.width = width + '%';
                }
            }, 50);
            
            this.logEvent('DOMContentLoaded', 'Initial HTML document loaded', 'load');
        });
        
        // Beforeunload event
        window.addEventListener('beforeunload', (e) => {
            this.logEvent('BEFOREUNLOAD', 'Page is about to unload', 'unload');
            // Modern browsers require preventDefault and setting returnValue
            e.preventDefault();
            e.returnValue = '';
        });
        
        // Unload event (limited functionality)
        window.addEventListener('unload', () => {
            this.logEvent('UNLOAD', 'Page is unloading', 'unload');
        });
        
        // Simulate buttons
        document.getElementById('simulateLoad').addEventListener('click', () => {
            document.getElementById('loadStatus').textContent = 'Load simulated!';
            document.getElementById('loadStatus').className = 'status loaded';
            this.logEvent('LOAD', 'Load event simulated', 'load');
        });
        
        document.getElementById('simulateUnload').addEventListener('click', () => {
            document.getElementById('unloadStatus').textContent = 'Unload warning shown!';
            document.getElementById('unloadStatus').className = 'status unloaded';
            this.logEvent('BEFOREUNLOAD', 'Unload event simulated', 'unload');
        });
    }
    
    setupScrollEvents() {
        const scrollContent = document.getElementById('scrollContent');
        const indicators = document.querySelectorAll('.indicator');
        
        // Throttled scroll event
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(() => {
                    this.handleScroll();
                    scrollTimeout = null;
                }, 100);
            }
        });
        
        // Initial scroll info
        this.updateScrollInfo();
        
        // Indicator clicks
        indicators.forEach(indicator => {
            indicator.addEventListener('click', () => {
                const section = parseInt(indicator.dataset.section);
                this.scrollToSection(section);
            });
        });
    }
    
    handleScroll() {
        this.updateScrollInfo();
        this.updateActiveSection();
        this.detectScrollDirection();
        
        this.logEvent('SCROLL', `Position: ${window.scrollY}px`, 'scroll');
    }
    
    updateScrollInfo() {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = maxScroll > 0 ? Math.round((scrollY / maxScroll) * 100) : 0;
        
        document.getElementById('scrollPosition').textContent = `${scrollY}px`;
        document.getElementById('scrollPercent').textContent = `${scrollPercent}%`;
    }
    
    updateActiveSection() {
        const sections = document.querySelectorAll('.scroll-item');
        const indicators = document.querySelectorAll('.indicator');
        
        let activeSection = 1;
        
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2) {
                activeSection = index + 1;
            }
        });
        
        // Update indicators
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
            if (parseInt(indicator.dataset.section) === activeSection) {
                indicator.classList.add('active');
            }
        });
        
        // Update sections
        sections.forEach(section => {
            section.classList.remove('active');
            if (parseInt(section.dataset.section) === activeSection) {
                section.classList.add('active');
            }
        });
        
        document.getElementById('currentSection').textContent = activeSection;
    }
    
    detectScrollDirection() {
        const currentScrollY = window.scrollY;
        const direction = currentScrollY > this.lastScrollY ? 'DOWN' : 'UP';
        
        if (currentScrollY !== this.lastScrollY) {
            document.getElementById('scrollDirection').textContent = direction;
            this.lastScrollY = currentScrollY;
        }
    }
    
    scrollToSection(section) {
        const target = document.querySelector(`[data-section="${section}"]`);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            this.logEvent('SCROLL', `Scrolled to section ${section}`, 'scroll');
        }
    }
    
    setupResizeEvents() {
        // Throttled resize event
        let resizeTimeout;
        window.addEventListener('resize', () => {
            if (!resizeTimeout) {
                resizeTimeout = setTimeout(() => {
                    this.handleResize();
                    resizeTimeout = null;
                }, 250);
            }
        });
        
        // Initial resize info
        this.updateResizeInfo();
        
        // Size buttons
        document.querySelectorAll('.size-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.simulateResize(btn.dataset.size);
            });
        });
        
        // Update breakpoints initially
        this.updateBreakpoints();
    }
    
    handleResize() {
        this.updateResizeInfo();
        this.updateBreakpoints();
        this.logEvent('RESIZE', `Window resized to ${window.innerWidth}x${window.innerHeight}`, 'resize');
    }
    
    updateResizeInfo() {
        document.getElementById('widthValue').textContent = window.innerWidth;
        document.getElementById('heightValue').textContent = window.innerHeight;
        
        // Update device type
        let deviceType = 'Desktop';
        if (window.innerWidth < 768) deviceType = 'Mobile';
        else if (window.innerWidth < 1024) deviceType = 'Tablet';
        
        document.getElementById('deviceType').textContent = deviceType;
    }
    
    updateBreakpoints() {
        const width = window.innerWidth;
        const breakpoints = document.querySelectorAll('.breakpoint');
        
        breakpoints.forEach(bp => {
            bp.classList.remove('active');
            
            const bpType = bp.dataset.bp;
            if (
                (bpType === 'xs' && width < 576) ||
                (bpType === 'sm' && width >= 576 && width < 768) ||
                (bpType === 'md' && width >= 768 && width < 992) ||
                (bpType === 'lg' && width >= 992 && width < 1200) ||
                (bpType === 'xl' && width >= 1200)
            ) {
                bp.classList.add('active');
            }
        });
    }
    
    simulateResize(size) {
        let width, height;
        
        switch(size) {
            case 'mobile':
                width = 375;
                height = 667;
                break;
            case 'tablet':
                width = 768;
                height = 1024;
                break;
            case 'desktop':
                width = 1200;
                height = 800;
                break;
            case 'fullscreen':
                width = window.screen.width;
                height = window.screen.height;
                break;
        }
        
        // Update display
        document.getElementById('widthValue').textContent = width;
        document.getElementById('heightValue').textContent = height;
        
        this.logEvent('RESIZE', `Simulated ${size} size: ${width}x${height}`, 'resize');
    }
    
    setupToggleEvents() {
        // Details element toggle
        const detailsElement = document.getElementById('detailsElement');
        detailsElement.addEventListener('toggle', (e) => {
            const isOpen = e.target.open;
            this.logEvent('TOGGLE', `Details ${isOpen ? 'opened' : 'closed'}`, 'toggle');
        });
        
        // Custom toggle buttons
        document.getElementById('toggleDetails').addEventListener('click', () => {
            detailsElement.open = !detailsElement.open;
        });
        
        document.getElementById('toggleAccordion').addEventListener('click', () => {
            this.toggleAccordion();
        });
        
        document.getElementById('toggleTheme').addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // Accordion functionality
        this.setupAccordion();
    }
    
    setupAccordion() {
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                const isOpen = content.classList.contains('active');
                
                // Close all accordion items
                document.querySelectorAll('.accordion-content').forEach(item => {
                    item.classList.remove('active');
                });
                
                document.querySelectorAll('.accordion-header i').forEach(icon => {
                    icon.className = 'fas fa-chevron-down';
                });
                
                // Toggle current item
                if (!isOpen) {
                    content.classList.add('active');
                    header.querySelector('i').className = 'fas fa-chevron-up';
                    this.logEvent('TOGGLE', 'Accordion item opened', 'toggle');
                } else {
                    this.logEvent('TOGGLE', 'Accordion item closed', 'toggle');
                }
            });
        });
    }
    
    toggleAccordion() {
        const firstContent = document.querySelector('.accordion-content');
        const isOpen = firstContent.classList.contains('active');
        
        if (isOpen) {
            document.querySelectorAll('.accordion-content').forEach(item => {
                item.classList.remove('active');
            });
            document.querySelectorAll('.accordion-header i').forEach(icon => {
                icon.className = 'fas fa-chevron-down';
            });
            this.logEvent('TOGGLE', 'All accordion items closed', 'toggle');
        } else {
            document.querySelectorAll('.accordion-content').forEach(item => {
                item.classList.add('active');
            });
            document.querySelectorAll('.accordion-header i').forEach(icon => {
                icon.className = 'fas fa-chevron-up';
            });
            this.logEvent('TOGGLE', 'All accordion items opened', 'toggle');
        }
    }
    
    toggleTheme() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        
        document.getElementById('toggleTheme').innerHTML = isDark ? 
            '<i class="fas fa-sun"></i> Light Theme' : 
            '<i class="fas fa-moon"></i> Dark Theme';
            
        this.logEvent('TOGGLE', `Switched to ${isDark ? 'dark' : 'light'} theme`, 'toggle');
    }
    
    setupEventLog() {
        document.getElementById('clearEvents').addEventListener('click', () => {
            this.clearEvents();
        });
        
        document.getElementById('pauseEvents').addEventListener('click', () => {
            this.togglePauseEvents();
        });
    }
    
    logEvent(type, message, category) {
        if (this.isLoggingPaused) return;
        
        this.eventCount++;
        
        const now = new Date();
        const timeString = `[${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}]`;
        
        const eventEntry = document.createElement('div');
        eventEntry.className = `event-entry ${category}`;
        eventEntry.innerHTML = `
            <span class="event-time">${timeString}</span>
            <span class="event-type">${type}</span>
            <span class="event-message">${message}</span>
        `;
        
        const eventsContainer = document.getElementById('eventsContainer');
        eventsContainer.appendChild(eventEntry);
        eventsContainer.scrollTop = eventsContainer.scrollHeight;
        
        document.getElementById('eventCount').textContent = this.eventCount;
    }
    
    clearEvents() {
        const eventsContainer = document.getElementById('eventsContainer');
        eventsContainer.innerHTML = `
            <div class="event-entry system">
                <span class="event-time">[00:00:00]</span>
                <span class="event-type">SYSTEM</span>
                <span class="event-message">Events log cleared</span>
            </div>
        `;
        
        this.eventCount = 1;
        document.getElementById('eventCount').textContent = this.eventCount;
        
        this.logEvent('SYSTEM', 'Events log cleared', 'system');
    }
    
    togglePauseEvents() {
        this.isLoggingPaused = !this.isLoggingPaused;
        
        const button = document.getElementById('pauseEvents');
        button.innerHTML = this.isLoggingPaused ? 
            '<i class="fas fa-play"></i> Resume Logging' : 
            '<i class="fas fa-pause"></i> Pause Logging';
            
        this.logEvent('SYSTEM', `Event logging ${this.isLoggingPaused ? 'paused' : 'resumed'}`, 'system');
    }
}

// Initialize the demo when page loads
document.addEventListener('DOMContentLoaded', () => {
    new EventsDemo();
});