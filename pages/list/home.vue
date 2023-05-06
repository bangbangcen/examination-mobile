<template>
	<view>
		<view class="top-bar">
			<u-search class="search" placeholder="请输入套餐名称" v-model="keyword" height="24"></u-search>
		</view>
		<view class="context">
			<u-swiper class="swiper" :list="imageLinks" height="160" key-name="image" mode="dot"
				img-mode="scaleToFill"></u-swiper>
			<view class="area-bar">
				<view class="group-button">
					<u-icon name="man-add-fill" size="54" color="#FDAC00" class="group-icon"></u-icon>
					<view class="group-button-text">团检入口</view>
				</view>
				<view class="person-button">
					<u-icon name="account" size="54" color="#9198CF" class="person-icon"></u-icon>
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
				<view class="package-title">热门体检套餐</view>
				<view class="package-card" v-for="(item) in packages">
					<image class="package-image" src="https://img95.699pic.com/photo/50121/4634.jpg_wh300.jpg"></image>
					<view class="card-info">
						<view class="package-name">{{ item.name }}</view>
						<view class="applicable">适合人群:{{ item.applicableGroup }}</view>
						<view class="price">￥{{ item.price }}</view>
					</view>
				</view>
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

	.context {
		padding: 24rpx;
	}

	.swiper {
		margin: 30rpx auto;
	}

	.area-bar {
		display: flex;
		justify-content: space-between;
		margin: 20px auto;

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
		margin-bottom: 30rpx;
		
		.introduction-item {
			background-image: url('https://ts1.cn.mm.bing.net/th/id/R-C.77a6a34830aa3efa5810cefc4a5f0156?rik=TTb0ZeBPwuK1AQ&riu=http%3a%2f%2fwww.kuaipng.com%2fUploads%2fpic%2fw%2f2019%2f04-14%2f62846%2fwater_62846_698_841.84_.png&ehk=xKfbJXPhCX28bOhvHCFZzJV4UUXaXkaAc5%2f47%2ffU95U%3d&risl=&pid=ImgRaw&r=0');
			background-size: cover;
			opacity: 40%;
			text-align: center;
			
			.title {
				margin-bottom: 10rpx;
				font-size: 34rpx;
				font-weight: 500;
			}
			
			.text {
				font-size: 24rpx;
				color: $uni-text-color-grey;
			}
		}
	}

	.package-title {
		font-weight: 600;
		color: $u-content-color;
		font-size: 16px;
	}

	.package-card {
		display: flex;
		height: 200rpx;
		margin: 20px auto;
		background-color: #a0cfff;
		border-radius: 18rpx;

		.package-image {
			width: 200rpx;
			height: 150rpx;
			border-radius: 6px;
		}

		.card-info {
			.package-name {
				margin: 0 0 6px 10px;
				font-weight: 500;
				color: #2e2e2e;
			}

			.applicable {
				margin-left: 10px;
				color: #7b7b7b;
			}

			.price {
				margin-left: 10px;
				color: #ffc001;
			}
		}
	}
</style>