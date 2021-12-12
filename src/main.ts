import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./assets/base.css"
import { createPinia } from 'pinia'

const app = createApp(App)

const main = async ()=>{
  app.use(router)
  app.use(createPinia())
  const {useStore} = await import("@/store")
  const d =await new Promise<void>(async (resolve, reject) =>{
    await useStore().checkAuth()
    resolve()
  })
  app.mount('#app')
}
main()





