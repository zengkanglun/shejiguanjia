<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/10/10
 * Time: 20:28
 */
namespace Home\Controller;
use Think\Controller;
use Think\Page;

/**
 * 用户模块
 * Class UserController
 * @package Home\Controller
 */
class UserController extends CommonController
{
    public function user_info()
    {
        if(!$this->user_id)
        {
            ajax_error('尚未登录');
        }

        $data = M('user')->where(['id'=>$this->user_id])->field([
            'nickname',
            'username',
            'sex',
            'birthday',
            'worktime',
            'school',
            'edu',
            'position',
            'work_type',
            'mobile',
            'qq'
        ])->find();


        $data['edu_id'] = $data['edu'];
        $data['edu'] = getEdu($data['edu']);
				$data['work_type_id'] = $data['work_type'];
        $data['work_type'] = M('work')->where(['id'=>$data['work_type']])->getField('name');
        $data['sex_id'] = $data['sex'];
        switch ($data['sex'])
        {
            case 0:
                $gender = '保密';
                break;
            case 1:
                $gender = '男';
                break;
            case 2:
                $gender = '女';
                break;
        }
        $data['sex'] = $gender;

        ajax_success('获取成功',$data);
    }

    /**
     * 更改密码
     */
    public function change_pwd()
    {
        $post = I('post.');

        if(!$this->user_id)
        {
            ajax_error('尚未登录');
        }
        $old_pwd = M('user')->where(['id'=>$this->user_id])->getField('password');

        if($old_pwd != md5($post['old_pwd']))
        {
            ajax_error('密码不正确');
        }

        if($post['new_pwd'] != $post['verify_pwd'])
        {
            ajax_error('两次密码不正确');
        }

        if(M('user')->where(['id'=>$this->user_id])->save(['password'=>md5($post['new_pwd'])]))
        {
            $this->log("修改了自己的密码",5);
            ajax_success('更新成功');
        }

        ajax_error('更新失败');
    }

    /**
     * 更改密码时获取姓名和账号
     */
    public function get_nickname()
    {
        if(!$this->user_id)
        {
            ajax_error('尚未登录');
        }
        $data = M('user')->where(['id'=>$this->user_id])->field(['nickname','username'])->find();
        if(!$data)
        {
            ajax_error('用户不存在');
        }

        ajax_success('获取成功',$data);
    }

    /**
     * 编辑个人资料
     */
    public function edit()
    {
        if(IS_POST)
        {
            $post = I('post.');
            $model = D('user');

            if($post = $model->create($post))
            {
                unset($post['password']);
                $temp_uid = $model->where(['username'=>$post['username']])->getField('id');
                if($temp_uid && $temp_uid != $this->user_id)
                {
                    ajax_error('账号不得重复');
                }
                if($model->where(['id'=>$this->user_id])->save($post))
                {
                    $this->log("修改了自己的资料",5);
                    ajax_success('修改成功');
                }
            }
                ajax_error("修改失败");
            


        }
    }

