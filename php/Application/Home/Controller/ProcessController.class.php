<?php
/*
过程管理控制器
 */
namespace Home\Controller;
use Think\Controller;
use Org\Net\Http;
class ProcessController extends CommonController
{
    public function _initialize()
    {
        parent::_initialize();
        if(!$this->user_id){
//            ajax_error('缺少用户信息');
        }
    }


    /**
     * [index 获取过程纪要]
     * @Author   HTL
     * @DateTime 2017-10-16T17:41:40+0800
     * @return   [type]                   [description]
     */
    public function index()
    {
        if(IS_POST){
            $post = I('post.');
            if($post['project_id']){
                $data['user_id'] = $this->user_id;
                $data['process'] = D('Process')->relation(true)->where('status = 0 && project_id = '.$post['project_id'])->order('add_time desc')->page($post['p'],10)->select();
                foreach($data['process'] as $key=>$vo){
                    $data['process'][$key]['time'] = date('Y-m-d',$vo['time']);
                }
                $count = D('Process')->relation(true)->where('status = 0 && project_id = '.$post['project_id'])->count();
                $data['count'] = $count;
                $data['page'] = ceil($count/10)?ceil($count/10):1;

                ajax_success('成功',$data);
            }else{
                ajax_error('非法请求');
            }
        }
    }

    /**
     * [addprocess 添加过程纪要]
     * @Author   HTL
     * @DateTime 2017-10-16T17:42:03+0800
     * @return   [type]                   [description]
     */
    public function addprocess(){
        if(IS_POST){
            $post = I('post.');
            //自动验证
            $rules = [
                ['type', 'number', '类型不合法'],
                ['content', 'require', '内容不能为空'],
                ['project_id', 'require', '项目信息不全'],
                ['time', 'require', '时间不能为空'],
            ];

            $process = M('process');
            if($process->validate($rules)->create()){
                $process->time = strtotime($post['time']);
                $process->user_id = $this->user_id;
                $process->add_time = time();
                $process->update_time = time();
                if($process->add()){
                    $this->log($this->nickname.'添加了过程纪要',2);
                    ajax_success('添加成功');
                }else{
                    ajax_error();
                }
            }else{
                ajax_error($process->getError());
            }
        }
    }

    /**
     * [EditProcess 编辑过程纪要]
     * @Author   HTL
     * @DateTime 2017-10-17T10:57:15+0800
     */
    public function EditProcess(){
        if(IS_POST){
            $post = I('post.');
            //自动验证
            $rules = [
                ['id', 'require', '缺少ID'],
                ['type', 'number', '类型不合法'],
                ['content', 'require', '内容不能为空'],
                ['time', 'require', '时间不能为空'],
            ];

            $process = M('process');
            if($process->validate($rules)->create()){
                $process->time = strtotime($post['time']);
                $process->update_time = time();
                if($process->where("id = ".$post['id'])->save()){
                    $this->log($this->nickname.'编辑了过程纪要',2);
                    ajax_success('修改成功');
                }else{
                    ajax_error();
                }
            }else{
                ajax_error($process->getError());
            }
        }
    }

    /**
     * [Picture 出图出差记录]
     * @Author   HTL
     * @DateTime 2017-10-17T14:27:24+0800
     */
    public function Picture(){
        if(IS_POST){
            $post = I('post.');
            if($post['project_id'])
            {
                $data['user_id'] = $this->user_id;
                $data['Picture'] = D('Picture')->relation(true)->order("add_time desc")->page($post['p'],10)->where('status = 0 && project_id = '.$post['project_id'])->select();
                foreach($data['Picture'] as $key=>$vo){
                    $data['Picture'][$key]['add_time'] = date('Y-m-d',$vo['add_time']);
                }
                $count = D('Picture')->relation(true)->where('status = 0 && project_id = '.$post['project_id'])->count();
                $data['count'] = $count;
                $data['page'] = ceil($count/10)?ceil($count/10):1;

                ajax_success('成功',$data);
            }else{
                ajax_error('非法请求');
            }
        }
    }

