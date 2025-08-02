document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.createElement("canvas");
  canvas.id = "particles-canvas";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 4 + 1;
      this.speedY = Math.random() * 1 + 0.5;
      this.alpha = Math.random() * 0.5 + 0.3;
      this.color = Math.random() > 0.5 ? "#f4c2c2" : "#fef9f9"; // subtle pinks & sparkles
      this.shape = Math.random() > 0.5 ? "heart" : "circle";
    }

    draw() {
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;

      if (this.shape === "heart") {
        ctx.beginPath();
        let x = this.x, y = this.y, size = this.size;
        ctx.moveTo(x, y);
        ctx.bezierCurveTo(x, y - size / 2, x - size, y - size / 2, x - size, y);
        ctx.bezierCurveTo(x - size, y + size, x, y + size * 1.5, x, y + size * 2);
        ctx.bezierCurveTo(x, y + size * 1.5, x + size, y + size, x + size, y);
        ctx.bezierCurveTo(x + size, y - size / 2, x, y - size / 2, x, y);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    }

    update() {
      this.y += this.speedY;
      if (this.y > canvas.height) {
        this.reset();
        this.y = 0;
      }
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();
});
