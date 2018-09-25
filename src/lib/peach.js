/**
 * 封装埋点peach
 */

import axios from 'axios'
import { $utils } from '../utils'
import { $cookie } from './cookie'
import { $app } from './hybrid'
import env from './config'

const COOKIE_PARENT_SPAN_ID = 'parent_span_id'
const COOKIE_PARENT_URL = 'parent_url'

let $peach = {
	off: env.env === 'dev', //开发模式关闭埋点
	currentPageId: '',

	init (pageId, pageName) {
		this.currentPageId = pageId
		if (this.off) {
			console.log('触发页面埋点 id -> ' + pageId + ' name -> ' + pageName)
			return
		}
		let span_id_uid = $utils.generateUUID()//生成页面唯一id
		let parent_span_id = $cookie.get(COOKIE_PARENT_SPAN_ID) || ''
		let ref = $cookie.get(COOKIE_PARENT_URL) || ''
		$cookie.set(COOKIE_PARENT_SPAN_ID, span_id_uid, {expires: 1, path: '/', domain: '', secure: false})
		$cookie.set(COOKIE_PARENT_URL, window.location.href, {expires: 1, path: '/', domain: '', secure: false})
		axios.post(env.peach + '/userlog/write/log/file/h5', {
			'event_type': 'page',//所属的类型 用于区分大的打点类型
			'page': [
				{
					'device_id': $app.settings.deviceId || '',//设备id，h5通过app的接口拿到
					'trace_id': $app.settings.sessionId || '',//一次系列页面访问的唯一标志 sessionID
					'span_id': span_id_uid,//一次具体页面访问的标志 自己生成唯一id
					'parent_span_id': parent_span_id,//上一次具体页面访问的标志 父自己生成唯一id
					'type': 'h5',//终端类型
					'ua': navigator.userAgent,//User Agent
					'url': window.location.href || '',//当前页面的url
					'ref': ref,//上一个页面的url
					'duration_time': '',//页面持续停留时间
					'page_id': pageId,//当前页面编码
					'page_name': pageName,//当前页面的名称
					'request_date': $utils.dateFormat((new Date).getTime(), 'yyyy-MM-dd'),//访问页面的日期
					'timestamp': (new Date).getTime()//访问页面的准确时间
				}
			]
		})
	},
	pushEvent (eventId, eventName, eventData, eventType) {
		if (this.off) {
			console.log('触发事件埋点 id -> ' + this.currentPageId + eventId + ' name -> ' + eventName + (eventData ? ' data -> ' + eventData : ''))
			return
		}
		let span_id_uid = $utils.generateUUID()
		let web_event_uid = $utils.generateUUID()
		axios.post(env.peach + '/userlog/write/log/file/h5', {
			'event_type': 'event',//所属的类型
			'event': [
				{
					'device_id': $app.settings.deviceId || '',//设备id，h5通过app的接口拿到
					'trace_id': $app.settings.sessionId || '',//一次系列页面访问的唯一标志 sessionID
					'span_id': span_id_uid,//一次具体页面访问的标志 自己生成唯一id
					'web_event_uid': web_event_uid,//每次点击事件唯一id
					'web_event_id': this.currentPageId + eventId,//事件id
					'web_event_name': eventName,//事件名称
					'web_business_event': eventData || '',//业务事件数据
					'web_path': '',//浏览web的path  预留暂时不传
					'ua': navigator.userAgent,//User Agent
					'request_date': $utils.dateFormat((new Date).getTime(), 'yyyy-MM-dd'),//访问页面的日期
					'timestamp': (new Date).getTime(),//访问页面的准确时间
					'type': 'h5',//终端类型
					'event_type': eventType ? eventType : 'click'
				}
			]//事件记录list
		})
	},
	recommend (params) {
		axios.post(env.peach + '/userlog/write/log/file/h5', {
			'event_type': 'recommend',//所属的类型 用于区分大的打点类型
			'recommend': [
				{
					'device_id': $app.settings.deviceId || '',//设备id，h5通过app的接口拿到
					'trace_id': $app.settings.sessionId || '',// sessionID
					'recommend_id': '',//当前推荐会话id
					'key_value': params.key_value || '',//附带参数键值对
					'type': 'h5',//终端类型
					'event_type': params.event_type,//用于标识推荐类型，目前使用1表示认证货源
					'event_uid': $utils.generateUUID(),//事件唯一id
					'event_id': params.event_id,//事件id
					'event_name': params.event_name,//事件名称
					'timestamp': (new Date).getTime()//访问页面的准确时间
				}
			]
		})
	}
}

const peachInstall = function (Vue) {
	Vue.prototype.$peach = $peach
}

export {
	peachInstall,
	$peach
}
