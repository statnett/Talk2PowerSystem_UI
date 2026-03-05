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
    constructor(el, attributeName,  onSVGElementClickCallback = () => {}, isIframe = false, iframeStyle) {

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
         * @type {string | undefined}
         */
        this.iframeStyle = iframeStyle;

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
         * ID of the interval timer used to repeatedly check for the SVG element.
         * Stored so it can be cleared when the class instance is destroyed.
         *
         * @type {number|null}
         */
        this.timerId = null;

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
     * Attempts to locate an <svg> element inside the given root element. Polls periodically until the element is found
     * or the timeout is reached.
     *
     * @param {HTMLElement} root - The root element to search within.
     * @param {number} [maxDuration=10000] - Maximum time in milliseconds to keep searching.
     * @param {number} [interval=200] - Polling interval in milliseconds.
     * @returns {Promise<SVGElement>} Resolves with the found SVG element.
     * @throws {Error} Rejects if no SVG is found within the specified timeout.
     */
    _findSvg(root, maxDuration = 4000, interval = 200) {
        return new Promise((resolve, reject) => {
            const startTime = Date.now();
            const check = () => {
                const svg = root.querySelector("svg");

                if (svg) {
                    clearInterval(this.timerId);
                    this.timerId = null;
                    resolve(svg);
                    return;
                }

                if (Date.now() - startTime >= maxDuration) {
                    clearInterval(this.timerId);
                    this.timerId = null;
                    reject(new Error("SVG not found within timeout."));
                }
            };

            this.timerId = setInterval(check, interval);
            // immediate first attempt
            check();
        });
    }

    /**
     * Initializes the SVG by locating it within the provided root element and attaching the click event handler once available.
     *
     * @param {HTMLElement} root - The root element containing the SVG.
     * @returns {Promise<void>} Resolves when initialization completes.
     */
    _setupSVG(root) {
        this._findSvg(root)
            .then(svg => {
                this.svg = svg;
                this.svg.addEventListener("click", this._onSvgClick);
            })
            .catch(err => {
                console.warn(err.message);
            });
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

        this._addStyleToFrame();
        this._setupSVG(this.iframeDoc);
    }

    _addStyleToFrame() {
        if (this.iframeStyle) {
            const style = document.createElement('style');
            style.textContent = this.iframeStyle;
            this.iframeDoc.head?.appendChild(style);
        }
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

        if (this.timerId) {
            clearInterval(this.timerId);
        }

        this.svg = null;
        this.iframeDoc = null;
    }
}
