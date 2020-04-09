// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import Search from './search.vue'


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  data: {
  	bottomType: new Vue()
  },
  render: h => h(Search)
}).$mount('#app')
