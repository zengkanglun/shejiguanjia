$(function() {
	//tab切换
	$(".box .xs-3").eq(0).on("click", function() {
		$(this).addClass("HeaderRowsActive").siblings().removeClass("HeaderRowsActive");
		$(".box .has_send_msg").show();
		$(".box .has_send_task").hide();
	})
	$(".box .xs-3").eq(1).on("click", function() {
		$(this).addClass("HeaderRowsActive").siblings().removeClass("HeaderRowsActive");
		$(".box .has_send_msg").hide();
		$(".box .has_send_task").show();
	})
	//select选中
	$("select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	})
	//序号选中
	$(document).on("click", ".third table .choose span", function() {
		$(this).toggleClass("active")
	})
	//已发通知
	//	$(document).on("click", ".has_send_msg td .tableFirstRows .detail", function() {
	//		$("#boxPock").show();
	//		$("#boxPock .send_add").show();
	//	})
	$(document).on("click", ".send_add .send_add_head i,.send_add .btn2", function() {
		$("#boxPock").hide();
		$("#boxPock .send_add").hide();
		$(".cnt_reply .reply_ul").html("");
	})
	//新建任务
	$(document).on("click", ".has_send_task td .tableFirstRows .detail", function() {
		$("#boxPock").show();
		$("#boxPock .newbuild_detail").show();
	})
	$(document).on("click", ".newbuild_detail .newbuild_detail_head i,.newbuild_detail .btn2", function() {
		$("#boxPock").hide();
		$("#boxPock .newbuild_detail").hide();
	})

	//数据调取==============
	delAjax(5, 1)
	//点击搜索获取
	$(".has_send_msg .search").on("click", function() {
		var time1 = $("#notice_three").val();
		var time2 = $("#notice_four").val();
		var time = time1 + ',' + time2;
		delAjax(5, 1, time);
	})

	function delAjax(size, p, time) {
		$.ajax({
			type: "get",
			url: "/Admin/system/notice",
			dataType: 'json',
			data: {
				size: size,
				p: p,
				intverl: time,
			},
			success: function(data) {
				$(".box .n_third tbody").remove();
				var datas = data.data;
				var tbody1 = "";
				//进行中
				function tbodyOne(datas) {
					$(".box .n_third .page_left span").text(data.count);
					$(".box .n_third .page_right .total_num").text(data.page);
					for(var i = 0; i < datas.length; i++) {
						tbody1 += '<tr>';
						tbody1 += '<td class = "choose"><span><img src="/Public/Home/images/backstage_checkbox_orange.png" alt="" /></span></td >';
						tbody1 += '<td>' + datas[i].id + '</td> ';
						tbody1 += '<td>' + datas[i].type + '</td>';
						tbody1 += '<td>' + datas[i].title + '</td>';
						tbody1 += '<td>' + datas[i].project + '</td>';
						tbody1 += '<td>' + datas[i].from + '</td>';
						tbody1 += '<td>' + datas[i].receivers + '</td>';
						tbody1 += '<td>' + datas[i].time + '</td>';
						tbody1 += '<td data-num="' + datas[i].id + '">';
						tbody1 += '<div class="tableFirstRows">';
						tbody1 += '<div data-num="1">';
						tbody1 += '<a href="###" class="detail">详情</a>';
						tbody1 += '</div>';
						tbody1 += '<div data-num="2" class="del">';
						tbody1 += '<a href="###">删除</a>';
						tbody1 += '</div>';
						tbody1 += '</div>';
						tbody1 += '</td>';
						tbody1 += '</tr>';
						tbody1 += '</tr>';
					}
					return tbody1;
				}
				tbodyOne(datas);
				$(".box .n_third table").append(tbody1);
				$(".box .n_third tbody tr:odd").addClass("tableTrBackground");
			},
			error: function(data) {},
			async: true
		});
	}

	//通知右边点击获取
	$(".box .n_third  .paging .page_right .more").on("click", function() {
		var moreNum = $(".box .n_third .paging .page_right .total_num").text();
		var lessNum = $(".box .n_third .paging .page_right .number").text();
		if(moreNum <= lessNum) {
			toast("已经是最后一页了");
		} else {
			lessNum++;
			$(".box .n_third .page_right .number").text(lessNum);
			var size = $(".box .n_third .pagenum input").val();
			var time1 = $("#notice_three").val();
			var time2 = $("#notice_four").val();
			var time = time1 + ',' + time2;
			delAjax(size, lessNum, time);
		}
	})
	//通知左边点击获取
	$(".box .n_third  .paging .page_right .less").on("click", function() {
		var moreNum = $(".box .n_third .paging .page_right .total_num").text();
		var lessNum = $(".box .n_third .paging .page_right .number").text();
		if(lessNum == 1) {
			toast("已经是第一页了");
		} else {
			lessNum--;
			$(".box .n_third .page_right .number").text(lessNum);
			var size = $(".box .n_third .pagenum input").val();
			var time1 = $("#notice_three").val();
			var time2 = $("#notice_four").val();
			var time = time1 + ',' + time2;
			delAjax(size, lessNum, time);
		}
	})
	//通知页面点击获取
	$(".box .n_third .paging select").on("change", function() {
		var size = $(".box .n_third .pagenum input").val();
		var time1 = $("#notice_three").val();
		var time2 = $("#notice_four").val();
		var time = time1 + ',' + time2;
		delAjax(size, 1, time);
	})

	//已发任务
	taskAjax(5, 1)
	//点击搜索获取
	$(".has_send_task .search").on("click", function() {
		var time1 = $("#notice_one").val();
		var time2 = $("#notice_two").val();
		var time = time1 + ',' + time2;
		taskAjax(5, 1, time);
	})

	function taskAjax(size, p, time) {
		$.ajax({
			type: "get",
			url: "/Admin/system/task",
			dataType: 'json',
			data: {
				size: size,
				p: p,
				intverl: time,
			},
			success: function(data) {
				$(".has_send_task .n_forth tbody").remove();
				var datas = data.data;
				var tbody1 = "";
				//进行中
				function tbodyOne(datas) {
					$(".has_send_task .n_forth .page_left span").text(data.count);
					$(".has_send_task .n_forth .page_right .total_num").text(data.page);
					for(var i = 0; i < datas.length; i++) {
						tbody1 += '<tr>';
						tbody1 += '<td class = "choose"><span><img src="/Public/Home/images/backstage_checkbox_orange.png" alt="" /></span></td >';
						tbody1 += '<td>' + datas[i].id + '</td> ';
						tbody1 += '<td>' + datas[i].from + '</td>';
						tbody1 += '<td>' + datas[i].beginning_time + '</td>';
						tbody1 += '<td>' + datas[i].type + '</td>';
						tbody1 += '<td>' + datas[i].title + '</td>';
						tbody1 += '<td>' + datas[i].receivers + '</td>';
						tbody1 += '<td data-num="' + datas[i].id + '">';
						tbody1 += '<div class="tableFirstRows">';
						tbody1 += '<div data-num="1">';
						tbody1 += '<a href="###" class="detail">详情</a>';
						tbody1 += '</div>';
						tbody1 += '<div data-num="2">';
						tbody1 += '<a href="###" class="del">删除</a>';
						tbody1 += '</div>';
						tbody1 += '</div>';
						tbody1 += '</td>';
						tbody1 += '</tr>';
						tbody1 += '</tr>';
					}
					return tbody1;
				}
				tbodyOne(datas);
				$(".has_send_task .n_forth table").append(tbody1);
				$(".has_send_task .n_forth tbody tr:odd").addClass("tableTrBackground");
			},
			error: function(data) {},
			async: true
		});
	}

	//任务右边点击获取
	$(".has_send_task .n_forth  .paging .page_right .more").on("click", function() {
		var moreNum = $(".has_send_task .n_forth .paging .page_right .total_num").text();
		var lessNum = $(".has_send_task .n_forth .paging .page_right .number").text();
		if(moreNum <= lessNum) {
			toast("已经是最后一页了");
		} else {
			lessNum++;
			$(".has_send_task .n_forth .page_right .number").text(lessNum);
			var size = $(".has_send_task .n_forth .pagenum input").val();
			var time1 = $("#notice_one").val();
			var time2 = $("#notice_two").val();
			var time = time1 + ',' + time2;
			taskAjax(size, lessNum, time);
		}
	})
	//任务左边点击获取
	$(".has_send_task .n_forth  .paging .page_right .less").on("click", function() {
		var moreNum = $(".has_send_task .n_forth .paging .page_right .total_num").text();
		var lessNum = $(".has_send_task .n_forth .paging .page_right .number").text();
		if(lessNum == 1) {
			toast("已经是第一页了");
		} else {
			lessNum--;
			$(".has_send_task .n_forth .page_right .number").text(lessNum);
			var size = $(".has_send_task .n_forth .pagenum input").val();
			var time1 = $("#notice_one").val();
			var time2 = $("#notice_two").val();
			var time = time1 + ',' + time2;
			taskAjax(size, lessNum, time);
		}
	})
	//任务页面点击获取
	$(".has_send_task .n_forth .paging select").on("change", function() {
		console.log(123)
		var size = $(this).siblings("input").val();
		var size = $(".has_send_task .n_forth .pagenum input").val();
		var time1 = $("#notice_one").val();
		var time2 = $("#notice_two").val();
		var time = time1 + ',' + time2;
		taskAjax(size, 1, time);
	})

	//通知详情========
	var status;
	$(document).on("click", ".has_send_msg tbody tr td .detail", function() {
		var id = $(this).parents("tr").find("td").eq(1).text();
		status = "";
		$.ajax({
			type: "get",
			url: "/Admin/System/noticeInfo",
			dataType: 'json',
			data: {
				id: id,
			},
			success: function(data) {
				console.log(data);
				$(".send_add_bottom .style").val(data.data.type);
				$(".send_add_bottom .aboutitem").val(data.data.project);
				$(".send_add_bottom .title").val(data.data.title);
				$(".send_add_bottom .group").val(data.data.receivers);
				if(data.data.attachment_raw_name == null) {
					$(".send_add_bottom .choose_file").text("没有文件");
				} else {
					$(".send_add_bottom .choose_file").text(data.data.attachment_raw_name);
				}
				$(".send_add_bottom textarea").val(data.data.content);
				//状态添加
				for(var i = 0; i < data.data.comment.length; i++) {
					status += '<li class="clearfix">';
					status += '<div class="cnt_detail">';
					status += '<span>' + data.data.comment[i].name + '：</span><span>' + data.data.comment[i].content + '</span>';
					status += '</div>';
					status += '<div class="time">' + data.data.comment[i].add_time + '</div>';
					status += '</li>';
				}
				$(".has_send_msg .cnt_reply .reply_ul").append(status);
				$("#boxPock").show();
				$("#boxPock .send_add").show();
			},
			error: function(data) {},
			async: true
		});
	})
	//任务通知删除
	var msg_id;
	var addThis;
	var flag;
	$(document).on("click", ".has_send_msg tbody tr td .del", function() {
		msg_id = $(this).parents("tr").find("td").eq(1).text();
		console.log(msg_id)
		$("#boxPock").show();
		$("#boxPock .del").show();
		addThis = $(this);
		flag = 1;
	})
	$(document).on("click", ".del .btn1", function() {
		if(flag == 1) {
			$.ajax({
				type: "post",
				url: "/Admin/System/dele",
				dataType: 'json',
				data: {
					id: msg_id,
				},
				success: function(data) {
					console.log(data.status)
					if(data.status == 1) {
						location.reload();
					}
					if(data.status == 2) {
						$("#boxPock").hide();
						$("#boxPock .del").hide();
						toast("删除失败")
					}
				},
				error: function(data) {},
				async: true
			});
		}
	})
	$(document).on("click", ".del .del_head i,.del .btn2", function() {
		$("#boxPock").hide();
		$("#boxPock .del").hide();
	})

	//任务详情==========
	$(document).on("click", ".has_send_task tbody tr td .detail", function() {
		var id = $(this).parents("tr").find("td").eq(1).text();
		status = "";
		$.ajax({
			type: "get",
			url: "/Admin/System/taskInfo",
			dataType: 'json',
			data: {
				id: id,
			},
			success: function(data) {
				console.log(data);
				$(".newbuild_detail .style").val(data.type);
				$(".newbuild_detail .aboutitem").val(data.project);
				$(".newbuild_detail .title").val(data.title);
				$(".newbuild_detail .group").val(data.receivers);
				$(".newbuild_detail .addtime").val(data.beginning_time);
				if(data.attachment_raw_name == null) {
					$(".newbuild_detail .choose_file").text("没有文件");
				} else {
					$(".newbuild_detail .choose_file").text(data.attachment_raw_name);
				}
				$(".newbuild_detail textarea").val(data.content);
				//状态添加
				for(var i = 0; i < data.comment.length; i++) {
					status += '<li class="clearfix">';
					status += '<div class="cnt_detail">';
					status += '<span>' + data.comment[i].name + '：</span><span>' + data.data.comment[i].content + '</span>';
					status += '</div>';
					status += '<div class="time">' + data.comment[i].add_time + '</div>';
					status += '</li>';
				}
				console.log(status)
				$(".newbuild_detail .cnt_reply .reply_ul").append(status);
				$("#boxPock").show();
				$("#boxPock .newbuild_detail").show();
			},
			error: function(data) {},
			async: true
		});
	})

//	//任务详情删除
//	$(document).on("click", ".has_send_task tbody tr td .del", function() {
//		flag = 2;
//		msg_id = $(this).parents("tr").find("td").eq(1).text();
//		console.log(msg_id)
//		$("#boxPock").show();
//		$("#boxPock .del").show();
//		addThis = $(this);
//	})
//	$(document).on("click", ".del .btn1", function() {
//		console.log(flag)
//		if(flag == 2) {
//			$.ajax({
//				type: "post",
//				url: "/Admin/System/dele",
//				dataType: 'json',
//				data: {
//					id: msg_id,
//				},
//				success: function(data) {
//					console.log(data)
//					if(data.status == 1) {
//						addThis.parents("tr").remove();
//						$("#boxPock").hide();
//						$("#boxPock .del").hide();
//						$(".has_send_task tbody tr").removeClass("tableTrBackground");
//						$(".has_send_task tbody tr:even").addClass("tableTrBackground");
//					}
//					if(data.status == 2) {
//						$("#boxPock").hide();
//						$("#boxPock .del").hide();
//						toast("删除失败")
//					}
//				},
//				error: function(data) {},
//				async: true
//			});
//		}
//	})
//	$(document).on("click", ".del .del_head i,.del .btn2", function() {
//		$("#boxPock").hide();
//		$("#boxPock .del").hide();
//	})
})