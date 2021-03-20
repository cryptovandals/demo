import { ethers } from "ethers";
import networkJson from "./typechain/network.json";
import { writable, derived } from "svelte/store";
import {
  Kitty,
  Kitty__factory,
  ERC721,
  CryptoVandals,
  CryptoVandals__factory,
} from "./typechain";

if (localStorage.getItem("autoconnect")) {
  console.log("Autoconnect to wallet");
  connect();
}

interface INetwork {
  [id: string]: {
    Kitty: string;
    CryptoVandals: string;
  };
}

interface INetworkMismatch {
  has: string;
  want: string;
}

export interface IToken {
  id: string;
  contract: ERC721;
  metadata: ITokenMetadata;
}

export interface ITokenMetadata {
  name: string;
  description: string;
  image: string;
}

const NETWORKS = networkJson as INetwork;

export async function connect() {
  let w = window as any;
  let p: ethers.providers.Web3Provider;
  if (w.ethereum !== undefined) {
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

export const wallet = writable<ethers.providers.Web3Provider | undefined>(
  undefined
);
export const chainId = writable<number | undefined>(undefined);
export const address = writable<string | undefined>(undefined);

export const kitty = derived<
  [typeof wallet, typeof chainId],
  Kitty | undefined
>([wallet, chainId], ([$wallet, $chainId], set) => {
  if ($wallet && $chainId) {
    const kittyContract = Kitty__factory.connect(
      NETWORKS[$chainId]["Kitty"],
      $wallet
    );
    set(kittyContract);
  } else {
    set(undefined);
  }
});

export const kittyTokens = derived<
  [typeof kitty, typeof address],
  IToken[] | undefined
>([kitty, address], ([$kitty, $address], set) => {
  if (!$kitty || !$address) {
    return;
  }
  (async () => {
    const buffer: IToken[] = [];
    const balanceOf = (await $kitty.balanceOf($address)).toNumber();
    for (let i = 0; i < balanceOf; i++) {
      const tokenId = await $kitty.tokenOfOwnerByIndex($address, i);
      const tokenUri = await $kitty.tokenURI(tokenId);
      const metadataReq = await fetch(tokenUri);
      const metadata = (await metadataReq.json()) as ITokenMetadata;
      buffer.push({
        id: tokenId.toString(),
        contract: $kitty,
        metadata,
      });
      set(buffer);
    }
  })();
});

export const cryptoVandals = derived<
  [typeof wallet, typeof chainId],
  CryptoVandals | undefined
>([wallet, chainId], ([$wallet, $chainId], set) => {
  if ($wallet && $chainId) {
    const cryptoVandalsContract = CryptoVandals__factory.connect(
      NETWORKS[$chainId]["CryptoVandals"],
      $wallet
    );
    set(cryptoVandalsContract);
  } else {
    set(undefined);
  }
});

export const cryptoVandalsTokens = derived<
  [typeof cryptoVandals, typeof address],
  IToken[] | undefined
>([cryptoVandals, address], ([$cryptoVandals, $address], set) => {
  if (!$cryptoVandals || !$address) {
    return;
  }
  (async () => {
    const buffer: IToken[] = [];
    const balanceOf = (await $cryptoVandals.balanceOf($address)).toNumber();
    for (let i = 0; i < balanceOf; i++) {
      const tokenId = await $cryptoVandals.tokenOfOwnerByIndex($address, i);
      const tokenUri = await $cryptoVandals.tokenURI(tokenId);
      const metadataReq = await fetch(tokenUri);
      const metadata = (await metadataReq.json()) as ITokenMetadata;
      buffer.push({
        id: tokenId.toString(),
        contract: $cryptoVandals,
        metadata,
      });
      set(buffer);
    }
  })();
});
