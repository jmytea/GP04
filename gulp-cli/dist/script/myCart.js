 // 判断购物车是否有数据
 if (localStorage.getItem('goods')) {
    var goodsArr = JSON.parse(localStorage.getItem('goods'));
    // console.log(goodsArr)
    // 加载数据
    $.ajax({
        url: '../json/towel.json',
        type: 'get',
        dataType: 'json',
        success: function (jsonArr){
            
            $.each(goodsArr,function (index,obj){
                $.each(jsonArr,function (i,item){
                    if (item.id == obj.id) {
                        // console.log(1)
                        var goodsDom = `<ul><li><input type="checkbox"> </li>
                                        <li class="thing"><img src="${item.imgUrl}" alt=""><p>${item.title}</p></li>
                                        <li class="price"><span>￥</span><span>${item.price}</span></li>
                                        <li class="count">
                                            <div class="num" data-id="${item.id}">
                                                <button class="jian">-</button><span>${obj.num}</span>
                                                <button class="jia">+</button>
                                            </div>
                                        </li>
                                        <li class="all"><span>￥</span><span>${(item.price*obj.num).toFixed(2)}</span></li>
                                        <li class="del" data-id="${item.id}">删除</li></ul>`;
                        
                        
                        // console.log( $(goodsDom).find("input").prop("checked"),JSON.parse(localStorage.getItem(item.id)))
                        $('.every').append(goodsDom);
                        // $(goodsDom).find("input").attr("checked",JSON.parse(localStorage.getItem(item.id))) ;
                    }
                })
            })
            $(".every .del").each(function(index,item){
                //获取ID相同的localstorage
                // console.log(1)
                var bool = localStorage.getItem($(item).attr("data-id"));
                // console.log($(item).attr("data-id"));
                $(item).siblings().find("input").prop("checked",JSON.parse(bool))
            })
            calcPrice();
        }
    });

    // 删除购物车商品
    $('.every').on('click','.del',function (){
        
        console.log(1)
        // 当前商品的编号
        var id = $(this).attr('data-id');
        // 删除数组元素：pop()  unshift()  splice(start,1)
        $.each(goodsArr,function (index,item){
            if (item.id === id) {
                goodsArr.splice(index,1);
                return false;
            }
        });

        if (goodsArr.length > 0) {
            // 把数据更新到本地存储
            localStorage.setItem('goods',JSON.stringify(goodsArr));
        } else {
            localStorage.clear();
            var newDiv = '<div style="line-height:80px; text-align:center; color: #999;">购物车暂无数据！</div>';
            $('.every').html(newDiv);
        }
        localStorage.removeItem(id);
        // 删除页面的节点
        $(this).parent().remove();
        calcPrice();
        alert(' 商品成功移出购物车！');
    })
} else {
    var newDiv = '<div style="line-height:80px; text-align:center; color: #999;">购物车暂无数据！</div>';
    $('.every').html(newDiv);
}

 //点击+ -
 $(".every").on("click",".num",function(e){
    var num=Number($(e.target).siblings("span").text())
    if(e.target.className === "jian"){
        if(num === 0){return false}
        num--;
    }else if(e.target.className === "jia"){
        num++
    }else{
        return false;
    }
    // console.log($(e.target).siblings("span").text(num))
    $(e.target).siblings("span").text(num)
    var goodsArr = JSON.parse(localStorage.getItem('goods'));
    $(goodsArr).each(function(index,item){
        // console.log($(e.target).parent().attr("data-id"))
        var id = $(e.target).parent().attr("data-id")
        if(item.id == id){
            item.num = num;
        }
    })
    localStorage.setItem("goods",JSON.stringify(goodsArr));
    //计算小计
    var subTotal = $(e.target).closest(".count").siblings(".all").find("span").eq(1).text();
    var unitPrice = $(e.target).closest(".count").siblings(".price").find("span").eq(1).text()
    // console.log(subTotal,num)
    subTotal = (unitPrice * num).toFixed(2)
    $(e.target).closest(".count").siblings(".all").find("span").eq(1).text(subTotal);
    calcPrice();

})

// console.log($(".box .alls"))
//全选
$(".title .alls").click(function(){
if($(".title .alls").prop("checked")){
    console.log($(".every input"))
    $(".every input").prop("checked",true)
    $(".alls").prop("checked",true)
    localStorage.setItem("alls",true);
}else{
    $(".every input").prop("checked",false)
    $(".alls").prop("checked",false);
    localStorage.setItem("alls",false);
}
})
$(".every").on("click","input",function(){
$(".every input").each(function(index,item){
    if($(item).prop("checked")){
        $(".alls").prop("checked",true)
        localStorage.setItem("alls",true);
    }else{
        $(".alls").prop("checked",false)
        localStorage.setItem("alls",false);
       return false;
    } 
   
})   
})
//下侧全选
$(".totle .alls").click(function(){
if($(".totle .alls").prop("checked")){
    console.log($(".every input"))
    $(".every input").prop("checked",true)
    $(".alls").prop("checked",true);
    localStorage.setItem("alls",true);
}else{
    $(".every input").prop("checked",false)
    $(".alls").prop("checked",false)
    localStorage.setItem("alls",false);
}
})
$(".every").on("click","input",function(){
$(".every input").each(function(index,item){
    if($(item).prop("checked")){
        $(".alls").prop("checked",true)
        localStorage.setItem("alls",true);
    }else{
        $(".alls").prop("checked",false)
        localStorage.setItem("alls",false);
       return false;
    }            
})   
})

var checkbool = [];
//计算总价
function calcPrice(e){
totlePrice = 0;
$(".every input").each(function(index,item){
    if($(item).attr("checked")){
         totlePrice += Number($(item).parent().siblings(".all").find("span").eq(1).text());
         var id = $(item).parent().siblings(".del").attr("data-id")
         localStorage.setItem(id,true)
    }else{
        var id = $(item).parent().siblings(".del").attr("data-id")
        localStorage.setItem(id,false)
    }
})
$(".totlePrice").text(totlePrice) ;
}

var totlePrice = 0;
$(".box").on("click","input",calcPrice)

//勾选框
$(".alls").attr("checked",JSON.parse(localStorage.getItem("alls"))) 

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