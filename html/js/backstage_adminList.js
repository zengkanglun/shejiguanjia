$(function () {
	/*页面*/
	var adminList = $("#bodyRight #content");
	var adminListSecond = adminList.find(".box .second");
	var adminListTable = adminList.find(".box .third .thirdTable");
	var clickBol = true;
	/*编辑*/
	$(document).on("click","#bodyRight #content .box .third .thirdTable .tableFirstRows div",function () {
	//adminListTable.find(".tableFirstRows div").on("click",function () {
		if (clickBol) {
			clickBol = false;
			adminListTable.find(".tableFirstRows div").removeClass("tableFirstRowsActive");
//			$(this).addClass("tableFirstRowsActive");
			switch ($(this).data("num")){
				case 1:
					break;
				case 2:
					adminListPock.show();
					adminListPock.find(".bianjiUserFu").show();
					break;
				case 3:
					break;
				case 4:
					break;
			}
			setTimeout(function () {
				clickBol = true;
			},600);
		}
		$(".bianjiUserFu .BJheader div").text("编辑用户")
	});
	/*添加管理层*/
	var addAdminBol = false;/*添加管理员权限判定*/
	adminListSecond.find(".left").on("click",function () {
		if (clickBol) {
			clickBol = false;
			addAdminBol = true;
			adminListPock.show();
			adminListPock.find(".bianjiUserFu").show();
			adminListPock.find(".editAdmin").show();
			setTimeout(function () {
				clickBol = true;
			},600);
		}
		$(".bianjiUserFu .BJheader div").text("添加管理层")
	});
	/*==========弹框==========*/
	var adminListPock = $("#boxPock");
	/*=====编辑用户=====*/
	var editUser = adminListPock.find(".bianjiUserFu .bianjiUser .BJbody .newUsers");
	var editUserObj = {
		AccountNumber : null, /*账号*/
		UserName : null, /*姓名*/
		DateOfBirth : null, /*出生年月*/
		GraduationSchool : null, /*毕业院校*/
		JobName : null, /*职位名称*/
		Phone : null, /*手机号*/
		Psw : null, /*密码*/
		Sex : null, /*性别*/
		TimeToWork : null, /*参加工作时间*/
		Education : null, /*学历*/
		TypeOfWork : null, /*工种*/
		QQNumber : null, /*QQ号*/
		SelectUser : null, /*选择用户*/
		role : null /*角色*/
	};
	/*输入账号*/
	editUser.find(".first .box .boxLeft .boxUl li:nth-child(1) input").on("input",function () {
		editUserObj.AccountNumber = $(this).val();
	});
	/*输入姓名*/
	editUser.find(".first .box .boxLeft .boxUl li:nth-child(2) input").on("input",function () {
		editUserObj.UserName = $(this).val();
	});
	/*出生年月*/
	editUserObj.DateOfBirth = editUser.find(".first .box .boxLeft .boxUl li:nth-child(3) input").val();/*临时*/
	editUser.find(".first .box .boxLeft .boxUl li:nth-child(3) input").on("input",function () {
		editUserObj.DateOfBirth = $(this).val();
	});
	/*毕业院校*/
	editUser.find(".first .box .boxLeft .boxUl li:nth-child(4) input").on("input",function () {
		editUserObj.GraduationSchool = $(this).val();
	});
	/*选择职称*/
	editUser.find(".first .box .boxLeft .boxUl li:nth-child(5) select").on("change",function () {
		editUserObj.JobName = $(this).val();
		editUser.find(".first .box .boxLeft .boxUl li:nth-child(5) input").val($(this).val());
	});
	/*输入手机号*/
	editUser.find(".first .box .boxLeft .boxUl li:nth-child(6) input").on("input",function () {
		editUserObj.Phone = $(this).val();
	});
	/*输入密码*/
	editUser.find(".first .box .boxRight .boxUl li:nth-child(1) input").on("input",function () {
		editUserObj.Psw = $(this).val();
	});
	/*输入性别*/
	editUser.find(".first .box .boxRight .boxUl li:nth-child(2) input").on("input",function () {
		editUserObj.Sex = $(this).val();
	});
	/*参加工作时间*/
	editUserObj.TimeToWork = editUser.find(".first .box .boxRight .boxUl li:nth-child(3) input").val();/*临时*/
	editUser.find(".first .box .boxRight .boxUl li:nth-child(3) input").on("input",function () {
		editUserObj.TimeToWork = $(this).val();
	});
	/*输入学历*/
	editUser.find(".first .box .boxRight .boxUl li:nth-child(4) select").on("change",function () {
		editUserObj.Education = $(this).val();
		editUser.find(".first .box .boxRight .boxUl li:nth-child(4) input").val($(this).val());
	});
	/*输入工种*/
	editUser.find(".first .box .boxRight .boxUl li:nth-child(5) select").on("change",function () {
		editUserObj.TypeOfWork = $(this).val();
		editUser.find(".first .box .boxRight .boxUl li:nth-child(5) input").val($(this).val())
	});
	/*输入QQ号*/
	editUser.find(".first .box .boxRight .boxUl li:nth-child(6) input").on("input",function () {
		editUserObj.QQNumber = $(this).val();
	});
	/*权限分配*/
	editUser.find(".second .Sbody span").on("click",function () {
		var _this = $(this);
		if (_this.attr("data-type") == "checked") {
			_this.attr("data-type","");
			_this.find("a img")[0].src = "img/backstage_checkbox_kong.png";
		} else{
			_this.attr("data-type","checked");
			_this.find("a img")[0].src = "img/backstage_checkbox_orange.png";
		};
	});
	/*Debug输出表格所填项*/
	editUser.find(".first .box .boxUl li input").on("input",function () {
//		console.log(editUserObj);
	});
	/*=====添加管理员权限=====*/
	/*选择用户*/
	editUser.find(".editAdmin .box .boxLeft .boxUl li:nth-child(1) select").on("change",function () {
		editUserObj.SelectUser = $(this).val();
		editUser.find(".editAdmin .box .boxLeft .boxUl li:nth-child(1) input").val($(this).val());
	});
	/*选择角色*/
	editUser.find(".editAdmin .box .boxRight .boxUl li:nth-child(1) select").on("change",function () {
		editUserObj.role = $(this).val();
		editUser.find(".editAdmin .box .boxRight .boxUl li:nth-child(1) input").val($(this).val());
	});
	/*=====关闭编辑用户弹窗======*/
	adminListPock.find(".bianjiUserFu .bianjiUser .BJheader a").on("click",function () {
		if (addAdminBol) {
			addAdminBol = false;
			adminListPock.find(".editAdmin").hide();
		}
		adminListPock.hide();
		adminListPock.find(".bianjiUserFu").hide();
		adminListPock.find("input").val("");
		adminListPock.find("select").val("");
	});
	//2017/9/14添加
	//select选中
	$("select").on("change",function(){
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	})
	$(".bianjiUserFu button").on("click",function(){
		$("#boxPock").hide();
		$("#boxPock .bianjiUserFu").hide();		
	})
	//table
	$(document).on("click",".third  .choose span",function(){
	//$(".third table  .choose span").on("click",function(){
		
		$(this).toggleClass("active");
		
	})
	//用户详情
	$(document).on("click",".third table td .detail",function(){
	//$(".third table td .detail").on("click",function(){
		$("#boxPock").show();
		$("#boxPock .edit_user").show();
	})
	$(document).on("click",".edit_user .edit_user_head a,.edit_user .forth button",function(){
	//$(".edit_user .edit_user_head a,.edit_user .forth button").on("click",function(){
		$("#boxPock").hide();
		$("#boxPock .edit_user").hide();
	})
	 
});