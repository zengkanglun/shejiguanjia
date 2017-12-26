$(function() {

	/*
	build_type:建筑类型
	stage_type:阶段类型
	work_type:工种类型
	process_type:过程纪要类型
	chutu_type:出图出差类型
	letter_type:发函管理类型
	archive_type:图纸归档类型
	task_type:任务类型
	notice_type:通知类型
	project_overhead_type:项目支出类型
	admin_overhead_type:行政支出类型
	role_type:用户角色类型

	替换URL最后一个参数得到相应类型
	*/

	var openEdit = function() {

		$("#boxPock").show();
		$("#boxPock #edit_add").show();
		
		$("#boxPock #edit").hide();
	}
	var openDel = function() {

		$("#boxPock").show();
		$("#boxPock .del").show();

	}
	//标签列表管理 e_id:：渲染元素id
	var rendChannelParam = function(data, e_id) {
		$(e_id).html("");
		for(var i in data) {
			var user = data[i];
			var item = $('<tr>' +
				'<td>' + user.id + '</td>' +
				'<td>' + user.name + '</td>' +

				'<td ><div class="tableFirstRows">' +

				'<div class="edit"  data-id="' + user.id + '"><a href="###">编辑</a></div>' +

				//'<div class="del delete"  data-id="' + user.id + '"><a href="###">删除</a></div>' +

				'</div></td>' +
				'</tr>');
			$(e_id).append(item);

		}
//		console.log(55 + e_id)
		$(".tableFirstRows .edit").on("click", function() {
			var id = $(this).data("id");
			$("#boxPock #edit_add").data("id", id);
//			console.log(id + ":::::" + $("#boxPock #edit_add").data("id"))
			openEdit(id);
		})
		$(".tableFirstRows .del").on("click", function() {
			openDel();
		})
	}

	//获取标签列表
	var getChannelParam = function(type, e_id) {


		$.ajax({
			type: "get",
			url: host_host_host + "/index.php/Home/Admin/" + type,
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			success: function(data) {
				if(data.status == 1) { //success
//					console.log(1);
//					console.log(data.msg);
//					console.log(data.data);
					rendChannelParam(data.data, e_id);
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

	//getChannelParam("build_type","#process");

	//过程管理切换 ：：通过标签页点击   调整弹框窗口状态
	$(".process_one .first .xs-3,.process_two .first .xs-3,.process_three .first .xs-3,.process_four .first .xs-3,.process_five .first .xs-3").on("click", function() {
		$(this).addClass("HeaderRowsActive").siblings().removeClass("HeaderRowsActive");
		var index = $(this).index();
		var txt = $(this).children("span").html();

		var typeN = "";
		var id = "";
		if(txt == "过程纪要") {
			typeN = "process_type";
			id = "process_type";
		} else if(txt == "出图出差") {
			typeN = "chutu_type";
			id = "chutu_type";
		} else if(txt == "发函管理") {
			typeN = "letter_type";
			id = "letter_type";
		} else if(txt == "图纸归档") {
			typeN = "archive_type";
			id = "archive_type";
		} else if(txt == "建筑类型") {
			typeN = "build_type";
			id = "build_type";
		} else if(txt == "阶段类型") {
			typeN = "stage_type";
			id = "stage_type";
		} else if(txt == "工种类型") {
			typeN = "work_type";
			id = "work_type";
		} else if(txt == "通知类型") {
			typeN = "notice_type";
			id = "notice_type";
		} else if(txt == "项目支出类型") {
			typeN = "project_overhead_type";
			id = "project_overhead_type";
		} else if(txt == "行政支出类型") {
			typeN = "admin_overhead_type";
			id = "admin_overhead_type";
		} else if(txt == "用户角色") {
			typeN = "role_type";
			id = "role_type";
		} else if(txt == "任务类型") {
			typeN = "task_type";
			id = "task_type";
		}

//		console.log(index + txt + "____" + id);
		getChannelParam(typeN, "#" + id);
//		console.log(index + txt);

		$("#boxPock #edit").data("type", "add_" + typeN); //控制弹窗类型
		$("#boxPock #edit_add").data("type", "edit_" + typeN); //控制弹窗类型
//		console.log($("#boxPock .edit").data("type"));
	})

	//新增一个栏目标签

	var newpFParam = function(addtyN) {

//		console.log(5);

		var newP = {};
		newP.name = "" + $("#short").val();

//		console.log(JSON.stringify(newP))
		token = localStorage.getItem("token");
		$.ajax({
				method: 'POST',
				dataType: 'json',
				headers: {
					accept: "usertoken:" + token
				},
				url: host_host_host  + '/index.php/home/admin/'+ addtyN,
				data: newP, //{},
			})
			.done(function(data) {
				toast(data.msg);
				if(data.status == 1) { //success
//					console.log(1);
					fresh_add(addtyN); //刷新当前列表
				} else {
//					console.log(data.msg + 5 + data.data)
				}
//				console.log(data);
//				console.log(JSON.stringify(data));
			})
			.fail(function(data) {
				toast("失败！");
//				console.log("fail!");
			})
			.always(function(data) {
//				console.log("always!");
//				console.log(JSON.stringify(data));

				//关闭弹窗
				$("#boxPock").hide();
				$("#boxPock .del").hide();
			})

	}

	//修改一个栏目标签

	var editpFParam = function(addtyN) {

//		console.log(5);

		var newP = {};
		newP.id = "" + $("#boxPock #edit_add").data("id");
		newP.name = "" + $("#shortE").val();

		//console.log(JSON.stringify(newP))
		token = localStorage.getItem("token");
		$.ajax({

				method: 'POST',
				dataType: 'json',

				headers: {
					accept: "usertoken:" + token
				},
				url: host_host_host+'/home/admin/' + addtyN,
				data: newP, //{},
			})
			.done(function(data) {
				toast(data.msg);
				if(data.status == 1) { //success
//					console.log(1);
					fresh(addtyN); //刷新当前列表
				} else {
					console.log(data.msg + 5 + data.data)
				}
//				console.log(data);
//				console.log(JSON.stringify(data));
			})
			.fail(function(data) {
				toast("失败");
//				console.log("fail!");
			})
			.always(function(data) {
//				console.log("always!");
//				console.log(JSON.stringify(data));
				//关闭弹窗
				$("#boxPock").hide();
				$("#boxPock .del").hide();
			})

	}

	//pop弹框
	//process_type"" 不同页的增加按钮，将类型赋给共有的那个弹窗
	$(".addChannelBtn").on("click", function() {
		var adTyp = $(this).data("id");
//		console.log(adTyp);
		$("#boxPock #edit").data("type", "add_" + adTyp)
		$("#boxPock").show();
		$("#boxPock #edit").show();
		$("#boxPock #edit_add").hide();
	});

	$("#boxPock .edit i").on("click", function() {
		$("#boxPock").hide();
		$("#boxPock .edit").hide();
	});

	//叉掉，或者取消掉
	$("#boxPock .del i ,#boxPock .del .btn2").on("click", function() {
		$("#boxPock").hide();
		$("#boxPock .del").hide();
	});

	//按钮创建	
	$("#boxPock #edit .btn1").on("click", function() {
		//$("#boxPock").show();
		//$("#boxPock .edit").show();
		var addtyN = $("#boxPock #edit").data("type")
		if(addtyN == "add_project_overhead_type")
			addtyN = "add_project_type";
		if(addtyN == "add_admin_overhead_type")
			addtyN = "add_admin_type";
		newpFParam(addtyN);
	});

	//按钮修改	
	$("#boxPock #edit_add #sure").on("click", function() {
		//$("#boxPock").show();
		//$("#boxPock .edit").show();
		var addtyN = $("#boxPock #edit_add").data("type")
		if(addtyN == "edit_project_overhead_type")
			addtyN = "edit_project_type";
		if(addtyN == "edit_admin_overhead_type")
			addtyN = "edit_admin_type";
		//console.log(addtyN);
		editpFParam(addtyN);
	});

	//按钮删除
	$("#boxPock .del .btn1").on("click", function() {

	})


	//新增成功后刷新列表
	var fresh_add = function(addtyN) {
		//();
		if(addtyN == "add_build_type") {
			typeN = "build_type";
			id = "build_type";
		}
		if(addtyN == "add_stage_type") {
			typeN = "stage_type";
			id = "stage_type";
		}
		if(addtyN == "add_work_type") {
			typeN = "work_type";
			id = "work_type";
		}
		if(addtyN == "add_process_type") {
			typeN = "process_type";
			id = "process_type";
		}
		if(addtyN == "add_chutu_type") {
			typeN = "chutu_type";
			id = "chutu_type";
		}
		if(addtyN == "add_letter_type") {
			typeN = "letter_type";
			id = "letter_type";
		}
		if(addtyN == "add_archive_type") {
			typeN = "archive_type";
			id = "archive_type";
		}
		if(addtyN == "add_task_type") {
			typeN = "task_type";
			id = "task_type";
		}
		if(addtyN == "add_notice_type") {
			typeN = "notice_type";
			id = "notice_type";
		}
		if(addtyN == "add_role_type") {
			typeN = "role_type";
			id = "role_type";
		}
		//
		if(addtyN == "add_project_type") {
			typeN = "project_overhead_type";
			id = "project_overhead_type";
		} 
		if(addtyN == "add_admin_type") {
			typeN = "admin_overhead_type";
			id = "admin_overhead_type";
		}
//		console.log("[::]fresh:" + addtyN);
		getChannelParam(typeN, "#" + id);
	}
	//更新成功后刷新列表
	var fresh = function(addtyN) {
		//();
		if(addtyN == "edit_build_type") {
			typeN = "build_type";
			id = "build_type";
		}
		if(addtyN == "edit_stage_type") {
			typeN = "stage_type";
			id = "stage_type";
		}
		if(addtyN == "edit_work_type") {
			typeN = "work_type";
			id = "work_type";
		}
		if(addtyN == "edit_process_type") {
			typeN = "process_type";
			id = "process_type";
		}
		if(addtyN == "edit_chutu_type") {
			typeN = "chutu_type";
			id = "chutu_type";
		}
		if(addtyN == "edit_letter_type") {
			typeN = "letter_type";
			id = "letter_type";
		}
		if(addtyN == "edit_archive_type") {
			typeN = "archive_type";
			id = "archive_type";
		}
		if(addtyN == "edit_task_type") {
			typeN = "task_type";
			id = "task_type";
		}
		if(addtyN == "edit_notice_type") {
			typeN = "notice_type";
			id = "notice_type";
		}
		if(addtyN == "edit_role_type") {
			typeN = "role_type";
			id = "role_type";
		}
		//
		if(addtyN == "edit_project_type") {
			typeN = "project_overhead_type";
			id = "project_overhead_type";
		}
		if(addtyN == "edit_admin_type") {
			typeN = "admin_overhead_type";
			id = "admin_overhead_type";
		}
//		console.log("[::]fresh:" + addtyN);
		getChannelParam(typeN, "#" + id);
	}
	////********************
	//切换大tab,自动获取一次列表
	var adjWin = function(typeN) {
		$("#boxPock #edit").data("type", "add_" + typeN); //控制弹窗类型
		$("#boxPock #edit_add").data("type", "edit_" + typeN); //控制弹窗类型
	}

	$(function() {
		//项目信息
		$("#project").on("click", function() {
			var typeN = "build_type";
			var id = "build_type";
			getChannelParam(typeN, "#" + id);
			adjWin(typeN);
		})
		//过程管理
		$("#process").on("click", function() {
			var typeN = "process_type";
			var id = "process_type";
			getChannelParam(typeN, "#" + id);
			adjWin(typeN);
		})
		//任务
		$("#task").on("click", function() {
			var typeN = "task_type";
			var id = "task_type";

//			console.log(typeN + "____" + id);
			getChannelParam(typeN, "#" + id);
			adjWin(typeN);
		})
		//通知
		$("#notice").on("click", function() {
			var typeN = "notice_type";
			var id = "notice_type";
//			console.log(typeN + "____" + id);
			getChannelParam(typeN, "#" + id);
			adjWin(typeN);
		})
		//财务切换
		$("#financial").on("click", function() {
			var typeN = "project_overhead_type";
			var id = "project_overhead_type";
			getChannelParam(typeN, "#" + id);
			adjWin(typeN);
//			console.log("财务")
		})
		//后台
		$("#backstage").on("click", function() {
			var typeN = "role_type";
			var id = "role_type";
			getChannelParam(typeN, "#" + id);
			adjWin(typeN);
//			console.log("后台")
		})

		//第一次加载列表（在用户点击tab之前）
		var autofresh = function() {
			var typeN = "process_type";
			var id = "process_type";
			getChannelParam(typeN, "#" + id);
			adjWin(typeN);
		}
		autofresh();
	})
})