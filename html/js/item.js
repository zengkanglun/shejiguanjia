$(function() {
	
	/*下载附件合同*/
	$(document).on("click", ".basic_msg tbody .filename", function() {
		if($(this).html() != '无权查看'){
            var url = $(this).data("url");
            location.href = url;
		}
	})
	
	//项目信息编辑
	//选择几号楼
	$(".project_data .list select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(".project_data .list input").val(txt);
	})
	//编辑内容
	$(".msg_bottom td select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt)
	})
	/*获取project_id值*/
	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}
	if(GetQueryString("project_id")) {
		localStorage.setItem("project_id", GetQueryString("project_id"))
	}
	/*获取页面信息*/
	var token = localStorage.getItem("token");
	var project_id = localStorage.getItem("project_id");
	var item_option = "";
	var item_table;
	if(project_id != "null" && project_id) {

	} else {
		project_id = '';
	}
	itemMsg(project_id);

	function itemMsg(project_id) {
		$.ajax({
			type: "post",
			url: host_host_host + "/home/project/index",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				project_id: project_id,
			},
			success: function(data) {
				if(data.status == 1) {
					item_table = "";
					$(".msg_head .edit").attr("data-id", data.data.id);
					$(".basic_msg tbody .number").text(data.data.number);
					$(".basic_msg tbody .name").text(data.data.name);
					$(".basic_msg tbody .project_time").text(data.data.project_time);
					$(".basic_msg tbody .province").text(data.data.province);
					$(".basic_msg tbody .city").text(data.data.city);
					$(".basic_msg tbody .building_type").text(data.data.building_type);
					$(".basic_msg tbody .stage").text(data.data.stage);
					$(".basic_msg tbody .address").text(data.data.address);
					$(".basic_msg tbody .filename").text(data.data.filename);
					$(".basic_msg tbody .filename").data("url",data.data.file);
					//$(".basic_msg tbody .filename").html("<a href=\""+data.data.file+"\">"+data.data.filename+"</a>");		
					// $(".basic_msg tbody .money").text(data.data.money);
					$(".basic_msg tbody .receipt").text(data.data.receipt);
					var projectName = data.data.name;
					if(!projectName) {
						projectName = "";
					}
					$(".current_task .task_name").text(projectName);

					$(".basic_msg tbody .progress").text(data.data.sched_name);
					$(".basic_data tbody .build").text(data.data.build);
					$(".basic_data tbody .supervisor").text(data.data.supervisor);
					$(".basic_data tbody .tel").text(data.data.tel);
					$(".basic_data tbody .supervisor_tel").text(data.data.supervisor_tel);
					$(".basic_data tbody .email").text(data.data.email);
					$(".basic_data tbody .contact_address").text(data.data.contact_address);
					$(".director_z .item_num").text(data.data.nickname);
					/*子项目添加*/
					if(data.data.child.length > 0) {
						$(".project_data .list input").val(data.data.child[0].name);
						$(".project_data .list select option").remove();
						for(var i = 0; i < data.data.child.length; i++) {
							item_option += '<option value="' + data.data.child[i].id + '">' + data.data.child[i].name + '</option>';
						}
						$(".project_data .list select").append(item_option);
						for(var i = 0; i < data.data.child.length; i++) {
							item_table += '<table border="1" cellspacing="0">';
							item_table += '<tbody>';
							item_table += '<tr>';
							item_table += '<td class="item"><i class="xinghao">*</i>项目主管：</td>';
							item_table += '<td class="item_num">' + data.data.nickname + '</td>';
							item_table += '</tr>';
							for(var j = 0; j < data.data.child[i].work_type.length; j++) {
								item_table += '<tr>';
								item_table += '<td class="item" id="' + data.data.child[i].work_type[j].id + '">' + data.data.child[i].work_type[j].work + ':</td>';
								item_table += '<td class="item_num" user_id="' + data.data.child[i].work_type[j].user_id + '">' + data.data.child[i].work_type[j].nickname + '</td>';
								item_table += '</tr>';
							}
							item_table += '</tbody>';
							item_table += '</table>';
						}
						$(".item_table table").remove();
						$(".item_table").append(item_table);
					}
					sessionStorage.setItem("itemName", data.data.name);
					localStorage.setItem("project_id", data.data.id);
                    localStorage.setItem("haveChild", data.data.haveChild);
                    sessionStorage.setItem("is_director", data.data.is_director);
					/*子项目负责人添加*/
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	}
	/*获取option的值*/
	$(document).on("change", ".list select", function() {
		var index = $(this).find("option:checked").index();
		$(".item_table table").hide();
		$(".item_table table").eq(index).show();
	})

	//项目组通讯录
	$(document).on("click", ".adr_list", function() {
		$(".address_book tbody tr").remove();
		var id = $(".msg_head .edit").attr("data-id");
		$("#boxPock").show();
		$(".address_book").show();
		$.ajax({
			type: "post",
			url: host_host_host + "/home/project/contacts",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				project_id: id,
			},
			success: function(data) {
				var director = "";
				if(data.status == 1) {
					director += '<tr>';
					director += '<td class="item">1</td>';
					director += '<td class="item_num">项目主管</td>';
					director += '<td class="item">' + data.data.director.nickname + '</td>';
					director += '<td class="item_num">' + data.data.director.mobile + '</td>';
					director += '<td class="item_num">' + data.data.director.qq + '</td>';
					director += '</tr>';
					for(var i = 0; i < data.data.staff.length; i++) {
						director += '<tr>';
						director += '<td class="item">' + (i + 2) + '</td>';
						if(data.data.staff[i].status == 2){
                            director += '<td class="item_num">' + data.data.staff[i].work.name + '负责人</td>';
						}else{
                            director += '<td class="item_num">' + data.data.staff[i].work.name + '</td>';
						}
                        if(data.data.staff[i].status == 1){
                            director += '<td class="item"><p style="color: red">' + data.data.staff[i].nickname + '</p></td>';
                        }else{
                            director += '<td class="item">' + data.data.staff[i].nickname + '</td>';
                        }
						director += '<td class="item_num">' + data.data.staff[i].mobile + '</td>';
						director += '<td class="item_num">' + data.data.staff[i].qq + '</td>';
						director += '</tr>';
					}
					$("#address_book tbody tr").remove();
					$("#address_book tbody").append(director);
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	})

	$(document).on("click", ".address_book_head i,.address_book .btn1", function() {
		$("#boxPock").hide();
		$(".address_book").hide();
	})

	/*编辑页面*/
	$(document).on("click", ".msg_main .edit", function() {
		var project_id = $(this).attr("data-id");
		localStorage.setItem("project_id", project_id);
		location.href = "item_edit.html";
	})

	$(document).on("click", ".user_tab li", function() {
		var project_id = $(".msg_main .edit").attr("data-id");
		//		console.log(project_id)
		localStorage.setItem("project_id", project_id);
	})

})