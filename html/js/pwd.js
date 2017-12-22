$(function() {
	/*token*/
	var token = localStorage.getItem("token");
	//修改密码

	var pwdEdF = function() {

//		console.log(5);

		var newP = {};
		newP.old_pwd = "" + $("#old_pwd").val();
		newP.new_pwd = "" + $("#new_pwd").val();
		newP.verify_pwd = "" + $("#verify_pwd").val();

//		console.log(JSON.stringify(newP))
		token = localStorage.getItem("token");
		$.ajax({

				method: 'POST',
				dataType: 'json',

				headers: {
					accept: "usertoken:" + token
				},
				url: host_host_host +'/index.php/home/admin/change_pwd',
				data: newP, //{},
			})
			.done(function(data) {
				toast(data.msg);
				if(data.status == 1) { //success
//					console.log(1)
				} else {
//					console.log(data.msg + 5 + data.data)
				}
//				console.log(data);
//				console.log(JSON.stringify(data));
			})
			.fail(function(data) {
				toast("失败！");
//				console.log("fail!");
			})
			.always(function(data) {
//				console.log("always!");
//				console.log(JSON.stringify(data));
			})

	}

	$("#pwdEd").on("click", pwdEdF);
})