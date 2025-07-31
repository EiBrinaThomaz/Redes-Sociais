const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
});

let particles = [];

function createFirework() {
  const x = Math.random() * w;
  const y = Math.random() * h / 2;
  const count = 80;
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count;
    const speed = Math.random() * 5 + 2;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`
    });
  }
}

function updateFireworks() {
  ctx.clearRect(0, 0, w, h);
  particles = particles.filter(p => p.alpha > 0);
  for (let p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 0.015;

    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function loop() {
  updateFireworks();
  requestAnimationFrame(loop);
}

setInterval(createFirework, 1000);
loop();
