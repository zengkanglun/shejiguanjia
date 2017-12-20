//通知
var renderN = function(data) {
	//

	$("#view_detail_notice #user_id").val(data.user_id);
	$("#view_detail_notice #title").val(data.title);
	$("#view_detail_notice #content").val(data.content);
	$("#view_detail_notice #type").val(data.type);
	$("#view_detail_notice #project_id").val(data.project_id);

	//
	$("#to_userwwb").html(data.user_id);
	$("#replywwb").html(data.reply);
	$("#addtimewwb").html(data.addtime);

}

$("#view_detail_notice .download").on("click", function() {

	var id = $(this).data("id");
	var type = 2;
	var op = host_host_host + "/index.php/Home/admin/download?id=" + id + "type=" + type;
	window.open(op);
	window.open(host_host_host + "/index.php/Home/admin/download?id=" + id + "type=" + type);
	var token = localStorage.getItem("token");
	$.ajax({
		type: "GET",
		headers: {
			accept: "usertoken:" + token
		},
		url: host_host_host + "/index.php/Home/admin/download",
		dataType: 'json',
		data: {
			id: id,
			type: type
		},
		success: function(data) {
			if(data.status == 1) { //success
				console.log(1);
				console.log(data.msg);
				console.log("[download:::]" + JSON.stringify(data))

				//xiazai

			} else
				console.log(50 + JSON.stringify(data))
		},
		error: function(data) {
			console.log(0 + JSON.stringify(data))
		}
	})

})

$("#view_detail .download").on("click", function() {
	var id = $(this).data("id");
	var type = 1;
	var op = host_host_host + "/index.php/Home/admin/download?id=" + id + "type=" + type;
	window.open(op);
	window.open(host_host_host + "/index.php/Home/admin/download?id=" + id + "type=" + type);
	var token = localStorage.getItem("token");
	$.ajax({
		type: "GET",
		headers: {
			accept: "usertoken:" + token
		},
		url: host_host_host + "/index.php/Home/admin/download",
		dataType: 'json',
		data: {
			id: id,
			type: type
		},
		success: function(data) {
			if(data.status == 1) { //success
				console.log(1);
				console.log(data.msg);
				console.log("[download:::]" + JSON.stringify(data))

				//xiazai

			} else
				console.log(50 + JSON.stringify(data))
		},
		error: function(data) {
			console.log(0 + JSON.stringify(data))
		}
	})

})
//获取notice详细，并渲染
var viewN = function(uid) {

	var token = localStorage.getItem("token");
	$.ajax({
		type: "GET",
		headers: {
			accept: "usertoken:" + token
		},
		url: host_host_host + "/index.php/Home/Notice/info",
		dataType: 'json',
		data: {
			id: uid
		},
		success: function(data) {
			if(data.status == 1) { //success
				console.log(1);
				console.log(data.msg);
				console.log("[user:::]" + JSON.stringify(data))
				renderN(data.data);
				//xiazai
				$("#view_detail_notice .download").data("id", uid);
			} else
				console.log(50 + JSON.stringify(data))
		},
		error: function(data) {
			console.log(0 + JSON.stringify(data))
		}
	})
}

var renderT = function(data) {
	//

	$("#view_detail #to_user").val(data.to_user);
	$("#view_detail #title").val(data.title);
	$("#view_detail #content").val(data.content);
	$("#view_detail #type").val(data.type);
	$("#view_detail #project_id").val(data.project_id);
	$("#view_detail #start_time").val(data.start_time);

	//
	$("#to_userww").html(data.user_id);
	$("#replyww").html(data.reply);
	$("#addtimeww").html(data.update_at);

}

//获取task详细，并渲染
var viewT = function(uid) {

	var token = localStorage.getItem("token");
	$.ajax({
		type: "GET",
		headers: {
			accept: "usertoken:" + token
		},
		url: host_host_host + "/index.php/Home/Task/task_info",
		dataType: 'json',
		data: {
			id: uid
		},
		success: function(data) {
			if(data.status == 1) { //success
				console.log(1);
				console.log(data.msg);
				console.log("[user:::]" + JSON.stringify(data))
				renderT(data.data);
				//xiazai
				$("#view_detail .download").data("id", uid);
			} else
				console.log(50 + JSON.stringify(data))
		},
		error: function(data) {
			console.log(0 + JSON.stringify(data))
		}
	})
}

//删除通知
var deleteN = function(uid) {

	var token = localStorage.getItem("token");

	$.ajax({
		type: "GET",
		headers: {
			accept: "usertoken:" + token
		},
		url: host_host_host + "/index.php/Home/admin/del_notice",
		dataType: 'json',
		data: {
			id: uid
		},
		success: function(data) {
			if(data.status == 1) { //success
				console.log(1);
				toast(data.msg);
				setTimeout(function() {
					location.reload();
				},1000)
			} else
				console.log(50 + JSON.stringify(data))
		},
		error: function(data) {
			console.log(0 + JSON.stringify(data))
		}
	})
}

