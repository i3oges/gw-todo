<script lang="ts">
	import Button from '$lib/Button.svelte';
	import Card from '$lib/Card.svelte';
</script>

<div class="flex flex-col items-center justify-center space-y-8 py-12 text-center">
	<div class="space-y-4">
		<h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
			Welcome to <span class="text-(--primary-color)">GW TODOBOX</span>
		</h1>
		<p class="mx-auto max-w-2xl text-xl text-slate-400">
			A collection of tools and checklists designed to help you track your daily routine in Guild
			Wars 2.
		</p>
	</div>

	<div class="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
		<Card>
			<span slot="title">💰 Provisioner</span>
			<span slot="description">
				Calculate cost-effective ways to get your weekly Provisioner Tokens for legendary gear.
			</span>
			<Button slot="action" href="/faction-provisioner" class="w-full text-center">
				Open Calculator
			</Button>
		</Card>

		<Card>
			<span slot="title">🏁 Griffon Races</span>
			<span slot="description">
				Track your completed griffon races across Tyria and push for those gold medals.
			</span>
			<Button slot="action" variant="secondary" href="/races" class="w-full text-center">
				View Checklist
			</Button>
		</Card>

		<Card>
			<span slot="title">🔮 Material Upgrades</span>
			<span slot="description">
				Track Mystic Forge profitability for upgrading T5 materials to T6.
			</span>
			<Button
				slot="action"
				variant="ghost"
				href="/material-upgrades"
				class="w-full border border-purple-500/50 text-center hover:bg-purple-500/10"
			>
				Check Profits
			</Button>
		</Card>
	</div>

	<div class="pt-8">
		<p class="text-sm text-slate-500 italic">More tools coming soon...</p>
	</div>
</div>
