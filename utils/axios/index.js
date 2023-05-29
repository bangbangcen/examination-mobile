import axios from 'axios';

const config = {
	baseURL: 'http://127.0.0.1:3000/',
	changeOrigin: true,
};

const $axios = axios.create(config);

$axios.interceptors.request.use((req) => {
	req.headers.set("token", localStorage.getItem("token"));
	return req;
});

$axios.interceptors.response.use((res) => {
	return res.data;
}, (err) => {
	const {
		response: {
			status,
			data: {
				message
			}
		}
	} = err;
	if (status === 401) {
		proxy.$Modal.error({
			content: message,
			title: "认证失败",
			onOk: () => {
				router.push('/login');
			}
		});
	}
});

export default $axios;