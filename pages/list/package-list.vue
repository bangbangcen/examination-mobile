<template>
	<view>
		<view class="top-bar">
			<u-search class="search" placeholder="请输入套餐名称" v-model="keyword" height="24"></u-search>
		</view>
		<u-swiper class="swiper" :list="imageLinks" height="160" key-name="image" mode="dot" img-mode="scaleToFill"></u-swiper>
		<view class="package-card" v-for="(item) in packages">
			<image class="package-image" src="https://img95.699pic.com/photo/50121/4634.jpg_wh300.jpg"></image>
			<view class="card-info">
				
			</view>
		</view>
	</view>
</template>

<script>
	import $axios from '../../utils/axios/index.js';
	export default {
		data() {
			return {
				keyword: "",
				imageLinks: [{
						image: '/static/swiper/swiper1.png',
					},
					{
						image: '/static/swiper/老年人做体检.png',
					},
					{
						image: '/static/swiper/身体无小事 定期做体检.png',
					}
				],
				packages: []
			};
		},
		methods: {
			async getPackages() {
				this.packages = await $axios.get('package/list');
			}
		},
		async onReady() {
			this.getPackages();
		},
	}
</script>

<style lang="scss">
	.top-bar {
		height: 100rpx;
		background-color: #a0cfff;
		display: flex;
		justify-content: center;
		align-items: center;
		
		.search {
			width: 700rpx;
		}
	}
	.swiper {
		width: 70%;
		margin: 30rpx auto;
	}
	.package-card {
		display: flex;
		height: 200rpx;
		width: 80%;
		margin: 20px auto;
		background-color: #a0cfff;
		border-radius: 18rpx;
		
		.package-image {
			width: 200rpx;
			height: 150rpx;
		}
		
		.card-info {
			
		}
	}
</style>