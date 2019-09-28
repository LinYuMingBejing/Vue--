<template>
    <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-input-numbox" type="number" value="1" 
        @change="countChanged" ref="numbox">
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
            // 每當文本框的數據被修改時，立即把最新數據傳遞給父組件
            this.$emit("getcount",parseInt(this.$refs.numbox.value))
        }
    },
    props:["max"],
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