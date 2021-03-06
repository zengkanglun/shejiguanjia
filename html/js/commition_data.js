//项目计提==============
//进行中项目计提查看
$(document).on("click", ".item_count .now_count tbody td .check", function() {
	var id = $(this).attr('data-id');
	jiti(id);
})

function jiti(id, cid) {
	$("#oror").data('id', 55);
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
//				console.log(data);
				var datas = data.data;
				var boxName = $('.countDetail');
				var strul = '';
				for(var i = 0; i < datas.project_child_info.length; i++) {
					if(datas.project_child_info[i].is_current) {
						strul += '<li data-id="' + datas.project_child_info[i].project_child_id + '">';

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
				var cci = datas.project_child_info[0].project_child_id;
				boxName.find('.floor_right span').html(datas.project_child_info[0].project_child_name);
				if(cid)
				;
				else
					cid = cci;

				boxName.find('.count_cnt .n6 .check ').attr('data-id', cid);
				boxName.find('.count_cnt .n6 .check ').attr('data-id', cid); //wly
				//					boxName.find('.count_cnt .n6 .check ').html('data-id');
//				console.log(datas.current_project_commission.is_submit)
				if(datas.current_project_commission.is_submit == 0) {
					boxName.find('.count_cnt .n11 .submit').text('未提交');
					$(".countDetail .jtbtn1").hide()
				} else {
					boxName.find('.count_cnt .n11 .submit').html('已提交');
					$(".countDetail .jtbtn1").show()
				}
				if(datas.current_project_commission) {
					boxName.find('.count_cnt .n7 input').val(datas.current_project_commission.start_time);
					boxName.find('.count_cnt .n8 input').val(datas.current_project_commission.amount);
					boxName.find('.count_cnt .n9 input').val(datas.current_project_commission.supervisor_rate);
					boxName.find('.count_cnt .n10 input').val(datas.current_project_commission.group_rate);

					boxName.find('.count_cnt .n11 .check').attr('data-id', datas.current_project_commission.project_commission_id);
				} else {

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

			} else {
				toast(data.msg);
			}
		},
		error: function(data) {

		},
		async: true
	});
}
//楼号切换
boxName.find('.floor_ul li').on("click", function() {
	$(this).addClass("active").siblings().removeClass("active");
	var txt = $(this).find("a").text();
	$(".floor_right span").text(txt);
	var ccid = $(this).data('id');
	jiti(id, ccid);
	//wly 加的一行
})
$(document).on("click", ".countDetail .countDetail_head i,.countDetail .btn1,.countDetail .btn2", function() {
	$("#boxPock").hide();
	$("#boxPock .countDetail").hide();
})
//历史计提查看
$(document).on("click", ".item_count .past_count tbody td .check", function() {
	//$("#boxPock").show();
	//$("#boxPock .his_count").show();
	//10-19
	//$('.his_count').hide();
	var id = $(this).attr('data-id'); //
	//jitiHistory(id,2);
	//jitiHistory(1,2);//id  child_id
	jitiHistory(id);
})

