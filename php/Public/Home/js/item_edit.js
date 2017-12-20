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


	//子项目选人
	$(document).on("click", ".project td span", function() {
		$("#boxPock").show();
		$("#subitem_choose").show();
	})
	$("select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	})
	//自定义
	$(document).on("click", ".subitems .head_left", function() {
		$(this).parents(".cnt_detail").find(".beixuan").show();
	})
	$(document).on("click", ".subitems table tr span", function() {
		$(".subitems").hide();
		$(".subitem_choose").show();
	})
	//项目组信息记录
	itemAjax();

	function itemAjax() {
		$.ajax({
			type: "get",
			url: "/Home/index/getProjectEdit",
			dataType: 'json',
			data: {},
			success: function(data) {
				console.log(data);
				var editData = data;
				console.log(editData.leaders[0].leader)
				$.ajax({
					type: "get",
					url: "/api/staff/work_types",
					dataType: 'json',
					data: {},
					success: function(data) {
						var datas = data;
						$(".project table tbody tr").remove();
						var tbody1 = "";
						var lis = "";
						//进行中
						for(var i = 0; i < 7; i++) {
							console.log(editData.leaders[i].leader);
							tbody1 += '<tr data-id="' + editData.leaders[i].leader + '">';
							tbody1 += '		<td class="item" data-id="' + editData.leaders[i].leader + '">' + editData.leaders[i].type + '负责</td>';
							tbody1 += '		<td class="item_num">';
							tbody1 += '			<span>选人</span>';
							tbody1 += '			<input value="' + editData.leaders[i].name + '" type="text" class="show" placeholder="请输入内容"/>';
							tbody1 += '			<input type="hidden" class="hidden" data-id="' + editData.leaders[i].leader + '"/>';
							tbody1 += '	</td>';
							tbody1 += '</tr>';
						}
						var manage = '<tr data-id="0"><td class="item"><i>*</i>项目' + editData.manger.type + '</td><td class="item_num"><span>选人</span><input value="' + editData.manger.name + '" type="text" class="show" placeholder="请输入内容" /><input type="hidden" class="hidden" data-id="0"/></td></tr>';
						$(".project table tbody").append(manage);
						$(".project table tbody").append(tbody1);
						var length = $(".project_data table tbody tr").length;
						for(var j = 7; j < data.length; j++) {
							lis += '<li data-id="' + datas[j].id + '"><i><img src="/Public/Home/images/icon_checked.png" alt="" /></i><span>' + datas[j].name + '</span></li>'
						}
						$(".project .beixuan ul").append(lis);
						//subitems 判断奇偶看情况需要是否添加
					},
					error: function(data) {},
					async: true
				});
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

				function tbodyOne(datas) {
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
				tbodyOne(datas);
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
	//子项目确认删除原来的
	$(document).on("click", ".subitems .msg_head i", function() {
//		$("#boxPock").hide();
//		$("#subitem_choose").hide();
		$(".item_right_ctn ul li").remove();
		$(".admin li").removeClass("active");
		$(".item_right_ctn .work_style").remove();		
		$("#boxPock").hide();
		$(".subitems").hide();
		$(".big_content .cnt_detail").remove();
		$(".subitems .item_ul li").remove();
	})
	choose();
	/*空数组/空对象*/
	var arr = [];
	var obj = {};
	var people;
	var flag;
	var edFin = 0;

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
			edFin = 0;
			return people;
		})
		$(document).on("click", ".subitems td span", function() {
			$("#boxPock").show();
			$("#subitem_choose").show();
			people = '';
			var html = "";
			people = $(this);
			html += '<div class="work_style"><ul class="clearfix"></ul></div>';
			$(".item_right_ctn").append(html);
			edFin = 1
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
			if(edFin == 1) {
				$('.subitem_choose .admin li').removeClass('active');
				$("#boxPock").show();
				$(".subitems").show();
			}
		})

		$(document).on("click", ".subitem_choose .subitem_choose_head i", function() {
			$("#boxPock").hide();
			$("#subitem_choose").hide();
			$(".item_right_ctn ul li").remove();
			$(".admin li").removeClass("active");
			$(".item_right_ctn .work_style").remove();
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
				var lis = '<li><img src="/Public/Home/images/icon_del.png"/><span>' + txt + '</span></li>';
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
	//选人结束
	//自定义
	$(document).on("click", ".project .project_head .head_left", function() {
		$(".project .beixuan").show();
	})
	$(document).on("click", ".project .beixuan .design li i", function() {
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
	/*
	 * 子项目
	 */
	$(document).on("click", ".subitems .beixuan .design li i", function() {
		$(this).parents("li").toggleClass("active");
		var data_id = $(this).parents("li").attr("data-id");
		var spanTxt = $(this).siblings("span").text();
		var display = $(this).find("img").css("display");
		var tbody = '<tr data-id="' + data_id + '"><td class="item" data-id="' + data_id + '">' + spanTxt + '</td><td class="item_num"><span>选人</span><input type="text" class="show" placeholder="请输入内容"/><input type="hidden" class="hidden" data-id="0"/></td></tr>';

		if(display == "block") {
			$(this).parents(".cnt_detail").find("table tbody").append(tbody);
		} else {
			$(this).parents(".cnt_detail").find("table tbody tr").each(function() {
				var id = $(this).attr("data-id");
				console.log(id)
				if(id == data_id) {
					$(this).remove();
				}
			})
		}
	})

	//子项目组自定义
	//	sonAjax();
	var sonitemBol = false;

	function sonAjax() {
		$.ajax({
			type: "get",
			url: "/api/staff/work_types",
			dataType: 'json',
			data: {},
			success: function(data) {
				console.log(data)
				var tbody = "";
				tbody += '<div class="cnt_detail first_floor">';
				tbody += '	<div class="detail_head clearfix">';
				tbody += '		<div class="head_left define clearfix">';
				tbody += '			<img src="/Public/Home/images/icon_add.png" alt="" />';
				tbody += '			<span>自定义</span>';
				tbody += '		</div>';
				tbody += '		<div class="head_right clearfix">';
				tbody += '			<div class="list_name">';
				tbody += '				<input type="text" name="" id="" value="新建子项目" class="floor"/>';
				tbody += '			</div>';
				tbody += '			<div class="list">';
				tbody += '				<div class="small_item">子项目名称:</div>';
				tbody += '				<input type="text" name="" id="" value="子项目一" class="floor" />';
				tbody += '				<i><img src="__HOME_IMAGES__/black_tri.png"/></i>';
				tbody += '				<select name="">';
				tbody += '					<option value="">1</option>';
				tbody += '					<option value="">2</option>';
				tbody += '					<option value="">3</option>';
				tbody += '				</select>';
				tbody += '			</div>';
				tbody += '		</div>';
				tbody += '	</div>';
				tbody += '	<table border="1" cellspacing="0">';
				tbody += '		<tbody>';
				tbody += '			<tr class="e9ecf1">';
				tbody += '				<td class="item" data-id="0"><i>*</i>项目主管</td>';
				tbody += '				<td class="item_num">';
				tbody += '					<input type="hidden" placeholder="请输入内容" value=" " data-id="0" class = "show"/>';
				tbody += '				</td>';
				tbody += '			</tr>';
				for(var j = 0; j < 7; j++) {
					tbody += '			<tr class="e9ecf1">';
					tbody += '				<td class="item" data-id="' + data[j].id + '">' + data[j].name + '负责</td>';
					tbody += '				<td class="item_num">';
					tbody += '					<span>选人</span>';
					tbody += '					<input type="text" placeholder="请输入内容" data-id="' + data[j].id + '" class="show"/>';
					tbody += '				</td>';
					tbody += '			</tr>';
				}
				tbody += '		</tbody>';
				tbody += '	</table>';
				tbody += '	<div class="beixuan">';
				tbody += '		<div class="alternative">备选工种：</div>';
				tbody += '		<ul class="design clearfix">';
				for(var j = 7; j < data.length; j++) {
					tbody += '<li data-id="' + data[j].id + '">';
					tbody += '<i><img src="/Public/Home/images/icon_checked.png" alt="" /></i>';
					tbody += '<span>' + data[j].name + '</span>';
					tbody += '</li>';
				}
				tbody += '		</ul>';
				tbody += '	</div>';
				tbody += '	<button type="button" class="btn1">提&nbsp;&nbsp;&nbsp;交</button>';
				tbody += '</div>';
				$(".big_content").append(tbody);
				if(sonitemBol) {
					sonitemBol = false;
					$(".big_content").find(".cnt_detail:last-child").show();
				}
			},
			error: function(data) {},
			async: true
		});
	}

	itemChoose();

	function itemChoose() {
		$(document).on("click", ".subitems .cnt_detail .head_left", function() {
			$(this).siblings(".beixuan").show();
		})
		//		$(document).on("click", ".subitems td span", function() {
		//			$("#boxPock .subitems").hide();
		//			$("#subitem_choose").show();
		//			people = '';
		//			var html = "";
		//			people = $(this);
		//			html += '<div class="work_style"><ul class="clearfix"></ul></div>';
		//			$(".item_right_ctn").append(html);
		//			return people;
		//		})
		//		$(document).on('click', '#jobbtn', function() {
		//			$("#subitem_choose").hide();
		//			$("#boxPock .subitems").show();
		//			var listxt = $(".item_right_ctn ul li span").text();
		//			$(".item_right_ctn ul li").remove();
		//			$(".jobstyle .worker li").removeClass("active");
		//			$(".item_right_ctn .work_style").remove();
		//			console.log(listxt)
		//			people.siblings(".show").val(listxt);
		//			var dataId = people.parents("tr").attr("data-id");
		//			people.siblings(".hidden").val(dataId + '-' + listxt);
		//		})
	}

	$(document).on('blur', '.subitems .list_name input', function() {
		$('.subitems .item_ul .active a').html($(this).val());
	})
	var arradmin = [];
	$(document).on("click", ".msg_bottom .btn1", function() {
		arradmin = [];
		var objadmin = {};
		$(".project table tbody tr").each(function() {
			objadmin = {
				project: $(this).attr('data-id'),
				uname: $(this).find('.item_num .show').val()
			}
			arradmin.push(objadmin);
		})
		console.log(arradmin);
		var arradmin = JSON.stringify(arradmin);
		console.log(arradmin)
		var serialize_data = $('#edit_project').serializeArray();
	})

	var arradminpop = [];
	var nameObj;
	$(document).on("click", ".subitems .btn1", function() {
		arradminpop = [];
		nameObj = "";
		var objadmin = {};
		var id = $(this).parents(".cnt_detail").find(".list_name .floor").attr("id");
		var name = $(this).parents(".cnt_detail").find(".list_name .floor").val();
		$(this).parents(".cnt_detail").find("table tbody tr").each(function() {
			objadmin = {
				project: $(this).find(".item").attr('data-id'),
				uname: $(this).find('.item_num .show').val()
			}
			arradminpop.push(objadmin);
		})
		if(!id) {
			id = '"null"';
		}
		var nameObj = JSON.stringify({
			arradminpop
		}) + '/' + '{"id":' + id + ',"name":"' + name + '"}';
		console.log(nameObj)
		$.post('/Home/Index/child_create', {
			"str": nameObj
		}, function(data) {
			if(data.status) {
				layer.msg('录入成功');
				location.reload();
			} else {
				layer.msg(data.msg + ' 请重新录入');
				location.reload();
			}
		});
	})
	//	var arradminpop = [];
	//	$(document).on("click", ".subitems .btn1", function() {
	//		$(".subitems .item_ul li").remove();
	//		hasflag = 0;
	//		console.log(hasflag)
	//		arradminpop = [];
	//		var objadmin = {};
	//		var id = $(this).parents(".cnt_detail").find(".list_name .floor").attr("id");
	//		var name = $(this).parents(".cnt_detail").find(".list_name .floor").val();
	//		console.log(id,name)
	//		$(this).parents(".cnt_detail").find("table tbody tr").each(function() {
	//			objadmin = {
	//				project: $(this).find(".item").attr('data-id'),
	//				uname: $(this).find('.item_num .show').val()
	//			}
	//			arradminpop.push(objadmin);
	//		})
	//		console.log(objadmin)
	////		objadminpop={
	////			pid : id,
	////			pname:name,
	////			data:objadmin
	////		}
	////		arradminpop.push(objadminpop);
	////		console.log(arradminpop);
	//	})

	/*判断是否有子项目*/
	//获取自定义工种
	var worktype = "";
	$.ajax({
		type: "get",
		url: "/Home/Index/getCustom",
		dataType: 'json',
		data: {},
		success: function(data) {
			console.log(data, data.length);
			for(var i = 0; i < data.length; i++) {
				worktype += '<li data-id="' + data[i].leader + '">';
				worktype += '<i><img src="/Public/Home/images/icon_checked.png" alt="" /></i>';
				worktype += '<span>' + data[i].type + '负责</span>';
				worktype += '</li>';
			}
		},
		error: function(data) {},
		async: true
	});
	//子项目录入
	var hasflag;
	var lilength;
	var liarr = [];
	var lis;
	$(document).on("click", ".list .choose", function() {
		$("#boxPock").show();
		$(".subitems").show();
		$('.subitem_choose .admin li').removeClass('active');
		$(".subitems .item_ul li").remove();
		$('.item_right_ctn').html('');
		lis = "";
		liarr = [];
		//判断
		$.ajax({
			type: "get",
			url: "/Home/Index/getSons",
			dataType: 'json',
			data: {},
			success: function(data) {
				console.log(data.status);
				if(data.status == 0) {
					sonAjax();
					hasflag = 1;
					var item_ul = '<li><a href="#">子项目一</a></li>';
					$(".subitems .item_ul").append("")
				} else {
					console.log(data);
					$(".big_content .cnt_detail").remove();
					var tbody = "";
					lilength = data.data.length;
					for(var i = 0; i < data.data.length; i++) {
						var liname = data.data[i].name;
						liarr.push(liname);
					}
					console.log(liarr);
					for(var i = 0; i < data.data.length; i++) {
						tbody += '<div class="cnt_detail first_floor">';
						tbody += '	<div class="detail_head clearfix">';
						tbody += '		<div class="head_left define clearfix">';
						tbody += '			<img src="/Public/Home/images/icon_add.png" alt="" />';
						tbody += '			<span>自定义</span>';
						tbody += '		</div>';
						tbody += '		<div class="head_right clearfix">';
						tbody += '			<div class="list_name">';
						tbody += '				<input type="text" name="" id="' + data.data[i].id + '" value="' + data.data[i].name + '" class="floor"/>';
						tbody += '			</div>';
						tbody += '			<div class="list">';
						tbody += '				<div class="small_item">子项目名称:</div>';
						tbody += '				<input type="text" name="" id="' + data.data[i].id + '" value="子项目一"  />';
						tbody += '				<i><img src="__HOME_IMAGES__/black_tri.png"/></i>';
						tbody += '				<select name="">';
						tbody += '					<option value="">1</option>';
						tbody += '					<option value="">2</option>';
						tbody += '					<option value="">3</option>';
						tbody += '				</select>';
						tbody += '			</div>';
						tbody += '		</div>';
						tbody += '	</div>';
						tbody += '	<table border="1" cellspacing="0">';
						tbody += '		<tbody>';
						tbody += '			<tr class="e9ecf1">';
						tbody += '				<td class="item" data-id="0"><i>*</i>项目主管</td>';
						tbody += '				<td class="item_num">';
						tbody += '					<input type="text" class="show" disabled = "disabled"/>';
						tbody += '				</td>';
						tbody += '			</tr>';
						for(var j = 0; j < data.data[i].leaders.length; j++) {
							tbody += '			<tr class="e9ecf1">';
							tbody += '				<td class="item" data-id="' + data.data[i].leaders[j].leader + '">' + data.data[i].leaders[j].type + '负责</td>';
							tbody += '				<td class="item_num">';
							tbody += '					<span>选人</span>';
							tbody += '					<input type="text" placeholder="请输入内容" value="' + data.data[i].leaders[j].name + '" class="show"/>';
							tbody += '				</td>';
							tbody += '			</tr>';
						}
						tbody += '		</tbody>';
						tbody += '	</table>';
						tbody += '	<div class="beixuan">';
						tbody += '		<div class="alternative">备选工种：</div>';
						tbody += '		<ul class="design clearfix">';
						tbody += worktype;
						tbody += '		</ul>';
						tbody += '	</div>';
						tbody += '	<button type="button" class="btn1">提&nbsp;&nbsp;&nbsp;交</button>';
						tbody += '</div>';
					}
					$(".big_content").append(tbody);
					for(var i = 0; i < liarr.length; i++) {
						lis += '<li><a href="#">' + liarr[i] + '</a></li>'
					}
					$(".item_ul").append(lis);
					$(".item_ul li").eq(0).addClass("active");
					$(".big_content .cnt_detail").hide();
					$(".big_content .cnt_detail").eq(0).show();
				}
			},
			error: function(data) {},
			async: true
		});
	})

	//新增用户判断
	$(document).on("click", ".subitems .add_item", function() {
		if(hasflag == 1) {
			toast("请先把此项目编辑完成");
		} else {
			hasflag = 1;
			var lis = '<li><a>新建子项目</a></li>'
			$(".subitems .item_ul").append(lis);
			$(".subitems .item_ul li").removeClass("active");
			$(".subitems .item_ul li:last").addClass("active");
			$(".big_content .cnt_detail").hide();
			sonitemBol = true;
			sonAjax();
		}
	})
	//一号楼、二号楼切换
	$(document).on("click", ".subitems .item_ul li", function() {
		$(this).addClass("active").siblings().removeClass("active");
		var index = $(this).index();
		$(".subitems .cnt_detail").hide();
		$(".subitems .big_content .cnt_detail").eq(index).show();
	})
})