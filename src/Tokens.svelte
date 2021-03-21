<script lang="typescript">
  import Vandalize from "./Vandalize.svelte";
  import type { IToken } from "./state";
  import type { CryptoVandals } from "./typechain";

  export let list: IToken[] | undefined;
  export let vandalizer: CryptoVandals;

  let fromToken: IToken;
</script>

<style>
  ul {
    display: flex;
    margin: 0;
    padding: 0;
  }

  li {
    list-style-type: none;
  }

  .token {
    max-width: 300px;
  }

  img {
    display: block;
    width: 100%;
  }
</style>

{#if list}
  <ul>
    {#each list as t}
      <li class="token">
        {t.metadata.name}
        <button on:click={() => (fromToken = t)}>Select</button>
        <img src={t.metadata.image} alt={t.metadata.description} />
      </li>
    {/each}
  </ul>
{/if}

{#if fromToken}
  <Vandalize {vandalizer} {fromToken} />
{/if}
