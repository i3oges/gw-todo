import { getItemDetails, getItemPrices } from '$lib/server/Gw2Api';
import {
	FINE_MATERIAL_UPGRADES_T5_TO_T6,
	ORB_REFINEMENT,
	RARE_MATERIAL_UPGRADES_T4_TO_T5,
	RARE_MATERIAL_UPGRADES_T5_TO_T6,
	AMALGAMATED_DRACONIC_LODESTONES
} from '$lib/materialUpgrades';
import { ALL_MATERIAL_PROMOTIONS } from '$lib/materialPromotions';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const recipes = [
		...ALL_MATERIAL_PROMOTIONS,
		ORB_REFINEMENT,
		AMALGAMATED_DRACONIC_LODESTONES
	];
	const allUpgrades = recipes.map((r) => r.recipes).flat();

	const itemIds = new Set<number>();
	allUpgrades.forEach((u) => {
		itemIds.add(u.ingredient1);
		itemIds.add(u.ingredient2);
		if (u.ingredient3) {
			itemIds.add(u.ingredient3);
		}
		if (u.ingredient4) {
			itemIds.add(u.ingredient4);
		}
		itemIds.add(u.output);
	});

	const ids = Array.from(itemIds);
	const [prices, details] = await Promise.all([getItemPrices(ids), getItemDetails(ids)]);

	const priceMap = new Map(prices.map((p) => [p.id, p]));
	const detailMap = new Map(details.map((d) => [d.id, d]));

	return {
		recipes,
		priceMap,
		detailMap
	};
};
