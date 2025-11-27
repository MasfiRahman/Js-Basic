class AudioPlayer {
    constructor() {
        this.audio = document.getElementById('audioElement');
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.playIcon = document.getElementById('playIcon');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.progressBar = document.getElementById('progressBar');
        this.progress = document.getElementById('progress');
        this.currentTimeEl = document.getElementById('currentTime');
        this.durationEl = document.getElementById('duration');
        this.volumeSlider = document.getElementById('volumeSlider');
        
        this.isPlaying = false;
        
        this.initializeEventListeners();
        this.updatePlayerInfo();
    }
    
    initializeEventListeners() {
        // Play/Pause button
        this.playPauseBtn.addEventListener('click', () => {
            this.togglePlayPause();
        });
        
        // Progress bar click
        this.progressBar.addEventListener('click', (e) => {
            this.setProgress(e);
        });
        
        // Volume control
        this.volumeSlider.addEventListener('input', () => {
            this.setVolume();
        });
        
        // Previous and Next buttons
        this.prevBtn.addEventListener('click', () => {
            this.previousSong();
        });
        
        this.nextBtn.addEventListener('click', () => {
            this.nextSong();
        });
        
        // Audio time update
        this.audio.addEventListener('timeupdate', () => {
            this.updateProgress();
        });
        
        // Audio loaded metadata
        this.audio.addEventListener('loadedmetadata', () => {
            this.updatePlayerInfo();
        });
        
        // Audio ended
        this.audio.addEventListener('ended', () => {
            this.songEnded();
        });
    }
    
    togglePlayPause() {
        if (this.isPlaying) {
            this.pauseAudio();
        } else {
            this.playAudio();
        }
    }
    
    playAudio() {
        this.audio.play();
        this.isPlaying = true;
        this.playIcon.textContent = '⏸';
        this.playPauseBtn.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a24)';
    }
    
    pauseAudio() {
        this.audio.pause();
        this.isPlaying = false;
        this.playIcon.textContent = '▶';
        this.playPauseBtn.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
    }
    
    setProgress(e) {
        const width = this.progressBar.clientWidth;
        const clickX = e.offsetX;
        const duration = this.audio.duration;
        
        this.audio.currentTime = (clickX / width) * duration;
    }
    
    updateProgress() {
        const currentTime = this.audio.currentTime;
        const duration = this.audio.duration;
        
        if (duration) {
            const progressPercent = (currentTime / duration) * 100;
            this.progress.style.width = `${progressPercent}%`;
            
            this.currentTimeEl.textContent = this.formatTime(currentTime);
            this.durationEl.textContent = this.formatTime(duration);
        }
    }
    
    setVolume() {
        const volume = this.volumeSlider.value / 100;
        this.audio.volume = volume;
    }
    
    previousSong() {
        // Add your logic for previous song here
        this.showNotification('Previous song');
    }
    
    nextSong() {
        // Add your logic for next song here
        this.showNotification('Next song');
    }
    
    songEnded() {
        this.isPlaying = false;
        this.playIcon.textContent = '▶';
        this.playPauseBtn.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
        this.progress.style.width = '0%';
        this.currentTimeEl.textContent = '0:00';
    }
    
    updatePlayerInfo() {
        // You can update song title and artist here dynamically
        const songTitle = document.querySelector('.song-title');
        const artist = document.querySelector('.artist');
        
        // Example: Update with actual song data
        // songTitle.textContent = "Your Song Title";
        // artist.textContent = "Artist Name";
    }
    
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    showNotification(message) {
        // Create a simple notification
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #333;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 1000;
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 2000);
    }
}

// Initialize the audio player when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new AudioPlayer();
});

// Add keyboard controls
document.addEventListener('keydown', (e) => {
    const audioPlayer = new AudioPlayer(); // In a real app, you'd reference the existing instance
    
    switch(e.code) {
        case 'Space':
            e.preventDefault();
            audioPlayer.togglePlayPause();
            break;
        case 'ArrowLeft':
            audioPlayer.audio.currentTime -= 10;
            break;
        case 'ArrowRight':
            audioPlayer.audio.currentTime += 10;
            break;
        case 'ArrowUp':
            audioPlayer.audio.volume = Math.min(audioPlayer.audio.volume + 0.1, 1);
            break;
        case 'ArrowDown':
            audioPlayer.audio.volume = Math.max(audioPlayer.audio.volume - 0.1, 0);
            break;
    }
});