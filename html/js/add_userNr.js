$(function() {
	/*token*/
	var token = localStorage.getItem("token");
	//获取工种类型
	var setWt = function(data) {
		//		console.log(511)
	}

	var renderWorkTypeParam = function(data, e_id) {
		$(e_id).html("");
		var item = $('<option onclick=\"setWt()\"  value="0">-</option>');
		$(e_id).append(item);
		for(var i in data) {
			//			console.log(data[i])
			var type = data[i];
			var item = $('<option onclick=\"setWt()\" data-id=' + type.id + ' value="' + type.id + '">' + type.name +
				'</option>'
			);

			$(e_id).append(item);

		}
		$(e_id).on("change", function() {

		});

	}

	var renderWorkType = function(data) {
		$("#work_type_list").html("");
		for(var i in data) {
			//			console.log(data[i])
			var type = data[i];
			var item = $('<option onclick=\"setWt()\" data-id=' + type.id + ' value="' + type.id + '">' + type.name +
				'</option>'
			);

			$("#work_type_list").append(item);

		}
		$("#work_type_list ").on("change", function() {
			//$(this).siblings().removeClass("active");
			//$(this).addClass("active");

			////alert($(this).val())
			//$(this).data("data-idd",)
		});

	}

	//获取工种类型 并渲染到指定 id 元素
	var getWorTypeParam = function(e_id) {
		var token = localStorage.getItem("token");
		$.ajax({
				headers: {
					accept: "usertoken:" + token
				},
				type: 'GET',
				dataType: 'json',
				url: host_host_host + '/index.php/home/Public/work_types'
			})
			.done(function(data) {
				//				console.log(data);
				//				console.log("[worType::]" + JSON.stringify(data));
				///renderWorkType(data.data);
				renderWorkTypeParam(data.data, e_id);
			})
			.fail(function(data) {
				//				console.log("fail!" + data.msg);
				//				console.log("fail!" + data.data);
				//				console.log("[worType::]fail!" + JSON.stringify(data));
			})
			.always(function(data) {
				//				console.log("always!");
				//				console.log("[worType::]" + JSON.stringify(data));
			})

	}

	//获取工种类型
	var getWorType = function() {
		var token = localStorage.getItem("token");
		$.ajax({
				headers: {
					//'USERTOKEN': token
					accept: "usertoken:" + token
				},
				type: 'GET',
				dataType: 'json',
				url: host_host_host + '/index.php/home/Public/work_types'
			})
			.done(function(data) {
				//				console.log(data);
				//				console.log("[worType::]" + JSON.stringify(data));
				renderWorkType(data.data);
			})
			.fail(function(data) {
				//				console.log("fail!" + data.msg);
				//				console.log("fail!" + data.data);
				//				console.log("[worType::]fail!" + JSON.stringify(data));
			})
			.always(function() {
				//				console.log("always!");
				//				console.log("[worType::]" + JSON.stringify(data));
			})

	}

	////获取角色类型
	var setWt = function(data) {
		//		console.log(511)
	}
	var renderRoleType = function(data) {
		$("#role_type_list").html();
		for(var i in data) {
			//			console.log(data[i])
			var type = data[i];
			var item = $('<option onclick=\"setWt()\" data-id=' + type.id + ' value="' + type.id + '">' + type.name +
				'</option>'
			);

			$("#role_type_list").append(item);

		}
		$("#role_type_list ").on("change", function() {
			//$(this).siblings().removeClass("active");
			//$(this).addClass("active");

			////alert($(this).val())
			//$(this).data("data-idd",)
		});

	}

	//获取角色类型
	var getWorType = function() {
		token = localStorage.getItem("token");
		$.ajax({
				headers: {
					accept: "usertoken:" + token
				},
				type: 'GET',
				dataType: 'json',
				url: host_host_host + '/index.php/home/Public/role_types',
			})
			.done(function(data) {
				//				console.log(data);
				//				console.log(JSON.stringify(data));
				renderWorkType(data.data);
			})
			.fail(function(data) {
				//				console.log("fail!" + data.msg);
				//				console.log("fail!" + data.data);
				//				console.log("fail!" + JSON.stringify(data));
			})
			.always(function() {
				//				console.log("always!");
			})

	}

	$("#btn_addU").on("click", function() {
		$("#add_nor .new_username").val("");
		$("#add_nor .new_password").val("");
		$("#add_nor .new_nickname").val("");
		$(" #backfour").val();
		$("#add_nor .new_sex").val("-");

		$(" #backthree").val();
		$("#add_nor .new_school").val("");
		$("#add_nor .new_edu").val("");

		$("#add_nor .edu_list").val("");

		$("#add_nor .new_position").val("");
		$("#add_nor .new_mobile").val("");
		$("#add_nor .new_qq").val("");

		$("#work_type_list").val("");
		//		console.log(5)
		getWorTypeParam("#work_type_list");
		//getRoleType();
	}); //弹窗新增用户 获取列表

	$("#add_manage").on("click", function() {
		//		console.log(5)
		getWorType();
		getRoleType();
		getPosiType();

	}); //弹窗新增用户 获取列表

	//添加用户(nor层)

	var newpF = function() {

		var newP = {};
		newP.username = "" + $("#add_nor .new_username").val();
		newP.password = "" + $("#add_nor .new_password").val();
		newP.nickname = "" + $("#add_nor .new_nickname").val();
		newP.birthday = "" + $(" #backfour").val();
		newP.sex = "" + $("#add_nor .new_sex").val();
		if(newP.sex == "男")
			newP.sex = "1";
		else if(newP.sex == "女")
			newP.sex = "2";
		else
			newP.sex = "0";
		newP.worktime = "" + $(" #backthree").val();
		newP.school = "" + $("#add_nor .new_school").val();
		newP.edu = "" + $("#add_nor .new_edu").val();

		newP.edu = $("#add_nor .edu_list").val();

		newP.position = "" + $("#add_nor .new_position").val();
		newP.mobile = "" + $("#add_nor .new_mobile").val();
		newP.qq = "" + $("#add_nor .new_qq").val();

		newP.work_type = "" + $("#work_type_list").val();

		var e_id = "#autho_add";
		newP.authority = renderAuthoInverParam(e_id) //"1";
		token = localStorage.getItem("token");
		$.ajax({
				method: 'POST',
				dataType: 'json',
				headers: {
					accept: "usertoken:" + token
				},
				url: host_host_host + '/index.php/home/admin/create',
				data: newP, //{},
			})
			.done(function(data) {
				toast(data.msg);
				if(data.status == 1) { //success
					//					console.log(1);
					refresh();
				} else {}
				console.log(data);
			})
			.fail(function(data) {
				toast("失败");
				//				console.log("fail!");
			})
			.always(function(data) {})

	}

	//根据权限列表值，显示
	//"authority":"1,2,3,4,5,6,7"
	var renderAuthoInverParam = function(e_id) {
		var data = [];
		var ls = [1, 2, 3, 4, 5, 6, 7]; // data.split(",");
		for(var i in ls) {
			//autho_
			var src = $(e_id + " #autho_" + ls[i]).attr("src");
			if(src == "img/backstage_checkbox_orange.png")
				data.push(ls[i]);
			//			console.log(data + "::5::");

		}
		var serial = data.join();

		return serial;
	}

	var edus_g = ["小学", "初中", "中专", "高中", "大专", "本科 ", "硕士", "博士", "其他"];
	//修改更新用户
	var updateU = function() {
		var newP = {};
		newP.id = "" + $("#newpEdit").data("id"); //
		newP.username = "" + $("#new_username").val();
		//newP.password = ""+$("#new_password").val();
		newP.nickname = "" + $("#new_nickname").val();
		newP.birthday = "" + $("#backone").val();
		newP.sex = "" + $("#new_sex").val();
		if(newP.sex == "男")
			newP.sex = "1";
		else if(newP._sex == "女")
			newP.sex = "2";
		else
			newP.sex = "0";
		newP.worktime = "" + $("#backtwo").val();
		newP.school = "" + $("#new_school").val();
		newP.edu = "" + $("#new_edu").val();

		if($("#new_edu_list").val() == "8") //如果未修改)
			newP.edu = "" + edus_g.indexOf(newP.edu); //将本科对应到5
		else
			newP.edu = "" + $("#new_edu_list").val(); //3
		newP.position = "" + $("#new_position").val();
		newP.mobile = "" + $("#new_mobile").val();
		newP.qq = "" + $("#new_qq").val();
		newP.work_type = "" + $("#new_work_type_list").val();
		if(newP.work_type == "0")
			newP.work_type = $("#newpEdit").data("workid");
		newP.authority = "" + $("#normal_pri .selected").data("au");
		newP.authority = "1";
		var e_id = "#autho_edit";
		newP.authority = renderAuthoInverParam(e_id) //"1";

		token = localStorage.getItem("token");
		$.ajax({
				method: 'POST',
				dataType: 'json',
				headers: {
					accept: "usertoken:" + token
				},
				url: host_host_host + '/index.php/home/admin/user_edit',
				data: newP, //{},
			})
			.done(function(data) {
				toast(data.msg)
				if(data.status == 1) { //success
					//					console.log(1);
					refresh();
				} else {}
				//				console.log(data);
			})
			.fail(function(data) {
				//				console.log("fail!" );
			})
			.always(function() {
				//				console.log("always!");
			})

	}
	//添加管理层
	var newpFM = function() {

		var newP = {};
		newP.uid = "" + $("#user_type_list").val();
		newP.role = "" + $("#role_type_list").val();

		var token = localStorage.getItem("token");
		$.ajax({

				method: 'POST',
				dataType: 'json',
				headers: {
					accept: "usertoken:" + token
				},
				url: host_host_host + '/index.php/home/admin/create',
				data: newP, //{},
			})
			.done(function(data) {
				if(data.status == 1) { //success
					//					console.log(1)
				} else {}
				console.log(data);
			})
			.fail(function(data) {
				//				console.log("fail!");
			})
			.always(function() {
				//				console.log("always!");
			})
	}

	var newpFunc = function() {
		//		console.log(123321);
		newpF();
	}
	$("#newp").on("click", newpFunc); //新增普通user
	/*$.post("http://shejiguanjia.session.pub/index.php/home/admin/create",{},function(result){										    
	    console.log(result);
	  });*/

	//查看用户

	var viewUser = function() {

		var newP = {};
		newP.username = "" + $("#new_username").val();
		newP.password = "" + $("#new_password").val();
		newP.nickname = "" + $("#new_nickname").val();
		newP.birthday = "" + $("#addone").val();
		newP.sex = "" + $("#new_sex").val();
		if(newP.sex == "男")
			newP.sex = "1";
		else if(newP._sex == "女")
			newP.sex = "2";
		else
			newP.sex = "0";
		newP.worktime = "" + $("#addtwo").val();
		newP.school = "" + $("#new_school").val();
		newP.edu = "" + $("#new_edu").val();
		if(newP.edu == "博士")
			newP.edu = "9";
		else if(newP._edu == "硕士")
			newP.edu = "8";
		else if(newP._edu == "研究生")
			newP.edu = "7";
		else if(newP._edu == "本科")
			newP.edu = "6";
		else if(newP._edu == "大专")
			newP.edu = "5";
		else if(newP._edu == "高中")
			newP.edu = "4";
		else if(newP._edu == "中专")
			newP.edu = "3";
		else if(newP._edu == "初中")
			newP.edu = "2";
		else if(newP._edu == "小学")
			newP.edu = "1";
		else
			newP.edu = "0";
		newP.position = "" + $("#new_position").val();
		newP.mobile = "" + $("#new_mobile").val();
		newP.qq = "" + $("#new_qq").val();
		newP.work_type = "" + $("#new_work_type").val();
		if(newP.work_type == "博士")
			newP.work_type = "1";
		else
			newP.work_type = "0";
		newP.authority = "" + $("#new_authority .selected").data("va");

		//		console.log(JSON.stringify(newP))
		$.ajax({
			type: "get",
			url: host_host_host + "/index.php/home/admin/user_info",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			success: function(data) {
				if(data.status == 1) { //success
					//					console.log(1)
				} else {
					console.log(data.msg + 5 + data.data)
				}
			},
			error: function(data) {
				//				console.log(0)
			},
			async: true
		});

	}
	$(".member_manage2 .third td .check").on("click", function() {

		viewUser();
	})

	//刷新页面 userN
	var refresh = function() {

		getPageParam(g_pageCur);
		getPageParamD(g_pageCurD);
	}

	//删除普通用户
	var deleteP = function(uid) {
		var token = localStorage.getItem("token");
		$.ajax({
			type: "GET",
			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + "/index.php/Home/Admin/resign",
			dataType: 'json',
			data: {
				id: uid
			},
			success: function(data) {
				toast(data.msg);
				if(data.status == 1) { //success
					//					console.log(1);
					//					console.log(data.msg);
					refresh();
				} else {

					//					console.log(50 + JSON.stringify(data))
				}
			},
			error: function(data) {
				//				console.log(0 + JSON.stringify(data));
				toast("离职失败！");
			}
		})
	}

	//复职普通用户
	var deletePCover = function(uid) {
		var token = localStorage.getItem("token");
		$.ajax({
			type: "GET",
			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + "/index.php/Home/Admin/reinstated",
			dataType: 'json',
			data: {
				id: uid
			},
			success: function(data) {
				toast(data.msg)
				if(data.status == 1) { //success
					//					console.log(1);
					//					console.log(data.msg);
					refresh();
				} else {}
			},
			error: function(data) {
				//				console.log(0 + JSON.stringify(data))
			}
		})
	}
	//显示user详细信息
	var renderP = function(data) {
		//id":"1","username":"admin","nickname":"张三","mobile":"13128964100",
		//"qq":"98641251","sex":"1","birthday":"1995-09-23","worktime":"2000-01-01",
		//"school":"世界名牌大学","edu":"高中","position":"董事长","work_type":"1",
		//"authority":"1,2,3,4,5,6,7","work_type_name":"规格负责"}

		$("#view_detail .nickname").val(data.nickname);
		$("#view_detail .username").val(data.username);
		$(" #birthday").val(data.birthday);
		$("#view_detail .school").val(data.school);
		$("#view_detail .position").val(data.position);
		$("#view_detail .mobile").val(data.mobile);
		if(data.sex == "1")
			sex = "男";
		else if(data.sex == "2")
			sex = "女";
		else sex = "保密";
		$("#view_detail .sex").val(sex);
		$(" #worktime").val(data.worktime);

		$("#view_detail .edu").val(data.edu);
		$("#view_detail .work_type_name").val(data.work_type_name);
		$("#view_detail .qq").val(data.qq);

		var e_id = "#autho_view";
		renderAuthoParam(data.authority, e_id); //权限数据的图像化//

	}
	//获取详细
	var viewP = function(uid) {
		var token = localStorage.getItem("token");

		$.ajax({
			type: "GET",
			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + "/index.php/Home/Admin/user_info",
			dataType: 'json',
			data: {
				id: uid
			},
			success: function(data) {
				if(data.status == 1) { //success
					//					console.log(1);
					//					console.log(data.msg);
					//					console.log("[user:::]" + JSON.stringify(data))
					renderP(data.data);
				} else {}
			},
			error: function(data) {}
		})
	}

	//获取详细&&编辑
	var viewPEdit = function(data) {

		//"authority":"1,2,3,4,5,6,7","work_type_name":"规格负责"}

		$(" #new_username").val(data.username);
		$(" #new_nickname").val(data.nickname);
		$(" #backone").val(data.birthday);
		$(" #new_school").val(data.school);
		$(" #new_position").val(data.position);
		$(" #new_mobile").val(data.mobile);
		if(data.sex == "1")
			sex = "男";
		else if(data.sex == "2")
			sex = "女";
		else sex = "保密";
		$(" #new_sex").val(sex);
		$(" #backtwo").val(data.worktime);

		$(" #new_edu").val(data.edu);
		$(" #new_work_type").val(data.work_type_name);
		$(" #new_qq").val(data.qq);

		$("#newpEdit").data("workid", data.work_type + "");
		var e_id = "#autho_edit";
		//"authority":"1,2,3,4,5,6,7"
		renderAuthoParam(data.authority, e_id);
	}
	//修改user详细
	var editP = function(uid) {

		var token = localStorage.getItem("token");
		$.ajax({
			type: "GET",
			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + "/index.php/Home/Admin/user_info",
			dataType: 'json',
			data: {
				id: uid
			},
			success: function(data) {
				toast(data.msg);
				if(data.status == 1) { //success
					viewPEdit(data.data);
				} else {}
			},
			error: function(data) {}
		})

		//按钮切为编辑
		$("#newpm").hide();
		$("#newpEdit").data("id", uid + "");

		$("#newpmEdit").show();

	}

	$("#newpEdit").on("click", function() {

		updateU();
	}); //提交修改

	//普通用户管理
	var rendPNList = function(data) {
		$("#userNList").html("");
		var classname = "";
		for(var i in data) {
			var user = data[i];
			if(i % 2)
				classname = "e9ecf1";
			else
				classname = "";

			var item = $('<tr class="' + classname + '">' +
				'<td class="choose"><i><img src="img/backstage_checkbox_orange.png" alt="" /></i></td>' +
				'<td>' + (parseInt(i) + 1) + '</td>' +
				'<td>' + user.nickname + '</td>' +
				'<td>' + user.work_type + '</td>' +
				'<td>' + user.worktime + '</td>' +
				'<td>' + user.username + '</td>' +
				'<td>' + user.mobile + '</td>' +
				'<td class=" "> ' + user.qq + ' </td>' +
				'<td class="handle">' +
				'<span class="detail"  data-id="' + user.id + '">详情</span>' +
				'<span class="edit"  data-id="' + user.id + '">编辑</span>' +
				'<span class="check jour"  data-id="' + user.id + '"><a href="backstage_user-log.html?userid=' + user.id + '">日志</a></span>' +
				'<span class="del delete"  data-id="' + user.id + '">离职</span>' +
				'</td>' +
				'</tr>');
			$("#userNList").append(item);

		}
		$("#userNList .detail").on("click", function() {
			//			console.log("detail")
			viewP($(this).data("id"));
		});
		$("#userNList .edit").on("click", function() {
			//			console.log("edit")
			editP($(this).data("id"));
			getWorTypeParam("#new_work_type_list"); //渲染工种

		});
		$("#userNList .jour").on("click", function() {
			//			console.log("jour")
		});
		$("#userNList .delete").on("click", function() {
			//			console.log("delete")
			$("#boxPock").show();
			$("#boxPock .del").show();
			//			console.log($(this).data("id"));
			$("#boxPock .del .btn1").data("id", $(this).data("id"));
		});

	}

	//点击确认后，deleteP执行
	$(document).on("click", "#boxPock .del .btn1 ", function() {
		$("#boxPock").hide();
		$("#boxPock .del").hide();
		deleteP($(this).data("id"));
	})

	//点击确认后，deletePCover执行
	$(document).on("click", "#boxPock .cover .btn1 ", function() {
		$("#boxPock").hide();
		$("#boxPock .cover").hide();
		deletePCover($(this).data("id"));
	})

	//根据权限列表值，显示
	//"authority":"1,2,3"
	var renderAuthoParam = function(data, e_id) {
		var ls = data.split(",");
		for(var i in ls) {
			//autho_
			$(e_id + " #autho_" + ls[i]).attr("src", "img/backstage_checkbox_orange.png");
			//			console.log(ls[i] + "::5::" + $("#autho_edit #autho_" + ls[i]).attr("src"));
			//
			$(e_id + " #autho_" + ls[i]).parent("a").attr("data-type", "checked");
			//alert($(e_id+" #autho_"+ls[i]).parent("a").attr("data-type"))
		}
	}

	//普通用户管理 e_id:：渲染元素id
	var rendPNListParam = function(data, e_id) {
		$(e_id).html("");
		var classname = "";
		for(var i in data) {
			var user = data[i];
			if(i % 2)
				classname = "e9ecf1";
			else
				classname = "";

			var item = $('<tr class="' + classname + '">' +

				'<td class="choose"><i><img src="img/backstage_checkbox_orange.png" alt="" /></i></td>' +
				'<td>' + (parseInt(i) + 1) + '</td>' +
				'<td>' + user.nickname + '</td>' +
				'<td>' + user.work_type + '</td>' +
				'<td>' + user.worktime + '</td>' +
				'<td>' + user.username + '</td>' +
				'<td class=" "> ' + user.mobile + ' </td>' +
				'<td>' + user.qq + '</td>' +
				'<td class="handle">' +
				'<span class="detail"  data-id="' + user.id + '">详情</span>' +
				'<span class="edit"  data-id="' + user.id + '">编辑</span>' +
				'<span class="check jour"  data-id="' + user.id + '"><a href="backstage_user-log.html?userid=' + user.id + '">日志</a></span>' +
				'<span class="del  cover"  data-id="' + user.id + '">复职</span>' +

				'</td>' +
				'</tr>');
			$(e_id).append(item);

		}
		$(e_id + " .detail").on("click", function() {
			//			console.log("detail")
			viewP($(this).data("id"));
		});
		$(e_id + " .edit").on("click", function() {
			//			console.log("edit")
			getWorTypeParam("#new_work_type_list"); //渲染工种
			editP($(this).data("id"));
		});
		$(e_id + " .jour").on("click", function() {
			//			console.log("jour")
		});
		$(e_id + " .delete").on("click", function() {
			//			console.log("delete")
			deleteP($(this).data("id"));
			//			console.log($(this).data("id"))
		});
		$(e_id + " .cover").on("click", function() {
			$("#boxPock").show();
			$("#boxPock .cover").show();
			//			console.log($(this).data("id"));
			$("#boxPock .cover .btn1").data("id", $(this).data("id"));
			//			console.log("jour")
		});

	}

	var total_num_nor = 0; //普通用户总数
	var total_num_norD = 0; //普通shan用户总数
	//获取nor用户
	var getPList = function(key, page) {

		$.ajax({
			type: "get",
			url: host_host_host + "/index.php/Home/Admin/user_list",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				p: g_pageCur,
				name: key
			},
			success: function(data) {
				if(data.status == 1) { //success
					rendPNList(data.data.data);
					$(".total_num.a").html(data.data.page);
					$(".number.a").html((data.data.page <= 1) ? data.data.page : page);
					$("#total_a").html(data.data.count);
					total_num_nor = parseInt(data.data.page);
				} else {
					toast(data.msg);
				}
			},
			error: function(data) {},
			async: true
		});

	}

	$("#query").on("click", function() {
		var key = $("#query_key").val();
		//if(key != "")
		//	key = "/" + key;
		//g_pageCur = 1;
		getPList(key);

		g_pageCur = 1;
		g_pageCurD = 1;
		$(".number.a").html(g_pageCur);
		$(".number.b").html(g_pageCurD);
		getPageParam(g_pageCur, key);

		getPageParamD(g_pageCurD, key);
	})

	//获取nor中已删除用户
	var getPCcList = function() {

		$.ajax({
			type: "get",
			url: host_host_host + "/index.php/Home/Admin/del_users",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			success: function(data) {
				if(data.status == 1) { //success
					//					console.log(1);
					//					console.log(data.msg);
					//					console.log(data.data);
					$("#total_b").html(data.data.count);
					$(".total_num.b").html(data.data.page);
					$(".number.b").html((data.data.page <= 1) ? data.data.page : 1);
					total_num_norD = parseInt(data.data.page);
					rendPNListParam(data.data.data, "#tb_deleted_u");
				} else {
					toast(data.msg);
				}
			},
			error: function(data) {
				//				console.log(0)
			},
			async: true
		});

	}
	//$(".member_manage2 .third td .check").on("click", function() {

	getPList("");
	getPCcList();
	//})

	//	var getExport = function() {
	//		
	//
	//	}

	//导出表格
	
	$("#btn-export").on("click", function() {
		location.href = host_host_host + "/home/admin/users_export";
//		var token = localStorage.getItem("token");
//		$.ajax({
//			type: "get",
//			url: host_host_host + "/index.php/Home/Admin/users_export",
//			dataType: 'json',
//			headers: {
//				accept: "usertoken:" + token,
//			},
//			data: {},
//			success: function(data) {
//				if(data.status == 1) {
//					location.href = host_host_host + "/Home/Admin/users_export";
//				} else {
//
//				}
//			},
//			error: function(data) {
//
//			},
//			async: true
//		});

	})

	var getPageParam = function(page, key) {
		//();
		$.ajax({
			type: "get",
			url: host_host_host + "/index.php/Home/Admin/user_list",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				p: page,
				name: key
			},
			success: function(data) {
				if(data.status == 1) { //success
					//					console.log(1);
					//					console.log(data.msg);
					//					console.log("nextPage:::" + data.data);
					rendPNList(data.data.data);
					$(".number.a").html((data.data.page <= 1) ? data.data.page : page);
					total_num_nor = parseInt(data.data.page);
					$(".total_num.a").html(data.data.page);
					$("#total_a").html(data.data.count);
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

	var g_pageCur = 1;
	//上一页
	$("#prev").on("click", function() {
		g_pageCur--;
		//getPrevPage();
		if(g_pageCur < 1)
			g_pageCur = 1;
		getPageParam(g_pageCur, $("#query_key").val());
		$(".number.a").html(g_pageCur);
	})
	//下一页
	$("#after").on("click", function() {
		g_pageCur++;
		//getNextPage();
		if(g_pageCur > total_num_nor)
			g_pageCur--;
		getPageParam(g_pageCur, $("#query_key").val());

		$(".number.a").html(g_pageCur);
	})

	//已删除用户列表
	var getPageParamD = function(page, key) {
		//();
		$.ajax({
			type: "get",
			url: host_host_host + "/index.php/Home/Admin/del_users",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				p: page,
				name: key
			},
			success: function(data) {
				if(data.status == 1) { //success
					//					console.log(1);
					//					console.log(data.msg);
					//					console.log("nextPage:::" + data.data);
					$("#total_b").html(data.data.count);
					$(".total_num.b").html(data.data.page);
					$(".number.b").html((data.data.page <= 1) ? data.data.page : page);
					total_num_norD = parseInt(data.data.page);
					rendPNListParam(data.data.data, "#tb_deleted_u");
				} else {
					toast(data.msg);
				}
			},
			error: function(data) {
				//				console.log(0)
			},
			async: true
		});

	}

	var g_pageCurD = 1;
	//上一页
	$("#prevD").on("click", function() {
		g_pageCurD--;
		//getPrevPage();
		if(g_pageCurD < 1)
			g_pageCurD = 1;

		getPageParamD(g_pageCurD, $("#query_key").val());

		$(".number.b").html(g_pageCurD);

	})
	//下一页
	$("#afterD").on("click", function() {
		g_pageCurD++;
		//getNextPage();
		if(g_pageCurD > total_num_norD)
			g_pageCurD--;

		getPageParamD(g_pageCurD, $("#query_key").val());

		$(".number.b").html(g_pageCurD);

	})

	$(".go.a").on("click", function() {
		var key = $("#query_key").val();
		var jump_num = Number($(this).siblings(".jump_page").val());
		if(jump_num > 0) {
			g_pageCur = jump_num;
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
			getPageParam(g_pageCur, key);
			$(".number.a").html(g_pageCur);
		} else {
			toast("请输入正常页码")
		}

	})

	$(".go.b").on("click", function() {
		var key = $("#query_key").val();
		var jump_num = Number($(this).siblings(".jump_page").val());
		if(jump_num > 0) {

			g_pageCurD = jump_num;
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
			getPageParamD(g_pageCurD, key);

			$(".number.b").html(g_pageCurD);
		} else {
			toast("请输入正常页码")
		}

	})

})