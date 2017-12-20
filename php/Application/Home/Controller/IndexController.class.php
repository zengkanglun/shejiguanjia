<?php
namespace Home\Controller;

class IndexController extends CommonController 
{
	public function index()
	{
        echo 'this is home';
	}

    /**
     * 解锁屏幕
     */
	public function unlock()
    {
        if(IS_POST)
        {
            $password = I('post.password');

            if(md5($password) != M('user')->where(['id'=>$this->user_id])->getField('password'))
            {
                ajax_error('密码错误');
            }

            $model = M('lockStatus');
            $model->where(['uid'=>$this->user_id])->save(['status'=>1]);
            ajax_success('解锁成功');
        }
    }
}