$(function(){
	//tab栏切换
	$(".detail_tab li").on("click",function(){
		$(this).addClass("active").siblings().removeClass("active");
		var index = $(this).index();
		$(".content_detail .item_one").hide();
		$(".content_detail .item_one").eq(index).show();
	})
	//项目收款
	$(".collect_detail .handle .check").on("click",function(){
		$("#boxPock").show();
		$(".item_check").show();
	})
	$(".item_check_head i,.item_check .item_footer .btn2").on("click",function(){
		$("#boxPock").hide();
		$(".item_check").hide();
	})
	//项目编辑
	$(".collect_detail .handle .edit").on("click",function(){
		$("#boxPock").show();
		$(".item_pay").show();
	})
	$(".item_pay_head i,.item_pay .item_footer .btn2").on("click",function(){
		$("#boxPock").hide();
		$(".item_check").hide();
	})
	//项目支出详情
	$(".expend_detail td .check").on("click",function(){
		$("#boxPock").show();
		$(".item_expend").show();
	})
	$(".item_expend_head i,.new_record .btn1").on("click",function(){
		$("#boxPock").hide();
		$(".item_expend").hide();
	})
	//项目计提
	$(".count_ul li").on("click",function(){
		$(this).addClass("active").siblings().removeClass("active");
		var index = $(this).index();
		$(".count_detail table").hide();
		$(".count_detail table").eq(index).show();
	})
	$(".count_detail tbody td .check").on("click",function(){
		$("#boxPock").show();
		$("#boxPock .count_edit").show();
	})
	$("#boxPock .count_edit .count_edit_head i,#boxPock .count_edit .btn2").on("click",function(){
		$("#boxPock").hide();
		$("#boxPock .count_edit").hide();
	})
})
