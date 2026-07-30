<script lang="ts">
	import { evaluateRelics, RELIC_SETS, type EvaluatedRelic } from '$lib/relics';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let search = $state('');
	let selectedExpansion = $state('All');
	let selectedStatus = $state('All');
	let copiedId = $state<number | null>(null);

	const expansions = ['All', 'Janthir Wilds', 'Visions of Eternity'];
	const statuses = ['All', 'Unlocked', 'Locked'];

	const allEvaluated = $derived(evaluateRelics(data.accountAchievements));

	const totalCount = $derived(allEvaluated.length);
	const unlockedCount = $derived(allEvaluated.filter((r) => r.unlocked).length);
	const overallPercentage = $derived(
		totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0
	);

	const expansionStats = $derived(
		expansions
			.filter((e) => e !== 'All')
			.map((exp) => {
				const expRelics = allEvaluated.filter((r) => r.expansion === exp);
				const unlocked = expRelics.filter((r) => r.unlocked).length;
				const total = expRelics.length;
				const pct = total > 0 ? Math.round((unlocked / total) * 100) : 0;
				return { expansion: exp, unlocked, total, pct };
			})
	);

	const filteredRelics = $derived(
		allEvaluated.filter((relic) => {
			if (selectedExpansion !== 'All' && relic.expansion !== selectedExpansion) {
				return false;
			}
			if (selectedStatus === 'Unlocked' && !relic.unlocked) {
				return false;
			}
			if (selectedStatus === 'Locked' && relic.unlocked) {
				return false;
			}
			if (search.trim()) {
				const query = search.toLowerCase();
				const matchName = relic.name.toLowerCase().includes(query);
				const matchReq = relic.requirementText.toLowerCase().includes(query);
				const matchSet = relic.setName.toLowerCase().includes(query);
				return matchName || matchReq || matchSet;
			}
			return true;
		})
	);

	const groupedRelics = $derived.by(() => {
		const map = new Map<number, { set: (typeof RELIC_SETS)[0]; relics: EvaluatedRelic[] }>();
		for (const set of RELIC_SETS) {
			map.set(set.id, { set, relics: [] });
		}
		for (const relic of filteredRelics) {
			const entry = map.get(relic.setId);
			if (entry) {
				entry.relics.push(relic);
			}
		}
		return Array.from(map.values()).filter((group) => group.relics.length > 0);
	});

	function copyChatLink(item: EvaluatedRelic) {
		if (!item.chatLink) return;
		navigator.clipboard.writeText(item.chatLink);
		copiedId = item.itemId;
		setTimeout(() => {
			if (copiedId === item.itemId) {
				copiedId = null;
			}
		}, 2000);
	}

	function getExpansionBadgeStyle(exp: string): string {
		switch (exp) {
			case 'Janthir Wilds':
				return 'bg-emerald-900/40 text-emerald-300 border-emerald-700/50';
			case 'Visions of Eternity':
				return 'bg-purple-900/40 text-purple-300 border-purple-700/50';
			default:
				return 'bg-slate-800 text-slate-300 border-slate-700';
		}
	}
</script>

<svelte:head>
	<title>Legendary Relic Achievements | GW TODOBOX</title>
</svelte:head>

