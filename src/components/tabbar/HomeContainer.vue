<template>
    <div>
        <!--輪播圖區域-->
        <mt-swipe :auto="4000">
            <!--在組件中，使用v-for循環的話，必須用key-->
            <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
                <img :src="item.img" alt="">
            </mt-swipe-item>
          
        </mt-swipe>

        <ul class="mui-table-view mui-grid-view mui-grid-9">
		<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">    
            <router-link to="/home/newslist"><span class="mui-icon mui-icon-home"></span>
		    <div class="mui-media-body">新聞資訊</div></router-link></li>

		<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		    <span class="mui-icon mui-icon-email"><span class="mui-badge">5</span></span>
		    <div class="mui-media-body">圖片分享</div></a></li>
		<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		    <span class="mui-icon mui-icon-chatbubble"></span>
		    <div class="mui-media-body">商品購買</div></a></li>
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
    }
}
</script>


<style lang="scss" scoped>
.mint-swipe{
    height:200px;

    .mint-swipe-item{
        &:nth-child(1){
            background-color: red;
        }
        &:nth-child(2){
            background-color: blue;
        }
        &:nth-child(3){
            background-color: black;
        }
        img{
            width:100%;
            height:100%
        }
    }
}

.mui-grid-view .mui-grid-9{
    background-color: #fff;
    border:none
}

</style>