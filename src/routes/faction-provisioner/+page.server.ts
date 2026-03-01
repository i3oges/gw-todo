import { CommercePriceSchema } from '$lib/schema/CommerceSchema';
import { ItemSchema } from '$lib/schema/account/ItemsSchema';
import z from 'zod';
import type { PageServerLoad } from './$types';
import provisioners from './provisioners';

export const load: PageServerLoad = async ({ fetch }) => {
	const idString = provisioners
		.map((p) => p.exchanges)
		.flat()
		.map((e) => e.items.map((i) => i.id))
		.flat()
		.join(',');

	const [priceRes, itemRes] = await Promise.all([
		fetch(`https://api.guildwars2.com/v2/commerce/prices?ids=${idString}`),
		fetch(`https://api.guildwars2.com/v2/items?ids=${idString}`)
	]);

	if (!priceRes.ok || !itemRes.ok) {
		throw new Error('Failed to fetch data from Tyria');
	}

	const prices = z.array(CommercePriceSchema).parse(await priceRes.json());
	const items = z.array(ItemSchema).parse(await itemRes.json());

	const provisionerItems = provisioners.map((p) => {
		return {
			...p,
			exchanges: p.exchanges.map((e) => {
				return {
					...e,
					items: e.items.map((i) => {
						const price = prices.find((p) => p.id === i.id);
						const detail = items.find((item) => item.id === i.id);
						if (!price || !detail) {
							throw new Error(`Missing data for item ID ${i.id}`);
						}
						return {
							...i,
							name: detail.name,
							icon: detail.icon,
							buy_price: price.buys.unit_price,
							sell_price: price.sells.unit_price
						};
					})
				};
			})
		};
	});

	return {
		provisionerItems
	};
};
