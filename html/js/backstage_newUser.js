$(function() {
	var newUserWeb = $("#bodyRight").find("#content[name='newUser']");
	var newUserObj = {
		AccountNumber: null,
		/*账号*/
		UserName: null,
		/*姓名*/
		DateOfBirth: null,
		/*出生年月*/
		GraduationSchool: null,
		/*毕业院校*/
		JobName: null,
		/*职位名称*/
		Phone: null,
		/*手机号*/
		Psw: null,
		/*密码*/
		Sex: null,
		/*性别*/
		TimeToWork: null,
		/*参加工作时间*/
		Education: null,
		/*学历*/
		TypeOfWork: null,
		/*工种*/
		QQNumber: null /*QQ号*/
	};
	/*输入账号*/
	newUserWeb.find(".first .box .boxLeft .boxUl li:nth-child(1) input").on("input", function() {
		newUserObj.AccountNumber = $(this).val();
	});
	/*输入姓名*/
	newUserWeb.find(".first .box .boxLeft .boxUl li:nth-child(2) input").on("input", function() {
		newUserObj.UserName = $(this).val();
	});
	/*出生年月*/
	newUserObj.DateOfBirth = newUserWeb.find(".first .box .boxLeft .boxUl li:nth-child(3) input").val(); /*临时*/
	newUserWeb.find(".first .box .boxLeft .boxUl li:nth-child(3) input").on("input", function() {
		newUserObj.DateOfBirth = $(this).val();
	});
	/*毕业院校*/
	newUserWeb.find(".first .box .boxLeft .boxUl li:nth-child(4) input").on("input", function() {
		newUserObj.GraduationSchool = $(this).val();
	});
	/*选择职称*/
	newUserWeb.find(".first .box .boxLeft .boxUl li:nth-child(5) select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	});
	/*输入手机号*/
	newUserWeb.find(".first .box .boxLeft .boxUl li:nth-child(6) input").on("input", function() {
		newUserObj.Phone = $(this).val();
	});
	/*输入密码*/
	newUserWeb.find(".first .box .boxRight .boxUl li:nth-child(1) input").on("input", function() {
		newUserObj.Psw = $(this).val();
	});
	/*输入性别*/
	newUserWeb.find(".first .box .boxRight .boxUl li:nth-child(2) select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	});
	/*参加工作时间*/
	newUserObj.TimeToWork = newUserWeb.find(".first .box .boxRight .boxUl li:nth-child(3) input").val(); /*临时*/
	newUserWeb.find(".first .box .boxRight .boxUl li:nth-child(3) input").on("input", function() {
		newUserObj.TimeToWork = $(this).val();
	});
	/*输入学历*/
	newUserWeb.find(".first .box .boxRight .boxUl li:nth-child(4) select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	});
	/*输入工种*/
	newUserWeb.find(".first .box .boxRight .boxUl li:nth-child(5) select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	});
	/*输入QQ号*/
	newUserWeb.find(".first .box .boxRight .boxUl li:nth-child(6) input").on("input", function() {
		newUserObj.QQNumber = $(this).val();
	});
	/*权限分配*/
	newUserWeb.find(".second .Sbody span").on("click", function() {
		var _this = $(this);
		if(_this.attr("data-type") == "checked") {
			_this.attr("data-type", "");
			_this.find("a img")[0].src = "img/backstage_checkbox_kong.png";
		} else {
			_this.attr("data-type", "checked");
			_this.find("a img")[0].src = "img/backstage_checkbox_orange.png";
		};
	});
	/*Debug输出表格所填项*/
	newUserWeb.find(".first .box .boxUl li input").on("input", function() {
//		console.log(newUserObj);
	});
});