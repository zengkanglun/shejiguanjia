<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/10/10
 * Time: 20:31
 */
namespace Home\Controller;
use Think\Controller;
use Think\Page;
use Org\Net\Http;

/**
 * 后台模块
 * Class AdminController
 * @package Home\Controller
 */
class AdminController extends CommonController
{
    /**
     * 普通用户列表
     */
    public function user_list()
    {
        $post  = I('get.');
        $size  = I('get.size',5);
        $where = [];
        $data  = [];
        if($post['name']){
            $where['nickname'] = array('like','%'.$post['name'].'%');
        }
        $where['is_del'] = 0;
        //$where['administer'] = 0;
        $model = M('user');
        $count = $model->where($where)->count();
        $page  = new Page($count,$size);
        $data['data']  = $model
            ->where($where)
            ->field(['id','nickname','work_type','worktime','username','mobile','qq'])
            ->limit($page->firstRow.','.$page->listRows)->select();
        foreach ($data['data'] as $k=>$v)
        {
            $data['data'][$k]['work_type'] = M('work')->where(['id'=>$v['work_type']])->getField('name');
            $data['data'][$k]['edu']       = getEdu($v['edu']);
        }
        $data['count'] = $count;
        $data['page']  = ceil($count/$size);

        ajax_success('获取成功',$data);

    }

    /**
     * 用户详情
     */
    public function user_info()
    {
        $id = I('get.id',0,'intval');
        $data = M('user')
            ->where(['id'=>$id])
            ->field(
                [
                    'id',
                    'username',
                    'nickname',
                    'mobile',
                    'qq',
                    'sex',
                    'birthday',
                    'worktime',
                    'school',
                    'edu',
                    'position',
                    'work_type',
                    'authority'
                ]
            )
            ->find();

        if(!$data)
        {
            ajax_error('用户不存在');
        }
        $data['work_type_name'] = M('work')->where(['id'=>$data['work_type']])->getField('name');
        $data['edu'] = getEdu($data['edu']);
        ajax_success('获取成功',$data);
    }

    /**
     *  用户离职
     */
    public function resign()
    {
        $id = I('get.id',0,'intval');

        if(M('user')->where(['id'=>$id])->save(['is_del'=>1,'del_time'=>time()]))
        {
            ajax_success('离职成功');
        }

        ajax_error('离职失败或用户不存在');
    }

    /**
     * 用户复职
     */
    public function reinstated()
    {
        $id = I('get.id',0,'intval');

        if(M('user')->where(['id'=>$id])->save(['is_del'=>0]))
        {
            ajax_success('复职成功');
        }

        ajax_error('复职失败或用户不存在');
    }

    /**
     * 超级管理员修改密码
     */
    public function change_pwd()
    {
        if(IS_POST)
        {
            $post = I('post.');

            $old_pwd = M('user')->where(['id'=>$this->user_id])->getField('password');

            // 验证数据库中的密码
            if($old_pwd != md5($post['old_pwd']))
            {
                ajax_error('密码验证不正确');
            }

            // 验证两次密码
            if($post['new_pwd'] != $post['verify_pwd'])
            {
                ajax_error('两次新密码不一致');
            }

            if(M('user')->where(['id'=>$this->user_id])->save(['password'=>md5($post['new_pwd'])]))
            {
                $this->log("超级管理员修改了自己的密码",8);
                ajax_success('修改成功');
            }

            ajax_error('修改失败');
        }
    }

    /**
     * 编辑普通用户资料
     */
    public function user_edit()
    {
        if(IS_POST)
        {
            $post  = I('post.');
            $uid   = $post['id'];
            unset($post['id']);
            $model = D('user');
            if(!$model->where(['id'=>$uid])->find())
            {
                ajax_error('用户不存在');
            }
            // 删除空值数据
            foreach ($post as $k=>$v)
            {
                if(!$v)
                {
                    unset($post[$k]);
                }
            }
            if($post['role'])
            {
                $post['role'] = implode(',',$post['role']);
            }
            unset($post['password']);
            $post = $model->create($post);
            $temp_uid = $model->where(['username'=>$post['username']])->getField('id');
            if($temp_uid && $temp_uid != $uid)
            {
                ajax_error('账号不得重复');
            }
            if($model->where(['id'=>$uid])->save($post))
            {
                $nickname = $model->where(['id'=>$uid])->getField('nickname');
                $this->log("超级管理员修改了{$nickname}的资料",8);
                ajax_success('修改成功');
            }

            ajax_error('修改失败');
        }
    }

