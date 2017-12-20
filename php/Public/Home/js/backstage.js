$(function() {
	$(".backstagePager .two span").on("click", function() {
		$(this).find("select").change();
	});
	////select选中
	$("select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	})
});