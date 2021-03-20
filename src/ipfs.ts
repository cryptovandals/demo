// This module is basically a shim because after years using IPFS and JS I'm
// still not able to import `ipfs-http-client` properly.

//const ipfs = (window as any).IpfsHttpClient("https://ipfs.infura.io:5001");
const ipfs = (window as any).IpfsHttpClient("http://localhost:5001");

export async function cat(ipfsPath: string) {
  for await (const chunk of ipfs.cat(ipfsPath)) {
    console.info(chunk);
  }
}
