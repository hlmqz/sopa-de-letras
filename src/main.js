import Vue from 'vue'
import App from './App.vue'

import '@fortawesome/fontawesome-free/js/all.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
