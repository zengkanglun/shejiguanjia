$(function() {
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
			url: host_host_host + "/Home/User/change_pwd",
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
					console.log(data);
					toast(data.msg);
				}
			},
			error: function(data) {
				console.log(data);
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
				url: host_host_host + "/Home/User/edit",
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
						console.log(data);
						$("#boxPock").hide();
						$(".edit").hide();
						location.reload();
					} else {
						toast(data.msg)
					}
				},
				error: function(data) {
					console.log(data);
				},
				async: true
			});
		}
	})
	//tab栏切换
	$(".recycle_ul li").on("click", function() {
		$(this).addClass("active").siblings().removeClass("active");
		var index = $(this).index();
		$(".recycle .recycle_detail").hide();
		$(".recycle .recycle_detail").eq(index).show();
		huishou((index + 1));
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
			url: host_host_host + "/Home/User/user_info",
			dataType: 'json',
			data: {},
			success: function(data) {
				if(data.status == 1) {
					console.log(data)
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
					console.log(data);
				}
			},
			error: function(data) {
				console.log(data);
			},
			async: true
		});
	}
	$.ajax({
		headers: {
			accept: 'usertoken:' + localStorage.getItem('token')
		},
		type: "get",
		url: host_host_host + "/Home/Public/work_types",
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
	huishou(2, 1);

	function huishou(t, n) {
		$.ajax({
			headers: {
				accept: 'usertoken:' + localStorage.getItem('token')
			},
			type: "get",
			url: host_host_host + "/Home/User/recycled",
			dataType: 'json',
			data: {
				type: t,
				p: n,
			},
			success: function(data) {
				if(data.status == 1) {
					console.log(data);
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
						str += '	<td>' + datas.data[i].user_id + '</td>';
						str += '	<td data-id="' + datas.data[i].id + '" class="handle"><span class="edit">编辑</span><span class="check">查看</span><span class="del">删除</span></td>';
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
					ppName.find('.process_detail .paging .page_right .less').click(function() {
						var num = $(this).siblings('.number').text();
						var all = $(this).siblings('.total_num').text();
						if(num > 1) {
							num--;
							ppName.find('.process_detail .paging .page_right .number').html(num);
							huishou(t, num);
						}
					})
					ppName.find('.process_detail .paging .page_right .more').click(function() {
						var num = $(this).siblings('.number').text();
						var all = $(this).siblings('.total_num').text();
						if(num < all) {
							num++;
							ppName.find('.process_detail .paging .page_right .number').html(num);
							huishou(t, num);
						}
					})
					ppName.find('.task_detail .paging .page_right .less').click(function() {
						var num = $(this).siblings('.number').text();
						var all = $(this).siblings('.total_num').text();
						if(num > 1) {
							num--;
							ppName.find('.task_detail .paging .page_right .number').html(num);
							huishou(t, num);
						}
					})
					ppName.find('.task_detail .paging .page_right .more').click(function() {
						var num = $(this).siblings('.number').text();
						var all = $(this).siblings('.total_num').text();
						if(num < all) {
							num++;
							ppName.find('.task_detail .paging .page_right .number').html(num);
							huishou(t, num);
						}
					})
					ppName.find('.info_detail .paging .page_right .less').click(function() {
						var num = $(this).siblings('.number').text();
						var all = $(this).siblings('.total_num').text();
						if(num > 1) {
							num--;
							ppName.find('.info_detail .paging .page_right .number').html(num);
							huishou(t, num);
						}
					})
					ppName.find('.info_detail .paging .page_right .more').click(function() {
						var num = $(this).siblings('.number').text();
						var all = $(this).siblings('.total_num').text();
						if(num < all) {
							num++;
							ppName.find('.info_detail .paging .page_right .number').html(num);
							huishou(t, num);
						}
					})
				} else {
					toast(data.msg)
				}
			},
			error: function(data) {
				toast(data.msg)
			},
			async: true
		});
//		jixiao(1);

		function jixiao(t) {
			$.ajax({
				headers: {
					accept: 'usertoken:' + localStorage.getItem('token')
				},
				type: "get",
				url: host_host_host + "/Home/user/performance",
				dataType: 'json',
				data: {
					p: t
				},
				success: function(data) {
					if(data.status == 1) {
						console.log(data);
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
							str += '	<td class="handle"><span data-id="' + datas.data[i].id + '">查看</span></td>';
							str += '</tr>';
						}
						ppName.find('.task_detail tbody').html(str);
						ppName.find('.task_detail .paging .page_left span').html(datas.count);
						ppName.find('.task_detail .paging .page_right .total_num').html(datas.page);
						ppName.find('.task_detail .paging .page_right .less').click(function() {
							var num = $(this).siblings('.number').text();
							var all = $(this).siblings('.total_num').text();
							if(num > 1) {
								num--;
								ppName.find('.task_detail .paging .page_right .number').html(num);
								jixiao(num);
							}
						})
						ppName.find('.task_detail .paging .page_right .more').click(function() {
							var num = $(this).siblings('.number').text();
							var all = $(this).siblings('.total_num').text();
							if(num < all) {
								num++;
								ppName.find('.task_detail .paging .page_right .number').html(num);
								jixiao(num);
							}
						})
					} else {

					}
				},
				error: function(data) {

				},
				async: true
			});
		}
	}

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
})