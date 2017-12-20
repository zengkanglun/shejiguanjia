$(function() {
	/*token*/
	var token = localStorage.getItem("token");
	////////////

	//html结构 添加显示校验信息的dom	
	var validMsg = function() {
		if(!$(this).siblings("span.er").length)
			$(this).parent().append("<span class='er rr'></span>")
		if(!$(this).siblings("span.cor").length)
			$(this).parent().append("<span class='cor rr'></span>")

		var er = $(this).siblings("span.er")
		var cor = $(this).siblings("span.cor")

		return {
			er,
			cor
		}
	} //{}

	//校验手机号			
	$("#add_nor #new_mobile , #editU #new_mobile").on("change", function() {
		var msgE = validMsg.call(this);
		if(/^1[3|4|5|7|8][0-9]\d{8}$/g.test($(this).val()) || /^([0-9]{3,4}-)?[0-9]{7,8}$/g.test($(this).val())) {
			msgE.cor.html("输入正确");
			msgE.cor.show();
			msgE.er.hide();

		} else {
			//$(this)
			//.css("color","#FF0000");
			msgE.er.html("请输入正确的电话号码");
			msgE.cor.hide();
			msgE.er.show();
			g_valid = false;
		}
	});

	//校验QQ号			
	$("#add_nor #new_qq , #editU #new_qq").on("change", function() {
		var msgE = validMsg.call(this);
		var val = $(this).val() + "";
		if(/^[1-9]\d*$/g.test(val) && ((val.length > 5) && (val.length < 19))) {
			msgE.cor.html("输入正确");
			msgE.cor.show();
			msgE.er.hide();

		} else {
			//$(this)
			//.css("color","#FF0000");
			msgE.er.html("请输入正确的QQ号码");
			msgE.cor.hide();
			msgE.er.show();
			g_valid = false;
		}
	});

	//校验密码		
	$("#add_nor #new_password , #editU #new_password").on("change", function() {
		var msgE = validMsg.call(this);
		var val = $(this).val() + "";
		if(/^[a-zA-Z0-9]{1}([a-zA-Z0-9]){5,11}$/g.test(val) && ((val.length > 5) && (val.length < 13))) {
			msgE.cor.html("正确的密码");
			msgE.cor.show();
			msgE.er.hide();

		} else {
			//$(this)
			//.css("color","#FF0000");
			msgE.er.html("输入6-12位含字母、或数字的字串");
			msgE.cor.hide();
			msgE.er.show();
			g_valid = false;
		}
	});

	//校验账号		
	$("#add_nor #new_username , #editU #new_username").on("change", function() {
		var msgE = validMsg.call(this);
		var val = $(this).val() + "";
		if(/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){1,11}$/g.test(val) && ((val.length > 1) && (val.length < 13))) {
			msgE.cor.html("正确的账号");
			msgE.cor.show();
			msgE.er.hide();

		} else {
			//$(this)
			//.css("color","#FF0000");
			msgE.er.html("输入2-12位以字母开头、可带数字、“_”、“.”的字串");
			msgE.cor.hide();
			msgE.er.show();
			g_valid = false;
		}
	});

	//校验姓名		
	$("#add_nor #new_nickname , #editU #new_nickname").on("change", function() {
		var msgE = validMsg.call(this);
		var val = $(this).val() + "";
		if(/^([0-9a-zA-Z]|[\u4e00-\u9fa5]){2,12}$/g.test(val) && ((val.length > 1) && (val.length < 13))) {
			msgE.cor.html("正确的姓名");
			msgE.cor.show();
			msgE.er.hide();

		} else {
			//$(this)
			//.css("color","#FF0000");
			msgE.er.html("输入2-12位可含字母、数字或中文的字串");
			msgE.cor.hide();
			msgE.er.show();
			g_valid = false;
		}
	});

	//校验校名		
	$("#add_nor #new_school , #editU #new_school").on("change", function() {
		var msgE = validMsg.call(this);
		var val = $(this).val() + "";
		if(/^([a-zA-Z]|[\u4e00-\u9fa5]){2,12}$/g.test(val) && ((val.length > 1) && (val.length < 21))) {
			msgE.cor.html("正确的校名");
			msgE.cor.show();
			msgE.er.hide();

		} else {
			//$(this)
			//.css("color","#FF0000");
			msgE.er.html("输入2-20位含字母、或含中文的字串");
			msgE.cor.hide();
			msgE.er.show();
			g_valid = false;
		}
	});

	/***************************/
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
			console.log(data + "::5::");

		}
		var serial = data.join();

		return serial;
	}

	//添加用户(nor层)

	var newpF = function() {

		console.log(5);

		var newP = {};
		newP.username = "" + $("#add_nor #new_username").val();
		newP.password = "" + $("#add_nor #new_password").val();
		newP.nickname = "" + $("#add_nor #new_nickname").val();
		newP.birthday = "" + $("#add_nor #testone").val();
		newP.sex = "" + $("#add_nor #new_sex").val();
		if(newP.sex == "男")
			newP.sex = "1";
		else if(newP._sex == "女")
			newP.sex = "2";
		else
			newP.sex = "0";
		newP.sex = "" + $("#add_nor #new_sex_list").val();
		newP.worktime = "" + $("#add_nor #testtwo").val();
		newP.school = "" + $("#add_nor #new_school").val();
		newP.edu = "" + $("#add_nor #new_edu").val();

		newP.edu = $("#add_nor #edu_list").val();
		newP.position = "" + $("#add_nor #new_position_list").val();
		newP.mobile = "" + $("#add_nor #new_mobile").val();
		newP.qq = "" + $("#add_nor #new_qq").val();

		newP.work_type = "" + $("#add_nor #work_type_list").val();

		var e_id = "#autho_add";
		newP.authority = renderAuthoInverParam(e_id) //"1";
		console.log(JSON.stringify(newP))
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
					console.log(1)
				} else {
				}
			})
			.fail(function(data) {
				toast(data.msg);
				console.log("fail!");
			})
			.always(function(data) {
			})

	}

	//渲染到指定 id 元素
	var renderWorkTypeParam = function(data, e_id) {
		$(e_id).html("");
		for(var i in data) {
			console.log(data[i])
			var type = data[i];
			var item = $('<option onclick=\"setWt()\" data-id=' + type.id + ' value="' + type.id + '">' + type.name +
				'</option>'
			);

			$(e_id).append(item);

		}
		$(e_id).on("change", function() {

		});

	}

	//
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
				 
				console.log(data);
				console.log("[worType::]" + JSON.stringify(data));

				renderWorkTypeParam(data.data, e_id);
			})
			.fail(function(data) {
				console.log("fail!" + data.msg);
				console.log("fail!" + data.data);
				console.log("[worType::]fail!" + JSON.stringify(data));
			})
			.always(function(data) {
				console.log("always!");
				console.log("[worType::]" + JSON.stringify(data));
			})

	}
	getWorTypeParam("#work_type_list"); //渲染工种

	$("#btn_add").on("click", function() {

		newpF(); //create	
	})

})