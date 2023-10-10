import { useEffect, useRef } from "react";
import Road from "./lib/road";
import Car from "./lib/car";
import Visualizer from "./lib/visualizer";

function useCanvas() {
  const carCanvasRef = useRef<HTMLCanvasElement>(null);
  const networkCanvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const carCanvas = carCanvasRef.current;
    const networkCanvas = networkCanvasRef.current;
    if (!carCanvas) return;
    if (!networkCanvas) return;
    carCanvas.width = 200;
    carCanvas.height = innerHeight;
    networkCanvas.width = 300;
    networkCanvas.height = innerHeight;
    const carCtx = carCanvas.getContext("2d");
    const networkCtx = networkCanvas.getContext("2d");
    let animationFrameId: number;
    const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
    const car = new Car(road.getLaneCenter(1), 100, 30, 50, "AI");
    const traffic = [new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2)];
    const time = 0;

    function animate(time: number) {
      if (!carCtx) return;
      if (!networkCtx) return;
      carCtx.clearRect(0, 0, carCtx.canvas.width, carCtx.canvas.height);
      networkCtx.clearRect(
        0,
        0,
        networkCtx.canvas.width,
        networkCtx.canvas.height
      );
      for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
      }
      car.update(road.borders, traffic);
      carCtx.save();
      carCtx.translate(0, -car.y + carCtx.canvas.height * 0.3);
      road.draw(carCtx);
      for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carCtx, "red");
      }
      car.draw(carCtx, "blue");
      carCtx.restore();

      networkCtx.lineDashOffset = -time / 50;
      Visualizer.drawNetwork(networkCtx, car.brain!);

      animationFrameId = requestAnimationFrame(animate);
    }

    animate(time);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return { carCanvasRef, networkCanvasRef };
}
export default useCanvas;
