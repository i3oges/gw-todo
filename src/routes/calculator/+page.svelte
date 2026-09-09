<script lang="ts">
	import GWCPrice from '$lib/GWCPrice.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const { recipe, priceMap, detailMap, error } = $derived(data);

	// svelte-ignore state_referenced_locally
	let itemIdInput = $state(data.outputId?.toString() || '');

	const calculateRecipe = () => {
		if (!recipe || !priceMap || !detailMap) return null;

		const ingredients = recipe.ingredients.map((ing) => {
			const detail = detailMap.get(ing.item_id);
			const price = priceMap.get(ing.item_id)?.sells.unit_price || 0;
			return {
				...ing,
				detail,
				unitPrice: price,
				totalPrice: price * ing.count
			};
		});

		const outputDetail = detailMap.get(recipe.output_item_id);
		const outputPrice = priceMap.get(recipe.output_item_id)?.buys.unit_price || 0;

		const totalCost = ingredients.reduce((acc, ing) => acc + ing.totalPrice, 0);
		const totalRevenue = outputPrice * recipe.output_item_count;
		// 15% TP fee (5% listing + 10% exchange)
		const afterFeeRevenue = Math.floor(totalRevenue * 0.85);
		const profit = afterFeeRevenue - totalCost;

		return {
			ingredients,
			outputDetail,
			outputPrice,
			totalCost,
			totalRevenue,
			afterFeeRevenue,
			profit,
			outputCount: recipe.output_item_count
		};
	};

	const result = $derived(calculateRecipe());
</script>

<svelte:head>
	<title>Crafting Calculator | GW TODOBOX</title>
</svelte:head>

