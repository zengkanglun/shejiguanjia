$(function () {
    // 过程管理->过程纪要->编辑 弹出层显示
    $(".process_detail td .edit").on("click", function() {
        var tds = $($(this).parent().parent()).children('td');
        var id = $(this).attr('data-id');
        var time = tds[1];
        var type = tds[2];
        var content = tds[3];
        var input_tmp = $($(this).parent().parent()).children('input');
        var input_tmp2 = input_tmp[0];
        sessionStorage.setItem('process_id',id);
        $('.process_edit input[name="type"]').val($(type).html());
        $('.process_edit input[name="time"]').val($(time).html());
        $('.process_edit input[name="s_id"]').val($(input_tmp2).val());
        $('.process_edit textarea[name="content"]').val($(content).html());
        $("#boxPock").show();
        $(".process_edit").show();
//
    });

    // 过程管理->过程纪要->查看 弹出层显示
    $(".process_detail td .check").on("click", function() {
        var tds = $($(this).parent().parent()).children('td');
        var id = $(this).attr('data-id');
        var time = tds[1];
        var type = tds[2];
        var content = tds[3];
        var name = tds[4];
        $('.process_check input[name="type"]').val($(type).html());
        $('.process_check input[name="time"]').val($(time).html());
        $('.process_check textarea[name="content"]').val($(content).html());
        $('.process_check input[name="name"]').val($(name).html());
        $("#boxPock").show();
        $(".process_check").show();
    });

    // 过程管理->过程纪要->删除
    $(".process_detail .del").on('click',function () {
        var id = $(this).attr('data-id');
        layer.confirm('确定删除吗?',{
            title:"",
            yes:function () {
                $.get('/Api/Project/del_process',{"id":id},function (data) {
                    if(data.status)
                    {
                        layer.msg('删除成功');
                        // location.reload();
                    }else{
                        layer.msg(data.msg);
                        // location.reload();
                    }
                });
            }
        });
    });

    // 过程管理->出图出差->编辑 弹出层显示
    $('.travel_detail .edit').on('click',function(){
        var tds = $($(this).parent().parent()).children('td');
        var id = tds[0];
        var type_name = tds[2];
        var content = tds[3];
        var number = tds[4];
        var input_tmp = $($(this).parent().parent()).children('input');
        var input_tmp2 = input_tmp[1];
        var join_s_id = $(input_tmp2).val();

        $('.travel_edit input[name="join_s_id"]').val(join_s_id)
        $('.travel_edit input[name="id"]').val($(id).html())
        $('.travel_edit input[name="type_name"]').val($(type_name).html())
        $('.travel_edit input[name="number"]').val($(number).html())
        $('.travel_edit textarea[name="content"]').val($(content).html())
    });

    /**
     * 过程管理->出图出差->查看 弹出层显示
     */
    $('.travel_detail .check').on('click',function(){
        var tds = $($(this).parent().parent()).children('td');
        // join_s_id type_name number content
        var type_name = tds[2];
        var content = tds[3];
        var number = tds[4];
        var input_tmp = $($(this).parent().parent()).children('input');
        var input_tmp2 = input_tmp[1];
        var join_s_id = $(input_tmp2).val();

        $('.travel_check input[name="join_s_id"]').val(join_s_id)
        $('.travel_check input[name="type_name"]').val($(type_name).html())
        $('.travel_check input[name="number"]').val($(number).html())
        $('.travel_check textarea[name="content"]').val($(content).html())
    });

    /**
     * 过程管理->出图出差->删除
     */
    $('.travel_detail .del').on('click',function () {
        var id = $(this).attr('data-id');
        layer.confirm('确定删除该内容吗?',{
            title:"",
            yes:function () {
                $.get('/Api/Project/del_chutu',{"id":id},function (data) {
                    if(data.status)
                    {
                        layer.msg('删除成功');
                        location.reload();
                    }else{
                        layer.msg(data.msg);
                        location.reload();
                    }
                });
            }
        });
    });

    /**
     * 下载发函管理附件
     */
    $('.send_file').on('click',function () {
        var id = $(this).attr('data-id');
        location.href="/Api/Project/letter_attachment/id/"+id;
        // $.get('/Api/Project/letter_attachment',{"id":id},function () {
        //
        // });
    });
    /**
     * 下载发函管理附件
     */
    $('.send_file_w').on('click',function () {
        var id = $(this).attr('data-id');
        location.href="/Api/Project/drawing_attachment/id/"+id;
        // $.get('/Api/Project/letter_attachment',{"id":id},function () {
        //
        // });
    });
    $('.loading').on('click',function(){
        var id = $(this).attr('data-id');
        var type = $(this).attr('type');
        if(type == 'drawing')
        {
            location.href="/Api/Project/drawing_attachment/id/"+id;
        }else{
            location.href="/Api/Project/letter_attachment/id/"+id;
        }
    });
    /**
     * 过程管理->发函管理->编辑 弹出层显示
     */
    $('.manage_detail .edit').on('click',function(){
        var tds = $($(this).parent().parent()).children('td');
        //类型 时间 内容
        var id = tds[0];
        var type_name = tds[2];
        var time = tds[1];
        var content = tds[3];

        $('.manage_edit input[name="type_name"]').val($(type_name).html());
        $('.manage_edit input[name="time"]').val($(time).html());
        $('.manage_edit textarea[name="content"]').val($(content).html());
        $('.manage_edit input[name="id"]').val($(id).html())
    });

    /**
     * 过程管理->发函管理->查看 弹出层显示
     */
    $('.manage_detail .check').on('click',function(){
        var tds = $($(this).parent().parent()).children('td');
        // 类型 记录人 时间 内容 id
        var id = tds[0];
        var type_name = tds[2];
        var time = tds[1];
        var content = tds[3];
        var create_by = tds[5];
        var file_name = tds[4];

        $(".manage_check input[name='type_name']").val($(type_name).html());
        $(".manage_check input[name='create_by']").val($(create_by).html());
        $(".manage_check input[name='time']").val($(time).html());
        $(".manage_check textarea[name='content']").val($(content).html());
        $(".manage_check div[class='skim']").html($(file_name).html());
        $(".manage_check span[class='loading']").attr('data-id',$(id).html());
        // $(".manage_check div[class='skim']").attr('data-id',$(id).html());
    });

    /**
     * 过程管理->发函管理->删除
     */
    $('.manage_detail .del').on('click',function(){
        var id = $(this).attr('data-id');
        layer.confirm('确定删除该内容吗?',{
            title:"",
            yes:function () {
                $.get('/Api/Project/del_letter',{"id":id},function (data) {
                    if(data.status)
                    {
                        layer.msg('删除成功');
                        location.reload();
                    }else{
                        layer.msg(data.msg);
                        location.reload();
                    }
                });
            }
        });
    });

    /**
     * 过程管理->图纸归档->编辑 弹出层显示
     */
    $('.picture_detail .edit').on('click',function(){
        var tds = $($(this).parent().parent()).children('td');
        //类型 时间 内容
        var id = tds[0];
        var type_name = tds[2];
        var time = tds[1];
        var content = tds[3];

        $('.picture_edit input[name="type_name"]').val($(type_name).html());
        $('.picture_edit input[name="time"]').val($(time).html());
        $('.picture_edit textarea[name="content"]').val($(content).html());
        $('.picture_edit input[name="id"]').val($(id).html())
    });

    /**
     * 过程管理->发函管理->查看 弹出层显示
     */
    $('.picture_detail .check').on('click',function(){
        var tds = $($(this).parent().parent()).children('td');
        // 类型 记录人 时间 内容 id
        var id = tds[0];
        var type_name = tds[2];
        var time = tds[1];
        var content = tds[3];
        var create_by = tds[5];
        var file_name = tds[4];

        $(".picture_check input[name='type_name']").val($(type_name).html());
        $(".picture_check input[name='create_by']").val($(create_by).html());
        $(".picture_check input[name='time']").val($(time).html());
        $(".picture_check textarea[name='content']").val($(content).html());
        $(".picture_check div[class='skim']").html($(file_name).html());
        $(".picture_check span[class='loading']").attr('data-id',$(id).html());
        $(".picture_check span[class='loading']").attr('type','drawing');
        // $(".manage_check div[class='skim']").attr('data-id',$(id).html());
    });

    /**
     * 过程管理->图纸归档->删除
     */
    $('.picture_detail .del').on('click',function(){
        var id = $(this).attr('data-id');
        layer.confirm('确定删除该内容吗?',{
            title:"",
            yes:function () {
                $.get('/Api/Project/del_drawing',{"id":id},function (data) {
                    if(data.status)
                    {
                        layer.msg('删除成功');
                        location.reload();
                    }else{
                        layer.msg(data.msg);
                        location.reload();
                    }
                });
            }
        });
    });

    /**
     * 拒绝任务时获取任务id
     */
    $('.new_task .del').on('click',function(){
        var id = $(this).attr('data-id');
        sessionStorage.setItem('new_task_id',id);
    });

    /**
     * 拒绝任务
     */
    $('.refuse_detail .btn1').on('click',function(){
        var message = $('.refuse_detail .add_content textarea[name="content"]').val();
        var id      = sessionStorage.getItem('new_task_id');

        if(!message || !id)
        {
            return false;
        }

        $.post('/Api/Task/del_item',{
            "id":id,
            "content":message,
            "type":1
        },function (data) {
            if(data.status)
            {
                layer.msg('已拒绝');
                location.reload();
                return false;
            }else{
                layer.msg(data.msg);
                return false;
            }
        },'json');
    });

    /**
     * 删除进行中的任务
     */
    $('.task_go .del').on('click',function(){
        var id = $(this).attr('data-id');
        layer.confirm('确定删除该任务吗?',{
            yes:function () {
                $.post('/Api/Task/del_item',{
                    "type":2,
                    "id":id
                },function (data) {
                    if(data.status)
                    {
                        layer.msg('已删除');
                        location.reload();
                    }else{
                        layer.msg(data.msg);
                        location.reload();
                    }
                },'json');
            }
        });
    });

    /**
     * 历史任务删除
     */
    $('.history_task .del').on('click',function () {
        var id = $(this).attr('data-id');
        layer.confirm("确定删除任务吗?",{
            yes:function () {
                $.post('/Api/Task/del_item',{
                    "type":3,
                    "id":id
                },function (data) {
                    if(data.status)
                    {
                        layer.msg('删除成功');
                        location.reload();
                    }else{
                        layer.msg(data.msg);
                        location.reload();
                    }
                })
            }
        });
    });

    /**
     * 新任务->查看任务详情
     */
    $('.new_task .title').on('click',function () {
        var id = $(this).attr('data-id');
        $.get('/Api/Task/getData',{"id":id},function (data) {
            data.att_name = data.att_name ? data.att_name : '没有附件';
            $('.newtask_detail input[name="name"]').val(data.name);
            $('.newtask_detail input[name="id"]').val(data.id);
            $('.newtask_detail input[name="type"]').val(data.type);
            $('.newtask_detail input[name="mans"]').val(data.mans);
            $('.newtask_detail input[name="time"]').val(data.time);
            $('.newtask_detail input[name="title"]').val(data.title);
            $('.newtask_detail span[class="download"]').html(data.att_name);
            $('.newtask_detail span[class="download"]').attr("data-id",data.id);
            $('.newtask_detail textarea[name="content"]').val(data.content);
        });
    });

    /**
     * 进行中任务->查看任务详情
     */
    $('.task_go .title').on('click',function () {
        var id = $(this).attr('data-id');

        $.get('/Api/Task/getData',{"id":id},function (data) {
            $('.taskgo_add input[name="name"]').val(data.name);
            $('.taskgo_add input[name="id"]').val(data.id);
            $('.taskgo_add input[name="type"]').val(data.type);
            $('.taskgo_add input[name="mans"]').val(data.mans);
            $('.taskgo_add input[name="time"]').val(data.time);
            $('.taskgo_add input[name="title"]').val(data.title);
            $('.taskgo_add span[class="choose_file"]').html(data.att_name);
            $('.taskgo_add span[class="choose_file"]').attr("data-id",data.id);
            $('.taskgo_add textarea[name="content"]').val(data.content);
        });
    });
    /**
     * 历史任务->查看任务详情
     */
    $('.history_task .title').on('click',function () {
        var id = $(this).attr('data-id');

        $.get('/Api/Task/getData',{"id":id},function (data) {
            $('.histask_detail input[name="name"]').val(data.name);
            $('.histask_detail input[name="id"]').val(data.id);
            $('.histask_detail input[name="type"]').val(data.type);
            $('.histask_detail input[name="mans"]').val(data.mans);
            $('.histask_detail input[name="time"]').val(data.time);
            $('.histask_detail input[name="title"]').val(data.title);
            $('.histask_detail span[class="choose_file"]').html(data.att_name);
            $('.histask_detail span[class="choose_file"]').attr("data-id",data.id);
            $('.histask_detail textarea[name="content"]').val(data.content);
        });
    });
    /**
     * 接收任务
     */
    $('.newtask_detail .btn1').on('click',function () {
        var id = $('.newtask_detail input[name="id"]').val();
        var message = $(".newtask_detail textarea[name='reply_content']").val();

        $.post('/Api/Task/accept',{"id":id,"content":message,"type":"accept"},function (data) {
            if(data.status)
            {
                layer.msg('已接受');
                // location.reload();
            }else{
                layer.msg(data.msg);
                // location.reload();
            }
        });
    });
    /**
     * 拒绝任务
     */
    $('.newtask_detail .btn3').on('click',function () {
        var id = $('.newtask_detail input[name="id"]').val();
        var message = $(".newtask_detail textarea[name='reply_content']").val();
        $.post('/Api/Task/reject',{"id":id,"content":message,"type":"reject"},function (data) {
            if(data.status)
            {
                layer.msg('已拒绝');
                location.reload();
            }else{
                layer.msg(data.msg);
                location.reload();
            }
        });
    });

    /**
     * 下载任务附件
     */
    $('.newtask_detail .download,.taskgo_add .choose_file,.histask_detail .download').on('click',function () {
        var id = $(this).attr('data-id');

        location.href = '/Api/Task/download/id/'+id;
        // $.get('/Api/Task/download',{"id":id},function () {
        //
        // });

    });

    /**
     * 新建任务
     */
    $('.newtask_add .btn1').on('click',function () {
        var form_data = new FormData($("#new_task")[0]);

        $.ajax({
            url: '/Home/Task/createTask' ,
            type: 'POST',
            data: form_data,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (returndata) {
                if(returndata.status)
                {
                    layer.msg('添加成功');
                    // location.reload();
                }else{
                    layer.msg(returndata.msg);
                    // location.reload();
                }
            },
            error: function (returndata) {
                // alert(returndata);
            }
        });
    });

    $(".histask_detail .cnt_footer .btn1").on('click',function () {
        var content = $('.histask_detail .cnt_reply textarea[name="reply_content"]').val();
        var id      = $('.histask_detail .cnt_header .choose_file').attr('data-id');


        layer.msg(id);
    });
    /**
     * 查看任务接受者
     */
    $('.show_task_receivers').on('click',function () {
        var text = $(this).attr('data-receiver');
        layer.open({
            type:1,
            content:text,
            area:["20%","20%"],
            title:'',
            shadeClose:true
        });
    });

    /**
     * 新建消息
     */
    $(".newmsg_add .btn1").on('click',function () {
        var form_data = new FormData($("#create_notice")[0]);

        $.ajax({
            url: '/Home/Notice/create' ,
            type: 'POST',
            data: form_data,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (returndata) {
                if(returndata.status)
                {
                    layer.msg('添加成功');
                    // location.reload();
                }else{
                    layer.msg(returndata.msg);
                    // location.reload();
                }
            },
            error: function (returndata) {
                // alert(returndata);
            }
        });
    });

    $(document).on('click','.project .btn1',function () {
        // $("#create_project").submit();
    });

    /**
     * 行政支出
     */
    $(".expend_edit .expend_edit_bottom .cnt_footer .btn1").on('click',function(){
        var form_data = new FormData($('#create_overhead')[0]);

            $.ajax({
            url: '/Home/Finance/index' ,
            type: 'POST',
            data: form_data,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (returndata) {
                if(returndata.status)
                {
                    layer.msg('添加成功');
                    // location.reload();
                }else{
                    layer.msg(returndata.msg);
                    // location.reload();
                }
            },
            error: function (returndata) {
                // alert(returndata);
            }
        });
    });

    /**
     * 财务->项目收入查看
     * 1.需要写个接口让前端生成数据
     * 2.生成数据需要在.item_income .list_detail .handle span的属性增加一个data-id
     * 3.data-id是项目id
     */
    $(".item_income .list_detail .handle span").on('click',function(){
        var id = $(this).attr('data-id');

        /**
         * 需要项目名称 立项时间 项目阶段 合同总额 阶段列表 阶段内容 收款记录
         */
        $.get('/Home/Finance/getInfoIncome',{"id":id},function (data) {

        });
    });



});