    /**
     * 新建用户
     */
    public function create()
    {
        if(IS_POST)
        {
            $model = D('User');
            $post  = I('post.');
            if(empty($post))
            {
                ajax_error('数据为空');
            }
            foreach ($post as $k=>$v)
            {
                if($v!=0 && !$v)
                {
                    unset($post[$k]);
                }
            }

            if($post = $model->create($post))
            {
                if($model->add($post))
                {
                    $this->log("超级管理员新建了用户{$post['nickname']}",8);
                    ajax_success('创建成功');
                }
            }

            ajax_error('创建失败');
        }
    }

    /**
     *  已删除用户
     */
    public function del_users()
    {
        $post  = I('get.');
        $size  = I('get.size',5);
        $where = [];
        $data  = [];
        if($post['name']){
            $where['nickname'] = array('like','%'.$post['name'].'%');
        }
        $model = M('user');
        $where['is_del'] = 1;
        $count = $model->where($where)->count();
        $page  = new Page($count,$size);
        $data['data']  = $model
            ->where($where)
            ->field(['id','nickname','work_type','worktime','username','mobile','qq'])
            ->limit($page->firstRow.','.$page->listRows)
            ->select();
        foreach ($data['data'] as $k=>$v)
        {
            $data['data'][$k]['work_type'] = M('work')->where(['id'=>$v['work_type']])->getField('name');
            $data['data'][$k]['edu']       = getEdu($v['edu']);
        }
        $data['count'] = $count;
        $data['page']  = ceil($count/$size);

        ajax_success('获取成功',$data);
    }

    /**
     * 添加管理层
     */
    public function create_manager()
    {
        if(IS_POST)
        {
            $post = I('post.');
            $model = D('user');
            $uid = $post['uid'];
//            unset($post['uid']);
//            unset($post['password']);
//            foreach ($post as $k => $value) {
//                if(!$value)
//                {
//                    unset($post[$k]);
//                }
//            }

            $temp_uid = $model->where(['username'=>$post['username']])->getField('id');
            if($temp_uid && $temp_uid != $uid)
            {
                ajax_error('账号不得重复');
            }
            $post['administer'] = 1;
//            if($post = $model->create($post))
//            {
                if($model->where(['id'=>$uid])->save(['administer'=>1,'role'=>$post['role'],'authority'=>$post['authority']]))
                {
                    $nickname = $model->where(['id'=>$uid])->getField('nickname');
                    $this->log("超级管理员将{$nickname}添加为管理层",8);
                    ajax_success('增加成功');
                }
//            }

            ajax_error('增加失败');
        }
    }

    /**
     * 管理层列表
     */
    public function manager_list()
    {
        $post  = I('get.');
        $size  = I('get.size',5);
        $where = [];
        $data  = [];
        if($post['name']){
            $where['nickname'] = array('like','%'.$post['name'].'%');
        }
        $where['is_del'] = 0;
        $where['administer'] = 1;
        $model = M('user');
        $count = $model->where($where)->count();
        $page  = new Page($count,$size);
        $data['data']  = $model
            ->where($where)
            ->field(['id','nickname','work_type','worktime','username','mobile','role'])
            ->limit($page->firstRow.','.$page->listRows)
            ->select();
        foreach ($data['data'] as $k=>$v)
        {
            $data['data'][$k]['work_type'] = M('work')->where(['id'=>$v['work_type']])->getField('name');
            $data['data'][$k]['edu']       = getEdu($v['edu']);
            $data['data'][$k]['role']      = M('roleType')->where(['id'=>$v['role']])->getField('name');
        }
        $data['count'] = $count;
        $data['page']  = ceil($count/$size);

        ajax_success('获取成功',$data);
    }

