/**
 * Helper class to enable zooming and panning on a DOM element (image, SVG, etc.).
 */
export class ZoomDiagramHelper {
  /**
   * Creates a ZoomDiagramHelper instance.
   * @param {HTMLElement} el - The DOM element to enable zoom/pan on.
   */
  constructor(el) {
    /**
     * @type {HTMLElement} The DOM element to enable zoom/pan on.
     */
    this.el = el;

    /**
     * @type {number} Current zoom level
     */
    this.zoom = 1;

    /**
     * @type {{x: number, y: number}} Current translation position
     */
    this.pos = {x: 0, y: 0};

    /**
     * @type {boolean} True if currently dragging
     */
    this.isDragging = false;

    /**
     * @type {{x: number, y: number}} Starting position for drag
     */
    this.start = {x: 0, y: 0};

    /**
     * @type {Array<Function>} List of functions to remove event listeners
     */
    this.subscriptions = [];

    this.el.style.transformOrigin = 'top left';

    this.registerWheelHandler();
    this.registerDragHandlers();
  }

  /**
   * Applies the current transform (translate + scale) to the element.
   */
  applyTransform() {
    this.el.style.transform = `translate(${this.pos.x}px, ${this.pos.y}px) scale(${this.zoom})`;
  }

  /**
   * Resets the position and zoom of the element to defaults.
   */
  resetPosition() {
    this.pos.x = 0;
    this.pos.y = 0;
    this.zoom = 1;
    this.applyTransform();
    this.el.classList.remove('zoomed');
  }

  /**
   * Registers the wheel event listener for zooming.
   * Zooms in/out while holding Ctrl key.
   * @private
   */
  registerWheelHandler() {
    const wheelHandler = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        this.zoom += e.deltaY * -0.002;
        this.zoom = Math.min(Math.max(1, this.zoom), 5);
        this.applyTransform();

        if (this.zoom > 1) {
          this.el.classList.add('zoomed');
        } else {
          this.resetPosition();
        }
      }
    };

    this.el.addEventListener('wheel', wheelHandler);
    this.subscriptions.push(() => this.el.removeEventListener('wheel', wheelHandler));
  }

  /**
   * Registers drag handlers (mousedown, mousemove, mouseup) to allow panning.
   * Drag is only active if zoom > 1.
   * @private
   */
  registerDragHandlers() {
    const pointerDown = (e) => {
      this.el.classList.add('dragging');
      if (this.zoom <= 1) {
        return;
      }
      this.isDragging = true;
      this.start.x = e.clientX - this.pos.x;
      this.start.y = e.clientY - this.pos.y;
      e.preventDefault();
    };

    const pointerMove = (e) => {
      if (!this.isDragging || this.zoom <= 1) {
        return;
      }
      this.pos.x = e.clientX - this.start.x;
      this.pos.y = e.clientY - this.start.y;
      this.applyTransform();
    };

    const pointerUp = () => {
      this.isDragging = false;
      this.el.classList.remove('dragging');
      if (this.zoom <= 1) {
        this.resetPosition();
      }
    };

    this.el.addEventListener('mousedown', pointerDown);
    window.addEventListener('mousemove', pointerMove);
    window.addEventListener('mouseup', pointerUp);

    this.subscriptions.push(() => this.el.removeEventListener('mousedown', pointerDown));
    this.subscriptions.push(() => window.removeEventListener('mousemove', pointerMove));
    this.subscriptions.push(() => window.removeEventListener('mouseup', pointerUp));
  }

  /**
   * Removes all event listeners and cleans up the helper.
   */
  destroy() {
    this.subscriptions.forEach(fn => fn());
  }
}
