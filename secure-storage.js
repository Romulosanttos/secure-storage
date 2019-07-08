/**
 * SecureStorage
 * @example
 * pasta example/app.js
 */
export class SecureStorage{
	constructor(storage, options){      
		this.storage = storage;
		if (options) {
			this.hash = options.hash;
			this.encrypt = options.encrypt;
			this.decrypt = options.decrypt;
		}
	}

	getItem(key) {
		key = this.hash(key);
		let value = this.storage.getItem(key);
		if (typeof value !== 'string') {
			return value;
		}
		value = this.decrypt(value);
		return JSON.parse(value);
	}

	setItem(key, value) {
		key = this.hash(key);
		value = JSON.stringify(value);
		value = this.encrypt(value);
		return this.storage.setItem(key, value);
	}

	removeItem(key) {
		key = this.hash(key);
		return this.storage.removeItem(key);
	}

	clear() {
		return this.storage.clear();
	}

	key(id) {
		return this.storage.key(id);
	}

	getLength() {
		return this.storage.length;
	}
}


