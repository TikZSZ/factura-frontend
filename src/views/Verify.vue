<script lang="ts" setup>
import { PublicKey } from "@hashgraph/sdk";
import axios from "axios";
import { ref, reactive } from "vue";
import hex from "../misc/hex";
import useVuelidate from "@vuelidate/core";
import { required, integer, minLength, helpers } from "@vuelidate/validators";
import hash from "object-hash";
import InputError from "@/components/InputError.vue";
import ButtonSpinnerVue from "@/components/ButtonSpinner.vue";
import { validKey } from "@/misc/validKey";


const disabled = ref(false)

const submitData = reactive({
	sequenceNumber: "",
	signature: "",
	publicKey: "",
});

const rules = {
	sequenceNumber: { required, integer },
	signature: {
		required,
		length: helpers.withMessage("Signature should be of 128 characters long", (value: string) => value.length===0?true:value.length === 128),
	},
	publicKey: validKey(88),
};

const v$ = useVuelidate(rules, submitData);

interface ConsensusResponse {
	consensus_timestamp: string;
	topic_id: string;
	message: string;
	running_hash: string;
	running_hash_version: number;
	sequence_number: number;
}

interface ConsensusMessage {
	receipt: Receipt;
	signature: string;
}

interface Receipt {
	storeId: number;
	buyerId: string;
	products: Product[];
	time: string;
}

interface Product {
	seq: number;
	qty: number;
	tax: number;
	discount: number;
	total: number;
	product_name: string;
	price: number;
}

const receipt = ref<null | ConsensusMessage>(null);
const receiptHash = ref<string | null>(null);
const receiptSignature = ref<string | null>(null);
const result = ref<null | string | boolean>(false);

const submit = async () => {
	const isValid = await v$.value.$validate();
	if (!isValid) return;
  disabled.value = true
  try{
    receipt.value = null
    const { data } = await axios.get<ConsensusResponse>(
        `https://testnet.mirrornode.hedera.com/api/v1/topics/0.0.16430783/messages/${submitData.sequenceNumber}`
      );
    const msg = JSON.parse(atob(data.message)) as ConsensusMessage;
    receipt.value = msg;
    receiptHash.value = hash(msg.receipt);
    receiptSignature.value = msg.signature;
    const msgHash = new TextEncoder().encode(hash(msg.receipt));
    const sig = hex.decode(submitData.signature);
    console.log(PublicKey.fromString(submitData.publicKey).verify(msgHash, sig));
    result.value = PublicKey.fromString(submitData.publicKey).verify(msgHash, sig);
    disabled.value = false
  }catch(err){
    console.log(err);
    disabled.value = false
  }
};
</script>

<template>
	<div class="h-screen">
		<form @submit.prevent="submit" class="relative mx-auto w-full mt-10 space-y-4 px-4 md:px-16 lg:container">
			<div class="relative">
				<label class="font-medium text-gray-900">
					Sequence Number
					<span class="text-red-500 required-dot">*</span>
				</label>
				<input
					type="text"
					class="
						block
						w-full
						px-4
						py-2
						mt-2
						text-xl
						placeholder-gray-400
						bg-gray-200
						rounded-lg
						focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50
					"
					v-model="v$.sequenceNumber.$model"
					placeholder="Enter sequence number of transcation, can be found on invoice"
				/>
				<InputError :errors="v$.sequenceNumber.$errors" />
			</div>
			<div class="relative">
				<label class="font-medium text-gray-900">
					Signature
					<span class="text-red-500 required-dot">*</span>
				</label>
				<input
					type="text"
					class="
						block
						w-full
						px-4
						py-2
						mt-2
						text-xl
						placeholder-gray-400
						bg-gray-200
						rounded-lg
						focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50
					"
					v-model="v$.signature.$model"
					placeholder="Enter signature, can be found on invoice"
				/>
				<InputError :errors="v$.signature.$errors" />
			</div>
			<div class="relative">
				<label class="font-medium text-gray-900">
					Public Key
					<span class="text-red-500 required-dot">*</span>
				</label>
				<input
					type="text"
					class="
						block
						w-full
						px-4
						py-2
						mt-2
						text-xl
						placeholder-gray-400
						bg-gray-200
						rounded-lg
						focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50
					"
					v-model="v$.publicKey.$model"
					placeholder="Enter Seller public key, can be found on invoice"
				/>
				<InputError :errors="v$.publicKey.$errors" />
			</div>
			<!-- Submit Button -->
			<div class="relative">
				<button
					href="#_"
					class="
						inline-block
						w-full
						py-2
						text-lg
						font-medium
						text-center text-white
						transition
						duration-200
						bg-blue-600
						rounded-2xl
						hover:bg-blue-700
						ease
					"
          
				>
					<div v-if="!disabled">
            Verify
          </div>
          <ButtonSpinnerVue v-else />
				</button>
			</div>
		</form>
		<div v-if="receipt" class="mx-auto w-3/4 space-y-4 mt-10 border-2 p-2 rounded-3xl relative pb-16">
			<div class="break-all">
				<span class="text-gray-600 font-medium"
					>Consensus Service Data For Sequence Number {{ submitData.sequenceNumber }} :
				</span>
				<div v-for="(value, key) of receipt.receipt" :key="key">
					<div v-if="key !== 'products'">
						<span class="text-gray-500">{{ key }}</span
						>: {{ value }}
					</div>
					<div v-else>
						Products:
						<div class="ml-20" v-for="(product,i) of value as Product[]">
							{{ i }}:
							<div v-for="(v, k, index) of product" class="ml-2">
								<span class="text-gray-500">{{ k }}</span
								>: {{ v }}
							</div>
						</div>
					</div>
				</div>
			</div>
			<p class="break-all"><span class="text-gray-500">Receipt Hash:</span> {{ receiptHash }}</p>
			<p class="break-all"><span class="text-gray-500">Receipt Signature:</span> {{ receiptSignature }}</p>
			<div
				class="absolute left-0 bottom-0 h-10 pt-2 w-full text-white my-auto px-10 mx-auto rounded-b-3xl"
				:class="result ? 'bg-indigo-600' : 'bg-red-500'"
			>
				{{ result ? "Signature Matched" : "Signature didn't match" }}
			</div>
		</div>
	</div>
</template>