    /**
     * 编辑管理层
     */
    public function edit_manager()
    {
        if(IS_POST)
        {
            $post = I('post.');
            $id   = $post['uid'];
            unset($post['uid']);

            $model = D('user');

            if(!$model->where(['id'=>$id,'administer'=>1])->find())
            {
                ajax_error('该成员不是管理层');
            }

            foreach ($post as $k=>$v) {
                if($v!=0 && empty($v))
                {
                    unset($post[$k]);
                }
            }
//            $post = $model->create($post);

            if($model->where(['id'=>$id])->save($post))
            {
                $nickname = $model->where(['id'=>$id])->getField('nickname');
                $this->log("超级管理员修改了管理层{$nickname}的资料",8);
                ajax_success();
            }

            ajax_error('保存失败');
        }
    }

    /**
     * 删除管理员
     */
    public function del_manager()
    {
        $id = I('get.id');
        if(M('user')->where(['id'=>$id,'administer'=>1])->getField('username'))
        {
            if(M('user')->where(['id'=>$id])->save(['administer'=>0]))
            {
                $nickname = M('user')->where(['id'=>$id])->getField('nickname');
                $this->log("超级管理员删除了{$nickname}的管理层",8);
                ajax_success('删除成功');
            }
        }

        ajax_error('管理员不存在');
    }

    /**
     * 用户日志
     */
    public function logs()
    {
        $id = I('get.id',0);
        $type = I('get.type',0);
        $name = I('get.name','');
        $model = D('ActionLog');

        if($name)
        {
            $ids = M('user')->where(['nickname'=>['like',"%{$name}%"]])->getField('group_concat(id)');
            $where['user_id'] = ['in',$ids];
        }

        if($id)
        {
            // 查找对应用户日志
            $where['user_id'] = $id;
            $where['log_type'] = $type;
        }else{
            // 查找全部用户日志
            $where['log_type'] = $type;
        }

        $count = $model->where($where)->count();
        $page  = new Page($count,5);
        $data['count'] = $count;
        $data['page']  = ceil($count/5);
        $data['data']  = $model
            ->relation(true)
            ->where($where)
            ->limit($page->firstRow.','.$page->listRows)
            ->field(['id','user_id','log_info','log_ip','add_time','log_type'])
            ->select();

        foreach ($data['data'] as $k=>$v)
        {
            $data['data'][$k]['add_time'] = date('Y-m-d',$v['add_time']);
        }

        ajax_success('获取成功',$data);
    }

    /**
     * 设置文件最大上传限制
     */
    public function set_max_upload()
    {
        if(IS_POST)
        {
            $size = I('post.size',1,'intval');

            $size = $size * 1024 *1024;

            if(M('info')->where(1)->save(['max_upload_size'=>$size]))
            {
                ajax_success('更新成功');
            }

            ajax_error('更新失败');
        }
    }

    /**
     * 已发通知
     */
    public function notice()
    {
        //end_time=2017-09-01
        //p=1
        //start_time=2017-09-01
        $get   = I('get.');
        $where = [];
        if($get['title'])
        {
            $where['title'] = ['like',"%{$get['title']}%"];
        }
        if($get['start_time'] && $get['end_time'])
        {
            $where['addtime'] = ['between',strtotime($get['start_time']).','.strtotime($get['end_time'])];
        }
        $model = D('notice');
        $size  = 5;
        $count = $model->where($where)->count();
        $page  = new Page($count,$size);
        $data  = [];

        $data['page']  = ceil($count/$size);
        $data['count'] = $count;
        $data['data']  = $model
            ->relation(true)
            ->where($where)
            ->limit($page->firstRow.','.$page->listRows)
            ->field(
                [
                    'id',
                    'type',
                    'title',
                    'project_id',
                    'user_id',
                    'receiver',
                    'addtime'
                ]
            )
            ->select();
        foreach ($data['data'] as $k=>$v)
        {
            $data['data'][$k]['addtime'] = date('Y-m-d',$v['addtime']);
        }
        ajax_success('获取成功',$data);

    }

    /**
     * 删除已发通知
     */
    public function del_notice()
    {
        $id = I('get.id',0,'intval');
        $data = M('notice')->where(['id'=>$id])->find();

        if(!$data)
        {
            ajax_error('通知不存在');
        }
        if(M('notice')->where(['id'=>$id])->delete())
        {
            M('noticeReceive')->where(['pid'=>$id])->delete();

            $this->log("超级管理员删除了{$data['title']}的任务",8);
            ajax_success();
        }


        ajax_error();

    }

