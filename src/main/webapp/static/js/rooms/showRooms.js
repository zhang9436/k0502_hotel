layui.use(['jquery','layer','form','upload'], function() {
    var $ = layui.jquery    //引入jquery模块
        , layer = layui.layer  //引用layer弹出层模块
        , form = layui.form  //引用form表单模块
        , upload = layui.upload  //引入upload上传模块

    //七牛云的存储空间的域名
    var qnyName = "http://qgd7ot3t5.hn-bkt.clouddn.com/";

    //房屋显示的ul容器数组
    var arrUl = $("#LAY_preview").find("ul");

    //验证客房编号唯一性的变量
    var checkRoomNumIf = false;

    //加载客房数据
    loadAllRooms();

    //加载所有的客房类型数据
    loadAllRoomType();

    //空闲客房进行删除操作
    $("ul").eq(0).on('click','li button',function () {
        //获取到点击的当前客房数据id
        var roomid = $(this).attr("roomid");
        layer.confirm('真的删除此客房数据吗？', function (index) {
            //修改客房状态(显示)1--->(隐藏)0
            updRoomsFlag(roomid, '0');
            //关闭弹框
            layer.closeAll();
        });
    });

    //打扫的客房绑定事件
    $("ul").eq(2).on('click','li button',function () {
        //取出点击的按钮中的value值
        var event = $(this).val();
        //取出当前按钮中的客房id数据值
        var roomid = $(this).attr("roomid");
        //根据取出的value值判断具体执行的操作
        if(event=='del'){
            layer.confirm('真的删除此客房数据吗？', function (index) {
                //修改客房状态(显示)1--->(隐藏)0
                updRoomsFlag(roomid,'0');
                //关闭弹框
                layer.closeAll();
            });
        }else {
            layer.confirm('真将此客房状态改为空闲吗？', function (index) {
                //修改客房出租状态(打扫)2--->(空闲)0
                updRoomsStatus(roomid,'0');
                //关闭弹框
                layer.closeAll();
            });
        }
    });

    //点击添加按钮弹框，再完成客房数据添加
    $("#saveRoomsUI").click(function () {
        //1.清空添加的表单，清空客房编号
        $("#roomNum").val("");
        //2.弹框显示
        layer.open({
            type:1,  //弹出类型
            title:"客房信息添加界面",  //弹框标题
            area:['450px','480px'],  //弹框款高度
            anim: 4,  //弹出的动画效果
            shade:0.5,  //阴影遮罩
            content:$("#saveRoomsDiv")  //弹出的内容
        });
        //3.监听表单进行添加提交
        form.on('submit(demo3)', function(data){
            var saveJsonRooms = data.field;
            saveJsonRooms['roomStatus'] = '0';
            saveJsonRooms['flag'] = '1';
            saveRooms(saveJsonRooms);  //向服务器端发送添加异步请求
            layer.closeAll();  //关闭所有弹框
            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        });

    });

    //3.表单的自定义验证，验证客房编号
    form.verify({
        roomNum: function(value, item){
            //验证客房编号从1101-9999
            if(value<1101||value>9999){
                return "客房编号为1101-9999之间";
            }
        },
        checkRoomNum: function (value,item) {
            //向服务器端发送验证请求
            checkRoomNum(value);
            if(!checkRoomNumIf){
                return "客房编号重复"
            }
        }
    });

    //普通图片上传，异步上传，关键：进行源文件的传递到服务器端
    var uploadInst = upload.render({
        elem: '#test1'  //绑定上传的按钮
        ,url: 'rooms/upload' //改成您自己的上传接口
        ,field: 'myFile'  //源文件指定的名字
       /* ,auto: false  //不自动上传
        ,bindAction: '#test9'  //绑定手动上传按钮*/
        ,accept: 'file'  //上传的文件类型
        ,size: 1024  //允许文件上传大小  KB
        ,data: {"path":"C:\\Users\\lenovo\\Pictures\\web\\img"}  //上传的文件目标地址
        ,before: function(obj){
            obj.preview(function(index, file, result){  //result表示上传图片的访问地址
                $('#demo1').attr('src', result); //图片链接（base64），进行图片上传之前的回显
            });

        }
        ,done: function(res){  //上传时的函数回调
            //如果上传失败
            if(res.code > 0){
                layer.msg("上传成功",{icon: 1,time:2000,anim: 3,shade:0.5});
                $("#roomPicId").val(res.newFileName);
            }else {
                layer.msg("上传失败！！",{icon: 2,time:2000,anim: 4,shade:0.5});
            }
            //上传成功
        }
        ,error: function(){
            //演示失败状态，并实现重传
            var demoText = $('#demoText');
            //在p标签中更改其内容
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
            //给重新按钮绑定点击事件进行重新上传
            demoText.find('.demo-reload').on('click', function(){
                uploadInst.upload();  //重新进行上传
            });
        }
    });
    
    
    /******************自定义的数据加载的函数************************/
    
    //加载所有客房数据
    function loadAllRooms() {
        $.ajax({
            type: 'POST',
            url: 'rooms/loadAllT',  //调用的是base系列的方法，只需要改mapper.xml文件
            success: function (data) {
                var roomStatus0 = "";  //空闲客房状态数据标签字符串
                var roomStatus1 = "";  //已入住客房状态数据标签字符串
                var roomStatus2 = "";  //打扫客房状态数据标签字符串
                $.each(data,function (i,item) {
                    if(item.roomStatus=='0'){  //空闲状态
                        roomStatus0 += '<li style="background-color: #009688;">';
                        roomStatus0 += '<img class="layui-anim" id="demo1'+item.id+'" src="'+qnyName+item.roomPic+'" width="135px" height="135px"/>';
                        roomStatus0 += '<div class="code">';
                        roomStatus0 += '<span style="display: block;color: #0C0C0C;">'+item.roomNum+'-'+item.roomType.roomTypeName+'-'+item.roomType.roomPrice+'元/天</span>';
                        roomStatus0 += '<button type="button" value="del" roomid="'+item.id+'" class="layui-btn layui-btn-danger layui-btn-xs">删除</button>';
                        roomStatus0 += '</div>';
                        roomStatus0 += '</li>';
                    }else if(item.roomStatus=='1'){  //已入住
                        roomStatus1 += '<li style="background-color: red;">';
                        roomStatus1 += '<img class="layui-anim" id="demo1'+item.id+'" src="'+qnyName+item.roomPic+'" width="135px" height="135px"/>';
                        roomStatus1 += '<div class="code">';
                        roomStatus1 += '<span style="display: block;color: #0C0C0C;">'+item.roomNum+'-'+item.roomType.roomTypeName+'-'+item.roomType.roomPrice+'元/天</span>';
                        roomStatus1 += '</div>';
                        roomStatus1 += '</li>';
                    }else {  //打扫
                        roomStatus2 += '<li style="background-color: blueviolet;">';
                        roomStatus2 += '<img class="layui-anim" id="demo1'+item.id+'" src="'+qnyName+item.roomPic+'" width="135px" height="135px"/>';
                        roomStatus2 += '<div class="code">';
                        roomStatus2 += '<span style="display: block;color: #0C0C0C;">'+item.roomNum+'-'+item.roomType.roomTypeName+'-'+item.roomType.roomPrice+'元/天</span>';
                        roomStatus2 += '<button type="button" value="del" roomid="'+item.id+'" class="layui-btn layui-btn-danger layui-btn-xs">删除</button>';
                        roomStatus2 += '<button type="button" value="upd" roomid="'+item.id+'" class="layui-btn layui-btn-xs layui-btn-normal">空闲</button>';
                        roomStatus2 += '</div>';
                        roomStatus2 += '</li>';
                    }
                });
                //分别将三种状态的客房标签数据填充到对应的ul列表中
                $(arrUl[0]).html(roomStatus0);
                $(arrUl[1]).html(roomStatus1);
                $(arrUl[2]).html(roomStatus2);
                hoverOpenImg();  //执行图片放大效果
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon: 6,time:2000,anim: 6,shade:0.5});
            }
        });
    }

    //加载所有客房类型数据
    function loadAllRoomType(){
        $.ajax({
            type: 'POST',
            url: 'roomType/loadAllT',  //调用的是base系列的方法，只需要改mapper.xml文件
            success: function (data) {
                var roomTypeStr = '<option value="" selected>--请选则客房类型--</option>';
                $.each(data,function (i,roomType) {
                    roomTypeStr += '<option value="'+roomType.id+'">'+roomType.roomTypeName+'-'+roomType.roomPrice+'</option>';
                });
                $("#selRoomType").html(roomTypeStr);
                form.render("select");  //渲染下拉框
            },
            error: function () {
                layer.msg("服务器异常！！！", {icon: 6, time: 2000, anim: 6, shade: 0.5});
            }
        });
    }

    //执行客房显示状态的修改
    function updRoomsFlag(roomid,flag){
        $.ajax({
            type: 'POST',
            url: 'rooms/updByPrimaryKeySelective',  //调用的是base系列的方法，只需要改mapper.xml文件
            data:{'id':roomid,"flag":flag},
            success: function (data) {
                if(data=="updSuccess"){
                    layer.msg("客房删除成功", {icon: 1, time: 2000, anim: 4, shade: 0.5});
                    //加载客房数据
                    loadAllRooms();
                }else {
                    layer.msg("客房删除失败！！", {icon: 2, time: 2000, anim: 3, shade: 0.5});
                }
            },
            error: function () {
                layer.msg("服务器异常！！！", {icon: 6, time: 2000, anim: 6, shade: 0.5});
            }
        });
    }

    //根据客房id修改其出租状态
    function updRoomsStatus(roomid,roomStatus) {
        $.ajax({
            type: 'POST',
            url: 'rooms/updByPrimaryKeySelective',  //调用的是base系列的方法，只需要改mapper.xml文件
            data:{'id':roomid,"roomStatus":roomStatus},
            success: function (data) {
                if(data=="updSuccess"){
                    layer.msg("客房状态修改成功", {icon: 1, time: 2000, anim: 4, shade: 0.5});
                    //加载客房数据
                    loadAllRooms();
                }else {
                    layer.msg("客房状态修改失败！！", {icon: 2, time: 2000, anim: 3, shade: 0.5});
                }
            },
            error: function () {
                layer.msg("服务器异常！！！", {icon: 6, time: 2000, anim: 6, shade: 0.5});
            }
        });
    }

    //根据客房编号验证其是否重复
    function checkRoomNum(roomNum) {
        $.ajax({
            type:'POST',
            url:'rooms/loadCountByPramas',  //调用的是base系列的方法，只需要改mapper.xml文件
            data:{"roomNum":roomNum},
            async:false,  //表示可以在ajax外部取得ajax中的数据
            success:function (data) {
                if(data==1){
                    layer.tips('客房编号重复','#roomNum', {tips: [2,'red'],time:2000,tipsMore: true});
                    checkRoomNumIf = false;  //有重复的，验证不通过
                }else {
                    layer.tips('客房编号可用','#roomNum', {tips: [2,'green'],time:2000,tipsMore: true});
                    checkRoomNumIf = true;  //没有重复的，验证通过

                }
            },
            error:function () {
                layer.msg("服务器异常！！！",{icon: 6,time:2000,anim: 6,shade:0.5});
            }
        });
    }

    //添加客房数据
    function saveRooms(saveJsonRooms) {
        $.ajax({
            type:'POST',
            url:'rooms/saveT',
            data:saveJsonRooms,
            success:function (data) {
                if(data=='saveSuccess'){
                    layer.msg("客房数据添加成功",{icon: 1,time:2000,anim: 3,shade:0.5});
                    loadAllRooms();  //加载所有的客房数据
                }else {
                    layer.msg("客房数据添加失败！！",{icon: 2,time:2000,anim: 4,shade:0.5});
                }
            },
            error:function () {
                layer.msg("服务器异常！！！",{icon: 6,time:2000,anim: 6,shade:0.5});
            }
        });
    }

    /**********************动画效果的js****************************/

    //图片放大镜
    function hoverOpenImg(){
        var img_show = null; // tips提示
        $('img').hover(function(){
            var img = "<img class='img_msg' src='"+$(this).attr('src')+"' style='width:580px;' />";
            img_show = layer.tips(img, this,{
                tips:[2, 'rgba(41,41,41,.5)']
                ,area: ['600px']
                ,time: -1  //永久显示
                ,anim: 3
            });
        },function(){
            layer.close(img_show);
        });
        $('img').attr('style','max-width:270px');
    }
});