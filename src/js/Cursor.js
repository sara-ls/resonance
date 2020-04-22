// CUSTOM CURSOR
class Cursor {
  constructor() {
    this.delay = 6; // Delay cursor outline

    // Cursor outline position
    this._x = 0;
    this._y = 0;

    // Cursor dot position
    this.dotX = window.innerWidth / 2;
    this.dotY = window.innerHeight / 2;

    this.cursorVisible = true;
    this.cursorEnlarged = false;

    // Grab cursor elements
    this.dot = document.querySelector(".cursor-dot");
    this.outline = document.querySelector(".cursor-dot-outline");

    this.dotSize = this.dot.offsetWidth;
    this.outlineSize = this.outline.offsetWidth;

    this.setupEventListeners = this.setupEventListeners.bind(this);
    this.delayDotOutline = this.delayDotOutline.bind(this);
    this.toggleCursorSize = this.toggleCursorSize.bind(this);
    this.toggleCursorVisibility = this.toggleCursorVisibility.bind(this);

    this.setupEventListeners();
    this.delayDotOutline();
  }

  setupEventListeners() {
    let that = this;

    // Expand when hovering over clickable element
    document.querySelectorAll("a, button, input").forEach((aElem) => {
      // On hover ever
      aElem.addEventListener("mouseover", (e) => {
        that.cursorEnlarged = true;
        that.toggleCursorSize(e.currentTarget);
      });
      aElem.addEventListener("mouseout", () => {
        that.cursorEnlarged = false;
        that.toggleCursorSize();
      });
    });

    // Click events
    document.addEventListener("mousedown", () => {
      that.cursorEnlarged = true;
      that.toggleCursorSize();
    });
    document.addEventListener("mouseup", () => {
      that.cursorEnlarged = false;
      that.toggleCursorSize();
    });

    // Position the dot
    document.addEventListener("mousemove", (e) => {
      // Show the cursor
      that.cursorVisible = true;
      that.toggleCursorVisibility();

      that.dotX = e.pageX;
      that.dotY = e.pageY;
      that.dot.style.top = that.dotY + "px";
      that.dot.style.left = that.dotX + "px";
    });

    // Hide/show cursor when exiting/entering window
    document.addEventListener("mouseenter", () => {
      that.cursorVisible = true;
      that.toggleCursorVisibility();
      that.dot.style.opacity = 1;
      that.outline.style.opacity = 1;
    });
    document.addEventListener("mouseleave", () => {
      that.cursorVisible = false;
      that.toggleCursorVisibility();
      that.dot.style.opacity = 0;
      that.outline.style.opacity = 0;
    });
  }

  // Slightly delay cursor outline when moving
  delayDotOutline() {
    this._x += (this.dotX - this._x) / this.delay;
    this._y += (this.dotY - this._y) / this.delay;
    this.outline.style.top = this._y + "px";
    this.outline.style.left = this._x + "px";
    requestAnimationFrame(this.delayDotOutline.bind(this));
  }

  // Expand/contract cursor dot/outline
  toggleCursorSize(hovered) {
    if (this.cursorEnlarged) {
      this.dot.style.transform = "translate(-50%, -50%) scale(0.8)";
      this.dot.style.backgroundColor = "#fd013a";

      this.outline.style.transform = "translate(-50%, -50%) scale(2.2)";
      this.outline.style.backgroundColor = "transparent";
      this.outline.style.borderColor = "#fd013a";
    } else {
      this.dot.style.transform = "translate(-50%, -50%) scale(1)";
      this.dot.style.backgroundColor = "#0ff";
      this.outline.style.backgroundColor = "rgba(255,255,255, 0.3)";
      this.outline.style.transform = "translate(-50%, -50%) scale(1)";
      this.outline.style.borderColor = "black";
    }
  }

  // Hide/show cursor
  toggleCursorVisibility() {
    if (this.cursorVisible) {
      this.dot.style.opacity = 1;
      this.outline.style.opacity = 1;
    } else {
      this.dot.style.opacity = 0;
      this.outline.style.opacity = 0;
    }
  }
}

export default Cursor;
