<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { theme } from '$lib/stores/theme';
	import ThemeToggle from '$lib/ThemeToggle.svelte';
	import ApiKeyInput from '$lib/ApiKeyInput.svelte';
	import { page } from '$app/stores'; // Changed from $app/state

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link href="https://fonts.googleapis.com/css2?family=Cagliostro&display=swap" rel="stylesheet" />
	<title>GW TODO</title>
	{#if $theme === 'dark'}
		<link rel="stylesheet" href="/styles/dark.css" />
	{:else}
		<link rel="stylesheet" href="/styles/light.css" />
	{/if}
</svelte:head>

<div data-theme={$theme}>
	<header>
		<nav>
			<div class="banner"><a href="/" class:active={$page.url.pathname === '/'}>GW TODO</a></div>
			<ul>
				<li>
					<a
						href="/faction-provisioner"
						class:active={$page.url.pathname.startsWith('/faction-provisioner')}
						>Faction Provisioner</a
					>
				</li>
				<li>
					<a href="/achievements" class:active={$page.url.pathname.startsWith('/achievements')}
						>Achievements</a
					>
				</li>
				<li>
					<a href="/wallet" class:active={$page.url.pathname.startsWith('/wallet')}>Wallet</a>
				</li>
				<li><a href="/races" class:active={$page.url.pathname.startsWith('/races')}>Races</a></li>
			</ul>
			<ApiKeyInput />
			<ThemeToggle />
		</nav>
	</header>

	<main>
		{@render children()}
	</main>
</div>

<style>
	:global(body) {
		font-family: 'Cagliostro', sans-serif;
	}

	.banner {
		font-family: 'Cagliostro', sans-serif;
		font-size: 2rem;
		font-weight: bold;
		color: var(--primary-color);
	}

	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background-color: var(--header-color);
		border-bottom: 1px solid var(--surface-color);
		gap: 1rem; /* Added gap for spacing */
	}

	nav ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		gap: 1rem;
		flex-grow: 1;
	}

	nav a {
		text-decoration: none;
		color: var(--text-color);
	}

	nav a:hover {
		color: var(--primary-color);
	}

	nav a.active {
		text-decoration: underline;
		text-decoration-color: var(--primary-color);
		text-underline-offset: 4px;
	}

	main {
		padding: 1rem;
	}
</style>
