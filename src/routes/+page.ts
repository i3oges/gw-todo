import { CommercePriceSchema } from '$lib/schema/CommerceSchema';
import { ItemSchema } from '$lib/schema/account/ItemsSchema';
import z from 'zod';
import type { PageLoad } from './$types';

const WEAPON_IDS = [15465, 15394, 46281, 15512, 15352, 15427];
const MAT_IDS = [19721, 19925, 19701, 19684, 19911];
const ALL_IDS = [...WEAPON_IDS, ...MAT_IDS];

export const load: PageLoad = async ({ fetch }) => {
	const idString = ALL_IDS.join(',');

	const [priceRes, itemRes] = await Promise.all([
		fetch(`https://api.guildwars2.com/v2/commerce/prices?ids=${idString}`),
		fetch(`https://api.guildwars2.com/v2/items?ids=${idString}`)
	]);

	if (!priceRes.ok || !itemRes.ok) {
		throw new Error('Failed to fetch data from Tyria');
	}

	const prices = z.array(CommercePriceSchema).parse(await priceRes.json());
	const items = z.array(ItemSchema).parse(await itemRes.json());

	const provisionerItems = prices
		.map((p) => {
			const detail = items.find((i) => i.id === p.id);
			return {
				id: p.id,
				name: detail?.name,
				icon: detail?.icon,
				type: WEAPON_IDS.includes(p.id) ? 'Weapon' : 'Material',
				rawPrice: p.sells.unit_price,
				gold: (p.sells.unit_price / 10000).toFixed(2)
			};
		})
		.sort((a, b) => a.rawPrice - b.rawPrice);

	return {
		provisionerItems
	};
};
