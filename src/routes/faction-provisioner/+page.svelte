<script lang="ts">
	import GWCPrice from '$lib/GWCPrice.svelte';
	import type { PageProps } from './$types';

	// This prop is automatically populated by the load function
	let { data }: PageProps = $props();
	const diciplines = $state([
		'Armorsmith',
		'Artificer',
		'Huntsman',
		'Leatherworker',
		'Tailor',
		'Weaponsmith'
	]);
	const exchanges = $derived(
		data.provisionerItems.map((items) => {
			return {
				...items,
				exchanges: items.exchanges.map((exchange) => {
					const sortedItems = exchange.items
						.filter((i) => diciplines.includes(i.dicipline))
						.toSorted((a, b) => {
							return a.buy_price - b.buy_price;
						});
					return {
						name: exchange.name,
						item: sortedItems.at(0)
					};
				})
			};
		})
	);
	console.log({ exchanges });
</script>

<div
	class="mx-auto mt-10 flex max-w-7xl flex-col gap-2 rounded-xl border border-slate-700 bg-slate-900 p-6 text-slate-100 shadow-2xl"
>
	<div class="space-between flex">
		<div>
			<h2 class="text-2xl font-bold tracking-tight text-white">Faction Provisioners</h2>
			<p class="text-sm text-slate-400">Server-side rendered market data from the Trading Post</p>
		</div>
		<div></div>
	</div>

	<div class="overflow-hidden rounded-lg border border-slate-700">
		{#each exchanges as item, i}
			<table class="w-full border-collapse text-left">
				<thead class="bg-slate-800">
					<tr>
						<th class="p-4 font-semibold text-slate-300">Exchange</th>
						<th class="p-4 font-semibold text-slate-300">Item</th>
						<th class="p-4 font-semibold text-slate-300">TP Price (Buy)</th>
						<th class="p-4 font-semibold text-slate-300">TP Price (Sell)</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-slate-700 bg-slate-800/50">
					{#each item.exchanges as exchange, j}
						<tr class="transition-colors hover:bg-slate-700/50">
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
									{exchange.item?.name || 'Unknown Item'}
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
