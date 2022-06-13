var tip=document.getElementById("tip");
var havecod=document.getElementById("havecod");
    // function havecode(){
    //         var mail =$("#mail").val();
    //         if(mail !=""){
    //             $.ajax({
    //                 url:"http://118.195.129.130:3000/user/getMailCode",
    //                 type:"POST",
    //                 data:{
    //                     mail:mail,
    //                 },
    //                 success:function (res) {
    //                     if(res.err=="0"){
    //                     console.log("发送成功");
    //                     var t = 20;
    //                     havecod.disabled = true;
    //                    var time = setInterval(function(){
    //                     if(t==0){//如果倒计时等于0了，清除计时器，恢复按钮，将t重置为10，否则按钮中文字改变，t递减。
    //                     clearInterval(time);
    //                      havecod.disabled=false;
    //                      havecod.innerHTML='获取验证码';
    //                      t=10;
    //                 }else{
    //                     havecod.innerHTML='您可以在'+t+'秒后再次获取';
    //                     t--;
    //                  }
    //                  }, 1000);
    //             }
    //             else{
    //                 tip.innerHTML=res.msg;
    //             }
    //                 },
    //
    //             })
    //
    //
    //         }
    //
    //
    // }
    
      function logon() {
            var us =$("#us").val().trim(); 
            var ps =$("#ps").val().trim();
            if(us==""){
                tip.style.display="block";
                tip.innerText="用户名不能为空";
                tip.style.color="red";
                return;
                
            }
            if(ps==""){
                tip.style.display="block";
                tip.innerText="密码不能为空";
                tip.style.color="red";
                return;
                 
        }

            if(us !=""&& ps !=""){
                $.ajax({
                    url:"http://localhost:8080/register",
                    type: "PUT",
                    data:{
                        name:us,
                        password:ps,

                    },
                    success:function (res) {
                        if(res.status==200){
                        console.log("注册成功");
                        tip.innerText="注册成功";
                        }
                        if(res.status==500){
                            console.log("注册失败");
                            tip.innerText=res.msg;
                        }

                    },
                     error:function(err){
                         console.log(err);
                    }
                }) 
          
            }
    }
      
 var load= false;
 var tip2=document.getElementById("tip2");
$(function(){
        $("#checkPhone").click(function(){
            var psw =$("#psw").val().trim(); 
            var adName =$("#adName").val(); 
            if(adName==""){
                tip2.style.display="block";
                tip2.innerText="用户名不能为空";
                tip2.style.color="red";
                return;
                
            }
            if(psw==""){
                tip2.style.display="block";
                tip2.innerText="密码不能为空";
                tip2.style.color="red";
                return;
                 
        }
            if(adName !="" && psw !=""){
                $.ajax({
                    url:"http://localhost:8080/login",
                    type:"POST",
                    data:{
                        name:adName,
                        password:psw,
                       
                    },
                    success:function (res) {
                        if(res.status==500){
                            tip2.innerText="账号或密码错误";
                        }
                        if(res.status==200){
                            console.log("登陆成功");
                        tip2.innerText="登录成功";
                        tip2.style.color="green";
                         setInterval(() => {
                             window.location.href="../main.html";
                        }, 1000);
                        
                        }
                      
                    }
                }) 

          
            }
        })
    }
)


$("#go_login").on("click",function() {
    console.log("22222222222222222222");
    $(".Registration_interface")[0].style.display="none";
    $(".login_interface")[0].style.display="block";
})





  $("#go_registration").on("click",function() {
      console.log("111111111111111");
      $(".login_interface")[0].style.display="none";
      $(".Registration_interface")[0].style.display="block";

 
  })

  let input=document.querySelectorAll("input");
  console.log(input);
  for(var i=0;i<input.length;i++){
    
    $(input[i]).on('click',function(){
        for(var n=0;n<input.length;n++){
            console.log("mmmmmmmm");
           input[n].className="";
        }
        console.log(this);
        this.className="active";
    
      })
    }
  