    /**
     * 回收站
     */
    public function recycled()
    {
        if(!$this->user_id)
        {
            ajax_error('尚未登录');
        }

        $type  = I('get.type',0);
        $model = D('recycled');
        $data  = [];
        $where = [];


        $where['user_id'] = $this->user_id;
        switch ($type)
        {
            case 1:
                // 过程记录
                // 过程纪要
                // 出图出差
                // 发函管理
                // 图纸归档
                $where['kind'] = 1;
                break;
            case 2:
                // 任务
                // 历史任务
                // 创建任务
                $where['kind'] = 2;
                break;
            case 3:
                // 通知
                // 新通知
                // 已读通知
                // 已回复通知
                // 创建通知
                $where['kind'] = 3;
                break;
            default:
                ajax_error('参数错误');
        }

        $count = $model->where($where)->count();
        $page  = new Page($count,5);
        $data['page'] = ceil($count/5);
        $data['count'] = $count;
        $data['data'] = $model->where($where)->limit($page->firstRow.','.$page->listRows)->select();
//dump($data['data']);
        foreach ($data['data'] as $k=>$v)
        {
            switch ($v['kind'])
            {
                case 1:
                    // 过程管理
                    // 过程纪要 1
                    // 出图出差 2
                    // 发函管理 3
                    // 图纸归档 4
                    switch ($v['type'])
                    {
                        case 1:
                            $model = M('process');
                            $data['data'][$k]['add_time'] = date('Y-m-d',$model->where(['id'=>$v['pid']])->getField('add_time'));
                            $data['data'][$k]['del_time'] = date('Y-m-d',$v['del_time']);
                            $data['data'][$k]['type_name'] = $model->alias('a')->join('__PROCESS_TYPE__ b on a.type=b.id')->where(['a.id'=>$v['pid']])->getField('b.name');
                            $data['data'][$k]['content'] = $model->where(['id'=>$v['pid']])->getField('content');
                            $data['data'][$k]['label'] = '过程纪要';
                            break;
                        case 2:
                            $model = M('picture');
                            $data['data'][$k]['add_time'] = date('Y-m-d',$model->where(['id'=>$v['pid']])->getField('add_time'));
                            $data['data'][$k]['del_time'] = date('Y-m-d',$v['del_time']);
                            $data['data'][$k]['type_name'] = $model->alias('a')->join('__CHUCHAI_TYPE__ b on a.type=b.id')->where(['a.id'=>$v['pid']])->getField('b.name');
                            $data['data'][$k]['content'] = $model->where(['id'=>$v['pid']])->getField('content');
                            $data['data'][$k]['label'] = '出图出差';

                            break;
                        case 3:
                            $model = M('letter');
                            $data['data'][$k]['add_time'] = date('Y-m-d',$model->where(['id'=>$v['pid']])->getField('add_time'));
                            $data['data'][$k]['del_time'] = date('Y-m-d',$v['del_time']);
                            $data['data'][$k]['type_name'] = $model->alias('a')->join('__LETTER_TYPE__ b on a.type=b.id')->where(['a.id'=>$v['pid']])->getField('b.name');
                            $data['data'][$k]['content'] = $model->where(['id'=>$v['pid']])->getField('content');
                            $data['data'][$k]['label'] = '发函管理';

                            break;
                        case 4:
                            $model = M('letter');
                            $data['data'][$k]['add_time'] = date('Y-m-d',$model->where(['id'=>$v['pid']])->getField('add_time'));
                            $data['data'][$k]['del_time'] = date('Y-m-d',$v['del_time']);
                            $data['data'][$k]['type_name'] = $model->alias('a')->join('__ARCHIVE_TYPE__ b on a.type=b.id')->where(['a.id'=>$v['pid']])->getField('b.name');
                            $data['data'][$k]['content'] = $model->where(['id'=>$v['pid']])->getField('content');
                            $data['data'][$k]['label'] = '图纸归档';

                            break;
                    }
                    break;
                case 2:
                    // 任务
                    // 历史任务 3
                    // 创建任务 4
                    switch ($v['type'])
                    {
                        case 3:
                            $model = M('taskReceive');
                            $data['data'][$k]['add_time'] = date('Y-m-d',$model->where(['id'=>$v['pid']])->getField('addtime'));
                            $data['data'][$k]['del_time'] = date('Y-m-d',$v['del_time']);
                            $pid = $model->where(['id'=>$v['pid']])->getField('pid');
                            $data['data'][$k]['content'] = M('task')->where(['id'=>$pid])->getField('title');
                            $data['data'][$k]['type_name']    = M('task')->alias('a')->join('__TASK_TYPE__ b on a.type=b.id')->where(['a.id'=>$pid])->getField('b.name');
                            $data['data'][$k]['label'] = '历史任务';
                            break;
                        case 4:
                            $model = M('task');
                            $data['data'][$k]['add_time'] = date('Y-m-d',$model->where(['id'=>$v['pid']])->getField('add_time'));
                            $data['data'][$k]['del_time'] = date('Y-m-d',$v['del_time']);
                            $data['data'][$k]['type_name'] = $model->alias('a')->join('__TASK_TYPE__ b on a.type=b.id')->where(['a.id'=>$v['pid']])->getField('b.name');
                            $data['data'][$k]['content'] = $model->where(['id'=>$v['pid']])->getField('title');
                            $data['data'][$k]['label'] = '创建任务';
                            break;
                    }
                    break;
                case 3:
                    // 通知
                    // 未接通知 1
                    // 已读通知 2
                    // 回复通知 3
                    // 创建通知 4
                    switch ($v['type'])
                    {
                        case 1:
                            $model = M('noticeReceive');
                            $data['data'][$k]['add_time'] = date('Y-m-d',$model->where(['id'=>$v['pid']])->getField('addtime'));
                            $data['data'][$k]['del_time'] = date('Y-m-d',$v['del_time']);
                            $pid = $model->where(['id'=>$v['pid']])->getField('pid');
                            $data['data'][$k]['content']  = M('notice')->where(['id'=>$pid])->getField('title');
                            $data['data'][$k]['type_name']     = M('notice')->alias('a')->join('__NOTICE_TYPE__ b on a.type=b.id')->where(['a.id'=>$pid])->getField('b.name');
                            $data['data'][$k]['label']    = '未读通知';
                            break;
                        case 2:
                            $model = M('noticeReceive');
                            $data['data'][$k]['add_time'] = date('Y-m-d',$model->where(['id'=>$v['pid']])->getField('addtime'));
                            $data['data'][$k]['del_time'] = date('Y-m-d',$v['del_time']);
                            $pid = $model->where(['id'=>$v['pid']])->getField('pid');
                            $data['data'][$k]['content']  = M('notice')->where(['id'=>$pid])->getField('title');
                            $data['data'][$k]['type_name']     = M('notice')->alias('a')->join('__NOTICE_TYPE__ b on a.type=b.id')->where(['a.id'=>$pid])->getField('b.name');
                            $data['data'][$k]['label']    = '已读通知';
                            break;
                        case 3:
                            $model = M('noticeReceive');
                            $data['data'][$k]['add_time'] = date('Y-m-d',$model->where(['id'=>$v['pid']])->getField('addtime'));
                            $data['data'][$k]['del_time'] = date('Y-m-d',$v['del_time']);
                            $pid = $model->where(['id'=>$v['pid']])->getField('pid');
                            $data['data'][$k]['content']  = M('notice')->where(['id'=>$pid])->getField('title');
                            $data['data'][$k]['type_name']     = M('notice')->alias('a')->join('__NOTICE_TYPE__ b on a.type=b.id')->where(['a.id'=>$pid])->getField('b.name');
                            $data['data'][$k]['label']    = '回复通知';

                            break;
                        case 4:
                            $model = M('notice');
                            $data['data'][$k]['add_time'] = date('Y-m-d',$model->where(['id'=>$v['pid']])->getField('addtime'));
                            $data['data'][$k]['del_time'] = date('Y-m-d',$v['del_time']);
                            $data['data'][$k]['content']  = $model->where(['id'=>$v['pid']])->getField('title');
                            $data['data'][$k]['type_name']     = M('notice')->alias('a')->join('__NOTICE_TYPE__ b on a.type=b.id')->where(['a.id'=>$v['pid']])->getField('b.name');
                            $data['data'][$k]['label']    = '创建通知';
                            break;
                    }
                    break;
            }
        }
//dump($data['data']);exit;
foreach($data['data'] as $k=>$v)
{
    if(!$v['type_name'])
    {
        $data['data'][$k]['type_name'] = '';
    }
    if(!$v['content'])
    {
        $data['data'][$k]['content'] = '';
    }
}
        ajax_success('获取成功',$data);
    }

