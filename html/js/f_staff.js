$(function() {
	var token = localStorage.getItem("token");
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
		ppName.find('.bianji').attr("data-id",i);
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
	//行政支出编辑
	$(document).on("click",".expend_detail_head .bianji",function () {
		$(".expend_detail").hide();
		$(".expend_edit").show();
		var i = $(this).attr('data-id');
        $(".expend_edit .right input").val(xingzhenginfo.list[i].amount);
        $(".expend_edit .left input").val(xingzhenginfo.list[i].overhead_type_name);
        //$(".expend_edit .left select").attr("value",xingzhenginfo.list[i].overhead_type_id);
        $(".expend_edit textarea").val(xingzhenginfo.list[i].executive_content);
        $(".expend_edit .user .c_man").val(xingzhenginfo.list[i].username)
        $(".expend_edit .user .c_man").attr("data-id", xingzhenginfo.list[i].user_id);
        $(".expend_edit #expendone").val(xingzhenginfo.list[i].executive_time);
        $(".expend_edit .btn1").attr("id",xingzhenginfo.list[i].executive_id);
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
                    //str += '<option>请选择</option>';
                    for(var a = 0; a < datas.length; a++) {
                    	if (datas[a].id == xingzhenginfo.list[i].overhead_type_id){
                            str += '<option value="' + datas[a].id + '" selected="selected">' + datas[a].name + '</option>';
                        }else {
                            str += '<option value="' + datas[a].id + '">' + datas[a].name + '</option>';
						}

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
    })

	//行政支出新增
	$(document).on("click", ".staff_content .staff_add", function() {
		$(".expend_edit input").val("");
		$(".expend_edit textarea").val("");
		$(".expend_edit .user .c_man").attr("data-id", 0);
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
					str += '<option>请选择</option>';
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
		var userid = $(".expend_edit .user .c_man").attr("data-id");
		if(userid == 0) {
			toast("请选择经手人")
		} else {
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
					executive_content: ppp.find('.logging_bottom textarea').val(),
					executive_id: ppp.find('.btn1').attr('id')
				},
				success: function(data) {
					if(data.status == 1) {
						toast(data.msg);
						$("#boxPock").hide();
						$("#boxPock .expend_edit").hide();
						/*刷新页面*/
						pp3 = $('.staff_content .staff_time');
						star3 = pp3.find('#staffone').val();
						end3 = pp3.find('#stafftwo').val();
						var pagenum7 = $(".staff_content .list_detail .page_right .number").text();
						data7 = {
							start_time: star3,
							end_time: end3,
							page: pagenum7
						}
						searchFun3(data7, pp3);
						$(".item_income .list_detail .page_right .number").text(pagenum7);
					} else {
						toast(data.msg);
					}
				},
				error: function(data) {

				},
				async: true
			});
		}
	})
	$(".item_edit .item_edit_head i,.item_edit .btn2").on("click", function() {
		$("#boxPock").hide();
		$("#boxPock .item_edit").hide();
	})
	/*行政支出*/
	var page7 = 1;
	var data7 = {};
	var pp3, star3, end3;
	pp3 = $('.staff_time');
	star3 = pp3.find('#staffone').val();
	end3 = pp3.find('#stafftwo').val();
	data7 = {
		start_time: star3,
		end_time: end3,
		page: page7
	}
	searchFun3(data7, pp3);
	$(document).on('click', '.staff_content .search', function() {
		pp3 = $(this).parents('.staff_time');
		star3 = pp3.find('#staffone').val();
		end3 = pp3.find('#stafftwo').val();
		page7 = 1;
		data7 = {
			start_time: star3,
			end_time: end3,
			page: page7
		}
		searchFun3(data7, pp3);
	})
	$(document).on('click', '.staff_content .list_detail .paging .page_right .less', function() {
		var all = Number($(this).siblings('.total_num').text());
		var p = Number($(this).siblings('.number').text());
		star3 = pp3.find('#staffone').val();
		end3 = pp3.find('#stafftwo').val();
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
		var all = Number($(this).siblings('.total_num').text());
		var p = Number($(this).siblings('.number').text());
		star3 = pp3.find('#staffone').val();
		end3 = pp3.find('#stafftwo').val();
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
	/*进行中项目跳页*/
	$(document).on('click', '.staff_content .list_detail .jump .go', function() {
		var all = $(this).siblings('.total_num').text();
		var jump_num = Number($(this).siblings(".jump_page").val());
		star3 = pp3.find('#staffone').val();
		end3 = pp3.find('#stafftwo').val();
		page7 = jump_num;
		if(jump_num > 0) {
			data7 = {
				start_time: star3,
				end_time: end3,
				page: page7
			}
			searchFun3(data7, pp3);
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
		} else {
			toast("请输入正常页码")
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
					$("tbody td").each(function() {
						if($(this).text() == "null") {
							$(this).text("")
						}
					})
				} else {}
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
			$("#boxPock").hide();
			$("#boxPock .expend_edit").hide();
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