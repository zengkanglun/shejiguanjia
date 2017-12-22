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

//process_list

//
var rendPro = function(data) {
	$("#add_process_form").val(newP.id); //""+$("#edit_process_form #user_id").val();
	$("#add_process_form #process_type_list").val(newP.type);
	$("#add_process_form #content").html(newP.content);
	$("#add_process_form #time").val(newP.time);
	 

}
//获取process详情
var viewPro = function(id) {
	var token = localStorage.getItem("token");
	$.ajax({

			method: 'GET',
			dataType: 'json',

			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + '/index.php/home/process/index',
			data: id, //{},
		})
		.done(function(data) {
			if(data.status == 1) { //success
				console.log(1);
				rendPro(data.data);
			} else {
			}
		})
		.fail(function(data) {
			console.log("fail!");
		})
		.always(function() {
			console.log("always!");
		})

}
//编辑过程
var editproF = function(data) {

	var newP = {};
	newP.id = $("#edit_process_form").data("data-id"); //""+$("#edit_process_form #user_id").val();
	newP.type = "" + $("#edit_process_form #process_type_list").val();
	newP.content = "sed" + $("#edit_process_form #content").val();
	newP.time = "" + $("#edit_process_form #pro_edit_one").val();

	var token = localStorage.getItem("token");
	$.ajax({

			method: 'POST',
			dataType: 'json',
			/*beforeSend: function(xhr) {
				xhr.setRequestHeader("USERTOKEN");
			},*/
			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + '/index.php/home/process/editprocess',
			data: newP, //{},
		})
		.done(function(data) {
			if(data.status == 1) { //success
				console.log(1)
			} else {
			}
		})
		.fail(function(data) {
			console.log("fail!");
		})
		.always(function() {
			console.log("always!");
		})
}

var deletePro = function(data) {

}
//显示过程列表
var renderProList = function(data) {
	$("#process_list").html("");
	for(var i in data) {
		var type = data[i];
		var item = $(

			//
			'<tr class="e9ecf1">' +
			'<td>' + type.id + '</td>' +
			'<td>' + type.add_time + '</td>' +
			'<td>' + type.type + '</td>' +
			'<td>' + type.content + '</td>' +
			'<td>' + type.id + '</td>' +
			'<td class="handle">' +
			'<span class="edit" data-id="' + type.id + '">编辑</span><span class="check" data-id="' + type.id + '">查看</span><span class="del" data-id="' + type.id + '">删除</span></td>' +
			'</tr>'
		);

		$("#process_list").append(item);

	}
	$("#process_list .detail").on("click", function() {
		console.log("detail")
		viewPro($(this).data("id"));
	});
	$("#process_list .edit").on("click", function() {
		console.log("edit")
		//editproF($(this).data("id"));
		$("#edit_process_form").data("data-id", $(this).data("id")) //"
		//getWorTypeParam("#new_work_type_list");//渲染工种

	});

	$("#process_list .delete").on("click", function() {
		console.log("delete")
		deletePro($(this).data("id"));
		console.log($(this).data("id"))
	});
}

var renderWorkType = function(data) {
	$("#work_type_list").html("");
	for(var i in data) {
		var type = data[i];
		var item = $('<option onclick=\"setWt()\" data-id=' + type.id + ' value="' + type.id + '">' + type.name +
			'</option>'
		);

		$("#work_type_list").append(item);

	}
}

//

//添加过程
var newproF = function() {

	var newP = {};
	newP.user_id = 1; //""+$("#user_id").val();
	newP.type = "" + $("#add_process_form #process_type_list").val();
	newP.content = "" + $("#add_process_form #content").val();
	newP.project_id = 1; //""+$("#project_id").val();

	var token = localStorage.getItem("token");
	$.ajax({

			method: 'POST',
			dataType: 'json',
			 
			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + '/index.php/home/process/addprocess',
			data: newP, //{},
		})
		.done(function(data) {
			if(data.status == 1) { //success
				console.log(1)
			} else {
			}
		})
		.fail(function(data) {
			console.log("fail!");
		})
		.always(function() {
			console.log("always!");
		})
}

//显示过程类型到指定 element
var renderProTypeParam = function(data, e_id) {
	$(e_id).html("");
	for(var i in data) {
		var type = data[i];
		var item = $('<option onclick=\"setWt()\" data-id=' + type.id + ' value="' + type.id + '">' + type.name +
			'</option>'
		);

		$(e_id).append(item);

	}
	$(e_id).on("change", function() {

	});

}

