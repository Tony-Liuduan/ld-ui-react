import {EventEmitter} from 'events';

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

const event = new EventEmitter(); 
// 不限制监听数量
event.setMaxListeners(0);

// Map to Object
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

// form 观察dom树结构变化
function observer(cb) {
	// Firefox和Chrome早期版本中带有前缀
	const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
	// 创建观察者对象
	const observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			const nodeName = mutation.target.nodeName; 
			if (nodeName === "INPUT" || nodeName === "SELECT" || nodeName === "TEXTAREA") {
				console.log(nodeName)
				cb(mutation);
			}
		});    
	});
	return observer;
}

// 遍历对象
function each(obj, cbk) {
	var i, len;
	if(obj instanceof Array) {
		for(i = 0, len = obj.length; i < len; i++) {
			if(cbk.call(obj[i], i, obj[i]) === false) {
				break;
			}
		}
	}
	else {
		for(i in obj) {
			if(cbk.call(obj[i], i, obj[i]) === false) {
				break;
			}
		}
	}
}

export default {
	parseUrl,
	parseJsonData,
	event,
	strMapToObj,
	observer,
	each
};