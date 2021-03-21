<script lang="typescript">
  import { ipfsAdd, toGateway } from "./ipfs";

  import type { IToken } from "./state";
  import type { CryptoVandals, ERC721 } from "./typechain";

  export let fromToken: IToken;
  export let vandalizer: CryptoVandals;

  let logs: string[] = [];

  function log(s: string) {
    console.log(s);
    logs = [...logs, s];
  }

  async function handleLiberate() {
    log(`Stealing original image from ${fromToken.metadata.image}`);
    const imageReq = await fetch(fromToken.metadata.image);
    const image = await imageReq.blob();
    log(`Original image is ${image.size} bytes`);
    const cid = await ipfsAdd(image);
    log(`Image uploaded to IPFS, CID ${cid}`);
    log(`Making metadata PERMANENT! (remember: dolphins)`);
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

  async function handleVandalize() {
    await fromToken.contract.approve(vandalizer.address, fromToken.id);
    //await vandalizer.vandalize(contract.address, id, tokenURI);
  }
</script>

<style>
  div {
    background-color: gray;
  }

  img {
    width: 100%;
  }
</style>

<div>
  <div class="metadata">
    <h2>{fromToken.metadata.name}</h2>
    <code>Token URI: {fromToken.uri}</code>
    <pre>{JSON.stringify(fromToken.metadata, null, 4)}</pre>
  </div>
  <button on:click={() => handleLiberate()}>Liberate</button>
  <button on:click={() => handleVandalize()}>Vandalize</button>
  <img src={fromToken.metadata.image} alt={fromToken.metadata.description} />
  <pre>{logs.join('\n')}</pre>
</div>
