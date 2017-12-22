//获取工种类型
var setWt = function(data){
//	console.log(511)
}
var renderWorkType  =  function(data){
	$("#work_type_list").html( );
	for(var i in data)
	{
//		console.log(data[i])
		var type = data[i];
		var item = $('<option onclick=\"setWt()\" data-id='+type.id+' value="'+type.id+'">'+type.name+
		'</option>'
     	);
	 
		$("#work_type_list").append(item);
	 
	}
		$("#work_type_list ").on("change",function(){
		//$(this).siblings().removeClass("active");
		//$(this).addClass("active");
	
		////alert($(this).val())
		//$(this).data("data-idd",)
	});
	
	 
}

var getWorType =  function(){
//	var host_host_host	= 'http://shejiguanjia.session.pub';
	token = localStorage.getItem("token");
	var	host_host_host	= host_host_host+'/index.php/home/Public/';		
	$.ajax({
		headers: {
		    //'USERTOKEN': token
		    accept:"usertoken"+token
		},
		type: 'GET',
		dataType: 'json',
		/*beforeSend: function(xhr) {
			//xhr.setRequestHeader("USERTOKEN");
		},*/
		url:host_host_host+'work_types',
		//url:'http://shejiguanjia.session.pub/index.php/home/admin/create'
		 
	})
	.done(function(data){
//		 console.log(data);
//		  console.log(JSON.stringify(data));
		  renderWorkType(data.data);
	})
	.fail(function(data){
//		 console.log("fail!"+data.msg);
//		  console.log("fail!"+data.data);
//		   console.log("fail!"+JSON.stringify(data));
	})
	.always(function(){
//		 console.log("always!");
	})
	
	
}

$("#open_add").on("click",function(){
	getWorType();
}); //弹窗新增用户 获取列表

//添加用户

var newpF =  function(){
					
	var newP = {};
	newP.username = ""+$("#new_username").val();
	newP.password = ""+$("#new_password").val();
	newP.nickname = ""+$("#new_nickname").val();
	newP.birthday = ""+$("#addone").val();
	newP.sex = ""+$("#new_sex").val();
	if(newP.sex =="男")
		newP.sex ="1";
	else if(newP._sex =="女")
		newP.sex ="2";
	else
		newP.sex ="0";
	newP.worktime = ""+$("#addtwo").val();
	newP.school = ""+$("#new_school").val();
	newP.edu = ""+$("#new_edu").val();
	if(newP.edu =="博士")
		newP.edu ="9";
	else if(newP._edu =="硕士")
		newP.edu ="8";
	else if(newP._edu =="研究生")
		newP.edu ="7";
	else if(newP._edu =="本科")
		newP.edu ="6";
	else if(newP._edu =="大专")
		newP.edu ="5";
	else if(newP._edu =="高中")
		newP.edu ="4";
	else if(newP._edu =="中专")
		newP.edu ="3";
	else if(newP._edu =="初中")
		newP.edu ="2";
	else if(newP._edu =="小学")
		newP.edu ="1";
	else
		newP.edu ="0";
	newP.position = ""+$("#new_position").val();
	newP.mobile = ""+$("#new_mobile").val();
	newP.qq = ""+$("#new_qq").val();
	newP.work_type = ""+$("#new_work_type").val();
	newP.work_type = ""+$("#work_type_list").val();
	
	newP.authority = ""+$("#new_authority .selected").data("va");
	
//	 console.log(JSON.stringify(newP))
	 token = localStorage.getItem("token");
//	 alert(token)
	var	host_host_host	= host_host_host+'/index.php/home/admin/';		
	$.ajax({
		headers: {
		    //'USERTOKEN': token
		    accept:"usertoken"+token
		},
		type: 'POST',
		dataType: 'json',
		/*beforeSend: function(xhr) {
			//xhr.setRequestHeader("USERTOKEN");
		},*/
		//url:host_host_host+'create',
		url:'http://shejiguanjia.session.pub/index.php/home/admin/create',
		data: newP//
	})
	.done(function(data){
//		 console.log(data);
//		  console.log(JSON.stringify(data));
	})
	.fail(function(data){
//		 console.log("fail!"+data.msg);
//		  console.log("fail!"+data.data);
//		   console.log("fail!"+JSON.stringify(data));
	})
	.always(function(){
//		 console.log("always!");
	})
	
	/*
	$.ajax({
		type: "post",
		url: host_host_host + "create",
		dataType: 'json',
		data: newP,//{},
		success: function(data) {
		if(data.status == 1) {//success
			console.log(1)
		} else {
			console.log(data.msg+5+data.data)				
		}
		},
		error: function(data) {
			console.log(0+data+9);
			console.log(JSON.stringify(data))
		},
		async: true
	});
	
	*/
	 
	 	
	
}
  
  $("#newp").on("click",newpF);
