let baseUrl = ''; //域名或选取所有接口不变的那一部分
//#ifdef H5
const token = localStorage.getItem("token");
//#endif
//#ifdef MP-WEIXIN
const token = wx.getStorageSync("token");
//#endif
export const request = (options = {}) => {
	//异步封装接口，使用Promise处理异步请求
	return new Promise((resolve, reject) => {
		// 发送请求
		uni.request({
			header: {
				token
			},
			// url: "http://116.62.178.10:3000" + options.url || '', //接收请求的API
			url: "http://localhost:3000" + options.url || '', //接收请求的API
			method: options.method || 'GET', //接收请求的方式,如果不传默认为GET
			data: options.data || {}, //接收请求的data,不传默认为空
		}).then(data => {
			let [err, res] = data;
			resolve(res ? res.data : {});
		}).catch(error => {
			reject(error);
		})
	})
}