    /**
     * 已发任务
     */
    public function task()
    {
        $get   = I('get.');
        $where = [];
        if($get['title'])
        {
            $where['title'] = ['like',"%{$get['title']}%"];
        }
        if($get['start_time'] && $get['end_time'])
        {
            $where['add_time'] = ['between',strtotime($get['start_time']).','.strtotime($get['end_time'])];
        }
        $model = D('task');
        $size  = 5;
        $count = $model->where($where)->count();
        $page  = new Page($count,$size);
        $data  = [];

        $data['page']  = ceil($count/$size);
        $data['count'] = $count;
        $data['data']  = $model
            ->relation(true)
            ->where($where)
            ->limit($page->firstRow.','.$page->listRows)
            ->field(
                [
//                    'project_id',
                    'id',
                    'type',
                    'title',
                    'user_id',
                    'add_time',
                    'to_user'
                ]
            )
            ->select();
        foreach ($data['data'] as $k=>$v)
        {
            $data['data'][$k]['add_time'] = date('Y-m-d',$v['add_time']);
        }
        ajax_success('获取成功',$data);
    }

    /**
     * 删除已发任务
     */
    public function del_task()
    {
        $id = I('get.id',0,'intval');
        $data = M('task')->where(['id'=>$id])->find();
        if(!$data)
        {
            ajax_error('不存在');
        }
        if(M("task")->where(['id'=>$id])->delete())
        {
            M('taskReceive')->where(['pid'=>$id])->delete();
            $this->log("超级管理员删除了{$data['title']}的任务",8);
            ajax_success();
        }

        ajax_error();
    }

    /**
     * 单位信息查看
     */
    public function info()
    {
        $data = M('info')->field(['name','mobile','address','zipcode','email'])->select();

        ajax_success('获取成功',$data);

    }

    /**
     * 单位信息更新
     */
    public function info_edit()
    {
        if(IS_POST)
        {
            $post = I('post.');
            if(M('info')->where(1)->save($post))
            {
                $this->log("超级管理员更新了系统信息",8);
                ajax_success('更新成功');
            }
        }

        ajax_error('更新失败');
    }

    // --------------------------------------------   TODO 类型展示    ---------------------------------------- //
    /**
     * 建筑类型
     */
    public function build_type()
    {
        $data = M('buildType')->select();

        ajax_success('获取成功',$data);
    }

    /**
     * 阶段类型
     */
    public function stage_type()
    {
        $data = M('stageTypes')->select();

        ajax_success('获取成功',$data);
    }
    /**
     * 工种类型
     */
    public function work_type()
    {
        $data = M('work')->where(['type'=>1])->field(['id','name'])->select();

        ajax_success('获取成功',$data);
    }
    /**
     * 过程纪要类型
     */
    public function process_type()
    {
        $data = M('processType')->select();

        ajax_success('获取成功',$data);
    }
    /**
     * 出图出差类型
     */
    public function chutu_type()
    {
        $data = M('chuchaiType')->select();

        ajax_success('获取成功',$data);
    }
    /**
     * 发函管理类型
     */
    public function letter_type()
    {
        $data = M('letterType')->select();

        ajax_success('获取成功',$data);
    }

    /**
     * 图纸归档类型
     */
    public function archive_type()
    {
        $data = M('archiveType')->select();

        ajax_success('获取成功',$data);
    }

    /**
     * 任务类型
     */
    public function task_type()
    {
        $data = M('taskType')->select();

        ajax_success('获取成功',$data);
    }

    /**
     * 通知类型
     */
    public function notice_type()
    {
        $data = M('noticeType')->select();

        ajax_success('获取成功',$data);
    }

    /**
     * 项目支出类型
     */
    public function project_overhead_type()
    {
        $data = M('overheadType')->where(['type'=>1])->field(['id','name'])->select();

        ajax_success('获取成功',$data);
    }

