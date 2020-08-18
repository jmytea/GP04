var styleDD = document.querySelectorAll(".clothesStyle dd")
var sizeDD = document.querySelectorAll(".clothesSize dd");
var sortDD = document.querySelectorAll(".sort dd");
styleDD = Array.from(styleDD);
sizeDD = Array.from(sizeDD);
sortDD = Array.from(sortDD);
var styleIndex = 0;
var sizeIndex = 0;
var sortIndex = 0;
styleDD.forEach((item,index)=>{
    item.addEventListener("click",()=>{
        styleDD[styleIndex].style.cssText = "background:#ffffff;color:#999999"
        item.style.cssText = "background:#AA998D;color:#ffffff";
        styleIndex = index;
    })
})
sizeDD.forEach((item,index)=>{
    item.addEventListener("click",()=>{
        sizeDD[sizeIndex].style.cssText = "background:#ffffff;color:#999999"
        item.style.cssText = "background:#AA998D;color:#ffffff";
        sizeIndex = index;
    })
})
sortDD.forEach((item,index)=>{
    item.addEventListener("click",()=>{
        sortDD[sortIndex].style.cssText = "background:#ffffff;color:#999999"
        item.style.cssText = "background:#AA998D;color:#ffffff";
        sortIndex = index;
    })
})

// 请求获取数据
var goodsDom = ""
var thingCon = document.querySelector(".thing-con");
ajax({
    url:"../json/towel.json",
    type: 'get',
    dataType: 'json',
    success: function (json){
        var jsonArr = JSON.parse(json)
        // console.log(jsonArr)
        jsonArr.forEach(function (item){
            goodsDom += `<div class="item" data-id="${item.id}">
                                <div class="imgcon"><img src="${item.imgUrl}" data-id="${item.id}"  alt=""></div>
                                <h3 data-id="${item.id}"><span>￥</span>${item.price}</h3>
                                <p data-id="${item.id}">${item.title}</p>
                                <i data-id="${item.id}"><span data-id="${item.id}">${item.evaluate}</span>条评价</i>
                                <h4>${item.store}</h4>
                                <div class="add" data-id="${item.id}"><img src="../image/detail1.png" alt=""> 点击查看</div>
                            </div>`;
        })
        thingCon.innerHTML = goodsDom;
    }
})

on( thingCon , "click" , ".item" , function(e){
    // var item = document.querySelectorAll(".item")
    
    location.href="./detail.html?id=" + e.target.getAttribute("data-id")
})

//判断localstorage是否有登录名
var welBox = document.querySelector(".dp-logo .username")
if (localStorage.getItem('username')) {
    // console.log(1)
    var username = localStorage.getItem('username');
    welBox.innerHTML = "亲爱的 : " + username;
    // welBox.style.display = "block"
}else{
    welBox.innerHTML = "亲？你还没有登录呀!";
    // welBox.style.display = "block"
}
