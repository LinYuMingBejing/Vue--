<template>
    <div class="goodsdesc-container">
        <h3>{{ info.title }}</h3>
        <hr>
        <div class="content" v-html="info.content"></div>
    </div>
</template>


<script>
export default {
    data(){
        return{

            info:{} //圖文數據
        }
    },
    created(){
        this.getGoodsDesc()
    },
    methods:{
        getGoodsDesc(){
             this.$ajax({
                method:"get",
                url:"http://www.liulongbin.top:3005/api/goods/getdesc/" + this.$route.params.id})
                .then(result =>{
                    if (result.status===200){
                        this.info = result.data.message[0];
                    }
                })
        }
    }
}
</script>



<style lang="scss">
    .goodsdesc-container{
        padding:4px;
        h3{
            font-size: 16px;
            color:#226aff;
            text-align: center;
            margin:15px 0;
        }
        .content{
            img{
                width:100%
            }
        }
    }
</style>