import { Level, NeuralNetwork } from "./network";
import { lerp } from "./utils";

class Visualizer {
  static drawNetwork(ctx: CanvasRenderingContext2D, network: NeuralNetwork) {
    const margin = 50;
    const left = margin;
    const top = margin;
    const width = ctx.canvas.width - margin * 2;
    const height = ctx.canvas.height - margin * 2;

    Visualizer.drawLevel(ctx, network.levels[0], left, top, width, height);
  }
  static drawLevel(
    ctx: CanvasRenderingContext2D,
    level: Level,
    left: number,
    top: number,
    width: number,
    height: number
  ) {
    const right = left + width;
    const bottom = top + height;

    const nodeRadius = 18;
    for (let i = 0; i < level.inputs.length; i++) {
      const x = lerp(
        left,
        right,
        level.inputs.length === 1 ? 0.5 : i / (level.inputs.length - 1)
      );
      ctx.beginPath();
      ctx.arc(x, bottom, nodeRadius, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();
    }
  }
}
export default Visualizer;
