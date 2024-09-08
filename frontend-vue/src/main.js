import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import axiosPlugin from '@/plugins/axios.js'


const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(axiosPlugin)
pinia.use(({ store }) => {
  store.$http = app.config.globalProperties.$http
})
app.mount('#app')
