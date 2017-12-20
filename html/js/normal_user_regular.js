$(function() {
	////////////
	$("#new_username").on("blur", function() {
		unitInfoObj.email = $(this).val();
		if(/^[1-9][0-9]{5}$/g.test($(this).val())) {} else {
			$(this).val("请输入正确的邮政编码");
			$(this).css("color", "#FF0000");
		}
	});

	$("#new_username").on("blur", function() {
		unitInfoObj.email = $(this).val();
		if(/^[1-9][0-9]{5}$/g.test($(this).val())) {} else {
			$(this).val("请输入正确的邮政编码");
			$(this).css("color", "#FF0000");
		}
	});

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

})