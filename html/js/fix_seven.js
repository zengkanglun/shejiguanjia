	/*======项目管理模块======*/
	/*项目负责人成员管理*/
	var laborNum;
	var userItemID; /*项目id*/
	var itemListid; /*子项目id*/
	var listId; /*列表Id*/
	var workType_id; /*工种id*/
	
	var admin;//
	
	var ject_id = localStorage.getItem("project_id");// jene 12-18
	$("#ject_id").val(ject_id);
	
	var workDuty = localStorage.getItem("workDuty");// jene 12-18
	
	if(workDuty == -1)
	admin = true;
	else
	admin = false;
	
	
	laborNum = localStorage.getItem("labor_num");
	
	$(document).on("click", ".project_data .item_type.operate", function() {
		if(sessionStorage.getItem('is_super') == 1) //如果是超级管理员
		{
			//判断是否有子项目
			if(localStorage.getItem('haveChild') == 1){
                location.href = "subitem_edit.html";
			}else{
                toast('还没有录入子项目');
            }
		}else
		{
			if(localStorage.getItem('haveChild') && sessionStorage.getItem('is_director')){
                location.href = "subitem_edit.html";
			}else{
                toast('没有录入子项目');
            }
		}
	})


var token = localStorage.getItem("token");

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
			//console.log(laborNum+":1")
			$("#boxPock .item_check1 .labor").attr("disabled", false);
			$(".item_check1 .foot_first").show();
			$(".item_check1 .foot_second").hide();
		} else {
			//console.log(laborNum+":2")
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
			//console.log(laborNum+":1")
			$("#boxPock .item_check1 .labor").attr("disabled", false);
			$(".item_check1 .foot_first").show();
			$(".item_check1 .foot_second").hide();
		} else {
			
			//console.log(laborNum+":2")
			$("#boxPock .item_check1 .labor").attr("disabled", true);
			$(".item_check1 .foot_first").hide();
			$(".item_check1 .foot_second").show();
		}
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
					//console.log(itemListid, work_id)
					msgID(itemListid, workType_id); /*调取第三步*/
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	}
	
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
					//					
					console.log(data)
					$(".item_tablerr").html();
					var item_table = "";
					for(var i = 0; i < data.data.user.length; i++) {
						item_table += '<tr user-id="' + data.data.user[i].user_id + '" item-id="' + data.data.user[i].id + '">';
						item_table += '<td>' + (i + 1) + '</td>';
						item_table += '<td>' + data.data.user[i].nickname + '</td>';
						item_table += '<td>' + data.data.user[i].work.name + '</td>';
						item_table += '<td>' + data.data.user[i].labor + '</td>';
						item_table += '<td>' + data.data.user[i].content + '</td>';
						item_table += '<td class="handle"><span class="edit">编辑</span><span class="del">删除</span></td>';
						item_table += '</tr>';
					}
					$(".item_tablerr tbody tr").remove();
					$(".item_tablerr tbody").append(item_table);
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


	/**/
	
	
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
	/*项目管理计提===============*/
	

	$(document).on("click", ".item_check1_head i,.item_check1 .btn2", function() {
		$("#boxPock .userAdminSeven").show();
		$("#boxPock .item_check1").hide();
	})
	/*工种分工情况获取*/
	











/*如果是超级管理员则，如下*/

/*项目主管和系统管理员成员管理进行中*/
	 