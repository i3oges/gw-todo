<script lang="ts">
	let { rawPrice = 0 } = $props();

	// official Wiki asset URLs
	const ASSETS = {
		gold: 'https://wiki.guildwars2.com/images/d/d1/Gold_coin.png',
		silver: 'https://wiki.guildwars2.com/images/3/3c/Silver_coin.png',
		copper: 'https://wiki.guildwars2.com/images/e/eb/Copper_coin.png'
	};

	const formatted = $derived({
		gold: Math.floor(rawPrice / 10000),
		silver: Math.floor((rawPrice % 10000) / 100),
		copper: rawPrice % 100
	});
</script>

<div class="flex items-center gap-3 font-mono text-sm font-bold tabular-nums select-none">
	{#if formatted.gold > 0}
		<div class="flex items-center gap-1">
			<span class="text-slate-100">{formatted.gold}</span>
			<img src={ASSETS.gold} alt="g" class="h-4 w-4 object-contain" />
		</div>
	{/if}

	{#if formatted.gold > 0 || formatted.silver > 0}
		<div class="flex items-center gap-1">
			<span class="text-slate-100">{formatted.silver}</span>
			<img src={ASSETS.silver} alt="s" class="h-4 w-4 object-contain" />
		</div>
	{/if}

	<div class="flex items-center gap-1">
		<span class="text-slate-100">{formatted.copper}</span>
		<img src={ASSETS.copper} alt="c" class="h-4 w-4 object-contain" />
	</div>
</div>
