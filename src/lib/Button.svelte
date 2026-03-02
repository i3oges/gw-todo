<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		variant?: 'primary' | 'secondary' | 'ghost' | 'none';
		children?: Snippet;
	}

	let { variant = 'primary', children, class: className, ...rest }: Props = $props();

	const baseStyles =
		'px-4 py-2 rounded-md font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
	const variants = {
		primary: 'bg-[var(--primary-color)] text-[var(--text-color)] hover:opacity-90',
		secondary: 'bg-[var(--secondary-color)] text-[var(--background-color)] hover:opacity-90',
		ghost: 'bg-transparent hover:bg-[var(--surface-color)] text-[var(--text-color)]',
		none: ''
	};
</script>

<button
	class="{variant === 'none' ? '' : baseStyles} {variants[variant]} {className || ''}"
	{...rest}
>
	{#if children}
		{@render children()}
	{/if}
</button>

<style>
	button {
		font-family: 'Cagliostro', sans-serif;
	}
</style>
