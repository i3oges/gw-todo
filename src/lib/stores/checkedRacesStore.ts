import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type CheckedMap = Record<string, boolean>;

interface StoredData {
	lastResetDay: string;
	checked: CheckedMap;
}

export function getUtcResetDay(date = new Date()): string {
	return date.toISOString().split('T')[0];
}

function getInitialState(): { checked: CheckedMap; day: string } {
	const currentDay = getUtcResetDay();
	if (!browser) {
		return { checked: {}, day: currentDay };
	}

	try {
		const raw = localStorage.getItem('checkedRacesData') || localStorage.getItem('checkedRaces');
		if (!raw) {
			return { checked: {}, day: currentDay };
		}

		const parsed = JSON.parse(raw);
		if (parsed && typeof parsed === 'object' && 'lastResetDay' in parsed && 'checked' in parsed) {
			if (parsed.lastResetDay === currentDay) {
				return { checked: parsed.checked || {}, day: currentDay };
			} else {
				return { checked: {}, day: currentDay };
			}
		}

		return { checked: parsed || {}, day: currentDay };
	} catch {
		return { checked: {}, day: currentDay };
	}
}

const initial = getInitialState();
let activeResetDay = initial.day;

export const checkedRacesStore = writable<CheckedMap>(initial.checked);

checkedRacesStore.subscribe((value) => {
	if (browser) {
		const currentDay = getUtcResetDay();
		const dataToStore: StoredData = {
			lastResetDay: currentDay,
			checked: value
		};
		localStorage.setItem('checkedRacesData', JSON.stringify(dataToStore));
		localStorage.setItem('checkedRaces', JSON.stringify(value));
	}
});

if (browser) {
	function checkDailyReset() {
		const today = getUtcResetDay();
		if (today !== activeResetDay) {
			activeResetDay = today;
			checkedRacesStore.set({});
		}
	}

	setInterval(checkDailyReset, 60000);

	window.addEventListener('focus', checkDailyReset);
	document.addEventListener('visibilitychange', () => {
		if (document.visibilityState === 'visible') {
			checkDailyReset();
		}
	});
}
