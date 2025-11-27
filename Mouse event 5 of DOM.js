class MouseEventsDemo {
    constructor() {
        this.targetBox = document.getElementById('targetBox');
        this.eventDetails = document.getElementById('eventDetails');
        this.eventLog = document.getElementById('eventLog');
        
        // Counters for each event type
        this.counters = {
            click: 0,
            dblclick: 0,
            mousedown: 0,
            mouseup: 0,
            mousemove: 0,
            mouseover: 0,
            mouseenter: 0,
            mouseleave: 0
        };
        
        this.isLogPaused = false;
        this.lastMouseEvent = null;
        
        this.initializeEventListeners();
        this.logEvent('SYSTEM', 'Mouse events demo initialized', 'system');
    }
    
    initializeEventListeners() {
        // Mouse events on target box
        this.targetBox.addEventListener('click', (e) => this.handleMouseEvent(e, 'click'));
        this.targetBox.addEventListener('dblclick', (e) => this.handleMouseEvent(e, 'dblclick'));
        this.targetBox.addEventListener('mousedown', (e) => this.handleMouseEvent(e, 'mousedown'));
        this.targetBox.addEventListener('mouseup', (e) => this.handleMouseEvent(e, 'mouseup'));
        this.targetBox.addEventListener('mousemove', (e) => this.handleMouseEvent(e, 'mousemove'));
        this.targetBox.addEventListener('mouseover', (e) => this.handleMouseEvent(e, 'mouseover'));
        this.targetBox.addEventListener('mouseenter', (e) => this.handleMouseEvent(e, 'mouseenter'));
        this.targetBox.addEventListener('mouseleave', (e) => this.handleMouseEvent(e, 'mouseleave'));
        
        // Global mouse move for coordinates
        document.addEventListener('mousemove', (e) => this.updateMouseCoordinates(e));
        
        // Control buttons
        document.getElementById('clearLog').addEventListener('click', () => this.clearLog());
        document.getElementById('pauseLog').addEventListener('click', () => this.togglePauseLog());
        
        // Event card clicks for details
        document.querySelectorAll('.event-card').forEach(card => {
            card.addEventListener('click', () => {
                const eventType = card.dataset.event;
                this.showEventExplanation(eventType);
            });
        });
    }
    
    handleMouseEvent(event, type) {
        if (this.isLogPaused) return;
        
        // Update counter
        this.counters[type]++;
        document.getElementById(`${type}Count`).textContent = this.counters[type];
        
        // Visual feedback
        this.highlightEventCard(type);
        this.animateTargetBox();
        
        // Log the event
        this.logEvent(type.toUpperCase(), this.getEventDescription(type, event), type);
        
        // Show event details
        this.showEventDetails(event, type);
        
        // Store last event for reference
        this.lastMouseEvent = { type, event };
        
        // Prevent default for some events to avoid text selection
        if (type === 'mousedown') {
            event.preventDefault();
        }
    }
    
    getEventDescription(type, event) {
        const descriptions = {
            click: 'Single mouse click',
            dblclick: 'Double mouse click',
            mousedown: `Mouse button ${event.button} pressed`,
            mouseup: `Mouse button ${event.button} released`,
            mousemove: `Mouse moved to (${event.clientX}, ${event.clientY})`,
            mouseover: 'Mouse entered element',
            mouseenter: 'Mouse entered element (bubbles)',
            mouseleave: 'Mouse left element'
        };
        
        return descriptions[type] || `Mouse event: ${type}`;
    }
    
    highlightEventCard(eventType) {
        // Remove active class from all cards
        document.querySelectorAll('.event-card').forEach(card => {
            card.classList.remove('active', 'pulse');
        });
        
        // Add active class to current event card
        const activeCard = document.querySelector(`[data-event="${eventType}"]`);
        if (activeCard) {
            activeCard.classList.add('active', 'pulse');
            
            // Remove pulse animation after it completes
            setTimeout(() => {
                activeCard.classList.remove('pulse');
            }, 500);
        }
    }
    
    animateTargetBox() {
        this.targetBox.classList.add('pulse');
        setTimeout(() => {
            this.targetBox.classList.remove('pulse');
        }, 300);
    }
    
    updateMouseCoordinates(event) {
        document.getElementById('mouseX').textContent = event.clientX;
        document.getElementById('mouseY').textContent = event.clientY;
        
        // Update mouse buttons state
        let buttons = [];
        if (event.buttons & 1) buttons.push('Left');
        if (event.buttons & 2) buttons.push('Right');
        if (event.buttons & 4) buttons.push('Middle');
        
        document.getElementById('mouseButtons').textContent = 
            buttons.length > 0 ? buttons.join(' + ') : 'None';
    }
    
    showEventDetails(event, type) {
        const eventProperties = {
            'Event Type': type,
            'Mouse Position': `(${event.clientX}, ${event.clientY})`,
            'Screen Position': `(${event.screenX}, ${event.screenY})`,
            'Page Position': `(${event.pageX}, ${event.pageY})`,
            'Button': this.getButtonName(event.button),
            'Buttons': event.buttons,
            'Alt Key': event.altKey ? 'Yes' : 'No',
            'Ctrl Key': event.ctrlKey ? 'Yes' : 'No',
            'Shift Key': event.shiftKey ? 'Yes' : 'No',
            'Meta Key': event.metaKey ? 'Yes' : 'No',
            'Target': event.target.tagName,
            'Current Target': event.currentTarget.tagName,
            'Event Phase': this.getEventPhase(event.eventPhase),
            'Bubbles': event.bubbles ? 'Yes' : 'No',
            'Cancelable': event.cancelable ? 'Yes' : 'No'
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
    
    showEventExplanation(eventType) {
        const explanations = {
            click: 'The click event fires when a pointing device button (usually a mouse\'s primary button) is pressed and released on a single element.',
            dblclick: 'The dblclick event fires when a pointing device button (usually a mouse\'s primary button) is clicked twice on a single element.',
            mousedown: 'The mousedown event fires when a pointing device button is pressed on an element.',
            mouseup: 'The mouseup event fires when a pointing device button is released over an element.',
            mousemove: 'The mousemove event fires when a pointing device (usually a mouse) is moved while over an element.',
            mouseover: 'The mouseover event fires when a pointing device is moved onto the element that has the listener attached or onto one of its children.',
            mouseenter: 'The mouseenter event fires when a pointing device (usually a mouse) is moved over the element that has the listener attached.',
            mouseleave: 'The mouseleave event fires when the pointer of a pointing device (usually a mouse) is moved out of an element that has the listener attached to it.'
        };
        
        const explanation = explanations[eventType] || 'No explanation available for this event type.';
        
        this.eventDetails.innerHTML = `
            <div class="property-item">
                <div class="property-label">Event Type</div>
                <div class="property-value">${eventType}</div>
            </div>
            <div class="property-item" style="grid-column: 1 / -1;">
                <div class="property-label">Description</div>
                <div class="property-value">${explanation}</div>
            </div>
            <div class="property-item">
                <div class="property-label">Trigger Count</div>
                <div class="property-value">${this.counters[eventType]}</div>
            </div>
        `;
    }
    
    getButtonName(button) {
        const buttons = {
            0: 'Left button',
            1: 'Middle button',
            2: 'Right button',
            3: 'Browser Back button',
            4: 'Browser Forward button'
        };
        return buttons[button] || `Button ${button}`;
    }
    
    getEventPhase(phase) {
        const phases = {
            0: 'NONE',
            1: 'CAPTURING_PHASE',
            2: 'AT_TARGET',
            3: 'BUBBLING_PHASE'
        };
        return phases[phase] || phase;
    }
    
    logEvent(type, message, category) {
        const now = new Date();
        const timeString = `[${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}]`;
        
        const logEntry = document.createElement('div');
        logEntry.className = `log-entry ${category}`;
        logEntry.innerHTML = `
            <span class="log-time">${timeString}</span>
            <span class="log-event">${type}</span>
            <span class="log-message">${message}</span>
        `;
        
        // Add click event to show details
        logEntry.addEventListener('click', () => {
            if (this.lastMouseEvent && this.lastMouseEvent.type === category) {
                this.showEventDetails(this.lastMouseEvent.event, category);
            }
        });
        
        this.eventLog.appendChild(logEntry);
        this.eventLog.scrollTop = this.eventLog.scrollHeight;
    }
    
    clearLog() {
        this.eventLog.innerHTML = `
            <div class="log-entry system">
                <span class="log-time">[00:00:00]</span>
                <span class="log-event">SYSTEM</span>
                <span class="log-message">Event log cleared</span>
            </div>
        `;
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
document.addEventListener('DOMContentLoaded', () => {
    new MouseEventsDemo();
});