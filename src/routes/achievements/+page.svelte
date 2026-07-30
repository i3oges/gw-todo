<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Achievements | GW TODOBOX</title>
</svelte:head>

<div class="space-y-6">
	<div class="rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-xl">
		<h1 class="text-2xl font-bold text-white flex items-center gap-2 mb-2">
			🏆 Account Achievements
		</h1>
		<p class="text-slate-400 text-sm mb-6">
			Track your Guild Wars 2 collection achievements and unlock goals.
		</p>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<a
				href="/relics"
				class="group flex flex-col justify-between rounded-xl border border-slate-700 bg-slate-800/80 p-5 transition hover:border-amber-500/60 hover:bg-slate-800 shadow-lg"
			>
				<div>
					<div class="flex items-center gap-3">
						<div class="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-amber-950/60 p-1 border border-amber-500/40">
							<img
								src="https://wiki.guildwars2.com/images/c/ce/Legendary_Relic.png"
								alt="Legendary Relic"
								class="h-full w-full object-contain"
							/>
						</div>
						<div>
							<h2 class="text-lg font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
								Legendary Relic Achievements
							</h2>
							<span class="text-xs text-amber-400 font-medium">11 Collections • 112 Relics</span>
						</div>
					</div>
					<p class="mt-3 text-xs text-slate-400 leading-relaxed">
						Track unlocked relic variants across Core, Secrets of the Obscure, Janthir Wilds, and Visions of Eternity relic collections.
					</p>
				</div>

				<div class="mt-4 flex items-center gap-1 text-xs font-semibold text-blue-400 group-hover:text-blue-300">
					Open Relics Tracker →
				</div>
			</a>
		</div>
	</div>
</div>
