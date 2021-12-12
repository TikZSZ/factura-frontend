<script lang="ts" setup>
import api from "@/misc/api";
import { ref } from "vue";
import {useStore } from "@/store"
import {toRefs} from "vue"
import { useRouter } from "vue-router";
import Loading from "@/components/Loading.vue";

const stores = ref<Store[]|null>(null);
const router = useRouter()
const {navDash} = toRefs(useStore())

interface Store {
	store_id: number;
	store_name: string;
	country: string;
	phone_number: number;
	address: string;
	website: string;
	status: string;
	timeRegistred: string;
	seller_id: string;
	signature: string;
	sequence_no: number;
	timestamp: string;
}

const d = (async () => {
	const { data } = await api.get<Store[]>("/api/getAllStores");
	stores.value = data;
})();

const getTime = (time:string) => {
  const t = new Date(time).toString().split(" ")
  return t.slice(0,5).join(' ')
}

</script>

Prisma
<template>
	<div class="mx-auto w-full">
		<Loading v-if="!stores" />
		<div v-if="stores && stores.length === 0" class="bg-white min-h-screen dark:bg-gray-800">
			<div
				class="lg:flex lg:items-center lg:justify-between w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20"
			>
				<h2 class="text-3xl  font-extrabold text-black dark:text-white sm:text-4xl">
					<span class="block">Want to sell ?</span>
					<span class="block text-indigo-500">Create a store to get started!</span>
				</h2>
				<div class="lg:mt-0  lg:flex-shrink-0">
					<div class="inline-flex mt-20 rounded-md shadow">
						<router-link
							:to="{name:'CreateStore'}"
							class="py-4 px-6 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
						>Get started</router-link>
					</div>
				</div>
			</div>
		</div>

		<div v-else-if="stores && stores.length>0" class="container min-h-screen lg:mt-9 px-4 mx-auto sm:px-8">
			<div class="py-8">
				<div class="flex flex-row mb-1 sm:mb-0 justify-between w-full">
					<h2 class="text-2xl leading-tight">Stores</h2>
				</div>
				<div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
					<div class="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
						<!-- Table -->
						<table class="min-w-full leading-normal">
							<!-- Table Head -->
							<thead>
								<tr>
									<th
										scope="col"
										class="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
									>id</th>
									<th
										scope="col"
										class="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
									>Name</th>
									<th
										scope="col"
										class="px-5 py-3 hidden md:block bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
									>Created at
									</th>
									<th
										scope="col"
										class="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
									>status</th>
									<th
										scope="col"
										class="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
									></th>
								</tr>
							</thead>
							<!-- Table Body -->
							<tbody>
								<tr v-for="store in stores">
									<!-- Table Data Entries -->
									<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
										<p class="text-gray-900 whitespace-no-wrap">{{ store.store_id }}</p>
									</td>
									<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
										<p class="text-gray-900 whitespace-no-wrap">{{ store.store_name }}</p>
									</td>
									<td class="px-5 py-5  hidden md:table-cell border-b border-gray-200 bg-white text-sm">
										<p
											class="text-gray-900 whitespace-no-wrap"
										>{{ getTime(store.timeRegistred) }}</p>
									</td>
									<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
										<span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
											<span aria-hidden="true" class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
											<span class="relative">{{ store.status }}</span>
										</span>
									</td>
									<td class=" border-b border-gray-200 leading-6 bg-white text-sm">
										<button @click="navDash('Create Receipt',router,`/dashboard/createReceipt/${store.store_id}`)" class="text-indigo-600 px-2 hover:text-indigo-900">Create Receipt</button>
										<br>
										<button @click="navDash('View Receipt',router,`/dashboard/viewReceipts/${store.store_id}`)" class="text-indigo-600 px-2 hover:text-indigo-900">View Receipts</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<router-link
					:to="{name:'CreateStore'}"
					class="py-4 px-6 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
				>
				Create Store
			</router-link>
		</div>
	</div>
</template>

<!-- Pagination 
<div class="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
	<div class="flex items-center">
		<button
			type="button"
			class="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100"
		>
			<svg
				width="9"
				fill="currentColor"
				height="8"
				class=""
				viewBox="0 0 1792 1792"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"
				></path>
			</svg>
		</button>
		<button
			type="button"
			class="w-full px-4 py-2 border-t border-b text-base text-indigo-500 bg-white hover:bg-gray-100"
		>
			1
		</button>
		<button
			type="button"
			class="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100"
		>
			2
		</button>
		<button
			type="button"
			class="w-full px-4 py-2 border-t border-b text-base text-gray-600 bg-white hover:bg-gray-100"
		>
			3
		</button>
		<button
			type="button"
			class="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100"
		>
			4
		</button>
		<button
			type="button"
			class="
				w-full
				p-4
				border-t border-b border-r
				text-base
				rounded-r-xl
				text-gray-600
				bg-white
				hover:bg-gray-100
			"
		>
			<svg
				width="9"
				fill="currentColor"
				height="8"
				class=""
				viewBox="0 0 1792 1792"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"
				></path>
			</svg>
		</button>
	</div>
</div> -->
