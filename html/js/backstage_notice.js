$(function() {
	//tab切换
	$(".box .xs-3").eq(0).on("click", function() {
		$(this).addClass("HeaderRowsActive").siblings().removeClass("HeaderRowsActive");
		$(".box .has_send_msg").show();
		$(".box .has_send_task").hide();
	})
	$(".box .xs-3").eq(1).on("click", function() {
		$(this).addClass("HeaderRowsActive").siblings().removeClass("HeaderRowsActive");
		$(".box .has_send_msg").hide();
		$(".box .has_send_task").show();
	})
	//select选中
	$(document).on("change","select", function() {
	//$("select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	})
	//序号选中
	$(document).on("click",".third table .choose span", function() {
	//$(".third table .choose span").on("click",function(){
		$(this).toggleClass("active")
	})
	//已发通知
	$(document).on("click",".has_send_msg td .tableFirstRows .detail",function(){
	
	//$(".has_send_msg td .tableFirstRows .detail").on("click",function(){
		$("#boxPock").show();
		$("#boxPock .send_add").show();
	})
	
	$(".send_add .send_add_head i,.send_add .btn2").on("click",function(){
		$("#boxPock").hide();
		$("#boxPock .send_add").hide();
	})
	//新建任务
	$(document).on("click",".has_send_task td .tableFirstRows .detail",function(){
	
	//$(".has_send_task td .tableFirstRows .detail").on("click",function(){
		$("#boxPock").show();
		$("#boxPock .newbuild_detail").show();
	})
	$(".newbuild_detail .newbuild_detail_head i,.newbuild_detail .btn2").on("click",function(){
		$("#boxPock").hide();
		$("#boxPock .newbuild_detail").hide();
	})
})