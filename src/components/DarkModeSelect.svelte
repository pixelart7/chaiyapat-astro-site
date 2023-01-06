<script lang="ts">
  import { clickOutside } from "src/directives/clickOutside";
  import { slide } from "svelte/transition";

  let expanded = false;
  let darkMode = '';
  let isSystem = false;

  function onChange() {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      darkMode = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      darkMode = 'light';
    }
    if (!('theme' in localStorage)) isSystem = true;
    else isSystem = false;
  }

  onChange()

  function setTo(str: 'light' | 'dark' | 'system') {
    switch (str) {
      case 'light': localStorage.theme = 'light'; break;
      case 'dark': localStorage.theme = 'dark'; break;
      case 'system': localStorage.removeItem('theme');
    }
    onChange()
    expanded = false
  }
</script>

<div class="relative text-neutral-900 dark:text-neutral-200">
  <button class={`
    text-xl rounded-xl bg-white dark:bg-neutral-800 dark:border-neutral-700 hover:bg-primary-500/10 dark:hover:bg-primary-500/10 w-8 h-8 flex items-center justify-center border border-neutral-200 dark:border-neutral-700
    ${(!isSystem) ? 'text-primary-600' : ''}
    ${(expanded) ? 'pointer-events-none bg-gray-500/20 dark:bg-gray-600/50': ''}
  `}
    aria-expanded={expanded} aria-haspopup="true" aria-label="Darkmode Selector" on:click={() => expanded = !expanded}
  >
    {#if darkMode === 'light'}
      <svg width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M128 56a72 72 0 1 0 72 72a72.1 72.1 0 0 0-72-72Zm0 120a48 48 0 1 1 48-48a48 48 0 0 1-48 48ZM116 28V12a12 12 0 0 1 24 0v16a12 12 0 0 1-24 0Zm74.2 37.8a12 12 0 0 1 0-17l11.3-11.3a12 12 0 0 1 17 17l-11.3 11.3a12 12 0 0 1-8.5 3.5a12.2 12.2 0 0 1-8.5-3.5ZM256 128a12 12 0 0 1-12 12h-16a12 12 0 0 1 0-24h16a12 12 0 0 1 12 12Zm-37.5 73.5a12 12 0 0 1 0 17a11.6 11.6 0 0 1-8.5 3.5a12 12 0 0 1-8.5-3.5l-11.3-11.3a12 12 0 0 1 17-17ZM140 228v16a12 12 0 0 1-24 0v-16a12 12 0 0 1 24 0Zm-74.2-37.8a12 12 0 0 1 0 17l-11.3 11.3A12 12 0 0 1 46 222a11.6 11.6 0 0 1-8.5-3.5a12 12 0 0 1 0-17l11.3-11.3a12 12 0 0 1 17 0ZM28 140H12a12 12 0 0 1 0-24h16a12 12 0 0 1 0 24Zm9.5-85.5a12 12 0 0 1 17-17l11.3 11.3a12 12 0 0 1 0 17a12.2 12.2 0 0 1-8.5 3.5a12 12 0 0 1-8.5-3.5Z"></path></svg>
    {:else if darkMode === 'dark'}
      <svg width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M228.1 149.1a12 12 0 0 0-11.6-8.5a11.4 11.4 0 0 0-3.3.6a80 80 0 0 1-98.3-98.4a13.5 13.5 0 0 0 .4-2.8a12 12 0 0 0-7.5-11.8a12.6 12.6 0 0 0-7.9-.4A104 104 0 1 0 228.2 156a12.5 12.5 0 0 0-.1-6.9ZM128 208A80 80 0 0 1 88.1 58.6a104.2 104.2 0 0 0 109.3 109.3A80.4 80.4 0 0 1 128 208Z"></path></svg>
    {/if}
  </button>
  {#if expanded}
    <div
      transition:slide="{{ duration: 125 }}"
      class="absolute top-9 w-36 text-base font-normal right-0 rounded-lg overflow-hidden bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-lg"
      use:clickOutside on:click_outside={() => expanded = false}
    >
      <ul>
        <li class="font-medium">
          <button class="w-full pl-2 pr-3 py-2 flex items-center hover:bg-primary-500/10" on:click={() => setTo('light')}>
            <svg class="text-xl mr-2" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M128 56a72 72 0 1 0 72 72a72.1 72.1 0 0 0-72-72Zm0 120a48 48 0 1 1 48-48a48 48 0 0 1-48 48ZM116 28V12a12 12 0 0 1 24 0v16a12 12 0 0 1-24 0Zm74.2 37.8a12 12 0 0 1 0-17l11.3-11.3a12 12 0 0 1 17 17l-11.3 11.3a12 12 0 0 1-8.5 3.5a12.2 12.2 0 0 1-8.5-3.5ZM256 128a12 12 0 0 1-12 12h-16a12 12 0 0 1 0-24h16a12 12 0 0 1 12 12Zm-37.5 73.5a12 12 0 0 1 0 17a11.6 11.6 0 0 1-8.5 3.5a12 12 0 0 1-8.5-3.5l-11.3-11.3a12 12 0 0 1 17-17ZM140 228v16a12 12 0 0 1-24 0v-16a12 12 0 0 1 24 0Zm-74.2-37.8a12 12 0 0 1 0 17l-11.3 11.3A12 12 0 0 1 46 222a11.6 11.6 0 0 1-8.5-3.5a12 12 0 0 1 0-17l11.3-11.3a12 12 0 0 1 17 0ZM28 140H12a12 12 0 0 1 0-24h16a12 12 0 0 1 0 24Zm9.5-85.5a12 12 0 0 1 17-17l11.3 11.3a12 12 0 0 1 0 17a12.2 12.2 0 0 1-8.5 3.5a12 12 0 0 1-8.5-3.5Z"></path></svg>
            light
          </button>
        </li>
        <li class="font-medium">
          <button class="w-full pl-2 pr-3 py-2 flex items-center hover:bg-primary-500/10" on:click={() => setTo('dark')}>
            <svg class="text-xl mr-2" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M228.1 149.1a12 12 0 0 0-11.6-8.5a11.4 11.4 0 0 0-3.3.6a80 80 0 0 1-98.3-98.4a13.5 13.5 0 0 0 .4-2.8a12 12 0 0 0-7.5-11.8a12.6 12.6 0 0 0-7.9-.4A104 104 0 1 0 228.2 156a12.5 12.5 0 0 0-.1-6.9ZM128 208A80 80 0 0 1 88.1 58.6a104.2 104.2 0 0 0 109.3 109.3A80.4 80.4 0 0 1 128 208Z"></path></svg>
            dark
          </button>
        </li>
        <li class="font-medium">
          <button class="w-full pl-2 pr-3 py-2 flex items-center hover:bg-primary-500/10" on:click={() => setTo('system')}>
            <svg class="text-xl mr-2" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M208 36H48a28.1 28.1 0 0 0-28 28v108a28.1 28.1 0 0 0 28 28h68v12H96a12 12 0 0 0 0 24h64a12 12 0 0 0 0-24h-20v-12h68a28.1 28.1 0 0 0 28-28V64a28.1 28.1 0 0 0-28-28ZM48 60h160a4 4 0 0 1 4 4v72H44V64a4 4 0 0 1 4-4Zm160 116H48a4 4 0 0 1-4-4v-12h168v12a4 4 0 0 1-4 4Z"></path></svg>
            system
          </button>
        </li>
      </ul>
    </div>
  {/if}
</div>