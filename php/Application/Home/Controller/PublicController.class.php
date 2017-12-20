<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/10/10
 * Time: 20:31
 */
namespace Home\Controller;
use Think\Controller;

/**
 * 公共模块
 * Class PublicController
 * @package Home\Controller
 */
class PublicController extends Controller
{
    /**
     * 登录
     */
    public function login()
    {
        if(IS_POST)
        {
            $post = I('post.');
            $User = M('user');

            $data = $User->where(['username'=>$post['username']])->find();

            if(!$data)
            {
                ajax_error('用户不存在');
            }

            if($data['password'] != md5($post['password']))
            {
                ajax_error('用户不存在');
            }

            $model = M('userToken');

            // 生成token
            $token = md5($_SERVER['REMOTE_ADDR'].$data['id'].time().C('TOKEN_SALT'));

            // 判断该用户是否已有记录
            if($id = $model->where(['user_id'=>$data['id']])->getField('id'))
            {
                // 更新
                $model->where(['id'=>$id])->save(['token'=>$token,'expire_time'=>(time()+604800)]);
            }else{
                // 新增
                $model->add(
                    [
                        'user_id'=>$data['id'],
                        'token'=>$token,
                        'add_time'=>time(),
                        'expire_time'=>(time()+604800)
                    ]
                );
            }

            $User->where(['id'=>$data['id']])->save(['update_time'=>time(),'last_login_ip'=>get_client_ip()]);

            // 返回数据
            $path = strstr($_SERVER['SCRIPT_NAME'],'/index.php',1);
            $new_data = [];
            $port 		= $_SERVER['SERVER_PORT'];
            $scheme   = $port == '443' ? 'https' : 'http';
            $new_data['token']    = $token;
            $new_data['img']      = $scheme.'://'.$_SERVER['SERVER_NAME'].$path.$data['pic'];
            $new_data['username'] = $data['username'];
            $new_data['nickname'] = $data['nickname'];
            $new_data['authority']= $data['authority']; // 所拥有权限
            $new_data['is_super'] = $data['is_super'];  // 是否超级管理员
            $new_data['last_time']= date('Y-m-d',$data['update_time']);
            $new_data['last_ip']  = $data['last_login_ip'];
            $new_data['uid']      = $data['id'];

            //查找最新参与项目
            $new_id = M('project')->order('id desc')->field('id')->select();
            $new_data['project_id'] = $new_id[0]['id'];

            ajax_success('登录成功',$new_data);
        }
    }

    /**
     * 获取工种类型
     */
    public function work_types()
    {
        $data = M('work')->field(['id','name'])->select();

        ajax_success('获取成功',$data);
    }

    /**
     * 获取用户角色类型
     */
    public function role_types()
    {
        $data = M('roleType')->select();

        ajax_success('获取成功',$data);
    }

    /**
     * 注销
     */
    public function logout()
    {}

    /**
     * 选人->一次性返回
     */
    public function choose()
    {
        ajax_error('这个接口已经弃用啦~~~♪(^∇^*)');
        $data = [];

        // 工种
        $types = M('work')->field(['id','name'])->select();
        foreach ($types as $k=>$v)
        {
            $types[$k]['staffs'] = M('user')
                ->where(['work_type'=>$v['id']])
                ->field(['id','nickname'])
                ->select();
        }
        $data['type'] = $types;
        // 项目组
        $all_project = M('project')->field(['id','name'])->select();
        foreach ($all_project as $k=>$v)
        {
            $child = M('projectChild')->where(['project_id'=>$v['id']])->getField('group_concat(id)');
            if($child)
            {
                $types = M('projectChildWorkType')
                    ->where(['project_child_id'=>['in',$child]])
                    ->getField('group_concat(user_id)');
                $users = M('staff')
                    ->where(['project_child_id'=>$v['id']])
                    ->getField('group_concat(user_id)');
            }

            $user_id = $types.$users;

            $all_project[$k]['staff'] = M('user')
                ->where(['id'=>['in',$user_id]])
                ->field(['id','nickname'])
                ->select();
        }
        $data['project'] = $all_project;
        // 全部
        $data['all'] = M('user')
            ->where(['administer'=>0,'is_del'=>0])
            ->field(['id','nickname'])
            ->select();


        ajax_success('获取成功',$data);
    }

    public function correlation_projects()
    {
        $data = M('project')->field(['id','name'])->select();
        ajax_success('获取成功',$data);
    }

    public function p_search(){
        $project_name = I('post.name');
        $data['name'] = array('like',"%$project_name%");
        $res = M('project')->where($data)->select();
        if($res){
            for ($i=0; $i<count($res); $i++){
                $user = M('user')->where(array('id'=> $res[$i]['director_id']))->find();
                $res[$i]['direct_name'] = $user['nickname'];
                $res[$i]['add_time'] = date('Y-m-d',$res[$i]['add_time']);
            }
            ajax_success('成功',$res);
            //ajax_success('',$user);
        }else{
            ajax_error('不存在相关项目');
        }
    }
//    public function test()
//    {
//    	$data = array(
//	    array('用户名', '性别', '出生年月', '加入日期','歌曲'), //title
//	    array('测试名字1',   '男',   '1993-09-10',   '2010-10-10',	'七里香'),//datas
//	    array('测试名字2',   '女',   '1993-09-10',   '2010-10-10',	'七里香'),
//	    array('测试名字3',   '女',   '1993-09-10',   '2010-10-10',	'七里香'),
//	    array('测试名字4',   '男',   '1993-09-10',   '2010-10-10',	'七里香'),
//	   );
//
//    	export($data,'用户');
//		}
}