    /**
     * [AddPicture 添加出图出差记录]
     * @Author   HTL
     * @DateTime 2017-10-17T13:45:34+0800
     * @return   [type]                   [description]
     */
    public function AddPicture()
    {
        if(IS_POST){
            $post = I('post.');
            //自动验证
            $rules = [
                ['type', 'number', '类型不合法'],
                ['participate', 'require', '参与人不能为空'],
                ['content', 'require', '内容不能为空'],
                ['num', 'require', '数量不能为空'],
                ['num', 'number', '数量类型不对'],
                ['project_id', 'number', '项目信息错误'],
            ];

            $picture = M('picture');
            if($picture->validate($rules)->create()){
                $picture->user_id = $this->user_id;
                $picture->add_time = time();
                $picture->update_time = time();
                if($picture->add()){
                    $this->log($this->nickname.'添加了出图出差记录',2);
                    ajax_success('添加成功');
                }else{
                    ajax_error();
                }
            }else{
                ajax_error($picture->getError());
            }
        }
    }

    /**
     * [EditPicture 编辑出图出差]
     * @Author   HTL
     * @DateTime 2017-10-17T15:09:53+0800
     */
    public function EditPicture()
    {
        if(IS_POST){
            $post = I('post.');
            //自动验证
            $rules = [
                ['id', 'number', '请选择要修改的信息'],
                ['type', 'number', '类型不合法'],
                ['participate', 'require', '参与人不能为空'],
                ['content', 'require', '内容不能为空'],
                ['num', 'require', '数量不能为空'],
                ['num', 'number', '数量类型不对'],
            ];

            $picture = M('picture');
            if($picture->validate($rules)->create()){
                $picture->update_time = time();
                if($picture->where("id = ".$post['id'])->save()){
                    ajax_success('修改成功');
                }else{
                    ajax_error();
                }
            }else{
                ajax_error($picture->getError());
            }
        }
    }

    /**
     * [letter 获取发函]
     * @Author   HTL
     * @DateTime 2017-10-17T15:52:14+0800
     * @return   [type]                   [description]
     */
    public function letter()
    {
        if(IS_POST){
            $post = I('post.');
            if($post['project_id'])
            {
                $data['user_id'] = $this->user_id;
                $data['letter'] = D('Letter')->relation(['LetterType','user'])->order("add_time desc")->page($post['p'],10)->where('data_type = 1 && status = 0 && project_id = '.$post['project_id'])->select();
                foreach($data['letter'] as $key=>$vo){
                    $data['letter'][$key]['time'] = date('Y-m-d',$vo['time']);
                    $data['letter'][$key]['filename'] = $vo['filename'] ? $vo['filename'] : '';
                }
                $count = D('Letter')->relation(['LetterType','user'])->where('data_type = 1 && status = 0 && project_id = '.$post['project_id'])->count();
                $data['count'] = $count;
                $data['page'] = ceil($count/10)?ceil($count/10):1;

                ajax_success('成功',$data);
            }else{
                ajax_error('非法请求');
            }
        }
    }

    /**
     * [AddLetter 添加发函]
     * @Author   HTL
     * @DateTime 2017-10-17T16:00:36+0800
     */
    public function AddLetter()
    {
        if(IS_POST){
            $post = I('post.');
            if(!$_FILES){ ajax_error('请上传文件'); }
            //自动验证
            $rules = [
                ['type', 'number', '类型不合法'],
               // ['content', 'require', '内容不能为空'],
                ['time', 'require', '时间不能为空'],
                ['data_type', 'require', '数据类型不能为空'],
            ];

            $letter = M('letter');
            if($letter->validate($rules)->create()){
                if($_FILES['contract']['name'])
                {
                    $file = uploads('',array('jpg','gif','bmp','png','jpeg','xlsx','doc','docx','xls','txt'),'','./Uploads/contract/');

                    $letter->filename = $_FILES['contract']['name']; //合同原文件名
                    $letter->file = $file[0]; //文件路径
                }
                $letter->user_id = $this->user_id;
                $letter->time = strtotime($post['time']);
                $letter->add_time = time();
                $letter->update_time = time();

                if($letter->add()){
                    $this->log($this->nickname.'添加了发函记录',2);
                    ajax_success('添加成功');
                }else{
                    ajax_error();
                }
            }else{
                ajax_error($letter->getError());
            }
        }
    }

