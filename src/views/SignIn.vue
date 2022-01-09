<script lang="ts" setup>
import Error from "@/components/Error.vue";
import InputError from "@/components/InputError.vue";
import { ref } from "vue";
import useLogin from "./useLogin";

const { submit, v$,disabled,hasError,errorMessage } = useLogin();

</script>

<template>
	<section class="w-full px-8 py-16 md:py-40 bg-gray-100 xl:px-8">
		<div class="max-w-5xl mx-auto">
			<div class="flex flex-col items-center md:flex-row">
				<!-- Left Div -->
				<div class="w-full space-y-5 md:w-3/5 md:pr-16">
					<p class="font-medium text-blue-500 uppercase">Smart Login</p>
					<h2
						class="text-2xl font-extrabold leading-none text-black sm:text-3xl md:text-5xl"
					>Changing The Way People login</h2>
					<p class="text-xl text-gray-600 md:pr-16">No more emails and passwords just web3 credentials.</p>
					<p class="text-xl text-red-400">
						Note 1: As of today there is no wallet extension (for hedera) on browsers that allows signing transactions
						so for now you will have to manually enter the credentials
					</p>
					<p
						class="text-xl text-red-400"
					>Note 2: Your private key never leaves the browser all transactions are signed in browser by you.</p>
				</div>
				<!-- Right Div  -->
				<div class="w-full mt-16 md:mt-0 md:w-2/5">
					<Error :active="hasError" :msg="errorMessage"/>
					<form
						class="relative z-10 h-auto p-8 py-10 overflow-hidden bg-white border-b-2 border-gray-300 rounded-lg shadow-2xl px-7"
						@submit.prevent="() => {
							submit()
						}"
					>
						
						<div>
							<h3 class="mb-6 text-2xl font-medium text-center">Sign in to your Account</h3>
							<input
								type="text"
								name="email"
								class="block w-full px-4 py-3 mb-4 border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
								placeholder="Account ID"
								v-model="v$.userAccountId.$model"
							/>
							<InputError :errors="v$.userAccountId.$errors" />
						</div>
						<div>
							<input
								type="password"
								name="password"
								class="block w-full px-4 py-3 mb-4 border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
								placeholder="Private Key"
								v-model="v$.privateKey.$model"
							/>
							<InputError :errors="v$.privateKey.$errors" />
						</div>

						<div class="block">
							<button
								class="w-full px-3 py-4 font-medium text-white rounded-lg"
								:disabled="disabled"
								:class="disabled?'bg-blue-300':'bg-blue-600'"
							>Log Me In</button>
						</div>
						<p class="w-full mt-4 text-sm text-center text-gray-500">
							Don't have an account?
							<router-link :to="{ name: 'SignUp' }" href="#_" class="text-blue-500 underline">Sign up here</router-link>
						</p>
					</form>
				</div>
			</div>
		</div>
	</section>

		<section class="bg-gray-100">
		<div class="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
			<div class="flex justify-center space-x-6">
				<a
					href="http://twitter.com/TikZ41414516"
					target="__blank"
					class="text-gray-400 hover:text-gray-500"
				>
					<span class="sr-only">Twitter</span>
					<svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
						<path
							d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
						/>
					</svg>
				</a>
				<a href="https://github.com/TikZSZ" target="__blank" class="text-gray-400 hover:text-gray-500">
					<span class="sr-only">GitHub</span>
					<svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
						<path
							fill-rule="evenodd"
							d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
							clip-rule="evenodd"
						/>
					</svg>
				</a>
			</div>
			<p
				class="mt-8 text-base leading-6 text-center text-gray-400"
			>© {{new Date().getFullYear()}} factura, Inc. All rights reserved.</p>
		</div>
	</section>
</template>


