<template>
	<view class="context">
		<view>
			<image class="center-image"
				src="https://tse4-mm.cn.bing.net/th/id/OIP-C.73sihFvfRXSlApioZR9Q-AHaFj?w=234&h=180&c=7&r=0&o=5&dpr=1.8&pid=1.7">
			</image>
			<view class="gradient-cover"></view>
			<view class="info-card">
				<view class="name">
					{{ detail.name }}
				</view>
				<view class="tag">
					三甲医院
				</view>
				<view class="info-content">
					<view class="info-row">
						<span class="title">人数上限:</span>
						上午{{ detail.morningLimit }}人，下午{{ detail.afternoonLimit }}人
					</view>
					<view class="info-row">
						<span class="title">地址:</span>
						上海市{{ detail.district + detail.address }}
					</view>
					<view class="info-row">
						<span class="title">交通:</span>
						{{ detail.nearby }}
					</view>
					<view class="info-row">
						<span class="title">电话号码:</span>
						{{ detail.telephone }}
					</view>
					<view class="info-row">
						<span class="title">公告:</span>
						{{ detail.announcement }}
					</view>
					<map style="width: 100%; height: 100%;" enable-3D="false" show-compass="false"
						enable-overlooking="false" :enable-satellite="false" :enable-traffic="false"
						show-location="false" :latitude="detail.latitude" :longitude="detail.longitude">
					</map>
				</view>
			</view>
			<view class="bottom-bar">
				<u-button class="appointment-button" type="primary" size="medium" shape="circle">立即预约</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import $axios from '../../utils/axios/index.js';

	export default {
		// #ifdef APP
		components: {
			"uni-nav-bar": uniNavBar,
		},
		onBackPress({
			from
		}) {
			if (from == 'backbutton') {
				if (uniShare.isShow) {
					this.$nextTick(function() {
						console.log(uniShare);
						uniShare.hide()
					})
				}
				return uniShare.isShow;
			}
		},
		// #endif
		data() {
			return {
				id: -1,
				detail: {
					name: "",
					district: "",
					address: "",
					morningLimit: 0,
					afternoonLimit: 0,
					telephone: "",
					nearby: ""
				}
			}
		},
		computed: {},
		onLoad(event) {
			this.id = event.id;
			this.getCenterDetail();
		},
		onReady() {

		},
		onNavigationBarButtonTap(event) {
			if (event.type == 'share') {
				this.shareClick();
			}
		},
		methods: {
			async getCenterDetail() {
				console.log(this.id)
				const detail = await $axios.get(`/center/detail?id=${this.id}`);
				this.detail = detail;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.context {
		width: 100%;
		height: 100%;
		position: absolute;
		background-color: #fafafa;
	}

	.center-image {
		position: relative;
		width: 100%;
		z-index: 0;
	}

	.gradient-cover {
		position: relative;
		height: 200px;
		margin-top: -180px;
		background-image: linear-gradient(to bottom, transparent, #fafafa);
		z-index: 1;
	}

	.info-card {
		position: relative;
		border-radius: 16px;
		width: 80%;
		margin: -80px auto 0;
		padding: 0 20px;
		background-color: white;
		font-weight: 300;
		height: 400px;
		z-index: 2;

		.info-content {
			margin-top: 10px;
		}

		.info-row {
			margin-bottom: 4px;
		}

		.name {
			height: 30px;
			padding-top: 10px;
			font-weight: 500;
			font-size: 16px;
		}

		.tag {
			font-weight: 100;
			display: flex;
			justify-content: center;
			align-items: center;
			border: 1px solid #ededed;
			border-radius: 4px;
			height: 20px;
			width: 60px;
			background-color: #f5f5f5;
		}

		.title {
			margin-right: 10px;
			font-weight: 500;
		}
	}

	.icon {
		display: inline;
	}

	.bottom-bar {
		position: fixed;
		display: flex;
		align-items: center;
		bottom: 0;
		height: 60px;
		width: 100%;
		background-color: #f4f4f4;
		border-top: 1px solid #efefef;

		.appointment-button {
			font-size: 14px;
			width: 280px;
			height: 32px;
		}
	}
</style>