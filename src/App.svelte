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
    margin-bottom: 0;
  }
  .links {
    text-align: center;
    font-weight: bold;
    margin-top: 0;
    margin-bottom: var(--size-xl);
    background-color: black;
    color: white;
    padding: var(--size-m) var(--size-s);
    display: flex;
    justify-content: space-around;
  }
  .links a {
    display: inline-block;
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
  <p class="links">
    <a href="https://github.com/cryptovandals/contracts/blob/main/MANIFESTO.md"
      >CryptoVandals MANIFESTO</a
    >
    <a href="https://github.com/cryptovandals/demo">Dapp code</a>
    <a href="https://github.com/cryptovandals/contracts">Contract code</a>
    <a href="https://twitter.com/cryptovandals">Twitter</a>
  </p>

  <section>
    <p>
      Your address: {$address}
    </p>

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
