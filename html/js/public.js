var host_host_host = "http://localhost/shejiguanjia/php";
var tapChoose = null;
var token = localStorage.getItem("token");
var windowWidthR, resizeWidth;
$(function() {
	if($(window).width() <= 1360) {
		windowWidthR = 1360;
	} else {
		windowWidthR = $(window).width();
	};
	resizeWidth = windowWidthR - $("#bodyLeft").width();
	$("#bodyRight").width(resizeWidth);
	$("#bodyLeft").height($(window).height());
	$("#bodyLeft .bodyLeftFu .bodyLeftBox").height($(window).height() - $("#bodyLeft .logoDiv").height());
	$("#bodyRight #content").height($(window).height() - $("#bodyRight #header").outerHeight(true));
});

window.onresize = function() {
	if($(window).width() <= 1360) {
		windowWidthR = 1360;
	} else {
		windowWidthR = $(window).width();
	};
	resizeWidth = windowWidthR - $("#bodyLeft").width();
	$("#bodyRight").width(resizeWidth);
}

function toast(n) {
	$('.xxxxxxx').remove();
	var str = "<div style='opacity:0.9;z-index:999' class='msg_remind xxxxxxx'>" + n + "</div>";
	$("body").append(str);
	$(".msg_remind").show();
	setTimeout(function() {
		$('.msg_remind').remove();
	}, 2000);

}
/*logo点击回到首页*/
$(document).on("click", ".logoDiv", function() {
	location.href = "index.html"
})

function lock() {
	var lock;
	lock += '<div class="lock">';
	lock += '<div class="lock_bg">';
	lock += '<div class="password">';
	lock += '<span>密码：</span>';
	lock += '<input type="password" />';
	lock += '</div>';
	lock += '<button>解锁</button>';
	lock += '</div>';
	lock += '</div>';
	$("body").append(lock);
}

/*判断token是否失效*/
ajaxLogin();

function ajaxLogin() {
	$.ajax({
		type: "get",
		dataType: 'json',
		headers: {
			accept: "usertoken:" + token,
		},
		url: host_host_host + "/home/user/check_token",
		data: {},
		success: function(data) {
			if(data.status == 1) {

			} else {
				toast('登录已失效，请重新登录');
				setInterval(function(){
                    location.href = "login.html"
				},2000);

			}
		},
		error: function(data) {
			//			console.log(data)
		},
		async: true
	});
}
setInterval(function() {
	ajaxLogin();
}, 60000)

/*判断是否锁屏*/
$.ajax({
	type: "get",
	dataType: 'json',
	headers: {
		accept: "usertoken:" + token,
	},
	url: host_host_host + "/home/user/check_lock",
	data: {},
	success: function(data) {
		if(data.status == 1) {
			$("body .lock").remove();
		} else {
			if(data.status == 5){
				toast('登录已失效，请重新登录');
				setInterval(function () {
					window.location.href = "login.html";
                },2000);
			}else	lock();
		}
	},
	error: function(data) {
		//		console.log(data)
	},
	async: true
});
///*锁屏*/
$(document).on("click", ".userinfo .rows .one", function() {
	$.ajax({
		type: "post",
		dataType: 'json',
		headers: {
			accept: "usertoken:" + token,
		},
		url: host_host_host + "/home/user/lock",
		data: {},
		success: function(data) {
			if(data.status == 1) {
				lock();
			} else {

			}
		},
		error: function(data) {
			//			console.log(data)
		},
		async: true
	});
})
/*解锁*/
$(document).on("click", ".lock button", function() {
	var password = $(".lock .password input").val();
	//	console.log(token);
	$.ajax({
		type: "post",
		dataType: 'json',
		headers: {
			accept: "usertoken:" + token,
		},
		url: host_host_host + "/index.php/Home/Index/unlock",
		data: {
			password: password
		},
		success: function(data) {
			if(data.status == 1) {
				$("body .lock").remove();
			} else {
				toast("密码错误")
			}
		},
		error: function(data) {
			//			console.log(data)
		},
		complete: function(XMLHttpRequest, status) { //请求完成后最终执行参数　
		},
		async: true
	});
})
/*页面添加*/
pageadd();

