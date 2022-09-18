"use strict";

const canvas2 = document.getElementById("second-demo-canvas");
const context2 = canvas2.getContext("2d");

const innerWidth2 = canvas2.width = 600;
const innerHeight2 = canvas2.height = 500;

const refreshSecondDemo = document.querySelector(".refresh-second-demo.refresh-button");
refreshSecondDemo.addEventListener("click", initGravityCircles);

class CircleObject {
  constructor(x, y, dx, dy, radius = 50, color = "#000") {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    context2.beginPath();
    context2.fillStyle = this.color;
    context2.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context2.strokeStyle = this.color;
    context2.stroke();
    context2.fill();
  }

  update() {
    const gravity = 1;
    const friction = 0.65;
    if (this.y + this.radius > innerHeight2) {
      this.dy = -this.dy * friction;
    } else {
      this.dy += gravity;
    }

    this.y += this.dy;

    this.draw();
  }
}

let gravityCircles = [];
initGravityCircles();
animateGravityCircle();

function initGravityCircles() {
  gravityCircles = [];

  for (let i = 0; i < 200; i++) {
    const k = Math.random() * (7 - 1) + 1;
    const radius = Math.random() * (20 - 5) + 5;
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

    const circle = new CircleObject(x, y, dx, dy, radius, color);
    gravityCircles.push(circle);
  }
}

function animateGravityCircle() {
  requestAnimationFrame(animateGravityCircle);
  context2.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < gravityCircles.length; i++) {
    gravityCircles[i].update();
  }
}
