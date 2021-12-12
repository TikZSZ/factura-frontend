import { PrivateKey } from "@hashgraph/sdk";
import hex from "@/misc/hex"
import hash from "object-hash"
const toHexString = (bytes: Uint8Array) =>
bytes.reduce((str: string, byte: number) => str + byte.toString(16).padStart(2, "0"), "");


export default  function signature<T>(privateKey:string,data:string|object){
  const pKey = PrivateKey.fromString(privateKey);
	//const msg = new TextEncoder().encode(data);
  let msg:string
  if(typeof data === 'string') msg = data
  else msg = hash(data)
	const UInt8Msg = new TextEncoder().encode(msg);
	const signature = pKey.sign(UInt8Msg);
  return {UInt8Signature:signature,hexSignature:hex.encode(signature)}
}