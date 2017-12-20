$(function() {
	$(".detail_tab li").on("click", function() {
		$(this).addClass("active").siblings().removeClass("active");
		var index = $(this).index();
		$(".content_detail .pro_tab").hide();
		$(".content_detail .pro_tab").eq(index).show();
	})
	//过程纪要增加的操作
	$(".process_detail .detail_head").on("click", function() {
		$("#boxPock").show();
		$(".process_add").show();
	})
	$(".process_add_head i").on("click", function() {
		$("#boxPock").hide();
		$(".process_add").hide();
	})
	$(".process_add_bottom .btn1").on("click", function() {
		$("#boxPock").hide();
		$(".process_add").hide();
	})
	$(".process_add_bottom .btn2").on("click", function() {
		$("#boxPock").hide();
		$(".process_add").hide();
	})
	$(".process_add_bottom .header_left select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	})
	//过程纪要查看的操作
	$(".process_detail td .check").on("click", function() {
		$("#boxPock").show();
		$(".process_check").show();
	})
	$(".process_check_head i").on("click", function() {
		$("#boxPock").hide();
		$(".process_check").hide();
	})
	$(".process_check_bottom .btn2").on("click", function() {
		$("#boxPock").hide();
		$(".process_check").hide();
	})
	//过程纪要编辑的操作
	$(".process_detail td .edit").on("click", function() {
		$("#boxPock").show();
		$(".process_edit").show();
	})
	$(".process_edit_head i").on("click", function() {
		$("#boxPock").hide();
		$(".process_edit").hide();
	})
	$(".process_edit_bottom .btn1").on("click", function() {
		$("#boxPock").hide();
		$(".process_edit").hide();
	})
	$(".process_edit_bottom .btn2").on("click", function() {
		$("#boxPock").hide();
		$(".process_edit").hide();
	})
	$(".process_edit_bottom .header_left select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	})	
	//出图出差增加的操作
	$(".travel_detail .travel_head").on("click", function() {
		$("#boxPock").show();
		$(".travel_add").show();
	})
	$(".travel_add_head i,.travel_add_bottom .btn2").on("click", function() {
		$("#boxPock").hide();
		$(".travel_add").hide();
	})
	$(".travel_add_bottom .btn1").on("click", function() {
		$("#boxPock").hide();
		$(".travel_add").hide();
	})
	$(".travel_add_bottom .header_left select,.travel_add_bottom .header_right select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	})
	//出图出差查看的操作
	$(".travel_detail td .check").on("click", function() {
		$("#boxPock").show();
		$(".travel_check").show();
	})
	$(".travel_check_head i,.travel_check_bottom .btn2").on("click", function() {
		$("#boxPock").hide();
		$(".travel_check").hide();
	})	
	//出图出差编辑的操作
	$(".travel_detail td .edit").on("click", function() {
		$("#boxPock").show();
		$(".travel_edit").show();
	})
	$(".travel_edit_head i,.travel_edit_bottom .btn2").on("click", function() {
		$("#boxPock").hide();
		$(".travel_edit").hide();
	})
	$(".travel_edit_bottom .btn1").on("click", function() {
		$("#boxPock").hide();
		$(".process_edit").hide();
	})	
	$(".travel_edit_bottom .header_left select,.travel_edit_bottom .header_right select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	})
	//发函管理增加的操作
	$(".manage_detail .manage_detail_head").on("click", function() {
		$("#boxPock").show();
		$(".manage_add").show();
	})
	$(".manage_add_head i,.manage_add_bottom .btn2").on("click", function() {
		$("#boxPock").hide();
		$(".manage_add").hide();
	})
	$(".manage_add_bottom .btn1").on("click", function() {
		$("#boxPock").hide();
		$(".manage_add").hide();
	})
	$(".manage_add_bottom .header_left select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	})
	//发函管理查看的操作
	$(".manage_detail td .check").on("click", function() {
		$("#boxPock").show();
		$(".manage_check").show();
	})
	$(".manage_check_head i,.manage_check_bottom .btn2").on("click", function() {
		$("#boxPock").hide();
		$(".manage_check").hide();
	})	
	//发函管理编辑的操作
	$(".manage_detail td .edit").on("click", function() {
		$("#boxPock").show();
		$(".manage_edit").show();
	})
	$(".manage_edit_head i,.manage_edit_bottom .btn2").on("click", function() {
		$("#boxPock").hide();
		$(".manage_edit").hide();
	})
	$(".manage_edit_bottom .btn1").on("click", function() {
		$("#boxPock").hide();
		$(".manage_edit").hide();
	})	
	$(".manage_edit_bottom .header_left select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	})
	//图纸归档增加的操作
	$(".picture_detail .picture_detail_head").on("click", function() {
		$("#boxPock").show();
		$(".picture_add").show();
	})
	$(".picture_add_head i,.picture_add_bottom .btn2").on("click", function() {
		$("#boxPock").hide();
		$(".picture_add").hide();
	})
	$(".picture_add_bottom .btn1").on("click", function() {
		$("#boxPock").hide();
		$(".picture_add").hide();
	})
	$(".picture_add_bottom .header_left select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	})
	//图纸归档查看的操作
	$(".picture_detail td .check").on("click", function() {
		$("#boxPock").show();
		$(".picture_check").show();
	})
	$(".picture_check_head i,.picture_check_bottom .btn2").on("click", function() {
		$("#boxPock").hide();
		$(".picture_check").hide();
	})	
	//图纸归档编辑的操作
	$(".picture_detail td .edit").on("click", function() {
		$("#boxPock").show();
		$(".picture_edit").show();
	})
	$(".picture_edit_head i,.picture_edit_bottom .btn2").on("click", function() {
		$("#boxPock").hide();
		$(".picture_edit").hide();
	})
	$(".picture_edit_bottom .btn1").on("click", function() {
		$("#boxPock").hide();
		$(".picture_edit").hide();
	})	
	$(".picture_edit_bottom .header_left select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	})
	//项目分工编辑
	$(".item_detail tbody .edit").on("click",function(){
		$("#boxPock").show();
		$("#boxPock .item_add").show();
	})
	$(".item_add .item_add_head i,.item_add .btn1,item_add .btn2").on("click",function(){
		$("#boxPock").hide();
		$("#boxPock .item_add").hide();
	})
	//项目分工查看
	$(".item_detail tbody .check").on("click",function(){
		$("#boxPock").show();
		$("#boxPock .item_check").show();
	})
	$(".item_check .item_check_head i,.item_check .btn2").on("click",function(){
		$("#boxPock").hide();
		$("#boxPock .item_check").hide();
	})
	//一号楼切换
	$(".item_detail .item_ul li").on("click",function(){
		var id = $(this).attr('data-id')
		var name = $(this).html();
		$('.item_detail .item_detail_head .item_head_right span').eq(1).html(name)
		$.get('/Home/Index/fengong',{"id":id},function(data){
			var str = '';
			
			str += '<tr class="e9ecf1"><td>100000</td><td>2017-08-20</td><td>建筑</td><td>张三李四</td><td>1</td><td class="handle"><span class="edit" data-id="{$v.id}">编辑</span><span class="check" data-id="{$v.id}">查看</span></td></tr>';
		});
		$(this).addClass("active").siblings().removeClass("active")
	})
})