// 1. Define the item mapping
const PROVISIONER_IDS = {
	WEAPONS: [15465, 15394, 46281, 15512, 15352, 15427],
	MATERIALS: [19721, 19925, 19701, 19684, 19911]
};

interface PriceData {
	id: number;
	buys: { unit_price: number };
	sells: { unit_price: number };
}

interface ItemDetails {
	id: number;
	name: string;
	chat_link: string;
}

/**
 * A fast, lightweight Bun-based API fetcher for GW2 Provisioner items
 */
async function getProvisionerMarketData() {
	const allIds = [...PROVISIONER_IDS.WEAPONS, ...PROVISIONER_IDS.MATERIALS];
	const idString = allIds.join(',');

	console.log('🚀 Fetching live data from Tyria...');

	try {
		// Bun's native fetch supports concurrent requests easily
		const [priceRes, detailRes] = await Promise.all([
			fetch(`https://api.guildwars2.com/v2/commerce/prices?ids=${idString}`),
			fetch(`https://api.guildwars2.com/v2/items?ids=${idString}`)
		]);

		const prices: PriceData[] = await priceRes.json();
		const details: ItemDetails[] = await detailRes.json();

		// Merge price data with item names
		return prices.map((p) => {
			const info = details.find((d) => d.id === p.id);
			const isWeapon = PROVISIONER_IDS.WEAPONS.includes(p.id);

			return {
				name: info?.name || 'Unknown',
				type: isWeapon ? 'Weapon' : 'Material',
				buy_now_gold: (p.sells.unit_price / 10000).toFixed(4), // Convert copper to gold
				sell_now_gold: (p.buys.unit_price / 10000).toFixed(4),
				link: info?.chat_link
			};
		});
	} catch (err) {
		console.error('Failed to fetch from GW2 API:', err);
		return [];
	}
}

export default getProvisionerMarketData;
