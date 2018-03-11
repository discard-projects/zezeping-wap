import Vue from 'vue'
import axios from 'axios'
let store = null
const cusAxios = axios.create({
  baseURL: process.env.API_ROOT,
  timeout: 90000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Api-Platform': 'pc'
  }
})
cusAxios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// Add a request interceptor
cusAxios.interceptors.request.use(function (config) {
  // Do something before request is sent
  Object.assign(config.headers, tokenHeader())
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// Add a response interceptor
cusAxios.interceptors.response.use(function (response) {
  // Do something with response data
  if (response.data.msg) {
    Vue.prototype.$message({ showClose: true, message: response.data.msg, type: 'success' })
  } else if (response.status === 204) {
    Vue.prototype.$message({ showClose: true, message: 'success', type: 'success' })
  }
  return response
}, function (error) {
  // Do something with response error
  if (error.response) {
    if (error.response.status === 403) {
      Vue.prototype.$message({ showClose: true, message: 'token overdue!', type: 'error' })
      store.dispatch('logout')
    } else if (error.response.status === 401) {
      Vue.prototype.$message({ showClose: true, message: error.response.data.msg || error.response.data.errors, type: 'error' })
      store.dispatch('logout')
    } else if (error.response.status === 429) {
      Vue.prototype.$message({ showClose: true, message: error.response.data, type: 'error' })
    } else if (error.response.status === 500) {
      Vue.prototype.$message({ showClose: true, message: 'data error!', type: 'error' })
    } else if (error.response.status === 404) {
      Vue.prototype.$message({ showClose: true, message: '404 Not Found!', type: 'error' })
    } else if (error.response.data && error.response.data.msg) {
      Vue.prototype.$message({ showClose: true, message: error.response.data.msg, type: 'error' })
    }
  } else {
    Vue.prototype.$message({ showClose: true, message: 'network error', type: 'error' })
  }
  return Promise.reject(error)
})

const tokenHeader = () => {
  const authInfo = store.state.user.authInfo
  if (authInfo) {
    return {
      'access-token': authInfo['token'],
      client: authInfo['client'],
      uid: authInfo['uid']
    }
  }
  return {}
}

var api = {
  // login and auth
  login: (data) => cusAxios.post('auth/sign_in', data),
  register: (data) => cusAxios.post('auth', data),
  logout: () => cusAxios.delete('/auth/sign_out'),
  loginFromGithub: (data) => cusAxios.get('auth/github', data),
  // validateToken: () => instance.get('auth/validate_token'),
  // must auth
  getMeProfile: () => cusAxios.get('v1/profile'),
  putProfile: (data) => cusAxios.put('v1/profile', data),
  // Home
  getHome: () => cusAxios.get('v1/home'),
  getHomeStores: (params) => cusAxios.get('v1/home/stores', { params }),
  getStores: (params) => cusAxios.get(`v1/stores`, { params }),
  getStore: (id) => cusAxios.get(`v1/stores/${id}`),
  getStoreComments: (storeId) => cusAxios.get(`v1/stores/${storeId}/comments`),
  postStoreComment: (storeId, data) => cusAxios.post(`v1/stores/${storeId}/comments`, data),
  postAttachmentImage: (data) => cusAxios.post('v1/attachment_images', data, {headers: { 'Content-Type': 'multipart/form-data' }})
}
api.install = function (Vue, options) {
  if (options.store) {
    store = options.store
  }
  Vue.prototype.api = api
  Vue.prototype.cusAxios = cusAxios
  Vue.prototype.axios = axios
}
export default api
