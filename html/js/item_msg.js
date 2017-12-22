$(function() {
	$(".list select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(".list input").val(txt);
	})
	//子项目勾选
	$(document).on("click", ".project_msg .list .check", function() {
		$(this).find("img").toggle();
	})
	//子项目录入
	$(document).on("click", ".list .choose", function() {
		$("#boxPock").show();
		$(".subitems").show();
	})
	$(document).on("click", ".subitems .msg_head i", function() {
		$("#boxPock").hide();
		$(".subitems").hide();
	})
	//一号楼、二号楼切换
	$(document).on("click", ".subitems .item_ul li", function() {
		$(this).addClass("active").siblings().removeClass("active");
		var index = $(this).index();
		$(".subitems .cnt_detail").hide();
		$(".subitems .cnt_detail").eq(index).show();
	})
	//自定义
	$(".subitems .cnt_detail .define").on("click", function() {
		$("#user_defined").show();
		$(".subitems").hide();
	})
	//select选中
	$("select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	})
	/*token*/
	var token = localStorage.getItem("token");
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
	var arr = [];
	var obj = {};
	var people;

	function choose() {
		$(document).on("click", ".project_msg td span", function() {
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
			$("#subitem_choose,#boxPock").hide();
			var listxt = $(".item_right_ctn ul li span").text();
			var dataId = $(".item_right_ctn ul li span").attr("data-id");
			$(".admin li").removeClass("active");
			$(".item_right_ctn .work_style").remove();
			people.siblings(".show").val(listxt);
			people.siblings(".hidden").val(dataId);
		})
	}

	/*增加阶段*/
	var stage;
	var sche;
	$(document).on("click", ".process .stage", function() {
		stage = "";
		stage += '<div class="stage_add">';
		stage += '<div class="stage_name">';
		stage += '<input type="text" name="" id="" value="新阶段" />';
		stage += '</div>';
		stage += '<div class="stage_content">';
		stage += '<div class="content_head">阶段工作内容</div>';
		stage += '<textarea name="" rows="" cols="" placeholder="请输入内容"></textarea>';
		stage += '<div class="content_bottom">';
		stage += '<span>金额：</span>';
		stage += '<input type="" name="" id="" value="" />';
		stage += '<span>万</span>';
		stage += '</div>';
		stage += '</div>';
		stage += '</div>';
		$(".process .content").append(stage);
	})
	//	//项目阶段
	//	$(document).on("click", ".basic_msg .item_process", function() {
	//		$("#boxPock").show();
	//		$("#boxPock .process").show();
	//	})
	//	$(document).on("click", "#boxPock .process .process_head i,.process .btn1", function() {
	//		$("#boxPock").hide();
	//		$("#boxPock .process").hide();
	//	})
	//	$(document).on("click", ".process .btn1", function() {
	//		sche = [];
	//		for(var i = 0; i < $(".stage_add").length; i++) {
	//			var obj = {};
	//			obj.name = $(".stage_add .stage_name input").eq(i).val();
	//			obj.content = $(".stage_content textarea").val();
	//			obj.money = $(".content_bottom input").val();
	//			sche.push(obj);
	//		}
	//		console.log(sche)
	//		$("#boxPock").hide();
	//		$("#boxPock .process").hide();
	//	})
	/*获取建筑类型*/
	$.ajax({
		type: "post",
		url: host_host_host + "/home/common/BuildType",
		dataType: 'json',
		headers: {
			accept: "usertoken:" + token,
		},
		data: {},
		success: function(data) {
			if(data.status == 1) {
				var build_style = "";
				for(var i = 0; i < data.data.length; i++) {
					build_style += '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
				}
				$(".basic_msg .build_style option").remove();
				$(".basic_msg .build_style").append(build_style);
				$(".basic_msg .building_type").val(data.data[0].name);
				$(".basic_msg .building_type").attr("id", data.data[0].id);
			} else {

			}
		},
		error: function(data) {

		},
		async: true
	});
	$(document).on("change", ".basic_msg .build_style", function() {
		var id = $(this).find("option:checked").val();
		$(".basic_msg .building_type").attr("id", id);
	})
	/*获取阶段类型*/
	$.ajax({
		type: "post",
		url: host_host_host + "/home/common/StageTypes",
		dataType: 'json',
		headers: {
			accept: "usertoken:" + token,
		},
		data: {},
		success: function(data) {
			if(data.status == 1) {
//				console.log(data)
				var build_style = "";
				for(var i = 0; i < data.data.length; i++) {
					build_style += '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
				}
				$(".basic_msg .stage_style option").remove();
				$(".basic_msg .stage_style").append(build_style);
				$(".basic_msg .stage").val(data.data[0].name);
				$(".basic_msg .stage").attr("id", data.data[0].id);
			} else {

			}
		},
		error: function(data) {

		},
		async: true
	});
	$(document).on("change", ".basic_msg .stage_style", function() {
		var id = $(this).find("option:checked").val();
		$(".basic_msg .stage").attr("id", id);
	})
	/*提交发送*/
	$(document).on('click', '#form_btn', function() {
		var form = new FormData($("#myform")[0]);
		var hcity = $("#hcity").val();
		var hproper = $("#hproper").val();
		if(!hcity){
			hcity = "";			
		}
		if(!hproper){
			hproper="";
		}
		form.append("province", hcity);
		form.append("city",hproper);
		form.append("building_type", $(".basic_msg .building_type").attr("id"));
		form.append("stage", $(".basic_msg .stage").attr("id"));
		$.ajax({
			url: host_host_host + "/home/project/AddProject",
			type: "post",
			headers: {
				accept: "usertoken:" + token,
			},
			data: form,
			processData: false,
			contentType: false,
			success: function(data) {
				if(data.status == 1) {
					var project_id = data.data;
					localStorage.setItem("project_id", project_id);
					$("#boxPock").show();
					$("#boxPock .item_success").show();
					$(document).on("click", ".item_success .btn1", function() {
						location.href = "subitem.html";
					})
				} else {
					toast(data.msg)
				}
			},
			error: function(e) {}
		});
	});
})