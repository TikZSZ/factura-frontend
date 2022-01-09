import { PrivateKey } from "@hashgraph/sdk";
import { AxiosInstance } from "axios";
import api from "./api";
import signature from "./signature";

class Server {
  constructor(private api:AxiosInstance){}

  static get instance() {
    return this
  }

  async login(submitData:{privateKey:string,accountId:string},msgToSign:string){
    const {hexSignature} = signature(submitData.privateKey,msgToSign)
    const { data } = await api.post<{ userAccountId: string; name: string }>("/api/loginUser", {
      data: {
        userAccountId: submitData.accountId,
        signature: hexSignature,
      },
    });
    return data
  }

  async signUp<T,K = { userAccountId: string; name: string; public_key: string }>
  (privateKey:string,msgToSign:string,submitData:T){
    const { hexSignature } = signature(privateKey, msgToSign)
    const { data } = await api.post<K>("/api/createUser", {
    data: {
      ...submitData,
      signature: hexSignature,
    },
    });
    return data
  }

  async logOut(){
    return await api.get("/api/logout");
  }
}

let server:Server|null

export function client(api?:AxiosInstance){
  if(!api) 
    if(!server) throw new Error("")
    else return server
  server = new Server(api)
  return server
}
