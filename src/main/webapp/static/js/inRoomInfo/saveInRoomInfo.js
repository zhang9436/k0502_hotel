layui.use(['jquery','layer', 'table','form','laydate'], function() {
    var $ = layui.jquery    //引入jquery模块
        , layer = layui.layer  //引用layer弹出层模块
        , table = layui.table  //引用table数据表格模块
        , form = layui.form  //引用form表单模块
        , laydate = layui.laydate;  //引用日期模块

    var vipIf = false;  //验证会员卡号的数据是否存在的全局变量

    //初始化空闲的客房数据
    loadRoomsByRoomStatus(0);

    //执行一个laydate实例
    laydate.render({
        elem: '#createDate' //指定元素
        ,type: 'datetime'
        ,format: 'yyyy/MM/dd HH:mm:ss'
        ,value: new Date()
        ,calendar: true
    });

    //表单中的单选框的监听
    form.on('radio(isVip)', function(data){
        $("form").eq(0).find('input:text').val("");  //清空表单之前的数据
        if(data.value=='1'){  //会员
            vipIf = true;
            isVipTrue(); //会员页面操作
        }else {  //非会员
            vipIf = false;
            isVipFalse(); //非会员页面操作
        }
    });

    //给会员输入框绑定失去焦点事件
    $("#vip_num").blur(function () {
        //失去焦点时会有卡号验证
        var vipNum = $(this).val();
        if(/(^[1-9]\d*$)/.test(vipNum)){  //验证是否均为数字
            if(vipNum.length==16){  //验证会员卡好长度
                //向服务器端发送异步请求根据会员卡号查询会员数据
                loadVipByVipNum(vipNum);
            }else {
                //吸附框  会员卡号长度必须位16位：提示内容  ，#vip_num吸附的标签
                //{tips: [2,'green'],time:2000}  弹出位置（上右下左1-4）   背景颜色  显示时间
                layer.tips('会员卡号长度必须位16位','#vip_num', {tips: [2,'red'],time:2000});
            }
        }else {
            layer.tips('会员卡号格式不正确','#vip_num', {tips: [2,'red'],time:2000});
        }
    })

    //表单的自定义验证
    form.verify({
        money: function(value, item){ //value：表单的值、item：表单的DOM对象
            if(value<200||value>2000){
                return "押金范围在200-2000之间";
            }
        }
    });

    //监听入住信息表单提交完成数据添加
    form.on('submit(demo1)', function(data){
        var saveJsonInRoomInfo = data.field;
        saveJsonInRoomInfo['outRoomStatus'] = '0';
        saveJsonInRoomInfo['status'] = '1';
        //执行添加，1.入住信息添加  2.客房状态由0（空闲）---->1（已入住）
        saveInRoomInfo(saveJsonInRoomInfo);
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });


    /**************************自定义函数（异步函数）****************************/

    function loadVipByVipNum(vipNum){
        $.ajax({
            type:'POST',
            url:'vip/loadOneByPramas',  //调用的是base系列的方法，只需要改mapper.xml文件
            data:{"vipNum":vipNum},
            async:false,  //表示可以在ajax外部取得ajax中的数据
            success:function (data) {
                if(data!=""){
                    layer.tips('会员卡号正确','#vip_num', {tips: [2,'green'],time:2000});
                    //将查询出的会员数据回填到表单中
                    form.val("example", { //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
                        "customerName": data.customerName // "name": "value"
                        ,"gender": data.gender
                        ,"idcard": data.idcard
                        ,"phone": data.phone
                    });
                }else {
                    layer.tips('无此会员卡号，重新输入','#vip_num', {tips: [2,'red'],time:2000});
                }
            },
            error:function () {
                layer.msg("服务器异常！！！",{icon: 6,time:2000,anim: 6,shade:0.5});
            }
        });
    }

    //根据客房状态加载多个客房数据
    function loadRoomsByRoomStatus(roomStatus) {
        $.ajax({
            type:'POST',
            url:'rooms/loadManyByPramas',  //调用的是base系列的方法，只需要改mapper.xml文件
            data:{"roomStatus":roomStatus},
            async:false,  //表示可以在ajax外部取得ajax中的数据
            success:function (data) {
                var roomStr = '<option value="">--请选择房间--</option>';
                $.each(data,function (i,room) {
                    roomStr += '<option value="'+room.id+'">'+room.roomNum+'-'+room.roomType.roomTypeName+'-'+room.roomType.roomPrice+'</option>';
                })
                $("#selRoomNumId").html(roomStr);
                form.render("select");  //渲染
            },
            error:function () {
                layer.msg("服务器异常！！！",{icon: 6,time:2000,anim: 6,shade:0.5});
            }
        });
    }

    //添加入住信息数据
    function saveInRoomInfo(saveJsonInRoomInfo) {
        $.ajax({
            type:'POST',
            url:'inRoomInfo/saveT',  //调用的是base系列的方法，只需要改mapper.xml文件
            data:saveJsonInRoomInfo,
            success:function (data) {
                if(data=="success"){
                    layer.msg("入住信息添加成功",{icon: 1,time:2000,anim: 3,shade:0.5});
                    //1.将整个添加的表单数据清空  2.直接跳转到查询页面中去
                    //定时器，2s后跳转到入住信息显示页面
                    setTimeout('window.location="model/toShowInRoomInfo"',2000);
                }else {
                    layer.msg("入住信息添加失败",{icon: 2,time:2000,anim: 4,shade:0.5});
                }
            },
            error:function () {
                layer.msg("服务器异常！！！",{icon: 6,time:2000,anim: 6,shade:0.5});
            }
        });
    }


    /**************************自定义函数（工具函数）****************************/

    //是会员的表单操作
    function isVipTrue() {
        $("#vip_num").removeAttr("disabled")  //将会员卡号输入框可用
        $("#vip_num").attr("lay-verify","required|number"); //添加验证的属性值
        //将客人姓名，手机号，身份证号，性别均不可用
        $("#customerName").attr("disabled","disabled");
        $("input[name=gender]").attr("disabled","disabled");
        $("#idcard").attr("disabled","disabled");
        $("#phone").attr("disabled","disabled");
    }

    //非会员的表单操作
    function isVipFalse() {
        $("#vip_num").attr("disabled","disabled"); //将会员卡号输入框不可用
        $("#vip_num").removeAttr("lay-verify")  //移除验证的属性值
        //将客人姓名，手机号，身份证号，性别均可用
        $("#customerName").removeAttr("disabled");
        $("input[name=gender]").removeAttr("disabled");
        $("#idcard").removeAttr("disabled");
        $("#phone").removeAttr("disabled");
    }

});