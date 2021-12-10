<script lang="ts" setup>
import { reactive, ref, toRefs } from "vue";
import api from "@/misc/api";
import { PrivateKey } from "@hashgraph/sdk";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
import Prompt from "@/components/Prompt.vue";
import signature from "@/misc/signature";

const prompt = ref(false);

const router = useRouter();

const submitData = reactive({
	name: "",
	userAccountId: "",
	public_key: "",
	country: "",
});

const submit = async () => {
	prompt.value = true;
};

const sign = async (privateKey:string) => {
	const {hexSignature} = signature(privateKey,"bills")
	const { data } = await api.post<{ userAccountId: string; name: string; public_key: string }>("/api/createUser", {
		data: {
			...submitData,
			signature:hexSignature,
		},
	});
	useStore().logIn({ accountId: data.userAccountId, name: data.name }, router);
	prompt.value = false;
};
</script>

<template>
	<section class="w-full bg-white">
		<div class="mx-auto max-w-7xl">
			<!-- Prompt -->
			<Prompt v-if="prompt" :sign="sign"/>

			<div class="flex flex-col lg:flex-row" v-show="!prompt">
				<!-- Left Div -->
				<div class="relative w-full bg-cover lg:w-6/12 xl:w-6/12 bg-gradient-to-r from-white via-white to-gray-100">
					<div class="relative flex flex-col items-center justify-center w-full h-full px-10 my-20 lg:px-16 lg:my-0">
						<div class="flex flex-col items-start space-y-8 tracking-tight lg:max-w-3xl">
							<div class="relative">
								<p class="mb-2 font-medium text-gray-700 uppercase">Work smarter</p>
								<h2 class="text-5xl font-bold text-gray-900 xl:text-6xl">Features to help you work smarter</h2>
							</div>
							<p class="text-2xl text-gray-700">
								We've created a simple formula to follow in order to gain more out of your business and your
								application.
							</p>
							<a
								href="#_"
								class="
									inline-block
									px-8
									py-5
									text-xl
									font-medium
									text-center text-white
									transition
									duration-200
									bg-blue-600
									rounded-lg
									hover:bg-blue-700
									ease
								"
							>
								Get Started Today
							</a>
						</div>
					</div>
				</div>
				<!-- Right Div -->
				<div class="w-full bg-white lg:w-6/12 xl:w-6/12">
					<div class="flex flex-col items-start justify-start w-full h-full p-10 lg:p-16 xl:p-24">
						<h4 class="w-full text-3xl font-bold">Signup</h4>
						<p class="text-lg text-gray-500">
							or, if you have an account you can
							<router-link to="/signin" href="#_" class="text-blue-600 underline"> sign in </router-link>
						</p>
						<form @submit.prevent="submit" class="relative w-full mt-10 space-y-8">
							<div class="relative">
								<label class="font-medium text-gray-900">Name<span class="text-red-500 required-dot"> * </span></label>
								<input
									type="text"
									class="
										block
										w-full
										px-4
										py-4
										mt-2
										text-xl
										placeholder-gray-400
										bg-gray-200
										rounded-lg
										focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50
									"
									v-model="submitData.name"
									placeholder="Enter Your Name"
								/>
							</div>
							<div class="relative">
								<label class="font-medium text-gray-900"
									>Account ID<span class="text-red-500 required-dot"> * </span></label
								>
								<input
									type="text"
									class="
										block
										w-full
										px-4
										py-4
										mt-2
										text-xl
										placeholder-gray-400
										bg-gray-200
										rounded-lg
										focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50
									"
									v-model="submitData.userAccountId"
									placeholder="Enter Your Account ID "
								/>
							</div>
							<div class="relative">
								<label class="font-medium text-gray-900"
									>Public Key <span class="text-red-500 required-dot"> * </span></label
								>
								<input
									type="password"
									class="
										block
										w-full
										px-4
										py-4
										mt-2
										text-xl
										placeholder-gray-400
										bg-gray-200
										rounded-lg
										focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50
									"
									v-model="submitData.public_key"
									placeholder="Public Key"
								/>
							</div>
							<div class="relative">
								<label class="font-medium text-gray-900"
									>Country<span class="text-red-500 required-dot"> * </span></label
								>
								<select
									id="country"
									class="
										block
										w-full
										px-4
										py-4
										mt-2
										text-xl
										placeholder-gray-400
										bg-gray-200
										rounded-lg
										focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50
									"
									v-model="submitData.country"
									name="country"
									placeholder="Country"
								>
									<option value="Afganistan">Afghanistan</option>
									<option value="Albania">Albania</option>
									<option value="Algeria">Algeria</option>
									<option value="American Samoa">American Samoa</option>
									<option value="Andorra">Andorra</option>
									<option value="Angola">Angola</option>
									<option value="Anguilla">Anguilla</option>
									<option value="Antigua & Barbuda">Antigua & Barbuda</option>
									<option value="Argentina">Argentina</option>
									<option value="Armenia">Armenia</option>
									<option value="Aruba">Aruba</option>
									<option value="Australia">Australia</option>
									<option value="Austria">Austria</option>
									<option value="Azerbaijan">Azerbaijan</option>
									<option value="Bahamas">Bahamas</option>
									<option value="Bahrain">Bahrain</option>
									<option value="Bangladesh">Bangladesh</option>
									<option value="Barbados">Barbados</option>
									<option value="Belarus">Belarus</option>
									<option value="Belgium">Belgium</option>
									<option value="Belize">Belize</option>
									<option value="Benin">Benin</option>
									<option value="Bermuda">Bermuda</option>
									<option value="Bhutan">Bhutan</option>
									<option value="Bolivia">Bolivia</option>
									<option value="Bonaire">Bonaire</option>
									<option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
									<option value="Botswana">Botswana</option>
									<option value="Brazil">Brazil</option>
									<option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
									<option value="Brunei">Brunei</option>
									<option value="Bulgaria">Bulgaria</option>
									<option value="Burkina Faso">Burkina Faso</option>
									<option value="Burundi">Burundi</option>
									<option value="Cambodia">Cambodia</option>
									<option value="Cameroon">Cameroon</option>
									<option value="Canada">Canada</option>
									<option value="Canary Islands">Canary Islands</option>
									<option value="Cape Verde">Cape Verde</option>
									<option value="Cayman Islands">Cayman Islands</option>
									<option value="Central African Republic">Central African Republic</option>
									<option value="Chad">Chad</option>
									<option value="Channel Islands">Channel Islands</option>
									<option value="Chile">Chile</option>
									<option value="China">China</option>
									<option value="Christmas Island">Christmas Island</option>
									<option value="Cocos Island">Cocos Island</option>
									<option value="Colombia">Colombia</option>
									<option value="Comoros">Comoros</option>
									<option value="Congo">Congo</option>
									<option value="Cook Islands">Cook Islands</option>
									<option value="Costa Rica">Costa Rica</option>
									<option value="Cote DIvoire">Cote DIvoire</option>
									<option value="Croatia">Croatia</option>
									<option value="Cuba">Cuba</option>
									<option value="Curaco">Curacao</option>
									<option value="Cyprus">Cyprus</option>
									<option value="Czech Republic">Czech Republic</option>
									<option value="Denmark">Denmark</option>
									<option value="Djibouti">Djibouti</option>
									<option value="Dominica">Dominica</option>
									<option value="Dominican Republic">Dominican Republic</option>
									<option value="East Timor">East Timor</option>
									<option value="Ecuador">Ecuador</option>
									<option value="Egypt">Egypt</option>
									<option value="El Salvador">El Salvador</option>
									<option value="Equatorial Guinea">Equatorial Guinea</option>
									<option value="Eritrea">Eritrea</option>
									<option value="Estonia">Estonia</option>
									<option value="Ethiopia">Ethiopia</option>
									<option value="Falkland Islands">Falkland Islands</option>
									<option value="Faroe Islands">Faroe Islands</option>
									<option value="Fiji">Fiji</option>
									<option value="Finland">Finland</option>
									<option value="France">France</option>
									<option value="French Guiana">French Guiana</option>
									<option value="French Polynesia">French Polynesia</option>
									<option value="French Southern Ter">French Southern Ter</option>
									<option value="Gabon">Gabon</option>
									<option value="Gambia">Gambia</option>
									<option value="Georgia">Georgia</option>
									<option value="Germany">Germany</option>
									<option value="Ghana">Ghana</option>
									<option value="Gibraltar">Gibraltar</option>
									<option value="Great Britain">Great Britain</option>
									<option value="Greece">Greece</option>
									<option value="Greenland">Greenland</option>
									<option value="Grenada">Grenada</option>
									<option value="Guadeloupe">Guadeloupe</option>
									<option value="Guam">Guam</option>
									<option value="Guatemala">Guatemala</option>
									<option value="Guinea">Guinea</option>
									<option value="Guyana">Guyana</option>
									<option value="Haiti">Haiti</option>
									<option value="Hawaii">Hawaii</option>
									<option value="Honduras">Honduras</option>
									<option value="Hong Kong">Hong Kong</option>
									<option value="Hungary">Hungary</option>
									<option value="Iceland">Iceland</option>
									<option value="Indonesia">Indonesia</option>
									<option value="India">India</option>
									<option value="Iran">Iran</option>
									<option value="Iraq">Iraq</option>
									<option value="Ireland">Ireland</option>
									<option value="Isle of Man">Isle of Man</option>
									<option value="Israel">Israel</option>
									<option value="Italy">Italy</option>
									<option value="Jamaica">Jamaica</option>
									<option value="Japan">Japan</option>
									<option value="Jordan">Jordan</option>
									<option value="Kazakhstan">Kazakhstan</option>
									<option value="Kenya">Kenya</option>
									<option value="Kiribati">Kiribati</option>
									<option value="Korea North">Korea North</option>
									<option value="Korea Sout">Korea South</option>
									<option value="Kuwait">Kuwait</option>
									<option value="Kyrgyzstan">Kyrgyzstan</option>
									<option value="Laos">Laos</option>
									<option value="Latvia">Latvia</option>
									<option value="Lebanon">Lebanon</option>
									<option value="Lesotho">Lesotho</option>
									<option value="Liberia">Liberia</option>
									<option value="Libya">Libya</option>
									<option value="Liechtenstein">Liechtenstein</option>
									<option value="Lithuania">Lithuania</option>
									<option value="Luxembourg">Luxembourg</option>
									<option value="Macau">Macau</option>
									<option value="Macedonia">Macedonia</option>
									<option value="Madagascar">Madagascar</option>
									<option value="Malaysia">Malaysia</option>
									<option value="Malawi">Malawi</option>
									<option value="Maldives">Maldives</option>
									<option value="Mali">Mali</option>
									<option value="Malta">Malta</option>
									<option value="Marshall Islands">Marshall Islands</option>
									<option value="Martinique">Martinique</option>
									<option value="Mauritania">Mauritania</option>
									<option value="Mauritius">Mauritius</option>
									<option value="Mayotte">Mayotte</option>
									<option value="Mexico">Mexico</option>
									<option value="Midway Islands">Midway Islands</option>
									<option value="Moldova">Moldova</option>
									<option value="Monaco">Monaco</option>
									<option value="Mongolia">Mongolia</option>
									<option value="Montserrat">Montserrat</option>
									<option value="Morocco">Morocco</option>
									<option value="Mozambique">Mozambique</option>
									<option value="Myanmar">Myanmar</option>
									<option value="Nambia">Nambia</option>
									<option value="Nauru">Nauru</option>
									<option value="Nepal">Nepal</option>
									<option value="Netherland Antilles">Netherland Antilles</option>
									<option value="Netherlands">Netherlands (Holland, Europe)</option>
									<option value="Nevis">Nevis</option>
									<option value="New Caledonia">New Caledonia</option>
									<option value="New Zealand">New Zealand</option>
									<option value="Nicaragua">Nicaragua</option>
									<option value="Niger">Niger</option>
									<option value="Nigeria">Nigeria</option>
									<option value="Niue">Niue</option>
									<option value="Norfolk Island">Norfolk Island</option>
									<option value="Norway">Norway</option>
									<option value="Oman">Oman</option>
									<option value="Pakistan">Pakistan</option>
									<option value="Palau Island">Palau Island</option>
									<option value="Palestine">Palestine</option>
									<option value="Panama">Panama</option>
									<option value="Papua New Guinea">Papua New Guinea</option>
									<option value="Paraguay">Paraguay</option>
									<option value="Peru">Peru</option>
									<option value="Phillipines">Philippines</option>
									<option value="Pitcairn Island">Pitcairn Island</option>
									<option value="Poland">Poland</option>
									<option value="Portugal">Portugal</option>
									<option value="Puerto Rico">Puerto Rico</option>
									<option value="Qatar">Qatar</option>
									<option value="Republic of Montenegro">Republic of Montenegro</option>
									<option value="Republic of Serbia">Republic of Serbia</option>
									<option value="Reunion">Reunion</option>
									<option value="Romania">Romania</option>
									<option value="Russia">Russia</option>
									<option value="Rwanda">Rwanda</option>
									<option value="St Barthelemy">St Barthelemy</option>
									<option value="St Eustatius">St Eustatius</option>
									<option value="St Helena">St Helena</option>
									<option value="St Kitts-Nevis">St Kitts-Nevis</option>
									<option value="St Lucia">St Lucia</option>
									<option value="St Maarten">St Maarten</option>
									<option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
									<option value="St Vincent & Grenadines">St Vincent & Grenadines</option>
									<option value="Saipan">Saipan</option>
									<option value="Samoa">Samoa</option>
									<option value="Samoa American">Samoa American</option>
									<option value="San Marino">San Marino</option>
									<option value="Sao Tome & Principe">Sao Tome & Principe</option>
									<option value="Saudi Arabia">Saudi Arabia</option>
									<option value="Senegal">Senegal</option>
									<option value="Seychelles">Seychelles</option>
									<option value="Sierra Leone">Sierra Leone</option>
									<option value="Singapore">Singapore</option>
									<option value="Slovakia">Slovakia</option>
									<option value="Slovenia">Slovenia</option>
									<option value="Solomon Islands">Solomon Islands</option>
									<option value="Somalia">Somalia</option>
									<option value="South Africa">South Africa</option>
									<option value="Spain">Spain</option>
									<option value="Sri Lanka">Sri Lanka</option>
									<option value="Sudan">Sudan</option>
									<option value="Suriname">Suriname</option>
									<option value="Swaziland">Swaziland</option>
									<option value="Sweden">Sweden</option>
									<option value="Switzerland">Switzerland</option>
									<option value="Syria">Syria</option>
									<option value="Tahiti">Tahiti</option>
									<option value="Taiwan">Taiwan</option>
									<option value="Tajikistan">Tajikistan</option>
									<option value="Tanzania">Tanzania</option>
									<option value="Thailand">Thailand</option>
									<option value="Togo">Togo</option>
									<option value="Tokelau">Tokelau</option>
									<option value="Tonga">Tonga</option>
									<option value="Trinidad & Tobago">Trinidad & Tobago</option>
									<option value="Tunisia">Tunisia</option>
									<option value="Turkey">Turkey</option>
									<option value="Turkmenistan">Turkmenistan</option>
									<option value="Turks & Caicos Is">Turks & Caicos Is</option>
									<option value="Tuvalu">Tuvalu</option>
									<option value="Uganda">Uganda</option>
									<option value="United Kingdom">United Kingdom</option>
									<option value="Ukraine">Ukraine</option>
									<option value="United Arab Erimates">United Arab Emirates</option>
									<option value="United States of America">United States of America</option>
									<option value="Uraguay">Uruguay</option>
									<option value="Uzbekistan">Uzbekistan</option>
									<option value="Vanuatu">Vanuatu</option>
									<option value="Vatican City State">Vatican City State</option>
									<option value="Venezuela">Venezuela</option>
									<option value="Vietnam">Vietnam</option>
									<option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
									<option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
									<option value="Wake Island">Wake Island</option>
									<option value="Wallis & Futana Is">Wallis & Futana Is</option>
									<option value="Yemen">Yemen</option>
									<option value="Zaire">Zaire</option>
									<option value="Zambia">Zambia</option>
									<option value="Zimbabwe">Zimbabwe</option>
								</select>
							</div>
							<!-- Submit Button -->
							<div class="relative">
								<button
									href="#_"
									class="
										inline-block
										w-full
										px-5
										py-4
										text-lg
										font-medium
										text-center text-white
										transition
										duration-200
										bg-blue-600
										rounded-lg
										hover:bg-blue-700
										ease
									"
								>
									Create Account
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>
	<section class="bg-gray-600 mt-5">
		<div class="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
			<nav class="flex flex-wrap justify-center -mx-5 -my-2">
				<div class="px-5 py-2">
					<a href="#" class="text-base leading-6 text-gray-500 hover:text-gray-900"> About </a>
				</div>
				<div class="px-5 py-2">
					<a href="#" class="text-base leading-6 text-gray-500 hover:text-gray-900"> Blog </a>
				</div>
				<div class="px-5 py-2">
					<a href="#" class="text-base leading-6 text-gray-500 hover:text-gray-900"> Team </a>
				</div>
				<div class="px-5 py-2">
					<a href="#" class="text-base leading-6 text-gray-500 hover:text-gray-900"> Pricing </a>
				</div>
				<div class="px-5 py-2">
					<a href="#" class="text-base leading-6 text-gray-500 hover:text-gray-900"> Contact </a>
				</div>
				<div class="px-5 py-2">
					<a href="#" class="text-base leading-6 text-gray-500 hover:text-gray-900"> Terms </a>
				</div>
			</nav>
			<div class="flex justify-center mt-8 space-x-6">
				<a href="#" class="text-gray-400 hover:text-gray-500">
					<span class="sr-only">Facebook</span>
					<svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
						<path
							fill-rule="evenodd"
							d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
							clip-rule="evenodd"
						></path>
					</svg>
				</a>
				<a href="#" class="text-gray-400 hover:text-gray-500">
					<span class="sr-only">Instagram</span>
					<svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
						<path
							fill-rule="evenodd"
							d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
							clip-rule="evenodd"
						></path>
					</svg>
				</a>
				<a href="#" class="text-gray-400 hover:text-gray-500">
					<span class="sr-only">Twitter</span>
					<svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
						<path
							d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
						></path>
					</svg>
				</a>
				<a href="#" class="text-gray-400 hover:text-gray-500">
					<span class="sr-only">GitHub</span>
					<svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
						<path
							fill-rule="evenodd"
							d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
							clip-rule="evenodd"
						></path>
					</svg>
				</a>
				<a href="#" class="text-gray-400 hover:text-gray-500">
					<span class="sr-only">Dribbble</span>
					<svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
						<path
							fill-rule="evenodd"
							d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
							clip-rule="evenodd"
						></path>
					</svg>
				</a>
			</div>
			<p class="mt-8 text-base leading-6 text-center text-gray-400">© 2021 SomeCompany, Inc. All rights reserved.</p>
		</div>
	</section>
</template>
