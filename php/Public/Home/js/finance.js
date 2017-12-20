$(function() {
	// 项目支出增加
	$(document).on('click', '.new_record .item_footer .btn1', function() {
		var form_data = new FormData($('#new_record')[0]);
		var pid = sessionStorage.getItem('finance_project_overhead_id');
		form_data.append("pid", pid);
		if(!pid) {
			return false;
		}
		$.ajax({
			url: '/Api/Finance/add_overhead_record',
			type: 'POST',
			data: form_data,
			async: false,
			cache: false,
			contentType: false,
			processData: false,
			success: function(returndata) {
				if(returndata.status) {
					layer.msg('添加成功');
					// location.reload();
				} else {
					layer.msg(returndata.msg);
					// location.reload();
				}
			},
			error: function(returndata) {
				// alert(returndata);
			}
		});

	});
	$(".tab .tab_left li").on("click", function() {
		$(this).addClass("active").siblings().removeClass("active")
	})
	$(".tab .tab_left li").eq(0).on("click", function() {
		$(".content_detail .item_finance").hide();
		$(".content_detail .item_income").show();
	})
	$(".tab .tab_left li").eq(1).on("click", function() {
		$(".content_detail .item_finance").hide();
		$(".content_detail .program_expend").show();
	})
	$(".tab .tab_left li").eq(2).on("click", function() {
		$(".content_detail .item_finance").hide();
		$(".content_detail .item_count").show();
	})
	$(".tab .tab_left li").eq(3).on("click", function() {
		$(".content_detail .item_finance").hide();
		$(".content_detail .staff_content").show();
	})
	$(".tab .tab_left li").eq(4).on("click", function() {
		$(".content_detail .item_finance").hide();
		$(".content_detail .item_content").show();
	})
	//	tab栏切换
	//select选中
	$("select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	})
	//行政支出查看
	$(document).on("click", ".staff_content table .handle .check", function() {
		var id = $(this).attr('data-id');
		if(!id) {
			return false;
		}
		$.get('/Api/Finance/admin_overhead_view', {
			"id": id
		}, function(data) {
			$('.expend_detail .job_logging input[name="by"]').val(data.by)
			$('.expend_detail .job_logging input[name="time"]').val(data.time)
			$('.expend_detail .job_logging input[name="type"]').val(data.type)
			$('.expend_detail .job_logging input[name="money"]').val(data.money)
			$('.expend_detail .job_logging textarea[name="content"]').val(data.content)
		});
		$("#boxPock").show();
		$("#boxPock .expend_detail").show();
	})
	$(document).on("click", "#boxPock .expend_detail .expend_detail_head i,#boxPock .expend_detail .btn2", function() {
		$("#boxPock").hide();
		$("#boxPock .expend_detail").hide();
	})
	//行政支出查看
	$(document).on("click", ".staff_content .staff_add", function() {
		$("#boxPock").show();
		$("#boxPock .expend_edit").show();
	})
	$(document).on("click", "#boxPock .expend_edit .expend_edit_head i,#boxPock .expend_edit .btn2,#boxPock .expend_edit .btn1", function() {
		$("#boxPock").hide();
		$("#boxPock .expend_edit").hide();
	})
	//添加收款记录
	$(document).on("click", ".item_edit .process .head_right", function() {
		$("#boxPock .item_edit").hide();
		$("#boxPock .pay_add").show()
	})
	$(document).on("click", ".pay_add .pay_add_head i,.pay_add .btn1,.pay_add .btn2", function() {
		$("#boxPock .item_edit").show();
		$("#boxPock .pay_add").hide()
	})
	//编辑收款记录
	$(document).on("click", ".item_edit tbody td .edit", function() {
		$("#boxPock .item_edit").hide();
		$("#boxPock .pay_edit").show();
		console.log(123)
	})
	$(document).on("click", ".pay_edit .pay_edit_head i,.pay_edit .btn1,.pay_edit .btn2", function() {
		$("#boxPock .item_edit").show();
		$("#boxPock .pay_edit").hide()
	})
	//项目支出查看
	$(document).on("click", ".program_expend tbody td .check", function() {
		var id = $(this).attr('data-id');
		if(!id) {
			return false;
		}
		sessionStorage.setItem('finance_project_overhead_id', id);
		$.get('/Api/Finance/project_overhead_view', {
			"id": id
		}, function(data) {

			$('.item_expend .item_expend_bottom input[name="project"]').val(data.project);
			$('.item_expend .item_expend_bottom input[name="time"]').val(data.time);
			$('.item_expend .item_expend_bottom input[name="stage"]').val(data.stage);
			$('.item_expend .item_expend_bottom input[name="totalled"]').val(data.totalled);

			var str = '';
			var leng = data.records.length;

			for(var i = 0; i < leng; i++) {
				str += '<tr><td>' + parseInt(i + 1) + '</td><td>' + data.records[i].type + '</td><td>' + data.records[i].time + '</td><td>' + data.records[i].content + '</td><td>' + data.records[i].by + '</td><td class="handle"><span data-id="' + data.records[i].id + '">编辑</span></td></tr>';
			}

			$('.item_expend .past_record .past_record_bottom tbody').append(str);
		});
		$("#boxPock").show();
		$("#boxPock .item_expend").show();
	})
	$(document).on("click", ".item_expend .item_expend_head i,.item_expend .btn1", function() {
		$('.item_expend .past_record .past_record_bottom tbody tr').remove();
		$("#boxPock").hide();
		$("#boxPock .item_expend").hide();
	})
	//项目支出编辑
	$(document).on("click", ".item_expend .past_record tbody td .edit", function() {
		$("#boxPock .item_expend").hide();
		$("#boxPock .expendEdit").show();
	})
	$(document).on("click", ".expendEdit .expendEdit_head i,.expendEdit .btn1,.expendEdit .btn2", function() {
		$("#boxPock .item_expend").show();
		$("#boxPock .expendEdit").hide();
	})
	//项目计提查看
	$(document).on("click", ".item_count tbody td .check", function() {
		$("#boxPock").show();
		$("#boxPock .countDetail").show();
	})
	$(document).on("click", ".countDetail .countDetail_head i,.countDetail .btn1,.countDetail .btn2", function() {
		$("#boxPock").hide();
		$("#boxPock .countDetail").hide();
	})
	//楼号切换
	$(document).on("click", ".countDetail .floor_ul li", function() {
		$(this).addClass("active").siblings().removeClass("active");
		var txt = $(this).find("a").text();
		$(".floor_right span").text(txt);
	})
	//方案详情
	$(document).on("click", ".countDetail tbody td .check", function() {
		$("#boxPock .countDetail").hide();
		$("#boxPock .item_plan").show();
	})
	$(document).on("click", ".item_plan .item_plan_head i,.item_plan .btn1,.item_plan .btn2,.item_plan .btn3", function() {
		$("#boxPock .countDetail").show();
		$("#boxPock .item_plan").hide();
	})
	//已提交方案详情
	$(document).on("click", ".item_plan tbody .detail", function() {
		$("#boxPock .item_plan").hide();
		$("#boxPock .worker_style").show();
	})
	//工种分工关闭
	$(document).on("click", ".worker_style .worker_style_head i,.worker_style .btn2", function() {
		$("#boxPock .item_plan").show();
		$("#boxPock .worker_style").hide();
	})
	//编辑项目计提
	$(document).on("click", ".countDetail table tbody .edit", function() {
		$("#boxPock .countDetail").hide();
		$("#boxPock .count_edit").show();
	})
	$(document).on("click", ".count_edit .count_edit_head i,.count_edit .btn1,.count_edit .btn2", function() {
		$("#boxPock .countDetail").show();
		$("#boxPock .count_edit").hide();
	})
	//项目组楼号切换
	$(document).on("click", ".count_floor .floor_cnt_ul li", function() {
		$(this).addClass("active").siblings().removeClass("active");
		var txt = $(this).find("a").text();
		$(".floor_top span").text(txt)
	})
	//成员管理
	$(document).on("click", ".countDetail_bottom .count_cnt .left .check", function() {
		$(".countDetail").hide();
		$(".count_floor").show();
	})
	$(document).on("click", ".count_floor .count_floor_head i,.count_floor .btn1,.count_floor .btn2", function() {
		$(".countDetail").show();
		$(".count_floor").hide();
	})

	//数据调取=====
	//行政支出的回调
	staffAjax(5, 1);
	$(".staff_content .search").on("click", function() {
		var time1 = $("#staffone").val();
		var time2 = $("#stafftwo").val();
		var time = time1 + ',' + time2;
		staffAjax(5, 1, time);
	})

	function staffAjax(size, p, time) {
		$.ajax({
			type: "get",
			url: "/Home/Finance/administrationExpenditure",
			dataType: 'json',
			data: {
				size: size,
				p: p,
				intverl: time,
			},
			success: function(data) {
				$(".staff_content .list_detail tbody tr").remove();
				var datas = data.data;
				var tbody1 = "";
				//进行中
				function tbodyOne(dataone) {
					$(".staff_content .list_detail .paging .page_left span").text(data.count);
					$(".staff_content .list_detail .paging .page_right .total_num").text(data.page);
					$(".staff_content .list_detail table tfoot tr td:nth(3)").text(data.total);
					for(var i = 0; i < datas.length; i++) {
						tbody1 += '<tr>';
						tbody1 += '<td>' + datas[i].id + '</td>';
						tbody1 += '<td>' + datas[i].type + '</td>';
						tbody1 += '<td>' + datas[i].content + '</td>';
						tbody1 += '<td>' + datas[i].money + '</td>';
						tbody1 += '<td>' + datas[i].time + '</td>';
						tbody1 += '<td class="handle"><span class="check" data-id="' + datas[i].id + '">查看</span></td>';
						tbody1 += '</tr>';
					}
					return tbody1;
				}
				tbodyOne(datas);
				$(".staff_content .list_detail table tbody").append(tbody1);
				$(".staff_content .list_detail table tbody tr:odd").addClass("e9ecf1");
			},
			error: function(data) {},
			async: true
		});
	}
	//右边点击获取
	$(".staff_content .paging .page_right .more").on("click", function() {
		var moreNum = $(".staff_content .paging .page_right .total_num").text();
		var lessNum = $(".staff_content .paging .page_right .number").text();
		console.log(moreNum, lessNum)
		if(moreNum <= lessNum) {
			toast("已经是最后一页了");
		} else {
			lessNum++;
			$(".staff_content .paging .page_right .number").text(lessNum);
			var time1 = $("#staffone").val();
			var time2 = $("#stafftwo").val();
			var time = time1 + ',' + time2;
			var size = $(".staff_content .pagenum input").val();
			console.log(time1, time2, size, lessNum);
			staffAjax(size, lessNum, time);
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
			var time1 = $("#staffone").val();
			var time2 = $("#stafftwo").val();
			var time = time1 + ',' + time2;
			var size = $(".staff_content .pagenum input").val();
			staffAjax(size, lessNum, time);
		}
	})
	//页数点击时获取
	$(".staff_content .list_detail select").on("change", function() {
		var size = $(this).siblings("input").val();
		var time1 = $("#staffone").val();
		var time2 = $("#stafftwo").val();
		var time = time1 + ',' + time2;
		console.log(size, time1, time2)
		staffAjax(size, 1, time);
	})

	//项目收入 
	incomeAjax(5, 1);
	finishAjax(5, 1);
	//时间
	$(document).on("click", ".item_income .item_time .search", function() {
		var time1 = $("#income_one").val();
		var time2 = $("#income_two").val();
		var time = time1 + ',' + time2;
		incomeAjax(5, 1, time);
		finishAjax(5, 1, time);
	})
	//右边点击获取
	$(".item_income .go_detail .paging .page_right .more").on("click", function() {
		var moreNum = $(".item_income .go_detail .paging .page_right .total_num").text();
		var lessNum = $(".item_income .go_detail .paging .page_right .number").text();
		console.log(moreNum, lessNum)
		if(moreNum <= lessNum) {
			toast("已经是最后一页了");
		} else {
			lessNum++;
			$(".item_income .go_detail .paging .page_right .number").text(lessNum);
			var time1 = $("#income_one").val();
			var time2 = $("#income_two").val();
			var time = time1 + ',' + time2;
			var size = $(".item_income .go_detail .pagenum input").val();
			incomeAjax(size, lessNum, time);
		}
	})
	//左边点击获取
	$(".item_income .go_detail  .paging .page_right .less").on("click", function() {
		var moreNum = $(".item_income .go_detail .paging .page_right .total_num").text();
		var lessNum = $(".item_income .go_detail .paging .page_right .number").text();
		if(lessNum == 1) {
			toast("已经是第一页了");
		} else {
			lessNum--;
			$(".item_income .go_detail .paging .page_right .number").text(lessNum);
			var time1 = $("#income_one").val();
			var time2 = $("#income_two").val();
			var time = time1 + ',' + time2;
			var size = $(".item_income .go_detail .pagenum input").val();
			incomeAjax(size, lessNum, time);
		}
	})
	//页数点击时获取
	$(".item_income .go_detail select").on("change", function() {
		var size = $(this).siblings("input").val();
		var time1 = $("#staffone").val();
		var time2 = $("#stafftwo").val();
		var time = time1 + ',' + time2;
		incomeAjax(size, 1, time);
	})

	function incomeAjax(size, p, time) {
		$.ajax({
			type: "get",
			url: "/Home/Finance/index",
			dataType: 'json',
			data: {
				size: size,
				p: p,
				intverl: time,
			},
			success: function(data) {
				$(".item_income .go_detail tbody tr").remove();
				var datas = data.data;
				var tbody1 = "";
				//进行中
				function tbodyOne(datas) {
					$(".item_income .go_detail .paging .page_left span").text(data.count);
					$(".item_income .go_detail .paging .page_right .total_num").text(data.page);
					//					$(".item_income .go_detail table tfoot tr td:nth(3)").text(data.total);
					for(var i = 0; i < datas.length; i++) {
						tbody1 += '<tr>';
						tbody1 += '<td>' + datas[i].id + '</td>';
						tbody1 += '<td class="item_name"><a href="javascirpt:void(0)">' + datas[i].name + '</a></td>';
						tbody1 += '<td>' + datas[i].gross + '</td>';
						tbody1 += '<td>' + datas[i].stage + '</td>';
						tbody1 += '<td>' + datas[i].income + '</td>';
						tbody1 += '<td>' + datas[i].uncollected + '</td>';
						tbody1 += '<td>' + datas[i].record + '</td>';
						tbody1 += '<td>' + datas[i].create_time + '</td>';
						tbody1 += '<td class="handle"><span class="check" data-id="' + datas[i].id + '">查看</span></td>';
						tbody1 += '</tr>';
					}
					return tbody1;
				}
				tbodyOne(datas);
				$(".item_income .go_detail tbody").append(tbody1);
				$(".item_income .go_detail tbody tr:odd").addClass("e9ecf1");
			},
			error: function(data) {},
			async: true
		});
	}

	//已完成获取======
	//右边点击获取
	$(".item_income .finish_detail .paging .page_right .more").on("click", function() {
		var moreNum = $(".item_income .finish_detail .paging .page_right .total_num").text();
		var lessNum = $(".item_income .finish_detail .paging .page_right .number").text();
		console.log(moreNum, lessNum)
		if(moreNum <= lessNum) {
			toast("已经是最后一页了");
		} else {
			lessNum++;
			$(".item_income .finish_detail .paging .page_right .number").text(lessNum);
			var time1 = $("#income_one").val();
			var time2 = $("#income_two").val();
			var time = time1 + ',' + time2;
			var size = $(".item_income .finish_detail .pagenum input").val();
			finishAjax(size, lessNum, time);
		}
	})
	//左边点击获取
	$(".item_income .finish_detail  .paging .page_right .less").on("click", function() {
		var moreNum = $(".item_income .finish_detail .paging .page_right .total_num").text();
		var lessNum = $(".item_income .finish_detail .paging .page_right .number").text();
		if(lessNum == 1) {
			toast("已经是第一页了");
		} else {
			lessNum--;
			$(".item_income .finish_detail .paging .page_right .number").text(lessNum);
			var time1 = $("#income_one").val();
			var time2 = $("#income_two").val();
			var time = time1 + ',' + time2;
			var size = $(".item_income .finish_detail .pagenum input").val();
			finishAjax(size, lessNum, time);
		}
	})
	//页数点击时获取
	$(".item_income .finish_detail select").on("change", function() {
		var size = $(this).siblings("input").val();
		var time1 = $("#staffone").val();
		var time2 = $("#stafftwo").val();
		var time = time1 + ',' + time2;
		finishAjax(size, 1, time);
	})

	function finishAjax(size, p, time) {
		$.ajax({
			type: "get",
			url: "/Home/Finance/finish",
			dataType: 'json',
			data: {
				size: size,
				p: p,
				intverl: time,
			},
			success: function(data) {
				$(".item_income .finish_detail tbody tr").remove();
				var datas = data.data;
				var tbody1 = "";
				//进行中
				function tbodyOne(datas) {
					$(".item_income .finish_detail .paging .page_left span").text(data.count);
					$(".item_income .finish_detail .paging .page_right .total_num").text(data.page);
					//					$(".item_income .go_detail table tfoot tr td:nth(3)").text(data.total);
					for(var i = 0; i < datas.length; i++) {
						tbody1 += '<tr>';
						tbody1 += '<td>' + datas[i].id + '</td>';
						tbody1 += '<td class="item_name"><a href="javascirpt:void(0)">' + datas[i].name + '</a></td>';
						tbody1 += '<td>' + datas[i].gross + '</td>';
						tbody1 += '<td>' + datas[i].stage + '</td>';
						tbody1 += '<td>' + datas[i].income + '</td>';
						tbody1 += '<td>' + datas[i].uncollected + '</td>';
						tbody1 += '<td>' + datas[i].record + '</td>';
						tbody1 += '<td>' + datas[i].create_time + '</td>';
						tbody1 += '<td class="handle"><span data-id="' + datas[i].id + '" class="check">查看</span></td>';
						tbody1 += '</tr>';
					}
					return tbody1;
				}
				tbodyOne(datas);
				$(".item_income .finish_detail tbody").append(tbody1);
				$(".item_income .finish_detail tbody tr:odd").addClass("e9ecf1");
			},
			error: function(data) {},
			async: true
		});
	}

	//项目支出====================
	expendAjax(5, 1);
	expend_finishAjax(5, 1);

	//时间
	$(document).on("click", ".program_expend .item_time .search", function() {
		var time1 = $("#expend_one").val();
		var time2 = $("#expend_two").val();
		var time = time1 + ',' + time2;
		expendAjax(5, 1, time);
		expend_finishAjax(5, 1, time);
	})
	//右边点击获取
	$(".program_expend .go_detail .paging .page_right .more").on("click", function() {
		var moreNum = $(".program_expend .go_detail .paging .page_right .total_num").text();
		var lessNum = $(".program_expend .go_detail .paging .page_right .number").text();
		if(moreNum <= lessNum) {
			toast("已经是最后一页了");
		} else {
			lessNum++;
			$(".program_expend .go_detail .paging .page_right .number").text(lessNum);
			var time1 = $("#expend_one").val();
			var time2 = $("#expend_two").val();
			var time = time1 + ',' + time2;
			var size = $(".program_expend .go_detail .pagenum input").val();
			expendAjax(size, lessNum, time);
		}
	})
	//左边点击获取
	$(".program_expend .go_detail  .paging .page_right .less").on("click", function() {
		var moreNum = $(".program_expend .go_detail .paging .page_right .total_num").text();
		var lessNum = $(".program_expend .go_detail .paging .page_right .number").text();
		if(lessNum == 1) {
			toast("已经是第一页了");
		} else {
			lessNum--;
			$(".program_expend .go_detail .paging .page_right .number").text(lessNum);
			var time1 = $("#expend_one").val();
			var time2 = $("#expend_two").val();
			var time = time1 + ',' + time2;
			var size = $(".program_expend .go_detail .pagenum input").val();
			expendAjax(size, lessNum, time);
		}
	})
	//页数点击时获取
	$(".program_expend .go_detail select").on("change", function() {
		var size = $(this).siblings("input").val();
		var time1 = $("#expend_one").val();
		var time2 = $("#expend_two").val();
		var time = time1 + ',' + time2;
		expendAjax(size, 1, time);
	})

	function expendAjax(size, p, time) {
		$.ajax({
			type: "get",
			url: "/home/finance/expenditure",
			dataType: 'json',
			data: {
				size: size,
				p: p,
				intverl: time,
			},
			success: function(data) {
				$(".program_expend .go_detail tbody tr").remove();
				var datas = data.data;
				var tbody1 = "";
				//进行中
				function tbodyOne(datas) {
					$(".program_expend .go_detail .paging .page_left span").text(data.count);
					$(".program_expend .go_detail .paging .page_right .total_num").text(data.page);
					//					$(".item_income .go_detail table tfoot tr td:nth(3)").text(data.total);
					for(var i = 0; i < datas.length; i++) {
						tbody1 += '<tr>';
						tbody1 += '<td>' + datas[i].id + '</td>';
						tbody1 += '<td class="item_name"><a href="javascirpt:void(0)">' + datas[i].name + '</a></td>';
						tbody1 += '<td>' + datas[i].totalled + '</td>';
						tbody1 += '<td>' + datas[i].new_data + '</td>';
						tbody1 += '<td>' + datas[i].create_time + '</td>';
						tbody1 += '<td class="handle"><span class="check" data-id="' + datas[i].id + '">查看</span></td>';
						tbody1 += '</tr>';
					}
					return tbody1;
				}
				tbodyOne(datas);
				$(".program_expend .go_detail tbody").append(tbody1);
				$(".program_expend .go_detail tbody tr:odd").addClass("e9ecf1");
			},
			error: function(data) {},
			async: true
		});
	}
	//项目支出已完成
	//右边点击获取
	$(".program_expend .finish_detail .paging .page_right .more").on("click", function() {
		var moreNum = $(".program_expend .finish_detail .paging .page_right .total_num").text();
		var lessNum = $(".program_expend .finish_detail .paging .page_right .number").text();
		if(moreNum <= lessNum) {
			toast("已经是最后一页了");
		} else {
			lessNum++;
			$(".program_expend .finish_detail .paging .page_right .number").text(lessNum);
			var time1 = $("#expend_one").val();
			var time2 = $("#expend_two").val();
			var time = time1 + ',' + time2;
			var size = $(".program_expend .finish_detail .pagenum input").val();
			expend_finishAjax(size, lessNum, time);
		}
	})
	//左边点击获取
	$(".program_expend .finish_detail  .paging .page_right .less").on("click", function() {
		var moreNum = $(".program_expend .finish_detail .paging .page_right .total_num").text();
		var lessNum = $(".program_expend .finish_detail .paging .page_right .number").text();
		if(lessNum == 1) {
			toast("已经是第一页了");
		} else {
			lessNum--;
			$(".program_expend .finish_detail .paging .page_right .number").text(lessNum);
			var time1 = $("#expend_one").val();
			var time2 = $("#expend_two").val();
			var time = time1 + ',' + time2;
			var size = $(".program_expend .finish_detail .pagenum input").val();
			expend_finishAjax(size, lessNum, time);
		}
	})
	//页数点击时获取
	$(".program_expend .finish_detail select").on("change", function() {
		var size = $(this).siblings("input").val();
		var time1 = $("#expend_one").val();
		var time2 = $("#expend_two").val();
		var time = time1 + ',' + time2;
		expend_finishAjax(size, 1, time);
	})
	expend_finishAjax(5, 1);

	function expend_finishAjax(size, p, time) {
		$.ajax({
			type: "get",
			url: "/Home/Finance/expenditure_finish",
			dataType: 'json',
			data: {
				size: size,
				p: p,
				intverl: time,
			},
			success: function(data) {
				$(".program_expend .finish_detail tbody tr").remove();
				var datas = data.data;
				var tbody1 = "";
				//进行中
				function tbodyOne(datas) {
					$(".program_expend .finish_detail .paging .page_left span").text(data.count);
					$(".program_expend .finish_detail .paging .page_right .total_num").text(data.page);
					//					$(".item_income .go_detail table tfoot tr td:nth(3)").text(data.total);
					for(var i = 0; i < datas.length; i++) {
						tbody1 += '<tr>';
						tbody1 += '<td>' + datas[i].id + '</td>';
						tbody1 += '<td class="item_name"><a href="javascirpt:void(0)">' + datas[i].name + '</a></td>';
						tbody1 += '<td>' + datas[i].totalled + '</td>';
						tbody1 += '<td>' + datas[i].new_data + '</td>';
						tbody1 += '<td>' + datas[i].create_time + '</td>';
						tbody1 += '<td class="handle"><span class="check" data-id="' + datas[i].id + '">查看</span></td>';
						tbody1 += '</tr>';
					}
					return tbody1;
				}
				tbodyOne(datas);
				$(".program_expend .finish_detail tbody").append(tbody1);
				$(".program_expend .finish_detail tbody tr:odd").addClass("e9ecf1");
			},
			error: function(data) {},
			async: true
		});
	}

	//项目计提================
	countAjax(5, 1);
	count_finishAjax(5, 1);

	//时间
	$(document).on("click", ".item_count .item_time .search", function() {
		var time1 = $("#count_one").val();
		var time2 = $("#count_two").val();
		var time = time1 + ',' + time2;
		countAjax(5, 1, time);
		expend_finishAjax(5, 1, time);
	})
	//右边点击获取
	$(".item_count .go_detail .paging .page_right .more").on("click", function() {
		var moreNum = $(".item_count .go_detail .paging .page_right .total_num").text();
		var lessNum = $(".item_count .go_detail .paging .page_right .number").text();
		if(moreNum <= lessNum) {
			toast("已经是最后一页了");
		} else {
			lessNum++;
			$(".item_count .go_detail .paging .page_right .number").text(lessNum);
			var time1 = $("#count_one").val();
			var time2 = $("#count_two").val();
			var time = time1 + ',' + time2;
			var size = $(".item_count .go_detail .pagenum input").val();
			countAjax(size, lessNum, time);
		}
	})
	//左边点击获取
	$(".item_count .go_detail  .paging .page_right .less").on("click", function() {
		var moreNum = $(".item_count .go_detail .paging .page_right .total_num").text();
		var lessNum = $(".item_count .go_detail .paging .page_right .number").text();
		if(lessNum == 1) {
			toast("已经是第一页了");
		} else {
			lessNum--;
			$(".item_count .go_detail .paging .page_right .number").text(lessNum);
			var time1 = $("#count_one").val();
			var time2 = $("#count_two").val();
			var time = time1 + ',' + time2;
			var size = $(".item_count .go_detail .pagenum input").val();
			countAjax(size, lessNum, time);
		}
	})
	//页数点击时获取
	$(".item_count .go_detail select").on("change", function() {
		var size = $(this).siblings("input").val();
		var time1 = $("#count_one").val();
		var time2 = $("#count_two").val();
		var time = time1 + ',' + time2;
		countAjax(size, 1, time);
	})
	countAjax(5, 1)

	function countAjax(size, p, time) {
		$.ajax({
			type: "get",
			url: "/home/finance/jiTi",
			dataType: 'json',
			data: {
				size: size,
				p: p,
				intverl: time,
			},
			success: function(data) {
				$(".item_count .go_detail tbody tr").remove();
				var datas = data.data;
				var tbody1 = "";
				//进行中
				function tbodyOne(datas) {
					$(".item_count .go_detail .paging .page_left span").text(data.count);
					$(".item_count .go_detail .paging .page_right .total_num").text(data.page);
					//					$(".item_income .go_detail table tfoot tr td:nth(3)").text(data.total);
					for(var i = 0; i < datas.length; i++) {
						tbody1 += '<tr>';
						tbody1 += '<td>' + datas[i].id + '</td>';
						tbody1 += '<td class="item_name"><a href="javascirpt:void(0)">' + datas[i].name + '</a></td>';
						tbody1 += '<td>' + datas[i].totalled + '</td>';
						tbody1 += '<td>' + datas[i].period + '</td>';
						tbody1 += '<td>' + datas[i].create_time + '</td>';
						tbody1 += '<td class="handle"><span class="check" data-id="' + datas[i].id + '">查看</span></td>';
						tbody1 += '</tr>';
					}
					return tbody1;
				}
				tbodyOne(datas);
				$(".item_count .go_detail tbody").append(tbody1);
				$(".item_count .go_detail tbody tr:odd").addClass("e9ecf1");
			},
			error: function(data) {},
			async: true
		});
	}

	//项目计提已完成
	//右边点击获取
	$(".item_count .finish_detail .paging .page_right .more").on("click", function() {
		var moreNum = $(".item_count .finish_detail .paging .page_right .total_num").text();
		var lessNum = $(".item_count .finish_detail .paging .page_right .number").text();
		if(moreNum <= lessNum) {
			toast("已经是最后一页了");
		} else {
			lessNum++;
			$(".item_count .finish_detail .paging .page_right .number").text(lessNum);
			var time1 = $("#count_one").val();
			var time2 = $("#count_two").val();
			var time = time1 + ',' + time2;
			var size = $(".item_count .finish_detail .pagenum input").val();
			expend_finishAjax(size, lessNum, time);
		}
	})
	//左边点击获取
	$(".item_count .finish_detail  .paging .page_right .less").on("click", function() {
		var moreNum = $(".item_count .finish_detail .paging .page_right .total_num").text();
		var lessNum = $(".item_count .finish_detail .paging .page_right .number").text();
		if(lessNum == 1) {
			toast("已经是第一页了");
		} else {
			lessNum--;
			$(".item_count .finish_detail .paging .page_right .number").text(lessNum);
			var time1 = $("#count_one").val();
			var time2 = $("#count_two").val();
			var time = time1 + ',' + time2;
			var size = $(".item_count .finish_detail .pagenum input").val();
			expend_finishAjax(size, lessNum, time);
		}
	})
	//页数点击时获取
	$(".item_count .finish_detail select").on("change", function() {
		var size = $(this).siblings("input").val();
		var time1 = $("#count_one").val();
		var time2 = $("#count_two").val();
		var time = time1 + ',' + time2;
		expend_finishAjax(size, 1, time);
	})

	function count_finishAjax(size, p, time) {
		$.ajax({
			type: "get",
			url: "/Home/Finance/expenditure_finish",
			dataType: 'json',
			data: {
				size: size,
				p: p,
				intverl: time,
			},
			success: function(data) {
				$(".item_count .finish_detail tbody tr").remove();
				var datas = data.data;
				var tbody1 = "";
				//进行中
				function tbodyOne(datas) {
					$(".item_count .finish_detail .paging .page_left span").text(data.count);
					$(".item_count .finish_detail .paging .page_right .total_num").text(data.page);
					//					$(".item_income .go_detail table tfoot tr td:nth(3)").text(data.total);
					for(var i = 0; i < datas.length; i++) {
						tbody1 += '<tr>';
						tbody1 += '<td>' + datas[i].id + '</td>';
						tbody1 += '<td class="item_name"><a href="javascirpt:void(0)">' + datas[i].name + '</a></td>';
						tbody1 += '<td>' + datas[i].totalled + '</td>';
						tbody1 += '<td>' + datas[i].new_data + '</td>';
						tbody1 += '<td>' + datas[i].create_time + '</td>';
						tbody1 += '<td class="handle"><span class="check" data-id="' + datas[i].id + '">查看</span></td>';
						tbody1 += '</tr>';
					}
					return tbody1;
				}
				tbodyOne(datas);
				$(".item_count .finish_detail tbody").append(tbody1);
				$(".item_count .finish_detail tbody tr:odd").addClass("e9ecf1");
			},
			error: function(data) {},
			async: true
		});
	}

	//经营统计页面数据=========
	itemcountAjax(5, 1);
	itemcount_finishAjax(5, 1);

	//时间
	$(document).on("click", ".item_content .item_time .search", function() {
		var time1 = $("#itemone").val();
		var time2 = $("#itemtwo").val();
		var time = time1 + ',' + time2;
		itemcountAjax(5, 1, time);
		itemcount_finishAjax(5, 1, time);
	})
	//右边点击获取
	$(".item_content .go_detail .paging .page_right .more").on("click", function() {
		var moreNum = $(".item_content .go_detail .paging .page_right .total_num").text();
		var lessNum = $(".item_content .go_detail .paging .page_right .number").text();
		if(moreNum <= lessNum) {
			toast("已经是最后一页了");
		} else {
			lessNum++;
			$(".item_content .go_detail .paging .page_right .number").text(lessNum);
			var time1 = $("#itemone").val();
			var time2 = $("#itemtwo").val();
			var time = time1 + ',' + time2;
			var size = $(".item_content .go_detail .pagenum input").val();
			itemcountAjax(size, lessNum, time);
		}
	})
	//左边点击获取
	$(".item_content .go_detail  .paging .page_right .less").on("click", function() {
		var moreNum = $(".item_content .go_detail .paging .page_right .total_num").text();
		var lessNum = $(".item_content .go_detail .paging .page_right .number").text();
		if(lessNum == 1) {
			toast("已经是第一页了");
		} else {
			lessNum--;
			$(".item_content .go_detail .paging .page_right .number").text(lessNum);
			var time1 = $("#itemone").val();
			var time2 = $("#itemtwo").val();
			var time = time1 + ',' + time2;
			var size = $(".item_content .go_detail .pagenum input").val();
			itemcountAjax(size, lessNum, time);
		}
	})
	//页数点击时获取
	$(".item_content .go_detail select").on("change", function() {
		var size = $(this).siblings("input").val();
		var time1 = $("#itemone").val();
		var time2 = $("#itemtwo").val();
		var time = time1 + ',' + time2;
		itemcountAjax(size, 1, time);
	})

	function itemcountAjax(size, p, time) {
		$.ajax({
			type: "get",
			url: "/Api/Statistics/index",
			dataType: 'json',
			data: {
				size: size,
				p: p,
				intverl: time,
			},
			success: function(data) {
				$(".item_content .go_detail tbody tr").remove();
				var datas = data.data.data;
				var tbody1 = "";
				//进行中
				function tbodyOne(datas) {
					$(".item_content .go_detail .paging .page_left span").text(data.data.count);
					$(".item_content .go_detail .paging .page_right .total_num").text(data.data.page);
					//					$(".item_income .go_detail table tfoot tr td:nth(3)").text(data.total);
					for(var i = 0; i < datas.length; i++) {
						tbody1 += '<tr>';
						tbody1 += '<td>' + datas[i].id + '</td>';
						tbody1 += '<td class="item_name"><a href="javascirpt:void(0)">' + datas[i].name + '</a></td>';
						tbody1 += '<td>' + datas[i].income + '</td>';
						tbody1 += '<td>' + datas[i].overhead + '</td>';
						tbody1 += '<td>' + datas[i].jiti + '</td>';
						tbody1 += '<td>' + datas[i].remaining + '</td>';
						tbody1 += '<td class="handle" data-id="' + datas[i].id + '"><a><span class="check" data-id="' + datas[i].id + '">详情</span></a></td>';
						tbody1 += '</tr>';
					}
					return tbody1;
				}
				tbodyOne(datas);
				$(".item_content .go_detail tbody").append(tbody1);
				$(".item_content .go_detail tbody tr:odd").addClass("e9ecf1");
			},
			error: function(data) {},
			async: true
		});
	}

	//统计已完成
	//右边点击获取
	$(".item_content .finish_detail .paging .page_right .more").on("click", function() {
		var moreNum = $(".item_content .finish_detail .paging .page_right .total_num").text();
		var lessNum = $(".item_content .finish_detail .paging .page_right .number").text();
		if(moreNum <= lessNum) {
			toast("已经是最后一页了");
		} else {
			lessNum++;
			$(".item_content .finish_detail .paging .page_right .number").text(lessNum);
			var time1 = $("#itemone").val();
			var time2 = $("#itemtwo").val();
			var time = time1 + ',' + time2;
			var size = $(".item_content .finish_detail .pagenum input").val();
			itemcount_finishAjax(size, lessNum, time);
		}
	})
	//左边点击获取
	$(".item_content .finish_detail  .paging .page_right .less").on("click", function() {
		var moreNum = $(".item_content .finish_detail .paging .page_right .total_num").text();
		var lessNum = $(".item_content .finish_detail .paging .page_right .number").text();
		if(lessNum == 1) {
			toast("已经是第一页了");
		} else {
			lessNum--;
			$(".item_content .go_detail .paging .page_right .number").text(lessNum);
			var time1 = $("#itemone").val();
			var time2 = $("#itemtwo").val();
			var time = time1 + ',' + time2;
			var size = $(".item_content .finish_detail .pagenum input").val();
			itemcount_finishAjax(size, lessNum, time);
		}
	})
	//页数点击时获取
	$(".item_content .finish_detail select").on("change", function() {
		var size = $(this).siblings("input").val();
		var time1 = $("#itemone").val();
		var time2 = $("#itemtwo").val();
		var time = time1 + ',' + time2;
		itemcount_finishAjax(size, 1, time);
	})

	function itemcount_finishAjax(size, p, time) {
		$.ajax({
			type: "get",
			url: "/Api/Statistics/complete",
			dataType: 'json',
			data: {
				size: size,
				p: p,
				intverl: time,
			},
			success: function(data) {
				$(".item_content .finish_detail tbody tr").remove();
				var datas = data.data.data;
				var tbody1 = "";
				//进行中
				function tbodyOne(datas) {
					$(".item_content .finish_detail .paging .page_left span").text(data.data.count);
					$(".item_content .finish_detail .paging .page_right .total_num").text(data.data.page);
					//					$(".item_income .go_detail table tfoot tr td:nth(3)").text(data.total);
					for(var i = 0; i < datas.length; i++) {
						tbody1 += '<tr>';
						tbody1 += '<td>' + datas[i].id + '</td>';
						tbody1 += '<td class="item_name"><a href="javascirpt:void(0)">' + datas[i].name + '</a></td>';
						tbody1 += '<td>' + datas[i].income + '</td>';
						tbody1 += '<td>' + datas[i].overhead + '</td>';
						tbody1 += '<td>' + datas[i].jiti + '</td>';
						tbody1 += '<td>' + datas[i].remaining + '</td>';
						tbody1 += '<td class="handle"><a><span class="check" data-id="' + datas[i].id + '">详情</span></a></td>';
						tbody1 += '</tr>';
					}
					return tbody1;
				}
				tbodyOne(datas);
				$(".item_content .finish_detail tbody").append(tbody1);
				$(".item_content .finish_detail tbody tr:odd").addClass("e9ecf1");
			},
			error: function(data) {},
			async: true
		});
	}

	function itemcount_finishAjax(size, p, time) {
		$.ajax({
			type: "get",
			url: "/Api/Statistics/complete",
			dataType: 'json',
			data: {
				size: size,
				p: p,
				intverl: time,
			},
			success: function(data) {
				$(".item_content .finish_detail tbody tr").remove();
				var datas = data.data.data;
				var tbody1 = "";
				//进行中
				function tbodyOne(datas) {
					$(".item_content .finish_detail .paging .page_left span").text(data.data.count);
					$(".item_content .finish_detail .paging .page_right .total_num").text(data.data.page);
					//					$(".item_income .go_detail table tfoot tr td:nth(3)").text(data.total);
					for(var i = 0; i < datas.length; i++) {
						tbody1 += '<tr>';
						tbody1 += '<td>' + datas[i].id + '</td>';
						tbody1 += '<td class="item_name"><a href="javascirpt:void(0)">' + datas[i].name + '</a></td>';
						tbody1 += '<td>' + datas[i].income + '</td>';
						tbody1 += '<td>' + datas[i].overhead + '</td>';
						tbody1 += '<td>' + datas[i].jiti + '</td>';
						tbody1 += '<td>' + datas[i].remaining + '</td>';
						tbody1 += '<td class="handle" data-id="' + datas[i].id + '"><a><span class="check" data-id="' + datas[i].id + '">详情</span></a></td>';
						tbody1 += '</tr>';
					}
					return tbody1;
				}
				tbodyOne(datas);
				$(".item_content .finish_detail tbody").append(tbody1);
				$(".item_content .finish_detail tbody tr:odd").addClass("e9ecf1");
			},
			error: function(data) {},
			async: true
		});
	}

	//统计
	count1Ajax();

	function count1Ajax() {
		$.ajax({
			type: "get",
			url: "/Api/Statistics/statistics",
			dataType: 'json',
			data: {

			},
			success: function(data) {
				$(".item_content .count_detail tbody tr").remove();
				var datas = data.data;
				var tbody1 = "";
				//进行中
				function tbodyOne(datas) {
					tbody1 += '<tr>';
					tbody1 += '<td>统计</td>';
					tbody1 += '<td>' + datas.count + '</td>';
					tbody1 += '<td>' + datas.income + '</td>';
					tbody1 += '<td>' + datas.overhead + '</td>';
					tbody1 += '<td>' + datas.jiti + '</td>';
					tbody1 += '<td>' + datas.remaining + '</td>';
					tbody1 += '<td>' + datas.profit + '%</td>';
					tbody1 += '</tr>';

					return tbody1;
				}
				tbodyOne(datas);
				$(".item_content .count_detail tbody").append(tbody1);
			},
			error: function(data) {},
			async: true
		});
	}

	//财务页面选人=============
	//工种选人
	workAjax();

	function workAjax() {
		$.ajax({
			type: "get",
			url: "/api/staff/work_staffs/",
			dataType: 'json',
			data: {},
			success: function(data) {
				var datas = data;
				$(".now_item .now_item_cnt .jobstyle").remove();
				var tbody1 = "";

				function tbodyOne2(datas) {
					for(var i = 0; i < data.length; i++) {
						tbody1 += '<div class="jobstyle">';
						tbody1 += '	<div class="job">';
						tbody1 += '		<i><img src="/Public/Home/images/icon_checked.png" alt="" /></i>';
						tbody1 += '		<span data-id="' + data[i].type_id + '">' + data[i].type_name + "工种" + '</span>';
						tbody1 += '		<s><img src="/Public/Home/images/arrow_bottom.png"/></s>';
						tbody1 += '	</div>';
						tbody1 += '	<ul class="worker">';
						for(var j = 0; j < data[i].staffs.length; j++) {
							tbody1 += '	<li data-id="' + data[i].staffs[j].sid + '">';
							tbody1 += '		<i><img src="/Public/Home/images/icon_checked.png" alt="" /></i>';
							tbody1 += '		<span data-id="' + data[i].staffs[j].sid + '">' + data[i].staffs[j].name + '</span>';
							tbody1 += '	</li>';
						}
						tbody1 += '	</ul>';
						tbody1 += '</div>';
					}
					return tbody1;
				}
				tbodyOne2(datas);
				$(".now_item .now_item_cnt").append(tbody1);
			},
			error: function(data) {},
			async: true
		});
	}

	histroy();

	function histroy() {
		$.ajax({
			type: "get",
			url: "/api/staff/get_project_team",
			dataType: 'json',
			data: {},
			success: function(data) {
				var str = '';
				for(var i = 0; i < data.length; i++) {
					str += '<div class="jobstyle">';
					str += '	<div class="job">';
					str += '		<i><img src="/Public/Home/images/icon_checked.png" alt="" /></i>';
					str += '		<span>' + data[i].name + '</span>';
					str += '		<s><img src="/Public/Home/images/arrow_bottom.png"/></s>';
					str += '	</div>';
					str += '	<ul class="worker">';
					for(var j = 0; j < data[i].workers.length; j++) {
						str += '	<li>';
						str += '		<i><img src="/Public/Home/images/icon_checked.png" alt="" /></i>';
						str += '		<span data-id="' + data[i].workers[j].staff_id + '">' + data[i].workers[j].real_name + '</span>';
						str += '	</li>';
					}
					str += '	</ul>';
					str += '</div>';
				}
				$('.subitem_choose_bottom .history_item').html(str);
			},
			error: function(data) {},
			async: true
		});
	}
	all();

	function all() {
		$.ajax({
			type: "get",
			url: "/api/staff/get_all_staff",
			dataType: 'json',
			data: {},
			success: function(data) {
				var str = '';
				for(var i = 0; i < data.length; i++) {
					str += '<li>';
					str += '	<i><img src="/Public/Home/images/icon_checked.png" alt="" /></i>';
					str += '	<span data-id="' + data[i].staff_id + '">' + data[i].real_name + '</span>';
					str += '</li>';
				}
				$('.subitem_choose_bottom .all_item ul').html(str);
			},
			error: function(data) {},
			async: true
		});
	}
	choose();

	function choose() {
		$(document).on("click", ".expend_edit .choose", function() {
			$(".expend_edit").hide();
			$(".subitem_choose").show();
			var html = "";
			html += '<div class="work_style"><ul class="clearfix"></ul></div>';
			$(".item_right_ctn").append(html);
		})
		//选人
		$(document).on('click', '.subitem_choose_bottom .item_name li', function() {
			$(this).addClass("active").siblings().removeClass("active");
			var index = $(this).index();
			$(".subitem_choose_bottom .admin").hide();
			$(".subitem_choose_bottom .admin").eq(index).show();
		})
		$(document).on("click", ".subitem_choose .admin li i", function() {
			var length = $(".item_right_ctn ul li").length;
			if(length == 0) {
				$(this).parents("li").addClass("active")
				var txt = $(this).siblings("span").text();
				var id = $(this).parents('li').attr('data-id');
				var lis = '<li><img src="/Public/Home/images/icon_del.png"/><span data-id="' + id + '">' + txt + '</span></li>';
				$(".item_right_ctn ul").append(lis);
			}
		});
		$(document).on("click", ".subitem_choose .admin .jobstyle .job", function() {
			var display = $(this).siblings(".worker").css("display");
			$(this).siblings(".worker").slideToggle();
			var src = "/Public/Home/images/arrow_bottom.png";
			var src1 = "/Public/Home/images/arrow_top.png"
			if(display == "none") {
				$(this).find("s>img").attr("src", src1);
			} else {
				$(this).find("s>img").attr("src", src);
			}
		});
		$(document).on("click", ".subitem_choose .admin li.active i", function() {
			$(this).parents("li").removeClass("active");
			$(".item_right_ctn ul li").remove();
		});
		$(document).on("click", ".item_right_ctn ul li img", function() {
			$(".item_right_ctn ul li").remove();
			$(".subitem_choose_bottom .admin ul li").removeClass("active");
		});
		$(document).on("click", "#jobbtn", function() {
			var txt = $(".item_right_ctn ul li span").text();
			$(".admin li").removeClass("active");
			$(".item_right_ctn .work_style").remove();
			$(".expend_edit").show();
			$(".subitem_choose").hide();
			$("#chooseman").val(txt);
		})
		//选人点上方关闭
		$(document).on("click", ".subitem_choose_head i", function() {
			$(".admin li").removeClass("active");
			$(".item_right_ctn .work_style").remove();
			$(".expend_edit").show();
			$(".subitem_choose").hide();
		})
	}

	//项目收款==============
	var editIncome;
	$(document).on("click", ".item_income tbody td .check", function() {
		$("#boxPock").show();
		$("#boxPock .item_edit").show();
		$(".item_edit .stage .bigstage").remove();
		var id = $(this).attr("data-id");
		editIncome = "";
		itemEdit(id);
	})
	$(document).on("click", ".item_edit .item_edit_head i,.item_edit .btn1,.item_edit .btn2", function() {
		$("#boxPock").hide();
		$("#boxPock .item_edit").hide();
	})
	//项目收款详情
	function itemEdit(id) {
		$.ajax({
			type: "get",
			url: "/Api/Finance/project_income",
			dataType: 'json',
			data: {
				id: id
			},
			success: function(data) {
				console.log(data);
				//阶段上面的数据添加
				$(".item_edit_bottom .item_name input").val(data.name);
				$(".item_edit_bottom .item_time input").val(data.time);
				$(".item_edit_bottom .item_stages input").val(data.stage);
				$(".item_edit_bottom .item_sum input").val(data.gross);
				$(".item_edit_bottom .uploading .load_right").text(data.contract_name);
				if(data.has_stage == 1) {
					console.log(data.stages.length);
					for(var i = 0; i < data.stages.length; i++) {
						editIncome += '<div class="bigstage">';
						editIncome += '		<div class="stage_header">';
						editIncome += '			<input type="text" value="第一阶段" placeholder="第一阶段" disabled="disabled"/>	';
						editIncome += '		</div>';
						editIncome += '		<div class="stage_bottom">';
						editIncome += '			<div class="service_content clearfix">';
						editIncome += '				<div class="service">';
						editIncome += '					<div class="service_left">服务内容：</div>';
						editIncome += '					<input type="text" placeholder="分派" disabled="disabled"/>';
						editIncome += '				</div>';
						editIncome += '				<div class="stage_sum">';
						editIncome += '					<div class="stage_sum_left">阶段总额：</div>';
						editIncome += '					<input type="text" placeholder="20%" disabled="disabled"/>';
						editIncome += '				</div>';
						editIncome += '				<div class="pay">';
						editIncome += '					<div class="pay_left">阶段总额：</div>';
						editIncome += '					<input type="text" placeholder="20%" disabled="disabled"/>';
						editIncome += '				</div>';
						editIncome += '				<div class="nopay">';
						editIncome += '					<div class="nopay_left">阶段总额：</div>';
						editIncome += '					<input type="text" placeholder="20%" disabled="disabled"/>';
						editIncome += '				</div>';
						editIncome += '			</div>';
						editIncome += '			<div class="table">';
						editIncome += '				<table border="1" cellspacing="0">';
						editIncome += '					<thead>';
						editIncome += '						<tr>';
						editIncome += '							<td class="orderlist">序号<i></i></td>';
						editIncome += '							<td class="settime">时间</td>';
						editIncome += '							<td class="style">事由</td>';
						editIncome += '							<td class="sum">金额</td>';
						editIncome += '							<td class="handle">操作</td>';
						editIncome += '						</tr>';
						editIncome += '					</thead>';
						editIncome += '					<tbody>';
						for(var j = 0; j < data.stages[i].records.length; j++) {
							editIncome += '<tr>';
							editIncome += '<td>100000</td>';
							editIncome += '<td>2017-08-20</td>';
							editIncome += '<td>建筑</td>';
							editIncome += '<td>张三李四</td>';
							editIncome += '<td class="handle"><span class="edit">编辑</span></td>';
							editIncome += '</tr>';
						}
						editIncome += '					</tbody>';
						editIncome += '				</table>';
						editIncome += '			</div>';
						editIncome += '			<div class="process">';
						editIncome += '				<div class="process_head">';
						editIncome += '					<div class="head_left">过程记录</div>';
						editIncome += '					<div class="head_right">添加收款记录</div>';
						editIncome += '				</div>';
						editIncome += '				<textarea name="" rows="" cols="" placeholder="请输入内容" disabled="disabled"></textarea>';
						editIncome += '			</div>';
						editIncome += '		</div>';
						editIncome += '	</div>';
					}
				}
			},
			error: function(data) {},
			async: true
		});
	}
})