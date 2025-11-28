class DragDropEventsDemo {
    constructor() {
        this.draggableItems = document.querySelectorAll('.draggable-item');
        this.dropZones = document.querySelectorAll('.drop-zone');
        this.eventDetails = document.getElementById('eventDetails');
        this.eventLog = document.getElementById('eventLog');
        this.dragStatus = document.getElementById('dragStatus');
        
        // Counters for each event type
        this.counters = {
            dragstart: 0,
            drag: 0,
            dragend: 0,
            dragenter: 0,
            dragover: 0,
            dragleave: 0,
            drop: 0
        };
        
        // Zone item counts
        this.zoneCounts = {
            uploads: 0,
            images: 0,
            media: 0
        };
        
        this.isLogPaused = false;
        this.currentDragItem = null;
        this.lastDragEvent = null;
        this.dragTimeout = null;
        this.dragoverTimeout = null;
        
        this.initializeEventListeners();
        this.logEvent('SYSTEM', 'Drag & Drop events demo initialized', 'system');
    }
    
    initializeEventListeners() {
        // Draggable items events
        this.draggableItems.forEach(item => {
            item.addEventListener('dragstart', (e) => this.handleDragStart(e, item));
            item.addEventListener('drag', (e) => this.handleDrag(e, item));
            item.addEventListener('dragend', (e) => this.handleDragEnd(e, item));
        });
        
        // Drop zones events
        this.dropZones.forEach(zone => {
            zone.addEventListener('dragenter', (e) => this.handleDragEnter(e, zone));
            zone.addEventListener('dragover', (e) => this.handleDragOver(e, zone));
            zone.addEventListener('dragleave', (e) => this.handleDragLeave(e, zone));
            zone.addEventListener('drop', (e) => this.handleDrop(e, zone));
        });
        
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
    
    handleDragStart(event, item) {
        if (this.isLogPaused) return;
        
        this.currentDragItem = item;
        this.dragStatus.textContent = 'Dragging: ' + item.querySelector('span').textContent;
        
        // Set drag data
        event.dataTransfer.setData('text/plain', item.dataset.id);
        event.dataTransfer.effectAllowed = 'move';
        
        // Visual feedback
        item.classList.add('dragging');
        
        // Update counter and log
        this.updateCounter('dragstart');
        this.highlightEventCard('dragstart');
        this.logEvent('DRAGSTART', `Started dragging: ${item.querySelector('span').textContent}`, 'dragstart');
        
        // Show event details
        this.showEventDetails(event, 'dragstart', item);
        this.lastDragEvent = { type: 'dragstart', event, item };
    }
    
    handleDrag(event, item) {
        if (this.isLogPaused) return;
        
        // Update counter and log (throttled to avoid spam)
        if (!this.dragTimeout) {
            this.dragTimeout = setTimeout(() => {
                this.updateCounter('drag');
                this.logEvent('DRAG', `Dragging: ${item.querySelector('span').textContent}`, 'drag');
                this.dragTimeout = null;
            }, 100);
        }
        
        this.lastDragEvent = { type: 'drag', event, item };
    }
    
    handleDragEnd(event, item) {
        if (this.isLogPaused) return;
        
        // Visual feedback
        item.classList.remove('dragging');
        this.dragStatus.textContent = 'Ready';
        this.currentDragItem = null;
        
        // Reset all drop zones
        this.dropZones.forEach(zone => {
            zone.classList.remove('drag-over', 'drop-allowed', 'drop-not-allowed');
        });
        
        // Update counter and log
        this.updateCounter('dragend');
        this.highlightEventCard('dragend');
        this.logEvent('DRAGEND', `Finished dragging: ${item.querySelector('span').textContent}`, 'dragend');
        
        // Show event details
        this.showEventDetails(event, 'dragend', item);
        this.lastDragEvent = { type: 'dragend', event, item };
    }
    
    handleDragEnter(event, zone) {
        if (this.isLogPaused) return;
        
        event.preventDefault();
        
        // Visual feedback
        zone.classList.add('drag-over');
        
        // Check if drop is allowed
        const isAllowed = this.isDropAllowed(this.currentDragItem, zone);
        zone.classList.add(isAllowed ? 'drop-allowed' : 'drop-not-allowed');
        
        // Update counter and log
        this.updateCounter('dragenter');
        this.highlightEventCard('dragenter');
        this.logEvent('DRAGENTER', `Entered: ${zone.querySelector('h3').textContent}`, 'dragenter');
        
        // Show event details
        this.showEventDetails(event, 'dragenter', zone);
        this.lastDragEvent = { type: 'dragenter', event, zone };
    }
    
    handleDragOver(event, zone) {
        if (this.isLogPaused) return;
        
        event.preventDefault();
        
        // Set drop effect
        const isAllowed = this.isDropAllowed(this.currentDragItem, zone);
        event.dataTransfer.dropEffect = isAllowed ? 'move' : 'none';
        
        // Update counter (throttled)
        if (!this.dragoverTimeout) {
            this.dragoverTimeout = setTimeout(() => {
                this.updateCounter('dragover');
                this.logEvent('DRAGOVER', `Over: ${zone.querySelector('h3').textContent}`, 'dragover');
                this.dragoverTimeout = null;
            }, 200);
        }
        
        this.lastDragEvent = { type: 'dragover', event, zone };
    }
    
    handleDragLeave(event, zone) {
        if (this.isLogPaused) return;
        
        // Visual feedback
        zone.classList.remove('drag-over', 'drop-allowed', 'drop-not-allowed');
        
        // Update counter and log
        this.updateCounter('dragleave');
        this.highlightEventCard('dragleave');
        this.logEvent('DRAGLEAVE', `Left: ${zone.querySelector('h3').textContent}`, 'dragleave');
        
        // Show event details
        this.showEventDetails(event, 'dragleave', zone);
        this.lastDragEvent = { type: 'dragleave', event, zone };
    }
    
    handleDrop(event, zone) {
        if (this.isLogPaused) return;
        
        event.preventDefault();
        
        // Check if drop is allowed
        if (!this.isDropAllowed(this.currentDragItem, zone)) {
            this.logEvent('DROP', `Drop rejected in: ${zone.querySelector('h3').textContent}`, 'drop');
            return;
        }
        
        // Visual feedback
        zone.classList.remove('drag-over', 'drop-allowed', 'drop-not-allowed');
        zone.classList.add('drop-success');
        setTimeout(() => zone.classList.remove('drop-success'), 500);
        
        // Update zone count
        this.updateZoneCount(zone.dataset.zone);
        
        // Create dropped item preview
        this.createDroppedItem(this.currentDragItem, zone);
        
        // Update counter and log
        this.updateCounter('drop');
        this.highlightEventCard('drop');
        this.logEvent('DROP', `Dropped: ${this.currentDragItem.querySelector('span').textContent} in ${zone.querySelector('h3').textContent}`, 'drop');
        
        // Show event details
        this.showEventDetails(event, 'drop', zone);
        this.lastDragEvent = { type: 'drop', event, zone };
    }
    
    isDropAllowed(item, zone) {
        if (!item) return false;
        
        const itemType = item.dataset.type;
        const zoneType = zone.dataset.zone;
        
        switch(zoneType) {
            case 'uploads':
                return true; // Accepts all types
            case 'images':
                return itemType === 'image';
            case 'media':
                return itemType === 'video' || itemType === 'audio';
            default:
                return false;
        }
    }
    
    updateCounter(eventType) {
        this.counters[eventType]++;
        document.getElementById(`${eventType}Count`).textContent = this.counters[eventType];
    }
    
    updateZoneCount(zoneType) {
        this.zoneCounts[zoneType]++;
        document.getElementById(`zone${this.getZoneIndex(zoneType)}Count`).textContent = this.zoneCounts[zoneType];
    }
    
    getZoneIndex(zoneType) {
        const zones = { uploads: 1, images: 2, media: 3 };
        return zones[zoneType] || 1;
    }
    
    createDroppedItem(originalItem, zone) {
        const itemType = originalItem.dataset.type;
        const itemName = originalItem.querySelector('span').textContent;
        
        const droppedItem = document.createElement('div');
        droppedItem.className = 'dropped-item';
        droppedItem.innerHTML = `
            <i class="${originalItem.querySelector('i').className}"></i>
            <span>${itemName}</span>
        `;
        
        droppedItem.style.cssText = `
            background: white;
            padding: 10px;
            border-radius: 8px;
            margin: 5px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 0.8rem;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        `;
        
        // Add to zone content
        zone.querySelector('.zone-content').appendChild(droppedItem);
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
    
    showEventDetails(event, type, element) {
        const elementInfo = element ? {
            'Element Type': element.tagName,
            'Element ID': element.id || 'No ID',
            'Data Type': element.dataset.type || element.dataset.zone || 'N/A',
            'Element Text': element.textContent.trim().substring(0, 50) + '...'
        } : {};
        
        const eventProperties = {
            'Event Type': type,
            'Event Phase': this.getEventPhase(event.eventPhase),
            'Bubbles': event.bubbles ? 'Yes' : 'No',
            'Cancelable': event.cancelable ? 'Yes' : 'No',
            'Data Transfer Type': event.dataTransfer?.types ? Array.from(event.dataTransfer.types).join(', ') : 'N/A',
            'Drop Effect': event.dataTransfer?.dropEffect || 'N/A',
            'Effect Allowed': event.dataTransfer?.effectAllowed || 'N/A',
            ...elementInfo
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
            dragstart: 'The dragstart event fires when the user starts dragging an element. This is where you set the data to be dragged.',
            drag: 'The drag event fires every few hundred milliseconds while an element is being dragged.',
            dragend: 'The dragend event fires when a drag operation is ended (by releasing a mouse button or hitting the escape key).',
            dragenter: 'The dragenter event fires when a dragged element enters a valid drop target.',
            dragover: 'The dragover event fires when an element is being dragged over a valid drop target (every few hundred milliseconds).',
            dragleave: 'The dragleave event fires when a dragged element leaves a valid drop target.',
            drop: 'The drop event fires when an element is dropped on a valid drop target.'
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
            if (this.lastDragEvent && this.lastDragEvent.type === category) {
                this.showEventDetails(this.lastDragEvent.event, category, this.lastDragEvent.item || this.lastDragEvent.zone);
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

// Initialize the demo when page loads - CORRECTED VERSION
document.addEventListener('DOMContentLoaded', function() {
    new DragDropEventsDemo();
});

// Alternative syntax that also works:
// document.addEventListener('DOMContentLoaded', () => {
//     new DragDropEventsDemo();
// });