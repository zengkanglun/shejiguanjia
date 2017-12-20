var edit_info = {login_name:"",real_name:"",gender:"",birth:"",join_in_work:"",graduate_school:"",education:"",job_title:"",mobile:"",qq:"",work_type:"",staff_id:"",role:[],pass_word:""};
var xiangBol = false,editBol = false;
$(function() {
	//select选中
	$("select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt);
	})
	//页面选择
	$(document).on("click", "table .choose i", function() {
		$(this).toggleClass("active")
	})
	//编辑操作
	$(document).on("click", ".g_third table .handle .edit", function() {
		editBol = true;
		edit_info = {login_name:"",real_name:"",gender:"",birth:"",join_in_work:"",graduate_school:"",education:"",job_title:"",mobile:"",qq:"",work_type:"",staff_id:"",role:[]};
		edit_info.staff_id = $(this).attr("data-id");
		for (var i = 0;i < $("#boxPock .bianjiUserFu .bianjiUser .BJbody .newUsers .second .Sbody div span").length;i++) {
			$("#boxPock .bianjiUserFu .bianjiUser .BJbody .newUsers .second .Sbody div span").eq(i).attr("data-id",i+1);
		GeneralUserDetails($(this).attr("data-id"));
		};
	})
	$(document).on("click", "#boxPock .bianjiUserFu .BJheader a", function() {
		$("#boxPock").hide();
		$("#boxPock .bianjiUserFu").hide();
		$("#boxPock .bianjiUserFu .bianjiUser .BJbody .newUsers .second .Sbody div span").attr("data-check","0");
		$("#boxPock .bianjiUserFu .bianjiUser .BJbody .newUsers .second .Sbody div span a img").hide();
	});
	$(document).on("click","#yesBtn",function () {
		EditUser(editUser_inputL,editUser_inputR);
	});
	$("#boxPock .bianjiUserFu .bianjiUser .BJbody .newUsers .second .Sbody div span").attr("data-check","0");
	$("#boxPock .bianjiUserFu .bianjiUser .BJbody .newUsers .second .Sbody div span a img").hide();
	
	$(document).on("click", "#boxPock .bianjiUserFu .bianjiUser .BJbody .newUsers .second .Sbody div span", function() {
		var _this = $(this);
		if (_this.attr("data-check") == 0) {
			_this.find("a img").show();
			_this.attr("data-check","1");
			edit_info.role.push(Number(_this.attr("data-id")));
		} else{
			_this.find("a img").hide();
			_this.attr("data-check","0");
			var roleNum = "";
			for (var j = 0;j < edit_info.role.length;j++) {
				roleNum += edit_info.role[j].toString();
			}
			edit_info.role.splice(roleNum.search(_this.attr("data-id")),1);
		};
	})
	//新增用户
	$(document).on("click", ".box .left", function() {
		// alert(1)
		// $("#boxPock").show();
		// $("#boxPock .edit_user").show();
	})
	$(document).on("click", "#boxPock .UserFuadd button,#boxPock .UserFuadd_head .BJheader a", function() {
		$("#boxPock").hide();
		$("#boxPock .UserFuadd").hide();
	})
	$(document).on("click", "#boxPock .UserFuadd .Sbody a", function() {
		$(this).toggleClass("active");
	})
	//详情
	$(document).on("click", ".g_third table .handle .detail", function() {
		var _this = $(this);
		xiangBol = true;
		GeneralUserDetails(_this.attr("data-id"));
	})
	$(document).on("click", "#boxPock .edit_user button,#boxPock .edit_user .BJheader a", function() {
		$("#boxPock .edit_user .edit_user_head .edit_user_detail .newUsers .first .box .boxLeft .boxUl li span input").attr("value","");
		$("#boxPock .edit_user .edit_user_head .edit_user_detail .newUsers .first .box .boxRight .boxUl li span input").attr("value","");
		$("#boxPock .edit_user .edit_user_head .edit_user_detail .newUsers .second .Sbody div span a img").hide();
		$("#boxPock").hide();
		$("#boxPock .edit_user").hide();
	})
	/*删除用户操作*/
	$(document).on("click","#bodyRight #content .box .third table tbody tr .handle .del",function () {
		$.ajax({
			type:"post",
			url:"/Admin/User/dele",
			dataType:"json",
			data:{
				id:$(this).attr("data-id")
			},
			success:function (res) {
				if (res.status == 1) {
					document.location.reload();
				} else{
					alert(res.msg);
				};
			},
			error:function (err) {
				console.log(err);
			},
			async:true
		});
	});

	//已删除用户操作
	$(document).on("click", ".perf table .handle .edit", function() {
		$("#boxPock").show();
		$("#boxPock .bianjiUserFu").show();
	})
	/*$(document).on("click", "#boxPock .bianjiUserFu button,#boxPock .bianjiUserFu .BJheader a", function() {
		$("#boxPock").hide();
		$("#boxPock .bianjiUserFu").hide();
	})*/
	$(document).on("click", "#boxPock .bianjiUserFu .Sbody a", function() {
		$(this).toggleClass("active")
	})
	//详情
	$(document).on("click", ".perf table .handle .detail", function() {
		$("#boxPock").show();
		$("#boxPock .edit_user").show();
	})
	$(document).on("click", "#boxPock .edit_user button,#boxPock .edit_user .BJheader a", function() {
		$("#boxPock").hide();
		$("#boxPock .edit_user").hide();
	})

	//调取数据==========
	userAjax(5, 1);
	delAjax(5, 1)
	//普通用户
	function userAjax(size, p, time) {
		$.ajax({
			type: "get",
			url: "/Admin/User/online",
			dataType: 'json',
			data: {
				size: size,
				p: p,
				intverl: time,
			},
			success: function(data) {
				console.log(data, data.count)
				$(".box .g_third tbody").remove();
				var datas = data.data;
				var tbody1 = "";
				//进行中
				function tbodyOne(datas) {
					$(".box .g_third .paging .page_left span").text(data.count);
					$(".box .g_third .paging .page_right .total_num").text(data.page);
					$(".staff_content .list_detail table tfoot tr td:nth(3)").text(data.total);
					for(var i = 0; i < datas.length; i++) {
						tbody1 += '<tbody>';
						tbody1 += '<tr>';
						tbody1 += '<td class = "choose"><i><img src = "/Public/Home/images/backstage_checkbox_orange.png" alt = "" /></i></td >';
						tbody1 += '<td>' + datas[i].staff_id + '</td> ';
						tbody1 += '<td>' + datas[i].real_name + '</td>';
						tbody1 += '<td>' + datas[i].work_type + '</td>';
						tbody1 += '<td>' + datas[i].job_title + '</td>';
						tbody1 += '<td>' + datas[i].login_name + '</td>';
						tbody1 += '<td>' + datas[i].role_name + '</td>';
						tbody1 += '<td>' + datas[i].mobile + '</td>';
						tbody1 += '<td class = "handle"> <span class = "detail" data-id="'+datas[i].staff_id+'">详情 </span><span class="edit" data-id="'+datas[i].staff_id+'">编辑</span><span class = "check" data-id="'+datas[i].staff_id+'"><a href = "/Admin/User/logs">日志</a></span><span class="del" data-id="'+datas[i].staff_id+'">删除</span></td>';
						tbody1 += '</tr>';
						tbody1 += '</tbody>';
					}
					return tbody1;
				}
				tbodyOne(datas);
				$(".box .g_third table").append(tbody1);
				$(".box .g_third tbody tr:odd").addClass("e9ecf1");
			},
			error: function(data) {},
			async: true
		});
	}
	//
	//右边点击获取
	$(".box .g_third .paging .page_right .more").on("click", function() {
		var moreNum = $(".box .g_third .paging .page_right .total_num").text();
		var lessNum = $(".box .g_third .paging .page_right .number").text();
		if(moreNum == lessNum) {
			toast("已经是最后一页了");
		} else {
			lessNum++;
			$(".box .g_third .paging .page_right .number").text(lessNum);
			var size = $(".box .g_third .pagenum input").val();
			userAjax(size, lessNum);
		}
	})
	//左边点击获取
	$(".box .g_third  .paging .page_right .less").on("click", function() {
		var moreNum = $(".box .g_third .paging .page_right .total_num").text();
		var lessNum = $(".box .g_third .paging .page_right .number").text();
		if(lessNum == 1) {
			toast("已经是第一页了");
		} else {
			lessNum--;
			$(".box .g_third  .paging .page_right .number").text(lessNum);
			var size = $(".box .g_third .pagenum input").val();
			userAjax(size, lessNum);
		}
	})
	//页数点击时获取
	$(".box .g_third .paging select").on("change", function() {
		var size = $(this).siblings("input").val();
		userAjax(size, 1);
	})
	//已删除用户
	function delAjax(size, p, time) {
		$.ajax({
			type: "get",
			url: "/Admin/User/offline",
			dataType: 'json',
			data: {
				size: size,
				p: p,
				intverl: time,
			},
			success: function(data) {
				console.log(data, data.count)
				$(".box .perf tbody").remove();
				var datas = data.data;
				var tbody1 = "";
				//进行中
				function tbodyOne(datas) {
					$(".box .perf .paging .page_left span").text(data.count);
					$(".box .perf .paging .page_right .total_num").text(data.page);
					for(var i = 0; i < datas.length; i++) {
						tbody1 += '<tbody>';
						tbody1 += '<tr>';
						tbody1 += '<td class = "choose"><i><img src = "/Public/Home/images/backstage_checkbox_orange.png" alt = "" /></i></td >';
						tbody1 += '<td>' + datas[i].staff_id + '</td> ';
						tbody1 += '<td>' + datas[i].real_name + '</td>';
						tbody1 += '<td>' + datas[i].work_type + '</td>';
						tbody1 += '<td>' + datas[i].job_title + '</td>';
						tbody1 += '<td>' + datas[i].login_name + '</td>';
						tbody1 += '<td>' + datas[i].role_name + '</td>';
						tbody1 += '<td>' + datas[i].mobile + '</td>';
						tbody1 += '<td class = "handle"> <span class = "detail">详情 </span><span class="edit">编辑</span><span class = "check">日志</span><span class="del">删除</span></td>';
						tbody1 += '</tr>';
						tbody1 += '</tbody>';
					}
					return tbody1;
				}
				tbodyOne(datas);
				$(".box .perf table").append(tbody1);
				$(".box .perf tbody tr:odd").addClass("e9ecf1");
			},
			error: function(data) {},
			async: true
		});
	}
	//
	//删除右边点击获取
	$(".box .perf .paging .page_right .more").on("click", function() {
		var moreNum = $(".box .perf .paging .page_right .total_num").text();
		var lessNum = $(".box .perf .paging .page_right .number").text();
		if(moreNum <= lessNum) {
			toast("已经是最后一页了");
		} else {
			lessNum++;
			$(".box .perf .page_right .number").text(lessNum);
			var size = $(".box .perf .pagenum input").val();
			delAjax(size, lessNum);
		}
	})
	//删除左边点击获取
	$(".box .perf  .paging .page_right .less").on("click", function() {
		var moreNum = $(".box .perf .paging .page_right .total_num").text();
		var lessNum = $(".box .perf .paging .page_right .number").text();
		if(lessNum == 1) {
			toast("已经是第一页了");
		} else {
			lessNum--;
			$(".box .perf  .paging .page_right .number").text(lessNum);
			var size = $(".box .perf .pagenum input").val();
			delAjax(size, lessNum);
		}
	})
	//页数点击时获取
	$(".box .perf .paging select").on("change", function() {
		var size = $(this).siblings("input").val();
		delAjax(size, 1);
	})
	var editUser_inputL = "#boxPock .bianjiUserFu .bianjiUser .BJbody .newUsers .first .box .boxLeft .boxUl li span input";
	var editUser_inputR = "#boxPock .bianjiUserFu .bianjiUser .BJbody .newUsers .first .box .boxRight .boxUl li span input";
	$(document).on("input",editUser_inputL,function () {
		var z = $(this).index(editUser_inputL);
		switch (z){
			case 0:
				edit_info.login_name = $(this).val();
				break;
			case 1:
				edit_info.real_name = $(this).val();
				break;
			case 3:
				edit_info.graduate_school = $(this).val();
				break;
			case 5:
				edit_info.mobile = $(this).val();
				break;
		};
	});
	$(document).on("input",editUser_inputR,function () {
		var z = $(this).index(editUser_inputR);
		switch (z){
			case 0:
				edit_info.pass_word = $(this).val();
				break;
			case 5:
				edit_info.qq = $(this).val();
				break;
		};
	});
	
})
/*普通用户详情*/
function GeneralUserDetails (id) {
	$.ajax({
		type:"get",
		url:"/Admin/User/info",
		dataType:"json",
		data:{
			id:id
		},
		success:function (data) {
			console.log(data);
			var leftMess,rightMess;
			if (data.status == 1) {
				if (xiangBol) {
					leftMess = $("#boxPock .edit_user .edit_user_head .edit_user_detail .newUsers .first .box .boxLeft .boxUl li span input");
					rightMess = $("#boxPock .edit_user .edit_user_head .edit_user_detail .newUsers .first .box .boxRight .boxUl li span input");
				}
				if (editBol) {
					leftMess = $("#boxPock .bianjiUserFu .bianjiUser .BJbody .newUsers .first .box .boxLeft .boxUl li span input");
					rightMess = $("#boxPock .bianjiUserFu .bianjiUser .BJbody .newUsers .first .box .boxRight .boxUl li span input");
				}
				leftMess.eq(0).attr("value",data.data.login_name);
				leftMess.eq(1).attr("value",data.data.real_name);
				leftMess.eq(2).attr("value",data.data.birth);
				leftMess.eq(3).attr("value",data.data.graduate_school);
				leftMess.eq(4).attr("value",data.data.job_title);
				leftMess.eq(5).attr("value",data.data.mobile);
				rightMess.eq(0).attr("value","*************");
				if (data.data.gender == 1) {
					rightMess.eq(1).attr("value","男");
				} else{
					rightMess.eq(1).attr("value","女");
				}
				rightMess.eq(2).attr("value",data.data.join_in_work);
				rightMess.eq(3).attr("value",data.data.education);
				rightMess.eq(4).attr("value",data.data.work);
				rightMess.eq(5).attr("value",data.data.qq);
				for (var i = 0;i < data.data.role.length;i++) {
					var z = i + 1;
					if (data.data.role[i] == z) {
						$("#boxPock .edit_user .edit_user_head .edit_user_detail .newUsers .second .Sbody div span a img").eq(i).show();
					}
				}
				if (xiangBol) {
					xiangBol = false;
					$("#boxPock").show();
					$("#boxPock .edit_user").show();
				};
				if (editBol) {
					editBol = false;
					$("#boxPock").show();
					$("#boxPock .bianjiUserFu").show();
				}
			} else{
				console.log(data.msg);
			}
		},
		error:function (res) {
			console.log(res);
		},
		async:true
	});
}
function EditUser (left,right) {
	var leftIpt = $(left);
	var rightIpt = $(right);
	if (leftIpt.eq(2).val() == "") {
		alert("请选择时间");
		return false;
	} else{
		edit_info.birth = leftIpt.eq(2).val();
	}
	if (leftIpt.eq(4).val() == "") {
		alert("请选择职称");
		return false;
	} else{
		edit_info.job_title = leftIpt.eq(4).val();
	}
	if (rightIpt.eq(1).val() == "") {
		alert("请选择性别");
		return false;
	} else{
		if (rightIpt.eq(1).val() == "男") {
			edit_info.gender = "1";
		} else{
			edit_info.gender = "2";
		}
	}
	if (rightIpt.eq(2).val() == "") {
		alert("请选择时间");
		return false;
	} else{
		edit_info.join_in_work = rightIpt.eq(2).val();
	}
	if (rightIpt.eq(3).val() == "") {
		alert("请选择学历");
		return false;
	} else{
		edit_info.education = rightIpt.eq(3).val();
	}
	if (rightIpt.eq(4).val() == "") {
		alert("请选择工种");
		return false;
	} else{
		edit_info.work_type = rightIpt.eq(4).val();
	};
	$.ajax({
		type:"post",
		url:"/Admin/User/edit_info",
		dataType:"json",
		data:{
			login_name : edit_info.login_name,
			real_name : edit_info.real_name,
			gender : edit_info.gender,
			birth : edit_info.birth,
			join_in_work : edit_info.join_in_work,
			graduate_school : edit_info.graduate_school,
			education : edit_info.education,
			job_title : edit_info.job_title,
			mobile : edit_info.mobile,
			qq : edit_info.qq,
			work_type : edit_info.work_type,
			staff_id : edit_info.staff_id,
			role : edit_info.role.join(),
			pass_word : edit_info.pass_word
		},
		success:function (res) {
			console.log(res);
			if (res.status == 1) {
				document.location.reload();
			} else{
				alert(res.msg);
			};
		},
		error:function (err) {
			console.log(err);
		},
		async:true
	});
}