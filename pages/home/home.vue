<template>
	<view>
<!-- 		<view class="top-bar">
			<u-search class="search" placeholder="请输入套餐名称" v-model="keyword" height="24"></u-search>
		</view> -->
		<view class="context">
			<u-swiper class="swiper" :list="imageLinks" height="160" key-name="image" mode="dot"
				img-mode="scaleToFill"></u-swiper>
			<view class="area-bar">
				<view class="group-button" @click="goToAppointment()">
					<view class="group-icon">
						<u-icon name="man-add-fill" size="54" color="#FDAC00"></u-icon>
					</view>
					<view class="group-button-text">团检入口</view>
				</view>
				<view class="person-button" @click="goToPackageList()">
					<view class="person-icon">
						<u-icon name="account" size="54" color="#9198CF"></u-icon>
					</view>
					<view class="person-button-text">个人预约</view>
				</view>
			</view>
			<view class="introduction">
				<view class="introduction-item">
					<view class="title">智慧体检</view>
					<view class="text">引入智能导检</view>
					<view class="text">效率高高</view>
				</view>
				<view class="introduction-item">
					<view class="title">专业团队</view>
					<view class="text">1000+体检机构</view>
					<view class="text">权威认证</view>
				</view>
				<view class="introduction-item">
					<view class="title">优质服务</view>
					<view class="text">顾客至上</view>
					<view class="text">快速解答</view>
				</view>
			</view>
			<view class="package-area">
				<view class="package-title">
					<span class="left">热门体检套餐</span>
					<span class="right" @click="goToPackageList()">查看全部 ></span>
				</view>
				<view class="package-card" v-for="(item) in packages" @click="goToPackage(item)">
					<image class="package-image" :src="item.image"></image>
					<view class="card-info">
						<view class="package-name">{{ item.name }}</view>
						<span class="applicable">{{ item.tag }}</span>
						<view class="price">￥{{ item.price }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { request } from "../../utils/request.js";
	export default {
		data() {
			return {
				keyword: "",
				imageLinks: [{
						image: '/static/swiper/swiper1.jpeg',
					},
					{
						image: '/static/swiper/swiper2.jpeg',
					},
					{
						image: '/static/swiper/swiper3.jpeg',
					}
				],
				packages: []
			};
		},
		methods: {
			async getPackages() {
				this.packages = await request({
					url: '/package/list?isHot=true'
				});
			},
			goToAppointment() {
				uni.navigateTo({
					url: './appointment?type=1',
					animationType: 'fade-in'
				})
			},
			goToPackageList() {
				uni.navigateTo({
					url: './package-list',
					animationType: 'fade-in'
				});
			},
			goToPackage(item) {
				this.$store.packageInfo = item;
				uni.navigateTo({
					url: `./package-detail?id=${item.id}`,
					animationType: 'fade-in'
				});
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

	.context {
		padding: 24rpx;
	}

	.swiper {
		margin: 30rpx auto;
	}

	.area-bar {
		display: flex;
		justify-content: space-between;
		margin: 20px auto 50rpx auto;

		.group-button {
			height: 190rpx;
			width: 48%;
			background-color: #FFF3D9;

			.group-icon {
				display: flex;
				justify-content: center;
			}

			.group-button-text {
				color: #ffc001;
				font-size: 36rpx;
				font-weight: 400;
				text-align: center;
			}
		}

		.person-button {
			height: 190rpx;
			width: 48%;
			background-color: #F3F4F9;

			.person-icon {
				display: flex;
				justify-content: center;
			}

			.person-button-text {
				color: #9198CF;
				font-size: 36rpx;
				font-weight: 400;
				text-align: center;
			}
		}
	}

	.introduction {
		display: flex;
		justify-content: space-around;
		margin-bottom: 40rpx;
		
		.introduction-item {
			width: 30%;
			background-image: url('https://examination520.oss-cn-beijing.aliyuncs.com/instruction-bg.png');
			background-size: cover;
			opacity: 50%;
			text-align: center;
			
			.title {
				margin-bottom: 16rpx;
				font-size: 30rpx;
				font-weight: 500;
			}
			
			.text {
				font-size: 24rpx;
				color: $uni-text-color;
			}
		}
	}

	.package-title {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;
		
		.left {
			font-weight: 600;
			color: $u-content-color;
			font-size: 16px;			
		}

		.right {
			color: $uni-text-color-grey;
			font-size: 14px;
		}
	}

	.package-card {
		display: flex;
		height: 200rpx;
		margin: 4px auto 0 auto;
		border-radius: 18rpx;

		.package-image {
			width: 200rpx;
			height: 150rpx;
			border-radius: 4px;
		}

		.card-info {
			.package-name {
				margin: 0 0 6px 10px;
				font-weight: 500;
				font-size: 18px;
				color: $uni-text-color; 
			}

			.applicable {
				display: inline-block;
				font-size: 12px;
				font-weight: 500;
				margin-left: 10px;
				padding: 2px 4px;
				color: #7b7b7b;
				background-color: #F3F2F7;
			}

			.price {
				margin-top: 10px;
				margin-left: 10px;
				font-weight: 500;
				font-size: 16px;
				color: #ffc001;
			}
		}
	}
</style>