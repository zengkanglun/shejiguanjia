$(function() {
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
	/*项目信息*/
//	
	itemList(1,1,1,"2017-10-10","2017-10-27")

	function itemList(p1, p2, p3, go_time, end_time) {
		$.ajax({
			type: "post",
			url: host_host_host + "/home/project/project_list",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				p1: p1,
				p2: p2,
				p3: p3,
				go_time: go_time,
				end_time: end_time
			},
			success: function(data) {
				if(data.status == 1) {
					console.log(data)
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	}
})