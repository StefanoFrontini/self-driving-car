import Controls from "./controls";
import Sensor from "./sensor";
import { Point, polysIntersect } from "./utils";

class Car {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number = 0;
  acceleration: number = 0.2;
  maxSpeed: number;
  friction: number = 0.05;
  angle: number = 0;
  sensor?: Sensor;
  polygon: Point[] = [];
  damaged: boolean = false;
  controls: Controls;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    controlType: string,
    maxSpeed: number = 3
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    if (controlType !== "DUMMY") this.sensor = new Sensor(this);
    this.controls = new Controls(controlType);
    this.maxSpeed = maxSpeed;
  }

  update(roadBorders: [topLeft: Point, bottomRight: Point][], traffic: Car[]) {
    this.#move();
    this.polygon = this.#createPolygon();
    this.damaged = this.#assessDamage(roadBorders, traffic);
    if (this.sensor) this.sensor.update(roadBorders, traffic);
  }
  #assessDamage(
    roadBorders: [topLeft: Point, bottomRight: Point][],
    traffic: Car[]
  ) {
    for (let i = 0; i < roadBorders.length; i++) {
      if (polysIntersect(this.polygon, roadBorders[i])) return true;
    }
    for (let i = 0; i < traffic.length; i++) {
      if (polysIntersect(this.polygon, traffic[i].polygon)) return true;
    }
    return false;
  }

  #createPolygon() {
    const points = [];
    const rad = Math.hypot(this.width, this.height) / 2;
    const alpha = Math.atan2(this.width, this.height);
    points.push({
      x: this.x - Math.sin(this.angle - alpha) * rad,
      y: this.y - Math.cos(this.angle - alpha) * rad,
    });
    points.push({
      x: this.x - Math.sin(this.angle + alpha) * rad,
      y: this.y - Math.cos(this.angle + alpha) * rad,
    });
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad,
    });
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad,
    });
    return points;
  }
  #move() {
    if (this.controls.forward) this.speed += this.acceleration;
    if (this.controls.reverse) this.speed -= this.acceleration;
    if (this.speed > this.maxSpeed) this.speed = this.maxSpeed;
    if (this.speed < -this.maxSpeed / 2) this.speed = -this.maxSpeed / 2;
    if (this.speed > 0) this.speed -= this.friction;
    if (this.speed < 0) this.speed += this.friction;
    if (Math.abs(this.speed) < this.friction) this.speed = 0;

    if (this.speed !== 0) {
      const flip = this.speed > 0 ? 1 : -1;
      if (this.controls.left) this.angle += 0.03 * flip;
      if (this.controls.right) this.angle -= 0.03 * flip;
    }

    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
    // this.y -= this.speed;
    // if (this.controls.left) this.x -= 2;
    // if (this.controls.right) this.x += 2;
  }
  draw(ctx: CanvasRenderingContext2D, color: string) {
    if (this.damaged) ctx.fillStyle = "gray";
    else ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
    for (let i = 1; i < this.polygon.length; i++) {
      ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
    }
    ctx.fill();
    // ctx.save();
    // ctx.translate(this.x, this.y);
    // ctx.rotate(-this.angle);
    // ctx.beginPath();
    // ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
    // ctx.fill();
    // ctx.restore();

    if (this.sensor) this.sensor.draw(ctx);
  }
}
export default Car;
