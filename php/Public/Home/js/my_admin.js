/**
 * 退出登录
 */
function logout()
{
    layer.confirm('确定退出吗?',{
        yes:function () {
            location.href='/index.php/Home/Public/logout';
        }
    });
}

function check_pwd(pwd)
{
    if(/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/.test(pwd))
        return true;

    return false;
}

function create_user()
{
	var temp = $(".newUsers .second .Sbody span[data-type='checked']");
	var leng = temp.length;
	// console.log(temp.length);
	var roles = '';
	for (var i = 0; i < leng; i++) {
		roles += $(temp[i]).attr('data-id')+',';
	}

	var formdata = new FormData($("#create_user")[0]);
	formdata.append('role',roles);
	    $.ajax({
        url: '/Admin/User/create' ,
        type: 'POST',
        data: formdata,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (returndata) {
            if(returndata.status)
            {
                layer.msg('添加成功');
                // location.reload();
            }else{
                layer.msg(returndata.msg);
                // location.reload();
            }
        },
        error: function (returndata) {
            // alert(returndata);
        }
    });
}