/**
 * 退出登录
 */
function logout()
{
    layer.confirm('确定要退出吗?',{
        title:'',
        yes:function () {
            location.href = '/index.php/Home/Public/logout/';
        }
    });
}

/**
 * 直接改密码
 * @returns {boolean}
 */
function change_pwd()
{
    var old_pwd = $("#old_pwd").val();
    var new_pwd = $("#new_pwd").val();
    var verify  = $("#new_pwd_verify").val();
    if(!old_pwd || !new_pwd || !verify)
    {
        return false;
    }
    if(new_pwd != verify)
    {
        layer.msg('两次密码不一致',{icon:5});
        return false;
    }
    $.post('/Home/User/setPassFast',{"old_pwd":old_pwd,"new_pwd":new_pwd,"verify":verify},function(data){
            if(data.status)
            {
                // 触发关闭弹出层页面
                $("#change_pwd_close").trigger('click');
                layer.msg(data.msg,{icon:6});
            }else{
                layer.msg(data.msg,{icon:5});
            }
    },'json');
}

/**
 * 修改个人资料
 * @returns {boolean}
 */
function change_information()
{
    var login_name= $("#login_name").val();
    var real_name = $("#real_name").val();
    var pass_word = $("#pass_word").val();
    var gender    = $("#gender").val();
    var join_in   = $("#test1").val();
    var graduate  = $("#graduate_school").val();
    var education = $("#education").val();
    var title     = $("#title").val();
    var work_type = $("#work_type").val();
    var mobile    = $("#mobile").val();
    var qq        = $("#qq").val();
    var birth     = $("#birthday").val();
    if(mobile)
    {
        if(!verify_mobile(mobile))
        {
            layer.msg('手机号不正确',{icon:5});
            return false;
        }
    }

    if(qq)
    {
        if(!verify_qq(qq))
        {
            layer.msg('QQ号不正确',{icon:5});
            return false;
        }
    }
    $.post('/Home/User/editInformation',{
        "login_name"     :login_name,
        "real_name"      :real_name,
        "pass_word"      :pass_word,
        "gender"         :gender,
        "join_in_work"   :join_in,
        "graduate_school":graduate,
        "education"      :education,
        "job_title"      :title,
        "work_type"      :work_type,
        "mobile"         :mobile,
        "qq"             :qq,
        "birth"          :birth
    },function (data) {
        
    });

}

