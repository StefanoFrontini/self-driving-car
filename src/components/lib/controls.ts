class Controls {
  forward: boolean;
  left: boolean;
  right: boolean;
  reverse: boolean;
  constructor(type: string) {
    this.forward = false;
    this.left = false;
    this.right = false;
    this.reverse = false;

    if (type === "KEYS") this.#addKeyboardListeners();
    if (type === "DUMMY") this.forward = true;
  }
  #addKeyboardListeners() {
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowUp":
          this.forward = true;
          break;
        case "ArrowDown":
          this.reverse = true;
          break;
        case "ArrowLeft":
          this.left = true;
          break;
        case "ArrowRight":
          this.right = true;
          break;
      }
    });
    document.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "ArrowUp":
          this.forward = false;
          break;
        case "ArrowDown":
          this.reverse = false;
          break;
        case "ArrowLeft":
          this.left = false;
          break;
        case "ArrowRight":
          this.right = false;
          break;
      }
    });
  }
}

export default Controls;
