<template>
    <div class="goodsinfo-container">
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" >
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        


        <!-- 商品輪播圖區域 -->
        	<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swiper :lunbotuList="lunbotou" :isfull="false"></swiper>
					</div>
				</div>
			</div>

        <!-- 商品購買區域 -->
        <div class="mui-card">
				<div class="mui-card-header">{{ goodsinfo.title }}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
                            市場價 : <del>${{ goodsinfo.market_price }}</del>&nbsp;&nbsp;銷售價: <span class="now_price">${{ goodsinfo.sell_price }}</span>
                        </p>
                        <p>購買數量:<numbox @getcount="getSelectedCount"
                        :max="goodsinfo.stock_quantity"></numbox></p>
                        <p>
                            <mt-button type="primary" size="small">立即購買</mt-button>
                            <mt-button type="danger" size="small" @click="addToShopCar">加入購物車</mt-button>
                        </p>
					</div>
				</div>
			</div>

        <!-- 商品參數區域 -->
        <div class="mui-card">
				<div class="mui-card-header">商品參數</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品貨號:{{ goodsinfo.goods_no }}</p>
                        <p>庫存情況:{{ goodsinfo.stock_quantity }}件</p>
                        <p>上架時間:{{ goodsinfo.add_time }}</p>
					</div>
				</div>
				<div class="mui-card-footer">
                    <mt-button type="primary" plain size="large" @click="goDesc(id)">圖文介紹</mt-button>
                    <mt-button type="danger" plain size="large" @click="goComment(id)">商品評論</mt-button>
                    <!-- 如何實現加入購物車時候，拿到 選擇的數量 -->
                    <!-- 1. 經過分析發現 : 按鈕屬於 goodsinfo頁面， 數字屬於numbox 組件 -->
                    <!-- 2. 由於涉及到了父子組件的嵌套， 所以，無法直接在goodsinfo頁面中或取道 選中的商品數量值 -->
                    <!-- 3. 涉及到了子組件向父祖件傳值(事件調用機制) -->
                    <!-- 4. 事件調用本質: 父向子傳遞方法，子掉用這個方法，同時把數據當作參數傳入 -->
                </div>
			</div>
    </div>
</template>

<script>

import swiper from "../subcomment/swiper.vue"
// 導入數字選擇框組件
import numbox from "../subcomment/goodsinfo_numbox.vue"
export default {
    data(){
        return{
            id: this.$route.params.id, //路由參數對象中的id掛載到data
            lunbotou:[],    // 輪播圖的數據
            goodsinfo:[], //獲取到的商品信息
            ballFlag:false, //控制小球隱藏或顯示
            selectedCount: 1 // 保存用戶選種商品數量，默認，用戶至少買一個
        }
    },
    created(){
        this.getLunbotu()
        this.getGoodsInfo()
    },
    methods:{
        getLunbotu(){
               this.$ajax({
                method:"get",
                url:"http://www.liulongbin.top:3005/api/getthumimages/" + this.id})
                .then( result=>{
                    if (result.status===200){
                        // 先循環輪播圖數組的每一項，為item添加img屬性，因為輪播圖數件中，指認是item.img，不認識item.src
                        result.data.message.forEach(item =>{
                            item.img = item.src              
                    })
                        this.lunbotou = result.data.message
                    }
                })
        },
        getGoodsInfo(){
            this.$ajax({
                method:"get",
                url:"http://www.liulongbin.top:3005/api/goods/getinfo/" + this.id})
            .then(result =>{
                if (result.status===200){
                    this.goodsinfo = result.data.message[0]
                }
            })
        },
        goDesc(id){
            // 點擊使用編程式導航跳轉到 圖文介紹頁面
            this.$router.push({name:"goodsdesc", params:{id}})
            
        },
        goComment(id){
            //點擊跳轉到評論頁面
            this.$router.push({name:"goodscomment", params:{id}})
        },
        addToShopCar(){
            //添加到購物車
            this.ballFlag = !this.ballFlag
        },
        beforeEnter(el){
            el.style.transform ="translate(0,0)"
        },
        enter(el,done){
            el.offsetWidth;
            // 小球動畫優化思路:
            // 1. 先分析導致動畫不準確的本質原因 : 我們把小球最終為移到的位置，已經侷限在了某一分辨率的 滾動條 未滾動的情況下
            // 2. 只要分辨率 和 測試時不一樣，或者滾動條有一定的滾動距離之後，問題就出現了
            // 3. 因此，我們分析，得到結論: 不能把位置的橫縱座標寫死，而是應該根據不同情況，動態計算這個座標值；
            // 4. 經過分析，得出解決思路: 先得到徽標得橫縱座標，在得到小球橫縱坐標，然後 y值 求差，x值也求差，得到的效果，就是橫縱座標要位移的位置
            // 5. 如何獲取位置? domObject.getBoundingClientRect()
            

            // 獲取小球 在頁面中的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            // 獲取徽標在頁面中的位置
            const badgePosition = document.getElementById("badge").getBoundingClientRect();
            
            const xDist = badgePosition.left - ballPosition.left
            const yDist = badgePosition.top - ballPosition.top

            el.style.transform = "translate(${xDist}px,${yDist}px)"
            el.style.transition = "all 3s ease";
            done()
        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag
            // console.log(this.ballFlag)
           
            
        },
        getSelectedCount(count){
            // 當子組件把選中數量傳遞給父祖件，把選中的值保存到
            this.selectedCount = count;

        }
        
    },
    components:{
        swiper,
        numbox
    }
}
</script>

<style lang="scss" scoped>
    .goodsinfo-container{
        background-color: #eee;
        overflow:hidden;
        .now_price{
            color:red;
            font-weight: bold;
        }
    .mui-card-footer{
        display:block;
        button{
            margin: 15px 0;
        }
    }
    .ball{
        width:15px;
        height:15px;
        border-radius:50%;
        background-color: red;
        position:absolute;
        z-index:99;
        top:390px;
        left:146px;

    }
}
</style>