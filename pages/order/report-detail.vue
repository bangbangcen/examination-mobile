<template>
	<view class="context">
		<view class="info-card">
			<span class="title">银行入职体检套餐</span>
			<span class="right">李佳晨 2023.6.1</span>
		</view>
		<view class="list">
			<view class="category" v-for="(category) in report">
				<view class="title">{{ category.name }}</view>
				<view class="item" v-for="(item) in category.children">
					<span>
						{{ item.name }}
						<span class="range">{{ item.range }}</span>
					</span>
					<span class="value">{{ item.value }}</span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				report: [{
						name: "一般检查",
						children: [{
								name: "收缩压",
								range: "90-140mmHG",
								value: 102
							},
							{
								name: "舒张压",
								range: "60-90mmHG",
								value: 86
							}
						]
					},
					{
						name: "内科检查",
						children: [{
								name: "胸廓",
								value: "无畸形"
							},
							{
								name: "肺部",
								value: "未见异常"
							},
							{
								name: "心界",
								value: "未见异常"
							},
							{
								name: "心音",
								value: "正常"
							},
							{
								name: "心律",
								value: "规则"
							},
							{
								name: "心脏杂音",
								value: "无"
							},
							{
								name: "腹部外形",
								value: "未见异常"
							},
							{
								name: "腹部压痛",
								value: "无"
							}
						]
					},
					{
						name: "外科检查",
						children: [
							{
								name: "皮肤",
								value: "未见异常"
							},
							{
								name: "颈部",
								value: "未见异常"
							},
							{
								name: "脊柱",
								value: "未见异常"
							},
							{
								name: "四肢",
								value: "未见异常"
							},
							{
								name: "肛门",
								value: "未见异常"
							},
							{
								name: "疝气",
								value: "无"
							}
						]
					},
					{
						name: "心电图",
						children: [
							{
								name: "心率",
								value: "规则"
							},
							{
								name: "心电图检查",
								value: "正常心电图"
							}
						]
					}
				]
			};
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

	.info-card {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 40px;
		width: 100%;
		background-color: white;
		margin-bottom: 10px;
		
		.title {
			margin-left: 10px;
			font-size: 18px;
			font-weight: 500;
		}
		.right {
			font-size: 14px;
			margin-right: 10px;
			color: $uni-text-color-grey;
		}
	}
	
	.list {
		margin: 14px auto;
		padding: 12px;
		width: 90%;
		background-color: white;
		border-radius: 6px;

		.category {
			font-size: 16px;
			font-weight: 500;

			.item {
				display: flex;
				justify-content: space-between;
				margin: 14px 10px 14px 20px;
				font-size: 16px;
				color: $uni-text-color;
				font-weight: 200;

				.range {
					padding-left: 10px;
					color: $uni-text-color-grey;
				}
				.value {
					color: #98c185;
				}
			}
		}
	}
</style>