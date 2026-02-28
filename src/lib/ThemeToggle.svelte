<script lang="ts">
  import { theme } from '$lib/stores/theme';

  function toggleTheme() {
    $theme = $theme === 'dark' ? 'light' : 'dark';
  }
</script>

<style>
  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
  }
</style>

<button on:click={toggleTheme}>
  {#if $theme === 'dark'}
    ☀️
  {:else}
    🌙
  {/if}
</button>
