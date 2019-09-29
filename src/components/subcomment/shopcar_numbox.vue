<template>
    <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max' style="height:25px">
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-input-numbox" type="number" :value="initcount" 
        @change="countChanged" ref="numbox" readonly>
		<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
    <!-- 分析: 子組件什麼時候把數據傳給父組件 -->
</template>


<script>
import mui from "../../lib/mui/js/mui.js"
export default {
    mounted(){
        // 初始化 數字選擇框組件
        mui(".mui-numbox").numbox()
    },
    methods:{
        countChanged(){
            // 數量改變了
            // 每當數量值改變，應立即打最新的數量同步到購物車中
            this.$store.commit("updateGoodsIngo",{
                id:this.goodsid,
                count: this.$refs.numbox.value})
        }
    },
    props:['initcount', 'goodsid',"max"],
    watch:{
        //屬性監聽
        "max":function(newVal, oldVal){
            mui(".mui-numbox").numbox().setOption("max",newVal)
        }
    }
}
</script>


<style lang="scss" scoped>
    
</style>