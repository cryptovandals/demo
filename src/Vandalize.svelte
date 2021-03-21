<script lang="typescript">
  import { ipfsAdd, toGateway } from "./ipfs";

  import type { IToken } from "./state";
  import type { CryptoVandals } from "./typechain";

  export let fromToken: IToken;
  export let vandalizer: CryptoVandals;
  export let onClose: () => void;

  let logs: string[] = [];
  let imageElement: HTMLImageElement;
  let uploadElement: HTMLInputElement;
  let state = "idle";

  function log(s: string) {
    console.log(s);
    logs = [...logs, s];
  }

  async function handleLiberate() {
    state = "working";
    log(`Get original image from ${fromToken.metadata.image}`);
    const imageReq = await fetch(fromToken.metadata.image);
    const image = await imageReq.blob();
    await handleVandalize(image);
    state = "done";
  }

  async function handleVandalize(image: ArrayBuffer | Blob) {
    let size: number;
    if (image instanceof ArrayBuffer) {
      size = image.byteLength;
    } else {
      size = image.size;
    }
    log(`Got image, size ${size} bytes`);
    const cid = await ipfsAdd(image);
    log(`Image uploaded to IPFS, CID ${cid}`);
    log(`Making metadata PERMANENT!)`);
    const metadata = {
      ...fromToken.metadata,
      image: toGateway(cid),
    };
    log(`New metadata`);
    log(JSON.stringify(metadata, null, 4));
    const metadataCid = await ipfsAdd(JSON.stringify(metadata, null, 4));
    log(`Metadata uploaded to IPFS, CID ${metadataCid}`);

    log("Ask our valued customer to sign the approve tx");
    const approveTx = await fromToken.contract.approve(
      vandalizer.address,
      fromToken.id
    );
    log(`Approve tx hash ${approveTx.hash}`);
    const approveReceipt = await approveTx.wait();
    log(`Tx included in block ${approveReceipt.blockNumber}`);
    log(
      `${fromToken.contract.address}, ${fromToken.id}, ${toGateway(
        metadataCid
      )}`
    );
    await vandalizer.vandalize(
      fromToken.contract.address,
      fromToken.id,
      toGateway(metadataCid)
    );
  }

  async function handleUpload() {
    state = "working";
    if (!uploadElement.files) {
      return;
    }
    const fileReaderDataUrl = new FileReader();
    const fileReaderBinary = new FileReader();
    const [file] = uploadElement.files;

    fileReaderDataUrl.onload = () => {
      imageElement.src = fileReaderDataUrl.result as string;
    };
    fileReaderDataUrl.readAsDataURL(file);
    fileReaderBinary.onload = async () => {
      try {
        await handleVandalize(fileReaderBinary.result as ArrayBuffer);
      } catch (e) {
        console.error(e);
        throw e;
      }
    };
    fileReaderBinary.readAsArrayBuffer(file);
    state = "done";
  }
</script>

<style>
  div {
  }

  img {
    width: 100%;
  }
  .token {
    border: 1px solid #ccc;
    border-radius: var(--size-xxs);
    margin: 0 var(--size-s);
  }

  .token .log {
    border-bottom: 1px solid #ccc;
  }

  .token .header {
    background-color: hotpink;
  }
  .token .header,
  .token .body,
  .token .log {
    padding: var(--size-s);
  }
</style>

<div class="token">
  <div class="header">
    <h2>{fromToken.metadata.name}</h2>
    <button on:click={() => onClose()}>Close</button>
    <code>Token URI: {fromToken.uri}</code>
    <pre>{JSON.stringify(fromToken.metadata, null, 4)}</pre>
  </div>
  <div class="header">
    {#if state === "idle"}
      <button on:click={() => handleLiberate()}>Liberate</button>
      <input
        bind:this={uploadElement}
        type="file"
        id="image-file"
        name="image"
        on:change={(e) => handleUpload()}
      />
      <label for="image-file">Vandalize</label>
    {:else}
      Working, please wait...
    {/if}
  </div>
  <div class="log">
    <pre>{logs.join('\n')}</pre>
  </div>
  {#if state === "done"}
    <p class="note level-success">
      Operation completed successfully! <button on:click={() => onClose()}
        >Close</button
      >
    </p>
  {/if}
  <div class="body">
    <img
      bind:this={imageElement}
      src={fromToken.metadata.image}
      alt={fromToken.metadata.description}
    />
  </div>
</div>
