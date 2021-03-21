<script lang="typescript">
  import Vandalize from "./Vandalize.svelte";
  import type { IToken } from "./state";
  import type { CryptoVandals } from "./typechain";

  export let list: IToken[] | undefined;
  export let vandalizer: CryptoVandals;

  let fromToken: IToken | undefined;
</script>

<style>
  ul {
    display: flex;
    margin: 0;
    padding: 0;
  }

  li {
    max-width: 300px;
    list-style-type: none;
  }

  .token {
    border: 1px solid #ccc;
    border-radius: var(--size-xxs);
    margin: 0 var(--size-s);
  }

  .token .footer {
    border-top: 1px solid #ccc;
  }

  .token .header {
    background-color: hotpink;
  }
  .token .header,
  .token .body,
  .token .footer {
    padding: var(--size-s);
  }
  img {
    display: block;
    width: 100%;
  }
  .vandalizer {
    margin-top: var(--size-xl);
  }
</style>

{#if list}
  <ul>
    {#each list as t}
      <li class="token">
        <div class="header">
          {t.metadata.name}
        </div>
        <div class="body">
          <img src={t.metadata.image} alt={t.metadata.description} />
        </div>
        <div class="footer">
          <button on:click={() => (fromToken = t)}>Select</button>
        </div>
      </li>
    {/each}
  </ul>
{/if}

{#if fromToken}
  <div class="vandalizer">
    <Vandalize
      {vandalizer}
      {fromToken}
      onClose={() => {
        fromToken = undefined;
      }}
    />
  </div>
{/if}
