
// 1. 導入vue-router 包
import VueRouter from "vue-router"

// 導入路由對應的路由組件
import HomeContainer from "./components/tabbar/HomeContainer.vue"
import MemberContainer from "./components/tabbar/MemberContainer.vue"
import ShopcarContainer from "./components/tabbar/ShopcarContainer.vue"
import SearchContainer from "./components/tabbar/SearchContainer.vue"
import NewsList from "./components/news/NewsList.vue"
import NewsInfo from "./components/news/NewsInfo.vue"
import PhotoList from  "./components/photos/PhotoList.vue"
import PhotoInfo from "./components/photos/PhotoInfo.vue"
import Goodlist from "./components/goods/Goodlist.vue"
//3. 創建路由對象
var router = new VueRouter({
    routes:[ //配置路由規則
        {path:"/" , redirect:"/home"},
        {path: "/home" , component:HomeContainer},
        {path: "/member" , component:MemberContainer},
        {path: "/shopcar" , component:ShopcarContainer},
        {path: "/search" , component:SearchContainer},
        {path:"/home/newslist", component:NewsList},
        {path:"/home/newsinfo/:id", component:NewsInfo},
        {path:"/home/photolist", component:PhotoList},
        {path:"/home/photoinfo/:id", component:PhotoInfo},
        {path:"/home/goodsinfo/:id", component:Goodlist},
    ],
    linkActiveClass:"mui-active" //覆蓋默認的路由高亮的類，默認的類叫做router-link-active
})

export default router // 把路由對象暴露出去