//获取process类型 
var getproTypeF = function(e_id) {
	newP = {};
	var token = localStorage.getItem("token");
	$.ajax({

			method: 'POST',
			dataType: 'json',

			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + '/index.php/home/common/ProcessType',
			data: newP, //{},
		})
		.done(function(data) {
			if(data.status == 1) { //success
				console.log(1);
				//renderProType(data.data);
				renderProTypeParam(data.data, e_id);
			} else {
			}
		})
		.fail(function(data) {
			console.log("fail!");
		})
		.always(function() {
			console.log("always!");
		})
}

//"ad_img"  
//获取process类型列表  新增时触发
$("#ad_img").on("click", function() {
	var e_id = "#add_process_form #process_type_list";
	getproTypeF(e_id);
})
//提交process新增表单
$("#btn_add_pro").on("click", function() {
	newproF();
})
//提交process编辑表单
$("#btn_edit_pro").on("click", function() {
	editproF();
})

//获取过程列表
var getProList = function() {

	var newP = {};
	newP.project_id = "" + 1; //project_id;
	newP.p = "" + 1; //page

	var token = localStorage.getItem("token");
	$.ajax({

			method: 'POST',
			dataType: 'json',
			/*beforeSend: function(xhr) {
				xhr.setRequestHeader("USERTOKEN");
			},*/
			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + '/index.php/home/process/index',
			data: newP, //{},
		})
		.done(function(data) {
			if(data.status == 1) { //success
				console.log(1)
				renderProList(data.data.process);
			} else {
			}
		})
		.fail(function(data) {
			console.log("fail!");
		})
		.always(function() {
			console.log("always!");
		})
}

//ini
getProList(); //获取过程列表
var e_id = "#edit_process_form #process_type_list";
getproTypeF(e_id); //获取过程类型列表

/***********************************/
//出图出差

//显示过程类型到指定 element
var renderTuTypeParam = function(data, e_id) {
	$(e_id).html("");
	for(var i in data) {
		var type = data[i];
		var item = $('<option onclick=\"setWt()\" data-id=' + type.id + ' value="' + type.id + '">' + type.name +
			'</option>'
		);

		$(e_id).append(item);

	}
	$(e_id).on("change", function() {

	});

}

//获取process类型 
var getTuTypeF = function(e_id) {
	newP = {};
	var token = localStorage.getItem("token");
	$.ajax({

			method: 'POST',
			dataType: 'json',

			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + '/index.php/home/common/pictureType',
			data: newP, //{},
		})
		.done(function(data) {
			if(data.status == 1) { //success
				console.log(1);
				//renderProType(data.data);
				renderTuTypeParam(data.data, e_id);
			} else {
			}
		})
		.fail(function(data) {
			console.log("fail!");
		})
		.always(function() {
			console.log("always!");
		})
}

//获取process类型列表  新增时触发
$("#ad_img_chutu").on("click", function() {
	var e_id = "#add_chutu_form #chutu_type_list";
	getTuTypeF(e_id);
})

//显示过程列表
var renderTuList = function(data) {
	$("#chutu_list").html("");
	for(var i in data) {
		var type = data[i];
		var item = $(

			//
			'<tr class="e9ecf1">' +
			'<td>' + type.id + '</td>' +
			'<td>' + type.add_time + '</td>' +
			'<td>' + type.type + '</td>' +
			'<td>' + type.content + '</td>' +
			'<td>' + type.id + '</td>' +
			'<td class="handle">' +
			'<span class="edit" data-id="' + type.id + '">编辑</span><span class="check" data-id="' + type.id + '">查看</span><span class="del" data-id="' + type.id + '">删除</span></td>' +
			'</tr>'
		);

		$("#chutu_list").append(item);

	}
	$("#chutu_list .detail").on("click", function() {
		console.log("detail")
		viewChu($(this).data("id"));
	});
	$("#chutu_list .edit").on("click", function() {
		console.log("edit")
		//editproF($(this).data("id"));
		$("#edit_chutu_form").data("data-id", $(this).data("id")) //"
		//getWorTypeParam("#new_work_type_list");//渲染工种

	});

	$("#chutu_list .delete").on("click", function() {
		console.log("delete")
		deleteChu($(this).data("id"));
		console.log($(this).data("id"))
	});
}

