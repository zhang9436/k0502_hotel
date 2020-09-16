layui.use(['jquery','layer','form'], function() {
    var $ = layui.jquery    //引入jquery模块
        , layer = layui.layer  //引用layer弹出层模块
        , form = layui.form  //引用form表单模块

    //判断是否被拦截转发到的登陆页面
    if($("#loginUIMsg").val()=="loginUIMsg"){  //是被拦截的
        layer.msg("对不起，请先登陆！！",{icon: 7,time:2000,anim: 6,shade:0.5});
    }

    var verifyCheckif = false;

    //给系统用户输入验证码的输入框绑定失去焦点事件，进行验证码验证
    $("#yzm").blur(function () {
        //1.获取用户输入的验证码
        var userVerifyCode = $(this).val();
        if(userVerifyCode.length==5){
            //进行服务器端的验证码验证
            verifyCheck(userVerifyCode);
        }else {
            layer.tips('验证码格式错误！','#yzm', {tips: [2,'red'],time:2000,tipsMore: true});
        }
    });

    //3.表单的自定义验证，验证手机号的唯一性
    form.verify({  //点击提交按钮触发此自定义验证
        verifyCheck: function(value, item){ //value：表单的值、item：表单的DOM对象
            if(!verifyCheckif){  //判断用户有进行手机号的修改，修改进行判断，不修改就不判断
                return "验证码不正确";
            }
        }
    });

    //监听登录表单完成登录
    form.on('submit(login)', function(data){
        login(data.field);  //向服务器端发送修改异步请求
        layer.closeAll(); //验证没有问题，则关闭弹框
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

    /*************************自定义数据交互函数*****************************/

    //进行验证码的验证
    function verifyCheck(userVerifyCode) {
        $.ajax({
            type:'POST',
            url:'user/verifyCheck',  //调用的是base系列的方法，只需要改mapper.xml文件
            data:{"userVerifyCode":userVerifyCode},
            async:false,  //表示可以在ajax外部取得ajax中的数据
            success:function (data) {
                if(data=='success'){
                    verifyCheckif = true;
                    layer.tips('验证通过','#yzm', {tips: [2,'green'],time:2000});
                }else {
                    verifyCheckif = false;
                    layer.tips('验证不通过','#yzm', {tips: [2,'red'],time:2000});
                }
            },
            error:function () {
                layer.msg("服务器异常！！！",{icon: 6,time:2000,anim: 6,shade:0.5});
            }
        });
    }

    //进行用户名密码的登录
    function login(jsonUser) {
        $.ajax({
            type:'POST',
            url:'user/login',
            data:jsonUser,
            success:function (data) {
                if(data=='success'){
                    layer.msg("恭喜你，登录成功",{icon: 1,time:2000,anim: 3,shade:0.5});
                    //跳转到首页中去
                    setTimeout('window.location="model/toIndex"',2000);
                }else {
                    layer.msg("很遗憾，登录失败！",{icon: 2,time:2000,anim: 4,shade:0.5});
                }
            },
            error:function () {
                layer.msg("服务器异常！！！",{icon: 6,time:2000,anim: 6,shade:0.5});
            }
        });
    }


});