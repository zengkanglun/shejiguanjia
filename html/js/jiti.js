$(function() {
	var token = localStorage.getItem("token");
	//select选中
	$("select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	})
	/*项目计提*/
	var page5 = 1;
	var page6 = 1;
	var data5 = {};
	var data6 = {};
	var pp2, type2, pname2, star2, end2;
	pp2 = $('.item_time');
	type2 = pp2.find('.timeover select').val();
	pname2 = pp2.find('.staff_search input').val();
	star2 = pp2.find('#count_one').val();
	end2 = pp2.find('#count_two').val();
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
	$(document).on('click', '.item_count .search', function() {
		pp2 = $(this).parents('.item_time');
		type2 = pp2.find('.timeover select').val();
		pname2 = pp2.find('.staff_search input').val();
		star2 = pp2.find('#count_one').val();
		end2 = pp2.find('#count_two').val();
		page5 = 1;
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
	/*确认改变页面*/
	$(document).on("click", ".countDetail .jtbtn1", function() {

	})
	/*立项切换*/
	$(document).on('change', '.jiti_s', function() {
		type2 = pp2.find('.timeover select').val();
		pname2 = pp2.find('.staff_search input').val();
		star2 = pp2.find('#count_one').val();
		end2 = pp2.find('#count_two').val();
		page5 = 1;
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
	/*搜索*/
	$(document).on('click', '.staff_search img', function() {
		type2 = pp2.find('.timeover select').val();
		pname2 = pp2.find('.staff_search input').val();
		star2 = pp2.find('#count_one').val();
		end2 = pp2.find('#count_two').val();
		page5 = 1;
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
		$(".paging .page_right .number").text(1)
	})
	$(document).on('click', '.item_count .now_count .paging .page_right .less', function() {
		var all = Number($(this).siblings('.total_num').text());
		var p = Number($(this).siblings('.number').text());
		star2 = pp2.find('#count_one').val();
		end2 = pp2.find('#count_two').val();
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
		var all = Number($(this).siblings('.total_num').text());
		var p = Number($(this).siblings('.number').text());
		star2 = pp2.find('#count_one').val();
		end2 = pp2.find('#count_two').val();
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
	/*进行中项目跳页*/
	$(document).on('click', '.item_count .now_count .paging .jump .go', function() {
		var all = $(this).siblings('.total_num').text();
		var jump_num = Number($(this).siblings(".jump_page").val());
		star2 = pp2.find('#count_one').val();
		end2 = pp2.find('#count_two').val();
		page5 = jump_num;
		if(jump_num > 0) {
			data5 = {
				status: 0,
				start_time: star2,
				end_time: end2,
				type: type2,
				project_name: pname2,
				page: page5
			}
			searchFun2(data5, 1, pp2);
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
		} else {
			toast("请输入正常页码")
		}
	})
	$(document).on('click', '.item_count .past_count .paging .page_right .less', function() {
		var all = Number($(this).siblings('.total_num').text());
		var p = Number($(this).siblings('.number').text());
		star2 = pp2.find('#count_one').val();
		end2 = pp2.find('#count_two').val();
		page6 = p;
		if(p > 1) {
			page6--;
			data6 = {
				status: 1,
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
		var all = Number($(this).siblings('.total_num').text());
		var p = Number($(this).siblings('.number').text());
		star2 = pp2.find('#count_one').val();
		end2 = pp2.find('#count_two').val();
		page6 = p;
		if(p < all) {
			page6++;
			data6 = {
				status: 1,
				start_time: star2,
				end_time: end2,
				type: type2,
				project_name: pname2,
				page: page6
			}
			searchFun2(data6, 2, pp2);
		}
	})
	/*已完成项目跳页*/
	$(document).on('click', '.item_count .past_count .paging .jump .go', function() {
		var all = $(this).siblings('.total_num').text();
		var jump_num = Number($(this).siblings(".jump_page").val());
		star2 = pp2.find('#count_one').val();
		end2 = pp2.find('#count_two').val();
		page6 = jump_num;
		if(jump_num > 0) {
			data6 = {
				status: 1,
				start_time: star2,
				end_time: end2,
				type: type2,
				project_name: pname2,
				page: page6
			}
			searchFun2(data6, 2, pp2);
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
		} else {
			toast("请输入正常页码")
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
						console.log(page5);
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
	/*进行中计提查看*/
	var itemId; /*项目id*/
	var child_id; /*子项目id*/
	var jitiId; /*计提id*/
	var memberId; /*成员管理需要的id*/
	$(document).on("click", ".item_count .now_count tbody td .check", function() {
		itemId = $(this).attr("data-id");
		/*获取子项目*/
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Finance/commissionDetails",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				project_id: itemId
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data)
					var datas = data.data.project_child_info;
					var datas1 = data.data.project_info;
					var lis = '';
					//					console.log(datas.length)
					for(var i = 0; i < datas.length; i++) {
						lis += '<li data-id="' + datas[i].project_child_id + '">' + datas[i].project_child_name + '</li>';
					}
					//					console.log(lis)
					$(".countDetail .floor_ul li").remove();
					$(".countDetail .floor_ul").append(lis);
					$(".countDetail .floor_ul li").eq(0).addClass("active");
					$(".countDetail .floor_right span").text(datas[0].project_child_name);
					$(".countDetail .count_cnt_head .n1 input").val(datas1.project_name);
					$(".countDetail .count_cnt_head .n2 input").val(datas1.project_time);
					$(".countDetail .count_cnt_head .n3 input").val(datas1.stage);
					$(".countDetail .count_cnt_head .n4 input").val(datas1.total_commission);
					$(".countDetail .count_cnt_head .n5 input").val(datas1.director_name);
					child_id = $(".countDetail .floor_ul li.active").attr("data-id");
					c_count(itemId, child_id);
					$("#boxPock").show();
					$("#boxPock .countDetail").show();
				} else {
					toast(data.msg)
				}
			},
			error: function(data) {

			},
			async: true
		});
	})
	/*项目计提countDetail进行中和历史计提*/
	function c_count(itemId, child_id) {
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Finance/commissionDetails",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				project_id: itemId,
				project_child_id: child_id,
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data)
					var datas = data.data.history_project_commission;
					var datas1 = data.data.current_project_commission;
					var datas2 = data.data.project_info;
					$(".countDetail .count_cnt_head .n1 input").val(datas2.project_name);
					$(".countDetail .count_cnt_head .n2 input").val(datas2.project_time);
					$(".countDetail .count_cnt_head .n3 input").val(datas2.stage);
					$(".countDetail .count_cnt_head .n4 input").val(datas2.total_commission);
					$(".countDetail .count_cnt_head .n5 input").val(datas2.director_name);
					var lis = '';
					for(var i = 0; i < datas.length; i++) {
						lis += '<tr data-id="' + datas[i].project_commission_id + '">';
						lis += '<td>' + (i + 1) + '</td>';
						lis += '<td>' + datas[i].start_time + '/' + datas[i].end_time + '</td>';
						lis += '<td>' + datas[i].amount + '</td>';
						lis += '<td>项目主管：<i class="xmzg">' + datas[i].supervisor_rate + '</i>&nbsp;项目组：<i class="xmz">' + datas[i].group_rate + '</i></td>';
						lis += '<td><span class="check">查看</span></td>';
						lis += '<td class="handle"><span class="edit">查看</span></td>';
						lis += '</tr>';
					}
					$(".countDetail .histroy_count tbody tr").remove();
					$(".countDetail .histroy_count tbody").append(lis);
					if(datas1) {
						$(".countDetail .histroy_count tbody tr").remove();
						$(".countDetail .histroy_count tbody").append(lis);
						$(".countDetail .count_go .n7 input").val(datas1.start_time + '/' + datas1.end_time);
						$(".countDetail .count_go .status .check").attr("data-id", datas1.project_commission_id);
						if(datas1.is_submit == 0) {
							$('.countDetail .count_cnt .n11 .submit').text('未提交');
							$(".countDetail .jtbtn1").hide()
						} else {
							$('.countDetail .n11 .submit').html('已提交');
							$(".countDetail .jtbtn1").show()
						}
					} else {
						$(".countDetail .count_go .n7 input").val("");
						$(".countDetail .jtbtn1").hide();
					}
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	}
	/*楼号切换*/
	$(document).on("click", ".countDetail .floor_ul li", function() {
		$(this).addClass("active").siblings().removeClass("active");
		var txt = $(this).text();
		$(".countDetail .floor_right span").text(txt);
		child_id = $(this).attr("data-id");
		c_count(itemId, child_id);
	})
	/*countDetail历史计提查看*/
	$(document).on("click", ".countDetail table tbody .edit", function() {
		var time = $(this).parents("tr").find("td").eq(1).text();
		var money = $(this).parents("tr").find("td").eq(2).text();
		var xmzg = $(this).parents("tr").find("td .xmzg").text();
		var xmz = $(this).parents("tr").find("td .xmz").text();
		$(".count_edit .time").val(time);
		$(".count_edit .money").val(money);
		$(".count_edit .xmzg").val(xmzg);
		$(".count_edit .xmz").val(xmz);
		$("#boxPock .countDetail").hide();
		$("#boxPock .count_edit").show();
	})
	$(document).on("click", ".count_edit .count_edit_head i,.count_edit .btn2", function() {
		$("#boxPock .countDetail").show();
		$("#boxPock .count_edit").hide();
	})
	/*countDetail历史计提项目组查看*/
	var planNum;
	$(document).on("click", ".countDetail table tbody .check", function() {
		planNum = 1;
		$("#boxPock .countDetail").hide();
		$("#boxPock .item_plan1").show();
		jitiId = $(this).parents("tr").attr("data-id");
		//		console.log(jitiId)
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Finance/getProjectWorkCommission",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				project_commission_id: jitiId,
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data)
					var datas = data.data;
					var lis = '';
					for(var i = 0; i < datas.length; i++) {
						lis += '<tr data-id="' + datas[i].work_id + '">';
						lis += '<td>' + (i + 1) + '</td>';
						lis += '<td>' + datas[i].start_time + '/' + datas[i].end_time + '</td>';
						lis += '<td>' + datas[i].work_name + '</td>';
						lis += '<td>' + datas[i].username + '</td>';
						lis += '<td>' + datas[i].commission_rate + '</td>';
						lis += '<td class="sub"> <i class="submit">已提交</i><span class="detail">详情</span></td>';
						lis += '<td class="handle"><i class="hascheck">已审核</i></td>';
						lis += '</tr>';
					}
					$(".item_plan1 tbody tr").remove();
					$(".item_plan1 tbody").append(lis);
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	})
	/*计提查看关闭*/
	$(document).on("click", ".item_plan1_head i,.item_plan1 .btn2", function() {
		if(planNum == 1) {
			$("#boxPock .countDetail").show();
			$("#boxPock .item_plan1").hide();
		} else if(planNum == 3) {
			$("#boxPock .his_count").show();
			$("#boxPock .item_plan1").hide();
		}
	});
	/*已提交方案详情*/
	$(document).on("click", ".item_plan1 tbody .detail", function() {
		$("#boxPock .item_plan1").hide();
		$("#boxPock .worker_style").show();
		var workid = $(this).parents("tr").attr("data-id");
		planDetail(jitiId, workid);
	})
	$(document).on("click", ".item_plan tbody .detail", function() {
		$("#boxPock .item_plan").hide();
		$("#boxPock .worker_style").show();
		var workid = $(this).parents("tr").attr("data-id");
		planDetail(jitiId, workid);
	})

	function planDetail(jitiId, workid) {
		$.ajax({
			headers: {
				accept: 'usertoken:' + localStorage.getItem('token')
			},
			type: "GET",
			url: host_host_host + "/Home/Finance/getProjectStaffCommission",
			dataType: 'json',
			data: {
				project_commission_id: jitiId,
				work_id: workid
			},
			success: function(data) {
				if(data.status == 1) {
					var infos = data.data.info;
					$(".worker_style_top .n1 input").val(infos.start_time);
					$(".worker_style_top .n2 input").val(infos.work_name);
					$(".worker_style_top .n3 input").val(infos.username);
					$(".worker_style_top .n4 input").val(infos.commission_rate);
					var datas = data.data.list;
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
	}
	/*方案详情关闭*/
	$(".worker_style .worker_style_head i,.worker_style .btn2").on("click", function() {
		if(planNum == 1) {
			$("#boxPock .item_plan1").show();
			$("#boxPock .worker_style").hide();
		} else if(planNum == 2) {
			$("#boxPock .item_plan").show();
			$("#boxPock .worker_style").hide();
		} else if(planNum == 3) {
			$("#boxPock .item_plan1").show();
			$("#boxPock .worker_style").hide();
		}
	})
	/*计提进行中查看*/
	$(document).on("click", ".countDetail_bottom .count_cnt .count_go .status .check", function() {
		jitiId = $(this).attr('data-id');
		planNum = 2;
		$.ajax({
			headers: {
				accept: 'usertoken:' + localStorage.getItem('token')
			},
			type: "get",
			url: host_host_host + "/Home/Finance/getProjectWorkCommission",
			dataType: 'json',
			data: {
				project_commission_id: jitiId
			},
			success: function(data) {
				if(data.status == 1) {
					var datas = data.data;
					var str = '';
					$("#jiji_tb").html("");
					//循环出组成员
					for(var i in datas) {
						var o = datas[i];
						var item = $(
							'<tr data-id="' + o.work_id + '">' +
							'<td>' + (parseInt(i) + 1) + '</td>' +
							'<td>' + o.start_time + '</td>' +
							'<td>' + o.work_name + '</td>' +
							'<td>' + o.username + '</td>' +
							'<td>' + o.commission_rate + '</td>' +
							'<td class="sub" data-id="' + o.is_submit + '"><i class="submit">已提交</i><i class="nosubmit">未提交</i><span class="detail keke">详情</span></td>' +
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
				if(arr[i] == obj) {
					jiTistatus = 0;
				} else {
					jiTistatus = 1;
				}
			}
		}
		contains(jiTiarr, 0);
		//		console.log(jiTiarr)
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
					project_commission_id: jitiId,
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
				project_commission_id: jitiId,
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
	})
	$(document).on("click", ".item_plan .item_plan_head i,.item_plan .btn2", function() {
		$("#boxPock .countDetail").show();
		$("#boxPock .item_plan").hide();
	})
	//获取项目组成员
	$(document).on("click", ".countDetail .check_one", function() {
		child_id = $(".countDetail .floor_ul li.active").attr('data-id');
		var txt = $(".countDetail .floor_ul li.active").text();
		//		console.log(child_id, txt)
		$.ajax({
			headers: {
				accept: 'usertoken:' + localStorage.getItem('token')
			},
			type: "POST",
			url: host_host_host + "/home/project/childInfo",
			dataType: 'json',
			data: {
				id: child_id
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data);
					var datas = data.data.work;
					var lis = '';
					lis += '<div class="item_manage duty">';
					lis += '<span>项目主管：</span>';
					lis += '<input type="text" value="' + data.data.director.nickname + '"/>';
					lis += '</div>';
					for(var i = 0; i < datas.length; i++) {
						lis += '<div class="duty">';
						lis += '<span>' + datas[i].name + '：</span>';
						lis += '<input type="text" value="' + datas[i].nickname + '"/>';
						lis += '</div>';
					}
					$("#project_group .duty").remove();
					$("#project_group").append(lis);
					$(".count_floor .floor_top span").text(txt);
					$(".count_floor input").each(function() {
						var txt = $(this).val();
						if(txt == "null") {
							$(this).val("");
						}
					})

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
				chile_id: child_id
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data);
					var datas = data.data.user;
					//					console.log("分工" + JSON.stringify(data));
					$("#project_group_tb").html("");
					//循环出组成员
					for(var i in datas) {
						var o = datas[i];
						var otem = $(
							'<tr>' +
							'<td>' + (Number(i) + 1) + '</td>' +
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

	/*已完成计提*/
	$(document).on("click", ".item_count .past_count tbody td .check", function() {
		itemId = $(this).attr("data-id");
		$("#boxPock").show();
		$("#boxPock .his_count").show();
		/*获取子项目*/
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Finance/commissionDetails",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				project_id: itemId
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data)
					var datas = data.data.project_child_info;
					var datas1 = data.data.project_info;
					var lis = '';
					//					console.log(datas.length)
					for(var i = 0; i < datas.length; i++) {
						lis += '<li data-id="' + datas[i].project_child_id + '">' + datas[i].project_child_name + '</li>';
					}
					//					console.log(lis)
					$(".his_count .floor_ul li").remove();
					$(".his_count .floor_ul").append(lis);
					$(".his_count .floor_ul li").eq(0).addClass("active");
					$(".his_count .floor_right span").text(datas[0].project_child_name);
					$(".his_count .count_cnt_head .n1 input").val(datas1.project_name);
					$(".his_count .count_cnt_head .n2 input").val(datas1.project_time);
					$(".his_count .count_cnt_head .n3 input").val(datas1.stage);
					$(".his_count .count_cnt_head .n4 input").val(datas1.total_commission);
					$(".his_count .count_cnt_head .n5 input").val(datas1.director_name);
					child_id = $(".countDetail .floor_ul li.active").attr("data-id");
					p_count(itemId, child_id);
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	})
	/*楼号切换*/
	$(document).on("click", ".his_count .floor_ul li", function() {
		$(this).addClass("active").siblings().removeClass("active");
		var txt = $(this).text();
		$(".his_count .floor_right span").text(txt);
		child_id = $(this).attr("data-id");
		p_count(itemId, child_id);
	})
	/*项目计提countDetail历史计提*/
	function p_count(itemId, child_id) {
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Finance/commissionDetails",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				project_id: itemId,
				project_child_id: child_id,
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data)
					var datas = data.data.history_project_commission;
					var datas1 = data.data.current_project_commission;
					var datas2 = data.data.project_info;
					$(".his_count .count_cnt_head .n1 input").val(datas2.project_name);
					$(".his_count .count_cnt_head .n2 input").val(datas2.project_time);
					$(".his_count .count_cnt_head .n3 input").val(datas2.stage);
					$(".his_count .count_cnt_head .n4 input").val(datas2.total_commission);
					$(".his_count .count_cnt_head .n5 input").val(datas2.director_name);
					var lis = '';
					for(var i = 0; i < datas.length; i++) {
						lis += '<tr data-id="' + datas[i].project_commission_id + '">';
						lis += '<td>' + (i + 1) + '</td>';
						lis += '<td>' + datas[i].start_time + '/' + datas[i].end_time + '</td>';
						lis += '<td>' + datas[i].amount + '</td>';
						lis += '<td>项目主管：<i class="xmzg">' + datas[i].supervisor_rate + '</i>&nbsp;项目组：<i class="xmz">' + datas[i].group_rate + '</i></td>';
						lis += '<td><span class="check">查看</span></td>';
						lis += '<td class="handle"><span class="edit">查看</span></td>';
						lis += '</tr>';
					}
					$(".his_count .histroy_count tbody tr").remove();
					$(".his_count .histroy_count tbody").append(lis);
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	}
	/*countDetail历史计提项目组查看*/
	$(document).on("click", ".his_count table tbody .check", function() {
		planNum = 3;
		$("#boxPock .his_count").hide();
		$("#boxPock .item_plan1").show();
		jitiId = $(this).parents("tr").attr("data-id");
		//		console.log(jitiId)
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Finance/getProjectWorkCommission",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				project_commission_id: jitiId,
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data)
					var datas = data.data;
					var lis = '';
					for(var i = 0; i < datas.length; i++) {
						lis += '<tr data-id="' + datas[i].work_id + '">';
						lis += '<td>' + (i + 1) + '</td>';
						lis += '<td>' + datas[i].start_time + '/' + datas[i].end_time + '</td>';
						lis += '<td>' + datas[i].work_name + '</td>';
						lis += '<td>' + datas[i].username + '</td>';
						lis += '<td>' + datas[i].commission_rate + '</td>';
						lis += '<td class="sub"> <i class="submit">已提交</i><span class="detail">详情</span></td>';
						lis += '<td class="handle"><i class="hascheck">已审核</i></td>';
						lis += '</tr>';
					}
					$(".item_plan1 tbody tr").remove();
					$(".item_plan1 tbody").append(lis);
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	})
	/*his_count历史计提查看*/
	$(document).on("click", ".his_count table tbody .edit", function() {
		var time = $(this).parents("tr").find("td").eq(1).text();
		var money = $(this).parents("tr").find("td").eq(2).text();
		var xmzg = $(this).parents("tr").find("td .xmzg").text();
		var xmz = $(this).parents("tr").find("td .xmz").text();
		$(".count_detail .time").val(time);
		$(".count_detail .money").val(money);
		$(".count_detail .xmzg").val(xmzg);
		$(".count_detail .xmz").val(xmz);
		$("#boxPock .count_detail").show();
		$("#boxPock .his_count").hide();
	})
	$(document).on("click", ".count_detail .count_detail_head i,.count_detail .btn2", function() {
		$("#boxPock .his_count").show();
		$("#boxPock .count_detail").hide();
	})
	/*获取lishi项目组成员*/
	$(document).on("click", ".his_count .check_one", function() {
		child_id = $(".his_count .floor_ul li.active").attr('data-id');
		var txt = $(".his_count .floor_ul li.active").text();
		//		console.log(child_id, txt)
		$.ajax({
			headers: {
				accept: 'usertoken:' + localStorage.getItem('token')
			},
			type: "POST",
			url: host_host_host + "/home/project/childInfo",
			dataType: 'json',
			data: {
				id: child_id
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data);
					var datas = data.data.work;
					var lis = '';
					lis += '<div class="item_manage duty">';
					lis += '<span>项目主管：</span>';
					lis += '<input type="text" value="' + data.data.director.nickname + '"/>';
					lis += '</div>';
					for(var i = 0; i < datas.length; i++) {
						lis += '<div class="duty">';
						lis += '<span>' + datas[i].name + '：</span>';
						lis += '<input type="text" value="' + datas[i].nickname + '"/>';
						lis += '</div>';
					}
					$("#project_group .duty").remove();
					$("#project_group").append(lis);
					$(".count_floor .floor_top span").text(txt);
					$(".count_floor input").each(function() {
						var txt = $(this).val();
						if(txt == "null") {
							$(this).val("");
						}
					})

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
				chile_id: child_id
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data);
					var datas = data.data.user;
					$("#project_group_tb").html("");
					//循环出组成员
					for(var i in datas) {
						var o = datas[i];
						var otem = $(
							'<tr>' +
							'<td>' + (i + 1) + '</td>' +
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
	/*计提确认提交*/
	$(document).on("click", ".countDetail .jtbtn1", function() {
		var project_commission_id = $(".countDetail .status .check").attr("data-id");
		var amount = $(".countDetail .count_go .n8 input").val();
		var supervisor_rate = Number($(".countDetail .count_go .n9 input").val());
		var group_rate = Number($(".countDetail .count_go .n10 input").val());
		var num = supervisor_rate + group_rate;
		if(!amount) {
			toast("请先填写金额")
		} else if(num == 100) {
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
						toast(data.msg)
						child_id = $(".countDetail .floor_ul li.active").attr("data-id");
						setTimeout(function() {
							pp2 = $('.item_count .item_time');
							type2 = pp2.find('.timeover select').val();
							pname2 = pp2.find('.staff_search input').val();
							star2 = pp2.find('#income_one').val();
							end2 = pp2.find('#income_two').val();
							var pagenum2 = $(".item_count .now_count .page_right .number").text();
							data5 = {
								status: 0,
								start_time: star2,
								end_time: end2,
								type: type2,
								project_name: pname2,
								page: pagenum2
							}
							$(".item_count .now_detail .page_right .number").text(pagenum2);
							searchFun2(data5, 1, pp2);
							$(".countDetail").hide();
							$("#boxPock").hide();
						}, 1000)
					} else {
						toast(data.msg)
					}
				},
				error: function(data) {

				},
				async: true
			});
		} else {
			toast("请检查输入数据")
		}
	})
	//进行中项目计提查看
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
})