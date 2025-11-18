import './splitter.directive.scss';
import template from './splitter.directive.html';

const SplitterModule = angular.module('tt2ps.directives.core.splitter', []);
SplitterModule.directive('splitter', SplitterDirective);

SplitterDirective.$inject = ['$document'];

function SplitterDirective($document) {
  return {
    restrict: 'E',
    scope: {
      direction: '@'
    },
    template,
    link: function(scope, element, attrs) {
      // =========================
      // Private properties
      // =========================
      /**
       * The direction of the splitter. Can be 'horizontal' (resizes left/right) or 'vertical' (resizes top/bottom).
       * Defaults to 'horizontal' if not specified.
       * @type {string}
       */
      const direction = attrs.direction || 'horizontal';

      /**
       * The DOM element before the splitter, which will be resized when dragging.
       * @type {HTMLElement}
       */
      const previousSibling = element[0].previousElementSibling;

      /**
       * The DOM element after the splitter, which will be resized when dragging.
       * @type {HTMLElement}
       */
      const nextSibling = element[0].nextElementSibling;

      /**
       * Stores the initial pointer position when dragging starts (X or Y depending on direction).
       * @type {number}
       */
      let initialDraggingPointerPosition = 0;

      /**
       * Stores the initial size (width or height) of the previous panel when dragging starts.
       * @type {number}
       */
      let initialPreviousSiblingSize = 0;

      // =========================
      // Private functions
      // =========================
      /**
       * Returns the pointer coordinate (X or Y) for the splitter, normalizing between mouse and touch events.
       *
       * For a horizontal splitter, returns the page X position.
       * For a vertical splitter, returns the page Y position.
       *
       * @param {MouseEvent | TouchEvent} event - The mouse or touch event.
       * @returns {number} The pointer position in pixels relative to the document.
       */
      const getPointerPos = (event) => {
        // For touch events, use the first touch
        const e = event.touches ? event.touches[0] : event;
        return direction === 'horizontal' ? e.pageX : e.pageY;
      };

      /**
       * Initializes dragging state for the splitter and registers  the necessary pointer event listeners for resizing.
       *
       * @param {PointerEvent | MouseEvent | TouchEvent} event - The event that begins the drag action.
       */
      const startDrag = (event) => {
        event.preventDefault();

        initialDraggingPointerPosition = getPointerPos(event);
        initialPreviousSiblingSize = direction === 'horizontal' ? previousSibling.offsetWidth : previousSibling.offsetHeight;

        $document.on('pointermove', drag);
        $document.on('pointerup', stopDrag);
      };

      /**
       * Handles the splitter drag movement by calculating and applying the new size of the previous and next sibling
       * as the pointer moves.
       *
       * @param {PointerEvent | MouseEvent | TouchEvent} event The pointer event fired during dragging.
       */
      const drag = (event) => {
        const delta = getPointerPos(event) - initialDraggingPointerPosition;
        let newPrevSize = initialPreviousSiblingSize + delta;

        const parentSize = direction === 'horizontal' ? element[0].parentElement.offsetWidth : element[0].parentElement.offsetHeight;

        const resizerSize = direction === 'horizontal' ? element[0].offsetWidth : element[0].offsetHeight;

        const minSize = 50;
        const maxSize = parentSize - minSize - resizerSize;
        newPrevSize = Math.max(minSize, Math.min(maxSize, newPrevSize));

        if (direction === 'horizontal') {
          previousSibling.style.width = newPrevSize + 'px';
          nextSibling.style.width = parentSize - newPrevSize - resizerSize + 'px';
        } else {
          previousSibling.style.height = newPrevSize + 'px';
          nextSibling.style.height = parentSize - newPrevSize - resizerSize + 'px';
        }
      };

      /**
       * Stops the splitter drag operation by removing all pointer event listeners that were attached during dragging.
       */
      const stopDrag = () => {
        $document.off('pointermove', drag);
        $document.off('pointerup', stopDrag);
      };

      /**
       * Attaches a pointerdown listener to the splitter element (works for mouse, touch, and pen input).
       */
      element.on('pointerdown', startDrag);
    },
  };
}

export default SplitterModule;
