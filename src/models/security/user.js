export class UserModel {
    constructor(data = {}) {
        /**
         * The username of the user.
         * @type {string}
         */
        this.username = data.username || '';

        /**
         * The full name of the user.
         * @type {string}
         */
        this.name = data.name || '';
    }
}
