
// Get DOM elements
const keyPressed = document.getElementById('keyPressed');
const keyCode = document.getElementById('keyCode');
const code = document.getElementById('code');
const visualKey = document.getElementById('visualKey');

// Add keypress listener to entire document
document.addEventListener('keydown', function(event) {
    // Prevent default for specific keys
    if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.code)) {
        event.preventDefault();
    }
    
    // Update display with key information
    keyPressed.textContent = event.key === ' ' ? 'Space' : event.key;
    keyCode.textContent = event.keyCode || event.which;
    code.textContent = event.code;
    
    // Add visual feedback
    visualKey.textContent = event.key === ' ' ? 'Space' : event.key;
    visualKey.classList.add('active');
    
    // Remove active class after animation
    setTimeout(() => {
        visualKey.classList.remove('active');
    }, 200);
});

// Also listen for keyup to show when key is released
document.addEventListener('keyup', function() {
    // You can add additional logic here if needed
});

// Special effects for specific keys
document.addEventListener('keydown', function(event) {
    // Change background color for number keys
    if (event.key >= '0' && event.key <= '9') {
        document.body.style.background = 'linear-gradient(135deg, #4ecdc4, #44a08d)';
    }
    
    // Change background color for letter keys
    if (event.key >= 'a' && event.key <= 'z') {
        document.body.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a24)';
    }
    
    // Reset background after 1 second
    setTimeout(() => {
        document.body.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
    }, 1000);
});

// Handle window focus/blur
window.addEventListener('focus', function() {
    console.log('Window focused - ready for keypress');
});

window.addEventListener('blur', function() {
    console.log('Window blurred - keypress may not work');
});

// Simple instructions
console.log('🔊 Keypress Listener Active!');
console.log('Press any key to see the magic!');
