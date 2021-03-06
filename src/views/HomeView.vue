<script setup lang="ts">
import Error from "@/components/Error.vue";
import InputErrorVue from "@/components/InputError.vue";
import { useStore } from "@/store";
import useLogin from "./useLogin";

const { submit, v$, disabled,hasError,errorMessage } = useLogin();
const store = useStore();

</script>

<template>
	<!-- Header -->
	<section
		class="w-full px-6 pb-12 antialiased bg-white bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200"
	>
		<div class="mx-auto max-w-7xl">
			<!-- Main Hero Content -->
			<div class="container max-w-lg px-4 py-32 mx-auto text-left md:max-w-none md:text-center">
				<h1
					class="text-5xl font-extrabold leading-10 tracking-tight text-left text-gray-900 md:text-center sm:leading-none md:text-6xl lg:text-7xl"
				>
					<span class="inline md:block">Start Crafting</span>
					<!-- Your -->
          <br v-if="store.isMobile">
					<span
						class="relative mt-2 text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-indigo-500 md:inline-block"
					>Certified Invoices</span>
					<!-- Next Great Idea -->
				</h1>
				<div
					class="mx-auto mt-5 text-gray-500 md:mt-12 md:max-w-lg md:text-center lg:text-lg"
				>Simplifying the creation of immutable invoices and so much more!</div>
				<!-- Simplifying the creation of landing pages, blog pages, application pages and so much more! -->
				<div class="flex flex-col items-center mt-12 text-center">
					<span class="relative inline-flex w-full md:w-auto">
						<a
							type="button"
							class="inline-flex items-center justify-center w-full px-8 py-4 text-base font-bold leading-6 text-white bg-indigo-600 border border-transparent rounded-full md:w-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
						>Try Today</a>
						<span
							class="absolute top-0 right-0 px-2 py-1 -mt-3 -mr-6 text-xs font-medium leading-tight text-white bg-green-400 rounded-full"
						>Free</span>
					</span>
					<a target="__blank" href="https://drive.google.com/file/d/1wHcQK4tUhx7mswUnaUl-NCwNoJa0znzG/view?usp=sharing" class="mt-3 text-sm text-indigo-500">View Demo</a>
				</div>
				<h1 class="text-gray-500 mt-3 ">
					<span class="font-bold">Note: </span> 
					<a class="text-indigo-600 underline" target="_blank"  href="https://docs.hedera.com/guides/testnet/testnet-access">
						Hedera Testnet Account 
					</a>is required to use factura.
				</h1>
			</div>
			<!-- End Main Hero Content -->
		</div>
	</section>

	<!-- Features -->
	<section class="py-20 bg-white">
		<div class="container max-w-7xl mx-auto">
			<h2 class="text-4xl font-bold tracking-tight text-center">Our Features</h2>
			<p class="mt-2 text-lg text-center text-gray-600">Check out our list of awesome features below.</p>
			<div class="grid grid-cols-4 gap-8 mt-10 sm:grid-cols-8 lg:grid-cols-12 px-4 sm:px-8 xl:px-0">
				<div
					class="relative flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 overflow-hidden bg-gray-100 rounded-xl"
				>
					<div class="p-3 text-white bg-blue-500 rounded-full">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="w-8 h-8"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M14 3v4a1 1 0 0 0 1 1h4" />
							<path d="M5 8v-3a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-5" />
							<circle cx="6" cy="14" r="3" />
							<path d="M4.5 17l-1.5 5l3 -1.5l3 1.5l-1.5 -5" />
						</svg>
					</div>
					<h4 class="text-xl font-medium text-gray-700">Certifications</h4>
					<p
						class="text-base text-center text-gray-500"
					>Each receipt will be certified and can be independently verified using zero trust decentralised systems</p>
				</div>

				<div
					class="flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 bg-gray-100 rounded-xl"
				>
					<div class="p-3 text-white bg-blue-500 rounded-full">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="w-8 h-8"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M8 9l3 3l-3 3" />
							<line x1="13" y1="15" x2="16" y2="15" />
							<rect x="3" y="4" width="18" height="16" rx="2" />
						</svg>
					</div>
					<h4 class="text-xl font-medium text-gray-700">Immutability</h4>
					<p
						class="text-base text-center text-gray-500"
					>Once a receipt has been signed it can neither be deleated nor edited</p>
				</div>

				<div
					class="flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 bg-gray-100 rounded-xl"
				>
					<div class="p-3 text-white bg-blue-500 rounded-full">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="w-8 h-8"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M18 8a3 3 0 0 1 0 6" />
							<path d="M10 8v11a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1v-5" />
							<path
								d="M12 8h0l4.524 -3.77a0.9 .9 0 0 1 1.476 .692v12.156a0.9 .9 0 0 1 -1.476 .692l-4.524 -3.77h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h8"
							/>
						</svg>
					</div>
					<h4 class="text-xl font-medium text-gray-700">Self Relient</h4>
					<p
						class="text-base text-center text-gray-500"
					>Issued receipts exist on a public network and do not depend on any organisation's infrastructure to keep them safe</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Login -->
	<section class="w-full px-4 sm:px-8 py-14 bg-gray-100 xl:px-8">
		<div class="max-w-5xl mx-auto">
			<div v-if="!store.accountId" class="flex flex-col items-center md:flex-row">
				<div class="w-full space-y-5 md:w-3/5 md:pr-16">
					<p class="font-medium text-blue-500 uppercase">Building Zero Trust Businesses</p>
					<h2
						class="text-2xl font-extrabold leading-none text-black sm:text-3xl md:text-5xl"
					>Changing The Way People Do Business.</h2>
					<!-- <p class="text-xl text-gray-600 md:pr-16">Learn how to engage with your visitors and teach them about your mission. We're revolutionizing the way customers and businesses interact.</p> -->
				</div>

				<div class="w-full mt-16 md:mt-0 md:w-2/5">
					<Error :active="hasError" :msg="errorMessage"/>
					<form
						class="relative z-10 h-auto p-8 py-10 overflow-hidden bg-white border-b-2 border-gray-300 rounded-lg shadow-2xl px-7"
						@submit.prevent="submit"
					>
						<h3 class="mb-6 text-2xl font-medium text-center">Sign in to your Account</h3>
						<input
							type="text"
							name="email"
							class="block w-full px-4 py-3 mb-4 border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
							placeholder="Account ID"
							v-model="v$.userAccountId.$model"
						/>
						<InputErrorVue :errors="v$.userAccountId.$errors" />
						<input
							type="password"
							name="password"
							class="block w-full px-4 py-3 mb-4 border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
							placeholder="Private Key"
							v-model="v$.privateKey.$model"
						/>
						<InputErrorVue :errors="v$.privateKey.$errors" />
						<div class="block">
							<button
								class="w-full px-3 py-4 font-medium text-white rounded-lg"
								:disabled="disabled"
								:class="disabled ? 'bg-blue-300' : 'bg-blue-600'"
							>Log Me In</button>
						</div>
						<p class="w-full mt-4 text-sm text-center text-gray-500">
							Don't have an account?
							<a href="#_" class="text-blue-500 underline">Sign up here</a>
						</p>
					</form>
				</div>
			</div>
			<div v-else class="w-full space-y-5">
				<h2
					class="text-2xl font-extrabold leading-none text-black sm:text-3xl md:text-5xl mx-auto text-center"
				>
					<span class="text-blue-500">Greetings!</span>
					<br />
					{{ store.name }}!
				</h2>
			</div>
		</div>
	</section>

	<!-- FAQ -->
	<section class="py-24 bg-white">
		<div class="px-8 mx-auto max-w-7xl lg:px-16">
			<h2 class="mb-4 text-xl font-bold md:text-3xl">Frequently Asked Questions</h2>
			<div class="grid grid-cols-1 gap-0 text-gray-600 md:grid-cols-2 md:gap-16">
				<div>
					<h5 class="mt-10 mb-3 font-semibold text-gray-900">What is factura</h5>
					<p>
						factura (Invoice for English) is a "Zero Trust" invoice creation platform for buyers and sellers alike
						<a
							href="https://en.wikipedia.org/wiki/Decentralised_system"
							class="text-indigo-500 underline"
						></a>
					</p>
					<h5 class="mt-10 mb-3 font-semibold text-gray-900">Can I try it for Free?</h5>
					<p>Absolutely, you can try out factura for free today!</p>

					<!-- <h5 class="mt-10 mb-3 font-semibold text-gray-900">Where do I go to upgrade my account?</h5>
					<p>
						You can upgrade your account by visiting
						<a
							href="https://devdojo.com/pro"
							class="text-indigo-500 underline"
						>The Pro Upgrade Page</a>. You will also
						gain access to many other applications and sections of the site.
						<a
							href="https://help.hellonext.co/faq/startup-eligibility/"
							target="_blank"
						>here</a>.
					</p>-->
				</div>
				<div>
					<h5 class="mt-10 mb-3 font-semibold text-gray-900">How do I use factura for my business</h5>
					<p>
						You can start using factura today. Just
						<router-link to="/signup" class="text-indigo-500 underline">SignUp</router-link>and get started
					</p>

					<h5 class="mt-10 mb-3 font-semibold text-gray-900">How long will I have access to factura</h5>
					<p>factura will be accessible for free till its out of beta . You will have unlimited access to all your invoices created during beta; however, after that if u want to continue using factura you'll need a subscription.</p>

					<!-- <h5 class="mt-10 mb-3 font-semibold text-gray-900">What is the license on the pages?</h5>
					<p>
						You have unlimited use to the templates used in Tails; however, you cannot re-use the templates to sell for
						others to use.
					</p>-->

					<!-- <h5
						class="mt-10 mb-3 font-semibold text-gray-900"
					>Can I cancel my account if I not longer need it?</h5>
					<p>
						Of course, you can feel free to cancel your account at anytime, and you can feel free to come back and
						upgrade again whenever you're ready.
					</p>-->

					<!-- <h5 class="mt-10 mb-3 font-semibold text-gray-900">What if I need help with my project?</h5>
					<p>
						If you need assistance implementing the templates into your project you can contact support or you can visit
						our
						<a
							href="https://devdojo.com/questions"
							class="text-indigo-500 underline"
						>question section</a>.
					</p>-->
				</div>
			</div>
		</div>
	</section>

	<!-- Footer -->
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
