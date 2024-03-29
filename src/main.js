//导入样式
import 'normalize.css'
import 'font-awesome/scss/font-awesome.scss'
import 'element-ui/lib/theme-default/index.css'
import '../static/fonts/iconfont.css'
//导入Vue框架
import Vue from 'vue'
//导入element组件
import ElementUI from 'element-ui'
//导入组件
import router from './router'
//导入状态管理器
import store from 'store'
//导入请求框架
import api from './api'
//导入自定义插件
import Plugins from 'plugins'
//导入主视图文件
import App from './App'
//到入echarts
import echarts from 'echarts'
import axios from 'axios'
import * as port from 'common/config'

//使用element-ui
Vue.use(ElementUI)

//使用自定义插件
Vue.use(Plugins)

//使用api
Vue.use(api)

//绑定到Vue原型
Vue.prototype.$echarts = echarts;
Vue.prototype.$ajax = axios;

axios.defaults.baseURL = '/educationtrain-web/';
// Vue.prototype.$ajax.baseUrl = port.server_base_api_url


//发布后是否显示提示
Vue.config.productionTip = false

//是否开启工具调试
Vue.config.devtools = process.env.NODE_ENV === 'development'

var app = new Vue({
  router,
  store,
  ...App
}).$mount('mainbody')

console.log(app);
