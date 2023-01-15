<script lang="ts">
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';

  let show = false

  const randomItems = (arr, count) => arr.concat().reduce((p, _, __, arr) => (p[0] < count ? [p[0] + 1, p[1].concat(arr.splice((Math.random() * arr.length) | 0, 1))] : p), [0, []])[1];

  const greetings = [
    'Plenty of things here especially the smell of morning coffee ☕️',
    'Probably powered by coffee ☕️',
    'Proven not a robot by internet checkboxes',
    'Paradise for light-blue color enjoyer',
    'Primarily in light blue',
    'Personally wrote this randomly picked tagline',
  ]

  const greeting = randomItems(greetings, 1)

  onMount(() => show = true)
</script>

{#if show}
  <p transition:slide class="text-xl opacity-75 mt-2">
    {greeting}
  </p>
{/if}