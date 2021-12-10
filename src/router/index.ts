import { useStore } from '@/store'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: () => import("@/views/SignUp.vue"),
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: () => import("@/views/SignIn.vue")
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import("@/views/Dashboard.vue"),
      children:[
        {
          path:'stores',
          name:"Stores",
          component:() => import("@/views/Stores.vue")
        },
        {
          path:'transaction',
          name:"Transaction History",
          component:() => import("@/views/TransactionHistory.vue")
        },
        {
          path: 'createStore',
          name: 'CreateStore',
          component: () => import("@/views/CreateStore.vue")
        },
        {
          path: 'createReceipt',
          name: 'Create Receipt',
          component: () => import("@/views/CreateReceipt.vue")
        }
      ]
    },
    {
      path:"/",
      redirect:'/home'
    },
    {
      path:"/about",
      name:"About",
      component:()=> import("@/views/About.vue")
    }
  ]
})
router.beforeEach((to,from,next)=>{
  window.scroll({top:0})
  const store = useStore()
  store.currentPath = to.path === "/" ? "/home" : to.path
  next()
})
export default router
