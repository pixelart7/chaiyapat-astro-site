<script>
  export let obfuscatedEmail;
</script>

<span class="text-gray-600 mr-2 font-light inline-block w-16 md:w-auto" aria-hidden="true">email.</span>
<span class="sr-only">E-mail: </span>
<span class="font-medium">{atob(obfuscatedEmail)}</span>