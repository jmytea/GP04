var username =document.querySelector(".username");
var pwd =document.querySelector(".pwd");
var btn_login =document.querySelector(".btn");
var alertTit = document.querySelector(".alert-tit")
btn_login.onclick = function(){
    ajax({
        url: '../php/register.php',
        type: 'post',
        // data: 'abc=12345&www=baidu',
        data: {
            type:"login",
            username: username.value,
            pwd: pwd.value,
            
        },
        dataType: 'json',
        success: function (data){
            var json = JSON.parse(data);
            alertTit.innerHTML = json.msg ;
            if(json.err>0){
                alertTit.innerHTML = json.msg + "</br>2s后为你跳转到首页";
                setTimeout(function(){
                    location.href = "./index.html";
                    localStorage.setItem("username",username.value);
                },2000)
            }
            alertTit.style.display = "block"
        },
        error: function (status){
            alert(status);
        }
    })
}
