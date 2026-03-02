<script lang="ts">
	import { theme } from '$lib/stores/theme';

	function toggleTheme() {
		$theme = $theme === 'dark' ? 'light' : 'dark';
	}
</script>

<button on:click={toggleTheme} class="cursor-pointer border-none bg-none text-2xl">
	{#if $theme === 'dark'}
		☀️
	{:else}
		🌙
	{/if}
</button>
