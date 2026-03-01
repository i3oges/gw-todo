import { getAccountWallet } from '$lib/server/Gw2Api';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const prerender = false;

export const load: PageServerLoad = async ({ cookies }) => {
	const apiKey = cookies.get('apiKey');

	if (!apiKey) {
		error(401, 'API Key missing');
	}

	const wallet = await getAccountWallet(apiKey);
	return { wallet };
};
