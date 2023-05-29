<template>
	<view class="context">
		<view class="search">
			<u-search placeholder="请输入机构名称" v-model="keyword" @search="getCenters()" @clear="getCenters()"></u-search>
		</view>
		<view class="center-list">
			<view class="title">离你最近</view>
			<view class="center" v-for="(item, index) in centers" @click="chooseCenter(item)">
				<img class="icon" src="/static/location.svg" />
				<view>
					<view class="name">{{ item.name }}</view>
					<view>{{ item.district + item.address }}</view>
				</view>
				<view class="distance">
					距您{{ (item.distance / 1000).toFixed(1) }}公里
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { request } from "@/utils/request.js";
	export default {
		data() {
			return {
				keyword: "",
				centers: [],
				emptyNum: 0,
				dayNum: 0,
				location: {}
			};
		},
		methods: {
			async getCenters() {
				const location = this.location;
				const keyword = this.keyword;
				this.centers = await request({
					method: "POST",
					url: "/center/listByDistance",
					data: {
						location,
						keyword
					}
				});
			},
			getLocation() {
				const location = this.location;
				// const getCenters = this.getCenters;
				const thisCopy = this;
				console.log("开始获取位置")
				uni.getLocation({
					success(res) {
						console.log(res)
						location.latitude = res.latitude;
						location.longitude = res.longitude;
						thisCopy.getCenters();
					}
				});
				//#ifdef MP-WEIXIN
				wx.getLocation({
					success(res) {
						console.log(res)
					}
				});
				//#endif
			},
			Rad(d) {
				return d * Math.PI / 180.0; //经纬度转换成三角函数中度分表形式。
			},
			getDistance(lat1, lng1, lat2, lng2) {
				var radLat1 = this.Rad(lat1);
				var radLat2 = this.Rad(lat2);
				var a = radLat1 - radLat2;
				var b = this.Rad(lng1) - this.Rad(lng2);
				var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
					Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
				s = s * 6378.137; // EARTH_RADIUS;
				s = Math.round(s * 10000) / 10000; //输出为公里
				s=s.toFixed(1);
				return s;
			},
			chooseCenter(item) {
				this.$store.center = item;
				uni.navigateTo({
					url: `./appointment`,
					animationType: 'fade-in'
				});
			},
		},
		async onReady() {
			// this.getCenters();
			this.getLocation();
		}
	}
</script>

<style lang="scss">
	.context {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: $uni-bg-color-grey;
	}

	.search {
		margin-top: 10px;
		margin-left: 18px;
		width: 90%;
	}

	.center-list {
		margin: 20px auto;
		width: 90%;
		// height: 200px;
		border-radius: 6px;
		background-color: white;

		.title {
			padding-right: 10px;
			padding-top: 10px;
			margin-bottom: 6px;
			text-align: right;
			font-size: 14px;
			font-weight: 500;
			color: $uni-text-color-grey;
		}

		.center {
			padding-top: 14px;
			position: relative;
			display: flex;
			height: 50px;
			border-top: 1px solid #dcdcdc;

			.icon {
				margin: 0 4px 0 4px;
				height: 24px;
				width: 20px;
				transform: translateY(20%);
			}

			.name {
				font-weight: 500;
				font-size: 16px;
			}
			
			.distance {
				position: absolute;
				top: 24px;
				right: 10px;
				color: $uni-text-color-disable;
			}
		}
	}
</style>