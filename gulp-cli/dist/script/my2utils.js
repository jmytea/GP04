// 判断是否为对象
function isObject(obj){
    if (Object.prototype.toString.call(obj) === '[object Object]'){
        return true;
    }
    return false;
}

// ajax封装
function ajax(options){
    // 1.创建XMLHttpRequest对象（数据交互对象或ajax对象）
    var xhr = new XMLHttpRequest();// 除了IE56其他都支持
    // var xhr = new ActiveXObject('Microsoft.XMLHTTP');//IE56

    // 对传入参数进行格式化 'abc=123&www=baidu'
    var data = '';
    if (typeof options.data === 'string') {
        data = options.data;
    }
    // if (typeof options.data === 'object'&&options.data.constructor === 'Obejct'&& options.data !== null) {
    if ( isObject(options.data) ){
        for (var key in options.data){
            data += key+'='+options.data[key]+'&';
        }
        // 'abc=123&www=baidu&'
        data = data.substring(0,data.length-1);
        // 'abc=123&www=baidu'
    }

    if (options.type.toLowerCase() === 'get') {
        xhr.open(options.type,options.url+'?'+data+'&_='+Date.now());
        xhr.send(null);
    }else if (options.type.toLowerCase() === 'post'){
        xhr.open(options.type,options.url);
        // POST请求需要在send之前设置请求头，模拟表单的post提交
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        // 3.发送请求
        xhr.send(data);//post请求要发送的数据放参数里面
    } else {
        alert('目前只支持get和post请求方式');
        return false;
    }

    // 4.请求/响应状态
    // xhr.readyState  0-4
    // xhr.readyState属性发送变化时会触发一个事件，readystatechange
    xhr.onreadystatechange = function (){
        // console.log( xhr.readyState );// 2 3 4
        if (xhr.readyState === 4) {// 请求完成状态
            // http状态码 xhr.status
            if (xhr.status >= 200 && xhr.status < 300) {// 请求成功，可以拿到数据
                // xhr.responseText  返回文本数据
                // xhr.responseXML  返回 XML数据
                if (options.dataType === 'xml') {
                    options.success(xhr.responseXML);
                } else {
                    options.success(xhr.responseText);
                }
            } else {
                options.error(xhr.status);
            }
        }
    }
}

// ajax({
//     url: './data/post.php',
//     type: 'post',
//     // data: 'abc=12345&www=baidu',
//     data: {abc: 123456,www: 'baidu'},
//     dataType: 'json',
//     success: function (data){
//         var json = JSON.parse(data);
//         show.innerHTML = `${json.abc} ---- ${json.www}`;
//     },
//     error: function (status){
//         alert(status);
//     }
// });

// 基于promise封装ajax
function pajax(options){
    return new Promise((resolve,reject)=>{
        // 1.创建XMLHttpRequest对象（数据交互对象或ajax对象）
        var xhr = new XMLHttpRequest();// 除了IE56其他都支持
        // var xhr = new ActiveXObject('Microsoft.XMLHTTP');//IE56

        // 对传入参数进行格式化 'abc=123&www=baidu'
        var data = '';
        if (typeof options.data === 'string') {
            data = options.data;
        }
        // if (typeof options.data === 'object'&&options.data.constructor === 'Obejct'&& options.data !== null) {
        if ( isObject(options.data) ){
            for (var key in options.data){
                data += key+'='+options.data[key]+'&';
            }
            // 'abc=123&www=baidu&'
            data = data.substring(0,data.length-1);
            // 'abc=123&www=baidu'
        }

        if (options.type.toLowerCase() === 'get') {
            xhr.open(options.type,options.url+'?'+data+'&_='+Date.now());
            xhr.send(null);
        }else if (options.type.toLowerCase() === 'post'){
            xhr.open(options.type,options.url);
            // POST请求需要在send之前设置请求头，模拟表单的post提交
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            // 3.发送请求
            xhr.send(data);//post请求要发送的数据放参数里面
        } else {
            alert('目前只支持get和post请求方式');
            return false;
        }

        // 4.请求/响应状态
        // xhr.readyState  0-4
        // xhr.readyState属性发送变化时会触发一个事件，readystatechange
        xhr.onreadystatechange = function (){
            // console.log( xhr.readyState );// 2 3 4
            if (xhr.readyState === 4) {// 请求完成状态
                // http状态码 xhr.status
                if (xhr.status >= 200 && xhr.status < 300) {// 请求成功，可以拿到数据
                    // xhr.responseText  返回文本数据
                    // xhr.responseXML  返回 XML数据
                    if (options.dataType === 'xml') {
                        resolve(xhr.responseXML);
                    } else {
                        resolve(xhr.responseText);
                    }
                } else {
                    reject(xhr.status);
                }
            }
        }
    })
}

// pajax({
//     url: './promise.php',
//     type: 'get',
//     data: 'code=12345',
//     dataType: 'json'
// })
// .then((data)=>{
//     var json = JSON.parse(data);
//     console.log(json.name);
//     return pajax({
//         url: './promise.php',
//         type: 'get',
//         data: 'code='+json.code,
//         dataType: 'json'
//     })
// })

