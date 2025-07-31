export class ItemListModel {

    constructor(items = []) {
        this._items = items;
    }

    isEmpty() {
        return this._items.length === 0;
    }

    /**
     * @param {ChatItemModel} chatItem
     */
    appendItem(chatItem) {
        this._items.push(chatItem);
    }

    get items() {
        return this._items;
    }

    set items(value) {
        this._items = value || [];
    }

    getLast() {
        if (!this.isEmpty()) {
            return this._items[this._items.length - 1];
        }
    }
}
