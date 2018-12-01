import Vue from 'vue'
import Axios from 'axios'
import qs from 'qs'

// axios 默认配置
Axios.defaults.timeout = kindo.config.REQUEST_TIME_OUT

// http request 拦截器
Axios.interceptors.request.use(
  request => {
    kindo.globalBus.$emit('loading', true, request)

    request.headers['Content-Type'] = request.headers['Content-Type'] || 'application/json;charset=UTF-8'
    request.url = kindo.util.setUri(request.url)
    request.url = request.url.restfulFormat(request.params)
    request.paramsSerializer = function(params) {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    }

    if (kindo.cache.get(kindo.constant.USER_TOKEN)) {
      request.headers.Token = kindo.cache.get(kindo.constant.USER_TOKEN)

      // 获取当前的menu
      if (kindo.cache.get(kindo.constant.USER_MENU)) {
        const routerName = kindo.globalBus.$route.path.split('/_/')[1]
        const currentMenu = kindo.cache.get(kindo.constant.USER_MENU).find(item => item.id === routerName)
        if (currentMenu) {
          request.headers.Ext = window.encodeURIComponent(JSON.stringify({ menuId: currentMenu.id, menuName: currentMenu.name }))
        }
      }
    }
    return request
  },
  error => {
    return Promise.reject(error)
  }
)

Axios.interceptors.response.use(
  response => {
    kindo.globalBus.$emit('loading', false, response)
    if (response.data.code === 200 || response.data.code === '200' || response.data.code === 0 || response.data.code === '0') {
      return response.data
    } else if (response.data.code) {
      switch (response.data.code) {
        case '999' || 999:
          kindo.util.alert(response.data.data, response.data.code, 'warning')
          break
        case 731:
          kindo.util.alert(response.data.message, response.data.code, 'warning')
          break
        case 753:
          kindo.util.alert(response.data.message, response.data.code, 'warning')
          break
        case 762:
          kindo.util.alert(response.data.message + '；即将返回登录', response.data.code, 'warning')
          setTimeout(() => {
            kindo.globalBus.$router.push('/login')
          }, 2000)
          break
        default:
          kindo.util.alert(response.data.message || '未知错误', response.data.code, 'warning')
          break
      }
    } else {
      return Promise.reject(response.data)
    }
  },
  error => {
    kindo.globalBus.$emit('loading', false, error)

    if (error.response) {
      switch (error.response.status) {
        case 401:
          break
        case 404:
          kindo.util.alert('Web 服务器找不到您所请求的文件或脚本。请检查URL 以确保路径正确', '404 未找到', 'warning')
          break
        case 405:
          kindo.util.alert('对于请求所标识的资源，不允许使用请求行中所指定的方法。请确保为所请求的资源设置了正确的 MIME 类型', '405 不允许此方法', 'warning')
          break
        case 406:
          kindo.util.alert('根据此请求中所发送的“接受”标题，此请求所标识的资源只能生成内容特征为“不可接受”的响应实体', '406 不可接受', 'warning')
          break
        case 500:
          kindo.util.alert('Web 服务器不能执行此请求，请稍后重试此请求', '500 服务器的内部错误', 'warning')
          break
        case 501:
          kindo.util.alert('Web 服务器不支持实现此请求所需的功能。请检查URL 中的错误，如果问题依然存在，请与 Web服务器的管理员联系', '501 未实现', 'warning')
          break
        default:
          kindo.util.alert(error.response.statusText || '未知错误, 请联系管理员', error.response.status, 'warning')
          break
      }
      return Promise.reject(error)
    } else {
      // kindo.util.alert(error.message || '未知错误, 请联系管理员', '提示', 'warning')
      kindo.util.alert('未知错误, 请联系管理员', '提示', 'warning')
    }
    return Promise.reject(error)
  }
)

Vue.prototype.$http = Axios

export default Axios
