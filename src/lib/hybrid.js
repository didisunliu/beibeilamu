import { $utils } from '../utils'

let $app = {}

$app.inited = false

$app.onAppReadyCallback = () => {}
$app.onAppActionCallback = () => {}
$app.onAppFileCallback = () => {}

$app.onAppReady = function () {
	$app.init()
	$app.onAppReadyCallback()
}

window._appReady = function () {
	$app.onAppReady()
}

window._appAction = function (data) {
	$app.onAppActionCallback(data)
}

window._appFile = function (data) {
	$app.onAppFileCallback(data)
}

/**
 * 与app交互的js对象，交互协议请参考http://wiki.cnhnkj.cn/pages/viewpage.action?pageId=10060260
 * 要先调用linkBridge，app才会把HnJsBridge对象的方法注入到h5中，然后调用window._appReady
 */
if (typeof(HnJsBridge) != 'undefined' && typeof(HnJsBridge.linkBridge) != 'undefined') {
	try {
		HnJsBridge.linkBridge('HnJsBridge')
	} catch (err) {
		console.log('[Bees2] HnJsBridge load error:' + err)
	}
} else {
	setTimeout(function () {
		window._appReady()
	}, 300)
}

/**
 * 读取用户信息，初始化app交互函数等
 */
$app.init = function () {
	if (!$utils.isApp()) {
		/**
		 * 模拟的与app交互js对象，用于本地开发
		 */
		let mockHnJsBridge = function () {
			let ticket = $utils.getQueryString('ticket'),
				userid = $utils.getQueryString('userid')
			return {
				settings: {
					hnUserId: userid ? userid : '0',
					hnUserTicket: ticket ? ticket : '',
					appChannel: 'app 渠道',
					deviceId: '设备id',
					location: '位置',
					sysVersion: '系统版本',
					osType: '系统类型',
					appVersion: 'app版本',
					sessionId: 'session id'
				},
				getData: function (f) {
					return this.settings[f]
				},
				gotoNative: function (page, params) {
					//console.log('打开原生页面 -> ', page, ' 参数 -> ', params)
				},
				putData: function (type, params) {
					//console.log('调用[putData]方法 -> ' + type, ' 参数 -> ', params)
				},
				doAction: function (type, params) {
					//console.log('调用[doAction]方法 -> ' + type, ' 参数 -> ', params)
				}
			}
		}
		$app.HnJsBridge = mockHnJsBridge()
	} else {
		$app.HnJsBridge = window.HnJsBridge
	}
	/**
	 * 读取app数据
	 */
	let settings = []
	let fs = ['hnUserId', 'hnUserTicket', 'appChannel', 'deviceId', 'location', 'sysVersion', 'osType', 'appVersion', 'sessionId']
	for (let i = 0, s = fs.length; i < s; i++) {
		let f = fs[i]
		settings[f] = $app.HnJsBridge.getData(f, '')
	}
	//console.log(settings)
	$app.settings = settings

	/**
	 * 跳转到native页面，第一个参数为page，第二个参数为传递给页面的param
	 * 例：$gotoNative('homePage','myPage')跳到首页，参数为myPage
	 * 页面跳转协议请参考http://wiki.cnhnkj.cn/pages/viewpage.action?pageId=10060264
	 */
	$app.gotoNative = function (page, params) {
		$app.HnJsBridge.gotoNative(page, params || '')
	}
	$app.share = function (params) {
		$app.HnJsBridge.doAction('share', params)
	}
	$app.doAction = function(type, params) {
		$app.HnJsBridge.doAction(type, params)
	}
	$app.putData = function(type, params) {
		$app.HnJsBridge.putData(type, params)
	}
	$app.login = function () {
		return new Promise(resolve => {
			if (!!$app.settings.hnUserTicket) {
				resolve()
			} else {
				resolve()
				console.log('需要先登录才能打开页面/发送请求！开发模式下在url后面增加ticket参数即可')
				$app.gotoNative('login', '')
			}
		})
	}
	$app.isLogin = $app.settings.hnUserTicket !== ''
}

const appInstall = function (Vue) {
	Vue.prototype.$app = $app
}

export {
	appInstall,
	$app
}
