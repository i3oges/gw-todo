<script lang="ts">
	import { apiKey } from '$lib/stores/apiKey';
	let showApiKeyInput = $state(false);
</script>

<div class="api-key-section">
	<button onclick={() => (showApiKeyInput = !showApiKeyInput)} class="api-key-toggle-button">
		{#if showApiKeyInput}Hide API Key{:else}Show API Key{/if}
	</button>
	{#if showApiKeyInput}
		<input type="text" placeholder="API Key" bind:value={$apiKey} class="api-key-input" />
	{/if}
</div>

<style>
	.api-key-section {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.api-key-input {
		padding: 0.5rem;
		border-radius: 5px;
		border: 1px solid var(--surface-color);
		background-color: var(--background-color);
		color: var(--text-color);
		width: var(--api-key-input-width, 62ch); /* Use CSS variable for flexibility */
	}

	.api-key-toggle-button {
		background-color: var(--primary-color);
		color: var(--text-color);
		border: none;
		border-radius: 5px;
		padding: 0.5rem 1rem;
		cursor: pointer;
		font-family: 'Cagliostro', sans-serif;
	}

	.api-key-toggle-button:hover {
		opacity: 0.9;
	}
</style>
