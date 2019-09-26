// 入口文件

import Vue from "vue"

// 1.1 導入 路由的包
import VueRouter from "vue-router"
// 1.2
Vue.use(VueRouter)


// 2.1 導入axios
// 2.2 安裝 axios
import axios from 'axios'
Vue.prototype.$ajax = axios


// 按需導入Mint-UI中的組件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// 1.3 導入自己的router.js路由模塊



// 導入App根組件
import "./lib/mui/css/mui.min.css"
import "./lib/mui/css/icons-extra.css"

import router from "./router.js"


import app from "./App.vue"

// 導入時間插件
import moment from "moment"

// 定義全局過濾器
Vue.filter("dataFormat", function(dataStr, pattern="YYY-MM-DD HH:mm:ss"){
    moment(dataStr.format(pattern))
})


var vue = new Vue({
    el:"#app",
    render: c=>c(app),
    router // 1.4 掛載路由到實例模塊上
})