<template>
	<view class="context">
		<view class="package-info">
			<view class="name">{{ this.$store.packageInfo.name }}</view>
			<view class="desc">共{{ this.$store.packageInfo.categories.length }}个项目</view>
		</view>
		<view class="examinee-select" @click="changeShowStatus()">
			<view class="title">体检人</view>
			<view class="select">请选择 ></view>
			<!-- <u-select class="select" mode="single-column" v-model="selectShow" :list="list"></u-select> -->
		</view>
		<view class="center-select" @click="chooseLocation()">
			<view class="title">体检地点</view>
			<view class="center">请选择 ></view>
		</view>
		<view class="bottom-bar">
			<view class="button">提交订单</view>
		</view>
	</view>
</template>

<script>
	import store from '../../store/index.js';
	export default {
		data() {
			return {
				selectShow: false,
				list: [{
						value: '1',
						label: '江'
					},
					{
						value: '2',
						label: '湖'
					}
				],
			};
		},
		methods: {
			changeShowStatus() {
				console.log(this.selectShow)
				this.selectShow = true;
			},
			chooseLocation() {
				uni.navigateTo({
					url: `/pages/list/center-list`,
					animationType: 'fade-in'
				});
			}
		}
	}
</script>

<style lang="scss">
	.context {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: $uni-bg-color-grey;

		.package-info {
			width: 90%;
			margin: 6px auto;
			background-color: white;
			padding: 14px 10px;

			.name {
				margin-bottom: 8px;
				font-weight: 500;
				font-size: 20px;
				color: $uni-text-color;
			}

			.desc {
				font-size: 14px;
				font-weight: 500;
				color: $uni-text-color-grey;
			}
		}

		.examinee-select {
			display: flex;
			justify-content: space-between;
			width: 90%;
			font-size: 16px;
			font-weight: 500;
			margin: 6px auto;
			background-color: white;
			color: $uni-text-color;
			padding: 14px 10px;
			
			.select {
				color: $uni-text-color-grey;
			}
		}
		
		.center-select {
			display: flex;
			justify-content: space-between;
			width: 90%;
			font-size: 16px;
			font-weight: 500;
			margin: 6px auto;
			background-color: white;
			color: $uni-text-color;
			padding: 14px 10px;
			
			.center {
				color: $uni-text-color-grey;
			}
		}
		
		.bottom-bar {
			display: flex;
			justify-content: center;
			align-items: center;
			position: fixed;
			bottom: 0;
			background-color: white;
			height: 54px;
			width: 100%;
			
			.button {
				width: 70%;
				margin-right: 20px;
				padding: 2px 6px;
				background-color: #fdc237;
				height: 30px;
				line-height: 30px;
				font-size: 18px;
				text-align: center;
				color: white;
				font-weight: 500;
				border-radius: 20px;
				letter-spacing: 6px;
			}
		}
	}
</style>