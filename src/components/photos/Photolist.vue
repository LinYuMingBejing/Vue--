<template>
    <div>
        <!-- 頂部滑動條區域 -->
    	<div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a :class="['mui-control-item', item.id==0 ? 'mui-active' : '']" v-for="item in cates" :key="item.id" @click="getPohoListByCateId(item.id)">
							{{ item.title }}
						</a>
		
					</div>
				</div>
			</div>

		<!-- 圖片列表區 -->
		<ul class="photo-list">
			<router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
				<img v-lazy="item.img_url">
				<div class="info">
					<h1 class="info-title">{{ item.title }}</h1>
					<div class="info-body">{{ item.zhaiyao }}</div>
				</div>
			</router-link>
		</ul>
    
	
	
	
	
	
	
	</div>
</template>

<script>
// 1. 導入mui.js文件
// import mui from "../../lib/mui/js/mui.min.js"
// // 2. 初始化滑動控件
// mui(".mui-scroll-wrapper").scroll({
//     deceleration:0.0005
// })
export default {
    data(){
        return{
			cates:[],
			list:[] //圖片列表數組
		}
	},
	created(){
		this.getAllCategoty()
		// 默認進入頁面，就主動請求 所有圖片列表的數據
		this.getPohoListByCateId(0)
	},
	mounted(){
		// 當組件中的DOM結構被渲染好並放到頁面中，會執行這個鉤子函數
		// 如果要操作元素，最好再mounted，這時的DOM元素是最新的
		// // 2. 初始化滑動控件
		// mui(".mui-scroll-wrapper").scroll({
		// 	deceleration:0.0005
		// })
	},
    methods:{
		getAllCategoty(){
			 this.$ajax({
                method:"get",
                url:"http://www.liulongbin.top:3005/api/getimgcategory"})
			.then(result =>{
				if(result.status===200){
					console.log(result.data.message)
					result.data.message.unshift({title:"全部",id:0});
					this.cates = result.data.message;
				}
			})
		},
		getPohoListByCateId(cateId){
			// 根據分類 id,獲取圖片列表
			this.$ajax({
                method:"get",
				url:"http://www.liulongbin.top:3005/api/getimages/"+cateId})
				.then(result=>{
					if (result.status===200){
						this.list = result.data.message
					}
				})
		}
	}
}
</script>


<style lang="scss" scoped>

.photo-list {
	list-style: none;
	margin:0;
	padding:10px;
	padding-bottom:0;
	box-shadow: 0 0 6px #999;
	position:relative;
	li {
		background-color: #ccc;
		text-align: center;
		margin-bottom:10px;
		img{
			width:100%
		}
		img[lazy="loading"]{
			width:40px;
			height:300px;
			margin:auto;
		}
		.info{
			color:white;
			text-align: left;
			position: absolute;
			bottom:0;
			background-color: rgba(0,0,0,0.4);
			max-height:14px;
			.info-title{
				font-size:14px;
			}
			.info-body{
				font-size:13px;
			}
		}
	}
	
}
</style>