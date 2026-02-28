import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import Cookies from 'js-cookie';

const defaultValue = '';
const initialValue = browser ? (Cookies.get('apiKey') ?? defaultValue) : defaultValue;

export const apiKey = writable<string>(initialValue);

apiKey.subscribe((value) => {
	if (browser) {
		if (value) {
			Cookies.set('apiKey', value, { expires: 365, secure: true, sameSite: 'Strict' });
		} else {
			Cookies.remove('apiKey');
		}
	}
});
