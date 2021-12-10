import {defineStore} from "pinia"
import { Router } from "vue-router";
import { PrivateKey } from "@hashgraph/sdk";
import api from "@/misc/api";

export const useStore = defineStore("main",{
  state:()=>({
    isMobile:false,
    accountId:null as string|null,
    name:null as string|null,
    currentTab:"Stores",
    currentPath:'/home'
  }),
  actions:{
    async logOut(){
      await api.get("/api/logout")
      this.name = null;
      this.accountId = null;
    },
    logIn(data:{accountId:string,name:string},router?:Router){
      this.name = data.name;
      this.accountId = data.accountId;
      router?.push("/home")
    },
    async submitLogin(submitData:{privateKey:string,accountId:string},router:Router){
      const msg = new TextEncoder().encode("bills")
      const signature = PrivateKey.fromString(submitData.privateKey).sign(msg)
      const toHexString = (bytes:Uint8Array) => bytes.reduce((str:string, byte:number) => str + byte.toString(16).padStart(2, '0'), '');
      const {data} = await api.post<{userAccountId:string,name:string}>("/api/loginUser",{
        data:{
          userAccountId:submitData.accountId,
          signature:toHexString(signature)
        }
      })
      this.logIn({accountId:data.userAccountId,name:data.name},router)
    },
    async checkAuth(){
      try{
        const {data} = await api.get<{userAccountId:string,name:string}>("/api/currentUser")
        this.logIn({accountId:data.userAccountId,name:data.name})
      }catch(err){
        return null
      }
      return null
    },
    async navDash(tabName:string,router:Router){
      this.currentTab = tabName,
      router.push({name:this.currentTab})
    }
  },

})
