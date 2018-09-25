import request from '@/utils/request'

// 保障金零批查询
export function querySmallBatch(data) {
	return request({
		url: '/esearch/smallBatch/v1/querySmallBatch',
		method: 'post',
		data
	})
}
// 热门保障金零批推荐
export function queryHotSmallBatch(data) {
	return request({
		url: '/esearch/smallBatch/v1/queryHotSmallBatch',
		method: 'post',
		data
	})
}
// 类目推荐接口
export function getBehaviorCate(deviceId, length, hnUserId) {
	return request({
		url: '/esearch/smallBatch/v1/getBehaviorCate',
		method: 'post',
		params: {
			deviceId, // 设备号
			length,
			hnUserId
		}
	})
}
// 供应推荐接口
export function getBehaviorSupply(deviceId, length, hnUserId) {
	return request({
		url: '/esearch/smallBatch/v1/getBehaviorSupply',
		method: 'post',
		params: {
			deviceId, // 设备号
			length,
			hnUserId
		}
	})
}
