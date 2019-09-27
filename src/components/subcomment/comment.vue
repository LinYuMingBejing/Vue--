<template>
    <div class="cmt-container">
        <h3>發表評論</h3>
        <hr>
        <textarea v-model="msg" placeholder="請輸入要BB的內容(最多120字)"></textarea>
        <mt-button type="primary" size="large" @click="postComment">發表評論</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    第{{ i+1 }}樓; 用戶:{{ item.user_name }}; 發表時間:{{ item.add_time }}
                </div>
                <div class="cmt-body">
                    {{ item.content==="undefined" ? "未發表任何評論" : item.content }}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加載更多</mt-button>
    </div>
</template>

<script>
import { Toast } from "mint-ui"
export default {
    data(){
        return{
            pageIndex:1, //默認展示第一頁數據,
            comments:[],
            msg:"" //評論輸入的內容
        }
    },
    created(){
        this.getComment()
    },
    methods:{
        getComment(){ //獲取評論
             this.$ajax({
                method:"get",
                "url":"http://www.liulongbin.top:3005/api/getcomments/"+this.id+"?pageindex="+this.pageIndex})
                .then(result =>{
                    if(result.status===200){
                        // 每當獲取新評論數據的時候不要把數據清空覆蓋，而是應該以老數據，拼接上新數據
                        this.comments = this.comments.concat(result.data.message)                     }else{
                        Toast("獲取評論失敗")
                    }
                })
        },
        getMore(){ //獲取更多
            this.pageIndex++;
            this.getComment()
        },
        postComment(){
            // 校驗是否為空內容
            if(this.msg.trim().length ===0){
                return Toast("評論內容不得為空")
            }
            this.$ajax({
                method:"post",
                // 參數1: 請求的URL地址
                // 參數2 : 提交給服務器的數據對象(content : this.msg)
                // 參數3 : 定義提交時， 表單中數據的格式
                "url":"http://www.liulongbin.top:3005/api/postcomment/"+this.$route.params.id,
                "data":{content:this.msg.trim()}})
                .then(result =>{
                    if(result.status===200){
                        var cmt= {user_name :"匿名用戶", add_time:Date.now(), content:this.msg.trim()};
                        this.comments.unshift(cmt);
                        this.msg=""
                    }
                })
        }
    },
    props:["id"]
}
</script>

<style lang="scss" scoped>
.cmt-container{
    h3{
        font-size:18px;
    }
    textarea{
        font-size: 14px;
        height:85px;
        margin:0;
    }
    .cmt-list{
        margin: 10px 0;
        .cmt-item{
            .cmt-title{
                font-size: 13px;
                background-color: #ccc;
            }
            .cmt-body{
                line-height: 35px;
                text-indent:2

            }
        }
        
    }
}
</style>
