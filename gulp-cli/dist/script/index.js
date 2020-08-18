var mySwiper = new Swiper ('#swiper1', {
  autoplay: {
    delay: 3500,
    stopOnLastSlide: false,
    disableOnInteraction: false,
    },

    zoom : {
      maxRatio: 1.35//全部设置5倍
    }, //开启缩放功能,
    loop: true, // 循环模式选项

// 如果需要分页器
  pagination: {
    el: '.swiper-pagination',
    type : 'progressbar',
  },

// 如果需要前进后退按钮
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    hideOnClick: true,
  },

  effect : 'coverflow',
  slidesPerView: 1.2,
  centeredSlides: true,
  coverflowEffect: {
    rotate: 30,
    stretch: 10,
    depth: 50,
    modifier: 1.5,
    slideShadows : true
  },
})

//特价商品渲染
var mingoods = document.querySelector(".mingoods");
var clean = document.querySelector(".clean");
var lis = document.querySelectorAll(".every-menu ul li");
lis = Array.from(lis);
// console.log(lis);
var data1 = [];
var lisIndex = 0;
ajax({
    url: '../json/goods.json',
    type: 'get',
    // data: 'abc=12345&www=baidu',
    // data: {abc: 123456,www: 'baidu'},
    dataType: 'json',
    success: function (data){
        var json = JSON.parse(data);
        data1 = json
        // console.log(data1)
        
        lis.forEach((item,index)=>{
          item.addEventListener("mouseover",()=>{
            // console.log(index);
            lis[lisIndex].style.cssText = ""
            item.style.cssText = "color: #e1251b;border-bottom: 2px solid  #e1251b;";
            lisIndex = index;
            var str1 = `
                      <img src="${data1[index][0].url}" alt="">
                      <div class="clean-tit">${data1[index][0].title}</div>
                      <div class="clean-price">${data1[index][0].oldPrice} <span>${data1[index][0].nowPrice}</span></div>
                      <div class="mainum">
                        <span>已抢购</span><i>${data1[index][0].num}</i><span>件</span>
                      </div>`
            clean.innerHTML = str1
            var str = "";
            data1[index].forEach((item,num)=>{
              if(num == 0) return;
              var goodsDom = `<div class="things">
                            <img src="${item.url}" alt="">
                            <div class="text">
                              <div class="tit-tit">${item.title}</div>
                              <div class="old-price">${item.oldPrice}</div>
                              <div class="now-price">${item.nowPrice}</div>
                              <div class="hhnum">
                                <span>已抢购</span><i>${item.num}</i><span>件</span>
                              </div>
                            </div>
                          </div>`;
              str += goodsDom;
           })
          mingoods.innerHTML = str;
          })
         
        });
        
          var mouseover = new Event("mouseover");
          lis[0].dispatchEvent(mouseover)
        
    },
    error: function (status){
        alert(status);
    }
});


// var clean = document.querySelector(".clean")

var swiper2 = new Swiper('#swiper2',{
    loop: true,
    slidesPerView: 4,
    loopedSlides: 5,
    autoplay: {
      delay: 0,
      stopOnLastSlide: false,
      disableOnInteraction: false,
      },
    speed:4500,
});

var maskLis = Array.from(document.querySelectorAll(".bedlist li"));
var masks = Array.from(document.querySelectorAll(".bedlist .mask"));
maskLis.forEach((item,index)=>{
  item.addEventListener("mouseover",()=>{
    masks[index].style.left = 0;
  })
  item.addEventListener("mouseleave",()=>{
    masks[index].style.left = "-350px";
  })
})
var lunbo = document.querySelector(".lunbo")
var bp = document.querySelector(".lunbo p")
var bi = document.querySelector(".lunbo i")
lunbo.addEventListener("mouseover",()=>{
  bp.style.left = 0;
  bi.style.right =0;
})
lunbo.addEventListener("mouseleave",()=>{
  bp.style.left = "-600px";
  bi.style.right ="-600px";
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