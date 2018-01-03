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
        $('.commissionModify').html('修改');
		var txt = $(this).text();
		$(".userAdminFive .cnt_header .right .floor").text(txt);
	})
	$(document).on("click", ".worktype .bigfloor .floor_ul li", function() {
		$(this).addClass("active").siblings().removeClass("active");
		var txt = $(this).text();
		$(".worktype .cnt_header .right .floor").text(txt);
	})

	/*	10/17================*/
	/*获取项目管理列表*/
	//	itemNOWlist(1, 1);
	itemNOWlist(1, 1);
	/*项目管理进行中页面增加*/
	$(document).on("click", ".item_manage1 .third .page_right .more", function() {
		var total_num = Number($(".item_manage1 .third .page_right .total_num").text());
		var num = Number($(".item_manage1 .third .page_right .number").text());
		var pastnum = $(".item_manage1 .forth .page_right .number").text();
		console.log(total_num, num)
		if(num >= total_num) {
			console.log("大于")
			toast("已经是最后一页了")
		} else {
			num++;
			$(".item_manage1 .third .page_right .number").text(num);
			itemNOWlist(num, pastnum);
		}
	})
	/*项目管理进行中页面减少*/
	$(document).on("click", ".item_manage1 .third .page_right .less", function() {
		var num = Number($(".item_manage1 .third .page_right .number").text());
		var pastnum = Number($(".item_manage1 .forth .page_right .number").text());
		if(num == 1) {
			toast("已经是第一页了")
		} else {
			num--;
			$(".item_manage1 .third .page_right .number").text(num);
			itemNOWlist(num, pastnum);
		}
	})
	/*项目管理进行中跳页*/
	$(document).on("click", ".item_manage1 .third .paging .jump .go", function() {
		var jump_num = Number($(this).siblings(".jump_page").val());
		var pastnum = $(".item_manage1 .forth .page_right .number").text();
		if(jump_num > 0) {
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
			itemNOWlist(jump_num, pastnum);
		} else {
			toast("请输入正常页码")
		}
	})
	/*项目管理已完成页面增加*/
	$(document).on("click", ".item_manage1 .forth .page_right .more", function() {
		var total_num = $(".item_manage1 .forth .page_right .total_num").text();
		var pastnum = $(".item_manage1 .forth .page_right .number").text();
		var num = $(".item_manage1 .third .page_right .number").text();
		if(pastnum >= total_num) {
			toast("已经是最后一页了")
		} else {
			pastnum++;
			$(".item_manage1 .forth .page_right .number").text(pastnum);
			itemNOWlist(num, pastnum);
		}
	})
	/*项目管理已完成页面减少*/
	$(document).on("click", ".item_manage1 .forth .page_right .less", function() {
		var pastnum = $(".item_manage1 .forth .page_right .number").text();
		var num = $(".item_manage1 .third .page_right .number").text();
		if(pastnum == 1) {
			toast("已经是第一页了")
		} else {
			pastnum--;
			$(".item_manage1 .forth .page_right .number").text(pastnum);
			itemNOWlist(num, pastnum);
		}
	})
	/*项目管理已完成跳页*/
	$(document).on("click", ".item_manage1 .forth .paging .jump .go", function() {
		var jump_num = Number($(this).siblings(".jump_page").val());
		var pastnum = $(".item_manage1 .third .page_right .number").text();
		if(jump_num > 0) {
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
			itemNOWlist(pastnum, jump_num);
		} else {
			toast("请输入正常页码")
		}
	})
	/*进行中,已完成的页面*/
	function itemNOWlist(p1, p2) {
		$.ajax({
			type: "post",
			url: host_host_host + "/home/project/project_data",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				p1: p1,
				p2: p2,
			},
			success: function(data) {
				if(data.status == 1) {
					var nowList = "";
					var datas = data.data.get_on;
					for(var i = 0; i < datas.length; i++) {
						nowList += '<div class="item_table clearfix" data-id="' + datas[i].id + '">';
						nowList += '<div class="list_one">' + (i + 1) + '</div>';
						nowList += '<div class="list_two">';
						nowList += '<a href="index.html?project_id=' + datas[i].id + '">' + datas[i].name + '</a>';
						nowList += '</div>';
						nowList += '<ul class="list_three">';
						for(var j = 0; j < datas[i].chield_work.length; j++) {
							nowList += '<li data-id="' + datas[i].chield_work[j].work_id + '">' + datas[i].chield_work[j].name + '</li>';
						}
						nowList += '</ul>';
						nowList += '<ul class="list_four">';
						for(var j = 0; j < datas[i].chield_work.length; j++) {
							nowList += '<li data-id="' + datas[i].chield_work[j].work_id + '"></li>';
						}
						nowList += '</ul>';
						nowList += '<ul class="list_five">';
						for(var j = 0; j < datas[i].chield_work.length; j++) {
							nowList += '<li data-id="' + datas[i].chield_work[j].work_id + '"></li>';
						}
						nowList += '</ul>';
						nowList += '<ul class="list_six">';
						for(var j = 0; j < datas[i].chield_work.length; j++) {
							nowList += '<li data-id="' + datas[i].chield_work[j].work_id + '"></li>';
						}
						nowList += '</ul>';
						nowList += '</div>';
					}
					$(".item_manage1 .third .item_box .item_table").remove();
					$(".item_manage1 .third .item_box").append(nowList);
					$(".item_manage1 .third .page_left span").text(data.data.count[0]);
					$(".item_manage1 .third .page_right .total_num").text(data.data.page[0]);
					var pastList = "";
					var pastData = data.data.end;
					for(var i = 0; i < pastData.length; i++) {
						pastList += '<div class="item_table clearfix" data-id="' + pastData[i].id + '">';
						pastList += '<div class="list_one">' + (i + 1) + '</div>';
						pastList += '<div class="list_two">';
						pastList += '<a href="index.html?project_id=' + pastData[i].id + '">' + pastData[i].name + '</a>';
						pastList += '</div>';
						pastList += '<ul class="list_three">';
						for(var j = 0; j < pastData[i].chield_work.length; j++) {
							pastList += '<li data-id="' + pastData[i].chield_work[j].work_id + '">' + pastData[i].chield_work[j].name + '</li>';
						}
						pastList += '</ul>';
						pastList += '<ul class="list_four">';
						for(var j = 0; j < pastData[i].chield_work.length; j++) {
							pastList += '<li data-id="' + pastData[i].chield_work[j].work_id + '"></li>';
						}
						pastList += '</ul>';
						pastList += '<ul class="list_five">';
						for(var j = 0; j < pastData[i].chield_work.length; j++) {
							pastList += '<li data-id="' + pastData[i].chield_work[j].work_id + '"></li>';
						}
						pastList += '</ul>';
						pastList += '<ul class="list_six">';
						for(var j = 0; j < pastData[i].chield_work.length; j++) {
							pastList += '<li data-id="' + pastData[i].chield_work[j].work_id + '"></li>';
						}
						pastList += '</ul>';
						pastList += '</div>';
					}
					$(".item_manage1 .forth .item_box .item_table").remove();
					$(".item_manage1 .forth .item_box").append(pastList);
					$(".item_manage1 .forth .page_left span").text(data.data.count[1]);
					$(".item_manage1 .forth .page_right .total_num").text(data.data.page[1]);

					/*权限判断*/
					$(".item_manage1  .item_box .item_table .list_four li").each(function() {
						var type = $(this).attr("data-id");
						if(type == 0) {
							$(this).addClass("item_manage");
							$(this).append('<span class="operate">操作</span>');
						} else if(type == -1) {
							$(this).addClass("item_system");
							$(this).append('<span class="operate">操作</span>');
						} else {

						}
					})
					$(".item_manage1 .item_box .item_table .list_five li").each(function() {
						var type = $(this).attr("data-id");
						if(type == 0) {
							$(this).addClass("member_manage");
							$(this).append('<span class="operate">操作</span>');
						} else if(type == -1) {
							$(this).addClass("member_system");
							$(this).append('<span class="manage">主管</span><span  class="work">工种</span>');
						} else {
							$(this).addClass("member_work");
							$(this).append('<span class="operate">操作</span>');
						}
					})
					$(".item_manage1 .item_box .item_table .list_six li").each(function() {
						var type = $(this).attr("data-id");
						if(type == 0) {
							$(this).addClass("count_manage");
							$(this).append('<span class="operate">操作</span>');
						} else if(type == -1) {
							$(this).addClass("count_system");
							$(this).append('<span class="manage">主管</span><span  class="work">工种</span>');
						} else {
							$(this).addClass("count_work");
							$(this).append('<span class="operate">操作</span>');
						}
					})
					/*获取长度*/
					$(".item_box .item_table").each(function() {
						var length = $(this).height();
						$(this).find(".list_two,.list_one,.list_two a").css({
							"height": length,
							"lineHeight": length + "px",
						})
					})
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	}
	/*获取项目管理列表结束*/

	/*提交修改*/
	/*======项目管理模块======*/
	/*项目负责人成员管理*/
	var laborNum;
	var userItemID; /*项目id*/
	var itemListid; /*子项目id*/
	var listId; /*列表Id*/
	var workType_id; /*工种id*/
	$(document).on("click", ".item_manage1 .third .member_work .operate", function() {
		laborNum = 1;
		$("#boxPock").show();
		$("#boxPock .userAdminSeven").show();
		userItemID = $(this).parents(".item_table").attr("data-id");//点击操作按钮 拿到用户id jene
		item_msg(userItemID);
	})
	$(document).on("click", ".item_manage1 .forth .member_work .operate", function() {
		laborNum = 2;
		$("#boxPock").show();
		$("#boxPock .userAdminSeven").show();
		userItemID = $(this).parents(".item_table").attr("data-id");
		item_msg(userItemID);
	})
	/*系统管理员成员管理的工种部分*/
	$(document).on("click", ".item_manage1 .third .member_system .work", function() {
		laborNum = 1;
		$("#boxPock").show();
		$("#boxPock .userAdminSeven").show();
		userItemID = $(this).parents(".item_table").attr("data-id");
		item_msg(userItemID);
	})
	$(document).on("click", ".item_manage1 .forth .member_system .work", function() {
		laborNum = 2;
		$("#boxPock").show();
		$("#boxPock .userAdminSeven").show();
		userItemID = $(this).parents(".item_table").attr("data-id");
		item_msg(userItemID);
	})
	/*工种分工子项目切换*/
	$(document).on("click", ".subitem_name li", function() {
		itemListid = $(this).attr("data-id");
		var index = $(this).index();
		var txt = $(this).text();
		$(this).addClass("active").siblings().removeClass("active");
		$(".manage_left").text(txt);
		$(".item_choose input").val(" ");
		$(".item_choose input").attr("data-id", 0);
		$(".userAdminSeven .w_choose li").remove();
		$(".userAdminSeven table tbody tr").remove();
		work_manage(itemListid);
	})
	/*工种编辑情况*/
	$(document).on("click", ".userAdminSeven tbody .edit", function() {
		$("#boxPock .userAdminSeven").hide();
		$("#boxPock .item_check1").show();
		var user_id = $(this).parents("tr").attr("user-id"); /*用户id*/
		itemListid = $(".userAdminSeven .subitem_name li.active").attr("data-id");
		listId = $(this).parents("tr").attr("item-id");
		workType_id = $(".userAdminSeven .item_choose input").attr("data-id");
		var name = $(this).parents("tr").find("td").eq(1).text();
		var work = $(this).parents("tr").find("td").eq(3).text();
		var content1 = $(this).parents("tr").find("td").eq(4).text();
		$.ajax({
			type: "post",
			url: host_host_host + "/home/project/history",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				id: user_id,
				chile_id: itemListid,
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data)
					$(".item_check1 .nickname").val(name);
					$(".item_check1 .labor").val(work);
					$(".item_check1 .cnt_bottom textarea").text(content1);
					//					$(".item_check1 .nickname").val(data.data.staff.nickname);
					//					$(".item_check1 .labor").val(data.data.staff.labor);
					var datas = data.data.project_staff;
					var content = "";
					for(var i = 0; i < datas.length; i++) {
						content += '<div class="first_stage">';
						content += '<div class="stage_head">';
						content += '<span>阶段：</span><span>' + datas[i].start_time + '-' + datas[i].end_time + '</span>';
						content += '</div>';
						content += '<textarea name="" rows="" cols="" value="" disabled="disabled">' + datas[i].content + '</textarea>';
						content += '</div>';
					}
					$(".item_check1 .history_work .first_stage").remove();
					$(".item_check1 .history_work").append(content)
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
		if(laborNum == 1) {
			$("#boxPock .item_check1 .labor").attr("disabled", false);
			$(".item_check1 .foot_first").show();
			$(".item_check1 .foot_second").hide();
		} else {
			$("#boxPock .item_check1 .labor").attr("disabled", true);
			$(".item_check1 .foot_first").hide();
			$(".item_check1 .foot_second").show();
		}
	})
	/*编辑确认*/
	$(document).on("click", ".item_check1 .btn1", function() {
		$("#boxPock .userAdminSeven").show();
		$("#boxPock .item_check1").hide();
		var content = $(".item_check1 .labor").val();
		$.ajax({
			type: "post",
			url: host_host_host + "/home/project/EditLabor",
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
					$(".userAdminSeven").show();
					$("#boxPock .item_check1").hide();
					msgID(itemListid, workType_id);
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	})
	/*工种删除情况*/
	$(document).on("click", ".userAdminSeven tbody .del", function() {
		itemListid = $(".subitem_name li.active").attr("data-id"); /*子项目id*/
		listId = $(this).parents("tr").attr("item-id"); /*列表id*/
		workType_id = $(".userAdminSeven .item_choose input").attr("data-id"); /*工种id*/
		$(".userAdminSeven").hide();
		$("#boxPock .delremind").show();
	})
	/*确认删除*/
	$(document).on("click", ".delremind .btn1", function() {
		$.ajax({
			type: "post",
			url: host_host_host + "/home/process/dele",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				id: listId,
				type: 5,
			},
			success: function(data) {
				if(data.status == 1) {
					toast(data.msg);
					$(".userAdminSeven").show();
					$("#boxPock .delremind").hide();
					msgID(itemListid, workType_id);
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
		if(laborNum == 1) {
			$("#boxPock .item_check1 .labor").attr("disabled", false);
			$(".item_check1 .foot_first").show();
			$(".item_check1 .foot_second").hide();
		} else {
			$("#boxPock .item_check1 .labor").attr("disabled", true);
			$(".item_check1 .foot_first").hide();
			$(".item_check1 .foot_second").show();
		}
	})
	$(document).on("click", ".delremind .btn2,.delremind .del_head i", function() {
		$(".userAdminSeven").show();
		$("#boxPock .delremind").hide();
	})
	$(document).on("click", ".item_check1_head i,.item_check1 .btn2", function() {
		$("#boxPock .userAdminSeven").show();
		$("#boxPock .item_check1").hide();
	})
	/*工种分工情况获取*/
	/*第一步获取子项目*/
	function item_msg(id) {
		$.ajax({
			type: "post",
			url: host_host_host + "/home/project/index",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				project_id: id
			},
			success: function(data) {
				if(data.status == 1) {
					var item_li = "";
					for(var i = 0; i < data.data.child.length; i++) {
						item_li += '<li data-id="' + data.data.child[i].id + '">' + data.data.child[i].name + '</li>';
					}
					$(".subitem_name li").remove();
					$(".subitem_name").append(item_li);
					$(".subitem_name li").eq(0).addClass("active");
					$(".manage_left").text(data.data.child[0].name);
					itemListid = data.data.child[0].id;
					work_manage(itemListid); /*调取第二步*/
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	}
	/*/*第二步工种负责人表格*/
	function work_manage(id) {
		$.ajax({
			type: "get",
			url: host_host_host + "/home/project/work_list",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				id: id
			},
			success: function(data) {
				if(data.status == 1) {
					console.log(data)
					var item_li = "";
					for(var i = 0; i < data.data.length; i++) {
						item_li += '<li data-id="' + data.data[i].id + '">' + data.data[i].name + '</li>';
					}
					$(".userAdminSeven .w_choose li").remove();
					$(".userAdminSeven .w_choose").append(item_li);
					$(".userAdminSeven .item_choose input").val(data.data[0].name);
					$(".userAdminSeven .item_choose input").attr("data-id", data.data[0].id);
					workType_id = data.data[0].id;
					console.log(itemListid, work_id)
					msgID(itemListid, workType_id); /*调取第三步*/
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	}
	/*负责人切换*/
	$(document).on("click", ".userAdminSeven .item_choose i", function() {
		$(".userAdminSeven .w_choose").slideToggle();
	})
	$(document).on("click", ".userAdminSeven .w_choose li", function() {
		$(".userAdminSeven .item_choose input").val($(this).text());
		$(".userAdminSeven .item_choose input").attr("data-id", $(this).attr("data-id"));
		$(".userAdminSeven .w_choose").slideUp();
		itemListid = $(".userAdminSeven .subitem_name li.active").attr("data-id");
		workType_id = $(this).attr("data-id");
		msgID(itemListid, workType_id); /*调取第三步*/
	})
	/*第三步工种分工的列表情况*/
	function msgID(chile_id, work_id) {
		$.ajax({
			type: "get",
			url: host_host_host + "/home/project/user_list",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				id: chile_id,
				work_id: work_id
			},
			success: function(data) {
				if(data.status == 1) {
					// console.log(data)
					var item_table = "";
					for(var i = 0; i < data.data.user.length; i++) {
						item_table += '<tr user-id="' + data.data.user[i].user_id + '" item-id="' + data.data.user[i].id + '">';
						item_table += '<td>' + (i + 1) + '</td>';
                        item_table += '<td>' + data.data.user[i].nickname + '</td>';
						if(data.data.user[i].status == 2){
                            item_table += '<td>' + data.data.user[i].work.name + '负责人</td>';
						}else {
                            item_table += '<td>' + data.data.user[i].work.name + '</td>';
						}
						item_table += '<td>' + data.data.user[i].labor + '</td>';
						item_table += '<td>' + data.data.user[i].content + '</td>';
                        if(data.data.user[i].status == 2){
                            item_table += '<td class="handle"><span class="edit">编辑</span></td>';

                        }else {
                            item_table += '<td class="handle"><span class="edit">编辑</span><span class="del">删除</span></td>';
                        }
						item_table += '</tr>';
					}
					$(".item_table tbody tr").remove();
					$(".item_table tbody").append(item_table);
					if(laborNum == 2) {
						$(".userAdminSeven .manage_right").hide();
						$(".userAdminSeven .item_choose").hide();
						$(".userAdminSeven tbody tr .handle .edit").text("详情");
						$(".userAdminSeven tbody tr .handle .del").hide();
					} else {
						$(".userAdminSeven .manage_right").show();
						$(".userAdminSeven .item_choose").show();
						$(".userAdminSeven tbody tr .handle .edit").text("编辑");
						$(".userAdminSeven tbody tr .handle .del").show();
					}
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	}
	/*工种分工情况结束*/
	$(".userAdminSeven tbody .handle .edit").on("click", function() {
		if(laborNum == 1) {
			$(".item_check .foot_first").show();
			$(".item_check .foot_second").hide();
		} else {
			$(".item_check .foot_first").hide();
			$(".item_check .foot_second").show();
		}
		$("#boxPock .userAdminSeven").hide();
		$("#boxPock .item_check").show();
	})

	/*项目负责人成员管理结束*/
	$(".userAdminSeven .itemmanage_head i,.userAdminSeven .btn2").on("click", function() {
		$("#boxPock").hide();
		$("#boxPock .userAdminSeven").hide();
	})
	/*添加成员*/
	$(document).on("click", ".userAdminSeven .manage_detail .manage_right", function() {
		itemListid = $(".subitem_name li.active").attr("data-id");
		workType_id = $(".userAdminSeven .item_choose input").attr("data-id");
		$("#boxPock .addMember input").val("");
		$("#boxPock .userAdminSeven").hide();
		$("#boxPock .addMember").show();
	})
	$(".addMember .addMember_head i,.addMember .btn2").on("click", function() {
		$("#boxPock .userAdminSeven").show();
		$("#boxPock .addMember").hide();
	})

	$(document).on("click", ".addMember .btn1", function() {
		var memberID = $(".addMember .show").attr("data-id");
		var labor = $(".addMember .title").val();
		if(memberID == 0) {
			toast("请选择人员")
		} else if(labor == "") {
			toast("请填写分工情况")
		} else {
			$.ajax({
				type: "post",
				url: host_host_host + "/home/project/labor",
				dataType: 'json',
				headers: {
					accept: "usertoken:" + token,
				},
				data: {
					user_id: memberID,
					labor: labor,
					project_child_id: itemListid,
					work_id: workType_id
				},
				success: function(data) {
					if(data.status == 1) {
						msgID(itemListid, workType_id)
						$("#boxPock .userAdminSeven").show();
						$("#boxPock .addMember").hide();
						toast(data.msg);
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
	/*选人*/
	choose();
	var arr = [];
	var obj = {};
	var people;

	function choose() {
		$(document).on("click", ".addMember .choose", function() {
			$(".addMember").hide();
			$("#subitem_choose").show();
			people = '';
			var html = "";
			people = $(this);
			html += '<div class="work_style"><ul class="clearfix"></ul></div>';
			$(".item_right_ctn").append(html);
		})
		$(document).on("click", ".subitem_choose .subitem_choose_head i", function() {
			$(".addMember").show();
			$("#subitem_choose").hide();
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
			var length = $(".item_right_ctn ul li").length;
			if(length == 0) {
				$(this).parents("li").addClass("active")
				var txt = $(this).siblings("span").text();
				var id = $(this).parents('li').attr('data-id');
				var lis = '<li data-id="' + id + '"><img src="img/icon_del.png"/><span data-id="' + id + '">' + txt + '</span></li>';
				$(".item_right_ctn ul").append(lis);
			}
		});
		$(document).on("click", ".subitem_choose .admin li.active i", function() {
			$(this).parents("li").removeClass("active");
			$(".item_right_ctn ul li").remove();
		});
		//点击右边左边去掉
		$(document).on("click", ".item_right_ctn ul li img", function() {
			$(".item_right_ctn ul li").remove();
			$(".subitem_choose_bottom .admin ul li").removeClass("active");
		});
		//选人确认
		$(document).on('click', '#jobbtn', function() {
			var dataId;
			$(".addMember").show();
			$("#subitem_choose").hide();
			var listxt = $(".item_right_ctn ul li span").text();
			if($(".item_right_ctn ul li").length == 0) {
				dataId = 0;
			} else {
				dataId = $(".item_right_ctn ul li span").attr("data-id");
			}
			$(".admin li").removeClass("active");
			$(".item_right_ctn .work_style").remove();
			people.siblings("input").val(listxt);
			people.siblings("input").attr("data-id", dataId);
		})
	}

	/*项目管理计提===============*/
	var itemId; /*项目id*/
	var countListid; /*子项目id*/
	var itemNum;
	$(document).on("click", ".item_manage1 .third .count_system .manage,.item_manage1 .third .count_manage .operate", function() {
		itemNum = 1;
		itemId = $(this).parents(".item_table").attr("data-id");
		countlist(itemId)
	})
	$(document).on("click", ".item_manage1 .forth .count_system .manage,.item_manage1 .forth .count_manage .operate", function() {
		itemNum = 2;
		itemId = $(this).parents(".item_table").attr("data-id");
		countlist(itemId)
	})
	$(document).on("click", ".userAdminFive .btn2", function() {
		$(".userAdminFive").hide();
		$("#boxPock").hide()
	})

	function countlist(itemId) {
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Commission/getProjectCommission",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				project_id: itemId,
			},
			success: function(data) {
				if(data.status == 1) {
					$("#boxPock").show();
					$("#boxPock .userAdminFive").show();
					$(".userAdminFive .project_name").val(data.data.project_info.project_name);
                    $(".userAdminFive .project_name").attr('project_id',data.data.project_info.project_id);
					$(".userAdminFive .project_time").val(data.data.project_info.project_time);
					$(".userAdminFive .stage").val(data.data.project_info.stage);
					$(".userAdminFive .floor").text(data.data.project_child_info[0].project_child_name);
					var item_ul = "";
					var goItem = "";
					var pastItem = "";
					/*项目信息*/
					for(var i = 0; i < data.data.project_child_info.length; i++) {
						item_ul += '<li data-id="' + data.data.project_child_info[i].project_child_id + '">' + data.data.project_child_info[i].project_child_name + '</li>';
					}
					$(".userAdminFive .floor_ul").html("");
					$(".userAdminFive .floor_ul").append(item_ul);
					$(".userAdminFive .floor_ul li").eq(0).addClass("active");
					if(itemNum == 1) {
						$(".userAdminFive .newCount,.userAdminFive .nowCount").show();
					} else {
						$(".userAdminFive .newCount,.userAdminFive .nowCount").hide();
					}
					countItem(itemId, data.data.project_child_info[0].project_child_id)
				} else {
					toast(data.msg)
				}
			},
			error: function(data) {

			},
			async: true
		});
	}

	function countItem(id, child_id) {
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Commission/getProjectCommission",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				project_id: id,
				project_child_id: child_id
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data)
					/*新建项目信息*/
					var newItem = "";
					for(var i = 0; i < data.data.current_work_list.length; i++) {
						newItem += '<tr>';
						newItem += '<td>' + (i + 1) + '</td>';
						newItem += '<td class="work" data-id="' + data.data.current_work_list[i].work_id + '">' + data.data.current_work_list[i].work_name + '</td>';
						newItem += '<td>' + data.data.current_work_list[i].username + '</td>';
						newItem += '<td class="work_status"><span class="check">查看</span></td>';
						newItem += '<td class="rate"><input type="number" placeholder="请输入内容" /></td>';
						newItem += '<td class="handle"><span>通知</span></td>';
						newItem += '</tr>';
					}
					$(".userAdminFive .newCount tbody tr").remove();
					$(".userAdminFive .newCount tbody").append(newItem);
					/*进行中的项目*/
					var goItem = "";
					var datas = data.data.current_commission_list.list;
					for(var i = 0; i < datas.length; i++) {
						$('.userAdminFive .add_content .floor_ul .active').attr('project-commission-id',datas[i].project_commission_id);
						goItem += '<tr data-id="' + datas[i].project_commission_id + '">';
						goItem += '<td>' + (i + 1) + '</td>';
						goItem += '<td>' + datas[i].start_time + '/' + datas[i].end_time + '</td>';
						goItem += '<td class="work" data-id="' + datas[i].work_id + '">' + datas[i].work_name + '</td>';
						goItem += '<td>' + datas[i].username + '</td>';
						goItem += '<td class="ingRate"><input readonly="readonly" type="number" value="' + datas[i].commission_rate + '" /></td>';
						goItem += '<td class="plan" data-id="' + datas[i].is_submit + '"><i class="add"></i><span class="detail">详情</span><span class="urge">催促</span></td>';
						goItem += '<td class="handle" data-id="' + datas[i].status + '"><i class="check">已审核</i><i class="nocheck">待审核</i><span class="back">退回</span><i class="defate">审核不通过</i></td>';
						goItem += '</tr>';
					}
					$(".userAdminFive .nowCount tbody tr").remove();
					$(".userAdminFive .nowCount tbody").append(goItem);
					if(data.data.current_commission_list.is_submit == 0) {
						$(".nowCount .nowbutton").show();
					} else {
						$(".nowCount .nowbutton").hide();
					}
					$(".userAdminFive tbody td.plan").each(function() {
						if($(this).attr("data-id") == 0) {
							$(this).find(".add").text("未提交");
							$(this).find(".detail").hide();
						} else {
							$(this).find(".add").text("已提交");
							$(this).find(".urge").hide();
						}
					})
					$(".userAdminFive tbody td.handle").each(function() {
						var num = $(this).attr("data-id");
						if(num == 0) {
							$(this).find(".nocheck").show();
						} else if(num == 1) {
							$(this).find(".check").show();
							$(this).find(".back").show();
						} else {
							$(this).find(".defate").show();
							$(this).find(".back").hide();
						}
					})
					/*历史项目*/
					var pastItem = "";
					for(var i = 0; i < data.data.history_commission_list.length; i++) {
						pastItem += '<tr data-id="' + data.data.history_commission_list[i].project_commission_id + '">';
						pastItem += '<td>' + (i + 1) + '</td>';
						pastItem += '<td>' + data.data.history_commission_list[i].start_time + '/' + data.data.history_commission_list[i].end_time + '</td>';
						pastItem += '<td class="work" data-id="' + data.data.history_commission_list[i].work_id + '">' + data.data.history_commission_list[i].work_name + '</td>';
						pastItem += '<td>' + data.data.history_commission_list[i].username + '</td>';
						pastItem += '<td>' + data.data.history_commission_list[i].commission_rate + '</td>';
						pastItem += '<td class="handle"><span class="detail">详情</span></td>';
						pastItem += '</tr>';
					}
					$(".userAdminFive .pastCount tbody tr").remove();
					$(".userAdminFive .pastCount tbody").append(pastItem);
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	}
	/*子项目切换*/
	$(document).on("click", ".userAdminFive .floor_ul li", function() {
		var project_child_id = $(this).attr("data-id");
		countItem(itemId, project_child_id);
	})
	/*计算计提比例*/
	var rateNum;
	var arr;
	$(document).on("blur", ".userAdminFive .newCount tbody .rate input", function() {
		rateNum = 0;
		arr = [];
		$(".userAdminFive .newCount tbody .rate input").each(function() {
			var num = $(this).val();
			arr.push(num)
		})
		for(var i = 0; i < arr.length; i++) {
			rateNum += Number(arr[i]);
		}
		rateNum.toFixed(2)
	})

	/*项目管理新建计提*/
	$(document).on("click", ".userAdminFive .newbutton", function() {
		var commission = [];
		var obj;
		var project_child_id = $(".userAdminFive .floor_ul li.active").attr("data-id");
		var start_time = $("#user_one").val();
		var end_time = $("#user_two").val();
		$(".userAdminFive .newCount table tbody tr").each(function() {
			obj = {
				work_id: $(this).find(".work").attr("data-id"),
				rate: $(this).find(".rate input").val()
			}
			if(obj.rate>0){
                commission.push(obj);
			}
		})
		// console.log(commission);
		if(!rateNum) {
			toast("请填写计提比例")
		} else if(rateNum > 100) {
			toast("计提总比例超出百分百")
		} else if(rateNum < 100) {
			var num = (100 - rateNum).toFixed(2);
			toast("还有" + num + "百分比未分配")
		} else {
			$.ajax({
				type: "post",
				url: host_host_host + "/Home/Commission/createProjectCommission",
				dataType: 'json',
				headers: {
					accept: "usertoken:" + token,
				},
				data: {
					project_child_id: project_child_id,
					start_time: start_time,
					end_time: end_time,
					commission: commission
				},
				success: function(data) {
					if(data.status == 1) {
						toast(data.msg);
						countItem(itemId, project_child_id);
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
	/*查看方案详情*/
	var project_child_id;
	var work_id;
	var project_commission_id;
	var planNum;
	$(document).on("click", ".userAdminFive .nowCount tbody .plan .detail", function() {
		project_child_id = $(".userAdminFive .floor_ul li.active").attr("data-id");
		work_id = $(this).parents("td").siblings(".work").attr("data-id");
		project_commission_id = $(this).parents("tr").attr("data-id");
		itemDetail(work_id, project_commission_id);
		planNum = 1;
		if(planNum == 1) {
			$(".item_plan .cnt_footer").show();
			$(".item_plan .detail_footer").hide();
		}
	})

	/*历史查看详情*/
	$(document).on("click", ".userAdminFive .pastCount tbody .handle .detail", function() {
		project_child_id = $(".userAdminFive .floor_ul li.active").attr("data-id");
		work_id = $(this).parents("td").siblings(".work").attr("data-id");
		project_commission_id = $(this).parents("tr").attr("data-id");
		itemDetail(work_id, project_commission_id);
		planNum = 2;
		if(planNum == 2) {
			$(".item_plan .cnt_footer").hide();
			$(".item_plan .detail_footer").show();
		}
	})

	function itemDetail(work_id, project_commission_id) {
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Finance/getProjectStaffCommission",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				work_id: work_id,
				project_commission_id: project_commission_id
			},
			success: function(data) {
				if(data.status == 1) {
					$("#boxPock .userAdminFive").hide();
					$("#boxPock .item_plan").show();
					//					console.log(data)
					$(".item_plan .start_time").val(data.data.info.start_time + "/" + data.data.info.end_time);
					$(".item_plan .work_name").val(data.data.info.work_name);
					$(".item_plan .username").val(data.data.info.username);
					$(".item_plan .commission_rate").val(data.data.info.commission_rate);
					var planItem = "";
					for(var i = 0; i < data.data.list.length; i++) {
						planItem += '<tr>';
						planItem += '<td>' + (i + 1) + '</td>';
						planItem += '<td>' + data.data.list[i].username + '</td>';
						planItem += '<td>' + data.data.list[i].labor + '</td>';
						planItem += '<td>' + data.data.list[i].content + '</td>';
						planItem += '<td>' + data.data.list[i].commission_rate + '</td>';
						planItem += '</tr>';
					}
					$(".item_plan .plan_cnt tbody tr").remove();
					$(".item_plan .plan_cnt tbody").append(planItem);
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	}
	/*方案审核通过*/
	$(document).on("click", ".item_plan .btn1", function() {
		var project_child_id = $(".userAdminFive .floor_ul li.active").attr("data-id");
		$.ajax({
			type: "post",
			url: host_host_host + "/Home/Commission/projectWorkCommissionHandle",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				project_commission_id: project_commission_id,
				work_id: work_id,
				status: 1
			},
			success: function(data) {
				if(data.status == 1) {
					toast(data.msg);
					$(".item_plan").hide();
					$(".userAdminFive").show();
					countItem(itemId, project_child_id);
				} else {
					toast(data.msg);
				}
			},
			error: function(data) {

			},
			async: true
		});
	})
	/*方案审核不通过*/
	$(document).on("click", ".item_plan .btn3", function() {
		var project_child_id = $(".userAdminFive .floor_ul li.active").attr("data-id");
		$.ajax({
			type: "post",
			url: host_host_host + "/Home/Commission/projectWorkCommissionHandle",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				project_commission_id: project_commission_id,
				work_id: work_id,
				status: 2
			},
			success: function(data) {
				if(data.status == 1) {
					toast(data.msg);
					$(".item_plan").hide();
					$(".userAdminFive").show();
					countItem(itemId, project_child_id);
				} else {
					toast(data.msg);
				}
			},
			error: function(data) {

			},
			async: true
		});
	})
	/*确认方案*/
	$(document).on("click", ".userAdminFive .nowCount .nowbutton", function() {
		var project_child_id = $(".userAdminFive .floor_ul li.active").attr("data-id");
		project_commission_id = $(".userAdminFive .nowCount tbody tr").attr("data-id");
		$.ajax({
			type: "post",
			url: host_host_host + "/Home/Commission/submitWorkCommission",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				project_commission_id: project_commission_id,
			},
			success: function(data) {
				//				console.log(data)
				if(data.status == 1) {
					toast(data.msg);
					countItem(itemId, project_child_id);
				} else {
					toast(data.msg);
				}
			},
			error: function(data) {

			},
			async: true
		});
	})
	//分工情况
	$(document).on("click", ".userAdminFive .list_detail .work_status .check", function() {
		project_child_id = $(".userAdminFive .floor_ul li.active").attr("data-id");
		work_id = $(this).parents("td").siblings(".work").attr("data-id");
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Commission/getProjectWorkCommission",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				project_child_id: project_child_id,
				work_id: work_id,
				project_commission_id: project_commission_id
			},
			success: function(data) {
				if(data.status == 1) {
					$("#boxPock .userAdminFive").hide();
					$("#boxPock .labour").show();
					//					console.log(data)
					$(".labour .start_time").val(data.data.work_info.start_time + "/" + data.data.work_info.end_time);
					$(".labour .work_name").val(data.data.work_info.work_name);
					$(".labour .username").val(data.data.work_info.username);
					$(".labour .commission_rate").val(data.data.work_info.commission_rate);
					var planItem = "";
					for(var i = 0; i < data.data.list.length; i++) {
						planItem += '<tr>';
						planItem += '<td>' + (i + 1) + '</td>';
						planItem += '<td>' + data.data.list[i].username + '</td>';
						planItem += '<td>' + data.data.list[i].labor + '</td>';
						planItem += '<td>' + data.data.list[i].content + '</td>';
						planItem += '</tr>';
					}
					$(".labour .plan_cnt tbody tr").remove();
					$(".labour .plan_cnt tbody").append(planItem);
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	})
	$(".labour .labour_head i,.labour .btn2").on("click", function() {
		$("#boxPock .userAdminFive").show();
		$("#boxPock .labour").hide();
	})
	/*退回*/
	$(document).on("click", ".userAdminFive .nowCount span.back", function() {
		var project_commission_id = $(this).parents("tr").attr("data-id");
		var work_id = $(this).parents("tr").find(".work").attr("data-id");
		var project_child_id = $(".userAdminFive .floor_ul li.active").attr("data-id");
		$.ajax({
			type: "post",
			url: host_host_host + "/Home/Commission/rockBack",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				project_commission_id: project_commission_id,
				work_id: work_id,
			},
			success: function(data) {
				if(data.status == 1) {
					toast(data.msg);
					countItem(itemId, project_child_id);
				} else {
					toast(data.msg);
				}
			},
			error: function(data) {

			},
			async: true
		});
	})
	/*催促*/
	$(document).on("click", ".userAdminFive .nowCount span.urge", function() {
		var project_child_id = $(".userAdminFive .floor_ul li.active").attr("data-id");
		var work_id = $(this).parents("tr").find(".work").attr("data-id");
		$.ajax({
			type: "post",
			url: host_host_host + "/Home/Commission/sendUrge",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				project_child_id: project_child_id,
				work_id: work_id,
			},
			success: function(data) {
				if(data.status == 1) {
					toast(data.msg);
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	})
	/*通知*/
	$(document).on("click", ".userAdminFive .newCount .handle span", function() {
		var project_child_id = $(".userAdminFive .floor_ul li.active").attr("data-id");
		var work_id = $(this).parents("tr").find(".work").attr("data-id");
		$.ajax({
			type: "post",
			url: host_host_host + "/Home/Commission/sendNotice",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				project_child_id: project_child_id,
				work_id: work_id,
			},
			success: function(data) {
				if(data.status == 1) {
					toast(data.msg);
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	})
	/*工种负责人=======*/
	$(document).on("click", ".item_manage1 .third .count_system .work,.item_manage1 .third .count_work .operate", function() {
		itemNum = 1;
	})
	$(document).on("click", ".item_manage1 .forth .count_system .work,.item_manage1 .forth .count_work .operate", function() {
		itemNum = 2;
	})
	$(document).on("click", ".worktype .btn2", function() {
		$(".worktype").hide();
		$("#boxPock").hide()
	})
	$(document).on("click", ".item_manage1 .count_system .work,.item_manage1 .count_work .operate", function() {
		itemId = $(this).parents(".item_table").attr("data-id"); /*项目id*/
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Commission/getProjectStaffCommission",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				project_id: itemId,
			},
			success: function(data) {
				if(data.status == 1) {
					$("#boxPock").show();
					$("#boxPock .worktype").show();
					$(".worktype .project_name").val(data.data.project_info.project_name);
					$(".worktype .project_time").val(data.data.project_info.project_time);
					$(".worktype .stage").val(data.data.project_info.stage);
					$(".worktype .username").val(data.data.project_info.username);

					$(".worktype_bottom .floor").text(data.data.project_child_info[0].project_child_name);
					var item_ul = "";
					var goItem = "";
					var pastItem = "";
					var datas = data.data.project_child_info;
					/*项目信息*/
					for(var i = 0; i < datas.length; i++) {
						item_ul += '<li data-id="' + datas[i].project_child_id + '">' + datas[i].project_child_name + '</li>';
					}
					$(".worktype .floor_ul").html("");
					$(".worktype .floor_ul").append(item_ul);
					$(".worktype .floor_ul li").eq(0).addClass("active");
					countListid = datas[0].project_child_id;
					work1_manage(countListid);
					if(itemNum == 1) {
						$(".worktype .newCount,.worktype .history_list").show();
					} else {
						$(".worktype .nowCount").hide();
					}
				} else {
					toast(data.msg)
				}
			},
			error: function(data) {

			},
			async: true
		});
	})
	/*/*第二步工种负责人表格*/
	function work1_manage(id) {
		$.ajax({
			type: "get",
			url: host_host_host + "/home/project/work_list",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				id: id
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data)
					var item_li = "";
					for(var i = 0; i < data.data.length; i++) {
						item_li += '<li data-id="' + data.data[i].id + '">' + data.data[i].name + '</li>';
					}
					$(".worktype .w_choose1 li").remove();
					$(".worktype .w_choose1").append(item_li);
					$(".worktype .item_choose1 input").val(data.data[0].name);
					$(".worktype .item_choose1 input").attr("data-id", data.data[0].id);
					workType_id = data.data[0].id;
					workItem(itemId, countListid, workType_id); /*调取第三步*/
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	}

	function workItem(id, child_id, work_id) {
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Commission/getProjectStaffCommission",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				project_id: id,
				project_child_id: child_id,
				work_id: work_id,
			},
			success: function(data) {
				if(data.status == 1) {
					$(".worktype .rate").val(data.data.project_info.rate);
					/*进行中的项目*/
					//					console.log(data)
					$(".worktype .nowCount tbody tr").remove();
                    if(data.data.current_staff_commission.length == 0){
                        $(".worktype .nowCount .plansure").hide();
                        $(".worktype .nowCount .workbutton").hide();
                    }else{
                        var is_submit = data.data.current_staff_commission.is_submit;
                        if(is_submit == 0) {
                            $(".worktype .plansure").hide();
                            $(".worktype .workbutton").show();
                        } else {
                            $(".worktype .plansure").show();
                            $(".worktype .workbutton").hide();
                        }
                    }
					var goItem = "";
					var datas = data.data.current_staff_commission.current_list;
					//					console.log(datas)
					for(var i = 0; i < datas.length; i++) {
						goItem += '<tr data-id="' + data.data.current_staff_commission.project_work_commission_id + '">';
						goItem += '<td>' + (i + 1) + '</td>';
						goItem += '<td>' + datas[i].start_time + '/' + datas[i].end_time + '</td>';
						goItem += '<td class="work" data-id="' + datas[i].project_staff_commission_id + '" user-id="' + datas[i].user_id + '">' + datas[i].username + '</td>';
						goItem += '<td>' + datas[i].labor + '</td>';
						goItem += '<td><span class="detail">详情</span></td>';
						goItem += '<td class="rate"><input type="text" placeholder="请输入比例" value="' + datas[i].commission_rate + '"/></td>';
						goItem += '<td class="handle"><i class="check">已审核</i><i class="nocheck">待审核</i><i class="check_fail">审核不通过</i></td>';
						goItem += '</tr>';
					}

					$(".worktype .nowCount tbody").append(goItem);
					$(".worktype tbody tr .handle").each(function() {
						var num = data.data.current_staff_commission.status;
						if(num == 0) {
							$(this).find(".nocheck").show();
							$(this).find(".check").hide();
							$(this).find(".check_fail").hide();
						} else if(num == 1) {
							$(this).find(".nocheck").hide();
							$(this).find(".check").show();
							$(this).find(".check_fail").hide();
						} else {
							$(this).find(".nocheck").hide();
							$(this).find(".check").hide();
							$(this).find(".check_fail").show();
						}
					})



					/*历史项目*/
					var pastItem1 = "";
					var hisDatas = data.data.history_staff_commission;
					//					console.log(data)
					for(var i = 0; i < hisDatas.length; i++) {
						pastItem1 += '<tr data-id="' + hisDatas[i].project_id + '">';
						pastItem1 += '<td>' + (i + 1) + '</td>';
						pastItem1 += '<td>' + hisDatas[i].start_time + '/' + hisDatas[i].end_time + '</td>';
						pastItem1 += '<td class="work" user-id="' + hisDatas[i].user_id + '">' + hisDatas[i].nickname + '</td>';
						pastItem1 += '<td>' + hisDatas[i].labor + '</td>';
						pastItem1 += '<td>' + hisDatas[i].content + '</td>';
						pastItem1 += '<td>' + hisDatas[i].commission_rate + '</td>';
						pastItem1 += '<td class="handle"><span class="detail1">详情</span></td>';
						pastItem1 += '</tr>';
					}
					//					console.log(pastItem1)
					$(".worktype .history_list tbody tr").remove();
					$(".worktype .history_list tbody").append(pastItem1);
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	}

	/*子项目切换*/
	$(document).on("click", ".worktype .floor_ul li", function() {
		countListid = $(this).attr("data-id");
		$(".worktype .w_choose1 li").remove();
		$(".worktype .item_choose1 input").val("");
		$(".worktype .item_choose1 input").attr("data-id", 0);
		$(".worktype .nowCount tbody tr").remove();
		$(".worktype .plansure").hide();
		$(".worktype .workbutton").hide();
		work1_manage(countListid);
	})
	/*负责人切换*/
	$(document).on("click", ".worktype .item_choose1 i", function() {
		$(".worktype .w_choose1").slideToggle();
	})
	$(document).on("click", ".worktype .w_choose1 li", function() {
		$(".worktype .item_choose1 input").val($(this).text());
		$(".worktype .item_choose1 input").attr("data-id", $(this).attr("data-id"));
		$(".worktype .w_choose1").slideUp();
		countListid = $(".worktype .floor_ul li.active").attr("data-id");
		workType_id = $(this).attr("data-id");
		workItem(itemId, countListid, workType_id); /*调取第三步*/
	})
	/*公众负责人确认方案*/
	$(document).on("blur", ".worktype .nowCount tbody .rate input", function() {
		rateNum = 0;
		arr = [];
		$(".worktype .nowCount tbody .rate input").each(function() {
			var num = $(this).val();
			arr.push(num)
		})
		for(var i = 0; i < arr.length; i++) {
			rateNum += Number(arr[i]);
		}
		rateNum.toFixed(2);
	})
	$(document).on("click", ".worktype .workbutton", function() {
		var commission = [];
		var obj;
		var project_work_commission_id = $(".worktype .nowCount tbody tr").attr("data-id");
		countListid = $(".worktype .floor_ul li.active").attr("data-id");
		workType_id = $(".worktype .item_choose1 input").attr("data-id");
		$(".worktype .nowCount table tbody tr").each(function() {
			obj = {
				project_staff_commission_id: $(this).find(".work").attr("data-id"),
				rate: $(this).find(".rate input").val()
			}
			commission.push(obj)
		})
		//		console.log(rateNum)
		if(!rateNum) {
			toast("请填写计提比例")
		} else if(rateNum > 100) {
			toast("计提总比例超出百分百")
		} else if(rateNum < 100) {
			var num = (100 - rateNum).toFixed(2);
			toast("还有" + num + "百分比未分配")
		} else {
			$.ajax({
				type: "post",
				url: host_host_host + "/Home/Commission/createProjectStaffCommission",
				dataType: 'json',
				headers: {
					accept: "usertoken:" + token,
				},
				data: {
					project_work_commission_id: project_work_commission_id,
					commission: commission
				},
				success: function(data) {
					if(data.status == 1) {
						toast(data.msg);
						workItem(itemId, countListid, workType_id);
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
	/*工种负责人详情*/
	$(document).on("click", ".worktype .history_list tbody .handle .detail1", function() {
		$("#boxPock .worktype").hide();
		$("#boxPock .perf_detail").show();
		var project_id = $(this).parents("tr").attr("data-id");
		var user_id = $(this).parents("tr").find(".work").attr("user-id");
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Commission/performanceDetail",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				project_id: project_id,
				user_id: user_id,
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data)
					var datas = data.data.project_info;
					var dataList = data.data.list;
					var list = "";
					$(".perf_detail .user_name").val(datas.user_name);
					$(".perf_detail .project_name").val(datas.project_name);
					$(".perf_detail .supervisor_name").val(datas.supervisor_name);
					$(".perf_detail .total_commission").val(datas.total_commission);
					for(var i = 0; i < dataList.length; i++) {
						list += '<div class="job_logging">';
						list += '<div class="job_logging_title">';
						list += '<span>时间阶段：</span><span>' + dataList[i].start_time + '/' + dataList[i].end_time + '</span>';
						list += '</div>';
						list += '<div class="logging_detail clearfix">';
						list += '<div class="logging_head clearfix">';
						list += '<div class="left clearfix">';
						list += '<span>工种参与：</span>';
						list += '<input type="text" value="' + dataList[i].work_name + '" disabled="disabled"/>';
						list += '</div>';
						list += '<div class="right clearfix">';
						list += '<span>分工情况：</span>';
						list += '<input type="text" value="' + dataList[i].labor + '" disabled="disabled"/>';
						list += '</div>';
						list += '<div class="left clearfix">';
						list += '<span>计提占比：</span>';
						list += '<input type="text" value="' + dataList[i].commission_rate + '" disabled="disabled"/>';
						list += '</div>';
						list += '<div class="right clearfix group">';
						list += '<span>计提数额：</span>';
						list += '<input type="text" value="' + dataList[i].commission_money + '" disabled="disabled"/>';
						list += '</div>';
						list += '</div>';
						list += '<div class="logging_bottom">';
						list += '<div class="job_logging_header">工作记录</div>';
						list += '<textarea name="" rows="" cols="" value="" disabled="disabled">' + dataList[i].content + '</textarea>';
						list += '</div>';
						list += '</div>';
						list += '</div>';
					}
					$(".perf_detail .record .job_logging").remove();
					$(".perf_detail .record").append(list);
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});

	})
	/*进行中计提查看*/
	$(document).on("click", ".worktype .list_detail tbody td .detail", function() {
		$("#boxPock .worktype").hide();
		$("#boxPock .item_check").show();
		var user_id = $(this).parents("tr").find(".work").attr("user-id");
		var chile_id = $(".worktype .floor_ul li.active").attr("data-id");
		//		console.log(user_id)
		$.ajax({
			type: "post",
			url: host_host_host + "/home/project/history_2",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				id: user_id,
				chile_id: chile_id,
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data)
					$(".item_check .nickname").val(data.data.staff.nickname);
					$(".item_check .name").val(data.data.staff.work.name);
					$(".item_check .director").val(data.data.staff.director);
					$(".item_check .labor").val(data.data.staff.labor);
					$(".item_check .content").val(data.data.staff.content);
					var datas = data.data.project_staff;
					var content = "";
					for(var i = 0; i < datas.length; i++) {
						content += '<div class="first_stage">';
						content += '<div class="stage_head">';
						content += '<span>阶段：</span><span>' + datas[i].start_time + '-' + datas[i].end_time + '</span>';
						content += '</div>';
						content += '<textarea name="" rows="" cols="" value="" disabled="disabled">' + datas[i].content + '</textarea>';
						content += '</div>';
					}
					$(".item_check .history_work .first_stage").remove();
					$(".item_check .history_work").append(content)
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	})
	$(document).on("click", ".item_check_head i,.item_check .foot_second .btn2", function() {
		$("#boxPock .worktype").show();
		$("#boxPock .item_check").hide();
	})

	/*项目主管和系统管理员成员管理进行中*/
	$(document).on("click", ".item_manage1 .third .member_system .manage,.item_manage1 .third .member_manage .operate", function() {
		var project_id = $(this).parents(".item_table").attr("data-id");
		var workDuty = $(this).parents("li").attr("data-id");
		localStorage.setItem("project_id", project_id);
		localStorage.setItem("workDuty", workDuty);
		//		console.log(project_id, workDuty)
		console.log(workDuty)
		location.href = "subitem_edit.html";
	})
	/*项目主管和系统管理员成员管理已完成的操作*/
	$(document).on("click", ".item_manage1 .forth .member_system .manage,.item_manage1 .forth .member_manage .operate", function() {
		var project_id = $(this).parents(".item_table").attr("data-id");
		var workDuty = $(this).parents("li").attr("data-id");
		localStorage.setItem("project_id", project_id);
		localStorage.setItem("workDuty", workDuty);
		location.href = "subitem_check.html";
	})

	/*项目主管和系统管理员de项目信息操作*/
	$(document).on("click", ".item_manage1 .third .item_manage .operate,.item_manage1 .third .item_system .operate", function() {
		var project_id = $(this).parents(".item_table").attr("data-id");
		localStorage.setItem("project_id", project_id);
		localStorage.setItem("labor_num", 1);//jene 12-18
		var st = localStorage.getItem("labor_num");//jene 12-18
		
		var workDuty = $(this).parents("li").attr("data-id");
		localStorage.setItem("workDuty", workDuty);
		
		location.href = "item_edit.html";
	})

	/*项目主管和系统管理员已完成的操作*/
	$(document).on("click", ".item_manage1 .forth .item_manage .operate,.item_manage1 .forth .item_system .operate", function() {
		var project_id = $(this).parents(".item_table").attr("data-id");
		localStorage.setItem("labor_num", 2);//jene 12-18
		location.href = "item_check.html";
	})

	$(".perf_detail .perf_detail_head i,.perf_detail .btn2").on("click", function() {
		$("#boxPock .worktype").show();
		$("#boxPock .perf_detail").hide();
	})
	$(".userAdminFive .list_detail tbody .handle .detail").on("click", function() {
		$("#boxPock .userAdminFive").hide();
		$("#boxPock .item_plan").show();
	})
	$(".item_plan .item_plan_head i,.item_plan .btn2").on("click", function() {
		$("#boxPock .userAdminFive").show();
		$("#boxPock .item_plan").hide();
	})
	$(".item_manage1 tbody .item_count .operate").on("click", function() {
		$("#boxPock").show();
		$("#boxPock .userAdminFive").show();
	})
	$(".userAdminFive .perf_detail_head i,.userAdminFive .btn1").on("click", function() {
		$("#boxPock").hide();
		$("#boxPock .userAdminFive").hide();
	})
	$(".item_manage1 tbody .system_count .work").on("click", function() {
		$("#boxPock").show();
		$("#boxPock .worktype").show();
	})
	$(".worktype .worktype_head i,.worktype .btn1").on("click", function() {
		$("#boxPock").hide();
		$("#boxPock .worktype").hide();
	})

	/*修改进行中的计提*/
	$('.commissionModify').on('click',function(){
		if($('.commissionModify').html() == '修改'){
            $('.userAdminFive .newCount table tbody tr').each(function(){
                $('.ingRate input').removeAttr('readonly');
            });
			toast('请修改计提比例');
            $('.commissionModify').html('完成');
		}else{
            if($('.commissionModify').html() == '完成'){
                newRate = [];
                newRateNum = 0;
                var obj;
                commission = [];
                p_c_id = $('.userAdminFive .add_content .floor_ul .active').attr('data-id');
                p_commission_id = $('.userAdminFive .add_content .floor_ul .active').attr('project-commission-id');
                $('.userAdminFive .add_content #ingRate tbody tr').each(function(){
                	obj = {
                		work_id: $(this).find('.work').attr('data-id'),
						rate: $(this).find('.ingRate input').val()
					};
                    $work_id = $(this).find('.work').attr('data-id');
                	newRate.push($(this).find('.ingRate input').val());
                    commission.push(obj);
                });
				for(var i = 0; i < newRate.length; i++){
                    newRateNum += Number(newRate[i]);
				}
				newRateNum.toFixed(2);
                console.log($(".userAdminFive .project_name").attr('project_id'));
                console.log(p_c_id);
                console.log(p_commission_id);
				console.log(commission);
				if(!newRateNum){
					toast('请填写计提比例');
				}else if(newRateNum > 100){
                    toast("计提总比例超出百分百")
				}else if(newRateNum < 100){
                    var num = (100 - newRateNum).toFixed(2);
                    toast("还有" + num + "百分比未分配");
				}else{
                    $.ajax({
                        type: "post",
                        url: host_host_host + "/Home/Commission/updateProjectCommission",
                        dataType: 'json',
                        headers: {
                            accept: "usertoken:" + token,
                        },
                        data: {
							project_id: $(".userAdminFive .project_name").attr('project_id'),
                            project_child_id: p_c_id,
                            project_commission_id: p_commission_id,
                            commission: commission
                        },
                        success: function(data) {
							toast('修改成功');
                        },
                        error: function(data) {
                        },
                        async: true
                    });
                    $('.userAdminFive .newCount table tbody tr').each(function(){
                        $('#ingRate input').attr('readonly','readonly');
                    });
					$('.commissionModify').html('修改');
				}

            }
		}


	})
	/*删除进行中的计提*/
	$('.commissionDel').on('click',function(){
		if(confirm('确认删除？')){
			alert('del');
		};

	})
})