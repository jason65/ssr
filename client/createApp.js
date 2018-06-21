import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import Router from 'vue-router'

import App from './app.vue'
import createRouter from './config/router'
import createStore from './store/store'

Vue.use(Vuex)
Vue.use(Meta)
Vue.use(Router)

export default () => {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return {
    app,
    router,
    store
  }
}