import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const defaultValue = '';
const initialValue = browser ? window.localStorage.getItem('apiKey') ?? defaultValue : defaultValue;

export const apiKey = writable<string>(initialValue);

apiKey.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem('apiKey', value);
  }
});