//渲染通知
var rendPNList = function(data) {
	$("#notice_list").html("");
	for(var i in data) {
		var log = data[i];
		var item = $('<tr>' +
			'<td class="choose notice"><span  data-id="' + log.id + '"><img src="img/backstage_checkbox_orange.png" alt="" /></span></td>' +
			'<td>' + (parseInt(i) + 1) + '</td>' +
			'<td>' + log.type + '</td>' +
			'<td>' + log.title + '</td>' +
			'<td>' + log.project + '</td>' +
			'<td>' + log.create_by + '</td>' +

			'<td>' + log.receiver + '</td>' +
			'<td class="handle"> ' + log.addtime + ' </td>' +
			'<td>' +
			'<div class="tableFirstRows">' +
			'<div data-num="1" class="detail" data-id="' + log.id + '">' +
			'<a href="###">详情</a>' +
			'</div>' +

			'<div data-num="2"  class="delete" data-id="' + log.id + '">' +
			'<a href="###">删除</a>' +
			'</div>' +
			'</div>' +
			'</td>' +
			'</tr>');
		$("#notice_list").append(item);

	}

	$("#notice_list .detail").on("click", function() {
		console.log("detail")
		//viewN(8);
		viewN($(this).data("id"));
	});

	$("#notice_list .delete").on("click", function() {
		console.log("del")
		deleteN($(this).data("id"));
		//alert($(this).data("id"))
	});
}

//删除任务
var deleteT = function(uid) {

	var token = localStorage.getItem("token");

	$.ajax({
		type: "GET",
		headers: {
			accept: "usertoken:" + token
		},
		url: host_host_host + "/index.php/Home/admin/del_task",
		dataType: 'json',
		data: {
			id: uid
		},
		success: function(data) {
			if(data.status == 1) { //success
				console.log(1);
				console.log(data.msg);

			} else
				console.log(50 + JSON.stringify(data))
		},
		error: function(data) {
			console.log(0 + JSON.stringify(data))
		}
	})
}

//渲染任务
var rendPTList = function(data) {
	$("#task_list").html("");
	for(var i in data) {
		var log = data[i];
		var item = $('<tr>' +
			'<td class="choose task"><span  data-id="' + log.id + '"><img src="img/backstage_checkbox_orange.png" alt="" /></span></td>' +
			'<td>' + (parseInt(i) + 1) + '</td>' +
			'<td>' + log.create_by + '</td>' +
			'<td>' + log.add_time + '</td>' +
			'<td>' + log.type + '</td>' +

			'<td>' + log.title + '</td>' +
			'<td class="handle"> ' + log.receiver + ' </td>' +
			'<td>' +
			'<div class="tableFirstRows">' +
			'<div data-num="1" class="detail" data-id="' + log.id + '">' +
			'<a href="###">详情</a>' +
			'</div>' +

			'<div data-num="2"  class="del" data-id="' + log.id + '">' +
			'<a href="###">删除</a>' +
			'</div>' +
			'</div>' +
			'</td>' +
			'</tr>');
		$("#task_list").append(item);

	}
	$("#task_list .detail").on("click", function() {
		console.log("detail")
		//viewT(5);
		viewT($(this).data("id"));
	});

	$("#task_list .del").on("click", function() {
		console.log("del")
		deleteT($(this).data("id"));
		//alert($(this).data("id"))
	});
}

var total_num_nor = 0;
//获取通知列表
var getPList = function(key) {


	var token = localStorage.getItem("token");
	$.ajax({
		type: "get",
		headers: {
			accept: "usertoken:" + token
		},
		url: host_host_host + "/index.php/Home/Admin/notice" + key,
		dataType: 'json',

		success: function(data) {
			if(data.status == 1) { //success
				console.log(1);

				console.log(data.msg);
				console.log(data.data);
				rendPNList(data.data.data);

				$(".total_num.a").html(data.data.page);
				$("#total_a").html(data.data.count);
				total_num_nor = parseInt(data.data.page);
			} else {
				console.log(data.msg + 5 + data.data)
			}
		},
		error: function(data) {
			console.log(0)
		},
		async: true
	});

}

var total_num_nor_task = 0;
//获取任务列表
var getPTList = function(key) {


	var token = localStorage.getItem("token");
	$.ajax({
		type: "get",
		url: host_host_host + "/index.php/Home/Admin/task" + key,
		dataType: 'json',
		headers: {
			accept: "usertoken:" + token
		},
		success: function(data) {
			if(data.status == 1) { //success
				console.log(1);

				console.log(data.msg);
				console.log(data.data);
				rendPTList(data.data.data);
				$(".total_num.b").html(data.data.page);
				$("#total_b").html(data.data.count);
				total_num_nor_task = parseInt(data.data.page);
			} else {
				console.log(data.msg + 5 + data.data)
			}
		},
		error: function(data) {
			console.log(0)
		},
		async: true
	});

}

getPList(""); //notice
getPTList(""); //task

