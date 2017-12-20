<?php
// ini_set('date.timezone','Asia/Shanghai');
// error_reporting(E_ERROR);

require_once "WxPay.Api.php";
require_once 'WxPay.Notify.php';
//use think\Db;

// require_once(dirname(dirname(__FILE__)) . '/Wechat/wxpay_log.php');

// echo dirname(dirname(__FILE__));
//初始化日志
// $logHandler= new CLogFileHandler("../logs/".date('Y-m-d').'.log');
// $log = Log::Init($logHandler, 15);

class PayNotifyCallBack extends WxPayNotify
{

	protected $event_type = null;
	
	public function init_data($eventType = null)
	{
		$this->event_type = $eventType;
		$this->Handle(false);
	}

	//查询订单
	public function Queryorder($transaction_id)
	{
		$input = new WxPayOrderQuery();
		$input->SetTransaction_id($transaction_id);
		$result = WxPayApi::orderQuery($input);
		//Log::DEBUG("query:" . json_encode($result));
		if(array_key_exists("return_code", $result)
			&& array_key_exists("result_code", $result)
			&& $result["return_code"] == "SUCCESS"
			&& $result["result_code"] == "SUCCESS")	//支付成功
		{
			switch ($this->event_type) {
				case 'classcoach':
					D('Admin/Live','Logic')->LivePayBack($result);
					break;
				case 'livepay':
					//直播付费
					D('Admin/Live','Logic')->LivePayBack($result);
					break;
				case 'thankspay':
					//感恩直播付费
					D('Admin/ThanksDefault','Logic')->sendThankBack($result);
					//file_put_contents(__DIR__.'/test.txt', json_encode($event_type).'<br/>',FILE_APPEND);
					break;
				case 'vipbuy':
					//vip支付成功回调
					$result['payType'] = 1;
//                file_put_contents(__DIR__.'/test.txt', json_encode($result).'<br/>',FILE_APPEND);
					D('Admin/Vip','Service')->vipPaySuccess($result);
					break;
				case 'qathankspay':
					//智库 - 感恩支付成功回调
					$result['payType'] = 1;
					D('Admin/TopicOpinion','Service')->qaThanksPaySuccess($result);
					break;
				case 'exam':
					# 考试成为群主付费
					D('Admin/ClassCreateApply','Logic')->call_back($result);
//					file_put_contents(__DIR__.'/examss.txt',json_encode($result));
					break;
				case 'friendlivepay':
					//直播付费
					D('Admin/Live','Logic')->LivePayBack($result);
					break;
				case 'orderpay':
					D('Admin/OrderInfo','Logic')->orderPayBack($result);
					break;
				default:
					break;
			}
			return true;
		}
		return false;
	}

	//重写回调处理函数
	public function NotifyProcess($data, &$msg)
	{
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
//WxSendMsg(1,'oGNSzwet4NnhFQx2LlLc8wswiNeo');exit();
//WxPayConfig::Init();
//begin notify

//$notify = new PayNotifyCallBack();
//$notify->Handle(false);