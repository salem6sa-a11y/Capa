/**
 * CAPTURHA | كبتشرها - Astrophotography & Milky Way Canvas Background Engine
 */

class StarfieldCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    this.shootingStars = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;
    this.numStars = 300;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.targetMouseX = (e.clientX - window.innerWidth / 2) * 0.05;
      this.targetMouseY = (e.clientY - window.innerHeight / 2) * 0.05;
    });

    this.createStars();
    this.animate();

    // Random shooting stars
    setInterval(() => {
      if (Math.random() > 0.3) {
        this.addShootingStar();
      }
    }, 2500);
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.createStars();
  }

  createStars() {
    this.stars = [];
    for (let i = 0; i < this.numStars; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 1.6 + 0.4,
        color: this.getRandomStarColor(),
        alpha: Math.random(),
        speed: Math.random() * 0.02 + 0.005,
        depth: Math.random() * 2 + 0.5
      });
    }
  }

  getRandomStarColor() {
    const colors = [
      '#ffffff', '#ffffff', '#e0f2fe', '#dbeafe',
      '#93c5fd', '#355EA8', '#60a5fa', '#fef08a'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  addShootingStar() {
    this.shootingStars.push({
      x: Math.random() * this.canvas.width,
      y: Math.random() * (this.canvas.height * 0.5),
      length: Math.random() * 80 + 40,
      speed: Math.random() * 10 + 12,
      angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
      opacity: 1
    });
  }

  animate() {
    // Smooth mouse parallax interpolation
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw Milky Way Gradient Glow according to active theme
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const bgGlow = this.ctx.createRadialGradient(
      this.canvas.width * 0.6 + this.mouseX * 2,
      this.canvas.height * 0.4 + this.mouseY * 2,
      50,
      this.canvas.width * 0.5,
      this.canvas.height * 0.5,
      this.canvas.width * 0.8
    );
    if (isDark) {
      bgGlow.addColorStop(0, 'rgba(53, 94, 168, 0.35)');
      bgGlow.addColorStop(0.5, 'rgba(15, 23, 42, 0.4)');
      bgGlow.addColorStop(1, 'rgba(10, 15, 29, 0)');
    } else {
      bgGlow.addColorStop(0, 'rgba(53, 94, 168, 0.25)');
      bgGlow.addColorStop(0.6, 'rgba(248, 250, 252, 0.8)');
      bgGlow.addColorStop(1, 'rgba(248, 250, 252, 1)');
    }

    this.ctx.fillStyle = bgGlow;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw Twinkling Stars
    this.stars.forEach(star => {
      star.alpha += star.speed;
      if (star.alpha > 1 || star.alpha < 0.2) {
        star.speed = -star.speed;
      }

      const offsetX = this.mouseX * star.depth;
      const offsetY = this.mouseY * star.depth;

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(star.x + offsetX, star.y + offsetY, star.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = star.color;
      this.ctx.globalAlpha = Math.max(0.1, Math.min(1, star.alpha));
      this.ctx.shadowBlur = star.radius > 1.2 ? 8 : 0;
      this.ctx.shadowColor = star.color;
      this.ctx.fill();
      this.ctx.restore();
    });

    // Draw Shooting Stars
    for (let i = this.shootingStars.length - 1; i >= 0; i--) {
      const s = this.shootingStars[i];
      s.x += Math.cos(s.angle) * s.speed;
      s.y += Math.sin(s.angle) * s.speed;
      s.opacity -= 0.02;

      if (s.opacity <= 0 || s.x > this.canvas.width || s.y > this.canvas.height) {
        this.shootingStars.splice(i, 1);
        continue;
      }

      const tailX = s.x - Math.cos(s.angle) * s.length;
      const tailY = s.y - Math.sin(s.angle) * s.length;

      const grad = this.ctx.createLinearGradient(s.x, s.y, tailX, tailY);
      grad.addColorStop(0, `rgba(255, 255, 255, ${s.opacity})`);
      grad.addColorStop(0.5, `rgba(53, 94, 168, ${s.opacity * 0.7})`);
      grad.addColorStop(1, 'rgba(53, 94, 168, 0)');

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.moveTo(s.x, s.y);
      this.ctx.lineTo(tailX, tailY);
      this.ctx.strokeStyle = grad;
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
      this.ctx.restore();
    }

    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new StarfieldCanvas('hero-canvas');
});
