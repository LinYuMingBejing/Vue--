<template>
    <div class="good-list">
        
        <!-- 在網頁中，有兩種跳轉方式: -->
        <!-- 方式1 :使用a標籤形式，叫做標籤跳轉 -->
        <!-- 方式2: 使用window.location.href 的形式，叫做 編程式導航 -->
        <div class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goods/info/'+item.id" @click="goDetail(item.id)">
            <img :src="item.img_url">
            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">${{ item.sell_price}}</span>
                    <span class="old">${{ item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>熱賣中</span>
                    <span>{{ item.stock_quantity }}</span>
                </p>
            </div>
        </div>


        <mt-button type="danger" size="large" @click="getMore">加載更多</mt-button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            pageindex:1, //分頁的頁數
            goodslist:[]// 存放商品列表的數組

        }
    },
    created(){
        this.getGoodsList()
        
    },
    methods:{
        getGoodsList(){
            // 獲取商品列表
             this.$ajax({
                method:"get",
                url:"http://www.liulongbin.top:3005/api/getgoods?pageindex=" + this.pageindex})
                .then(result =>{
                    
                    if (result.status===200){
                    
                        this.goodslist = this.goodslist.concat(result.data.message)
            
                    }
                })

        },
        getMore(){
            this.pageindex++;
            this.getGoodsList();
        },
        goDetail(id){
            //使用JS的形式進行路由導航

            // 注意: 一定要區分 this.$route 和 this.$router 這兩個對象
            // 其中 : this.$route 是路由參數對象，所有路由中的參數， params, query 都屬於它
            // 其中 : this.$router 是一個路由導航對象，用它可以方便的使用JS代碼，實現路由的前進、後退、跳轉到新的URL地址
            
            
            
            // 1. 最簡單的
            //this.$router.push("/home/goodsinfo/"+id)
            // 2. 傳遞對象
            //this.$router.push({path:"/home/goodsinfo/"+id})
            // 3. 傳遞命名的路由
            this.$router.push({name:"goodsinfo", params:{id}})
        }
    }
}
</script>


<style lang="scss" scoped>
    .good-list{
        display:flex;
        flex-wrap:wrap;
        padding: 7px;
        justify-content: space-between;
        padding:2px;
        .goods-item{
            width:49%;
            border: 1px solid #ccc;
            box-shadow :0 0 8px #ccc;
            margin:4px 0;
            padding:2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 293px;
            img{
                width:100%
            }
            .title{
                font-size:14px;
            }
            .info{
                background-color: #ccc;
                p{
                    margin:0;
                    padding:5px;
                }
                .price{
                    .now{
                        color:red;
                        font-weight:bold;
                        font-size:16px;
                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left:10px;
                    }
                .sell{
                    display: flex;
                    justify-content: space-between;
                    font-size:13px;

                }
            }
        }
        }
    }
</style>