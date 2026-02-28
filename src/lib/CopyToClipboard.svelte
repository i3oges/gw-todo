<script lang="ts">
  let showPopup = false;
  let timeout: number;

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

<style>
  .copy-container {
    position: relative;
    cursor: pointer;
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

<div class="copy-container" on:click={() => copyToClipboard(getSelection()?.toString() || '')}>
  <slot />
  <div class="popup" class:show={showPopup}>
    Copied to clipboard
  </div>
</div>
