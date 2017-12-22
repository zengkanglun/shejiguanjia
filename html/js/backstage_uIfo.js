


//修改密码

var pwdEdF =  function(){
					
//	console.log(5);
	
	var newP = {};
	newP.old_pwd = ""+$("#old_pwd").val();
	newP.new_pwd = ""+$("#new_pwd").val();
	newP.verify_pwd = ""+$("#verify_pwd").val();
 
	 
	console.log(JSON.stringify(newP))
	token = localStorage.getItem("token");
	$.ajax({
		
		 
		method: 'POST',
		dataType: 'json',
		 
		headers: {
		      accept:"usertoken:"+token
		},
		url: host_host_host + '/index.php/home/admin/change_pwd',
		data: newP,//{},
	})
	.done(function(data){
		if(data.status == 1) {//success
//			console.log(1)
		} else {
//			console.log(data.msg+5+data.data)				
		}
//		 console.log(data);
//		 console.log(JSON.stringify(data));
	})
	.fail(function(data){
//		 console.log("fail!");
	})
	.always(function(data){
//		 console.log("always!");
//		 console.log(JSON.stringify(data));
	}) 
	

}


//add单位消息

var infoAdF =  function(){
					
//	console.log(5);
	
	var newP = {};
	newP.name = ""+$("#name").val();
	newP.mobile = ""+$("#mobile").val();
	newP.address = ""+$("#address").val();
 	newP.zipcode = ""+$("#zipcode").val();
 	newP.email = ""+$("#email").val();
	 
	token = localStorage.getItem("token");
	$.ajax({
		
		 
		method: 'POST',
		dataType: 'json',
		 
		headers: {
		      accept:"usertoken:"+token
		},
		url: host_host_host + '/index.php/home/admin/info_edit',
		data: newP,//{},
	})
	.done(function(data){
		toast(data.msg);
		if(data.status == 1) {//success
			infoGetF();
		} else {
		}
	})
	.fail(function(data){
		toast("失败");
//		 console.log("fail!");
	})
	.always(function(data){
	}) 
	

}

 
 $("#btn_newIfo").on("click",infoAdF);
 


//get单位消息

var infoGetF =  function(){
	 
	token = localStorage.getItem("token");
	$.ajax({
		
		 
		method: 'GET',
		dataType: 'json',
		 
		headers: {
		      accept:"usertoken:"+token
		},
		url: host_host_host + '/index.php/home/admin/info',
		
	})
	.done(function(data){
		toast(data.msg);
		if(data.status == 1) {//success
//			console.log(1);
			$("#name").val(data.data[0].name);
			$("#mobile").val(data.data[0].mobile);
			$("#address").val(data.data[0].address);
		 	$("#zipcode").val(data.data[0].zipcode);
		 	$("#email").val(data.data[0].email);
		} else {
		}
	})
	.fail(function(data){
		toast("失败");
//		 console.log("fail!");
	})
	.always(function(data){
	}) 
	

}


infoGetF();
