import { getAccountWallet } from '$lib/server/Gw2Api';
import type { PageLoad } from '../$types';

export const load: PageLoad = async () => {
	const wallet = await getAccountWallet();
	return { wallet };
};
