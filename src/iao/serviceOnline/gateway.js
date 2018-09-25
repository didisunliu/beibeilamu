import request from '@/utils/request'
import config from '../../config'
const reqUser = function(o) {
	return request(Object.assign(o, {
		baseURL: config.serviceOnline.gateway,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}))
}
// 判断客服状态
export function tryOut(hnUserId) {
	return reqUser({
		url: '/ocsDialog/tryOut',
		method: 'post',
		params: {hnUserId}
	})
}
// 获取机器人云信的账号
export function getRobotAccid() {
	return reqUser({
		url: '/ocsUser/getRobotAccid',
		method: 'post'
	})
}
