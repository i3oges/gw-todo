import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { checkApiKeyValidity } from '$lib/server/Gw2Api';

export const POST: RequestHandler = async ({ request, cookies }) => {
	let apiKey: string | undefined | null;

	const authorization = request.headers.get('Authorization');
	if (authorization) {
		apiKey = authorization.split(' ')[1];
	}

	if (!apiKey) {
		apiKey = cookies.get('apiKey');
	}

	if (!apiKey) {
		return json({ valid: false, error: 'API Key missing' }, { status: 400 });
	}

	try {
		const isValid = await checkApiKeyValidity(apiKey);
		return json({ valid: isValid });
	} catch (error: any) {
		return json(
			{ valid: false, error: error.message || 'An unexpected error occurred.' },
			{ status: 500 }
		);
	}
};
