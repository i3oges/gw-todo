import { getAccountRelicAchievements } from '$lib/server/Gw2Api';
import { RELIC_SETS } from '$lib/relics';
import type { PageServerLoad } from './$types';
import type { AccountAchievements } from '$lib/schema/account/AccountAchievementsSchema';

export const prerender = false;

export const load: PageServerLoad = async ({ cookies }) => {
	const apiKey = cookies.get('apiKey');

	let accountAchievements: AccountAchievements[] | null = null;
	let errorMsg: string | null = null;

	if (apiKey) {
		try {
			const setIds = RELIC_SETS.map((s) => s.id);
			accountAchievements = await getAccountRelicAchievements(apiKey, setIds);
		} catch (e: unknown) {
			errorMsg = e instanceof Error ? e.message : 'Failed to load account achievements';
		}
	}

	return {
		apiKeyPresent: !!apiKey,
		accountAchievements,
		errorMsg
	};
};
