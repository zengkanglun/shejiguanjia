var xiangBol = false,
	editBol = false,
	addAdmin = false,
	editUserObj = {};
$(function() {
	/*页面*/
	var adminList = $("#bodyRight #content");
	var adminListSecond = adminList.find(".box .second");
	var adminListTable = adminList.find(".box .third .thirdTable");
	var clickBol = true;
	/*编辑*/
	adminListTable.find(".tableFirstRows div").on("click", function() {
		if(clickBol) {
			clickBol = false;
			adminListTable.find(".tableFirstRows div").removeClass("tableFirstRowsActive");
			//			$(this).addClass("tableFirstRowsActive");
			switch($(this).data("num")) {
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
			setTimeout(function() {
				clickBol = true;
			}, 600);
		}
		$(".bianjiUserFu .BJheader div").text("编辑用户")
	});
	/*添加管理层*/
	var addAdminBol = false; /*添加管理员权限判定*/
	adminListSecond.find(".left").on("click", function() {
		if(clickBol) {
			clickBol = false;
			addAdminBol = true;
			adminListPock.show();
			adminListPock.find(".bianjiUserFu").show();
			adminListPock.find(".editAdmin").show();
			setTimeout(function() {
				clickBol = true;
			}, 600);
		}
		$(".bianjiUserFu .BJheader div").text("添加管理层");
		for(var i = 0; i < $("#boxPock .bianjiUserFu .bianjiUser .BJbody .newUsers .second .Sbody div span").length; i++) {
			$("#boxPock .bianjiUserFu .bianjiUser .BJbody .newUsers .second .Sbody div span").eq(i).attr("data-id", i + 1);
		}
	});
	/*==========弹框==========*/
	var adminListPock = $("#boxPock");
	var chooseU = "#boxPock .bianjiUserFu .bianjiUser .BJbody .newUsers .editAdmin .box .boxLeft .boxUl li:nth-child(1) select option";
	/*=====编辑用户=====*/
	var editUser = adminListPock.find(".bianjiUserFu .bianjiUser .BJbody .newUsers");
	editUserObj = {
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
		QQNumber: null,
		/*QQ号*/
		SelectUser: null,
		/*选择用户*/
		role: [],
		/*权限*/
		roles: "",
		part: null /*角色*/
	};
	/*输入账号*/
	/*editUser.find(".first .box .boxLeft .boxUl li:nth-child(1) input").on("input", function() {
		editUserObj.AccountNumber = $(this).val();
	});*/
	/*输入姓名*/
	editUser.find(".first .box .boxLeft .boxUl li:nth-child(2) input").on("input", function() {
		editUserObj.UserName = $(this).val();
	});
	/*出生年月*/
	editUser.find(".first .box .boxLeft .boxUl li:nth-child(3) input").on("input", function() {
		editUserObj.DateOfBirth = $(this).val();
	});
	/*毕业院校*/
	editUser.find(".first .box .boxLeft .boxUl li:nth-child(4) input").on("input", function() {
		editUserObj.GraduationSchool = $(this).val();
	});
	/*选择职称*/
	editUser.find(".first .box .boxLeft .boxUl li:nth-child(5) select").on("change", function() {
		editUserObj.JobName = $(this).val();
		editUser.find(".first .box .boxLeft .boxUl li:nth-child(5) input").val($(this).val());
	});
	/*输入手机号*/
	editUser.find(".first .box .boxLeft .boxUl li:nth-child(6) input").on("input", function() {
		editUserObj.Phone = $(this).val();
	});
	/*输入密码*/
	/*editUser.find(".first .box .boxRight .boxUl li:nth-child(1) input").on("input", function() {
		editUserObj.Psw = $(this).val();
	});*/
	/*输入性别*/
	editUser.find(".first .box .boxRight .boxUl li:nth-child(2) input").on("input", function() {
		editUserObj.Sex = $(this).val();
		if($(this).val() == "男") {
			editUserObj.Sex = "1";
		} else {
			editUserObj.Sex = "2";
		}
	});
	/*参加工作时间*/
	editUser.find(".first .box .boxRight .boxUl li:nth-child(3) input").on("input", function() {
		editUserObj.TimeToWork = $(this).val();
	});
	/*输入学历*/
	editUser.find(".first .box .boxRight .boxUl li:nth-child(4) select").on("change", function() {
		editUserObj.Education = $(this).val();
		editUser.find(".first .box .boxRight .boxUl li:nth-child(4) input").val($(this).val());
	});
	/*输入工种*/
	editUser.find(".first .box .boxRight .boxUl li:nth-child(5) select").on("change", function() {
		editUserObj.TypeOfWork = $(this).val();
		editUser.find(".first .box .boxRight .boxUl li:nth-child(5) input").val($(this).val())
	});
	/*输入QQ号*/
	editUser.find(".first .box .boxRight .boxUl li:nth-child(6) input").on("input", function() {
		editUserObj.QQNumber = $(this).val();
	});
	/*权限分配*/
	editUser.find(".second .Sbody span").on("click", function() {
		var _this = $(this);
		if(_this.attr("data-type") == "checked") {
			_this.attr("data-type", "");
			_this.find("a img")[0].src = "/Public/Home/images/backstage_checkbox_kong.png";
			var roleNum = "";
			for(var j = 0; j < editUserObj.role.length; j++) {
				roleNum += editUserObj.role[j].toString();
			}
			editUserObj.role.splice(roleNum.search(_this.attr("data-id")), 1);
		} else {
			_this.attr("data-type", "checked");
			_this.find("a img")[0].src = "/Public/Home/images/backstage_checkbox_orange.png";
			editUserObj.role.push(Number(_this.attr("data-id")));
		};
	});
	/*Debug输出表格所填项*/
	editUser.find(".first .box .boxUl li input").on("input", function() {
		console.log(editUserObj);
	});
	/*=====添加管理员权限=====*/
	/*选择用户*/
	var sel = document.getElementById("chooseUser");
	var selected_val = sel.options[sel.selectedIndex].value;
	editUser.find(".editAdmin .box .boxLeft .boxUl li:nth-child(1) select").on("change", function() {
		addAdmin = true;
		$("#boxPock .bianjiUserFu .bianjiUser .BJbody .newUsers .second .Sbody div span a img").attr("src", "/Public/Home/images/backstage_checkbox_kong.png");
		$("#boxPock .bianjiUserFu .bianjiUser .BJbody .newUsers .second .Sbody div span").attr("data-type", "");
		editUserObj.SelectUser = $(this).val();
		editUser.find(".editAdmin .box .boxLeft .boxUl li:nth-child(1) input").val($(this).val());
		GeneralUserDetails($(this).val());
	});
	/*选择角色*/
	var sels = document.getElementById("choosePart");
	var selecteds_val = sels.options[sels.selectedIndex].value;
	editUser.find(".editAdmin .box .boxRight .boxUl li:nth-child(1) select").on("change", function() {
		editUser.find(".editAdmin .box .boxRight .boxUl li:nth-child(1) input").val($(this).val());
		editUserObj.part = $(this).val();
	});
	/*=====关闭编辑用户弹窗======*/
	adminListPock.find(".bianjiUserFu .bianjiUser .BJheader a").on("click", function() {
		if(addAdminBol) {
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
	$("select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	})
	$(document).on("click", ".bianjiUserFu button", function() {
		EditUser(editUser_inputL, editUser_inputR);
		/*$("#boxPock").hide();
		$("#boxPock .bianjiUserFu").hide();*/
	})
	//table
	$(document).on("click", ".third table .choose span", function() {
		$(this).toggleClass("active")
	})
	//用户详情
	$(document).on("click", ".third table td .detail", function() {
		$("#boxPock").show();
		$("#boxPock .edit_user").show();
		var id = $(this).attr('data-id');
		detailPersonal(id);
	})
	$(document).on("click", ".edit_user .edit_user_head a,.edit_user .forth button", function() {
		$("#boxPock").hide();
		$("#boxPock .edit_user").hide();
	})
	/*
	 * 编辑点击事件
	 */
	$(document).on("click", ".third table td .edit", function() {
		$("#boxPock").show();
		$("#boxPock .bianjiUserFu").show();
		var id = $(this).attr('data-id');
		detailPersonal(id);
		newOrEdit = false;
	});
	$(document).on('change', 'select', function() {
		var id = $(this).find('option:selected').val();
		var txt = $(this).find('option:selected').text();
		if($(this).attr('id') == 'workType') {
			$(this).siblings('input').attr('data-id', id);
		} else {
			$(this).siblings('input').val(txt);
		}
	})

	//数据调取=========
	//任务进行中的回调
	delAjax(5, 1)

	function delAjax(size, p) {
		$.ajax({
			type: "get",
			url: "/Admin/User/manager",
			dataType: 'json',
			data: {
				size: size,
				p: p,
			},
			success: function(data) {
				console.log(data, data.count)
				$(".box .m_third tbody").remove();
				var datas = data.data;
				var tbody1 = "";
				//进行中
				function tbodyOne(datas) {
					$(".box .m_third .page_left span").text(data.count);
					$(".box .m_third .page_right .total_num").text(data.page);
					for(var i = 0; i < datas.length; i++) {
						tbody1 += '<tr>';
						tbody1 += '<td class = "choose"><span class="active"><img src="/Public/Home/images/backstage_checkbox_orange.png" alt="" /></span></td >';
						tbody1 += '<td>' + datas[i].staff_id + '</td> ';
						tbody1 += '<td>' + datas[i].real_name + '</td>';
						tbody1 += '<td>' + datas[i].type + '</td>';
						tbody1 += '<td>' + datas[i].job_title + '</td>';
						tbody1 += '<td>' + datas[i].login_name + '</td>';
						tbody1 += '<td>' + datas[i].role_name + '</td>';
						tbody1 += '<td>' + datas[i].mobile + '</td>';
						tbody1 += '<td>';
						tbody1 += '<div class="tableFirstRows">';
						tbody1 += '<div data-id="' + datas[i].staff_id + '" data-num="1" class="detail">';
						tbody1 += '<a href="###">详情</a>';
						tbody1 += '</div>';
						tbody1 += '<div data-id="' + datas[i].staff_id + '" data-num="2" class="edit">';
						tbody1 += '<a>编辑</a>';
						tbody1 += '</div>';
						tbody1 += '<div data-num="3">';
						tbody1 += '<a href="###">日记</a>';
						tbody1 += '</div>';
						tbody1 += '<div data-num="4">';
						tbody1 += '<a href="###">删除</a>';
						tbody1 += '</div>';
						tbody1 += '</div>';
						tbody1 += '</td>';
						tbody1 += '</tr>';
						tbody1 += '</tr>';
					}
					return tbody1;
				}
				tbodyOne(datas);
				$(".box .m_third table").append(tbody1);
				$(".box .perf tbody tr:odd").addClass("e9ecf1");
			},
			error: function(data) {},
			async: true
		});
	}

	//删除右边点击获取
	$(".box .m_third  .paging .page_right .more").on("click", function() {
		var moreNum = $(".box .m_third .paging .page_right .total_num").text();
		var lessNum = $(".box .m_third .paging .page_right .number").text();
		if(moreNum <= lessNum) {
			toast("已经是最后一页了");
		} else {
			lessNum++;
			$(".box .m_third .page_right .number").text(lessNum);
			var size = $(".box .m_third .pagenum input").val();
			delAjax(size, lessNum);
		}
	})
	//删除左边点击获取
	$(".box .m_third  .paging .page_right .less").on("click", function() {
		var moreNum = $(".box .m_third .paging .page_right .total_num").text();
		var lessNum = $(".box .m_third .paging .page_right .number").text();
		if(lessNum == 1) {
			toast("已经是第一页了");
		} else {
			lessNum--;
			$(".box .m_third  .paging .page_right .number").text(lessNum);
			var size = $(".box .m_third .pagenum input").val();
			delAjax(size, lessNum);
		}
	})
	//页数点击时获取
	$(".box .m_third .paging select").on("change", function() {
		var size = $(this).siblings("input").val();
		delAjax(size, 1);
	})
	var editUser_inputL = "#boxPock .bianjiUserFu .bianjiUser .BJbody .newUsers .first .box .boxLeft .boxUl li span input";
	var editUser_inputR = "#boxPock .bianjiUserFu .bianjiUser .BJbody .newUsers .first .box .boxRight .boxUl li span input";
});

function GeneralUserDetails(id) {
	var ids = id;
	$.ajax({
		type: "get",
		url: "/Admin/User/info",
		dataType: "json",
		data: {
			id: ids
		},
		success: function(data) {
			console.log(data);
			var leftMess, rightMess;
			if(data.status == 1) {
				if(xiangBol) {
					leftMess = $("#boxPock .edit_user .edit_user_head .edit_user_detail .newUsers .first .box .boxLeft .boxUl li span input");
					rightMess = $("#boxPock .edit_user .edit_user_head .edit_user_detail .newUsers .first .box .boxRight .boxUl li span input");
				}
				if(editBol) {
					leftMess = $("#boxPock .bianjiUserFu .bianjiUser .BJbody .newUsers .first .box .boxLeft .boxUl li span input");
					rightMess = $("#boxPock .bianjiUserFu .bianjiUser .BJbody .newUsers .first .box .boxRight .boxUl li span input");
				}
				if(addAdmin) {
					addAdmin = false;
					leftMess = $("#boxPock .bianjiUserFu .bianjiUser .BJbody .newUsers .first .box .boxLeft .boxUl li span input");
					rightMess = $("#boxPock .bianjiUserFu .bianjiUser .BJbody .newUsers .first .box .boxRight .boxUl li span input");
					editUserObj.AccountNumber = data.data.login_name;
					editUserObj.UserName = data.data.real_name;
					editUserObj.DateOfBirth = data.data.birth;
					editUserObj.Education = data.data.education;
					editUserObj.GraduationSchool = data.data.graduate_school;
					editUserObj.JobName = data.data.job_title;
					editUserObj.Phone = data.data.mobile;
					editUserObj.QQNumber = data.data.qq;
					editUserObj.Sex = data.data.gender;
					editUserObj.TimeToWork = data.data.join_in_work;
					editUserObj.TypeOfWork = data.data.work_type;
					editUserObj.role = data.data.role;
					editUserObj.roles = data.data.role.join();
					editUserObj.staff_id = ids;
					editUserObj.Psw = "";
				}
				leftMess.eq(0).attr("value", data.data.login_name);
				leftMess.eq(1).attr("value", data.data.real_name);
				leftMess.eq(2).attr("value", data.data.birth);
				leftMess.eq(3).attr("value", data.data.graduate_school);
				leftMess.eq(4).attr("value", data.data.job_title);
				leftMess.eq(5).attr("value", data.data.mobile);
				rightMess.eq(0).attr("value", "*************");
				if(data.data.gender == 1) {
					rightMess.eq(1).attr("value", "男");
				} else {
					rightMess.eq(1).attr("value", "女");
				}
				rightMess.eq(2).attr("value", data.data.join_in_work);
				rightMess.eq(3).attr("value", data.data.education);
				rightMess.eq(4).attr("value", data.data.work);
				rightMess.eq(4).attr("data-id", data.data.work_type);
				rightMess.eq(5).attr("value", data.data.qq);
				for(var i = 0; i < data.data.role.length; i++) {
					var z = i + 1;
					if(data.data.role[i] == z) {
						$("#boxPock .bianjiUserFu .bianjiUser .BJbody .newUsers .second .Sbody div span a img").eq(i)[0].src = "/Public/Home/images/backstage_checkbox_orange.png";
						$("#boxPock .bianjiUserFu .bianjiUser .BJbody .newUsers .second .Sbody div span").eq(i).attr("data-type", "checked");
					}
				}
				if(data.data.role[0] == 8) {
					editUserObj.role = [1, 2, 3, 4, 5, 6, 7];
					$("#boxPock .bianjiUserFu .bianjiUser .BJbody .newUsers .second .Sbody div span a img").attr("src", "/Public/Home/images/backstage_checkbox_orange.png");
					$("#boxPock .bianjiUserFu .bianjiUser .BJbody .newUsers .second .Sbody div span").attr("data-type", "checked");
				}
				if(xiangBol) {
					xiangBol = false;
					$("#boxPock").show();
					$("#boxPock .edit_user").show();
				};
				if(editBol) {
					editBol = false;
					$("#boxPock").show();
					$("#boxPock .bianjiUserFu").show();
				}
				for(var i = 0; i < data.data.title.length; i++) {
					var JobTitleOp = "";
					JobTitleOp += '<option value="' + data.data.title[i].id + '">' + data.data.title[i].name + '</option>';
					$("#jobTitle").append(JobTitleOp);
				}
				for(var i = 0; i < data.data.workAll.length; i++) {
					var workType = '';
					workType += '<option value="' + data.data.workAll[i].id + '">' + data.data.workAll[i].name + '</option>';
					$("#workType").append(workType);
				}
			} else {
				console.log(data.msg);
			}
		},
		error: function(res) {
			console.log(res);
		},
		async: true
	});
}
var newOrEdit = true;

function EditUser(left, right) {
	var leftIpt = $(left);
	var rightIpt = $(right);
	if(leftIpt.eq(2).val() == "") {
		alert("请选择时间");
		return false;
	} else {
		editUserObj.DateOfBirth = leftIpt.eq(2).val();
	}
	if(leftIpt.eq(4).val() == "") {
		alert("请选择职称");
		return false;
	} else {
		editUserObj.JobName = leftIpt.eq(4).siblings('select').find('option:selected').text();
	}
	if(rightIpt.eq(1).val() == "") {
		alert("请选择性别");
		return false;
	} else {
		if(rightIpt.eq(1).val() == "男") {
			editUserObj.Sex = "1";
		} else {
			editUserObj.Sex = "2";
		}
	}
	if(rightIpt.eq(2).val() == "") {
		alert("请选择时间");
		return false;
	} else {
		editUserObj.TimeToWork = rightIpt.eq(2).val();
	}
	if(rightIpt.eq(3).val() == "") {
		alert("请选择学历");
		return false;
	} else {
		editUserObj.Education = rightIpt.eq(3).val();
	}
	if(rightIpt.eq(4).val() == "") {
		alert("请选择工种");
		return false;
	} else {
		editUserObj.work_type = rightIpt.eq(4).attr('data-id');
		console.log(editUserObj.work_type);
	};
	if($("#boxPock .bianjiUserFu .bianjiUser .BJbody .newUsers .editAdmin .box .boxRight .boxUl li span input").val() == "" && newOrEdit) {
		alert("请选择角色");
		return false;
	}
	editUserObj.role = [];
	$('.bianjiUserFu .bianjiUser .BJbody .newUsers .second .Sbody span').each(function() {
		if($(this).attr('data-type') == 'checked') {
			editUserObj.role.push($(this).attr('data-id'));
		}
	})
	editUserObj.roles = editUserObj.role.join();
	console.log(editUserObj);
	var datass = {}
	if(newOrEdit) {
		datass = {
			login_name: editUserObj.AccountNumber,
			real_name: leftIpt.eq(1).val(),
			gender: editUserObj.Sex,
			birth: leftIpt.eq(2).val(),
			join_in_work: rightIpt.eq(2).val(),
			graduate_school: leftIpt.eq(3).val(),
			education: editUserObj.Education,
			job_title: editUserObj.JobName,
			mobile: leftIpt.eq(5).val(),
			qq: rightIpt.eq(5).val(),
			work_type: editUserObj.work_type,
			staff_id: editUserObj.staff_id,
			role: editUserObj.roles,
			part: editUserObj.part
		}
	} else {
		datass = {
			login_name: editUserObj.AccountNumber,
			real_name: leftIpt.eq(1).val(),
			gender: editUserObj.Sex,
			birth: leftIpt.eq(2).val(),
			join_in_work: rightIpt.eq(2).val(),
			graduate_school: leftIpt.eq(3).val(),
			education: editUserObj.Education,
			job_title: editUserObj.JobName,
			mobile: leftIpt.eq(5).val(),
			qq: rightIpt.eq(5).val(),
			work_type: editUserObj.work_type,
			staff_id: editUserObj.staff_id,
			role: editUserObj.roles,
		}
	}
	$.ajax({
		type: "post",
		url: "/Admin/User/edit_info",
		dataType: "json",
		data: datass,
		success: function(res) {
			console.log(res);
			if(res.status == 1) {
				document.location.reload();
			} else {
				alert(res.msg);
			};
		},
		error: function(err) {
			console.log(err);
		},
		async: true
	});
}
/*
 * 详细
 */
function detailPersonal(ids) {
	$.ajax({
		type: "get",
		url: "/Admin/User/info",
		dataType: "json",
		data: {
			id: ids,
		},
		success: function(res) {
			if(res.status == 1) {
				var data = res.data;
				console.log(data);
				var leftInfo = $("#boxPock .edit_user .bianjiUser .edit_user_detail .newUsers .first .box .boxLeft .boxUl li span input");
				var rightInfo = $("#boxPock .edit_user .bianjiUser .edit_user_detail .newUsers .first .box .boxRight .boxUl li span input");
				leftInfo.eq(0).attr('value', data.login_name);
				leftInfo.eq(1).attr('value', data.real_name);
				leftInfo.eq(2).attr('value', data.birth);
				leftInfo.eq(3).attr('value', data.graduate_school);
				leftInfo.eq(4).attr('value', data.job_title);
				leftInfo.eq(5).attr('value', data.mobile);
				rightInfo.eq(0).attr('value', data.pass_word)
				var sex = '';
				if(data.gender == 1) {
					sex = '男'
				} else {
					sex = '女'
				}
				rightInfo.eq(1).attr('value', sex)
				rightInfo.eq(2).attr('value', data.join_in_work)
				rightInfo.eq(3).attr('value', data.education)
				rightInfo.eq(4).attr('value', data.work)
				rightInfo.eq(5).attr('value', data.qq)
				var roles = [];
				for(var i = 0; i < data.role.length; i++) {
					var z = Number(data.role[i]) - 1;
					$("#boxPock .edit_user .bianjiUser .edit_user_detail .newUsers .second .Sbody div span").eq(z).find("a img").attr('src', '/Public/Home/images/backstage_checkbox_orange.png');
					$("#boxPock .edit_user .bianjiUser .edit_user_detail .newUsers .second .Sbody div span").eq(z).attr('data-type', 'checked');
				}
				if(data.role[0] == 8) {
					//					roles = [1, 2, 3, 4, 5, 6, 7];
					$("#boxPock .edit_user .bianjiUser .edit_user_detail .newUsers .second .Sbody div span a img").attr("src", "/Public/Home/images/backstage_checkbox_orange.png");
					$("#boxPock .edit_user .bianjiUser .edit_user_detail .newUsers .second .Sbody div span").attr("data-type", "checked");
				}
				var leftInfoEdit = $("#boxPock .bianjiUserFu .bianjiUser .BJbody .newUsers .first .box .boxLeft .boxUl li span");
				var rightInfoEdit = $("#boxPock .bianjiUserFu .bianjiUser .BJbody .newUsers .first .box .boxRight .boxUl li span");
				leftInfoEdit.eq(0).find('input').attr('value', data.login_name);
				leftInfoEdit.eq(1).find('input').attr('value', data.real_name);
				leftInfoEdit.eq(2).find('input').attr('value', data.birth);
				leftInfoEdit.eq(3).find('input').attr('value', data.graduate_school);
				leftInfoEdit.eq(4).find('input').attr('value', data.job_title);
				var strtitle = '';
				for(var i = 0; i < data.title.length; i++) {
					strtitle += '<option value="' + data.title[i].id + '">' + data.title[i].name + '</option>'
				}
				leftInfoEdit.eq(4).find('select').html(strtitle);
				leftInfoEdit.eq(5).find('input').attr('value', data.mobile);
				var sex = '';
				if(data.gender == 1) {
					sex = '男'
				} else {
					sex = '女'
				}
				rightInfoEdit.eq(0).find('input').attr('value', data.pass_word);
				rightInfoEdit.eq(1).find('input').attr('value', sex);
				rightInfoEdit.eq(2).find('input').attr('value', data.join_in_work);
				rightInfoEdit.eq(3).find('input').attr('value', data.education);
				rightInfoEdit.eq(4).find('input').attr({
					'value': data.work,
					'data-id': data.work_type
				});
				var strwork = ''
				for(var i = 0; i < data.workAll.length; i++) {
					strwork += '<option value="' + data.workAll[i].id + '">' + data.workAll[i].name + '</option>'
				}
				rightInfoEdit.eq(4).find('select').html(strwork);
				rightInfoEdit.eq(5).find('input').attr('value', data.qq)
				var roles = [];
				for(var i = 0; i < data.role.length; i++) {
					var z = Number(data.role[i]) - 1;
					$('#boxPock .bianjiUserFu .bianjiUser .BJbody .newUsers .second .Sbody span').eq(z).find('a img').attr("src", "/Public/Home/images/backstage_checkbox_orange.png");
					$('#boxPock .bianjiUserFu .bianjiUser .BJbody .newUsers .second .Sbody span').eq(z).attr("data-type", "checked");
				}
				if(data.role[0] == 8) {
					//					roles = [1, 2, 3, 4, 5, 6, 7];
					$("#boxPock .bianjiUserFu .bianjiUser .BJbody .newUsers .second .Sbody div span a img").attr("src", "/Public/Home/images/backstage_checkbox_orange.png");
					$("#boxPock .bianjiUserFu .bianjiUser .BJbody .newUsers .second .Sbody div span").attr("data-type", "checked");
				}
				editUserObj.AccountNumber = data.login_name;
				editUserObj.staff_id = ids;
			} else {
				alert(res.msg);
			};
		},
		error: function(err) {
			console.log(err);
		},
		async: true
	});
}

//删除接口
var msg_id;
$(document).on("click", ".m_third table tr td .tableFirstRows div[data-num='4']", function() {
	msg_id = $(this).parents("tr").find("td").eq(1).text();
	$("#boxPock").show();
	$("#boxPock .del").show();
	addThis = $(this);
})
$(document).on("click", ".del .btn1", function() {
	$.ajax({
		type: "post",
		url: "/Admin/System/dele",
		dataType: 'json',
		data: {
			id: msg_id,
		},
		success: function(data) {
			console.log(data)
			if(data.status == 1) {
				addThis.parents("tr").remove();
				$("#boxPock").hide();
				$("#boxPock .del").hide();
				$(".m_third tbody tr").removeClass("tableTrBackground");
				$(".m_third tbody tr:even").addClass("tableTrBackground");
			}
			if(data.status == 2) {
				$("#boxPock").hide();
				$("#boxPock .del").hide();
				toast("删除失败")
			}
		},
		error: function(data) {},
		async: true
	});
})
$(document).on("click", ".del .del_head i,.del .btn2", function() {
	$("#boxPock").hide();
	$("#boxPock .del").hide();
})

$(document).on("click", function() {
	//	$("#boxPock").show();
	//	$("#boxPock .del").show();
})