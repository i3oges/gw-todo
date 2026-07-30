import { AccountAchievementsSchema } from '$lib/schema/account/AccountAchievementsSchema';
import { WalletSchema } from '$lib/schema/account/WalletSchema';
import { CommercePriceSchema } from '$lib/schema/CommerceSchema';
import { RecipeSchema } from '$lib/schema/RecipeSchema';
import z from 'zod';

export const GW2_BASE_URL = 'https://api.guildwars2.com/v2';

const ItemSchema = z.object({
	id: z.number(),
	name: z.string(),
	icon: z.string().optional(),
	chat_link: z.string().optional()
});

export type Item = z.infer<typeof ItemSchema>;

const fetchGw2 = async <T extends z.ZodType>(
	path: string,
	schema: T,
	apiKey?: string,
	searchParams?: URLSearchParams
) => {
	const url = new URL(GW2_BASE_URL);
	url.pathname += path;
	if (searchParams) {
		searchParams.entries().forEach(([k, v]) => url.searchParams.set(k, v));
	}
	const headers: HeadersInit = {};
	if (apiKey) {
		headers['Authorization'] = `Bearer ${apiKey}`;
	}
	const response = await fetch(url, { headers });

	if (response.status === 401) throw new Error('Invalid API Key');
	if (response.status === 403) throw new Error("Missing 'wallet' permission");

	const json = await response.json();
	const parseResult = schema.safeParse(json);
	if (!parseResult.success) throw new Error(`could not parse ${path}: ${parseResult.error}`);
	return parseResult.data;
};

export const getItemPrices = async (ids: number[]) => {
	if (ids.length === 0) return [];
	return fetchGw2(
		'/commerce/prices',
		z.array(CommercePriceSchema),
		undefined,
		new URLSearchParams({ ids: ids.join(',') })
	);
};

export const getItemDetails = async (ids: number[]) => {
	if (ids.length === 0) return [];
	return fetchGw2(
		'/items',
		z.array(ItemSchema),
		undefined,
		new URLSearchParams({ ids: ids.join(',') })
	);
};

export const getRecipes = async (ids: number[]) => {
	if (ids.length === 0) return [];
	return fetchGw2(
		'/recipes',
		z.array(RecipeSchema),
		undefined,
		new URLSearchParams({ ids: ids.join(',') })
	);
};

export const searchRecipesByOutput = async (outputItemId: number) => {
	const recipeIds = await fetchGw2(
		'/recipes/search',
		z.array(z.number()),
		undefined,
		new URLSearchParams({ output: outputItemId.toString() })
	);
	if (recipeIds.length === 0) return [];
	return getRecipes(recipeIds);
};

export const searchItemsByName = async (name: string) => {
	// The official GW2 API doesn't support searching by name directly.
	// We'll use a hacky way: search items by name is not possible via official API without downloading all IDs.
	// For now, we'll try to find a way or just inform the user.
	// Some people use GW2Efficiency's API for this.
	// Let's use a public endpoint if available or just return empty for now.
	return [];
};

export const getAccountAchievements = async (apiKey: string) => {
	return fetchGw2(
		'/account/achievements',
		z.array(AccountAchievementsSchema),
		apiKey, // Pass apiKey
		new URLSearchParams({ page: '0', page_size: '10' })
	);
};

export const getAccountRelicAchievements = async (apiKey: string, ids: number[]) => {
	if (ids.length === 0) return [];
	return fetchGw2(
		'/account/achievements',
		z.array(AccountAchievementsSchema),
		apiKey,
		new URLSearchParams({ ids: ids.join(',') })
	);
};

export const getAccountWallet = async (apiKey: string) => {
	const wallet = await fetchGw2('/account/wallet', WalletSchema, apiKey); // Pass apiKey

	return wallet;
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
