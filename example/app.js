import CryptoJS from 'crypto-js';
import { SecureStorage } from '../secure-storage';
import localStorage from 'localStorage';
const SECRET_KEY = 'my secret key';
const id = 'data', data = {
	secret: 'data'
};

const secureStorage = new SecureStorage(localStorage, {
	hash: function hash(key) {
		key = CryptoJS.SHA256(key, SECRET_KEY);

		return key.toString();
	},
	encrypt: function encrypt(data) {
		data = CryptoJS.AES.encrypt(data, SECRET_KEY);

		data = data.toString();

		return data;
	},
	decrypt: function decrypt(data) {
		data = CryptoJS.AES.decrypt(data, SECRET_KEY);

		data = data.toString(CryptoJS.enc.Utf8);

		return data;
	}
});


secureStorage.setItem(id, data);

secureStorage.getItem(id);

secureStorage.removeItem(id);

// secureStorage.key(id);

secureStorage.clear();

secureStorage.length;
