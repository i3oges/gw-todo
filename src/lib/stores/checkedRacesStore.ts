import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const defaultValue: Record<string, boolean> = {};
const initialValue: Record<string, boolean> = browser
	? JSON.parse(localStorage.getItem('checkedRaces') || '{}')
	: defaultValue;

export const checkedRacesStore = writable<Record<string, boolean>>(initialValue);

checkedRacesStore.subscribe((value) => {
	if (browser) {
		localStorage.setItem('checkedRaces', JSON.stringify(value));
	}
});
