$(function() {
	var token = localStorage.getItem("token");
	/*经营统计查看*/
	var dedata1 = {
		status: 0
	}
	var dedata2 = {
		status: 1
	}
	var depp = $('.item_income .item_time');
	searchFun(dedata1, 1, depp);
	searchFun(dedata2, 2, depp);
	$(document).on('click', '.item_content .list_detail tbody tr .handle .check', function() {
		var id = $(this).attr('data-id');
		console.log(id);
		localStorage.setItem('JYTJID', id);
		location.href = 'count_check.html';
	})
	$(".tab .tab_left li").on("click", function() {
		$(this).addClass("active").siblings().removeClass("active");
		var index = $(this).index();
		$(".content_detail .item_finance").hide();
		$(".content_detail .item_finance").eq(index).show();
		if(index == 0) {
			var data1 = {
				status: 0
			}
			var data2 = {
				status: 1
			}
			pp = $('.item_income .item_time');
			searchFun(data1, 1, pp);
			searchFun(data2, 2, pp);
		}
		if(index == 1) {
			var data1 = {
				status: 0
			}
			var data2 = {
				status: 1
			}
			pp1 = $('.program_expend .item_time');
			searchFun1(data1, 1, pp1);
			searchFun1(data2, 2, pp1);
		}
		if(index == 2) {
			var data1 = {
				status: 0
			}
			var data2 = {
				status: 1
			}
			pp2 = $('.item_count .item_time');
			searchFun2(data1, 1, pp2);
			searchFun2(data2, 2, pp2);
		}
		if(index == 3) {
			var data1 = {}
			pp3 = $('.staff_content .staff_time');
			searchFun3(data1, pp3);
		}
		if(index == 4) {
			var data1 = {
				status: 0
			}
			var data2 = {
				status: 1
			}
			pp4 = $('.item_content .item_time');
			searchFun4(data1, 1, pp4);
			searchFun4(data2, 2, pp4);
		}
	})
	//	tab栏切换
	//select选中
	$("select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	})
	//行政支出查看
	$(document).on("click", ".staff_content table .handle .check", function() {
		var i = $(this).attr('data-id');
		console.log(xingzhenginfo.list[i]);
		var ppName = $('.expend_detail');
		ppName.find('.logging_head .n1 input').val(xingzhenginfo.list[i].username);
		ppName.find('.logging_head .n2 input').val(xingzhenginfo.list[i].executive_time);
		ppName.find('.logging_head .n3 input').val(xingzhenginfo.list[i].overhead_type_name);
		ppName.find('.logging_head .n4 input').val(xingzhenginfo.list[i].amount);
		ppName.find('.logging_bottom textarea').text(xingzhenginfo.list[i].executive_content);
		$("#boxPock").show();
		$("#boxPock .expend_detail").show();
	})
	$(document).on("click", "#boxPock .expend_detail .expend_detail_head i,#boxPock .expend_detail .btn2", function() {
		$("#boxPock").hide();
		$("#boxPock .expend_detail").hide();
	})
	//行政支出新增
	$(document).on("click", ".staff_content .staff_add", function() {
		var ppp = $("#boxPock .expend_edit");
		$.ajax({
			type: "post",
			url: host_host_host + "/Home/Finance/getExecutiveType",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {},
			success: function(data) {
				if(data.status == 1) {
					console.log(data);
					var datas = data.data;
					var str = '';
					for(var i = 0; i < datas.length; i++) {
						str += '<option value="' + datas[i].id + '">' + datas[i].name + '</option>';
					}
					ppp.find('.logging_head .type select').html(str);
					ppp.find('.cnt_footer .expend_edit .btn1').click(function() {})
				} else {
					toast(data.msg);
				}
			},
			error: function(data) {

			},
			async: true
		});
		$("#boxPock").show();
		$("#boxPock .expend_edit").show();
	})
	$(document).on("click", "#boxPock .expend_edit .expend_edit_head i,#boxPock .expend_edit .btn2", function() {
		$("#boxPock").hide();
		$("#boxPock .expend_edit").hide();
	})
	$(document).on("click", "#boxPock .expend_edit .btn1", function() {
		var ppp = $(this).parents('.expend_edit');
		$.ajax({
			type: "post",
			url: host_host_host + "/Home/Finance/executiveHandle",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				overhead_type_id: ppp.find('.logging_head .type select').val(),
				user_id: ppp.find('.logging_head .user input').attr('data-id'),
				amount: ppp.find('.logging_head .group input').val(),
				executive_time: Date.parse(new Date(ppp.find('.logging_head .time input').val())) / 1000,
				executive_content: ppp.find('.logging_bottom textarea').val()
			},
			success: function(data) {
				if(data.status == 1) {
					toast(data.msg);
					location.reload();
					$("#boxPock").hide();
					$("#boxPock .expend_edit").hide();
				} else {
					toast(data.msg);
				}
			},
			error: function(data) {

			},
			async: true
		});
	})
	$(".item_edit .item_edit_head i,.item_edit .btn2").on("click", function() {
		$("#boxPock").hide();
		$("#boxPock .item_edit").hide();
	})
	$(document).on('click', '.item_edit .btn1', function() {
		var ppp = $(this).parents('.item_edit');
		var type = ppp.find('.add_stage').attr('data-type');
		if(type == 1) {
			if(ppp.find('#new .stage_header input').val() == '') {
				toast('阶段名不能留空');
				return false;
			}
			if(ppp.find('#new .service input').val() == '') {
				toast('服务内容不能留空');
				return false;
			}
			if(ppp.find('#new .stage_sum input').val() == '') {
				toast('阶段总额不能留空');
				return false;
			}
			if(ppp.find('#new .process textarea').val() == '') {
				toast('过程记录不能留空');
				return false;
			}
			$.ajax({
				type: "post",
				url: host_host_host + "/Home/Finance/addProjectSchedule",
				dataType: 'json',
				headers: {
					accept: "usertoken:" + token,
				},
				data: {
					project_id: xiangmuskid,
					name: ppp.find('#new .stage_header input').val(),
					content: ppp.find('#new .service input').val(),
					money: ppp.find('#new .stage_sum input').val(),
					process: ppp.find('#new .process textarea').val(),
				},
				success: function(data) {
					if(data.status == 1) {
						toast(data.msg);
						$("#boxPock").hide();
						$("#boxPock .item_edit").hide();
					} else {
						toast(data.msg);
					}
				},
				error: function(data) {

				},
				async: true
			});
		} else {
			$("#boxPock").hide();
			$("#boxPock .item_edit").hide();
		}
	})
	//项目收入==============
	//添加收款记录
	var shoukuanJDId;
	$(document).on("click", ".item_edit .process .head_right", function() {
		shoukuanJDId = $(this).attr('data-id');
		$("#boxPock .item_edit").hide();
		$("#boxPock .pay_add #pay_add_one").val('');
		$("#boxPock .pay_add #pay_add_two").val('');
		$("#boxPock .pay_add #pay_add_cont").val('');
		$("#boxPock .pay_add").show()
	})
	$(document).on("click", ".pay_add .pay_add_head i,.pay_add .btn2", function() {
		$("#boxPock .item_edit").show();
		$("#boxPock .pay_add").hide()
	})
	$(document).on("click", ".pay_add .btn1", function() {
		var pp = $(this).parents('.pay_add_bottom');
		var time = Date.parse(new Date(pp.find('#pay_add_one').val())) / 1000;
		var price = pp.find('#pay_add_two').val();
		var cont = pp.find('#pay_add_cont').val();
		console.log(shoukuanJDId, time, price, cont);
		$.ajax({
			headers: {
				accept: 'usertoken:' + localStorage.getItem('token')
			},
			type: "post",
			url: host_host_host + "/Home/Finance/addProjectReceipt",
			dataType: 'json',
			data: {
				schedule_id: shoukuanJDId,
				receive: price,
				cause: cont,
				receive_time: time
			},
			success: function(data) {
				if(data.status == 1) {
					console.log(data);
					toast(data.msg);
					$("#boxPock .pay_add").hide();
					$("#boxPock").hide();
				} else {
					toast(data.msg);
				}
			},
			error: function(data) {

			},
			async: true
		});
	})
	//编辑收款记录
	var editskid;
	var editjdid;
	$(document).on("click", ".item_edit tbody td .edit", function() {
		var time = $(this).parents('td').siblings('td').eq(1).text();
		var cont = $(this).parents('td').siblings('td').eq(2).text();
		var price = $(this).parents('td').siblings('td').eq(3).text();
		console.log(time, cont, price);
		$("#boxPock .pay_edit .header_left input").val(time);
		$("#boxPock .pay_edit .header_right input").val(price);
		$("#boxPock .pay_edit .cnt_bottom textarea").val(cont);
		$("#boxPock .item_edit").hide();
		$("#boxPock .pay_edit").show();
		editskid = $(this).attr('data-id');
		editjdid = $(this).attr('data-jid');
	})
	$(document).on("click", ".pay_edit .pay_edit_head i,.pay_edit .btn2", function() {
		$("#boxPock .item_edit").show();
		$("#boxPock .pay_edit").hide()
	})
	$(document).on("click", ".pay_edit .btn1", function() {
		var ppp = $(this).parents('.pay_edit');
		$.ajax({
			type: "post",
			url: host_host_host + "/Home/Finance/addProjectReceipt",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				schedule_id: editjdid,
				receipt_id: editskid,
				receive: ppp.find('.header_right input').val(),
				cause: ppp.find('.cnt_bottom textarea').val(),
				receive_time: Date.parse(new Date(ppp.find('.header_left  input').val())) / 1000,
			},
			success: function(data) {
				if(data.status == 1) {
					toast(data.msg);
					$("#boxPock .item_edit").show();
					$("#boxPock .pay_edit").hide()
					$("#boxPock .item_edit").hide();
					$("#boxPock").hide();
				} else {
					toast(data.msg);
				}
			},
			error: function(data) {

			},
			async: true
		});

	})
	//项目支出编辑
	//	ddddd
	var editzcxmid;
	var editzcid;
	$(document).on("click", ".item_expend .past_record tbody td .edit", function() {
		var type = $(this).parents('td').siblings('td').eq(1).attr('data-tid');
		var tname = $(this).parents('td').siblings('td').eq(1).text();
		var uid = $(this).parents('td').siblings('td').eq(4).attr('data-tid');
		var uname = $(this).parents('td').siblings('td').eq(4).text();
		var cont = $(this).parents('td').siblings('td').eq(3).text();
		var time = $(this).parents('td').siblings('td').eq(2).text();
		var price = $(this).parents('td').siblings('td').eq(5).text();
		editzcxmid = $(this).parents('td').attr('data-uid');
		editzcid = $(this).parents('td').attr('data-id');
		$.ajax({
			type: "post",
			url: host_host_host + "/Home/Finance/getExpenseType",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {},
			success: function(data) {
				if(data.status == 1) {
					var datas = data.data;
					console.log(datas);
					var str = '';
					for(var i = 0; i < datas.length; i++) {
						str += '<option value="' + datas[i].id + '">' + datas[i].name + '</option>';
					}
					$('.expendEdit .stage_style  select').html(str);
					$('.expendEdit .stage_style  select').val(type);
					$('.expendEdit .stage_style  input').val(tname);
					$('.expendEdit .hand input').val(uname);
					$('.expendEdit .hand input').attr('data-id', uid);
					$('.expendEdit .sum input').val(price);
					$('.expendEdit .account  input').val(time);
					$('.expendEdit .service  input').val(cont);
					console.log($('.expendEdit .stage_style  select').val());
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
		$("#boxPock .item_expend").hide();
		$("#boxPock .expendEdit").show();
	})
	$(document).on("click", ".expendEdit .expendEdit_head i,.expendEdit .btn2", function() {
		$("#boxPock .item_expend").show();
		$("#boxPock .expendEdit").hide();
	})
	$(document).on("click", ".expendEdit .btn1", function() {
		var ppp = $(this).parents('.expendEdit');
		$.ajax({
			type: "post",
			url: host_host_host + "/Home/Finance/expenseHandle",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				project_id: editzcxmid,
				overhead_type_id: ppp.find('.stage_style select').val(),
				user_id: ppp.find('.hand input').attr('data-id'),
				//				user_id: 1,
				amount: ppp.find('.sum input').val(),
				expense_time: Date.parse(new Date(ppp.find('.account input').val())) / 1000,
				expense_content: ppp.find('.service input').val(),
				expense_id: editzcid
			},
			success: function(data) {
				if(data.status == 1) {
					toast(data.msg);
					$("#boxPock").hide();
					$("#boxPock .expendEdit").hide();
				} else {
					toast(data.msg);
				}
			},
			error: function(data) {

			},
			async: true
		});
	})
	//项目收入==============
	//项目支出==============
	//项目支出查看
	var baozhangtype;
	var xiangmuzcId;
	$(document).on("click", ".program_expend .now_expend tbody td .check", function() {
		var id = $(this).attr('data-id');
		xiangmuzcId = id;
		$.ajax({
			headers: {
				accept: 'usertoken:' + localStorage.getItem('token')
			},
			type: "get",
			url: host_host_host + "/Home/Finance/getExpenseType",
			dataType: 'json',
			success: function(data) {
				if(data.status == 1) {
					console.log(data);
					baozhangtype = data.data;
				}
			},
			error: function(data) {

			},
			async: true
		});
		$.ajax({
			headers: {
				accept: 'usertoken:' + localStorage.getItem('token')
			},
			type: "get",
			url: host_host_host + "/Home/Finance/expenseDetails",
			dataType: 'json',
			data: {
				project_id: id
			},
			success: function(data) {
				if(data.status == 1) {
					var datas = data.data;
					console.log(datas);
					var boxName = $('.item_expend');
					boxName.find('.item_name input').val(datas.project_name);
					boxName.find('.item_time input').val(datas.project_time);
					boxName.find('.item_stages input').val(datas.stage);
					boxName.find('.item_sum input').val(datas.expense_amount);
					var str = '';
					for(var i = 0; i < datas.logs.length; i++) {
						str += '<tr class="e9ecf1">';
						str += '	<td>' + (i + 1) + '</td>';
						str += '	<td data-tid="' + datas.logs[i].overhead_type_id + '">' + datas.logs[i].overhead_type_name + '</td>';
						str += '	<td>' + datas.logs[i].expense_time + '</td>';
						str += '	<td>' + datas.logs[i].expense_content + '</td>';
						str += '	<td data-tid="' + datas.logs[i].user_id + '">' + datas.logs[i].username + '</td>';
						str += '	<td>' + datas.logs[i].amount + '</td>';
						str += '	<td data-uid="' + datas.project_id + '" data-id="' + datas.logs[i].expense_id + '" class="handle"><span class="edit">编辑</span></td>';
						str += '</tr>';
					}
					boxName.find('.past_record table tbody').html(str);
					var strtype = '';
					for(var j = 0; j < baozhangtype.length; j++) {
						strtype += '<option value="' + baozhangtype[j].id + '">' + baozhangtype[j].name + '</option>'
					}
					boxName.find('.new_record_bottom select').html(strtype);
					boxName.find('.new_record_bottom .bzlx').val(baozhangtype[0].name);
					boxName.find('.new_record_bottom .bzlx').attr("data-id", baozhangtype[0].id);
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
		$("#boxPock").show();
		$("#boxPock .item_expend").show();
	})
	/*项目支出已完成查看*/
	$(document).on("click", ".program_expend .past_expend tbody td .check", function() {
		var id = $(this).attr('data-id');
		xiangmuzcId = id;
		$.ajax({
			headers: {
				accept: 'usertoken:' + localStorage.getItem('token')
			},
			type: "get",
			url: host_host_host + "/Home/Finance/expenseDetails",
			dataType: 'json',
			data: {
				project_id: id
			},
			success: function(data) {
				if(data.status == 1) {
					var datas = data.data;
					console.log(datas);
					var boxName = $('.item_expend_check');
					boxName.find('.item_name input').val(datas.project_name);
					boxName.find('.item_time input').val(datas.project_time);
					boxName.find('.item_stages input').val(datas.stage);
					boxName.find('.item_sum input').val(datas.expense_amount);
					var str = '';
					for(var i = 0; i < datas.logs.length; i++) {
						str += '<tr>';
						str += '	<td>' + (i + 1) + '</td>';
						str += '	<td data-tid="' + datas.logs[i].overhead_type_id + '">' + datas.logs[i].overhead_type_name + '</td>';
						str += '	<td>' + datas.logs[i].expense_time + '</td>';
						str += '	<td>' + datas.logs[i].expense_content + '</td>';
						str += '	<td data-tid="' + datas.logs[i].user_id + '">' + datas.logs[i].username + '</td>';
						str += '	<td>' + datas.logs[i].amount + '</td>';
						str += '	<td data-uid="' + datas.project_id + '" data-id="' + datas.logs[i].expense_id + '" class="handle"><span class="edit">编辑</span></td>';
						str += '</tr>';
					}
					boxName.find('.past_record table tbody').html(str);;
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
		$("#boxPock").show();
		$("#boxPock .item_expend_check").show();
	})
	/*查看结束*/
	$(document).on("click", ".item_expend .item_expend_head i", function() {
		$("#boxPock").hide();
		$("#boxPock .item_expend").hide();
	})
	$(document).on('click', '.item_expend .btn1', function() {
		var ppp = $(this).parents('.new_record');
		$.ajax({
			type: "post",
			url: host_host_host + "/Home/Finance/expenseHandle",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				project_id: xiangmuzcId,
				overhead_type_id: ppp.find('.stage_style select').val(),
				user_id: ppp.find('.hand input').attr('data-id'),
				amount: ppp.find('.sum input').val(),
				expense_time: Date.parse(new Date(ppp.find('.account input').val())) / 1000,
				expense_content: ppp.find('.service input').val()
			},
			success: function(data) {
				if(data.status == 1) {
					toast(data.msg);
					$("#boxPock").hide();
					$("#boxPock .item_expend").hide();
				} else {
					toast(data.msg);
				}
			},
			error: function(data) {

			},
			async: true
		});
	})
	//项目支出历史查看
	$(document).on("click", ".program_expend .past_expend tbody td .check", function() {
		$("#boxPock").show();
		$("#boxPock .item_expend_check").show();
	})
	$(document).on("click", ".item_expend_check .expend_check_head i,.item_expend_check .btn2", function() {
		$("#boxPock").hide();
		$("#boxPock .item_expend_check").hide();
	})
	//项目支出==============
	//项目计提==============
	//进行中项目计提查看
	$(document).on("click", ".item_count .now_count tbody td .check", function() {
		var id = $(this).attr('data-id');
		jiti(id);
	})

	function jiti(id, cid) {
		//wly 加的一行
		//$("#oror").data('id',cid);
		//alert($("#oror").data('id'))
		$.ajax({
			headers: {
				accept: 'usertoken:' + localStorage.getItem('token')
			},
			type: "get",
			url: host_host_host + "/Home/Finance/commissionDetails",
			dataType: 'json',
			data: {
				project_id: id,
				project_child_id: cid
			},
			success: function(data) {
				if(data.status == 1) {
					console.log(data);
					var datas = data.data;
					var boxName = $('.countDetail');
					var strul = '';
					for(var i = 0; i < datas.project_child_info.length; i++) {
						if(datas.project_child_info[i].is_current) {
							strul += '<li class="active" data-id="' + datas.project_child_info[i].project_child_id + '">';
							boxName.find('.floor_right span').html(datas.project_child_info[i].project_child_name);
						} else {
							strul += '<li data-id="' + datas.project_child_info[i].project_child_id + '">';
						}
						strul += '	<a href="#">' + datas.project_child_info[i].project_child_name + '</a>';
						strul += '</li>';
					}
					boxName.find('.floor_ul').html(strul);
					boxName.find('.count_cnt .n1 input').val(datas.project_info.project_name);
					boxName.find('.count_cnt .n2 input').val(datas.project_info.project_time);
					boxName.find('.count_cnt .n3 input').val(datas.project_info.stage);
					boxName.find('.count_cnt .n4 input').val(datas.project_info.total_commission);
					boxName.find('.count_cnt .n5 input').val(datas.project_info.director_name);
					//					boxName.find('.count_cnt .n6 .check ').html('data-id');
					var cci = datas.project_child_info[0].project_child_id;
					if(cid)
					;
					else
						cid = cci;

					boxName.find('.count_cnt .n6 .check ').attr('data-id', cid);
					if(datas.current_project_commission) {
						boxName.find('.count_cnt .n7 input').val(datas.current_project_commission.start_time);
						boxName.find('.count_cnt .n8 input').val(datas.current_project_commission.amount);
						boxName.find('.count_cnt .n9 input').val(datas.current_project_commission.supervisor_rate);
						boxName.find('.count_cnt .n10 input').val(datas.current_project_commission.group_rate);
						if(datas.current_project_commission.is_submit == 0) {
							boxName.find('.count_cnt .n11 .submit').html('未提交');
						} else {
							boxName.find('.count_cnt .n11 .submit').html('已提交');
						}
						boxName.find('.count_cnt .n11 .check').attr('data-id', datas.current_project_commission.project_commission_id);
					} else {
						//						boxName.find('.count_go').hide();
					}
					var strhis = '';
					for(var i = 0; i < datas.history_project_commission.length; i++) {
						strhis += '<tr>';
						strhis += '	<td>' + (i + 1) + '</td>';
						strhis += '	<td>' + datas.history_project_commission[i].start_time + '-' + datas.history_project_commission[i].end_time + '</td>';
						strhis += '	<td>' + datas.history_project_commission[i].amount + '</td>';
						strhis += '	<td>项目主管：<i>' + datas.history_project_commission[i].supervisor_rate + '</i>&nbsp;项目组：<i>' + datas.history_project_commission[i].group_rate + '</i></td>';
						strhis += '	<td><span class="check">查看</span></td>';
						strhis += '	<td class="handle"><span class="edit">编辑</span></td>';
						strhis += '</tr>';
					}
					boxName.find('.histroy_count tbody').html(strhis);
					$("#boxPock").show();
					$("#boxPock .countDetail").show();
					//楼号切换
					boxName.find('.floor_ul li').on("click", function() {
						$(this).addClass("active").siblings().removeClass("active");
						var txt = $(this).find("a").text();
						$(".floor_right span").text(txt);
						var ccid = $(this).attr('data-id');
						jiti(id, ccid);
					})
				} else {
					toast(data.msg);
				}
			},
			error: function(data) {

			},
			async: true
		});
	}
	$(document).on("click", ".countDetail .countDetail_head i,.countDetail .btn1,.countDetail .btn2", function() {
		$("#boxPock").hide();
		$("#boxPock .countDetail").hide();
	})
	//历史计提查看
	$(document).on("click", ".item_count .past_count tbody td .check", function() {
		$("#boxPock").show();
		$("#boxPock .his_count").show();
	})
	$(document).on("click", ".his_count .his_count_head i,.his_count .btn2", function() {
		$("#boxPock").hide();
		$("#boxPock .his_count").hide();
	})
	$(document).on("click", ".his_count .floor_ul li", function() {
		$(this).addClass("active").siblings().removeClass("active");
		var txt = $(this).find("a").text();
		$(".floor_right span").text(txt);
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
	//历史项目计提查看
	$(document).on("click", ".his_count table tbody .edit", function() {
		$("#boxPock .his_count").hide();
		$("#boxPock .count_detail").show();
	})
	$(document).on("click", ".count_detail_head i,.count_detail .btn2", function() {
		$("#boxPock .his_count").show();
		$("#boxPock .count_detail").hide();
	})
	//项目组楼号切换
	$(".count_floor .floor_cnt_ul li").on("click", function() {
		$(this).addClass("active").siblings().removeClass("active");
		var txt = $(this).find("a").text();
		$(".floor_top span").text(txt)
	})
	//成员管理
	var countNum;
	$(document).on("click", ".countDetail_bottom .count_cnt .left .check_one", function() {
		$(".countDetail").hide();
		$(".count_floor").show();
		countNum = 1;
	})
	$(document).on("click", ".his_count_bottom .count_cnt .left .check_one", function() {
		$(".his_count").hide();
		$(".count_floor").show();
		countNum = 2;
	})
	$(document).on("click", ".count_floor .count_floor_head i,.count_floor .btn1,.count_floor .btn2", function() {
		if(countNum == 1) {
			$(".countDetail").show();
			$(".count_floor").hide();
		} else {
			$(".his_count").show();
			$(".count_floor").hide();
		}
	})
	//方案详情
	var planNum;
	$(document).on("click", ".countDetail tbody td .check", function() {
		$("#boxPock .countDetail").hide();
		$("#boxPock .item_plan").show();
	})
	$(document).on("click", ".his_count tbody td .check", function() {
		$("#boxPock .his_count").hide();
		$("#boxPock .his_plan").show();
	})
	$(document).on("click", ".item_plan .item_plan_head i,.item_plan .btn1,.item_plan .btn2,.item_plan .btn3", function() {
		$("#boxPock .countDetail").show();
		$("#boxPock .item_plan").hide();
	})
	$(document).on("click", ".his_plan .his_plan_head i,.his_plan .btn2", function() {
		$("#boxPock .his_count").show();
		$("#boxPock .his_plan").hide();
	})

	//已提交方案详情
	$(document).on("click", ".item_plan tbody .detail", function() {

		//$(".item_plan tbody .detail").on("click", function() {
		$("#boxPock .item_plan").hide();
		$("#boxPock .worker_style").show();
		planNum = 1;
	})
	$(document).on("click", ".his_plan tbody .detail", function() {

		//$(".his_plan tbody .detail").on("click", function() {
		$("#boxPock .his_plan").hide();
		$("#boxPock .worker_style").show();
		planNum = 2;
	})
	//工种分工关闭
	$(".worker_style .worker_style_head i,.worker_style .btn2").on("click", function() {
		if(planNum == 1) {
			$("#boxPock .item_plan").show();
			$("#boxPock .worker_style").hide();
		} else {
			$("#boxPock .his_plan").show();
			$("#boxPock .worker_style").hide();
		}
	})
	//进行时的方案详情
	/*未完成*/
	$(document).on("click", ".countDetail_bottom .count_cnt .count_go .status .check", function() {
		var id = $(this).attr('data-id');
		$.ajax({
			headers: {
				accept: 'usertoken:' + localStorage.getItem('token')
			},
			type: "get",
			url: host_host_host + "/Home/Finance/getProjectWorkCommission",
			dataType: 'json',
			data: {
				project_commission_id: id
			},
			success: function(data) {
				if(data.status == 1) {
					console.log(data);
					var datas = data.data;
					var str = '';
					for(var i = 0; i < datas.length; i++) {
						str += '<tr>';
						str += '	<td>' + (i + 1) + '</td>';
						str += '	<td>建筑</td>';
						str += '	<td>建筑</td>';
						str += '	<td>建筑</td>';
						str += '	<td>2017-03-04</td>';
						str += '	<td>一直努力的工作</td>';
						str += '	<td class="sub"><span class="submit">已提交</span><span class="detail">详情</span></td>';
						str += '	<td class="handle"><span class="check">审核</span><span class="hascheck">已审核</span></td>';
						str += '</tr>';
					}
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
		$(".countDetail").hide();
		$(".item_plan").show();
	})
	//项目计提======

	//增加阶段
	var addstage;
	var xiangmuskid;
	//项目收入========
	$(document).on("click", ".item_income .now_detail tbody td .check", function() {
		var id = $(this).attr('data-id');
		xiangmuskid = id;
		$.ajax({
			headers: {
				accept: 'usertoken:' + localStorage.getItem('token')
			},
			type: "get",
			url: host_host_host + "/Home/Finance/projectReceiptDetails",
			dataType: 'json',
			data: {
				project_id: id
			},
			success: function(data) {
				if(data.status == 1) {
					console.log(data);
					var datas = data.data;
					var boxName = $('.item_edit');
					boxName.find('.item_name input').val(datas.project_name);
					boxName.find('.item_time input').val(datas.project_time);
					boxName.find('.item_stages input').val(datas.project_stage);
					boxName.find('.item_sum input').val(datas.project_money);
					var str = '';
					for(var i = 0; i < datas.child.length; i++) {
						str += '<div class="bigstage first_stage">';
						str += '	<div class="stage_header">';
						str += '		<input type="text" value="' + datas.child[i].schedule_name + '" disabled="disabled" />';
						str += '	</div>';
						str += '	<div class="stage_bottom">';
						str += '		<div class="service_content clearfix">';
						str += '			<div class="service">';
						str += '				<div class="service_left">服务内容：</div>';
						str += '				<input type="text" value="' + datas.child[i].content + '" disabled="disabled" />';
						str += '			</div>';
						str += '			<div class="stage_sum">';
						str += '				<div class="stage_sum_left">阶段总额：</div>';
						str += '				<input type="text" value="' + datas.child[i].money + '" disabled="disabled" />';
						str += '			</div>';
						str += '			<div class="pay">';
						str += '				<div class="pay_left">已收款：</div>';
						str += '				<input type="text" value="' + datas.child[i].receive + '" disabled="disabled" />';
						str += '			</div>';
						str += '			<div class="nopay">';
						str += '				<div class="nopay_left">未收款：</div>';
						str += '				<input type="text" value="' + datas.child[i].debt + '" disabled="disabled" />';
						str += '			</div>';
						str += '		</div>';
						str += '		<div class="table">';
						str += '			<table border="1" cellspacing="0">';
						str += '				<thead>';
						str += '					<tr>';
						str += '						<td class="orderlist">序号</td>';
						str += '						<td class="settime">时间</td>';
						str += '						<td class="style">事由</td>';
						str += '						<td class="sum">金额</td>';
						str += '						<td class="handle">操作</td>';
						str += '					</tr>';
						str += '				</thead>';
						str += '				<tbody>';
						for(var j = 0; j < datas.child[i].receipt_log.length; j++) {
							str += '					<tr>';
							str += '						<td>' + (j + 1) + '</td>';
							str += '						<td>' + datas.child[i].receipt_log[j].receive_time + '</td>';
							str += '						<td>' + datas.child[i].receipt_log[j].cause + '</td>';
							str += '						<td>' + datas.child[i].receipt_log[j].receive + '</td>';
							str += '						<td class="handle"><span data-jid="' + datas.child[i].schedule_id + '" data-id="' + datas.child[i].receipt_log[j].receipt_id + '" class="edit">编辑</span></td>';
							str += '					</tr>';
						}
						str += '				</tbody>';
						str += '			</table>';
						str += '		</div>';
						str += '		<div class="process">';
						str += '			<div class="process_head">';
						str += '				<div class="head_left">过程记录</div>';
						str += '				<div class="head_right" data-id="' + datas.child[i].schedule_id + '">添加收款记录</div>';
						str += '			</div>';
						str += '			<textarea name="" rows="" cols="" disabled="disabled">' + datas.child[i].process + '</textarea>';
						str += '		</div>';
						str += '	</div>';
						str += '</div>';
					}
					boxName.find('.stage').html(str);
					$('.item_edit .add_stage').attr('data-type', 0);
					var editName = $('.item_editDetail');
					editName.find('.item_name input').val(datas.project_name);
					editName.find('.item_time input').val(datas.project_time);
					editName.find('.item_stages input').val(datas.project_stage);
					editName.find('.item_sum input').val(datas.project_money);
					var str1 = '';
					for(var i = 0; i < datas.child.length; i++) {
						str1 += '<div class="bigstage first_stage" data-id="' + datas.child[i].schedule_id + '">';
						str1 += '	<div class="stage_header">';
						str1 += '		<input type="text" value="' + datas.child[i].schedule_name + '" />';
						str1 += '	</div>';
						str1 += '	<div class="stage_bottom">';
						str1 += '		<div class="service_content clearfix">';
						str1 += '			<div class="service">';
						str1 += '				<div class="service_left">服务内容：</div>';
						str1 += '				<input type="text" value="' + datas.child[i].content + '"  />';
						str1 += '			</div>';
						str1 += '			<div class="stage_sum">';
						str1 += '				<div class="stage_sum_left">阶段总额：</div>';
						str1 += '				<input type="text" value="' + datas.child[i].money + '"  />';
						str1 += '			</div>';
						str1 += '			<div class="pay">';
						str1 += '				<div class="pay_left">已收款：</div>';
						str1 += '				<input type="text" value="' + datas.child[i].receive + '" disabled="disabled" />';
						str1 += '			</div>';
						str1 += '			<div class="nopay">';
						str1 += '				<div class="nopay_left">未收款：</div>';
						str1 += '				<input type="text" value="' + datas.child[i].debt + '" disabled="disabled" />';
						str1 += '			</div>';
						str1 += '		</div>';
						str1 += '		<div class="table">';
						str1 += '			<table border="1" cellspacing="0">';
						str1 += '				<thead>';
						str1 += '					<tr>';
						str1 += '						<td class="orderlist">序号</td>';
						str1 += '						<td class="settime">时间</td>';
						str1 += '						<td class="style">事由</td>';
						str1 += '						<td class="sum">金额</td>';
						str1 += '					</tr>';
						str1 += '				</thead>';
						str1 += '				<tbody>';
						for(var j = 0; j < datas.child[i].receipt_log.length; j++) {
							str1 += '					<tr>';
							str1 += '						<td>' + (j + 1) + '</td>';
							str1 += '						<td>' + datas.child[i].receipt_log[j].receive_time + '</td>';
							str1 += '						<td>' + datas.child[i].receipt_log[j].cause + '</td>';
							str1 += '						<td>' + datas.child[i].receipt_log[j].receive + '</td>';
							str1 += '					</tr>';
						}
						str1 += '				</tbody>';
						str1 += '			</table>';
						str1 += '		</div>';
						str1 += '		<div class="process">';
						str1 += '			<div class="process_head">';
						str1 += '				<div class="head_left">过程记录</div>';
						str1 += '			</div>';
						str1 += '			<textarea name="" rows="" cols="" disabled="disabled">' + datas.child[i].process + '</textarea>';
						str1 += '		</div>';
						str1 += '	</div>';
						str1 += '</div>';
					}
					editName.find('.stage').html(str1);
				} else {
					toast(data.msg);
				}
			},
			error: function(data) {

			},
			async: true
		});
		$("#boxPock").show();
		$("#boxPock .item_edit").show();
	})
	/*项目收入已完成查看*/
	$(document).on("click", ".item_income .past_detail tbody td .check", function() {
		var id = $(this).attr('data-id');
		xiangmuskid = id;
		$.ajax({
			headers: {
				accept: 'usertoken:' + localStorage.getItem('token')
			},
			type: "get",
			url: host_host_host + "/Home/Finance/projectReceiptDetails",
			dataType: 'json',
			data: {
				project_id: id
			},
			success: function(data) {
				if(data.status == 1) {
					console.log(data);
					var datas = data.data;
					var boxName = $('.item_check');
					boxName.find('.item_name input').val(datas.project_name);
					boxName.find('.item_time input').val(datas.project_time);
					boxName.find('.item_stages input').val(datas.project_stage);
					boxName.find('.item_sum input').val(datas.project_money);
					var str = '';
					for(var i = 0; i < datas.child.length; i++) {
						str += '<div class="bigstage first_stage">';
						str += '	<div class="stage_header">';
						str += '		<input type="text" value="' + datas.child[i].schedule_name + '" disabled="disabled" />';
						str += '	</div>';
						str += '	<div class="stage_bottom">';
						str += '		<div class="service_content clearfix">';
						str += '			<div class="service">';
						str += '				<div class="service_left">服务内容：</div>';
						str += '				<input type="text" value="' + datas.child[i].content + '" disabled="disabled" />';
						str += '			</div>';
						str += '			<div class="stage_sum">';
						str += '				<div class="stage_sum_left">阶段总额：</div>';
						str += '				<input type="text" value="' + datas.child[i].money + '" disabled="disabled" />';
						str += '			</div>';
						str += '			<div class="pay">';
						str += '				<div class="pay_left">已收款：</div>';
						str += '				<input type="text" value="' + datas.child[i].receive + '" disabled="disabled" />';
						str += '			</div>';
						str += '			<div class="nopay">';
						str += '				<div class="nopay_left">未收款：</div>';
						str += '				<input type="text" value="' + datas.child[i].debt + '" disabled="disabled" />';
						str += '			</div>';
						str += '		</div>';
						str += '		<div class="table">';
						str += '			<table border="1" cellspacing="0">';
						str += '				<thead>';
						str += '					<tr>';
						str += '						<td class="orderlist">序号</td>';
						str += '						<td class="settime">时间</td>';
						str += '						<td class="style">事由</td>';
						str += '						<td class="sum">金额</td>';
						str += '					</tr>';
						str += '				</thead>';
						str += '				<tbody>';
						for(var j = 0; j < datas.child[i].receipt_log.length; j++) {
							str += '					<tr>';
							str += '						<td>' + (j + 1) + '</td>';
							str += '						<td>' + datas.child[i].receipt_log[j].receive_time + '</td>';
							str += '						<td>' + datas.child[i].receipt_log[j].cause + '</td>';
							str += '						<td>' + datas.child[i].receipt_log[j].receive + '</td>';
							str += '					</tr>';
						}
						str += '				</tbody>';
						str += '			</table>';
						str += '		</div>';
						str += '		<div class="process">';
						str += '			<textarea name="" rows="" cols="" disabled="disabled">' + datas.child[i].process + '</textarea>';
						str += '		</div>';
						str += '	</div>';
						str += '</div>';
					}
					boxName.find('.stage').html(str);
				} else {
					toast(data.msg);
				}
			},
			error: function(data) {

			},
			async: true
		});
		$("#boxPock").show();
		$("#boxPock .item_check").show();
	})
	//项目收入历史记录
	$(document).on("click", ".item_income .past_detail tbody td .check", function() {
		$("#boxPock").show();
		$("#boxPock .item_check").show();
	})
	$(document).on("click", ".item_check .item_check_head i,.item_check .btn2", function() {
		$("#boxPock").hide();
		$("#boxPock .item_check").hide();
	})
	//增加阶段
	$(document).on("click", ".item_edit .add_stage", function() {
		var type = $(this).attr('data-type');
		if(type == 1) {
			toast('请先完成阶段编辑');
			return false;
		}
		addstage = "";
		addstage += '<div class="bigstage" id="new">';
		addstage += '<div class="stage_header">';
		addstage += '<input type="text" placeholder="请输入阶段名"/>';
		addstage += '</div>';
		addstage += '<div class="stage_bottom">';
		addstage += '<div class="service_content clearfix">';
		addstage += '<div class="service">';
		addstage += '<div class="service_left">服务内容：</div>';
		addstage += '<input type="text" placeholder="请输入服务内容" />';
		addstage += '</div>';
		addstage += '<div class="stage_sum">';
		addstage += '<div class="stage_sum_left">阶段总额：</div>';
		addstage += '<input type="text" placeholder="请输入阶段总额" />';
		addstage += '</div>';
		addstage += '</div>';
		addstage += '<div class="process" style="margin-top:15px;">';
		addstage += '<div class="process_head">';
		addstage += '<div class="head_left">过程记录</div>';

		addstage += '</div>';
		addstage += '<textarea name="" rows="" cols="" placeholder="请输入过程记录"></textarea>';
		addstage += '</div>';
		addstage += '</div>';
		addstage += '</div>';
		$(".item_edit .stage").append(addstage);
		$(this).attr('data-type', '1');

	})
	/*项目收入编辑*/
	$(document).on("click", ".item_edit .bianji", function() {
		$("#boxPock .item_edit").hide();
		$("#boxPock .item_editDetail").show();
	})
	$(document).on("click", ".item_editDetail_head i,.item_editDetail .btn2", function() {
		$("#boxPock .item_edit").show();
		$("#boxPock .item_editDetail").hide();
	});
	$(document).on('click', '.item_editDetail .btn1', function() {
		var child = [];
		var obj = {};
		var ppp = $(this).parents('.item_editDetail');
		ppp.find('.stage .bigstage').each(function() {
			obj = {
				schedule_id: $(this).attr('data-id'),
				name: $(this).find('.stage_header input').val(),
				content: $(this).find('.service input').val(),
				money: $(this).find('.stage_sum input').val()
			}
			child.push(obj);
		})
		console.log(child);
		var id = xiangmuskid;
		$.ajax({
			type: "post",
			url: host_host_host + "/Home/Finance/editProjectSchedule",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				project_id: id,
				money: ppp.find('.item_sum input').val(),
				child: child
			},
			success: function(data) {
				if(data.status == 1) {
					console.log(data);
					toast(data.msg)
					setTimeout(function() {
						$(".item_editDetail").hide();
						$(".item_edit").show();
					}, 1000)
				} else {
					console.log(data);
				}
			},
			error: function(data) {

			},
			async: true
		});

	})
	/*搜索*/
	/*项目收入*/
	var page1 = 1;
	var page2 = 1;
	var data1 = {};
	var data2 = {};
	var pp, type, pname, star, end;
	$(document).on('click', '.item_income .search', function() {
		pp = $(this).parents('.item_time');
		type = pp.find('.timeover select').val();
		pname = pp.find('.staff_search input').val();
		star = Date.parse(new Date(pp.find('#income_one').val())) / 1000;
		end = Date.parse(new Date(pp.find('#income_two').val())) / 1000;
		console.log(type, pname, star, end);
		data1 = {
			status: 0,
			start_time: star,
			end_time: end,
			type: type,
			project_name: pname,
			page: page1
		}
		data2 = {
			status: 1,
			start_time: star,
			end_time: end,
			type: type,
			project_name: pname,
			page: page2
		}
		searchFun(data1, 1, pp);
		searchFun(data2, 2, pp);
	})
	$(document).on('click', '.item_income .now_detail .paging .page_right .less', function() {
		var all = $(this).siblings('.total_num').text();
		pp = $('.item_income .item_time');
		var p = Number($(this).siblings('.number').text());
		page1 = p;
		if(p > 1) {
			page1--;
			data1 = {
				status: 0,
				start_time: star,
				end_time: end,
				type: type,
				project_name: pname,
				page: page1
			}
			searchFun(data1, 1, pp);
		}
	})
	$(document).on('click', '.item_income .now_detail .paging .page_right .more', function() {
		var all = $(this).siblings('.total_num').text();
		pp = $('.item_income .item_time');
		var p = Number($(this).siblings('.number').text());
		page1 = p;
		if(p < all) {
			page1++;
			data1 = {
				status: 0,
				start_time: star,
				end_time: end,
				type: type,
				project_name: pname,
				page: page1
			}
			searchFun(data1, 1, pp);
		}
	})
	$(document).on('click', '.item_income .past_detail .paging .page_right .less', function() {
		var all = $(this).siblings('.total_num').text();
		pp = $('.item_income .item_time');
		var p = Number($(this).siblings('.number').text());
		page2 = p;
		if(p > 1) {
			page2--;
			data2 = {
				status: 0,
				start_time: star,
				end_time: end,
				type: type,
				project_name: pname,
				page: page2
			}
			searchFun(data1, 2, pp);
		}
	})
	$(document).on('click', '.item_income .past_detail .paging .page_right .more', function() {
		var all = $(this).siblings('.total_num').text();
		pp = $('.item_income .item_time');
		var p = Number($(this).siblings('.number').text());
		page2 = p;
		if(p > 1) {
			page2--;
			data2 = {
				status: 0,
				start_time: star,
				end_time: end,
				type: type,
				project_name: pname,
				page: page2
			}
			searchFun(data2, 2, pp);
		}
	})
	/*项目收入*/
	function searchFun(datas, ing, pp) {
		console.log(pp);
		$.ajax({
			headers: {
				accept: 'usertoken:' + localStorage.getItem('token')
			},
			type: "get",
			url: host_host_host + "/Home/Finance/projectReceipt",
			dataType: 'json',
			data: datas,
			success: function(data) {
				if(data.status == 1) {
					if(ing == 1) {
						var datas = data.data;
						console.log(data, 1);
						pp.parents('.item_income').find('.now_detail .paging .page_left span').html(datas.count);
						pp.parents('.item_income').find('.now_detail .paging .page_right .number').html(page1);
						pp.parents('.item_income').find('.now_detail .paging .page_right .total_num').html(datas.totalPage);
						var str = '';
						for(var i = 0; i < datas.list.length; i++) {
							str += '<tr>';
							str += '	<td>' + (i + 1) + '</td>';
							str += '	<td><a href="index.html?project_id=' + datas.list[i].project_id + '">' + datas.list[i].project_name + '</a></td>';
							str += '	<td>' + datas.list[i].project_money + '</td>';
							str += '	<td>' + datas.list[i].stage + '</td>';
							str += '	<td>' + datas.list[i].receive + '</td>';
							str += '	<td>' + datas.list[i].debt + '</td>';
							str += '	<td>' + datas.list[i].process + '</td>';
							str += '	<td>' + datas.list[i].project_time + '</td>';
							str += '	<td class="handle"><span class="check" data-id="' + datas.list[i].project_id + '">查看</span></td>';
							str += '</tr>';
						}
						pp.parents('.item_income').find('.now_detail tbody').html(str);
					}
					if(ing == 2) {
						var datas = data.data;
						console.log(data, 2);
						pp.parents('.item_income').find('.past_detail .paging .page_left span').html(datas.count);
						pp.parents('.item_income').find('.past_detail .paging .page_right .number').html(page2);
						pp.parents('.item_income').find('.past_detail .paging .page_right .total_num').html(datas.totalPage);
						var str = '';
						for(var i = 0; i < datas.list.length; i++) {
							str += '<tr>';
							str += '	<td>' + (i + 1) + '</td>';
							str += '	<td><a href="index.html?project_id=' + datas.list[i].project_id + '">' + datas.list[i].project_name + '</a></td>';
							str += '	<td>' + datas.list[i].project_money + '</td>';
							str += '	<td>' + datas.list[i].stage + '</td>';
							str += '	<td>' + datas.list[i].receive + '</td>';
							str += '	<td>' + datas.list[i].debt + '</td>';
							str += '	<td>' + datas.list[i].process + '</td>';
							str += '	<td>' + datas.list[i].project_time + '</td>';
							str += '	<td class="handle"><span class="check" data-id="' + datas.list[i].project_id + '">查看</span></td>';
							str += '</tr>';
						}
						pp.parents('.item_income').find('.past_detail tbody').html(str);
					}
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	}
	/*项目支出*/
	var page3 = 1;
	var page4 = 1;
	var data3 = {};
	var data4 = {};
	var pp1, type1, pname1, star1, end1;
	$(document).on('click', '.program_expend .search', function() {
		pp1 = $(this).parents('.item_time');
		type1 = pp1.find('.timeover select').val();
		pname1 = pp1.find('.staff_search input').val();
		star1 = Date.parse(new Date(pp1.find('#income_one').val())) / 1000;
		end1 = Date.parse(new Date(pp1.find('#income_two').val())) / 1000;
		data3 = {
			status: 0,
			start_time: star1,
			end_time: end1,
			type: type1,
			project_name: pname1,
			page: page3
		}
		data4 = {
			status: 1,
			start_time: star1,
			end_time: end1,
			type: type1,
			project_name: pname1,
			page: page4
		}
		searchFun1(data3, 1, pp1);
		searchFun1(data4, 2, pp1);
	})
	$(document).on('click', '.program_expend .now_expend .paging .page_right .less', function() {
		var all = $(this).siblings('.total_num').text();
		var p = Number($(this).siblings('.number').text());
		page3 = p;
		if(p > 1) {
			page3--;
			data3 = {
				status: 0,
				start_time: star1,
				end_time: end1,
				type: type1,
				project_name: pname1,
				page: page3
			}
			searchFun1(data3, 1, pp1);
		}
	})
	$(document).on('click', '.program_expend .now_expend .paging .page_right .more', function() {
		var all = $(this).siblings('.total_num').text();
		var p = Number($(this).siblings('.number').text());
		page3 = p;
		if(p < all) {
			page3++;
			data3 = {
				status: 0,
				start_time: star1,
				end_time: end1,
				type: type1,
				project_name: pname1,
				page: page3
			}
			searchFun1(data3, 1, pp1);
		}
	})
	$(document).on('click', '.program_expend .past_expend .paging .page_right .less', function() {
		var all = $(this).siblings('.total_num').text();
		var p = Number($(this).siblings('.number').text());
		page4 = p;
		if(p > 1) {
			page4--;
			data4 = {
				status: 0,
				start_time: star1,
				end_time: end1,
				type: type1,
				project_name: pname1,
				page: page4
			}
			searchFun1(data4, 2, pp1);
		}
	})
	$(document).on('click', '.program_expend .past_expend .paging .page_right .more', function() {
		var all = $(this).siblings('.total_num').text();
		var p = Number($(this).siblings('.number').text());
		page4 = p;
		if(p > 1) {
			page4--;
			data4 = {
				status: 0,
				start_time: star,
				end_time: end,
				type: type,
				project_name: pname,
				page: page4
			}
			searchFun1(data4, 2, pp1);
		}
	})

	function searchFun1(datas, ing, pp) {
		$.ajax({
			headers: {
				accept: 'usertoken:' + localStorage.getItem('token')
			},
			type: "get",
			url: host_host_host + "/Home/Finance/expenseList",
			dataType: 'json',
			data: datas,
			success: function(data) {
				if(data.status == 1) {
					if(ing == 1) {
						var datas = data.data;
						console.log(data, 1);
						pp.parents('.program_expend').find('.now_expend .paging .page_left span').html(datas.count);
						pp.parents('.program_expend').find('.now_expend .paging .page_right .number').html(page3);
						pp.parents('.program_expend').find('.now_expend .paging .page_right .total_num').html(datas.totalPage);
						var str = '';
						for(var i = 0; i < datas.list.length; i++) {
							str += '<tr>';
							str += '	<td>' + (i + 1) + '</td>';
							str += '	<td><a href="index.html?project_id=' + datas.list[i].project_id + '">' + datas.list[i].project_name + '</a></td>';
							str += '	<td>' + datas.list[i].total + '</td>';
							str += '	<td>' + datas.list[i].expense_time + '</td>';
							str += '	<td>' + datas.list[i].project_time + '</td>';
							str += '	<td class="handle"><span class="check" data-id="' + datas.list[i].project_id + '">查看</span></td>';
							str += '</tr>';
						}
						pp.parents('.program_expend').find('.now_expend tbody').html(str);
					}
					if(ing == 2) {
						var datas = data.data;
						console.log(data, 2);
						pp.parents('.program_expend').find('.past_expend .paging .page_left span').html(datas.count);
						pp.parents('.program_expend').find('.past_expend .paging .page_right .number').html(page4);
						pp.parents('.program_expend').find('.past_expend .paging .page_right .total_num').html(datas.totalPage);
						var str = '';
						for(var i = 0; i < datas.list.length; i++) {
							str += '<tr>';
							str += '	<td>' + (i + 1) + '</td>';
							str += '	<td><a href="index.html?project_id=' + datas.list[i].project_id + '">' + datas.list[i].project_name + '</a></td>';
							str += '	<td>' + datas.list[i].total + '</td>';
							str += '	<td>' + datas.list[i].expense_time + '</td>';
							str += '	<td>' + datas.list[i].project_time + '</td>';
							str += '	<td class="handle"><span class="check" data-id="' + datas.list[i].project_id + '">查看</span></td>';
							str += '</tr>';
						}
						pp.parents('.program_expend').find('.past_expend tbody').html(str);
					}
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	}
	/*项目计提*/
	var page5 = 1;
	var page6 = 1;
	var data5 = {};
	var data6 = {};
	var pp2, type2, pname2, star2, end2;
	$(document).on('click', '.item_count .search', function() {
		pp2 = $(this).parents('.item_time');
		type2 = pp2.find('.timeover select').val();
		pname2 = pp2.find('.staff_search input').val();
		star2 = Date.parse(new Date(pp2.find('#income_one').val())) / 1000;
		end2 = Date.parse(new Date(pp2.find('#income_two').val())) / 1000;
		data5 = {
			status: 0,
			start_time: star2,
			end_time: end2,
			type: type2,
			project_name: pname2,
			page: page5
		}
		data6 = {
			status: 1,
			start_time: star2,
			end_time: end2,
			type: type2,
			project_name: pname2,
			page: page6
		}
		searchFun2(data5, 1, pp2);
		searchFun2(data6, 2, pp2);
	})
	$(document).on('click', '.item_count .now_count .paging .page_right .less', function() {
		var all = $(this).siblings('.total_num').text();
		var p = Number($(this).siblings('.number').text());
		page5 = p;
		if(p > 1) {
			page5--;
			data5 = {
				status: 0,
				start_time: star2,
				end_time: end2,
				type: type2,
				project_name: pname2,
				page: page5
			}
			searchFun2(data5, 1, pp2);
		}
	})
	$(document).on('click', '.item_count .now_count .paging .page_right .more', function() {
		var all = $(this).siblings('.total_num').text();
		var p = Number($(this).siblings('.number').text());
		page5 = p;
		if(p < all) {
			page5++;
			data5 = {
				status: 0,
				start_time: star2,
				end_time: end2,
				type: type2,
				project_name: pname2,
				page: page5
			}
			searchFun2(data5, 1, pp2);
		}
	})
	$(document).on('click', '.item_count .past_count .paging .page_right .less', function() {
		var all = $(this).siblings('.total_num').text();
		var p = Number($(this).siblings('.number').text());
		page6 = p;
		if(p > 1) {
			page6--;
			data6 = {
				status: 0,
				start_time: star2,
				end_time: end2,
				type: type2,
				project_name: pname2,
				page: page6
			}
			searchFun2(data6, 2, pp2);
		}
	})
	$(document).on('click', '.item_count .past_count .paging .page_right .more', function() {
		var all = $(this).siblings('.total_num').text();
		var p = Number($(this).siblings('.number').text());
		page6 = p;
		if(p > 1) {
			page6--;
			data6 = {
				status: 0,
				start_time: star2,
				end_time: end2,
				type: type2,
				project_name: pname2,
				page: page6
			}
			searchFun2(data6, 2, pp2);
		}
	})

	function searchFun2(datas, ing, pp) {
		$.ajax({
			headers: {
				accept: 'usertoken:' + localStorage.getItem('token')
			},
			type: "get",
			url: host_host_host + "/Home/Finance/commissionList",
			dataType: 'json',
			data: datas,
			success: function(data) {
				if(data.status == 1) {
					if(ing == 1) {
						var datas = data.data;
						console.log(data, 1);
						pp.parents('.item_count').find('.now_count .paging .page_left span').html(datas.count);
						pp.parents('.item_count').find('.now_count .paging .page_right .number').html(page5);
						pp.parents('.item_count').find('.now_count .paging .page_right .total_num').html(datas.totalPage);
						var str = '';
						for(var i = 0; i < datas.list.length; i++) {
							str += '<tr>';
							str += '	<td>' + (i + 1) + '</td>';
							str += '	<td><a href="index.html?project_id=' + datas.list[i].project_id + '">' + datas.list[i].project_name + '</a></td>';
							str += '	<td>' + datas.list[i].total + '</td>';
							str += '	<td>' + datas.list[i].last_commission + '</td>';
							str += '	<td>' + datas.list[i].project_time + '</td>';
							str += '	<td class="handle"><span class="check" data-id="' + datas.list[i].project_id + '">查看</span></td>';
							str += '</tr>';
						}
						pp.parents('.item_count').find('.now_count tbody').html(str);
					}
					if(ing == 2) {
						var datas = data.data;
						console.log(data, 2);
						pp.parents('.item_count').find('.past_count .paging .page_left span').html(datas.count);
						pp.parents('.item_count').find('.past_count .paging .page_right .number').html(page6);
						pp.parents('.item_count').find('.past_count .paging .page_right .total_num').html(datas.totalPage);
						var str = '';
						for(var i = 0; i < datas.list.length; i++) {
							str += '<tr>';
							str += '	<td>' + (i + 1) + '</td>';
							str += '	<td><a href="index.html?project_id=' + datas.list[i].project_id + '">' + datas.list[i].project_name + '</a></td>';
							str += '	<td>' + datas.list[i].total + '</td>';
							str += '	<td>' + datas.list[i].last_commission + '</td>';
							str += '	<td>' + datas.list[i].project_time + '</td>';
							str += '	<td class="handle"><span class="check" data-id="' + datas.list[i].project_id + '">查看</span></td>';
							str += '</tr>';
						}
						pp.parents('.item_count').find('.past_count tbody').html(str);
					}
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	}
	/*行政支出*/
	var page7 = 1;
	var data7 = {};
	var pp3, star3, end3;
	$(document).on('click', '.staff_content .search', function() {
		pp3 = $(this).parents('.staff_time');
		star3 = Date.parse(new Date(pp3.find('#staffone').val())) / 1000;
		end3 = Date.parse(new Date(pp3.find('#stafftwo').val())) / 1000;
		data7 = {
			start_time: star3,
			end_time: end3,
			page: page7
		}
		searchFun3(data7, pp3);
	})
	$(document).on('click', '.staff_content .list_detail .paging .page_right .less', function() {
		var all = $(this).siblings('.total_num').text();
		var p = Number($(this).siblings('.number').text());
		page7 = p;
		if(p > 1) {
			page7--;
			data7 = {
				start_time: star3,
				end_time: end3,
				page: page7
			}
			searchFun3(data7, pp3);
		}
	})
	$(document).on('click', '.staff_content .list_detail .paging .page_right .more', function() {
		var all = $(this).siblings('.total_num').text();
		var p = Number($(this).siblings('.number').text());
		page7 = p;
		if(p < all) {
			page7++;
			data7 = {
				start_time: star3,
				end_time: end3,
				page: page7
			}
			searchFun3(data7, pp3);
		}
	})
	var xingzhenginfo;

	function searchFun3(datas, pp) {
		$.ajax({
			headers: {
				accept: 'usertoken:' + localStorage.getItem('token')
			},
			type: "get",
			url: host_host_host + "/Home/Finance/executiveList",
			dataType: 'json',
			data: datas,
			success: function(data) {
				if(data.status == 1) {
					var datas = data.data;
					xingzhenginfo = datas;
					console.log(data, 1);
					pp.parents('.staff_content').find('.list_detail .paging .page_left span').html(datas.count);
					pp.parents('.staff_content').find('.list_detail .paging .page_right .number').html(page7);
					pp.parents('.staff_content').find('.list_detail .paging .page_right .total_num').html(datas.totalPage);
					var str = '';
					var allprice = 0;
					for(var i = 0; i < datas.list.length; i++) {
						str += '<tr>';
						str += '	<td>' + (i + 1) + '</td>';
						str += '	<td><a href="javascirpt:void(0)">' + datas.list[i].overhead_type_name + '</a></td>';
						str += '	<td>' + datas.list[i].executive_content + '</td>';
						str += '	<td>' + datas.list[i].amount + '</td>';
						str += '	<td>' + datas.list[i].executive_time + '</td>';
						str += '	<td class="handle"><span class="check" data-id="' + i + '">查看</span></td>';
						str += '</tr>';
						allprice += Number(datas.list[i].amount);
					}
					console.log(allprice);
					pp.parents('.staff_content').find('.list_detail tfoot tr td').eq(3).html(allprice.toFixed(2));
					pp.parents('.staff_content').find('.list_detail tbody').html(str);
				} else {}
			},
			error: function(data) {

			},
			async: true
		});
	}
	/*经营统计*/
	var page8 = 1;
	var page9 = 1;
	var data8 = {};
	var data9 = {};
	var pp4, type4, pname4, star4, end4;
	$(document).on('click', '.item_content .search', function() {
		pp4 = $(this).parents('.item_time');
		type4 = pp4.find('.timeover select').val();
		pname4 = pp4.find('.staff_search input').val();
		star4 = Date.parse(new Date(pp4.find('#income_one').val())) / 1000;
		end4 = Date.parse(new Date(pp4.find('#income_two').val())) / 1000;
		data8 = {
			status: 0,
			start_time: star4,
			end_time: end4,
			type: type4,
			project_name: pname4,
			page: page8
		}
		data9 = {
			status: 1,
			start_time: star4,
			end_time: end4,
			type: type4,
			project_name: pname4,
			page: page9
		}
		searchFun4(data8, 1, pp4);
		searchFun4(data9, 2, pp4);
	})
	$(document).on('click', '.item_content .lists .paging .page_right .less', function() {
		var all = $(this).siblings('.total_num').text();
		var p = Number($(this).siblings('.number').text());
		page8 = p;
		if(p > 1) {
			page8--;
			data8 = {
				status: 0,
				start_time: star4,
				end_time: end4,
				type: type4,
				project_name: pname4,
				page: page8
			}
			searchFun4(data8, 1, pp4);
		}
	})
	$(document).on('click', '.item_content .lists .paging .page_right .more', function() {
		var all = $(this).siblings('.total_num').text();
		var p = Number($(this).siblings('.number').text());
		page8 = p;
		if(p < all) {
			page8++;
			data8 = {
				status: 0,
				start_time: star4,
				end_time: end4,
				type: type4,
				project_name: pname4,
				page: page8
			}
			searchFun4(data8, 1, pp4);
		}
	})
	$(document).on('click', '.item_content .pasts .paging .page_right .less', function() {
		var all = $(this).siblings('.total_num').text();
		var p = Number($(this).siblings('.number').text());
		page9 = p;
		if(p > 1) {
			page9--;
			data9 = {
				status: 1,
				start_time: star4,
				end_time: end4,
				type: type4,
				project_name: pname4,
				page: page9
			}
			searchFun4(data9, 2, pp4);
		}
	})
	$(document).on('click', '.item_content .pasts .paging .page_right .more', function() {
		var all = $(this).siblings('.total_num').text();
		var p = Number($(this).siblings('.number').text());
		page9 = p;
		if(p > 1) {
			page9--;
			data9 = {
				status: 1,
				start_time: star4,
				end_time: end4,
				type: type4,
				project_name: pname4,
				page: page9
			}
			searchFun4(data9, 2, pp4);
		}
	});

	function searchFun4(datas, ing, pp) {
		$.ajax({
			headers: {
				accept: 'usertoken:' + localStorage.getItem('token')
			},
			type: "get",
			url: host_host_host + "/Home/Finance/census",
			dataType: 'json',
			data: datas,
			success: function(data) {
				if(data.status == 1) {
					if(ing == 1) {
						var datas = data.data;
						console.log(data, 1);
						pp.parents('.item_content').find('.lists .paging .page_left span').html(datas.count);
						pp.parents('.item_content').find('.lists .paging .page_right .number').html(page8);
						pp.parents('.item_content').find('.lists .paging .page_right .total_num').html(datas.totalPage);
						var str = '';
						for(var i = 0; i < datas.list.length; i++) {
							str += '<tr>';
							str += '	<td>' + (i + 1) + '</td>';
							str += '	<td><a href="index.html?project_id=' + datas.list[i].project_id + '">' + datas.list[i].project_name + '</a></td>';
							str += '	<td>' + datas.list[i].total_income + '</td>';
							str += '	<td>' + datas.list[i].total_pay + '</td>';
							str += '	<td>' + datas.list[i].total_commission + '</td>';
							str += '	<td>' + datas.list[i].surplus + '</td>';
							str += '	<td class="handle"><span class="check" data-id="' + datas.list[i].project_id + '">查看</span></td>';
							str += '</tr>';
						}
						pp.parents('.item_content').find('.lists tbody').html(str);
					}
					if(ing == 2) {
						var datas = data.data;
						console.log(data, 2);
						pp.parents('.item_content').find('.pasts .paging .page_left span').html(datas.count);
						pp.parents('.item_content').find('.pasts .paging .page_right .number').html(page9);
						pp.parents('.item_content').find('.pasts .paging .page_right .total_num').html(datas.totalPage);
						var str = '';
						for(var i = 0; i < datas.list.length; i++) {
							str += '<tr>';
							str += '	<td>' + (i + 1) + '</td>';
							str += '	<td><a href="index.html?project_id=' + datas.list[i].project_id + '">' + datas.list[i].project_name + '</a></td>';
							str += '	<td>' + datas.list[i].total_income + '</td>';
							str += '	<td>' + datas.list[i].total_pay + '</td>';
							str += '	<td>' + datas.list[i].total_commission + '</td>';
							str += '	<td>' + datas.list[i].surplus + '</td>';
							str += '	<td class="handle"><span class="check" data-id="' + datas.list[i].project_id + '">查看</span></td>';
							str += '</tr>';
						}
						pp.parents('.item_content').find('.pasts tbody').html(str);
						var strt = '';
						strt += '<tr>';
						strt += '	<td>统计</td>';
						strt += '	<td>' + datas.info.total_project + '</td>';
						strt += '	<td>' + datas.info.total_income + '</td>';
						strt += '	<td>' + datas.info.total_pay + '</td>';
						strt += '	<td>' + datas.info.total_executive + '</td>';
						strt += '	<td>' + datas.info.surplus + '</td>';
						strt += '	<td>' + datas.info.rate + '</td>';
						strt += '</tr>';
						pp.parents('.item_content').find('.tongji tbody').html(strt);
					}
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	}

	addPeople();
	var all;
	var work;

	function addPeople() {
		$.ajax({
			type: "post",
			url: host_host_host + "/home/project/election",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {},
			success: function(data) {
				if(data.status == 1) {
					var allItem = data.data.all;
					all = "";
					work = "";
					for(var i = 0; i < allItem.length; i++) {
						all += '<li data-id="' + allItem[i].id + '">';
						all += '<i><img src="img/icon_checked.png" alt="" /></i>';
						all += '<span data-id="' + allItem[i].id + '">' + allItem[i].nickname + '</span>';
						all += '</li>';
					}
					$(".all_item .Allworker").append(all);
					//添加工种
					//					console.log(data.data.work)
					var workItem = data.data.work;
					for(var i = 0; i < workItem.length; i++) {
						work += '<div class="jobstyle">';
						work += '	<div class="job" data-id="' + workItem[i].id + '">';
						work += '		<i><img src="img/icon_checked.png" alt="" /></i>';
						work += '		<span data-id="' + workItem[i].id + '">' + workItem[i].name + '</span>';
						work += '		<s><img src="img/arrow_bottom.png"/></s>';
						work += '	</div>';
						work += '	<ul class="worker">';
						for(var j = 0; j < workItem[i].user.length; j++) {
							work += '	<li data-id="' + workItem[i].user[j].id + '">';
							work += '		<i><img src="img/icon_checked.png" alt="" /></i>';
							work += '		<span>' + workItem[i].user[j].nickname + '</span>';
							work += '	</li>';
						}
						work += '	</ul>';
						work += '</div>';
					}
					$(".now_item .now_item_cnt").append(work);
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	}
	/*选人*/
	choose();
	var arr = [];
	var obj = {};
	var people;
	var chooseNum;

	function choose() {
		$(document).on("click", ".expend_edit .choose", function() {
			chooseNum = 1;
			$(".expend_edit").hide();
			$("#subitem_choose").show();
			people = '';
			var html = "";
			people = $(this);
			html += '<div class="work_style"><ul class="clearfix"></ul></div>';
			$(".item_right_ctn").append(html);
		})
		$(document).on("click", ".item_expend .choose", function() {
			chooseNum = 2;
			$(".item_expend").hide();
			$("#subitem_choose").show();
			people = '';
			var html = "";
			people = $(this);
			html += '<div class="work_style"><ul class="clearfix"></ul></div>';
			$(".item_right_ctn").append(html);
		})
		$(document).on("click", ".subitem_choose .subitem_choose_head i", function() {
			$("#subitem_choose,#boxPock").hide();
			$(".admin li").removeClass("active");
			$(".item_right_ctn .work_style").remove();
		})
		//选人tab切换
		$(document).on('click', '.subitem_choose_bottom .item_name li', function() {
			$(this).addClass("active").siblings().removeClass("active");
			var index = $(this).index();
			$(".subitem_choose_bottom .admin").hide();
			$(".subitem_choose_bottom .admin").eq(index).show();
		})
		//下拉显示人员
		$(document).on("click", ".subitem_choose .admin .jobstyle .job", function() {
			var display = $(this).siblings(".worker").css("display");
			$(this).siblings(".worker").slideToggle();
			var src = "img/arrow_bottom.png";
			var src1 = "img/arrow_top.png"
			if(display == "none") {
				$(this).find("s>img").attr("src", src1);
			} else {
				$(this).find("s>img").attr("src", src);
			}
		});
		//人员勾选
		$(document).on("click", ".subitem_choose .admin li i", function() {
			var length = $(".item_right_ctn ul li").length;
			if(length == 0) {
				$(this).parents("li").addClass("active")
				var txt = $(this).siblings("span").text();
				var id = $(this).parents('li').attr('data-id');
				var lis = '<li data-id="' + id + '"><img src="img/icon_del.png"/><span data-id="' + id + '">' + txt + '</span></li>';
				$(".item_right_ctn ul").append(lis);
			}
		});
		$(document).on("click", ".subitem_choose .admin li.active i", function() {
			$(this).parents("li").removeClass("active");
			$(".item_right_ctn ul li").remove();
		});
		//点击右边左边去掉
		$(document).on("click", ".item_right_ctn ul li img", function() {
			$(".item_right_ctn ul li").remove();
			$(".subitem_choose_bottom .admin ul li").removeClass("active");
		});
		//选人确认
		$(document).on('click', '#jobbtn', function() {
			var listxt = $(".item_right_ctn ul li span").text();
			var dataId = $(".item_right_ctn ul li span").attr("data-id");
			$(".admin li").removeClass("active");
			$(".item_right_ctn .work_style").remove();
			if(chooseNum == 1) {
				people.siblings("input").val(listxt);
				people.siblings("input").attr("data-id", dataId);
				$(".expend_edit").show();
				$("#subitem_choose").hide();
			}
			if(chooseNum == 2) {
				people.siblings("input").val(listxt);
				people.siblings("input").attr("data-id", dataId);
				$(".item_expend").show();
				$("#subitem_choose").hide();
			}
		})
	}
})