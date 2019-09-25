
// 1. 導入vue-router 包
import VueRouter from "vue-router"

// 導入路由對應的路由組件
import HomeContainer from "./components/tabbar/HomeContainer.vue"
import MemberContainer from "./components/tabbar/MemberContainer.vue"
import ShopcarContainer from "./components/tabbar/ShopcarContainer.vue"
import SearchContainer from "./components/tabbar/SearchContainer.vue"


//3. 創建路由對象
var router = new VueRouter({
    routes:[ //配置路由規則
        {path:"/" , redirect:"/home"},
        {path: "/home" , component:HomeContainer},
        {path: "/member" , component:MemberContainer},
        {path: "/shopcar" , component:ShopcarContainer},
        {path: "/search" , component:SearchContainer},
    ],
    linkActiveClass:"mui-active" //覆蓋默認的路由高亮的類，默認的類叫做router-link-active
})

export default router // 把路由對象暴露出去