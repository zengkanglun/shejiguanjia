$(function() {
	// 新通知 已读
	$('.new_msg .handle .edit').on('click',function(){
		var id = $(this).attr('data-id');

		$.get('/Api/Notice/read',{"id":id},function(data){
			if(data.status)
			{
				layer.msg('已读√');
				location.reload();
			}else{
				layer.msg(data.msg);
			}
		});
	});
	// 已读通知 查看
	$('.hasread .handle .check').on('click',function(){
		var id = $(this).attr('data-id');
		sessionStorage.setItem('temp_read_id',id);
		$('.hasread_msg .hasread_msg_bottom .reply_ul li').remove();
		$.get('/Home/Notice/view',{"id":id,"type":1},function(data){
			$('.hasread_msg .hasread_msg_bottom input[name="type"]').val(data.type);
			$('.hasread_msg .hasread_msg_bottom input[name="project"]').val(data.project);
			$('.hasread_msg .hasread_msg_bottom input[name="title"]').val(data.title);
			$('.hasread_msg .hasread_msg_bottom input[name="staffs"]').val(data.staffs);
			$('.hasread_msg .hasread_msg_bottom textarea[name="content"]').val(data.content);
			$('.hasread_msg .hasread_msg_bottom span[class="temp"]').html(data.attachment_raw_name);
			$('.hasread_msg .hasread_msg_bottom span[class="download"]').attr('data-id',data.pid);

			var leng = data.comments.length;
			var str = '';
			for(var i=0;i<leng;i++)
			{
				str += '<li class="clearfix"><div class="cnt_detail"><span>'+data.comments[i].name+'：</span><span>'+data.comments[i].content+'</span></div><div class="time">-'+data.comments[i].time+'</div></li>';
			}

			$('.hasread_msg .hasread_msg_bottom .reply_ul').append(str);
		});
	});
	// 已回复 查看
		$('.replied .handle .check').on('click',function(){
		var id = $(this).attr('data-id');
		// sessionStorage.setItem('temp_read_id',id);
		$('.hasreply_msg .hasreply_msg_bottom .reply_ul li').remove();
		$.get('/Home/Notice/view',{"id":id,"type":1},function(data){
			$('.hasreply_msg .hasreply_msg_bottom input[name="type"]').val(data.type);
			$('.hasreply_msg .hasreply_msg_bottom input[name="project"]').val(data.project);
			$('.hasreply_msg .hasreply_msg_bottom input[name="title"]').val(data.title);
			$('.hasreply_msg .hasreply_msg_bottom input[name="staffs"]').val(data.staffs);
			$('.hasreply_msg .hasreply_msg_bottom textarea[name="content"]').val(data.content);
			$('.hasreply_msg .hasreply_msg_bottom span[class="temp"]').html(data.attachment_raw_name);
			$('.hasreply_msg .hasreply_msg_bottom span[class="download"]').attr('data-id',data.pid);

			var leng = data.comments.length;
			var str = '';
			for(var i=0;i<leng;i++)
			{
				str += '<li class="clearfix"><div class="cnt_detail"><span>'+data.comments[i].name+'：</span><span>'+data.comments[i].content+'</span></div><div class="time">-'+data.comments[i].time+'</div></li>';
			}

			$('.hasreply_msg .hasreply_msg_bottom .reply_ul').append(str);
		});
	});
	// 已发通知 查看
	$('.inform .handle .check').on('click',function(){
		var id = $(this).attr('data-id');
		// sessionStorage.setItem('temp_read_id',id);
		$('.send_add .send_add_bottom .reply_ul li').remove();
		$.get('/Home/Notice/view',{"id":id,"type":1},function(data){
			$('.send_add .send_add_bottom input[name="type"]').val(data.type);
			$('.send_add .send_add_bottom input[name="project"]').val(data.project);
			$('.send_add .send_add_bottom input[name="title"]').val(data.title);
			$('.send_add .send_add_bottom input[name="staffs"]').val(data.staffs);
			$('.send_add .send_add_bottom textarea[name="content"]').val(data.content);
			$('.send_add .send_add_bottom span[class="temp"]').html(data.attachment_raw_name);
			$('.send_add .send_add_bottom span[class="download"]').attr('data-id',data.pid);

			var leng = data.comments.length;
			var str = '';
			for(var i=0;i<leng;i++)
			{
				str += '<li class="clearfix"><div class="cnt_detail"><span>'+data.comments[i].name+'：</span><span>'+data.comments[i].content+'</span></div><div class="time">-'+data.comments[i].time+'</div></li>';
			}

			$('.send_add .send_add_bottom .reply_ul').append(str);
		});
	});
	// 已回复 回复消息
	$('.hasreply_msg .hasreply_msg_bottom .cnt_footer .btn1').on('click',function(){
		var message = $('.hasreply_msg .hasreply_msg_bottom .c_reply textarea[name="reply_content"]').val();
		var id = $('.hasreply_msg .hasreply_msg_bottom span[class="download"]').attr('data-id');
		// var temp_id = sessionStorage.getItem('temp_read_id');
		$.post('/Api/Comment/reply',{
			"pid":id,
			"content":message,
			"type":1,
			// "temp_id":temp_id
		});

	});
	// 已读消息 回复消息
	$('.hasread_msg .hasread_msg_bottom .cnt_footer .btn1').on('click',function(){
		var message = $('.hasread_msg .hasread_msg_bottom .c_reply textarea[name="reply_content"]').val();
		var id = $('.hasread_msg .hasread_msg_bottom span[class="download"]').attr('data-id');
		var temp_id = sessionStorage.getItem('temp_read_id');
		$.post('/Api/Comment/reply',{
			"pid":id,
			"content":message,
			"type":1,
			"temp_id":temp_id
		});

	});
	// 已读消息 删除记录
	$('.hasread .handle .del').on('click',function(){
		var id = $(this).attr('data-id');
		var label = 11;

		$.get('/Home/Notice/delSend2me',{
			"id":id,
			"label":label
		},function(data){
			if(data.status)
			{
				layer.msg('删除成功');
				location.reload();
			}else{
				layer.msg(data.msg);
				location.reload();
			}
		});
	});
		// 已回复消息 删除记录
	$('.replied .handle .del').on('click',function(){
		var id = $(this).attr('data-id');
		var label = 12;

		$.get('/Home/Notice/delSend2me',{
			"id":id,
			"label":label
		},function(data){
			if(data.status)
			{
				layer.msg('删除成功');
				location.reload();
			}else{
				layer.msg(data.msg);
				location.reload();
			}
		});
	});
	// 已发通知消息 删除记录
	$('.inform .handle .del').on('click',function(){
		var id = $(this).attr('data-id');
		var label = 13;

		$.get('/Home/Notice/delSend2me',{
			"id":id,
			"label":label
		},function(data){
			if(data.status)
			{
				layer.msg('删除成功');
				location.reload();
			}else{
				layer.msg(data.msg);
				location.reload();
			}
		});
	});
	//tab栏切换
	$(".detail_tab li").on("click", function() {
		$(this).addClass("active").siblings().removeClass("active");
		var n = $(this).index();
		$(".content_detail .msg_notice").hide();
		$(".content_detail .msg_notice").eq(n).show();
	})

	//新建通知
	$(".new_build_msg .left").on("click", function() {
		console.log(123);
		$("#boxPock").show();
		$("#boxPock .newmsg_add").show();
	})
	$(".newmsg_add .btn1").on("click", function() {
		$("#boxPock").hide();
		$("#boxPock .newmsg_add").hide();
	})
	$(".newmsg_add .btn2").on("click", function() {
		$("#boxPock").hide();
		$("#boxPock .newmsg_add").hide();
	})
	$(".newmsg_add .newmsg_add_head i").on("click", function() {
		$("#boxPock").hide();
		$("#boxPock .newmsg_add").hide();
	})
	//已发通知弹出
	$(".inform tbody .title").on("click", function() {
		$("#boxPock").show();
		$("#boxPock .send_add").show();
	})
	$(".inform tbody .handle .check").on("click", function() {
		$("#boxPock").show();
		$("#boxPock .send_add").show();
	})
	$(".send_add .btn1").on("click", function() {
		$("#boxPock").hide();
		$("#boxPock .send_add").hide();
	})
	$(".send_add .btn2").on("click", function() {
		$("#boxPock").hide();
		$("#boxPock .send_add").hide();
	})
	$(".send_add .send_add_head i").on("click", function() {
		$("#boxPock").hide();
		$("#boxPock .send_add").hide();
	})
	//查看通知弹出
	$(".new_msg tbody .title").on("click", function() {
		$("#boxPock").show();
		$("#boxPock .msgcheck_add").show();
	})
	$(".new_msg tbody .handle .check").on("click", function() {
		$("#boxPock").show();
		$("#boxPock .msgcheck_add").show();
	})
	$(".msgcheck_add .btn1").on("click", function() {
		$("#boxPock").hide();
		$("#boxPock .msgcheck_add").hide();
	})
	$(".msgcheck_add .btn2").on("click", function() {
		$("#boxPock").hide();
		$("#boxPock .msgcheck_add").hide();
	})
	$(".msgcheck_add .msgcheck_add_head i").on("click", function() {
		$("#boxPock").hide();
		$("#boxPock .msgcheck_add").hide();
	})
	//查看已读通知弹出
	$(".hasread tbody .title").on("click", function() {
		$("#boxPock").show();
		$("#boxPock .hasread_msg").show();
	})
	$(".hasread tbody .handle .check").on("click", function() {
		$("#boxPock").show();
		$("#boxPock .hasread_msg").show();
	})
	$(".hasread_msg .btn1").on("click", function() {
		$("#boxPock").hide();
		$("#boxPock .hasread_msg").hide();
	})
	$(".hasread_msg .btn2").on("click", function() {
		$("#boxPock").hide();
		$("#boxPock .hasread_msg").hide();
	})
	$(".hasread_msg .hasread_msg_head i").on("click", function() {
		$("#boxPock").hide();
		$("#boxPock .hasread_msg").hide();
	})
	//查看已读通知弹出
	$(".replied tbody .title").on("click", function() {
		$("#boxPock").show();
		$("#boxPock .hasreply_msg").show();
	})
	$(".replied tbody .handle .check").on("click", function() {
		$("#boxPock").show();
		$("#boxPock .hasreply_msg").show();
	})
	$(".hasreply_msg .btn1").on("click", function() {
		$("#boxPock").hide();
		$("#boxPock .hasreply_msg").hide();
	})
	$(".hasreply_msg .btn2").on("click", function() {
		$("#boxPock").hide();
		$("#boxPock .hasreply_msg").hide();
	})
	$(".hasreply_msg .hasreply_msg_head i").on("click", function() {
		$("#boxPock").hide();
		$("#boxPock .hasreply_msg").hide();
	})
	//select选中
	$("select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	})

	//	//选人

//	$(document).on("click", ".subitem_choose .subitem_choose_head i,.subitem_choose .btn1", function() {
//		$(".newmsg_add").show();
//		$(".subitem_choose").hide();
//	})

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
						str += '		<span data-id="'+data[i].workers[j].staff_id+'">' + data[i].workers[j].real_name + '</span>';
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
		$(document).on("click", ".newmsg_add span.choose", function() {
			var html = "";
			$(".item_right_ctn .work_style").remove();
			$(".newmsg_add").hide();
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
			$(".newmsg_add").show();
			$(".subitem_choose").hide();
			$("#addpeople").val(arrone.join(','));
			$("#hiddenone").val(arrtwo.join(','));			
		})

	}
})