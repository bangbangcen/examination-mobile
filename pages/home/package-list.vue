<template>
	<view>
		<view class="context">
			<view class="side-bar">
				<view class="bar-item" :class="{whiteBg: selectedTag === index}" v-for="(item, index) in tagList"
					@click="changeTag(index, item)">
					<view v-if="index === selectedTag">
						<view class="line"></view>
					</view>
					<img class="icon" :src="item.iconSrc" />
					<view class="title" :class="{blackText: selectedTag === index}">{{ item.title }}</view>
				</view>
			</view>
			<view class="package-area">
				<view class="package-card" v-for="(item) in packages" @click="goToDetail(item)">
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
				selectedTag: 0,
				tag: "一般体检",
				tagList: [{
						title: "一般体检",
						iconSrc: "/static/side-bar-icons/common.svg"
					}, {
						title: "入职体检",
						iconSrc: "/static/side-bar-icons/job.svg"
					}, {
						title: "儿童体检",
						iconSrc: "/static/side-bar-icons/child.svg"
					},
					{
						title: "学生体检",
						iconSrc: "/static/side-bar-icons/student.svg"
					},
					{
						title: "妇女体检",
						iconSrc: "/static/side-bar-icons/woman.svg"
					},
					{
						title: "老年体检",
						iconSrc: "/static/side-bar-icons/old-man.svg"
					},
				],
				packages: []
			};
		},
		methods: {
			changeTag(index, item) {
				this.tag = item.title;
				this.selectedTag = index;
				this.getPackages();
			},
			async getPackages() {
				this.packages = await request({
					url: `/package/list?tag=${this.tag}`
				});
			},
			goToDetail(item) {
				uni.navigateTo({
					url: `./package-detail?id=${item.id}`,
					animationType: 'fade-in'
				});
				this.$store.packageInfo = item;
			}
		},
		async onReady() {
			this.getPackages();
		},
	}
</script>

<style lang="scss">
	.context {
		position: absolute;
		display: flex;
		height: 100%;
	}

	.side-bar {
		height: 100%;
		width: 70px;
		background-color: $uni-bg-color-grey;

		.bar-item {
			position: relative;
			display: flex;
			align-items: center;
			font-size: 14px;
			color: $uni-text-color-grey;
			width: 80px;
			height: 70px;
			background-color: $uni-bg-color-grey;

			.line {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				display: inline-block;
				height: 30px;
				width: 2px;
				background-color: #FDAC00;
			}

			.icon {
				margin-right: 4px;
				margin-left: 4px;
				width: 30px;
				height: 30px;
				opacity: 90%;
			}

			.title {
				display: inline-block;
				width: 30px;
			}

			.blackText {
				color: $uni-text-color;
			}
		}

		.whiteBg {
			background-color: white;
		}
	}

	.package-area {
		flex: 1;
		padding: 20px;

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
					font-size: 16px;
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
	}
</style>