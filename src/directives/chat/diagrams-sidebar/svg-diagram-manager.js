/**
 * Manager for interaction behavior of an SVG diagram.
 */
export class SvgDiagramManager {

    /**
     * @param {HTMLElement} el The root element containing an <svg> element, or an <iframe> that loads SVG content.
     *
     @param {function}  onSVGElementClickCallback Optional callback invoked when an SVG element with an iri is clicked.
     * @param {boolean} [isIframe=false]
     *        Indicates whether `el` is an iframe element.
     */
    constructor(el, attributeName,  onSVGElementClickCallback = () => {}, isIframe = false) {

        /**
         * @type {HTMLElement|null}
         * @private
         */
        this.el = el;

        /**
         * @type {boolean}
         * @private
         */
        this.isIframe = isIframe;

        /**
         * @type {SVGSVGElement|null}
         * @private
         */
        this.svg = null;

        /**
         * @type {Document|null}
         * @private
         */
        this.iframeDoc = null;

        /**
         * @type {string} attributeName to be used to identify the element of interest.
         */
        this.attributeName = attributeName;

        this.onSVGElementClick = onSVGElementClickCallback;

        this._onIframeLoad = this._iframeLoad.bind(this);
        this._onSvgClick = this._svgClick.bind(this);

        this._setup();
    }

    _setup() {
        if (!this.el) {
            return this;
        }

        if (this.isIframe) {
            this._setupIframe();
        } else {
            this._setupSVG(this.el);
        }

        return this;
    }

    /**
     * Registers iframe load listener.
     * @private
     */
    _setupIframe() {
        this.el.addEventListener("load", this._onIframeLoad);
    }

    /**
     * Searches for an <svg> inside the provided root and attaches click listener if found.
     *
     * @param {HTMLElement|Document} root
     * @private
     */
    _setupSVG(root) {
        this.svg = root.querySelector("svg");

        if (this.svg) {
            this.svg.addEventListener("click", this._onSvgClick);
        }
    }

    /**
     * Handles iframe load event. Attempts to access iframe document (same-origin only).
     * @private
     */
    _iframeLoad() {
        this.iframeDoc = this._getIframeDoc(this.el);

        if (!this.iframeDoc) {
            return;
        }

        this._setupSVG(this.iframeDoc);
    }

    /**
     * Attempts to access the iframe's document.
     * If the iframe is cross-origin, access will be blocked by the browser's Same-Origin Policy.
     *
     * @param {HTMLIFrameElement} iframe
     * @returns {Document|null}
     * @private
     */
    _getIframeDoc(iframe) {
        try {
            return iframe.contentDocument || iframe.contentWindow?.document || null;
        } catch (error) {
            console.warn("Unable to access iframe document:", error);
            return null;
        }
    }

    /**
     * Handles click events on the SVG.
     *
     * @param {MouseEvent} event
     * @private
     */
    _svgClick(event) {
        const clickedElementValue = this._getAttributeValue(event);
        if (clickedElementValue && this.onSVGElementClick) {
            this.onSVGElementClick(clickedElementValue);
        }
    }

    /**
     * Retrieves the attribute value from a target element or its closest parent that has it.
     *
     * @param {Event | { target: HTMLElement }} element - The event or object containing the target element.
     * @returns {string | null} The attribute value, or null if not found.
     */
    _getAttributeValue(element) {
        if (!element?.target) {
            return null;
        }

        return this._getValue(element.target);
    }

    /**
     * Recursively retrieves the attribute value from the element or its parent elements.
     *
     * @param {HTMLElement | null} element - The DOM element to check for an `iri` attribute.
     * @returns {string | null} The `iri` attribute value, or null if none is found up the parent chain.
     */
    _getValue(element) {
        if (element) {
            const attributeValue = element.getAttribute(this.attributeName);
            if (attributeValue) {
                return attributeValue;
            }
            return this._getValue(element.parentElement);
        }
    }

    /**
     * Removes all registered event listeners and cleans up internal references.
     */
    destroy() {
        if (!this.el) {
            return;
        }

        if (this.isIframe) {
            this.el.removeEventListener("load", this._onIframeLoad);
        }

        if (this.svg) {
            this.svg.removeEventListener("click", this._onSvgClick);
        }

        this.svg = null;
        this.iframeDoc = null;
    }
}
