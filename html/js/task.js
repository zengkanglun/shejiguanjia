$(function() {
	/*tap选项栏*/
	$("#content .center_content .content_header .user_tab li").remove();
	tapChoose = sessionStorage.getItem("tapList");
	tapChoose = tapChoose.split('class="active"').join('class');
	if(tapChoose.indexOf("任务") < 0) {
		tapChoose += '<li class="active" name="task"><a href="task.html">任务</a><i><img src="img/icon_del.png" alt="" /></i></li>';
	} else {
		tapChoose = tapChoose.split('<li class name="task"><a href="task.html">任务</a><i><img src="img/icon_del.png" alt="" /></i></li>').join('<li class="active" name="task"><a href="task.html">任务</a><i><img src="img/icon_del.png" alt="" /></i></li>');
	}
	sessionStorage.setItem("tapList", tapChoose);
	$("#content .center_content .content_header .user_tab").append(tapChoose);
	$(document).on("click", "#content .center_content .content_header .user_tab li i", function() {
		$(this).parent().remove();
		tapChoose = $("#content .center_content .content_header .user_tab").html();
		sessionStorage.setItem("tapList", tapChoose);
		if($(this).parent().attr("class") == "active") {
			location.href = "index.html";
		}
	})
	$("#content .center_content .content_header .user_tab").find("li[name='task']").addClass("active");
	/*==========*/

	var token = localStorage.getItem("token");
	//tab栏切换
	$(".detail_tab li").on("click", function() {
		$(this).addClass("active").siblings().removeClass("active");
		var index = $(this).index();
		$(".content_detail .bigtask").hide();
		$(".content_detail .bigtask").eq(index).show();
		if(index == 0) {
			newTask(1);
			$(".new_task .page_right .number").text(1);
			$(".new_task .jump .jump_page").val("");			
		} else if(index == 1) {
			taskGo(1);
			$(".task_go .page_right .number").text(1);
			$(".task_go .jump .jump_page").val("");			
		} else if(index == 2) {
			historyTask(1);
			$(".history_task .page_right .number").text(1);
			$(".history_task .jump .jump_page").val("");			
		} else {
			buildTask(1);
			$(".build_task .page_right .number").text(1);
			$(".build_task .jump .jump_page").val("");			
		}
	})

	//新增任务
	var task_Num;
	$(document).on("click", ".build_task_left", function() {
		task_Num = true;
		$("#boxPock").show();
		$("#boxPock .newtask_add").show();
		$("#boxPock .newtask_add input").val("");
		$("#boxPock .newtask_add textarea").val("");
		/*===*/
		//类型
		var str = "";
		var ccc;
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Task/task_type",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data);
					for(var i = 0; i < data.data.length; i++) {
						str += '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
					}
					$('#task_type').html(str);
					$('#task_typename').val(data.data[0].name);
					$('#task_typename').attr("data-id", data.data[0].id);
				} else {}
			},
			error: function(data) {},
			async: true
		});
		/*===*/
		/*获取相关项目*/
		$.ajax({
			type: "get",
			url: host_host_host + "/home/public/correlation_projects",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data);
					var list = "";
					for(var i = 0; i < data.data.length; i++) {
						list += '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
					}
					$(".newtask_add .about option").remove();
					$(".newtask_add .about").append(list);
					$("#task_aboutname").val(data.data[0].name);
					$("#task_aboutname").attr("data-id", data.data[0].id);
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	})
	$(document).on("click", ".newtask_add .newtask_add_head i", function() {
		$("#boxPock").hide();
		$("#boxPock .newtask_add").hide();
	})
	$(document).on("click", ".newtask_add .btn2", function() {
		$("#boxPock").hide();
		$("#boxPock .newtask_add").hide();
	})
	//	$(document).on("click", ".newtask_detail .btn3", function() {
	//		$("#boxPock").hide();
	//		$("#boxPock .newtask_detail").hide();
	//	})
	//任务进行中弹窗
	$(document).on("click", ".task_go tbody .title", function() {
		$("#boxPock").show();
		$("#boxPock .taskgo_add").show();
	})
	$(document).on("click", ".taskgo_add .taskgo_add_head i", function() {
		$("#boxPock").hide();
		$("#boxPock .taskgo_add").hide();
	})
	$(document).on("click", ".taskgo_add .btn2", function() {
		$("#boxPock").hide();
		$("#boxPock .taskgo_add").hide();
	})
	//历史任务
	$(document).on("click", ".history_task tbody .title", function() {
		$("#boxPock").show();
		$("#boxPock .histask_detail").show();
	})
	$(document).on("click", ".histask_detail .histask_detail_head i", function() {
		$("#boxPock").hide();
		$("#boxPock .histask_detail").hide();
	})
	$(document).on("click", ".histask_detail .btn2", function() {
		$("#boxPock").hide();
		$("#boxPock .histask_detail").hide();
	})
	$(document).on("click", ".histask_detail .btn1", function() {
		$("#boxPock").hide();
		$("#boxPock .histask_detail").hide();
	})
	//创建任务详情
	$(document).on("click", ".build_task tbody .title", function() {
		$("#boxPock").show();
		$("#boxPock .newbuild_detail").show();
	})
	$(document).on("click", ".newbuild_detail .newbuild_detail_head i", function() {
		$("#boxPock").hide();
		$("#boxPock .newbuild_detail").hide();
	})
	$(document).on("click", ".newbuild_detail .btn2", function() {
		$("#boxPock").hide();
		$("#boxPock .newbuild_detail").hide();
	})
	//select选中
	$("select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
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
	var arr = [];
	var obj = {};
	var people;
	var arrone = [];
	var arrtwo = [];

	function choose() {
		$(document).on("click", "#sub_choose", function() {
			$(".newtask_add").hide();
			$("#subitem_choose").show();
			people = '';
			var html = "";
			arrone = [];
			arrtwo = [];
			arr = [];
			people = $(this);
			html += '<div class="work_style"><ul class="clearfix"></ul></div>';
			$(".item_right_ctn").append(html);
		})
		$(document).on("click", ".subitem_choose .subitem_choose_head i", function() {
			$("#subitem_choose").hide();
			$(".newtask_add").show();
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
			var id = $(this).parents("li").attr("data-id");
			if(arr.indexOf(id) == -1) {
				$(this).parents("li").addClass("active");
				arr.push(id);
				var txt = $(this).siblings("span").text();
				var lis = '<li><img src="img/icon_del.png"/><span data-id="' + id + '">' + txt + '</span></li>';
				$(".item_right_ctn .work_style ul").append(lis)
			} else {

			}
		});
		$(document).on("click", ".subitem_choose .admin li.active i", function() {
			var id = $(this).parents("li").attr("data-id");
			for(var i = 0; i < arr.length; i++) {
				if(arr[i] == id) {
					arr.splice(i, 1);
				}
			}
			$(this).parents("li").removeClass("active");
			$(".item_right_ctn .work_style ul li").each(function() {
				var dataRight = $(this).find("span").attr("data-id");
				if(dataRight == id) {
					$(this).remove();
				}
			})
		})
		//点击右边左边去掉
		$(document).on("click", ".item_right_ctn .work_style ul li img", function() {
			var litxt = $(this).siblings("span").attr("data-id");
			for(var i = 0; i < arr.length; i++) {
				if(arr[i] == litxt) {
					arr.splice(i, 1);
				}
			}
			$(this).parents("li").remove();
			$(".subitem_choose .admin li.active").each(function() {
				var lisID = $(this).attr("data-id");
				if(lisID == litxt) {
					$(this).removeClass("active");
				}
			})
		})
		//选人确认
		$(document).on('click', '#jobbtn', function() {
			$(".item_right_ctn .work_style ul li").each(function() {
				var txt = $(this).find("span").text();
				var id = $(this).find("span").attr("data-id");
				arrone.push(txt);
				arrtwo.push(id);
			})
			$("#subitem_choose").hide();
			$(".newtask_add").show();

			$(".admin li").removeClass("active");
			$(".item_right_ctn .work_style").remove();
			people.siblings(".show").val(arrone.join(','));
			people.siblings(".hidden").val(arrtwo.join(','));
		})
	}

	/*===*/
	/*获取新任务列表*/
	newTask(1);
	/*新任务增加*/
	$(document).on("click", ".new_task .page_right .more", function() {
		var total_num = Number($(".new_task .page_right .total_num").text());
		var num = Number($(".new_task .page_right .number").text());
		if(num >= total_num) {
			toast("已经是最后一页了")
		} else {
			num++;
			$(".new_task .page_right .number").text(num);
			newTask(num);
		}
	})
	/*新任务减少*/
	$(document).on("click", ".new_task .page_right .less", function() {
		var num = Number($(".new_task .page_right .number").text());
		if(num == 1) {
			toast("已经是第一页了")
		} else {
			num--;
			$(".new_task .page_right .number").text(num);
			newTask(num);
		}
	})
	/*新任务跳页*/
	$(document).on("click", ".new_task .paging .jump .go", function() {
		var jump_num = Number($(this).siblings(".jump_page").val());
		if(jump_num > 0) {
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
			newTask(jump_num);
		} else {
			toast("请输入正常页码")
		}
	})

	function newTask(p) {
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Task/new_task",
			dataType: 'json',
			data: {
				p: p
			},
			headers: {
				accept: "usertoken:" + token,
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data);
					var str = "";
					for(var i = 0; i < data.data.data.length; i++) {
						str += '<tr data-id="' + data.data.data[i].id + '">';
						str += '	<td>' + (i + 1) + '</td>';
						str += '	<td class="n_name" data-name="' + data.data.data[i].user_id + '">' + data.data.data[i].user_id + '</td>';
						str += '	<td class="n_time" data-time="' + data.data.data[i].add_time + '">' + data.data.data[i].add_time + '</td>';
						str += '	<td class="n_type" data-type="' + data.data.data[i].type + '">' + data.data.data[i].type + '</td>';
						str += '	<td  data-id="' + data.data.data[i].pid + '" ><span class="title"> ' + data.data.data[i].title + '</span></td>';
						str += '	<td class="n_start" data-start="' + data.data.data[i].start_time + '">' + data.data.data[i].start_time + '</td>';
						str += '	<td class="handle"><span class="add">接受</span><span class="check">拒受</span></td>';
						str += '</tr>';
					}
					$(".new_task .page_left span").text(data.data.count);
					$(".new_task .page_right .total_num").text(data.data.page);
					$('#task_new').html(str);
				} else {}
			},
			error: function(data) {},
			async: true
		});
	}

	/*获取进行中列表*/
	/*新任务增加*/
	taskGo(1);
	$(document).on("click", ".task_go .page_right .more", function() {
		var total_num = Number($(".task_go .page_right .total_num").text());
		var num = Number($(".task_go .page_right .number").text());
		if(num >= total_num) {
			toast("已经是最后一页了")
		} else {
			num++;
			$(".task_go .page_right .number").text(num);
			taskGo(num);
		}
	})
	/*新任务减少*/
	$(document).on("click", ".task_go .page_right .less", function() {
		var num = Number($(".task_go .page_right .number").text());
		if(num == 1) {
			toast("已经是第一页了")
		} else {
			num--;
			$(".task_go .page_right .number").text(num);
			taskGo(num);
		}
	})
	/*任务进行中跳页*/
	$(document).on("click", ".task_go .paging .jump .go", function() {
		var jump_num = Number($(this).siblings(".jump_page").val());
		if(jump_num > 0) {
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
			taskGo(jump_num);
		} else {
			toast("请输入正常页码")
		}
	})

	function taskGo(p) {
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Task/doing_task",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				p: p
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data);
					var str = "";
					for(var i = 0; i < data.data.data.length; i++) {
						str += '<tr data-id="' + data.data.data[i].id + '">';
						str += '	<td>' + (i + 1) + '</td>';
						str += '	<td>' + data.data.data[i].user_id + '</td>';
						str += '	<td>' + data.data.data[i].add_time + '</td>';
						str += '	<td>' + data.data.data[i].type + '</td>';
						str += '	<td  data-id="' + data.data.data[i].pid + '"><span class="title">' + data.data.data[i].title + '</span></td>';
						str += '	<td>' + data.data.data[i].receive_time + '</td>';
						str += '	<td class="handle"><span class="sure">确认完成</span></td>';
						str += '</tr>';
					}
					$(".task_go .page_left span").text(data.data.count);
					$(".task_go .page_right .total_num").text(data.data.page);
					$('#task_doing').html(str);
				} else {}
			},
			error: function(data) {},
			async: true
		});
	}

	/*获取历史列表*/
	historyTask(1)
	$(document).on("click", ".history_task .page_right .more", function() {
		var total_num = Number($(".history_task .page_right .total_num").text());
		var num = Number($(".history_task .page_right .number").text());
		if(num >= total_num) {
			toast("已经是最后一页了")
		} else {
			num++;
			$(".history_task .page_right .number").text(num);
			historyTask(num);
		}
	})
	/*新任务减少*/
	$(document).on("click", ".history_task .page_right .less", function() {
		var num = Number($(".history_task .page_right .number").text());
		if(num == 1) {
			toast("已经是第一页了")
		} else {
			num--;
			$(".history_task .page_right .number").text(num);
			historyTask(num);
		}
	})
	/*历史任务跳页*/
	$(document).on("click", ".history_task .paging .jump .go", function() {
		var jump_num = Number($(this).siblings(".jump_page").val());
		if(jump_num > 0) {
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
			historyTask(jump_num);
		} else {
			toast("请输入正常页码")
		}
	})

	function historyTask(p) {
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Task/history_task",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				p: p
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data);
					var str = "";
					for(var i = 0; i < data.data.data.length; i++) {
						str += '<tr data-id="' + data.data.data[i].id + '">';
						str += '	<td>' + (i + 1) + '</td>';
						str += '	<td>' + data.data.data[i].user_id + '</td>';
						str += '	<td>' + data.data.data[i].add_time + '</td>';
						str += '	<td>' + data.data.data[i].type + '</td>';
						str += '	<td  data-id="' + data.data.data[i].pid + '"><span class="title">' + data.data.data[i].title + '</span></td>';
						str += '	<td>' + data.data.data[i].finish_time + '</td>';
						str += '	<td class="handle"><span class="back">回退</span><span class="del">删除</span></td>';
						str += '</tr>';
					}
					$(".history_task .page_left span").text(data.data.count);
					$(".history_task .page_right .total_num").text(data.data.page);
					$('#task_his').html(str);
				} else {}
			},
			error: function(data) {},
			async: true
		});
	}

	/*获取我创建的列表*/
	buildTask(1);
	$(document).on("click", ".build_task .page_right .more", function() {
		var total_num = Number($(".build_task .page_right .total_num").text());
		var num = Number($(".build_task .page_right .number").text());
		if(num >= total_num) {
			toast("已经是最后一页了")
		} else {
			num++;
			$(".build_task .page_right .number").text(num);
			buildTask(num);
		}
	})
	/*新任务减少*/
	$(document).on("click", ".build_task .page_right .less", function() {
		var num = Number($(".build_task .page_right .number").text());
		if(num == 1) {
			toast("已经是第一页了")
		} else {
			num--;
			$(".build_task .page_right .number").text(num);
			buildTask(num);
		}
	})
	/*创建任务跳页*/
	$(document).on("click", ".build_task .paging .jump .go", function() {
		var jump_num = Number($(this).siblings(".jump_page").val());
		if(jump_num > 0) {
			$(this).parents(".jump").siblings(".page_right").find(".number").text(jump_num)
			buildTask(jump_num);
		} else {
			toast("请输入正常页码")
		}
	})

	function buildTask(p) {
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Task/own_task",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				p: p
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data);
					var str = "";
					for(var i = 0; i < data.data.data.length; i++) {
						str += '<tr data-id="' + data.data.data[i].id + '">';
						str += '	<td>' + (i + 1) + '</td>';
						str += '	<td>' + data.data.data[i].add_time + '</td>';
						str += '	<td>' + data.data.data[i].type + '</td>';
						str += '	<td>' + data.data.data[i].receiver + '</td>';
						str += '	<td ><span class="title">' + data.data.data[i].title + '</span></td>';
						str += '	<td>' + data.data.data[i].status + '</td>';
						str += '	<td class="handle"><span class="del">删除</span></td>';
						str += '</tr>';
					}
					$(".build_task .page_left span").text(data.data.count);
					$(".build_task .page_right .total_num").text(data.data.page);
					$('#task_own').html(str);
				} else {}
			},
			error: function(data) {},
			async: true
		});
	}

	/*新建任务提交*/
	var taskbol = true;
	$(document).on('click', '#task_ok', function() {
		/*相关项目*/
		var about = $('#task_aboutname').val();
		/*类型*/
		var type = $('#task_type').val();
		/*接受群体*/
		var who = $('#task_whoname').val();
		/*开始时间*/
		var time = $('#one').val();
		/*标题*/
		var title = $('#task_title').val();
		/*附件*/
		var task_file = $('#task_file').val();
		/*内容*/
		var task_textarea = $('#task_textarea').val();

		if(about == "") {
			toast("请选择相关项目");
			return false;
		};
		if(type == "") {
			toast("请选择类型");
			return false;
		};
		if(who == "") {
			toast("请选择接受群体");
			return false;
		};
		if(time == "") {
			toast("请选择开始时间");
			return false;
		};
		if(title == "") {
			toast("请填写标题");
			return false;
		};
		var form = new FormData($("#taskForm")[0]);
		form.append("project_id", $("#task_aboutname").attr("data-id"));
		form.append("type", $("#task_typename").attr("data-id"));
		if(taskbol) {
			taskbol = false;
			$.ajax({
				url: host_host_host + "/index.php/Home/Task/create",
				type: "post",
				headers: {
					accept: "usertoken:" + token,
				},
				data: form,
				processData: false,
				contentType: false,
				success: function(data) {
					if(data.status == 1) {
						toast("新建成功")
						buildTask(1)
						$(".newtask_add").hide();
						$("#boxPock").hide();
					} else {
						toast(data.msg)
					}
					taskbol = true;
				},
				error: function(e) {}
			});
		}

	});

	/*创建任务删除*/
	var list_id; /*创建任务删除需要的id*/
	$(document).on('click', '#task_own .del', function() {
		list_id = $(this).parents('tr').attr('data-id');
		delNum = 2;
		$("#boxPock").show();
		$("#boxPock .del").show();
	});

	/*新任务详情*/
	var da_id;
	var re_id;
	var do_id;
	var his_id;
	var ow_id;
	$(document).on('click', '#task_new .title,#task_new .add', function() {
		da_id = $(this).parents('tr').find(".title").attr('data-id');
		re_id = $(this).parents('tr').attr('data-id');
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Task/task_info",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				id: da_id
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data);
					$('.newtask_detail #nd_what').val(data.data.project_id);
					$('.newtask_detail #nd_type').val(data.data.type);
					$('.newtask_detail #nd_who').val(data.data.to_user);
					$('.newtask_detail #nd_start').val(data.data.start_time);
					$('.newtask_detail #nd_title').val(data.data.title);
					$('.newtask_detail #nd_file').text(data.data.file_name);
					$('.newtask_detail #nd_content').text(data.data.content);
					$('.newtask_detail #nd_repr').text();

				} else {}
			},
			error: function(data) {},
			async: true
		});
	});
	/*新任务下载*/
	$(document).on("click", ".newtask_detail .download", function() {
		var pid = da_id;
		location.href = host_host_host + "/home/task/download/id/" + pid;
	})
	/*任务进行中详情*/
	$(document).on('click', '#task_doing .title', function() {
		do_id = $(this).parents('tr').find(".title").attr('data-id');
		var id = $(this).parent("tr").attr("data-id");
		//		console.log(do_id);
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Task/task_info",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				id: do_id,
				sid: id
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data);
					$('.taskgo_add #do_what').val(data.data.project_id);
					$('.taskgo_add #do_type').val(data.data.type);
					$('.taskgo_add #do_who').val(data.data.to_user);
					$('.taskgo_add #do_start').val(data.data.start_time);
					$('.taskgo_add #do_title').val(data.data.title);
					$('.taskgo_add #do_file').text(data.data.file_name);
					$('.taskgo_add #do_content').text(data.data.content);
					$('.taskgo_add #do_ref').text(data.data.reply_content);
				} else {}
			},
			error: function(data) {},
			async: true
		});
	});
	/*任务进行中下载*/
	$(document).on("click", ".taskgo_add .download", function() {
		var pid = do_id;
		location.href = host_host_host + "/home/task/download/id/" + pid;
	})
	/*历史任务详情*/
	$(document).on('click', '#task_his .title', function() {
		his_id = $(this).parents('tr').find(".title").attr('data-id');
		var id = $(this).parent("tr").attr("data-id");
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Task/task_info",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				id: his_id,
				sid: id
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data);
					$('.histask_detail #his_what').val(data.data.project_id);
					$('.histask_detail #his_type').val(data.data.type);
					$('.histask_detail #his_who').val(data.data.to_user);
					$('.histask_detail #his_start').val(data.data.start_time);
					$('.histask_detail #his_title').val(data.data.title);
					$('.histask_detail #his_file').text(data.data.file_name);
					$('.histask_detail #his_content').text(data.data.content);
					$('.histask_detail #his_ref').text(data.data.reply_content);
				} else {}
			},
			error: function(data) {},
			async: true
		});
	});
	/*历史任务下载*/
	$(document).on("click", ".histask_detail .download", function() {
		var pid = his_id;
		location.href = host_host_host + "/home/task/download/id/" + pid;
	})
	/*我创建的任务详情*/
	$(document).on('click', '#task_own .title', function() {
		ow_id = $(this).parents('tr').attr('data-id');
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Task/task_info",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				id: ow_id
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data);
					$('.newbuild_detail #ow_what').val(data.data.project_id);
					$('.newbuild_detail #ow_type').val(data.data.type);
					$('.newbuild_detail #ow_who').val(data.data.to_user);
					$('.newbuild_detail #ow_start').val(data.data.start_time);
					$('.newbuild_detail #ow_title').val(data.data.title);
					$('.newbuild_detail #ow_file').text(data.data.file_name);
					$('.newbuild_detail #ow_content').text(data.data.content);
					var datas = data.data.reply;
					var lis = '';
					for(var i = 0; i < datas.length; i++) {
						lis += '<li class="clearfix">';
						lis += '<div class="cnt_detail">';
						lis += '<span class="ow_ren">' + datas[i].uid + ':</span><span class="ow_zht">' + datas[i].reply + '</span>';
						lis += '</div>';
						lis += '<div class="time">' + datas[i].addtime + '</div>';
						lis += '</li>';
					}
					$('.newbuild_detail .reply_ul li').remove();
					$('.newbuild_detail .reply_ul').append(lis);

				} else {
					toast(data.msg);
				}
			},
			error: function(data) {},
			async: true
		});
	});
	/*创建任务下载*/
	$(document).on("click", ".newbuild_detail .download", function() {
		var pid = ow_id;
		location.href = host_host_host + "/home/task/download/id/" + pid;
	})
	/*点击接受任务*/
	$(document).on("click", ".new_task tbody .title,.handle .add", function() {
		ddd = $(this).parents('tr').attr('data-id');
		$("#boxPock").show();
		$("#boxPock .newtask_detail").show();
	})
	/*接受任务*/
	$(document).on('click', '.newtask_detail .btn1', function() {
		var nd_repr = $('#nd_repr').val();
		$.ajax({
			type: "post",
			url: host_host_host + "/Home/Task/accept",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				id: re_id,
				content: nd_repr,
			},
			success: function(data) {
				if(data.status == 1) {
					toast(data.msg);
					$("#boxPock").hide();
					$("#boxPock .newtask_detail").hide();
					newTask(1)
				} else {}
			},
			error: function(data) {},
			async: true
		});
	})

	/*拒绝任务*/
	$(document).on('click', '.refuse_detail .btn1', function() {
		var refuse_content = $('#refuse_content').val();
		//		console.log(ddd, refuse_content);
		$.ajax({
			type: "post",
			url: host_host_host + "/Home/Task/reject",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				id: ddd,
				content: refuse_content,
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data);
					toast(data.msg);
					newTask(1)
					$("#boxPock").hide();
					$("#boxPock .refuse_detail").hide();
				} else {
					toast(data.msg);
				}
			},
			error: function(data) {

			},
			async: true
		});
	})

	//拒受任务
	var ddd;
	var refuseNum;
	$(document).on("click", ".new_task tbody .handle .check", function() {
		refuseNum = 1;
		ddd = $(this).parents('tr').attr('data-id');
		//		console.log(ddd);
		$("#boxPock").show();
		$("#boxPock .refuse_detail").show();
	});
	$(document).on("click", ".newtask_detail .btn3", function() {
		refuseNum = 2;
		$(".newtask_detail").hide();
		$("#boxPock .refuse_detail").show();
	});

	$(document).on("click", ".refuse_detail .refuse_detail_head i", function() {
		if(refuseNum == 1) {
			$("#boxPock").hide();
			$("#boxPock .refuse_detail").hide();
		} else {
			$(".newtask_detail").show();
			$("#boxPock .refuse_detail").hide();
		}
	})
	$(document).on("click", ".refuse_detail .btn2", function() {
		if(refuseNum == 1) {
			$("#boxPock").hide();
			$("#boxPock .refuse_detail").hide();
		} else {
			$(".newtask_detail").show();
			$("#boxPock .refuse_detail").hide();
		}
	})
	$(document).on("click", ".newtask_detail .newtask_detail_head i", function() {
		$("#boxPock").hide();
		$("#boxPock .newtask_detail").hide();
	})
	$(document).on("click", ".newtask_detail .btn2", function() {
		$("#boxPock").hide();
		$("#boxPock .newtask_detail").hide();
	})
	/*任务进行中  确认完成*/
	$(document).on('click', '#task_doing .sure', function() {
		var fin_id = $(this).parents('tr').attr('data-id');
		//		console.log(fin_id);
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Task/finish",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				id: fin_id,
			},
			success: function(data) {
				if(data.status == 1) {
					toast(data.msg)
					taskGo(1);
				} else {
					alert(data.msg);
				}
			},
			error: function(data) {

			},
			async: true
		});
	});

	/*历史任务 回退*/
	$(document).on('click', '#task_his .back', function() {
		var back_id = $(this).parents('tr').attr('data-id');
		//		console.log(back_id);
		$.ajax({
			type: "get",
			url: host_host_host + "/Home/Task/back",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				id: back_id,
			},
			success: function(data) {
				if(data.status == 1) {
					toast(data.msg);
					historyTask(1);
				} else {
					toast(data.msg);
				}
			},
			error: function(data) {

			},
			async: true
		});
	});

	/*历史任务删除*/
	var hish_id; /*删除任务需要的id*/
	var delNum; /*判断删除任务的数字*/
	$(document).on('click', '#task_his .del', function() {
		hish_id = $(this).parents('tr').attr('data-id');
		delNum = 1;
		$("#boxPock").show();
		$("#boxPock .del").show();
	});
	$(document).on("click", "#boxPock .del .btn1", function() {
		if(delNum == 1) {
			$.ajax({
				type: "get",
				url: host_host_host + "/Home/Task/del",
				dataType: 'json',
				headers: {
					accept: "usertoken:" + token,
				},
				data: {
					id: hish_id,
					type: 3,
				},
				success: function(data) {
					if(data.status == 1) {
						toast(data.msg);
						historyTask(1);
						$("#boxPock").hide();
						$("#boxPock .del").hide();
					} else {
						toast(data.msg);
					}
				},
				error: function(data) {},
				async: true
			});
		} else {
			$.ajax({
				type: "get",
				url: host_host_host + "/Home/Task/del",
				dataType: 'json',
				headers: {
					accept: "usertoken:" + token,
				},
				data: {
					id: list_id,
					type: 4,
				},
				success: function(data) {
					if(data.status == 1) {
						toast(data.msg);
						buildTask(1);
						$("#boxPock").hide();
						$("#boxPock .del").hide();
					} else {
						toast(data.msg);
					}
				},
				error: function(data) {},
				async: true
			});
		}
	})
	$(document).on("click", "#boxPock .del .btn2,#boxPock .del_head i", function() {
		$("#boxPock").hide();
		$("#boxPock .del").hide();
	})
	/*===*/

	$(document).on("change", ".newtask_add .about", function() {
		var id = $(this).find("option:checked").val();
		$("#task_aboutname").attr("data-id", id);
	})
	$(document).on("change", "#task_type", function() {
		var id = $(this).find("option:checked").val();
		$("#task_typename").attr("data-id", id);
	})

})