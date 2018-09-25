import request from '@/utils/request'
import config from '../../config'
const reqUser = function(o) {
	return request(Object.assign(o, {
		baseURL: config.serviceOnline.banana,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}))
}
// 通过ticket获取用户ID 云信账号 云信token
export function queryUserInfo(data) {
	return reqUser({
		url: '/ocs/access/token',
		method: 'post',
		params: {ticket: data.ticket}
	})
}

// 建立连接
export function connection(data) {
	return reqUser({
		url: '/ocs/access/connection',
		method: 'post',
		params: {
			ticket: data.ticket
		}
	})
}
// 请求客服资源
export function os(data) {
	return reqUser({
		url: '/ocs/access/app/os',
		method: 'post',
		params: {
			ticket: data.ticket
		}
	})
}
// 分页查询消息列表
export function search(data) {
	return reqUser({
		url: '/ocs/access/manager/search',
		method: 'post',
		params: {
			businessType: data.businessType,
			endTime: data.endTime,
			hnUserId: data.hnUserId,
			pageNum: data.pageNum,
			pageSize: data.pageSize,
			ticket : data.ticket
		}
	})
}

