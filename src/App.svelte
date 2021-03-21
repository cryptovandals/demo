<script lang="typescript">
  import Connect from "./Connect.svelte";
  import MintKitty from "./MintKitty.svelte";
  import {
    address,
    kittyTokens,
    cryptoVandalsTokens,
    cryptoVandals,
    kitty,
    chainId,
  } from "./state";
  import Tokens from "./Tokens.svelte";
</script>

<style>
  .marquee {
    font-weight: bold;
    font-style: italic;
    font-size: var(--size-m);
    margin-bottom: var(--size-m);
  }
</style>

{#if $chainId && $chainId !== 42}
  <p class="note level-error">
    Please connect your wallet to the Kovan test network.
  </p>
{/if}
{#if !$address}
  <Connect />
{:else}
  <div class="marquee">
    <div class="marquee__inner">
      <span
        >Welcome to CryptoVandals.com, you can be anything you want at
        CryptoVandals.com</span
      >
      <span
        >Welcome to CryptoVandals.com, you can be anything you want at
        CryptoVandals.com</span
      >
      <span
        >Welcome to CryptoVandals.com, you can be anything you want at
        CryptoVandals.com</span
      >
    </div>
  </div>
  <section>
    Your address: {$address}

    {#if $cryptoVandals && $kitty}
      {#if $kittyTokens && $kittyTokens.length === 0}
        <p class="note level-warning">
          You have no NFTs. Try creating a test NFT so you can vandalize it.
          <MintKitty kitty={$kitty} />
        </p>
      {:else}
        <h2>
          Test NFT: Kitty contract
          <MintKitty kitty={$kitty} />
        </h2>
        <Tokens list={$kittyTokens} vandalizer={$cryptoVandals} />
      {/if}

      <h2>CryptoVandals contract</h2>
      <Tokens list={$cryptoVandalsTokens} vandalizer={$cryptoVandals} />
    {/if}
  </section>
{/if}
