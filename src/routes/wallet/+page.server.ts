import { getAccountWallet } from '$lib/server/Gw2Api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const wallet = await getAccountWallet();
	return { wallet };
};
