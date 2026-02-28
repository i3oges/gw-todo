<script lang="ts">
	import GWCPrice from '$lib/GWCPrice.svelte';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let searchTerm = $state('');

	// Filter wallet based on search
	const filteredWallet = $derived(
		data.wallet.filter((item) => item.name?.toLowerCase().includes(searchTerm.toLowerCase()))
	);

	// Helper to get official icons from the GW2 render service
	// Note: Most common currencies have specific IDs,
	// but for a production app, you'd fetch /v2/currencies for all icons.
	const getIcon = (id: number) => `https://render.guildwars2.com/file/...`;
</script>

<div class="rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-xl">
	<div class="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
		<div>
			<h2 class="flex items-center gap-2 text-xl font-bold text-white">
				<span class="text-yellow-500">💰</span> Account Wallet
			</h2>
			<p class="text-sm text-slate-400">Total currencies across your account</p>
		</div>

		<input
			type="text"
			bind:value={searchTerm}
			placeholder="Search currencies..."
			class="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 md:w-64"
		/>
	</div>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each filteredWallet as item}
			<div
				class="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/50 p-3 transition-colors hover:border-slate-500"
			>
				<div class="flex items-center gap-3">
					<div class="h-8 w-8 shrink-0 rounded-md bg-slate-700 p-1">
						<img
							src="https://api.guildwars2.com/v2/currencies/icons/{item.id}"
							alt={item.name}
							class="h-full w-full object-contain"
						/>
					</div>

					<span class="text-sm font-medium text-slate-200"
						>{item.name || `Currency ${item.id}`}</span
					>
				</div>

				<div class="text-right">
					{#if item.id === 1}
						<GWCPrice rawPrice={item.value} />
					{:else}
						<span class="font-mono font-bold text-blue-400">
							{item.value.toLocaleString()}
						</span>
					{/if}
				</div>
			</div>
		{/each}
	</div>

	{#if filteredWallet.length === 0}
		<div class="py-10 text-center text-slate-500 italic">
			No currencies found matching "{searchTerm}"
		</div>
	{/if}
</div>
