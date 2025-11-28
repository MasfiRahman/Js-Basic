class EventPropagationDemo {
    constructor() {
        this.elements = document.querySelectorAll('.element');
        this.flowSteps = document.querySelectorAll('.flow-step');
        this.eventDetails = document.getElementById('eventDetails');
        this.eventLog = document.getElementById('eventLog');
        this.currentPhase = document.getElementById('currentPhase');
        this.eventsBlocked = document.getElementById('eventsBlocked');
        
        // Settings
        this.settings = {
            useCapture: false,
            stopPropagation: false,
            stopImmediate: false
        };
        
        // Counters
        this.eventCount = 0;
        this.blockedCount = 0;
        this.isLogPaused = false;
        
        this.initializeEventListeners();
        this.logEvent('SYSTEM', 'Event propagation demo initialized', 'system');
    }
    
    initializeEventListeners() {
        // Control buttons
        document.getElementById('bubbleMode').addEventListener('click', () => this.setBubbleMode());
        document.getElementById('captureMode').addEventListener('click', () => this.setCaptureMode());
        document.getElementById('stopPropagation').addEventListener('click', () => this.toggleStopPropagation());
        document.getElementById('stopImmediate').addEventListener('click', () => this.toggleStopImmediate());
        document.getElementById('clearLog').addEventListener('click', () => this.clearLog());
        document.getElementById('pauseLog').addEventListener('click', () => this.togglePauseLog());
        
        // Add event listeners to all DOM elements
        this.elements.forEach(element => {
            const level = parseInt(element.dataset.level);
            const id = element.dataset.id;
            
            // Add click event with capturing (true) and bubbling (false)
            element.addEventListener('click', (e) => this.handleEvent(e, level, id, 'CAPTURE'), true);
            element.addEventListener('click', (e) => this.handleEvent(e, level, id, 'TARGET'), false);
            element.addEventListener('click', (e) => this.handleEvent(e, level, id, 'BUBBLE'), false);
        });
        
        // Set initial mode
        this.setBubbleMode();
    }
    
    handleEvent(event, level, elementId, phase) {
        if (this.isLogPaused) return;
        
        // Skip if this is a control button click
        if (event.target.closest('.control-btn')) return;
        
        const currentTarget = event.currentTarget;
        const isTarget = event.target === event.currentTarget;
        
        // Update visual feedback
        this.updateVisualFeedback(level, elementId, phase);
        
        // Handle stop propagation
        if (this.settings.stopPropagation && phase === 'BUBBLE' && elementId === 'child') {
            event.stopPropagation();
            this.logEvent('PROPAGATION', `Propagation stopped at: ${elementId}`, 'blocked');
            this.blockedCount++;
            this.eventsBlocked.textContent = this.blockedCount;
            return;
        }
        
        // Handle stop immediate propagation
        if (this.settings.stopImmediate && phase === 'TARGET' && elementId === 'grandchild') {
            event.stopImmediatePropagation();
            this.logEvent('IMMEDIATE', `Immediate propagation stopped at: ${elementId}`, 'blocked');
            this.blockedCount++;
            this.eventsBlocked.textContent = this.blockedCount;
            return;
        }
        
        // Log the event
        this.logEvent(phase, `Level ${level}: ${elementId}`, phase.toLowerCase());
        
        // Show event details for target phase
        if (phase === 'TARGET' && isTarget) {
            this.showEventDetails(event, level, elementId, phase);
        }
    }
    
    updateVisualFeedback(level, elementId, phase) {
        // Reset all elements first
        this.elements.forEach(el => el.classList.remove('capture-active', 'target-active', 'bubble-active', 'active'));
        this.flowSteps.forEach(step => step.classList.remove('capture-active', 'bubble-active', 'active'));
        
        // Add active class based on phase
        const element = document.querySelector(`[data-id="${elementId}"]`);
        const flowStep = document.querySelector(`.flow-step[data-level="${level}"]`);
        
        if (element && flowStep) {
            switch(phase) {
                case 'CAPTURE':
                    element.classList.add('capture-active');
                    flowStep.classList.add('capture-active');
                    break;
                case 'TARGET':
                    element.classList.add('target-active');
                    flowStep.classList.add('active');
                    break;
                case 'BUBBLE':
                    element.classList.add('bubble-active');
                    flowStep.classList.add('bubble-active');
                    break;
            }
            
            // Remove classes after animation
            setTimeout(() => {
                element.classList.remove('capture-active', 'target-active', 'bubble-active');
                flowStep.classList.remove('capture-active', 'bubble-active', 'active');
            }, 1000);
        }
    }
    
    setBubbleMode() {
        this.settings.useCapture = false;
        this.currentPhase.textContent = 'Bubbling';
        
        // Update button states
        document.getElementById('bubbleMode').classList.add('active');
        document.getElementById('captureMode').classList.remove('active');
        
        this.logEvent('SYSTEM', 'Switched to BUBBLING phase mode', 'system');
    }
    
    setCaptureMode() {
        this.settings.useCapture = true;
        this.currentPhase.textContent = 'Capturing';
        
        // Update button states
        document.getElementById('captureMode').classList.add('active');
        document.getElementById('bubbleMode').classList.remove('active');
        
        this.logEvent('SYSTEM', 'Switched to CAPTURING phase mode', 'system');
    }
    
    toggleStopPropagation() {
        this.settings.stopPropagation = !this.settings.stopPropagation;
        const button = document.getElementById('stopPropagation');
        
        button.classList.toggle('active', this.settings.stopPropagation);
        button.innerHTML = this.settings.stopPropagation ? 
            '<i class="fas fa-ban"></i> Propagation: ON' : 
            '<i class="fas fa-ban"></i> Stop Propagation';
            
        this.logEvent('SYSTEM', `Stop propagation: ${this.settings.stopPropagation ? 'ENABLED' : 'DISABLED'}`, 'system');
    }
    
    toggleStopImmediate() {
        this.settings.stopImmediate = !this.settings.stopImmediate;
        const button = document.getElementById('stopImmediate');
        
        button.classList.toggle('active', this.settings.stopImmediate);
        button.innerHTML = this.settings.stopImmediate ? 
            '<i class="fas fa-hand-paper"></i> Immediate: ON' : 
            '<i class="fas fa-hand-paper"></i> Stop Immediate';
            
        this.logEvent('SYSTEM', `Stop immediate: ${this.settings.stopImmediate ? 'ENABLED' : 'DISABLED'}`, 'system');
    }
    
    showEventDetails(event, level, elementId, phase) {
        const eventProperties = {
            'Event Type': event.type,
            'Event Phase': phase,
            'Current Target': elementId,
            'Target Element': event.target.dataset.id || event.target.tagName,
            'Bubbles': event.bubbles ? 'Yes' : 'No',
            'Cancelable': event.cancelable ? 'Yes' : 'No',
            'Default Prevented': event.defaultPrevented ? 'Yes' : 'No',
            'Event Phase Code': this.getEventPhaseName(event.eventPhase),
            'Is Trusted': event.isTrusted ? 'Yes' : 'No',
            'Time Stamp': `${event.timeStamp.toFixed(2)}ms`,
            'Client Coordinates': `(${event.clientX}, ${event.clientY})`,
            'Page Coordinates': `(${event.pageX}, ${event.pageY})`
        };
        
        let detailsHTML = '<div class="event-properties">';
        for (const [key, value] of Object.entries(eventProperties)) {
            detailsHTML += `
                <div class="property-item">
                    <div class="property-label">${key}</div>
                    <div class="property-value">${value}</div>
                </div>
            `;
        }
        detailsHTML += '</div>';
        
        this.eventDetails.innerHTML = detailsHTML;
    }
    
    getEventPhaseName(phaseCode) {
        const phases = {
            0: 'NONE',
            1: 'CAPTURING_PHASE',
            2: 'AT_TARGET',
            3: 'BUBBLING_PHASE'
        };
        return phases[phaseCode] || phaseCode;
    }
    
    logEvent(type, message, category) {
        this.eventCount++;
        
        const now = new Date();
        const timeString = `[${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}]`;
        
        const logEntry = document.createElement('div');
        logEntry.className = `log-entry ${category}`;
        logEntry.innerHTML = `
            <span class="log-time">${timeString}</span>
            <span class="log-event">${type}</span>
            <span class="log-message">${message}</span>
        `;
        
        this.eventLog.appendChild(logEntry);
        this.eventLog.scrollTop = this.eventLog.scrollHeight;
        
        document.getElementById('eventCount').textContent = this.eventCount;
    }
    
    clearLog() {
        this.eventLog.innerHTML = `
            <div class="log-entry system">
                <span class="log-time">[00:00:00]</span>
                <span class="log-event">SYSTEM</span>
                <span class="log-message">Event log cleared</span>
            </div>
        `;
        this.eventCount = 1;
        this.blockedCount = 0;
        document.getElementById('eventCount').textContent = this.eventCount;
        this.eventsBlocked.textContent = this.blockedCount;
        this.logEvent('SYSTEM', 'Event log cleared', 'system');
    }
    
    togglePauseLog() {
        this.isLogPaused = !this.isLogPaused;
        const button = document.getElementById('pauseLog');
        
        button.innerHTML = this.isLogPaused ? 
            '<i class="fas fa-play"></i> Resume' : 
            '<i class="fas fa-pause"></i> Pause';
            
        this.logEvent('SYSTEM', `Event logging ${this.isLogPaused ? 'paused' : 'resumed'}`, 'system');
    }
}

// Initialize the demo when page loads
document.addEventListener('DOMContentLoaded', function() {
    new EventPropagationDemo();
});