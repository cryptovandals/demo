// This module is basically a shim because after years using IPFS and JS I'm
// still not able to import `ipfs-http-client` properly.

const IpfsHttpClient = (window as any).IpfsHttpClient;
//const ipfs = IpfsHttpClient("http://localhost:5001");
const ipfs = IpfsHttpClient("https://ipfs.infura.io:5001");

export async function cat(ipfsPath: string) {
  for await (const chunk of ipfs.cat(ipfsPath)) {
    console.info(chunk);
  }
}

export async function ipfsAdd(content: any): Promise<string> {
  const { path } = await ipfs.add(content);
  return path;
}

export function toGateway(cid: string) {
  //return "http://localhost:8080/ipfs/" + cid;
  return "https://ipfs.infura.io/ipfs/" + cid;
}
