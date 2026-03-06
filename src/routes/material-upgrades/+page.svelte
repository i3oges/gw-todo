<script lang="ts">
	import GWCPrice from '$lib/GWCPrice.svelte';
	import type { PageProps } from './$types';
	import type { MaterialUpgrade, MysticForgeRecipe } from '$lib/materialUpgrades';

	let { data }: PageProps = $props();

	const { recipes, priceMap, detailMap } = $derived(data);

	const calculateUpgrade = (upgrade: MysticForgeRecipe) => {
		const i1Price = priceMap.get(upgrade.ingredient1)?.sells.unit_price || 0;
		const i2Price = priceMap.get(upgrade.ingredient2)?.sells.unit_price || 0;
		const i3Price = priceMap.get(upgrade.ingredient3 || -1)?.sells.unit_price || 0;
		const i4Price = priceMap.get(upgrade.ingredient4 || -1)?.sells.unit_price || 0;
		const outputPrice = priceMap.get(upgrade.output)?.buys.unit_price || 0;

		const ingredients = [
			{ id: upgrade.ingredient1, count: upgrade.ingredient1Count, unitPrice: i1Price },
			{ id: upgrade.ingredient2, count: upgrade.ingredient2Count, unitPrice: i2Price }
		];
		if (
			i3Price !== 0 &&
			upgrade.ingredient3 !== undefined &&
			upgrade.ingredient3Count !== undefined
		) {
			ingredients.push({
				id: upgrade.ingredient3,
				count: upgrade.ingredient3Count,
				unitPrice: i3Price
			});
		}

		if (
			i4Price !== 0 &&
			upgrade.ingredient4 !== undefined &&
			upgrade.ingredient4Count !== undefined
		) {
			ingredients.push({
				id: upgrade.ingredient4,
				count: upgrade.ingredient4Count,
				unitPrice: i4Price
			});
		}

		const cost = ingredients.reduce((acc, curr) => acc + curr.unitPrice * curr.count, 0);
		const revenue = outputPrice * upgrade.outputCount;
		const profit = revenue - cost;

		return { cost, revenue, profit, ingredients, outputPrice };
	};
</script>

<div class="space-y-8">
	<header>
		<h1 class="text-3xl font-bold text-white">Mystic Forge Material Upgrades</h1>
		<p class="text-slate-400">
			Compare the cost of ingredients against the estimated value of upgraded materials.
		</p>
	</header>

	{#each recipes as recipe}
		<div class="overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50 shadow-2xl">
			<div class="overflow-x-auto">
				<h1 class="p-2 text-(--secondary-color)!">{recipe.name}</h1>
				<table class="w-full text-left text-sm">
					<thead
						class="border-b border-slate-700 bg-slate-900/50 text-xs font-semibold tracking-wider text-slate-400 uppercase"
					>
						<tr>
							<th class="px-6 py-4">Ingredients</th>
							<th class="px-6 py-4">Result Item</th>
							<th class="px-6 py-4">Revenue (Est.)</th>
							<th class="px-6 py-4">Net Profit</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-slate-700/50">
						{#each recipe.recipes as upgrade}
							{@const { cost, revenue, profit, ingredients, outputPrice } =
								calculateUpgrade(upgrade)}
							{@const toItem = detailMap.get(upgrade.output)}
							<tr class="transition-colors hover:bg-slate-700/30">
								<!-- Ingredients -->
								<td class="px-6 py-4">
									<div class="flex flex-col gap-2">
										<div class="flex gap-4">
											{#each ingredients as ing}
												{@const item = detailMap.get(ing.id)}
												{#if item}
													<div class="group relative flex flex-col items-center gap-1">
														<div class="relative">
															<img
																src={item.icon}
																alt={item.name}
																class="h-8 w-8 rounded border border-slate-700 opacity-80 group-hover:opacity-100"
																title={`${ing.count}x ${item.name}`}
															/>
															<span
																class="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-slate-950 px-1 text-[9px] font-medium text-slate-300 ring-1 ring-slate-700"
															>
																{ing.count}
															</span>
														</div>
													</div>
												{/if}
											{/each}
										</div>
										<div
											class="mt-1 flex max-w-fit items-center gap-2 rounded-full bg-slate-900/50 px-3 py-0.5 text-xs ring-1 ring-slate-700/50"
										>
											<span class="text-slate-500">Total:</span>
											<GWCPrice rawPrice={cost} />
										</div>
									</div>
								</td>
								<!-- Result Item -->
								<td class="px-6 py-4">
									<div class="flex items-center gap-3">
										{#if toItem?.icon}
											<div class="relative h-10 w-10 shrink-0">
												<img
													src={toItem.icon}
													alt={toItem.name}
													class="h-full w-full rounded border border-slate-600 shadow-inner"
													title={toItem.name}
												/>
												<span
													class="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-900 px-1 text-[10px] font-bold text-white ring-1 ring-slate-600"
												>
													{upgrade.outputCount}
												</span>
											</div>
										{/if}
										<div class="flex flex-col">
											<span class="font-bold text-slate-100">{toItem?.name}</span>
											<span class="text-[10px] text-slate-500">Unit Price:</span>
											<GWCPrice rawPrice={outputPrice} />
										</div>
									</div>
								</td>

								<!-- Revenue -->
								<td class="px-6 py-4">
									<div class="flex flex-col">
										<GWCPrice rawPrice={revenue} />
										<span class="text-[10px] text-slate-500">({upgrade.outputCount} units)</span>
									</div>
								</td>

								<!-- Profit -->
								<td class="px-6 py-4">
									<div
										class="inline-flex flex-col items-end rounded-lg px-3 py-1 ring-1 ring-inset {profit >
										0
											? 'bg-green-500/10 ring-green-500/20'
											: 'bg-red-500/10 ring-red-500/20'}"
									>
										<GWCPrice rawPrice={Math.abs(profit)} />
										<span
											class="text-[10px] font-bold tracking-tight uppercase {profit > 0
												? 'text-green-500'
												: 'text-red-500'}"
										>
											{profit > 0 ? 'Profit' : 'Loss'}
										</span>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/each}

	<footer
		class="flex flex-col gap-2 rounded-lg border border-slate-800 bg-slate-900/30 p-4 text-[11px] leading-relaxed text-slate-500"
	>
		<p>
			• Prices: Based on current Trading Post <strong class="text-slate-400">Sell</strong> listings
			for ingredients and <strong class="text-slate-400">Buy</strong> orders for output items.
		</p>
		<p>
			• Yields: Calculations use community-averaged yields (e.g., 7 units for T6 fine upgrades, 20
			units for rare dust upgrades).
		</p>
		<p>
			• Disclaimer: Mystic Forge results are RNG-based; individual results may vary significantly
			from averages.
		</p>
	</footer>
</div>
