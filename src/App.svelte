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

<style>
  h1 {
    display: none;
  }
  img {
    width: 100%;
  }
  section {
    text-align: center;
  }
</style>

{#if !$address}
  <div class="fullpage">
    <section>
      <h1>CryptoVandals</h1>
      <img src="./images/header.png" alt="CryptoVandals logo" />
      <button class="button-shadow" on:click={connect}
        ><span>Connect your wallet</span></button
      >
      <br />
      <a href="https://github.com/cryptovandals/contracts"
        >About CryptoVandals</a
      >
    </section>
  </div>
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
