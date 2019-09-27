<template>
    <div class="good-list">
        <div class="good-item">
            <img src="">
            <h1 class="title"></h1>
            <div class="info">
                <p class="price">
                    <span class="now"></span>
                    <span class="old"></span>
                </p>
                <p class="sell">
                    <span></span>
                    <span></span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
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
            display: flex;
            flex-direction: column;
            justify-content: space-bwtween;
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

                }
                }
            }
        }
    }
</style>