/*$.post("http://shejiguanjia.session.pub/index.php/home/admin/create",{},function(result){										    
    console.log(result);
  });*/
 

//查看用户


var viewUser =  function(){
					
	var newP = {};
	newP.username = ""+$("#new_username").val();
	newP.password = ""+$("#new_password").val();
	newP.nickname = ""+$("#new_nickname").val();
	newP.birthday = ""+$("#addone").val();
	newP.sex = ""+$("#new_sex").val();
	if(newP.sex =="男")
		newP.sex ="1";
	else if(newP._sex =="女")
		newP.sex ="2";
	else
		newP.sex ="0";
	newP.worktime = ""+$("#addtwo").val();
	newP.school = ""+$("#new_school").val();
	newP.edu = ""+$("#new_edu").val();
	if(newP.edu =="博士")
		newP.edu ="9";
	else if(newP._edu =="硕士")
		newP.edu ="8";
	else if(newP._edu =="研究生")
		newP.edu ="7";
	else if(newP._edu =="本科")
		newP.edu ="6";
	else if(newP._edu =="大专")
		newP.edu ="5";
	else if(newP._edu =="高中")
		newP.edu ="4";
	else if(newP._edu =="中专")
		newP.edu ="3";
	else if(newP._edu =="初中")
		newP.edu ="2";
	else if(newP._edu =="小学")
		newP.edu ="1";
	else
		newP.edu ="0";
	newP.position = ""+$("#new_position").val();
	newP.mobile = ""+$("#new_mobile").val();
	newP.qq = ""+$("#new_qq").val();
	newP.work_type = ""+$("#work_type_list").val();
	 
	newP.authority = ""+$("#new_authority .selected").data("va");
	
//	 console.log(JSON.stringify(newP))
	 
	var	host_host_host	= host_host_host+'/index.php/home/admin/';	
	 
	//http://shejiguanjia.session.pub/index.php/Home/Admin/user_info
	$.ajax({
		type: "get",
		url: host_host_host + "user_info",
		dataType: 'json',
		
		success: function(data) {
		if(data.status == 1) {//success
//			console.log(1)
		} else {
//			console.log(data.msg+5+data.data)				
		}
		},
		error: function(data) {
//			console.log(0)
		},
		async: true
	});
	 
	 	
	
}
	$(".member_manage2 .third td .check").on("click", function() {
		 
		viewUser();
	})
	
	
	var rendP = function(uid){
		 	
		
	}
//普通用户	
var getUser = function(uid){
	var	host_host_host	= host_host_host+'/index.php/home/admin/';
	
	$.ajax({
		type: "get",
		url: host_host_host + "user_info",
		dataType: 'json',
		data:{id:uid},
		success: function(data) {
		if(data.status == 1) {//success
//			console.log(1);
//			console.log(data.msg);
//			console.log(data.data);
			rendP(data.data);
		} else {
//			console.log(data.msg+5+data.data)				
		}
		},
		error: function(data) {
//			console.log(0)
		},
		async: true
	});
	
}

//普通用户管理
var rendPList = function(data) {
	//$("#userList").html("");
//	console.log(JSON.stringify(data))
	for(var i in data)
	{
//		console.log(data[i])
		var user = data[i];
		var item = $('<tr>'+
			'<td>'+user.id+'</td>'+
			'<td>'+user.nickname+'</td>'+
			'<td>'+user.nickname+'</td>'+
			'<td>'+user.work_type+'</td>'+
			'<td>'+user.worktime+'</td>'+
			'<td class="handle"><span class="edit" data-id="'+user.id+'">编辑</span><span class="check" data-id="'+user.id+'">查看</span></td>'+
		'</tr>');
	$("#userList").append(item);		
	}
	

	//edit事件zhuce
	$("#userList .edit").on("click",function(){
		var uid = $(this).data("id");
		//alert(uid)
		getUser(uid);
		
	});
	//check事件zhuce
	$("#userList .chek").on("click",function(){
		var uid = $(this).data("id");
		//alert(uid)
		getUser(uid);
		
	});
	
}
var getPList = function() {
	
var	host_host_host	= host_host_host+'/index.php/home/admin/';	
	 
	//http://shejiguanjia.session.pub/index.php/Home/Admin/user_info
	$.ajax({
		type: "get",
		url: host_host_host + "user_list",
		dataType: 'json',
		
		success: function(data) {
		if(data.status == 1) {//success
//			console.log(1);
//			console.log(data.msg);
//			console.log(data.data);
//			rendPList(data.data.data);
		} else {
//			console.log(data.msg+5+data.data.data)				
		}
		},
		error: function(data) {
//			console.log(0)
		},
		async: true
	});
	
}
	//$(".member_manage2 .third td .check").on("click", function() {
		 
		getPList();
	//})