//key查询
$("#query").on("click", function() {
	var key = $("#query_key").val();
	/*if(key!="")
		key="/"+key;
	console.log(key)*/
	//getPList(key);
	getPageParam(g_pageCur, undefined, undefined, key)

})

//任务 key查询
$("#query_task").on("click", function() {
	var key = $("#query_key_task").val();
	/*if(key!="")
		key="/"+key;
	console.log(key)*/
	//getPTList(key);
	getPageParamT(g_pageCur, undefined, undefined, key)
})

//时间段搜索
//通知 
$("#search_time").on("click", function() {
	var date_f = $("#notice_three").val();
	var date_t = $("#notice_four").val();
	getPageParam(g_pageCur, date_f, date_t);
})

//task任务
$("#search_time_task").on("click", function() {
	var date_f = $("#notice_one").val();
	var date_t = $("#notice_two").val();
	getPageParamT(g_pageCurT, date_f, date_t);

})
//翻页
var getPageParam = function(page, frome, to, title) {
	//();
	var bundle = {};
	if(page)
		bundle.p = page;
	if(frome)
		bundle.start_time = frome;
	if(to)
		bundle.end_time = to;
	if(title)
		bundle.title = title;
	var token = localStorage.getItem("token");
	$.ajax({
		type: "get",
		headers: {
			accept: "usertoken:" + token
		},
		url: host_host_host + "/index.php/Home/Admin/Notice",
		dataType: 'json',
		data: bundle, //{p:page},
		success: function(data) {
			if(data.status == 1) { //success
				console.log(1);
				console.log(data.msg);
				console.log(data.data);
				rendPNList(data.data.data);
			} else {
				console.log(data.msg + 5 + data.data)
			}
		},
		error: function(data) {
			console.log(0)
		},
		async: true
	});

}

var g_pageCur = 1;
//上一页
$("#prev").on("click", function() {
	g_pageCur--;
	//getPrevPage();
	if(g_pageCur < 1)
		g_pageCur = 1;
	getPageParam(g_pageCur);

	$(".number.a").html(g_pageCur);
})
//下一页
$("#after").on("click", function() {
	g_pageCur++;
	//getNextPage();
	if(g_pageCur > total_num_nor)
		g_pageCur--;
	getPageParam(g_pageCur);
	$(".number.a").html(g_pageCur);
})

////翻页
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
		bundle.title = title;
	var token = localStorage.getItem("token");
	$.ajax({
		type: "get",
		headers: {
			accept: "usertoken:" + token
		},
		url: host_host_host + "/index.php/Home/Admin/Task",
		dataType: 'json',
		data: bundle, //{p:page},
		success: function(data) {
			if(data.status == 1) { //success
				console.log(1);
				console.log(data.msg);
				console.log(data.data);
				rendPTList(data.data.data);
			} else {
				console.log(data.msg + 5 + data.data)
			}
		},
		error: function(data) {
			console.log(0)
		},
		async: true
	});

}

var g_pageCurT = 1;
//上一页
$("#prevT").on("click", function() {
	g_pageCurT--;
	//getPrevPage();
	if(g_pageCurT < 1)
		g_pageCurT = 1;
	getPageParamT(g_pageCurT);
	$(".number.b").html(g_pageCurT);

})
//下一页
$("#afterT").on("click", function() {
	g_pageCurT++;
	//getNextPage();
	if(g_pageCur > total_num_nor_task)
		g_pageCur--;
	getPageParamT(g_pageCurT);
	$(".number.b").html(g_pageCurT);

})

//批量删除
var noticeQueu = [];
var taskQueu = [];

//序号选中
$(document).on("click", ".third table .choose.notice span", function() {
	//$(this).toggleClass("active");
	//alert(4);
	//noticeQueu.push( $(this).data("id") );
	var d = $(this).data("id") + "";
	d = new String(d);
	var id = parseInt(d);
	var index = noticeQueu.indexOf(id);

	if(index == -1) {
		noticeQueu.push(id);
	} else {
		//noticeQueu = 
		noticeQueu.splice(index, 1);
	}
})

//序号选中
$(document).on("click", ".third table .choose.task span", function() {
	//$(this).toggleClass("active");
	//alert(4);
	var id = parseInt($(this).data("id"));
	var index = taskQueu.indexOf(id);
	if(index == -1)
		taskQueu.push(id);
	else
		//taskQueu = 
		taskQueu.splice(index, 1);
})

$("#btn_noticeQueu").on("click", function() {
	console.log(JSON.stringify(noticeQueu))
	for(var i in noticeQueu) {

		console.log("noticeQueu" + [i] + "-" + noticeQueu[i]);
		deleteN(noticeQueu[i]);
	}

})
//批量删
$("#btn_taskQueu").on("click", function() {
	console.log(JSON.stringify(taskQueu))
	for(var i in taskQueu) {
		console.log("taskQueu" + [i] + "-" + taskQueu[i]);
		deleteT(taskQueu[i]);
	}

})