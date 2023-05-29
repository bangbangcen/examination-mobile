<template>
	<view class="context">
		<view class="top-bar">
			<u-icon name="arrow-left" size="20" @click="goBack()"></u-icon>
			<span class="text" @click="submit()">完成</span>
		</view>
		<u-form class="form" ref="uForm" label-width="80">
			<u-form-item label="姓名">
				<u-input class="input" v-model="examinee.name" />
			</u-form-item>
			<u-form-item label="关系">
				<u-input class="input" v-model="examinee.relation" />
			</u-form-item>
			<u-form-item label="性别">
				<u-radio-group v-model="examinee.sex" @change="radioGroupChange" active-color="orange">
					<u-radio name="男" class="radio">
						男
					</u-radio>
					<u-radio name="女">
						女
					</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="身份证号">
				<u-input class="input" v-model="examinee.identificationNumber" />
			</u-form-item>
			<u-form-item label="联系方式">
				<u-input class="input" v-model="examinee.phone" />
			</u-form-item>
			<u-form-item label="出生日期" @click="openCalendar()">
				{{ toDateString(examinee.birthday) }}
				<u-calendar v-model="showCalendar" mode="date"></u-calendar>
			</u-form-item>
		</u-form>
	</view>
</template>

<script>
import $axios from '@/utils/axios';
	export default {
		data() {
			return {
				examinee: {
					relation: "",
					name: "",
					sex: "男",
					identificationNumber: "",
					phone: "",
					birthday: new Date()
				},
				showCalendar: false
			};
		},
		methods: {
			radioGroupChange(e) {
				console.log(e);
			},
			openCalendar() {
				this.showCalendar = true;
			},
			submit() {
				$axios.post("/examinee/update", {
					examinee: this.examinee
				});
				uni.navigateBack();
			},
			goBack() {
				uni.navigateBack();
			},
			toDateString(date) {
				return '' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(); 
			}
		},
		onReady() {
			this.examinee = this.$store.examinee;
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

	.top-bar {
		padding: 0 10px;
		height: 40px;
		background-color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 16px;
		color: orange;
	}
	
	.form {
		margin: 0 auto;
		width: 90%;

		.input {
			border-bottom: 1px solid $uni-border-color;
		}
		
		.radio {
			margin-right: 10px;
		}
	}
</style>