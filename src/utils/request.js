import axios from 'axios'
import { Toast } from 'vant'
import config from '../config'

// create an axios instance

const service = axios.create({
	baseURL: config.restful.service, // api的base_url
	timeout: 5000 // request timeout
})
// respone interceptor
service.interceptors.response.use(
	response => {
		const res = response.data;
		// 通过response的errorCode来标示请求状态
		if (res && res.errorCode) {
			Toast("系统繁忙，请稍后再试...");
			return Promise.reject(res.message);
		} else {
			return res;
		}
	},
	error => {
		console.log('err' + error)// for debug
		//Toast(error.message)
		Toast("系统繁忙，请稍后再试...")
		
		return Promise.reject(error)
	})

export default service
