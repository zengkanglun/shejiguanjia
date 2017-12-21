var host_host_host = "http://localhost/php/index.php";
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
/*login点击回到首页*/
$(document).on("click",".logoDiv",function(){
	location.href="index.html"
})


//搜索项目
$(document).on("click",".icon-search img",function(){
	var name = $(".p-search").val();
	console.log(name);
	search(name);
})
function search(name){
    $.ajax({
        type: "post",
        dataType: 'json',
        url: host_host_host + "/home/public/p_search",
        headers: {
            accept: "usertoken:" + token,
        },
        data:{
        	name:name,
        },
        success: function (data) {
			if(data.status=1){
				console.log(data);
				//window.location('pandect.html');
				$("#go_list_aa tr").remove();
				var project = '';
				for(var i = 0; i<data.data.length; i++){
					project += '<tr>';
					project += '<td>'+ (i+1) + '</td>';
					project += '<td>'+ data.data[i].name +'</td>';
					project += '<td>'+ data.data[i].building_type +'</td>';
                    project += '<td>'+ data.data[i].province + data.data[i].city +'</td>';
                    project += '<td>'+ data.data[i].build +'</td>';
                    project += '<td>'+ data.data[i].direct_name +'</td>';
                    project += '<td>'+ data.data[i].add_time +'</td>';
                    project += '<td class="handle"><span class="edit"><a href="#">编辑</a></span><span class="check"><a href="#">查看</a></span></td>';
					project += '</tr>';
				}

				$("#go_list_aa").append(project);
			}else{
				alert("没有相关项目");
			}
        }
    })
}

/*判断token是否失效*/
//ajaxLogin();
//
//function ajaxLogin() {
//	$.ajax({
//		type: "get",
//		dataType: 'json',
//		headers: {
//			accept: "usertoken:" + token,
//		},
//		url: host_host_host + "/home/user/check_token",
//		data: {},
//		success: function(data) {
//			console.log(data)
//			if(data.status = 1) {
//				console.log(data.status)
//			} else {
//				location.href = "login.html"
//			}
//		},
//		error: function(data) {
//			console.log(data)
//		},
//		async: true
//	});
//}
//setInterval(function() {
//	ajaxLogin();
//}, 30000)

/*判断是否锁屏*/
//$.ajax({
//	type: "get",
//	dataType: 'json',
//	headers: {
//		accept: "usertoken:" + token,
//	},
//	url: host_host_host + "/home/user/check_lock",
//	data: {},
//	success: function(data) {
//		if(data.status == 1) {
//			$("body .lock").remove();
//		} else {
//			//			lock()
//		}
//	},
//	error: function(data) {
//		console.log(data)
//	},
//	async: true
//});

/*锁屏*/
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
			console.log(data)
		},
		async: true
	});
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


/*解锁*/
$(document).on("click", ".lock button", function() {
	var password = $(".lock .password input").val();
	console.log(token);
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
			console.log(data)
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
	var username = sessionStorage.getItem("username");
	var authority = sessionStorage.getItem("authority");
	//	var num = authority.indexOf(4);
	var is_super = sessionStorage.getItem("is_super");
	var last_time = sessionStorage.getItem("last_time");
	var last_ip = sessionStorage.getItem("last_ip");
	var nickname = sessionStorage.getItem("nickname");
	//	if(num != -1) {
	//		$(".list_6").show();
	//	}
	//	if(is_super == 1) {
	//		$(".list_7").show();
	//		$(".list_6").show();
	//	} else {
	//		$(".list_7").hide();
	//		$(".list_6").hide();
	//	}
	$(".bodyLeftFu .info_name").text(nickname);
	$(".bodyLeftFu .info_image .photo").attr("src", img);
	$("#bodyRight .right .info-image img").attr("src", img);
	$("#bodyRight .dataTime div").html(localStorage.getItem('nowDate'));
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
				location.href = "login.html"
			}
		},
		error: function(data) {

		},
		async: true
	});
})
/*项目名字*/
var itemName = sessionStorage.getItem("itemName");
$(".current_task .task_name").text(itemName);


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
				console.log(data);
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
	console.log(img)
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
		url: host_host_host + "/home/user/head_img",
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
			console.log(data.msg)
			if(data.msg == 0) {
				$(".a_box span img").hide()
			} else {
				$(".a_box span img").show()
				$(".a_box span i").text(data.msg)
			}
		} else {

		}
	},
	error: function(data) {

	},
	async: true
});