    /**
     * 彻底删除回收站数据
     */
    public function del_recycled()
    {
        $id = I('get.id',0,'intval');
        $data = M('recycled')->where(['id'=>$id])->field(['pid','kind','type','user_id'])->find();
        if(!$data)
        {
            ajax_error('数据不存在');
        }

        if($data['user_id'] != $this->user_id)
        {
            ajax_error('不属于你的回收站记录');
        }

        switch ($data['kind'])
        {
            case 1:
                // 过程记录
                // 1.过程纪要
                // 2.出图出差
                // 3.发函管理
                // 4.图纸归档
                switch ($data['type'])
                {
                    case 1:
                        $model = M('process');
                        $content = $model->where(['id'=>$data['pid']])->getField('content');
                        $this->log("在回收站删除了一条过程纪要,内容为{$content}",5);
                        break;
                    case 2:
                        $model = M('picture');
                        $content = $model->where(['id'=>$data['pid']])->getField('content');
                        $this->log("在回收站删除了一条出图出差,内容为{$content}",5);
                        break;
                    case 3:
                    case 4:
                        $model = M('letter');
                        $content = $model->where(['id'=>$data['pid']])->getField('content');
                        $this->log("在回收站删除了一条发函管理/图纸归档,内容为{$content}",5);
                        break;
                }
                break;
            case 2:
                // 任务管理
                // 1.未接任务
                // 2.进行中任务
                // 3.历史任务
                // 4.创建任务
                switch ($data['type'])
                {
                    case 1:
                    case 2:
                    case 3:
                        $model = M('taskReceive');
                        $pid   = $model->where(['id'=>$data['pid']])->getField('pid');
                        $title = M('task')->where(['id'=>$pid])->getField('title');
                        $this->log("在回收站删除了一条任务,标题为{$title}",5);
                        break;
                    case 4:
                        $model = M('task');
                        $title = $model->where(['id'=>$data['pid']])->getField('title');
                        $this->log("在回收站删除了一条自己的任务,标题为{$title}",5);
                        break;
                }
                break;
            case 3:
                // 通知管理
                // 1.未读通知
                // 2.已读通知
                // 3.已回复通知
                // 4.创建通知
                switch ($data['type'])
                {
                    case 1:
                    case 2:
                    case 3:
                        $model = M('noticeReceive');
                        $pid   = $model->where(['id'=>$data['pid']])->getField('pid');
                        $title = M('notice')->where(['id'=>$pid])->getField('title');
                        $this->log("在回收站删除了一条通知,标题为{$title}",5);
                        break;
                    case 4:
                        $model = M('notice');
                        $title = $model->where(['id'=>$data['pid']])->getField('title');
                        $this->log("在回收站删除了一条自己的通知,标题为{$title}",5);
                        break;
                }
                break;
        }
        if($model->where(['id'=>$data['pid']])->delete())
        {
            M('recycled')->where(['id'=>$id])->delete();
            ajax_success('删除成功');
        }
        ajax_error('删除失败');
    }

