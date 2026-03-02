<div
	class="flex flex-col justify-between rounded-xl border border-slate-700 bg-slate-800/50 p-6 text-left transition-colors hover:border-(--secondary-color)"
>
	<div>
		<h2 class="mb-2 text-2xl font-bold text-white"><slot name="title"></slot></h2>
		<p class="mb-6 text-slate-400">
			<slot name="description"></slot>
		</p>
	</div>

	<slot name="action"></slot>
</div>
