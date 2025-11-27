class AnimationController {
    constructor() {
        this.animatedObject = document.getElementById('animatedObject');
        this.addAnimationBtn = document.getElementById('addAnimationBtn');
        this.removeAnimationBtn = document.getElementById('removeAnimationBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.animationButtons = document.querySelectorAll('[data-animation]');
        this.durationSlider = document.getElementById('durationSlider');
        this.delaySlider = document.getElementById('delaySlider');
        this.durationValue = document.getElementById('durationValue');
        this.delayValue = document.getElementById('delayValue');
        this.currentAnimationEl = document.getElementById('currentAnimation');
        this.animationStateEl = document.getElementById('animationState');
        this.historyList = document.getElementById('historyList');

        this.currentAnimation = null;
        this.animationHistory = [];
        this.isAnimating = false;

        this.initializeEventListeners();
        this.updateDisplay();
    }

    initializeEventListeners() {
        // Animation type buttons
        this.animationButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.selectAnimation(e.target.closest('[data-animation]').dataset.animation);
            });
        });

        // Control buttons
        this.addAnimationBtn.addEventListener('click', () => this.addAnimation());
        this.removeAnimationBtn.addEventListener('click', () => this.removeAnimation());
        this.resetBtn.addEventListener('click', () => this.resetAll());

        // Sliders
        this.durationSlider.addEventListener('input', () => this.updateAnimationDuration());
        this.delaySlider.addEventListener('input', () => this.updateAnimationDelay());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    selectAnimation(animationType) {
        // Remove active class from all buttons
        this.animationButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to selected button
        const selectedBtn = document.querySelector(`[data-animation="${animationType}"]`);
        selectedBtn.classList.add('active');

        this.currentAnimation = animationType;
        this.updateDisplay();
        
        this.addToHistory(`Selected: ${animationType}`, 'selected');
    }

    addAnimation() {
        if (!this.currentAnimation) {
            this.showNotification('Please select an animation type first!', 'warning');
            return;
        }

        if (this.isAnimating) {
            this.removeAnimation();
        }

        // Remove all animation classes first
        this.removeAllAnimations();

        // Add the selected animation class
        this.animatedObject.classList.add(this.currentAnimation);
        
        // Update animation properties
        this.updateAnimationProperties();

        this.isAnimating = true;
        this.updateDisplay();
        
        this.addToHistory(`Added: ${this.currentAnimation}`, 'added');
        this.showNotification(`Animation "${this.currentAnimation}" started!`, 'success');
    }

    removeAnimation() {
        if (!this.isAnimating) {
            this.showNotification('No animation is currently running!', 'warning');
            return;
        }

        this.removeAllAnimations();
        this.isAnimating = false;
        this.updateDisplay();
        
        this.addToHistory(`Removed: ${this.currentAnimation}`, 'removed');
        this.showNotification(`Animation "${this.currentAnimation}" stopped!`, 'info');
    }

    removeAllAnimations() {
        const animationClasses = ['bounce', 'rotate', 'pulse', 'shake', 'slide', 'flip'];
        animationClasses.forEach(animationClass => {
            this.animatedObject.classList.remove(animationClass);
        });
    }

    resetAll() {
        this.removeAllAnimations();
        this.currentAnimation = null;
        this.isAnimating = false;
        
        // Reset sliders
        this.durationSlider.value = 1;
        this.delaySlider.value = 0;
        
        // Remove active class from buttons
        this.animationButtons.forEach(btn => btn.classList.remove('active'));
        
        // Reset animation properties
        this.animatedObject.style.animationDuration = '';
        this.animatedObject.style.animationDelay = '';
        
        this.updateDisplay();
        this.addToHistory('Reset all animations', 'reset');
        this.showNotification('All animations reset!', 'info');
    }

    updateAnimationDuration() {
        const duration = this.durationSlider.value;
        this.durationValue.textContent = `${duration}s`;
        
        if (this.isAnimating) {
            this.animatedObject.style.animationDuration = `${duration}s`;
        }
    }

    updateAnimationDelay() {
        const delay = this.delaySlider.value;
        this.delayValue.textContent = delay === '0' ? '0s' : `${delay}s`;
        
        if (this.isAnimating) {
            this.animatedObject.style.animationDelay = `${delay}s`;
        }
    }

    updateAnimationProperties() {
        this.updateAnimationDuration();
        this.updateAnimationDelay();
    }

    updateDisplay() {
        this.currentAnimationEl.textContent = this.currentAnimation || 'None';
        this.animationStateEl.textContent = this.isAnimating ? 'Running' : 'Stopped';
        
        // Update state color
        if (this.isAnimating) {
            this.animationStateEl.style.color = '#4ecdc4';
        } else {
            this.animationStateEl.style.color = '#ff6b6b';
        }
    }

    addToHistory(action, type) {
        const timestamp = new Date().toLocaleTimeString();
        const historyItem = document.createElement('div');
        historyItem.className = `history-item ${type}`;
        historyItem.innerHTML = `
            <span class="history-action">${action}</span>
            <span class="history-time">${timestamp}</span>
        `;
        
        this.historyList.insertBefore(historyItem, this.historyList.firstChild);
        
        // Limit history to 10 items
        if (this.historyList.children.length > 10) {
            this.historyList.removeChild(this.historyList.lastChild);
        }
        
        // Add to internal history array
        this.animationHistory.unshift({ action, type, timestamp });
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    getNotificationColor(type) {
        const colors = {
            success: 'linear-gradient(135deg, #4ecdc4, #44a08d)',
            warning: 'linear-gradient(135deg, #ffd93d, #ff9a3d)',
            info: 'linear-gradient(135deg, #667eea, #764ba2)',
            error: 'linear-gradient(135deg, #ff6b6b, #ee5a24)'
        };
        return colors[type] || colors.info;
    }

    handleKeyboard(e) {
        switch(e.key) {
            case ' ':
                e.preventDefault();
                this.addAnimation();
                break;
            case 'Escape':
                e.preventDefault();
                this.removeAnimation();
                break;
            case 'r':
            case 'R':
                if (e.ctrlKey) {
                    e.preventDefault();
                    this.resetAll();
                }
                break;
            case '1':
                this.selectAnimation('bounce');
                break;
            case '2':
                this.selectAnimation('rotate');
                break;
            case '3':
                this.selectAnimation('pulse');
                break;
            case '4':
                this.selectAnimation('shake');
                break;
            case '5':
                this.selectAnimation('slide');
                break;
            case '6':
                this.selectAnimation('flip');
                break;
        }
    }
}

// Add additional CSS for notifications
const additionalStyles = `
@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

.notification {
    font-weight: 600;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize the animation controller when page loads
document.addEventListener('DOMContentLoaded', () => {
    new AnimationController();
});