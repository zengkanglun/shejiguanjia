$(function() {
	var host_host_host = "http://localhost/shejiguanjia/php";
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
		var token = localStorage.getItem("token");
		if(token) {
			localStorage.removeItem('token');
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
					localStorage.clear();
					sessionStorage.clear();
				},
				error: function(data) {

				},
				async: true
			});
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
						location.href = "index.html";
					} else {
                        alert(data.msg);
					}
				},
				error: function(data) {

				},
				async: true
			});
		} else {
			$.ajax({
				type: "post",
				url: host_host_host + "/home/public/login",
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
						location.href = "index.html";
					} else {
						alert(data.msg);
					}
				},
				error: function(data) {

				},
				async: true
			});
		}

	}
})