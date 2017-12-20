$(function() {
	//tab栏切换
	$(".detail_tab li").on("click", function() {
		$(this).addClass("active").siblings().removeClass("active");
		var index = $(this).index();
		$(".content_detail .item_one").hide();
		$(".content_detail .item_one").eq(index).show();
	})
	//项目收款
	$(document).on("click", ".collect_detail .handle .check", function() {
		$("#boxPock").show();
		$(".item_check").show();
	})
	$(document).on("click", ".item_check_head i,.item_check .item_footer .btn2", function() {
		$("#boxPock").hide();
		$(".item_check").hide();
	})
	//项目支出详情
	$(document).on("click", ".expend_detail td .check", function() {
		$("#boxPock").show();
		$(".item_expend").show();
	})
	$(document).on("click", ".item_expend_head i,.item_expend_bottom .btn2", function() {
		$("#boxPock").hide();
		$(".item_expend").hide();
	})
	//项目提成方案
	$(document).on("click", ".count_ul li", function() {
		$(this).addClass("active").siblings().removeClass("active");
	})
	$(document).on("click", ".count_detail tbody .plan .check", function() {
		$("#boxPock").show();
		$("#boxPock .item_plan").show();
	})
	$(document).on("click", "#boxPock .item_plan .item_plan_head i,#boxPock .item_plan .btn2", function() {
		$("#boxPock").hide();
		$("#boxPock .item_plan").hide();
	})
	/*项目计提详情*/
	$(document).on("click", "#boxPock .item_plan tbody .work_plan span", function() {
		$("#boxPock .item_plan").hide();
		$("#boxPock .count_edit").show();
	})
	$(document).on("click", "#boxPock .count_edit .count_edit_head i,.count_edit .btn2", function() {
		$("#boxPock .item_plan").show();
		$("#boxPock .count_edit").hide();
	})
	/*查看项目计提*/
	$(document).on("click", ".count_detail tbody .handle .check", function() {
		$("#boxPock").show();
		$("#boxPock .count_check").show();
	})
	$(document).on("click", ".count_check .count_check_head i,.count_check .btn2", function() {
		$("#boxPock").hide();
		$("#boxPock .count_check").hide();
	})

	/*================*/
	var token = localStorage.getItem("token");
	var posid = localStorage.getItem('JYTJID');
	var s = 0;

	$.ajax({
		type: "get",
		url: host_host_host + "/Home/Finance/censusDetails",
		dataType: 'json',
		headers: {
			accept: "usertoken:" + token,
		},
		data: {
			project_id: posid
		},
		success: function(data) {
			if(data.status == 1) {
				console.log(data);
				/*项目收款*/
				var xmsk = '';
				for(var i = 0; i < data.data.schedule_list.length; i++) {
					xmsk += '<tr>';
					xmsk += '	<td>' + (i + 1) + '</td>';
					xmsk += '	<td>' + data.data.schedule_list[i].name + '</td>';
					xmsk += '	<td>' + data.data.schedule_list[i].receive + '</td>';
					xmsk += '	<td>' + data.data.schedule_list[i].debat + '</td>';
					xmsk += '	<td>' + data.data.schedule_list[i].process + '</td>';
					xmsk += '	<td class="handle"><span class="check" data-id="' + data.data.schedule_list[i].schedule_id + '">详情</span></td>';
					xmsk += '</tr>';
				}
				$('#xmsk').html(xmsk);

				/*项目支出*/
				var xmzc = '';
				for(var c = 0; c < data.data.expense_list.length; c++) {
					xmzc += '<tr>';
					xmzc += '	<td>' + (c + 1) + '</td>';
					xmzc += '	<td>' + data.data.expense_list[c].expense_time + '</td>';
					xmzc += '	<td>' + data.data.expense_list[c].type_name + '</td>';
					xmzc += '	<td>' + data.data.expense_list[c].amount + '</td>';
					xmzc += '	<td>' + data.data.expense_list[c].expense_content + '</td>';
					xmzc += '	<td>' + data.data.expense_list[c].username + '</td>';
					xmzc += '	<td class="handle"><span class="check" data-id="' + data.data.expense_list[c].expense_id + '">详情</span></td>';
					xmzc += '</tr>';
				}
				$('#xmzc').html(xmzc);

				/*项目计提*/
				var xmjt_li = '';
				for(var t = 0; t < data.data.project_child_list.length; t++) {
					if(t == 0) {
						xmjt_li += '<li class="active" data-id="' + data.data.project_child_list[t].project_child_id + '">' + data.data.project_child_list[t].name + '</li>';
					} else {
						xmjt_li += '<li data-id="' + data.data.project_child_list[t].project_child_id + '">' + data.data.project_child_list[t].name + '</li>';
					}
				}
				$('#xmjt_li').html(xmjt_li);
				/*项目计提分类列表显示*/
				xmjtli(data.data.project_child_list);
				/*项目计提分类列表切换*/
				$(document).on('click', '#xmjt_li li', function() {
					s = $(this).index();
					xmjtli(data.data.project_child_list);
				});
				/*项目计提分类列表查看*/
				$(document).on('click', '#xmjt .handle .check', function() {
					var xmtj_lookid = $(this).attr('data-id');
					var xmtj_looktime = $(this).attr('data-time');
					var xmtj_lookmenoy = $(this).attr('data-amount');
					var xmtj_lookzg = $(this).attr('data-sup');
					var xmtj_lookxm = $(this).attr('data-gro');
					$('#xmtj_looktime').val(xmtj_looktime);
					$('#xmtj_lookmenoy').val(xmtj_lookmenoy);
					$('#xmtj_lookzg').val(xmtj_lookzg);
					$('#xmtj_lookxm').val(xmtj_lookxm);
				});

			} else {
				console.log(data);
			}
		},
		error: function(data) {},
		async: true
	});

	/*项目计提-分类列表*/
	function xmjtli(list) {

		var xmjt = '';
		for(var j = 0; j < list[s].commission_list.length; j++) {
			var comlist = list[s].commission_list[j];
			xmjt += '<tr>';
			xmjt += '	<td>' + (j + 1) + '</td>';
			xmjt += '	<td>' + comlist.start_time + '--' + comlist.end_time + '</td>';
			xmjt += '	<td>' + comlist.amount + '</td>';
			xmjt += '	<td class="allot">项目主管：<i>' + comlist.supervisor_rate + '%</i>项目组：<i>' + comlist.group_rate + '%</i></td>';
			xmjt += '	<td class="plan"><span class="check" data-id="' + comlist.project_commission_id + '">查看</span></td>';
			xmjt += '	<td class="handle"><span class="check" data-id="' + comlist.project_commission_id + '" data-time="' + comlist.start_time + '" data-amount="' + comlist.amount + '" data-sup="' + comlist.supervisor_rate + '" data-gro="' + comlist.group_rate + '">查看</span></td>';
			xmjt += '</tr>';
		}
		$('#xmjt').html(xmjt);
	}

	/*项目收款详情*/
	$(document).on('click', '.collect_detail .handle .check', function() {
		var xmskid = $(this).attr('data-id');
		console.log(xmskid);
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Finance/censusReceiptDetails",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				schedule_id: xmskid,
			},
			success: function(data) {
				if(data.status == 1) {
					console.log(data);
					$('#xmsk_d_name').val(data.data.project_name);
					$('#xmsk_d_time').val(data.data.project_time);
					$('#xmsk_d_stage').val(data.data.project_stage);
					$('#xmsk_d_menoy').val(data.data.project_money);
					var xmsk_d = '';
					xmsk_d += '<div class="bigstage first_stage">';
					xmsk_d += '	<div class="stage_header">';
					xmsk_d += '		<span>' + data.data.child.name + '</span>';
					xmsk_d += '	</div>';
					xmsk_d += '	<div class="stage_bottom">';
					xmsk_d += '		<div class="service_content clearfix">';
					xmsk_d += '			<div class="service">';
					xmsk_d += '				<div class="service_left">服务内容：</div>';
					xmsk_d += '				<input type="text" placeholder="分派" disabled="disabled" value="' + data.data.child.content + '" />';
					xmsk_d += '			</div>';
					xmsk_d += '			<div class="stage_sum">';
					xmsk_d += '				<div class="stage_sum_left">阶段总额：</div>';
					xmsk_d += '				<input type="text" placeholder="20%" disabled="disabled" value="' + data.data.child.money + '" />';
					xmsk_d += '			</div>';
					xmsk_d += '			<div class="pay">';
					xmsk_d += '				<div class="pay_left">已收款：</div>';
					xmsk_d += '				<input type="text" placeholder="20%" disabled="disabled" value="' + data.data.child.receive + '" />';
					xmsk_d += '			</div>';
					xmsk_d += '			<div class="nopay">';
					xmsk_d += '				<div class="nopay_left">未收款：</div>';
					xmsk_d += '				<input type="text" placeholder="20%" disabled="disabled" value="' + data.data.child.debt + '" />';
					xmsk_d += '			</div>';
					xmsk_d += '		</div>';
					xmsk_d += '		<div class="table">';
					xmsk_d += '			<table border="1" cellspacing="0">';
					xmsk_d += '				<thead>';
					xmsk_d += '					<tr>';
					xmsk_d += '						<td class="orderlist">序号<i></i></td>';
					xmsk_d += '						<td class="settime">时间</td>';
					xmsk_d += '						<td class="style">事由</td>';
					xmsk_d += '						<td class="sum">金额</td>';
					xmsk_d += '					</tr>';
					xmsk_d += '				</thead>';
					xmsk_d += '				<tbody>';
					for(var j = 0; j < data.data.child.receipt_log.length; j++) {
						xmsk_d += '					<tr>';
						xmsk_d += '						<td>' + (j + 1) + '</td>';
						xmsk_d += '						<td>' + data.data.child.receipt_log[j].receive_time + '</td>';
						xmsk_d += '						<td>' + data.data.child.receipt_log[j].cause + '</td>';
						xmsk_d += '						<td>' + data.data.child.receipt_log[j].receive + '</td>';
						xmsk_d += '					</tr>';
					}
					xmsk_d += '				</tbody>';
					xmsk_d += '			</table>';
					xmsk_d += '		</div>';
					xmsk_d += '		<div class="process">';
					xmsk_d += '			<div class="process_head">';
					xmsk_d += '				<div class="head_left">过程记录</div>';
					xmsk_d += '			</div>';
					xmsk_d += '			<textarea name="" rows="" cols="" placeholder="请输入内容" disabled="disabled">' + data.data.child.process + '</textarea>';
					xmsk_d += '		</div>';
					xmsk_d += '	</div>';
					xmsk_d += '</div>';

					console.log(xmsk_d)
					$('#xmsk_d').html(xmsk_d);

				} else {
					console.log(data);
				}
			},
			error: function(data) {},
			async: true
		});
	});

	/*项目支出详情*/
	$(document).on('click', '#xmzc .handle .check', function() {
		var xmzcid = $(this).attr('data-id');
		console.log(xmzcid);
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Finance/censusExpenseDetails",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				expense_id: xmzcid,
			},
			success: function(data) {
				if(data.status == 1) {
					console.log(data);
					$('#xmzc_d_name').val(data.data.project_name);
					$('#xmzc_d_time').val(data.data.project_time);
					$('#xmzc_d_type').val(data.data.overhead_type_name);
					$('#xmzc_d_amount').val(data.data.amount);
					$('#xmzc_d_username').val(data.data.username);
					$('#xmzc_d_ex_time').val(data.data.expense_time);
					$('#xmzc_d_ex_con').val(data.data.expense_content);
				} else {
					console.log(data);
				}
			},
			error: function(data) {},
			async: true
		});
	});

	/*项目计提-查看项目组提成方案*/
	var xmjtfaid;
	$(document).on('click', '#xmjt .plan .check', function() {
		xmjtfaid = $(this).attr('data-id');
		console.log(xmjtfaid);
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Finance/getProjectWorkCommission",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				project_commission_id: xmjtfaid,
			},
			success: function(data) {
				if(data.status == 1) {
					console.log(data);
					var xmjtfa = '';

					for(var i = 0; i < data.data.length; i++) {
						xmjtfa += '<tr>';
						xmjtfa += '		<td>' + (i + 1) + '</td>';
						xmjtfa += '		<td>' + data.data[i].start_time + '</td>';
						xmjtfa += '		<td>' + data.data[i].work_name + '</td>';
						xmjtfa += '		<td>' + data.data[i].username + '</td>';
						xmjtfa += '		<td>' + data.data[i].commission_rate + '</td>';
						xmjtfa += '		<td class="work_plan"><i>已提交</i><span data-id="' + data.data[i].work_id + '">详情</span></td>';
						if(data.data[i].status == 0) {
							xmjtfa += '		<td>未审核</td>';
						} else if(data.data[i].status == 1) {
							xmjtfa += '		<td>已审核</td>';
						} else {
							xmjtfa += '		<td>失败</td>';
						}
						xmjtfa += '</tr>';
					}
					$('#xmjtfa').html(xmjtfa);
				} else {
					console.log(data);
				}
			},
			error: function(data) {},
			async: true
		});
	});

	/*项目计提-查看项目组提成方案详情*/
	$(document).on('click', '#xmjtfa .work_plan span', function() {
		var xmjtxqid = $(this).attr('data-id');
		console.log(xmjtxqid);
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Finance/getProjectStaffCommission",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				project_commission_id: xmjtfaid,
				work_id: xmjtxqid,
			},
			success: function(data) {
				if(data.status == 1) {
					console.log(data);
					$('#xmjtxq_time').val(data.data.info.start_time + '--' + data.data.info.end_time);
					$('#xmjtxq_work_name').val(data.data.info.work_name);
					$('#xmjtxq_username').val(data.data.info.username);
					$('#xmjtxq_rate').val(data.data.info.commission_rate);
					var xmjtxq = '';
					for(var i = 0; i < data.data.list.length; i++) {
						xmjtxq += '<tr>';
						xmjtxq += '	<td>' + (i + 1) + '</td>';
						xmjtxq += '	<td>' + data.data.list[i].username + '</td>';
						xmjtxq += '	<td>' + data.data.list[i].labor + '</td>';
						xmjtxq += '	<td>' + data.data.list[i].content + '</td>';
						xmjtxq += '</tr>';
					}
					$('#xmjtxq_list').html(xmjtxq);
				} else {
					console.log(data);
				}
			},
			error: function(data) {},
			async: true
		});
	});
	/*================*/
	$(document).on("click", ".btn2", function() {
		history.back(-1)
	})
})