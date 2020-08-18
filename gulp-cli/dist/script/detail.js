var goodsid = location.search.split("=")[1];
var this_good_json;
var introduction =document.querySelector(".introduction")
ajax({
    url:"../json/towel.json",
    type: 'get',
    dataType: 'json',
    success: function (json){
        var jsonArr = JSON.parse(json)
        // console.log(jsonArr)
        jsonArr.forEach(function (item){
            if(item.id == goodsid) {
                // this_good_json =item;
                // console.log(this_good_json)
                // return;
                var goodsDom= `<div class="sleft">
                <div class="sbox">
                    <img src="${item.imgUrl}" alt="">
                    <div class="mask"></div>
                </div>
                <div class="imgselect">
                    <ul>
                       <div class="prev"></div>
                       <li style="border:1px solid #333"><img src="${item.tab[0]}" alt=""></li>
                       <li><img src="${item.tab[1]}" alt=""></li>
                       <li><img src="${item.tab[2]}" alt=""></li>
                       <div class="next"></div>
                    </ul>
                </div>
                <div class="addmy">
                    <img src="../image/addmy.png" alt="">
                </div>
            </div>
            <div class="lbox">
                <img src="${item.tab[1]}" alt="">
            </div>
            <div class="intro-con">
                <h2>${item.tit}</h2>
                <h3>商品编码： <span>${item.id}${item.id}${item.id}</span></h3>
                <div class="price">￥<span>123.25</span></div>
                <div class="member">
                    <div class="icon1">会员价 </div>
                    ￥<span>${item.memberP} </span><i>成为会员可以享受更多优惠呀！</i>
                </div>
                <div class="member">
                    <div class="icon1">促销</div>
                    ￥<span>满减优惠</span>
                </div>
                <div class="comment">
                    <li>
                        <p>${item.sold}</p>
                        <h3>销量</h3>
                    </li>
                    <li>
                        <p>${item.comment}</p>
                        <h3>用户评论数</h3>
                    </li>
                    <li>
                        <p>${item.getGrade}</p>
                        <h3>评论送积分</h3>
                    </li>
                </div>
                <div class="information">
                ${item.title}
                </div>
                <div class="color">
                    <div>
                        <dt>颜色: </dt>
                    <dd>樱草黄</dd><dd>香草绿</dd><dd>薄荷绿</dd><dd>抹茶绿</dd><dd>樱花粉</dd>
                    <dd>香楹紫</dd><dd>鸢尾紫</dd><dd>凌霄橙</dd><dd>夕颜蓝</dd><dd>金灿黄</dd>
                    </div>
                    <p>尺寸: <span> ${item.size} </span>  </p>
                    
                </div>
        
                <div class="num"><p>数量:</p> 
                    <div class="num-goods">
                        <button class="jian">-</button><span>1</span>
                        <button class="jia">+</button>
                    </div>
                </div>
        
                <div class="addCart" data-id="${item.id}">
                    加入购物车
                </div>
            </div>`
            //请求数据
                // console.log(goodsDom)
                introduction.innerHTML = goodsDom;
                //放大镜
                new Getbig({
                    sbox:".sbox",
                    lbox:".lbox",
                    mask:".mask",
                    maximg:".lbox img"
                })
                //tab切换
                var imgs = Array.from(document.querySelectorAll(".imgselect li img"))
                var sboximg = document.querySelector(".sbox img");
                var lboximg = document.querySelector(".lbox img");
                var tabNumber = 0
                // console.log(imgs,sboximg,)
                imgs.forEach((item,index)=>{
                    item.addEventListener("click" ,function(){
                        sboximg.src = item.src;
                        lboximg.src = item.src;
                        // console.log(item.parentNode);
                        imgs[tabNumber].parentNode.style.border = "1px solid #FFF"
                        item.parentNode.style.border = "1px solid #333";
                        tabNumber = index;
                    })
                })
                //加减数量
                var num_goods = document.querySelector(".num-goods");
                var num_span = document.querySelector(".num-goods span");
                num_goods.addEventListener("click",function(e){
                    var num = Number(num_span.innerText);
                    console.log(num)
                    if(e.target.className === "jian"){
                        if(num === 0){return false};
                        num --
                    }else if(e.target.className === "jia"){
                        num++
                    }else{
                        return false;
                    }
                    num_span.innerText = num;
                })
                var addCart = document.querySelector(".addCart");
                addCart.addEventListener("click",function(){
                    var num = Number(num_span.innerText)
                    var goodsArr = [];
                    if (localStorage.getItem('goods')) {
                        goodsArr = JSON.parse(localStorage.getItem('goods'));
                    }
                    // console.log(this)
                    // 当前商品的编码
                    var id = this.getAttribute("data-id");
                    // console.log(id)
                    // console.log(code)
                    // 标记是否已经加入过购物车
                    var flag = false;
                    goodsArr.forEach(function(item,index){
                        if (item.id === id) {
                            item.num += num;
                            flag = true;
                            return false;
                        }
                    })
                    
                    // 购物车没有此商品，push {id: 'abc1',num: 1}
                    if (!flag) {
                        goodsArr.push({"id": id,"num": num});
                    }
                    // console.log(goodsArr)
                    // 数据存储到 localStorage中
                    localStorage.setItem('goods',JSON.stringify(goodsArr));
                    alert('加入购物车成功！');
                })
                return;
            }
            
        })
        
    }
})

