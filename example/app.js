/* eslint-disable import/no-extraneous-dependencies */
import CryptoJS from 'crypto-js';
import localStorage from 'localStorage';
import debug from 'debug';

import SecureStorage from '../secure-storage';

const SECRET_KEY = 'my secret key';
const debugLog = debug('secure-storage');

const secureStorage = new SecureStorage(localStorage, {
  hash: function hash(key) {
    const newKey = CryptoJS.SHA256(key, SECRET_KEY);

    return newKey.toString();
  },
  encrypt: function encrypt(data) {
    const newData = CryptoJS.AES.encrypt(data, SECRET_KEY);
    return newData.toString();
  },
  decrypt: function decrypt(data) {
    const newData = CryptoJS.AES.decrypt(data, SECRET_KEY);
    return newData.toString(CryptoJS.enc.Utf8);
  },
});

const id = 'data';
const data = {
  secret: 'data',
};

secureStorage.setItem(id, data);

debugLog(secureStorage.getItem(id));

secureStorage.removeItem(id);

// secureStorage.key(id);

secureStorage.clear();

debugLog(secureStorage.getLength());
