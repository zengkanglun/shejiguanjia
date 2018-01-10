$(function() {
	/*token*/
	var token = localStorage.getItem("token");
	////////////

	//html结构 添加显示校验信息的dom	
	var validMsg = function() {
		if(!$(this).siblings("span.er").length)
			$(this).parent().append("<span class='er rr'></span>")
		if(!$(this).siblings("span.cor").length)
			$(this).parent().append("<span class='cor rr'></span>")

		var er = $(this).siblings("span.er")
		var cor = $(this).siblings("span.cor")

		return {
			er,
			cor
		}
	} //{}
 
	/***************************/
	//根据权限列表值，显示
	//"authority":"1,2,3,4,5,6,7"
	var renderAuthoInverParam = function(e_id) {
		var data = [];
		var ls = [1, 2, 3, 4, 5, 6, 7]; // data.split(",");
		for(var i in ls) {
			//autho_
			var src = $(e_id + " #autho_" + ls[i]).attr("src");
			if(src == "img/backstage_checkbox_orange.png")
				data.push(ls[i]);

		}
		var serial = data.join();

		return serial;
	}

	//添加用户(nor层)

	var newpF = function() {
        var newP = {};
        newP.username = "" + $("#add_nor #new_username").val();
        newP.password = "" + $("#add_nor #new_password").val();
        newP.nickname = "" + $("#add_nor #new_nickname").val();
        newP.birthday = "" + $("#add_nor #testone").val();
        newP.sex = "" + $("#add_nor #new_sex_list option:selected").val();
        newP.worktime = "" + $("#add_nor #testtwo").val();
        newP.school = "" + $("#add_nor #new_school").val();
        newP.edu = "" + $("#add_nor #new_edu").val();
        newP.edu = $("#add_nor #edu_list").val();
        newP.position = "" + $("#add_nor #new_position_list").val();
        newP.mobile = "" + $("#add_nor #new_mobile").val();
        if(newP.mobile == 1){
            newP.mobile ='';
		}
        newP.qq = "" + $("#add_nor #new_qq").val();

        newP.work_type = "" + $("#add_nor #work_type_list").val();

        var e_id = "#autho_add";
        newP.authority = renderAuthoInverParam(e_id) //"1";
        token = localStorage.getItem("token");
        console.log(newP);
        if (newP.username == '') {
            toast('账号不能为空');
        } else {
            if (newP.password == '') {
                toast('密码不能为空');
            } else {
                if (newP.nickname == '') {
                    toast('姓名不能为空');
                } else {
                    $.ajax({

                        method: 'POST',
                        dataType: 'json',

                        headers: {
                            accept: "usertoken:" + token
                        },
                        url: host_host_host + '/index.php/home/admin/create',
                        data: newP,
                    })
                        .done(function (data) {
                            toast(data.msg);
                            if (data.status == 1) { //success
								location.href = "backstage_general.html";
                            } else {
                            }
                        })
                        .fail(function (data) {
                            toast(data.msg);
                        })
                        .always(function (data) {
                        })
                }
            }
        }



	}

	//渲染到指定 id 元素
	var renderWorkTypeParam = function(data, e_id) {
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

	//
	//获取工种类型 并渲染到指定 id 元素
	var getWorTypeParam = function(e_id) {
		var token = localStorage.getItem("token");
		$.ajax({
				headers: {

					accept: "usertoken:" + token
				},
				type: 'GET',
				dataType: 'json',

				url: host_host_host + '/index.php/home/Public/work_types'

			})
			.done(function(data) {
				 

				renderWorkTypeParam(data.data, e_id);
			})
			.fail(function(data) {
			})
			.always(function(data) {
			})

	}
	getWorTypeParam("#work_type_list"); //渲染工种

	$("#btn_add").on("click", function() {

		newpF(); //create	
	})

})