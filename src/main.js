// 入口文件

import Vue from "vue"


// 按需導入Mint-UI中的組件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
// 導入App根組件

import "./lib/mui/css/mui.min.css"

import app from "./App.vue"

var vue = new Vue({
    el:"#app",
    render: c=>c(app)
})