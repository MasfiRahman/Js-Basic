// Canvas setup
const canvas = document.getElementById('faceCanvas');
const ctx = canvas.getContext('2d');

// Canvas size and style
canvas.width = 800;
canvas.height = 600;
canvas.style.display = 'block';
canvas.style.margin = '20px auto';
canvas.style.border = '2px solid #333';
canvas.style.borderRadius = '10px';
canvas.style.backgroundColor = '#87CEEB';
canvas.style.cursor = 'none';

// Face position and properties
const face = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 200,
    eyeRadius: 30,
    pupilRadius: 12,
    eyeOffsetX: 80,
    eyeOffsetY: 60,
    mouseX: canvas.width / 2,
    mouseY: canvas.height / 2
};

// Mouse move event listener
canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    face.mouseX = event.clientX - rect.left;
    face.mouseY = event.clientY - rect.top;
});

// Draw face function
function drawFace() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#98FB98');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw face circle
    ctx.beginPath();
    ctx.arc(face.x, face.y, face.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#FFEBCD';
    ctx.fill();
    ctx.strokeStyle = '#D2B48C';
    ctx.lineWidth = 4;
    ctx.stroke();
    
    // Calculate eye positions based on cursor
    const leftEyeX = face.x - face.eyeOffsetX;
    const leftEyeY = face.y - face.eyeOffsetY;
    const rightEyeX = face.x + face.eyeOffsetX;
    const rightEyeY = face.y - face.eyeOffsetY;
    
    // Calculate pupil direction
    const leftPupil = calculatePupilPosition(leftEyeX, leftEyeY);
    const rightPupil = calculatePupilPosition(rightEyeX, rightEyeY);
    
    // Draw left eye
    drawEye(leftEyeX, leftEyeY, leftPupil.x, leftPupil.y);
    
    // Draw right eye
    drawEye(rightEyeX, rightEyeY, rightPupil.x, rightPupil.y);
    
    // Draw nose
    drawNose();
    
    // Draw mouth
    drawMouth();
    
    // Draw eyebrows
    drawEyebrows();
    
    // Draw instructions
    drawInstructions();
}

// Calculate pupil position based on cursor
function calculatePupilPosition(eyeX, eyeY) {
    const dx = face.mouseX - eyeX;
    const dy = face.mouseY - eyeY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Limit pupil movement within eye
    const maxDistance = face.eyeRadius - face.pupilRadius - 2;
    const scale = Math.min(maxDistance / distance, 1);
    
    return {
        x: eyeX + dx * scale,
        y: eyeY + dy * scale
    };
}

// Draw single eye with pupil
function drawEye(eyeX, eyeY, pupilX, pupilY) {
    // Draw eye white
    ctx.beginPath();
    ctx.arc(eyeX, eyeY, face.eyeRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw pupil
    ctx.beginPath();
    ctx.arc(pupilX, pupilY, face.pupilRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#333';
    ctx.fill();
    
    // Draw eye shine
    ctx.beginPath();
    ctx.arc(pupilX - 4, pupilY - 4, 4, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
}

// Draw nose
function drawNose() {
    ctx.beginPath();
    ctx.moveTo(face.x, face.y - 20);
    ctx.lineTo(face.x - 20, face.y + 40);
    ctx.lineTo(face.x + 20, face.y + 40);
    ctx.closePath();
    ctx.fillStyle = '#F4A460';
    ctx.fill();
    ctx.strokeStyle = '#D2691E';
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Draw mouth
function drawMouth() {
    ctx.beginPath();
    ctx.arc(face.x, face.y + 80, 60, 0, Math.PI, false);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#E75480';
    ctx.stroke();
    
    // Draw tongue
    ctx.beginPath();
    ctx.arc(face.x, face.y + 110, 25, 0, Math.PI, true);
    ctx.fillStyle = '#FF69B4';
    ctx.fill();
}

// Draw eyebrows
function drawEyebrows() {
    // Left eyebrow
    ctx.beginPath();
    ctx.moveTo(face.x - 120, face.y - 100);
    ctx.lineTo(face.x - 40, face.y - 90);
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#8B4513';
    ctx.stroke();
    
    // Right eyebrow
    ctx.beginPath();
    ctx.moveTo(face.x + 120, face.y - 100);
    ctx.lineTo(face.x + 40, face.y - 90);
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#8B4513';
    ctx.stroke();
}

// Draw instructions
function drawInstructions() {
    ctx.font = '18px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.fillText('Move your cursor around - the eyes will follow!', face.x, 50);
    ctx.fillText('Cursor position: (' + Math.round(face.mouseX) + ', ' + Math.round(face.mouseY) + ')', face.x, 550);
}

// Animation loop
function animate() {
    drawFace();
    requestAnimationFrame(animate);
}

// Start animation
animate();