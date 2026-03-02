import { getAccountAchievements } from '$lib/server/Gw2Api';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
	const apiKey = cookies.get('apiKey');

	if (!apiKey) {
		error(401, 'API Key missing');
	}

	try {
		const achievements = await getAccountAchievements(apiKey);
		return { achievements };
	} catch (e: unknown) {
		const message = e instanceof Error ? e.message : 'Unknown error';
		error(500, `Failed to fetch achievements: ${message}`);
	}
};
