export function formatDate (date, fmd) {
	if (/(y+)/.test(fmd)) {
		fmd = fmd.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	};
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds(),
	}
	for(let d in o) {
		if (new RegExp(`(${d})`).test(fmd)) {
			let str = o[d] + '';
			fmd = fmd.replace(RegExp.$1, (RegExp.$1.length === 1 ? str : padLeftZero(str)))
			
		};
	}
	return fmd
}
function padLeftZero(str){
	return ('00' + str).substr(str.length)
}