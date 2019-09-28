<template>
    <div>
        <mt-swipe :auto="4000">
            <!-- 將來，誰使用此 輪播圖組件 ，誰為我們傳遞lunbotuList -->
            <!-- 此時，lunbotuList應該是 父組件向子組件傳值來設置 -->
            <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
                <img :src="item.img" alt="" :class="{full:isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
    <!-- 分析為什麼 商品評論中的輪播圖 不好看? -->
    <!-- 1. 首頁中的圖片，它的寬和高都是使用了100%的寬度 -->
    <!-- 2. 在商品詳情頁面中，輪播圖的圖片，如果也使用寬高為100%的話，頁面不好看 -->
    <!-- 3. 商品詳情頁面中的輪播圖，期望 高度是100%，但是寬度為 自適應 -->
    <!-- 4. 經過分析，得到問題的原因: 首頁中的輪播圖和 詳情中的輪播圖，分歧點是寬度到底是100% 還是自適應 -->
    <!-- 5. 既然這兩個 輪播圖，其他方面都是沒有衝突的，只是寬度 有分歧，那麼，我們可以定義一個屬性，讓使用輪播圖的調用者， 手動設定 -->
</template>


<script>
export default {
    props: ["lunbotuList", "isfull"]

}
</script>


<style lang="scss" scoped>
    .mint-swipe{
    height:200px;

    .mint-swipe-item{
        text-align: center;

        img{
            width:100%;
            height:100%
        }
    }
    .full{
        width:100%;
    }
}

</style>