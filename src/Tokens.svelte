<script lang="typescript">
  import type { IToken } from "./state";

  export let list: IToken[] | undefined;
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
        <button>Vandalize</button>
        <img src={t.metadata.image} alt={t.metadata.description} />
      </li>
    {/each}
  </ul>
{/if}