//放大镜
function Getbig(options){
    this.init(options);
}
Getbig.prototype ={
    constructor : Getbig,
    init:function(options){
        for(var attr in options){
            this[attr] = this.$(options[attr]);
            // console.log(this[attr])
        }
       
        // this.sboxoffset = {
        //     sboffL: offset(this.sbox,false).left,
        //     sboffT: offset(this.sbox,false).top,
        // }
        this.bindEvent();
        
    },
    $:function(selector){
        return document.querySelector(selector)
    },
    bindEvent:function(){
        
        this.sbox.addEventListener("mouseover",function(){
            this.eleToggle("show");
            this.client = {
                sbcw: this.sbox.clientWidth,
                sbch: this.sbox.clientHeight,
                mkcw: this.mask.clientWidth,
                mkch: this.mask.clientHeight,
            }
            // console.log("s")
        }.bind(this))
        this.sbox.addEventListener("mouseout",function(){
            this.eleToggle("none")
            // console.log(2323)
        }.bind(this))
        this.sbox.addEventListener("mousemove",function(evt){
            var e = evt || event;
            var x = e.clientX;
            var y = e.clientY;
            // console.log(y)
            var res = this.factoryPosition(x,y);
            this.eleMove(res.x,res.y,res.maxx,res.maxy)
        }.bind(this))

    },
    eleToggle:function(type){
        // console.log(22)
        this.lbox.style.display = type ==="show" ? "block" : "none";
        this.mask.style.display = type ==="show" ? "block" : "none";
    },
    factoryPosition:function(x,y){
        var rect = this.sbox.getBoundingClientRect();
        // console.log(rect)
        var n_left = x -  rect.x - this.client.mkcw / 2
        var n_top = y -  rect.y - this.client.mkch / 2;
        // var n_left = x -  this.sbox.offsetWidth - this.client.mkcw / 2
        // var n_top = y -  this.sbox.offsetHeight - this.client.mkch / 2;
        var max_x = this.client.sbcw - this.client.mkcw;
        var max_y = this.client.sbch - this.client.mkch;
        n_left = n_left < 0 ? 0 : n_left;
        n_left = n_left > max_x ? max_x : n_left;
        n_top = n_top < 0 ? 0 : n_top;
        n_top = n_top > max_y ? max_y : n_top;
        // console.log(n_left,n_top)
         return {
            x: n_left,
            y:n_top,
            maxx:max_x,
            maxy:max_y
        }
    },
    eleMove:function(x,y,max_x,max_y){
        this.mask.style.left = x + "px";
        this.mask.style.top = y + "px";
        var bleft = x / max_x * (this.maximg.clientWidth - this.lbox.clientWidth);
        var btop = y / max_y * (this.maximg.clientHeight - this.lbox.clientHeight);
        // console.log(bleft,btop);
        this.maximg.style.left = -bleft + "px";
        this.maximg.style.top = -btop + "px"
    }

}
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

