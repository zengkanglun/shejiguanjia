$(function() {
	/*tap选项栏*/
	$("#content .center_content .content_header .user_tab li").remove();
	tapChoose = sessionStorage.getItem("tapList");
	tapChoose = tapChoose.split('class="active"').join('class');
	if(tapChoose.indexOf("任务") < 0) {
		tapChoose += '<li class="active"><a href="task.html">任务</a><i><img src="img/icon_del.png" alt="" /></i></li>';
	} else {
		tapChoose = tapChoose.split('<li class><a href="task.html">任务</a><i><img src="img/icon_del.png" alt="" /></i></li>').join('<li class="active"><a href="task.html">任务</a><i><img src="img/icon_del.png" alt="" /></i></li>');
	}
	sessionStorage.setItem("tapList", tapChoose);
	$("#content .center_content .content_header .user_tab").append(tapChoose);
	$(document).on("click", "#content .center_content .content_header .user_tab li i", function() {
		$(this).parent().remove();
		tapChoose = $("#content .center_content .content_header .user_tab").html();
		sessionStorage.setItem("tapList", tapChoose);
		if($(this).parent().attr("class") == "active") {
			location.href = "index.html";
		}
	})
	/*==========*/

	var token = localStorage.getItem("token");
	var uid = localStorage.getItem("uid");
	//任务进行中弹窗
	$(document).on("click", ".task_go tbody .title", function() {
		$("#boxPock").show();
		$("#boxPock .taskgo_add").show();
	})
	$(document).on("click", ".taskgo_add .taskgo_add_head i", function() {
		$("#boxPock").hide();
		$("#boxPock .taskgo_add").hide();
	})
	$(document).on("click", ".taskgo_add .btn2", function() {
		$("#boxPock").hide();
		$("#boxPock .taskgo_add").hide();
	})
	//历史任务
	$(document).on("click", ".history_task tbody .title", function() {
		$("#boxPock").show();
		$("#boxPock .histask_detail").show();
	})
	$(document).on("click", ".histask_detail .histask_detail_head i", function() {
		$("#boxPock").hide();
		$("#boxPock .histask_detail").hide();
	})
	$(document).on("click", ".histask_detail .btn2", function() {
		$("#boxPock").hide();
		$("#boxPock .histask_detail").hide();
	})
	$(document).on("click", ".histask_detail .btn1", function() {
		$("#boxPock").hide();
		$("#boxPock .histask_detail").hide();
	})
	//创建任务详情
	$(document).on("click", ".build_task tbody .title", function() {
		$("#boxPock").show();
		$("#boxPock .newbuild_detail").show();
	})
	$(document).on("click", ".newbuild_detail .newbuild_detail_head i", function() {
		$("#boxPock").hide();
		$("#boxPock .newbuild_detail").hide();
	})
	$(document).on("click", ".newbuild_detail .btn2", function() {
		$("#boxPock").hide();
		$("#boxPock .newbuild_detail").hide();
	})
	//select选中
	$("select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	})

	/*获取新任务列表*/
	newTask(uid, 1);
	/*新任务增加*/
	$(document).on("click", ".new_task .page_right .more", function() {
		var total_num = Number($(".new_task .page_right .total_num").text());
		var num = Number($(".new_task .page_right .number").text());
		if(num >= total_num) {
			toast("已经是最后一页了")
		} else {
			num++;
			$(".new_task .page_right .number").text(num);
			newTask(uid, num);
		}
	})
	/*新任务减少*/
	$(document).on("click", ".new_task .page_right .less", function() {
		var num = Number($(".new_task .page_right .number").text());
		if(num == 1) {
			toast("已经是第一页了")
		} else {
			num--;
			$(".new_task .page_right .number").text(num);
			newTask(uid, num);
		}
	})
	/*新任务跳页*/
	$(document).on("click", ".new_task .paging .jump .go", function() {
		var jump_num = Number($(this).siblings(".jump_page").val());
		if(jump_num > 0) {
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
			newTask(uid, jump_num);
		} else {
			toast("请输入正常页码")
		}
	})

	function newTask(uid, p) {
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Task/new_task",
			dataType: 'json',
			data: {
				uid: uid,
				p: p
			},
			headers: {
				accept: "usertoken:" + token,
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data);
					var str = "";
					for(var i = 0; i < data.data.data.length; i++) {
						str += '<tr data-id="' + data.data.data[i].id + '">';
						str += '	<td>' + (i + 1) + '</td>';
						str += '	<td class="n_name" data-name="' + data.data.data[i].user_id + '">' + data.data.data[i].user_id + '</td>';
						str += '	<td class="n_time" data-time="' + data.data.data[i].add_time + '">' + data.data.data[i].add_time + '</td>';
						str += '	<td class="n_type" data-type="' + data.data.data[i].type + '">' + data.data.data[i].type + '</td>';
						str += '	<td class="title" data-id="' + data.data.data[i].pid + '" > ' + data.data.data[i].title + '</td>';
						str += '	<td class="n_start" data-start="' + data.data.data[i].start_time + '">' + data.data.data[i].start_time + '</td>';
						str += '</tr>';
					}
					$(".new_task .page_left span").text(data.data.count);
					$(".new_task .page_right .total_num").text(data.data.page);
					$('.new_task tbody').html(str);
				} else {}
			},
			error: function(data) {},
			async: true
		});
	}

	/*获取进行中列表*/
	/*任务进行中增加*/
	taskGo(uid, 1);
	$(document).on("click", ".task_go .page_right .more", function() {
		var total_num = Number($(".task_go .page_right .total_num").text());
		var num = Number($(".task_go .page_right .number").text());
		if(num >= total_num) {
			toast("已经是最后一页了")
		} else {
			num++;
			$(".task_go .page_right .number").text(num);
			taskGo(uid, num);
		}
	})
	/*任务进行中减少*/
	$(document).on("click", ".task_go .page_right .less", function() {
		var num = Number($(".task_go .page_right .number").text());
		if(num == 1) {
			toast("已经是第一页了")
		} else {
			num--;
			$(".task_go .page_right .number").text(num);
			taskGo(uid, num);
		}
	})
	/*任务进行中跳页*/
	$(document).on("click", ".task_go .paging .jump .go", function() {
		var jump_num = Number($(this).siblings(".jump_page").val());
		if(jump_num > 0) {
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
			taskGo(uid, jump_num);
		} else {
			toast("请输入正常页码")
		}
	})

	function taskGo(uid, p) {
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Task/doing_task",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				uid: uid,
				p: p
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data);
					var str = "";
					for(var i = 0; i < data.data.data.length; i++) {
						str += '<tr data-id="' + data.data.data[i].id + '">';
						str += '	<td>' + (i + 1) + '</td>';
						str += '	<td>' + data.data.data[i].user_id + '</td>';
						str += '	<td>' + data.data.data[i].add_time + '</td>';
						str += '	<td>' + data.data.data[i].type + '</td>';
						str += '	<td class="title" data-id="' + data.data.data[i].pid + '">' + data.data.data[i].title + '</td>';
						str += '	<td>' + data.data.data[i].receive_time + '</td>';
						str += '</tr>';
					}
					$(".task_go .page_left span").text(data.data.count);
					$(".task_go .page_right .total_num").text(data.data.page);
					$('.task_go tbody').html(str);
				} else {}
			},
			error: function(data) {},
			async: true
		});
	}

	/*获取历史列表*/
	historyTask(uid, 1)
	/*历史任务增加*/
	$(document).on("click", ".history_task .page_right .more", function() {
		var total_num = Number($(".history_task .page_right .total_num").text());
		var num = Number($(".history_task .page_right .number").text());
		if(num >= total_num) {
			toast("已经是最后一页了")
		} else {
			num++;
			$(".history_task .page_right .number").text(num);
			historyTask(uid, num);
		}
	})
	/*历史任务减少*/
	$(document).on("click", ".history_task .page_right .less", function() {
		var num = Number($(".history_task .page_right .number").text());
		if(num == 1) {
			toast("已经是第一页了")
		} else {
			num--;
			$(".history_task .page_right .number").text(num);
			historyTask(uid, num);
		}
	})
	/*历史任务跳页*/
	$(document).on("click", ".history_task .paging .jump .go", function() {
		var jump_num = Number($(this).siblings(".jump_page").val());
		if(jump_num > 0) {
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
			historyTask(uid, jump_num);
		} else {
			toast("请输入正常页码")
		}
	})

	function historyTask(uid, p) {
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Task/history_task",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				uid: uid,
				p: p
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data);
					var str = "";
					for(var i = 0; i < data.data.data.length; i++) {
						str += '<tr data-id="' + data.data.data[i].id + '">';
						str += '	<td>' + (i + 1) + '</td>';
						str += '	<td>' + data.data.data[i].user_id + '</td>';
						str += '	<td>' + data.data.data[i].add_time + '</td>';
						str += '	<td>' + data.data.data[i].type + '</td>';
						str += '	<td class="title" data-id="' + data.data.data[i].pid + '">' + data.data.data[i].title + '</td>';
						str += '	<td>' + data.data.data[i].finish_time + '</td>';
						str += '</tr>';
					}
					$(".history_task .page_left span").text(data.data.count);
					$(".history_task .page_right .total_num").text(data.data.page);
					$('.history_task tbody').html(str);
				} else {}
			},
			error: function(data) {},
			async: true
		});
	}

	/*获取我创建的列表*/
	buildTask(uid, 1);
	/*创建任务增加*/
	$(document).on("click", ".build_task .page_right .more", function() {
		var total_num = Number($(".build_task .page_right .total_num").text());
		var num = Number($(".build_task .page_right .number").text());
		if(num >= total_num) {
			toast("已经是最后一页了")
		} else {
			num++;
			$(".build_task .page_right .number").text(num);
			buildTask(uid, num);
		}
	})
	/*创建任务减少*/
	$(document).on("click", ".build_task .page_right .less", function() {
		var num = Number($(".build_task .page_right .number").text());
		if(num == 1) {
			toast("已经是第一页了")
		} else {
			num--;
			$(".build_task .page_right .number").text(num);
			buildTask(uid, num);
		}
	})
	/*创建任务跳页*/
	$(document).on("click", ".build_task .paging .jump .go", function() {
		var jump_num = Number($(this).siblings(".jump_page").val());
		if(jump_num > 0) {
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
			buildTask(uid, jump_num);
		} else {
			toast("请输入正常页码")
		}
	})

	function buildTask(uid, p) {
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Task/own_task",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				uid: uid,
				p: p
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data);
					var str = "";
					for(var i = 0; i < data.data.data.length; i++) {
						str += '<tr data-id="' + data.data.data[i].id + '">';
						str += '	<td>' + (i + 1) + '</td>';
						str += '	<td>' + data.data.data[i].add_time + '</td>';
						str += '	<td>' + data.data.data[i].type + '</td>';
						str += '	<td>' + data.data.data[i].receiver + '</td>';
						str += '	<td class="title">' + data.data.data[i].title + '</td>';
						str += '	<td>' + data.data.data[i].status + '</td>';
						str += '</tr>';
					}
					$(".build_task .page_left span").text(data.data.count);
					$(".build_task .page_right .total_num").text(data.data.page);
					$('.build_task tbody').html(str);
				} else {}
			},
			error: function(data) {},
			async: true
		});
	}

	/*新任务详情*/
	var da_id;
	var re_id;
	var do_id;
	var his_id;
	var ow_id;
	$(document).on('click', '.new_task .title', function() {
		da_id = $(this).parents('tr').find(".title").attr('data-id');
		re_id = $(this).parents('tr').attr('data-id');
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Task/task_info",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				id: da_id
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data);
					$("#boxPock").show();
					$("#boxPock .newtask_detail").show();
					$('.newtask_detail #nd_what').val(data.data.project_id);
					$('.newtask_detail #nd_type').val(data.data.type);
					$('.newtask_detail #nd_who').val(data.data.user_id);
					$('.newtask_detail #nd_start').val(data.data.start_time);
					$('.newtask_detail #nd_title').val(data.data.title);
					$('.newtask_detail #nd_file').text(data.data.file_name);
					$('.newtask_detail #nd_content').text(data.data.content);
				} else {}
			},
			error: function(data) {},
			async: true
		});
	});
	$(document).on("click", ".newtask_detail_head i, .newtask_detail .btn2", function() {
		$("#boxPock").hide();
		$("#boxPock .newtask_detail").hide();
	})
	/*新任务下载*/
	$(document).on("click", ".newtask_detail .download", function() {
		var pid = da_id;
		location.href = host_host_host + "/home/task/download/id/" + pid;
	})
	/*任务进行中详情*/
	$(document).on('click', '.task_go .title', function() {
		do_id = $(this).parents('tr').find(".title").attr('data-id');
		var id = $(this).parent("tr").attr("data-id");
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Task/task_info",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				id: do_id,
				sid: id
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data);
					$('.taskgo_add #do_what').val(data.data.project_id);
					$('.taskgo_add #do_type').val(data.data.type);
					$('.taskgo_add #do_who').val(data.data.user_id);
					$('.taskgo_add #do_start').val(data.data.start_time);
					$('.taskgo_add #do_title').val(data.data.title);
					$('.taskgo_add #do_file').text(data.data.file_name);
					$('.taskgo_add #do_content').text(data.data.content);
					$('.taskgo_add #do_ref').text(data.data.reply_content);
				} else {}
			},
			error: function(data) {},
			async: true
		});
	});
	/*任务进行中下载*/
	$(document).on("click", ".taskgo_add .download", function() {
		var pid = do_id;
		location.href = host_host_host + "/home/task/download/id/" + pid;
	})
	/*历史任务详情*/
	$(document).on('click', '.history_task .title', function() {
		his_id = $(this).parents('tr').find(".title").attr('data-id');
		var id = $(this).parent("tr").attr("data-id");
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Task/task_info",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				id: his_id,
				sid: id
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data);
					$('.histask_detail #his_what').val(data.data.project_id);
					$('.histask_detail #his_type').val(data.data.type);
					$('.histask_detail #his_who').val(data.data.user_id);
					$('.histask_detail #his_start').val(data.data.start_time);
					$('.histask_detail #his_title').val(data.data.title);
					$('.histask_detail #his_file').text(data.data.file_name);
					$('.histask_detail #his_content').text(data.data.content);
					$('.histask_detail #his_ref').text(data.data.reply_content);
				} else {}
			},
			error: function(data) {},
			async: true
		});
	});
	/*历史任务下载*/
	$(document).on("click", ".histask_detail .download", function() {
		var pid = his_id;
		location.href = host_host_host + "/home/task/download/id/" + pid;
	})
	/*我创建的任务详情*/
	$(document).on('click', '.build_task .title', function() {
		ow_id = $(this).parents('tr').attr('data-id');
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Task/task_info",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				id: ow_id
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data);
					$('.newbuild_detail #ow_what').val(data.data.project_id);
					$('.newbuild_detail #ow_type').val(data.data.type);
					$('.newbuild_detail #ow_who').val(data.data.user_id);
					$('.newbuild_detail #ow_start').val(data.data.start_time);
					$('.newbuild_detail #ow_title').val(data.data.title);
					$('.newbuild_detail #ow_file').text(data.data.file_name);
					$('.newbuild_detail #ow_content').text(data.data.content);
					var datas = data.data.reply;
					var lis = '';
					for(var i = 0; i < datas.length; i++) {
						lis += '<li class="clearfix">';
						lis += '<div class="cnt_detail">';
						lis += '<span class="ow_ren">' + datas[i].uid + ':</span><span class="ow_zht">' + datas[i].reply + '</span>';
						lis += '</div>';
						lis += '<div class="time">' + datas[i].addtime + '</div>';
						lis += '</li>';
					}
					$('.newbuild_detail .reply_ul li').remove();
					$('.newbuild_detail .reply_ul').append(lis);

				} else {
					toast(data.msg);
				}
			},
			error: function(data) {},
			async: true
		});
	});
	/*创建任务下载*/
	$(document).on("click", ".newbuild_detail .download", function() {
		var pid = ow_id;
		location.href = host_host_host + "/home/task/download/id/" + pid;
	})

	/*===*/

})