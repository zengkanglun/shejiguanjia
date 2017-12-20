$(function() {
	//select选中
	$("select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt);
	})

	//数据调取===============
	logAjax(5, 1, 1)

	function logAjax(size, p, id) {
		$.ajax({
			type: "get",
			url: "/Admin/User/logs",
			dataType: 'json',
			data: {
				size: size,
				p: p,
				id: id,
			},
			success: function(data) {
				console.log(data, data.count)
				$(".log_third  tbody tr").remove();
				var datas = data.data;
				var tbody1 = "";
				//进行中
				function tbodyOne(dataone) {
					$(".log_third .paging .page_left span").text(data.count);
					$(".log_third .paging .page_right .total_num").text(data.page);
					$(".log_third table tfoot tr td:nth(3)").text(data.total);
					for(var i = 0; i < datas.length; i++) {
						tbody1 += '<tr>';
						tbody1 += ' <td><span><img src="/Public/Home/images/icon_checked.png" alt="" /></span></td>';
						tbody1 += '<td>' + datas[i].sid + '</td>';
						tbody1 += '<td>' + datas[i].login_name + '</td>';
						tbody1 += '<td>' + datas[i].name + '</td>';
						tbody1 += '<td>' + datas[i].content + '</td>';
						tbody1 += '<td>' + datas[i].client_ip + '</td>';
						tbody1 += '<td>' + datas[i].time + '</td>';
						tbody1 += '<td>';
						tbody1 += '<div class="tableFirstRows">';
						tbody1 += '<div data-num="1">';
						tbody1 += '<a href="###">查看</a>';
						tbody1 += '</div>';
						tbody1 += '</div>';
						tbody1 += ' </td>';
						tbody1 += '</tr>';
					}
					return tbody1;
				}
				tbodyOne(datas);
				$(".log_third table tbody").append(tbody1);
				$(".log_third table tbody tr:odd").addClass("e9ecf1");
			},
			error: function(data) {},
			async: true
		});
	}

	//tab栏切换
	$(document).on("click", ".box .tap div", function() {
		$(this).addClass("tapDivActive").siblings().removeClass("tapDivActive");
		var index = $(this).index() + 1;
		logAjax(5, 1, index);
	})
	//右边点击获取
	$(".log_third .paging .page_right .more").on("click", function() {
		var moreNum = $(".log_third .paging .page_right .total_num").text();
		var lessNum = $(".log_third .paging .page_right .number").text();
		console.log(moreNum, lessNum)
		if(moreNum <= lessNum) {
			toast("已经是最后一页了");
		} else {
			lessNum++;
			$(".staff_content .paging .page_right .number").text(lessNum);
			var size = $(".staff_content .pagenum input").val();
			var id = $(".box .tap div.tapDivActive").index() + 1;
			logAjax(size, lessNum, id);
		}
	})
	//左边点击获取
	$(".log_third  .paging .page_right .less").on("click", function() {
		var moreNum = $(".log_third .paging .page_right .total_num").text();
		var lessNum = $(".log_third .paging .page_right .number").text();
		if(lessNum == 1) {
			toast("已经是第一页了");
		} else {
			lessNum--;
			$(".log_third .paging .page_right .number").text(lessNum);
			var size = $(".staff_content .pagenum input").val();
			var id = $(".box .tap div.tapDivActive").index() + 1;
			logAjax(size, lessNum, id);
		}
	})
	//页数点击时获取
	$(".staff_content .list_detail select").on("change", function() {
		var size = $(this).siblings("input").val();
		var id = $(".box .tap div.tapDivActive").index() + 1;
		logAjax(size, lessNum, id);
	})
	//页面序号显示
	$(document).on("click",".log_third tbody tr td span",function(){
		$(this).find("img").toggle();
	})
})