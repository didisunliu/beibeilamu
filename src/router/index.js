import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)

const router = new Router({
    routes: [

	    {
		    path: '/index',
		    component: _import('zeroBatchArea/index'),
		    name: 'ZeroBatchArea',
		    meta: {
			    title: '雨花碧水龙庭店',
			    keepAlive: true,
			    
		    }
	    },
	    {
		    path: '/detail',
		    component: _import('zeroBatchArea/detail'),
		    name: 'ZeroBatchAreaList',
		    meta: {
		    	title: '商品详情',
			    keepAlive: false,
			    
		    }
	    },
	   
	    {
		    path: '/mycar',
			component: _import('zeroBatchArea/mycar'),
		    name: '购物车',
		    meta: {title: '购物车', keepAlive: false}
	    },
	    {
		    path: '/submit',
		    component: _import('zeroBatchArea/submit'),
		    name: '确认订单',
			meta: {title: '确认订单', keepAlive: false}
			
		},
		{
		    path: '/user',
		    component: _import('zeroBatchArea/user'),
		    name: '个人中心',
			meta: {title: '个人中心', keepAlive: false}
			
		},
		{
		    path: '/online',
		    component: _import('zeroBatchArea/online'),
		    name: '在线支付',
			meta: {title: '在线支付', keepAlive: false}
			
	    },
		{
		    path: '/orderlist',
		    component: _import('zeroBatchArea/orderlist'),
		    name: '我的订单',
			meta: {title: '我的订单', keepAlive: false}
			
		},
		{
		    path: '/shoporder',
		    component: _import('zeroBatchArea/shoporder'),
		    name: '订单管理',
			meta: {title: '订单管理', keepAlive: false}
			
	    },
		{
		    path: '/myres',
		    component: _import('zeroBatchArea/myres'),
		    name: '我的提成',
			meta: {title: '我的提成', keepAlive: false}
			
	    },
		{
		    path: '/ordercenter',
		    component: _import('zeroBatchArea/ordercenter'),
		    name: '结算中心',
			meta: {title: '结算中心', keepAlive: false}
			
		},
		{
		    path: '/seeuser',
		    component: _import('zeroBatchArea/seeuser'),
		    name: '查看会员',
			meta: {title: '查看会员', keepAlive: false}
			
	    },
		{
		    path: '/saleafter',
		    component: _import('zeroBatchArea/saleafter'),
		    name: '售后申请',
			meta: {title: '售后申请', keepAlive: false}
			
	    },
		{
		    path: '/shopindex',
		    component: _import('zeroBatchArea/shopindex'),
		    name: '首页',
			meta: {title: '首页', keepAlive: false} 
			
		},
		{
		    path: '/login',
		    component: _import('zeroBatchArea/login'),
		    name: '登录',
			meta: {title: '登录', keepAlive: false} 
			
		},
		{
		    path: '/loginment',
		    component: _import('zeroBatchArea/loginment'),
		    name: '登录',
			meta: {title: '登录', keepAlive: false} 
			
		},
		{
		    path: '/getInfo',
		    component: _import('zeroBatchArea/getInfo'),
		    name: '获取微信信息',
			meta: {title: '获取微信信息', keepAlive: false}  
			
		},
		{
		    path: '/adresslist',
		    component: _import('zeroBatchArea/adresslist'),
		    name: '地址列表',
			meta: {title: '地址列表', keepAlive: false}  
			
		},
		{
		    path: '/adressedit',
		    component: _import('zeroBatchArea/adressedit'),
		    name: '地址编辑',
			meta: {title: '地址编辑', keepAlive: false}  
			
	    },
	    {
		    path: '*',
		    redirect: '/index'
	    }

    ]
})

router.beforeEach((to, from, next) => {
	document.title = to.meta.title
		next()
	// if (to.meta.needLogin) {
	// 	$app.login().then(() => {
	// 		next()
	// 	})
	// } else {
	// 	if (to.meta.peach) {
	// 		$peach.init(to.meta.peach.id, to.meta.peach.name)
	// 	}
	// 	document.title = to.meta.title
	// 	next()
	// }
})
export default router