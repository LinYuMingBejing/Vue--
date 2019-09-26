<template>
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newslist" 
                :key="item.id">
					<router-link :to="'/home/newsinfo/' + item.id">
						<img class="mui-media-object mui-pull-left" src="">
						<div class="mui-media-body">
							<h1>{{ item.title }}</h1>
							<p class='mui-ellipsis'>
                                <span>發表時間: {{ item.add_time }}</span>
                                <span>點擊:{{ item.click }}次</span>
                            </p>
						</div>
					</router-link>
				</li>

			</ul>
    </div>
</template>

<script>
import { Toast } from "mint-ui"
export default {
    data(){
        return{
            newslist:[] //新聞列表
        }
    },
    created(){
        this.getNewsList();
    },
    methods:{
        getNewsList(){ //這是獲取新聞列表
            this.$ajax({
                method:"get",
                "url":"http://www.liulongbin.top:3005/api/getnewslist"})
                .then(result =>{
                    if (result.status ===200){
                        // 如果沒有失敗，應該把數據保存到data上
        
                        this.newslist = result.data.message
                    }else{
                        Toast("獲取新聞列表失敗")
                    }
                })
        }
    }
}
</script>


<style lang="scss" scoped>
    .mui-table-view{
        li{
            h1{font-size:14px}
            .mui-ellipsis{
                font-size:12px;
                color:#226aff;
                display: flex;
                justify-content: space-between
            }
        }
    }
</style>