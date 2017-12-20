$(function() {
	//绩效记录弹窗打开
	$(document).on("click", ".perf .task_detail tbody .handle", function() {
		$("#boxPock").show();
		$(".perf_detail").show();
	})
	//绩效记录弹窗关闭
	$(document).on("click", ".perf_detail .pref_head i,.perf_detail .btn1", function() {
		$("#boxPock").hide();
		$(".perf_detail").hide();
	})

	//修改密码
	$(document).on("click", ".personal_msg .person_msg .set", function() {
		$("#boxPock").show();
		$(".change_psw").show();
	})
	//修改密码弹窗关闭
	$(document).on("click", ".change_psw .psw_header i,.change_psw .btn1", function() {
		$("#boxPock").hide();
		$(".change_psw").hide();
	})

	//编辑个人信息弹窗打开
	$(document).on("click", ".personal_msg .msg .msg_header .edit1", function() {
		$("#boxPock").show();
		$(".edit").show();
	})
	//编辑个人信息弹窗关闭
	$(document).on("click", ".edit .edit_head i,.edit .btn1", function() {
		$("#boxPock").hide();
		$(".edit").hide();
	})
	//tab栏切换
	$(document).on("click", ".recycle_ul li", function() {
		$(this).addClass("active").siblings().removeClass("active");
		//		var index = $(this).index();
		//		$(".recycle .recycle_detail").hide();
		//		$(".recycle .recycle_detail").eq(index).show();
	})
	//select选中
	$("select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	})

	//数据接入========
	ajax(2, 5, 1)
	$(document).on("click", ".recycle_ul li", function() {
		var index = $(this).index() + 1;
		ajax(index, 5, 1);
	})
	//右边点击获取
	$(".recycle .task_detail .paging .page_right .more").on("click", function() {
		var moreNum = $(".recycle .task_detail .paging .page_right .total_num").text();
		var lessNum = $(".recycle .task_detail .paging .page_right .number").text();
		var index = $(".recycle_ul li.active").index() + 1;
		if(moreNum <= lessNum) {
			toast("已经是最后一页了");
		} else {
			lessNum++;
			$(".recycle .task_detail .paging .page_right .number").text(lessNum);
			var size = $(".recycle .task_detail .pagenum input").val();
			console.log(size, lessNum, index);
			ajax(index, size, lessNum);
		}
	})
	//左边点击获取
	$(".recycle .task_detail .paging .page_right .less").on("click", function() {
		var moreNum = $(".recycle .task_detail .paging .page_right .total_num").text();
		var lessNum = $(".recycle .task_detail .paging .page_right .number").text();
		var index = $(".recycle_ul li.active").index() + 1;
		if(lessNum == 1) {
			toast("已经是第一页了");
		} else {
			lessNum++;
			$(".recycle .task_detail .paging .page_right .number").text(lessNum);
			var size = $(".recycle .task_detail .pagenum input").val();
			ajax(index, size, lessNum);
		}
	})
	//页数点击时获取
	$(".recycle .task_detail .pagenum select").on("change", function() {
		var size = $(this).siblings("input").val();
		var index = $(".recycle_ul li.active").index() + 1;
		ajax(index, size, 1);
	})

	function ajax(type, size, p) {
		$.ajax({
			type: "get",
			url: "/Home/user/recycled/type/2",
			dataType: 'json',
			data: {
				type: type,
				len: size,
				p: p,
			},
			success: function(data) {
				console.log(data)
				var datas = data.data;
				$(".recycle .task_detail table tbody tr").remove();
				var tbody1, tbody2, tbody3 = "";
				//进行中
				function tbodyOne(datas) {
					$(".task_detail:nth(0)  .paging .page_left span").text(data.count);
					$(".task_detail  .paging .page_right .total_num").text(data.page);
					for(var i = 0; i < datas.length; i++) {
						tbody1 += '<tr><td>' + datas[i].id + '</td><td>' + datas[i].create_time + '</td><td>' + datas[i].fenlen + '</td><td>' + datas[i].type + '</td><td>' + datas[i].title + '</td><td>' + datas[i].del_time + '</td><td class="handle"><span class="detail" data_id="' + datas[i].id + '">详情</span><span class="recover" data_id="' + datas[i].id + '">恢复</span></td></tr>';
					}
					return tbody1;
				}
				tbodyOne(datas);
				$(".recycle .task_detail table tbody").append(tbody1);
				$(".recycle .task_detail table tbody tr:odd").addClass("e9ecf1");
			},
			error: function(data) {},
			async: true
		});
	}

	//绩效详情
	//人才绩效==========
	//项目计提================
	perfAjax(5, 1);
	//右边点击获取

	function perfAjax(size, p, time) {
		$.ajax({
			type: "get",
			url: "/Home/User/performance",
			dataType: 'json',
			data: {
				size: size,
				p: p,
				intverl: time,
			},
			success: function(data) {
				console.log(data)
				$(".perf tbody tr").remove();
				var datas = data;
				var tbody1 = "";
				//进行中
				function tbodyOne(datas) {
					$(".perf .paging .page_left span").text(data.count);
					$(".perf .paging .page_right .total_num").text(data.page);
					for(var i = 0; i < datas.length; i++) {
						tbody1 += '<tr>';
						tbody1 += '<td>' + datas[i].id + '</td>';
						tbody1 += '<td>' + datas[i].create_time + '</td>';
						tbody1 += '<td>' + datas[i].name + '</td>';
						tbody1 += '<td>' + datas[i].type_charge + '</td>';
						tbody1 += '<td>' + datas[i].content + '</td>';
						tbody1 += '<td>' + datas[i].profit + '</td>';
						tbody1 += '<td class="handle"><span class="check" data-id="' + datas[i].id + '">详情</span></td>';
						tbody1 += '</tr>';
					}
					return tbody1;
				}
				tbodyOne(datas);
				$(".perf tbody").append(tbody1);
				$(".perf tbody tr:odd").addClass("e9ecf1");
			},
			error: function(data) {},
			async: true
		});
	}

})