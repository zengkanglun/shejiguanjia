$(function() {
	var authority = sessionStorage.getItem("authority");
	var is_super = sessionStorage.getItem("is_super");
	if(is_super == 1) {
		return false;
	} else {
		if(authority.indexOf(4) != -1) {
			$(".list_6").show();
		} else {
			location.href = "index.html";
		}
	}
})