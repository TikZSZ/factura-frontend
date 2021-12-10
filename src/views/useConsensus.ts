import { useStore } from "@/store";
import { Client,PrivateKey, TopicMessageSubmitTransaction } from "@hashgraph/sdk";

const topicId = "0.0.16430783"

export async function sendToConsensus<T>(msg:T extends Uint8Array?Uint8Array:string,privateKey:string){
  const store = useStore()
  const pKey = PrivateKey.fromString(privateKey)
  if(!store.accountId) return
  const client = Client.forTestnet().setOperator(store.accountId,pKey)
  const submitTxnResp = await new TopicMessageSubmitTransaction({
    topicId: topicId,
    message: msg,
  }).execute(client);
  const msgReceipt = (await submitTxnResp.getRecord(client))
  return msgReceipt
}