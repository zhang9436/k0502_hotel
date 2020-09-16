layui.use(['jquery','layer','form','element','laypage'], function() {
    var $ = layui.jquery    //引入jquery模块
        , layer = layui.layer  //引用layer弹出层模块
        , form = layui.form  //引用form表单模块
        ,element = layui.element  //引用面板模块
        ,laypage = layui.laypage  //引用分页模块

    //七牛云的存储空间的域名
    var qnyName = "http://qgd7ot3t5.hn-bkt.clouddn.com/";

    var page = 1;  //当前页初始值为1

    var limit = 3;  //每一页数据条数

    var count = 0;  //总的数据条数

    var checkRoomsOfRoomTypeIf = false;  //验证房房型是否可删的判断

    var checkRoomTypeNameIf = false;   //验证房型名称唯一性判断

    //初始化客房类型首页数据，只执行1次
    loadPageRoomType();

    //初始化分页加载
    loadPage();

    //进行分页加载
    function loadPage(){
        //分页的完整功能
        laypage.render({
            elem: 'test1'  //绑定的分页标签容器
            ,count: count //总的数据条数
            ,curr:page  //分页内置模块中的当前页，默认值为1
            ,limit:limit //每一页显示3条数据，默认为10条
            ,limits:[2,3,5,8,10]  //进行每一页数据条数选择
            //展示分页标签的内容
            ,layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip']
            ,jump: function(obj,first){  //进行分页操作时的函数回调
                page = obj.curr;  //当前页赋值给全局的当前页变量
                limit = obj.limit;  //将分页标签中的每一页数据条数赋值给每一页数据条数变量
                //首次不执行，因为在初始化的时候就已经执行分页加载
                if(!first){
                    loadPageRoomType();  //分页数据加载
                }
            }
        });
    }

    //给页面中的删除修改按钮绑定点击事件
    $("#collapseDiv").on('click','button',function () {
        //获取按钮的操作类型
        var event = $(this).attr("event");
        if(event=='del'){
            //1.获取房型id
            var id = $(this).val();
            //2.进行房型的删除之前的验证
            checkRoomsOfRoomType(id);   //验证该房型下有没有客房数据，有则不能删除，否则可以删除
            if(checkRoomsOfRoomTypeIf){
                layer.confirm('真的删除此房型数据吗？', function (index) {
                    delRoomTypeById(id);  //执行房型数据删除
                    layer.close(index);  //关闭当前的询问框
                });
            }else {
                layer.msg("存在客房数据不能删除！！", {icon: 3, time: 2000, anim: 6, shade: 0.5});
            }
        }else {
            //1.数据回显
            //取出按钮中的房型数据转为数组
            var arrRoomType = $(this).val().split(",");
            form.val("updRoomTypeFromFilter", { //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
                "id": arrRoomType[0]
                ,"roomTypeName": arrRoomType[1]
                ,"roomPrice": arrRoomType[2]
            });
            //2.弹出修改界面
            layer.open({
                type:1,  //弹出类型
                title:"修改房型信息操作界面",  //弹框标题
                area:['450px','280px'],  //弹框款高度
                anim: 1,  //弹出的动画效果
                shade:0.5,  //阴影遮罩
                content:$("#updRoomTypeDiv")  //弹出的内容
            });
            //3.监听提交按钮完成修改
            form.on('submit(demo4)', function(data){
                updRoomType(data.field);  //向服务器端发送修改异步请求
                layer.closeAll(); //验证没有问题，则关闭弹框
                return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
            });
        }
    })

    //给添加按钮绑定点击事件
    $("#saveRoomTypeBtn").click(function () {
        //1,情空表单中原有的数据
        $("#saveRoomTypeDiv form").find("input").val("");
        //2.弹出添加界面
        layer.open({
            type:1,  //弹出类型
            title:"添加房型信息操作界面",  //弹框标题
            area:['450px','280px'],  //弹框款高度
            anim: 5,  //弹出的动画效果
            shade:0.5,  //阴影遮罩
            content:$("#saveRoomTypeDiv")  //弹出的内容
        });
        //3.监听提交按钮完成添加
        form.on('submit(demo3)', function(data){
            saveRoomType(data.field);  //向服务器端发送修改异步请求
            layer.closeAll(); //验证没有问题，则关闭弹框
            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        });
    });

    //表单的自定义验证，
    form.verify({  //点击提交按钮触发此自定义验证
        roomPrice: function (value, item) { //value：表单的值、item：表单的DOM对象
            //执行验证的结果
            if (value<120||value>8888) {
                return "客房价格不正确";
            }
        },
        roomTypeName:function (value,item) {
            //向服务器端发送异步请求，根据房型名称查询房型数据条数
            checkRoomType(value);
            if(!checkRoomTypeNameIf){
                return "房型名称有重复"
            }
        }
    });

    //监听折叠
    element.on('collapse(test)', function(data){
        if(data.show){
            //获取房型id数据
            var roomTypeId = $(this).attr("roomTypeId");
            //根据房型id向服务器端发送请求查询房型下的客房数据
            loadRoomByRoomTypeId(roomTypeId);
        }
    });




    /*************************加载数据自定义函数*******************************/

    //分页加载客房类型数据
    function loadPageRoomType() {
        $.ajax({
            type: 'POST',
            url: 'roomType/loadPageByPramas',  //调用的是base系列的方法，只需要改mapper.xml文件
            data:{"page":page,"limit":limit},
            async:false,
            success: function (data) {  //data为服务器端的map集合数据
                count = data.count;  //将数据总的条数赋值给全局变量
                var roomTypeStr = '';
                $.each(data.data,function (i,roomType) {
                    roomTypeStr += '<div class="layui-colla-item" id="item'+roomType.id+'" style="margin-top: 10px;">';
                    roomTypeStr += '<button type="button" class="layui-btn layui-btn-sm layui-btn-danger" event="del" value="'+roomType.id+'" style="float: right;">删除</button>';
                    roomTypeStr += '<button type="button" class="layui-btn layui-btn-sm layui-btn-warm" event="upd" value="'+roomType.id+','+roomType.roomTypeName+','+roomType.roomPrice+'" style="float: right;">修改</button>';
                    roomTypeStr += '<h2 class="layui-colla-title" roomTypeId="'+roomType.id+'">'+roomType.roomTypeName+'--'+roomType.roomPrice+'元/天'+'</h2>';
                    roomTypeStr += '<div class="layui-colla-content">';
                    roomTypeStr += '<p id="p'+roomType.id+'"></p>';
                    roomTypeStr += '</div>';
                    roomTypeStr += '</div>';
                })
                $("#collapseDiv").html(roomTypeStr);
                //将面板渲染
                element.render('collapse');
            },
            error: function () {
                layer.msg("服务器异常！！！", {icon: 6, time: 2000, anim: 6, shade: 0.5});
            }
        });
    }

    //根据房型id查询有没有客房数据
    function checkRoomsOfRoomType(id) {
        $.ajax({
            type: 'POST',
            url: 'rooms/loadCountByPramas',  //调用的是base系列的方法，只需要改mapper.xml文件
            data:{"roomTypeId":id},
            async:false,
            success: function (data) {  //data为服务器端的map集合数据
                if(data>0){
                    checkRoomsOfRoomTypeIf = false;  //存在客房数据不能删
                }else {
                    checkRoomsOfRoomTypeIf = true;  //不存在可以删除
                }
            },
            error: function () {
                layer.msg("服务器异常！！！", {icon: 6, time: 2000, anim: 6, shade: 0.5});
            }
        });
    }

    //根据id删除单个房型数据
    function delRoomTypeById(id) {
        $.ajax({
            type: 'POST',
            url: 'roomType/delTById',  //调用的是base系列的方法，只需要改mapper.xml文件
            data:{"id":id},
            success: function (data) {  //data为服务器端的map集合数据
                if(data=='delSuccess'){
                    layer.msg("房型数据删除成功", {icon: 1, time: 2000, anim:4, shade: 0.5});
                    loadPageRoomType();  //先执行分页数据加载
                    loadPage();  //更新一下总的数据条数
                   /* $("#item"+id).remove();//将此房型的div移除掉
                    count--; //总的条数减1
                    loadPage(); //更新一下页面分页标签中总的数据条数*/
                }else {
                    layer.msg("房型数据删除成功失败！！", {icon: 2, time: 2000, anim: 3, shade: 0.5});
                }
            },
            error: function () {
                layer.msg("服务器异常！！！", {icon: 6, time: 2000, anim: 6, shade: 0.5});
            }
        });
    }

    //修改房型数据
    function updRoomType(updJsonRoomType) {
        $.ajax({
            type: 'POST',
            url: 'roomType/updByPrimaryKeySelective',  //调用的是base系列的方法，只需要改mapper.xml文件
            data:updJsonRoomType,
            success: function (data) {  //data为服务器端的map集合数据
                if(data=='updSuccess'){
                    loadPageRoomType();  //重新加载当前页
                    layer.msg("房型数据修改成功", {icon: 1, time: 2000, anim:4, shade: 0.5});
                }else {
                    layer.msg("房型数据修改失败！！", {icon: 2, time: 2000, anim: 3, shade: 0.5});
                }
            },
            error: function () {
                layer.msg("服务器异常！！！", {icon: 6, time: 2000, anim: 6, shade: 0.5});
            }
        });
    }

    //根据房型名称查询房型数据条数
    function checkRoomType(roomTypeName) {
        $.ajax({
            type:'POST',
            url:'roomType/loadCountByPramas',  //调用的是base系列的方法，只需要改mapper.xml文件
            data:{"roomTypeName":roomTypeName},
            async:false,  //表示可以在ajax外部取得ajax中的数据
            success:function (data) {
                if(data==1){
                    layer.tips('有重复的房型名称，验证不通过','#roomTypeName', {tips: [2,'red'],time:2000});
                    checkRoomTypeNameIf = false;  //有重复的手机号，验证不通过
                }else {
                    layer.tips('没有重复的房型名称，验证通过','#roomTypeName', {tips: [2,'green'],time:2000});
                    checkRoomTypeNameIf = true;  //没有重复的手机号，验证通过
                }
            },
            error:function () {
                layer.msg("服务器异常！！！",{icon: 6,time:2000,anim: 6,shade:0.5});
            }
        });
    }

    //添加房型数据
    function saveRoomType(saveJsonRoomType) {
        $.ajax({
            type: 'POST',
            url: 'roomType/saveT',  //调用的是base系列的方法，只需要改mapper.xml文件
            data:saveJsonRoomType,
            success: function (data) {  //data为服务器端的map集合数据
                if(data=='saveSuccess'){
                    page = 1;  //使页面当前页为1
                    loadPageRoomType();  //重新加载当前页
                    loadPage(); //更新总的数据条数
                    layer.msg("房型数据添加成功", {icon: 1, time: 2000, anim:4, shade: 0.5});
                }else {
                    layer.msg("房型数据添加失败！！", {icon: 2, time: 2000, anim: 3, shade: 0.5});
                }
            },
            error: function () {
                layer.msg("服务器异常！！！", {icon: 6, time: 2000, anim: 6, shade: 0.5});
            }
        });
    }

    //根据房型id向服务器端发送请求查询房型下的客房数据
    function loadRoomByRoomTypeId(roomTypeId) {
        $.ajax({
            type: 'POST',
            url: 'rooms/loadManyByPramas',  //调用的是base系列的方法，只需要改mapper.xml文件
            data:{'roomTypeId':roomTypeId},
            success: function (data) {  //data为服务器端的map集合数据
                if(data!=''){  //此房型有客房数据
                    var roomStatus = '<ul class="site-doc-icon site-doc-anim">';
                    $.each(data,function (i,item) {
                        if(item.roomStatus=='0'){
                            roomStatus += '<li style="background-color: #009688;">';
                        }else if(item.roomStatus=='1'){
                            roomStatus += '<li style="background-color: red;">';
                        }else {
                            roomStatus += '<li style="background-color: blueviolet;">';
                        }
                        roomStatus += '<img class="layui-anim" id="demo1" src="'+qnyName+item.roomPic+'" width="135px" height="135px"/>';
                        roomStatus += '<div class="code">';
                        roomStatus += '<span style="display: block;color: #0C0C0C;">'+item.roomNum+'-'+item.roomType.roomTypeName+'-'+item.roomType.roomPrice+'元/天</span>';
                        roomStatus += '</div>';
                        roomStatus += '</li>';
                    });
                    roomStatus += '</ul>'
                    $("#p"+roomTypeId).html(roomStatus)
                }else {  //此房型没有客房数据
                    layer.msg("此房型没有客房数据！",{icon: 7,time: 2000,anim:6,shade:0.5})
                }
            },
            error: function () {
                layer.msg("服务器异常！！！", {icon: 6, time: 2000, anim: 6, shade: 0.5});
            }
        });
    }

});