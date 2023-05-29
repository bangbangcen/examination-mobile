<template>
	<view class="context">		
		<view class="picker">
			<u-picker v-if="selectShow" :show="selectShow" ref="uPicker" :columns="examineeList" keyName="name" @confirm="confirmExaminee($event)" @cancel="closePicker()"></u-picker>
		</view>
		<view class="package-info" @click="goToDetail()">
			<view class="name">{{ packageName }}</view>
			<view class="desc">共{{ categoryNum }}个项目</view>
		</view>
		<view v-if="!isGroup" class="examinee-select" @click="openExamineeSelect()">
			<view class="title">体检人</view>
			<view class="select" mode="selector">
				<span v-if="!selectedExaminee">请选择 ></span>
				<span v-else>{{ selectedExaminee.name }}</span>
			</view>
		</view>
		<view class="center-select" @click="chooseLocation()">
			<view class="title">体检地点</view>
			<view class="center" v-if="!this.$store.center">请选择 ></view>
			<view class="center" v-if="this.$store.center">{{ this.$store.center.name }}</view>
		</view>
		<view class="date-select">
			<view class="date-bar">
				<u-icon class="icon" name="arrow-left" color="orange" @click="subMonth()"></u-icon>
				<view class="current-time">
					{{ curYear }}年{{ curMonth }}月
				</view>
				<u-icon class="icon" name="arrow-right" color="orange" @click="addMonth()"></u-icon>
			</view>
			<!-- {{ dateList }} -->
			<view class="calendar">
				<view class="item dark">一</view>
				<view class="item dark">二</view>
				<view class="item dark">三</view>
				<view class="item dark">四</view>
				<view class="item dark">五</view>
				<view class="item dark">六</view>
				<view class="item dark">日</view>
				<view v-for="(item) in greyDateList" class="item" v-if="item !== 0">{{ item.date }}</view>
				<view v-for="(item) in darkDateList" class="item dark" :class="{ 'selected': item.selected }" v-if="item !== 0" @click="chooseDate(item)">{{ item.date }}<view class="rest">{{ item.selected ? 2 : 0 }}剩余{{ item.num || 0 }}</view>
				</view>
			</view>
		</view>
		<view class="bottom-bar">
			<view class="button" @click="submitOrder()">提交订单</view>
		</view>
	</view>
</template>

<script>
	import store from '@/store/index.js';
	import { request } from "../../utils/request.js";
	export default {
		data() {
			return {
				selectShow: false,
				examineeList: [],
				selectedExaminee: null,
				emptyNum: 0,
				dayNum: 0,
				curYear: new Date().getFullYear(),
				curMonth: new Date().getMonth() + 1,
				dateList: [],
				greyDateList: [],
				darkDateList: [],
				schedule: null,
				selectedDate: null,
				isGroup: false
			};
		},
		computed: {
			packageName() {
				return this.$store.packageInfo ? this.$store.packageInfo.name : "";
			},
			categoryNum() {
				return this.$store.categories ? this.$store.categories.length : "";
			}
		},
		methods: {
			goToDetail() {
				uni.navigateTo({
					url: `./package-detail?id=${this.$store.packageInfo.id}`
				});
			},
			submitOrder() {
				
			},
			closePicker() {
				this.selectShow = false;
			},
			confirmExaminee($event) {
				this.selectedExaminee = $event.value[0];
				this.selectShow = false;
			},
			openExamineeSelect() {
				this.selectShow = true;
			},
			chooseDate(item) {
				console.log(item)
				item.selected = true;
				this.selectedDate = new Date(this.curYear, this.curMonth, item.date);
			},
			chooseLocation() {
				uni.navigateTo({
					url: `/pages/home/center-list`,
					animationType: 'fade-in'
				});
			},
			setSchedule() {
				if (!this.$store.center) return;
				var date = new Date(),
					y = date.getFullYear(),
					m = date.getMonth();
				var firstDay = new Date(this.curYear, this.curMonth - 1, 1);
				var lastDay = new Date(this.curYear, this.curMonth, 0);
				this.emptyNum = firstDay.getDay() - 1;
				this.dayNum = lastDay.getDate();
				this.dateList = [...new Array(this.emptyNum, 0).map(date => {
					date
				})];
				for (let i = 0; i < this.dayNum; i++) {
					this.dateList[i + this.emptyNum] = {
						date: i + 1,
						num: -1
					};
				}
				if (this.curMonth === new Date().getMonth() + 1) {
					this.greyDateList = this.dateList.slice(0, new Date().getDate());
					this.darkDateList = this.dateList.slice(new Date().getDate());
				} else if (this.curMonth < new Date().getMonth() + 1) {
					this.greyDateList = this.dateList;
					this.darkDateList = [];
				} else {
					this.greyDateList = [];
					this.darkDateList = this.dateList;
				}
				this.setRest();
			},
			setRest() {
				if (this.schedule[this.curMonth]) {
					this.dateList.forEach((date, index) => {
						if (date && this.schedule[this.curMonth][index]) {
							date.num = this.schedule[this.curMonth][index].num;
						}
					});					
				}
			},
			async getCenterSchedule() {
				this.schedule = await request({
					url: `/schedule/detail?centerId=${this.$store.center.id}&year=${new Date().getFullYear()}`
				});
			},
			async getExaminees() {
				const examinees = await request({
					url: `/examinee/list`
				});
				this.examineeList = [examinees];
			},
			subMonth() {
				this.curMonth--;
				this.setSchedule();
			},
			addMonth() {
				this.curMonth++;
				this.setSchedule();
			},
			async getGroupInfo() {
				const result = await request({
					url: `/group/info?phone=${this.$store.phone}`
				});
				console.log(result)
				this.$store.packageInfo = {
					id: result.packageId,
					name: result.packageName,
					categoryNum: result.categoryNum
				};
				this.$store.packageInfo.id = result.packageId;
				this.$store.packageInfo.name = result.name;
				this.$store.packageInfo.categoryNum = result.categoryNum;
				console.log(this.$store.packageInfo)
			},
			async getCategories() {
				this.$store.categories = await request({
					url: `/package/categories?id=${this.$store.packageInfo.id}`,
					method: 'get'
				});
			},
		},
		async onReady() {
			if (this.$store.center) {
				await this.getCenterSchedule();
				await this.setSchedule();
			}
			this.getExaminees();
		},
		async onLoad(query) {
			if (query && query.type === '1') {
				this.isGroup = true;
				await this.getGroupInfo();
				await this.getCategories();
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

		.picker {
			z-index: 1;
			position: absolute;
			width: 100%;
			bottom: 0;
		}
		
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

			.date-bar {
				width: 130px;
				margin: 0 auto;
				display: flex;

				.icon {
					margin: 0 4px;
				}
			}

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
					position: relative;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 16px;
					font-weight: 500;
					color: $uni-text-color-disable;
					height: 50px;
					width: 14%;
					// background-color: #fdc237;
					
					.rest {
						position: absolute;
						font-size: 6px;
						color: $uni-text-color-disable;
						bottom: 2px;
					}
				}

				.selected {
					background-color: #fdc237;
					color: white;
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