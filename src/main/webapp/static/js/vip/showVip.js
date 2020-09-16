layui.use(['jquery','layer', 'table','form'], function() {
    var $ = layui.jquery    //引入jquery模块
        , layer = layui.layer  //引用layer弹出层模块
        , table = layui.table  //引用table数据表格模块
        , form = layui.form  //引用form表单模块

    var selJsonVip = {};  //定义会员查询的条件JSON对象

    var checkPhoneIf = false;  //验证手机号是否重复的变量

    //初始化会员数据
    loadVipByPramas(selJsonVip);

    function loadVipByPramas(selJsonVip){
        //表格的分页加载，数据表格方法级渲染
        table.render({  //数据表格的数据渲染(此UI框架底层是进行异步加载)
            elem: '#demo'  //绑定容器  根据标签（数据容器）的id属性来
            , height: 412   //容器高度
            , limit: 3   //每一页显示的数据条数，默认值为10
            , limits: [2, 3, 5, 8, 10, 15, 20]   //进行每一页数据条数的选择
            , url: 'vip/loadPageTByPramas' //访问服务器端的数据接口(异步请求)，返回的json格式的数据
            ,toolbar: '#xxx' //开启头部工具栏，并为其绑定左侧模板
            ,defaultToolbar: ['filter', 'exports', 'print']
            , where: selJsonVip  //查询的条件
            , even: true  //每一行有渐变效果
            , page: true //开启分页,此时会自动的将当前页page和每一页数据条数limit的数值传回服务器端
            , cols: [[ //表头
                //加入复选框列
                {type: 'checkbox'}
                , {field: 'id', title: 'ID', align: 'center', width: 80, sort: true}
                , {field: 'vipNum', title: '会员编号' , align: 'center', width: 220}
                , {field: 'customerName', title: '客人姓名', align: 'center', width: 180, sort: true, edit: 'text'}
                , {field: 'gender', title: '性别', align: 'center', width: 140,templet:'#vipGenderTpl'}
                //0.8为超级会员  0.9为普通会员
                , {field: 'vipRate', title: '会员类型', align: 'center', width: 180,templet:'#vipVipRateTpl'}
                , {field: 'createDate', title: '创建时间', align: 'center', width: 220, sort: true,style:'color: #c6612e;'}
                , {field: 'idcard', title: '身份证', align: 'center', width: 240}
                , {field: 'phone', title: '手机', align: 'center', width: 220, sort: true,style:'color: #2e61c6;'}
                , {title: '操作', align: 'center', toolbar: '#barDemo',fixed:'right', width: 180}
            ]]
        });
    }

    //订单的条件查询提交
    form.on('submit(demo1)', function(data){
        selJsonVip = data.field;  //进到查询来重新为空
        loadVipByPramas(selJsonVip);  //根据条件查询数据
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

    //表格的工具条的监听
    table.on('tool(test)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）

        if (layEvent === 'query') { //查看
            layer.msg("查看执行了。。");
        } else if (layEvent === 'upd') { //修改
            //1.表单赋值回显
            form.val("updVipForm", { //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
                "id": data.id
                ,"phone": data.phone
                ,"vipRate": data.vipRate
            });
            //2.弹框显示
            layer.open({
                type:1,  //弹出类型
                title:"修改会员信息操作界面",  //弹框标题
                area:['450px','280px'],  //弹框款高度
                anim: 4,  //弹出的动画效果
                shade:0.5,  //阴影遮罩
                content:$("#updVipDiv")  //弹出的内容
            });
            //3.表单的自定义验证，验证手机号的唯一性
            form.verify({  //点击提交按钮触发此自定义验证
                checkPhone: function(value, item){ //value：表单的值、item：表单的DOM对象
                    if(data.phone!=value){  //判断用户有进行手机号的修改，修改进行判断，不修改就不判断
                        //向服务器端发送异步请求，根据此手机号查询会员数据，判断此手机号是否重复
                        checkPhone(value);  //手机号的唯一性验证，发送ajax请求访问数据库
                        //执行验证的结果
                        if(!checkPhoneIf){
                            return "手机号重复";
                        }
                    }
                }
            });
            //4.监听会员数据修改提交
            form.on('submit(demo3)', function(data){
                updVip(obj,data.field);  //向服务器端发送修改异步请求
                layer.closeAll(); //验证没有问题，则关闭弹框
                return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
            });
        }
    });

    //监听单元格编辑
    table.on('edit(test)', function(obj){
        var updJsonVipName = {};
        updJsonVipName['id'] = obj.data.id;  //得到所在行所有键值，此时取的id
        updJsonVipName['customerName'] = obj.value;  //得到修改后的值
        updVipName(updJsonVipName);  //修改会员名字
    });

    /*****************自定义数据异步交互的函数*************************/

    //根据手机号查询会员数据条数
    function checkPhone(value) {
        $.ajax({
            type:'POST',
            url:'vip/loadCountByPramas',  //调用的是base系列的方法，只需要改mapper.xml文件
            data:{"phone":value},
            async:false,  //表示可以在ajax外部取得ajax中的数据
            success:function (data) {
                if(data==1){
                    layer.tips('有重复的手机号，验证不通过','#phone', {tips: [2,'red'],time:2000});
                    checkPhoneIf = false;  //有重复的手机号，验证不通过
                }else {
                    checkPhoneIf = true;  //没有重复的手机号，验证通过
                }
            },
            error:function () {
                layer.msg("服务器异常！！！",{icon: 6,time:2000,anim: 6,shade:0.5});
            }
        });
    }

    //修改会员的手机号和类型
    function updVip(obj,updJsonVip) {
        $.ajax({
            type:'POST',
            url:'vip/updByPrimaryKeySelective',  //调用的是base系列的方法，只需要改mapper.xml文件
            data:updJsonVip,
            success:function (data) {
                if(data=='updSuccess'){
                    obj.update({  //更新页面缓存
                        phone:updJsonVip.phone,
                        vipRate:updJsonVip.vipRate
                    });
                    layer.msg("会员数据修改成功",{icon: 1,time:2000,anim: 4,shade:0.5});
                }else {
                    layer.msg("会员数据修改失败！！",{icon: 2,time:2000,anim: 3,shade:0.5});
                }
            },
            error:function () {
                layer.msg("服务器异常！！！",{icon: 6,time:2000,anim: 6,shade:0.5});
            }
        });
    }

    //修改会员名字
    function updVipName(updJsonVipName) {
        $.ajax({
            type:'POST',
            url:'vip/updByPrimaryKeySelective',  //调用的是base系列的方法，只需要改mapper.xml文件
            data:updJsonVipName,
            success:function (data) {
                if(data=='updSuccess'){
                    layer.msg("会员名字修改成功",{icon: 1,time:2000,anim: 4,shade:0.5});
                }else {
                    layer.msg("会员名字修改失败！！",{icon: 2,time:2000,anim: 3,shade:0.5});
                }
            },
            error:function () {
                layer.msg("服务器异常！！！",{icon: 6,time:2000,anim: 6,shade:0.5});
            }
        });
    }


});