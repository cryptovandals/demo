import {Contract} from "../../../_snowpack/pkg/ethers.js";
export class IERC165__factory {
  static connect(address, signerOrProvider) {
    return new Contract(address, _abi, signerOrProvider);
  }
}
const _abi = [
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4"
      }
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];
