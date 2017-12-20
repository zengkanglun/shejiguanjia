$(function(){
	//select选中
	$("select").on("change",function(){
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	})
	/*序号选择*/
	$(document).on("click","tbody tr td:nth-child(1)",function(){
		$(this).find("img").toggle()
	})
})
