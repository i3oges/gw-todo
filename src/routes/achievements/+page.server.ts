import { getAccountAchievements } from '$lib/server/Gw2Api';
import type { PageLoad } from '../$types';

// src/routes/wallet/+page.ts
export const load: PageLoad = async () => {
	const achievements = await getAccountAchievements();
	return { achievements };
};