/**
 * 校验手机号
 * @param mobile
 * @returns {boolean}
 */
function verify_mobile(mobile)
{
    if(/(?:^0|\+86)?1[34578]\d{9}/.test(mobile))
    {
        return true;
    }

    return false;
}

/**
 * 校验QQ号
 * @param qq
 * @returns {boolean}
 */
function verify_qq(qq)
{
    if(/\d{5,11}/.test(qq))
    {
        return true;
    }

    return false;
}

/**
 * 跳转帮助中心
 */
function helpful()
{
    location.href = '/Home/Public/help';
}

/**
 * 增加过程纪要
 * @returns {boolean}
 */
function add_process()
{
    var type    = $('.process_add_bottom select[name="type"]').val();
    var time    = $('.process_add_bottom input[name="time"]').val();
    var content = $('.process_add_bottom textarea[name="content"]').val();
    if(!type || !time || !content)
    {
        layer.msg('请填写信息');
        return false;
    }
    $.post('/Api/Project/add_process',{
        "type":type,
        "time":time,
        "content":content
    },function(data){

    },'json');
}

/**
 * 编辑过程纪要
 */
function edit_process()
{
    $("#edit_process").submit(function () {
        var process_id = sessionStorage.getItem('process_id');
        var form_data  = $(this).serializeArray();
        form_data.push({"name":"process_id","value":process_id});
        $.post('/Api/Project/edit_process',form_data,function (data) {
            
        });
        console.log(form_data);
        return false;
    });
}

