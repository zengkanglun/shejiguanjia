$(function() {
	var token = localStorage.getItem("token");
	//tab栏切换
	$(".tab .tab_left li").on("click", function() {
		$(this).addClass("active").siblings().removeClass("active")
	})
	$(".tab .tab_left li").eq(0).on("click", function() {
		$(".content_detail .item_content").show();
		$(".content_detail .staff_content").hide();
		$(".content_detail .perf_content").hide();
	})
	$(".tab .tab_left li").eq(1).on("click", function() {
		$(".content_detail .item_content").hide();
		$(".content_detail .staff_content").show();
		$(".content_detail .perf_content").hide();
	})
	$(".tab .tab_left li").eq(2).on("click", function() {
		$(".content_detail .item_content").hide();
		$(".content_detail .staff_content").hide();
		$(".content_detail .perf_content").show();
	})
	//绩效弹窗
	//$(".perf_content table .handle span").on("click", function() {
	$(document).on("click", ".perf_content table .handle span", function() {

		$("#boxPock").show();
		$(".perf_detail").show();
	})
	//绩效弹窗关闭
	$("#boxPock .perf_detail i").on("click", function() {
		$("#boxPock").hide();
		$(".perf_detail").hide();
	})
	//点击确定绩效弹窗关闭
	$("#boxPock .perf_detail button").on("click", function() {
		$("#boxPock").hide();
		$(".perf_detail").hide();
	})
	//select选中
	$("select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	})
	/*汇总排序*/
	var sortNum;
	$(".perf_content .sort").on("click", function() {
		sortNum = 1;
		var num = $(this).attr("data-id");
		var txtName = $("#query_key_b").val();
		if(num == 0) {
			$(this).attr("data-id", 1)
		} else {
			$(this).attr("data-id", 0)
		}
		if(sortNum == 1) {
			perf(1, num,txtName)
		}
	})
	/*项目信息*/
	perf(1)

	function perf(p, amount, name) {
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Commission/performanceListV2",
			dataType: 'json',
			data: {
				p: p,
				amount: amount,
				name: name
			},
			headers: {
				accept: "usertoken:" + token,
			},
			success: function(data) {
				if(data.status == 1) {
					console.log(data);
					var str = "";
					var datas = data.data.list;
					for(var i = 0; i < datas.length; i++) {
						str += '<tr>';
						str += '	<td>' + (i + 1) + '</td>';
						str += '	<td>' + datas[i].nickname + '</td>';
						str += '	<td>' + datas[i].project_num + '</td>';
						str += '	<td>' + datas[i].amount + '</td>';
						str += '</tr>';
					}
					$(".perf_content .page_left span").text(data.data.count);
					$(".perf_content .page_right .total_num").text(data.data.totalPage);
					$('.perf_content tbody').html(str);
				} else {
					toast(data.msg)
				}
			},
			error: function(data) {},
			async: true
		});
	}

	/*页数增加*/
	$(document).on("click", ".perf_content .page_right .more", function() {
		var total_num = Number($(".perf_content .page_right .total_num").text());
		var num = Number($(".perf_content .page_right .number").text());
		var txtName = $("#query_key_b").val();
		var s_num = $(".perf_content .sort").attr("data-id");
		if(num >= total_num) {
			toast("已经是最后一页了")
		} else {
			num++;
			$(".perf_content .page_right .number").text(num);
			perf(num, s_num, txtName)
		}
	})
	/*页数减少*/
	$(document).on("click", ".perf_content .page_right .less", function() {
		var num = Number($(".perf_content .page_right .number").text());
		var txtName = $("#query_key_b").val();
		var s_num = $(".perf_content .sort").attr("data-id");
		if(num == 1) {
			toast("已经是第一页了")
		} else {
			num--;
			$(".perf_content .page_right .number").text(num);
			perf(num, s_num, txtName)
		}
	})
	/*已读通知跳页*/
	$(document).on("click", ".perf_content .paging .jump .go", function() {
		var jump_num = Number($(this).siblings(".jump_page").val());
		var txtName = $("#query_key_b").val();
		var s_num = $(".perf_content .sort").attr("data-id");
		if(jump_num > 0) {
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
			perf(jump_num, s_num, txtName)
		} else {
			toast("请输入正常页码")
		}
	})
	$(".go.men").on("click", function() {
		var jump_num = Number($(this).siblings(".jump_page").val());
		var s_num = $(".perf_content .sort").attr("data-id");
		var txtName = $("#query_key_b").val();
		if(jump_num > 0) {

			g_pageCurD = jump_num;
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
			perf(jump_num, s_num, txtName)

			$("cu_men").html(jump_num);
		} else {
			toast("请输入正常页码")
		}

	})
	/*点击项目搜索*/
	$(".perf_content .staff_search a").on("click", function() {
		var txtName = $("#query_key_b").val();
		var s_num = $(".perf_content .sort").attr("data-id");
		perf(1, s_num, txtName);
		$(".perf_content .page_right .number").text(1);
	})
	$(document).on("keyup", "#query_key_b", function() {
		var txtName = $("#query_key_b").val();
		var s_num = $(".perf_content .sort").attr("data-id");
		perf(1, s_num, txtName);
		$(".perf_content .page_right .number").text(1);
	})
})