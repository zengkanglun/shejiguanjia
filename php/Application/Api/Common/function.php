<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017-4-20 0020
 * Time: 11:01
 */


/*
 * 生成user_id的token,并存入数据表
 *
 *  $user_id    int   用户的id
 */

function encryptUserId($user_id = 0)
{

    $UserTokenModel=D('Admin/ModelImport','Event')->UserTokenModel;
    $expired_day = gentExpiredDay();//过期时间为一天


    $token = md5('LIFE'.rand().time());
    $expired_time  =time()+$expired_day*24*60*60;

    $data= array();//组装数据
    $data['user_id'] = $user_id;
    $data['token'] = $token;
    $data['expired_time'] = $expired_time;

    $UserTokenModel->create($data);
    $res = $UserTokenModel->add();

    return $token;
}

/*
 * 更新用户的token
 *
 * $user_id    int     用户id
 */
function updateUserIdToken($user_id = 0)
{

    $UserTokenModel=D('Admin/ModelImport','Event')->UserTokenModel;
    $token = md5('LIFE'.rand().time());
    $expired_day = gentExpiredDay();
    $expired_time  =time()+$expired_day*24*60*60;
    $res = $UserTokenModel->where(array('user_id'=>$user_id))->save(array('token'=>$token,'expired_time'=>$expired_time,'add_time'=>time()));
    return $token;

}

/*
 * 获取用户的token
 * $user_id     int    用户id
 *
 */
function getTokenByUserId($user_id = 0)
{
    $UserTokenModel=D('Admin/ModelImport','Event')->UserTokenModel;

    $user = $UserTokenModel->getByUserId($user_id);

    if (count($user)>0)
    {
        //更新token
        $token = updateUserIdToken($user['user_id']);
        return $token;
    }
    else
    {
        //不存在就直接新增
        $token = encryptUserId($user_id);
        return $token;
    }


}

/*
 * 获取用户的token
 * $user_id     int    用户id
 *
 */
function getTokenByUserId_getUInfo($user_id = 0)
{
    $UserTokenModel=D('Admin/ModelImport','Event')->UserTokenModel;

    $user = $UserTokenModel->getByUserId($user_id);

    if (count($user)>0)
    {
        //更新token
        return $user['token'];
    }
    else
    {
        //不存在就直接新增
        $token = encryptUserId($user_id);
        return $token;
    }

}

/*
 * 通过token获取user_id
 *
 * $token   string   user_id对应的令牌
 *
 */
function getUserIdByToken($token , $data = array())
{

    $UserTokenModel=D('Admin/ModelImport','Event')->UserTokenModel;

    $user = $UserTokenModel->getBytoken($token);

    if (count($user)>0)
    {

        //判断时间是否有过期
        if ($user['expired_time'] > time())
        {
            return $user['user_id'];
        }
        else
        {
            $returnRes = array();
            $returnRes['status'] = state_fail();
            $returnRes['msg'] = '登录已过期,请重新登录';
            $returnRes['data'] = $data;

            commonAjaxReturn($returnRes);
        }

    }
    else
    {
        $returnRes = array();
        $returnRes['status'] = state_fail();
        $returnRes['msg'] = '用户不存在';
        $returnRes['data'] = $data;

        commonAjaxReturn($returnRes);
    }
}

/**
 * 得到新订单号
 * @return  string
 */
function getOrderSn()
{
    /* 选择一个随机的方案 */
    mt_srand((double) microtime() * 1000000);

    return date('Ymd') . str_pad(mt_rand(1, 99999), 5, '0', STR_PAD_LEFT);
}
function  getoutTradeNo()
{
    /* 选择一个随机的方案 */
    mt_srand((double) microtime() * 10000000);

    return date('Ymdhis') . str_pad(mt_rand(1, 9999999), 18, '0', STR_PAD_LEFT);
}
/**
 * 得到新的学生学号
 * @return  string
 */
function getStudentID($user_id)
{
    /* 选择一个随机的方案 */
    mt_srand((double) microtime() * 1000000);
    return str_pad(mt_rand(1, 99999), 5, '0', STR_PAD_LEFT).$user_id.rand(10,99);
}


/*
 * 代替ajaxreturn方法
 *
 */
function commonAjaxReturn($returnRes)
{
    // 返回JSON数据格式到客户端 包含状态信息
    header('Content-Type:application/json; charset=utf-8');
    exit(json_encode($returnRes));
}

/*
 * user_id 的token过期时间
 *
 */
function gentExpiredDay()
{
    //token默认7天过期时间
    return 7;
}


/*
 * 根据头像img字段内容组装各种尺寸的路径
 *
 */
function combinUserImgPath($img , $type,$name='')
{
    $path = C("img_save.save_path");
    $res = array();
    if($name!=''){
        //单尺寸取出
        if(empty($img)){
            $res=$type=="app_user_head_img"?'/Uploads/default/app_user_head_img/b.png':'';
        }else{
            $res=substr($path[$type][$name],1).$img;
        }
        return $res;
    }
    foreach ($path[$type] as $k => $v)
    {
        if(empty($img))
        {
            $res[$k] = '/Uploads/default/app_user_head_img/b.png';
        }
        else
        {

            $res[$k] = substr($v,1).$img;
        }

    }

    return $res;
}

/*
 * 成功状态值
 */
function state_success()
{
    return 1;
}
/*
 * 失败状态值
 */
function state_fail()
{
    return 0;
}
/*
 * 失败状态值
 */
function state_none()
{
    return 2;
}

/*
 * app 分页 / 每页记录数量
 */
function perPageNum()
{
    return 20;
}

/**
 * 转换上传文件数组变量为正确的方式
 * @access private
 * @param array $files  上传的文件变量
 * @return array
 */
function dealFiles($files)
{
    $fileArray = array();
    $n         = 0;
    foreach ($files as $key => $file) {
        if (is_array($file['name'])) {
            $keys  = array_keys($file);
            $count = count($file['name']);
            for ($i = 0; $i < $count; $i++) {
//                $fileArray[$n][$key] = $key;
                foreach ($keys as $_key) {
                    $fileArray[$n][$key][$_key] = $file[$_key][$i];
                }
                $n++;
            }
        } else {
            $fileArray = $files;
            break;
        }
    }
    return $fileArray;
}

/*
 * array_column()函数兼容低版本
 */
function i_array_column($input, $columnKey, $indexKey=null){
    if(!function_exists('array_column')){
        $columnKeyIsNumber  = (is_numeric($columnKey))?true:false;
        $indexKeyIsNull            = (is_null($indexKey))?true :false;
        $indexKeyIsNumber     = (is_numeric($indexKey))?true:false;
        $result                         = array();
        foreach((array)$input as $key=>$row){
            if($columnKeyIsNumber){
                $tmp= array_slice($row, $columnKey, 1);
                $tmp= (is_array($tmp) && !empty($tmp))?current($tmp):null;
            }else{
                $tmp= isset($row[$columnKey])?$row[$columnKey]:$row;
            }
            if(!$indexKeyIsNull){
                if($indexKeyIsNumber){
                    $key = array_slice($row, $indexKey, 1);
                    $key = (is_array($key) && !empty($key))?current($key):null;
                    $key = is_null($key)?0:$key;
                }else{
                    $key = isset($row[$indexKey])?$row[$indexKey]:0;
                }
            }
            $result[$key] = $tmp;
        }
        return $result;
    }else{
        return array_column($input, $columnKey, $indexKey);
    }
}

/*
 * 生成8位随机密码
 */
function getRandomPwd()
{
    return substr(md5(time().rand(0,9999)),0,8);
}