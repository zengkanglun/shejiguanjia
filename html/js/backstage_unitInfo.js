$(function () {
	var unitInfoWeb = $("#bodyRight").find("#content[names='unitInfo']");
	var unitInfoObj = {
		name : null,/*单位名称*/
		phone : null,/*单位电话*/
		address : null,/*单位地址*/
		postNum : null,/*邮政编码*/
		email : null/*单位邮箱*/
	};
	/*单位名称*/
	unitInfoWeb.find(".thirdBox .thirdBoxDiv:nth-child(1) input").on("input",function () {
		unitInfoObj.name = $(this).val();
	});
	/*单位电话*/
	unitInfoWeb.find(".thirdBox .thirdBoxDiv:nth-child(2) input").on("input",function () {
		var phoneNum = $(this).val();
		for (var i = 0;i < phoneNum.split("").length;i++) {
			if (/-|\d/g.test(phoneNum.split("")[i])) {
				unitInfoObj.phone = $(this).val();
				console.log($(this).val());
			}else{
				$(this).val("");
			}
		}
	});
	unitInfoWeb.find(".thirdBox .thirdBoxDiv:nth-child(2) input").on("focus",function () {
		$(this).removeAttr("style");
		$(this).val("");
	});
	unitInfoWeb.find(".thirdBox .thirdBoxDiv:nth-child(2) input").on("blur",function () {
		if (/^1[3|4|5|7|8][0-9]\d{8}$/g.test($(this).val()) || /^([0-9]{3,4}-)?[0-9]{7,8}$/g.test($(this).val())) {
		} else{
			$(this).val("请输入正确的电话号码");
			$(this).css("color","#FF0000");
		}
	});
	/*单位地址*/
	unitInfoWeb.find(".thirdBox .thirdBoxDiv:nth-child(3) input").on("input",function () {
		unitInfoObj.address = $(this).val();
	});
	/*邮政编码*/
	unitInfoWeb.find(".thirdBox .thirdBoxDiv:nth-child(4) input").on("input",function () {
		var postNums = $(this).val();
		for (var i = 0;i < postNums.split("").length;i++) {
			if (/\d/g.test(postNums.split("")[i])) {
				unitInfoObj.postNum = $(this).val();
			}else{
				$(this).val("");
			}
		}
	});
	unitInfoWeb.find(".thirdBox .thirdBoxDiv:nth-child(4) input").on("focus",function () {
		$(this).removeAttr("style");
		$(this).val("");
	})
	unitInfoWeb.find(".thirdBox .thirdBoxDiv:nth-child(4) input").on("blur",function () {
		if (/^[1-9][0-9]{5}$/g.test($(this).val())) {
		} else{
			$(this).val("请输入正确的邮政编码");
			$(this).css("color","#FF0000");
		}
	})
	/*单位邮箱*/
	unitInfoWeb.find(".thirdBox .thirdBoxDiv:nth-child(5) input").on("input",function () {
		unitInfoObj.email = $(this).val();
	});
});