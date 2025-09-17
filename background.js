const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;
let asteroidsArray;
let shootingStarsArray;

class Particle {
    constructor(x, y, directionX, directionY, size) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.rgbColor = '203, 213, 225'; // slate-300
        this.opacity = Math.random() * 0.6 + 0.2;// Start with random opacity (0.2 to 0.8)
        this.twinkleSpeed = (Math.random() - 0.5) * 0.03;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(${this.rgbColor}, ${this.opacity})`;
        ctx.fill();
    }

    update() {
        // Twinkle effect
        this.opacity += this.twinkleSpeed;
        if (this.opacity > 0.8 || this.opacity < 0.2) {
            this.twinkleSpeed = -this.twinkleSpeed; // Reverse twinkle direction
        }

        if (this.x > canvas.width || this.x < 0) {
            this.x = (this.x > canvas.width) ? 0 : canvas.width;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.y = (this.y > canvas.height) ? 0 : canvas.height;
        }
        this.x += this.directionX;
        this.y += this.directionY;
    }
}

class Asteroid {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseSpeedX = (Math.random() - 0.5) * 0.5;
        this.baseSpeedY = (Math.random() - 0.5) * 0.5;
        this.speedX = this.baseSpeedX;
        this.speedY = this.baseSpeedY;
        this.size = Math.random() * 20 + 15;
        this.angle = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
    }

    update() {
        // Mouse repulsion effect
        if (mouse.x !== null && mouse.y !== null) {
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const repelRadius = 150;

            if (distance < repelRadius) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (repelRadius - distance) / repelRadius;
                
                // Add force to the current speed
                this.speedX += forceDirectionX * force * 1.5;
                this.speedY += forceDirectionY * force * 1.5;
            }
        }

        // Apply friction to return to base speed
        const friction = 0.95;
        this.speedX = this.speedX * friction + this.baseSpeedX * (1 - friction);
        this.speedY = this.speedY * friction + this.baseSpeedY * (1 - friction);

        this.x += this.speedX;
        this.y += this.speedY;
        this.angle += this.rotationSpeed;

        if (this.x > canvas.width + this.size) this.x = -this.size;
        if (this.x < -this.size) this.x = canvas.width + this.size;
        if (this.y > canvas.height + this.size) this.y = -this.size;
        if (this.y < -this.size) this.y = canvas.height + this.size;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.font = `${this.size}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🪨', 0, 0);
        ctx.restore();
    }
}

class ShootingStar {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = 0;
        this.len = Math.random() * 120 + 60; // Increased length
        this.speed = Math.random() * 8 + 8;
        this.size = Math.random() * 2 + 2;   // Increased thickness
        this.life = 1; // Opacity
    }

    update() {
        this.x += this.speed;
        this.y += this.speed;
        this.life -= 0.01;

        if (this.life <= 0) {
            this.reset();
        }
    }

    draw() {
        if (this.life <= 0) return;

        const endX = this.x - this.len;
        const endY = this.y - this.len;
        
        const gradient = ctx.createLinearGradient(this.x, this.y, endX, endY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.life})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.size;
        ctx.stroke();
    }
}

function init() {
    particlesArray = [];
    const numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 1.5 + 0.5;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const directionX = (Math.random() * 0.4) - 0.2;
        const directionY = (Math.random() * 0.4) - 0.2;
        particlesArray.push(new Particle(x, y, directionX, directionY, size));
    }

    asteroidsArray = [];
    const numberOfAsteroids = 5;
    for (let i = 0; i < numberOfAsteroids; i++) {
        asteroidsArray.push(new Asteroid());
    }

    shootingStarsArray = [];
    const numberOfShootingStars = 3;
    for (let i = 0; i < numberOfShootingStars; i++) {
        shootingStarsArray.push(new ShootingStar());
    }
}

let scrollY = window.scrollY;
let currentScrollY = window.scrollY;
window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
});

const mouse = {
    x: null,
    y: null
};

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

function animate() {
    requestAnimationFrame(animate);
    // Smooth the scroll value for parallax effect (lerping)
    currentScrollY += (scrollY - currentScrollY) * 0.1;

    particlesArray.forEach(particle => particle.update());
    asteroidsArray.forEach(asteroid => asteroid.update());
    shootingStarsArray.forEach(star => star.update());
    const mouseXFromCenter = (mouse.x - canvas.width / 2) || 0;
    const mouseYFromCenter = (mouse.y - canvas.height / 2) || 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    const pParallaxX = -mouseXFromCenter * 0.02; 
    const pParallaxY = -mouseYFromCenter * 0.02 - currentScrollY * 0.1;
    ctx.translate(pParallaxX, pParallaxY);
    particlesArray.forEach(particle => particle.draw());
    ctx.restore();

    ctx.save();
    const aParallaxX = -mouseXFromCenter * 0.05;
    const aParallaxY = -mouseYFromCenter * 0.05 - currentScrollY * 0.3;
    ctx.translate(aParallaxX, aParallaxY);
    asteroidsArray.forEach(asteroid => asteroid.draw());
    ctx.restore();

    ctx.save();
    const sParallaxX = -mouseXFromCenter * 0.08;
    const sParallaxY = -mouseYFromCenter * 0.08 - currentScrollY * 0.5;
    ctx.translate(sParallaxX, sParallaxY);
    shootingStarsArray.forEach(star => {
        star.draw();
    });
    ctx.restore();
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

init();
animate();