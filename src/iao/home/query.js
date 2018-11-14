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
export function sendCodes(data) {
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
// 分销商登录 
export function shoploginAndReg(data) {
	return request({
		url: '/api/distributor/login',
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
// 根据openId获取分销商
export function getShopByOpenId(data) {
	return request({
		url: '/api/distributor/getDistributorByOpenId',
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

//添加到购物车
export function addMyCar(data) {
	return request({
		url: '/api/shoppingCart/addShoppingCart',
		method: 'post',
		params: data
	})
}
//删除到购物车
export function delMyCar(data) {
	return request({
		url: '/api/shoppingCart/deleteShoppingCart',
		method: 'post',
		params: data
	})
}
//购物车数量编辑
export function updateMyCar(data) {
	return request({
		url: '/api/shoppingCart/updateShoppingCartNum',
		method: 'post',
		params: data
	})
}
//查询购物车
export function queryMyCar(data) {
	return request({
		url: '/api/shoppingCart/queryShoppingCart',
		method: 'post',
		params: data
	})
}
//立即买
export function buyNow(data) {
	return request({
		url: '/api/shoppingCart/buyNow',
		method: 'post',
		params: data
	})
}
//更改状态
export function updateChecked(data) {
	return request({
		url: '/api/shoppingCart/updateShoppingCartChecked',
		method: 'post',
		params: data
	})
}
//用户新增订单
export function addOrder(data) {
	return request({
		url: '/api/order/saveMemberOrder',
		method: 'post',
		data: data
	})
}
//订单查询
export function queryOrder(data) {
	return request({
		url: '/api/order/queryOrder',
		method: 'post',
		params: data
	})
}
//关注
export function subscribe(data) {
	return request({
		url: '/api/productSubscription/subscribe',
		method: 'post',
		params: data
	})
}
//取消关注
export function unsubscribe(data) {
	return request({
		url: '/api/productSubscription/unsubscribe',
		method: 'post',
		params: data
	})
}
//获取下级地区列表
export function getArea(data) {
	return request({
		url: '/api/getAreasByParentId',
		method: 'post',
		params: data
	})
}
//新增收货地址
export function addAddress(data) {
	return request({
		url: '/api/deliveryAddress/saveDeliveryAddress',
		method: 'post',
		params: data
	})
}
//查询收货地址
export function queryAddress(data) {
	return request({
		url: '/api/deliveryAddress/queryDeliveryAddress',
		method: 'post',
		params: data
	})
}
//新增收货地址
export function updateAddress(data) {
	return request({
		url: '/api/deliveryAddress/updateDeliveryAddress',
		method: 'post',
		params: data
	})
}
//设置默认收货地址
export function setDefAddress(data) {
	return request({
		url: '/api/deliveryAddress/setDef',
		method: 'post',
		params: data
	})
}
//根据主键获取收货地址
export function queryDefAddress(data) {
	return request({
		url: '/api/deliveryAddress/getDeliveryAddress',
		method: 'post',
		params: data
	})
}

//根据主键删除收货地址
export function delDefAddress(data) {
	return request({
		url: '/api/deliveryAddress/deleteDeliveryAddress',
		method: 'post',
		params: data
	})
}
//确认订单
export function enterOrder(data) {
	return request({
		url: '/api/shoppingCart/enterOrder',
		method: 'post',
		params: data
	})
}
//请求驻入微信js
export function getPay(data) {
	return request({
		url: 'http://yx.jytzn.com/weixin/ticket/jssdk',
		method: 'post',
		data: data
	})
}
//去支付
export function goPay(data) {
	return request({
		url: 'http://yx.jytzn.com/weixin/pay/unifiedOrder',
		method: 'post',
		params: data
	})
}
//获取订单
export function getOrderInfo(data) {
	return request({
		url: '/api/order/getOrder',
		method: 'post',
		params: data
	})
}

//购买记录
export function buyRecord(data) {
	return request({
		url: '/api/order/buyRecord',
		method: 'post',
		params: data
	})
}

//购买统计
export function buyRecordTotal(data) {
	return request({
		url: '/api/order/buyRecordTotal',
		method: 'post',
		params: data
	})
}
//查询是否关注
export function isSubscription(data) {
	return request({
		url: '/api/productSubscription/isSubscription',
		method: 'post',
		params: data
	})
}
//订单提交前检验
export function checkoutOrder(data) {
	return request({
		url: '/api/shoppingCart/enterOrderCheck',
		method: 'post',
		params: data
	})
}


// shopindex 商家信息  /api/order/shopIndex
export function queryShopInfo(data) {
	return request({
		url: '/api/order/shopIndex',
		method: 'post',
		params: data
	})
}
//查看排行
export function queryPaihang(data) {
	return request({
		url: '/api/order/ranking',
		method: 'post',
		params: data
	})
}

//代客下单 查询产品
export function queryProduct(data) {
	return request({
		url: '/api/product/queryProduct',
		method: 'post',
		params: data
	})
}
// 查询售后申请
export function querySaleOrder(data) {
	return request({
		url: '/api/orderAfterSale/queryOrderAfterSale',
		method: 'post',
		params: data
	})
}
// 取消售后
export function cancelOrderAfterSale(data) {
	return request({
		url: '/api/orderAfterSale/cancelOrderAfterSale',
		method: 'post',
		params: data
	})
}
// 申请售后
export function saveOrderAfterSale(data) {
	return request({
		url: '/api/orderAfterSale/saveOrderAfterSale',
		method: 'post',
		params: data
	})
}
//我的提成
export function sumBrokerage(data) {
	return request({
		url: '/api/order/sumBrokerage',
		method: 'post',
		params: data
	})
}
//我的结算中心
export function getDistributorMoney(data) {
	return request({
		url: '/api/kickbackDetail/getDistributorMoney',
		method: 'post',
		params: data
	})
}
//申请提现
export function getApply(data) {
	return request({
		url: '/api/kickbackDetail/apply',
		method: 'post',
		params: data
	})
}
//提现记录
export function queryKickbackDetail(data) {
	return request({
		url: '/api/kickbackDetail/queryKickbackDetail',
		method: 'post',
		params: data
	})
}
//删除订单
export function deleteOrder(data) {
	return request({
		url: '/api/order/deleteOrder',
		method: 'post',
		params: data
	})
}
//去提货
export function pickupOrder(data) {
	return request({
		url: '/api/order/pickupOrder',
		method: 'post',
		params: data
	})
}
//查看会员
export function seeUser(data) {
	return request({
		url: '/api/order/seeUser',
		method: 'post',
		params: data
	})
}


