$(function() {
	var host_host_host = "http://localhost/php";
	var d = new Date();
	var str = d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日";
	var str1 = "星期" + "日一二三四五六".charAt(new Date().getDay());
	$(".headright").text(str + " " + str1)

	$(document).on("click", ".btn1", function() {
		var account = $(".account").val();
		var password = $(".password").val();
		login(account, password);
	})

	$(document).on("keydown", function(event) {
		if(event.keyCode == 13) {
			var account = $(".account").val();
			var password = $(".password").val();
			login(account, password);
		}
	})

	function login(account, password) {
		$.ajax({
			type: "post",
			url: host_host_host + "/index.php/home/public/login",
			dataType: 'json',
			data: {
				username: account,
				password: password
			},
			success: function(data) {
				if(data.status == 1) {
					var token = data.data.token;
					localStorage.setItem("token", token);
					sessionStorage.setItem("img", data.data.img);
					sessionStorage.setItem("nickname", data.data.nickname);
					sessionStorage.setItem("username", data.data.username);
					sessionStorage.setItem("authority", data.data.authority);
					sessionStorage.setItem("is_super", data.data.is_super);
					sessionStorage.setItem("uid", data.data.uid);
					sessionStorage.setItem("last_time", data.data.last_time);
					sessionStorage.setItem("last_ip", data.data.last_ip);
					location.href = "index.html?project_id="+ data.data.project_id;
                    localStorage.setItem("project_id", data.data.project_id);
				} else {
					alert("账号或者密码错误");
				}
			},
			error: function(data) {

			},
			async: true
		});
	}
})