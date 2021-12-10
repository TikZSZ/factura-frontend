<script lang="ts" setup>
import Products from '@/misc/Products'
import { computed,reactive } from 'vue';

const props = defineProps<{submitData:Partial<Products>,update:(i:number,field:keyof Products,value:any)=>void,index:number}>()

type fields = {
	label: string;
	placeholder: string;
	name: keyof Products;
	type:string,
	required?: boolean
}

const fields: fields[] = [
	{
		name: "product_name",
		label: "Product Name",
		placeholder: "Enter Product Name",
		required: true,
		type:'string'
	},
	{
		name: "price",
		label: "Price",
		placeholder: "Enter Price",
		required: true,
		type:"number"
	},
	{
		name: "tax",
		label: "Tax",
		placeholder: "Tax as %",
		required: false,
		type:"number"
	},
	{
		name: "discount",
		label: "Discount",
		placeholder: "Discount as %",
		required: false,
		type:"number"
	},
	{
		name: "qty",
		label: "Quantity",
		placeholder: "Quantity",
		required: false,
		type: "number",
	},
];

const total = computed<any>(()=>{
	const data = props.submitData as Products
	let val:number = 0
	const sum = (data.qty)*(data.price + data.price*data.tax/100 - data.price*data.discount/100) 
	if(!isNaN(val)){
		val = sum
	}else{
		val = 0
	}
	props.update(props.index,'total',val)
	return val
})
</script>

<template>
	<div class="grid grid-rows-4 grid-cols-2 md:grid-rows-2 md:grid-cols-3 gap-y-3 gap-x-4">
		<div class="col-span-full md:col-span-1" v-for="({ label, name, type,placeholder, required, }) in fields">
			<label class="font-medium text-gray-900">
				{{label}}
				<span v-if="true" class="text-red-500 required-dot">*</span>
			</label>
			<input
				class="
					w-full
					px-4
					py-2
					mt-1
					text-lg
					placeholder-gray-400
					bg-gray-200
					rounded
					focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50
				"
				:placeholder="placeholder"
        :value="submitData[name]"
				@input="(e)=>{
					if(type === 'number'){
						update(index,name,parseInt((e as any).target.value))
					}else{
						update(index,name,(e as any).target.value)
					}
				}"
				:type="type"
			/>
		</div>
		<div>
			<label class="font-medium text-gray-900">
				Total
			</label>
			<input
				type="text"
				class="
					w-full
					px-4
					py-2
					mt-1
					text-lg
					placeholder-gray-400
					bg-gray-200
					rounded
					focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50
				"
				placeholder="Total"
        :value="isNaN(total)?0:total"
				disabled
			/>
		</div>
	</div>
</template>
