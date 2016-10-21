function format(str){
	var tempArr = str.split(',');
	var tempval = [];
	var tempindex = [];
	var tempdel = [];
	var tempdou = [];
	var regH = /^\s*\[*\{*\s*\"[\s\S]*\"$|^\s*\[*\{*\s*\'[\s\S]*\'$|\s*\}$|^\s*[\{\s0-9A-Za-z]*$/;
	var regL = /^\s*\'*[\s\S]*\'*\s*\]*\}*$|^\s*\"*[\s\S]*\"*\s*\]*\}*$/;
	var reg = /^\s*\[*\{/; 
	var regR = /^\s*\}/;
	var regZ = /^\s*\/{2}/;
	var regZo = /[^\']\/{2}[^\']|[^\"]\/{2}[^\"]/;
	var regn = /^\s*\{*\s*\"[^(\"\s*:\s*\')]*\'$|^\s*\{*\s*\'[^(\"\s*:\s*\')]*\"$/
	tempArr = tempArr.map( (val,i) => {
		if (regZ.test(val)) {
			if (/^[\n\r]|[\n\r]$/.test(val)) {
				tempdel.push(i);
				return undefined;
			}else{
				var newVal = val.replace(/[^\n]*|[^\r]*/,"");
				return format(newVal);
			}
		}else{
			var getArr = val.match(/([\s\S]*?):([\s\S]*)/);
			if(regR.test(val)){
				tempval.push(val);
				tempindex.push(i)
				return undefined
			}else if(getArr === null){
				return reg.test(val) ? format(val) : val.replace(/(^\s*\[*[\'{0,1}\"{0,1}])([\s\S]*?)([\'{0,1}\"{0,1}]\s*\]*\s*\}*\s*\}*\]*$)/g,changeString);
			}else if(regH.test(getArr[1])&&regL.test(getArr[2])&&!(regn.test(getArr[2]))){
				var regtemp = /(^\s*\[*\{*\s*[\'{1}\"{1}])([\s\S]*)([\'{1}\"{1}]$)/g ;
				getArr[1] = regtemp.test(getArr[1]) ? getArr[1].replace(regtemp,changeString):getArr[1].replace(/(\s*\{*\s*)([a-zA-Z0-9]*)/,changename);
				if (regZo.test(getArr[2])) {
					getArr[2] = getArr[2].replace(/\s*\/{2}[^\n\r]*/,"");
					tempdou.push(i);
				}else{
					getArr[2] = reg.test(getArr[2]) ? format(getArr[2]) : getArr[2].replace(/(^\s*\[*\s*[\'{0,1}\"{0,1}])([\s\S]*?)([\'{0,1}\"{0,1}]\s*}*\s*}*\]*$)/g,changeString);
				}
				return `${getArr[1]}:${getArr[2]}`
			}else{
				throw new Error('error!')
			}
		}
	})
    tempindex.forEach( (val,i) => {
    	for(var x = val ; x > 0 ; x--){
    		if (tempArr[x-1] !== undefined ) {
    			tempArr[x-1] += tempval[i];
    			break;
    		}
    	}
    });
    tempdou.forEach((val,i) => {
    	for(var x = val ; x < tempArr.length ; x++){
    		if (tempArr[x + 1] !== undefined) {
    			tempArr[x + 1] = tempArr[val] + tempArr[x+1];
    			break;		
    		}
    	}
    });
    tempindex = tempindex.concat(tempdel,tempdou);
    tempindex.sort(function(v1,v2){
    	return v2 - v1 
    });
    tempindex.forEach( (val,i) => {
    		tempArr.splice(val,1);	
    });
	var result = tempArr.join(',');
	return result 
}

function changeString(match,str1,str2,str3,offset,string){
	console.log(str1,123,str2,456,str3)
	var newStr1 = str1.replace(/'/g,"\"");
	if(newStr1  === str1){
		str2 = str2.replace(/[^\\]"/g,"\"")
	}else{
		str2 = str2.replace(/[^\\]"/g,"\\\"")
	}
		str3 = str3.replace(/'/g,"\"");
	return newStr1 + str2 + str3
}
function changename(match,str1,str2,offset,string){
	return str1 + '"' + str2 + '"'
}

module.exports = {
	format
}
