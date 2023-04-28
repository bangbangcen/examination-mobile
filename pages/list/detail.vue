<template>

</template>

<script>
	export default {
		// #ifdef APP
		components:{
			"uni-nav-bar":uniNavBar
		},
		onBackPress({from}) {
			if(from == 'backbutton'){
				if(uniShare.isShow){
					this.$nextTick(function(){
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

			}
		},
		computed: {
		},
		onLoad(event) {
		},
		onReady() {

		},
		onNavigationBarButtonTap(event) {
			if (event.type == 'share') {
				this.shareClick();
			}
		},
		methods: {

		}
	}
</script>

<style scoped>

</style>
