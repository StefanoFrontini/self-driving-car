import useCanvas from "./useCanvas";
function Canvas() {
  const { carCanvasRef, networkCanvasRef } = useCanvas();

  return (
    <>
      <canvas id="carCanvas" ref={carCanvasRef}></canvas>
      <canvas id="networkCanvas" ref={networkCanvasRef}></canvas>
    </>
  );
}

export default Canvas;
