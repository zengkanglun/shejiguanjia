var windowWidthR,resizeWidth;
$(function () {
	if ($(window).width() <= 1360) {
		windowWidthR = 1360;
	} else{
		windowWidthR = $(window).width();
	};
	resizeWidth = windowWidthR - $("#bodyLeft").width();
	$("#bodyLeft .bodyLeftFu .bodyLeftBox").height($(window).height() - $("#bodyLeft .logoDiv").height());
	$("#bodyRight #content").height($(window).height() - $("#bodyRight #header").outerHeight(true));
});
window.onresize = function () {
	if ($(window).width() <= 1360) {
		windowWidthR = 1360;
	} else{
		windowWidthR = $(window).width();
	};
	resizeWidth = windowWidthR - $("#bodyLeft").width();
//	$("#bodyRight").width(resizeWidth);
}

function toast(n) {
	$('.xxxxxxx').remove();
	var str = "<div style='opacity:0.9;z-index:999' class='msg_remind xxxxxxx'>" + n + "</div>";
	$("body").append(str);
//	$(".msg_remind").show();
	setTimeout(function() {
		$('.msg_remind').remove();
	}, 2000);

}

//锁屏
function lock() {
	var lock;
	lock += '<div class="lock">';
	lock += '<div class="lock_bg">';
	lock += '<div class="password">';
	lock += '<span>密码：</span>';
	lock += '<input type="请输入密码" />';
	lock += '</div>';
	lock += '<button>解锁</button>';
	lock += '</div>';
	lock += '</div>';
	$("body").append(lock);
}

var host_host_host = "http://192.168.4.66:89/";