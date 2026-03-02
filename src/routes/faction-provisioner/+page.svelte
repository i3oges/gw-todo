<script lang="ts">
	import Gw2Link from '$lib/Gw2Link.svelte';
	import GWCPrice from '$lib/GWCPrice.svelte';
	import { be } from 'zod/v4/locales';
	import type { PageProps } from './$types';

	// This prop is automatically populated by the load function
	let { data }: PageProps = $props();
	const diciplines = [
		{
			dicipline: 'Armorsmith',
			icon: 'https://wiki.guildwars2.com/images/3/32/Armorsmith_tango_icon_20px.png'
		},
		{
			dicipline: 'Artificer',
			icon: 'https://wiki.guildwars2.com/images/b/b7/Artificer_tango_icon_20px.png'
		},
		{
			dicipline: 'Huntsman',
			icon: 'https://wiki.guildwars2.com/images/f/f3/Huntsman_tango_icon_20px.png'
		},
		{
			dicipline: 'Leatherworker',
			icon: 'https://wiki.guildwars2.com/images/e/e5/Leatherworker_tango_icon_20px.png'
		},
		{
			dicipline: 'Tailor',
			icon: 'https://wiki.guildwars2.com/images/4/4d/Tailor_tango_icon_20px.png'
		},
		{
			dicipline: 'Weaponsmith',
			icon: 'https://wiki.guildwars2.com/images/4/46/Weaponsmith_tango_icon_20px.png'
		}
	];

	const selectedDiciplines = $state(diciplines.map((d) => d.dicipline));
	const checkedItems = $state<Record<number, boolean>>({});
	let bestBuy = $state<'buy_price' | 'sell_price'>('buy_price');
	const exchanges = $derived(
		data.provisionerItems.map((items) => {
			return {
				...items,
				exchanges: items.exchanges.map((exchange) => {
					const item = exchange.items
						.filter((i) => selectedDiciplines.includes(i.dicipline))
						.toSorted((a, b) => {
							return a[bestBuy] - b[bestBuy];
						})
						.at(0);
					if (!item) {
						throw new Error(
							`No items found for exchange ${exchange.name} with selected diciplines`
						);
					}
					return {
						name: exchange.name,
						item
					};
				})
			};
		})
	);
	const totals = $derived(
		exchanges.reduce(
			(acc, item) => {
				item.exchanges.forEach((exchange) => {
					if (exchange.item && checkedItems[exchange.item.id]) {
						acc.buy += exchange.item.buy_price * 7;
						acc.sell += exchange.item.sell_price * 7;
					}
				});
				return acc;
			},
			{ buy: 0, sell: 0 }
		)
	);
	const itemIds = $derived(
		exchanges.reduce((acc: number[], { exchanges }) => {
			exchanges.forEach((exchange) => {
				if (exchange.item && checkedItems[exchange.item.id]) {
					acc.push(exchange.item.id);
				}
			});
			return acc;
		}, [])
	);
	const gw2EfficiencyLink = $derived(
		`https://gw2efficiency.com/crafting/calculator/a~0!b~0!c~0!d~${itemIds.map((id) => `7-${id}`).join(';')}!e~0!f~1`
	);
</script>

<div
	class="mx-auto flex max-w-7xl flex-col gap-2 rounded-xl border border-slate-700 bg-slate-900 p-6 text-slate-100 shadow-2xl"