    /**
     * [EditLetter 编辑发函]
     * @Author   HTL
     * @DateTime 2017-10-17T16:04:18+0800
     */
    public function EditLetter()
    {
        if(IS_POST){
            $post = I('post.');
            //自动验证
            $rules = [
                ['id', 'require', '缺少ID'],
                ['type', 'number', '类型不合法'],
                ['content', 'require', '内容不能为空'],
            ];

            $letter = M('letter');
            if($letter->validate($rules)->create()){

                if($_FILES['contract']['name'] != '' && $_FILES['contract']['size'] > 0){
                    $file = uploads('',array('jpg','gif','bmp','png','jpeg','xlsx','doc','docx','xls','txt'),'','./Uploads/contract/');
                    $letter->filename = $_FILES['contract']['name']; //合同原文件名
                    $letter->file = $file[0]; //文件路径
                }

                if($post['time']){
                    $letter->time = strtotime($post['time']);
                }
                $letter->update_time = time();
                if($letter->where("id = ".$post['id'])->save()){
                    ajax_success('修改成功');
                }else{
                    ajax_error();
                }
            }else{
                ajax_error($letter->getError());
            }
        }
    }

    /**
     * [Archiving 图纸归档]
     * @Author   HTL
     * @DateTime 2017-10-17T18:05:34+0800
     */
    public function Archiving()
    {
        if(IS_POST){
            $post = I('post.');
            if($post['project_id'])
            {
                $data['user_id'] = $this->user_id;
                $data['letter'] = D('Letter')->relation(['ArchiveType','user'])->order("add_time desc")->page($post['p'],10)->where('data_type = 2 && status = 0 && project_id = '.$post['project_id'])->select();
                foreach($data['letter'] as $key=>$vo){
                    $data['letter'][$key]['time'] = date('Y-m-d',$vo['time']);
                    $data['letter'][$key]['filename'] = $vo['filename'] ? $vo['filename'] : '';
                }
                $count = D('Letter')->relation(['ArchiveType','user'])->where('data_type = 2 && status = 0 && project_id = '.$post['project_id'])->count();
                $data['count'] = $count;
                $data['page'] = ceil($count/10)?ceil($count/10):1;

                ajax_success('成功',$data);
            }else{
                ajax_error('非法请求');
            }
        }
    }

    /**
     * [dele 删除]
     * @Author   HTL
     * @DateTime 2017-10-17T19:40:03+0800
     * @return   [type]                   [description]
     */
    public function dele(){
        if(IS_POST){
            $post = I('post.');
            if(!$post['type']){ ajax_error('类型不明确'); }
            if(!$post['id']){ ajax_error('目标不明确'); }

            switch ($post['type']) {
                case 1: //过程纪要
                    $table = M('process');
                    break;
                case 2: //出图出差
                    $table = M('picture');
                    break;
                case 3: //发函管理
                    $table = M('letter');
                    break;
                case 4: //图纸归档
                    $table = M('letter');
                    break;
                case 5: //项目分工
                    $table = M('staff');
                    break;
            }
            //获取user_id
            $user_id = $table->where("id = ".$post['id'])->getField('user_id');

            $save = $table->where("id = ".$post['id'])->save([
                'status' => 1,
                'dele_time' => time(),
                ]);
            if($save){
                //回收站添加记录
                $return = M('recycled')->add([
                    'pid' => $post['id'],
                    'kind' => 1,
                    'type' => $post['type'],
                    'del_time' => time(),
                    'user_id' => $user_id,
                    ]);
                ajax_success('删除成功');
            }else{
                ajax_error('删除失败');
            }
        }
    }
    /**
     * 下载附件
     */
    public function download()
    {
        if(!in_array('fileinfo',get_loaded_extensions()))
        {
            ajax_error('所需扩展未开启,请联系管理员');
        }
        $id = I('get.id');

        $data = M('letter')->where(['id'=>$id])->field(['file','filename'])->find();

        if($data['file'])
        {
        		$path = strstr($_SERVER['SCRIPT_NAME'],'/index.php',1);
            if(!is_file($_SERVER['DOCUMENT_ROOT'].'/'.$path.$data['file']))
            {
                ajax_error('文件不存在');
            }
            $suffix     = getFileSuffix($data['file'])[0];
            Http::download('.'.$data['file'],$data['filename'].$suffix);
        }
        ajax_error('下载文件不存在');
    }
}