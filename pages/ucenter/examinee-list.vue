<template>
	<view class="context">
		<view class="card" v-for="(item) in examinees" @click="goToDetail(item)">
			<view class="left">
				<view class="left-content">
					<view class="name">
						{{ item.name }}
					</view>
					<view class="relation">
						{{ item.relation }}
					</view>					
				</view>
			</view>
			<view class="right">
				<view class="right-content">
					<view class="row">
						<span class="property">性别</span>
						<span class="value">{{ item.sex }}</span>
					</view>
					<view class="row">
						<span class="property">身份证号</span>
						<span class="value">{{ item.identificationNumber }}</span>
					</view>
					<view class="row">
						<span class="property">联系方式</span>
						<span class="value">{{ item.phone }}</span>
					</view>
					<view class="row">
						<span class="property">出生日期</span>
						<span class="value">{{ item.birthday.toString().slice(0, 10) }}</span>
					</view>					
				</view>
			</view>
			<view class="cross" v-if="showCross" @click.stop="deleteExaminee(item.id)">×</view>
			<image class="decoration" src='/static/card-dec.png'></image>
		</view>
		<view class="bottom-bar">
			<view class="operation" @click="showCross = !showCross;">
				<span class="cancel" v-if="showCross">取消</span>
				<span v-else>操作</span>
			</view>
			<view class="add" @click="addExaminee()">+</view>
		</view>
	</view>
</template>

<script>
	import { request } from "../../utils/request.js";
	
	export default {
		data() {
			return {
				examinees: [{
					name: "黎明",
					relation: "母子"
				}],
				showCross: false
			};
		},
		methods: {
			goToDetail(item) {
				uni.navigateTo({
					url: '/pages/ucenter/examinee-detail'
				});
				this.$store.examinee = item;
				this.$store.examinee.birthday = new Date();
				this.$store.examinee.status = 'update';
			},
			async getExaminees() {
				this.examinees = await request({
					url: "/examinee/list"
				});
			},
			addExaminee() {
				this.$store.examinee = {
					status: 'add',
					name: "",
					identificationNumber: "",
					phone: "",
					birthday: new Date(),
					relation: "",
					sex: "男"
				}
				uni.navigateTo({
					url: '/pages/ucenter/examinee-detail'
				});
			},
			async deleteExaminee(id) {
				await request({
					url: `/examinee/delete?id=${id}`
				});
				this.getExaminees();
			}
		}, 
		onReady() {
			// this.getExaminees();
		},
		onShow() {
			this.getExaminees();
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
	
	.bottom-bar {
		position: fixed;
		bottom: 0;
		height: 40px;
		width: 100%;
		background-color: white;
		font-size: 16px;
		font-weight: 500;
		color: #ffc001;
		display: flex;
		align-items: center;
		justify-content: space-between;
		
		.operation {
			margin-left: 10px;
			
			.cancel {
				color: #fda3bb;
			}
		}
		
		.add {
			font-size: 30px;
			margin-right: 10px;
		}
	}
</style>