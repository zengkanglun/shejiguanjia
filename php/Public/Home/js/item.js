$(function() {
	//项目信息编辑
	// $(".basic_msg .msg_head").on("click",function(){
	// 	$("#boxPock").show();
	// 	$(".item_msg").show();
	// })
	$(document).on("click", ".item_msg .basic .btn1", function() {
		$(".item_msg .basic").hide();
		$(".item_msg .unit").show();
		$(".item_msg .msg_detail li").eq(1).addClass("active").siblings().removeClass("active")
	})
	$(document).on("click", ".item_msg .unit .btn1", function() {
		$(".item_msg .unit").hide();
		$(".item_msg .project").show();
		$(".item_msg .msg_detail li").eq(2).addClass("active").siblings().removeClass("active")
	})
	$(document).on("click", ".item_msg .project .btn1", function() {
		$("#boxPock").hide();
		$(".item_msg").hide();
	})
	$(document).on("click", ".item_msg .msg_head i", function() {
		$("#boxPock").hide();
		$(".item_msg").hide();
	})

	//项目组通讯录
	$(document).on("click", ".adr_list", function() {
		$("#boxPock").show();
		$(".address_book").show();
	})
	$(document).on("click", ".address_book_head i", function() {
		$("#boxPock").hide();
		$(".address_book").hide();
	})
	$(document).on("click", ".address_book .btn1", function() {
		$("#boxPock").hide();
		$(".address_book").hide();
	})
	//选择几号楼
	$(document).on("change", ".project_data .list select", function() {
		var txt = $(this).find("option:checked").text();
		$(".project_data .list input").val(txt);
	})
	//编辑内容
	$(".msg_bottom td select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	})

	//项目组信息记录
	itemAjax();

	function itemAjax() {
		$.ajax({
			type: "get",
			url: "/Home/index/getProjectInfo",
			dataType: 'json',
			data: {},
			success: function(data) {
				console.log(data.leaders[0].type);
				var datas = data.leaders;
				$(".project_data table tbody tr").remove();
				var tbody1 = "";
				//进行中
				function tbodyOne(datas) {
					for(var i = 0; i < datas.length; i++) {
						tbody1 += '<tr><td class="item">' + datas[i].type + "负责：" + '</td><td class="item_num">' + datas[i].name + '</td></tr>';
					}
					return tbody1;
				}
				tbodyOne(datas);
				var manage = '<tr><td class="item">' + data.manger.type + '</td><td class="item_num">' + data.manger.name + '</td></tr>';
				$(".project_data table").append(manage);
				$(".project_data table").append(tbody1);
				var length = $(".project_data table tbody tr").length;
				console.log(length);
				//判断奇偶看情况需要是否添加
			},
			error: function(data) {},
			async: true
		});
	}

	//项目组选择
	$("select").on("change", function() {
		var num = $(this).val();
		$.ajax({
			type: "get",
			url: "/Home/index/getProjectEdit",
			dataType: 'json',
			data: {
				id: num
			},
			success: function(data) {
				console.log(data, data.leaders.length);
				var datas = data.leaders;
				$(".project_data table tbody tr").remove();
				var tbody1 = "";
				//进行中
				tbody1 += '<tr>';
				tbody1 += '<td class="item">项目主管：</td>';
				tbody1 += '<td class="item_num">' + data.manger.name + '</td>';
				tbody1 += '</tr>';
				for(var i = 0; i < data.leaders.length; i++) {
					tbody1 += '<tr>';
					tbody1 += '<td class="item">' + data.leaders[i].type + '负责</td>';
					tbody1 += '<td class="item_num">' + data.leaders[i].name + '</td>';
					tbody1 += '</tr>';
				}
				$(".project_data table").append(tbody1);
				//判断奇偶看情况需要是否添加
			},
			error: function(data) {},
			async: true
		});
	})
})