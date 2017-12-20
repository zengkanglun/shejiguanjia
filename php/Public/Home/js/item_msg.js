$(function() {
	$(document).on("click", ".project_msg .item_num a", function() {
		$("#boxPock").show();
		$("#subitem_choose").show();
	})
	$(document).on("click", "#subitem_choose .subitem_choose_head i", function() {
		$("#boxPock").hide();
		$("#subitem_choose").hide();
	})
	$(".list select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(".list input").val(txt);
	})
	//项目阶段
	$(document).on("click", ".basic_msg .item_process", function() {
		$("#boxPock").show();
		$("#boxPock .process").show();
	})
	$(document).on("click", "#boxPock .process .process_head i,.process .btn1", function() {
		$("#boxPock").hide();
		$("#boxPock .process").hide();
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
	//子项目选人
	$(document).on("click", ".project td span", function() {
		$("#boxPock").show();
		$("#subitem_choose").show();
	})
	$(document).on("click", ".subitems .msg_head i", function() {
		$("#boxPock").hide();
		$("#subitem_choose").hide();
	})
	$("select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	})

	//项目组信息记录
	itemAjax();

	function itemAjax() {
		$.ajax({
			type: "get",
			url: "/api/staff/work_types",
			dataType: 'json',
			data: {},
			success: function(data) {
				var datas = data;
				console.log(data)
				$(".project table tbody tr").remove();
				var tbody1 = "";
				var lis = "";
				//进行中
				function tbodyOne1(datas) {
					for(var i = 0; i < 7; i++) {
						tbody1 += '<tr data-id="' + datas[i].id + '"><td class="item" data-id="' + datas[i].id + '">' + datas[i].name + '</td><td class="item_num"><span>选人</span><input type="text" class="show" placeholder="请输入内容"/><input type="hidden" name="works[]" class="hidden" data-id="' + datas[i].id + '"/></td></tr>';
					}
					return tbody1;
				}
				tbodyOne1(datas);
				var manage = '<tr data-id="0"><td class="item"><i>*</i>项目主管</td><td class="item_num"><span>选人</span><input type="text" class="show" placeholder="请输入内容" /><input type="hidden" class="hidden" data-id="0"/></td></tr>';
				$(".project table tbody").append(manage);
				$(".project table tbody").append(tbody1);
				var length = $(".project_data table tbody tr").length;
				for(var j = 7; j < data.length; j++) {
					lis += '<li data-id="' + datas[j].id + '"><i><img src="/Public/Home/images/icon_checked.png" alt="" /></i><span>' + datas[j].name + '</span></li>'
				}
				$(".project .beixuan ul").append(lis);
				//判断奇偶看情况需要是否添加
			},
			error: function(data) {},
			async: true
		});
	}

	//工种选人
	workAjax();

	function workAjax() {
		$.ajax({
			type: "get",
			url: "/api/staff/work_staffs/",
			dataType: 'json',
			data: {},
			success: function(data) {
				var datas = data;
				$(".now_item .now_item_cnt .jobstyle").remove();
				var tbody1 = "";

				function tbodyOne2(datas) {
					for(var i = 0; i < data.length; i++) {
						tbody1 += '<div class="jobstyle">';
						tbody1 += '	<div class="job">';
						tbody1 += '		<i><img src="/Public/Home/images/icon_checked.png" alt="" /></i>';
						tbody1 += '		<span data-id="' + data[i].type_id + '">' + data[i].type_name + "工种" + '</span>';
						tbody1 += '		<s><img src="/Public/Home/images/arrow_bottom.png"/></s>';
						tbody1 += '	</div>';
						tbody1 += '	<ul class="worker">';
						for(var j = 0; j < data[i].staffs.length; j++) {
							tbody1 += '	<li data-id="' + data[i].staffs[j].sid + '">';
							tbody1 += '		<i><img src="/Public/Home/images/icon_checked.png" alt="" /></i>';
							tbody1 += '		<span>' + data[i].staffs[j].name + '</span>';
							tbody1 += '	</li>';
						}
						tbody1 += '	</ul>';
						tbody1 += '</div>';
					}
					return tbody1;
				}
				tbodyOne2(datas);
				$(".now_item .now_item_cnt").append(tbody1);
			},
			error: function(data) {},
			async: true
		});
	}
	histroy();

	function histroy() {
		$.ajax({
			type: "get",
			url: "/api/staff/get_project_team",
			dataType: 'json',
			data: {},
			success: function(data) {
				console.log(data);
				var str = '';
				for(var i = 0; i < data.length; i++) {
					str += '<div class="jobstyle">';
					str += '	<div class="job">';
					str += '		<i><img src="/Public/Home/images/icon_checked.png" alt="" /></i>';
					str += '		<span>' + data[i].name + '</span>';
					str += '		<s><img src="/Public/Home/images/arrow_bottom.png"/></s>';
					str += '	</div>';
					str += '	<ul class="worker">';
					for(var j = 0; j < data[i].workers.length; j++) {
						str += '	<li>';
						str += '		<i><img src="/Public/Home/images/icon_checked.png" alt="" /></i>';
						str += '		<span data-id="' + data[i].workers[j].staff_id + '">' + data[i].workers[j].real_name + '</span>';
						str += '	</li>';
					}
					str += '	</ul>';
					str += '</div>';
				}
				$('.subitem_choose_bottom .history_item').html(str);
			},
			error: function(data) {},
			async: true
		});
	}
	all();

	function all() {
		$.ajax({
			type: "get",
			url: "/api/staff/get_all_staff",
			dataType: 'json',
			data: {},
			success: function(data) {
				console.log(data);
				var str = '';
				for(var i = 0; i < data.length; i++) {
					str += '<li>';
					str += '	<i><img src="/Public/Home/images/icon_checked.png" alt="" /></i>';
					str += '	<span data-id="' + data[i].staff_id + '">' + data[i].real_name + '</span>';
					str += '</li>';
				}
				$('.subitem_choose_bottom .all_item ul').html(str);
			},
			error: function(data) {},
			async: true
		});
	}
	choose();
	/*空数组/空对象*/
	var arr = [];
	var obj = {};
	var people;

	function choose() {
		//子项目选人
		$(document).on('click', '.subitem_choose_bottom .item_name li', function() {
			$(this).addClass("active").siblings().removeClass("active");
			var index = $(this).index();
			$(".subitem_choose_bottom .admin").hide();
			$(".subitem_choose_bottom .admin").eq(index).show();
		})
		$(document).on("click", ".project td span", function() {
			$("#boxPock").show();
			$("#subitem_choose").show();
			people = '';
			var html = "";
			people = $(this);
			html += '<div class="work_style"><ul class="clearfix"></ul></div>';
			$(".item_right_ctn").append(html);
			return people;
		})
		$(document).on('click', '#jobbtn', function() {
			$("#subitem_choose,#boxPock").hide();
			var listxt = $(".item_right_ctn ul li span").text();
			$(".item_right_ctn ul li").remove();
			$(".admin li").removeClass("active");
			$(".item_right_ctn .work_style").remove();
			console.log(listxt)
			people.siblings(".show").val(listxt);
			var dataId = people.parents("tr").attr("data-id");
			people.siblings(".hidden").val(dataId + '-' + listxt);
		})
		$(document).on('click', '#subitem_choose .subitem_choose_head i', function() {
			$("#subitem_choose,#boxPock").hide();
			$(".item_right_ctn ul li").remove();
			$(".admin li").removeClass("active");
			$(".item_right_ctn .work_style").remove();
		})
		$(document).on("click", ".subitems .msg_head i", function() {
			$("#boxPock").hide();
			$("#subitem_choose").hide();
		})

		$(document).on("click", ".subitem_choose .admin .jobstyle .job", function() {
			var display = $(this).siblings(".worker").css("display");
			$(this).siblings(".worker").slideToggle();
			var src = "/Public/Home/images/arrow_bottom.png";
			var src1 = "/Public/Home/images/arrow_top.png"
			if(display == "none") {
				$(this).find("s>img").attr("src", src1);
			} else {
				$(this).find("s>img").attr("src", src);
			}
		});

		$(document).on("click", ".subitem_choose .admin li i", function() {
			var length = $(".item_right_ctn ul li").length;
			if(length == 0) {
				$(this).parents("li").addClass("active")
				var txt = $(this).siblings("span").text();
				var id = $(this).parents('li').attr('data-id');
				var lis = '<li><img src="/Public/Home/images/icon_del.png"/><span data-id="' + id + '">' + txt + '</span></li>';
				$(".item_right_ctn ul").append(lis);
			}
		});

		$(document).on("click", ".subitem_choose .admin li.active i", function() {
			$(this).parents("li").removeClass("active");
			$(".item_right_ctn ul li").remove();
		});

		$(document).on("click", ".item_right_ctn ul li img", function() {
			$(".item_right_ctn ul li").remove();
			$(".subitem_choose_bottom .admin ul li").removeClass("active");
		});
	}

	//自定义
	$(document).on("click", ".project .project_head span", function() {
		$(".project .beixuan").show();
	})
	$(document).on("click", ".beixuan .design li i", function() {
		$(this).parents("li").toggleClass("active");
		var data_id = $(this).parents("li").attr("data-id");
		var spanTxt = $(this).siblings("span").text();
		var display = $(this).find("img").css("display");
		var tbody = '<tr data-id="' + data_id + '"><td class="item" data-id="' + data_id + '">' + spanTxt + '</td><td class="item_num"><span>选人</span><input type="text" class="show" placeholder="请输入内容"/><input type="hidden" class="hidden" data-id="0"/></td></tr>';

		if(display == "block") {
			$(".project table tbody").append(tbody);
		} else {
			$(".project table tbody tr").each(function() {
				var id = $(this).attr("data-id");
				if(id == data_id) {
					$(this).remove();
				}
			})
		}
	})
	//姓名输入
	var arradmin = [];
	$(document).on("click", ".project .btn1", function() {
		arradmin = [];
		var objadmin = {};
		$(".project table tbody tr").each(function() {
			objadmin = {
				project: $(this).attr('data-id'),
				uname: $(this).find('.item_num .show').val()
			}
			arradmin.push(objadmin);
		})

		var serialize_data = $('#create_project').serializeArray();
		var arradmin = JSON.stringify(arradmin)
		serialize_data.push({
			"name": "works",
			"value": arradmin
		})
		$.post('/Home/index/create_project', serialize_data, function(data) {
			if(data.status) {
				layer.msg("新建成功");
				location.href = '../';
			} else {
				layer.msg(data.msg);
			}
		})

	})
})