    /**
     * 行政支出类型
     */
    public function admin_overhead_type()
    {
        $data = M('overheadType')->where(['type'=>2])->field(['id','name'])->select();

        ajax_success('获取成功',$data);
    }
    /**
     * 用户角色类型
     */
    public function role_type()
    {
        $data = M('roleType')->select();

        ajax_success('获取成功',$data);
    }

    // -------------------------------------  TODO 类型增加  ------------------------------------------ //

    /**
     * 建筑类型增加
     */
    public function add_build_type()
    {
        if(IS_POST)
        {
            $post = I('post.');

            if(M('buildType')->add($post))
            {
                $this->log("超级管理员添加了建筑类型",8);
                ajax_success('添加成功');
            }
        }

        ajax_error('添加失败');
    }

    /**
     * 阶段类型增加
     */
    public function add_stage_type()
    {
        if(IS_POST)
        {
            $post = I('post.');

            if(M('stageType')->add($post))
            {
                $this->log("超级管理员添加了阶段类型",8);
                ajax_success('添加成功');
            }
        }

        ajax_error('添加失败');
    }

    /**
     * 工种类型增加
     */
    public function add_work_type()
    {
        if(IS_POST)
        {
            $post = I('post.');
            $post['type'] = 1;
            $post['add_time'] = time();
            if(M('work')->add($post))
            {
                $this->log("超级管理员添加了工种类型",8);
                ajax_success('添加成功');
            }
        }

        ajax_error('添加失败');
    }

    /**
     * 过程纪要类型增加
     */
    public function add_process_type()
    {
        if(IS_POST)
        {
            $post = I('post.');

            if(M('processType')->add($post))
            {
                $this->log("超级管理员添加了过程纪要类型",8);
                ajax_success('添加成功');
            }
        }

        ajax_error('添加失败');
    }

    /**
     * 出图出差类型增加
     */
    public function add_chutu_type()
    {
        if(IS_POST)
        {
            $post = I('post.');

            if(M('chuchaiType')->add($post))
            {
                $this->log("超级管理员添加了出图出差类型",8);
                ajax_success('添加成功');
            }
        }

        ajax_error('添加失败');
    }

    /**
     * 发函管理类型增加
     */
    public function add_letter_type()
    {
        if(IS_POST)
        {
            $post = I('post.');

            if(M('letterType')->add($post))
            {
                $this->log("超级管理员添加了发函管理类型",8);
                ajax_success('添加成功');
            }
        }

        ajax_error('添加失败');
    }

    /**
     * 图纸归档类型增加
     */
    public function add_archive_type()
    {
        if(IS_POST)
        {
            $post = I('post.');

            if(M('archiveType')->add($post))
            {
                $this->log("超级管理员添加了图纸归档类型",8);
                ajax_success('添加成功');
            }
        }

        ajax_error('添加失败');
    }

    /**
     * 任务类型增加
     */
    public function add_task_type()
    {
        if(IS_POST)
        {
            $post = I('post.');

            if(M('taskType')->add($post))
            {
                $this->log("超级管理员添加了任务类型",8);
                ajax_success('添加成功');
            }
        }

        ajax_error('添加失败');
    }
    /**
     * 通知类型增加
     */
    public function add_notice_type()
    {
        if(IS_POST)
        {
            $post = I('post.');

            if(M('noticeType')->add($post))
            {
                $this->log("超级管理员添加了通知类型",8);
                ajax_success('添加成功');
            }
        }

        ajax_error('添加失败');
    }
    /**
     * 项目支出类型增加
     */
    public function add_project_type()
    {
        if(IS_POST)
        {
            $post = I('post.');
            $post['type'] = 1;
            if(M('overheadType')->add($post))
            {
                $this->log("超级管理员添加了项目支出类型",8);
                ajax_success('添加成功');
            }
        }

        ajax_error('添加失败');
    }
    /**
     * 行政支出类型增加
     */
    public function add_admin_type()
    {
        if(IS_POST)
        {
            $post = I('post.');
            $post['type'] = 2;
            if(M('overheadType')->add($post))
            {
                $this->log("超级管理员添加了行政类型",8);
                ajax_success('添加成功');
            }
        }

        ajax_error('添加失败');
    }

