<template>
	<view class="context">
		<view class="top-area">
			<image class="package-image" src="https://img95.699pic.com/photo/50121/4634.jpg_wh300.jpg"></image>
			<view class="info">
				<view class="title">{{ $store.packageInfo.name }}</view>
			</view>
		</view>
		<view class="content-area">
			<view class="card">
				<view class="card-top">
					<view class="left">体检套餐</view>
					<view class="right">共{{ categories.length }}个项目</view>
				</view>
				<view class="category" v-for="(item) in categories">
					{{ item.name }}
				</view>
			</view>
		</view>
		<view class="bottom-bar">
			<view class="price">￥888</view>
			<view class="button" @click="goToAppointment()">立即预约</view>
		</view>
	</view>
</template>

<script>
	import $axios from '../../utils/axios/index.js';

	export default {
		data() {
			return {
				categories: [],
				id: 0
			};
		},
		methods: {
			async getCategories() {
				this.categories = await $axios.get(`package/categories?id=${this.id}`);
			},
			goToAppointment() {
				uni.navigateTo({
					url: `/pages/list/appointment`,
					animationType: 'fade-in'
				});
				this.$store.packageInfo.categories = this.categories;
			}
		},
		onLoad(event) {
			this.id = event.id;
			this.getCategories();
		},
	}
</script>

<style lang="scss">
	.context {
		position: absolute;
		display: flex;
		padding-bottom: 50px;
		flex-direction: column;
		height: 100%;
		width: 100%;
		background-color: $uni-bg-color-grey;

		.top-area {
			padding-top: 10px;
			padding-bottom: 10px;
			display: flex;
			background-color: white;
			
			.package-image {
				width: 280rpx;
				height: 180rpx;
				border-radius: 4px;
			}
			
			.info {
				margin-left: 10px;
				
				.title {
					color: $uni-text-color;
					font-size: 20px;
					font-weight: 500;
				}
			}
		}

		.content-area {
			flex: 1;
			
			.card {
				margin: 20px auto;
				padding-bottom: 8px;
				border-radius: 6px;
				width: 90%;
				background-color: $uni-bg-color;
				
				.card-top {
					display: flex;
					justify-content: space-between;
					padding: 10px 20px;
					
					.left {
						font-size: 18px;
						font-weight: 500;
						color: $uni-text-color;
					}
					
					.right {
						font-size: 16px;
						color: $uni-text-color-disable;
					}
				}
				
				.category {
					margin: 10px 20px 0 20px;
					font-size: 16px;
					color: $uni-text-color-grey;
					line-height: 30px;
					border-bottom: 1px solid #ebeef5;
				}
			}
		}
		
		.bottom-bar {
			position: fixed;
			display: flex;
			justify-content: space-between;
			align-items: center;
			bottom: 0;
			height: 50px;
			width: 100%;
			background-color: white;
			
			.price {
				margin-left: 20px;
				font-weight: 500;
				font-size: 20px;
				color: #FDAC00;
			}
			
			.button {
				margin-right: 20px;
				padding: 2px 6px;
				background-color: #fdc237;
				height: 30px;
				line-height: 30px;
				font-size: 18px;
				color: white;
				font-weight: 500;
				border-radius: 4px;
			}
		}
	}
</style>