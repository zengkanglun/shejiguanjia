$(function() {
	/*自定义显示*/
	$(document).on("click", ".define", function() {
		$(this).parents(".first_floor").find(".beixuan").show();
	})
	/*获取备选工种*/
	var id = localStorage.getItem("project_id");
	var workDuty = localStorage.getItem("workDuty");
	var child_id;
	$.ajax({
		headers: {
			accept: 'usertoken:' + localStorage.getItem('token')
		},
		type: "post",
		url: host_host_host + "/home/project/index",
		dataType: 'json',
		data: {
			project_id: id,
		},
		success: function(data) {
			if(data.status == 1) {
				// console.log(data);
				var datas = data.data;
				var str = '';
				for(var i = 0; i < datas.child.length; i++) {
					if(i == 0) {
						str += '<li class="active" data-id="' + datas.child[i].id + '">' + datas.child[i].name + '</li>';
						child_id = datas.child[i].id;
						childPer(child_id, 1);
					} else {
						str += '<li data-id="' + datas.child[i].id + '">' + datas.child[i].name + '</li>';
					}
				}
				nmain(datas.child[0].id);
				$('.floor_cnt_ul ').html(str);
				$(".big_content .list_name .floor").val(data.data.child[0].name);
                $(".big_content .list_name .floor").attr('id',data.data.child[0].id);
			} else {
				toast(data.msg);
			}
		},
		error: function(data) {

		},
		async: true
	});

	function childPer(id, p) {
		$.ajax({
			headers: {
				accept: 'usertoken:' + localStorage.getItem('token')
			},
			type: "post",
			url: host_host_host + "/home/project/ProjectLabor",
			dataType: 'json',
			data: {
				chile_id: id,
				p: p
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data);
					var datas = data.data;
					var str = '';
					for(var i = 0; i < datas.user.length; i++) {
						str += '<tr>';
						str += '	<td>' + (i + 1) + '</td>';
						str += '	<td>' + datas.user[i].nickname + '</td>';
						str += '	<td>' + datas.user[i].work.name + '</td>';
						str += '	<td>' + datas.user[i].labor + '</td>';
						str += '	<td>' + datas.user[i].content + '</td>';
						str += '	<td class="handle"></td>';
						str += '</tr>';
					}
					$('.item_worker .paging .page_left span').html(datas.count);
					$('.item_worker .paging .page_right .total_num').html(datas.page);
					$('.item_worker .paging .page_right .number').html(p);
					$('.item_worker table tbody').html(str);
				} else {
					toast(data.msg)
				}
			},
			error: function(data) {

			},
			async: true
		});
	}
	/*分页*/
	$(document).on('click', '.item_worker .paging .page_right .less', function() {
		var p = Number($(this).siblings('.number').text());
		if(p > 1) {
			p--;
			childPer(child_id, p);
		} else {
			toast("已经是第一页了")
		}
	})
	$(document).on('click', '.item_worker .paging .page_right .more', function() {
		var p = Number($(this).siblings('.number').text());
		var all = Number($(this).siblings('.total_num').text());
		if(p < all) {
			p++;
			childPer(child_id, p);
		} else {
			toast("已经是最后一页了")
		}
	})
	/*跳页*/
	$(document).on("click", ".item_worker .paging .jump .go", function() {
		var jump_num = Number($(this).siblings(".jump_page").val());
		if(jump_num > 0) {
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
			childPer(child_id, jump_num);
		} else {
			toast("请输入正常页码")
		}
	})
	/*子分类点击*/
	$(document).on('click', '.floor_cnt_ul li', function() {
		$(this).addClass('active').siblings('li').removeClass('active');
		var id = $(this).attr('data-id');
		child_id = id;
		nmain(id);
		childPer(child_id, 1);
		var name = $(this).text();
		$(".big_content .list_name .floor").val(name)
	})
	

	function nmain(id) {
		$.ajax({
			headers: {
				accept: 'usertoken:' + localStorage.getItem('token')
			},
			type: "post",
			url: host_host_host + "/home/project/childInfo",
			dataType: 'json',
			data: {
				id: id
			},
			success: function(data) {
				if(data.status == 1) {
					// console.log(data);
					var datas = data.data;
					var str = '';
					$('.big_content tbody').html('');
					str += '<tr class="def">';
					str += '	<td class="item" data-id="' + datas.director.user_id + '"><i>*</i>项目主管：</td>';
					str += '		<td class="item_num">';
					str += '		<span>选人</span>';
					str += '		<input type="text" value="' + datas.director.nickname + '" class="show director" data-id="' + datas.director.user_id + '" disabled="disabled">';
					str += '	</td>';
					str += '</tr>';

                    for(var i = 0; i < datas.allWork.length; i++) {
                        str += '<tr class="work" data-id="' + datas.allWork[i].id + '">';
                        str += '	<td class="item" data-id="' + datas.allWork[i].id + '">' + datas.allWork[i].name + '：</td>';
                        str += '	<td class="item_num" data-id="' + datas.allWork[i].id + '">';
                        str += '		<span>选人</span>';
                        str += '		<input type="text" value="暂无" class="show" data-id="" disabled="disabled" />';
                        str += '		<input type="hidden" class="hidden" value="0" />';
                        str += '	</td>';
                        str += '</tr>';
                    }
                    $('.big_content tbody').append(str);

                    for(var i = 0; i < datas.work.length; i++) {
                    	str = '';
                        for(var a = 1; a < $('.cnt_detail tbody tr').length;a++){
                            if($('.cnt_detail tbody tr').eq(a).find('.item').attr('data-id') == datas.work[i].work_id){
                                $('.cnt_detail tbody tr').eq(a).find('.show').val(datas.work[i].nickname);
                                $('.cnt_detail tbody tr').eq(a).find('.show').attr('data-id',datas.work[i].user_id);
                            }
                        }
                    }


					/*for(var i = 0; i < datas.work.length; i++) {
						str += '<tr class="work">';
						str += '	<td class="item" data-id="' + datas.work[i].work_id + '">' + datas.work[i].name + '：</td>';
						str += '	<td class="item_num">';
						str += '		<span>选人</span>';
						str += '		<input type="text" value="' + datas.work[i].nickname + '" class="show" data-id="' + datas.work[i].user_id + '" disabled="disabled" />';
						str += '		<input type="hidden" class="hidden" value="0" />';
						str += '	</td>';
						str += '</tr>';
					}
					$('.big_content tbody').append(str);*/
					var list = '';
					$(".beixuan .design").html('');
					for(var i = 0;i < datas.allWork.length; i++){
                        list += '<li class="active" data-id="' + datas.allWork[i].id + '">';
                        list += '<i><img src="img/backstage_checkbox_orange.png" alt="" /></i>';
                        list += '<span>' + datas.allWork[i].name + '</span>';
                        list += '</li>';
					}
					for(var j = 0; j < datas.cust_work.length; j++) {
						list += '<li data-id="' + datas.cust_work[j].id + '">';
						list += '<i><img src="img/backstage_checkbox_orange.png" alt="" /></i>';
						list += '<span>' + datas.cust_work[j].name + '</span>';
						list += '</li>';
					}
					$(".beixuan .design").append(list);
					if(workDuty == 0) {
						$(".def").find("span").hide();
					} else {
						$(".def").find("span").show();
					}
				} else {
					toast(data.msg)
				}
			},
			error: function(data) {

			},
			async: true
		});

	}

	// 修改子项目工种负责人
	$(document).on('click', '.count_edit_footer .btn1', function() {
		var id = [];
		var user = [];
		var childName = $(".big_content .list_name .floor").val();

		for(var i = 1; i < $('.cnt_detail tbody tr').length; i++) {
			if($('.cnt_detail tbody tr').eq(i).find('.show').attr('data-id') != 0){
                id.push($('.cnt_detail tbody tr').eq(i).find('.item').attr('data-id'));
                user.push($('.cnt_detail tbody tr').eq(i).find('.show').attr('data-id'));
			}
		}
		console.log(id);
		console.log(user);
		$.ajax({
			headers: {
				accept: 'usertoken:' + localStorage.getItem('token')
			},
			type: "post",
			url: host_host_host + "/home/project/editchild",
			dataType: 'json',
			data: {
				work_id: id,
				user: user,
				child_id: child_id,
				child_name:childName,
				project_id: localStorage.getItem('project_id'),
				director_id: $('.cnt_detail tbody tr').eq(0).find('.director').attr('data-id')

			},
			success: function(data) {
				if(data.status == 1) {
					toast(data.msg);
					setTimeout(function() {
						location.href = "administration.html"
					}, 500)
				} else {
					toast(data.msg);
				}
			},
			error: function(data) {

			},
			async: true
		});
	})

	/*备选工种添加*/
	$(document).on("click", ".cnt_detail .beixuan .design li i", function() {
        var display = $(this).find("img").css("display");
        var data_id = $(this).parents("li").attr("data-id");
        // $(this).parents("li").toggleClass("active");
        if(display == "block") {
        	var flag = 0;
        	$(this).parents(".cnt_detail").find("table tbody tr").each(function() {
            var id = $(this).attr("data-id");

            if(id == data_id) {
                if($(this).find('.item_num input').attr('data-id') != ''){
                    toast('该工种已有负责人!');
                    // $(this).parents("li").removeClass("active");
                }else{
                    $(this).remove();
					flag = 1;
                }
            }
        	});
        	if(flag) $(this).parents("li").toggleClass("active");
        }else{
            // $(this).parents("li").addClass("active");
            $(this).parents("li").toggleClass("active");
            var spanTxt = $(this).siblings("span").text();
            var tbody = '<tr data-id="' + data_id + '"><td class="item" data-id="' + data_id + '">' + spanTxt + '</td><td class="item_num"><span>选人</span><input type="text" class="show" value="暂无" data-id="" disabled="disabled"/></td></tr>';
            $(this).parents(".cnt_detail").find("table tbody").append(tbody);
		}
/*
		$(this).parents("li").toggleClass("active");

		if(display == "block") {
			$(this).parents(".cnt_detail").find("table tbody").append(tbody);
		} else {
			$(this).parents(".cnt_detail").find("table tbody tr").each(function() {
				var id = $(this).attr("data-id");
				if(id == data_id) {
					if($(this).find('.item_num input').attr('data-id')){
						toast('该工种已有负责人!');
                        $(this).parents("li").toggleClass("active");
					}else{
                        $(this).remove();
					}

				}
			})
		}*/
	})

	/*选人添加人员*/
	addPeople();
	var all;
	var work;

	function addPeople() {
		$.ajax({
			headers: {
				accept: 'usertoken:' + localStorage.getItem('token')
			},
			type: "post",
			url: host_host_host + "/home/project/election",
			dataType: 'json',
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
	var people;
	var child;

	function choose() {
		$(document).on("click", ".first_floor td span", function() {
			$("#boxPock").show();
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
				var lis = '<li><img src="img/icon_del.png"/><span data-id="' + id + '">' + txt + '</span></li>';
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
			$("#subitem_choose,#boxPock").hide();
			var listxt = $(".item_right_ctn ul li span").text();
			if($(".item_right_ctn ul li").length > 0) {
				var dataId = $(".item_right_ctn ul li span").attr("data-id");
			} else {
				var dataId = '';
			}
			$(".admin li").removeClass("active");
			$(".item_right_ctn .work_style").remove();

			if(dataId != ''){
                people.siblings(".show").attr("data-id", dataId);
                people.siblings(".show").val(listxt != ''?listxt:'暂无');
			}
		})
	}

	$(document).on('click', '.count_edit_footer .btn2', function() {
		window.history.go(-1);
	})

	/*删除子项目*/
	var item_id;
	$(document).on("click", ".item_del", function() {
		item_id = $(".floor_cnt_ul li.active").attr("data-id");
		$("#boxPock").show();
		$(".del_c").show();
	})
	$(".del_c .btn2,.del_c .del_head i").on("click", function() {
		$("#boxPock").hide();
		$(".del_c").hide();
	})
	
	$(".del_c .btn1").on("click", function() {
		$.ajax({
			type: "post",
			url: host_host_host + "/home/project/delechild",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				child_id: item_id
			},
			success: function(data) {
				if(data.status == 1) {
					toast(data.msg);
					$("#boxPock").hide();
					$(".del_c").hide();
					setTimeout(function() {
						location.href = "administration.html";
					}, 500)
				} else {
					toast(data.msg)
				}
			},
			error: function(data) {
			},
			async: true
		});
	})

	/*跳转到新建子项目*/
	$('.newChild').on("click",function(){
        location.href = "subitem.html";
	});

})