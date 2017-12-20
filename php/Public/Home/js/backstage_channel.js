$(function() {
	//box 切换
	$(document).on("click", ".box .tap li", function() {
		$(this).addClass("tapDivActive").siblings().removeClass("tapDivActive");
		var index = $(this).index();
		$(".box .boxtab").hide();
		$(".box .boxtab").eq(index).show();
	})
	//过程管理切换
	$(document).on("click", ".process_one .first .xs-3", function() {
		$(this).addClass("HeaderRowsActive").siblings().removeClass("HeaderRowsActive");
		var index = $(this).index();
		$(".process_one .third").hide();
		$(".process_one .third").eq(index).show();
	})
	//项目信息切换
	$(document).on("click", ".process_two .first .xs-3", function() {
		$(this).addClass("HeaderRowsActive").siblings().removeClass("HeaderRowsActive");
		var index = $(this).index();
		$(".process_two .third").hide();
		$(".process_two .third").eq(index).show();
	})
	//财务切换
	$(document).on("click", ".process_five .first .xs-3", function() {
		$(this).addClass("HeaderRowsActive").siblings().removeClass("HeaderRowsActive");
		var index = $(this).index();
		$(".process_five .third").hide();
		$(".process_five .third").eq(index).show();
	})

	//数据接口
	//建筑类型增加
	var flag;
	var addId;
	var content;
	var addThis;
	var delTxt;
	//建筑类型增加
	$(document).on("click", ".process_two .process button", function() {
		$("#boxPock").show();
		$("#boxPock .edit").show();
		flag = 1;
	})
	//建筑类型编辑
	$(document).on("click", ".process_two .process tr .edit", function() {
		$("#boxPock").show();
		$("#boxPock .edit").show();
		flag = 2;
		addId = $(this).parents("tr").find("td").eq(0).text();
		content = $(this).parents("tr").find("td").eq(1).text();
		console.log(addId, content);
		$("#boxPock .edit .edit_bottom input").val(content);
		addThis = $(this);
	})
	//建筑类型删除
	$(document).on("click", ".process_two .process tr .del", function() {
		flag = 3;
		addId = $(this).parents("tr").find("td").eq(0).text();
		delTxt = $(this).parents("tr").find("td").eq(1).text();
		addThis = $(this);
		$("#boxPock").show();
		$("#boxPock .del").show();
		console.log(flag)
	})
	//项目阶段增加
	$(document).on("click", ".process_two .trip button", function() {
		$("#boxPock").show();
		$("#boxPock .edit").show();
		flag = 4;
	})
	//项目阶段编辑
	$(document).on("click", ".process_two .trip tr .edit", function() {
		$("#boxPock").show();
		$("#boxPock .edit").show();
		flag = 5;
		addId = $(this).parents("tr").find("td").eq(0).text();
		content = $(this).parents("tr").find("td").eq(1).text();
		console.log(addId, content);
		$("#boxPock .edit .edit_bottom input").val(content);
		addThis = $(this);
	})
	//项目阶段删除
	$(document).on("click", ".process_two .trip tr .del", function() {
		flag = 6;
		addId = $(this).parents("tr").find("td").eq(0).text();
		delTxt = $(this).parents("tr").find("td").eq(1).text();
		addThis = $(this);
		$("#boxPock").show();
		$("#boxPock .del").show();
		console.log(flag)
	})
	//工种类型增加
	$(document).on("click", ".process_two .manage button", function() {
		$("#boxPock").show();
		$("#boxPock .edit").show();
		flag = 7;
	})
	//工种类型编辑
	$(document).on("click", ".process_two .manage tr .edit", function() {
		$("#boxPock").show();
		$("#boxPock .edit").show();
		flag = 8;
		addId = $(this).parents("tr").find("td").eq(0).text();
		content = $(this).parents("tr").find("td").eq(1).text();
		console.log(addId, content);
		$("#boxPock .edit .edit_bottom input").val(content);
		addThis = $(this);
	})
	//工种类型删除
	$(document).on("click", ".process_two .manage tr .del", function() {
		flag = 9;
		addId = $(this).parents("tr").find("td").eq(0).text();
		delTxt = $(this).parents("tr").find("td").eq(1).text();
		addThis = $(this);
		$("#boxPock").show();
		$("#boxPock .del").show();
		console.log(flag)
	})
	//过程纪要增加
	$(document).on("click", ".process_one .process button", function() {
		$("#boxPock").show();
		$("#boxPock .edit").show();
		flag = 10;
	})
	//过程纪要编辑
	$(document).on("click", ".process_one .process tr .edit", function() {
		$("#boxPock").show();
		$("#boxPock .edit").show();
		flag = 11;
		addId = $(this).parents("tr").find("td").eq(0).text();
		content = $(this).parents("tr").find("td").eq(1).text();
		console.log(addId, content);
		$("#boxPock .edit .edit_bottom input").val(content);
		addThis = $(this);
	})
	//过程纪要删除
	$(document).on("click", ".process_one .process tr .del", function() {
		flag = 12;
		addId = $(this).parents("tr").find("td").eq(0).text();
		delTxt = $(this).parents("tr").find("td").eq(1).text();
		addThis = $(this);
		$("#boxPock").show();
		$("#boxPock .del").show();
		console.log(flag)
	})
	//出图出差增加
	$(document).on("click", ".process_one .trip button", function() {
		$("#boxPock").show();
		$("#boxPock .edit").show();
		flag = 13;
	})
	//出图出差编辑
	$(document).on("click", ".process_one .trip tr .edit", function() {
		$("#boxPock").show();
		$("#boxPock .edit").show();
		flag = 14;
		addId = $(this).parents("tr").find("td").eq(0).text();
		content = $(this).parents("tr").find("td").eq(1).text();
		console.log(addId, content);
		$("#boxPock .edit .edit_bottom input").val(content);
		addThis = $(this);
	})
	//出图出差删除
	$(document).on("click", ".process_one .trip tr .del", function() {
		flag = 15;
		addId = $(this).parents("tr").find("td").eq(0).text();
		delTxt = $(this).parents("tr").find("td").eq(1).text();
		addThis = $(this);
		$("#boxPock").show();
		$("#boxPock .del").show();
		console.log(flag)
	})
	//发函管理增加
	$(document).on("click", ".process_one .manage button", function() {
		$("#boxPock").show();
		$("#boxPock .edit").show();
		flag = 16;
	})
	//发函管理编辑
	$(document).on("click", ".process_one .manage tr .edit", function() {
		$("#boxPock").show();
		$("#boxPock .edit").show();
		flag = 17;
		addId = $(this).parents("tr").find("td").eq(0).text();
		content = $(this).parents("tr").find("td").eq(1).text();
		console.log(addId, content);
		$("#boxPock .edit .edit_bottom input").val(content);
		addThis = $(this);
	})
	//发函管理删除
	$(document).on("click", ".process_one .manage tr .del", function() {
		flag = 18;
		addId = $(this).parents("tr").find("td").eq(0).text();
		delTxt = $(this).parents("tr").find("td").eq(1).text();
		addThis = $(this);
		$("#boxPock").show();
		$("#boxPock .del").show();
		console.log(flag)
	})
	//图纸归档增加
	$(document).on("click", ".process_one .pictrue button", function() {
		$("#boxPock").show();
		$("#boxPock .edit").show();
		flag = 19;
	})
	//图纸归档编辑
	$(document).on("click", ".process_one .pictrue tr .edit", function() {
		$("#boxPock").show();
		$("#boxPock .edit").show();
		flag = 20;
		addId = $(this).parents("tr").find("td").eq(0).text();
		content = $(this).parents("tr").find("td").eq(1).text();
		console.log(addId, content);
		$("#boxPock .edit .edit_bottom input").val(content);
		addThis = $(this);
	})
	//图纸归档删除
	$(document).on("click", ".process_one .pictrue tr .del", function() {
		flag = 21;
		addId = $(this).parents("tr").find("td").eq(0).text();
		delTxt = $(this).parents("tr").find("td").eq(1).text();
		addThis = $(this);
		$("#boxPock").show();
		$("#boxPock .del").show();
	})
	//任务增加
	$(document).on("click", ".process_three .process button", function() {
		$("#boxPock").show();
		$("#boxPock .edit").show();
		flag = 22;
	})
	//任务编辑
	$(document).on("click", ".process_three .process tr .edit", function() {
		$("#boxPock").show();
		$("#boxPock .edit").show();
		flag = 23;
		addId = $(this).parents("tr").find("td").eq(0).text();
		content = $(this).parents("tr").find("td").eq(1).text();
		console.log(addId, content);
		$("#boxPock .edit .edit_bottom input").val(content);
		addThis = $(this);
	})
	//任务删除
	$(document).on("click", ".process_three .process tr .del", function() {
		flag = 24;
		addId = $(this).parents("tr").find("td").eq(0).text();
		delTxt = $(this).parents("tr").find("td").eq(1).text();
		addThis = $(this);
		$("#boxPock").show();
		$("#boxPock .del").show();
	})
	//通知增加
	$(document).on("click", ".process_four .process button", function() {
		$("#boxPock").show();
		$("#boxPock .edit").show();
		flag = 25;
	})
	//通知编辑
	$(document).on("click", ".process_four .process tr .edit", function() {
		$("#boxPock").show();
		$("#boxPock .edit").show();
		flag = 26;
		addId = $(this).parents("tr").find("td").eq(0).text();
		content = $(this).parents("tr").find("td").eq(1).text();
		console.log(addId, content);
		$("#boxPock .edit .edit_bottom input").val(content);
		addThis = $(this);
	})
	//通知删除
	$(document).on("click", ".process_four .process tr .del", function() {
		flag = 27;
		addId = $(this).parents("tr").find("td").eq(0).text();
		delTxt = $(this).parents("tr").find("td").eq(1).text();
		addThis = $(this);
		$("#boxPock").show();
		$("#boxPock .del").show();
	})
	//项目支出增加
	$(document).on("click", ".process_five .process button", function() {
		$("#boxPock").show();
		$("#boxPock .edit").show();
		flag = 28;
	})
	//项目支出编辑
	$(document).on("click", ".process_five .process tr .edit", function() {
		$("#boxPock").show();
		$("#boxPock .edit").show();
		flag = 29;
		addId = $(this).parents("tr").find("td").eq(0).text();
		content = $(this).parents("tr").find("td").eq(1).text();
		console.log(addId, content);
		$("#boxPock .edit .edit_bottom input").val(content);
		addThis = $(this);
	})
	//项目支出删除
	$(document).on("click", ".process_five .process tr .del", function() {
		flag = 30;
		addId = $(this).parents("tr").find("td").eq(0).text();
		delTxt = $(this).parents("tr").find("td").eq(1).text();
		addThis = $(this);
		$("#boxPock").show();
		$("#boxPock .del").show();
	})
	//行政支出增加
	$(document).on("click", ".process_five .trip button", function() {
		$("#boxPock").show();
		$("#boxPock .edit").show();
		flag = 31;
	})
	//行政支出编辑
	$(document).on("click", ".process_five .trip tr .edit", function() {
		$("#boxPock").show();
		$("#boxPock .edit").show();
		flag = 32;
		addId = $(this).parents("tr").find("td").eq(0).text();
		content = $(this).parents("tr").find("td").eq(1).text();
		console.log(addId, content);
		$("#boxPock .edit .edit_bottom input").val(content);
		addThis = $(this);
	})
	//行政支出删除
	$(document).on("click", ".process_five .trip tr .del", function() {
		flag = 33;
		addId = $(this).parents("tr").find("td").eq(0).text();
		delTxt = $(this).parents("tr").find("td").eq(1).text();
		addThis = $(this);
		$("#boxPock").show();
		$("#boxPock .del").show();
	})
	//后台增加
	$(document).on("click", ".process_six .process button", function() {
		$("#boxPock").show();
		$("#boxPock .edit").show();
		flag = 34;
	})
	//后台编辑
	$(document).on("click", ".process_six .process tr .edit", function() {
		$("#boxPock").show();
		$("#boxPock .edit").show();
		flag = 35;
		addId = $(this).parents("tr").find("td").eq(0).text();
		content = $(this).parents("tr").find("td").eq(1).text();
		console.log(addId, content);
		$("#boxPock .edit .edit_bottom input").val(content);
		addThis = $(this);
	})
	//后台删除
	$(document).on("click", ".process_six .process tr .del", function() {
		flag = 36;
		addId = $(this).parents("tr").find("td").eq(0).text();
		delTxt = $(this).parents("tr").find("td").eq(1).text();
		addThis = $(this);
		$("#boxPock").show();
		$("#boxPock .del").show();
	})
	
	//编辑增加接口
	$(document).on("click", ".edit_bottom .btn1", function() {
		var txt = $(this).siblings("input").val();
		//建筑类型增加
		if(flag == 1) {
			$.ajax({
				type: "post",
				url: "/Admin/Labels/index/",
				dataType: 'json',
				data: {
					type: 1,
					types: "add",
					id: 1,
					content: txt
				},
				success: function(data) {
					if(data.status == 1) {
						console.log(data.data);
						var msg = "";
						msg += '<tr>';
						msg += '<td>' + data.data + '</td>';
						msg += '<td>' + txt + '</td>';
						msg += '<td>';
						msg += '<div class="tableFirstRows">';
						msg += '<div data-num="1" class="edit">';
						msg += '<a>编辑</a>';
						msg += '</div>';
						msg += '<div data-num="2" class="del">';
						msg += '<a href="###">删除</a>';
						msg += '</div>';
						msg += '</div>';
						msg += '</td>';
						msg += '</tr>';
						$(".process_two .process table").append(msg);
						$(".process_two .process table tbody tr:even").addClass("tableTrBackground");
						$("#boxPock .edit").find("input").val("");
						$("#boxPock").hide();
						$("#boxPock .edit").hide();
					}
				},
				error: function(data) {},
				async: true
			});
		}
		//建筑类型编辑
		if(flag == 2) {
			$.ajax({
				type: "post",
				url: "/Admin/Labels/index/",
				dataType: 'json',
				data: {
					type: 1,
					types: "save",
					id: addId,
					content: txt
				},
				success: function(data) {
					if(data.status == 1) {
						console.log(data.data);
						addThis.parents("tr").find("td").eq(1).text(txt);
						$("#boxPock .edit").find("input").val("");
						$("#boxPock").hide();
						$("#boxPock .edit").hide();
					}
				},
				error: function(data) {},
				async: true
			});
		}
		//项目阶段类型增加
		if(flag == 4) {
			$.ajax({
				type: "post",
				url: "/Admin/Labels/index/",
				dataType: 'json',
				data: {
					type: 2,
					types: "add",
					id: 1,
					content: txt
				},
				success: function(data) {
					if(data.status == 1) {
						console.log(data.data);
						var msg = "";
						msg += '<tr>';
						msg += '<td>' + data.data + '</td>';
						msg += '<td>' + txt + '</td>';
						msg += '<td>';
						msg += '<div class="tableFirstRows">';
						msg += '<div data-num="1" class="edit">';
						msg += '<a>编辑</a>';
						msg += '</div>';
						msg += '<div data-num="2" class="del">';
						msg += '<a href="###">删除</a>';
						msg += '</div>';
						msg += '</div>';
						msg += '</td>';
						msg += '</tr>';
						$(".process_two .trip table").append(msg);
						$(".process_two .trip table tr:even").addClass("tableTrBackground");
						$("#boxPock .edit").find("input").val("");
						$("#boxPock").hide();
						$("#boxPock .edit").hide();
					}
				},
				error: function(data) {},
				async: true
			});
		}
		//项目阶段类型编辑
		if(flag == 5) {
			$.ajax({
				type: "post",
				url: "/Admin/Labels/index/",
				dataType: 'json',
				data: {
					type: 2,
					types: "save",
					id: addId,
					content: txt
				},
				success: function(data) {
					if(data.status == 1) {
						console.log(data.data);
						addThis.parents("tr").find("td").eq(1).text(txt);
						$("#boxPock .edit").find("input").val("");
						$("#boxPock").hide();
						$("#boxPock .edit").hide();
					}
				},
				error: function(data) {},
				async: true
			});
		}
		//工种类型增加
		if(flag == 7) {
			$.ajax({
				type: "post",
				url: "/Admin/Labels/index/",
				dataType: 'json',
				data: {
					type: 3,
					types: "add",
					id: 1,
					content: txt
				},
				success: function(data) {
					if(data.status == 1) {
						console.log(data.data);
						var msg = "";
						msg += '<tr>';
						msg += '<td>' + data.data + '</td>';
						msg += '<td>' + txt + '</td>';
						msg += '<td>';
						msg += '<div class="tableFirstRows">';
						msg += '<div data-num="1" class="edit">';
						msg += '<a>编辑</a>';
						msg += '</div>';
						msg += '<div data-num="2" class="del">';
						msg += '<a href="###">删除</a>';
						msg += '</div>';
						msg += '</div>';
						msg += '</td>';
						msg += '</tr>';
						$(".process_two .trip table").append(msg);
						$(".process_two .trip table tr:even").addClass("tableTrBackground");
						$("#boxPock .edit").find("input").val("");
						$("#boxPock").hide();
						$("#boxPock .edit").hide();
					}
				},
				error: function(data) {},
				async: true
			});
		}
		//工种类型删除
		if(flag == 8) {
			$.ajax({
				type: "post",
				url: "/Admin/Labels/index/",
				dataType: 'json',
				data: {
					type: 3,
					types: "save",
					id: addId,
					content: txt
				},
				success: function(data) {
					if(data.status == 1) {
						console.log(data.data);
						addThis.parents("tr").find("td").eq(1).text(txt);
						$("#boxPock .edit").find("input").val("");
						$("#boxPock").hide();
						$("#boxPock .edit").hide();
					}
				},
				error: function(data) {},
				async: true
			});
		}
		//过程纪要增加
		if(flag == 10) {
			$.ajax({
				type: "post",
				url: "/Admin/Labels/index/",
				dataType: 'json',
				data: {
					type: 4,
					types: "add",
					id: 1,
					content: txt
				},
				success: function(data) {
					if(data.status == 1) {
						console.log(data.data);
						var msg = "";
						msg += '<tr>';
						msg += '<td>' + data.data + '</td>';
						msg += '<td>' + txt + '</td>';
						msg += '<td>';
						msg += '<div class="tableFirstRows">';
						msg += '<div data-num="1" class="edit">';
						msg += '<a>编辑</a>';
						msg += '</div>';
						msg += '<div data-num="2" class="del">';
						msg += '<a href="###">删除</a>';
						msg += '</div>';
						msg += '</div>';
						msg += '</td>';
						msg += '</tr>';
						$(".process_one .process table").append(msg);
						$(".process_one .process table tr:even").addClass("tableTrBackground");
						$("#boxPock .edit").find("input").val("");
						$("#boxPock").hide();
						$("#boxPock .edit").hide();
					}
				},
				error: function(data) {},
				async: true
			});
		}
		//建筑类型编辑
		if(flag == 11) {
			$.ajax({
				type: "post",
				url: "/Admin/Labels/index/",
				dataType: 'json',
				data: {
					type: 4,
					types: "save",
					id: addId,
					content: txt
				},
				success: function(data) {
					if(data.status == 1) {
						console.log(data.data);
						addThis.parents("tr").find("td").eq(1).text(txt);
						$("#boxPock .edit").find("input").val("");
						$("#boxPock").hide();
						$("#boxPock .edit").hide();
					}
				},
				error: function(data) {},
				async: true
			});
		}
		//出图出差增加
		if(flag == 13) {
			$.ajax({
				type: "post",
				url: "/Admin/Labels/index/",
				dataType: 'json',
				data: {
					type: 5,
					types: "add",
					id: 1,
					content: txt
				},
				success: function(data) {
					if(data.status == 1) {
						console.log(data.data);
						var msg = "";
						msg += '<tr>';
						msg += '<td>' + data.data + '</td>';
						msg += '<td>' + txt + '</td>';
						msg += '<td>';
						msg += '<div class="tableFirstRows">';
						msg += '<div data-num="1" class="edit">';
						msg += '<a>编辑</a>';
						msg += '</div>';
						msg += '<div data-num="2" class="del">';
						msg += '<a href="###">删除</a>';
						msg += '</div>';
						msg += '</div>';
						msg += '</td>';
						msg += '</tr>';
						$(".process_one .trip table").append(msg);
						$(".process_one .trip table tr:even").addClass("tableTrBackground");
						$("#boxPock .edit").find("input").val("");
						$("#boxPock").hide();
						$("#boxPock .edit").hide();
					}
				},
				error: function(data) {},
				async: true
			});
		}
		//出图出差编辑
		if(flag == 14) {
			$.ajax({
				type: "post",
				url: "/Admin/Labels/index/",
				dataType: 'json',
				data: {
					type: 5,
					types: "save",
					id: addId,
					content: txt
				},
				success: function(data) {
					if(data.status == 1) {
						console.log(data.data);
						addThis.parents("tr").find("td").eq(1).text(txt);
						$("#boxPock .edit").find("input").val("");
						$("#boxPock").hide();
						$("#boxPock .edit").hide();
					}
				},
				error: function(data) {},
				async: true
			});
		}
		//出图出差增加
		if(flag == 16) {
			$.ajax({
				type: "post",
				url: "/Admin/Labels/index/",
				dataType: 'json',
				data: {
					type: 6,
					types: "add",
					id: 1,
					content: txt
				},
				success: function(data) {
					if(data.status == 1) {
						console.log(data.data);
						var msg = "";
						msg += '<tr>';
						msg += '<td>' + data.data + '</td>';
						msg += '<td>' + txt + '</td>';
						msg += '<td>';
						msg += '<div class="tableFirstRows">';
						msg += '<div data-num="1" class="edit">';
						msg += '<a>编辑</a>';
						msg += '</div>';
						msg += '<div data-num="2" class="del">';
						msg += '<a href="###">删除</a>';
						msg += '</div>';
						msg += '</div>';
						msg += '</td>';
						msg += '</tr>';
						$(".process_one .manage table").append(msg);
						$(".process_one .manage table tr:even").addClass("tableTrBackground");
						$("#boxPock .edit").find("input").val("");
						$("#boxPock").hide();
						$("#boxPock .edit").hide();
					}
				},
				error: function(data) {},
				async: true
			});
		}
		//发函管理编辑
		if(flag == 17) {
			$.ajax({
				type: "post",
				url: "/Admin/Labels/index/",
				dataType: 'json',
				data: {
					type: 6,
					types: "save",
					id: addId,
					content: txt
				},
				success: function(data) {
					if(data.status == 1) {
						console.log(data.data);
						addThis.parents("tr").find("td").eq(1).text(txt);
						$("#boxPock .edit").find("input").val("");
						$("#boxPock").hide();
						$("#boxPock .edit").hide();
					}
				},
				error: function(data) {},
				async: true
			});
		}
		//图纸归档增加
		if(flag == 19) {
			$.ajax({
				type: "post",
				url: "/Admin/Labels/index/",
				dataType: 'json',
				data: {
					type: 7,
					types: "add",
					id: 1,
					content: txt
				},
				success: function(data) {
					if(data.status == 1) {
						console.log(data.data);
						var msg = "";
						msg += '<tr>';
						msg += '<td>' + data.data + '</td>';
						msg += '<td>' + txt + '</td>';
						msg += '<td>';
						msg += '<div class="tableFirstRows">';
						msg += '<div data-num="1" class="edit">';
						msg += '<a>编辑</a>';
						msg += '</div>';
						msg += '<div data-num="2" class="del">';
						msg += '<a href="###">删除</a>';
						msg += '</div>';
						msg += '</div>';
						msg += '</td>';
						msg += '</tr>';
						$(".process_one .pictrue table").append(msg);
						$(".process_one .pictrue table tr:even").addClass("tableTrBackground");
						$("#boxPock .edit").find("input").val("");
						$("#boxPock").hide();
						$("#boxPock .edit").hide();
					}
				},
				error: function(data) {},
				async: true
			});
		}
		//发函管理编辑
		if(flag == 20) {
			$.ajax({
				type: "post",
				url: "/Admin/Labels/index/",
				dataType: 'json',
				data: {
					type: 7,
					types: "save",
					id: addId,
					content: txt
				},
				success: function(data) {
					if(data.status == 1) {
						console.log(data.data);
						addThis.parents("tr").find("td").eq(1).text(txt);
						$("#boxPock .edit").find("input").val("");
						$("#boxPock").hide();
						$("#boxPock .edit").hide();
					}
				},
				error: function(data) {},
				async: true
			});
		}
		//任务增加
		if(flag == 22) {
			$.ajax({
				type: "post",
				url: "/Admin/Labels/index/",
				dataType: 'json',
				data: {
					type: 8,
					types: "add",
					id: 1,
					content: txt
				},
				success: function(data) {
					if(data.status == 1) {
						console.log(data.data);
						var msg = "";
						msg += '<tr>';
						msg += '<td>' + data.data + '</td>';
						msg += '<td>' + txt + '</td>';
						msg += '<td>';
						msg += '<div class="tableFirstRows">';
						msg += '<div data-num="1" class="edit">';
						msg += '<a>编辑</a>';
						msg += '</div>';
						msg += '<div data-num="2" class="del">';
						msg += '<a href="###">删除</a>';
						msg += '</div>';
						msg += '</div>';
						msg += '</td>';
						msg += '</tr>';
						$(".process_three .process table").append(msg);
						$(".process_three .process table tr:even").addClass("tableTrBackground");
						$("#boxPock .edit").find("input").val("");
						$("#boxPock").hide();
						$("#boxPock .edit").hide();
					}
				},
				error: function(data) {},
				async: true
			});
		}
		//任务编辑
		if(flag == 23) {
			$.ajax({
				type: "post",
				url: "/Admin/Labels/index/",
				dataType: 'json',
				data: {
					type: 8,
					types: "save",
					id: addId,
					content: txt
				},
				success: function(data) {
					if(data.status == 1) {
						console.log(data.data);
						addThis.parents("tr").find("td").eq(1).text(txt);
						$("#boxPock .edit").find("input").val("");
						$("#boxPock").hide();
						$("#boxPock .edit").hide();
					}
				},
				error: function(data) {},
				async: true
			});
		}
		//通知增加
		if(flag == 25) {
			$.ajax({
				type: "post",
				url: "/Admin/Labels/index/",
				dataType: 'json',
				data: {
					type: 9,
					types: "add",
					id: 1,
					content: txt
				},
				success: function(data) {
					if(data.status == 1) {
						console.log(data.data);
						var msg = "";
						msg += '<tr>';
						msg += '<td>' + data.data + '</td>';
						msg += '<td>' + txt + '</td>';
						msg += '<td>';
						msg += '<div class="tableFirstRows">';
						msg += '<div data-num="1" class="edit">';
						msg += '<a>编辑</a>';
						msg += '</div>';
						msg += '<div data-num="2" class="del">';
						msg += '<a href="###">删除</a>';
						msg += '</div>';
						msg += '</div>';
						msg += '</td>';
						msg += '</tr>';
						$(".process_four .process table").append(msg);
						$(".process_four .process table tr:even").addClass("tableTrBackground");
						$("#boxPock .edit").find("input").val("");
						$("#boxPock").hide();
						$("#boxPock .edit").hide();
					}
				},
				error: function(data) {},
				async: true
			});
		}
		//通知编辑
		if(flag == 26) {
			$.ajax({
				type: "post",
				url: "/Admin/Labels/index/",
				dataType: 'json',
				data: {
					type: 9,
					types: "save",
					id: addId,
					content: txt
				},
				success: function(data) {
					if(data.status == 1) {
						console.log(data.data);
						addThis.parents("tr").find("td").eq(1).text(txt);
						$("#boxPock .edit").find("input").val("");
						$("#boxPock").hide();
						$("#boxPock .edit").hide();
					}
				},
				error: function(data) {},
				async: true
			});
		}
		//通知增加
		if(flag == 28) {
			$.ajax({
				type: "post",
				url: "/Admin/Labels/index/",
				dataType: 'json',
				data: {
					type: 10,
					types: "add",
					id: 1,
					content: txt
				},
				success: function(data) {
					if(data.status == 1) {
						console.log(data.data);
						var msg = "";
						msg += '<tr>';
						msg += '<td>' + data.data + '</td>';
						msg += '<td>' + txt + '</td>';
						msg += '<td>';
						msg += '<div class="tableFirstRows">';
						msg += '<div data-num="1" class="edit">';
						msg += '<a>编辑</a>';
						msg += '</div>';
						msg += '<div data-num="2" class="del">';
						msg += '<a href="###">删除</a>';
						msg += '</div>';
						msg += '</div>';
						msg += '</td>';
						msg += '</tr>';
						$(".process_five .process table").append(msg);
						$(".process_five .process table tr:even").addClass("tableTrBackground");
						$("#boxPock .edit").find("input").val("");
						$("#boxPock").hide();
						$("#boxPock .edit").hide();
					}
				},
				error: function(data) {},
				async: true
			});
		}
		//项目支出编辑
		if(flag == 29) {
			$.ajax({
				type: "post",
				url: "/Admin/Labels/index/",
				dataType: 'json',
				data: {
					type: 10,
					types: "save",
					id: addId,
					content: txt
				},
				success: function(data) {
					if(data.status == 1) {
						console.log(data.data);
						addThis.parents("tr").find("td").eq(1).text(txt);
						$("#boxPock .edit").find("input").val("");
						$("#boxPock").hide();
						$("#boxPock .edit").hide();
					}
				},
				error: function(data) {},
				async: true
			});
		}
		//行政支出增加
		if(flag == 31) {
			$.ajax({
				type: "post",
				url: "/Admin/Labels/index/",
				dataType: 'json',
				data: {
					type: 11,
					types: "add",
					id: 1,
					content: txt
				},
				success: function(data) {
					if(data.status == 1) {
						console.log(data.data);
						var msg = "";
						msg += '<tr>';
						msg += '<td>' + data.data + '</td>';
						msg += '<td>' + txt + '</td>';
						msg += '<td>';
						msg += '<div class="tableFirstRows">';
						msg += '<div data-num="1" class="edit">';
						msg += '<a>编辑</a>';
						msg += '</div>';
						msg += '<div data-num="2" class="del">';
						msg += '<a href="###">删除</a>';
						msg += '</div>';
						msg += '</div>';
						msg += '</td>';
						msg += '</tr>';
						$(".process_five .trip table").append(msg);
						$(".process_five .trip table tr:even").addClass("tableTrBackground");
						$("#boxPock .edit").find("input").val("");
						$("#boxPock").hide();
						$("#boxPock .edit").hide();
					}
				},
				error: function(data) {},
				async: true
			});
		}
		//行政支出编辑
		if(flag == 32) {
			$.ajax({
				type: "post",
				url: "/Admin/Labels/index/",
				dataType: 'json',
				data: {
					type: 11,
					types: "save",
					id: addId,
					content: txt
				},
				success: function(data) {
					if(data.status == 1) {
						console.log(data.data);
						addThis.parents("tr").find("td").eq(1).text(txt);
						$("#boxPock .edit").find("input").val("");
						$("#boxPock").hide();
						$("#boxPock .edit").hide();
					}
				},
				error: function(data) {},
				async: true
			});
		}
		//后台增加
		if(flag == 34) {
			$.ajax({
				type: "post",
				url: "/Admin/Labels/index/",
				dataType: 'json',
				data: {
					type: 12,
					types: "add",
					id: 1,
					content: txt
				},
				success: function(data) {
					if(data.status == 1) {
						console.log(data.data);
						var msg = "";
						msg += '<tr>';
						msg += '<td>' + data.data + '</td>';
						msg += '<td>' + txt + '</td>';
						msg += '<td>';
						msg += '<div class="tableFirstRows">';
						msg += '<div data-num="1" class="edit">';
						msg += '<a>编辑</a>';
						msg += '</div>';
						msg += '<div data-num="2" class="del">';
						msg += '<a href="###">删除</a>';
						msg += '</div>';
						msg += '</div>';
						msg += '</td>';
						msg += '</tr>';
						$(".process_six .process table").append(msg);
						$(".process_six .process table tr:even").addClass("tableTrBackground");
						$("#boxPock .edit").find("input").val("");
						$("#boxPock").hide();
						$("#boxPock .edit").hide();
					}
				},
				error: function(data) {},
				async: true
			});
		}
		//后台编辑
		if(flag == 35) {
			$.ajax({
				type: "post",
				url: "/Admin/Labels/index/",
				dataType: 'json',
				data: {
					type: 12,
					types: "save",
					id: addId,
					content: txt
				},
				success: function(data) {
					if(data.status == 1) {
						console.log(data.data);
						addThis.parents("tr").find("td").eq(1).text(txt);
						$("#boxPock .edit").find("input").val("");
						$("#boxPock").hide();
						$("#boxPock .edit").hide();
					}
				},
				error: function(data) {},
				async: true
			});
		}
	})

	//删除数据隐藏
	$(document).on("click", "#boxPock .del_head i,.del_bottom .btn2", function() {
		$("#boxPock").hide();
		$("#boxPock .del").hide();
	})
	//删除数据隐藏
	$(document).on("click", ".edit .edit_head i", function() {
		$("#boxPock").hide();
		$("#boxPock .edit").hide();
	})
	$(document).on("click", ".del_bottom .btn1", function() {
		//项目类型删除
		if(flag == 3) {
			$.ajax({
				type: "post",
				url: "/Admin/Labels/index/",
				dataType: 'json',
				data: {
					type: 1,
					types: "dele",
					id: addId,
					content: delTxt
				},
				success: function(data) {
					if(data.status == 1) {
						addThis.parents("tr").remove();
						$("#boxPock").hide();
						$("#boxPock .del").hide();
						$(".process_two .process table tr").removeClass("tableTrBackground");
						$(".process_two .process table tr:even").addClass("tableTrBackground");
					}
				},
				error: function(data) {},
				async: true
			});
		}
		//项目阶段删除
		if(flag == 6) {
			$.ajax({
				type: "post",
				url: "/Admin/Labels/index/",
				dataType: 'json',
				data: {
					type: 2,
					types: "dele",
					id: addId,
					content: delTxt
				},
				success: function(data) {
					if(data.status == 1) {
						addThis.parents("tr").remove();
						$("#boxPock").hide();
						$("#boxPock .del").hide();
						$(".process_two .trip table tr").removeClass("tableTrBackground");
						$(".process_two .trip table tr:even").addClass("tableTrBackground");
					}
				},
				error: function(data) {},
				async: true
			});
		}
		//工种类型删除
		if(flag == 9) {
			$.ajax({
				type: "post",
				url: "/Admin/Labels/index/",
				dataType: 'json',
				data: {
					type: 3,
					types: "dele",
					id: addId,
					content: delTxt
				},
				success: function(data) {
					if(data.status == 1) {
						addThis.parents("tr").remove();
						$("#boxPock").hide();
						$("#boxPock .del").hide();
						$(".process_two .trip table tr").removeClass("tableTrBackground");
						$(".process_two .trip table tr:even").addClass("tableTrBackground");
					}
				},
				error: function(data) {},
				async: true
			});
		}
		//过程纪要删除
		if(flag == 12) {
			$.ajax({
				type: "post",
				url: "/Admin/Labels/index/",
				dataType: 'json',
				data: {
					type: 4,
					types: "dele",
					id: addId,
					content: delTxt
				},
				success: function(data) {
					if(data.status == 1) {
						addThis.parents("tr").remove();
						$("#boxPock").hide();
						$("#boxPock .del").hide();
						$(".process_one .process tr").removeClass("tableTrBackground");
						$(".process_one .process tr:even").addClass("tableTrBackground");
					}
				},
				error: function(data) {},
				async: true
			});
		}
		//出图出差删除
		if(flag == 15) {
			$.ajax({
				type: "post",
				url: "/Admin/Labels/index/",
				dataType: 'json',
				data: {
					type: 5,
					types: "dele",
					id: addId,
					content: delTxt
				},
				success: function(data) {
					if(data.status == 1) {
						addThis.parents("tr").remove();
						$("#boxPock").hide();
						$("#boxPock .del").hide();
						$(".process_one .trip tr").removeClass("tableTrBackground");
						$(".process_one .trip tr:even").addClass("tableTrBackground");
					}
				},
				error: function(data) {},
				async: true
			});
		}
		//发函管理删除
		if(flag == 18) {
			$.ajax({
				type: "post",
				url: "/Admin/Labels/index/",
				dataType: 'json',
				data: {
					type: 6,
					types: "dele",
					id: addId,
					content: delTxt
				},
				success: function(data) {
					if(data.status == 1) {
						addThis.parents("tr").remove();
						$("#boxPock").hide();
						$("#boxPock .del").hide();
						$(".process_one .manage tr").removeClass("tableTrBackground");
						$(".process_one .manage tr:even").addClass("tableTrBackground");
					}
				},
				error: function(data) {},
				async: true
			});
		}
		//图纸归档删除
		if(flag == 21) {
			$.ajax({
				type: "post",
				url: "/Admin/Labels/index/",
				dataType: 'json',
				data: {
					type: 7,
					types: "dele",
					id: addId,
					content: delTxt
				},
				success: function(data) {
					if(data.status == 1) {
						addThis.parents("tr").remove();
						$("#boxPock").hide();
						$("#boxPock .del").hide();
						$(".process_one .pictrue tr").removeClass("tableTrBackground");
						$(".process_one .pictrue tr:even").addClass("tableTrBackground");
					}
				},
				error: function(data) {},
				async: true
			});
		}
		//任务删除
		if(flag == 24) {
			$.ajax({
				type: "post",
				url: "/Admin/Labels/index/",
				dataType: 'json',
				data: {
					type: 8,
					types: "dele",
					id: addId,
					content: delTxt
				},
				success: function(data) {
					if(data.status == 1) {
						addThis.parents("tr").remove();
						$("#boxPock").hide();
						$("#boxPock .del").hide();
						$(".process_three .process tr").removeClass("tableTrBackground");
						$(".process_three .process tr:even").addClass("tableTrBackground");
					}
				},
				error: function(data) {},
				async: true
			});
		}
		//通知删除
		if(flag == 27) {
			$.ajax({
				type: "post",
				url: "/Admin/Labels/index/",
				dataType: 'json',
				data: {
					type: 9,
					types: "dele",
					id: addId,
					content: delTxt
				},
				success: function(data) {
					if(data.status == 1) {
						addThis.parents("tr").remove();
						$("#boxPock").hide();
						$("#boxPock .del").hide();
						$(".process_four .process tr").removeClass("tableTrBackground");
						$(".process_four .process tr:even").addClass("tableTrBackground");
					}
				},
				error: function(data) {},
				async: true
			});
		}
		//项目支出删除
		if(flag == 30) {
			$.ajax({
				type: "post",
				url: "/Admin/Labels/index/",
				dataType: 'json',
				data: {
					type: 10,
					types: "dele",
					id: addId,
					content: delTxt
				},
				success: function(data) {
					if(data.status == 1) {
						addThis.parents("tr").remove();
						$("#boxPock").hide();
						$("#boxPock .del").hide();
						$(".process_five .process tr").removeClass("tableTrBackground");
						$(".process_five .process tr:even").addClass("tableTrBackground");
					}
				},
				error: function(data) {},
				async: true
			});
		}
		//行政支出删除
		if(flag == 33) {
			$.ajax({
				type: "post",
				url: "/Admin/Labels/index/",
				dataType: 'json',
				data: {
					type: 11,
					types: "dele",
					id: addId,
					content: delTxt
				},
				success: function(data) {
					if(data.status == 1) {
						addThis.parents("tr").remove();
						$("#boxPock").hide();
						$("#boxPock .del").hide();
						$(".process_five .trip tr").removeClass("tableTrBackground");
						$(".process_five .trip tr:even").addClass("tableTrBackground");
					}
				},
				error: function(data) {},
				async: true
			});
		}
		//后台删除
		if(flag == 36) {
			$.ajax({
				type: "post",
				url: "/Admin/Labels/index/",
				dataType: 'json',
				data: {
					type: 12,
					types: "dele",
					id: addId,
					content: delTxt
				},
				success: function(data) {
					if(data.status == 1) {
						addThis.parents("tr").remove();
						$("#boxPock").hide();
						$("#boxPock .del").hide();
						$(".process_six .process tr").removeClass("tableTrBackground");
						$(".process_six .process tr:even").addClass("tableTrBackground");
					}
				},
				error: function(data) {},
				async: true
			});
		}
	})
})