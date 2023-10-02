import useCanvas from "./useCanvas";
// import Road from "./lib/road";
// import Car from "./lib/car";

// interface Props {
// draw: (ctx: CanvasRenderingContext2D) => void;
//   objToDraw: {
//     draw: (ctx: CanvasRenderingContext2D) => void;
//     update: () => void;
//   };
// }

function Canvas() {
  const canvasRef = useCanvas();

  return <canvas id="canvas" ref={canvasRef}></canvas>;
}

export default Canvas;
