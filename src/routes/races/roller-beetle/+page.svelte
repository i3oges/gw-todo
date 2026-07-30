<script lang="ts">
	import Gw2Link from '$lib/Gw2Link.svelte';
	import type { PageProps } from './$types';
	import { checkedRacesStore } from '$lib/stores/checkedRacesStore';
	import Button from '$lib/Button.svelte';

	let { data }: PageProps = $props();

	function handleCheckboxChange(id: string) {
		checkedRacesStore.update((store) => {
			store[id] = !store[id];
			return store;
		});
	}
</script>

<div class="mb-6 flex gap-2 border-b border-slate-700 pb-3">
	<a
		href="/races"
		class="rounded-lg px-4 py-2 text-sm font-semibold text-slate-400 hover:bg-slate-800 hover:text-white"
	>
		🦅 Griffon Races
	</a>
	<a
		href="/races/roller-beetle"
		class="rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white shadow"
	>
		🛞 Roller Beetle Races
	</a>
</div>

<div class="rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-xl">
	<div class="flex items-center justify-between">
		<div class="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
			<div>
				<h1 class="flex items-center gap-2 text-xl font-bold text-white">
					<span class="text-yellow-500">🏁</span> Guild Wars 2 Roller Beetle Races
				</h1>
				<p class="text-sm text-slate-400">
					Track your completed roller beetle races <span class="text-xs text-amber-400/90 font-medium">(Resets daily at 00:00 UTC)</span>
				</p>
				<p class="text-sm text-slate-400">
					TIP: use <a
						class="text-(--secondary-color)"
						href="https://github.com/LadyElyssa/LadyElyssaTacoTrails"
						target="_blank"
						rel="noreferrer">LadyElyssa's trails</a
					>
					to complete these races easily
				</p>
			</div>
		</div>
		<Button onclick={() => checkedRacesStore.set({})}>Reset</Button>
	</div>

	{#if data.races}
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each data.races as race}
				<div
					class="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/50 p-3 transition-colors hover:border-slate-500"
					class:checked={$checkedRacesStore[race.id]}
				>
					<div class="flex items-center gap-3">
						<input
							type="checkbox"
							id={race.id}
							checked={$checkedRacesStore[race.id]}
							onchange={() => handleCheckboxChange(race.id)}
							class="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
						/>
						<label for={race.id} class="text-sm font-medium text-slate-200">{race.name}</label>
					</div>
					<Gw2Link link={race.waypoint} />
				</div>
			{/each}
		</div>
	{:else}
		<p class="py-10 text-center text-slate-500 italic">No races found.</p>
	{/if}
</div>

<style>
	.checked {
		color: #888;
		text-decoration: line-through;
	}
</style>
