<script lang="typescript">
  import { onMount } from "svelte";
  import { cat } from "./ipfs";
  import { connect, address, kittyTokens } from "./state";
  import Tokens from "./Tokens.svelte";

  const ipfsPath = "QmYKVXgkqbvvQ2oWvciA838jmbCpLGGQbrAfRBjneDUWXn";

  onMount(async () => {
    cat(ipfsPath);
  });
</script>

{#if !$address}
  <button on:click={connect}>Connect</button>
{:else}
  Your address: {$address}

  <Tokens list={$kittyTokens} />
{/if}
