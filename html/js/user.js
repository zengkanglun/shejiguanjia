$(function() {
	/*tap选项栏*/
	$("#content .center_content .content_header .user_tab li").remove();
	tapChoose = sessionStorage.getItem("tapList");
	tapChoose = tapChoose.split('class="active"').join('class');
	if(tapChoose.indexOf("用户") < 0) {
		tapChoose += '<li class="active"><a href="user.html">用户</a><i><img src="img/icon_del.png" alt="" /></i></li>';
	} else {
		tapChoose = tapChoose.split('<li class><a href="user.html">用户</a><i><img src="img/icon_del.png" alt="" /></i></li>').join('<li class="active"><a href="user.html">用户</a><i><img src="img/icon_del.png" alt="" /></i></li>');
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
	//绩效记录弹窗打开
	$(document).on("click", ".perf .task_detail tbody .handle span", function() {
		$("#boxPock").show();
		$(".perf_detail").show();
	})
	//绩效记录弹窗关闭
	$(document).on("click", ".perf_detail .pref_head i,.perf_detail .btn1", function() {
		$("#boxPock").hide();
		$(".perf_detail").hide();
	})

	//修改密码
	$(".personal_msg .person_msg .set").on("click", function() {
		$("#boxPock").show();
		$(".change_psw").show();
	})
	//修改密码弹窗关闭
	$(".change_psw .psw_header i").click(function() {
		$("#boxPock").hide();
		$(".change_psw").hide();
	})
	//修改密码确认
	$(".change_psw .btn1").on("click", function() {
		var pp = $(this).siblings('.psw_content');
		$.ajax({
			headers: {
				accept: 'usertoken:' + localStorage.getItem('token')
			},
			type: "post",
			url: host_host_host + "/index.php/Home/User/change_pwd",
			dataType: 'json',
			data: {
				old_pwd: pp.find('.oldPwd').val(),
				new_pwd: pp.find('.newPwd').val(),
				verify_pwd: pp.find('.newPwd1').val()
			},
			success: function(data) {
				if(data.status == 1) {
					var info = data.data;
					toast(data.msg);
					$("#boxPock").hide();
					$(".perf_detail").hide();
					setTimeout(function() {
						location.href = 'login.html';
						localStorage.removeItem('token');
					}, 500)
				} else {
					//					console.log(data);
					toast(data.msg);
				}
			},
			error: function(data) {
				//				console.log(data);
			},
			async: true
		});

	})

	//编辑个人信息弹窗打开
	$(".personal_msg .msg .msg_header .edit1").on("click", function() {
		$("#boxPock").show();
		$(".edit").show();
		personalInfo();
	})
	//编辑个人信息弹窗关闭
	$(".edit .edit_head i").on("click", function() {
		$("#boxPock").hide();
		$(".edit").hide();
	})
	//编辑个人信息确定
	$(".edit .btn1").on("click", function() {
		var pp = $(this).siblings('.edit_bottom');
		if(pp.find('#editsex').attr("data-id") == -1) {
			toast("请选择性别")
		} else if(pp.find('#editedu').attr("data-id") == -1) {
			toast("请选择学历")
		} else if(pp.find('#editwork_type').attr("data-id") == -1) {
			toast("请选择工种")
		} else {
			$.ajax({
				headers: {
					accept: 'usertoken:' + localStorage.getItem('token')
				},
				type: "post",
				url: host_host_host + "/index.php/Home/User/edit",
				dataType: 'json',
				data: {
					username: pp.find('#editusername').val(),
					nickname: pp.find('#editnickname').val(),
					sex: pp.find('#editsex').attr("data-id"),
					birthday: pp.find('#editbirthday').val(),
					worktime: pp.find('#editworktime').val(),
					school: pp.find('#editschool').val(),
					edu: pp.find('#editedu').attr("data-id"),
					position: pp.find('#editposition').val(),
					work_type: pp.find('#editwork_type').attr("data-id"),
					mobile: pp.find('#editmobile').val(),
					qq: pp.find('#editqq').val()
				},
				success: function(data) {
					if(data.status == 1) {
						//						console.log(data);
						$("#boxPock").hide();
						$(".edit").hide();
						location.reload();
					} else {
						toast(data.msg)
					}
				},
				error: function(data) {
					//					console.log(data);
				},
				async: true
			});
		}
	})
	//tab栏切换
	var g_type = 2; //类型 任务
	$(".recycle_ul li").on("click", function() {
		$(this).addClass("active").siblings().removeClass("active");
		var index = $(this).index();
		$(".recycle .recycle_detail").hide();
		$(".recycle .recycle_detail").eq(index).show();
		huishou((index + 1));
		g_type = index + 1;
	})
	//select选中
	$("select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	})
	personalInfo();

	function personalInfo() {
		$.ajax({
			headers: {
				accept: 'usertoken:' + localStorage.getItem('token')
			},
			type: "GET",
			url: host_host_host + "/index.php/Home/User/user_info",
			dataType: 'json',
			data: {},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data)
					var info = data.data
					$("#Uusername").val(info.username);
					$("#Unickname").val(info.nickname);
					$("#Usex").val(info.sex);
					$("#Ubirthday").val(info.birthday);
					$("#Uworktime").val(info.worktime);
					$("#Uschool").val(info.school);
					$("#Uedu").val(info.edu);
					$("#Uposition").val(info.position);
					$("#Uwork_type").val(info.work_type);
					$("#Umobile").val(info.mobile);
					$("#Uqq").val(info.qq);
					/*编辑*/
					$("#editusername").val(info.username);
					$("#editnickname").val(info.nickname);
					$("#editsex").val(info.sex);
					$("#editsex").attr("data-id", info.sex_id);
					$("#editbirthday").val(info.birthday);
					$("#editworktime").val(info.worktime);
					$("#editschool").val(info.school);
					$("#editedu").val(info.edu);
					$("#editedu").attr("data-id", info.edu_id);
					$("#editposition").val(info.position);
					$("#editwork_type").attr("data-id", info.work_type_id);
					$("#editwork_type").val(info.work_type);
					$("#editmobile").val(info.mobile);
					$("#editqq").val(info.qq);
					/*密码*/
					$("#pwdusername").val(info.username);
					$("#pwdnickname").val(info.nickname);
				} else {
					//					console.log(data);
				}
			},
			error: function(data) {
				//				console.log(data);
			},
			async: true
		});
	}
	$.ajax({
		headers: {
			accept: 'usertoken:' + localStorage.getItem('token')
		},
		type: "get",
		url: host_host_host + "/index.php/Home/Public/work_types",
		dataType: 'json',
		data: {},
		success: function(data) {
			if(data.status == 1) {
				var str = '';
				str += '<option value="-1">请选择工种</option>';
				for(var i = 0; i < data.data.length; i++) {
					str += '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
				}
				$('#editwork_type').siblings('select').html(str);
			} else {
				toast(data.msg)
			}
		},
		error: function(data) {
			toast(data.msg)
		},
		async: true
	});

	/*回收站*/
	huishou(2, 1);
	/*过程管理页面减少*/
	$('.process_detail .paging .page_right .less').click(function() {
		var num = Number($(this).siblings('.number').text());
		var all = Number($(this).siblings('.total_num').text());
		if(num > 1) {
			num--;
			$('.process_detail .paging .page_right .number').html(num);
			huishou(g_type, num);
		}
	})
	/*过程管理页面增加*/
	$('.process_detail .paging .page_right .more').click(function() {
		var num = Number($(this).siblings('.number').text());
		var all = Number($(this).siblings('.total_num').text());
		if(num < all) {
			num++;
			$('.process_detail .paging .page_right .number').html(num);
			huishou(g_type, num);
		}
	})
	/*过程管理跳页*/
	$('.process_detail .paging .jump .go').click(function() {
		var all = $(this).siblings('.total_num').text();
		var jump_num = Number($(this).siblings(".jump_page").val());
		console.log(jump_num)
		if(jump_num > 0) {
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
			huishou(g_type, jump_num);
		} else {
			toast("请输入正常页码")
		}
	})
	/*任务页面增加*/
	$('.u_task .paging .page_right .less').click(function() {
		var num = Number($(this).siblings('.number').text());
		var all = Number($(this).siblings('.total_num').text());
		if(num > 1) {
			num--;
			$('.task_detail .paging .page_right .number').html(num);
			huishou(g_type, num);
		} else {
			toast("已经是第一页了")
		}
	})
	/*任务页面减少*/
	$('.u_task .paging .page_right .more').click(function() {
		var num = Number($(this).siblings('.number').text());
		var all = Number($(this).siblings('.total_num').text());
		if(num < all) {
			num++;
			$('.task_detail .paging .page_right .number').html(num);
			huishou(g_type, num);
		} else {
			toast("已经是最后一页了")
		}
	})
	/*任务页面跳页*/
	$('.u_task .paging .jump .go').click(function() {
		var all = $(this).siblings('.total_num').text();
		var jump_num = Number($(this).siblings(".jump_page").val());
		console.log(jump_num)
		if(jump_num > 0) {
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
			huishou(g_type, jump_num);
		} else {
			toast("请输入正常页码")
		}
	})
	/*通知页面增加*/
	$('.info_detail .paging .page_right .less').click(function() {
		var num = Number($(this).siblings('.number').text());
		var all = Number($(this).siblings('.total_num').text());
		if(num > 1) {
			num--;
			$('.info_detail .paging .page_right .number').html(num);
			huishou(g_type, num);
		} else {
			toast("已经是第一页了")
		}
	})
	/*通知页面减少*/
	$('.info_detail .paging .page_right .more').click(function() {
		var num = Number($(this).siblings('.number').text());
		var all = Number($(this).siblings('.total_num').text());
		if(num < all) {
			num++;
			$('.info_detail .paging .page_right .number').html(num);
			huishou(g_type, num);
		} else {
			toast("已经是最后一页了")
		}
	})
	/*通知页面跳页*/
	$('.info_detail .paging .jump .go').click(function() {
		var all = $(this).siblings('.total_num').text();
		var jump_num = Number($(this).siblings(".jump_page").val());
		console.log(jump_num)
		if(jump_num > 0) {
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
			huishou(g_type, jump_num);
		} else {
			toast("请输入正常页码")
		}
	})

	function huishou(t, n) {
		$.ajax({
			headers: {
				accept: 'usertoken:' + localStorage.getItem('token')
			},
			type: "get",
			url: host_host_host + "/index.php/Home/User/recycled",
			dataType: 'json',
			data: {
				type: t,
				p: n,
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data);
					var datas = data.data;
					var str = '';
					var ppName = $('.recycle');
					for(var i = 0; i < datas.data.length; i++) {
						str += '<tr class="e9ecf1">';
						str += '	<td>' + (i + 1) + '</td>';
						str += '	<td>' + datas.data[i].add_time + '</td>';
						str += '	<td>' + datas.data[i].label + '</td>';
						str += '	<td>' + datas.data[i].type_name + '</td>';
						str += '	<td>' + datas.data[i].content + '</td>';
						str += '	<td>' + datas.data[i].del_time + '</td>';
						str += '	<td data-id="' + datas.data[i].id + '" class="handle"><span  data-id="' + datas.data[i].id + '"  class="recover">恢复</span> <span  data-id="' + datas.data[i].id + '"  class="del clean">删除</span></td>';
						str += '</tr>';
					}
					if(t == 1) {
						ppName.find('.process_detail tbody').html(str);
						ppName.find('.process_detail .paging .page_left span').html(datas.count);
						ppName.find('.process_detail .paging .page_right .total_num').html(datas.page);
					}
					if(t == 2) {
						ppName.find('.task_detail tbody').html(str);
						ppName.find('.task_detail .paging .page_left span').html(datas.count);
						ppName.find('.task_detail .paging .page_right .total_num').html(datas.page);
					}
					if(t == 3) {
						ppName.find('.info_detail tbody').html(str);
						ppName.find('.info_detail .paging .page_left span').html(datas.count);
						ppName.find('.info_detail .paging .page_right .total_num').html(datas.page);
					}
				} else {
					toast(data.msg)
				}
			},
			error: function(data) {
				toast(data.msg)
			},
			async: true
		});
	}
	/*绩效详情*/
	jixiao(1);

	function jixiao(t) {
		$.ajax({
			headers: {
				accept: 'usertoken:' + localStorage.getItem('token')
			},
			type: "get",
			url: host_host_host + "/index.php/Home/user/performance",
			dataType: 'json',
			data: {
				p: t
			},
			success: function(data) {
				if(data.status == 1) {
					//						console.log(data);
					if(data.data){
					var datas = data.data;
					var str = '';
					var ppName = $('.perf');
					for(var i = 0; i < datas.data.length; i++) {
						str += '<tr class="e9ecf1">';
						str += '	<td>' + (i + 1) + '</td>';
						str += '	<td>' + datas.data[i].interval + '</td>';
						str += '	<td>' + datas.data[i].project + '</td>';
						str += '	<td>' + datas.data[i].work_type + '</td>';
						str += '	<td>' + datas.data[i].labor + '</td>';
						str += '	<td>' + datas.data[i].commission_money + '</td>';
						str += '	<td class="handle"><span class="force" data-id="' + datas.data[i].project_id + '">查看</span></td>';
						str += '</tr>';
					}
					ppName.find('.task_detail tbody').html(str);
					ppName.find('.task_detail .paging .page_left span').html(datas.count);
					ppName.find('.task_detail tfoot .count').html(datas.total);
					ppName.find('.task_detail .paging .page_right .total_num').html(datas.page);
                    }
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	}
	/*主管绩效*/
	function zgjx(t) {
		$.ajax({
			headers: {
				accept: 'usertoken:' + localStorage.getItem('token')
			},
			type: "get",
			url: host_host_host + "/index.php/Home/user/performance_manage",
			dataType: 'json',
			data: {
				p: t
			},
			success: function(data) {
				if(data.status == 1) {
					console.log(data)
					var datas = data.data;
					var str = '';
					var ppName = $('.perf');
					for(var i = 0; i < datas.data.length; i++) {
						str += '<tr class="e9ecf1">';
						str += '	<td>' + (i + 1) + '</td>';
						str += '	<td>' + datas.data[i].interval + '</td>';
						str += '	<td>' + datas.data[i].project + '</td>';
						str += '	<td>' + datas.data[i].work_type + '</td>';
						str += '	<td>' + datas.data[i].labor + '</td>';
						str += '	<td>' + datas.data[i].commission_money + '</td>';
						str += '</tr>';
					}
					ppName.find('.manage_detail tbody').html(str);
					ppName.find('.manage_detail .paging .page_left span').html(datas.count);
					ppName.find('.manage_detail tfoot .count').html(datas.total);
					ppName.find('.manage_detail .paging .page_right .total_num').html(datas.page);
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	}
	/*绩效分页*/
	$('.perf .task_detail .paging .page_right .less').click(function() {
		var num = Number($(this).siblings('.number').text());
		var all = Number($(this).siblings('.total_num').text());
		if(num > 1) {
			num--;
			$(".perf .task_detail .paging .page_right .number").html(num);
			jixiao(num);
		} else {
			toast("已经是第一页了")
		}
	})
	$('.perf .task_detail .paging .page_right .more').click(function() {
		var num = Number($(this).siblings('.number').text());
		var all = Number($(this).siblings('.total_num').text());
		if(num < all) {
			num++;
			$(".perf .task_detail .paging .page_right .number").html(num);
			jixiao(num);
		} else {
			toast("已经是最后一页了")
		}
	})
	/*绩效跳页*/
	$('.perf .task_detail .paging .jump .go').click(function() {
		var all = Number($(this).siblings('.total_num').text());
		var jump_num = Number($(this).siblings(".jump_page").val());
		if(jump_num > 0) {
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
			jixiao(jump_num);
		} else {
			toast("请输入正常页码")
		}
	})
	/*11-17项目主管绩效*/
	$(".perf_manage li").on("click", function() {
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		if(index == 0) {
			$(".task_detail").show();
			$(".manage_detail").hide();
		} else {
			$(".task_detail").hide();
			$(".manage_detail").show();
			zgjx(1)
		}
	})
	/*绩效分页*/
	$('.perf .manage_detail .paging .page_right .less').click(function() {
		var num = Number($(this).siblings('.number').text());
		var all = Number($(this).siblings('.total_num').text());
		if(num > 1) {
			num--;
			$(".perf .manage_detail .paging .page_right .number").html(num);
			zgjx(num);
		} else {
			toast("已经是第一页了")
		}
	})
	$('.perf .manage_detail .paging .page_right .more').click(function() {
		var num = Number($(this).siblings('.number').text());
		var all = Number($(this).siblings('.total_num').text());
		if(num <= all) {
			num++;
			$(".perf .manage_detail .paging .page_right .number").html(num);
			zgjx(num);
		} else {
			toast("已经是最后一页了")
		}
	})
	/*绩效跳页*/
	$('.perf .manage_detail .paging .jump .go').click(function() {
		var all = $(this).siblings('.total_num').text();
		var jump_num = Number($(this).siblings(".jump_page").val());
		if(jump_num > 0) {
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
			zgjx(jump_num);
		} else {
			toast("请输入正常页码")
		}
	})
	/*11-17项目主管结束*/
	var g_uid = sessionStorage.getItem("uid");
	$(document).on("click", ".force", function() {
		var id = $(this).data("id");
		console.log(id);
		$.ajax({
			headers: {
				accept: 'usertoken:' + localStorage.getItem('token')
			},
			type: "get",
			url: host_host_host + "/index.php/Home/Commission/performanceDetail",
			dataType: 'json',
			data: {
				project_id: id,
				user_id: g_uid
			},
			success: function(data) {
				if(data.status == 1) {
					//						console.log(data);
					var datas = data.data;
					var info = datas.project_info;
					var list = datas.list;

					$(".info_center .project_name").val(info.project_name);
					$(".info_center .supervisor_name").val(info.supervisor_name);
					$(".info_center .user_name").val(info.user_name);
					$(".info_center .total_commission").val(info.total_commission);

					$(".item_center").html('');
					for(var i in list) {
						var o = list[i];
						var temp = $('<div class="item_head">' +
							'<span>时间阶段：</span>' +
							'<span>' + o.start_time + '-' + o.end_time + '</span>' +
							'</div>' +
							'<div class="item_bottom clearfix">' +
							'<div class="info_detail">' +
							'<div class="info_detail_left">工种参与:</div>' +
							'<input type="text" name="" id="" value="' + o.work_name + '" class="info_detail_right" disabled="" />' +
							'</div>' +
							'<div class="info_detail">' +
							'<div class="info_detail_left">分工情况:</div>' +
							'<input type="text" name="" id="" value="' + o.labor + '" class="info_detail_right" disabled="" />' +
							'</div>' +
							'<div class="info_detail">' +
							'<div class="info_detail_left">计提占比:</div>' +
							'<input type="text" name="" id="" value="' + o.commission_rate + '" class="info_detail_right" disabled="" />' +
							'</div>' +
							'<div class="info_detail">' +
							'<div class="info_detail_left">计提数额:</div>' +
							'<input type="text" name="" id="" value="' + o.commission_money + '" class="info_detail_right" disabled="" />' +
							'</div>' +
							'</div>' +
							'<div class="work_content">' +
							'<div class="work_head">' +
							'工作记录' +
							'</div>' +
							'<textarea name="" rows="" cols=""  disabled="disabled">' + o.content + '</textarea>' +
							'</div>');

						$(".item_center").append(temp);
					}
				}
			}
		})

	})

	/*新增工种，学历，性别id*/
	$(document).on("change", ".edit .work_c", function() {
		var id = $(this).find("option:checked").val();
		$("#editwork_type").attr("data-id", id);
	})
	$(document).on("change", ".edit .sex_c", function() {
		var id = $(this).find("option:checked").val();
		$("#editsex").attr("data-id", id);
	})
	$(document).on("change", ".edit .edu_c", function() {
		var id = $(this).find("option:checked").val();
		$("#editedu").attr("data-id", id);
	})

	/*恢复*/
	$(document).on("click", ".recover", function() {
		$("#boxPock").show();
		$(".del.delMsg").show();
		$(".del_bottom .btn1").attr("data-id", $(this).attr("data-id"))

	})
	/*删除*/
	$(document).on("click", ".clean", function() {
		$("#boxPock").show();
		$("#cleanMsg").show();
		$(".clean_bottom .btn1").attr("data-id", $(this).attr("data-id"))

	})
	$(document).on("click", ".del.delMsg .btn2", function() {
		$("#boxPock").hide();
		$(".del.delMsg").hide();

	})

	$(document).on("click", ".del.delMsg i", function() {
		$("#boxPock").hide();
		$(".del.delMsg").hide();

	})
	$(document).on("click", ".clean_bottom .btn2", function() {
		$("#boxPock").css("display", "none");
		$("#cleanMsg").css("display", "none");

	})

	$(document).on("click", "#cleanMsg i", function() {
		$("#boxPock").css("display", "none");
		$("#cleanMsg").css("display", "none");

	})

	$(document).on("click", ".clean_bottom .btn1", function() {
		var id = $(this).data("id");
		$.ajax({
			headers: {
				accept: 'usertoken:' + localStorage.getItem('token')
			},
			type: "get",
			url: host_host_host + "/index.php/Home/user/del_recycled",
			dataType: 'json',
			data: {
				id: id
			},
			success: function(data) {
				toast(data.msg);
				if(data.status == 1) {
					var index = $(".recycle_ul li.active").index() + 1;
					huishou(index, 1);
				} else {

				}
				$("#boxPock").hide();
				$("#cleanMsg").hide();
			},
			error: function(data) {

			},
			async: true
		});
	})

	$(document).on("click", ".del_bottom .btn1", function() {
		var id = $(this).attr("data-id");
		console.log(id);
		$.ajax({
			headers: {
				accept: 'usertoken:' + localStorage.getItem('token')
			},
			type: "get",
			url: host_host_host + "/index.php/Home/user/recover_recycled",
			dataType: 'json',
			data: {
				id: id
			},
			success: function(data) {
				toast(data.msg);
				if(data.status == 1) {
					var index = $(".recycle_ul li.active").index() + 1;
					huishou(index, 1);
				} else {

				}
				$("#boxPock").hide();
				$(".delMsg").hide();
			},
			error: function(data) {

			},
			async: true
		});
	})

})