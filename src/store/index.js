import Vue from 'vue'
import Vuex from 'vuex'
import serviceOnline from './modules/serviceOnline'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		serviceOnline
	}
})