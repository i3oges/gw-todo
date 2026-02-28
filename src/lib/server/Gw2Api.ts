import { AccountAchievementsSchema } from '$lib/schema/account/AccountAchievementsSchema';
import { WalletSchema } from '$lib/schema/account/WalletSchema';
import z from 'zod';

export const GW2_BASE_URL = 'https://api.guildwars2.com/v2';

// Map of common Currency IDs for easier reading
const CURRENCY_MAP: Record<number, string> = {
	1: 'Gold',
	4: 'Gem',
	23: 'Ascended Shards of Glory',
	29: 'Provisioner Token',
	47: 'Elegy Mosaic'
};

const fetchGw2 = async <T extends z.ZodType>(
	path: string,
	schema: T,
	apiKey: string, // Added apiKey parameter
	searchParams?: URLSearchParams
) => {
	const url = new URL(GW2_BASE_URL);
	url.pathname += path;
	if (searchParams) {
		searchParams.entries().forEach(([k, v]) => url.searchParams.set(k, v));
	}
	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${apiKey}` // Use the passed apiKey
		}
	});

	if (response.status === 401) throw new Error('Invalid API Key');
	if (response.status === 403) throw new Error("Missing 'wallet' permission");

	const json = await response.json();
	const parseResult = schema.safeParse(json);
	if (!parseResult.success) throw new Error('could not parse', parseResult.error);
	return parseResult.data;
};

export const getAccountAchievements = async (apiKey: string) => {
	return fetchGw2(
		'/account/achievements',
		z.array(AccountAchievementsSchema),
		apiKey, // Pass apiKey
		new URLSearchParams({ page: '0', page_size: '10' })
	);
};

export const getAccountWallet = async (apiKey: string) => {
	const wallet = await fetchGw2('/account/wallet', WalletSchema, apiKey); // Pass apiKey

	return wallet.map((item) => ({
		...item,
		name: CURRENCY_MAP[item.id] || `Unknown (ID: ${item.id})`
	}));
};

export const checkApiKeyValidity = async (apiKey: string): Promise<boolean> => {
	const url = new URL(GW2_BASE_URL);
	url.pathname += '/account'; // A simple endpoint that requires only a valid key

	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${apiKey}`
		}
	});

	// A 200 OK status indicates a valid key, even if permissions are limited
	// Any other status (e.g., 401) indicates an invalid key
	return response.ok;
};
