$(function() {
	
	/*下载附件合同*/
	$(document).on("click", ".basic_msg tbody .filename", function() {
        if($(".basic_msg tbody .filename").text() != '暂无附件'){
            var url = $(this).data("url");
            location.href = url;
		}
	})
	
	$(".list select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(".list input").val(txt);
	})
	$("select").on("change", function() {
		var txt = $(this).find("option:checked").text();
		$(this).siblings("input").val(txt);
	})
	/*获取option的值*/
	$(document).on("change", ".list select", function() {
		var index = $(this).find("option:checked").index();
		$(".item_table table").hide();
		$(".item_table table").eq(index).show();
	})

	/*获取token值*/
	var token = localStorage.getItem("token");
	var ject_id = localStorage.getItem("project_id");
	$("#ject_id").val(ject_id);
	/*页面补充*/
	itemMsg(ject_id);

	function itemMsg(project_id) {
		$.ajax({
			type: "post",
			url: host_host_host + "/home/project/index",
			dataType: 'json',
			headers: {
				accept: "usertoken:" + token,
			},
			data: {
				project_id: ject_id,
			},
			success: function(data) {
				if(data.status == 1) {
					console.log(data);
					$(".basic_msg tbody .number").val(data.data.number);
					$(".basic_msg tbody .name").val(data.data.name);
					$(".basic_msg tbody .project_time").val(data.data.project_time);
					$(".basic_msg tbody #city").val(data.data.province + '-' + data.data.city)
					$(".basic_msg tbody #hcity").val(data.data.province);
					$(".basic_msg tbody #hproper").val(data.data.city);
					$(".basic_msg tbody .building_type").val(data.data.building_type);
					$(".basic_msg tbody .building_type").attr("id", data.data.building_id);
					$(".basic_msg tbody .stage").val(data.data.stage);
					$(".basic_msg tbody .stage").attr("id", data.data.stage_id);
					$(".basic_msg tbody .address").val(data.data.address);

					if(data.data.file == ''){
                        $(".basic_msg tbody .filename").text('暂无附件');
					}else{
                        $(".basic_msg tbody .filename").text(data.data.filename);
                        $(".basic_msg tbody .filename").data("url",data.data.file);
					}
					$(".basic_msg tbody .money").text(data.data.money);
					$(".basic_msg tbody .progress").val(data.data.sched_name); //进度名称
					$(".basic_msg tbody .progress").attr("id", data.data.sche_id); //进度名称
					var progress_style = '<option value="">请选择</option>';
					for(var i = 0; i < data.data.schedule.length; i++) {
						progress_style += '<option value="' + data.data.schedule[i].id + '">' + data.data.schedule[i].name + '</option>';
					}
					$(".basic_msg .progress_list option").remove();
					$(".basic_msg .progress_list").append(progress_style);
					$(".basic_msg .progress").val(data.data.sched_name);
					$(".basic_msg .progress").attr("id", data.data.sched_id);

					$(".basic_msg tbody .receipt").text(data.data.receipt); //收款

					$(".unit_msg tbody .build").val(data.data.build);
					$(".unit_msg tbody .supervisor").val(data.data.supervisor);
					$(".unit_msg tbody .tel").val(data.data.tel);
					$(".unit_msg tbody .supervisor_tel").val(data.data.supervisor_tel);
					$(".unit_msg tbody .email").val(data.data.email);
					$(".unit_msg tbody .contact_address").val(data.data.contact_address);
					$(".director_z .item_num").text(data.data.nickname);
					/*获取项目编辑权限11/21*/
					var nickname = sessionStorage.getItem("nickname");
					var is_super = sessionStorage.getItem("is_super");
					if(is_super == 1) {
						$(".project_data .item_type").show();
					} else {
						if(nickname==data.data.nickname){
							$(".project_data .item_type").show();
						}
					}
					
					//根据1显示 ‘子项目录入’
					var toshow = data.data.is_director;//toshow = 0;alert(toshow)
					
					if(toshow == 1)
					$(".project_data .item_type").show();
					else
					$(".project_data .item_type").hide();
					
					
					/*获取项目编辑权限结束*/
					/*子项目添加*/
					var item_table = "";
					var item_option = "";
					if(data.data.child.length > 0) {
						$(".project_data .list input").val(data.data.child[0].name);
						$(".project_data .list select option").remove();
						$(".current_task .task_name").text(data.data.name);
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
					localStorage.setItem("project_id", data.data.id);
					/*子项目负责人添加*/
				} else {

				}
			},
			error: function(data) {

			},
			async: true
		});
	}

	/*获取建筑类型*/
	$.ajax({
		type: "post",
		url: host_host_host + "/home/common/BuildType",
		dataType: 'json',
		headers: {
			accept: "usertoken:" + token,
		},
		data: {},
		success: function(data) {
			if(data.status == 1) {
				var build_style = "";
				build_style += '<option value="0">请选择</option>';
				for(var i = 0; i < data.data.length; i++) {
					build_style += '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
				}
				$(".basic_msg .build_style option").remove();
				$(".basic_msg .build_style").append(build_style);
				$(".basic_msg .building_type").val(data.data[0].name);
				$(".basic_msg .building_type").attr("id", data.data[0].id);
			} else {

			}
		},
		error: function(data) {

		},
		async: true
	});
	$(document).on("change", ".basic_msg .build_style", function() {
		var id = $(this).find("option:checked").val();
		$(".basic_msg .building_type").attr("id", id);
	})
	/*获取阶段类型*/
	$.ajax({
		type: "post",
		url: host_host_host + "/home/common/StageTypes",
		dataType: 'json',
		headers: {
			accept: "usertoken:" + token,
		},
		data: {},
		success: function(data) {
			if(data.status == 1) {
				//				console.log(data)
				var build_style = "";
				build_style += '<option value="0">请选择</option>';
				for(var i = 0; i < data.data.length; i++) {
					build_style += '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
				}
				$(".basic_msg .stage_style option").remove();
				$(".basic_msg .stage_style").append(build_style);
				$(".basic_msg .stage").val(data.data[0].name);
				$(".basic_msg .stage").attr("id", data.data[0].id);
			} else {

			}
		},
		error: function(data) {

		},
		async: true
	});
	$(document).on("change", ".basic_msg .stage_style", function() {
		var id = $(this).find("option:checked").val();
		$(".basic_msg .stage").attr("id", id);
	})
	$(document).on("change", ".basic_msg .progress_list", function() {
		var id = $(this).find("option:checked").val();
		$(".basic_msg .progress").attr("id", id);
	})
	/*数据发送*/
	$(document).on('click', '#form_btn', function() {
		var form = new FormData($("#myform")[0]);
		var hcity = $("#hcity").val();
		var hproper = $("#hproper").val();
		if(!hcity) {
			hcity = "";
		}
		if(!hproper) {
			hproper = "";
		}
		form.append("province", hcity);
		form.append("city", hproper);
		form.append("building_type", $(".basic_msg .building_type").attr("id"));
		form.append("stage", $(".basic_msg .stage").attr("id"));
		form.append("sche_id", $(".basic_msg .progress").attr("id"));
		if($(".basic_msg .building_type").attr("id") == 0) {
			toast("请选择建筑类型")
		} else if($(".basic_msg .stage").attr("id") == 0) {
			toast("请选择阶段类型")
		} else if($(".basic_msg .progress").attr("id") == 2) {
			toast("请选择项目进度")
		} else {
			$.ajax({
				type: "post",
				url: host_host_host + "/home/project/EditProject",
				dataType: 'json',
				headers: {
					accept: "usertoken:" + token,
				},
				data: form,
				processData: false,
				contentType: false,
				success: function(data) {
					if(data.status == 1) {
						toast(data.msg)
						setTimeout(function() {
							location.href = "index.html"
						}, 1000)
					} else {
						toast(data.msg)
					}
				},
				error: function(e) {}
			});
		}
	});
	/*子项目录入*/
	$(document).on("click", ".project_data .item_type.fix", function() {

		location.href = "subitem.html"
	})
	$(document).on('click', '.btn2.nor', function() {
		history.back(-1)
	})
})