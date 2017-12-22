$(function() {
	/*tap选项栏*/
	$("#content .center_content .content_header .user_tab li").remove();
	tapChoose = sessionStorage.getItem("tapList");
	tapChoose = tapChoose.split('class="active"').join('class');
	if(tapChoose.indexOf("通知") < 0) {
		tapChoose += '<li class="active" name="msg"><a href="msg.html">通知</a><i><img src="img/icon_del.png" alt="" /></i></li>';
	} else {
		tapChoose = tapChoose.split('<li class name="msg"><a href="msg.html">通知</a><i><img src="img/icon_del.png" alt="" /></i></li>').join('<li class="active" name="msg"><a href="msg.html">通知</a><i><img src="img/icon_del.png" alt="" /></i></li>');
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
	$("#content .center_content .content_header .user_tab").find("li[name='msg']").addClass("active");
	/*==========*/
	var token = localStorage.getItem("token");
	//tab栏切换
	$(".detail_tab li").on("click", function() {
		$(this).addClass("active").siblings().removeClass("active");
		var index = $(this).index();
		$(".content_detail .msg_notice").hide();
		$(".content_detail .msg_notice").eq(index).show();
		if(index == 0) {
			newMsg(1);
			$(".new_msg .page_right .number").text(1);
			$(".new_msg .paging .jump input").val("")
		} else if(index == 1) {
			hasread(1);
			$(".hasread .page_right .number").text(1);
			$(".hasread .paging .jump input").val("")
		} else if(index == 2) {
			replied(1);
			$(".replied .page_right .number").text(1);
			$(".replied .paging .jump input").val("")
		} else {
			inform(1);
			$(".inform .page_right .number").text(1);
			$(".inform .paging .jump input").val("")
		}
	})
	//select选中
	$("select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	})
	/*获取新通知列表=======*/
	newMsg(1)
	/*新通知增加*/
	$(document).on("click", ".new_msg .page_right .more", function() {
		var total_num = Number($(".new_msg .page_right .total_num").text());
		var num = Number($(".new_msg .page_right .number").text());
		if(num >= total_num) {
			toast("已经是最后一页了")
		} else {
			num++;
			$(".new_msg .page_right .number").text(num);
			newMsg(num);
		}
	})
	/*新通知减少*/
	$(document).on("click", ".new_msg .page_right .less", function() {
		var num = Number($(".new_msg .page_right .number").text());
		if(num == 1) {
			toast("已经是第一页了")
		} else {
			num--;
			$(".new_msg .page_right .number").text(num);
			newMsg(num);
		}
	})
	/*新通知跳页*/
	$(document).on("click", ".new_msg .paging .jump .go", function() {
		var jump_num = Number($(this).siblings(".jump_page").val());
		if(jump_num > 0) {
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
			newMsg(jump_num);
		} else {
			toast("请输入正常页码")
		}
	})

	function newMsg(p) {
		$.ajax({
			type: "GET",
			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + "/index.php/Home/Notice/new_notice",
			dataType: 'json',
			data: {
				p: p
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data);
					var newmsg = "";
					var datas = data.data.data;
					for(var i = 0; i < datas.length; i++) {
						newmsg += '<tr data-id="' + datas[i].id + '" pid="' + datas[i].pid + '">';
						newmsg += '<td>' + (i + 1) + '</td>';
						newmsg += '<td>' + datas[i].type + '</td>';
						newmsg += '<td class="title">' + datas[i].title + '</td>';
						newmsg += '<td>' + datas[i].project_id + '</td>';
						newmsg += '<td>' + datas[i].user_id + '</td>';
						newmsg += '<td>' + datas[i].addtime + '</td>';
						newmsg += '<td class="handle"><span class="check">已读</span><span class="del">删除</span></td>';
						newmsg += '</tr>';
					}
					$(".new_msg .page_left span").text(data.data.count);
					$(".new_msg .page_right .total_num").text(data.data.page);
					$(".new_msg tbody tr").remove();
					$(".new_msg tbody").append(newmsg);
				} else {
					toast(data.msg)
				}
			},
			error: function(data) {

			}
		})
	}
	/*新通知详情*/
	var pid;
	var listId; /*列表id*/
	$(document).on("click", ".new_msg tbody .title,.new_msg tbody .handle .check", function() {
		$("#boxPock").show();
		$("#boxPock .msgcheck_add").show();
		pid = $(this).parents("tr").attr("pid");
		listId = $(this).parents("tr").attr("data-id");
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Notice/info",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				id: pid
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data);
					$(".msgcheck_add .msg_type").val(data.data.type);
					$(".msgcheck_add .project_id").val(data.data.project_id);
					$(".msgcheck_add .title").val(data.data.title);
					$(".msgcheck_add .user_id").val(data.data.user_id);
					$(".msgcheck_add .contract").text(data.data.file_name);
					$(".msgcheck_add .content").text(data.data.content);
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	})
	/*新通知已读*/
	$(document).on("click", ".msgcheck_add .btn2,.msgcheck_add_head i", function() {
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Notice/read",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				id: listId
			},
			success: function(data) {
				if(data.status == 1) {
					$("#boxPock").hide();
					$("#boxPock .msgcheck_add").hide();
					newMsg(1)
				} else {
					toast(data.msg)
				}
			},
			error: function(data) {

			},
			async: true
		});
	})
	/*新通知回复*/
	$(document).on("click", ".msgcheck_add .btn1", function() {
		var content = $(".msgcheck_add .c_reply .reply").val();
		//		console.log(content)
		$.ajax({
			type: "post",
			url: host_host_host + "/Home/Notice/reply_content",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				id: listId,
				content: content
			},
			success: function(data) {
				if(data.status == 1) {
					toast(data.msg);
					$("#boxPock").hide();
					$("#boxPock .msgcheck_add").hide();
					newMsg(1)
				} else {
					toast(data.msg)
				}
			},
			error: function(data) {

			},
			async: true
		});
	})
	/*获取已读通知列表*/
	/*已读通知增加*/
	$(document).on("click", ".hasread .page_right .more", function() {
		var total_num = Number($(".hasread .page_right .total_num").text());
		var num = Number($(".hasread .page_right .number").text());
		if(num >= total_num) {
			toast("已经是最后一页了")
		} else {
			num++;
			$(".hasread .page_right .number").text(num);
			hasread(num);
		}
	})
	/*已读通知减少*/
	$(document).on("click", ".hasread .page_right .less", function() {
		var num = Number($(".hasread .page_right .number").text());
		if(num == 1) {
			toast("已经是第一页了")
		} else {
			num--;
			$(".hasread .page_right .number").text(num);
			hasread(num);
		}
	})
	/*已读通知跳页*/
	$(document).on("click", ".hasread .paging .jump .go", function() {
		var jump_num = Number($(this).siblings(".jump_page").val());
		if(jump_num > 0) {
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
			hasread(jump_num);
		} else {
			toast("请输入正常页码")
		}
	})

	function hasread(p) {
		$.ajax({
			type: "GET",
			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + "/Home/Notice/read_notice",
			dataType: 'json',
			data: {
				p: p
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data);
					var newmsg = "";
					var datas = data.data.data;
					for(var i = 0; i < datas.length; i++) {
						newmsg += '<tr data-id="' + datas[i].id + '" pid="' + datas[i].pid + '">';
						newmsg += '<td>' + (i + 1) + '</td>';
						newmsg += '<td>' + datas[i].type + '</td>';
						newmsg += '<td class="title">' + datas[i].title + '</td>';
						newmsg += '<td>' + datas[i].project_id + '</td>';
						newmsg += '<td>' + datas[i].user_id + '</td>';
						newmsg += '<td>' + datas[i].addtime + '</td>';
						newmsg += '<td class="handle"><span class="check">查看</span><span class="del">删除</span></td>';
						newmsg += '</tr>';
					}
					$(".hasread .page_left span").text(data.data.count);
					$(".hasread .page_right .total_num").text(data.data.page);
					$(".hasread tbody tr").remove();
					$(".hasread tbody").append(newmsg);
				} else {
					toast(data.msg)
				}
			},
			error: function(data) {

			}
		})
	}
	/*已读通知详情*/
	$(document).on("click", ".hasread tbody .title,.hasread tbody .handle .check", function() {
		$("#boxPock").show();
		$("#boxPock .hasread_msg").show();
		pid = $(this).parents("tr").attr("pid");
		listId = $(this).parents("tr").attr("data-id");
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Notice/info",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				id: pid
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data);
					$(".hasread_msg .msg_type").val(data.data.type);
					$(".hasread_msg .project_id").val(data.data.project_id);
					$(".hasread_msg .title").val(data.data.title);
					$(".hasread_msg .user_id").val(data.data.user_id);
					$(".hasread_msg .contract").text(data.data.file_name);
					$(".hasread_msg .content1").text(data.data.content);
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	})
	/*已读通知回复*/
	$(document).on("click", ".hasread_msg .btn1", function() {
		var content = $(".hasread_msg .c_reply .reply").val();
		//		console.log(content)
		$.ajax({
			type: "post",
			url: host_host_host + "/Home/Notice/reply_content",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				id: listId,
				content: content
			},
			success: function(data) {
				if(data.status == 1) {
					toast(data.msg);
					$("#boxPock").hide();
					$("#boxPock .hasread_msg").hide();
					hasread(1)
				} else {
					toast(data.msg)
				}
			},
			error: function(data) {

			},
			async: true
		});
	})
	$(document).on("click", ".hasread_msg .btn2,.hasread_msg_head i", function() {
		$("#boxPock").hide();
		$("#boxPock .hasread_msg").hide();
	})
	/*获取已回复通知列表*/
	/*已回复增加*/
	$(document).on("click", ".replied .page_right .more", function() {
		var total_num = Number($(".replied .page_right .total_num").text());
		var num = Number($(".replied .page_right .number").text());
		if(num >= total_num) {
			toast("已经是最后一页了")
		} else {
			num++;
			$(".replied .page_right .number").text(num);
			replied(num);
		}
	})
	/*已回复通知减少*/
	$(document).on("click", ".replied .page_right .less", function() {
		var num = Number($(".replied .page_right .number").text());
		if(num == 1) {
			toast("已经是第一页了")
		} else {
			num--;
			$(".replied .page_right .number").text(num);
			replied(num);
		}
	})
	/*已回复通知跳页*/
	$(document).on("click", ".replied .paging .jump .go", function() {
		var jump_num = Number($(this).siblings(".jump_page").val());
		if(jump_num > 0) {
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
			replied(jump_num);
		} else {
			toast("请输入正常页码")
		}
	})

	function replied(p) {
		$.ajax({
			type: "GET",
			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + "/Home/Notice/reply",
			dataType: 'json',
			data: {
				p: p
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data);
					var newmsg = "";
					var datas = data.data.data;
					for(var i = 0; i < datas.length; i++) {
						newmsg += '<tr data-id="' + datas[i].id + '" pid="' + datas[i].pid + '">';
						newmsg += '<td>' + (i + 1) + '</td>';
						newmsg += '<td>' + datas[i].type + '</td>';
						newmsg += '<td class="title">' + datas[i].title + '</td>';
						newmsg += '<td>' + datas[i].project_id + '</td>';
						newmsg += '<td>' + datas[i].user_id + '</td>';
						newmsg += '<td>' + datas[i].addtime + '</td>';
						newmsg += '<td class="handle"><span class="check">查看</span><span class="del">删除</span></td>';
						newmsg += '</tr>';
					}
					$(".replied .page_left span").text(data.data.count);
					$(".replied .page_right .total_num").text(data.data.page);
					$(".replied tbody tr").remove();
					$(".replied tbody").append(newmsg);
				} else {
					toast(data.msg)
				}
			},
			error: function(data) {

			}
		})
	}
	/*已回复通知详情*/
	$(document).on("click", ".replied tbody .title,.replied tbody .handle .check", function() {
		$("#boxPock").show();
		$("#boxPock .hasreply_msg").show();
		pid = $(this).parents("tr").attr("pid");
		var id = $(this).parents("tr").attr("data-id");
		listId = $(this).parents("tr").attr("data-id");
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Notice/info",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				id: pid,
				sid: id,
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data);
					$(".hasreply_msg .msg_type").val(data.data.type);
					$(".hasreply_msg .project_id").val(data.data.project_id);
					$(".hasreply_msg .title").val(data.data.title);
					$(".hasreply_msg .user_id").val(data.data.user_id);
					$(".hasreply_msg .contract").text(data.data.file_name);
					$(".hasreply_msg .content2").text(data.data.content);
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
					$('.hasreply_msg .reply_ul li').remove();
					$('.hasreply_msg .reply_ul').append(lis);
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	})
	$(document).on("click", ".hasreply_msg_head i,.hasreply_msg .btn2", function() {
		$("#boxPock").hide();
		$("#boxPock .hasreply_msg").hide();
	})
	/*获取已发通知列表*/
	/*已发通知增加*/
	$(document).on("click", ".inform .page_right .more", function() {
		var total_num = Number($(".inform .page_right .total_num").text());
		var num = Number($(".inform .page_right .number").text());
		if(num >= total_num) {
			toast("已经是最后一页了")
		} else {
			num++;
			$(".inform .page_right .number").text(num);
			inform(num);
		}
	})
	/*已发通知减少*/
	$(document).on("click", ".inform .page_right .less", function() {
		var num = Number($(".inform .page_right .number").text());
		if(num == 1) {
			toast("已经是第一页了")
		} else {
			num--;
			$(".inform .page_right .number").text(num);
			inform(num);
		}
	})
	/*已发通知知跳页*/
	$(document).on("click", ".inform .paging .jump .go", function() {
		var jump_num = Number($(this).siblings(".jump_page").val());
		if(jump_num > 0) {
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
			inform(jump_num);
		} else {
			toast("请输入正常页码")
		}
	})

	function inform(p) {
		$.ajax({
			type: "GET",
			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + "/Home/Notice/own_reply",
			dataType: 'json',
			data: {
				p: p
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data);
					var newmsg = "";
					var datas = data.data.data;
					for(var i = 0; i < datas.length; i++) {
						newmsg += '<tr data-id="' + datas[i].id + '" pid="' + datas[i].pid + '">';
						newmsg += '<td>' + (i + 1) + '</td>';
						newmsg += '<td>' + datas[i].type + '</td>';
						newmsg += '<td class="title">' + datas[i].title + '</td>';
						newmsg += '<td>' + datas[i].project_id + '</td>';
						newmsg += '<td>' + datas[i].user_id + '</td>';
						newmsg += '<td>' + datas[i].addtime + '</td>';
						newmsg += '<td class="handle"><span class="check">查看</span><span class="del">删除</span></td>';
						newmsg += '</tr>';
					}
					$(".inform .page_left span").text(data.data.count);
					$(".inform .page_right .total_num").text(data.data.page);
					$(".inform tbody tr").remove();
					$(".inform tbody").append(newmsg);
				} else {
					toast(data.msg)
				}
			},
			error: function(data) {

			}
		})
	}
	/*已发通知详情*/
	$(document).on("click", ".inform tbody .title,.inform tbody .handle .check", function() {
		$("#boxPock").show();
		$("#boxPock .send_add").show();
		listId = $(this).parents("tr").attr("data-id");
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Notice/info",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				id: listId
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data);
					$(".send_add .msg_type").val(data.data.type);
					$(".send_add .project_id").val(data.data.project_id);
					$(".send_add .title").val(data.data.title);
					$(".send_add .user_id").val(data.data.user_id);
					$(".send_add .contract").text(data.data.file_name);
					$(".send_add .content3").text(data.data.content);
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
					$('.send_add .reply_ul li').remove();
					$('.send_add .reply_ul').append(lis);
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	})
	//已发通知弹出
	$(document).on("click", ".send_add .btn2,.send_add .send_add_head i", function() {
		$("#boxPock").hide();
		$("#boxPock .send_add").hide();
	})
	/*新建通知============*/
	var msgNum;
	$(document).on("click", ".new_build_msg .left", function() {
		msgNum = true;
		$("#boxPock").show();
		$("#boxPock .newmsg_add").show();
		$("#boxPock .newmsg_add input").val("");
		$("#boxPock .newmsg_add textarea").val("");
		/*获取相关项目类型*/
		$.ajax({
			type: "get",
			url: host_host_host + "/home/public/correlation_projects",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {},
			success: function(data) {
				if(data.status == 1) {
					var list = "";
					list += '<option value="-1">请选择</option>';
					for(var i = 0; i < data.data.length; i++) {
						list += '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
					}
					$("#project_id_list option").remove();
					$("#project_id_list").append(list);
					$(".newmsg_add .clause").val(data.data[0].name);
					$(".newmsg_add .clause").attr("data-id", data.data[0].id);
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
		/*获取通知类型*/
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Notice/notice_type",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {},
			success: function(data) {
				if(data.status == 1) {
					var list = "";
					list += '<option value="-1">请选择</option>';
					for(var i = 0; i < data.data.length; i++) {
						list += '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
					}
					$("#msg_type_list option").remove();
					$("#msg_type_list").append(list);
					$(".newmsg_add .add_style").val(data.data[0].name);
					$(".newmsg_add .add_style").attr("data-id", data.data[0].id);
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	})
	$(document).on("click", ".newmsg_add .btn2,.newmsg_add .newmsg_add_head i", function() {
		$("#boxPock").hide();
		$("#boxPock .newmsg_add").hide();
	})
	/*提交新通知*/
	var msgBol = true;
	$(document).on("click", "#btn_add_msg", function() {
		if(msgBol) {
			msgBol = false;
			var form = new FormData($("#msgForm")[0]);
			form.append("type", $(".newmsg_add .add_style").attr("data-id"));
			form.append("project_id", $(".newmsg_add .clause").attr("data-id"));
			if($(".newmsg_add .add_style").attr("data-id") == -1) {
				toast("请选择类型")
			} else if($(".newmsg_add .clause").attr("data-id") == -1) {
				toast("请选择相关项目")
			} else if($("#title").val() == "") {
				toast("请输入标题")
			} else {
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
							toast(data.msg)
							$(".newmsg_add").hide();
							$("#boxPock").hide();
							inform(1);
						} else {
							toast("请检查数据是否完整")
						}
						msgBol = true;
					},
					error: function(e) {}
				});
			}
		}
	})
	$(document).on("change", "#project_id_list", function() {
		var id = $(this).find("option:checked").val();
		$(".newmsg_add .clause").attr("data-id", id);
	})
	$(document).on("change", "#msg_type_list", function() {
		var id = $(this).find("option:checked").val();
		$(".newmsg_add .add_style").attr("data-id", id);
	})
	/*删除通知*/
	var delNum;
	$(document).on("click", ".new_msg tbody .handle .del", function() {
		listId = $(this).parents("tr").attr("data-id");
		delNum = 1;
		$("#boxPock").show();
		$(".delMsg").show();
	})
	$(document).on("click", ".hasread tbody .handle .del", function() {
		listId = $(this).parents("tr").attr("data-id");
		delNum = 2;
		$("#boxPock").show();
		$(".delMsg").show();
	})
	$(document).on("click", ".replied tbody .handle .del", function() {
		listId = $(this).parents("tr").attr("data-id");
		delNum = 3;
		$("#boxPock").show();
		$(".delMsg").show();
	})
	$(document).on("click", ".inform tbody .handle .del", function() {
		listId = $(this).parents("tr").attr("data-id");
		delNum = 4;
		$("#boxPock").show();
		$(".delMsg").show();
	})
	$(document).on("click", ".delMsg .btn1", function() {
		if(delNum == 1) {
			delMsg(listId, 1);
			newMsg(1)
		} else if(delNum == 2) {
			delMsg(listId, 2);
			hasread(1)
		} else if(delNum == 3) {
			delMsg(listId, 3);
			replied(1)
		} else {
			delMsg(listId, 4);
			inform(1)
		}
	})

	function delMsg(id, type) {
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Notice/del",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				id: id,
				type: type
			},
			success: function(data) {
				if(data.status == 1) {
					toast(data.msg)
					$("#boxPock").hide();
					$(".delMsg").hide();
				} else {
					toast(data.msg)
				}
			},
			error: function(data) {

			},
			async: true
		});
	}
	$(document).on("click", ".delMsg .del_head i,.delMsg .btn2", function() {
		$("#boxPock").hide();
		$(".delMsg").hide();
	})
	/*下载附件*/
	$(document).on("click", ".msgcheck_add .download", function() {
		var id = pid;
		location.href = host_host_host + "/home/notice/download/id/" + id;
	})
	$(document).on("click", ".hasread_msg .download", function() {
		var id = pid;
		location.href = host_host_host + "/home/notice/download/id/" + id;
	})
	$(document).on("click", ".hasreply_msg .download", function() {
		var id = pid;
		location.href = host_host_host + "/home/notice/download/id/" + id;
	})
	$(document).on("click", ".send_add .download", function() {
		var id = listId;
		location.href = host_host_host + "/home/notice/download/id/" + id;
	})
	/*选人添加人员*/
	addPeople();
	var all;
	var work;

	function addPeople() {
		$.ajax({
			type: "post",
			url: host_host_host + "/home/project/election",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {},
			success: function(data) {
				if(data.status == 1) {
					var allItem = data.data.all;
					all = "";
					work = "";
					for(var i = 0; i < allItem.length; i++) {
						all += '<li data-id="' + allItem[i].id + '">';
						all += '<i><img src="img/icon_checked.png" alt="" /></i>';
						all += '<span data-id="' + allItem[i].id + '">' + allItem[i].nickname + '</span>';
						all += '</li>';
					}
					$(".all_item .Allworker").append(all);
					//添加工种
					//					console.log(data.data.work)
					var workItem = data.data.work;
					for(var i = 0; i < workItem.length; i++) {
						work += '<div class="jobstyle">';
						work += '	<div class="job" data-id="' + workItem[i].id + '">';
						work += '		<i><img src="img/icon_checked.png" alt="" /></i>';
						work += '		<span data-id="' + workItem[i].id + '">' + workItem[i].name + '</span>';
						work += '		<s><img src="img/arrow_bottom.png"/></s>';
						work += '	</div>';
						work += '	<ul class="worker">';
						for(var j = 0; j < workItem[i].user.length; j++) {
							work += '	<li data-id="' + workItem[i].user[j].id + '">';
							work += '		<i><img src="img/icon_checked.png" alt="" /></i>';
							work += '		<span>' + workItem[i].user[j].nickname + '</span>';
							work += '	</li>';
						}
						work += '	</ul>';
						work += '</div>';
					}
					$(".now_item .now_item_cnt").append(work);
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	}
	//选人
	choose();
	var arr = [];
	var obj = {};
	var people;
	var arrone = [];
	var arrtwo = [];

	function choose() {
		$(document).on("click", "#choose", function() {
			$(".subitem_choose").show();
			$(".newmsg_add").hide();
			people = '';
			var html = "";
			arrone = [];
			arrtwo = [];
			arr = [];
			people = $(this);
			html += '<div class="work_style"><ul class="clearfix"></ul></div>';
			$(".item_right_ctn").append(html);
		})
		$(document).on("click", ".subitem_choose .subitem_choose_head i", function() {
			$("#subitem_choose").hide();
			$(".newmsg_add").show();
			$(".admin li").removeClass("active");
			$(".item_right_ctn .work_style").remove();
		})
		//选人tab切换
		$(document).on('click', '.subitem_choose_bottom .item_name li', function() {
			$(this).addClass("active").siblings().removeClass("active");
			var index = $(this).index();
			$(".subitem_choose_bottom .admin").hide();
			$(".subitem_choose_bottom .admin").eq(index).show();
		})
		//下拉显示人员
		$(document).on("click", ".subitem_choose .admin .jobstyle .job", function() {
			var display = $(this).siblings(".worker").css("display");
			$(this).siblings(".worker").slideToggle();
			var src = "img/arrow_bottom.png";
			var src1 = "img/arrow_top.png"
			if(display == "none") {
				$(this).find("s>img").attr("src", src1);
			} else {
				$(this).find("s>img").attr("src", src);
			}
		});
		//人员勾选
		$(document).on("click", ".subitem_choose .admin li i", function() {
			var id = $(this).parents("li").attr("data-id");
			if(arr.indexOf(id) == -1) {
				$(this).parents("li").addClass("active");
				arr.push(id);
				var txt = $(this).siblings("span").text();
				var lis = '<li><img src="img/icon_del.png"/><span data-id="' + id + '">' + txt + '</span></li>';
				$(".item_right_ctn .work_style ul").append(lis)
			} else {

			}
		});
		$(document).on("click", ".subitem_choose .admin li.active i", function() {
			var id = $(this).parents("li").attr("data-id");
			for(var i = 0; i < arr.length; i++) {
				if(arr[i] == id) {
					arr.splice(i, 1);
				}
			}
			$(this).parents("li").removeClass("active");
			$(".item_right_ctn .work_style ul li").each(function() {
				var dataRight = $(this).find("span").attr("data-id");
				if(dataRight == id) {
					$(this).remove();
				}
			})
		})
		//点击右边左边去掉
		$(document).on("click", ".item_right_ctn ul li img", function() {
			var litxt = $(this).siblings("span").attr("data-id");
			for(var i = 0; i < arr.length; i++) {
				if(arr[i] == litxt) {
					arr.splice(i, 1);
				}
			}
			$(this).parents("li").remove();
			$(".subitem_choose .admin li.active").each(function() {
				var lisID = $(this).attr("data-id");
				if(lisID == litxt) {
					$(this).removeClass("active");
				}
			})
		});
		//选人确认
		$(document).on('click', '#jobbtn', function() {
			$(".item_right_ctn .work_style ul li").each(function() {
				var txt = $(this).find("span").text();
				var id = $(this).find("span").attr("data-id");
				arrone.push(txt);
				arrtwo.push(id);
			})
			$("#subitem_choose").hide();
			$(".newmsg_add").show();

			$(".admin li").removeClass("active");
			$(".item_right_ctn .work_style").remove();
			people.siblings(".show").val(arrone.join(','));
			people.siblings(".hidden").val(arrtwo.join(','));
		})
	}
})