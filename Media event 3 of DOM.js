class MediaEventsDemo {
    constructor() {
        this.audioElement = document.getElementById('audioElement');
        this.videoElement = document.getElementById('videoElement');
        this.eventsLog = document.getElementById('eventsLog');
        this.eventDetails = document.getElementById('eventDetails');
        this.eventCount = document.getElementById('eventCount');
        
        // Custom controls
        this.audioPlayPause = document.getElementById('audioPlayPause');
        this.audioIcon = document.getElementById('audioIcon');
        this.audioProgress = document.getElementById('audioProgress');
        this.audioProgressBar = document.getElementById('audioProgressBar');
        this.audioVolume = document.getElementById('audioVolume');
        
        this.videoPlayPause = document.getElementById('videoPlayPause');
        this.videoIcon = document.getElementById('videoIcon');
        this.videoProgress = document.getElementById('videoProgress');
        this.videoProgressBar = document.getElementById('videoProgressBar');
        this.videoVolume = document.getElementById('videoVolume');
        
        // Controls
        this.clearEvents = document.getElementById('clearEvents');
        this.pauseLog = document.getElementById('pauseLog');
        this.tabButtons = document.querySelectorAll('.tab-btn');
        
        this.isLogPaused = false;
        this.eventsCounter = 1;
        this.currentFilter = 'all';
        
        this.initializeEventListeners();
        this.logEvent('SYSTEM', 'Media events demo initialized');
    }
    
    initializeEventListeners() {
        // Audio Events
        this.setupMediaEvents(this.audioElement, 'AUDIO');
        this.setupCustomAudioControls();
        
        // Video Events
        this.setupMediaEvents(this.videoElement, 'VIDEO');
        this.setupCustomVideoControls();
        
        // Control Events
        this.clearEvents.addEventListener('click', () => this.clearEventsLog());
        this.pauseLog.addEventListener('click', () => this.togglePauseLog());
        
        // Tab Events
        this.tabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.filterEvents(e.target.dataset.tab));
        });
    }
    
    setupMediaEvents(mediaElement, type) {
        const events = [
            'loadstart', 'progress', 'suspend', 'abort', 'error',
            'emptied', 'stalled', 'loadedmetadata', 'loadeddata',
            'canplay', 'canplaythrough', 'playing', 'waiting',
            'seeking', 'seeked', 'ended', 'durationchange',
            'timeupdate', 'play', 'pause', 'ratechange',
            'volumechange'
        ];
        
        events.forEach(event => {
            mediaElement.addEventListener(event, (e) => {
                this.handleMediaEvent(e, type);
            });
        });
    }
    
    setupCustomAudioControls() {
        // Play/Pause
        this.audioPlayPause.addEventListener('click', () => {
            if (this.audioElement.paused) {
                this.audioElement.play();
            } else {
                this.audioElement.pause();
            }
        });
        
        // Progress bar
        this.audioProgressBar.addEventListener('click', (e) => {
            const rect = this.audioProgressBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            this.audioElement.currentTime = percent * this.audioElement.duration;
        });
        
        // Volume control
        this.audioVolume.addEventListener('input', () => {
            this.audioElement.volume = this.audioVolume.value / 100;
        });
        
        // Time update for progress bar
        this.audioElement.addEventListener('timeupdate', () => {
            const percent = (this.audioElement.currentTime / this.audioElement.duration) * 100;
            this.audioProgress.style.width = percent + '%';
        });
    }
    
    setupCustomVideoControls() {
        // Play/Pause
        this.videoPlayPause.addEventListener('click', () => {
            if (this.videoElement.paused) {
                this.videoElement.play();
            } else {
                this.videoElement.pause();
            }
        });
        
        // Progress bar
        this.videoProgressBar.addEventListener('click', (e) => {
            const rect = this.videoProgressBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            this.videoElement.currentTime = percent * this.videoElement.duration;
        });
        
        // Volume control
        this.videoVolume.addEventListener('input', () => {
            this.videoElement.volume = this.videoVolume.value / 100;
        });
        
        // Time update for progress bar
        this.videoElement.addEventListener('timeupdate', () => {
            const percent = (this.videoElement.currentTime / this.videoElement.duration) * 100;
            this.videoProgress.style.width = percent + '%';
        });
    }
    
    handleMediaEvent(event, type) {
        if (this.isLogPaused) return;
        
        const eventType = event.type.toUpperCase();
        let message = '';
        let category = 'playback';
        
        // Customize messages based on event type
        switch(event.type) {
            case 'canplay':
                message = 'Media can start playing';
                category = 'playback';
                break;
            case 'play':
                message = 'Playback started';
                this.updatePlayButton(type, true);
                category = 'playback';
                break;
            case 'playing':
                message = 'Playback is actively playing';
                category = 'playback';
                break;
            case 'pause':
                message = 'Playback paused';
                this.updatePlayButton(type, false);
                category = 'playback';
                break;
            case 'ended':
                message = 'Playback finished';
                this.updatePlayButton(type, false);
                category = 'playback';
                break;
            case 'progress':
                message = `Downloading: ${this.getBufferedPercent(event.target)}%`;
                category = type.toLowerCase();
                break;
            case 'volumechange':
                message = `Volume changed to: ${Math.round(event.target.volume * 100)}%`;
                category = type.toLowerCase();
                break;
            case 'waiting':
                message = 'Waiting for data to continue playback';
                category = 'playback';
                break;
            case 'timeupdate':
                // Don't log every timeupdate to avoid spam
                if (Math.random() < 0.1) { // 10% chance to log
                    message = `Time updated: ${this.formatTime(event.target.currentTime)}`;
                    category = 'playback';
                } else {
                    return;
                }
                break;
            case 'loadedmetadata':
                message = `Media metadata loaded - Duration: ${this.formatTime(event.target.duration)}`;
                category = type.toLowerCase();
                break;
            default:
                message = `Event: ${event.type}`;
                category = type.toLowerCase();
        }
        
        this.logEvent(eventType, message, category, event);
    }
    
    updatePlayButton(type, isPlaying) {
        if (type === 'AUDIO') {
            this.audioIcon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
        } else {
            this.videoIcon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
        }
    }
    
    getBufferedPercent(media) {
        if (media.buffered.length > 0) {
            const bufferedEnd = media.buffered.end(media.buffered.length - 1);
            return Math.round((bufferedEnd / media.duration) * 100);
        }
        return 0;
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    logEvent(type, message, category = 'system', event = null) {
        const now = new Date();
        const timeString = `[${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}]`;
        
        const eventEntry = document.createElement('div');
        eventEntry.className = `event-entry ${category}`;
        eventEntry.innerHTML = `
            <span class="event-time">${timeString}</span>
            <span class="event-type">${type}</span>
            <span class="event-message">${message}</span>
        `;
        
        // Add click event to show details
        if (event) {
            eventEntry.addEventListener('click', () => this.showEventDetails(event, type, message));
        }
        
        // Apply filter
        if (this.currentFilter === 'all' || this.currentFilter === category) {
            eventEntry.style.display = 'block';
        } else {
            eventEntry.style.display = 'none';
        }
        
        this.eventsLog.appendChild(eventEntry);
        this.eventsLog.scrollTop = this.eventsLog.scrollHeight;
        
        // Update counter
        this.eventsCounter++;
        this.eventCount.textContent = this.eventsCounter;
    }
    
    showEventDetails(event, type, message) {
        const media = event.target;
        const details = {
            'Event Type': type,
            'Event Message': message,
            'Media Type': media.tagName,
            'Current Time': this.formatTime(media.currentTime),
            'Duration': this.formatTime(media.duration),
            'Volume': Math.round(media.volume * 100) + '%',
            'Paused': media.paused ? 'Yes' : 'No',
            'Ended': media.ended ? 'Yes' : 'No',
            'Muted': media.muted ? 'Yes' : 'No',
            'Playback Rate': media.playbackRate + 'x',
            'Ready State': this.getReadyState(media.readyState),
            'Network State': this.getNetworkState(media.networkState),
            'Buffered': this.getBufferedRanges(media.buffered),
            'Video Width': media.videoWidth || 'N/A',
            'Video Height': media.videoHeight || 'N/A'
        };
        
        let detailsHTML = '<div class="event-details">';
        for (const [key, value] of Object.entries(details)) {
            detailsHTML += `
                <div class="detail-item">
                    <div class="detail-label">${key}</div>
                    <div class="detail-value">${value}</div>
                </div>
            `;
        }
        detailsHTML += '</div>';
        
        this.eventDetails.innerHTML = detailsHTML;
    }
    
    getReadyState(state) {
        const states = {
            0: 'HAVE_NOTHING',
            1: 'HAVE_METADATA',
            2: 'HAVE_CURRENT_DATA',
            3: 'HAVE_FUTURE_DATA',
            4: 'HAVE_ENOUGH_DATA'
        };
        return states[state] || state;
    }
    
    getNetworkState(state) {
        const states = {
            0: 'NETWORK_EMPTY',
            1: 'NETWORK_IDLE',
            2: 'NETWORK_LOADING',
            3: 'NETWORK_NO_SOURCE'
        };
        return states[state] || state;
    }
    
    getBufferedRanges(buffered) {
        if (buffered.length === 0) return 'No data buffered';
        
        const ranges = [];
        for (let i = 0; i < buffered.length; i++) {
            ranges.push(`${this.formatTime(buffered.start(i))} - ${this.formatTime(buffered.end(i))}`);
        }
        return ranges.join(', ');
    }
    
    filterEvents(filter) {
        this.currentFilter = filter;
        
        // Update active tab
        this.tabButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === filter);
        });
        
        // Show/hide events
        const events = this.eventsLog.querySelectorAll('.event-entry');
        events.forEach(event => {
            if (filter === 'all' || event.classList.contains(filter)) {
                event.style.display = 'block';
            } else {
                event.style.display = 'none';
            }
        });
    }
    
    clearEventsLog() {
        this.eventsLog.innerHTML = `
            <div class="event-entry system">
                <span class="event-time">[00:00:00]</span>
                <span class="event-type">SYSTEM</span>
                <span class="event-message">Events log cleared</span>
            </div>
        `;
        this.eventsCounter = 1;
        this.eventCount.textContent = this.eventsCounter;
        this.eventDetails.innerHTML = `
            <div class="detail-placeholder">
                <i class="fas fa-mouse-pointer"></i>
                <p>Click on any event to see detailed information</p>
            </div>
        `;
        this.logEvent('SYSTEM', 'Events log cleared');
    }
    
    togglePauseLog() {
        this.isLogPaused = !this.isLogPaused;
        this.pauseLog.innerHTML = this.isLogPaused ? 
            '<i class="fas fa-play"></i> Resume Log' : 
            '<i class="fas fa-pause"></i> Pause Log';
        this.logEvent('SYSTEM', this.isLogPaused ? 'Event logging paused' : 'Event logging resumed');
    }
}

// Initialize the demo when page loads
document.addEventListener('DOMContentLoaded', () => {
    new MediaEventsDemo();
});