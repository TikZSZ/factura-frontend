import Products from '@/misc/Products'
import { reactive ,ref} from 'vue'

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

  function update(i:number,field:keyof Products,value:any){
    submitData.products[i][field] = value
  }

  return {fields,submitData,update}
}