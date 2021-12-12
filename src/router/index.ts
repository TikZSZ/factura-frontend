import { useStore } from "@/store";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/home",
			name: "Home",
			component: HomeView,
		},
		{
			path: "/signup",
			name: "SignUp",
			component: () => import("@/views/SignUp.vue"),
		},
		{
			path: "/signin",
			name: "SignIn",
			component: () => import("@/views/SignIn.vue"),
		},
		{
			path: "/dashboard",
			name: "Dashboard",
			meta: {
				requiresAuth: true,
			},
			component: () => import("@/views/Dashboard.vue"),
			children: [
				{
					path: "stores",
					name: "Stores",
					component: () => import("@/views/Stores.vue"),
				},
				{
					path: "transactionHistory",
					name: "Transaction History",
					component: () => import("@/components/ReceiptHistory.vue"),
					props:{
						link:'/api/getReceiptsForUser',
						title:"Transaction History"
					}
				},
				{
					path: "createStore",
					name: "CreateStore",
					component: () => import("@/views/CreateStore.vue"),
				},
				{
					path: "createReceipt/:storeId",
					name: "Create Receipt",
					component: () => import("@/views/CreateReceipt.vue"),
					props: (route) => ({

					})
				},
				{
					path:'viewReceipts/:storeId',
					name:'View Receipts',
					component:() => import('@/components/ReceiptHistory.vue'),
					props:(route) => ({
						link:`/api/getReceiptsForStore/${route.params.storeId}`,
						title:"Store Transaction History"
					})
				}
			],	
		},
		{
			path: "/",
			redirect: "/home",
		},
		{
			path: "/about",
			name: "About",
			component: () => import("@/views/About.vue"),
		},
		{
			path: '/fullReceipt/:receipt_id',
			name:'FullReceipt',
			component: () => import("@/views/FullReceipt.vue")
		},
		{
			path: '/verify',
			name:'Verify',
			component: () => import("@/views/Verify.vue")
		}
	],
});

router.beforeEach(async (to, from, next) => {
	const store = useStore();
	const requiresAuth = to.matched.some((route) => route.meta.requiresAuth || false)
  let path:string
	//console.log(to.path);
	
	if (!requiresAuth) {
    //console.log('no auth');
		path =  to.path === "/" ? "/home" : to.path;
		next();
	} else {
		await store.checkAuth()
		if (store.accountId) {
      //console.log('auth with account id');
			path = to.path === "/" ? "/home" : to.path;
			next();
		} else {
      //console.log('auth and no account id');
			path = "/home";
			next({ name: "Home" });
		}
	}
  store.currentPath = path
	window.scroll({ top: 0 });
});
export default router;
