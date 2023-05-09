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
			<view class="center" v-if="!this.$store.center">请选择 ></view>
			<view class="center" v-if="this.$store.center">{{ this.$store.center.name }}</view>
		</view>
		<view class="date-select">
			<view class="current-time">
				{{ new Date().getFullYear() }}年{{ new Date().getMonth() + 1 }}月
			</view>
			<view class="calendar">
				<view class="item dark">一</view>
				<view class="item dark">二</view>
				<view class="item dark">三</view>
				<view class="item dark">四</view>
				<view class="item dark">五</view>
				<view class="item dark">六</view>
				<view class="item dark">日</view>
				<view v-for="(item) in greyDateList" class="item">{{ item }}</view>
				<view v-for="(item) in darkDateList" class="item dark">{{ item }}</view>
			</view>
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
				emptyNum: 0,
				dayNum: 0,
				dateList: [],
				greyDateList: [],
				darkDateList: []
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
			},
			calEmptyNum() {
				var date = new Date(),
					y = date.getFullYear(),
					m = date.getMonth();
				var firstDay = new Date(y, m, 1);
				var lastDay = new Date(y, m + 1, 0);
				this.emptyNum = firstDay.getDay() - 1;
				this.dayNum = lastDay.getDate();
				this.dateList = [...new Array(this.emptyNum, -1)];
				for (let i = 0; i < this.dayNum; i++) {
					this.dateList[i + this.emptyNum] = i + 1;
				}
				this.greyDateList = this.dateList.slice(0, new Date().getDate());
				this.darkDateList = this.dateList.slice(new Date().getDate());
			}
		},
		onReady() {
			this.calEmptyNum();
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

		.date-select {
			width: 96%;
			margin: 0 auto;
			padding-top: 10px;
			background-color: white;
			
			.current-time {
				text-align: center;
				font-size: 16px;
				color: $uni-text-color;
				font-weight: 500;
			}
			.calendar {
				display: flex;
				flex-wrap: wrap;
				width: 94%;
				margin: 0 auto;

				.item {
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 16px;
					font-weight: 500;
					color: $uni-text-color-disable;
					height: 50px;
					width: 14%;
					// background-color: #fdc237;
				}
				
				.dark {
					color: $uni-text-color;
				}
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