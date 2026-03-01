<script lang="ts">
	import GWCPrice from '$lib/GWCPrice.svelte';
	import type { PageProps } from './$types';

	// This prop is automatically populated by the load function
	let { data }: PageProps = $props();
	const diciplines = [
		'Armorsmith',
		'Artificer',
		'Chef',
		'Huntsman',
		'Jeweler',
		'Leatherworker',
		'Scribe',
		'Tailor',
		'Weaponsmith'
	];
</script>

<div
	class="mx-auto mt-10 max-w-4xl rounded-xl border border-slate-700 bg-slate-900 p-6 text-slate-100 shadow-2xl"
>
	<div class="mb-6">
		<h2 class="text-2xl font-bold tracking-tight text-white">Faction Provisioners</h2>
		<p class="text-sm text-slate-400">Server-side rendered market data from the Trading Post</p>
	</div>

	<div class="overflow-hidden rounded-lg border border-slate-700">
		<table class="w-full border-collapse text-left">
			<thead class="bg-slate-800">
				<tr>
					<th class="p-4 font-semibold text-slate-300">Item</th>
					<th class="p-4 font-semibold text-slate-300">Category</th>
					<th class="p-4 text-right font-semibold text-slate-300">TP Price</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-slate-700 bg-slate-800/50">
				{#each data.provisionerItems as item, i}
					<tr class="transition-colors hover:bg-slate-700/50">
						<td class="flex items-center gap-3 p-4">
							<div class="relative">
								<img
									src={item.icon}
									alt={item.name}
									class="h-8 w-8 rounded border border-slate-600 shadow-sm"
								/>
								{#if i === 0}
									<span
										class="absolute -top-2 -left-2 rounded-full bg-green-500 px-1 text-[10px] font-bold tracking-tighter text-white uppercase"
										>Best</span
									>
								{/if}
							</div>
							<span class="font-medium">{item.name}</span>
						</td>
						<td class="p-4 text-sm text-slate-400">
							<span class="rounded border border-slate-600 px-2 py-0.5">
								{item.type}
							</span>
						</td>
						<td class="p-4 text-right font-mono font-bold text-yellow-500">
							<GWCPrice rawPrice={item.rawPrice} />
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<div class="mt-4 text-xs text-slate-500 italic">Data refreshed on page load.</div>
</div>
