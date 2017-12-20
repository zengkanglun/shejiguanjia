$(function(){
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
})
