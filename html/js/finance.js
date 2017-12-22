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
	//tab栏切换
	//select选中
	$("select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
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
						pp = $('.item_income .item_time');
						var pagenum1 = $(".item_income .now_detail .page_right .number").text();
						var data1 = {
							status: 0,
							start_time: star,
							end_time: end,
							type: type,
							project_name: pname,
							page: pagenum1
						}
						$(".item_income .now_detail .page_right .number").text(pagenum1);
						searchFun(data1, 1, pp);
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
	$(document).on("click", ".pay_add1 .btn1", function() {
		var pp1 = $(this).parents('.pay_add_bottom');
		var time = Date.parse(new Date(pp1.find('#pay_add_one').val())) / 1000;
		var price = pp1.find('#pay_add_two').val();
		var cont = pp1.find('#pay_add_cont').val();
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
					toast(data.msg);
					$("#boxPock .pay_add").hide();
					$("#boxPock .item_edit").show();
					itemIncome(itemId);
					/*刷新*/
					type = pp.find('.timeover select').val();
					pname = pp.find('.staff_search input').val();
					star = pp.find('#income_one').val();
					end = pp.find('#income_two').val();
					page1 = $(".item_income .now_detail .page_right .number").text();
					data1 = {
						status: 0,
						start_time: star,
						end_time: end,
						type: type,
						project_name: pname,
						page: page1
					}
					searchFun(data1, 1, pp);
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
					$("#boxPock .pay_edit").hide();
					$("#boxPock .item_edit").show();
					itemIncome(itemId);
					/*刷新*/
					type = pp.find('.timeover select').val();
					pname = pp.find('.staff_search input').val();
					star = pp.find('#income_one').val();
					end = pp.find('#income_two').val();
					page1 = $(".item_income .now_detail .page_right .number").text();
					data1 = {
						status: 0,
						start_time: star,
						end_time: end,
						type: type,
						project_name: pname,
						page: page1
					}
					searchFun(data1, 1, pp);
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
					$("#boxPock .item_expend").show();
					$("#boxPock .expendEdit").hide();
					expend(itemId)
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
	//增加阶段
	var addstage;
	var xiangmuskid;
	var itemId; /*项目id*/
	//项目收入========
	$(document).on("click", ".item_income .now_detail tbody td .check", function() {
		itemId = $(this).attr('data-id');
		xiangmuskid = itemId;
		$("#boxPock").show();
		$("#boxPock .item_edit").show();
		itemIncome(itemId);
	})

	function itemIncome(itemId) {
		$.ajax({
			headers: {
				accept: 'usertoken:' + localStorage.getItem('token')
			},
			type: "get",
			url: host_host_host + "/Home/Finance/projectReceiptDetails",
			dataType: 'json',
			data: {
				project_id: itemId
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
					boxName.find('.uploading .load_right').text(datas.filename);
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
	}

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
			child.push(JSON.stringify(obj));
		})
		console.log(obj);
		var arr = JSON.stringify(child);
		var id = xiangmuskid;
		var form = new FormData($("#jTform")[0]);
		form.append("project_id", id);
		form.append("child", arr);
		$.ajax({
			type: "post",
			url: host_host_host + "/Home/Finance/editProjectSchedule",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: form,
			processData: false,
			contentType: false,
			success: function(data) {
				if(data.status == 1) {
					console.log(data);
					toast(data.msg)
					setTimeout(function() {
						itemIncome(itemId);
						$(".item_editDetail").hide();
						$(".item_edit").show();
						pp = $('.item_income .item_time');
						var pagenum1 = $(".item_income .now_detail .page_right .number").text();
						pp = $('.item_income .item_time');
						var data1 = {
							status: 0,
							start_time: star,
							end_time: end,
							type: type,
							project_name: pname,
							page: pagenum1
						}
						$(".item_income .now_detail .page_right .number").text(pagenum1);
						searchFun(data1, 1, pp);
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
	pp = $('.item_time');
	$(document).on('click', '.item_income .search', function() {
		pp = $(this).parents('.item_time');
		type = pp.find('.timeover select').val();
		pname = pp.find('.staff_search input').val();
		star = pp.find('#income_one').val();
		end = pp.find('#income_two').val();
		page1 = 1;
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
	/*立项切换*/
	$(document).on('change', '#fir_come', function() {
		pp = $(this).parents('.item_time');
		type = pp.find('.timeover select').val();
		pname = pp.find('.staff_search input').val();
		star = pp.find('#income_one').val();
		end = pp.find('#income_two').val();
		page1 = 1;
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
	/*搜索*/
	$(document).on('click', '.staff_search img', function() {
		pp = $(this).parents('.item_time');
		type = pp.find('.timeover select').val();
		pname = pp.find('.staff_search input').val();
		star = pp.find('#income_one').val();
		end = pp.find('#income_two').val();
		page1 = 1;
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
		var all = Number($(this).siblings('.total_num').text());
		pp = $('.item_income .item_time');
		var p = Number($(this).siblings('.number').text());
		star = pp.find('#income_one').val();
		end = pp.find('#income_two').val();
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
		var all = Number($(this).siblings('.total_num').text());
		pp = $('.item_income .item_time');
		var p = Number($(this).siblings('.number').text());
		star = pp.find('#income_one').val();
		end = pp.find('#income_two').val();
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
	/*进行中项目跳页*/
	$(document).on('click', '.item_income .now_detail .paging .jump .go', function() {
		var all = Number($(this).siblings('.total_num').text());
		var jump_num = Number($(this).siblings(".jump_page").val());
		star = pp.find('#income_one').val();
		end = pp.find('#income_two').val();
		page1 = jump_num;
		if(jump_num > 0) {
			data1 = {
				status: 0,
				start_time: star,
				end_time: end,
				type: type,
				project_name: pname,
				page: page1
			}
			searchFun(data1, 1, pp);
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
		} else {
			toast("请输入正常页码")
		}
	})
	$(document).on('click', '.item_income .past_detail .paging .page_right .less', function() {
		var all = Number($(this).siblings('.total_num').text());
		pp = $('.item_income .item_time');
		var p = Number($(this).siblings('.number').text());
		star = pp.find('#income_one').val();
		end = pp.find('#income_two').val();
		page2 = p;
		if(p > 1) {
			page2--;
			data2 = {
				status: 1,
				start_time: star,
				end_time: end,
				type: type,
				project_name: pname,
				page: page2
			}
			searchFun(data2, 2, pp);
		}
	})
	$(document).on('click', '.item_income .past_detail .paging .page_right .more', function() {
		var all = Number($(this).siblings('.total_num').text());
		pp = $('.item_income .item_time');
		var p = Number($(this).siblings('.number').text());
		star = pp.find('#income_one').val();
		end = pp.find('#income_two').val();
		page2 = p;
		if(p < all) {
			page2++;
			data2 = {
				status: 1,
				start_time: star,
				end_time: end,
				type: type,
				project_name: pname,
				page: page2
			}
			searchFun(data2, 2, pp);
		}
	})
	/*已完成项目跳页*/
	$(document).on('click', '.item_income .past_detail .paging .jump .go', function() {
		var all = $(this).siblings('.total_num').text();
		var jump_num = Number($(this).siblings(".jump_page").val());
		star = pp.find('#income_one').val();
		end = pp.find('#income_two').val();
		page2 = jump_num;
		if(jump_num > 0) {
			data2 = {
				status: 0,
				start_time: star,
				end_time: end,
				type: type,
				project_name: pname,
				page: page2
			}
			searchFun(data2, 2, pp);
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
		} else {
			toast("请输入正常页码")
		}
	})
	/*项目收入*/
	function searchFun(datas, ing, pp) {
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
						console.log(datas.list)
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
						$("tbody td").each(function() {
							if($(this).text() == "null") {
								$(this).text("")
							}
						})
					}
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	}

	/*选人*/
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
			var dataId;
			var listxt = $(".item_right_ctn ul li span").text();
			if($(".item_right_ctn ul li").length == 0) {
				dataId = 0;
			} else {
				dataId = $(".item_right_ctn ul li span").attr("data-id");
			}
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
	/*导出表格*/

})