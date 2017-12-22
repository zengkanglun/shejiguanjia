$(function() {
	var token = localStorage.getItem("token");
	//select选中
	$("select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	})
	/*项目支出*/
	var page3 = 1;
	var page4 = 1;
	var data3 = {};
	var data4 = {};
	var pp1, type1, pname1, star1, end1;
	pp1 = $('.item_time');
	type1 = pp1.find('.timeover select').val();
	pname1 = pp1.find('.staff_search input').val();
	star1 = pp1.find('#expend_one').val();
	end1 = pp1.find('#expend_two').val();
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
	$(document).on('click', '.program_expend .search', function() {
		type1 = pp1.find('.timeover select').val();
		pname1 = pp1.find('.staff_search input').val();
		star1 = pp1.find('#expend_one').val();
		end1 = pp1.find('#expend_two').val();
		page3 = 1;
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
	/*立项切换*/
	$(document).on('change', '#income_s', function() {
		type1 = pp1.find('.timeover select').val();
		pname1 = pp1.find('.staff_search input').val();
		star1 = pp1.find('#expend_one').val();
		end1 = pp1.find('#expend_two').val();
		page3 = 1;
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
	/*搜索*/
	$(document).on('click', '.staff_search img', function() {
		type1 = pp1.find('.timeover select').val();
		pname1 = pp1.find('.staff_search input').val();
		star1 = pp1.find('#expend_one').val();
		end1 = pp1.find('#expend_two').val();
		page3 = 1;
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
		var all = Number($(this).siblings('.total_num').text());
		var p = Number($(this).siblings('.number').text());
		star1 = pp1.find('#expend_one').val();
		end1 = pp1.find('#expend_two').val();
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
		var all = Number($(this).siblings('.total_num').text());
		var p = Number($(this).siblings('.number').text());
		star1 = pp1.find('#expend_one').val();
		end1 = pp1.find('#expend_two').val();
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
	/*进行中项目跳页*/
	$(document).on('click', '.program_expend .now_expend .paging .jump .go', function() {
		var all = $(this).siblings('.total_num').text();
		var jump_num = Number($(this).siblings(".jump_page").val());
		star1 = pp1.find('#expend_one').val();
		end1 = pp1.find('#expend_two').val();
		page3 = jump_num;
		if(jump_num > 0) {
			data3 = {
				status: 0,
				start_time: star1,
				end_time: end1,
				type: type1,
				project_name: pname1,
				page: page3
			}
			searchFun1(data3, 1, pp1);
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
		} else {
			toast("请输入正常页码")
		}
	})
	$(document).on('click', '.program_expend .past_expend .paging .page_right .less', function() {
		var all = Number($(this).siblings('.total_num').text());
		var p = Number($(this).siblings('.number').text());
		star1 = pp1.find('#expend_one').val();
		end1 = pp1.find('#expend_two').val();
		page4 = p;
		if(p > 1) {
			page4--;
			data4 = {
				status: 1,
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
		var all = Number($(this).siblings('.total_num').text());
		var p = Number($(this).siblings('.number').text());
		star1 = pp1.find('#expend_one').val();
		end1 = pp1.find('#expend_two').val();
		page4 = p;
		console.log(all, p)
		if(p < all) {
			page4++;
			data4 = {
				status: 1,
				start_time: star1,
				end_time: end1,
				type: type1,
				project_name: pname1,
				page: page4
			}
			searchFun1(data4, 2, pp1);
		}
	})
	/*已完成项目跳页*/
	$(document).on('click', '.program_expend .past_expend .paging .jump .go', function() {
		var all = $(this).siblings('.total_num').text();
		var jump_num = Number($(this).siblings(".jump_page").val());
		star1 = pp1.find('#expend_one').val();
		end1 = pp1.find('#expend_two').val();
		page4 = jump_num;
		if(jump_num > 0) {
			data4 = {
				status: 1,
				start_time: star1,
				end_time: end1,
				type: type1,
				project_name: pname1,
				page: page4
			}
			searchFun1(data4, 2, pp1);
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
		} else {
			toast("请输入正常页码")
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
	//项目支出==============
	//项目支出查看
	var baozhangtype;
	var xiangmuzcId;
	var itemId;
	$(document).on("click", ".program_expend .now_expend tbody td .check", function() {
		$(".item_expend input").val("");
		$("#income_S").attr("data-id", 0);
		itemId = $(this).attr('data-id');
		xiangmuzcId = itemId;
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
		$("#boxPock").show();
		$("#boxPock .item_expend").show();
		expend(itemId)
	})

	function expend(id) {
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
	}
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
		pp1 = $('.program_expend .item_time');
		var pagenum = $(".program_expend .now_expend .page_right .number").text();
		var data1 = {
			status: 0,
			start_time: star1,
			end_time: end1,
			type: type1,
			project_name: pname1,
			page: pagenum,
		}
		$(".program_expend .now_expend .page_right .number").text(pagenum);
		searchFun1(data1, 1, pp1);
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
					expend(itemId);
					pp1 = $('.program_expend .item_time');
					var pagenum = $(".program_expend .now_expend .page_right .number").text();
					var data1 = {
						status: 0,
						start_time: star1,
						end_time: end1,
						type: type1,
						project_name: pname1,
						page: pagenum,
					}
					$(".program_expend .now_expend .page_right .number").text(pagenum);
					searchFun1(data1, 1, pp1);
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
			$("#subitem_choose").hide();
			$(".item_expend").show();
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
})