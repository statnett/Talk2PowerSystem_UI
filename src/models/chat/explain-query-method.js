export class ExplainQueryMethodModel {
    constructor(data = {}) {
        /**
         * @type {ExtractionMethod.FTS_SEARCH | ExtractionMethod.RETRIEVAL | ExtractionMethod.SPARQL | ExtractionMethod.SIMILARITY}
         */
        this._name = data.name;

        /**
         * @type {string}
         */
        this._args = this.markdownJsonString(data.args);

        /**
         * @type {string}
         */
        this._query = data.query;

        /**
         * @Type {ExplainQueryType}
         * @private
         */
        this._queryType = data.queryType;

        /**
         * @type {string | null}
         * @private
         */
        this._errorMessage = data.errorOutput;
    }

    /**
     * Converts a JSON object to a Markdown-formatted code block.
     * @param {Object} jsonOrString - The JSON object to convert.
     * @returns {string} A Markdown code block string with formatted JSON.
     */
    markdownJsonString(jsonOrString) {
        if (typeof jsonOrString !== 'object') {
            return jsonOrString || '';
        }

        return '```json\n' + JSON.stringify(jsonOrString, null, 2) + '\n```';
    }


    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get args() {
        return this._args;
    }

    set args(value) {
        this._args = value;
    }

    get query() {
        return this._query;
    }

    set query(value) {
        this._query = value;
    }

    get queryType() {
        return this._queryType;
    }

    set queryType(value) {
        this._queryType = value;
    }

    get errorMessage() {
        return this._errorMessage;
    }

    set errorMessage(value) {
        this._errorMessage = value;
    }
}
