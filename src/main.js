import { createApp } from 'vue'
import App from './App.vue'
import './samples/node-api'

import SvgIcon from '@/components/svg-icon/index.vue'

import '@/assets/css/reset.css'
import '@/assets/other/iconfont.js'

const app = createApp(App)

app.component('svg-icon', SvgIcon)

app.mount('#app').$nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*')
})
