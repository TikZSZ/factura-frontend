import { onClickOutside,MaybeElementRef } from "@vueuse/core";
import { Ref } from "vue";

export function useClickOutside(el:MaybeElementRef,val:Function){
  onClickOutside(el,()=>{
    val()
  })
}