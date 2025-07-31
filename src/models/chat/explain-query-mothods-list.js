export class ExplainQueryMethodsListModel {
    constructor(data = []) {
        this._items = data;
    }

    get items() {
        return this._items;
    }

    set items(value) {
        this._items = value;
    }
}
