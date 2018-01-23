$(function() {
	var token = localStorage.getItem("token");
	//tab栏切换
	$(".tab .tab_left li").on("click", function() {
		$(this).addClass("active").siblings().removeClass("active")
	})
	$(".tab .tab_left li").eq(0).on("click", function() {
		$(".content_detail .item_content").show();
		$(".content_detail .staff_content").hide();
		$(".content_detail .perf_content").hide();
	})
	$(".tab .tab_left li").eq(1).on("click", function() {
		$(".content_detail .item_content").hide();
		$(".content_detail .staff_content").show();
		$(".content_detail .perf_content").hide();
	})
	$(".tab .tab_left li").eq(2).on("click", function() {
		$(".content_detail .item_content").hide();
		$(".content_detail .staff_content").hide();
		$(".content_detail .perf_content").show();
	})
	//绩效弹窗
	//$(".perf_content table .handle span").on("click", function() {
	$(document).on("click", ".perf_content table .handle span", function() {

		$("#boxPock").show();
		$(".perf_detail").show();
        var user_id = $(this).attr("data-uid");
        var from = $("#five").val();
        var to = $("#six").val();
        perfDetail(user_id,from,to);
	})
	//绩效弹窗关闭
	$("#boxPock .perf_detail i").on("click", function() {
		$("#boxPock").hide();
		$(".perf_detail").hide();
	})
	//点击确定绩效弹窗关闭
	$("#boxPock .perf_detail button").on("click", function() {
		$("#boxPock").hide();
		$(".perf_detail").hide();
	})
	//select选中
	$("select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	})
	/*汇总排序*/
	var sortNum;
	$(".perf_content .sort").on("click", function() {
		sortNum = 1;
		var num = $(this).attr("data-id");
		var txtName = $("#query_key_b").val();
		var from = $("#five").val();
		var to = $("#six").val();
		if(num == 0) {
			$(this).attr("data-id", 1)
			perf(1,1,name = '',from,to);
		} else{
			$(this).attr("data-id", 2)
			perf(1,2,name = '',from,to);
		}
		if (num == 2){
			$(this).attr("data-id", 1)
			perf(1,1,name = '',from,to);
		}

	})

    /*人才绩效时间区间搜索*/
    $(".search.jixiao").on("click",function () {
        var from = $("#five").val();
        var to = $("#six").val();
        perf(1,amount = '',name = '',from,to)
    })
	/*人才绩效*/
	perf(1)

	function perf(p, amount, name,from,to) {
		if(from){
			var start = from;
		}
		if (to){
			var end = to;
		}
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Commission/performanceListV2",
			dataType: 'json',
			data: {
				p: p,
				amount: amount,
				name: name,
				start: start,
				end: end
			},
			headers: {
				accept: "usertoken:" + token,
			},
			success: function(data) {
				if(data.status == 1) {
					console.log(data);
					var str = "";
					var datas = data.data.list;
					for(var i = 0; i < datas.length; i++) {
						str += '<tr>';
						str += '	<td>' + (i + 1) + '</td>';
						str += '	<td>' + datas[i].nickname + '</td>';
						str += '	<td>' + datas[i].project_num + '</td>';
						str += '	<td>' + datas[i].amount + '</td>';
						str +='<td class="handle">' +
                            '<span class="detail check_men" data-uid="' + datas[i].user_id + '">详情</span>' +
                            '</td>'
						str += '</tr>';
					}
					$(".perf_content .page_left span").text(data.data.count);
					$(".perf_content .page_right .total_num").text(data.data.totalPage);
					$('.perf_content tbody').html(str);
				} else {
					toast(data.msg)
				}

			},
			error: function(data) {},
			async: true
		});
	}

	/*绩效详情*/
     function perfDetail(user_id,from,to) {
		var user_id = user_id;
        var token = localStorage.getItem("token");
        $.ajax({
            type: "GET",
            headers: {
                accept: "usertoken:" + token
            },
            url: host_host_host + "/index.php/Home/Commission/performanceDetail",
            dataType: 'json',
			data:{
            	user_id :user_id,
				start_time : from,
				end_time : to
            },
            success: function(data) {
                if(data.status == 1) { //success
                    //					console.log(1);
                    //					console.log(data.msg);
                    //					console.log(data.data);
                    rendMenScores(data.data);
                }
            }

        })
    }

    var rendMenScores = function(data) {
        //		console.log("scores:" + JSON.stringify(data));
        var list = data.list;
        var info = data.project_info;
        $(".perf_detail .n1 input").val(info.user_name);
        $(".perf_detail .n2 input").val(info.p_count);
        $(".perf_detail .n3 input").val(info.jiti_count);
        $(".perf_detail .n5 input").val(info.total_commission);

        $("#scors_list").html("");
        for(var i in list) {
            var o = list[i];
            var item = $(
                '<div class="job_logging_title">' +
                '<span>时间阶段：</span><span>' + o.start_time + '—' + o.end_time + '</span>' +
                '</div>' +
                '<div class="logging_detail clearfix">' +
                '<div class="logging_head clearfix">' +
                '<div class="left clearfix">' +
                '<span>项目名称：</span>' +
                '<input type="text" value="' + o.project_name + '" id="info_user_name"  disabled="disabled" />' +
                '</div>' +
                '<div class="right clearfix">' +
                '<span>工种参与：</span>' +
                '<input type="text" value="' + o.work_name + '" id="info_user_name"  disabled="disabled" />' +
                '</div>' +
                '<div class="left clearfix">' +
                '<span>计提比例：</span>' +
                '<input type="text" value="' + o.commission_rate + '" id="info_user_name"  disabled="disabled" />' +
                '</div>' +
                '<div class="right clearfix group">' +
                '<span>计提数额：</span>' +
                '<input type="text" value="' + o.commission_money + '" id="info_user_name"  disabled="disabled" />' +
                '</div>' +
                '</div>' +
                '<div class="logging_bottom">' +
                '<div class="job_logging_header">工作内容</div>' +
                '<textarea name="" value="' + o.content + '" rows="" cols="" placeholder="暂无" disabled="disabled">' + o.content + '</textarea>' +
                '</div>' +
                '</div>'
            )
            $("#scors_list").append(item);
        }
    }
	/*页数增加*/
	$(document).on("click", ".perf_content .page_right .more", function() {
		var total_num = Number($(".perf_content .page_right .total_num").text());
		var num = Number($(".perf_content .page_right .number").text());
		var txtName = $("#query_key_b").val();
		var s_num = $(".perf_content .sort").attr("data-id");
		if(num >= total_num) {
			toast("已经是最后一页了")
		} else {
			num++;
			$(".perf_content .page_right .number").text(num);
			perf(num, s_num, txtName)
		}
	})
	/*页数减少*/
	$(document).on("click", ".perf_content .page_right .less", function() {
		var num = Number($(".perf_content .page_right .number").text());
		var txtName = $("#query_key_b").val();
		var s_num = $(".perf_content .sort").attr("data-id");
		if(num == 1) {
			toast("已经是第一页了")
		} else {
			num--;
			$(".perf_content .page_right .number").text(num);
			perf(num, s_num, txtName)
		}
	})
	/*已读通知跳页*/
	$(document).on("click", ".perf_content .paging .jump .go", function() {
		var jump_num = Number($(this).siblings(".jump_page").val());
		var txtName = $("#query_key_b").val();
		var s_num = $(".perf_content .sort").attr("data-id");
		if(jump_num > 0) {
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
			perf(jump_num, s_num, txtName)
		} else {
			toast("请输入正常页码")
		}
	})
	$(".go.men").on("click", function() {
		var jump_num = Number($(this).siblings(".jump_page").val());
		var s_num = $(".perf_content .sort").attr("data-id");
		var txtName = $("#query_key_b").val();
		if(jump_num > 0) {

			g_pageCurD = jump_num;
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
			perf(jump_num, s_num, txtName)

			$("cu_men").html(jump_num);
		} else {
			toast("请输入正常页码")
		}

	})
	/*点击项目搜索*/
	$(".perf_content .staff_search a").on("click", function() {
		var txtName = $("#query_key_b").val();
		var s_num = $(".perf_content .sort").attr("data-id");
		perf(1, s_num, txtName);
		$(".perf_content .page_right .number").text(1);
	})
	$(document).on("keyup", "#query_key_b", function() {
		var txtName = $("#query_key_b").val();
		var s_num = $(".perf_content .sort").attr("data-id");
		perf(1, s_num, txtName);
		$(".perf_content .page_right .number").text(1);
	})
})