    /**
     * 用户角色类型增加
     */
    public function add_role_type()
    {
        if(IS_POST)
        {
            $post = I('post.');
            $post['type'] = 2;
            if(M('roleType')->add($post))
            {
                $this->log("超级管理员添加了用户角色类型",8);
                ajax_success('添加成功');
            }
        }

        ajax_error('添加失败');
    }

    // -----------------------------------------   TODO 栏目标签编辑   ---------------------------------- //

    /**
     * 编辑建筑类型
     */
    public function edit_build_type()
    {
        if(IS_POST)
        {
            $post = I('post.');

            $id = $post['id'];
            unset($post['id']);
            if(M('buildType')->where(['id'=>$id])->save($post))
            {
                ajax_success('编辑成功');
            }
        }

        ajax_error('编辑失败');
    }

    /**
     * 编辑阶段类型
     */
    public function edit_stage_type()
    {
        if(IS_POST)
        {
            $post = I('post.');

            $id = $post['id'];
            unset($post['id']);
            if(M('stageType')->where(['id'=>$id])->save($post))
            {
                ajax_success('编辑成功');
            }
        }

        ajax_error('编辑失败');
    }

    /**
     * 编辑工种类型
     */
    public function edit_work_type()
    {
        if(IS_POST)
        {
            $post = I('post.');

            $id = $post['id'];
            unset($post['id']);
            if(M('work')->where(['id'=>$id])->save($post))
            {
                ajax_success('编辑成功');
            }
        }

        ajax_error('编辑失败');
    }

    /**
     * 编辑过程纪要类型
     */
    public function edit_process_type()
    {
        if(IS_POST)
        {
            $post = I('post.');

            $id = $post['id'];
            unset($post['id']);
            if(M('processType')->where(['id'=>$id])->save($post))
            {
                ajax_success('编辑成功');
            }
        }

        ajax_error('编辑失败');
    }

    /**
     * 编辑出图出差类型
     */
    public function edit_chutu_type()
    {
        if(IS_POST)
        {
            $post = I('post.');

            $id = $post['id'];
            unset($post['id']);
            if(M('chuchaiType')->where(['id'=>$id])->save($post))
            {
                ajax_success('编辑成功');
            }
        }

        ajax_error('编辑失败');
    }

    /**
     * 编辑发函管理类型
     */
    public function edit_letter_type()
    {
        if(IS_POST)
        {
            $post = I('post.');

            $id = $post['id'];
            unset($post['id']);
            if(M('letterType')->where(['id'=>$id])->save($post))
            {
                ajax_success('编辑成功');
            }
        }

        ajax_error('编辑失败');
    }

    /**
     * 编辑图纸归档类型
     */
    public function edit_archive_type()
    {
        if(IS_POST)
        {
            $post = I('post.');

            $id = $post['id'];
            unset($post['id']);
            if(M('archiveType')->where(['id'=>$id])->save($post))
            {
                ajax_success('编辑成功');
            }
        }

        ajax_error('编辑失败');
    }

    /**
     * 编辑任务类型
     */
    public function edit_task_type()
    {
        if(IS_POST)
        {
            $post = I('post.');

            $id = $post['id'];
            unset($post['id']);
            if(M('taskType')->where(['id'=>$id])->save($post))
            {
                ajax_success('编辑成功');
            }
        }

        ajax_error('编辑失败');
    }

    /**
     * 编辑通知类型
     */
    public function edit_notice_type()
    {
        if(IS_POST)
        {
            $post = I('post.');

            $id = $post['id'];
            unset($post['id']);
            if(M('noticeType')->where(['id'=>$id])->save($post))
            {
                ajax_success('编辑成功');
            }
        }

        ajax_error('编辑失败');
    }

    /**
     * 编辑项目支出类型
     */
    public function edit_project_type()
    {
        if(IS_POST)
        {
            $post = I('post.');

            $id = $post['id'];
            unset($post['id']);
            if(M('overheadType')->where(['id'=>$id])->save($post))
            {
                ajax_success('编辑成功');
            }
        }

        ajax_error('编辑失败');
    }

