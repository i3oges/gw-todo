import {
	getItemDetails,
	getItemPrices,
	getRecipes,
	searchRecipesByOutput
} from '$lib/server/Gw2Api';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const itemId = url.searchParams.get('itemId');
	if (!itemId) return {};

	const id = parseInt(itemId);
	if (isNaN(id)) return { error: 'Invalid Item ID' };

	try {
		const recipes = await searchRecipesByOutput(id);
		if (recipes.length === 0) return { error: 'No recipes found for this item' };

		const recipe = recipes[0]; // Take the first one for now
		const ingredientIds = recipe.ingredients.map((i) => i.item_id);
		const allIds = [id, ...ingredientIds];

		const [prices, details] = await Promise.all([getItemPrices(allIds), getItemDetails(allIds)]);

		const priceMap = new Map(prices.map((p) => [p.id, p]));
		const detailMap = new Map(details.map((d) => [d.id, d]));

		return {
			recipe,
			priceMap,
			detailMap,
			outputId: id
		};
	} catch (e) {
		return { error: (e as Error).message };
	}
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const itemId = data.get('itemId');
		return { itemId };
	}
};
