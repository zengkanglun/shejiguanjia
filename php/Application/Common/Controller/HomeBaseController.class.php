<?php
namespace Common\Controller;
use Think\Controller;

class HomeBaseController extends Controller
{
    public $user_id;
    public $is_super;
    public $nickname;
    public $authority;
	public function _initialize()
	{
//        if(strtolower(ACTION_NAME) != 'download')
        if(!in_array(strtolower(ACTION_NAME),['download','export_task','managers_export','users_export','export_task','income_export','overhead_export','jiti_export','admin_overhead_export','total_export','project_export_doing','performance_export']))
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
            $res = M('user')->where(['id'=>$user_data['user_id']])->find();
            // 记录当前登录用户ID
            $this->user_id = $user_data['user_id'];
            $this->is_super = $res['is_super'];
            $this->nickname = $res['nickname'];
            $this->authority = $res['authority'];
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