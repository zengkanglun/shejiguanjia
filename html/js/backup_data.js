$(function() {
	/*token*/
	var token = localStorage.getItem("token");
	//获取notice详细，并渲染
	var realTime = function() {

		var token = localStorage.getItem("token");
		$.ajax({
			type: "POST",
			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + "/index.php/Home/database/index",
			dataType: 'json',
			data: {},
			success: function(data) {
				toast(data.msg);
				if(data.status == 1) { //success
					 
					realTimeFiles();
				} else {
				}
			},
			error: function(data) {
				toast("备份失败");
			}
		})
	}

	//显示备份列表
	var rendFilesList = function(data) {
		$("#data_backup_list").html("");
		var item = $(
			'<li>' +
			'<span style="width:40%;">文件名</span>' +
			'<span style="width:40%;">时间</span>' +
			'<span style="width:20%;">操作</span>' +

			'</li>'
		)
		$("#data_backup_list").append(item);
		for(var i in data) {
			var o = data[i];
			var item = $(
				'<li>' +
				'<span style="">' + o.basename + '</span>' +
				'<span style="padding-left:20px;color:#aaa;">' + o.times + '</span>' +
				'<span class="dele" data-times="' + o.time + '">删除</span>' +
				'<span class="recover" data-times="' + o.time + '">恢复</span>' +
				'</li>'
			)

			$("#data_backup_list").append(item);
		}
	}

	//备份文件列表
	var realTimeFiles = function() {

		var token = localStorage.getItem("token");
		$.ajax({
			type: "POST",
			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + "/index.php/Home/database/filename",
			dataType: 'json',
			data: {},
			success: function(data) {
				if(data.status == 1) { //success
					rendFilesList(data.data);

				} else {
				}

			},
			error: function(data) {
			}
		})
	}

	//删除

	var deletBackup = function(time) {

		var token = localStorage.getItem("token");
		$.ajax({
			type: "POST",
			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + "/index.php/Home/database/del",
			dataType: 'json',
			data: {
				time: time
			},
			success: function(data) {
				toast(data.msg);
				if(data.status == 1) { //success
					console.log(data.msg);
					realTimeFiles(); 
				} else {
				}
			},
			error: function(data) {
				toast("失败！");
			}
		})
	}

	//还原

	var reduction = function(time) {

		var token = localStorage.getItem("token");
		$.ajax({
			type: "POST",
			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + "/index.php/Home/database/reduction",
			dataType: 'json',
			data: {
				time: time
			},
			success: function(data) {
				toast(data.msg);
				if(data.status == 1) { //success
					console.log(data.msg);

				} else {
				}
			},
			error: function(data) {
				toast("失败！");
			}
		})
	}

	//实时备份
	$("#real_time_back").on("click", function() {
		realTime();
	})
	//删除备份
	$(document).on("click", ".dele", function() {
		var time = $(this).data("times");
		deletBackup(time);
	})
	//还原
	$(document).on("click", ".recover", function() {
		var time = $(this).data("times");
		//console.log("1:" + time)
		$("#mesure").data("times", time);
	})

	//弹框的确认恢复                  
	$("#mesure").on("click", function() {
		var time = $(this).data("times");
		//console.log("2:" + time)
		reduction(time);
	})
	realTimeFiles();

})