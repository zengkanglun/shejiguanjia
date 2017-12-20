$(function() {
	$(".backstageListOne .title").on("click", function() {
		$(".backstageListTwo .title").removeClass("active");
		$(this).addClass("active");
		$(".backstageListOne .ul").slideToggle();
	})
	$(".backstageListTwo .title").on("click", function() {
		$(".backstageListOne .title").removeClass("active");
		$(this).addClass("active");
		$(".backstageListTwo .ul").slideToggle();
	})
//	$(".backstageListOne ul li").on("click",function(){
//		$(".backstageListTwo ul").css("display","none");
//		$(this).addClass("active").siblings().removeClass("active");
//		$(".backstageListOne .title").removeClass("active");
//		$(".backstageListTwo .title").removeClass("active");
//		$(".backstageListTwo ul li").removeClass("active");
//	})
//	$(".backstageListTwo ul li").on("click",function(){
//		$(".backstageListOne ul").css("display","none");
//		$(this).addClass("active").siblings().removeClass("active");
//		$(".backstageListOne .title").removeClass("active");
//		$(".backstageListTwo .title").removeClass("active");
//		$(".backstageListOne ul li").removeClass("active");
//		$(".backstageListOne .ul").hide();
//	})
	
})