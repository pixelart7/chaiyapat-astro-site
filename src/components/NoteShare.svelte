<script lang="ts">
  export let title = '';
  export let text = '';

  let isShow = navigator.canShare({
    title,
    text,
    url: window.location.href
  }) && navigator.clipboard && window.isSecureContext;

  let isShowCopied = false;

  async function onClickCopy() {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        isShowCopied = true
        setTimeout(() => { isShowCopied = false }, 2000)
      })
  }

  function onClickShare() {
    navigator.share({
      title,
      text,
      url: window.location.href
    })
  }
</script>

{#if isShow}
  <li>
    <span class="text-xs opacity-75">Share</span>
    <div class="flex text-sm font-medium gap-1">
      <button class="cursor-pointer h-6 flex items-center justify-center p-1 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden { isShowCopied ? 'pointer-events-none' : 'dark:hover:bg-primary-500/10 hover:bg-primary-500/10' }" on:click={() => onClickCopy()}>
        <span class="w-4 relative">
          <svg class="absolute inset-0 bg-gray-100 dark:bg-gray-800 transition-all { isShowCopied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 scale-[0.98]' }" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...$$props}><path fill="currentColor" d="m232.49 80.49l-128 128a12 12 0 0 1-17 0l-56-56a12 12 0 1 1 17-17L96 183L215.51 63.51a12 12 0 0 1 17 17Z"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...$$props}><path fill="currentColor" d="M117.18 188.74a12 12 0 0 1 0 17l-5.12 5.12A58.26 58.26 0 0 1 70.6 228a58.62 58.62 0 0 1-41.46-100.08l34.75-34.75a58.64 58.64 0 0 1 98.56 28.11a12 12 0 1 1-23.37 5.44a34.65 34.65 0 0 0-58.22-16.58l-34.75 34.75A34.62 34.62 0 0 0 70.57 204a34.4 34.4 0 0 0 24.49-10.14l5.11-5.12a12 12 0 0 1 17.01 0M226.83 45.17a58.65 58.65 0 0 0-82.93 0l-5.11 5.11a12 12 0 0 0 17 17l5.12-5.12a34.63 34.63 0 1 1 49 49l-34.81 34.7A34.4 34.4 0 0 1 150.61 156a34.63 34.63 0 0 1-33.69-26.72a12 12 0 0 0-23.38 5.44A58.64 58.64 0 0 0 150.56 180h.05a58.28 58.28 0 0 0 41.47-17.17l34.75-34.75a58.62 58.62 0 0 0 0-82.91"/></svg>
        </span>
        <span class="ml-1 relative">
          <span class="absolute inset-0 bg-gray-100 dark:bg-gray-800 transition-all { isShowCopied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 scale-[0.98]' }">Copied!</span>
          Copy Link
        </span>
      </button>
      <button class="cursor-pointer h-6 flex items-center justify-center p-1 bg-gray-100 dark:bg-gray-800 dark:hover:bg-primary-500/10 hover:bg-primary-500/10 rounded" on:click={() => onClickShare()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M228 104a12 12 0 0 1-24 0V69l-59.51 59.51a12 12 0 0 1-17-17L187 52h-35a12 12 0 0 1 0-24h64a12 12 0 0 1 12 12Zm-44 24a12 12 0 0 0-12 12v64H52V84h64a12 12 0 0 0 0-24H48a20 20 0 0 0-20 20v128a20 20 0 0 0 20 20h128a20 20 0 0 0 20-20v-68a12 12 0 0 0-12-12"/></svg>
        <span class="ml-1">Share</span>
      </button>
    </div>
  </li>
{/if}