//获取过程列表
var getTuList = function() {

	var newP = {};
	newP.project_id = "" + 1; //project_id;
	newP.p = "" + 1; //page

	var token = localStorage.getItem("token");
	$.ajax({

			method: 'POST',
			dataType: 'json',

			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + '/index.php/home/process/Picture',
			data: newP, //{},
		})
		.done(function(data) {
			if(data.status == 1) { //success
				console.log(1)
				renderTuList(data.data.process);
			} else {
			}
		})
		.fail(function(data) {
			console.log("fail!");
		})
		.always(function() {
			console.log("always!");
		})
}

//添加出图
var newchuF = function() {

	var newP = {};
	newP.participate = "" + $("#add_chutu_form #participate").val();
	newP.type = "" + $("#add_chutu_form #chutu_type_list").val();
	newP.content = "" + $("#add_chutu_form #content").val();
	newP.project_id = 1; //""+$("#project_id").val();
	newP.num = "" + $("#add_chutu_form #num_list").val();

	var token = localStorage.getItem("token");
	$.ajax({

			method: 'POST',
			dataType: 'json',

			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + '/index.php/home/process/AddPicture',
			data: newP, //{},
		})
		.done(function(data) {
			if(data.status == 1) { //success
				console.log(1)
			} else {
			}
		})
		.fail(function(data) {
			console.log("fail!");
		})
		.always(function() {
			console.log("always!");
		})
}

//编辑出图
var editchuF = function(data) {

	var newP = {};
	newP.id = $("#edit_chutu_form").data("data-id"); //""+$("#edit_process_form #user_id").val();
	newP.type = "" + $("#edit_chutu_form #chutu_type_list").val();
	newP.content = "" + $("#edit_chutu_form #content").val();
	newP.participate = "" + $("#edit_chutu_form #participate").val();
	newP.num = "" + $("#edit_chutu_form #num_list").val();

	var token = localStorage.getItem("token");
	$.ajax({

			method: 'POST',
			dataType: 'json',

			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + '/index.php/home/process/EditPicture',
			data: newP, //{},
		})
		.done(function(data) {
			if(data.status == 1) { //success
				console.log(1)
			} else {
			}
		})
		.fail(function(data) {
			console.log("fail!");
		})
		.always(function() {
			console.log("always!");
		})
}

//
//提交chutu新增表单
$("#btn_add_chu").on("click", function() {
	newchuF(); //newproF();
})
//提交chutu编辑表单
$("#btn_edit_chu").on("click", function() {
	editchuF(); //editproF();
})

//ini
getTuList(); //获取过程列表
var e_id = "#edit_chutu_form #chutu_type_list";
getTuTypeF(e_id); //获取出图类型列表

/***********************************/
//发函管理

//显示过程类型到指定 element
var renderLetterTypeParam = function(data, e_id) {
	$(e_id).html("");
	for(var i in data) {
		var type = data[i];
		var item = $('<option onclick=\"setWt()\" data-id=' + type.id + ' value="' + type.id + '">' + type.name +
			'</option>'
		);

		$(e_id).append(item);

	}
	$(e_id).on("change", function() {

	});

}

//获取process类型 
var getLetterTypeF = function(e_id) {
	newP = {};
	var token = localStorage.getItem("token");
	$.ajax({

			method: 'POST',
			dataType: 'json',

			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + '/index.php/home/common/LetterType',
			data: newP, //{},
		})
		.done(function(data) {
			if(data.status == 1) { //success
				console.log(1);
				//renderProType(data.data);
				renderLetterTypeParam(data.data, e_id);
			} else {
			}
		})
		.fail(function(data) {
			console.log("fail!");
		})
		.always(function() {
			console.log("always!");
		})
}

//获取process类型列表  新增时触发
$("#ad_img_letter").on("click", function() {
	var e_id = "#add_letter_form #letter_type_list";
	getLetterypeF(e_id);
})

//显示过程列表
var renderLetterList = function(data) {
	$("#letter_list").html("");
	for(var i in data) {
		var type = data[i];
		var item = $(

			//
			'<tr class="e9ecf1">' +
			'<td>' + type.id + '</td>' +
			'<td>' + type.add_time + '</td>' +
			'<td>' + type.type + '</td>' +
			'<td>' + type.content + '</td>' +
			'<td>' + type.id + '</td>' +
			'<td class="handle">' +
			'<span class="edit" data-id="' + type.id + '">编辑</span><span class="check" data-id="' + type.id + '">查看</span><span class="del" data-id="' + type.id + '">删除</span></td>' +
			'</tr>'
		);

		$("#letter_list").append(item);

	}
	$("#letter_list .detail").on("click", function() {
		console.log("detail")
		viewLet($(this).data("id"));
	});
	$("#letter_list .edit").on("click", function() {
		console.log("edit")
		//editproF($(this).data("id"));
		$("#edit_letter_form").data("data-id", $(this).data("id")) //"
		//getWorTypeParam("#new_work_type_list");//渲染工种

	});

	$("#letter_list .delete").on("click", function() {
		console.log("delete")
		deleteLetter($(this).data("id"));
		console.log($(this).data("id"))
	});
}

