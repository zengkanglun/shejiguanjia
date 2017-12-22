<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/10/10
 * Time: 20:29
 */
namespace Home\Controller;
use Think\Controller;
use Think\Page;
/**
 * 管理模块
 * Class ManageController
 * @package Home\Controller
 */
class ManageController extends CommonController
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
        // 时间搜索
        if($post['startTime'] && $post['endTime'])
        {
            $where['add_time'] = ['between',strtotime($post['startTime']).','.strtotime($post['endTime'])];
        }
        $where['is_del'] = 0;
        $where['administer'] = 0;
        $where['is_super'] = 0;
        $model = M('user');
        $count = $model->where($where)->count();
        $page  = new Page($count,$size);
        $data['data']  = $model->where($where)->field(['id','nickname','work_type','worktime','username'])->limit($page->firstRow.','.$page->listRows)->select();
        foreach ($data['data'] as $k=>$v)
        {
            $data['data'][$k]['work_type_name'] = M('work')->where(['id'=>$v['work_type']])->getField('name');
//            $data['data'][$k]['edu']       = getEdu($v['edu']);
        }
        $data['count'] = $count;
        $data['page']  = ceil($count/$size);

        ajax_success('获取成功',$data);

    }

    /**
     *  历史用户
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
        // 时间搜索
        if($post['start_time'] && $post['end_time'])
        {
            $where['add_time'] = ['between',strtotime($post['start_time']).','.strtotime($post['end_time'])];
        }
        $model = M('user');
        $where['is_del'] = 1;
        $count = $model->where($where)->count();
        $page  = new Page($count,$size);
        $data['data']  = $model->where($where)->field(['id','nickname','work_type','worktime','username','del_time'])->limit($page->firstRow.','.$page->listRows)->select();
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
        $data = M('user')->where(['id'=>$id])->field(['id','username','nickname','mobile','qq','sex','birthday','worktime','school','edu','position','work_type','authority','remark'])->find();

        if(!$data)
        {
            ajax_error('用户不存在');
        }
        $data['work_type_name'] = M('work')->where(['id'=>$data['work_type']])->getField('name');
        $data['edu_id'] = $data['edu'];
        $data['edu'] = getEdu($data['edu']);
        ajax_success('获取成功',$data);
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
                if($v != 0 && empty($v))
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
                $this->log("人事修改了{$nickname}的资料",6);
                ajax_success('修改成功');
            }

            ajax_error('修改失败');
        }
    }

    /**
     * 新增用户
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
                    $this->log("人事新建了用户{$post['nickname']}",8);
                    ajax_success('创建成功');
                }
            }

            ajax_error('创建失败');
        }
    }

    /**
     * 用户列表+离线用户导出
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
}