    /**
     * 恢复回收站数据
     */
    public function recover_recycled()
    {
        $id = I('get.id');
        $data = M('recycled')->where(['id'=>$id])->field(['pid','kind','type','user_id'])->find();
        if(!$data)
        {
            ajax_error('数据不存在');
        }

        if($data['user_id'] != $this->user_id)
        {
            ajax_error('不属于你的回收站记录');
        }

        switch ($data['kind'])
        {
            case 1:
                // 过程记录
                // 1.过程纪要
                // 2.出图出差
                // 3.发函管理
                // 4.图纸归档
                switch ($data['type'])
                {
                    case 1:
                        $model = M('process');
                        $type  = 0;
                        $content = $model->where(['id'=>$data['pid']])->getField('content');
                        $this->log("在回收站恢复了一条过程纪要,内容为{$content}",5);
                        break;
                    case 2:
                        $model = M('picture');
                        $type  = 0;
                        $content = $model->where(['id'=>$data['pid']])->getField('content');
                        $this->log("在回收站恢复了一条出图出差,内容为{$content}",5);
                        break;
                    case 3:
                    case 4:
                        $model = M('letter');
                        $type  = 0;
                        $content = $model->where(['id'=>$data['pid']])->getField('content');
                        $this->log("在回收站恢复了一条发函管理/图纸归档,内容为{$content}",5);
                        break;
                }
                break;
            case 2:
                // 任务管理
                // 1.未接任务
                // 2.进行中任务
                // 3.历史任务
                // 4.创建任务
                switch ($data['type'])
                {
                    case 1:
                        $model = M('taskReceive');
                        $type  = 1;
                        $pid   = $model->where(['id'=>$data['pid']])->getField('pid');
                        $title = M('task')->where(['id'=>$pid])->getField('title');
                        $this->log("在回收站恢复了一条任务,标题为{$title}",5);
                        break;
                    case 2:
                        $model = M('taskReceive');
                        $type  = 2;
                        $pid   = $model->where(['id'=>$data['pid']])->getField('pid');
                        $title = M('task')->where(['id'=>$pid])->getField('title');
                        $this->log("在回收站恢复了一条任务,标题为{$title}",5);
                    break;
                    case 3:
                        $model = M('taskReceive');
                        $type  = 5;
                        $pid   = $model->where(['id'=>$data['pid']])->getField('pid');
                        $title = M('task')->where(['id'=>$pid])->getField('title');
                        $this->log("在回收站恢复了一条任务,标题为{$title}",5);
                        break;
                    case 4:
                        $model = M('task');
                        $type  = 0;
                        $title = $model->where(['id'=>$data['pid']])->getField('title');
                        $this->log("在回收站恢复了一条自己的任务,标题为{$title}",5);
                        break;
                }
                break;
            case 3:
                // 通知管理
                // 1.未读通知
                // 2.已读通知
                // 3.已回复通知
                // 4.创建通知
                switch ($data['type'])
                {
                    case 1:
                        $model = M('noticeReceive');
                        $type  = 1;
                        $pid   = $model->where(['id'=>$data['pid']])->getField('pid');
                        $title = M('notice')->where(['id'=>$pid])->getField('title');
                        $this->log("在回收站恢复了一条通知,标题为{$title}",5);
                        break;
                    case 2:
                        $model = M('noticeReceive');
                        $type  = 2;
                        $pid   = $model->where(['id'=>$data['pid']])->getField('pid');
                        $title = M('notice')->where(['id'=>$pid])->getField('title');
                        $this->log("在回收站恢复了一条通知,标题为{$title}",5);
                        break;
                    case 3:
                        $model = M('noticeReceive');
                        $type  = 3;
                        $pid   = $model->where(['id'=>$data['pid']])->getField('pid');
                        $title = M('notice')->where(['id'=>$pid])->getField('title');
                        $this->log("在回收站恢复了一条通知,标题为{$title}",5);
                        break;
                    case 4:
                        $model = M('notice');
                        $type  = 0;
                        $title = $model->where(['id'=>$data['pid']])->getField('title');
                        $this->log("在回收站恢复了一条自己的通知,标题为{$title}",5);
                        break;
                }
                break;
        }
        if($model->where(['id'=>$data['pid']])->save(['status'=>$type]))
        {
            M('recycled')->where(['id'=>$id])->delete();
            ajax_success('恢复成功');
        }

        ajax_error('恢复失败');
    }

