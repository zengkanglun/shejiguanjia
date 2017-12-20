$(function() {
	// 列表接受任务
	$('.new_task .handle .edits').on('click',function(){
		var id = $(this).attr('data-id');

		if(!id)
		{
			return false;
		}

		$.get('/Home/Task/accept',{"id":id},function(data){
			if(data.status){
				layer.msg('接收成功');
			}else{
				layer.msg(data.msg);
			}
		});
	});
	// 列表完成任务
	$('.task_go .handle .edit').on('click',function(){
		var id = $(this).attr('data-id');

		if(!id)
		{
			return false;
		}

		$.get('/Home/Task/confirm_task',{"id":id},function(data){
			if(data.status){
				layer.msg('已完成√');
			}else{
				layer.msg(data.msg);
			}
		});
	});
	// 列表回退任务
	$('.history_task .handle .check').on('click',function(){
		var id = $(this).attr('data-id');
		if(!id)
		{
			return false;
		}

		$.get('/Home/Task/back',{"id":id},function(data){
			if(data.status){
				layer.msg('已回退');
			}else{
				layer.msg(data.msg);
			}
		});
	});
	// 自己创建任务详情
	$('.build_task .title').on('click',function(){
		var id = $(this).attr('data-id');
		$.get('/Home/Task/view',{"id":id},function(data){
			$('.newbuild_detail .newbuild_detail_bottom input[name="project"]').val(data.project)
			$('.newbuild_detail .newbuild_detail_bottom input[name="type"]').val(data.project)
			$('.newbuild_detail .newbuild_detail_bottom input[name="staffs"]').val(data.staffs)
			$('.newbuild_detail .newbuild_detail_bottom input[name="time"]').val(data.beginning_time)
			$('.newbuild_detail .newbuild_detail_bottom input[name="title"]').val(data.title)
			$('.newbuild_detail .newbuild_detail_bottom input[name="title"]').val(data.title)
			$('.newbuild_detail .newbuild_detail_bottom span[class="temp"]').html(data.attachment_raw_name)
			$('.newbuild_detail .newbuild_detail_bottom span[class="download"]').attr('data-id',data.id)
			$('.newbuild_detail .newbuild_detail_bottom textarea[name="content"]').val(data.content);
			var leng = data.comments.length;
			var temp_str = '';
			for (var i =0 ; i<leng ; i++)
			{
				temp_str += '<li class="clearfix"><div class="cnt_detail"><span>'+data.comments[i].name+' : </span><span>'+data.comments[i].content+'</span></div><div class="time">-'+data.comments[i].time+'</div></li>';
			}
			$('.newbuild_detail .newbuild_detail_bottom .reply_ul').append(temp_str)
		});
	});
	// 任务列表 删除任务
	$('.build_task .handle .del').on('click',function(){
		var id = $(this).attr('data-id');
		if(!id)
		{
			return false;
		}

		layer.confirm('确定删除该任务吗?',{
			title:'',
			yes:function(){
				$.get('/Home/Task/delMyOwn',{"id":id},function(data){
					if(data.status)
					{
						layer.msg(data.msg);
					}else{
						layer.msg(data.msg);
					}
				});
			},
		});
	});
	// 下载我的任务的附件
	$('.newbuild_detail .newbuild_detail_bottom span[class="download"]').on('click',function(){
		var id = $(this).attr('data-id');
		location.href = '/Api/Task/download_own/id/'+id;
	});
	//tab栏切换
	$(".detail_tab li").on("click", function() {
		$(this).addClass("active").siblings().removeClass("active");
		var index = $(this).index();
		$(".content_detail .bigtask").hide();
		$(".content_detail .bigtask").eq(index).show();
	})
	//新增任务
	$(document).on("click", ".build_task_left", function() {
		$("#boxPock").show();
		$("#boxPock .newtask_add").show();
	})
	$(document).on("click", ".newtask_add .newtask_add_head i", function() {
		$("#boxPock").hide();
		$("#boxPock .newtask_add").hide();
	})
	$(document).on("click", ".newtask_add .btn1", function() {
		$("#boxPock").hide();
		$("#boxPock .newtask_add").hide();
	})
	$(document).on("click", ".newtask_add .btn2", function() {
		$("#boxPock").hide();
		$("#boxPock .newtask_add").hide();
	})
	//拒受任务
	$(document).on("click", ".new_task tbody .handle .check", function() {
		$("#boxPock").show();
		$("#boxPock .refuse_detail").show();
	})
	$(document).on("click", ".refuse_detail .refuse_detail_head i", function() {
		$("#boxPock").hide();
		$("#boxPock .refuse_detail").hide();
	})
	$(document).on("click", ".refuse_detail .btn1", function() {
		$("#boxPock").hide();
		$("#boxPock .refuse_detail").hide();
	})
	$(document).on("click", ".refuse_detail .btn2", function() {
		$("#boxPock").hide();
		$("#boxPock .refuse_detail").hide();
	})
	//新任务详情
	$(document).on("click", ".new_task tbody .title", function() {
		$("#boxPock").show();
		$("#boxPock .newtask_detail").show();
	})
	$(document).on("click", ".newtask_detail .newtask_detail_head i", function() {
		$("#boxPock").hide();
		$("#boxPock .newtask_detail").hide();
	})
	$(document).on("click", ".newtask_detail .btn1", function() {
		$("#boxPock").hide();
		$("#boxPock .newtask_detail").hide();
	})
	$(document).on("click", ".newtask_detail .btn2", function() {
		$("#boxPock").hide();
		$("#boxPock .newtask_detail").hide();
	})
	$(document).on("click", ".newtask_detail .btn3", function() {
		$("#boxPock").hide();
		$("#boxPock .newtask_detail").hide();
	})
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

	//选人
	$(document).on('click', '.subitem_choose_bottom .item_name li', function() {
		$(this).addClass("active").siblings().removeClass("active");
		var index = $(this).index();
		$(".subitem_choose_bottom .admin").hide();
		$(".subitem_choose_bottom .admin").eq(index).show();
	})

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
							tbody1 += '		<span data-id="' + data[i].staffs[j].sid + '">' + data[i].staffs[j].name + '</span>';
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
	var arrone = [];
	var arrtwo = [];
	var html = "";
	var people;

	function choose() {
		//子项目选人
		$(document).on("click", ".newtask_add span.choose", function() {
			var html = "";
			$(".item_right_ctn .work_style").remove();
			$(".newtask_add").hide();
			$(".subitem_choose").show();
			html += '<div class="work_style"><ul class="clearfix"></ul></div>';
			$(".item_right_ctn").append(html);
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
			$(this).parents("li").toggleClass("active");
			var display = $(this).find("img").css("display");
			if(display == "block") {
				var txt = $(this).siblings("span").text();
				var id = $(this).siblings("span").attr("data-id");
				var lis = '<li><img src="/Public/Home/images/icon_del.png"/><span data-id="' + id + '">' + txt + '</span></li>';
				$(".item_right_ctn .work_style ul").append(lis)
			} else {
				var id = $(this).siblings("span").attr("data-id");
				$(".item_right_ctn .work_style ul li").each(function() {
					var dataRight = $(this).find("span").attr("data-id");
					if(dataRight == id) {
						$(this).remove();
					}
				})
			}
		});
		$(document).on("click", ".item_right_ctn .work_style ul li img", function() {
			var litxt = $(this).siblings("span").attr("data-id");
			$(this).parents("li").remove();
			$(".subitem_choose .admin li.active").each(function() {
				var lisID = $(this).find("span").attr("data-id");
				if(lisID == litxt) {
					$(this).removeClass("active");
				}
			})
		})
		//点击添加
		$(document).on("click", "#jobbtn", function() {
			$(".item_right_ctn .work_style ul li").each(function() {
				var txt = $(this).find("span").text();
				var id = $(this).find("span").attr("data-id");
				arrone.push(txt);
				arrtwo.push(id);
			})
			$(".item_right_ctn ul li").remove();
			$(".jobstyle .worker li").removeClass("active");
			//			$(".item_right_ctn .work_style").remove();
			$(".subitem_choose .admin li").removeClass("active");
			$(".newtask_add").show();
			$(".subitem_choose").hide();
			$("#addpeople").val(arrone.join(','));
			$("#addpeople").attr("data-id", arrtwo.join(','));
			$("#hiddenpeople").val(arrtwo.join(','));
		})
		$(document).on("click", ".subitem_choose .subitem_choose_head i", function() {
			$(".item_right_ctn ul li").remove();
			$(".jobstyle .worker li").removeClass("active");
			//			$(".item_right_ctn .work_style").remove();
			$(".subitem_choose .admin li").removeClass("active");
			$(".newtask_add").show();
			$(".subitem_choose").hide();
		})

	}
})