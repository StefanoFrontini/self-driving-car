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

    const { inputs, outputs } = level;
    for (let i = 0; i < inputs.length; i++) {
      for (let j = 0; j < outputs.length; j++) {
        ctx.beginPath();
        ctx.moveTo(Visualizer.#getNodeX(inputs, i, left, right), bottom);
        ctx.lineTo(Visualizer.#getNodeX(outputs, j, left, right), top);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "orange";
        ctx.stroke();
      }
    }
    const nodeRadius = 18;
    for (let i = 0; i < inputs.length; i++) {
      const x = Visualizer.#getNodeX(inputs, i, left, right);
      ctx.beginPath();
      ctx.arc(x, bottom, nodeRadius, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();
    }
    for (let i = 0; i < outputs.length; i++) {
      const x = Visualizer.#getNodeX(outputs, i, left, right);

      ctx.beginPath();
      ctx.arc(x, top, nodeRadius, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();
    }
  }
  static #getNodeX(
    nodes: number[],
    index: number,
    left: number,
    right: number
  ) {
    return lerp(
      left,
      right,
      nodes.length === 1 ? 0.5 : index / (nodes.length - 1)
    );
  }
}
export default Visualizer;
