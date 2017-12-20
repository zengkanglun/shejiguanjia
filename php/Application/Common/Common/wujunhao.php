<?php
function randStr($m= 5) {
	$new_str= '';
	$str= '0123456789'.time();
	for($i= 1; $i<= $m; ++$i) {
		$new_str.=$str[mt_rand(0, strlen($str))];
	}
	return intval($new_str);
}
function role_type($type){
	//转换成角色名字
	$name="";
	switch ($type) {
		case 2:$name="老师";break;
		case 3:$name="义工";break;
		case 4:$name="班主任";break;
		case 5:$name="组长";break;
		default:$name="普通会员";break;
	}
	return $name;
}
function get_where_val($options=array()){
	$where=[];
    foreach($options as $k=>$v){
        if($k=="order" || $k=="limit" || $k=="page" || $k=="pageNum" || $k=="field"){continue;}
        $where[]=[$k=>$v];
    }
    return $where;
}
function array_return(){
	return array('status'=>1,'msg'=>'success','data'=>(object)array());
}
function getUserPhone($id){
	$member=D("Admin/member")->where(['id'=>$id])->getField('phone');
	return $member;
}
function getLiveId($code){
	$id=D("Admin/Live")->where(['live_code'=>$code])->getField('id');
	return $id;
}
function CC($name="",$value=""){
	//配置项读取或修改
	$array_return=true;
	if($value!=""){
		D("Admin/SystemConfig")->where(['name'=>$name])->save(['value'=>$value]);
		$array_return=$value;
	}else{
		$array_return=D("Admin/SystemConfig")->where(['name'=>$name])->getField('value');
	}
	return $array_return;
}
function getRandId($id){
    /* 选择一个随机的方案 */
    mt_srand((double) microtime() * 1000000);
    return str_pad(mt_rand(1, 99999), 5, '0', STR_PAD_LEFT).$id.rand(10,99);
}
function setClassQGcode($class_id){
	//生成班级二维码
	$_host='http://'.$_SERVER['SERVER_NAME'];
    $url=$_host."?class_id=".$class_id;
    $savePath="./Uploads/classQgCode/";
    $saveName=date("YmdHis").$class_id.".png";
    if(!is_dir($savePath)){
        mkdir($savePath,0777,true);
    }
    qrcode($url,6,$savePath.$saveName);
    D("Admin/ClassManage")->where(['id'=>$class_id])->save(['qgcode'=>substr($savePath.$saveName, 1)]);
}

function build_order_no(){
    $yCode = array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J');
	$orderSn = $yCode[intval(date('Y')) - 2011] . strtoupper(dechex(date('m'))) . date('d') . substr(time(), -5) . substr(microtime(), 2, 5) . sprintf('%02d', rand(0, 99));
    return $orderSn;
}
function is_array_val($array=array(),$keyname="",$val=""){
	$bool=0;
	
	foreach ($array as $key => $value) {

		if($value[$keyname]==$val){
			$bool=1;
		}
	}
	return $bool;
}
function getAttrInfo($goods_attr_ids){
	$attr_list=D("Admin/GoodsAttr")->where(array('id'=>array('in',$goods_attr_ids)))->select();
	$spec_text=[];
	foreach ($attr_list as $kk => $vv) {
	    $spec=D('Admin/GoodsSpec')->where(['id'=>$vv['spec_id']])->find();
	    $spec_text[]=$spec['spec_name'].":".$vv['attr_name'];
	}
	return implode($spec_text, ',');
}
function half_replace($str){
    $len = strlen($str)/2;
    return substr_replace($str,str_repeat('*',$len),floor(($len)/2),$len);
}
?>