//获取过程列表
var getLetterList = function() {

	var newP = {};
	newP.project_id = "" + 1; //project_id;
	newP.p = "" + 1; //page

	var token = localStorage.getItem("token");
	$.ajax({

			method: 'POST',
			dataType: 'json',

			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + '/index.php/home/process/letter',
			data: newP, //{},
		})
		.done(function(data) {
			if(data.status == 1) { //success
				console.log(1)
				renderLetterList(data.data.process);
			} else {
			}
		})
		.fail(function(data) {
			console.log("fail!");
		})
		.always(function() {
			console.log("always!");
		})
}

//添加出图
var newletterF = function() {

	var newP = {};
	newP.data_type = "1";
	newP.type = "" + $("#add_letter_form #letter_type_list").val();
	newP.content = "" + $("#add_letter_form #content").val();
	newP.project_id = 1; //""+$("#project_id").val();
	newP.time = "" + $("#add_letter_form #manage_one").val();

	var token = localStorage.getItem("token");
	$.ajax({

			method: 'POST',
			dataType: 'json',

			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + '/index.php/home/process/AddLetter',
			data: newP, //{},
		})
		.done(function(data) {
			if(data.status == 1) { //success
				console.log(1)
			} else {
			}
		})
		.fail(function(data) {
			console.log("fail!");
		})
		.always(function() {
			console.log("always!");
		})
}

//编辑发函
var editletterF = function(data) {

	var newP = {};
	newP.id = $("#edit_letter_form").data("data-id"); //""+$("#edit_process_form #user_id").val();
	newP.type = "" + $("#edit_letter_form #chutu_type_list").val();
	newP.content = "" + $("#edit_letter_form #content").val();
	newP.contract = "" + $("#edit_letter_form #contract").val();

	var token = localStorage.getItem("token");
	$.ajax({

			method: 'POST',
			dataType: 'json',

			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + '/index.php/home/process/EditLetter',
			data: newP, //{},
		})
		.done(function(data) {
			if(data.status == 1) { //success
				console.log(1)
			} else {
			}
		})
		.fail(function(data) {
			console.log("fail!");
		})
		.always(function() {
			console.log("always!");
		})
}

//
//提交发函新增表单
$("#btn_add_letter").on("click", function() {
	newletterF(); //newproF();
})
//提交发函编辑表单
$("#btn_edit_letter").on("click", function() {
	editletterF(); //editproF();
})

//ini
getLetterList(); //获取过程列表
var e_id = "#edit_letter_form #letter_type_list";
getLetterTypeF(e_id); //获取出图类型列表

/***********************************/
//归档管理

//显示过程类型到指定 element
var renderArchiveTypeParam = function(data, e_id) {
	$(e_id).html("");
	for(var i in data) {
		var type = data[i];
		var item = $('<option onclick=\"setWt()\" data-id=' + type.id + ' value="' + type.id + '">' + type.name +
			'</option>'
		);

		$(e_id).append(item);

	}
	$(e_id).on("change", function() {

	});

}

//获取process类型 
var getArchiveTypeF = function(e_id) {
	newP = {};
	var token = localStorage.getItem("token");
	$.ajax({

			method: 'POST',
			dataType: 'json',

			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + '/index.php/home/common/ArchivingType',
			data: newP, //{},
		})
		.done(function(data) {
			if(data.status == 1) { //success
				console.log(1);
				//renderProType(data.data);
				renderArchiveTypeParam(data.data, e_id);
			} else {
			}
		})
		.fail(function(data) {
			console.log("fail!");
		})
		.always(function() {
			console.log("always!");
		})
}

//获取archive类型列表  新增时触发
$("#ad_img_archive").on("click", function() {
	var e_id = "#add_archive_form #archive_type_list";
	getLetterypeF(e_id);
})

