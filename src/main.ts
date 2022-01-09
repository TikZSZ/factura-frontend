import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./assets/base.css"
import { createPinia } from 'pinia'
import NProgress from './misc/NProgress'
import "nprogress/nprogress.css"
import { client } from './misc/server'
import api from './misc/api'

const app = createApp(App)

const main = async ()=>{
  app.use(router)
  app.use(createPinia())
  NProgress(router)
  client(api)
  // const {useStore} = await import("@/store")
  // const d =await new Promise<void>(async (resolve, reject) =>{
  //   await useStore().checkAuth()
  //   resolve()
  // })
  app.mount('#app')
}
main()