/**
 * 添加出图出差
 * @returns {boolean}
 */
function add_chutu() {
    var join_s_id = $('.travel_add input[name="join_s_id"]').val();
    var type = $('.travel_add select[name="type"]').val();
    var number = $('.travel_add input[name="number"]').val();
    var content = $('.travel_add textarea[name="content"]').val();

    if (join_s_id && type && number && content)
    {
        $.post('/Api/Project/add_chutu',{"join_s_id":join_s_id,"type":type,"number":number,"content":content},function (data) {
            if(data.status)
            {
                layer.msg('添加成功');
                $("#add_chutu").trigger('click');
                // location.reload();
            }else{
                layer.msg(data.msg);
                // location.reload();
            }
        });
    }else{
        layer.msg('请填写内容');
        return false;
    }
}

/**
 * 编辑出图出差
 */
function edit_chutu()
{
    $('#edit_chutu').submit(function () {
        var form_data = $(this).serializeArray();
        console.log(form_data);
        $.post('/Api/Project/edit_chutu',form_data,function (data) {
            if(data.status)
            {
                layer.msg(data.msg);
                location.reload();
            }else{
                layer.msg(data.msg);
                location.reload();
            }
        });
        return false;
    });
}

/**
 * 添加发函管理
 */
function add_letter()
{
    var formData = new FormData($("#add_letter")[0]);
    $.ajax({
        url: '/Api/Project/add_letter' ,
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (returndata) {
            if(returndata.status)
            {
                layer.msg('添加成功');
                // location.reload();
            }else{
                layer.msg(returndata.msg);
                // location.reload();
            }
        },
        error: function (returndata) {
            // alert(returndata);
        }
    });

}

