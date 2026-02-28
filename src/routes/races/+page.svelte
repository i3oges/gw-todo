<script lang="ts">
	import CopyToClipboard from '$lib/CopyToClipboard.svelte';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let checkedRaces = $state<Record<string, boolean>>({});

	function handleCheckboxChange(id: string) {
		console.log({ id });
		console.log(JSON.stringify(checkedRaces, null, '  '));
		checkedRaces[id] = !checkedRaces[id];
	}
</script>

<h1>Guild Wars 2 Griffon Races</h1>

{#if data.races}
	<ul>
		{#each data.races as race}
			<li class="race-item" class:checked={checkedRaces[race.id]}>
				<input
					type="checkbox"
					id={race.id}
					checked={checkedRaces[race.id]}
					onchange={() => handleCheckboxChange(race.id)}
				/>
				<label for={race.id}>{race.name}</label>
				<CopyToClipboard>
					<span class="waypoint" role="button">{race.waypoint}</span>
				</CopyToClipboard>
			</li>
		{/each}
	</ul>
{:else}
	<p>No races found.</p>
{/if}

<style>
	.race-item {
		display: flex;
		align-items: center;
		padding: 0.5rem;
		transition: color 0.3s;
	}

	.race-item.checked {
		color: #888;
		text-decoration: line-through;
	}

	input[type='checkbox'] {
		margin-right: 0.5rem;
	}

	.waypoint {
		margin-left: 0.5rem;
		font-family: monospace;
	}
</style>
