/**
 * 通过webpack环境变量
 * 获取前端配置文件
 * 并将数据挂载在Vue对象上
 */
// export default require('./' + process.env.SERVICE_CONFIG + '.json')
//
// const configInstall = function (Vue) {
// 	Vue.prototype.$config = require('./' + process.env.SERVICE_CONFIG + '.json')
// }
const serviceConfig = require('./' + process.env.SERVICE_CONFIG + '.json')
const configPlugin = {
	install: function(Vue, options) {
		Vue.prototype.$service = serviceConfig
	}
}
export {
	configPlugin
}
export default serviceConfig