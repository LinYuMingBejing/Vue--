<template>
    <div>
        <!--輪播圖區域-->
        <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>

        <ul class="mui-table-view mui-grid-view mui-grid-9">
		<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">    
            <router-link to="/home/newslist"><span class="mui-icon mui-icon-home"></span>
		    <div class="mui-media-body">新聞資訊</div></router-link></li>

		<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to="/home/photolist">
		    <span class="mui-icon mui-icon-email"><span class="mui-badge">5</span></span>
		    <div class="mui-media-body">圖片分享</div></router-link></li>
		<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to="/home/goodslist">
		    <span class="mui-icon mui-icon-chatbubble"></span>
		    <div class="mui-media-body">商品購買</div></router-link></li>
		<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		    <span class="mui-icon mui-icon-location"></span>
		    <div class="mui-media-body">留言反饋</div></a></li>
		<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		    <span class="mui-icon mui-icon-search"></span>
		    <div class="mui-media-body">視頻專區</div></a></li>
		<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		    <span class="mui-icon mui-icon-phone"></span>
		    <div class="mui-media-body">聯繫我們</div></a></li>
	
	</ul> 
    </div>

    
</template>


<script>
import { Toast } from "mint-ui"
import swiper from "../subcomment/swiper.vue"

export default {
    data(){
        return{
            lunbotuList :[] //保存輪播圖的數組
        }
    },
    created(){
        this.getLunbotu()
    },
    methods:{
        getLunbotu(){
            // 獲取輪播圖數據
            this.$ajax({
                method:"get",
                "url":"http://www.liulongbin.top:3005/api/getLunbo"})
                .then(result =>{
                if (result.status ===200){
                    this.lunbotuList = result.data.message;
                  
                }else{
                    Toast("加載輪播圖失敗")
                }
            })
        }
    },
    components:{
        swiper
    }
}
</script>


<style lang="scss" scoped>

.mui-grid-view .mui-grid-9{
    background-color: #fff;
    border:none
}

</style>