$(function() {
	$(document).on("click", ".choose_file", function() {
		$("#boxPock").show();
		$(".recovery").show();
	})
	$(document).on("click", ".recovery .recovery_head i,.recovery .btn2", function() {
		$("#boxPock").hide();
		$(".recovery").hide();
	})
	//确认恢复
	$(document).on("click", ".recovery .data_backup li .recover", function() {
		$(".recovery").hide();
		$(".regain").show();
	})
	$(document).on("click", ".regain .regain_head i, .regain .btn1,.regain .btn2", function() {
		$(".recovery").show();
		$(".regain").hide();
	})
	//确认删除
	$(document).on("click", ".recovery .data_backup li .del", function() {
		$(".recovery").hide();
		$(".delete").show();
	})
	$(document).on("click", ".delete .del_head i, .delete .btn1,.delete .btn2", function() {
		$(".recovery").show();
		$(".delete").hide();
	})
})