$(function() {
	var project_id = localStorage.getItem("project_id");
	/*添加新建通知*/
	//按钮提交表单
	$("#btn_add_msg").on("click", function() {
		var form = new FormData($("#msgForm")[0]);
		form.append("type", $(".newmsg_add .add_style").attr("data-id"));
		form.append("project_id", $(".newmsg_add .clause").attr("data-id"));
		form.append("receiver", $("#receiver").attr("data-id"));
		$.ajax({
			url: host_host_host + "/index.php/Home/Notice/create",
			type: "post",
			headers: {
				accept: "usertoken:" + token,
			},
			data: form,
			processData: false,
			contentType: false,
			success: function(data) {
				if(data.status == 1) {
					$(".newmsg_add").hide();
					$("#boxPock").hide();
				} else {
					toast(data.msg)
				}
			},
			error: function(e) {}
		});
	})

	/*******************************************/
	var renderChooseTy = function(data) {
		for(var i in data) {
			var o = data[i];
			var item = $(
				'<div class="job">' +
				'<i><img src="img/icon_checked.png" alt="" /></i>' +
				'<span>' + o.name + '</span>' +
				'<s><img src="img/arrow_bottom.png"/></s>' +
				'</div>'

			);
			var itemm = $(
				'<ul class="worker" style="display: block;">' +
				'</ul>'
			);
			var moreData = o.staff;
			//alert(JSON.stringify(moreData));
			for(var ii in moreData) {
				//alert(ii);
				var oz = moreData[ii];
				var ls = $(
					'<li>' +
					'<i><img src="img/icon_checked.png" alt=""></i>' +
					'<span>' + oz.nickname + '</span>' +
					'</li>'
				);
				itemm.append(ls);

			}
			var it = $(
				'<div class="jobstyle" >' +
				'</div>'
			);

			$(it).append(item);
			$(it).append(itemm);
			$("#typ_user_list").append(it);

		}

	}
	//显示 通知  new
	var renderMsgNew = function(data, e_id) {

		$('#form_new #project_id').val(data.project_id);
		$('#form_new #msg_type').val(data.type);
		$('#form_new #title').val(data.title);
		$('#form_new #user_id').val(data.user_id); //李四",
		$('#form_new #file_name').val(data.file_name); //default",
		$('#form_new #content').val(data.content); //内容测试",
		$('#form_new #reply').val(data.reply); //回复测试",

		$(e_id + ' #project_id').val(data.project_id);
		$(e_id + ' #msg_type').val(data.type);
		$(e_id + ' #title').val(data.title);
		$(e_id + ' #user_id').val(data.user_id); //李四",
		$(e_id + ' #file_name').val(data.file_name); //default",
		$(e_id + ' #content').val(data.content); //内容测试",
		$(e_id + ' #reply').val(data.reply); //回复测试",

		$(e_id + " .contract").html(data.file_name);
		$(e_id + " #to_userwwb").html(data.user_id);
		$(e_id + " #replywwb").html(data.reply);
		$(e_id + " #addtimewwb").html(data.addtime);
	}

	//获取Info
	var getInfoParam = function(id, e_id) {
		token = localStorage.getItem("token");
		var host_host_host = host_host_host + '/index.php/home/Notice/';
		$.ajax({
				headers: {
					accept: "usertoken:" + token
				},
				type: 'GET',
				dataType: 'json',
				data: {
					id: id
				},
				url: host_host_host + 'info',
			})
			.done(function(data) {
				console.log(data);
				$(e_id).data("id", id);
				renderMsgNew(data.data, e_id);
				$(e_id + " .download").data("id", id);
			})
			.fail(function(data) {
				toast(data.msg);

			})
			.always(function() {
				console.log("always!");
			})

	}
	//设置已读新的通知
	var read = function() {
		var newP = {};
		newP.id = $("#form_new").data("id"); //;""+7;//列表id 非父id;
		var token = localStorage.getItem("token");
		console.log(JSON.stringify(newP))
		$.ajax({
				method: 'POST',
				dataType: 'json',
				headers: {
					accept: "usertoken:" + token
				},
				url: host_host_host + '/index.php/home/Notice/read',
				data: newP, //{},
			})
			.done(function(data) {
				if(data.status == 1) { //success
					console.log(1)
					console.log(JSON.stringify(data));
				} else {
					console.log(data.msg + 5 + data.data)
				}
			})
			.fail(function(data) {})
			.always(function() {
				console.log("always!");
			})
	}
	//回复新的通知
	var reply = function() {
		var newP = {};
		newP.id = $("#form_new").data("id"); //;""+7;//列表id 非父id;
		newP.content = "" + $("#form_new #reply").val(); //page
		var token = localStorage.getItem("token");
		console.log(JSON.stringify(newP))
		$.ajax({
				method: 'POST',
				dataType: 'json',
				headers: {
					accept: "usertoken:" + token
				},
				url: host_host_host + '/index.php/home/Notice/reply_content',
				data: newP, //{},
			})
			.done(function(data) {
				if(data.status == 1) { //success
					console.log(1)
					console.log(JSON.stringify(data));
				} else {
					console.log(data.msg + 5 + data.data)
				}
				console.log(data);
				console.log(JSON.stringify(data));
			})
			.fail(function(data) {
				console.log("fail!");
				console.log(JSON.stringify(data));
			})
			.always(function() {
				console.log("always!");
			})
	}
	//回复新的 通知
	//id="form_new"
	$('#form_new #btn_new').on("click", function() {
		read(); //设置已读
		var reply = "" + $('#form_new #reply').val();
		console.log(reply)
		if(reply !== "")
			reply(); //设置已回复
	})
	//显示 通知  read
	var renderMsg = function(data) {
		console.log(JSON.stringify(data));
		$('#form_send #project_id').val(data.project_id);
		$('#form_send #msg_type').val(data.type);
		$('#form_send #title').val(data.title);
		$('#form_send #user_id').val(data.user_id); //李四",
		$('#form_send #file_name').val(data.file_name); //default",
		$('#form_send #content').val(data.content); //内容测试",
		$("#to_userwwb").html(data.user_id);
		$("#replywwb").html(data.reply);
		$("#addtimewwb").html(data.addtime);
	}
	//获取Info
	var getInfo = function(id) {
		token = localStorage.getItem("token");
		$.ajax({
				headers: {
					accept: "usertoken:" + token
				},
				type: 'GET',
				dataType: 'json',
				data: {
					id: id
				},
				url: host_host_host + '/index.php/home/Notice/info',
			})
			.done(function(data) {
				console.log(data);
				console.log(JSON.stringify(data));
				renderMsg(data.data);
			})
			.fail(function(data) {
				console.log("fail!" + data.msg);
				console.log("fail!" + data.data);
				console.log("fail!" + JSON.stringify(data));
			})
			.always(function() {
				console.log("always!");
			})
	}
	//删除通知
	//1/新通知 2/已读通知 3/已回复通知 4/已发通知
	var detInfo = function(id, type) {
		token = localStorage.getItem("token");
		$.ajax({
				headers: {
					accept: "usertoken:" + token
				},
				type: 'GET',
				dataType: 'json',
				data: {
					id: id,
					type: type
				},
				url: host_host_host + '/index.php/home/Notice/del',
			})
			.done(function(data) {
				console.log(data);
				console.log(JSON.stringify(data));
				renderMsg(data.data);
			})
			.fail(function(data) {
				console.log("fail!" + data.msg);
				console.log("fail!" + data.data);
				console.log("fail!" + JSON.stringify(data));
			})
			.always(function() {
				console.log("always!");
			})

	}

	//显示 通知  到指定元素
	var renderMsgParam = function(data, e_id, type) {
		$(e_id).html("");
		for(var i in data) {
			var o = data[i];
			var item = $(
				'<tr>' +
				'<td>' + (parseInt(i) + 1) + '</td>' +
				'<td>' + o.type + '</td>' +
				'<td class="title">' + o.title + '</td>' +
				'<td>' + o.project_id + '</td>' +
				'<td>' + o.user_id + '</td>' +
				'<td>' + o.addtime + '</td>' +
				'<td class="handle"><span data-id="' + o.id + '" class="check">查看</span><span class="del">删除</span></td>' +
				'</tr>'
			)
			$(e_id).append(item);
		}
		$(e_id + " .check").on("click", function() {
			var id = $(this).data("id");
			console.log(id);
			//getInfo(id);//@@
			console.log("type:" + type)
			if(type == 1)
				var form_id = "#form_new"
			if(type == 2)
				var form_id = "#form_read"
			if(type == 3)
				var form_id = "#form_reply"
			if(type == 4)
				form_id = "#form_send"
			getInfoParam(id, form_id);
		})
		$(".del").on("click", function() {
			var id = $(this).data("id");
			detInfo(i, type);
		})
	}
	//获取通知列表
	var getMsgF = function(uid) {
		var token = localStorage.getItem("token");
		$.ajax({
			type: "GET",
			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + "/index.php/Home/Notice/new_notice",
			dataType: 'json',
			success: function(data) {
				if(data.status == 1) {
					console.log(data);
					toast(data.msg)
					renderMsgListNew(data.data.data);
				} else {
					toast(data.msg)
				}
			},
			error: function(data) {

			}
		})
	}

	//显示新 通知
	var renderMsgListNew = function(data) {
		$("#msg_new_list").html("");
		for(var i in data) {
			var o = data[i];
			var item = $(
				'<tr>' +
				'<td>' + (parseInt(i) + 1) + '</td>' +
				'<td>' + o.type + '</td>' +
				'<td class="title">' + o.title + '</td>' +
				'<td>' + o.project_id + '</td>' +
				'<td>' + o.user_id + '</td>' +
				'<td>' + o.addtime + '</td>' +
				'<td class="handle"><span data-id="' + o.id + '" class="check">已读</span><span  data-id="' + o.id + '" class="del">删除</span></td>' +
				'</tr>'
			)
			$("#msg_new_list").append(item);
		}
		$("#msg_new_list .check").on("click", function() {
			var id = $(this).data("id");
			//alert(id);
			getInfoParam(id, "#form_new");
		})
	}
	
	
	
	var getMsgFParam = function(status, e_id, type, page) {
		var token = localStorage.getItem("token");
		$.ajax({
			type: "GET",
			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + "/index.php/Home/Notice/" + status,
			dataType: 'json',
			data: {
				p: page
			},
			success: function(data) {
				if(data.status == 1) { //success
					renderMsgParam(data.data.data, e_id, type);
					if(type == 1) {
						$(".total_num.a").html(data.data.page);
						$("#total_a").html(data.data.count);
						total_num_a = parseInt(data.data.page);
					} else if(type == 2) {
						$(".total_num.b").html(data.data.page);
						$("#total_b").html(data.data.count);
						total_num_b = parseInt(data.data.page);
					} else if(type == 3) {
						$(".total_num.c").html(data.data.page);
						$("#total_c").html(data.data.count);
						total_num_c = parseInt(data.data.page);
					} else if(type == 4) {
						$(".total_num.d").html(data.data.page);
						$("#total_d").html(data.data.count);
						total_num_d = parseInt(data.data.page);
					}
				} else {
					//					console.log(50 + JSON.stringify(data))
				}
			},
			error: function(data) {
				console.log(0 + JSON.stringify(data))
			}
		})
	}
	//10 - 20 getMsgF();//
	getMsgFParam("new_notice", "#msg_new_list", 1);
	getMsgFParam("read_notice", "#msg_read_list", 2);
	getMsgFParam("reply", "#msg_reply_list", 3);
	getMsgFParam("own_reply", "#msg_send_list", 4);
	var rendNTy = function(data) {
		$("#msg_type_list").html("");
		//		console.log(JSON.stringify(data));
		for(var i in data) {
			var o = data[i];
			var item = $(
				'<option value="' + o.id + '">' + o.name + '</option>'
			)
			$("#msg_type_list").append(item);
			$(".newmsg_add .add_style").val(data[0].name);
			$(".newmsg_add .add_style").attr("data-id", data[0].id);
		}
	}
	//
	//获取notice类型
	var getNTyList = function() {
		$.ajax({
			type: "get",
			url: host_host_host + "/index.php/Home/Notice/notice_type",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			success: function(data) {
				if(data.status == 1) { //success
					rendNTy(data.data);
				} else {}
			},
			error: function(data) {
				console.log(0)
			},
			async: true
		});

	}

	getNTyList();
	//10-20 download
	$(".download").on("click", function() {
		var id = $(this).data("id");
		var type = 2;
		var op = host_host_host + "/index.php/Home/notice/download?id=" + id + "type=" + type;
		window.open(op);
		window.open(host_host_host + "/index.php/Home/notice/download?id=" + id + "type=" + type);
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
	var getPageParam = function(page, n_type) {
		//"read_notice" ,"#msg_read_list",2
		//"reply" ,"#msg_reply_list",3
		//"own_reply" ,"#msg_send_list",4
		if(n_type == 1)
			getMsgFParam("new_notice", "#msg_new_list", 1, page);
		if(n_type == 2)
			getMsgFParam("read_notice", "#msg_read_list", 2, page);
		if(n_type == 3)
			getMsgFParam("reply", "#msg_reply_list", 3, page);
		if(n_type == 4)
			getMsgFParam("own_reply", "#msg_send_list", 4, page);
	}
	//翻页
	var g_pageCur_a = 1;
	var g_pageCur_b = 1;
	var g_pageCur_c = 1;
	var g_pageCur_d = 1;

	var total_num_a = 1;
	var total_num_b = 1;
	var total_num_c = 1;
	var total_num_d = 1;
	//上一页
	$("#prev_new").on("click", function() {
		g_pageCur_a--;
		//getPrevPage();
		if(g_pageCur_a < 1)
			g_pageCur_a = 1;
		getPageParam(g_pageCur_a, 1);
		$(".number.a").html(g_pageCur_a);
	})
	//下一页
	$("#after_new").on("click", function() {
		g_pageCur_a++;
		//getNextPage();
		if(g_pageCur_a > total_num_a)
			g_pageCur_a--;
		getPageParam(g_pageCur_a, 1);
		$(".number.a").html(g_pageCur_a);
	})
	//上一页
	$("#prev_read").on("click", function() {
		g_pageCur_b--;
		//getPrevPage();
		if(g_pageCur_b < 1)
			g_pageCur_b = 1;
		getPageParam(g_pageCur_b, 2);
		$(".number.b").html(g_pageCur_b);
	})
	//下一页
	$("#after_read").on("click", function() {
		g_pageCur_b++;
		//getNextPage();
		if(g_pageCur_b > total_num_b)
			g_pageCur_b--;
		getPageParam(g_pageCur_b, 2);
		$(".number.b").html(g_pageCur_b);
	})
	//上一页
	$("#prev_reply").on("click", function() {
		g_pageCur_c--;
		//getPrevPage();
		if(g_pageCur_c < 1)
			g_pageCur_c = 1;
		getPageParam(g_pageCur_c, 3);

		$(".number.c").html(g_pageCur_c);
	})
	//下一页
	$("#after_reply").on("click", function() {
		g_pageCur_c++;
		//getNextPage();
		if(g_pageCur_c > total_num_c)
			g_pageCur_c--;
		getPageParam(g_pageCur_c, 3);
		$(".number.c").html(g_pageCur_c);
	})

	//上一页
	$("#prev_send").on("click", function() {
		g_pageCur_d--;
		//getPrevPage();
		if(g_pageCur_d < 1)
			g_pageCur_d = 1;
		getPageParam(g_pageCur_d, 4);

		$(".number.d").html(g_pageCur_d);
	})
	//下一页
	$("#after_send").on("click", function() {
		g_pageCur_d++;
		//getNextPage();
		if(g_pageCur_d > total_num_d)
			g_pageCur_d--;
		getPageParam(g_pageCur_d, 4);
		$(".number.d").html(g_pageCur_d);
	})


})