<?php
namespace Common\Controller;
use Think\Controller;

class HomeBaseController extends Controller
{
    public $user_id;
	public function _initialize()
	{
        if(strtolower(ACTION_NAME) != 'download')
		{
            // 获取token
            $token = $_SERVER['HTTP_ACCEPT'];
            $token = explode(':',$token);
            $token = $token[1];

            if(!$token)
            {
                ajax_error('尚未登录,请先登录');
            }
            // 验证token
            $model = M('userToken');
            $user_data = $model->where(['token'=>$token])->field(['user_id','expire_time'])->find();
            if(!$user_data || time() > $user_data['expire_time'])
            {
               ajax_error('Token无效或已过期',[],5);
            }
            $nickname = M('user')->where(['id'=>$user_data['user_id']])->getField('nickname');
            // 记录当前登录用户ID
            $this->user_id = $user_data['user_id'];
            $this->nickname = $nickname;
        }
	}

    /**
     * @param $info
     * @param $type 1/项目信息 2/过程管理 3/任务 4/通知 5/用户 6/管理 7/财务 8/后台
     */
	public function log($info,$type)
    {
        M('actionLog')->add(['user_id'=>$this->user_id,'log_info'=>$info,'log_ip'=>get_client_ip(),'add_time'=>time(),'log_type'=>$type]);
    }
}