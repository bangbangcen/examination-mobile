<template>
	<view class="context">
		<uni-forms class="form">
			<uni-forms-item label="体检人" name="">
				<uni-data-select v-model="value" :localdata="range" @change="change"></uni-data-select>
			</uni-forms-item>
			<uni-forms-item label="邮箱" name="email">

			</uni-forms-item>
		</uni-forms>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectShow: 0,
				value: 0,
				range: [{
						value: 0,
						text: "篮球"
					},
					{
						value: 1,
						text: "足球"
					},
					{
						value: 2,
						text: "游泳"
					},
				],
				form: {
					name: '',
					intro: '',
					sex: ''
				}
			};
		}
	}
</script>

<style lang="scss">
	.form {
		margin: 20px auto;
		width: 80%;
	}
</style>