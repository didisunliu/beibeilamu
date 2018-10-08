import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)

const router = new Router({
    routes: [

	    {
		    path: '/index',
		    component: _import('beila/index'),
		    name: '贝拉优选',
		    meta: {
			    title: '贝拉优选',
			    keepAlive: true,
			    
		    }
	    },
	    {
		    path: '/detail',
		    component: _import('beila/detail'),
		    name: '商品详情',
		    meta: {
		    	title: '商品详情',
			    keepAlive: true,
			    
		    }
	    },
	   
	    {
		    path: '/mycar',
			component: _import('beila/mycar'),
		    name: '购物车',
		    meta: {title: '购物车', keepAlive: true}
	    },
	    {
		    path: '/submit',
		    component: _import('beila/submit'),
		    name: '确认订单',
			meta: {title: '确认订单', keepAlive: true}
			
		},
		{
		    path: '/user',
		    component: _import('beila/user'),
		    name: '个人中心',
			meta: {title: '个人中心', keepAlive: true}
			
		},
		{
		    path: '/online',
		    component: _import('beila/online'),
		    name: '在线支付',
			meta: {title: '在线支付', keepAlive: true}
			
	    },
		{
		    path: '/orderlist',
		    component: _import('beila/orderlist'),
		    name: '我的订单',
			meta: {title: '我的订单', keepAlive: true}
			
		},
		{
		    path: '/shoporder',
		    component: _import('beila/shoporder'),
		    name: '订单管理',
			meta: {title: '订单管理', keepAlive: true}
			
	    },
		{
		    path: '/myres',
		    component: _import('beila/myres'),
		    name: '我的提成',
			meta: {title: '我的提成', keepAlive: true}
			
	    },
		{
		    path: '/ordercenter',
		    component: _import('beila/ordercenter'),
		    name: '结算中心',
			meta: {title: '结算中心', keepAlive: true}
			
		},
		{
		    path: '/seeuser',
		    component: _import('beila/seeuser'),
		    name: '查看会员',
			meta: {title: '查看会员', keepAlive: true}
			
	    },
		{
		    path: '/saleafter',
		    component: _import('beila/saleafter'),
		    name: '售后申请',
			meta: {title: '售后申请', keepAlive: true}
			
	    },
		{
		    path: '/shopindex',
		    component: _import('beila/shopindex'),
		    name: '首页',
			meta: {title: '首页', keepAlive: true} 
			
		},
		{
		    path: '/login',
		    component: _import('beila/login'),
		    name: '登录',
			meta: {title: '登录', keepAlive: true} 
			
		},
		{
		    path: '/loginment',
		    component: _import('beila/loginment'),
		    name: '登录',
			meta: {title: '登录', keepAlive: true} 
			
		},
		{
		    path: '/getInfo',
		    component: _import('beila/getInfo'),
		    name: '获取微信信息',
			meta: {title: '获取微信信息', keepAlive: true}  
			
		},
		{
		    path: '/adresslist',
		    component: _import('beila/adresslist'),
		    name: '地址列表',
			meta: {title: '地址列表', keepAlive: true}  
			
		},
		{
		    path: '/adressedit',
		    component: _import('beila/adressedit'),
		    name: '地址编辑',
			meta: {title: '地址编辑', keepAlive: true}  
			
		},
	    {
		    path: '*',
		    redirect: '/index'
	    }

    ]
})

router.beforeEach((to, from, next) => {
	document.title = to.meta.title
	// if (from.path !== '/') {
	// 	router.go(to.path)
	//   }
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