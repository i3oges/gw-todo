import { getAccountWallet } from '$lib/server/Gw2Api';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const prerender = false;

export const load: PageServerLoad = async ({ request, cookies }) => {
	let apiKey: string | undefined | null;

	const authorization = request.headers.get('Authorization');
	if (authorization) {
		apiKey = authorization.split(' ')[1];
	}

	if (!apiKey) {
		apiKey = cookies.get('apiKey');
	}
	
	if (!apiKey) {
		error(401, 'API Key missing');
	}

	const wallet = await getAccountWallet(apiKey);
	return { wallet };
};