<div class="space-y-8">
	<header>
		<h1 class="text-3xl font-bold text-white">Crafting Calculator</h1>
		<p class="text-slate-400">
			Calculate the profitability of crafting items by comparing ingredient costs with market
			prices.
		</p>
	</header>

	<section class="rounded-xl border border-slate-700 bg-slate-800/50 p-6 shadow-xl">
		<form method="GET" class="flex flex-col gap-4 sm:flex-row sm:items-end">
			<div class="flex-1 space-y-2">
				<label for="itemId" class="text-sm font-medium text-slate-300">Search by Item ID</label>
				<div class="relative">
					<input
						type="number"
						id="itemId"
						name="itemId"
						bind:value={itemIdInput}
						placeholder="Enter Item ID (e.g., 19721)"
						class="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-2 text-white placeholder-slate-500 outline-none focus:border-(--secondary-color) focus:ring-1 focus:ring-(--secondary-color)"
					/>
				</div>
			</div>
			<button
				type="submit"
				class="rounded-lg bg-(--secondary-color) px-6 py-2 font-bold text-white transition-opacity hover:opacity-90 active:scale-95"
			>
				Calculate
			</button>
		</form>
	</section>

	{#if error}
		<div class="rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-red-400">
			{error}
		</div>
	{/if}

	{#if result}
		<div class="grid gap-8 lg:grid-cols-3">
			<!-- Ingredients List -->
			<div class="space-y-4 lg:col-span-2">
				<div class="overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50 shadow-lg">
					<div class="border-b border-slate-700 bg-slate-900/50 px-6 py-4">
						<h2 class="text-lg font-bold text-slate-100">Ingredients</h2>
					</div>
					<div class="divide-y divide-slate-700/50">
						{#each result.ingredients as ing (ing.item_id)}
							<div
								class="flex items-center justify-between px-6 py-4 transition-colors hover:bg-slate-700/20"
							>
								<div class="flex items-center gap-4">
									<div class="relative">
										<img
											src={ing.detail?.icon}
											alt={ing.detail?.name}
											class="h-10 w-10 rounded border border-slate-600"
										/>
										<span
											class="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-950 px-1 text-[10px] font-bold text-white ring-1 ring-slate-600"
										>
											{ing.count}
										</span>
									</div>
									<div class="flex flex-col">
										<span class="font-medium text-slate-200"
											>{ing.detail?.name || 'Unknown Item'}</span
										>
										<span class="text-xs text-slate-500"
											>Unit: <GWCPrice rawPrice={ing.unitPrice} /></span
										>
									</div>
								</div>
								<div class="text-right">
									<GWCPrice rawPrice={ing.totalPrice} />
								</div>
							</div>
						{/each}
					</div>
					<div
						class="flex items-center justify-between border-t border-slate-700 bg-slate-900/30 px-6 py-4"
					>
						<span class="text-xs font-bold tracking-wider text-slate-400 uppercase"
							>Total Crafting Cost</span
						>
						<div class="text-lg font-bold">
							<GWCPrice rawPrice={result.totalCost} />
						</div>
					</div>
				</div>
			</div>

			<!-- Summary / Results -->
			<div class="space-y-6">
				<div class="space-y-6 rounded-xl border border-slate-700 bg-slate-800/50 p-6 shadow-lg">
					<div class="space-y-4 text-center">
						<h2 class="text-xs font-bold tracking-wider text-slate-400 uppercase">Result Item</h2>
						<div class="flex flex-col items-center gap-3">
							{#if result.outputDetail?.icon}
								<div class="relative">
									<img
										src={result.outputDetail.icon}
										alt={result.outputDetail.name}
										class="h-20 w-20 rounded-xl border-2 border-slate-600 shadow-2xl"
									/>
									<span
										class="absolute -top-3 -right-3 flex h-8 min-w-8 items-center justify-center rounded-full bg-(--secondary-color) px-2 text-sm font-bold text-white shadow-lg ring-2 ring-slate-800"
									>
										{result.outputCount}
									</span>
								</div>
							{/if}
							<span class="text-xl font-bold text-white">{result.outputDetail?.name}</span>
						</div>
					</div>

					<div class="space-y-3 border-t border-slate-700/50 pt-4">
						<div class="flex items-center justify-between text-sm">
							<span class="text-slate-400">Market Price (Buy)</span>
							<GWCPrice rawPrice={result.outputPrice} />
						</div>
						<div class="flex items-center justify-between text-sm">
							<span class="text-slate-400">Total Revenue</span>
							<GWCPrice rawPrice={result.totalRevenue} />
						</div>
						<div class="flex items-center justify-between text-sm">
							<span class="text-slate-400">After TP Fees (15%)</span>
							<GWCPrice rawPrice={result.afterFeeRevenue} />
						</div>
					</div>

					<div class="border-t border-slate-700/50 pt-6">
						<div
							class="flex flex-col items-center gap-2 rounded-xl p-4 {result.profit > 0
								? 'bg-green-500/10 ring-1 ring-green-500/30'
								: 'bg-red-500/10 ring-1 ring-red-500/30'}"
						>
							<span
								class="text-xs font-bold tracking-widest uppercase {result.profit > 0
									? 'text-green-500'
									: 'text-red-500'}"
							>
								Estimated {result.profit > 0 ? 'Profit' : 'Loss'}
							</span>
							<div class="text-2xl font-black">
								<GWCPrice rawPrice={Math.abs(result.profit)} />
							</div>
						</div>
					</div>
				</div>

				<div
					class="rounded-xl border border-slate-800 bg-slate-900/30 p-4 text-[11px] leading-relaxed text-slate-500"
				>
					<p>
						• Costs: Based on current Trading Post <strong>Sell</strong> listings (instant buy).
					</p>
					<p>
						• Revenue: Based on current Trading Post <strong>Buy</strong> orders (instant sell).
					</p>
					<p>• TP Fees: Includes 5% listing fee and 10% exchange fee.</p>
					<p>• Data: Prices and recipe info are fetched from the official GW2 API.</p>
				</div>
			</div>
		</div>
	{:else if !error && !data.outputId}
		<div class="flex flex-col items-center justify-center py-20 text-slate-500">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="mb-4 h-16 w-16 opacity-20"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.5"
					d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
				/>
			</svg>
			<p>Enter an Item ID to see crafting calculations.</p>
		</div>
	{/if}
</div>
