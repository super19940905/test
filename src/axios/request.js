import axios from 'axios'
import qs from 'qs'
//统一接口路径
axios.defaults.baseURL = 'http://www.hanyu.fit:8000'
//设置超时时间和跨越是否允许携带凭证
axios.defaults.timeout = 4000
axios.defaults.withCredentials = true
//设置请求数据的格式
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = data => qs.stringify(data)

//设置拦截器
axios.interceptors.request.use(confing => {
    return confing
},err => {
    return err
})

//设置响应拦截
axios.interceptors.response.use(res => {
    return res
},err => {
    return err
})

export default axios