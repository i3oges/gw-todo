<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		variant?: 'primary' | 'secondary' | 'ghost' | 'none';
		children?: Snippet;
		href?: string;
	}

	let {
		variant = 'primary',
		children,
		class: className,
		href,
		...rest
	}: Props & HTMLAnchorAttributes = $props();

	const baseStyles =
		'px-4 py-2 rounded-md font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed inline-block';
	const variants = {
		primary: 'bg-(--primary-color) text-(--text-color) hover:opacity-90',
		secondary: 'bg-(--secondary-color) text-(--background-color) hover:opacity-90',
		ghost: 'bg-transparent hover:bg-(--surface-color) text-(--text-color)',
		none: ''
	};

	const combinedClasses = $derived(
		`${variant === 'none' ? '' : baseStyles} ${variants[variant]} ${className || ''}`
	);
</script>

{#if href}
	<a {href} class={combinedClasses} {...rest}>
		{#if children}
			{@render children()}
		{/if}
	</a>
{:else}
	<button class={combinedClasses} {...rest}>
		{#if children}
			{@render children()}
		{/if}
	</button>
{/if}
