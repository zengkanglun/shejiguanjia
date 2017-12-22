$(function() {
	var token = localStorage.getItem("token");
	//select选中
	$("select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	})
	/*经营统计查看*/
	$(document).on('click', '.item_content .list_detail tbody tr .handle .check', function() {
		var id = $(this).attr('data-id');
		console.log(id);
		localStorage.setItem('JYTJID', id);
		location.href = 'count_check.html';
	})
	/*经营统计*/
	var page8 = 1;
	var page9 = 1;
	var data8 = {};
	var data9 = {};
	var pp4, type4, pname4, star4, end4;
	pp4 = $('.item_time');
	type4 = pp4.find('.timeover select').val();
	pname4 = pp4.find('.staff_search input').val();
	star4 = pp4.find('#itemone').val();
	end4 = pp4.find('#itemtwo').val();
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
	$(document).on('click', '.item_content .search', function() {
		type4 = pp4.find('.timeover select').val();
		pname4 = pp4.find('.staff_search input').val();
		star4 = pp4.find('#itemone').val();
		end4 = pp4.find('#itemtwo').val();
		page8 = 1;
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
	/*立项切换*/
	$(document).on('change', '#itemdaoz', function() {
		type4 = pp4.find('.timeover select').val();
		pname4 = pp4.find('.staff_search input').val();
		star4 = pp4.find('#itemone').val();
		end4 = pp4.find('#itemtwo').val();
		page8 = 1;
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
	/*搜索*/
	$(document).on('click', '.staff_search img', function() {
		type4 = pp4.find('.timeover select').val();
		pname4 = pp4.find('.staff_search input').val();
		star4 = pp4.find('#itemone').val();
		end4 = pp4.find('#itemtwo').val();
		page8 = 1;
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
		var all = Number($(this).siblings('.total_num').text());
		var p = Number($(this).siblings('.number').text());
		star4 = pp4.find('#itemone').val();
		end4 = pp4.find('#itemtwo').val();
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
		var all = Number($(this).siblings('.total_num').text());
		var p = Number($(this).siblings('.number').text());
		star4 = pp4.find('#itemone').val();
		end4 = pp4.find('#itemtwo').val();
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
	/*进行中项目跳页*/
	$(document).on('click', '.item_content .lists .paging .jump .go', function() {
		var all = $(this).siblings('.total_num').text();
		var jump_num = Number($(this).siblings(".jump_page").val());
		star4 = pp4.find('#itemone').val();
		end4 = pp4.find('#itemtwo').val();
		page8 = jump_num;
		if(jump_num > 0) {
			data8 = {
				status: 0,
				start_time: star4,
				end_time: end4,
				type: type4,
				project_name: pname4,
				page: page8
			}
			searchFun4(data8, 1, pp4);
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
		} else {
			toast("请输入正常页码")
		}
	})
	$(document).on('click', '.item_content .pasts .paging .page_right .less', function() {
		var all = $(this).siblings('.total_num').text();
		var p = Number($(this).siblings('.number').text());
		star4 = pp4.find('#itemone').val();
		end4 = pp4.find('#itemtwo').val();
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
		star4 = pp4.find('#itemone').val();
		end4 = pp4.find('#itemtwo').val();
		page9 = p;
		if(p < all) {
			page9++;
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
	/*已完成项目跳页*/
	$(document).on('click', '.item_content .pasts .paging .jump .go', function() {
		var all = $(this).siblings('.total_num').text();
		var jump_num = Number($(this).siblings(".jump_page").val());
		star4 = pp4.find('#itemone').val();
		end4 = pp4.find('#itemtwo').val();
		page9 = jump_num;
		if(jump_num > 0) {
			data9 = {
				status: 1,
				start_time: star4,
				end_time: end4,
				type: type4,
				project_name: pname4,
				page: page9
			}
			searchFun4(data9, 2, pp4);
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
		} else {
			toast("请输入正常页码")
		}
	})

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
						strt += '	<td>' + datas.info.rate +'%</td>';
						strt += '</tr>';
						pp.parents('.item_content').find('.tongji tbody').html(strt);
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
})