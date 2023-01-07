<script lang="ts">
  let isShow = false;
  export let slug;

  const previousPath = new URL(document.referrer).pathname.split('/').filter((p) => p);
  if (previousPath[0] === 'garden') {
    if (previousPath[1] && (previousPath[1] || '') === slug) {
      isShow = true;
    }
  }
</script>

{#if isShow}
  <div class="opacity-50 inline-flex items-center">
    <svg class="translate-y-[2px]" width="16" height="16" viewBox="0 0 256 256" aria-label="(Previously visited)">
      <title>Previously visited</title>
      <path fill="currentColor" d="M140 80v41.1l35.6 20.5A12.1 12.1 0 0 1 180 158a12.2 12.2 0 0 1-10.4 6a11.7 11.7 0 0 1-6-1.6l-41.6-24l-.3-.2l-.6-.4l-.4-.3l-.5-.4l-.5-.4l-.3-.4l-.5-.5l-.3-.3l-.4-.6l-.3-.4l-.3-.5l-.3-.5l-.2-.5l-.3-.6c0-.2-.1-.3-.1-.5a1.4 1.4 0 0 1-.2-.6l-.2-.5c0-.2-.1-.4-.1-.6s-.1-.4-.1-.6v-.6a1.5 1.5 0 0 1-.1-.7V80a12 12 0 0 1 24 0Zm58.7-22.7a100.1 100.1 0 0 0-141.4 0L43.8 70.7v-11a12 12 0 1 0-24 0v40c0 .4.1.8.1 1.2a.9.9 0 0 0 .1.5a2 2 0 0 0 .1.7c0 .2.1.4.1.6s.1.3.2.5s.1.4.1.6a.8.8 0 0 1 .2.5l.3.5l.3.6l.2.5l.4.5l.3.5c.1.1.2.3.4.4l.7.9h.1l.8.8l.5.3l.5.4l.5.3l.5.3l.5.3l.5.2l.6.2l.5.2h.6l.6.2h42.3a12 12 0 0 0 0-24h-11l13.5-13.1a76 76 0 1 1 0 107.4a12.2 12.2 0 0 0-17 0a12 12 0 0 0 0 17A100 100 0 0 0 198.7 57.3Z"/>
    </svg>
  </div>
{/if}