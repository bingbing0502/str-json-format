# str-json-format
字符串json格式容错

str-json-format
===========

###Install

```
npm install str-json-format
```

###Usage



`main.js`

```
var  fs = require("fs");
var  data = fs.readFileSync("./hello.js","utf8");
var  fun = require("str-json-format");
fs.writeFile('./hello_output.json',fun.format(data), function(err){
    if(err) throw err;
});
```

`hello.js`

```
{
  "port": '3000',
  "ip": '192.168.3.67',
  //"app": "qufenqi",
  'domain': { a:"b"},
  "hostname": 'a\'aa',//nd
  asd:[1,'2',3,[1,2,3,{a:2},1]],
  ads:{
  	a:[1,'2']},
  "dd":{
  	"df": "1\"2",
  	'ad':{
  		//'c':'sxad',
  		//'f':'sds',
  		'cggf':{
  			'sdf':[1.2,56,{a:12},2,{'a':"3]4"},[1,2,'ew']],
  			'df':'dsfd',
  		},
  	}
  },
}
```

`hello_output.js`

```
{
  "port": "3000",
  "ip": "192.168.3.67",
  "domain": { "a":"b"},
  "hostname": "a\'aa",
  "asd":[1,"2",3,[1,2,3,{"a":2},1]],
  "ads":{
  	"a":[1,"2"]},
  "dd":{
  	"df": "1\"2",
  	"ad":{
  		"cggf":{
  			"sdf":[1.2,56,{"a":12},2,{"a":"3]4"},[1,2,"ew"]],
  			"df":"dsfd"
  		}
  	}
  }
}
```
