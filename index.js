"use strict";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const innerWidth = canvas.width = 600;
const innerHeight = canvas.height = 500;

class Circle {
  constructor(x, y, radius = 10, dx = 5, dy = 5, color = "#000") {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
  }

  draw() {
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.strokeStyle = this.color;
    context.stroke();
    context.fill();
  }

  update() {
    if (this.x + this.radius >= innerWidth || this.x - this.radius <= 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius >= innerHeight || this.y - this.radius <= 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

const circles = [];

for (let i = 0; i < 200; i++) {
  const k = Math.random() * (7 - 1) + 1;
  const radius = Math.random() * (15 - 5) + 5;
  const x = Math.random() * (innerWidth - radius * 2) + radius,
    y = Math.random() * (innerHeight - radius * 2) + radius,
    dx = (Math.random() - 0.5) * k,
    dy = (Math.random() - 0.5) * k;

  const color = `rgba(
    ${Math.random() * 255},
    ${Math.random() * 255},
    ${Math.random() * 255},
    ${Math.random()}
  )`;

  const circle = new Circle(x, y, radius, dx, dy, color);
  circles.push(circle);
}

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circles.length; i++) {
    circles[i].update();
  }
}

animate();
