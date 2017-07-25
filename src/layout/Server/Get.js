import {parseUrl} from '../Base/Js/utils';

export default function Get(url, param, callbacks = {}) {
	const {fail, error, completed} = callbacks;
	return new Promise(function(resolve, reject){
		fetch(`${url}?${parseUrl(param)}`, {
			credentials: 'include', // 请求带上cookies，是每次请求保持会话一直  
			method: "GET",
			headers: {
				"Accept": "application/json,text/plain, */*",
				"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
			}
		})		
		.then( (reponse) => {
			'function' === typeof completed && completed();

			if (reponse.ok || reponse.status == 200) {
				return reponse.json()
			} else {
				let err = '服务器繁忙，请稍后再试；\r\nCode:' + reponse.status;	
				'function' === typeof error && error(err);
			}
		})
		.then( (data) => {
			/*if( data.resultCode && data.resultCode == 1 ) {
				resolve(data);
			}else{
				'function' === typeof fail && fail(data);
			}
*/			resolve(data);
		})
		.catch( err => {
			reject( err )
		})
	});
};