function pageadd() {
	var img = sessionStorage.getItem("img");
	var d = new Date();
	var str = d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日";
	var str1 = "星期" + "日一二三四五六".charAt(new Date().getDay());
	var username = sessionStorage.getItem("username");
	var authority = sessionStorage.getItem("authority");
	var is_super = sessionStorage.getItem("is_super");
	var last_time = sessionStorage.getItem("last_time");
	var last_ip = sessionStorage.getItem("last_ip");
	var nickname = sessionStorage.getItem("nickname");
	if(!username) {
		location.href = "login.html";
		return false;
	}
//	if(!authority) {
//		location.href = "login.html";
//		return false;
//	}
	if(!is_super) {
		location.href = "login.html";
		return false;
	}
	//	console.log(authority)
	/*判断权限*/
	if(is_super == 1) {
		$(".list_7").show();
		$(".list_6").show();
		$(".Q_rygl").show();
		$(".Q_ygrw").show();
		$(".Q_rcjx").show();
	} else {
		$(".list_7").hide();
		$(".list_6").hide();
		if(authority.indexOf(4) != -1) {
			$(".list_6").show();
		}
		if(authority.indexOf(5) == -1) {
			$(".Q_rygl").hide();
		}
		if(authority.indexOf(7) == -1) {
			$(".Q_ygrw").hide();
			$(".Q_rcjx").hide();
		}
	}
	$(".bodyLeftFu .info_name").text(nickname);
	$(".bodyLeftFu .info_image .photo").attr("src", img);
	$("#bodyRight .right .info-image img").attr("src", img);
	$("#bodyRight .dataTime div").html(str + '&nbsp;&nbsp;&nbsp;&nbsp;' + str1);
	$("#bodyRight .last_time i").html(last_time);
	$("#bodyRight .last_ip i").html(last_ip);
}

/*退出登录*/
$(document).on("click", ".closeBtn", function() {
	var token = localStorage.getItem("token");
	$.ajax({
		type: "post",
		url: host_host_host + "/home/user/logout",
		dataType: 'json',
		headers: {
			accept: "usertoken:" + token,
		},
		data: {

		},
		success: function(data) {
			if(data.status == 1) {
				toast(data.msg);
				localStorage.clear();
				sessionStorage.clear();
				setTimeout(function() {
					location.href = "login.html"
				}, 1000)
			} else if(data.status == 2) {
				toast(data.msg);
				localStorage.clear();
				sessionStorage.clear();
				setTimeout(function() {
					location.href = "login.html"
				}, 1000)
			} else {
				toast(data.msg);
				localStorage.clear();
				sessionStorage.clear();
				setTimeout(function() {
					location.href = "login.html"
				}, 1000)
			}
		},
		error: function(data) {

		},
		async: true
	});
})
/*项目名字*/
var itemName = sessionStorage.getItem("itemName");
if(!itemName) {
	itemName = "";
	$(".current_task .task_name").text(itemName);
} else {
	$(".current_task .task_name").text(itemName);
}

/*修改密码*/
function psw() {
	var changePsw = "";
	changePsw += '<div class="login_psw">';
	changePsw += '<div class="psw_header">';
	changePsw += '修改密码';
	changePsw += '<i></i>';
	changePsw += '</div>';
	changePsw += '<div class="psw_content">';
	changePsw += '<div class="psw_detail name">';
	changePsw += '<div class="psw_detail_left">姓名:</div>';
	changePsw += '<input readonly="readonly" type="text" name="" value="李四" class="nickname" />';
	changePsw += '</div>';
	changePsw += '<div class="psw_detail">';
	changePsw += '<div class="psw_detail_left">账号:</div>';
	changePsw += '<input readonly="readonly" type="text" name="" value="输入账号" class="username" />';
	changePsw += '</div>';
	changePsw += '<div class="psw_detail">';
	changePsw += '<div class="psw_detail_left">旧密码:</div>';
	changePsw += '<input type="password" name="" id="" value="输入旧密码" class="psw_detail_right oldPwd" />';
	changePsw += '</div>';
	changePsw += '<div class="psw_detail">';
	changePsw += '<div class="psw_detail_left">新密码:</div>';
	changePsw += '<input type="password" name="" id="" value="输入新密码" class="psw_detail_right newPwd" />';
	changePsw += '</div>';
	changePsw += '<div class="psw_detail">';
	changePsw += '<div class="psw_detail_left">再次确认:</div>';
	changePsw += '<input type="password" name="" id="" value="输入新密码" class="psw_detail_right newPwd1" />';
	changePsw += '</div>';
	changePsw += '</div>';
	changePsw += '<button type="button" class="btn1" id="editPwd">确&nbsp;&nbsp;定</button>';
	changePsw += '<button type="button" class="btn2" id="editPwd">取&nbsp;&nbsp;消</button>';
	changePsw += '</div>';
	$("#boxPock .scroll").append(changePsw);
}
///*修改密码*/
$(document).on("click", ".userinfo .rows .two", function() {
	$("#boxPock").show();
	psw();
	$.ajax({
		type: "get",
		url: host_host_host + "/index.php/Home/User/get_nickname",
		dataType: 'json',
		headers: {
			accept: "usertoken:" + token,
		},
		data: {},
		success: function(data) {
			if(data.status == 1) {
				//				console.log(data);
				$(".login_psw .nickname").val(data.data.nickname);
				$(".login_psw .username").val(data.data.username);
			} else {

			}
		},
		error: function(data) {

		},
		async: true
	});
})
$(document).on("click", ".login_psw .psw_header i,.login_psw .btn2", function() {
	$("#boxPock").hide();
	$("#boxPock .scroll .login_psw").remove();
})
$(document).on("click", ".login_psw .btn1", function() {
	var old_pwd = $(".login_psw .oldPwd").val();
	var new_pwd = $(".login_psw .newPwd").val();
	var verify_pwd = $(".login_psw .newPwd1").val();
	$.ajax({
		type: "post",
		url: host_host_host + "/index.php/Home/User/change_pwd",
		dataType: 'json',
		headers: {
			accept: "usertoken:" + token,
		},
		data: {
			old_pwd: old_pwd,
			new_pwd: new_pwd,
			verify_pwd: verify_pwd
		},
		success: function(data) {
			if(data.status == 1) {
				toast(data.msg)
				$("#boxPock").hide();
				$("#boxPock .scroll .login_psw").remove();
			} else {

			}
		},
		error: function(data) {

		},
		async: true
	});
})

