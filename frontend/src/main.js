// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(Buefy)

const store = new Vuex.Store({
  state: {
    results: []
  },
  getters: {
    results: (state) => state.results
  },
  mutations: {
    'CHANGE_RESULTS' (state, results) {
      state.results = results
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
})

let ws

if (ws) {
  ws.onerror = ws.onopen = ws.onclose = null
  ws.close()
}

ws = new WebSocket(`ws://${location.host}/websocket`)
ws.onerror = () => console.log('WebSocket error')
ws.onopen = () => console.log('WebSocket connection established')
ws.onclose = () => console.log('WebSocket connection closed')
ws.onmessage = (event) => {
  store.commit('CHANGE_RESULTS', JSON.parse(event.data))
}
