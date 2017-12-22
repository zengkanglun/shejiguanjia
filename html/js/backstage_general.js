$(function() {
	//select选中
	$(document).on("change","select",function(){
	//$("select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	})
	//页面选择
	$(document).on("click","table .choose i",function(){
	//$("table .choose i").on("click", function() {
		$(this).toggleClass("active")
	})
	//编辑操作
	$(document).on("click",".third table .handle .edit",function(){
	//$(".third table .handle .edit").on("click", function() {
		$("#boxPock").show();
		$("#boxPock .bianjiUserFu").show();
	})
	$(document).on("click","#boxPock .bianjiUserFu button,#boxPock .bianjiUserFu .BJheader a",function(){
	//$("#boxPock .bianjiUserFu button,#boxPock .bianjiUserFu .BJheader a").on("click", function() {
		$("#boxPock").hide();
		$("#boxPock .bianjiUserFu").hide();
	})
	$(document).on("click","#boxPock .bianjiUserFu .Sbody a",function(){
	//$("#boxPock .bianjiUserFu .Sbody a").on("click", function() {
		//$(this).toggleClass("active")
//		console.log("7,后面是wly追加的")
		//wly追加的
		var _this = $(this);
		if (_this.attr("data-type") == "checked") {
			_this.attr("data-type","");
			_this.find(" img")[0].src = "img/backstage_checkbox_kong.png";
		} else{
			_this.attr("data-type","checked");
			_this.find(" img")[0].src = "img/backstage_checkbox_orange.png";
		};
	})
	//新增用户
	$(".box .left").on("click", function() {
		$("#boxPock").show();
		$("#boxPock .UserFuadd").show();
	})
	$("#boxPock .UserFuadd button,#boxPock .UserFuadd_head .BJheader a").on("click", function() {
		$("#boxPock").hide();
		$("#boxPock .UserFuadd").hide();
	})
	/*权限*/
	$("#boxPock .UserFuadd .Sbody a").on("click", function() {
		//$(this).toggleClass("active")
//		console.log("7,后面是wly追加的")
		//wly追加的
		var _this = $(this);
		if (_this.attr("data-type") == "checked") {
			_this.attr("data-type","");
			_this.find(" img")[0].src = "img/backstage_checkbox_kong.png";
		} else{
			_this.attr("data-type","checked");
			_this.find(" img")[0].src = "img/backstage_checkbox_orange.png";
		};
	})
	//详情
	$(document).on("click",".third table .handle .detail",function(){
	//$(".third table .handle .detail").on("click", function() {
		$("#boxPock").show();
		$("#boxPock .edit_user").show();
	})
	$(document).on("click","#boxPock .edit_user button,#boxPock .edit_user .BJheader a",function(){
	//$("#boxPock .edit_user button,#boxPock .edit_user .BJheader a").on("click", function() {
		$("#boxPock").hide();
		$("#boxPock .edit_user").hide();
	})

	//已删除用户操作
	$(document).on("click",".perf table .handle .edit",function(){
	//$(".perf table .handle .edit").on("click", function() {
		$("#boxPock").show();
		$("#boxPock .bianjiUserFu").show();
	})
	$("#boxPock .bianjiUserFu button,#boxPock .bianjiUserFu .BJheader a").on("click", function() {
		$("#boxPock").hide();
		$("#boxPock .bianjiUserFu").hide();
	})
	$("#boxPock .bianjiUserFu .Sbody a").on("click", function() {
		$(this).toggleClass("active")
	})
	//详情
	$(document).on("click",".perf table .handle .detail",function(){
	//$(".perf table .handle .detail").on("click", function() {
		$("#boxPock").show();
		$("#boxPock .edit_user").show();
	})
	$(document).on("click","#boxPock .edit_user button,#boxPock .edit_user .BJheader a",function(){
	//$("#boxPock .edit_user button,#boxPock .edit_user .BJheader a").on("click", function() {
		$("#boxPock").hide();
		$("#boxPock .edit_user").hide();
	})
})