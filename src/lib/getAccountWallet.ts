import z from 'zod';
import { WalletSchema } from './schema/account/WalletSchema';

const GW2_BASE_URL = 'https://api.guildwars2.com/v2';

// Map of common Currency IDs for easier reading
const CURRENCY_MAP: Record<number, string> = {
	1: 'Gold',
	4: 'Gem',
	23: 'Ascended Shards of Glory',
	29: 'Provisioner Token',
	47: 'Elegy Mosaic'
};

async function getAccountWallet(apiKey: string) {
	try {
		const response = await fetch(`${GW2_BASE_URL}/account/wallet`, {
			headers: {
				Authorization: `Bearer ${apiKey}`
			}
		});

		if (response.status === 401) throw new Error('Invalid API Key');
		if (response.status === 403) throw new Error("Missing 'wallet' permission");

		const rawData = await response.json();

		// Validate with Zod
		const validatedWallet = WalletSchema.parse(rawData);

		// Enhance data with names where known
		return validatedWallet.map((item) => ({
			...item,
			name: CURRENCY_MAP[item.id] || `Unknown (ID: ${item.id})`
		}));
	} catch (error) {
		if (error instanceof z.ZodError) {
			console.error('API Response structure changed:', { error });
		}
		throw error;
	}
}

export default getAccountWallet;
