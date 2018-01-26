$(function() {
	//tab栏切换
	$(".detail_tab li").on("click", function() {
		$(this).addClass("active").siblings().removeClass("active");
		var index = $(this).index();
		$(".content_detail .item_one").hide();
		$(".content_detail .item_one").eq(index).show();
	})
	//项目计提
	$(document).on("click", ".count_ul li", function() {
		$(this).addClass("active").siblings().removeClass("active");
		var index = $(this).index();
		$(".count_detail table").hide();
		$(".count_detail table").eq(index).show();
	})
	/*token*/
	var token = localStorage.getItem("token");
	var project_id = localStorage.getItem("project_id");
	income(project_id);
	/*项目收款*/
	function income(project_id) {
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Finance/censusDetails",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				project_id: project_id,
				type: 1
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data)
					var incomeList = "";
					var expendList = "";
					var datas = data.data.schedule_list;
					var expend = data.data.expense_list;
					for(var i = 0; i < datas.length; i++) {
						incomeList += '<tr>';
						incomeList += '<td>' + (i + 1) + '</td>';
						incomeList += '<td>' + datas[i].name + '</td>';
						incomeList += '<td>' + datas[i].receive + '</td>';
						incomeList += '<td>' + datas[i].debat + '</td>';
                        if (datas[i].process.length > 18){
                            incomeList += '<td>' + datas[i].process.substring(0,18) + '…' + '</td>';
                        }else incomeList += '	<td>' + datas[i].process + '</td>';
						incomeList += '<td class="handle" data-id="' + datas[i].schedule_id + '"><span class="check">详情</span></td>';
						incomeList += '</tr>';
					}
					for(var i = 0; i < expend.length; i++) {
						expendList += '<tr>';
						expendList += '<td>' + (i + 1) + '</td>';
						expendList += '<td>' + expend[i].expense_time + '</td>';
						expendList += '<td>' + expend[i].type_name + '</td>';
						expendList += '<td>' + expend[i].amount + '</td>';

                        if (expend[i].expense_content.length > 13){
                            expendList += '<td>' + expend[i].expense_content.substring(0,13) + '…' + '</td>';
                        }else expendList += '	<td>' + expend[i].expense_content + '</td>';
						expendList += '<td>' + expend[i].username + '</td>';
						expendList += '<td class="handle" data-id="' + expend[i].expense_id + '"><span class="check">详情</span></td>';
						expendList += '</tr>';
					}
					var countDatas = data.data.project_child_list;
					var countListul = "";
					var countList = "";
					for(var i = 0; i < countDatas.length; i++) {
						countListul += '<li>' + countDatas[i].name + '</li>';
					}
					for(var i = 0; i < countDatas.length; i++) {
						countList += '<table border="1" cellspacing="0" class="first">';
						countList += '<thead>';
						countList += '<tr>';
						countList += '<td class="orderlist">序号</td>';
						countList += '<td class="settime">时间区间</td>';
						countList += '<td class="job">所属工种</td>';
						countList += '<td class="work">工种负责</td>';
						countList += '<td class="worker">参与成员</td>';
						countList += '<td class="percent">计提比例</td>';
						countList += '<td class="handle">操作</td>';
						countList += '</tr>';
						countList += '</thead>';
						countList += '<tbody>';
						for(var j = 0; j < countDatas[i].commission_list.length; j++) {
							countList += '<tr data-id="' + countDatas[i].commission_list[j].project_commission_id + '">';
							countList += '<td>' + (j + 1) + '</td>';
							countList += '<td>' + countDatas[i].commission_list[j].start_time + '/' + countDatas[i].commission_list[j].end_time + '</td>';
							countList += '<td>' + countDatas[i].commission_list[j].work_name + '</td>';
							countList += '<td>' + countDatas[i].commission_list[j].username + '</td>';
							countList += '<td>';
							countList += countDatas[i].commission_list[j].user_list;
							//							for(var k = 0; k < countDatas[i].commission_list[j].user_list.length; k++) {
							//								var arr = countDatas[i].commission_list[j].user_list;
							//								countList += arr;
							//							}
							countList += '</td>';
							countList += '<td>' + countDatas[i].commission_list[j].commission_rate + '</td>';
							countList += '<td class="handle" work_id="' + countDatas[i].commission_list[j].work_id + '"><span class="check">详情</span></td>';
							countList += '</tr>';
						}
						countList += '</tbody>';
						countList += '</table>';
					}
					$(".collect_detail tbody tr").remove();
					$(".collect_detail tbody").append(incomeList);
					$(".expend_detail tbody tr").remove();
					$(".expend_detail tbody").append(expendList);
					$(".count_detail .count_ul li").remove();
					$(".count_detail .count_ul").append(countListul);
					$(".count_detail .count_ul li").eq(0).addClass("active");
					$(".count_detail table").remove();
					$(".count_detail").append(countList);
					$(".count_detail table").hide();
					$(".count_detail table").eq(0).show();
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	}
	//项目收款详情
	$(document).on("click", ".collect_detail tbody .handle .check", function() {

		var schedule_id = $(this).parents("td").attr("data-id");
		//		console.log('wqewqeqw',schedule_id)
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Finance/censusReceiptDetails",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				schedule_id: schedule_id
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data)
					$("#boxPock").show();
					$(".item_check").show();
					$(".item_check .project_name").val(data.data.project_name);
					$(".item_check .project_time").val(data.data.project_time);
					$(".item_check .project_stage").val(data.data.project_stage);
					$(".item_check .project_money").val(data.data.project_money);
					var stage = "";
					var datas = data.data.child;
					stage += '<div class="stage">';
					stage += '<div class="stage_header">';
					stage += '<span>' + datas.schedule_name + '</span>';
					stage += '</div>';
					stage += '<div class="stage_bottom">';
					stage += '<div class="service_content clearfix">';
					stage += '<div class="service">';
					stage += '<div class="service_left">服务内容：</div>';
					stage += '<input type="text" value="' + datas.content + '" disabled="disabled" />';
					stage += '</div>';
					stage += '<div class="stage_sum">';
					stage += '<div class="stage_sum_left">阶段总额：</div>';
					stage += '<input type="text" value="' + datas.money + '" disabled="disabled"/>';
					stage += '</div>';
					stage += '<div class="pay">';
					stage += '<div class="pay_left">已收款：</div>';
					stage += '<input type="text" value="' + datas.receive + '" disabled="disabled" />';
					stage += '</div>';
					stage += '<div class="nopay">';
					stage += '<div class="nopay_left">未收款：</div>';
					stage += '<input type="text" value="' + datas.debt + '" disabled="disabled" />';
					stage += '</div>';
					stage += '</div>';
					stage += '<div class="table">';
					stage += '<table border="1" cellspacing="0">';
					stage += '<thead>';
					stage += '<tr>';
					stage += '<td class="orderlist">序号</td>';
					stage += '<td class="settime">时间</td>';
					stage += '<td class="style">类型</td>';
					stage += '<td class="sum">金额</td>';
					stage += '</tr>';
					stage += '</thead>';
					stage += '<tbody>';
					for(var j = 0; j < datas.receipt_log.length; j++) {
						stage += '<tr>';
						stage += '<td>' + (j + 1) + '</td>';
						stage += '<td>' + datas.receipt_log[j].receive_time + '</td>';
						stage += '<td>' + datas.receipt_log[j].cause + '</td>';
						stage += '<td>' + datas.receipt_log[j].receive + '</td>';
						stage += '</tr>';
					}
					stage += '</tbody>';
					stage += '</table>';
					stage += '</div>';
					stage += '<div class="process">';
					stage += '<div class="process_head">';
					stage += '<div class="head_left">过程记录</div>';
					stage += '</div>';
					stage += '<textarea name="" rows="" cols="" disabled="disabled">' + datas.process + '</textarea>';
					stage += '</div>';
					stage += '</div>';
					stage += '</div>';
					$(".item_check .bigstage .stage").remove();
					$(".item_check .bigstage").append(stage);
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	})
	$(document).on("click", ".item_check_head i,.item_check .item_footer .btn2", function() {
		$("#boxPock").hide();
		$(".item_check").hide();
	})
	//项目支出详情
	$(document).on("click", ".expend_detail .handle .check", function() {
		var expense_id = $(this).parents("td").attr("data-id");
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Finance/censusExpenseDetails",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				expense_id: expense_id
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data)
					$("#boxPock").show();
					$(".item_expend").show();
					$(".item_expend .project_name").val(data.data.project_name);
					$(".item_expend .project_time").val(data.data.project_time);
					$(".item_expend .overhead_type_name").val(data.data.overhead_type_name);
					$(".item_expend .amount").val(data.data.amount);
					$(".item_expend .username").val(data.data.username);
					$(".item_expend .expense_time").val(data.data.expense_time);
					$(".item_expend .expense_content").val(data.data.expense_content);
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	})
	$(document).on("click", ".item_expend_head i,.item_expend_bottom .btn2", function() {
		$("#boxPock").hide();
		$(".item_expend").hide();
	})
	/*项目计提详情*/
	$(document).on("click", ".count_detail tbody td .check", function() {
		var project_commission_id = $(this).parents("tr").attr("data-id");
		var work_id = $(this).parents(".handle").attr("work_id");
		//		console.log(work_id)
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Finance/getProjectStaffCommission",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				project_commission_id: project_commission_id,
				work_id: work_id
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data)
					$("#boxPock").show();
					$("#boxPock .count_edit").show();
					$(".count_edit .start_time").val(data.data.info.start_time + "/" + data.data.info.end_time);
					$(".count_edit .work_name").val(data.data.info.work_name);
					$(".count_edit .username").val(data.data.info.username);
					$(".count_edit .commission_rate").val(data.data.info.commission_rate);
					var stage = "";
					var datas = data.data.list;
					for(var i = 0; i < datas.length; i++) {
						stage += '<tr>';
						stage += '<td>' + (i + 1) + '</td>';
						stage += '<td>' + datas[i].username + '</td>';
						stage += '<td>' + datas[i].labor + '</td>';
						stage += '<td>' + datas[i].content + '</td>';
						stage += '<td>' + datas[i].commission_rate + '</td>';
						stage += '</tr>';
					}
					$(".count_edit tbody tr").remove();
					$(".count_edit tbody").append(stage);
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	})
	$(document).on("click", "#boxPock .count_edit .count_edit_head i,#boxPock .count_edit .btn2", function() {
		$("#boxPock").hide();
		$("#boxPock .count_edit").hide();
	})
})