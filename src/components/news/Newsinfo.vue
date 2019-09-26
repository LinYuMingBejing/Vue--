<template>
    <div class="newsinfo-container">
        <h3 class="title">{{ newsinfo.title }}</h3>
        <p class="subtitle">
            <span>發表時間:{{ newsinfo.add_time}}</span>
            <span>點擊:{{ newsinfo.click }}次</span>
        </p>
        <div class="content" v-html="newsinfo.content"></div>
    </div>
</template>

<script>
import {Toast} from "mint-ui"
export default {
    data(){
        return{
            id: this.$route.params.id, // 將URL 地址中傳遞過來的Id直，掛載到data上，方便以後調用
            newsinfo:{}
        }
    },
    created(){
        this.getNewsInfo()
    },
    methods:{
        getNewsInfo(){
            //獲取新聞詳情
            this.$ajax({
                method:"get",
                "url":"http://www.liulongbin.top:3005/api/getnew/"+this.id})
                .then(result =>{
                    console.log(result)
                    if (result.status===200){
                        this.newsinfo = result.data.message[0];
                    }else{
                        Toast("獲取數據失敗")
                    }
                })
                
        }
    }
}
</script>

<style lang="scss" scoped>
    .newsinfo-container{
        padding: 0 4px;
        .title{
            font-size : 16px;
            text-align : center ;
            margin : 15px 0;
            color : red;
        }
        .subtitle{
            font-size:13px;
            color: #226aff;
            display:flex;
            justify-content: space-between
        }
        .content{

        }
    }
</style>