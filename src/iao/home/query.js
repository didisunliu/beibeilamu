import request from '@/utils/request'



// 供应列表接口
export function getSupplyList(data) {
	return request({
		url: '/api/product/queryProduct',
		method: 'post',
		params: data
	})
}
// 供应详情接口
export function getProductInfo(data) {
	return request({
		url: '/api/product/getProductInfo',
		method: 'post',
		params: data
	})
}

// 发送短信
export function sendCode(data) {
	return request({
		url: '/api/sms/send',
		method: 'post',
		params: data
	})
}
// 短信验证
export function cryCode(data) {
	return request({
		url: '/api/sms/verify',
		method: 'post',
		params: data
	})
}

// 请求微信信息
export function getWeixinUserInfo(data) {
	return request({
		url: '/weixin/ticket/getWeixinUserInfo',
		method: 'post',
		params: data
	})
}
// 登录 
export function loginAndReg(data) {
	return request({
		url: '/api/member/loginAndReg',
		method: 'post',
		params: data
	})
}
// out登录 
export function loginOut(data) {
	return request({
		url: '/api/member/logout',
		method: 'post',
		params: data
	})
}
// 根据openId获取消费者
export function getMemberByOpenId(data) {
	return request({
		url: '/api/member/getLoginMemberByOpenId',
		method: 'post',
		params: data
	})
}
// 根据shopId获取店铺信息
export function getShopDes(data) {
	return request({
		url: '/api/distributionRegion/getDistributionRegion',
		method: 'post',
		params: data
	})
}