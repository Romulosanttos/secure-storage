// eslint-disable-next-line import/no-extraneous-dependencies
import localStorage from 'localStorage';

/**
 * SecureStorage
 * @example
 * pasta example/app.js
 */
export default class SecureStorage {
  constructor(storage, options) {
    this.storage = storage || localStorage;
    if (options) {
      this.hash = options.hash;
      this.encrypt = options.encrypt;
      this.decrypt = options.decrypt;
    }
  }

  getItem(key) {
    const hashKey = this.hash(key);
    let value = this.storage.getItem(hashKey);
    if (typeof value !== 'string') {
      return value;
    }
    value = this.decrypt(value);
    return JSON.parse(value);
  }

  setItem(key, value) {
    const hashKey = this.hash(key);
    const newValue = this.encrypt(JSON.stringify(value));
    return this.storage.setItem(hashKey, newValue);
  }

  removeItem(key) {
    const hashKey = this.hash(key);
    return this.storage.removeItem(hashKey);
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
