var username =document.querySelector(".username");
var pwd =document.querySelector(".pwd");
var btn_reg =document.querySelector(".btn");
var alertTit = document.querySelector(".alert-tit")
btn_reg.onclick = function(){
    if(!username.value || !pwd.value) {
        alertTit.innerHTML = "用户名密码不能为空";
        alertTit.style.display = "block"
        return false;
    }
    ajax({
        url: '../php/register.php',
        type: 'post',
        // data: 'abc=12345&www=baidu',
        data: {
            type:"add",
            username: username.value,
            pwd: pwd.value,
            
        },
        dataType: 'json',
        success: function (data){
            var json = JSON.parse(data);
            alertTit.innerHTML = json.msg ;
            if(json.err>0){
                alertTit.innerHTML = json.msg + "</br>2s,后为你跳转到登录页面";
                setTimeout(function(){
                    location.href = "./login.html"
                },2000)
            }           
            alertTit.style.display = "block"
        },
        error: function (status){
            alert(status);
        }
    })
}