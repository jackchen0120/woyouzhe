// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import Index from './index.vue'
import axios from 'axios'

Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  data: {
  	bottomType: new Vue()
  },
  render: h => h(Index)
}).$mount('#app')

