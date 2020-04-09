import axios from 'axios'
import { baseUrl } from './url'

let service = axios.create({
	baseUrl: baseUrl, // 请求前缀
	timeout: 55000, // 请求超时时间
	// crossDomain: true, // 设置cross跨域
	// withCredentials: false // 设置cross跨域 并设置访问权限 允许跨域携带cookie信息
})

service.defaults.baseURL = baseUrl

// 设置 post 默认 Content-Type
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 添加请求拦截器
service.interceptors.request.use(
	config => {

		// 这里可以添加head 部分
		return config
	}, 
	err => {

		// 请求错误处理
		return Promise.reject(err)
})

// 添加响应拦截器
service.interceptors.response.use(
	response => {

		let { data } = response

		return data
	}, 
	err => {

		// 响应错误处理
		return Promise.reject(err)
})


export default service