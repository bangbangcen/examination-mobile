<template>
	<view class="context">
		<view class="card" @click="goToDetail()">
			<view class="left">
				<view class="left-content">
					<view class="name">
						李佳晨
					</view>
					<view class="relation">
						自己
					</view>					
				</view>
			</view>
			<view class="right">
				<view class="right-content">
					<view class="row">
						<span class="property">套餐名称</span>
						<span class="value">银行入职体检套餐</span>
					</view>
					<view class="row">
						<span class="property">体检地点</span>
						<span class="value">上海市美年体检中心</span>
					</view>
					<view class="row">
						<span class="property">体检时间</span>
						<span class="value">2023.6.3</span>
					</view>
					<view class="row">
						<span class="property">状态</span>
						<span class="value success">已完成</span>
					</view>					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			goToDetail() {
				uni.navigateTo({
					url: "./report-detail"
				})
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
	}

	.card {
		display: flex;
		position: relative;
		margin: 10px auto;
		width: 90%;
		height: 120px;
		background-color: white;
		border-radius: 8px;
		
		.left {
			display: flex;
			width: 100px;
			justify-content: center;
			align-items: center;
			
			.left-content {
				padding-right: 0px;
				height: 60px;
				width: 80px;
				text-align: center;
				border-right: 1px solid $uni-border-color;
			}
			
			.name {
				font-size: 18px;
				font-weight: 500;
			}
			
			.relation {
				margin-top: 6px;
				font-size: 14px;
				color: $uni-text-color-disable;
			}
		}
		
		.right {
			display: flex;
			justify-content: center;
			align-items: center;
			
			.row {
				margin: 4px;
				font-size: 14px;
				
				.property {
					margin-right: 10px;
					font-weight: 500;
					color: $uni-text-color;
				}
				
				.value {
					color: $uni-text-color-grey;
				}
				
				.success {
					color: #b7e6b3;
				}
			}
		}
		
		.decoration {
			position: absolute;
			right: 0;
			bottom: 0;
			width: 50px;
			height: 50px;
			opacity: 30%;
		}
		
		.cross {
			font-size: 16px;
			color: white;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 18px;
			width: 18px;
			position: absolute;
			right: 0;
			top: 0;
			transform: translate(50%, -50%);
			background-color: #fda3bb;
			border-radius: 20px;
		}
	}
	
</style>
