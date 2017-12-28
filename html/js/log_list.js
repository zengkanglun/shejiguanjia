$(function() {
	/*token*/
	var token = localStorage.getItem("token");
	var rendPMList = function(data) {
		$("#userMList").html("");
		var classname = "";
		for(var i in data) {
			var log = data[i];
			if(i % 2)
				classname = "tableTrBackground";
			else
				classname = "";

			var item = $('<tr class="' + classname + '">' +
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
	var g_type = 1; //1-8
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
				type: g_type,
				id: key
			},
			success: function(data) {
				if(data.status == 1) { //success
					rendPMList(data.data.data);
					$(".total_num.a").html(data.data.page);
					$(".number").html((data.data.page <= 1) ? data.data.page : 1);

					$("#total").html(data.data.count);
					total_num_nor = parseInt(data.data.page);
					total_num_nor = parseInt(data.data.page);
				} else {
					//					console.log(data.msg + 5 + data.data)
				}
			},
			error: function(data) {},
			async: true
		});

	}

	/*获取userid值*/
	var g_id = "";

	//key查询
	$("#query").on("click", function() {
		var key = $("#query_key").val();
		//getPList(id);
		getPageParam(1, g_type, key)

	})

	//总页数
	var total_num_nor = 0; //总页数
	//翻页
	var getPageParam = function(page, type, key) {
		$.ajax({
			type: "get",
			url: host_host_host + "/index.php/Home/Admin/logs",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				type: type,
				p: page,
				name: key,
				id:g_id
			},
			success: function(data) {
				if(data.status == 1) { //success
					rendPMList(data.data.data);
					$(".total_num.a").html(data.data.page);
					$(".number").html((data.data.page <= 1) ? data.data.page : page);
					$("#total").html(data.data.count);
					total_num_nor = parseInt(data.data.page);
				} else {
					toast(data.msg);
				}
			},
			error: function(data) {
				//				console.log(0)
			},
			async: true
		});

	}

	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}
	if(GetQueryString("userid")) {
		g_id = GetQueryString("userid");
		getPList(g_id);
	} else {
		console.log(123)
		g_id = "";
		getPageParam(1, 1, $("#query_key").val());
	}
	var g_pageCur = 1;

	//getPageParam(g_pageCur, g_type, $("#query_key").val());

	//上一页
	$("#prev").on("click", function() {
		g_pageCur--;
		//getPrevPage();
		if(g_pageCur < 1)
			g_pageCur = 1;
		getPageParam(g_pageCur, g_type, $("#query_key").val());
		$(".number").html(g_pageCur);

	})
	//下一页
	$("#after").on("click", function() {
		g_pageCur++;
		if(g_pageCur > total_num_nor)
			g_pageCur--;
		getPageParam(g_pageCur, g_type, $("#query_key").val());

		$(".number").html(g_pageCur);

	})

	//10-20 后追加 切huan

	$(".tap div").on("click", function() {
		var type = $(this).data("type");
		g_type = type;
		g_pageCur = 1;
		$(".number").html(g_pageCur);
		getPageParam(g_pageCur, type, $("#query_key").val());
		$(this).siblings().removeClass("tapDivActive");
		$(this).addClass("tapDivActive");

	})

	$(".go").on("click", function() {
		var jump_num = Number($(this).siblings(".jump_page").val());
		if(jump_num > 0) {

			g_pageCur = jump_num;
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
			getPageParam(g_pageCur, g_type, $("#query_key").val());
			$(".number").html(g_pageCurD);
		} else {
			toast("请输入正常页码")
		}

	})

})