>
	<div class="flex flex-col justify-between gap-3 xl:flex-row">
		<div>
			<h2 class="text-2xl font-bold tracking-tight text-white">Faction Provisioners</h2>
			<p class="max-w-sm text-sm text-slate-400">
				Check off items to craft/buy, click open in Gw2Efficiency, craft/buy, then turn in for
				provisioner tokens
			</p>
		</div>
		<div class="flex flex-col items-center gap-2">
			<a href={gw2EfficiencyLink} target="_blank" rel="noopener noreferrer">Open in Gw2Efficiency</a
			>
			<div class="flex gap-4">
				Lowest Price By
				<span>
					<input
						type="radio"
						id="buy_price"
						checked={bestBuy === 'buy_price'}
						onchange={() => (bestBuy = 'buy_price')}
					/>
					<label for="buy_price">Buy Price</label>
				</span>
				<span>
					<input
						type="radio"
						id="sell_price"
						checked={bestBuy === 'sell_price'}
						onchange={() => (bestBuy = 'sell_price')}
					/>
					<label for="sell_price">Sell Price</label>
				</span>
			</div>
			<div class="flex items-center gap-6">
				<div class="flex items-center gap-1">
					<span class="text-sm text-slate-400">Total Buy Price:</span>
					<GWCPrice rawPrice={totals.buy} />
				</div>
				<div class="flex items-center gap-1">
					<span class="text-sm text-slate-400">Total Sell Price:</span>
					<GWCPrice rawPrice={totals.sell} />
				</div>
			</div>
		</div>
		<div>
			{#each diciplines as dicipline}
				{@const selected = selectedDiciplines.includes(dicipline.dicipline)}
				<button
					class={` mr-2 mb-2 cursor-pointer rounded border border-slate-600 bg-slate-800 px-3 py-1 text-sm text-slate-300 hover:bg-slate-700 ${selected ? 'ring-2 ring-blue-500' : ''}`}
					onclick={() => {
						if (selectedDiciplines.includes(dicipline.dicipline)) {
							if (selectedDiciplines.length === 1) return; // Prevent deselecting all
							selectedDiciplines.splice(selectedDiciplines.indexOf(dicipline.dicipline), 1);
						} else {
							selectedDiciplines.push(dicipline.dicipline);
						}
					}}
				>
					<img src={dicipline.icon} alt={dicipline.dicipline} class="h-4 w-4" />
				</button>
			{/each}
		</div>
	</div>

	<div class="flex flex-col gap-2 overflow-hidden rounded-lg border-slate-700">
		{#each exchanges as item, i}
			<div>{item.name} {item.location} <Gw2Link link={item.waypoint} /></div>
			<table class="w-full border-collapse border text-left">
				<thead class="bg-slate-800">
					<tr>
						<th></th>
						<th class="p-4 font-semibold text-slate-300">Exchange</th>
						<th class="p-4 font-semibold text-slate-300">Item</th>
						<th class="p-4 font-semibold text-slate-300">TP Price (Buy)</th>
						<th class="p-4 font-semibold text-slate-300">TP Price (Sell)</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-slate-700 bg-slate-800/50">
					{#each item.exchanges as exchange, j}
						<tr class={`transition-colors hover:bg-slate-700/50`}>
							<td>
								<div class="flex items-center gap-2 p-4">
									<input
										type="checkbox"
										id={`exchange-${i}-${j}`}
										checked={checkedItems[exchange.item?.id || 0] || false}
										onchange={() => {
											if (exchange.item) {
												checkedItems[exchange.item.id] = !checkedItems[exchange.item.id];
											}
										}}
										class="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
									/>
								</div>
							</td>
							<td class="p-4">
								<span class="font-medium">{exchange.name}</span>
							</td>
							<td class="flex flex-row items-center gap-3 p-4 text-sm text-slate-400">
								<span class="relative">
									<img
										src={exchange.item?.icon}
										alt={exchange.name}
										class="h-8 w-8 rounded border border-slate-600 shadow-sm"
									/>
								</span>
								<span class="rounded border border-slate-600 px-2 py-0.5">
									{exchange.item?.name || 'Unknown Item'} x7
								</span>
								<span>
									{exchange.item?.dicipline || 'Unknown Dicipline'}
								</span>
							</td>
							<td class="p-4 text-right font-mono font-bold text-yellow-500">
								<GWCPrice rawPrice={exchange.item?.buy_price || 0} />
							</td>
							<td class="p-4 text-right font-mono font-bold text-green-500">
								<GWCPrice rawPrice={exchange.item?.sell_price || 0} />
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/each}
	</div>

	<div class="mt-4 text-xs text-slate-500 italic">Data refreshed on page load.</div>
</div>
