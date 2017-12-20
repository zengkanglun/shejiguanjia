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
	$(document).on("click",".perf_content table .handle span", function() {
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

	//发送请求
	var host_host_host = "";
	//进入时获取
	ajax(5, 1);
	//时间搜索时获取
	time();

	function time() {
		$(".item_content .search").on("click", function() {
			var time1 = $("#one").val();
			var time2 = $("#two").val();
			var time = time1 + ',' + time2;
			ajax(5, 1, time);
		})
	}

	function ajax(size, p, time) {
		$.ajax({
			type: "get",
			url: "/Home/All/index",
			dataType: 'json',
			data: {
				size: size,
				p: p,
				intverl: time,
			},
			success: function(data) {
				var datas = data.doing.data;
				var dataDone = data.done.data;
				var dataNew = data.new.data;
				$(".item_content .list_detail tbody tr").remove();
				var tbody1, tbody2, tbody3 = "";
				//进行中
				function tbodyOne(dataone) {
					$(".item_content .list_detail:nth(0) .paging .page_left span").text(data.doing.count);
					$(".item_content .list_detail:nth(0) .paging .page_right .total_num").text(data.doing.page);
					for(var i = 0; i < datas.length; i++) {
						tbody1 += '<tr><td>' + dataone[i].id + '</td><td>' + dataone[i].name + '</td><td>' + dataone[i].architecture_name + '</td><td>' + dataone[i].area + '</td><td>' + dataone[i].build_unit + '</td><td>' + dataone[i].manager_name + '</td><td>' + dataone[i].name + '</td><td class="handle"><span class="edit" data_id="' + dataone[i].id + '"><a href="/Home/Index/edit/id/'+ dataone[i].id +'">编辑</a></span><span class="check" data_id="' + dataone[i].id + '"><a href="/Home/Index/index/id/'+ dataone[i].id +'">查看</a></span></td></tr>';
					}
//					return tbody1;
				}
				tbodyOne(datas);
				$(".item_content .list_detail:nth(0) table tbody").append(tbody1);
				//已完成
				function tbodyTwo(dataone) {
					$(".item_content .list_detail:nth(1) .paging .page_left span").text(data.done.count);
					$(".item_content .list_detail:nth(1) .paging .page_right .total_num").text(data.done.page);
					for(var i = 0; i < dataDone.length; i++) {
						tbody2 += '<tbody><tr><td>' + dataone[i].id + '</td><td>' + dataone[i].name + '</td><td>' + dataone[i].architecture_name + '</td><td>' + dataone[i].area + '</td><td>' + dataone[i].build_unit + '</td><td>' + dataone[i].manager_name + '</td><td>' + dataone[i].name + '</td><td class="handle"><span class="edit" data_id="' + dataone[i].id + '"><a href="/Home/Index/edit/id/'+ dataone[i].id +'">编辑</a></span><span class="check" data_id="' + dataone[i].id + '"><a href="/Home/Index/index/id/'+ dataone[i].id +'">查看</a></span></td></tr></tbody>';
					}
					return tbody2;
				}
				tbodyTwo(dataDone);
				$(".item_content .list_detail:nth(1) table").append(tbody2);
				//未实施
				function tbodyThree(dataone) {
					$(".item_content .list_detail:nth(2) .paging .page_left span").text(data.new.count);
					$(".item_content .list_detail:nth(2) .paging .page_right .total_num").text(data.new.page);
					for(var i = 0; i < dataNew.length; i++) {
						tbody3 += '<tbody><tr><td>' + dataNew[i].id + '</td><td>' + dataNew[i].name + '</td><td>' + dataNew[i].architecture_name + '</td><td>' + dataNew[i].area + '</td><td>' + dataNew[i].build_unit + '</td><td>' + dataNew[i].manager_name + '</td><td>' + dataNew[i].name + '</td><td class="handle"><span class="edit" data_id="' + dataNew[i].id + '"><a href="/Home/Index/edit/id/'+ dataone[i].id +'">编辑</a></span><span class="check" data_id="' + dataNew[i].id + '"><a href="/Home/Index/index/id/'+ dataone[i].id +'">查看</a></span></td></tr></tbody>';
					}
					return tbody3;
				}
				tbodyThree(dataNew);
				$(".item_content .list_detail:nth(2) table").append(tbody3);
			},
			error: function(data) {},
			async: true
		});
	}

	//右边点击获取
	$(".item_content .list_detail:nth(0) .paging .page_right .more").on("click", function() {
		var moreNum = $(".item_content .list_detail:nth(0) .paging .page_right .total_num").text();
		var lessNum = $(".item_content .list_detail:nth(0) .paging .page_right .number").text();
		if(moreNum <= lessNum) {
			toast("已经是最后一页了");
		} else {
			lessNum++;
			$(".item_content .list_detail:nth(0) .paging .page_right .number").text(lessNum);
			var time1 = $("#one").val();
			var time2 = $("#two").val();
			var time = time1 + ',' + time2;
			var size = $(".item_content .list_detail:nth(0) .pagenum input").val();
			console.log(time1, time2, size, lessNum);
			doingAjax(size, lessNum, time);
		}
	})
	//左边点击获取
	$(".item_content .list_detail:nth(0) .paging .page_right .less").on("click", function() {
		var moreNum = $(".item_content .list_detail:nth(0) .paging .page_right .total_num").text();
		var lessNum = $(".item_content .list_detail:nth(0) .paging .page_right .number").text();
		if(lessNum == 1) {
			toast("已经是第一页了");
		} else {
			lessNum--;
			$(".item_content .list_detail:nth(0) .paging .page_right .number").text(lessNum);
			var time1 = $("#one").val();
			var time2 = $("#two").val();
			var time = time1 + ',' + time2;
			var size = $(".item_content .list_detail:nth(0) .pagenum input").val();
			doingAjax(size, lessNum, time);
		}
	})
	//页数点击时获取
	pageChange();

	function pageChange() {
		$(".item_content .list_detail:nth(0) select").on("change", function() {
			var size = $(this).siblings("input").val();
			console.log(size)
			var time1 = $("#one").val();
			var time2 = $("#two").val();
			var time = time1 + ',' + time2;
			doingAjax(size, 1, time);
		})
	}

	//任务进行中的回调
	function doingAjax(size, p, time) {
		$.ajax({
			type: "get",
			url: "/Home/All/index",
			dataType: 'json',
			data: {
				size: size,
				p: p,
				intverl: time,
			},
			success: function(data) {
				$(".item_content .list_detail:nth(0) tbody").remove();
				if(data.doing.data.length == 0) {
					toast("没有数据了")
				} else {
					var datas = data.doing.data;
					var tbody1, tbody2, tbody3 = "";
					//进行中
					function tbodyOne(dataone) {
						$(".item_content .list_detail:nth(0) .paging .page_left span").text(data.doing.count);
						$(".item_content .list_detail:nth(0) .paging .page_right .total_num").text(5);
						for(var i = 0; i < datas.length; i++) {
							tbody1 += '<tbody><tr><td>' + dataone[i].id + '</td><td>' + dataone[i].name + '</td><td>' + dataone[i].architecture_name + '</td><td>' + dataone[i].area + '</td><td>' + dataone[i].build_unit + '</td><td>' + dataone[i].manager_name + '</td><td>' + dataone[i].name + '</td><td class="handle"><span class="edit" data_id="' + dataone[i].id + '"><a href="#">编辑</a></span><span class="check" data_id="' + dataone[i].id + '"><a href="#">查看</a></span></td></tr></tbody>';
						}
						return tbody1;
					}
					tbodyOne(datas);
					$(".item_content .list_detail:nth(0) table").append(tbody1);
				}

			},
			error: function(data) {},
			async: true
		});
	}
	//任务未实施下面的数据
	//右边点击获取
	$(".item_content .list_detail:nth(2) .paging .page_right .more").on("click", function() {
		var moreNum = $(".item_content .list_detail:nth(2) .paging .page_right .total_num").text();
		var lessNum = $(".item_content .list_detail:nth(2) .paging .page_right .number").text();
		if(moreNum <= lessNum) {
			toast("已经是最后一页了");
		} else {
			lessNum++;
			$(".item_content .list_detail:nth(2) .paging .page_right .number").text(lessNum);
			var time1 = $("#one").val();
			var time2 = $("#two").val();
			var time = time1 + ',' + time2;
			var size = $(".item_content .list_detail:nth(2) .pagenum input").val();
			console.log(time1, time2, size, lessNum);
			doneAjax(size, lessNum, time);
		}
	})
	//左边点击获取
	$(".item_content .list_detail:nth(2) .paging .page_right .less").on("click", function() {
		var moreNum = $(".item_content .list_detail:nth(2) .paging .page_right .total_num").text();
		var lessNum = $(".item_content .list_detail:nth(2) .paging .page_right .number").text();
		if(lessNum == 1) {
			toast("已经是第一页了");
		} else {
			lessNum--;
			$(".item_content .list_detail:nth(2) .paging .page_right .number").text(lessNum);
			var time1 = $("#one").val();
			var time2 = $("#two").val();
			var time = time1 + ',' + time2;
			var size = $(".item_content .list_detail:nth(2) .pagenum input").val();
			doneAjax(size, lessNum, time);
		}
	})
	//页数点击时获取
	$(".item_content .list_detail:nth(2) select").on("change", function() {
		var size = $(this).siblings("input").val();
		console.log(size)
		var time1 = $("#one").val();
		var time2 = $("#two").val();
		var time = time1 + ',' + time2;
		doneAjax(size, 1, time);
	})
	//任务已完成的回调
	function doneAjax(size, p, time) {
		$.ajax({
			type: "get",
			url: "/Home/All/index",
			dataType: 'json',
			data: {
				size: size,
				p: p,
				intverl: time,
			},
			success: function(data) {
				$(".item_content .list_detail:nth(1) tbody").remove();
				if(data.done.data.length == 0) {
					toast("没有数据了")
				} else {
					var dataDone = data.done.data;
					var tbody1, tbody2, tbody3 = "";
					//进行中
					//已完成
					function tbodyTwo(dataone) {
						$(".item_content .list_detail:nth(1) .paging .page_left span").text(data.done.count);
						$(".item_content .list_detail:nth(1) .paging .page_right .total_num").text(data.done.page);
						for(var i = 0; i < dataDone.length; i++) {
							tbody2 += '<tbody><tr><td>' + dataone[i].id + '</td><td>' + dataone[i].name + '</td><td>' + dataone[i].architecture_name + '</td><td>' + dataone[i].area + '</td><td>' + dataone[i].build_unit + '</td><td>' + dataone[i].manager_name + '</td><td>' + dataone[i].name + '</td><td class="handle"><span class="edit" data_id="' + dataone[i].id + '"><a href="#">编辑</a></span><span class="check" data_id="' + dataone[i].id + '"><a href="#">查看</a></span></td></tr></tbody>';
						}
						return tbody2;
					}
					tbodyTwo(dataDone);
					$(".item_content .list_detail:nth(1) table").append(tbody2);
				}
			},
			error: function(data) {},
			async: true
		});
	}
	//任务已完成下面的数据
	//右边点击获取
	$(".item_content .list_detail:nth(1) .paging .page_right .more").on("click", function() {
		var moreNum = $(".item_content .list_detail:nth(1) .paging .page_right .total_num").text();
		var lessNum = $(".item_content .list_detail:nth(1) .paging .page_right .number").text();
		if(moreNum <= lessNum) {
			toast("已经是最后一页了");
		} else {
			lessNum++;
			$(".item_content .list_detail:nth(1) .paging .page_right .number").text(lessNum);
			var time1 = $("time1,time2#one").val();
			var time2 = $("#two").val();
			var time = time1 + ',' + time2;
			var size = $(".item_content .list_detail:nth(1) .pagenum input").val();
			console.log(time1, time2, size, lessNum);
			doneAjax(size, lessNum, time);
		}
	})
	//左边点击获取
	$(".item_content .list_detail:nth(1) .paging .page_right .less").on("click", function() {
		var moreNum = $(".item_content .list_detail:nth(1) .paging .page_right .total_num").text();
		var lessNum = $(".item_content .list_detail:nth(1) .paging .page_right .number").text();
		if(lessNum == 1) {
			toast("已经是第一页了");
		} else {
			lessNum--;
			$(".item_content .list_detail:nth(1) .paging .page_right .number").text(lessNum);
			var time1 = $("#one").val();
			var time2 = $("#two").val();
			var time = time1 + ',' + time2;
			var size = $(".item_content .list_detail:nth(1) .pagenum input").val();
			doneAjax(size, lessNum, time);
		}
	})
	//页数点击时获取
	$(".item_content .list_detail:nth(2) select").on("change", function() {
		var size = $(this).siblings("input").val();
		console.log(size)
		var time1 = $("#one").val();
		var time2 = $("#two").val();
		var time = time1 + ',' + time2;
		doneAjax(size, 1, time);
	})
	//未实施的回调
	function newAjax(size, p, time) {
		$.ajax({
			type: "get",
			url: "/Home/All/index",
			dataType: 'json',
			data: {
				size: size,
				p: p,
				intverl: time,
			},
			success: function(data) {
				$(".item_content .list_detail:nth(2) tbody").remove();
				if(data.new.data.length == 0) {
					toast("没有数据了")
				} else {
					var dataNew = data.new.data;
					var tbody1, tbody2, tbody3 = "";
					//未实施
					function tbodyThree(dataone) {
						$(".item_content .list_detail:nth(2) .paging .page_left span").text(data.new.count);
						$(".item_content .list_detail:nth(2) .paging .page_right .total_num").text(data.new.page);
						for(var i = 0; i < dataNew.length; i++) {
							tbody3 += '<tbody><tr><td>' + dataNew[i].id + '</td><td>' + dataNew[i].name + '</td><td>' + dataNew[i].architecture_name + '</td><td>' + dataNew[i].area + '</td><td>' + dataNew[i].build_unit + '</td><td>' + dataNew[i].manager_name + '</td><td>' + dataNew[i].name + '</td><td class="handle"><span class="edit" data_id="' + dataNew[i].id + '"><a href="#">编辑</a></span><span class="check" data_id="' + dataNew[i].id + '"><a href="#">查看</a></span></td></tr></tbody>';
						}
						return tbody3;
					}
					tbodyThree(dataNew);
					$(".item_content .list_detail:nth(2) table").append(tbody3);
				}
			},
			error: function(data) {},
			async: true
		});
	}
	//员工任务数据回调
	$(".tab .tab_left li").eq(1).on("click", function() {
		taskAjax(5, 1);
	})
	//时间搜索时获取
	taskTime();

	function taskTime() {
		$(".staff_content .search").on("click", function() {
			var time1 = $("#three").val();
			var time2 = $("#four").val();
			var time = time1 + ',' + time2;
			taskAjax(5, 1, time);
		})
	}
	//右边点击获取
	$(".staff_content  .paging .page_right .more").on("click", function() {
		var moreNum = $(".staff_content .paging .page_right .total_num").text();
		var lessNum = $(".staff_content .paging .page_right .number").text();
		console.log(moreNum, lessNum)
		if(moreNum <= lessNum) {
			toast("已经是最后一页了");
		} else {
			lessNum++;
			$(".staff_content .paging .page_right .number").text(lessNum);
			var time1 = $("#three").val();
			var time2 = $("#four").val();
			var time = time1 + ',' + time2;
			var size = $(".staff_content .pagenum input").val();
			console.log(time1, time2, size, lessNum);
			taskAjax(size, lessNum, time);
		}
	})
	//左边点击获取
	$(".staff_content  .paging .page_right .less").on("click", function() {
		var moreNum = $(".staff_content .paging .page_right .total_num").text();
		var lessNum = $(".staff_content .paging .page_right .number").text();
		if(lessNum == 1) {
			toast("已经是第一页了");
		} else {
			lessNum--;
			$(".staff_content .paging .page_right .number").text(lessNum);
			var time1 = $("#three").val();
			var time2 = $("#four").val();
			var time = time1 + ',' + time2;
			var size = $(".staff_content .pagenum input").val();
			taskAjax(size, lessNum, time);
		}
	})
	//页数点击时获取
	$(".staff_content .list_detail select").on("change", function() {
		var size = $(this).siblings("input").val();
		var time1 = $("#three").val();
		var time2 = $("#four").val();
		var time = time1 + ',' + time2;
		console.log(size, time1, time2)
		taskAjax(size, 1, time);
	})
	//员工任务
	function taskAjax(size, p, time) {
		$.ajax({
			type: "get",
			url: "/Home/All/staffTasks",
			dataType: 'json',
			data: {
				size: size,
				p: p,
				intverl: time,
			},
			success: function(data) {
				var datas = data.data;
				$(".staff_content .list_detail tbody").remove();
				var tbody1 = "";
				//进行中
				function tbodyOne(datas) {
					$(".staff_content .paging .page_left span").text(data.count);
					$(".staff_content .paging .page_right .total_num").text(data.page);
					for(var i = 0; i < datas.length; i++) {
						tbody1 += '<tbody><tr><td>' + datas[i].staff_id + '</td><td>' + datas[i].real_name + '</td><td>' + datas[i].own.title + '</td><td>' + datas[i].new.title + '</td><td>' + datas[i].underway.title + '</td><td class="handle"><span class="check" data_id = "' + datas[i].staff_id + '"><a href="/Home/Task/index/id/'+ datas[i].staff_id +'">详情</a></span></td></tr></tbody>';
					}
					return tbody1;
				}
				tbodyOne(datas);
				$(".staff_content .list_detail table").append(tbody1);
				$(".staff_content tbody td").each(function() {
					var txt = $(this).text();
					if(txt == "undefined") {
						$(this).text(" ");
					}
				})
			},
			error: function(data) {},
			async: true
		});
	}

	//人才绩效==========
	//项目计提================
	perfAjax(5, 1);
	//时间
	$(document).on("click", ".perf_content .perf_time .search", function() {
		var time1 = $("#five").val();
		var time2 = $("#six").val();
		var time = time1 + ',' + time2;
		perfAjax(5, 1, time);
	})
	//右边点击获取
	$(".perf_content .paging .page_right .more").on("click", function() {
		var moreNum = $(".perf_content .paging .page_right .total_num").text();
		var lessNum = $(".perf_content .paging .page_right .number").text();
		console.log(moreNum, lessNum)
		if(moreNum <= lessNum) {
			toast("已经是最后一页了");
		} else {
			lessNum++;
			$(".perf_content .paging .page_right .number").text(lessNum);
			var time1 = $("#five").val();
			var time2 = $("#six").val();
			var time = time1 + ',' + time2;
			var size = $(".perf_content .pagenum input").val();
			perfAjax(size, lessNum, time);
		}
	})
	//左边点击获取
	$(".perf_content  .paging .page_right .less").on("click", function() {
		var moreNum = $(".perf_content .paging .page_right .total_num").text();
		var lessNum = $(".perf_content .paging .page_right .number").text();
		if(lessNum == 1) {
			toast("已经是第一页了");
		} else {
			lessNum--;
			$(".perf_content .paging .page_right .number").text(lessNum);
			var time1 = $("#five").val();
			var time2 = $("#six").val();
			var time = time1 + ',' + time2;
			var size = $(".perf_content .pagenum input").val();
			countAjax(size, lessNum, time);
		}
	})
	//页数点击时获取
	$(".perf_content select").on("change", function() {
		var size = $(this).siblings("input").val();
		var time1 = $("#count_one").val();
		var time2 = $("#count_two").val();
		var time = time1 + ',' + time2;
		perfAjax(size, 1, time);
	})

	function perfAjax(size, p, time) {
		$.ajax({
			type: "get",
			url: "/Api/Statistics/works",
			dataType: 'json',
			data: {
				size: size,
				p: p,
				intverl: time,
			},
			success: function(data) {
				console.log(data,data.data.count)
				$(".perf_content tbody tr").remove();
				var datas = data.data.info;
				var tbody1 = "";
				//进行中
				function tbodyOne(datas) {
					$(".perf_content .paging .page_left span").text(data.data.count);
					$(".perf_content .paging .page_right .total_num").text(data.data.page);
					for(var i = 0; i < datas.length; i++) {
						tbody1 += '<tr>';
						tbody1 += '<td>' + datas[i].id + '</td>';
						tbody1 += '<td>' + datas[i].real_name + '</td>';
						tbody1 += '<td>' + datas[i].name + '</td>';
						tbody1 += '<td>' + datas[i].content + '</td>';
						tbody1 += '<td>' + datas[i].mymoney + '</td>';
						tbody1 += '<td>' + datas[i].create_time + '</td>';
						tbody1 += '<td class="handle"><span class="check" data-id="' + datas[i].id + '">详情</span></td>';
						tbody1 += '</tr>';
					}
					return tbody1;
				}
				tbodyOne(datas);
				$(".perf_content tbody").append(tbody1);
				$(".perf_content tbody tr:odd").addClass("e9ecf1");
			},
			error: function(data) {},
			async: true
		});
	}
})