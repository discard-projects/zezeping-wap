import Vue from 'vue'
import axios from 'axios'
const rotten = require('rotten-encryption2')('zezeping', true)
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
  try {
    response.data = rotten.decode(response.data)
    response.data = JSON.parse(response.data)
  } catch (err) {
    console.log(err)
  }
  // Do something with response data
  if (response.data.msg) {
    Vue.prototype.wapUi.WapToastBox.new({message: response.data.msg, icon: 'icon-success', timeout: 2000})
  } else if (response.status === 204) {
    Vue.prototype.wapUi.WapToastBox.new({message: 'success', icon: 'icon-success', timeout: 2000})
  }
  return response
}, function (error) {
  // Do something with response error
  if (error.response) {
    if (error.response.status === 403) {
      Vue.prototype.wapUi.WapToastBox.new({message: 'token overdue!', timeout: 2000})
      store.dispatch('logout')
    } else if (error.response.status === 401) {
      Vue.prototype.wapUi.WapToastBox.new({ message: error.response.data.msg || error.response.data.errors, type: 'error', timeout: 2000 })
      store.dispatch('logout')
    } else if (error.response.status === 429) {
      Vue.prototype.wapUi.WapToastBox.new({ message: error.response.data, timeout: 2000 })
    } else if (error.response.status === 500) {
      Vue.prototype.wapUi.WapToastBox.new({ message: 'data error!', timeout: 2000 })
    } else if (error.response.status === 404) {
      Vue.prototype.wapUi.WapToastBox.new({ message: '404 Not Found!', timeout: 2000 })
    } else if (error.response.data && error.response.data.msg) {
      Vue.prototype.wapUi.WapToastBox.new({ message: error.response.data.msg, timeout: 2000 })
    }
  } else {
    Vue.prototype.wapUi.WapToastBox.new({ message: 'network error', timeout: 2000 })
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
  getCategoryStores: (categoryId, params) => cusAxios.get(`v1/categories/${categoryId}/stores`, { params }),
  getStores: (params) => cusAxios.get(`v1/stores`, { params }),
  getStore: (id) => cusAxios.get(`v1/stores/${id}`),
  getStoreDetail: (id) => cusAxios.get(`v1/stores/${id}/detail`),
  getStoreComments: (storeId) => cusAxios.get(`v1/stores/${storeId}/comments`),
  postStoreComment: (storeId, data) => cusAxios.post(`v1/stores/${storeId}/comments`, data),
  postAttachmentImage: (data) => cusAxios.post('v1/attachment_images', data, {headers: { 'Content-Type': 'multipart/form-data' }}),
  // category
  getCategory: (id) => cusAxios.get(`v1/categories/${id}`),
  // moments
  getMoments: (params) => cusAxios.get(`v1/moments`, { params }),
  getStoreMomments: (storeId, params = {}) => cusAxios.get(`v1/moments`, {params: Object.assign(params, {q_store_id_eq: storeId})}),
  postMoment: (data) => cusAxios.post(`v1/moments`, data),
  // subjects (可探讨的主题)
  getSubjects: (params) => cusAxios.get(`v1/subjects`, { params }),
  postSubject: (data) => cusAxios.post(`v1/subjects`, data),
  postSubjectDiscussions: (subjectId, data) => cusAxios.post(`v1/subjects/${subjectId}/discussions`, data)
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
