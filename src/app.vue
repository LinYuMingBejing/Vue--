<template>
<div class="app-containers"> 
    <!-- 頂部 Header 區域-->
    <mt-header fixed title="搜尋頁面"></mt-header>

    <!-- 中間的路由 route-view 區域-->
    <transition>
    <router-view></router-view>
    </transition>




    <!-- 底部 區域-->
    <nav class="mui-bar mui-bar-tab">
		<router-link class="mui-tab-item-lib" to="/home">
			<span class="mui-icon mui-icon-home"></span>
			<span class="mui-tab-label">首頁</span>
		</router-link>
		<router-link class="mui-tab-item-lib" to="/member">
			<span class="mui-icon mui-icon-email"></span>
			<span class="mui-tab-label">會員</span>
		</router-link>
		<router-link class="mui-tab-item-lib" to="/shopcar">
			<span class="mui-icon mui-icon-extra mui-icon-cart">
                <span class="mui-badge">0</span></span>
			<span class="mui-tab-label" id="badge">購物車</span>
		</router-link>
		<router-link class="mui-tab-item-lib" to="/search">
			<span class="mui-icon mui-icon-search"></span>
			<span class="mui-tab-label">搜索</span>
		</router-link>
	</nav>

</div>

</template>

<script>

</script>

<style>
    .mint-header{
        z-index:99
    }
    .app-containers{
        padding-top:40px;
        overflow-x: hidden;
        padding-bottom:50px;
    }

    .v-enter{
        opacity:0;
        transform: translateX(100%);
    }
    .v-leave-to{
        opacity:0;
        transform: translateX(-100%);
        position: absolute
   
    }

    .v-enter-active,
    .v-leave-active{
        transition : all 0.5s ease;
    }
    /* 改類名，解決 tabbar點擊無法切換的問題 */

    .mui-bar-tab .mui-tab-item-lib .mui-active{
        color: #007aff
    }

    .mui-bar-tab .mui-tab-item-lib{
        display: table-cell;
        overflow: hidden;
        width: 1px;
        height:50px;
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;
        color:#929292;
    }
    .mui-bar-tab .mui-tab-item-lib .mui-icon{
        top:3px;
        width:24px;
        height: 24px;
        padding-bottom: 0;
        padding-top: 0;
    }

    .mui-bar-tab .mui-tab-item-lib .mui-icon~.mui-tab-label{
        font-size:11px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis
    }
</style>