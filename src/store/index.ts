import { defineStore } from "pinia";
import { RouteLocationNormalized, Router } from "vue-router";
import api from "@/misc/api";
import { client } from "@/misc/server";

let msgToSign = "bills"

export const useStore = defineStore("main", {
	state: () => ({
		isMobile: false,
		accountId: null as string | null,
		name: null as string | null,
		currentTab: "Stores",
		currentPath: "/home",
	}),
	actions: {
		async logOut(route: RouteLocationNormalized, router: Router) {
			await client().logOut()
			this.name = null;
			this.accountId = null;
			console.log(route);
			
			if(route.meta.requiresAuth){
        router.push({name:'Home'})
      }
		},
		logIn(data: { accountId: string; name: string }, router?: Router) {
			this.name = data.name;
			this.accountId = data.accountId;
			router?.push("/home");
		},

		async submitLogin(submitData: { privateKey: string; accountId: string }, router: Router) {
			const data = await client().login(submitData,msgToSign)
			this.logIn({ accountId: data.userAccountId, name: data.name }, router);
		},
		async submitSignUp<T>(privateKey:string,submitData:T,router:Router){
			const data = await client().signUp(privateKey,msgToSign,submitData)
			useStore().logIn({ accountId: data.userAccountId, name: data.name }, router);
		},

		async checkAuth() {
			try {
				const { data } = await api.get<{ userAccountId: string; name: string }>("/api/currentUser");
				this.logIn({ accountId: data.userAccountId, name: data.name });
			} catch (err) {
				return null;
			}
			return null;
		},
		async navDash(tabName: string, router: Router,link?:string) {
			this.currentTab = tabName
			if(!link) router.push({ name: this.currentTab });
			else router.push({path:link});
		},
	},
});