/**
 * 编辑发函管理
 */
function edit_letter()
{
    var formData = new FormData($("#edit_fahan")[0]);

    $.ajax({
        url: '/Api/Project/edit_letter' ,
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (returndata) {
            if(returndata.status)
            {
                layer.msg('修改成功');
                // location.reload();
            }else{
                layer.msg(returndata.msg);
                // location.reload();
            }
        },
        error: function (returndata) {
            // alert(returndata);
        }
    });
}

/**
 * 添加图纸归档
 */
function add_drawing()
{
    var formData = new FormData($("#add_drawing")[0]);

    $.ajax({
        url: '/Api/Project/add_drawing' ,
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (returndata) {
            if(returndata.status)
            {
                layer.msg('添加成功');
                // location.reload();
            }else{
                layer.msg(returndata.msg);
                // location.reload();
            }
        },
        error: function (returndata) {
            // alert(returndata);
        }
    });
}
/**
 * 编辑图纸归档
 */
function edit_drawing()
{
    var formData = new FormData($("#edit_drawing")[0]);

    $.ajax({
        url: '/Api/Project/edit_drawing' ,
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (returndata) {
            if(returndata.status)
            {
                layer.msg('修改成功');
                // location.reload();
            }else{
                layer.msg(returndata.msg);
                // location.reload();
            }
        },
        error: function (returndata) {
            // alert(returndata);
        }
    });
}

