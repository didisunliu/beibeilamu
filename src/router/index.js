import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)

const router = new Router({
	mode:"history",
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
		    meta: {title: '购物车', keepAlive: false}
	    },
	    {
		    path: '/submit',
		    component: _import('beila/submit'),
		    name: '确认订单',
			meta: {title: '确认订单', keepAlive: false}
			
		},
		{
		    path: '/user',
		    component: _import('beila/user'),
		    name: '个人中心',
			meta: {title: '个人中心', keepAlive: false}
			
		},
		{
		    path: '/online',
		    component: _import('beila/online'),
		    name: '在线支付',
			meta: {title: '在线支付', keepAlive: false}
			
	    },
		{
		    path: '/orderlist',
		    component: _import('beila/orderlist'),
		    name: '我的订单',
			meta: {title: '我的订单', keepAlive: false}
			
		},
		{
		    path: '/shoporder',
		    component: _import('beila/shoporder'),
		    name: '订单管理',
			meta: {title: '订单管理', keepAlive: false}
			
	    },
		{
		    path: '/myres',
		    component: _import('beila/myres'),
		    name: '我的提成',
			meta: {title: '我的提成', keepAlive: false}
			
		},
		{
		    path: '/purchase',
		    component: _import('beila/purchase'),
		    name: '代客下单',
			meta: {title: '代客下单', keepAlive: false}
			
	    },
		{
		    path: '/ordercenter',
		    component: _import('beila/ordercenter'),
		    name: '结算中心', 
			meta: {title: '结算中心', keepAlive: false}
			
		},
		{
		    path: '/record',
		    component: _import('beila/record'),
		    name: '提现记录',
			meta: {title: '提现记录', keepAlive: false}
			
		},
		{
		    path: '/mingxi',
		    component: _import('beila/mingxi'),
		    name: '明细',
			meta: {title: '明细', keepAlive: false}
			
		},
		{
		    path: '/seeuser',
		    component: _import('beila/seeuser'),
		    name: '查看会员',
			meta: {title: '查看会员', keepAlive: false}
			
		},
		{
		    path: '/paihang',
		    component: _import('beila/paihang'),
		    name: '查看排行',
			meta: {title: '查看排行', keepAlive: false}
			
	    },
		{
		    path: '/saleafter',
		    component: _import('beila/saleafter'),
		    name: '售后申请',
			meta: {title: '售后申请', keepAlive: false}
			
	    },
		{
		    path: '/shopindex',
		    component: _import('beila/shopindex'),
		    name: '首页',
			meta: {title: '首页', keepAlive: false} 
			
		},
		{
		    path: '/login',
		    component: _import('beila/login'),
		    name: '登录',
			meta: {title: '登录', keepAlive: false} 
			
		},
		{
		    path: '/loginment',
		    component: _import('beila/loginment'),
		    name: '登录',
			meta: {title: '登录', keepAlive: false} 
			
		},
		{
		    path: '/getInfo',
		    component: _import('beila/getInfo'),
		    name: '获取微信信息',
			meta: {title: '获取微信信息', keepAlive: false}  
			
		},
		{
		    path: '/adresslist',
		    component: _import('beila/adresslist'),
		    name: '地址列表',
			meta: {title: '地址列表', keepAlive: false}  
			
		},
		{
		    path: '/adressedit',
		    component: _import('beila/adressedit'),
		    name: '地址编辑',
			meta: {title: '地址编辑', keepAlive: false}  
			
		},
		{
		    path: '/orderdetail',
		    component: _import('beila/orderdetail'),
		    name: '订单详情',
			meta: {title: '订单详情', keepAlive: false}  
			
		},
		{
		    path: '/paysuccess',
		    component: _import('beila/paysuccess'),
		    name: '支付成功',
			meta: {title: '支付成功', keepAlive: false}  
			
		},
	    {
		    path: '*',
		    redirect: '/index'
	    }

    ]
})

router.beforeEach((to, from, next) => {
		next()
	
})
export default router