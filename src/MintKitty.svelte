<script lang="typescript">
  import { ipfsAdd, toGateway } from "./ipfs";
  import type { IToken } from "./state";
  import type { Kitty } from "./typechain";

  export let kitty: Kitty;
  let state = "idle";

  const KITTY_BASE_URL =
    "https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/";

  function randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateKitty() {
    const id = randomInteger(1, 100000);
    return {
      id,
      name: "Kitty #" + id,
      description: "A kitty!",
      image: KITTY_BASE_URL + id + ".png",
    };
  }

  async function handleMint() {
    state = "working";
    const metadata = generateKitty();
    const cid = await ipfsAdd(JSON.stringify(metadata, null, 4));
    const tx = await kitty.mint(toGateway(cid));
    await tx.wait();
    state = "idle";
  }
</script>

<button
  class="button-shadow"
  disabled={state === "working"}
  on:click={() => handleMint()}
>
  <span>
    {#if state === "idle"}
      Mint test Kitty
    {:else}
      Minting, please wait
    {/if}
  </span>
</button>
