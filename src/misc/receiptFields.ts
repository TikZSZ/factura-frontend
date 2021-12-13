import Products from '@/misc/Products'
import { reactive } from 'vue'
import useVuelidate from "@vuelidate/core";
import { required,integer } from "@vuelidate/validators";
import { validAccountId } from "@/misc/validUserAccID";

export default function useFields(){


  type fields = 'storeId' | 'buyerId' | 'products'
  
  type SubmitData = {
    [key in fields]: key extends "products" ? Partial<Products>[] : string
  }

  const submitData: SubmitData = reactive({
    storeId: "",
    buyerId: "",
    products:[
      {
        seq:0,
        qty:1,
        tax:0,
        discount:0
      }
    ]
  })

  const fields: { label: string, placeholder: string, name: fields, required: boolean }[] = [
    {
      label: "Store ID",
      placeholder: 'Enter Store ID',
      name: "storeId",
      required: true
    },
    {
      label: "Buyer ID",
      placeholder: 'Enter Buyer Account ID',
      name: "buyerId",
      required: true
    }
  ]

  const rules:{[key in keyof typeof submitData]:any} = {
    storeId:{required,integer},
    buyerId:validAccountId,
    products:{}
  }
  
  const v$ = useVuelidate(rules,submitData)

  function update(i:number,field:keyof Products,value:any){
    submitData.products[i][field] = value
  }
  
  function addProduct(){
    submitData.products.push({
      seq:submitData.products.length,
      qty:1,
      tax:0,
      discount:0
    })
  }

  function removeProducts(index:number){
    submitData.products.splice(index,1)
  }
  return {fields,submitData,update,addProduct,removeProducts,v$}
}