<script lang="ts">
	import { apiKey } from '$lib/stores/apiKey';
	import Button from '$lib/Button.svelte';

	let showApiKeyInput = $state(false);
	let isValid = $state<boolean | null>(null); // null: unknown, true: valid, false: invalid
	let isLoading = $state(false);

	let debounceTimeout: ReturnType<typeof setTimeout>;

	async function checkValidity(key: string) {
		if (!key) {
			isValid = null;
			return;
		}

		isLoading = true;
		isValid = null; // Reset validity while checking

		try {
			const response = await fetch('/api/check-api-key', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${key}`
				},
				body: JSON.stringify({ apiKey: key }) // Although sent in header, some APIs might expect in body too
			});
			const result = await response.json();
			isValid = result.valid;
		} catch (error) {
			console.error('Error checking API key validity:', error);
			isValid = false;
		} finally {
			isLoading = false;
		}
	}

	// Trigger check on API key change with debounce
	$effect(() => {
		clearTimeout(debounceTimeout);
		debounceTimeout = setTimeout(() => {
			checkValidity($apiKey);
		}, 500); // Debounce for 500ms
	});

	// Also check when input loses focus
	function handleBlur() {
		clearTimeout(debounceTimeout); // Clear any pending debounce
		checkValidity($apiKey);
	}
</script>

<div class="api-key-section">
	<Button onclick={() => (showApiKeyInput = !showApiKeyInput)} class="api-key-toggle-button">
		API Key
	</Button>
	{#if showApiKeyInput}
		<input
			type="text"
			placeholder="API Key"
			bind:value={$apiKey}
			class="api-key-input"
			onblur={handleBlur}
		/>
		{#if isLoading}
			<div class="validity-indicator spinner"></div>
		{:else if isValid === true}
			<span class="validity-indicator valid">✅</span>
		{:else if isValid === false}
			<span class="validity-indicator invalid">❌</span>
		{/if}
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

	.validity-indicator {
		font-size: 1.2rem;
		margin-left: 0.25rem;
	}

	.spinner {
		border: 4px solid rgba(0, 0, 0, 0.1);
		border-top: 4px solid var(--primary-color);
		border-radius: 50%;
		width: 1.2rem;
		height: 1.2rem;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.validity-indicator.valid {
		color: green;
	}
	.validity-indicator.invalid {
		color: red;
	}
</style>
