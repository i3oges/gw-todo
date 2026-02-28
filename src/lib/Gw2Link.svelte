<script lang="ts">
	let showPopup = $state(false);
	let timeout: ReturnType<typeof setTimeout>;

	let { link } = $props();

	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text).then(() => {
			showPopup = true;
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				showPopup = false;
			}, 2000);
		});
	}
</script>

<button class="copy-container" onclick={() => copyToClipboard(link || '')}>
	<span class="cursor-pointer font-mono text-blue-400">{link}</span>
	<div class="popup" class:show={showPopup}>Copied to clipboard</div>
</button>

<style>
	.copy-container {
		position: relative;
		cursor: pointer;
		background: none; /* Remove default button background */
		border: none; /* Remove default button border */
		padding: 0; /* Remove default button padding */
		display: inline-flex; /* Ensure it wraps content properly */
		align-items: center; /* Align content vertically */
		outline: none; /* Remove default focus outline */
	}

	.copy-container:hover,
	.copy-container:focus {
		outline: 2px solid var(--primary-color);
		outline-offset: 2px;
		border-radius: 4px; /* Match the rounded corners of content if any */
	}

	.popup {
		position: absolute;
		top: -2.5rem;
		left: 50%;
		transform: translateX(-50%);
		background-color: #333;
		color: #fff;
		padding: 0.5rem 1rem;
		border-radius: 0.25rem;
		white-space: nowrap;
		opacity: 0;
		transition: opacity 0.3s;
		pointer-events: none;
	}

	.popup.show {
		opacity: 1;
	}
</style>
