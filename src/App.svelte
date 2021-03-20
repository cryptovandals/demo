<script lang="typescript">
  import { ethers } from "ethers";
  import { onMount } from "svelte";
  import IpfsHttpClientLite from "ipfs-http-client-lite";

  const ipfs = IpfsHttpClientLite("https://ipfs.infura.io:5001");
  const p = new ethers.providers.InfuraProvider(
    "rinkeby",
    "989ce0643d4342db9307f6d3d7c4daaa"
  );
  const ipfsPath = "QmYKVXgkqbvvQ2oWvciA838jmbCpLGGQbrAfRBjneDUWXn";

  onMount(async () => {
    const b = await ipfs.cat(ipfsPath);
    console.info(b);
  });
</script>

<style>
  :global(body) {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
  }
</style>

<div class="App">
  {#await p.getBlockNumber() then n}
    {n}
  {/await}
</div>
