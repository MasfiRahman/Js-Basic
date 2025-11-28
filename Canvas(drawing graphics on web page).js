// Canvas setup
        const canvas = document.getElementById('myCanvas');
        const ctx = canvas.getContext('2d');
        
        // Canvas size set kora
        canvas.width = 800;
        canvas.height = 500;
        
        // Background color set kora JavaScript diye
        canvas.style.backgroundColor = '#1a1a2e';
        canvas.style.display = 'block';
        canvas.style.margin = '20px auto';
        canvas.style.borderRadius = '10px';
        canvas.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.5)';
        
        // Draw functions
        function draw() {
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw a gradient background
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#16213e');
            gradient.addColorStop(1, '#0f3460');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw a sun
            ctx.beginPath();
            ctx.arc(700, 80, 40, 0, Math.PI * 2);
            const sunGradient = ctx.createRadialGradient(700, 80, 0, 700, 80, 40);
            sunGradient.addColorStop(0, '#ffff00');
            sunGradient.addColorStop(1, '#ff9900');
            ctx.fillStyle = sunGradient;
            ctx.fill();
            
            // Draw mountains
            ctx.beginPath();
            ctx.moveTo(0, 400);
            ctx.lineTo(150, 250);
            ctx.lineTo(300, 350);
            ctx.lineTo(450, 200);
            ctx.lineTo(600, 300);
            ctx.lineTo(800, 150);
            ctx.lineTo(800, 500);
            ctx.lineTo(0, 500);
            ctx.closePath();
            ctx.fillStyle = '#2d545e';
            ctx.fill();
            
            // Draw a river
            ctx.beginPath();
            ctx.moveTo(0, 450);
            ctx.bezierCurveTo(200, 430, 400, 470, 800, 420);
            ctx.lineTo(800, 500);
            ctx.lineTo(0, 500);
            ctx.closePath();
            ctx.fillStyle = '#4e89ae';
            ctx.fill();
            
            // Draw trees
            drawTree(100, 380, 30, 80, '#8b4513', '#2e8b57');
            drawTree(250, 420, 25, 60, '#8b4513', '#3cb371');
            drawTree(500, 350, 35, 90, '#8b4513', '#228b22');
            
            // Draw a house
            drawHouse(350, 300, 120, 100);
            
            // Draw clouds
            drawCloud(150, 100, 80);
            drawCloud(400, 70, 100);
            drawCloud(600, 120, 70);
            
            // Draw text
            ctx.font = '24px Arial';
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.fillText('Canvas Graphics with JavaScript Only', canvas.width/2, 40);
            
            ctx.font = '16px Arial';
            ctx.fillText('No CSS used - all styling done with JavaScript', canvas.width/2, 70);
        }
        
        function drawTree(x, y, trunkWidth, trunkHeight, trunkColor, leavesColor) {
            // Draw trunk
            ctx.fillStyle = trunkColor;
            ctx.fillRect(x - trunkWidth/2, y - trunkHeight, trunkWidth, trunkHeight);
            
            // Draw leaves
            ctx.beginPath();
            ctx.arc(x, y - trunkHeight - 40, 50, 0, Math.PI * 2);
            ctx.fillStyle = leavesColor;
            ctx.fill();
        }
        
        function drawHouse(x, y, width, height) {
            // Draw main house
            ctx.fillStyle = '#ffb366';
            ctx.fillRect(x, y, width, height);
            
            // Draw roof
            ctx.beginPath();
            ctx.moveTo(x - 10, y);
            ctx.lineTo(x + width/2, y - 50);
            ctx.lineTo(x + width + 10, y);
            ctx.closePath();
            ctx.fillStyle = '#8b0000';
            ctx.fill();
            
            // Draw door
            ctx.fillStyle = '#654321';
            ctx.fillRect(x + width/2 - 15, y + height - 70, 30, 70);
            
            // Draw windows
            ctx.fillStyle = '#87ceeb';
            ctx.fillRect(x + 20, y + 30, 25, 25);
            ctx.fillRect(x + width - 45, y + 30, 25, 25);
        }
        
        function drawCloud(x, y, size) {
            ctx.beginPath();
            ctx.arc(x, y, size/2, 0, Math.PI * 2);
            ctx.arc(x + size/2, y - size/4, size/2.5, 0, Math.PI * 2);
            ctx.arc(x + size, y, size/2, 0, Math.PI * 2);
            ctx.arc(x + size/2, y + size/4, size/3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fill();
        }
        
        // Animation function
        function animate() {
            draw();
            requestAnimationFrame(animate);
        }
        
        // Start animation
        animate();
 