    /**
     * 编辑行政支出类型
     */
    public function edit_admin_type()
    {
        if(IS_POST)
        {
            $post = I('post.');

            $id = $post['id'];
            unset($post['id']);
            if(M('overheadType')->where(['id'=>$id])->save($post))
            {
                ajax_success('编辑成功');
            }
        }

        ajax_error('编辑失败');
    }

    /**
     * 编辑用户角色类型
     */
    public function edit_role_type()
    {
        if (IS_POST) {
            $post = I('post.');

            $id = $post['id'];
            unset($post['id']);
            if (M('roleType')->where(['id' => $id])->save($post)) {
                ajax_success('编辑成功');
            }
        }

        ajax_error('编辑失败');
    }

    /**
     * 下载附件
     */
    public function download()
    {
        $type = I('get.type',0);
        $path = strstr($_SERVER['SCRIPT_NAME'],'/index.php',1);
        switch ($type)
        {
            case 1:
                // 任务
                if(!in_array('fileinfo',get_loaded_extensions()))
                {
                    ajax_error('所需扩展未开启,请联系管理员');
                }
                $id = I('get.id');
                $data = M('task')->where(['id'=>$id])->field(['file','file_name'])->find();

                if($data['file'])
                {
                    if(!is_file($_SERVER['DOCUMENT_ROOT'].$path.$data['file']))
                    {
                        ajax_error('文件不存在');
                    }
                    $suffix     = getFileSuffix($data['file'])[0];
                    Http::download('.'.$data['file'],$data['file_name'].$suffix);
                    exit;
                }
                ajax_error('下载文件不存在');
                break;
            case 2:
                $id = I('get.id');
                $data = M('notice')->where(['id'=>$id])->field(['file','file_name'])->find();

                if($data['file'])
                {
                    if(!is_file($_SERVER['DOCUMENT_ROOT'].$path.$data['file']))
                    {
                        ajax_error('文件不存在');
                    }
                    $suffix     = getFileSuffix($data['file'])[0];
                    Http::download('.'.$data['file'],$data['file_name'].$suffix);
                    exit;
                }
                ajax_error('下载文件不存在');
                // 通知
                break;
            default:
                ajax_error();
        }
    }

    /**
     * 用户导出+离线用户导出
     */
    public function users_export()
    {
        $where = [];
        $where['is_del'] = 0;
        $where['administer'] = 0;
        $where['is_super'] = 0;
        $model = M('user');
        $data  = $model->where($where)->field(['nickname','work_type','worktime','username'])->select();
        foreach ($data as $k=>$v)
        {
            $data[$k]['work_type_name'] = M('work')->where(['id'=>$v['work_type']])->getField('name');
            unset($data[$k]['work_type']);
        }
        array_unshift($data,['用户姓名','工作时间','用户账号','所属工种']);
        export($data,date('Y-m-d').'-用户导出');
        unset($data);

        $where = [];

        $model = M('user');
        $where['is_del'] = 1;
        $data  = $model->where($where)->field(['nickname','work_type','worktime','username','del_time'])->select();
        foreach ($data as $k=>$v)
        {
            $data[$k]['work_type_name'] = M('work')->where(['id'=>$v['work_type']])->getField('name');
            $data[$k]['del_time'] = date('Y-m-d',$v['del_time']);
            unset($data[$k]['work_type']);
        }
        array_unshift($data,['用户姓名','工作时间','用户账号','离职时间','所属工种']);
        export($data,date('Y-m-d').'-离线用户导出');
    }

    /**
     * 管理层导出
     */
    public function managers_export()
    {
        $where = [];

        $where['is_del'] = 0;
        $where['administer'] = 1;
        $model = M('user');
        $data  = $model
            ->where($where)
            ->field(['nickname','work_type','worktime','username','mobile','role'])
            ->select();
        foreach ($data as $k=>$v)
        {
            $data[$k]['work_type_name'] = M('work')->where(['id'=>$v['work_type']])->getField('name');
            unset($data[$k]['work_type']);
            $data[$k]['role_name']      = M('roleType')->where(['id'=>$v['role']])->getField('name');
            unset($data[$k]['role']);
        }
        array_unshift($data,['用户姓名','工作时间','用户账号','用户手机','所属工种','用户角色']);
        export($data,date('Y-m-d').'-管理层导出');
    }
}