import App from './App'
import i18n from './lang/i18n'
import uView from 'uview-ui'
// import uniTag from './node_modules/uview-ui/u-tag/u-tag.vue';
import uButton from './node_modules/uview-ui/components/u-button/u-button.vue';

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false;
Vue.use(uView);
// Vue.component("u-button", uButton);
App.mpType = 'app'
const app = new Vue({
	i18n,
	...App
});

app.$mount();
// #endif


// #ifdef VUE3
import {createSSRApp} from 'vue'

export function createApp() {
	const app = createSSRApp(App)
	app.use(i18n)
	return {app}
}
// #endif
