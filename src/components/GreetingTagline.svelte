<script lang="ts">
  import { onMount } from 'svelte';
  import { slide, blur } from 'svelte/transition';

  let isShowTagline = false
  let isShowReRandom = false
  let isReRandoming = false

  const randomItems = (arr, count) => arr.concat().reduce((p, _, __, arr) => (p[0] < count ? [p[0] + 1, p[1].concat(arr.splice((Math.random() * arr.length) | 0, 1))] : p), [0, []])[1];

  const greetings = [
    'Plenty of things here especially the smell of morning coffee ☕️',
    'Probably powered by coffee ☕️',
    'Proven not a robot by internet checkboxes',
    'Paradise for light-blue color enjoyer',
    'Primarily in light blue',
    'Personally wrote this randomly picked tagline',
    'Proudly caffeinated and (occasionally) productive',
    'Probably thinking about a c-word right now (it\'s "coffee")',
    'Perfectly imperfect, just like my code or a left-and-forgotten Aeropress',
    'Permanently into pixel arts, but rarely make it myself',
  ]

  let greeting = randomItems(greetings, 1)

  onMount(() => {
    isShowTagline = true
    setTimeout(() => { isShowReRandom = true }, 2000)
  })

  function onReRandom() {
    isShowReRandom = false
    isReRandoming = true
    greeting = randomItems([...greetings].filter((g) => g !== greeting), 1)
    setTimeout(() => {
      isReRandoming = false
      setTimeout(() => { isShowReRandom = true }, 500)
    }, 500)
  }
</script>

{#if isShowTagline}
  <p transition:slide class="text-xl opacity-75 mt-2">
    {#if !isReRandoming}
      <span transition:blur class="mr-2">{greeting}</span>
    {/if}
    {#if isShowReRandom}
      <button transition:blur on:click={() => onReRandom()} class="group opacity-50 hover:opacity-100 hover:text-primary-500 text-base w-6 h-5 inline-flex justify-start items-center">
        <svg class="transition-all group-hover:rotate-[360deg] translate-y-[0.06rem] duration-500 { isReRandoming ? 'rotate-[720deg] scale-75' : '' }" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...$$props}><path fill="currentColor" d="M244 56v48a12 12 0 0 1-12 12h-48a12 12 0 1 1 0-24h17.1l-19-17.38c-.13-.12-.26-.24-.38-.37A76 76 0 1 0 127 204h1a75.53 75.53 0 0 0 52.15-20.72a12 12 0 0 1 16.49 17.45A99.45 99.45 0 0 1 128 228h-1.37a100 100 0 1 1 71.88-170.94L220 76.72V56a12 12 0 0 1 24 0"/></svg>
      </button>
    {/if}
  </p>
{/if}