    /**
     * 用户绩效列表
     */
    public function performance()
    {
        $start = microtime(true);
        if(!$this->user_id)
        {
            ajax_error('尚未登录');
        }
        $size  = 5;
        $model = D('ProjectStaffCommission');
        //  作为普通成员时
        $count = $model->where(['user_id'=>$this->user_id])->count();
        // 作为项目主管时
        // $count_2 = $model->where(['supervisor_id'=>$this->user_id])->count();
        $page  = new Page($count,$size);
        $data  = $model->relation(true)->where(['user_id'=>$this->user_id])->field(['id','project_id','work_id','project_commission_id','labor','commission_money','add_time','update_time'])->limit($page->firstRow.','.$page->listRows)->select();
        
        $new_data = [];
        $new_data['total'] = $model->relation(true)->where(['user_id'=>$this->user_id])->getField('sum(commission_money)');
        $new_data['page'] = ceil($count/$size);
        $new_data['count'] = $count;
        foreach ($data as $k=>$v)
        {
            // $director_money = M('projectCommission')->where(['supervisor_id'=>$this->user_id,'project_id'=>$v['project_id']])->getField('supervisor_money');
        
            $new_data['data'][$k]['id'] = $v['id'];
            $new_data['data'][$k]['project'] = $v['project_name'];
            $new_data['data'][$k]['work_type'] = $v['work_type'];
            $new_data['data'][$k]['labor'] = $v['labor'];
            $new_data['data'][$k]['commission_money'] = $v['commission_money']+($director_money ? $director_money : 0);
            $new_data['data'][$k]['interval'] = date('Y/m/d',$v['interval']['start_time']).'-'.date('Y/m/d',$v['interval']['end_time']);
            $new_data['data'][$k]['project_id'] = $v['project_id'];
        }
        ajax_success('获取成功',$new_data);
    }

