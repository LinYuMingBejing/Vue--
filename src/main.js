// 入口文件

import Vue from "vue"

// 1.1 導入 路由的包
import VueRouter from "vue-router"
// 1.2
Vue.use(VueRouter)


// 註冊Vuex
import Vuex from "vuex"

Vue.use(Vuex)
// 每次剛進入網站，肯定會 調用main.js，在剛調用的時候，先從本地存儲中，把購物車中數據讀出來，放到store中
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
    state:{ // this.$store.state.***
        car : car
        //將購物車中的商品數據，用一個數組存儲起來，在car數組中，存儲一些商品的對象，
        // 可以暫時將這個商品對向，
        // 設計成: { id:商品id, count:購買數量, price:商品價格, selected:false }
    },
    mutations:{ //this.$store.commit('方法的名稱','按需傳遞唯一的參數')
        addToCar(state, goodsinfo){
            // 點擊加入購物車，把商品信息，保存到store中的car上
            // 分析:
            // 1. 如果購物車中，之前就已經有對應的商品了，那麼只需要更新數量
            // 2. 如果沒有，則直接把 商品數據，push到car中即可
            
            // 假設 在購物車中，沒有找到對應的商品
            var flag = false
            state.car.some( item=>{
                if (item.id == goodsinfo.id){
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return true
                }
            })
            // 如果最終循環完畢，得到的flag還是false
            if(!flag){
                state.car.push(goodsinfo)
            }
            // 當更新car之後，把car數組，存儲到本地的localStorage中
            localStorage.setItem("car",JSON.stringify(state.car))

        },
        updateGoodsIngo(state, goodsinfo){
            // 修改購物車中商品數量值
            // 分析:
            state.car.some(item=>{
                if(item.id == goodsinfo.id){
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            // 當修改完上品數量，把最新購物車數據，保存到本地中
            localStorage.setItem("car",JSON.stringify(state.car))

        },
        removeFromCar(state,id){
            // 根據id，從store的購物車中刪除對應的那條商品數據
            state.car.some((item,i) =>{
                if(item.id ==id){
                    state.car.splice(i, 1)
                    return true
                }
            })
            // 將刪除完畢後的最新購物車數據，同步到本地中
            localStorage.setItem("car",JSON.stringify(state.car))
        },
        updataGoodsSelected(state, info){
            state.car.some( item=>{
                if (item.id == info.id){
                    item.selected = info.selected
                }
            })
            // 把最新所有購物車商品狀態 保存到store中去
            localStorage.setItem("car",JSON.stringify(state.car))
        }
    },
    getters:{ //this.$store.getters.***
        //相當於 計算屬性，也相當於filters
        getAllCount(state){
            var c =0;
            state.car.forEach(item => {
                c+= item.count
            })
            return c
            
        },
        getGoodsCount(state){
            var o = {}
            state.car.forEach(item=>{
                o[item.id] = item.count
            })
            return o
        },
        getGoodsSelected(state){
            var o = {}
            state.car.forEach(item =>{
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAndAmount(state){
            var o = {
                count:0, //勾選數量
                amount:0, //勾選價格
            }
            state.car.forEach(item=>{
                if(item.selected){
                    o.count +=item.count
                    o.amount += item.price + item.count
                }
            })
            return o
        }
    }
})



// 2.1 導入axios
// 2.2 安裝 axios
import axios from 'axios'
Vue.prototype.$ajax = axios


// 按需導入Mint-UI中的組件
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'



// 安裝圖片預覽插件
import VuePreview from "vue-preview"
Vue.use(VuePreview)
// 1.3 導入自己的router.js路由模塊



// 導入App根組件
import "./lib/mui/css/mui.min.css"
import "./lib/mui/css/icons-extra.css"

import router from "./router.js"


import app from "./App.vue"


// 全局設置post時候表單數據格式組織形式

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 導入時間插件
import moment from "moment"


// 定義全局過濾器
Vue.filter("dataFormat", function(dataStr, pattern="YYY-MM-DD HH:mm:ss"){
    moment(dataStr.format(pattern))
})


var vue = new Vue({
    el:"#app",
    render: c=>c(app),
    router, // 1.4 掛載路由到實例模塊上
    store //1 掛載store 狀態管理對象
})