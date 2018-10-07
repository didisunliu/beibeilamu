import Vue from 'vue';
//import { peachInstall } from './lib/peach'
//Vue.use(peachInstall)


import { utilsInstall } from './utils'
Vue.use(utilsInstall)
import { configPlugin } from './config'
Vue.use(configPlugin)
import { appInstall, $app } from './lib/hybrid'
Vue.use(appInstall)
import store from './store'
import 'babel-polyfill'


// import FastClick from 'fastclick'
// FastClick.attach(document.body)
import App from './App.vue';
import router from './router'
import * as filters from './filters' // global filters
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

import Layout from '@/components/layout'
Vue.use(Layout)
$app.onAppReadyCallback = function () {
	new Vue({
		el: '#app',
		router,
		store,
		render: h => h(App)
	});
}

