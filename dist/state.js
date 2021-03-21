import {ethers} from "../_snowpack/pkg/ethers.js";
import networkJson from "./typechain/network.json.proxy.js";
import {writable, derived} from "../_snowpack/pkg/svelte/store.js";
import {
  Kitty__factory,
  CryptoVandals__factory
} from "./typechain/index.js";
const AddressZero = ethers.constants.AddressZero;
const AddressOne = AddressZero.replace(/.$/, "1");
if (localStorage.getItem("autoconnect")) {
  console.log("Autoconnect to wallet");
  connect();
}
const NETWORKS = networkJson;
export async function connect() {
  let w = window;
  let p;
  if (w.ethereum !== void 0) {
    try {
      await w.ethereum.enable();
    } catch (e) {
      console.log(e);
      throw new Error("Authentication denied");
    }
    p = new ethers.providers.Web3Provider(w.ethereum);
  } else {
    throw new Error("No Web3 provider available");
  }
  wallet.set(p);
  chainId.set((await p.getNetwork()).chainId);
  address.set((await p.listAccounts())[0]);
  localStorage.setItem("autoconnect", "true");
  return p;
}
export const wallet = writable(void 0);
export const chainId = writable(void 0);
export const address = writable(void 0);
export const kitty = derived([wallet, chainId], ([$wallet, $chainId], set) => {
  if ($wallet && $chainId) {
    const kittyContract = Kitty__factory.connect(NETWORKS[$chainId]["Kitty"], $wallet.getSigner());
    set(kittyContract);
  } else {
    set(void 0);
  }
});
export const kittyTokens = derived([kitty, address], ([$kitty, $address], set) => {
  if (!$kitty || !$address) {
    return;
  }
  (async () => {
    let buffer = [];
    async function load(tokenId) {
      const tokenUri = await $kitty.tokenURI(tokenId);
      const metadataReq = await fetch(tokenUri);
      const metadata = await metadataReq.json();
      buffer.push({
        id: tokenId.toString(),
        uri: tokenUri,
        contract: $kitty,
        metadata
      });
      set(buffer);
    }
    const balanceOf = (await $kitty.balanceOf($address)).toNumber();
    for (let i = 0; i < balanceOf; i++) {
      const tokenId = await $kitty.tokenOfOwnerByIndex($address, i);
      load(tokenId);
    }
    const filterMint = $kitty.filters.Transfer(AddressZero, $address, null);
    $kitty.on(filterMint, function(from, to, tokenId) {
      load(tokenId);
    });
    const filterBurn = $kitty.filters.Transfer($address, AddressOne, null);
    $kitty.on(filterBurn, function(from, to, tokenId) {
      buffer = buffer.filter((token) => token.id !== tokenId.toString());
      set(buffer);
    });
  })();
  return () => {
    $kitty.removeAllListeners();
  };
});
export const cryptoVandals = derived([wallet, chainId], ([$wallet, $chainId], set) => {
  if ($wallet && $chainId) {
    const cryptoVandalsContract = CryptoVandals__factory.connect(NETWORKS[$chainId]["CryptoVandals"], $wallet.getSigner());
    set(cryptoVandalsContract);
  } else {
    set(void 0);
  }
});
export const cryptoVandalsTokens = derived([cryptoVandals, address], ([$cryptoVandals, $address], set) => {
  if (!$cryptoVandals || !$address) {
    return;
  }
  (async () => {
    let buffer = [];
    async function load(tokenId) {
      const tokenUri = await $cryptoVandals.tokenURI(tokenId);
      const metadataReq = await fetch(tokenUri);
      const metadata = await metadataReq.json();
      buffer.push({
        id: tokenId.toString(),
        uri: tokenUri,
        contract: $cryptoVandals,
        metadata
      });
      set(buffer);
    }
    const balanceOf = (await $cryptoVandals.balanceOf($address)).toNumber();
    for (let i = 0; i < balanceOf; i++) {
      const tokenId = await $cryptoVandals.tokenOfOwnerByIndex($address, i);
      load(tokenId);
    }
    const filterMint = $cryptoVandals.filters.Transfer(AddressZero, $address, null);
    $cryptoVandals.on(filterMint, function(from, to, tokenId) {
      load(tokenId);
    });
    const filterBurn = $cryptoVandals.filters.Transfer($address, AddressOne, null);
    $cryptoVandals.on(filterBurn, function(from, to, tokenId) {
      buffer = buffer.filter((token) => token.id !== tokenId.toString());
      set(buffer);
    });
  })();
});
