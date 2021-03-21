import { BigNumber, BigNumberish, ethers } from "ethers";
import networkJson from "./typechain/network.json";
import { writable, derived } from "svelte/store";
import {
  Kitty,
  Kitty__factory,
  ERC721,
  CryptoVandals,
  CryptoVandals__factory,
} from "./typechain";

const AddressZero = ethers.constants.AddressZero;
const AddressOne = AddressZero.replace(/.$/, "1");

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
  uri: string;
  contract: ERC721;
  metadata: ITokenMetadata;
}

export interface ITokenMetadata {
  id: string;
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
      $wallet.getSigner()
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
    let buffer: IToken[] = [];

    async function load(tokenId: BigNumberish) {
      const tokenUri = await $kitty!.tokenURI(tokenId);
      const metadataReq = await fetch(tokenUri);
      const metadata = (await metadataReq.json()) as ITokenMetadata;
      buffer.push({
        id: tokenId.toString(),
        uri: tokenUri,
        contract: $kitty!,
        metadata,
      });
      set(buffer);
    }

    const balanceOf = (await $kitty.balanceOf($address)).toNumber();
    for (let i = 0; i < balanceOf; i++) {
      const tokenId = await $kitty.tokenOfOwnerByIndex($address, i);
      load(tokenId);
    }
    const filterMint = $kitty.filters.Transfer(AddressZero, $address, null);
    $kitty.on(filterMint, function (from, to, tokenId) {
      load(tokenId);
    });
    const filterBurn = $kitty.filters.Transfer($address, AddressOne, null);
    $kitty.on(filterBurn, function (from, to, tokenId) {
      buffer = buffer.filter((token) => token.id !== tokenId.toString());
      set(buffer);
    });
  })();
  return () => {
    $kitty.removeAllListeners();
  };
});

export const cryptoVandals = derived<
  [typeof wallet, typeof chainId],
  CryptoVandals | undefined
>([wallet, chainId], ([$wallet, $chainId], set) => {
  if ($wallet && $chainId) {
    const cryptoVandalsContract = CryptoVandals__factory.connect(
      NETWORKS[$chainId]["CryptoVandals"],
      $wallet.getSigner()
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
    let buffer: IToken[] = [];
    async function load(tokenId: BigNumberish) {
      const tokenUri = await $cryptoVandals!.tokenURI(tokenId);
      const metadataReq = await fetch(tokenUri);
      const metadata = (await metadataReq.json()) as ITokenMetadata;
      buffer.push({
        id: tokenId.toString(),
        uri: tokenUri,
        contract: $cryptoVandals!,
        metadata,
      });
      set(buffer);
    }
    const balanceOf = (await $cryptoVandals.balanceOf($address)).toNumber();
    for (let i = 0; i < balanceOf; i++) {
      const tokenId = await $cryptoVandals.tokenOfOwnerByIndex($address, i);
      load(tokenId);
    }
    const filterMint = $cryptoVandals.filters.Transfer(
      AddressZero,
      $address,
      null
    );
    $cryptoVandals.on(filterMint, function (from, to, tokenId) {
      load(tokenId);
    });
    const filterBurn = $cryptoVandals.filters.Transfer(
      $address,
      AddressOne,
      null
    );
    $cryptoVandals.on(filterBurn, function (from, to, tokenId) {
      buffer = buffer.filter((token) => token.id !== tokenId.toString());
      set(buffer);
    });
  })();
});
