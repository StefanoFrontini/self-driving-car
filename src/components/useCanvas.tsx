import { useEffect, useRef } from "react";
import Road from "./lib/road";
import Car from "./lib/car";

function resizeCanvas(canvas: HTMLCanvasElement | null) {
  if (!canvas) return [0, 0];
  const { width, height } = canvas.getBoundingClientRect();

  if (width !== canvas.width || height !== canvas.height) {
    const { devicePixelRatio: ratio = 1 } = window;
    const context = canvas.getContext("2d");
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    context?.scale(ratio, ratio);
    return true;
  }
  return false;
}

function useCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    resizeCanvas(canvas);
    const ctx = canvas.getContext("2d");
    let animationFrameId: number;
    const { devicePixelRatio: ratio = 1 } = window;
    const road = new Road(
      canvas.width / 2 / ratio,
      (canvas.width / ratio) * 0.9
    );
    const car = new Car(road.getLaneCenter(1), 100, 30, 50, "KEYS");
    const traffic = [new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2)];
    console.log("car", car);
    console.log("traffic", traffic);

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
      }
      car.update(road.borders, traffic);
      ctx.save();
      ctx.translate(0, -car.y + ctx.canvas.height * 0.3);
      road.draw(ctx);
      for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(ctx, "red");
      }
      car.draw(ctx, "blue");
      ctx.restore();

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return canvasRef;
}
export default useCanvas;
