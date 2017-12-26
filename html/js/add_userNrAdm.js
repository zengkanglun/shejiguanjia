$(function() {
	var token = localStorage.getItem("token");
	//获取工种类型
	var setWt = function(data) {
	}
	var renderWorkType = function(data) {
		$("#work_type_list").html("");
		var item = $('<option onclick=\"setWt()\"  value="0">-</option>' );
		$("#work_type_list").append(item);
		for(var i in data) {
			var type = data[i];
			var item = $('<option onclick=\"setWt()\" data-id=' + type.id + ' value="' + type.id + '">' + type.name +
				'</option>'
			);

			$("#work_type_list").append(item);

		}
		$("#work_type_list ").on("change", function() {

		});

	}

	//获取工种类型
	var getWorType = function() {
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
				renderWorkType(data.data);
			})
			.fail(function(data) {
			})
			.always(function(data) {
			})

	}

	////获取角色类型
	var setWt = function(data) {
//		console.log(511)
	}
	var renderRoleType = function(data) {
		$("#role_type_list").html();
		for(var i in data) {
			var type = data[i];
			var item = $('<option onclick=\"setWt()\" data-id=' + type.id + ' value="' + type.id + '">' + type.name +
				'</option>'
			);

			$("#role_type_list").append(item);

		}
		$("#role_type_list ").on("change", function() {

		});

	}

	//职称 渲染到 新增界面
	var renderPosiType = function(data) {
		$("#new_position_list").html("");
		for(var i in data) {
			var type = data[i];
			var item = $('<option onclick=\"setWt()\" data-id=' + type.id + ' value="' + type.id + '">' + type.name +
				'</option>'
			);

			$("#new_position_list").append(item);

		}
		$("#new_position_list ").on("change", function() {

		});

	}

	var getRoleType = function() {
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
				renderRoleType(data.data);
			})
			.fail(function(data) {
			})
			.always(function() {
//				console.log("always!");
			})

	}

	var getPosiType = function() {
		token = localStorage.getItem("token");
		$.ajax({
				headers: {

					accept: "usertoken:" + token
				},
				type: 'GET',
				dataType: 'json',

				url: host_host_host + '/index.php/home/Public/position_types',

			})
			.done(function(data) {
				renderPosiType(data.data);
			})
			.fail(function(data) {
			})
			.always(function() {
//				console.log("always!");
			})

	}

	//弹窗新增管理员   获取列表
	$("#add_manage").on("click", function() {


		 $("#role_type_list").val();
		/////////

		$("#new_username").val("");
		 $("#new_password").val("");
		$("#new_nickname").val("");
		$("#backone").val();
		$("#new_sex").val("-");
		
		 $("#backtwo").val();
		$("#new_school").val("");
		$("#new_edu").val("");

		$(" #edu_list").val("");
		$("#new_position").val("");
		$("#new_mobile").val("");
		$("#new_qq").val("");
		 $("#new_work_type").val("");
		

		$("#work_type_list").val("");

		getWorType();
		getRoleType();
		chooseUserF();

	});

	//添加用户(管理层)

	var newpF = function() {


		var newP = {};
		newP.username = "" + $("#new_username").val();
		newP.password = "" + $("#new_password").val();
		newP.nickname = "" + $("#new_nickname").val();
		newP.birthday = "" + $("#backfour").val();
		newP.sex = "" + $("#new_sex").val();
		if(newP.sex == "男")
			newP.sex = "1";
		else if(newP.sex == "女")
			newP.sex = "2";
		else
			newP.sex = "0";
		newP.worktime = "" + $("#backthree").val();
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
		if(newP.work_type == "技术工")
			newP.work_type = "1";
		else
			newP.work_type = "0";
		newP.authority = "" + $("#normal_pri .selected").data("au");
		newP.authority = "1";
		token = localStorage.getItem("token");

		$.ajax({

				method: ' POST',
				dataType: 'json',
				beforeSend: function(xhr) {
					xhr.setRequestHeader("USERTOKEN");
				},
				headers: {
					accept: "usertoken:" + token
				},
				url: host_host_host + '/index.php/home/admin/create',
				data: newP, //{},
			})
			.done(function(data) {
				toast(data.msg);
				if(data.status == 1) { //success
//					console.log(1)
				} else {
				}
			})
			.fail(function(jqXHR) {
//				console.log("fail!");
			})
			.always(function() {
//				console.log("always!");
			})

	}

	//
	//根据权限列表值，显示
	//"authority":"1,2,3,4,5,6,7"
	var renderAuthoInver = function() {
		var data = [];
		var ls = [1, 2, 3, 4, 5, 6, 7]; // data.split(",");
		for(var i in ls) {

			var src = $("#autho_edit #autho_" + ls[i]).attr("src");
			if(src == "img/backstage_checkbox_orange.png")
				data.push(ls[i]);
		}
		var serial = data.join();

		return serial;
	}

	//根据权限列表值，显示
	//"authority":"1,2,3,4,5,6,7"
	var renderAuthoInverParam = function(e_id) {
		var data = [];
		var ls = [1, 2, 3, 4, 5, 6, 7]; // data.split(",");
		for(var i in ls) {

			var src = $("#autho_edit #autho_" + ls[i]).attr("src");
			if(src == "img/backstage_checkbox_orange.png")
				data.push(ls[i]);

		}
		var serial = data.join();

		return serial;
	}

	var edus_g = ["小学","初中","中专","高中","大专","本科 ","硕士","博士","其他"];
	
	//修改更新用户
	var updateU = function() {
		var newP = {};
		newP.uid = "" + $("#newpmEdit").data("id");
		newP.username = "" + $("#new_username").val();
		//newP.password = ""+$("#new_password").val();
		newP.nickname = "" + $("#new_nickname").val();
		newP.birthday = "" + $("#backone").val();
		newP.sex = "" + $("#new_sex").val();
		if(newP.sex == "男")
			newP.sex = "1";
		else if(newP.sex == "女")
			newP.sex = "2";
		else
			newP.sex = "0";
		newP.worktime = "" + $("#backtwo").val();
		newP.school = "" + $("#new_school").val();
		newP.edu = "" + $("#new_edu").val();
		
		if($("#edu_list").val() == "8")//如果未修改)
			newP.edu = "" + edus_g.indexOf(newP.edu);//将本科对应到5
		else
			newP.edu = $(" #edu_list").val();//3
		newP.position = "" + $("#new_position").val();
		newP.mobile = "" + $("#new_mobile").val();
		newP.qq = "" + $("#new_qq").val();
		newP.work_type = "" + $("#new_work_type").val(); //""
		newP.work_type = "" + $("#work_type_list").val();
		if(newP.work_type == "0") //如果编辑了
		newP.work_type = "" + $("#newpmEdit").data("workid"); //1

		 
			 
		newP.authority = "" + $("#normal_pri .selected").data("au");
		newP.authority = renderAuthoInver() //"1";
		token = localStorage.getItem("token");
		$.ajax({

				method: 'POST',
				dataType: 'json',

				headers: {
					accept: "usertoken:" + token
				},
				url: host_host_host + '/index.php/home/admin/edit_manager',
				data: newP, //{},
			})
			.done(function(data) {
				toast(data.msg);
				if(data.status == 1) { //success
					refresh();
				} else {
				}
			})
			.fail(function(data) {
				toast("失败");
			})
			.always(function() {
//				console.log("always!");
			})

	}

	var newpFM = function() {

		var newP = {};
		newP.uid = "" + $("#user_type_list").val();
		newP.role = "" + $("#role_type_list").val();
		newP.username = "" + $("#new_username").val();
		newP.password = "" + $("#new_password").val();
		newP.nickname = "" + $("#new_nickname").val();
		newP.birthday = "" + $("#backone").val();
		newP.sex = "" + $("#new_sex").val();
		if(newP.sex == "男")
			newP.sex = "1";
		else if(newP.sex == "女")
			newP.sex = "2";
		else
			newP.sex = "0";
		newP.worktime = "" + $("#backtwo").val();
		newP.school = "" + $("#new_school").val();
		newP.edu = "" + $("#new_edu").val();

		newP.edu = $(" #edu_list").val();
		newP.position = "" + $("#new_position").val();
		newP.mobile = "" + $("#new_mobile").val();
		newP.qq = "" + $("#new_qq").val();
		newP.work_type = "" + $("#new_work_type").val();
		if(newP.work_type == "技术工")
			newP.work_type = "1";
		else
			newP.work_type = "0";

		newP.work_type = "" + $("#work_type_list").val();
		newP.authority = "" + $("#normal_pri .selected").data("au");
		newP.authority = renderAuthoInver() //"1";
		////////
		var token = localStorage.getItem("token");
		$.ajax({

				method: 'POST',
				dataType: 'json',

				headers: {
					accept: "usertoken:" + token
				},
				url: host_host_host + '/index.php/home/admin/create_manager',
				data: newP, //{},
			})
			.done(function(data) {
				toast(data.msg);
				if(data.status == 1) { //success
//					console.log(1);
					refresh();
				} else {
					
				}
//				console.log(data);
			})
			.fail(function(data) {
//				console.log("fail!");
			})
			.always(function() {
//				console.log("always!");
			})
	}

	var newpFunc = function() {
		newpFM();
	}
	$("#newpm").on("click", newpFunc);

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
		else if(newP.sex == "女")
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
				}
			},
			error: function(data) {
			},
			async: true
		});

	}
	$(".member_manage2 .third td .check").on("click", function() {

		viewUser();
	})

	//删除管理层用户
	var deleteP = function(uid) {

		var token = localStorage.getItem("token");

		$.ajax({
			type: "GET",
			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + "/index.php/Home/Admin/del_manager",
			dataType: 'json',
			data: {
				id: uid
			},
			success: function(data) {
				toast(data.msg);
				if(data.status == 1) { //success
					refresh();
				} else
				{}
			},
			error: function(data) {
				toast("失败！");
			}
		})
	}

	var renderP = function(data) {
		//id":"1","username":"admin","nickname":"张三","mobile":"13128964100",
		//"qq":"98641251","sex":"1","birthday":"1995-09-23","worktime":"2000-01-01",
		//"school":"世界名牌大学","edu":"高中","position":"董事长","work_type":"1",
		//"authority":"1,2,3,4,5,6,7","work_type_name":"规格负责"}

		$("#view_detail #nickname").val(data.nickname);
		$("#view_detail #username").val(data.username);
		$("#view_detail #birthday").val(data.birthday);
		$("#view_detail #school").val(data.school);
		$("#view_detail #position").val(data.position);
		$("#view_detail #mobile").val(data.mobile);
		if(data.sex == "1")
			sex = "男";
		else if(data.sex == "2")
			sex = "女";
		else sex = "保密";
		$("#view_detail #sex").val(sex);
		$("#view_detail #worktime").val(data.worktime);

		$("#view_detail #edu").val(data.edu);
		$("#view_detail #work_type_name").val(data.work_type_name);
		$("#view_detail #qq").val(data.qq);

		var e_id = "#autho_view";
		renderAuthoParam(data.authority, e_id); //权限数据的图像化
	}
	//渲染到指定的弹框 e_id 框的#id
	var renderUParem = function(data, e_id) {

		//id":"1","username":"admin","nickname":"张三","mobile":"13128964100",
		//"qq":"98641251","sex":"1","birthday":"1995-09-23","worktime":"2000-01-01",
		//"school":"世界名牌大学","edu":"高中","position":"董事长","work_type":"1",
		//"authority":"1,2,3,4,5,6,7","work_type_name":"规格负责"}

		$(e_id + " #new_nickname").val(data.nickname);
		$(e_id + " #new_username").val(data.username);
		$(e_id + " #new_birthday").val(data.birthday);
		$(e_id + " #new_school").val(data.school);
		$(e_id + " #new_position").val(data.position);
		$(e_id + " #new_mobile").val(data.mobile);
		if(data.sex == "1")
			sex = "男";
		else if(data.sex == "2")
			sex = "男";
		else sex = "保密";
		$(e_id + " #new_sex").val(sex);
		$(e_id + " #new_worktime").val(data.worktime);

		$(e_id + " #new_edu").val(data.edu);
		$(e_id + " #new_work_type").val(data.work_type_name);
		$(e_id + " #new_qq").val(data.qq);

		var e_id = "#autho_edit";
		renderAuthoParam(data.authority, e_id); //权限数据的图像化
	}

	//获取详细,返回data
	var viewPData = function(uid, funcLate) {
		var data_detail = {
			a: 2,
			b: 3
		};
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
			success: function(data, data_detal) {
				if(data.status == 1) { //success

					data_detail.b = data;

					funcLate(data.data); //渲染

				} else
				{
					
				}
			},
			error: function(data) {

			}
		})

	}

	//获取详细，并渲染
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
					renderP(data.data);
				} else
				{
					
				}
			},
			error: function(data) {
			}
		})
	}

	/*权限分配*/

	//根据权限列表值，显示
	//"authority":"1,2,3,4,5,6,7"
	var renderAutho = function(data) {
		var ls = data.split(",");
		for(var i in ls) {
			//autho_
			$("#autho_edit #autho_" + ls[i]).attr("src", "img/backstage_checkbox_orange.png");
			console.log(ls[i] + "::5::" + $("#autho_edit #autho_" + ls[i]).attr("src"));
		}
	}

	//根据权限列表值，显示
	//"authority":"1,2,3,4,5,6,7"
	var renderAuthoParam = function(data, e_id) {
		var ls = data.split(",");
		for(var i in ls) {
			//autho_
			$(e_id + " #autho_" + ls[i]).attr("src", "img/backstage_checkbox_orange.png");
		}
	}

	//获取详细 && 编辑
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

		$("#newpmEdit").data("workid", data.work_type);
		//"authority":"1,2,3,4,5,6,7"
		renderAutho(data.authority);

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
				if(data.status == 1) { //success
					viewPEdit(data.data);
					getWorType();
				} else
				{}
			},
			error: function(data) {
			}
		})

		//按钮切为编辑
		$("#newpm").hide();
		$("#newpmEdit").data("id", uid);

		$("#newpmEdit").show();

	}

	var renderChoose = function(data) {
		$("#role_type_list").html();
		for(var i in data) {
			var type = data[i];
			var item = $('<option onclick=\"setWt()\" data-id=' + type.id + ' value="' + type.id + '">' + type.nickname +
				'</option>'
			);

			$("#user_type_list").append(item);

		}
		$("#user_type_list ").on("change", function() {

			var data_detail = {};
			var lateR = function(data_detail) {
				renderUParem(data_detail, "#editU");
			}

			viewPData($(this).val(), lateR); //查看选的人的详情

		});

	}

	//cooseUserF();
	//选user（先简略  详细）
	var chooseUserF = function(uid) {

		var token = localStorage.getItem("token");
		$.ajax({
			type: "GET",
			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + "/index.php/Home/project/election",//Public/choose",
			dataType: 'json',
			data: {
				id: uid
			},
			success: function(data) {
				if(data.status == 1) { //success
//					console.log(1);
//					console.log(data.msg);
//					console.log("[::]chooseUser" + JSON.stringify(data))
					/* "data": {
					        "type": [
					            {
					                "id": "1",
					                "name": "规格负责",
					                "staffs": [
					                    {
					                        "id": "1",
					                        "nickname": "张三"
					                    }
					                ]
					            }
					        ],
					        "project": [
					            {
					                "id": "1",
					                "name": "天空之城",
					                "staff": [
					                    {
					                        "id": "2",
					                        "nickname": "李四"
					                    }
					                ]
					            }
					        ],
					        "all": [
					            {
					                "id": "1",
					                "nickname": "张三"
					            }
					        ]
					    }*/
					renderChoose(data.data.all); //
				} else
				{
					
				}
			},
			error: function(data) {
			}
		})

		//按钮切为创建按钮
		$("#newpmEdit").hide();
		$("#newpm").show();

	}

	$("#newpmEdit").on("click", function() {

		updateU();
	}); //提交修改

	//普通用户管理
	var rendPMList = function(data) {
		$("#userMList").html("");
		var classname = "";
		for(var i in data) {
			var user = data[i];
			if(i%2)
			  classname = "tableTrBackground";
			 else
			  classname = "";
			  
			var item = $('<tr class="'+classname+'">' +
				'<td><span><img src="img/backstage_checkbox_orange.png" alt="" /></span></td>' +
				'<td>' + (parseInt(i) + 1) + '</td>' +
				'<td>' + user.nickname + '</td>' +
				'<td>' + user.worktime + '</td>' +
				'<td>' + user.work_type + '</td>' +
				'<td>' + user.username + '</td>' +
				'<td>' + user.role + '</td>' +
				'<td class="handle"> ' + user.mobile + ' </td>' +
				'<td>' +
				'<div class="tableFirstRows">' +
				'<div data-num="1" class="detail" data-id="' + user.id + '">' +
				'<a href="###">详情</a>' +
				'</div>' +
				'<div data-num="2" class="edit"  data-id="' + user.id + '">' +
				'<a>编辑</a>' +
				'</div>' +
				'<div data-num="3"  class="jour" data-id="' + user.id + '">' +
				'<a href="backstage_user-log.html?userid='+user.id+'">日志</a>' +
				'</div>' +
				'<div data-num="4"  class="delete" data-id="' + user.id + '">' +
				'<a href="###">删除</a>' +
				'</div>' +
				'</div>' +
				'</td>' +
				'</tr>');
			$("#userMList").append(item);

		}
		$("#userMList .detail").on("click", function() {
//			console.log("detail")
			viewP($(this).data("id"));
		});
		$("#userMList .edit").on("click", function() {
//			console.log("edit")
			editP($(this).data("id"));
		});
		$("#userMList .jour").on("click", function() {
//			console.log("jour")
		});
		$(".delete").on("click", function() {
			$("#boxPock").show();
			$("#boxPock .del").show();
			$("#boxPock .del .btn1").data("id",$(this).data("id"));
		});

	}
	
	  //点击确认后，deleteP执行
	$(document).on("click", "#boxPock .del .btn1 ", function() {
		$("#boxPock").hide();
		$("#boxPock .del").hide();
		deleteP($(this).data("id"));
	})
	
	
	//刷新页面 userN
	var refresh = function() {
		
		getPageParam(g_pageCur);
		
		 
	}

	
	//总记录数
	var total_num_nor = 0;
	var getPList = function(page,key) {

	var bundle = {};
	if(page)
		bundle.p = page;
	if(key)
		bundle.name = key;
		
		$.ajax({
			type: "get",
			url: host_host_host + "/index.php/Home/Admin/manager_list",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: bundle,
			success: function(data) {
				if(data.status == 1) { //success
					rendPMList(data.data.data);
					$(".total_num").html(data.data.page);
					$(".number").html((data.data.page<=1)?data.data.page:1);					
					$("#total").html(data.data.count);
					total_num_nor = parseInt(data.data.page);

				} else {
				}
			},
			error: function(data) {
//				console.log(0)
			},
			async: true
		});

	}

	$("#query").on("click", function() {
		var key = $("#query_key").val();
		if(key != "")
			;//key = "/" + key;
		g_pageCur = 1;
		$(".number").html(g_pageCur);
		getPageParam(g_pageCur,key);

	})
	//$(".member_manage2 .third td .check").on("click", function() {

	getPList("");
	//})

	var getExport = function() {
		var token = localStorage.getItem("token");
		location.href = host_host_host + "/Home/Admin/managers_export";
		$.ajax({
			type: "get",
			url: host_host_host + "/index.php/Home/Admin/managers_export",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				 
			},
			success: function(data) {
				toast(data.msg);
				if(data.status == 1) { //success
				 
					 
				} else {
					
				}
			},
			error: function(data) {
			},
			async: true
		});

	}

	//导出表格
	$("#btn-export").on("click", function() {

		getExport();

	})

	var getPageParam = function(page,key) {
		//();
		var bundle = {};
		if(page)
			bundle.p = page;
		if(key)
			bundle.name = key;
		$.ajax({
			type: "get",
			url: host_host_host + "/index.php/Home/Admin/manager_list",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: bundle,
			success: function(data) {
				if(data.status == 1) { //success
					rendPMList(data.data.data);
					$(".total_num").html(data.data.page);
					$(".number").html((data.data.page<=1)?data.data.page:page);					
					$("#total").html(data.data.count);
					total_num_nor = parseInt(data.data.page);
				} else {
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
	$("#prevm").on("click", function() {
		g_pageCur--;
		//getPrevPage();
		if(g_pageCur < 1)
			g_pageCur = 1;
		getPageParam(g_pageCur,$("#query_key").val());
		$(".number").html(g_pageCur);

	})
	//下一页
	$("#afterm").on("click", function() {
		g_pageCur++;
		//getNextPage();
		if(g_pageCur > total_num_nor)
			g_pageCur--;
		getPageParam(g_pageCur,$("#query_key").val());

		$(".number").html(g_pageCur);

	})
	
		
	$(".go").on("click", function() {
			var key = $("#query_key").val();
			var jump_num = Number($(this).siblings(".jump_page").val());
			if(jump_num > 0) {
				g_pageCur = jump_num;
				$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
				getPageParam(g_pageCur,key);
				$(".number").html(g_pageCur);
			} else {
				toast("请输入正常页码")
			}
			
	 		 
	
	})
	
	
	
	
	
	
	
})