    /**
     * 用户绩效 - 项目主管
     */
    public function performance_manage()
    {
        $size  = 5;
        $model = D('projectCommission');
        $count = $model->where(['supervisor_id'=>$this->user_id])->count();
        $page  = new Page($count,$size);
        // $data  = $model->relation(true)->where(['user_id'=>$this->user_id])->field(['id','project_id','work_id','project_commission_id','labor','commission_money','add_time','update_time'])->limit($page->firstRow.','.$page->listRows)->select();
        $data  = $model->where(['supervisor_id'=>$this->user_id])->field(['id','project_id','supervisor_money','start_time','end_time'])->limit($page->firstRow.','.$page->listRows)->select();
        $total = $model->where(['supervisor_id'=>$this->user_id])->getField('sum(supervisor_money)');
        foreach ($data as $k=>$v)
        {
            $data[$k]['project'] = M('project')->where(['id'=>$v['project_id']])->getField('name');
            $data[$k]['labor'] = '';
            $data[$k]['work_type'] = '项目主管';
            $data[$k]['commission_money'] = $v['supervisor_money'];
            $data[$k]['interval'] = date('Y/m/d',$v['start_time']).'-'.date('Y/m/d',$v['end_time']);

        }
        $new_data = [];
        $new_data['total'] = $total;
        $new_data['count'] = $count;
        $new_data['page'] = ceil($count/$size);
        $new_data['data'] = $data;

        ajax_success('获取成功',$new_data);
    }

    /**
     * 退出
     */
    public function logout()
    {
        M('userToken')->where(['user_id'=>$this->user_id])->save(['expire_time'=>0]);
        ajax_success('退出成功');
    }

    /**
     * 更改头像
     */
    public function head_img()
    {
        if(IS_POST)
        {
            $res = uploads('user/head/',$exts = array('jpg','gif','bmp','png','jpeg'),$this->max_upload_size);

            if(!is_array($res))
            {
                ajax_error($res);
            }

            if(M('user')->where(['id'=>$this->user_id])->save(['pic'=>$res[0]]))
            {
            	$path = strstr($_SERVER['SCRIPT_NAME'],'/index.php',1);
            	$port 		= $_SERVER['SERVER_PORT'];
            $scheme   = $port == '443' ? 'https' : 'http';
            
            //$scheme.'://'.$_SERVER['SERVER_NAME'].$path.$data['pic'];
                ajax_success('成功',$scheme.'://'.$_SERVER['SERVER_NAME'].$path.$res[0]);
            }

        }
    }

    /**
     * 判断是否在锁屏状态
     */
    public function check_lock()
    {
        $model = M('lockStatus');
        if($data = $model->where(['uid'=>$this->user_id])->field(['status','expire_time'])->find())
        {
            switch ($data['status'])
            {
                case 1:
                    ajax_success('未锁屏');
                    break;
                case 2:
                    if($data['expire_time'] > time())
                    {
                        ajax_error('已锁屏');
                    }
                    ajax_success('未锁屏');
                    break;
            }
        }

        ajax_success('未锁屏');
    }

    /***
     * 锁屏
     */
    public function lock()
    {
        $model = M('lockStatus');
        $data  = $model->where(['uid'=>$this->user_id])->find();
        if($data)
        {
            if($model->where(['uid'=>$this->user_id])->save(['status'=>2,'expire_time'=>time()+259200]))
            {
                ajax_success();
            }
        }else{
            if($model->add(['uid'=>$this->user_id,'status'=>2,'expire_time'=>time()+259200]))
            {
                ajax_success();
            }
        }

        ajax_error();
    }
    
    public function check_token()
    {
    	ajax_success('token正常');
    }
    public function search()
    {
        $name = I('post.name','');
        if(!$name)
        {
            $data = M('user')->where(['is_del'=>0])->field(['id','nickname'])->select();
            ajax_success('搜索成功',$data);
        }

        $where['nickname'] = ['LIKE',"%{$name}%"];

        $data = M('user')->where($where)->field(['id','nickname'])->select();

        ajax_success('获取成功',$data);
    }
}