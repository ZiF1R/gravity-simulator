"use strict";

const canvas = document.getElementById("first-demo-canvas");
const context = canvas.getContext("2d");

const innerWidth = canvas.width = 600;
const innerHeight = canvas.height = 500;

const mouse = {
  x: undefined,
  y: undefined,
};

const { x: canvasLeft, y: canvasTop } = canvas.getBoundingClientRect();

window.addEventListener("mousemove", event => {
  const { x, y } = event;
  mouse.x = x;
  mouse.y = y;
});

const refreshFirstDemo = document.querySelector(".refresh-first-demo.refresh-button");
refreshFirstDemo.addEventListener("click", () => initCircles());

class Circle {
  constructor(x, y, radius = 10, dx = 5, dy = 5, color = "#000") {
    this.x = x;
    this.y = y;
    this.radius = this.initialRadius = radius;
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
    if (this.x + this.initialRadius >= innerWidth || this.x - this.initialRadius <= 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.initialRadius >= innerHeight || this.y - this.initialRadius <= 0) {
      this.dy = -this.dy;
    }

    const x0 = this.x + canvasLeft,
      y0 = this.y + canvasTop,
      x = mouse.x - x0,
      y = mouse.y - y0,
      r = (this.initialRadius * 5);

    if (x ** 2 + y ** 2 <= r ** 2) {
      if (this.radius <= this.initialRadius * 3) {
        this.radius++;
      }
    } else if (this.radius >= this.initialRadius) {
      this.radius--;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

let circles = [];

initCircles();
animate();

function initCircles() {
  circles = [];

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
}

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circles.length; i++) {
    circles[i].update();
  }
}