// jsonp封装
function jsonp(options){
    // 把options.success变成全局函数
    window[options.jsonpCallback] = options.success;

    // 格式化参数
    var data = '';
    if (typeof options.data === 'string') {
        data = options.data;
    }
    if (isObject(options.data)) {
        for (var key in options.data){
            data += key+'='+options.data[key]+'&';
        }
        data = data.substring(0,data.length-1);
    }

    // 创建 script 标签
    var oScript = document.createElement('script');
    // 把数据地址、参数、回调函数拼接赋值给src
    oScript.src = options.url+'?'+data+'&'+options.jsonp+'='+options.jsonpCallback;
    // 添加到body中
    document.body.appendChild(oScript);
    // 数据加载完成后删除script标签
    oScript.onload = function (){
        document.body.removeChild(oScript);
    }
}

// jsonp({
//     url: 'http://suggestion.baidu.com/su',
//     data: 'wd='+search.value,
//     jsonp: 'cb',// 根据接口来输入
//     jsonpCallback: 'mycb',// 可以自定义
//     success: function (json){
//         list.innerHTML = '';
//         json.s.forEach(function (item){
//             list.innerHTML += '<li>'+item+'</li>';
//         });
//     }
// });

// 获取元素
function $1(selector){
    return document.querySelector(selector);
}
function $2(selector){
    return document.querySelectorAll(selector);
}

function swiperAnimate( ele , target , attr , timingfunction = "swing" ,speed ){
    // 根据target 和当前的元素位置判定速度为正数还是负数;
    // --------------更改--------------
    // 透明度统一 * 100;
    // bool = true // 运动开始
    if( attr === "opacity"){
        var iNow = parseInt(getComputedStyle(ele)[attr] * 100);
        target = target * 100;
    }else{
        var iNow = parseInt(getComputedStyle(ele)[attr]);
    }
    if( timingfunction === "liner"){
        // 判定speed是否存在;
        speed = speed === undefined ? 5 : speed;
        // 判定speed的正负;
        speed = iNow < target ? Math.abs(speed) : -Math.abs(speed);
    }
 
    // 把所有的定时器都放进ele对象之中;
    clearInterval(ele.timer)
    ele.timer = setInterval(function(){
        
        if(timingfunction === "swing"){
            // 缓冲运动速度;
            // 2. 根据目标点求得运动的速度;
            // 闪现; 
            speed = (target - iNow) / 10 ;
            // 速度取整; 要查看速度是正数还是负数;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        }
        
        if( Math.abs( target - iNow ) <= Math.abs(speed) ){
            clearInterval(ele.timer);    
            // bool = false //运动完成
            // --------------更改--------------
            if( attr === "opacity"){
                ele.style[attr] = target / 100;
            }else{
                ele.style[attr] = target + "px";
            }
        }else{
            // 解决了多次出发事件让元素异常运动的bug;
            iNow += speed;
            // --------------更改--------------
            // box_ele.style.left = iNow + "px";
            if( attr === "opacity"){
                ele.style[attr] = iNow / 100;
            }else{
                ele.style[attr] = iNow + "px";
            }
        }
    } , 30)
}
// swiperAnimate(wrapper , -index * 1130 , "left" , "liner");

// 模仿 : jQuery 工具库实现委托的方法; 事件委托
        // on( 元素 object , 事件类型 string , 事件处理函数 function )
        function on( parent , type , selector ,  cb){
            // 做一个基本判断 : 
            // 1. 正常绑定事件;
            // 2. 实现事件委托; 多一个参数 => 选择器;
            // 严谨 : 1. 参数数量不一样 ;
            //        2. cb_selector => 正常 是函数;
            //                       => 委托 是字符串;
            if(arguments.length === 4 && typeof selector === "string"){
                // 事件委托;

                // 如果你的程序只有两套逻辑，在第一个逻辑之中直接return false ; 
                // 可以省略第二个if逻辑;
                parent.addEventListener( type , function(evt){
                    // 在里面加上逻辑进行判断;
                    // 根据逻辑决定是否调用 事件处理函数;
                    var e = evt || event;
                    var target = e.target || e.srcElement;

                    // 判定 : 
                    // var node = target;
                    // 判定究竟是什么选择器非常重要;
                    // 截取选择器的开头;
                    var selector_start = selector.substr(0,1);
                    var selector_type  = null;
                    // 为了不让selector 重复截取，那么在这进行一个替换;
                    var selector_last = null;
                    switch( selector_start ){
                        case "." : 
                            selector_type = "className"; 
                            // 去掉选择符;
                            selector_last = selector.slice(1);
                            break;
                        case "#" : 
                            selector_type = "id";
                            // 去掉选择符;
                            selector_last = selector.slice(1);
                            break;
                        default : 
                            selector_type = "nodeName"; 
                            selector_last = selector.toUpperCase();
                            break;
                    }
                    
                    // console.log(cb)
                    while( target !== parent ){
                        // 你为啥知道这个是类名那 ?
                        // 选择器定了;
                        // 如果此时判定的是标签，那么这个时候我们需要将传入的参数大写;
                        // 上述代码逻辑 : (selector_type === "nodeName" ? selector.toUpperCase() : selector)
                        if(target[selector_type] ===  selector_last){
                            cb(e);
                            break;
                        }
                        target = target.parentNode;
                    }

                });

                return false;
            }

            parent.addEventListener( type , selector);
        }
        // on( ul , "click" , "li" , function(e){})