<template>
    <div class="shopCar-container">
    
        <div class="good-list">
            <!-- 商品列表項目區 -->
            <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">

						<mt-switch v-model="$store.getters.getGoodsSelected[item.id]"
                        @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path">
                        <div class="info">
                            <h1>{{ item.title }}</h1>
                            <p>
                                <span class="price">{{item.sell_price}}</span>
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]"
                                :goodsid="item.id"></numbox>
                                <!-- 如何從購物車中獲取商品數量? -->
                                <!-- 可以先創建一個空對象，然後循環購物車中所有商品數據，把當前循環這條商品Id，作為對象的屬性名，count值作為對象的屬性值，這樣，當把所有商品循環一遍，就會得到一個對象 -->
                                <a href="#" @click.prevent = "remove(item.id,i)">刪除</a>
                            </p>
                        </div>
                        
					</div>
				</div>
			</div>
        </div>
  
    <!-- 結算區域 -->
        <div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner jiesuan">
					<div class="left">
                        <p>總計(不含運費)</p>
                        <p>以勾選商品<span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span>件 ，
                        總價 <span class="red">$ {{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
                    </div>
                    <mt-button type="danger">去結算</mt-button>
				</div>
                
			</div>
		</div>

    </div>
</template>


<script>
import numbox from "../subcomment/shopcar_numbox.vue"
export default {
    data(){
        return{
            goodslist:[] // 購物車所有商品數據
        }
    },
    created(){
        this.getGoodsList()
    },
    methods:{
        getGoodsList(){
            // 1. 獲取到store中所有的商品id，然後拼接出一個用逗號分隔的字符串
            var idArr =[]
            console.log(this.$store.state.car)
            this.$store.state.car.forEach(item => idArr.push(item.id))
            // 如果購物車中沒有商品，則直接返回，不需要請求數據接口，否則會報錯
            if (idArr.length <=0) {
                return;
            }

            // 獲取購物車商品列表
            this.$ajax({
                method:"get",
                url:"http://www.liulongbin.top:3005/api/goods/getshopcarlist/"+idArr.join(",")})
                .then(result =>{
                    if (result.status===200){
                        this.goodslist = result.data.message
                        console.log(this.goodslist)
                    }
                })
        },
        remove(id,index){
            // 點擊刪除，把商品從store中 根據傳遞ID刪除，同時，把當前組建中的goodslist中，對應要刪除的那個商品，使用index來刪除
            this.goodslist.splice(index,1) ;
            this.$store.commit("removeFromCar", id);
        },
        selectedChanged(id, val){
            // 每當點擊開關，把最新的開關狀態，同步到store中
            this.$store.commit("updataGoodsSelected",{id,selected:val})
        }
    },
    components:{
        numbox
    }
}
</script>


<style lang="scss" scoped>
.shopCar-container{
    background-color: #eee;
    overflow:hidden;
    .good-list{
        .mui-card-content-inner{
            display:flex;
            align-items: center;
        }
        img{
            width:60px;
            height:60px;
            }
        h1{
            font-size:13px;
            }
        .info{
            display:flex;
            flex-direction: column;
            justify-content: space-between;
            .price{
                color:red;
                font-weight: bold;
            }
        }
    }
    .jiesuan{
        display:flex;
        justify-content: space-between;
        align-items: center;
        .red{
            color:red;
            font-weight: bold;
            font-size: 16px;
        }
    }
}
    
</style>