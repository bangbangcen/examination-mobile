<template>
	<view class="context">
		<u-toast ref="uToast" />
		<view class="image-bar">
			<image class="image" src="../static/jianzhiyun.png"></image>
		</view>
		<view class="form">
			<u-form :model="form" ref="uForm" label-width="70px" :label-style="labelStyle">
				<u-form-item label="手机号">
					<view class="input">
						<u-input v-model="form.phone" />
					</view>
				</u-form-item>
				<u-form-item label="验证码">
					<view class="flex">
						<view class="input">
							<u-input v-model="form.sms" />
						</view>
						<view class="sms-button" @click="getSms()">
							<span v-if="countDown === 0">发送验证码</span>
							<span v-else class="grey">{{ countDown }}s</span>
						</view>						
					</view>
				</u-form-item>
			</u-form>			
		</view>
		<view class="button" @click="login()">
			立即登录
		</view>`
		<view class="hint">
			没有账号，首次登录则会自动注册
		</view>
	</view>
</template>

<script>
	import { request } from '@/utils/request.js';
	export default {
		data() {
			return {
				form: {
					phone: "18939816997",
					sms: "891461",
				},
				labelStyle: {
					color: "white"
				},
				inputStyle: {
					backgroundColor: 'white'
				},
				showBorder: "true",
				countDown: 0,
				intervalId: -1,
			};
		},
		methods: {
			getSms() {
				$axios.post("/getSms", {
					phone: this.form.phone
				});
				this.countDown = 60;
				this.intervalId = setInterval(() => {
					this.countDown--;
					if (this.countDown === 0) {
						clearInterval(this.intervalId);
					}
				}, 1000);
			},
			async login() {
				const res = await request({
					url: "/userLogin",
					method: "post",
					data: this.form
				});
				const { success, token, message } = res;
				this.showToast(message, success);
				if (success) {
					this.$store.phone = this.form.phone;
					//#ifdef H5
					localStorage.setItem("token", token);
					//#endif
					//#ifdef MP-WEIXIN
					wx.setStorage({
						key: "token",
						data: token
					});
					//#endif
					setTimeout(() => {
						uni.switchTab({
							url: './home/home'
						});
					}, 1000);
				}
			},
			showToast(message, success) {
				uni.showToast({
					title: message,
					icon: success ? 'success' : 'error',					
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
		background-color: #f1b500;
		color: white;

		.image-bar {
			margin-top: 60px;
			margin-bottom: 100px;
			display: flex;
			justify-content: center;

			.image {
				margin: 0 auto;
				height: 80px;
				width: 240px;
			}
		}

		.form {
			width: 80%;
			margin: 30px auto;
			color: white;

			.input {
				// height: 10px;
				border-bottom: 1px solid white;
				border-radius: 0;
			}

			.sms-button {
				margin-left: 10px;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: white;
				color: #e6ad00;
				font-weight: 500;
				width: 80px;
				height: 26px;
				border: 1px solid #ffd900;
				border-radius: 4px;

				.grey {
					color: $uni-text-color-disable;
				}
			}
		}

		.button {
			display: flex;
			justify-content: center;
			align-items: center;
			color: #f1b500;
			height: 34px;
			width: 70%;
			margin: 0 auto;
			font-size: 18px;
			font-weight: 500;
			background-color: white;
			border-radius: 20px;
		}

		.hint {
			margin-top: 10px;
			color: white;
			font-size: 14px;
			text-align: center;
		}
	}
	
	.flex {
		display: flex;
	}
</style>