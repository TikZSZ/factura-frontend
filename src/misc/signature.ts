import { PrivateKey } from "@hashgraph/sdk";

const toHexString = (bytes: Uint8Array) =>
bytes.reduce((str: string, byte: number) => str + byte.toString(16).padStart(2, "0"), "");


export default  function signature<T>(privateKey:string,data:string){
  const pKey = PrivateKey.fromString(privateKey);
	const msg = new TextEncoder().encode(data);
	const signature = pKey.sign(msg);
  return {UInt8Signature:signature,hexSignature:toHexString(signature)}
}