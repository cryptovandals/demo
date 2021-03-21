const IpfsHttpClient = window.IpfsHttpClient;
const ipfs = IpfsHttpClient("https://ipfs.infura.io:5001");
export async function cat(ipfsPath) {
  for await (const chunk of ipfs.cat(ipfsPath)) {
    console.info(chunk);
  }
}
export async function ipfsAdd(content) {
  const {path} = await ipfs.add(content);
  return path;
}
export function toGateway(cid) {
  return "https://ipfs.infura.io/ipfs/" + cid;
}