/*更换头像*/

function change_pic() {
	var change_pic = "";
	change_pic += '<div class="change_pic" style="display: block;">';
	change_pic += '<div class="pic_head">';
	change_pic += '<span>更换头像</span>';
	change_pic += '<i></i>';
	change_pic += '</div>';
	change_pic += '<form id="login_pic">';
	change_pic += '<img src="img/icon-userGuanli-orange.png" alt="" class="photo" />';
	change_pic += '<span>选择头像</span>';
	change_pic += '<input type="file" name="file" id="" value="" class="file" />';
	change_pic += '</form>';
	change_pic += '<button type="button" class="btn1" id="editPwd">确&nbsp;&nbsp;定</button>';
	change_pic += '</div>';
	$("#boxPock .scroll").append(change_pic);
}
$(document).on("click", ".userinfo .rows .three", function() {
	$("#boxPock").show();
	change_pic();
	var img = sessionStorage.getItem("img")
	//	console.log(img)
	$(".change_pic .photo").attr("src", img);
})
$(document).on("click", ".change_pic .pic_head i", function() {
	$("#boxPock").hide();
	$("#boxPock .scroll .change_pic").remove();
})
$(document).on("change", ".change_pic .file", function() {
	var file = this.files[0];
	var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function() {
		var url = reader.result;
		$(".change_pic .photo").attr("src", url);
	}
})
$(document).on("click", ".change_pic .btn1", function() {
	var form = new FormData($(".change_pic #login_pic")[0]);
	$.ajax({
		url: host_host_host + "/index.php/home/user/head_img",
		type: "post",
		headers: {
			accept: "usertoken:" + token,
		},
		data: form,
		processData: false,
		contentType: false,
		success: function(data) {
			if(data.status == 1) {
				sessionStorage.setItem("img", data.data);
				setTimeout(function() {
					location.reload();
				}, 1000)
			} else {
				toast(data.msg)
			}
		},
		error: function(e) {}
	});
})

/*显示消息条数*/
$.ajax({
	type: "get",
	url: host_host_host + "/home/notice/get_number",
	dataType: 'json',
	headers: {
		accept: "usertoken:" + token,
	},
	data: {},
	success: function(data) {
		if(data.status == 1) {
			if(data.msg == 0) {
				$(".a_box .l_msg").hide()
			} else {
				$(".a_box .l_msg").show()
				var num = Number(data.msg);
				if(num >= 100) {
					$(".a_box .l_msg i").text("···");
				} else {
					$(".a_box .l_msg i").text(num);
				}
			}
		} else {

		}
	},
	error: function(data) {

	},
	async: true
});
/*显示任务消息条数*/
$.ajax({
	type: "get",
	url: host_host_host + "/home/task/new_task_num",
	dataType: 'json',
	headers: {
		accept: "usertoken:" + token,
	},
	data: {},
	success: function(data) {
		if(data.status == 1) {
			if(data.data == 0) {
				$(".a_box .l_task").hide()
			} else {
				$(".a_box .l_task").show();
				var num = Number(data.data);
				if(num >= 100) {
					$(".a_box .l_task i").text("···");
				} else {
					$(".a_box .l_task i").text(num);
				}
			}
		} else {

		}
	},
	error: function(data) {

	},
	async: true
});
/*单位信息获取*/
$.ajax({
	type: "get",
	url: host_host_host + "/index.php/Home/Admin/info",
	dataType: 'json',
	headers: {
		accept: "usertoken:" + token,
	},
	data: {},
	success: function(data) {
		if(data.status == 1) {
			$(".danw span").text(data.data[0].address)
		} else {

		}
	},
	error: function(data) {

	},
	async: true
});
/*人员搜索*/
$(document).on("keyup", ".subitem_choose .search_right input", function() {
	var name = $(this).val();
	if(name) {
		$(".subitem_choose_bottom .item_name li").eq(1).addClass("active").siblings().removeClass("active");
		$(".subitem_choose_bottom .admin").hide();
		$(".subitem_choose_bottom .admin").eq(1).show();
		$(".Allworker li").each(function() {
			if(($(this).find("span").text()).indexOf(name) == -1) {
				$(this).hide();
			} else {
				$(this).show();
			}
		})
	} else {
		$(".Allworker li").show();
	}
})