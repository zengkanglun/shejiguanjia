$(function() {
	/*自定义显示*/
	$(document).on("click", ".define", function() {
		$(this).parents(".first_floor").find(".beixuan").show();
	})
	/*获取备选工种*/
	var id = localStorage.getItem("project_id");
	var token = localStorage.getItem("token");
	var director; /*项目主管名字*/
	var design;
	var director_id;
	setWork();

	function setWork() {
		$.ajax({
			type: "get",
			url: host_host_host + "/home/project/child",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				id: id
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data);
					director = data.data.nickname;
					director_id = data.data.director_id;
					design = "";
					for(var i = 0; i < data.data.work.length; i++) {
						if(i<7){
                            design += '<li class="active" data-id="' + data.data.work[i].id + '">';
						}else {
                            design += '<li data-id="' + data.data.work[i].id + '">';
						}

						design += '<i><img src="img/backstage_checkbox_orange.png" alt="" /></i>';
						design += '<span>' + data.data.work[i].name + '</span>';
						design += '</li>';
					}
					$(".beixuan .design li").remove();
					$(".beixuan .design").append(design);
					$(".director").val(director);
					$(".director").attr("data-id", director_id);
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	}

	/*备选工种添加*/
	$(document).on("click", ".cnt_detail .beixuan .design li i", function() {
		/*$(this).parents("li").toggleClass("active");
        var data_id = $(this).parents("li").attr("data-id");
        var spanTxt = $(this).siblings("span").text();
        var display = $(this).find("img").css("display");
        var tbody = '<tr data-id="' + data_id + '" class="work"><td class="item" data-id="' + data_id + '">' + spanTxt + '</td><td class="item_num"><span>选人</span><input type="text" class="show" data-id="0" disabled="disabled"/></td></tr>';

        if(display == "block") {
            $(this).parents(".cnt_detail").find("table tbody").append(tbody);
        } else {
            $(this).parents(".cnt_detail").find("table tbody tr").each(function() {
                var id = $(this).attr("data-id");
                if(id == data_id) {
                    $(this).remove();
                }
            })
        }*/
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
            $(this).parents("li").toggleClass("active");
            var spanTxt = $(this).siblings("span").text();
            var tbody = '<tr data-id="' + data_id + '"><td class="item" data-id="' + data_id + '">' + spanTxt + '</td><td class="item_num"><span>选人</span><input type="text" class="show" value="暂无" data-id="" disabled="disabled"/></td></tr>';
            $(this).parents(".cnt_detail").find("table tbody").append(tbody);
        }



	})
	/*增加子项目*/
	var subItem;
	$(document).on("click", ".subitems .add_item", function() {
		subItem = "";
		subItem += '<div class="cnt_detail first_floor">';
		subItem += '						<div class="item_name">新建子项目</div>';
		subItem += '						<div class="detail_head clearfix">';
		subItem += '							<div class="head_left define">';
		subItem += '								<img src="img/icon_add.png" alt="" />';
		subItem += '								<span>自定义</span>';
		subItem += '							</div>';
		subItem += '							<div class="head_right">';
		subItem += '								<div class="list">';
		subItem += '									<div class="small_item">子项目名称:</div>';
		subItem += '									<input type="text" name="" id="" value="新建子项目" class="floor" />';
		subItem += '								</div>';
		subItem += '							</div>';
		subItem += '						</div>';
		subItem += '						<table border="1" cellspacing="0">';
		subItem += '							<tbody>';
		subItem += '								<tr>';
		subItem += '									<td class="item"><i>*</i>项目主管：</td>';
		subItem += '									<td class="item_num">';
		subItem += '                                       <input type="text"  class="show director" value="' + director + '" data-id="0" disabled="disabled"/>';
		subItem += '									</td>';
		subItem += '								</tr>';
		subItem += '								<tr data-id="1" class="work">';
		subItem += '									<td class="item" data-id="1">规划工种：</td>';
		subItem += '									<td class="item_num">';
		subItem += '										<span>选人</span>';
		subItem += '										<input type="text" class="show" value="暂无" data-id="" disabled="disabled"/>';
		subItem += '									</td>';
		subItem += '								</tr>';
		subItem += '								<tr data-id="2" class="work">';
		subItem += '									<td class="item" data-id="2">方案工种：</td>';
		subItem += '									<td class="item_num">';
		subItem += '										<span>选人</span>';
		subItem += '										<input type="text" class="show" value="暂无" data-id="" disabled="disabled"/>';
		subItem += '								</td>';
		subItem += '								</tr>';
		subItem += '								<tr data-id="3" class="work">';
		subItem += '									<td class="item" data-id="3">建筑工种：</td>';
		subItem += '									<td class="item_num">';
		subItem += '										<span>选人</span>';
		subItem += '										<input type="text" class="show" value="暂无" data-id="" disabled="disabled"/>';
		subItem += '									</td>';
		subItem += '								</tr>';
		subItem += '								<tr data-id="4" class="work">';
		subItem += '									<td class="item" data-id="4">结构工种：</td>';
		subItem += '									<td class="item_num">';
		subItem += '										<span>选人</span>';
		subItem += '										<input type="text" class="show" value="暂无" data-id="" disabled="disabled"/>';
		subItem += '									</td>';
		subItem += '								</tr>';
		subItem += '								<tr data-id="5" class="work">';
		subItem += '									<td class="item" data-id="5">电气工种：</td>';
		subItem += '									<td class="item_num">';
		subItem += '									<span>选人</span>';
		subItem += '										<input type="text" class="show" value="暂无" data-id="" disabled="disabled"/>';
		subItem += '									</td>';
		subItem += '								</tr>';
		subItem += '								<tr data-id="6" class="work">';
		subItem += '									<td class="item" data-id="6">给排水工种：</td>';
		subItem += '									<td class="item_num">';
		subItem += '										<span>选人</span>';
		subItem += '										<input type="text" class="show" value="暂无" data-id="" disabled="disabled"/>';
		subItem += '									</td>';
		subItem += '								</tr>';
		subItem += '								<tr data-id="7" class="work">';
		subItem += '									<td class="item" data-id="7">暖通工种：</td>';
		subItem += '									<td class="item_num">';
		subItem += '										<span>选人</span>';
		subItem += '										<input type="text" class="show" value="暂无" data-id="" disabled="disabled"/>';
		subItem += '									</td>';
		subItem += '								</tr>';
		subItem += '							</tbody>';
		subItem += '						</table>';
		subItem += '						<div class="beixuan">';
		subItem += '							<div class="alternative">备选工种：</div>';
		subItem += '							<ul class="design clearfix">';
		subItem += '								<li data-id="1">';
		subItem += '									<i><img src="img/backstage_checkbox_orange.png" alt="" /></i>';
		subItem += '									<span>室内设计</span>';
		subItem += '								</li>';
		subItem += '								<li data-id="2">';
		subItem += '									<i><img src="img/backstage_checkbox_orange.png" alt="" /></i>';
		subItem += '									<span>室内设计</span>';
		subItem += '								</li>';
		subItem += '								<li data-id="3">';
		subItem += '									<i><img src="img/backstage_checkbox_orange.png" alt="" /></i>';
		subItem += '									<span>室内设计</span>';
		subItem += '								</li>';
		subItem += '								<li data-id="4">';
		subItem += '									<i><img src="img/backstage_checkbox_orange.png" alt="" /></i>';
		subItem += '									<span>室内设计</span>';
		subItem += '							</li>';
		subItem += '								<li data-id="5">';
		subItem += '								<i><img src="img/backstage_checkbox_orange.png" alt="" /></i>';
		subItem += '								<span>室内设计</span>';
		subItem += '								</li>';
		subItem += '							</ul>';
		subItem += '						</div>';
		subItem += '					</div>';

		$(".big_content").append(subItem);
		setWork();
	})
	/*改变子项目名字*/
	$(document).on("input", ".first_floor .head_right .list .floor", function() {
		$(this).parents(".first_floor").find(".item_name").text($(this).val())
	})

	/*选人添加人员*/
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
				var dataId = 0;
			}
			$(".admin li").removeClass("active");
			$(".item_right_ctn .work_style").remove();
			people.siblings(".show").val(listxt);
			people.siblings(".show").attr("data-id", dataId);
		})

		/*子项目提交*/
		var subNum = true;
		$(document).on("click", "#sub_btn", function() {
			child = [];
			var workArr = [];
			$(".big_content .first_floor").each(function() {
				var obj = {};
				workArr = [];
				$(this).find("tbody .work").each(function() { //
					var workObj = {};
					workObj = {
						work_id: $(this).find(".item").attr("data-id"),
						user_id: $(this).find(".item_num .show").attr("data-id"),
					};
					workArr.push(workObj);
				})
				obj = {
					name: $(this).find(".list .floor").val(),
					work: workArr
				}
				child.push(obj);
			})
			/*发送请求*/
			if(subNum) {
				subNum = false;
				$.ajax({
					type: "post",
					url: host_host_host + "/home/project/child",
					dataType: 'json',
					headers: {
						accept: "usertoken:" + token,
					},
					data: {
						ject_id: id,
						child: child
					},
					success: function(data) {
						if(data.status == 1) {
							toast(data.msg)
							setTimeout(function() {
								subNum = true;
								location.href = "index.html"
							}, 1000)
						} else {
							toast(data.msg)
						}
					},
					error: function(data) {
						subNum = true;
					},
					async: true
				});
			}
		})
		$(document).on('click', '#goback', function() {
			window.history.go(-1);
		})
	}
})