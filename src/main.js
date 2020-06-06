import Vue from 'vue'
import App from './App.vue'
import './firebase'
import { firestorePlugin } from 'vuefire'

import router from './router'


Vue.use(firestorePlugin)

Vue.config.ignoredElements = [/^ion-/]

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})