<template>
    <div class="photoinfo-container">
        <h3>{{ getPhotoInfo.title }}</h3>
        <p class="subtitle">
            <span>發表時間 :{{ getPhotoInfo.add_time }}</span>
            <span>點擊 : {{ getPhotoInfo.click }}次</span>
        </p>
        <hr>
        <!-- 縮略圖區域 -->
        <img class="preview-img" v-for="(item,index) in list" :key="item.src" :src="item.src"
        height="100" @click="$preview.open(index, list)" >

        <!-- 圖片內容區域 -->
        <div class="content"></div>
        <!-- 評論子組件 -->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>

import comment from "../subcomment/comment.vue"
export default {
    data(){
        return{
            id: this.$route.params.id, //從路由中獲取到的圖片ID
            photoinfo:{},
            list: [] // 縮略圖數組
        }
    },
    created(){
        this.getPhotoInfo()
    },
    components:{ //註冊評論子組件
        "cmt-box":comment
    },
    methods:{
        getPhotoInfo(){
            // 獲取圖片的詳情
             this.$ajax({
                method:"get",
                url:"http://www.liulongbin.top:3005/api/getimageInfo/" + this.id})
                .then(result =>{
                    if (result.status===200){
                        this.photoinfo = result.data.message[0]
                    }
                })
        },
        getThumbs(){
            // 獲取縮略圖
              this.$ajax({
                method:"get",
                url:"http://www.liulongbin.top:3005/api/getimageInfo/" + this.id})
                .then(result =>{
                    if (result.status===200){
                        // 循環每個圖片數據，補全圖片的寬和高
                        result.data.message.forEach(item =>{
                            item.w = 600
                            item.h = 400
                        });
                        // 把完整數據 保存到list中
                        this.list = result.data.message
                    }
                })
        }
    }
}
</script>
 

<style lang="scss">
    .photoinfo-container{
        padding:3px;
        h3{
            color:#26A2FF;
            font-size:15px;
            text-align:center;
            margin:15px 0;
        }
        .subtitle{
            display:flex;
            justify-content: space-between;
            font-size:13px;
        }
        .content{
            font-size: 13px;
            line-height:30px;
        }
    }
</style>