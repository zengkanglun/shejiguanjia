$(function() {
	/*token*/
	var token = localStorage.getItem("token");
	var rendPMList = function(data) {
		$("#userMList").html("");
		for(var i in data) {
			var log = data[i];
			var item = $('<tr>' +
				'<td><span><img src="img/backstage_checkbox_orange.png" alt="" /></span></td>' +
				'<td>' + (parseInt(i) + 1) + '</td>' +
				'<td>' + log.username + '</td>' +
				'<td>' + log.nickname + '</td>' +
				'<td>' + log.log_info + '</td>' +
				'<td>' + log.log_ip + '</td>' +
				'<td>' + log.add_time + '</td>' +

				
				'</tr>');
			$("#userMList").append(item);

		}
	}

	//获取日志列表
	var getPList = function(key) {


		$.ajax({
			type: "get",
			url: host_host_host + "/index.php/Home/Admin/logs",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				type: 8,
				id: key
			},
			success: function(data) {
				if(data.status == 1) { //success
					rendPMList(data.data.data);
					$(".total_num.a").html(data.data.page);
					$(".number").html((data.data.page<=1)?data.data.page:1);					
					
					$("#total").html(data.data.count);
					total_num_nor = parseInt(data.data.page);
					total_num_nor = parseInt(data.data.page);
				} else {
//					console.log(data.msg + 5 + data.data)
				}
			},
			error: function(data) {
			},
			async: true
		});

	}

	getPList("");

	//key查询
	$("#query").on("click", function() {
		var key = $("#query_key").val();
		if(key != "")
			key = "/" + key;
//		console.log(key)
		getPList(key);

	})

	//总页数
	var total_num_nor = 0; //总页数
	//翻页
	var getPageParam = function(page, type) {
		//();
		$.ajax({
			type: "get",
			url: host_host_host + "/index.php/Home/Admin/logs",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				type: type,
				p: page
			},
			success: function(data) {
				if(data.status == 1) { //success
					rendPMList(data.data.data);
					$(".total_num.a").html(data.data.page);
					$(".number").html((data.data.page<=1)?data.data.page:page);										
					$("#total").html(data.data.count);
					total_num_nor = parseInt(data.data.page);
				} else {
				}
			},
			error: function(data) {
//				console.log(0)
			},
			async: true
		});

	}

	var g_pageCur = 1;

	var g_type = 1; //1-8

	//上一页
	$("#prev").on("click", function() {
		g_pageCur--;
		//getPrevPage();
		if(g_pageCur < 1)
			g_pageCur = 1;
		getPageParam(g_pageCur, g_type);
		$(".number").html(g_pageCur);

	})
	//下一页
	$("#after").on("click", function() {
		g_pageCur++;
		if(g_pageCur > total_num_nor)
			g_pageCur--;
		getPageParam(g_pageCur, g_type);

		$(".number").html(g_pageCur);

	})

	//10-20 后追加 切huan

	$(".tap div").on("click", function() {
		var type = $(this).data("type");
		g_type = type;
		g_pageCur = 1;
		$(".number").html(g_pageCur);
		getPageParam(g_pageCur, type);
		$(this).siblings().removeClass("tapDivActive");
		$(this).addClass("tapDivActive");

	})

})