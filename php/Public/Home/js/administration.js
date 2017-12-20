
function goto(me,type){
    //跳转
    var id=$(me).parent().attr('data_id');
    switch(type){
        case 'pro_info':
            top.location.href="/Home/Index/edit?id="+id;
            break;
    }
}
function del_canyu(id,me){
    //删除参与
    layer.open({
        content: '您确认要删除吗？',
        btn: ['确认', '取消'],
        shadeClose: false,
        yes: function(){
            $.get("/Home/index/del_participate",{id:id},function(res){
                if(res.status==1){
                    $(me).closest('tr').remove();
                    layer.closeAll();
                }else{
                    mui.toast(res.msg);
                }

            });

        }, no: function(){

        }
    });

}
function pro_add(id,type){
    //项目添加
    $('.responsibe').empty();
    $.get("/Home/index/getProjectEdit",{id:id},function(res){
        //项目主管信息
        var html='<div class="item_manage duty">';
        html+='<span>'+res.manger.type+'：</span>';
        html+='<input type="text" placeholder="" value="'+res.manger.name+'">';
        html+='<i><img src="img/black_tri.png"></i>';
        html+='<select name="">';
        html+='<option value="">'+res.manger.name+'</option>';
        html+='</select>';
        html+='</div>';
        for(var i =0;i<res.leaders.length;i++){
            html+='<div class="item_manage duty">';
            html+='<span>'+res.leaders[i].type+'：</span>';
            html+='<input type="text" placeholder="" value="'+res.leaders[i].name+'">';
            html+='<i><img src="img/black_tri.png"></i>';
            html+='<select name="">';
            html+='<option value="">'+res.leaders[i].name+'</option>';
            html+='</select>';
            html+='</div>';
        }


        $('.responsibe').append(html);
    });
    $('.item_worker table tbody').empty();
    $.get("/Home/index/get_participate",{id:id},function(res){
        //获取参与工作
        var data=res.data;
        var content="";
        for(var i=0;i<data.length;i++){
            content+='<tr>';
            content+='<td>'+data[i].id+'</td>';
            content+='<td>'+data[i].user_name+'</td>';
            content+='<td>'+data[i].work_name+'</td>';
            content+='<td>'+data[i].content+'</td>';
            content+='<td></td>';
            content+='<td class="handle"><span>编辑</span><span><a href="javascript:;" onclick="del_canyu('+data[i].id+',this)">删除</a></span></td>';
            content+='</tr>';

        }
        $('.item_worker table tbody').html(content);
    });
    if(type!=1){
        $(".floor_cnt_ul").empty();
        var li='<li class="active"><a href="javascript:pro_add('+id+')">全部</a></li>';
        $(".floor_cnt_ul").append(li);
        $.get("/Home/Index/getProjects_son",{id:id},function(res){
            //获取参与工作
            var data=res.data;
            for(var i=0;i<data.length;i++){
                var li='<li><a href="javascript:pro_add('+data[i].id+',1)">'+data[i].name+'</a></li>';
                $(".floor_cnt_ul").append(li);
            }
        });
    }

}
function get_jiti(id,type,s){

    $.get("/Api/Manager/manger_jiti",{id:id},function(res){
        //获取项目计提
        $('input[name=pro_level]').val(res.stage);
        $('input[name=pro_name]').val(res.name);
        $('input[name=pro_time]').val(res.create_time);
        var is_manage=s;

        if(typeof(is_manage)!='undefined'){
            var is_manage=is_manage;
        }else{
            var is_manage=0;
        }
        console.log(is_manage);
        if(type!=1){
            $(".bigfloor .floor_ul").empty();
            var li='<li class="active"><a href="javascript:get_jiti('+id+',0,'+is_manage+')">全部</a></li>';
            $(".bigfloor .floor_ul").append(li);
            var sons=res.sons;

            if(typeof(sons)!='undefined'){
                for(var i=0;i<sons.length;i++){
                    var li='<li><a href="javascript:get_jiti('+sons[i].id+',1,'+is_manage+')">'+sons[i].name+'</a></li>';
                    $(".bigfloor .floor_ul").append(li);
                }
            }
        }
        var doing=res.doing;
        var content="";
        console.log();
        for(var i=0;i<doing.length;i++){
            var addtime="";
            content+="<tr>";
            content+='<td>'+doing[i].id+'</td>';
            if(is_manage==1){
                content+='<td>'+doing[i].time+'</td>';
                content+='<td>'+doing[i].work_type+'</td>';

            }else{
                content+='<td>'+doing[i].time+'</td>';
            }

            content+='<td>'+doing[i].leader_name+'</td>';
            content+='<td>'+doing[i].situation+'</td>';

            if(is_manage==1){
                content+='<td><input type="text" placeholder="'+doing[i].profit+'"></td>';
                content+='<td><span class="detail"></span></td>';
            }else{
                content+='<td><span class="detail"></span></td>';

                content+='<td><input type="text" placeholder="'+doing[i].profit+'"></td>';

            }

            content+='<td class="handle"><span>查看</span></td>';
            content+='</tr>';
        }

        $('.jitiing tbody').html(content);

        var done=res.done;
        var content="";
        for(var i=0;i<done.length;i++){
            var addtime="";
            content+="<tr>";
            content+='<td>'+done[i].id+'</td>';
            if(is_manage==1){
                content+='<td>'+done[i].time+'</td>';
                content+='<td>'+done[i].work_type+'</td>';
            }else{
                content+='<td>'+done[i].time+'</td>';
            }
            content+='<td>'+done[i].leader_name+'</td>';
            content+='<td>'+done[i].situation+'</td>';
            if(is_manage==1){
                content+='<td><input type="text" placeholder="'+done[i].profit+'"></td>';
            }else{
                content+='<td><span class="detail"></span></td>';
                content+='<td><input type="text" placeholder="'+done[i].profit+'"></td>';
            }
            content+='<td class="handle"><span>查看</span></td>';
            content+='</tr>';
        }

        $('.jiti tbody').html(content);
    });

}
$(function() {
    //tab切换
    var itemcheck = 0;

    $(".xs-3").eq(0).on("click", function() {
        $(".xs-3").removeClass("HeaderRowsActive");
        $(this).addClass("HeaderRowsActive");
        $(".item_manage1").show();
        $(".member_manage2").hide();
    })
    $(".xs-3").eq(1).on("click", function() {
        $(".xs-3").removeClass("HeaderRowsActive");
        $(this).addClass("HeaderRowsActive");
        $(".member_manage2").show();
        $(".item_manage1").hide();
    })
    //select
    $("select").on("change", function() {
        var txt = $(this).find("option:checked").text();
        $(this).siblings("input").val(txt)
    })
    //新增用户
    $(document).on("click", ".member_manage2 .seconds button", function() {
        $("#boxPock").show();
        $(".add_person").show();
    })
    $(document).on("click", ".add_person .add_person_head i,.add_person .btn1,.add_person .btn2", function() {
        $("#boxPock").hide();
        $(".add_person").hide();
    })
    $(document).on("click", ".add_person .limit .choose_one i", function() {
        $(this).find("img").toggle();
    })
    //查看用户
    $(document).on("click", ".member_manage2 .third td .check", function() {
        $("#boxPock").show();
        $(".check_person").show();
    })
    $(document).on("click", ".check_person .check_person_head i,.check_person .btn1", function() {
        $("#boxPock").hide();
        $(".check_person").hide();
    })
    //编辑用户
    $(document).on("click", ".member_manage2 .third td .edit", function() {
        $("#boxPock").show();
        $(".edit_person").show();
    })
    $(document).on("click", ".edit_person .edit_person_head i,.edit_person .btn1,.edit_person .btn2", function() {
        $("#boxPock").hide();
        $(".edit_person").hide();
    })
    $(document).on("click", ".edit_person .limit .choose_one i", function() {
        $(this).find("img").toggle();
    })
    //历史用户
    $(document).on("click", ".member_manage2 .forth td span", function() {
        $("#boxPock").show();
        $(".history_person").show();
    })
    $(document).on("click", ".history_person .history_person_head i,.history_person .btn1", function() {
        $("#boxPock").hide();
        $(".history_person").hide();
    })
    //操作
    $(document).on("click", ".item_manage1 tbody .item_count .operate", function() {
        $("#boxPock").show();
        $("#boxPock .userAdminFive").show();
    })
    $(document).on("click", ".item_manage1 tbody .system_count .manage", function() {
        var type =$(this).attr('class');
        var id=$(this).parent().attr('data_id');
        console.log("这里是管理");
        get_jiti(id,'0',1,'1');
        $("#boxPock").show();
        $("#boxPock .userAdminFive").show();
    })
    $(document).on("click", ".userAdminFive .perf_detail_head i,.userAdminFive .btn1", function() {
        $("#boxPock").hide();
        $("#boxPock .userAdminFive").hide();
    })
    //操作详情
    $(document).on("click", ".userAdminFive .list_detail tbody .plan .detail", function() {
        $("#boxPock .userAdminFive").hide();
        $("#boxPock .item_plan").show();
    })
    $(document).on("click", ".userAdminFive .list_detail tbody .handle .detail", function() {
        $("#boxPock .userAdminFive").hide();
        $("#boxPock .item_plan").show();
    })
    $(document).on("click", ".item_plan .item_plan_head i,.item_plan .btn1,.item_plan .btn2,.item_plan .btn3", function() {
        $("#boxPock .userAdminFive").show();
        $("#boxPock .item_plan").hide();
    })
    //分工情况
    $(document).on("click", ".userAdminFive .list_detail .work_status .check", function() {
        $("#boxPock .userAdminFive").hide();
        $("#boxPock .labour").show();
    })
    $(document).on("click", ".labour .labour_head i,.labour .btn2", function() {
        $("#boxPock .userAdminFive").show();
        $("#boxPock .labour").hide();
    })
    //系统管理员主管
    $(document).on("click", ".item_manage1 tbody .work_count .operate", function() {
        // $("#boxPock").show();
        // $("#boxPock .worktype").show();
    })
    $(document).on("click", ".item_manage1 tbody .system_count .work", function() {
        var type =$(this).attr('class');
        var id=$(this).parent().attr('data_id');
        get_jiti(id);
        $("#boxPock").show();
        $("#boxPock .worktype").show();
    })
    $(document).on("click", ".worktype .worktype_head i,.worktype .btn1", function() {
        $("#boxPock").hide();
        $("#boxPock .worktype").hide();
    })
    $(document).on("click", ".worktype .list_detail tbody td .detail", function() {
        $("#boxPock .worktype").hide();
        $("#boxPock .item_check").show();
        itemcheck = 1;
        if(itemcheck == 1) {
            $(".item_check .item_check_head i,.item_check .btn2").on("click", function() {
                $("#boxPock .worktype").show();
                $("#boxPock .item_check").hide();
            })
        }
    })
    //	$(".item_check .item_check_head i,.item_check .btn2").on("click",function(){
    //		$("#boxPock .worktype").show();
    //		$("#boxPock .item_check").hide();
    //		console.log(itemcheck)
    //	})
    $(document).on("click", ".worktype .history_list tbody .handle .detail1", function() {
        $("#boxPock .worktype").hide();
        $("#boxPock .perf_detail").show();
    })
    $(document).on("click", ".perf_detail .perf_detail_head i,.perf_detail .btn2", function() {
        $("#boxPock .worktype").show();
        $("#boxPock .perf_detail").hide();
    })

    //成员管理五
    $(document).on("click", ".userAdminFive .bigfloor .floor_ul li", function() {
        $(this).addClass("active").siblings().removeClass("active");
        var txt = $(this).find("a").text();
        $(".userAdminFive .cnt_header .right .floor").text(txt);
    })
    $(document).on("click", ".worktype .bigfloor .floor_ul li", function() {
        $(this).addClass("active").siblings().removeClass("active");
        var txt = $(this).find("a").text();
        $(".worktype .cnt_header .right .floor").text(txt);
    })

    //成员管理弹窗
    $(document).on("click", ".item_manage1 tbody .item_manage .operate", function() {
        $("#boxPock").show();
        $("#boxPock .count_floor").show();
    })

    $(document).on("click", ".item_manage1 tbody .system_manage .manage", function() {

        var type =$(this).attr('class');
        var id=$(this).parent().attr('data_id');
        pro_add(id);
        $("#boxPock").show();
        $("#boxPock .count_floor").show();
    })
    $(document).on("click", ".count_floor .count_floor_head i,.count_floor .btn1,.count_floor .btn2", function() {
        $("#boxPock").hide();
        $("#boxPock .count_floor").hide();
    })
    $(document).on("click", ".count_floor .floor_cnt_ul li", function() {
        $(this).addClass("active").siblings().removeClass("active");
        var txt = $(this).find("a").text();
        $(".count_floor .count_floor_bottom .floor_top span").text(txt);
    })
    $(document).on("click", ".item_manage1 tbody .work_manage .operate", function() {
        // add at 2017年9月28日14:18:53
        // via 后台
        $('.userAdminSeven .itemmanage_bottom table tbody tr').remove();
        var id = $(this).parents('td').attr('data_id');
        sessionStorage.setItem('temp_work_type_id', id);
        $.get('/Api/Manager/work_info', {
            "id": id
        }, function(data) {
            var tbody1;
            for(var i = 0; i < data.data.length; i++) {
                tbody1 += '<tr class="e9ecf1"><td>' + parseInt(i + 1) + '</td><td>' + data.data[i].name + '</td><td>' + data.data[i].work_type + '</td><td>' + data.data[i].content + '</td><td>' + data.data[i].temp + '</td><td class="handle"><span class="edit">编辑</span><span class="del" data-id="' + data.data[i].sid + '">删除</span></td></tr>';
            }
            sessionStorage.setItem('temp_leader_id', data.leader_id);
            $('.userAdminSeven .manage_detail .manage_left').html(data.title);
            $('.userAdminSeven .itemmanage_bottom table').append(tbody1);
        });
        $("#boxPock").show();
        $("#boxPock .userAdminSeven").show();
    });
    // ***************

    $(document).on("click", ".item_manage1 tbody .system_manage .work", function() {
        // add at 2017年9月28日14:18:53
        // via 后台
        var id = $(this).parents('td').attr('data_id');
        $.get('/Api/Manager/work_info', {
            "id": id
        }, function(data) {

        });
        $("#boxPock").show();
        $("#boxPock .userAdminSeven").show();
    })
    $(document).on("click", ".userAdminSeven .itemmanage_head i,.userAdminSeven .btn2", function() {
        $("#boxPock").hide();
        $("#boxPock .userAdminSeven").hide();
    })
    //添加成员
    $(document).on("click", ".userAdminSeven .manage_detail .manage_right", function() {
        $("#boxPock .userAdminSeven").hide();
        $("#boxPock .addMember").show();
    })
    $(document).on("click", ".addMember .addMember_head i,.addMember .btn1,.addMember .btn2", function() {
        // 添加成员
        var name = $('.addMember input[name="works"]').val();
        var content = $('.addMember input[name="content"]').val();
        var id = sessionStorage.getItem('temp_work_type_id');
        var leader = sessionStorage.getItem('temp_leader_id');
        $.post('/Api/Manager/add_member', {
            "name": name,
            "id": id,
            "content": content,
            "leader": leader
        }, function(data) {

        });
        $("#boxPock .userAdminSeven").show();
        $("#boxPock .addMember").hide();
    })
    $(document).on("click", ".userAdminSeven tbody .handle .edit", function() {
        $("#boxPock .userAdminSeven").hide();
        $("#boxPock .item_check").show();
        itemcheck = 2;
        if(itemcheck == 2) {
            $(".item_check .item_check_head i,.item_check .btn2").on("click", function() {
                $("#boxPock .userAdminSeven").show();
                $("#boxPock .item_check").hide();
            })
        }
    })

    //数据对接=========
    //进来时获取的数据
    ajax(5, 1);
    forthAjax(5, 1)
    //点击时间搜索获取的数据
    $(document).on("click", ".item_manage1 .seconds .search", function() {
        var time1 = $("#admin_one").val();
        var time2 = $("#admin_two").val();
        var time = time1 + ',' + time2;
        ajax(5, 1, time);
        forthAjax(5, 1, time);
    })

    function ajax(size, p, time) {
        $.ajax({
            type: "get",
            url: "/Home/Manage/index",
            dataType: 'json',
            data: {
                size: size,
                p: p,
                intverl: time,
            },
            success: function(data) {
                var datas = data.data.data;
                $(".item_manage1 .third tbody").remove();
                var tbody1, tbody2, tbody3 = "";
                //进行中
                function tbodyOne(dataone) {
                    $(".item_manage1 .third .paging .page_left span").text(data.data.count);
                    $(".item_manage1 .third .paging .page_right .total_num").text(data.data.page);
                    for(var i = 0; i < datas.length; i++) {
                        tbody1 += '<tbody><tr><td class="pro_id">' + datas[i].id + '</td><td class="item_name"><a>' + datas[i].name + '</a></td><td class="' + datas[i].access + '">' + datas[i].access_name + '</td><td data_id="' + datas[i].id + '"></td><td data_id="' + datas[i].id + '"></td><td data_id="' + datas[i].id + '"></td></tr></tbody>';
                    }
                    return tbody1;
                }
                tbodyOne(datas);

                $(".item_manage1 .third table").append(tbody1);
                $(".item_manage1 .third tbody td.admin").each(function() {
                    $(this).parents("tr").find("td:nth(3)").addClass("item_msg");
                    $(this).parents("tr").find("td:nth(3)").append('<a href="javascript:;" onclick="goto(this,\'pro_info\');" >操作</a>');
                    $(this).parents("tr").find("td:nth(4)").addClass("system_manage");
                    $(this).parents("tr").find("td:nth(4)").append('<span class="manage">主管</span><span class="work">工种</span>');
                    $(this).parents("tr").find("td:nth(5)").addClass("system_count");
                    $(this).parents("tr").find("td:nth(5)").append('<span class="manage">主管</span><span class="work">工种</span>');
                })
                $(".item_manage1 .third tbody td.leaders").each(function() {
                    $(this).parents("tr").find("td:nth(4)").addClass("work_manage");
                    $(this).parents("tr").find("td:nth(4)").append('<span class="operate">操作</span>');
                    $(this).parents("tr").find("td:nth(5)").addClass("work_count");
                    $(this).parents("tr").find("td:nth(5)").append('<span class="operate">操作</span>');
                })
                $(".item_manage1 .third tbody td.manager").each(function() {
                    $(this).parents("tr").find("td:nth(3)").addClass("item_msg");
                    $(this).parents("tr").find("td:nth(3)").append('<a href="#">操作</a>');
                    $(this).parents("tr").find("td:nth(4)").addClass("item_manage");
                    $(this).parents("tr").find("td:nth(4)").append('<span class="operate">操作</span>');
                    $(this).parents("tr").find("td:nth(5)").addClass("item_count");
                    $(this).parents("tr").find("td:nth(5)").append('<span class="operate">操作</span>');
                })
                $(".item_manage1 .third tbody tr:odd").addClass("e9ecf1");

            },
            error: function(data) {},
            async: true
        });
    }

    //进行中右边
    //右边点击获取
    $(document).on("click", ".item_manage1 .third .paging .page_right .more", function() {
        var moreNum = $(".item_manage1 .third .paging .page_right .total_num").text();
        var lessNum = $(".item_manage1 .third .paging .page_right .number").text();
        if(moreNum <= lessNum) {
            toast("已经是最后一页了");
        } else {
            lessNum++;
            $(".item_manage1 .third .paging .page_right .number").text(lessNum);
            var time1 = $("#admin_one").val();
            var time2 = $("#admin_two").val();
            var time = time1 + ',' + time2;
            var size = $(".item_manage1 .third .pagenum input").val();
            console.log(time1, time2, size, lessNum);
            ajax(size, lessNum, time);
        }
    })
    //右边点击获取
    $(document).on("click", ".item_manage1 .third .paging .page_right .less", function() {
        var moreNum = $(".item_manage1 .third .paging .page_right .total_num").text();
        var lessNum = $(".item_manage1 .third .paging .page_right .number").text();
        if(lessNum == 1) {
            toast("已经是第一页了");
        } else {
            lessNum--;
            $(".item_manage1 .third .paging .page_right .number").text(lessNum);
            var time1 = $("#admin_one").val();
            var time2 = $("#admin_two").val();
            var time = time1 + ',' + time2;
            var size = $(".item_manage1 .third .pagenum input").val();
            console.log(time1, time2, size, lessNum);
            ajax(size, lessNum, time);
        }
    })
    //页面点击时完成
    $(".item_manage1 .third .pagenum select").on("change", function() {
        var size = $(this).siblings("input").val();
        console.log(size)
        var time1 = $("#admin_one").val();
        var time2 = $("#admin_two").val();
        var time = time1 + ',' + time2;
        ajax(size, 1, time);
    })

    //已完成右边====
    //右边点击获取
    $(document).on("click", ".item_manage1 .forth .paging .page_right .more", function() {
        var moreNum = $(".item_manage1 .forth .paging .page_right .total_num").text();
        var lessNum = $(".item_manage1 .forth .paging .page_right .number").text();
        if(moreNum <= lessNum) {
            toast("已经是最后一页了");
        } else {
            lessNum++;
            $(".item_manage1 .third .paging .page_right .number").text(lessNum);
            var time1 = $("#admin_one").val();
            var time2 = $("#admin_two").val();
            var time = time1 + ',' + time2;
            var size = $(".item_manage1 .third .pagenum input").val();
            console.log(time1, time2, size, lessNum);
            forthAjax(size, lessNum, time);
        }
    })
    //右边点击获取
    $(document).on("click", ".item_manage1 .forth .paging .page_right .less", function() {
        var moreNum = $(".item_manage1 .third .paging .page_right .total_num").text();
        var lessNum = $(".item_manage1 .third .paging .page_right .number").text();
        if(lessNum == 1) {
            toast("已经是第一页了");
        } else {
            lessNum--;
            $(".item_manage1 .forth .paging .page_right .number").text(lessNum);
            var time1 = $("#admin_one").val();
            var time2 = $("#admin_two").val();
            var time = time1 + ',' + time2;
            var size = $(".item_manage1 .third .pagenum input").val();
            console.log(time1, time2, size, lessNum);
            forthAjax(size, lessNum, time);
        }
    })
    //页面点击时完成
    $(".item_manage1 .forth .pagenum select").on("change", function() {
        var size = $(this).siblings("input").val();
        console.log(size)
        var time1 = $("#admin_one").val();
        var time2 = $("#admin_two").val();
        var time = time1 + ',' + time2;
        forthAjax(size, 1, time);
    })
    //已完成的回调
    function forthAjax(size, p, time) {
        $.ajax({
            type: "get",
            url: "/Home/Manage/finish",
            dataType: 'json',
            data: {
                size: size,
                p: p,
                intverl: time,
            },
            success: function(data) {
                var datas = data.data.data;
                $(".item_manage1 .forth tbody").remove();
                var tbody1, tbody2, tbody3 = "";
                //进行中
                function tbodyOne(dataone) {
                    $(".item_manage1 .forth .paging .page_left span").text(data.data.count);
                    $(".item_manage1 .forth .paging .page_right .total_num").text(data.data.page);
                    for(var i = 0; i < datas.length; i++) {
                        tbody1 += '<tbody><tr><td>' + datas[i].id + '</td><td class="item_name"><a>' + datas[i].name + '</a></td><td class="' + datas[i].access + '">' + datas[i].access_name + '</td><td data_id="' + datas[i].id + '"></td><td data_id="' + datas[i].id + '"></td><td data_id="' + datas[i].id + '"></td></tr></tbody>';
                    }
                    return tbody1;
                }
                tbodyOne(datas);
                $(".item_manage1 .forth table").append(tbody1);
                $(".item_manage1 .forth tbody td.admin").each(function() {
                    $(this).parents("tr").find("td:nth(3)").addClass("item_msg");
                    $(this).parents("tr").find("td:nth(3)").append('<a href="#">操作</a>');
                    $(this).parents("tr").find("td:nth(4)").addClass("system_manage");
                    $(this).parents("tr").find("td:nth(4)").append('<span class="manage">主管</span><span class="work">工种</span>');
                    $(this).parents("tr").find("td:nth(5)").addClass("system_count");
                    $(this).parents("tr").find("td:nth(5)").append('<span class="manage">主管</span><span class="work">工种</span>');
                })
                $(".item_manage1 .forth tbody td.leaders").each(function() {
                    $(this).parents("tr").find("td:nth(4)").addClass("work_manage");
                    $(this).parents("tr").find("td:nth(4)").append('<span class="operate">操作</span>');
                    $(this).parents("tr").find("td:nth(5)").addClass("work_count");
                    $(this).parents("tr").find("td:nth(5)").append('<span class="operate">操作</span>');
                })
                $(".item_manage1 .forth tbody td.manager").each(function() {
                    $(this).parents("tr").find("td:nth(3)").addClass("item_msg");
                    $(this).parents("tr").find("td:nth(3)").append('<a href="#">操作</a>');
                    $(this).parents("tr").find("td:nth(4)").addClass("item_manage");
                    $(this).parents("tr").find("td:nth(4)").append('<span class="operate">操作</span>');
                    $(this).parents("tr").find("td:nth(5)").addClass("item_count");
                    $(this).parents("tr").find("td:nth(5)").append('<span class="operate">操作</span>');
                })
                $(".item_manage1 .forth tbody tr:odd").addClass("e9ecf1");
            },
            error: function(data) {},
            async: true
        });
    }

    //人员管理的数据=======
    onLineajax(5, 1);
    histroyAjax(5, 1);
    //点击时间搜索获取的数据
    $(document).on("click", ".member_manage2 .seconds .search", function() {
        var time1 = $("#admin_three").val();
        var time2 = $("#admin_four").val();
        var time = time1 + ',' + time2;
        onLineajax(5, 1, time);
        histroyAjax(5, 1, time);
    })

    function onLineajax(size, p, time) {
        $.ajax({
            type: "get",
            url: "/Home/Manage/staffs_online",
            dataType: 'json',
            data: {
                size: size,
                p: p,
                intverl: time,
            },
            success: function(data) {
                var datas = data.data.data;
                $(".member_manage2 .third tbody").remove();
                var tbody1, tbody2, tbody3 = "";
                //进行中
                function tbodyOne(datas) {
                    $(".member_manage2 .third .paging .page_left span").text(data.data.count);
                    $(".member_manage2 .third .paging .page_right .total_num").text(data.data.page);
                    for(var i = 0; i < datas.length; i++) {
                        tbody1 += '<tbody><tr><td>' + datas[i].staff_id + '</td><td><a>' + datas[i].login_name + '</a></td><td>' + datas[i].real_name + '</td><td>' + datas[i].work_type + '</td><td>' + datas[i].add_time + '</td><td class="handle"><span class="edit">编辑</span><span class="edit">查看</span></td></tr></tbody>';
                    }
                    return tbody1;
                }
                tbodyOne(datas);
                $(".member_manage2 .third table").append(tbody1);
                $(".member_manage2 .third tbody tr:odd").addClass("e9ecf1");
            },
            error: function(data) {},
            async: true
        });
    }

    //历史数据
    function histroyAjax(size, p, time) {
        $.ajax({
            type: "get",
            url: "/Home/Manage/staffs_offline",
            dataType: 'json',
            data: {
                size: size,
                p: p,
                intverl: time,
            },
            success: function(data) {
                var datas = data.data.data;
                $(".member_manage2 .forth tbody").remove();
                var tbody1, tbody2, tbody3 = "";
                //进行中
                function tbodyOne(datas) {
                    $(".member_manage2 .forth .paging .page_left span").text(data.data.count);
                    $(".member_manage2 .forth .paging .page_right .total_num").text(data.data.page);
                    for(var i = 0; i < datas.length; i++) {
                        tbody1 += '<tbody><tr><td>' + datas[i].staff_id + '</td><td><a>' + datas[i].login_name + '</a></td><td>' + datas[i].real_name + '</td><td>' + datas[i].work_type + '</td><td>' + datas[i].add_time + '</td><td class="handle"><span class="edit">查看</span></td></tr></tbody>';
                    }
                    return tbody1;
                }
                tbodyOne(datas);
                $(".member_manage2 .forth table").append(tbody1);
                $(".member_manage2 .forth tbody tr:odd").addClass("e9ecf1");
            },
            error: function(data) {},
            async: true
        });
    }

    //用户右边点击获取
    $(document).on("click", ".member_manage2 .third .paging .page_right .more", function() {
        var moreNum = $(".member_manage2 .third .paging .page_right .total_num").text();
        var lessNum = $(".member_manage2 .third .paging .page_right .number").text();
        if(moreNum <= lessNum) {
            toast("已经是最后一页了");
        } else {
            lessNum++;
            $(".member_manage2 .third .paging .page_right .number").text(lessNum);
            var time1 = $("#admin_three").val();
            var time2 = $("#admin_four").val();
            var time = time1 + ',' + time2;
            var size = $(".member_manage2 .third .pagenum input").val();
            console.log(time1, time2, size, lessNum);
            onLineajax(size, lessNum, time);
        }
    })
    //用户左边点击获取
    $(document).on("click", ".member_manage2 .third .paging .page_right .less", function() {
        var moreNum = $(".member_manage2 .third .paging .page_right .total_num").text();
        var lessNum = $(".member_manage2 .third .paging .page_right .number").text();
        if(lessNum == 1) {
            toast("已经是第一页了");
        } else {
            lessNum--;
            $(".member_manage2 .third .paging .page_right .number").text(lessNum);
            var time1 = $("#admin_three").val();
            var time2 = $("#admin_four").val();
            var time = time1 + ',' + time2;
            var size = $(".member_manage2 .third .pagenum input").val();
            console.log(time1, time2, size, lessNum);
            onLineajax(size, lessNum, time);
        }
    })
    //用户页数点击时完成
    $(".member_manage2 .third .pagenum select").on("change", function() {
        var size = $(this).siblings("input").val();
        console.log(size)
        var time1 = $("#admin_three").val();
        var time2 = $("#admin_four").val();
        var time = time1 + ',' + time2;
        onLineajax(size, 1, time);
    })

    //历史用户右边点击获取
    $(document).on("click", ".member_manage2 .forth .paging .page_right .more", function() {
        var moreNum = $(".member_manage2 .forth .paging .page_right .total_num").text();
        var lessNum = $(".member_manage2 .forth .paging .page_right .number").text();
        if(moreNum <= lessNum) {
            toast("已经是最后一页了");
        } else {
            lessNum++;
            $(".member_manage2 .fotrh .paging .page_right .number").text(lessNum);
            var time1 = $("#admin_three").val();
            var time2 = $("#admin_four").val();
            var time = time1 + ',' + time2;
            var size = $(".member_manage2 .forth .pagenum input").val();
            console.log(time1, time2, size, lessNum);
            histroyAjax(size, lessNum, time);
        }
    })
    //历史用户左边点击获取
    $(document).on("click", ".member_manage2 .forth .paging .page_right .less", function() {
        var moreNum = $(".member_manage2 .forth .paging .page_right .total_num").text();
        var lessNum = $(".member_manage2 .forth .paging .page_right .number").text();
        if(lessNum == 1) {
            toast("已经是第一页了");
        } else {
            lessNum--;
            $(".member_manage2 .forth .paging .page_right .number").text(lessNum);
            var time1 = $("#admin_three").val();
            var time2 = $("#admin_four").val();
            var time = time1 + ',' + time2;
            var size = $(".member_manage2 .third .pagenum input").val();
            console.log(time1, time2, size, lessNum);
            histroyAjax(size, lessNum, time);
        }
    })
    //用户页数点击时完成
    $(".member_manage2 .forth .pagenum select").on("change", function() {
        var size = $(this).siblings("input").val();
        console.log(size)
        var time1 = $("#admin_three").val();
        var time2 = $("#admin_four").val();
        var time = time1 + ',' + time2;
        histroyAjax(size, 1, time);
    })

    //管理页面选人=============
    //工种选人
    workAjax();

    function workAjax() {
        $.ajax({
            type: "get",
            url: "/api/staff/work_staffs/",
            dataType: 'json',
            data: {},
            success: function(data) {
                var datas = data;
                $(".now_item .now_item_cnt .jobstyle").remove();
                var tbody1 = "";

                function tbodyOne2(datas) {
                    for(var i = 0; i < data.length; i++) {
                        tbody1 += '<div class="jobstyle">';
                        tbody1 += '	<div class="job">';
                        tbody1 += '		<i><img src="/Public/Home/images/icon_checked.png" alt="" /></i>';
                        tbody1 += '		<span data-id="' + data[i].type_id + '">' + data[i].type_name + "工种" + '</span>';
                        tbody1 += '		<s><img src="/Public/Home/images/arrow_bottom.png"/></s>';
                        tbody1 += '	</div>';
                        tbody1 += '	<ul class="worker">';
                        for(var j = 0; j < data[i].staffs.length; j++) {
                            tbody1 += '	<li data-id="' + data[i].staffs[j].sid + '">';
                            tbody1 += '		<i><img src="/Public/Home/images/icon_checked.png" alt="" /></i>';
                            tbody1 += '		<span data-id="' + data[i].staffs[j].sid + '">' + data[i].staffs[j].name + '</span>';
                            tbody1 += '	</li>';
                        }
                        tbody1 += '	</ul>';
                        tbody1 += '</div>';
                    }
                    return tbody1;
                }
                tbodyOne2(datas);
                $(".now_item .now_item_cnt").append(tbody1);
            },
            error: function(data) {},
            async: true
        });
    }

    histroy();

    function histroy() {
        $.ajax({
            type: "get",
            url: "/api/staff/get_project_team",
            dataType: 'json',
            data: {},
            success: function(data) {
                console.log(data);
                var str = '';
                for(var i = 0; i < data.length; i++) {
                    str += '<div class="jobstyle">';
                    str += '	<div class="job">';
                    str += '		<i><img src="/Public/Home/images/icon_checked.png" alt="" /></i>';
                    str += '		<span>' + data[i].name + '</span>';
                    str += '		<s><img src="/Public/Home/images/arrow_bottom.png"/></s>';
                    str += '	</div>';
                    str += '	<ul class="worker">';
                    for(var j = 0; j < data[i].workers.length; j++) {
                        str += '	<li>';
                        str += '		<i><img src="/Public/Home/images/icon_checked.png" alt="" /></i>';
                        str += '		<span data-id="' + data[i].workers[j].staff_id + '">' + data[i].workers[j].real_name + '</span>';
                        str += '	</li>';
                    }
                    str += '	</ul>';
                    str += '</div>';
                }
                $('.subitem_choose_bottom .history_item').html(str);
            },
            error: function(data) {},
            async: true
        });
    }
    all();

    function all() {
        $.ajax({
            type: "get",
            url: "/api/staff/get_all_staff",
            dataType: 'json',
            data: {},
            success: function(data) {
                console.log(data);
                var str = '';
                for(var i = 0; i < data.length; i++) {
                    str += '<li>';
                    str += '	<i><img src="/Public/Home/images/icon_checked.png" alt="" /></i>';
                    str += '	<span data-id="' + data[i].staff_id + '">' + data[i].real_name + '</span>';
                    str += '</li>';
                }
                $('.subitem_choose_bottom .all_item ul').html(str);
            },
            error: function(data) {},
            async: true
        });
    }
    choose();

    function choose() {
        $(document).on("click", ".addMember .choose", function() {
            $(".addMember").hide();
            $(".subitem_choose").show();
            var html = "";
            html += '<div class="work_style"><ul class="clearfix"></ul></div>';
            $(".item_right_ctn").append(html);
        })
        //选人
        $(document).on('click', '.subitem_choose_bottom .item_name li', function() {
            $(this).addClass("active").siblings().removeClass("active");
            var index = $(this).index();
            $(".subitem_choose_bottom .admin").hide();
            $(".subitem_choose_bottom .admin").eq(index).show();
        })
        $(document).on("click", ".subitem_choose .admin li i", function() {
            var length = $(".item_right_ctn ul li").length;
            if(length == 0) {
                $(this).parents("li").addClass("active")
                var txt = $(this).siblings("span").text();
                var id = $(this).parents('li').attr('data-id');
                var lis = '<li><img src="/Public/Home/images/icon_del.png"/><span data-id="' + id + '">' + txt + '</span></li>';
                $(".item_right_ctn ul").append(lis);
            }
        });
        $(document).on("click", ".subitem_choose .admin .jobstyle .job", function() {
            var display = $(this).siblings(".worker").css("display");
            $(this).siblings(".worker").slideToggle();
            var src = "/Public/Home/images/arrow_bottom.png";
            var src1 = "/Public/Home/images/arrow_top.png"
            if(display == "none") {
                $(this).find("s>img").attr("src", src1);
            } else {
                $(this).find("s>img").attr("src", src);
            }
        });
        $(document).on("click", ".subitem_choose .admin li.active i", function() {
            $(this).parents("li").removeClass("active");
            $(".item_right_ctn ul li").remove();
        });
        $(document).on("click", ".item_right_ctn ul li img", function() {
            $(".item_right_ctn ul li").remove();
            $(".subitem_choose_bottom .admin ul li").removeClass("active");
        });
        $(document).on("click", "#jobbtn", function() {
            var txt = $(".item_right_ctn ul li span").text();
            console.log(txt);
            $(".addMember").show();
            $(".subitem_choose").hide();
            $(".item_right_ctn ul li").remove();
            $(".admin li").removeClass("active");
            $(".item_right_ctn .work_style").remove();
            $("#name_pick").val(txt);
        })
    }
})