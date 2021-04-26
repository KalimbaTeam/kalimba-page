import Vue from 'vue'
import Buefy from 'buefy'
import App from './App.vue'
import VueRouter from 'vue-router'
import 'buefy/dist/buefy.css'

Vue.use(Buefy);
Vue.use(VueRouter);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: new VueRouter()
}).$mount('#app')