function jitiHistory(id, cid) {

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
//				console.log(data);
				var datas = data.data;
				var boxName = $('.his_count');
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
				var cci = datas.project_child_info[0].project_child_id;
				if(cid)
				;
				else
					cid = cci;
				boxName.find('.count_cnt .n6 .check').attr("data-id", cid);
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
					strhis += '	<td><span data-id="' + datas.history_project_commission[i].project_commission_id + '" class="check lulu">查看</span></td>';
					strhis += '	<td class="handle"><span  data-id="' + datas.history_project_commission[i].project_commission_id + '" class="edit lolo">查看</span></td>';
					strhis += '</tr>';
				}
				boxName.find('.histroy_count tbody').html(strhis);
				$("#boxPock").show();
				$("#boxPock .his_count").show();
				//楼号切换
				boxName.find('.floor_ul li').on("click", function() {
					$(this).addClass("active").siblings().removeClass("active");
					var txt = $(this).find("a").text();
					$(".floor_right span").text(txt);
					var ccid = $(this).attr('data-id');
					jitiHistory(id, ccid);
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
$(document).on("click", ".his_count .his_count_head i,.his_count .btn2", function() {
	$("#boxPock").hide();
	$("#boxPock .his_count").hide();
})
$(document).on("click", ".his_count .floor_ul li", function() {
	$(this).addClass("active").siblings().removeClass("active");
	var txt = $(this).find("a").text();
	$(".floor_right span").text(txt);
})

//查看项目组成方案
$(document).on("click", ".lulu", function() {
	var id = 1;
	id = $(this).attr('data-id'); //计提id
//	console.log(580 + id);
	//
	$.ajax({
		headers: {
			accept: 'usertoken:' + localStorage.getItem('token')
		},
		type: "GET",
		//url: host_host_host + "/Home/Finance/getProjectWorkCommission",
		url: host_host_host + "/Home/Finance/getProjectWorkCommission",
		dataType: 'json',
		data: {
			//project_commission_id:id
			project_commission_id: id

		},
		success: function(data) {
			if(data.status == 1) {
//				console.log(data);
				var datas = data.data;
//				console.log("项目组成方案" + JSON.stringify(data));
				$("#lulu_tb").html("");
				//循环出组成员
				for(var i in datas) {
					var o = datas[i];
					var item = $(

						'<tr>' +
						'<td>' + (parseInt(i) + 1) + '</td>' +
						'<td>' + o.start_time + '</td>' +
						'<td>' + o.work_name + '</td>' +
						'<td>' + o.username + '</td>' +
						'<td>' + o.status + '</td>' +
						'<td>' + o.commission_rate + '</td>' +
						'<td class="sub"><span class="submit">已提交</span><span  data-cid="' + id + '" data-id="' + o.work_id + '" class="detail keke">详情</span></td>' +
						'<td class="handle"><span class="hascheck">已审核</span></td>' +
						'</tr>'
					);

					$("#lulu_tb").append(item);

				}
			}
		}
	});
})

//获取工种分工
$(document).on("click", ".keke", function() {
//	console.log(585);
	var com_id = 1;
	var id = 1;
	com_id = $(this).data("cid");
	id = $(this).data("id");
	//
	$.ajax({
		headers: {
			accept: 'usertoken:' + localStorage.getItem('token')
		},
		type: "GET",
		url: host_host_host + "/Home/Finance/getProjectStaffCommission",
		//url: host_host_host + "/Home/Finance/getProjectWorkCommission",
		dataType: 'json',
		data: {
			//project_commission_id:id
			project_commission_id: com_id,
			work_id: id
		},
		success: function(data) {
//			console.log("工种分工:" + JSON.stringify(data))
			if(data.status == 1) {
//				console.log(data);
				var infos = data.data.info;
				//
				$(".worker_style_top .n1 input").val(infos.start_time);
				$(".worker_style_top .n2 input").val(infos.work_name);
				$(".worker_style_top .n3 input").val(infos.username);
				$(".worker_style_top .n4 input").val(infos.commission_rate);
				var datas = data.data.list;
//				console.log("分工" + JSON.stringify(data));
				$("#keke_tb").html("");
				//循环出组成员
				for(var i in datas) {
					var o = datas[i];
					var item = $(

						'<tr>' +
						'<td>' + (parseInt(i) + 1) + '</td>' +
						'<td>' + o.username + '</td>' +
						'<td>' + o.labor + '</td>' +
						'<td>' + o.content + '</td>' +

						'</tr>'
					);

					$("#keke_tb").append(item);

				}
			}
		}
	});

})
//获取项目组成员
$(document).on("click", ".check_one", function() {
	id = $(this).attr('data-id');
	$.ajax({
		headers: {
			accept: 'usertoken:' + localStorage.getItem('token')
		},
		type: "POST",
		url: host_host_host + "/Home/project/childInfo",
		dataType: 'json',
		data: {
			id: id
		},
		success: function(data) {
			if(data.status == 1) {
//				console.log(data);
				var datas = data.data.work;
				var works = data.data.work;
				$("#project_group").html("");
				//循环出组成员
				for(var i in datas) {
					var o = datas[i];
					var item = $(
						'<div class="item_manage duty">' +
						'<span>' + o.name + '</span>' +
						'<input type="text" value="' + o.nickname + '" placeholder="一号楼">' +
						'</div>'
					);
					$("#project_group").append(item);
				}
			}
		}
	});

	//获取子项目的分工列表

	$.ajax({
		headers: {
			accept: 'usertoken:' + localStorage.getItem('token')
		},
		type: "POST",
		url: host_host_host + "/Home/project/ProjectLabor",
		dataType: 'json',
		data: {
			chile_id: id

		},
		success: function(data) {
			if(data.status == 1) {
//				console.log(data);
				var datas = data.data.user;
//				console.log("分工" + JSON.stringify(data));
				$("#project_group_tb").html("");
				//循环出组成员
				for(var i in datas) {
					var o = datas[i];

					var otem = $(
						'<tr>' +
						'<td>100000</td>' +
						'<td>' + o.nickname + '</td>' +
						'<td>' + o.work.name + '</td>' +
						'<td>' + o.labor + '</td>' +
						'<td>' + o.content + '</td>' +

						'</tr>'
					);

					$("#project_group_tb").append(otem);
				}
			}
		}
	});
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

//正在进行的 
//进行时的方案详情
/*未完成*/
var jiTiid;
$(document).on("click", ".countDetail_bottom .count_cnt .count_go .status .check", function() {
	jiTiid = $(this).attr('data-id');
	$.ajax({
		headers: {
			accept: 'usertoken:' + localStorage.getItem('token')
		},
		type: "get",
		url: host_host_host + "/Home/Finance/getProjectWorkCommission",
		dataType: 'json',
		data: {
			project_commission_id: jiTiid
		},
		success: function(data) {
			if(data.status == 1) {
//				console.log(data);
				var datas = data.data;
				var str = '';
				$("#jiji_tb").html("");
				//循环出组成员
				for(var i in datas) {
					var o = datas[i];
					var item = $(

						'<tr>' +
						'<td>' + (parseInt(i) + 1) + '</td>' +
						'<td>' + o.start_time + '</td>' +
						'<td>' + o.work_name + '</td>' +
						'<td>' + o.username + '</td>' +
						'<td>' + o.commission_rate + '</td>' +
						'<td class="sub" data-id="' + o.is_submit + '"><i class="submit">已提交</i><i class="nosubmit">未提交</i><span  data-cid="' + jiTiid + '" data-id="' + o.work_id + '" class="detail keke">详情</span></td>' +
						'<td class="handle" data-id="' + o.status + '"><i class="hascheck">已审核</i><i class="nocheck">未审核</i><i class="checkfail">审核失败</i></td>' +
						'</tr>'
					);
					$("#jiji_tb").append(item);
					$("#jiji_tb .handle").each(function() {
						if($(this).attr("data-id") == 0) {
							$(this).find(".nocheck").show();
							$(this).find(".hascheck").hide();
							$(this).find(".checkfail").hide();
						} else if($(this).attr("data-id") == 1) {
							$(this).find(".nocheck").hide();
							$(this).find(".hascheck").show();
							$(this).find(".checkfail").hide();
						} else {
							$(this).find(".nocheck").hide();
							$(this).find(".hascheck").hide();
							$(this).find(".checkfail").show();
						}
					})
					$("#jiji_tb .sub").each(function() {
						if($(this).attr("data-id") == 0) {
							$(this).find(".nosubmit").show();
							$(this).find(".submit").hide();
						} else if($(this).attr("data-id") == 1) {
							$(this).find(".nosubmit").hide();
							$(this).find(".submit").show();
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
	$(".countDetail").hide();
	$(".item_plan").show();
})

//确定方案
var jiTistatus;
var jiTiarr;
$(document).on("click", "#sure_project", function() {
	jiTiarr = [];
	$("#jiji_tb .sub").each(function() {
		var num = $(this).attr("data-id");
		jiTiarr.push(num)
	})

	function contains(arr, obj) {
		var i = arr.length;
		while(i--) {
			if(arr[i] === obj) {
				jiTistatus = 0;
			} else {
				jiTistatus = 0;
			}
		}
	}
	contains(jiTiarr, 0);
	if(jiTistatus == 0) {
		toast("还有方案未提交")
	} else {
		$.ajax({
			headers: {
				accept: 'usertoken:' + localStorage.getItem('token')
			},
			type: "POST",
			url: host_host_host + "/Home/Finance/confirmProjectWorkCommission",
			dataType: 'json',
			data: {
				project_commission_id: jiTiid,
				status: 1
			},
			success: function(data) {
				if(data.status == 1) {
					toast(data.msg)
					$(".countDetail").show();
					$("#boxPock .item_plan").hide();
				} else {
					toast(data.msg)
					$(".countDetail").show();
					$("#boxPock .item_plan").hide();
				}
			},
			error: function(data) {

			},
			async: true

		})
	}
})

//退回方案

$(document).on("click", "#turn_project", function() {
	$.ajax({
		headers: {
			accept: 'usertoken:' + localStorage.getItem('token')
		},
		type: "POST",
		url: host_host_host + "/Home/Finance/confirmProjectWorkCommission",
		dataType: 'json',
		data: {
			project_commission_id: jiTiid,
			status: 2
		},
		success: function(data) {
			if(data.status == 1) {
				toast(data.msg)
				$(".countDetail").show();
				$("#boxPock .item_plan").hide();
			} else {
				toast(data.msg)
				$(".countDetail").show();
				$("#boxPock .item_plan").hide();
			}
		},
		error: function(data) {

		},
		async: true

	})
	/*计提确认提交*/
	$(document).on("click", ".countDetail .jtbtn1", function() {
		var project_commission_id = $(".countDetail .status .check").attr("data-id");
		var amount = $(".countDetail .count_go .n8 input").val();
		var supervisor_rate = $(".countDetail .count_go .n9 input").val();
		var group_rate = $(".countDetail .count_go .n10 input").val();
		if((supervisor_rate).toFixed(2) + (group_rate).toFixed(2) == 100) {
			$.ajax({
				type: "post",
				url: host_host_host + "/Home/Finance/submitProjectCommission",
				dataType: 'json',
				headers: {
					accept: "usertoken:" + token,
				},
				data: {
					project_commission_id: project_commission_id,
					amount: amount,
					supervisor_rate: supervisor_rate,
					group_rate: group_rate,
				},
				success: function(data) {
					if(data.status == 1) {

					} else {

					}
				},
				error: function(data) {

				},
				async: true
			});
		}
	})
})