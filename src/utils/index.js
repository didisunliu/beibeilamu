// let weeks = ['日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']

// function _dataFormat (d, f) {
// 	f = f || 'yyyy-MM-dd hh:mm:ss'
// 	let w = '星期', r = {
// 		yyyy: d.getFullYear(),
// 		MM: d.getMonth() + 1,
// 		dd: d.getDate(),
// 		hh: d.getHours(),
// 		mm: d.getMinutes(),
// 		ss: d.getSeconds(),
// 		ww: w + weeks[d.getDay()]
// 	}
// 	for (let k in r) {
// 		let v = r[k]
// 		if (k != 'yyyy' && v < 10) r[k] = '0' + v
// 	}
// 	return f.replace(/(?!\\)(yyyy|MM|dd|hh|mm|ss|ww)/gi, function (f) {
// 		return r[f]
// 	})
// }
// function left_zero_4(str) {
// 	if (str != null && str != '' && str != 'undefined') {
// 		if (str.length == 2) {
// 			return '00' + str;
// 		}
// 	}
// 	return str;
// }
// function toDate (v) {
// 	let t
// 	typeof v == 'string' && (t = v.indexOf('-') != -1 ? new Date(Date.parse(v.replace(/-/g, '/'))) : new Date(Number(v)))
// 	return !t && (t = new Date(v)), t
// }

const $utils = {
	isIos: function () {
		return navigator.userAgent.indexOf('cnhnb_iOS') !== -1
	},
	isAndroid: function () {
		return navigator.userAgent.indexOf('cnhnb_Android_') !== -1
	},
	isApp: function () {
		return this.isIos() || this.isAndroid()
	},
	dateFormat: function (v, f) {
		let d = toDate(v)
		return _dataFormat(d, f)
	},
	// 转unicode方法
	tounicode(str){
		if(str == '') return ''
		var value='';
		for (var i = 0; i < str.length; i++) {
			value += '\\u' + left_zero_4(parseInt(str.charCodeAt(i)).toString(16));
		}
		return value;
	},
	//获取唯一id
	generateUUID: function () {
		let d = new Date().getTime()
		let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			let r = (d + Math.random() * 16) % 16 | 0
			d = Math.floor(d / 16)
			return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16)
		})
		return uuid
	},
	getQueryString: function (name) {
		var after = window.location.hash.split('?')[1]
		if (after) {
			var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
			var r = after.match(reg)
			if (r != null) {
				return decodeURIComponent(r[2])
			}
			else {
				return null
			}
		}
	},
	/**
	 * 加载js
	 * @param url js的url地址
	 * @returns {Promise<any>}
	 */
	loadScript: function (url) {
		return new Promise((resolve, reject) => {
			var el = document.createElement('script')
			document.getElementsByTagName('head')[0].appendChild(el)
			el.src = url
			el.onload = function () {
				resolve(el)
			}
			el.onerror = function (msg, url, line) {
				reject('fail')
			}
		})
	}
}
const utilsInstall = function (Vue) {
	Vue.prototype.$utils = $utils
}
export {
	utilsInstall,
	$utils
}