<div class="space-y-6">
	<!-- Hero / Header Section -->
	<div class="rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-xl">
		<div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
			<div class="space-y-2">
				<div class="flex items-center gap-3">
					<div
						class="h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-amber-500/40 bg-amber-950/60 p-1 shadow-inner"
					>
						<img
							src="https://render.guildwars2.com/file/08DED07BF6DF37E69A08D1C49D9C45D81BD8A5CA/3255567.png"
							alt="Legendary Relic"
							class="h-full w-full object-contain"
						/>
					</div>
					<div>
						<h1 class="flex items-center gap-2 text-2xl font-bold text-white">
							Legendary Relic Unlock Achievements
						</h1>
						<p class="text-sm text-slate-400">
							Track expansion relic collection achievements required for your Legendary Relic (Core
							& Secrets of the Obscure relics are automatically unlocked). Reference list from
							<a
								href="https://wiki.guildwars2.com/wiki/Legendary_Relic"
								target="_blank"
								rel="noopener noreferrer"
								class="text-blue-400 hover:underline"
							>
								GW2 Wiki Legendary Relic ↗
							</a>
						</p>
					</div>
				</div>

				{#if !data.apiKeyPresent}
					<div
						class="mt-3 flex items-center justify-between rounded-lg border border-amber-500/30 bg-amber-950/30 p-3 text-xs text-amber-300"
					>
						<span
							>⚠️ No API key set. Enter your GW2 API key in the top navigation bar to see your
							account's achievement progress.</span
						>
					</div>
				{/if}
			</div>

			<!-- Overall Progress Bar -->
			<div class="w-full space-y-2 rounded-lg border border-slate-800 bg-slate-950/60 p-4 md:w-80">
				<div class="flex items-center justify-between text-xs font-semibold">
					<span class="text-slate-300">Tracked Relics Unlocked</span>
					<span class="font-mono text-sm text-amber-400"
						>{unlockedCount} / {totalCount} ({overallPercentage}%)</span
					>
				</div>
				<div
					class="h-3.5 w-full overflow-hidden rounded-full border border-slate-700 bg-slate-800 p-0.5"
				>
					<div
						class="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-500"
						style="width: {overallPercentage}%"
					></div>
				</div>
			</div>
		</div>

		<!-- Expansion Breakdown Stats -->
		<div class="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-2">
			{#each expansionStats as stat}
				<div
					class="rounded-lg border border-slate-800 bg-slate-800/40 p-3 text-center transition hover:border-slate-700"
				>
					<div class="truncate text-xs font-medium text-slate-400">{stat.expansion}</div>
					<div class="mt-1 font-mono text-lg font-bold text-slate-100">
						{stat.unlocked} <span class="text-xs font-normal text-slate-500">/ {stat.total}</span>
					</div>
					<div class="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
						<div class="h-full rounded-full bg-emerald-500" style="width: {stat.pct}%"></div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Controls & Filters -->
	<div
		class="flex flex-col gap-4 rounded-xl border border-slate-700 bg-slate-900 p-4 shadow-lg md:flex-row md:items-center md:justify-between"
	>
		<!-- Search -->
		<div class="relative flex-1">
			<input
				type="text"
				bind:value={search}
				placeholder="Search relics by name, requirement, or set..."
				class="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-100 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
			/>
			{#if search}
				<button
					onclick={() => (search = '')}
					class="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
				>
					✕
				</button>
			{/if}
		</div>

		<!-- Dropdown Filters -->
		<div class="flex flex-wrap items-center gap-3">
			<div class="flex items-center gap-2">
				<label for="exp-filter" class="text-xs font-medium text-slate-400">Expansion:</label>
				<select
					id="exp-filter"
					bind:value={selectedExpansion}
					class="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-200 outline-none focus:border-blue-500"
				>
					{#each expansions as exp}
						<option value={exp}>{exp}</option>
					{/each}
				</select>
			</div>

			<div class="flex items-center gap-2">
				<label for="status-filter" class="text-xs font-medium text-slate-400">Status:</label>
				<select
					id="status-filter"
					bind:value={selectedStatus}
					class="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-200 outline-none focus:border-blue-500"
				>
					{#each statuses as status}
						<option value={status}>{status}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>

	<!-- Relic Collections & Card Grid -->
	{#if groupedRelics.length === 0}
		<div class="rounded-xl border border-slate-800 bg-slate-900 p-12 text-center text-slate-400">
			No relic variants found matching your filters.
		</div>
	{:else}
		<div class="space-y-8">
			{#each groupedRelics as group}
				<div class="space-y-4">
					<!-- Set Header -->
					<div class="flex items-center justify-between border-b border-slate-800 pb-2">
						<div class="flex items-center gap-3">
							<h2 class="text-lg font-bold text-slate-100">{group.set.name}</h2>
							<span
								class="rounded border px-2 py-0.5 text-xs font-semibold tracking-wider uppercase {getExpansionBadgeStyle(
									group.set.expansion
								)}"
							>
								{group.set.expansion}
							</span>
						</div>
						<span class="font-mono text-xs text-slate-400">
							{group.relics.filter((r) => r.unlocked).length} / {group.set.bitsCount} Unlocked
						</span>
					</div>

					<!-- Cards Grid -->
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{#each group.relics as relic}
							<div
								class="group relative flex flex-col justify-between rounded-xl border p-4 shadow-md transition-all duration-200 {relic.unlocked
									? 'border-slate-700 bg-slate-900/90 hover:border-slate-500'
									: 'border-slate-800/80 bg-slate-950/60 opacity-75 hover:border-slate-700 hover:opacity-100'}"
							>
								<div>
									<!-- Top row: Icon + Name + Status -->
									<div class="flex items-start gap-3">
										<div
											class="relative h-12 w-12 shrink-0 rounded-lg border border-slate-700 bg-slate-800 p-1"
										>
											{#if relic.icon}
												<img
													src={relic.icon}
													alt={relic.name}
													class="h-full w-full object-contain"
												/>
											{:else}
												<div
													class="flex h-full w-full items-center justify-center text-xs text-slate-500"
												>
													🔮
												</div>
											{/if}
										</div>

										<div class="min-w-0 flex-1">
											<h3
												class="truncate text-sm font-bold text-slate-100 transition-colors group-hover:text-amber-300"
												title={relic.name}
											>
												{relic.name}
											</h3>

											<!-- Lock Badge -->
											<div class="mt-1 flex items-center gap-1.5">
												{#if relic.unlocked}
													<span
														class="inline-flex items-center gap-1 rounded border border-emerald-700/50 bg-emerald-950/80 px-2 py-0.5 text-xs font-semibold text-emerald-400"
													>
														✓ Unlocked
													</span>
												{:else}
													<span
														class="inline-flex items-center gap-1 rounded border border-slate-700 bg-slate-800 px-2 py-0.5 text-xs font-semibold text-slate-400"
													>
														🔒 Locked
													</span>
												{/if}
											</div>
										</div>
									</div>

									<!-- Description / Requirement -->
									{#if relic.requirementText}
										<p
											class="mt-3 line-clamp-3 rounded border border-slate-800/60 bg-slate-950/40 p-2 text-xs leading-relaxed text-slate-400"
										>
											{relic.requirementText}
										</p>
									{:else if relic.description}
										<p
											class="mt-3 line-clamp-3 rounded border border-slate-800/60 bg-slate-950/40 p-2 text-xs leading-relaxed text-slate-400"
										>
											{relic.description}
										</p>
									{/if}
								</div>

								<!-- Card Footer / Quick Actions -->
								<div
									class="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3"
								>
									<a
										href="https://wiki.guildwars2.com/wiki/{encodeURIComponent(relic.name)}"
										target="_blank"
										rel="noopener noreferrer"
										class="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
									>
										Wiki ↗
									</a>

									{#if relic.chatLink}
										<button
											onclick={() => copyChatLink(relic)}
											class="rounded bg-slate-800 px-2 py-1 font-mono text-xs text-slate-300 transition-colors hover:bg-slate-700"
											title="Copy chat link {relic.chatLink}"
										>
											{#if copiedId === relic.itemId}
												Copied!
											{:else}
												{relic.chatLink}
											{/if}
										</button>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
