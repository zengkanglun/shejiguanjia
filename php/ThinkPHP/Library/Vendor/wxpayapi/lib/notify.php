<?php
//ini_set('date.timezone','Asia/Shanghai');
//error_reporting(E_ERROR);

require_once "WxPay.Api.php";
require_once 'WxPay.Notify.php';
use think\Db;
//初始化日志
//$logHandler= new CLogFileHandler("../logs/".date('Y-m-d').'.log');
//$log = Log::Init($logHandler, 15);

class PayNotifyCallBack extends WxPayNotify
{
	//查询订单
	public function Queryorder($transaction_id)
	{
		$input = new WxPayOrderQuery();
		$input->SetTransaction_id($transaction_id);
		$result = WxPayApi::orderQuery($input);
//		Log::DEBUG("query:" . json_encode($result));
		if(array_key_exists("return_code", $result)
			&& array_key_exists("result_code", $result)
			&& $result["return_code"] == "SUCCESS"
			&& $result["result_code"] == "SUCCESS")
		{

			//更新订单
			$updateArr = array();
			$updateArr['pay_status'] = 3;
			$updateArr['order_status'] = 3;
			$updateArr['notify_order_no'] = $result['transaction_id'];
			$updateArr['pay_time'] = time();

			$res = Db::table('a_order')->where('order_sn',$result['out_trade_no'])->update($updateArr);
			if ($res)
			{
				$order = Db::name('a_order')->where('order_sn',$result['out_trade_no'])->find();

				$addrArr = array();
				$addrArr['school_id'] = $order['school_id'];
				$addrArr['addr_id'] = $order['addr_id'];
				$adminInfo = Db::name('a_admin_bing')->where($addrArr)->find();

				if (count($adminInfo)==0)
				{
					$adminId = 0;
				}
				else
				{
					$adminId = $adminInfo['u_id'];
				}

				//新建模板记录
				$msgDta = array();
				$msgDta['order_id'] = $order['id'];
				$msgDta['order_sn'] = $result['out_trade_no'];
				$msgDta['wx_transaction_id'] = $result['transaction_id'];
				$msgDta['u_id'] = $order['user_id'];
				$msgDta['u_openid'] = $result['openid'];
				$msgDta['admin_u_id'] = $adminId;
				$msgDta['send_status'] = 0;
				$msgDta['create_time'] = time();

				Db::name('a_wx_send')->insert($msgDta);

				//删除购物车数据
				$cartDelRes = Db::table('a_cart')->where('u_openid',$result['openid'])->delete();
				if($cartDelRes)
				{
					return true;
				}
			}
		}
		return false;
	}
	
	//重写回调处理函数
	public function NotifyProcess($data, &$msg)
	{
//		Log::DEBUG("call back:" . json_encode($data));
		$notfiyOutput = array();
		
		if(!array_key_exists("transaction_id", $data)){
			$msg = "输入参数不正确";
			return false;
		}
		//查询订单，判断订单真实性
		if(!$this->Queryorder($data["transaction_id"])){
			$msg = "订单查询失败";
			return false;
		}
		return true;
	}
}

//Log::DEBUG("begin notify");
$notify = new PayNotifyCallBack();
$notify->Handle(false);
