$(function() {
	//	$(".backstageListOne .title").on("click", function() {
	//		$(".backstageListTwo .title").removeClass("active");
	//		$(this).addClass("active");
	//	})
	//	$(".backstageListTwo .title").on("click", function() {
	//		$(".backstageListOne .title").removeClass("active");
	//		$(this).addClass("active");
	//	})	
	var is_super = sessionStorage.getItem("is_super");
	console.log(is_super)
	if(is_super != 1) {
		location.href = "index.html"
	}
})