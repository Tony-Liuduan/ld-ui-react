/*拼接请求地址Url*/
function parseUrl(params) {
	if(params) {
		let paramStr = [];
		Object.keys(params).map((key) => {
			paramStr.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
		});
		paramStr = paramStr.join('&');
		return `${paramStr}`;
	}
	return '';
}

/*处理json值，将key value都作为value 转换为[{code: key, label: value}, ...]*/
function parseJsonData(data) {	
	if(data) {
		let ary = [];
		Object.keys(data).map((key) => {
			ary.push({
				code: key,
				label: data[key]
			});
		});
		return ary;
	}
	return [];
}

export default {
	parseUrl,
	parseJsonData
};