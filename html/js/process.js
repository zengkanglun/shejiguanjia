$(function() {
	$(".detail_tab li").on("click", function() {
		$(this).addClass("active").siblings().removeClass("active");
		var index = $(this).index();
		$(".content_detail .pro_tab").hide();
		$(".content_detail .pro_tab").eq(index).show();
		if(index == 0) {
			process(project_id, 1);
		} else if(index == 1) {
			chutu(project_id, 1);
		} else if(index == 2) {
			letter(project_id, 1);
		} else if(index == 4) {
			guid(project_id, 1);
		}
	})
	//过程纪要增加的操作
	$(".process_detail .detail_head").on("click", function() {
		$("#boxPock").show();
		$(".process_add").show();
	})
	$(".process_add_head i").on("click", function() {
		$("#boxPock").hide();
		$(".process_add").hide();
	})
	$(".process_add_bottom .btn1").on("click", function() {
		$("#boxPock").hide();
		$(".process_add").hide();
	})
	$(".process_add_bottom .btn2").on("click", function() {
		$("#boxPock").hide();
		$(".process_add").hide();
	})
	$(".process_add_bottom .header_left select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	})
	//过程纪要查看的操作
	$(document).on("click", ".process_detail td .check", function() {
		//$(".process_detail td .check").on("click", function() {
		$("#boxPock").show();
		$(".process_check").show();
	})
	$(".process_check_head i").on("click", function() {
		$("#boxPock").hide();
		$(".process_check").hide();
	})
	$(".process_check_bottom .btn2").on("click", function() {
		$("#boxPock").hide();
		$(".process_check").hide();
	})
	//过程纪要编辑的操作
	$(".process_edit_head i").on("click", function() {
		$("#boxPock").hide();
		$(".process_edit").hide();
	})
	$(".process_edit_bottom .btn2").on("click", function() {
		$("#boxPock").hide();
		$(".process_edit").hide();
	})
	$(".process_edit_bottom .header_left select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	})
	//项目分工编辑
	//	$(".item_detail tbody .edit").on("click", function() {
	//		$("#boxPock").show();
	//		$("#boxPock .item_add").show();
	//	})
	$(".item_add .item_add_head i,.item_add .btn1,item_add .btn2").on("click", function() {
		$("#boxPock").hide();
		$("#boxPock .item_add").hide();
	})
	//项目分工查看
	//	$(".item_detail tbody .check").on("click", function() {
	//		$("#boxPock").show();
	//		$("#boxPock .item_check").show();
	//	})
	$(".item_check .item_check_head i,.item_check .btn2").on("click", function() {
		$("#boxPock").hide();
		$("#boxPock .item_check").hide();
	})
	//一号楼切换
	$(".item_detail .item_ul li").on("click", function() {
		$(this).addClass("active").siblings().removeClass("active")
	})

	/*===*/
	var token = localStorage.getItem("token");
	var project_id = localStorage.getItem("project_id");
	console.log(token, project_id);
	/*============================================*/
	var quser_id; /*过程管理userid*/
	var pro_page = 1,
		pro_pages;
	$(document).on('click', '#pro_pre', function() {
		if(pro_page == 1) {
			toast('已经是第一页了！');
			return false;
		}
		pro_page--;
		process(project_id, pro_page);
	});
	$(document).on('click', '#pro_next', function() {
		if(pro_page == pro_pages) {
			toast('已经是最后一页了！');
			return false;
		}
		pro_page++;
		process(project_id, pro_page);
	});
	/*过程纪要列表*/
	process(project_id, 1);

	function process(project_id, pro_page) {
		$.ajax({
			type: "post",
			url: host_host_host + "/home/process/index",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				project_id: project_id,
				p: pro_page
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data);
					quser_id = data.data.user_id;
					pro_pages = data.data.page;
					var str = '';
					for(var i = 0; i < data.data.process.length; i++) {
						str += '<tr data-userid="' + data.data.process[i].user_id + '" data-id="' + data.data.process[i].id + '" data-time="' + data.data.process[i].time + '" data-name="' + data.data.process[i].name + '" data-nickname="' + data.data.process[i].nickname + '" data-content="' + data.data.process[i].content + '">';
						str += '	<td>' + (i + 1) + '</td>';
						str += '	<td>' + data.data.process[i].time + '</td>';
						str += '	<td>' + data.data.process[i].name + '</td>';
						str += '	<td>' + data.data.process[i].content + '</td>';
						str += '	<td>' + data.data.process[i].nickname + '</td>';
						str += '	<td class="handle">';
						str += '		<span class="check">查看</span>';
						if(data.data.user_id == data.data.process[i].user_id) {
							str += '		<span class="edit">编辑</span>';
							str += '		<span class="del">删除</span>';
						}
						str += '	</td>';
						str += '</tr>';
					}
					$('#proc_box').html(str);
					$('#pro_count').text(data.data.count);
					$('#pronow_page').text(pro_page);
					$('#prototal_page').text(pro_pages);

				} else {}
			},
			error: function(data) {},
			async: true
		});
	}

	/*类型-过程纪要*/
	$(document).on('click', '#ad_img,.process_detail td .edit', function() {
		$.ajax({
			type: "post",
			url: host_host_host + "/home/common/ProcessType",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {},
			success: function(data) {
				if(data.status == 1) {
					console.log(data);
					str = '';
					str += '<option>请选择</option>';
					for(var i = 0; i < data.data.length; i++) {
						str += '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
					}
					$('#process_type_list,#process_type_list1').html(str);
				} else {}
			},
			error: function(data) {},
			async: true
		});
	});

	/*增加-过程纪要*/
	$(document).on('click', '#btn_add_pro', function() {
		var type = $('#process_type_list').val();
		var content = $('#pro_add').val();
		var time = $('#pro_add_one').val();
		console.log(type, content, time);
		$.ajax({
			type: "post",
			url: host_host_host + "/home/process/addprocess",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				type: type,
				content: content,
				project_id: project_id,
				time: time,
			},
			success: function(data) {
				if(data.status == 1) {
					toast(data.msg);
					process(project_id, 1);
				} else {
					toast(data.msg);
				}
			},
			error: function(data) {},
			async: true
		});
	});
	/*编辑-过程纪要*/
	var pro_edit_id; /*列表id*/
	$(document).on('click', '.process_detail td .edit', function() {
		var pro_edit_userid = $(this).parents('tr').attr('data-userid'); /*列表用户id*/
		pro_edit_id = $(this).parents('tr').attr('data-id'); /*列表id*/
		var pro_edit_name = $(this).parents('tr').attr('data-name'); /*列表类型*/
		var pro_edit_time = $(this).parents('tr').attr('data-time'); /*列表时间*/
		var pro_edit_content = $(this).parents('tr').attr('data-content'); /*列表内容*/

		$("#boxPock").show();
		$(".process_edit").show();
		$('.process_edit #pro_type1').val(pro_edit_name);
		$('.process_edit #process_type_list1').val(pro_edit_name);
		$('#pro_edit_one').val(pro_edit_time);
		$('#pro_edit_con').val(pro_edit_content);
	});
	$(document).on('click', '#btn_edit_pro', function() {
		$.ajax({
			type: "post",
			url: host_host_host + "/home/process/EditProcess",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				id: pro_edit_id,
				type: $('#process_type_list1').val(),
				content: $('#pro_edit_con').val(),
				time: $('#pro_edit_one').val(),
			},
			success: function(data) {
				if(data.status == 1) {
					toast(data.msg);
					process(project_id, 1);
					$("#boxPock").hide();
					$(".process_edit").hide();
				} else {
					toast(data.msg);
				}
			},
			error: function(data) {},
			async: true
		});
	});

	/*查看-过程纪要*/
	$(document).on('click', '.process_detail td .check', function() {
		var pro_edit_name = $(this).parents('tr').attr('data-name');
		var pro_edit_time = $(this).parents('tr').attr('data-time');
		var pro_edit_nickname = $(this).parents('tr').attr('data-nickname');
		var pro_edit_content = $(this).parents('tr').attr('data-content');

		$('#look_type').val(pro_edit_name);
		$('#look_time').val(pro_edit_time);
		$('#look_name').val(pro_edit_nickname);
		$('#look_content').val(pro_edit_content);
	});

	/*删除-过程纪要*/
	var delNum; /*删除代表的数字*/
	$(document).on('click', '.process_detail td .del', function() {
		pro_edit_id = $(this).parents('tr').attr('data-id');
		delNum = 1;
		$("#boxPock").show();
		$("#boxPock .del").show();
	});
	$(document).on("click", "#boxPock .del .btn1", function() {
		if(delNum == 1) {
			$.ajax({
				type: "post",
				url: host_host_host + "/home/process/dele",
				dataType: 'json',
				headers: {
					accept: "usertoken:" + token,
				},
				data: {
					id: pro_edit_id,
					type: 1,
				},
				success: function(data) {
					if(data.status == 1) {
						toast(data.msg);
						$("#boxPock").hide();
						$("#boxPock .del").hide();
						process(project_id, 1);
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
	/*出图出差列表*/
	//出图出差增加的操作
	$(".travel_detail .travel_head").on("click", function() {
		$("#boxPock").show();
		$(".travel_add").show();
	})
	$(".travel_add_head i,.travel_add_bottom .btn2").on("click", function() {
		$("#boxPock").hide();
		$(".travel_add").hide();
	})
	//	$(".travel_add_bottom .btn1").on("click", function() {
	//		$("#boxPock").hide();
	//		$(".travel_add").hide();
	//	})
	$(document).on("change", "select", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	})
	//出图出差查看的操作
	//	$(".travel_detail td .check").on("click", function() {
	$(document).on('click', '.travel_detail td .check', function() {
		$("#boxPock").show();
		$(".travel_check").show();
	})
	$(".travel_check_head i,.travel_check_bottom .btn2").on("click", function() {
		$("#boxPock").hide();
		$(".travel_check").hide();
	})
	//出图出差编辑的操作
	$(".travel_edit_head i,.travel_edit_bottom .btn2").on("click", function() {
		$("#boxPock").hide();
		$(".travel_edit").hide();
	})
	/*出图出差数据*/
	var ct_page = 1,
		ct_pages;
	$(document).on('click', '#ct_pre', function() {
		if(ct_page == 1) {
			toast('已经是第一页了！');
			return false;
		}
		ct_page--;
		chutu(project_id, ct_page);
	});
	$(document).on('click', '#ct_next', function() {
		if(ct_page == ct_pages) {
			toast('已经是最后一页了！');
			return false;
		}
		ct_page++;
		chutu(project_id, ct_page);
	});

	function chutu(project_id, ct_page) {
		$.ajax({
			type: "post",
			url: host_host_host + "/home/process/Picture",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				project_id: project_id,
				p: ct_page
			},
			success: function(data) {
				if(data.status == 1) {
					console.log(data);
					var str = '';
					ct_pages = data.data.page;
					for(var i = 0; i < data.data.Picture.length; i++) {
						str += '<tr data-userid="' + data.data.Picture[i].user_id + '" data-id="' + data.data.Picture[i].id + '" data-num="' + data.data.Picture[i].num + '" data-name="' + data.data.Picture[i].name + '" data-nickname="' + data.data.Picture[i].nickname + '" data-content="' + data.data.Picture[i].content + '">';
						str += '	<td>' + (i + 1) + '</td>';
						str += '	<td>' + data.data.Picture[i].add_time + '</td>';
						str += '	<td>' + data.data.Picture[i].name + '</td>';
						str += '	<td>' + data.data.Picture[i].content + '</td>';
						str += '	<td>' + data.data.Picture[i].num + '</td>';
						str += '	<td>' + data.data.Picture[i].nickname + '</td>';
						str += '	<td class="handle">';
						str += '		<span class="check">查看</span>';
						if(data.data.user_id == data.data.Picture[i].user_id) {
							str += '		<span class="edit" data-id="' + data.data.Picture[i].participate.id + '">编辑</span>';
							str += '		<span class="del">删除</span>';
						}
						str += '	</td>';
						str += '</tr>';
					}
					$('#chutu_list').html(str);
					$('#chutu_count').text(data.data.count);
					$('#ctnow_page').text(ct_page);
					$('#cttotal_page').text(ct_pages);
				} else {}
			},
			error: function(data) {},
			async: true
		});
	}
	/*类型-出图出差*/
	$(document).on('click', '#ad_img_chutu,.travel_detail td .edit', function() {
		$(".travel_add input").val("");
		$("#chutu_inp").attr("data-id", -1);
		$.ajax({
			type: "post",
			url: host_host_host + "/home/common/pictureType",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {},
			success: function(data) {
				if(data.status == 1) {
					console.log(data);
					str = '';
					str += '<option>请选择</option>';
					for(var i = 0; i < data.data.length; i++) {
						str += '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
					}
					$('#chutu_type,#chutu_type_list').html(str);
					//					$('#chutu_typename').val(data.data[0].name);
				} else {}
			},
			error: function(data) {},
			async: true
		});
	});

	/*增加-出图出差*/
	$(document).on('click', '#btn_add_chu', function() {
		var type = $('#chutu_type').val();
		var chutu_inp = $('.travel_add .hidden').val();
		var content = $('#chutu_con').val();
		var num = $('#chutu_num').val();
		if(!chutu_inp) {
			toast("还未选择参与人")
		} else {
			$.ajax({
				type: "post",
				url: host_host_host + "/home/process/AddPicture",
				dataType: 'json',
				headers: {
					accept: "usertoken:" + token,
				},
				data: {
					type: type,
					participate: chutu_inp,
					content: content,
					num: num,
					project_id: project_id,
				},
				success: function(data) {
					if(data.status == 1) {
						toast(data.msg);
						$("#boxPock").hide();
						$(".travel_add").hide();
						chutu(project_id, 1);
					} else {
						toast(data.msg);
					}
				},
				error: function(data) {},
				async: true
			});
		}
	});

	/*编辑-出图出差*/
	var pic_edit_id; /*出图出差列表id*/
	$(document).on('click', '.travel_detail td .edit', function() {
		var pic_edit_userid = $(this).parents('tr').attr('data-userid'); /*列表用户id*/
		pic_edit_id = $(this).parents('tr').attr('data-id'); /*列表id*/
		var pic_edit_name = $(this).parents('tr').attr('data-name'); /*列表类型*/
		var pic_edit_nickname = $(this).parents('tr').attr('data-nickname'); /*列表参与人*/
		var pic_edit_num = $(this).parents('tr').attr('data-num'); /*列表数量*/
		var pic_edit_content = $(this).parents('tr').attr('data-content'); /*列表内容*/
		var hidden_id = $(this).attr("data-id");

		$("#boxPock").show();
		$(".travel_edit").show();
		$('.travel_edit #chutu_type_name').val(pic_edit_name);
		$('.travel_edit #chutu_type_list').val(pic_edit_name);
		$('#participate').val(pic_edit_nickname);
		$('#pic_edit_content').val(pic_edit_content);
		$('#pic_edit_num').val(pic_edit_num);
		$('.travel_edit .hidden').val(hidden_id);

	});
	$(document).on('click', '#btn_edit_chu', function() {
		$.ajax({
			type: "post",
			url: host_host_host + "/home/process/EditPicture",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				type: $('#chutu_type_list').val(),
				participate: $('.travel_edit .hidden').val(),
				content: $('#pic_edit_content').val(),
				num: $('#pic_edit_num').val(),
				id: pic_edit_id,
			},
			success: function(data) {
				if(data.status == 1) {
					toast(data.msg);
					$("#boxPock").hide();
					$(".process_edit").hide();
					chutu(project_id, 1);
				} else {
					toast(data.msg);
				}
			},
			error: function(data) {},
			async: true
		});
	});

	/*查看-出图出差*/
	$(document).on('click', '.travel_detail td .check', function() {
		pic_edit_id = $(this).parents('tr').attr('data-id'); /*列表id*/
		var pic_edit_name = $(this).parents('tr').attr('data-name');
		var pic_edit_num = $(this).parents('tr').attr('data-num');
		var pic_edit_nickname = $(this).parents('tr').attr('data-nickname');
		var pic_edit_content = $(this).parents('tr').attr('data-content');

		$('#pic_look_name').val(pic_edit_nickname);
		$('#pic_look_type').val(pic_edit_name);
		$('#pic_look_num').val(pic_edit_num);
		$('#pic_look_content').val(pic_edit_content);
	});

	/*删除-出图出差*/
	$(document).on('click', '.travel_detail td .del', function() {
		pro_edit_id = $(this).parents('tr').attr('data-id');
		delNum = 2;
		$("#boxPock").show();
		$("#boxPock .del").show();
	});
	$(document).on("click", "#boxPock .del .btn1", function() {
		if(delNum == 2) {
			$.ajax({
				type: "post",
				url: host_host_host + "/home/process/dele",
				dataType: 'json',
				headers: {
					accept: "usertoken:" + token,
				},
				data: {
					id: pro_edit_id,
					type: 2,
				},
				success: function(data) {
					if(data.status == 1) {
						toast(data.msg);
						$("#boxPock").hide();
						$("#boxPock .del").hide();
						chutu(project_id, 1);
					} else {
						toast(data.msg);
					}
				},
				error: function(data) {},
				async: true
			});
		}
	})
	/*发函管理列表*/
	//发函管理增加的操作
	$(".manage_detail .manage_detail_head").on("click", function() {
		$("#boxPock").show();
		$(".manage_add").show();
	})
	$(".manage_add_head i,.manage_add_bottom .btn2").on("click", function() {
		$("#boxPock").hide();
		$(".manage_add").hide();
	})
	//发函管理查看的操作
	$(document).on('click', '.manage_detail td .check', function() {
		$("#boxPock").show();
		$(".manage_check").show();
	})
	$(".manage_check_head i,.manage_check_bottom .btn2").on("click", function() {
		$("#boxPock").hide();
		$(".manage_check").hide();
	})
	//发函管理编辑的操作
	$(".manage_edit_head i,.manage_edit_bottom .btn2").on("click", function() {
		$("#boxPock").hide();
		$(".manage_edit").hide();
	})
	/*发函管理数据*/
	var letter_page = 1,
		letter_pages;
	$(document).on('click', '#letter_pre', function() {
		if(letter_page == 1) {
			toast('已经是第一页了！');
			return false;
		}
		letter_page--;
		letter(project_id, letter_page);
	});
	$(document).on('click', '#letter_next', function() {
		if(letter_page == letter_pages) {
			toast('已经是最后一页了！');
			return false;
		}
		letter_page++;
		letter(project_id, letter_page);
	});
//	letter(project_id, 1);

	function letter(project_id, letter_page) {
		$.ajax({
			type: "post",
			url: host_host_host + "/home/process/letter",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				project_id: project_id,
				p: letter_page
			},
			success: function(data) {
				if(data.status == 1) {
					console.log(data);
					var str = '';
					letter_pages = data.data.page;
					for(var i = 0; i < data.data.letter.length; i++) {
						str += '<tr data-userid="' + data.data.letter[i].user_id + '" data-id="' + data.data.letter[i].id + '" data-time="' + data.data.letter[i].time + '" data-name="' + data.data.letter[i].name + '" data-nickname="' + data.data.letter[i].nickname + '" data-filename="' + data.data.letter[i].filename + '" data-content="' + data.data.letter[i].content + '">';
						str += '	<td>' + (i + 1) + '</td>';
						str += '	<td>' + data.data.letter[i].time + '</td>';
						str += '	<td>' + data.data.letter[i].name + '</td>';
						str += '	<td>' + data.data.letter[i].content + '</td>';
						str += '	<td class="letterFile">' + data.data.letter[i].filename + '</td>';
						str += '	<td>' + data.data.letter[i].nickname + '</td>';
						str += '	<td class="handle">';
						str += '		<span class="check">查看</span>';
						if(data.data.user_id == data.data.letter[i].user_id) {
							str += '		<span class="edit">编辑</span>';
							str += '		<span class="del">删除</span>';
						}
						str += '	</td>';
						str += '</tr>';
					}
					$('#lett_box').html(str);
					$('#letter_count').text(data.data.count);
					$('#letternow_page').text(letter_page);
					$('#lettertotal_page').text(letter_pages);
				} else {}
			},
			error: function(data) {},
			async: true
		});
	}

	/*类型-发函管理*/
	$(document).on('click', '.manage_detail_head,.manage_detail td .edit', function() {
		$(".manage_add input").val("");
		$.ajax({
			type: "post",
			url: host_host_host + "/home/common/LetterType",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {},
			success: function(data) {
				if(data.status == 1) {
					console.log(data);
					str = '';
					str += '<option value="-1">请选择</option>';
					for(var i = 0; i < data.data.length; i++) {
						str += '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
					}
					$('#letter_type,.manage_edit #letter_type_list').html(str);
					//					$('#letter_typename').val(data.data[0].name);
				} else {}
			},
			error: function(data) {},
			async: true
		});
	});

	/*增加-发函管理*/
	$(document).on('click', '#btn_add_letter', function() {
		var formData = new FormData($("#letter_form")[0]);
		formData.append("project_id", project_id);
		formData.append("data_type", 1);
		$.ajax({
			type: "post",
			url: host_host_host + "/home/process/AddLetter",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: formData,
			processData: false,
			contentType: false,
			success: function(data) {
				if(data.status == 1) {
					toast(data.msg);
					$("#boxPock").hide();
					$(".manage_add").hide();
					letter(project_id, 1);
				} else {
					toast(data.msg);
				}
			},
			error: function(data) {},
			async: true
		});
	});
	/*编辑-发函管理*/
	var man_edit_id; /*列表id*/
	$(document).on('click', '.manage_detail td .edit', function() {
		var man_edit_userid = $(this).parents('tr').attr('data-userid'); /*列表用户id*/
		man_edit_id = $(this).parents('tr').attr('data-id'); /*列表id*/
		var man_edit_name = $(this).parents('tr').attr('data-name'); /*列表类型*/
		var man_edit_time = $(this).parents('tr').attr('data-time'); /*列表时间*/
		var man_edit_filename = $(this).parents('tr').attr('data-filename'); /*列表文件名*/
		var man_edit_content = $(this).parents('tr').attr('data-content'); /*列表内容*/

		$("#boxPock").show();
		$(".manage_edit").show();
		$('.manage_edit #letter_edit_typename').val(man_edit_name);
		$('#manage_two').val(man_edit_time);
		$('#letter_edit_filename').text(man_edit_filename);
		$('#letter_edit_content').val(man_edit_content);
	});
	$(document).on('click', '#btn_edit_letter', function() {
		var formData = new FormData($("#letter_edit")[0]);
		formData.append("id", man_edit_id);
		$.ajax({
			type: "post",
			url: host_host_host + "/home/process/EditLetter",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: formData,
			processData: false,
			contentType: false,
			success: function(data) {
				if(data.status == 1) {
					toast(data.msg);
					$("#boxPock").hide();
					$(".manage_edit").hide();
					letter(project_id, 1);
				} else {
					toast(data.msg);
				}
			},
			error: function(data) {},
			async: true
		});
	});

	/*查看-发函管理*/
	$(document).on('click', '.manage_detail td .check', function() {
		man_edit_id = $(this).parents('tr').attr('data-id'); /*列表id*/
		var man_edit_name = $(this).parents('tr').attr('data-name');
		var man_edit_filename = $(this).parents('tr').attr('data-filename');
		var man_edit_time = $(this).parents('tr').attr('data-time');
		var man_edit_nickname = $(this).parents('tr').attr('data-nickname');
		var man_edit_content = $(this).parents('tr').attr('data-content');

		$('#letter_look_type').val(man_edit_name);
		$('#letter_look_file').text(man_edit_filename);
		$('#letter_look_name').val(man_edit_nickname);
		$('#letter_look_time').val(man_edit_time);
		$('#letter_look_content').val(man_edit_content);
	});

	/*删除-发函管理*/
	$(document).on('click', '.manage_detail td .del', function() {
		//		var man_edit_userid = $(this).parents('tr').attr('data-userid');
		man_edit_id = $(this).parents('tr').attr('data-id');
		delNum = 3;
		$("#boxPock").show();
		$("#boxPock .del").show();
	});
	$(document).on("click", "#boxPock .del .btn1", function() {
		if(delNum == 3) {
			$.ajax({
				type: "post",
				url: host_host_host + "/home/process/dele",
				dataType: 'json',
				headers: {
					accept: "usertoken:" + token,
				},
				data: {
					id: man_edit_id,
					type: 3,
				},
				success: function(data) {
					if(data.status == 1) {
						toast(data.msg);
						$("#boxPock").hide();
						$("#boxPock .del").hide();
						letter(project_id, 1);
					} else {
						toast(data.msg);
					}
				},
				error: function(data) {},
				async: true
			});
		}
	})

	/*图纸归档列表*/
	//图纸归档增加的操作
	$(".picture_detail .picture_detail_head").on("click", function() {
		$("#boxPock").show();
		$(".picture_add").show();
	})
	$(".picture_add_head i,.picture_add_bottom .btn2").on("click", function() {
		$("#boxPock").hide();
		$(".picture_add").hide();
	})
	//图纸归档查看的操作
	$(document).on('click', '.picture_detail td .check', function() {
		//	$(".picture_detail td .check").on("click", function() {
		$("#boxPock").show();
		$(".picture_check").show();
	})
	$(".picture_check_head i,.picture_check_bottom .btn2").on("click", function() {
		$("#boxPock").hide();
		$(".picture_check").hide();
	})
	//图纸归档编辑的操作
	$(".picture_edit_head i,.picture_edit_bottom .btn2").on("click", function() {
		$("#boxPock").hide();
		$(".picture_edit").hide();
	})

	/*图纸归档的数据*/
	var guid_page = 1,
		guid_pages;
	$(document).on('click', '#guid_pre', function() {
		if(guid_page == 1) {
			toast('已经是第一页了！');
			return false;
		}
		guid_page--;
		guid(project_id, guid_page);
	});
	$(document).on('click', '#guid_next', function() {
		if(guid_page == guid_pages) {
			toast('已经是最后一页了！');
			return false;
		}
		guid_page++;
		guid(project_id, guid_page);
	});
//	guid(project_id, 1);

	function guid(project_id, guid_page) {
		$.ajax({
			type: "post",
			url: host_host_host + "/home/process/Archiving",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				project_id: project_id,
				p: guid_page
			},
			success: function(data) {
				if(data.status == 1) {
					console.log(data);
					var str = '';
					guid_pages = data.data.page;
					for(var i = 0; i < data.data.letter.length; i++) {
						str += '<tr data-userid="' + data.data.letter[i].user_id + '" data-id="' + data.data.letter[i].id + '" data-time="' + data.data.letter[i].time + '" data-name="' + data.data.letter[i].name + '" data-nickname="' + data.data.letter[i].nickname + '" data-filename="' + data.data.letter[i].filename + '" data-content="' + data.data.letter[i].content + '">';
						str += '	<td>' + (i + 1) + '</td>';
						str += '	<td>' + data.data.letter[i].time + '</td>';
						str += '	<td>' + data.data.letter[i].name + '</td>';
						str += '	<td>' + data.data.letter[i].content + '</td>';
						str += '	<td class="titleFile">' + data.data.letter[i].filename + '</td>';
						str += '	<td>' + data.data.letter[i].nickname + '</td>';
						str += '	<td class="handle">';
						str += '		<span class="check">查看</span>';
						if(data.data.user_id == data.data.letter[i].user_id) {
							str += '		<span class="edit">编辑</span>';
							str += '		<span class="del">删除</span>';
						}
						str += '	</td>';
						str += '</tr>';
					}
					$('#guid_box').html(str);
					$('#guid_count').text(data.data.count);
					$('#guidnow_page').text(guid_page);
					$('#guidtotal_page').text(guid_pages);
				} else {}
			},
			error: function(data) {},
			async: true
		});
	}

	/*类型-图纸归档*/
	$(document).on('click', '.picture_detail,.picture_detail td .edit', function() {
		$(".picture_add input").val("");
		$.ajax({
			type: "post",
			url: host_host_host + "/home/common/ArchivingType",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {},
			success: function(data) {
				if(data.status == 1) {
					console.log(data);
					str = '';
					str += '<option value="">请选择</option>';
					for(var i = 0; i < data.data.length; i++) {
						str += '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
					}
					$('#picture_type,.picture_edit #archive_type_list').html(str);
					//					$('#picture_typename').val(data.data[0].name);
				} else {}
			},
			error: function(data) {},
			async: true
		});
	});

	/*增加-图纸归档*/
	$(document).on('click', '#btn_add_archive', function() {
		var formData = new FormData($("#picture_form")[0]);
		formData.append("project_id", project_id);
		formData.append("data_type", "2");
		$.ajax({
			type: "post",
			url: host_host_host + "/home/process/AddLetter",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: formData,
			processData: false,
			contentType: false,
			success: function(data) {
				if(data.status == 1) {
					toast(data.msg);
					$("#boxPock").hide();
					$(".picture_add").hide();
					guid(project_id, 1);
				} else {
					toast(data.msg);
				}
			},
			error: function(data) {},
			async: true
		});
	});
	/*编辑-图纸归档*/
	var tu_edit_id; /*列表id*/
	$(document).on('click', '.picture_detail td .edit', function() {
		var tu_edit_userid = $(this).parents('tr').attr('data-userid'); /*列表用户id*/
		tu_edit_id = $(this).parents('tr').attr('data-id'); /*列表id*/
		var tu_edit_name = $(this).parents('tr').attr('data-name'); /*列表类型*/
		var tu_edit_time = $(this).parents('tr').attr('data-time'); /*列表时间*/
		var tu_edit_filename = $(this).parents('tr').attr('data-filename'); /*列表文件名*/
		var tu_edit_content = $(this).parents('tr').attr('data-content'); /*列表内容*/

		$('#tu_edit_id').val(tu_edit_id);

		$("#boxPock").show();
		$(".picture_edit").show();
		$('.picture_detail #tu_edit_typename').val(tu_edit_name);
		$('.picture_detail #archive_type_list').val(tu_edit_name);
		$('#pic_add_two').val(tu_edit_time);
		$('#tu_edit_filename').text(tu_edit_filename);
		$('#tu_edit_content').val(tu_edit_content);

	});
	$(document).on('click', '#btn_edit_archive', function() {
		var formData = new FormData($("#tu_edit")[0]);
		formData.append("id", tu_edit_id);
		$.ajax({
			type: "post",
			url: host_host_host + "/home/process/EditLetter",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: formData,
			processData: false,
			contentType: false,
			success: function(data) {
				if(data.status == 1) {
					toast(data.msg);
					$("#boxPock").hide();
					$(".picture_edit").hide();
					guid(project_id, 1);
				} else {
					toast(data.msg);
				}
			},
			error: function(data) {},
			async: true
		});
	});

	/*查看-图纸归档*/
	$(document).on('click', '.picture_detail td .check', function() {
		var tu_edit_name = $(this).parents('tr').attr('data-name');
		var tu_edit_filename = $(this).parents('tr').attr('data-filename');
		var tu_edit_time = $(this).parents('tr').attr('data-time');
		var tu_edit_nickname = $(this).parents('tr').attr('data-nickname');
		var tu_edit_content = $(this).parents('tr').attr('data-content');

		$('#tu_look_type').val(tu_edit_name);
		$('#tu_look_filename').text(tu_edit_filename);
		$('#tu_look_name').val(tu_edit_nickname);
		$('#tu_look_time').val(tu_edit_time);
		$('#tu_look_content').val(tu_edit_content);
	});

	/*删除-图纸归档*/
	$(document).on('click', '.picture_detail td .del', function() {
		//		var tu_edit_userid = $(this).parents('tr').attr('data-userid');
		tu_edit_id = $(this).parents('tr').attr('data-id');
		delNum = 4;
		$("#boxPock").show();
		$("#boxPock .del").show();
	});
	$(document).on("click", "#boxPock .del .btn1", function() {
		if(delNum == 4) {
			$.ajax({
				type: "post",
				url: host_host_host + "/home/process/dele",
				dataType: 'json',
				headers: {
					accept: "usertoken:" + token,
				},
				data: {
					id: tu_edit_id,
					type: 4,
				},
				success: function(data) {
					if(data.status == 1) {
						toast(data.msg);
						$("#boxPock").hide();
						$("#boxPock .del").hide();
						guid(project_id, 1);
					} else {
						toast(data.msg);
					}
				},
				error: function(data) {},
				async: true
			});
		}
	})

	/*项目分工-列表*/
	var xiamgm_page = 1,
		xiamgm_pages;
	$(document).on('click', '#xiangm_pre', function() {
		if(xiamgm_page == 1) {
			alert('已经是第一页了！');
			return false;
		}
		xiamgm_page--;
		xiangmulist();
	});
	$(document).on('click', '#xiangm_next', function() {
		if(xiamgm_page == xiamgm_pages) {
			alert('已经是最后一页了！');
			return false;
		}
		xiamgm_page++;
		xiangmulist();
	});

	$.ajax({
		type: "post",
		url: host_host_host + "/home/project/index",
		dataType: 'json',
		headers: {
			accept: "usertoken:" + token,
		},
		data: {
			project_id: project_id
		},
		success: function(data) {
			if(data.status == 1) {
				console.log(data);
				var xiangm_li = '';
				for(var i = 0; i < data.data.child.length; i++) {
					if(i == 0) {
						xiangm_li += '<li class="active" data-id="' + data.data.child[i].id + '">' + data.data.child[i].name + '</li>';
					} else {
						xiangm_li += '<li data-id="' + data.data.child[i].id + '">' + data.data.child[i].name + '</li>';
					}
				}
				$('#xiangm_li').html(xiangm_li);
				xiangmid = $('#xiangm_li li').attr('data-id');
				xiangmulist();
			} else {
				console.log(data);
				alert(data.msg);
			}
		},
		error: function(data) {},
		async: true
	});

	/*项目分工分类列表切换*/
	var xiangmid;
	$(document).on('click', '#xiangm_li li', function() {
		$('#xiangm_li li').removeClass('active');
		$(this).addClass('active');
		xiangmid = $(this).attr('data-id');
		console.log(xiangmid);
		xiangmulist();
	});

	function xiangmulist() {
		$.ajax({
			type: "post",
			url: host_host_host + "/home/project/ProjectLabor",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				chile_id: xiangmid,
				p: xiamgm_page
			},
			success: function(data) {
				if(data.status == 1) {
					console.log(data);
					var xiangm = '';
					xiamgm_pages = data.data.page;
					for(var i = 0; i < data.data.user.length; i++) {
						xiangm += '<tr data-id="' + data.data.user[i].id + '" data-userid="' + data.data.user[i].user_id + '" data-duserid="' + data.data.user_id + '">';
						xiangm += '	<td>' + (i + 1) + '</td>';
						xiangm += '	<td>' + data.data.user[i].nickname + '</td>';
						xiangm += '	<td>' + data.data.user[i].work.name + '</td>';
						xiangm += '	<td>' + data.data.user[i].labor + '</td>';
						xiangm += '	<td>' + data.data.user[i].content + '</td>';
						xiangm += '	<td class="handle">';
						xiangm += '		<span class="check">查看</span>';
						if(data.data.user_id == data.data.user[i].user_id) {
							xiangm += '		<span class="edit">编辑</span>';
							xiangm += '		<span class="del">删除</span>';
						}
						xiangm += '	</td>';
						xiangm += '</tr>';
					}
					$('#xiangm_list').html(xiangm);
					$('#xiangm_count').text(data.data.count);
					$('#xiangmnow_page').text(xiamgm_page);
					$('#xiangmtotal_page').text(xiamgm_pages);
				} else {
					console.log(data);
					alert(data.msg);
				}
			},
			error: function(data) {},
			async: true
		});
	}

	/*项目分工-编辑*/
	var xiangmu_edid;
	var xm_userid;
	$(document).on('click', '.item_detail tbody .edit', function() {
		xm_userid = $(this).parents('tr').attr('data-duserid'); /*表格用户id*/
		xiangmu_edid = $(this).parents('tr').attr('data-id'); /*列表id*/
		var xiangmu_eduserid = $(this).parents('tr').attr('data-userid'); /*用户id*/
		console.log(xm_userid, xiangmu_edid, xiangmu_eduserid);
		if(xiangmu_eduserid == xm_userid) {
			$.ajax({
				type: "post",
				url: host_host_host + "/home/project/history",
				dataType: 'json',
				headers: {
					accept: "usertoken:" + token,
				},
				data: {
					id: xiangmu_eduserid,
					chile_id: xiangmid,
				},
				success: function(data) {
					if(data.status == 1) {
						console.log(data);
						$("#boxPock").show();
						$("#boxPock .item_add").show();
						$('#xm_ed_nickname').val(data.data.staff.nickname);
						$('#xm_ed_workname').val(data.data.staff.work.name);
						$('#xm_ed_director').val(data.data.staff.director);
						$('#xm_ed_labor').val(data.data.staff.labor);
						$('#xm_ed_content').val(data.data.staff.content);

						for(var i = 0; i < data.data.project_staff.length; i++) {
							var lishi = '';
							lishi += '<div class="first_stage">';
							lishi += '	<div class="stage_head">';
							lishi += '		<span>阶段：</span><span>' + data.data.project_staff[i].start_time + '-' + data.data.project_staff[i].end_time + '</span>';
							lishi += '	</div>';
							lishi += '	<textarea name="" rows="" cols="" placeholder="请输入内容" disabled="disabled">data.data.project_staff[i].labor</textarea>';
							lishi += '</div>';
						}
						$('#xm_ed_lishi').html(lishi);
					} else {
						console.log(data);
					}
				},
				error: function(data) {},
				async: true
			});

		} else {
			alert('不可编辑');
		}
	});
	$(document).on('click', '#xiangmu_btn', function() {
		//		xiangmu_edid = $(this).parents('tr').attr('data-id'); /*列表id*/
		console.log(xiangmu_edid);
		$.ajax({
			type: "post",
			url: host_host_host + "/home/project/EditLabor",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				id: xiangmu_edid,
				labor: $('#xm_ed_content').val(),
			},
			success: function(data) {
				if(data.status == 1) {
					console.log(data);
					alert(data.msg);
					window.location.reload();
				} else {
					console.log(data);
				}
			},
			error: function(data) {},
			async: true
		});
	});

	/*项目分工-查看*/
	$(document).on('click', '.item_detail tbody .check', function() {
		$("#boxPock").show();
		$("#boxPock .item_check").show();
		xm_userid = $(this).parents('tr').attr('data-duserid'); /*表格用户id*/
		var xiangmu_loid = $(this).parents('tr').attr('data-id');
		var xiangmu_louserid = $(this).parents('tr').attr('data-userid'); /*用户id*/

		console.log(xm_userid, xiangmu_loid, xiangmu_louserid);
		$.ajax({
			type: "post",
			url: host_host_host + "/home/project/history",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				id: xiangmu_louserid,
				chile_id: xiangmid,
			},
			success: function(data) {
				if(data.status == 1) {
					//					console.log(data);
					$('#xm_lo_nickname').val(data.data.staff.nickname);
					$('#xm_lo_workname').val(data.data.staff.work.name);
					$('#xm_lo_director').val(data.data.staff.director);
					$('#xm_lo_labor').val(data.data.staff.labor);
					$('#xm_lo_content').val(data.data.staff.content);

					for(var i = 0; i < data.data.project_staff.length; i++) {
						var lishi = '';
						lishi += '<div class="first_stage">';
						lishi += '	<div class="stage_head">';
						lishi += '		<span>阶段：</span><span>' + data.data.project_staff[i].start_time + '-' + data.data.project_staff[i].end_time + '</span>';
						lishi += '	</div>';
						lishi += '	<textarea name="" rows="" cols="" placeholder="请输入内容" disabled="disabled">' + data.data.project_staff[i].content + '</textarea>';
						lishi += '</div>';
					}
					$('#xm_lo_lishi').html(lishi);
				} else {
					console.log(data);
				}
			},
			error: function(data) {},
			async: true
		});
	});

	/*删除-项目分工*/
	$(document).on('click', '.item_detail tbody .del', function() {
		xm_userid = $(this).parents('tr').attr('data-duserid'); /*表格用户id*/
		xiangmu_edid = $(this).parents('tr').attr('data-id'); /*列表id*/
		var xiangmu_eduserid = $(this).parents('tr').attr('data-userid'); /*用户id*/
		if(xiangmu_eduserid == xm_userid) {
			$.ajax({
				type: "post",
				url: host_host_host + "/home/process/dele",
				dataType: 'json',
				headers: {
					accept: "usertoken:" + token,
				},
				data: {
					id: xiangmu_edid,
					type: 5,
				},
				success: function(data) {
					if(data.status == 1) {
						console.log(data);
						alert(data.msg);
						window.location.reload();
					} else {
						console.log(data);
						alert(data.msg);
					}
				},
				error: function(data) {},
				async: true
			});

		} else {
			alert('不可编辑');
		}
	});
	/*===*/
	/*10/20==========*/
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
			data: {

			},
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
		$(document).on("click", ".travel_add .choose", function() {
			chooseNum = 1;
			$("#boxPock").show();
			$("#subitem_choose").show();
			people = '';
			var html = "";
			people = $(this);
			html += '<div class="work_style"><ul class="clearfix"></ul></div>';
			$(".item_right_ctn").append(html);
		})
		$(document).on("click", ".travel_edit .choose", function() {
			chooseNum = 2;
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
			$("#subitem_choose").hide();
			var listxt = $(".item_right_ctn ul li span").text();
			var dataId = $(".item_right_ctn ul li span").attr("data-id");
			$(".admin li").removeClass("active");
			$(".item_right_ctn .work_style").remove();
			people.siblings(".show").val(listxt);
			people.siblings(".hidden").val(dataId);
			if(chooseNum == 1) {
				$(".travel_add").show();
			} else {
				$(".travel_edit").show();
			}
		})
	}

	/*下载*/	
	$(document).on("click", ".picture_detail .titleFile", function() {
		var id = $(this).parents("tr").attr("data-id");
		location.href = host_host_host + "/home/process/download/id/" + id;
	})
	$(document).on("click", ".manage_detail .letterFile", function() {
		var id = $(this).parents("tr").attr("data-id");
		location.href = host_host_host + "/home/process/download/id/" + id;
	})
	$(document).on("click", "#letter_look_file,#letter_edit_filename", function() {
		var id = man_edit_id;
		location.href = host_host_host + "/home/process/download/id/" + id;
	})
})