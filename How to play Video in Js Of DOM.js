class VideoPlayer {
    constructor() {
        this.video = document.getElementById('videoElement');
        this.videoControls = document.getElementById('videoControls');
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.playIcon = document.getElementById('playIcon');
        this.bigPlayBtn = document.getElementById('bigPlayBtn');
        this.progressBar = document.getElementById('progressBar');
        this.progress = document.getElementById('progress');
        this.progressBuffer = document.getElementById('progressBuffer');
        this.currentTimeEl = document.getElementById('currentTime');
        this.durationEl = document.getElementById('duration');
        this.volumeBtn = document.getElementById('volumeBtn');
        this.volumeIcon = document.getElementById('volumeIcon');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.volumeContainer = document.getElementById('volumeContainer');
        this.playbackSpeedBtn = document.getElementById('playbackSpeedBtn');
        this.speedText = document.getElementById('speedText');
        this.pipBtn = document.getElementById('pipBtn');
        this.pipIcon = document.getElementById('pipIcon');
        this.fullscreenBtn = document.getElementById('fullscreenBtn');
        this.fullscreenIcon = document.getElementById('fullscreenIcon');
        this.loadingSpinner = document.getElementById('loadingSpinner');

        this.isPlaying = false;
        this.isMouseMoving = false;
        this.mouseMoveTimeout = null;
        this.playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
        this.currentSpeedIndex = 2; // Start with 1x

        this.initializeEventListeners();
        this.updatePlaybackSpeed();
    }

    initializeEventListeners() {
        // Play/Pause buttons
        this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        this.bigPlayBtn.addEventListener('click', () => this.togglePlayPause());

        // Video events
        this.video.addEventListener('click', () => this.togglePlayPause());
        this.video.addEventListener('play', () => this.onPlay());
        this.video.addEventListener('pause', () => this.onPause());
        this.video.addEventListener('timeupdate', () => this.updateProgress());
        this.video.addEventListener('loadedmetadata', () => this.onLoadedMetadata());
        this.video.addEventListener('waiting', () => this.showLoading());
        this.video.addEventListener('canplay', () => this.hideLoading());
        this.video.addEventListener('seeking', () => this.showLoading());
        this.video.addEventListener('seeked', () => this.hideLoading());

        // Progress bar
        this.progressBar.addEventListener('click', (e) => this.setProgress(e));
        this.progressBar.addEventListener('mousemove', (e) => this.showHoverTime(e));

        // Volume controls
        this.volumeSlider.addEventListener('input', () => this.setVolume());
        this.volumeBtn.addEventListener('mouseenter', () => this.showVolumeSlider());
        this.volumeContainer.addEventListener('mouseleave', () => this.hideVolumeSlider());

        // Playback speed
        this.playbackSpeedBtn.addEventListener('click', () => this.changePlaybackSpeed());

        // Picture in Picture
        this.pipBtn.addEventListener('click', () => this.togglePictureInPicture());

        // Fullscreen
        this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());

        // Mouse movement detection for controls
        this.video.addEventListener('mousemove', () => this.showControls());
        this.video.addEventListener('mouseleave', () => this.hideControls());

        // Keyboard controls
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    togglePlayPause() {
        if (this.video.paused) {
            this.playVideo();
        } else {
            this.pauseVideo();
        }
    }

    playVideo() {
        this.video.play();
    }

    pauseVideo() {
        this.video.pause();
    }

    onPlay() {
        this.isPlaying = true;
        this.playIcon.className = 'fas fa-pause';
        this.bigPlayBtn.classList.add('hidden');
    }

    onPause() {
        this.isPlaying = false;
        this.playIcon.className = 'fas fa-play';
        this.bigPlayBtn.classList.remove('hidden');
    }

    updateProgress() {
        const currentTime = this.video.currentTime;
        const duration = this.video.duration;

        if (duration) {
            const progressPercent = (currentTime / duration) * 100;
            this.progress.style.width = `${progressPercent}%`;

            // Update buffer progress
            if (this.video.buffered.length > 0) {
                const bufferedPercent = (this.video.buffered.end(0) / duration) * 100;
                this.progressBuffer.style.width = `${bufferedPercent}%`;
            }

            this.currentTimeEl.textContent = this.formatTime(currentTime);
            this.durationEl.textContent = this.formatTime(duration);
        }
    }

    setProgress(e) {
        const rect = this.progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        this.video.currentTime = percent * this.video.duration;
    }

    showHoverTime(e) {
        // You can implement a tooltip showing the time at hover position
    }

    setVolume() {
        const volume = this.volumeSlider.value / 100;
        this.video.volume = volume;

        // Update volume icon
        if (volume === 0) {
            this.volumeIcon.className = 'fas fa-volume-mute';
        } else if (volume < 0.5) {
            this.volumeIcon.className = 'fas fa-volume-down';
        } else {
            this.volumeIcon.className = 'fas fa-volume-up';
        }
    }

    showVolumeSlider() {
        this.volumeContainer.style.opacity = '1';
        this.volumeContainer.style.visibility = 'visible';
    }

    hideVolumeSlider() {
        this.volumeContainer.style.opacity = '0';
        this.volumeContainer.style.visibility = 'hidden';
    }

    changePlaybackSpeed() {
        this.currentSpeedIndex = (this.currentSpeedIndex + 1) % this.playbackSpeeds.length;
        this.updatePlaybackSpeed();
    }

    updatePlaybackSpeed() {
        const speed = this.playbackSpeeds[this.currentSpeedIndex];
        this.video.playbackRate = speed;
        this.speedText.textContent = `${speed}x`;
    }

    async togglePictureInPicture() {
        try {
            if (document.pictureInPictureElement) {
                await document.exitPictureInPicture();
                this.pipIcon.className = 'fas fa-compress';
            } else {
                await this.video.requestPictureInPicture();
                this.pipIcon.className = 'fas fa-compress-alt';
            }
        } catch (error) {
            console.error('Picture-in-Picture error:', error);
        }
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            this.video.parentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
            this.fullscreenIcon.className = 'fas fa-compress';
        } else {
            document.exitFullscreen();
            this.fullscreenIcon.className = 'fas fa-expand';
        }
    }

    showControls() {
        this.videoControls.classList.remove('hidden');
        this.isMouseMoving = true;

        clearTimeout(this.mouseMoveTimeout);
        this.mouseMoveTimeout = setTimeout(() => {
            if (this.isPlaying) {
                this.videoControls.classList.add('hidden');
            }
            this.isMouseMoving = false;
        }, 3000);
    }

    hideControls() {
        if (this.isPlaying) {
            this.videoControls.classList.add('hidden');
        }
    }

    showLoading() {
        this.loadingSpinner.classList.add('show');
    }

    hideLoading() {
        this.loadingSpinner.classList.remove('show');
    }

    onLoadedMetadata() {
        this.durationEl.textContent = this.formatTime(this.video.duration);
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    handleKeyboard(e) {
        switch(e.code) {
            case 'Space':
                e.preventDefault();
                this.togglePlayPause();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.video.currentTime -= 10;
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.video.currentTime += 10;
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.video.volume = Math.min(this.video.volume + 0.1, 1);
                this.volumeSlider.value = this.video.volume * 100;
                this.setVolume();
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.video.volume = Math.max(this.video.volume - 0.1, 0);
                this.volumeSlider.value = this.video.volume * 100;
                this.setVolume();
                break;
            case 'KeyF':
                e.preventDefault();
                this.toggleFullscreen();
                break;
            case 'KeyM':
                e.preventDefault();
                this.video.muted = !this.video.muted;
                break;
        }
    }
}

// Initialize video player when page loads
document.addEventListener('DOMContentLoaded', () => {
    new VideoPlayer();
});

// Handle fullscreen changes
document.addEventListener('fullscreenchange', () => {
    const fullscreenIcon = document.getElementById('fullscreenIcon');
    if (!document.fullscreenElement) {
        fullscreenIcon.className = 'fas fa-expand';
    }
});