//显示过程列表
var renderArchiveList = function(data) {
	$("#archive_list").html("");
	for(var i in data) {
		var type = data[i];
		var item = $(

			//
			'<tr class="e9ecf1">' +
			'<td>' + type.id + '</td>' +
			'<td>' + type.add_time + '</td>' +
			'<td>' + type.type + '</td>' +
			'<td>' + type.content + '</td>' +
			'<td>' + type.id + '</td>' +
			'<td class="handle">' +
			'<span class="edit" data-id="' + type.id + '">编辑</span><span class="check" data-id="' + type.id + '">查看</span><span class="del" data-id="' + type.id + '">删除</span></td>' +
			'</tr>'
		);

		$("#archive_list").append(item);

	}
	$("#archive_list .detail").on("click", function() {
		console.log("detail")
		viewLet($(this).data("id"));
	});
	$("#archive_list .edit").on("click", function() {
		console.log("edit")
		//editproF($(this).data("id"));
		$("#edit_archive_form").data("data-id", $(this).data("id")) //"
		//getWorTypeParam("#new_work_type_list");//渲染工种

	});

	$("#archive_list .delete").on("click", function() {
		console.log("delete")
		deleteLetter($(this).data("id"));
		console.log($(this).data("id"))
	});
}

//获取过程列表
var getArchiveList = function() {

	var newP = {};
	newP.project_id = "" + 1; //project_id;
	newP.p = "" + 1; //page

	var token = localStorage.getItem("token");
	$.ajax({

			method: 'POST',
			dataType: 'json',

			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + '/index.php/home/process/Archiving',
			data: newP, //{},
		})
		.done(function(data) {
			if(data.status == 1) { //success
				console.log(1)
				renderArchiveList(data.data.process);
			} else {
			}
		})
		.fail(function(data) {
			console.log("fail!");
		})
		.always(function() {
			console.log("always!");
		})
}

//添加归档
var newarchiveF = function() {

	var newP = {};
	newP.data_type = "2";
	newP.type = "" + $("#add_archive_form #archive_type_list").val();
	newP.content = "" + $("#add_archive_form #content").val();
	newP.project_id = 1; //""+$("#project_id").val();
	newP.time = "" + $("#add_archive_form #pic_add_one").val();

	var token = localStorage.getItem("token");
	$.ajax({

			method: 'POST',
			dataType: 'json',

			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + '/index.php/home/process/AddLetter',
			data: newP, //{},
		})
		.done(function(data) {
			if(data.status == 1) { //success
				console.log(1)
			} else {
			}
		})
		.fail(function(data) {
			console.log("fail!");
		})
		.always(function() {
			console.log("always!");
		})
}

//编辑发函
var editarchiveF = function(data) {

	var newP = {};
	newP.id = $("#edit_archive_form").data("data-id"); //""+$("#edit_process_form #user_id").val();
	newP.type = "" + $("#edit_archive_form #archive_type_list").val();
	newP.content = "" + $("#edit_archive_form #content").val();
	newP.contract = "" + $("#edit_archive_form #contract").val();

	var token = localStorage.getItem("token");
	$.ajax({

			method: 'POST',
			dataType: 'json',

			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + '/index.php/home/process/EditLetter',
			data: newP, //{},
		})
		.done(function(data) {
			if(data.status == 1) { //success
				console.log(1)
			} else {
			}
		})
		.fail(function(data) {
			console.log("fail!");
		})
		.always(function() {
			console.log("always!");
		})
}

//
//提交发函新增表单
$("#btn_add_archive").on("click", function() {
	newarchiveF(); //newproF();
})
//提交发函编辑表单
$("#btn_edit_archive").on("click", function() {
	editarchiveF(); //editproF();
})

//ini
getArchiveList(); //获取过程列表
var e_id = "#edit_archive_form #archive_type_list";
getArchiveTypeF(e_id); //获取出图类型列表

/*************************/
//项目分工

//ProjectLabor

//获取过程列表
var getLaborList = function() {

	var newP = {};
	newP.child_id = "" + 1; //project_id;
	newP.p = "" + 1; //page

	var token = localStorage.getItem("token");
	$.ajax({

			method: 'POST',
			dataType: 'json',

			headers: {
				accept: "usertoken:" + token
			},
			url: host_host_host + '/index.php/home/project/ProjectLabor',
			data: newP, //{},
		})
		.done(function(data) {
			if(data.status == 1) { //success
				console.log(1)
				rendLaborList(data.data.process);
			} else {
			}
		})
		.fail(function(data) {
			console.log("fail!");
		})
		.always(function() {
			console.log("always!");
		})
}

getLaborList(); //获取过程列表