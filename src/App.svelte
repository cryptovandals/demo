<script lang="typescript">
  import { onMount } from "svelte";
  import { cat } from "./ipfs";
  import MintKitty from "./MintKitty.svelte";
  import {
    connect,
    address,
    kittyTokens,
    cryptoVandalsTokens,
    cryptoVandals,
    kitty,
  } from "./state";
  import Tokens from "./Tokens.svelte";
</script>

{#if !$address}
  <button on:click={connect}>Connect</button>
{:else}
  Your address: {$address}

  {#if $cryptoVandals && $kitty}
    <h2>Kitty contract</h2>
    <MintKitty kitty={$kitty} />
    <Tokens list={$kittyTokens} vandalizer={$cryptoVandals} />

    <h2>CryptoVandals contract</h2>
    <Tokens list={$cryptoVandalsTokens} vandalizer={$cryptoVandals} />
  {/if}
{/if}
