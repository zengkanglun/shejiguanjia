$(function() {
	//tab切换
	var itemcheck = 0;
	var token = localStorage.getItem("token");
	$(".xs-3").eq(0).on("click", function() {
		location.href = "administration.html";
	})
	$(".xs-3").eq(1).on("click", function() {
		location.href = "admin_person.html";
	})
	//select
	$("select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	})
	$(".worktype .history_list tbody .handle .detail1").on("click", function() {
		$("#boxPock .worktype").hide();
		$("#boxPock .perf_detail").show();
	})
	$(".perf_detail .perf_detail_head i,.perf_detail .btn2").on("click", function() {
		$("#boxPock .worktype").show();
		$("#boxPock .perf_detail").hide();
	})

	//成员管理五
	$(document).on("click", ".userAdminFive .bigfloor .floor_ul li", function() {
		$(this).addClass("active").siblings().removeClass("active");
		var txt = $(this).text();
		$(".userAdminFive .cnt_header .right .floor").text(txt);
	})
	$(document).on("click", ".worktype .bigfloor .floor_ul li", function() {
		$(this).addClass("active").siblings().removeClass("active");
		var txt = $(this).text();
		$(".worktype .cnt_header .right .floor").text(txt);
	})
	/*	10/17================*/
	/*人员管理管理获取页面*/
	person();
	hisPerson();
	/*姓名搜索*/
	$(document).on("click", ".member_manage2 .s_name", function() {
		var startTime = $("#admin_three").val();
		var endtime = $("#admin_four").val();
		var name = $("#search_name").val();
		if(name.length > 0) {
			person(1, startTime, endtime, name);
			hisPerson(1, startTime, endtime, name);
		} else {
			toast("请输入姓名查询");
		}
	})
	/*时间搜索*/
	$(document).on("click", ".member_manage2 .seconds .search", function() {
		var startTime = $("#admin_three").val();
		var endtime = $("#admin_four").val();
		var name = $("#search_name").val();
		person(1, startTime, endtime, name);
		hisPerson(1, startTime, endtime, name);
	})
	/*用户管理增加*/
	$(document).on("click", ".member_manage2 .third .page_right .more", function() {
		var total_num = Number($(".member_manage2 .third .page_right .total_num").text());
		var num = Number($(".member_manage2 .third .page_right .number").text());
		var startTime = $("#admin_three").val();
		var endtime = $("#admin_four").val();
		var name = $("#search_name").val();
		if(num >= total_num) {
			toast("已经是最后一页了")
		} else {
			num++;
			$(".member_manage2 .third .page_right .number").text(num);
			person(num, startTime, endtime, name);
		}
	})
	/*用户管理减少*/
	$(document).on("click", ".member_manage2 .third .page_right .less", function() {
		var num = Number($(".member_manage2 .third .page_right .number").text());
		var startTime = $("#admin_three").val();
		var endtime = $("#admin_four").val();
		var name = $("#search_name").val();
		if(num == 1) {
			toast("已经是第一页了")
		} else {
			num--;
			$(".member_manage2 .third .page_right .number").text(num);
			person(num, startTime, endtime, name);
		}
	})
	/*用户管理跳页*/
	$(document).on("click", ".member_manage2 .third .paging .jump .go", function() {
		var jump_num = Number($(this).siblings(".jump_page").val());
		var startTime = $("#admin_three").val();
		var endtime = $("#admin_four").val();
		var name = $("#search_name").val();
		if(jump_num > 0) {
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
			person(jump_num, startTime, endtime, name);
		} else {
			toast("请输入正常页码")
		}
	})
	/*历史用户增加*/
	$(document).on("click", ".member_manage2 .forth .page_right .more", function() {
		var total_num = $(".member_manage2 .forth .page_right .total_num").text();
		var num = $(".member_manage2 .forth .page_right .number").text();
		var startTime = $("#admin_three").val();
		var endtime = $("#admin_four").val();
		if(num >= total_num) {
			toast("已经是最后一页了")
		} else {
			num++;
			$(".member_manage2 .forth .page_right .number").text(num);
			hisPerson(num, startTime, endtime);
		}
	})
	/*历史用户减少*/
	$(document).on("click", ".member_manage2 .forth .page_right .less", function() {
		var num = $(".member_manage2 .forth .page_right .number").text();
		//		console.log(num)
		var startTime = $("#admin_three").val();
		var endtime = $("#admin_four").val();
		if(num == 1) {
			toast("已经是第一页了")
		} else {
			num--;
			$(".member_manage2 .forth .page_right .number").text(num);
			hisPerson(num, startTime, endtime);
		}
	})
	/*用户管理跳页*/
	$(document).on("click", ".member_manage2 .forth .paging .jump .go", function() {
		var jump_num = Number($(this).siblings(".jump_page").val());
		var startTime = $("#admin_three").val();
		var endtime = $("#admin_four").val();
		var name = $("#search_name").val();
		if(jump_num > 0) {
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
			person(jump_num, startTime, endtime, name);
		} else {
			toast("请输入正常页码")
		}
	})
	/*人员管理之用户管理*/
	function person(p, startTime, endTime, name) {
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Manage/user_list",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				p: p,
				startTime: startTime,
				endtime: endTime,
				name: name
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data)
					$(".member_manage2 .third tbody tr").remove();
					/*人员管理的用户管理*/
					var person = "";
					for(var i = 0; i < data.data.data.length; i++) {
						person += '<tr>';
						person += '<td>' + (i + 1) + '</td>';
						person += '<td>' + data.data.data[i].username + '</td>';
						person += '<td>' + data.data.data[i].nickname + '</td>';
						person += '<td>' + data.data.data[i].work_type_name + '</td>';
						person += '<td>' + data.data.data[i].worktime + '</td>';
						person += '<td class="handle" data-id="' + data.data.data[i].id + '"><span class="edit">编辑</span><span class="check">查看</span></td>';
						person += '</tr>';
					}
					$(".member_manage2 .third tbody").append(person);
					$(".member_manage2 .third .page_left span").text(data.data.count);
					$(".member_manage2 .third .page_right .total_num").text(data.data.page);
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	}
	/*人员管理之历史用户*/
	function hisPerson(p, startTime, endTime, name) {
		$.ajax({
			type: "post",
			url: host_host_host + "/index.php/Home/Manage/del_users",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				p: p,
				startTime: startTime,
				endtime: endTime,
				name: name
			},
			success: function(data) {
				if(data.status == 1) {
					$(".member_manage2 .forth tbody tr").remove();
					var person = "";
					for(var i = 0; i < data.data.data.length; i++) {
						person += '<tr>';
						person += '<td>' + (i + 1) + '</td>';
						person += '<td>' + data.data.data[i].username + '</td>';
						person += '<td>' + data.data.data[i].nickname + '</td>';
						person += '<td>' + data.data.data[i].work_type + '</td>';
						person += '<td>' + data.data.data[i].worktime + '</td>';
						person += '<td>' + data.data.data[i].del_time + '</td>';
						person += '<td class="handle" data-id="' + data.data.data[i].id + '"><span class="check">查看</span></td>';
						person += '</tr>';
					}
					$(".member_manage2 .forth tbody").append(person);
					$(".member_manage2 .forth .page_left span").text(data.data.count);
					$(".member_manage2 .forth .page_right .total_num").text(data.data.page);
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	}
	var ckeckNum;
	/*人员管理之查看用户*/
	$(document).on("click", ".member_manage2 .third td .check", function() {
		ckeckNum = 1;
		var id = $(this).parents("td").attr("data-id");
		hisCheck(id);
		$("#boxPock").show();
		$(".check_person").show();
	})
	$(document).on("click", ".check_person .check_person_head i,.check_person .btn1", function() {
		$("#boxPock").hide();
		$(".check_person").hide();
	})
	/*人员管理之查看历史用户*/
	$(document).on("click", ".member_manage2 .forth td span", function() {
		ckeckNum = 2;
		var id = $(this).parents("td").attr("data-id");
		//		console.log(id)
		hisCheck(id);
		$("#boxPock").show();
		$(".history_person").show();
	})
	$(document).on("click", ".history_person .history_person_head i,.history_person .btn1", function() {
		$("#boxPock").hide();
		$(".history_person").hide();
	})
	/*用户查询调用的函数*/
	function hisCheck(id) {
		$.ajax({
			type: "get",
			url: host_host_host + "/index.php/Home/Manage/user_info",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				id: id
			},
			success: function(data) {
				if(data.status == 1) {
					if(ckeckNum == 1) {
						//						console.log(data)
						var authority = data.data.authority.split(",");
						//根据权限列表值，显示
						//"authority":"1,2,3"
						for(var i in authority) {
							var k = authority[i] - 1;
							$(".check_person .limit .choose_one").eq(k).find("img").show();
						}
						$(".check_person .username").val(data.data.username);
						$(".check_person .nickname").val(data.data.nickname);
						$(".check_person .birthday").val(data.data.birthday);
						$(".check_person .worktime").val(data.data.worktime);
						$(".check_person .school").val(data.data.school);
						$(".check_person .edu").val(data.data.edu);
						$(".check_person .position").val(data.data.position);
						$(".check_person .work_type").val(data.data.work_type_name);
						$(".check_person .mobile").val(data.data.mobile);
						$(".check_person .qq").val(data.data.qq);
						$(".check_person .remark textarea").val(data.data.remark);
						if(data.data.sex == 0) {
							$(".check_person .sex").val("保密");
						} else if(data.data.sex == 1) {
							$(".check_person .sex").val("男");
						} else {
							$(".check_person .sex").val("女");
						}
					} else {
						$(".history_person .username").val(data.data.username);
						$(".history_person .nickname").val(data.data.nickname);
						$(".history_person .birthday").val(data.data.birthday);
						$(".history_person .worktime").val(data.data.worktime);
						$(".history_person .school").val(data.data.school);
						$(".history_person .edu").val(data.data.edu);
						$(".history_person .position").val(data.data.position);
						$(".history_person .work_type").val(data.data.work_type_name);
						$(".history_person .mobile").val(data.data.mobile);
						$(".history_person .qq").val(data.data.qq);
						$(".history_person .remark textarea").val(data.data.remark);
						if(data.data.sex == 0) {
							$(".history_person .sex").val("保密");
						} else if(data.data.sex == 1) {
							$(".history_person .sex").val("男");
						} else {
							$(".history_person .sex").val("女");
						}
					}
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	}

	//编辑人员用户
	var personId;
	var pid;
	$(document).on("click", ".member_manage2 .third td .edit", function() {
		personId = $(this).parents("td").attr("data-id");
		$("#boxPock").show();
		$(".edit_person").show();
		workstyle();
		$.ajax({
			type: "get",
			url: host_host_host + "/index.php/Home/Manage/user_info",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				id: personId
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data)
					var authority = data.data.authority.split(",");
					//根据权限列表值，显示
					//"authority":"1,2,3"
					for(var i in authority) {
						var k = authority[i] - 1;
						$(".edit_person .limit .choose_one").eq(k).addClass("active");
					}
					$(".edit_person .username").val(data.data.username);
					$(".edit_person .nickname").val(data.data.nickname);
					$(".edit_person .birthday").val(data.data.birthday);
					$(".edit_person .worktime").val(data.data.worktime);
					$(".edit_person .school").val(data.data.school);
					$(".edit_person .edu").val(data.data.edu);
					$(".edit_person .edu").attr("data-id", data.data.edu_id);
					$(".edit_person .position").val(data.data.position);
					$(".edit_person .work_type").val(data.data.work_type_name);
					$(".edit_person .work_type").attr("data-id", data.data.work_type);
					$(".edit_person .mobile").val(data.data.mobile);
					$(".edit_person .qq").val(data.data.qq);
					$(".edit_person .sex").attr("data-id", data.data.sex);
					if(data.data.sex == 0) {
						$(".edit_person .sex").val("保密");
					} else if(data.data.sex == 1) {
						$(".edit_person .sex").val("男");
					} else {
						$(".edit_person .sex").val("女");
					}
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	})
	$(document).on("click", ".edit_person .edit_person_head i,.edit_person .btn2", function() {
		$("#boxPock").hide();
		$(".edit_person").hide();
	})

	/*提交修改*/
	$(document).on("click", ".edit_person .btn1", function() {
		var arr = [];
		$(".edit_person .choose .active").each(function() {
			var index = $(this).index() + 1;
			arr.push(index);
		})
		var newP = {};
		newP.id = personId;
		newP.username = $(".edit_person .username").val();
		newP.nickname = $(".edit_person .nickname").val();
		newP.birthday = $(".edit_person .birthday").val();
		newP.worktime = $(".edit_person .worktime").val();
		newP.school = $(".edit_person .school").val();
		newP.edu = $(".edit_person .edu").attr("data-id");
		newP.position = $(".edit_person .position").val();
		newP.work_type = $(".edit_person .work_type").attr("data-id");
		newP.mobile = $(".edit_person .mobile").val();
		newP.qq = $(".edit_person .qq").val();
		newP.sex = $(".edit_person .sex").attr("data-id");
		newP.authority = arr.join(",");
		if(newP.sex == -1) {
			toast("请选择性别")
		} else if(newP.work_type == "请选择工种") {
			toast("请选择工种")
		} else if(newP.edu == -1) {
			toast("请选择学历")
		} else {
			$.ajax({
				type: "post",
				url: host_host_host + "/index.php/Home/Manage/user_edit",
				dataType: 'json',
				headers: {
					accept: "usertoken:" + token,
				},
				data: newP,
				success: function(data) {
					if(data.status == 1) {
						toast(data.msg);
						var num = $(".member_manage2 .third .page_right .number").text();
						var startTime = $("#admin_three").val();
						var endtime = $("#admin_four").val();
						person(num, startTime, endtime);
						$(".edit_person").hide();
						$("#boxPock").hide();
					} else {
						toast(data.msg)
					}
				},
				error: function(data) {

				},
				async: true
			});
		}
	})
	$(".edit_person .limit .choose_one i").on("click", function() {
		$(this).parents(".choose_one").toggleClass("active");
	})
	/*获取工种类型*/
	function workstyle() {
		$.ajax({
			type: "get",
			url: host_host_host + "/index.php/Home/Public/work_types",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {},
			success: function(data) {
				if(data.status == 1) {
					$(".edit_person .work select option").remove();
					$(".add_person .work select option").remove();
					var option = "";
					option += '<option>请选择工种</option>';
					for(var i = 0; i < data.data.length; i++) {
						option += '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
					}
					$(".edit_person .work select").append(option);
					$(".add_person .work select").append(option);
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	}

	$(document).on("click", ".edit_person .work select", function() {
		var selectId = $(".edit_person .work_type").attr("data-id");
		$(".work select option[value='" + selectId + "']").attr("selected", true)
	})
	$(document).on("change", ".edit_person .work select", function() {
		$(this).siblings(".work_type").attr("data-id", $(this).val())
	})
	$(document).on("change", ".edit_person .education select", function() {
		$(this).siblings(".edu").attr("data-id", $(this).val())
	})
	$(document).on("change", ".edit_person .gender select", function() {
		$(this).siblings(".sex").attr("data-id", $(this).val())
	})
	/*人员管理创建用户*/
	$(document).on("click", ".member_manage2 .seconds button", function() {
		workstyle();
		$("#boxPock").show();
		$(".add_person").show();
	})
	$(document).on("click", ".add_person .btn1", function() {
		var arrUser = [];
		$(".add_person .choose .active").each(function() {
			var index = $(this).index() + 1;
			arrUser.push(index);
		})
		var newP = {};
		newP.id = personId;
		newP.username = $(".add_person .username").val();
		newP.password = $(".add_person .password").val();
		newP.nickname = $(".add_person .nickname").val();
		newP.birthday = $(".add_person .birthday").val();
		newP.worktime = $(".add_person .worktime").val();
		newP.school = $(".add_person .school").val();
		newP.edu = $(".add_person .edu").attr("data-id");
		newP.position = $(".add_person .position").val();
		newP.work_type = $(".add_person .work_type").attr("data-id");
		newP.mobile = $(".add_person .mobile").val();
		newP.qq = $(".add_person .qq").val();
		newP.sex = $(".add_person .sex").attr("data-id");
		newP.authority = arrUser.join(",");
		$.ajax({
			type: "post",
			url: host_host_host + "/home/manage/create",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: newP,
			success: function(data) {
				//					console.log(data)
				if(data.status == 1) {
					toast(data.msg);
					person(1);
					$(".add_person").hide();
					$("#boxPock").hide();
				} else {
					toast(data.msg)
				}
			},
			error: function(data) {

			},
			async: true
		});

	})
	$(".add_person .add_person_head i,.add_person .btn2").on("click", function() {
		$("#boxPock").hide();
		$(".add_person").hide();
	})
	$(document).on("click", ".add_person .work select", function() {
		var selectId = $(".add_person .work_type").attr("data-id");
		$(".work select option[value='" + selectId + "']").attr("selected", true)
	})
	$(document).on("change", ".add_person .work select", function() {
		$(this).siblings(".work_type").attr("data-id", $(this).val())
	})
	$(document).on("change", ".add_person .education select", function() {
		$(this).siblings(".edu").attr("data-id", $(this).val())
	})
	$(document).on("change", ".add_person .gender select", function() {
		$(this).siblings(".sex").attr("data-id", $(this).val())
	})
	/*选择权限*/
	$(".add_person .limit .choose_one i").on("click", function() {
		$(this).parents(".choose_one").toggleClass("active");
	})
})