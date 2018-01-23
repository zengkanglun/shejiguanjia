$(function() {
	//用户任务管理 e_id:：渲染元素id
	var rendTListParam = function(data, e_id) {
		$(e_id).html("");
		for(var i in data) {
			var tsk = data[i];
			var item = $('<tr>' +
				'<td>' + (parseInt(i) + 1) + '</td>' +
				'<td>' + tsk.nickname + '</td>' +
				'<td>' + tsk.owner + '</td>' +
				'<td>' + tsk.new + '</td>' +
				'<td class=" "> ' + tsk.doing + ' </td>' +
				'<td class="handle">' +
				'<span class="detail"  data-id="' + tsk.id + '">详情</span>' +

				'</td>' +
				'</tr>');
			$(e_id).append(item);

		}
		$(e_id + " .detail").on("click", function() {
			//			console.log("detail")
			//viewP($(this).data("id"));
		});
		$(e_id + " .edit").on("click", function() {
			//			console.log("edit")
			editP($(this).data("id"));
		});
		$(e_id + " .jour").on("click", function() {
			//			console.log("jour")
		});
		$(".delete").on("click", function() {
			//			console.log("delete")
			deleteP($(this).data("id"));
			//			console.log($(this).data("id"))
		});
		$(e_id + " .cover").on("click", function() {
			deletePCover($(this).data("id"));
			//			console.log("jour")
		});

	}

	var total_num_norT = 0; //用户任务总数
	var total_num_norD = 0; //普通shan用户总数

	//获取用户任务
	var getPCcList = function() {

		var token = localStorage.getItem("token");
		$.ajax({
			type: "get",
			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + "/index.php/Home/task/users_task",
			dataType: 'json',

			success: function(data) {
				if(data.status == 1) { //success
					//					console.log(1);
					//					console.log(data.msg);
					//					console.log(data.data);
					$("#total_a").html(data.data.count);
					$(".total_num.a").html(data.data.page);
					rendTListParam(data.data.data, "#task_list_ee");
					total_num_norT = parseInt(data.data.page);
				} else {
					//					console.log(data.msg + 5 + data.data)
				}
			},
			error: function(data) {
				//				console.log(0)
			},
			async: true
		});

	}

	getPCcList(); //

	/*****翻页 用户任务*****/

	//翻页
	var getPageParamT = function(page, frome, to, title) {
		//();
		var bundle = {};
		if(page)
			bundle.p = page;
		if(frome)
			bundle.start_time = frome;
		if(to)
			bundle.end_time = to;
		if(title)
			bundle.name = title;
		var token = localStorage.getItem("token");
		$.ajax({
			type: "get",
			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + "/index.php/Home/task/users_task",
			dataType: 'json',
			data: bundle,
			success: function(data) {
				if(data.status == 1) {
					$("#total_a").html(data.data.count);
					$(".total_num.a").html(data.data.page);
					rendTListParam(data.data.data, "#task_list_ee");
					 
					total_num_norT = parseInt(data.data.page);
					
				} else {

				}
			},
			error: function(data) {},
			async: true
		});

	}

	var g_pageCur = 1;
	var g_pageCurT = 1;
	//上一页
	$("#prev_t").on("click", function() {
		g_pageCurT--;
		//getPrevPage();
		if(g_pageCurT < 1)
			g_pageCurT = 1;
		$(".number.a").html(g_pageCurT);
		var key = $("#query_key_a").val();
		var date_f = $("#three").val();
		var date_t = $("#four").val();
		getPageParamT(g_pageCurT, date_f, date_t, key);
	})
	//下一页
	$("#after_t").on("click", function() {
		g_pageCurT++;
		//getNextPage();
		if(g_pageCurT > total_num_norT)
			g_pageCurT--;
		//getPageParamT(g_pageCurT);

		$(".number.a").html(g_pageCurT);
		var key = $("#query_key_a").val();
		var date_f = $("#three").val();
		var date_t = $("#four").val();
		getPageParamT(g_pageCurT, date_f, date_t, key);
	})

	//task任务
	$(".search.a").on("click", function() {
		g_pageCurT = 1;
		$(".number.a").html(g_pageCurT);
		var key = $("#query_key_a").val();
		var date_f = $("#three").val();
		var date_t = $("#four").val();
		getPageParamT(g_pageCurT, date_f, date_t, key);

	})

	$(".go.a").on("click", function() {
		var key = $("#query_key_a").val();
		var jump_num = Number($(this).siblings(".jump_page").val());
		if(jump_num > 0) {
			g_pageCurT = jump_num;
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
			getPageParamT(g_pageCurT, $("#three").val(), $("#four").val(), key);
			$(".number.a").html(g_pageCurT);
		} else {
			toast("请输入正常页码")
		}

	})

	//key查询
	$("#query_a").on("click", function() {

		g_pageCurT = 1;
		$(".number.a").html(g_pageCurT);
		var key = $("#query_key_a").val();
		getPageParamT(g_pageCurT, $("#three").val(), $("#four").val(), key)

	})

	//******************//
	//项目管理 e_id:：渲染元素id
	var rendPRListParam = function(data, e_id, type) {
		$(e_id).html("");
		for(var i in data) {
			var tsk = data[i];
			var et = "";
			if(tsk.edit == 0 && tsk.status != 0)
				et = '<span class="check"  data-id="' + tsk.id + '">查看</span>';
			else
				et = '<span class="edit"  data-id="' + tsk.id + '">编辑</span><span class="check"  data-id="' + tsk.id + '">查看</span>';

			var item = $('<tr>' +
				'<td>' + (parseInt(i) + 1) + '</td>' +
				'<td style="cursor:pointer ;" class="check" data-id=" '+ tsk.id + '">' + tsk.name + '</td>' +
				'<td>' + tsk.build_name + '</td>' +
				'<td>' + tsk.province + '</td>' +
				'<td>' + tsk.build + '</td>' +
				'<td>' + tsk.nickname + '</td>' +
				'<td class=" "> ' + tsk.project_time + ' </td>' +
				'<td class="handle">' +
				/*'<span class="edit"  data-id="' + tsk.id + '">编辑</span>' +
				'<span class="check"  data-id="' + tsk.id + '">查看</span>' +*/
				et +
				'</td>' +
				'</tr>');
			$(e_id).append(item)

		}
	}

	//获取项目信息总揽
	var getPRcListParam = function(page, frome, to, type) {
		var bundle = {};
		//if(page)
		//	bundle.p = page;
		bundle.p1 = g_curpag_a;
		bundle.p2 = g_curpag_b;
		bundle.p3 = g_curpag_c;
		if(frome)
			bundle.go_time = frome;
		if(to)
			bundle.end_time = to;

		var token = localStorage.getItem("token");
		$.ajax({
			type: "POST",
			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + "/Home/project/project_list",
			dataType: 'json',
			data: bundle,
			success: function(data) {
				if(data.status == 1) { //success

					//if(type==1)
					rendPRListParam(data.data.get_on, "#go_list_aa", type);
					//if(type==2)
					rendPRListParam(data.data.end, "#go_list_bb", type);
					//if(type==3)			
					rendPRListParam(data.data.Interrupted, "#go_list_cc", type);

					//更新页脚
					var pages = data.data.page; //
					var counts = data.data.count; //

					$("#count_aa").html(counts[0]);
					$(".total_num.aa").html(pages[0]);
					g_pages_a = pages[0];

					$("#count_bb").html(counts[1]);
					$(".total_num.bb").html(pages[1]);
					g_pages_b = pages[1];

					$("#count_cc").html(counts[2]);
					$(".total_num.cc").html(pages[2]);
					g_pages_c = pages[2];
					total_num_cc = parseInt(data.data.page);
				} else {
					//					console.log(data.msg + 5 + data.data)
				}
			},
			error: function(data) {
				//				console.log(0)
			},
			async: true
		});

	}

	var g_curpag_a = 1; //当前浏览页数
	var g_pages_a = 1; //总页数
	var g_curpag_b = 1;
	var g_pages_b = 1; //总页数
	var g_curpag_c = 1;
	var g_pages_c = 1; //总页数

	$(".pr_aa").on("click", function() {
		g_curpag_a -= 1;
		if(g_curpag_a < 1)
			g_curpag_a = 1;
		refresh();
	})
	$(".af_aa").on("click", function() {
		g_curpag_a += 1;
		if(g_curpag_a > g_pages_a)
			g_curpag_a -= 1;
		refresh();
	})
	$(".pr_bb").on("click", function() {
		g_curpag_b -= 1;
		if(g_curpag_b < 1)
			g_curpag_b = 1;
		refresh();
	})
	$(".af_bb").on("click", function() {
		g_curpag_b += 1;
		if(g_curpag_b > g_pages_b)
			g_curpag_b -= 1;
		refresh();
	})
	$(".pr_cc").on("click", function() {
		g_curpag_c -= 1;
		if(g_curpag_c < 1)
			g_curpag_c = 1;
		refresh();
	})
	$(".af_cc").on("click", function() {
		g_curpag_c += 1;
		if(g_curpag_c > g_pages_c)
			g_curpag_c -= 1;
		refresh();
	})

	//

	$(".go.aa").on("click", function() {

		var jump_num = Number($(this).siblings(".jump_page").val());
		if(jump_num > 0) {
			g_curpag_a = jump_num;
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
			refresh();
		} else {
			toast("请输入正常页码")
		}

	})
	$(".go.bb").on("click", function() {

		var jump_num = Number($(this).siblings(".jump_page").val());
		if(jump_num > 0) {
			g_curpag_b = jump_num;
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
			refresh();
		} else {
			toast("请输入正常页码")
		}

	})
	$(".go.cc").on("click", function() {

		var jump_num = Number($(this).siblings(".jump_page").val());
		if(jump_num > 0) {
			g_curpag_c = jump_num;
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
			refresh();
		} else {
			toast("请输入正常页码")
		}

	})

	var refresh = function() {
		getPRcListParam(undefined, $("#one").val(), $("#two").val(), undefined);
		$(".cu_a").html(g_curpag_a);
		$(".cu_b").html(g_curpag_b);
		$(".cu_c").html(g_curpag_c);

	}

	$(".search.c").on("click", function() {
		g_curpag_a = 1;
		g_curpag_b = 1;
		g_curpag_c = 1;
		var fr = $("#one").val();
		var to = $("#two").val();
		getPRcListParam(1, fr, to, 1);
		$(".cu_a").html(g_curpag_a);
		$(".cu_b").html(g_curpag_b);
		$(".cu_c").html(g_curpag_c);
	})

	getPRcListParam(1, undefined, undefined, 1); //
	//getPRcListParam(1,undefined,undefined,2);//
	//getPRcListParam(1,undefined,undefined,3);//

	//******************//
	var rendMenScores = function(data) {
		//		console.log("scores:" + JSON.stringify(data));
		var list = data.list;
		var info = data.project_info;
		$(".perf_detail .n1 input").val(info.user_name);
		$(".perf_detail .n2 input").val(info.project_name);
		$(".perf_detail .n3 input").val(info.supervisor_name);
		$(".perf_detail .n4 input").val(info.total_commission);
		$(".perf_detail .n5 input").val(info.total_commission);

		$("#scors_list").html("");
		for(var i in list) {
			var o = list[i];
			var item = $(
				'<div class="job_logging_title">' +
				'<span>时间阶段：</span><span>2017.07.09-2017.09.36</span>' +
				'</div>' +
				'<div class="logging_detail clearfix">' +
				'<div class="logging_head clearfix">' +
				'<div class="left clearfix">' +
				'<span>工种参与：</span>' +
				'<input type="text" value="' + o.work_name + '" id="info_user_name" placeholder="输入内容" disabled="disabled" />' +
				'</div>' +
				'<div class="right clearfix">' +
				'<span>分工情况：</span>' +
				'<input type="text" value="' + o.labor + '" id="info_user_name" placeholder="输入内容" disabled="disabled" />' +
				'</div>' +
				'<div class="left clearfix">' +
				'<span>计提占比：</span>' +
				'<input type="text" value="' + o.commission_rate + '" id="info_user_name" placeholder="输入内容" disabled="disabled" />' +
				'</div>' +
				'<div class="right clearfix group">' +
				'<span>计提数额：</span>' +
				'<input type="text" value="' + o.commission_money + '" id="info_user_name" placeholder="建筑" disabled="disabled" />' +
				'</div>' +
				'</div>' +
				'<div class="logging_bottom">' +
				'<div class="job_logging_header">工作内容</div>' +
				'<textarea name="" value="' + o.content + '" rows="" cols="" placeholder="请输入内容" disabled="disabled">' + o.content + '</textarea>' +
				'</div>' +
				'</div>'
			)
			$("#scors_list").append(item);
		}
	}
	//绩效详情
	var getMenScores = function(uid, pid) {
		var bundle = {};
		bundle.project_id = pid;
		bundle.user_id = uid;

		var token = localStorage.getItem("token");
		$.ajax({
			type: "GET",
			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + "/index.php/Home/Commission/performanceDetail",
			dataType: 'json',
			data: bundle,
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

	//人才绩效 e_id:：渲染元素id
	var rendPmenListParam = function(data, e_id, type) {
		$(e_id).html("");
		console.log(data);
		for(var i in data) {
			var tsk = data[i];
			var item = $('<tr>' +
				'<td>' + (parseInt(i) + 1) + '</td>' +
				'<td>' + tsk.username + '</td>' +
				'<td>' + tsk.project_name + '</td>' +
				'<td>' + tsk.labor + '</td>' +
				'<td>' + tsk.amount + '</td>' +
				'<td>' + tsk.project_time + '</td>' +

				'<td class="handle">' +

				'<span class="detail check_men"  data-uid="' + tsk.user_id + '"  data-pid="' + tsk.project_id + '">详情</span>' +

				'</td>' +
				'</tr>');
			$(e_id).append(item);

		}
		$(e_id).on("click", ".check_men", function() {
			//$(".perf_detail").
			var uid = $(this).data("uid");
			var pid = $(this).data("pid");
			//http://shejiguanjia.app/Home/Commission/performanceDetail
			getMenScores(uid, pid);
		})
	}

	//人才绩效总揽
	var getPmenListParam = function(page, frome, to, type, key) {
		var bundle = {};
		//if(page)
		//	bundle.p = page;
		bundle.page = g_curpag_men;

		if(frome)
			bundle.start_time = frome;
		if(to)
			bundle.end_time = to;
		if(key)
			bundle.name = key;
		var token = localStorage.getItem("token");
		$.ajax({
			type: "GET",
			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + "/index.php/Home/Commission/performanceList",
			dataType: 'json',
			data: bundle,
			success: function(data) {
				console.log(data);
				if(data.status == 1) { //success
					//					console.log(1);
					//					console.log(data.msg);
					//					console.log(data.data);

					rendPmenListParam(data.data.list, "#go_list_men", type);

					//更新页脚
					var pages = data.data.page; //
					var counts = data.data.count; //

					$("#count_men").html(data.data.count);
					$(".total_num.men").html(data.data.totalPage);
					g_pages_men = data.data.page;

					g_pages_men = parseInt(data.data.totalPage);
				} else {
					//					console.log(data.msg + 5 + data.data)
				}
			},
			error: function(data) {
				//				console.log(0)
			},
			async: true
		});

	}

	var g_curpag_men = 1; //当前浏览页数
	var g_pages_men = 1; //总页数

	//	$(".pr_men").on("click", function() {
	//		g_curpag_men -= 1;
	//		if(g_curpag_men < 1)
	//			g_curpag_men = 1;
	//		refresh();
	//	})
	//	$(".af_men").on("click", function() {
	//		g_curpag_men += 1;
	//		if(g_curpag_men > g_pages_men)
	//			g_curpag_men -= 1;
	//		refreshmen();
	//	})

	var refreshmen = function() {
		///getPmenListParam();
		$(".cu_men").html(g_curpag_men);

	}

	$(".search.c").on("click", function() {
		var fr = $("#five").val();
		var to = $("#six").val();
		///getPmenListParam(1, fr, to, 1);
	})

	//key查询
	$("#query_b").on("click", function() {
		var key = $("#query_key_b").val();
		///getPmenListParam(g_curpag_men, undefined, undefined, 1, key);
		//getPmenListParam(g_curpag_men, "undefined", "undefined", 1, key);

	})
	///getPmenListParam(1, undefined, undefined, 1); //

	/*页面跳转*/
	$(document).on("click", ".item_content tbody .edit", function() {
		var project_id = $(this).attr("data-id");
		localStorage.setItem("project_id", project_id);
		setTimeout(function() {
			location.href = "item_edit.html";
		}, 1000)
	})
	$(document).on("click", ".item_content tbody .check", function() {
		var project_id = $(this).attr("data-id");
		localStorage.setItem("project_id", project_id);
		setTimeout(function() {
			//			location.href = "index.html?project_id=" + project_id;
			location.href = "index.html"
		}, 1000)
	})
	/*员工任务*/
	$(document).on("click", ".staff_content tbody .detail", function() {
		var uid = $(this).attr("data-id");
		localStorage.setItem("uid", uid);
		setTimeout(function() {
			location.href = "task_detail.html";
		}, 500)
	})

})

/*导出表格*/

var getExportParam = function(api) {
	var token = localStorage.getItem("token");
	location.href = host_host_host + api;
	$.ajax({
		type: "get",
		url: host_host_host + "/index.php/Home/Admin/managers_export",
		dataType: 'json',
		headers: {
			accept: "usertoken:" + token,
		},
		data: {

		},
		success: function(data) {
			toast(data.msg);
			if(data.status == 1) { //success

			} else {

			}
		},
		error: function(data) {
			//				console.log(0)
		},
		async: true
	});

}

//导出表格
$("#btn-export").on("click", function() {
	var type = $("#btn-export").data("type");
	var api = "";
	if(type == "0")
		api = "";
	else if(type == "1")
		api = "/home/task/export_task";
	else if(type == "2")
		api = "";

	getExportParam(api);

})

//tab栏切换
$(".tab .tab_left li").on("click", function() {

})
$(".tab .tab_left li").eq(0).on("click", function() {
	$("#btn-export").data("type", "0");
})
$(".tab .tab_left li").eq(1).on("click", function() {
	$("#btn-export").data("type", "1");

})
$(".tab .tab_left li").eq(2).on("click", function() {
	$("#btn-export").data("type", "2");

})