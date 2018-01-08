<?php
namespace Home\Controller;
use Think\Controller;
use Think\Page;
use Org\Net\Http;
/**
 * 任务模块
 * Class TaskController
 * @package Home\Controller
 */
class TaskController extends CommonController
{
    /**
     * 获取新任务
     */
    public function new_task()
    {
        $temp_uid = I('get.uid',0,'intval');
        if($temp_uid)
        {
            $user_id = $temp_uid;
        }else{
            $user_id = $this->user_id;
        }
        $count = M('taskReceive')->where(['uid'=>$user_id,'status'=>1])->count();
        $page  = new Page($count,5);
        $data['count'] = $count;
        $data['page']  = ceil($count/5);
        $data['data'] = M('taskReceive')
            ->alias('a')
            ->where(['a.uid'=>$user_id,'a.status'=>1])
            ->join('__TASK__ b on a.pid=b.id')
            ->field([
                'a.id',
                'b.id'=>'pid',
                'b.user_id',
                'b.type',
//                'b.project_id',
                'b.title',
//                'b.content',
                'b.add_time',
                'b.start_time'
            ])
            ->limit($page->firstRow.','.$page->listRows)
            ->select();
        foreach ($data['data'] as $k => $v) {
            $data['data'][$k]['user_id'] = M('user')->where(['id'=>$v['user_id']])->getField('nickname');
            $data['data'][$k]['type']    = M('taskType')->where(['id'=>$v['type']])->getField('name');
            $data['data'][$k]['add_time'] = date('Y-m-d',$v['add_time']);
        }

        ajax_success('获取成功',$data);
    }

    /**
     * 获取进行中任务
     */
    public function doing_task()
    {
        $temp_uid = I('get.uid',0,'intval');
        if($temp_uid)
        {
            $user_id = $temp_uid;
        }else{
            $user_id = $this->user_id;
        }
        $count = M('taskReceive')->where(['uid'=>$user_id,'status'=>2])->count();
        $page  = new Page($count,5);
        $data['count'] = $count;
        $data['page']  = ceil($count/5);
        $data['data'] = M('taskReceive')
            ->alias('a')
            ->where(['a.uid'=>$user_id,'a.status'=>2])
            ->join('__TASK__ b on a.pid=b.id')
            ->field([
                'a.id',
                'b.id'=>'pid',
                'b.user_id',
                'b.type',
//                'b.project_id',
                'b.title',
//                'b.content',
                'b.add_time',
                'a.receive_time'
            ])
            ->limit($page->firstRow.','.$page->listRows)
            ->select();
        foreach ($data['data'] as $k => $v) {
            $data['data'][$k]['add_time']= date('Y-m-d',$v['add_time']);
            $data['data'][$k]['user_id'] = M('user')->where(['id'=>$v['user_id']])->getField('nickname');
            $data['data'][$k]['type']    = M('taskType')->where(['id'=>$v['type']])->getField('name');
            $data['data'][$k]['receive_time'] = date('Y-m-d',$v['receive_time']);
        }

        ajax_success('获取成功',$data);
    }

    /**
     * 获取历史任务
     */
    public function history_task()
    {
        $temp_uid = I('get.uid',0,'intval');
        if($temp_uid)
        {
            $user_id = $temp_uid;
        }else{
            $user_id = $this->user_id;
        }
        $count = M('taskReceive')->where(['uid'=>$user_id,'status'=>['in','3,5']])->count();
        $page  = new Page($count,5);
        $data['count'] = $count;
        $data['page']  = ceil($count/5);
        $data['data'] = M('taskReceive')
            ->alias('a')
            ->where(['a.uid'=>$user_id,'a.status'=>['in','3,5']])
            ->join('__TASK__ b on a.pid=b.id')
            ->field([
                'a.id',
                'b.id'=>'pid',
                'b.user_id',
                'b.type',
//                'b.project_id',
                'b.title',
//                'b.content',
                'b.add_time',
                'a.finish_time'
            ])
            ->limit($page->firstRow.','.$page->listRows)
            ->select();
        foreach ($data['data'] as $k => $v) {
            $data['data'][$k]['user_id'] = M('user')->where(['id'=>$v['user_id']])->getField('nickname');
            $data['data'][$k]['type']    = M('taskType')->where(['id'=>$v['type']])->getField('name');
            $data['data'][$k]['finish_time'] = date('Y-m-d',$v['finish_time']);
            $data['data'][$k]['add_time']= date('Y-m-d',$v['add_time']);
        }

        ajax_success('获取成功',$data);
    }

    /**
     * 获取创建任务
     */
    public function own_task()
    {
        $temp_uid = I('get.uid',0,'intval');
        if($temp_uid)
        {
            $user_id = $temp_uid;
        }else{
            $user_id = $this->user_id;
        }
        $count = M('task')->where(['user_id'=>$user_id,'status'=>1])->count();
        $page  = new Page($count,5);
        $data['count'] = $count;
        $data['page']  = ceil($count/5);
        // 使用指定的关联模型
        $data['data'] = D('task')
            ->relation(['type','receiver'])
            ->where(['user_id'=>$user_id,'status'=>1])
            ->field(['id','add_time','type','to_user','title','status'])
            ->limit($page->firstRow.','.$page->listRows)
            ->select();

        foreach ($data['data'] as $k=>$v)
        {
            $data['data'][$k]['add_time'] = date('Y-m-d',$v['add_time']);
            $data['data'][$k]['status']   = '正常';
//            $data[$k]['type'] = M('taskType')->where(['id'=>$v['type']])->getField('name');
//            $data[$k]['to_user'] = M('user')->where(['id'=>$v['to_user']])->getField('nickname');
        }

        ajax_success('获取成功',$data);
    }

    /**
     * 任务详情
     */
    public function task_info()
    {
        $id = I('get.id',0);
        $sid= I('get.sid',0);
        $data = M('task')
            ->where(['id'=>$id])
            ->field(
                [
                    'project_id',
                    'type',
                    'user_id',
                    'start_time',
                    'title',
                    'IFNULL(file_name,"") as file_name',
                    'content',
                    'update_at',
                    'to_user'
                ]
            )
            ->find();
        if(!$data)
        {
            ajax_error('任务不存在');
        }
        $data['reply']     = M('taskReceive')->where(['pid'=>$id])->field(['uid','addtime','reply'])->select();
        foreach ($data['reply'] as $k=>$v)
        {
            if(!$v['reply'])
            {
                unset($data['reply'][$k]);
                continue;
            }
            $data['reply'][$k]['uid'] = M('user')->where(['id'=>$v['uid']])->getField('nickname');
            $data['reply'][$k]['addtime'] = date('Y-m-d',$v['addtime']);
        }
        if($sid)
        {
            $data['reply_content'] = M('taskReceive')->where(['id'=>$sid])->getField('reply');
        }
        $data['project_id'] = M('project')->where(['id'=>$data['project_id']])->getField('name');
        $data['type']       = M('taskType')->where(['id'=>$data['type']])->getField('name');
        $data['user_id']    = M('user')->where(['id'=>['in',$data['user_id']]])->getField('group_concat(nickname)');
        $data['update_at']  = date('Y-m-d',$data['update_at']);
        $data['to_user']    = M('user')->where(['id'=>['in',$data['to_user']]])->getField('group_concat(nickname)');
        ajax_success('获取成功',$data);
    }

    /**
     * 接收任务
     */
    public function accept()
    {
        $post = I('post.');

        $id = $post['id'];

        if(M('taskReceive')->where(['id'=>$id])->getField('uid') != $this->user_id)
        {
            ajax_error('该任务不属于你');
        }
        $content = $post['content'] ? $post['content'] : '已接受';
        if(M('taskReceive')->where(['id'=>$id])->save(['status'=>2,'receive_time'=>time(),'reply'=>$content]))
        {
//            if($post['content'])
//            {
//                $pid = M('taskReceive')->where(['id'=>$id])->getField('pid');
//                M('task')->where(['id'=>$pid])->save(['update_at'=>time(),'reply'=>$post['content']]);
//            }

            ajax_success('接收成功');
        }
    }

    /**
     * 拒绝任务
     */
    public function reject()
    {
        $post = I('post.');

        $id = $post['id'];

        if(M('taskReceive')->where(['id'=>$id])->getField('uid') != $this->user_id)
        {
            ajax_error('该任务不属于你');
        }

        $content = $post['content'] ? $post['content'] : '已拒绝';
        if(M('taskReceive')->where(['id'=>$id])->save(['status'=>3,'receive_time'=>time(),'finish_time'=>time(),'reply'=>$content]))
        {
//            if($post['content'])
//            {
//                $pid = M('taskReceive')->where(['id'=>$id])->getField('pid');
//                M('task')->where(['id'=>$pid])->save(['update_at'=>time(),'reply'=>$post['content']]);
//            }

            ajax_success('拒绝成功');
        }
    }

    /**
     * 创建任务
     */
    public function create()
    {
        if(IS_POST)
        {
            $post = I('post.');
            if($_FILES['file']['name'])
            {
                file_put_contents('files.txt',json_encode($_FILES));
                $res = uploads('task/',['doc','xls','rar','zip','jpg','png'],$this->max_upload_size);
                if(!is_array($res))
                {
                    ajax_error($res);
                }

                $post['file'] = $res[0];
                $post['file_name'] = getUploadFileNameWithoutSuffix($_FILES['file']['name']);
            }
//            dump($post);exit;
            $post['user_id'] = $this->user_id;
            $model = D('task');
            $post = $model->create($post);
            if($id = $model->add($post))
            {
                $receive = D('taskReceive');
                foreach (explode(',',$post['to_user']) as $v) {
                	$data = [];
                	$data['uid'] = $v;
                	$data['pid'] = $id;
                	$data = $receive->create($data);
                	$receive->add($data);
                	unset($data);
                } 
                
                $this->log("创建了任务标题为:{$post['title']},内容为{$post['content']}",3);
                ajax_success('新建成功');
            }

            ajax_error();
        }
    }

    /**
     * 确定完成任务
     */
    public function finish()
    {
        $id   = I('get.id',0);
        $data = M('taskReceive')->where(['id'=>$id])->field(['pid','uid'])->find();
        if(!$data || $data['uid'] != $this->user_id)
        {
            ajax_error('任务不存在或者任务不属于你');
        }
        if(M('taskReceive')->where(['id'=>$id])->save(['status'=>5,'finish_time'=>time()]))
        {
            $title = M('task')->where(['id'=>$data['pid']])->getField('title');
            $this->log("完成了任务{$title}",3);
            ajax_success();
        }

        ajax_error();
    }

    /**
     * 回退任务
     */
    public function back()
    {
        $id = I('get.id',0);
        if(M('taskReceive')->where(['id'=>$id])->save(['status'=>2]))
        {
            ajax_success();
        }
        ajax_error();
    }

    /**
     * 删除任务
     */
    public function del()
    {
        $id = I('get.id',0);
        $type = I('get.type');
        if(!in_array($type,[1,2,3,4]))
        {
            ajax_error('缺少参数');
        }
        switch ($type)
        {
            case 1:
            case 2:
            case 3:
                $data = M('taskReceive')->where(['id'=>$id])->field(['pid','uid'])->find();
                if(!$data || $data['uid'] != $this->user_id)
                {
                    ajax_error('任务不存在或者任务不属于你');
                }
                // 1,2,3 都为接收者所有的任务
                if(M('taskReceive')->where(['id'=>$id])->save(['status'=>4]))
                {
                    M('recycled')
                        ->add(
                            [
                                'pid'=>$id,
                                'kind'=>2,
                                'type'=>$type,
                                'del_time'=>time(),
                                'user_id'=>$this->user_id
                            ]
                        );
                    $title = M('task')->where(['id'=>$data['pid']])->getField('title');
                    $this->log("删除了指派给他的任务{$title}",3);
                    ajax_success();
                }
                break;
            case 4:
                // 4 是自己创建所有的任务
                $data = M('task')->where(['id'=>$id])->field(['user_id','title'])->find();
                if(!$data || $data['user_id'] != $this->user_id)
                {
                    ajax_error('任务不存在或者任务不属于你');
                }
                if(M('task')->where(['id'=>$id])->save(['status'=>4]))
                {
                    M('recycled')
                        ->add(
                            [
                                'pid'=>$id,
                                'kind'=>2,
                                'type'=>$type,
                                'del_time'=>time(),
                                'user_id'=>$this->user_id
                            ]
                        );
                    $this->log("删除了他自己的任务{$data['title']}",3);
                    ajax_success();
                }
        }


        ajax_error();
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
     * 下载附件
     */
    public function download()
    {
        if(!in_array('fileinfo',get_loaded_extensions()))
        {
            ajax_error('所需扩展未开启,请联系管理员');
        }
        $id = I('get.id');
        $data = M('task')->where(['id'=>$id])->field(['file','file_name'])->find();

        if($data['file'])
        {
        		$path = strstr($_SERVER['SCRIPT_NAME'],'/index.php',1);
            if(!is_file($_SERVER['DOCUMENT_ROOT'].'/'.$path.$data['file']))
            {
                ajax_error('文件不存在');
            }
            $suffix     = getFileSuffix($data['file'])[0];
            Http::download('.'.$data['file'],$data['file_name'].$suffix);
        }
        ajax_error('下载文件不存在');
    }

    /**
     * 总览->任务
     */
    public function users_task()
    {
        $model  = D('user');
        $where  = [];
        $where['is_super'] = 0;
        $where['administer'] = 0;
        $where['is_del'] = 0;
        if($name = I('get.name'))
        {
            $where['nickname'] = ['LIKE',"%$name%"];
        }
        $start_time = strtotime(I('get.start_time'));
        $end_time   = strtotime(I('get.end_time'));
        if($start_time && $end_time && $start_time < $end_time)
        {
            $where['add_time'] = [['egt', $start_time], ['elt', $end_time], 'and'];
        }
        $count = $model->where($where)->count();
        $page  = new Page($count,5);

        $data['count'] = $count;
        $data['page']  = ceil($count/5);
        $data['data']  = $model->where($where)->limit($page->firstRow.','.$page->listRows)->field(['id','nickname'])->select();

        foreach ($data['data'] as $k => $v) {
            $data['data'][$k]['owner'] = M('task')->where(['user_id'=>$v['id']])->order('id desc')->count();
            $data['data'][$k]['doing'] = M('taskReceive')->alias('a')->join('__TASK__ b on a.pid=b.id')->where(['a.uid'=>$v['id'],'a.status'=>2])->order('a.id desc')->count();
            $data['data'][$k]['new'] = M('taskReceive')->alias('a')->join('__TASK__ b on a.pid=b.id')->where(['a.uid'=>$v['id'],'a.status'=>1])->order('a.id desc')->count();
        }
        ajax_success('获取成功',$data);
    }
    
    /**
     * 导出任务
     **/
    public function export_task()
    {
    	$data = [];
    	$data[0] = ['用户','新建任务','新任务','进行中任务'];
    	$temp    = M('user')->where(['is_del'=>0])->field(['id','nickname'])->select();
    	foreach ($temp as $k=>$v)
    	{
//    		$temp[$k]['new']   = M('taskReceive')->where(['a.uid'=>$v['id']])->alias('a')->join('__TASK__ b on a.pid=b.id')->getField('b.title');
    		$temp[$k]['new']   = M('taskReceive')->where(['a.uid'=>$v['id']])->alias('a')->join('__TASK__ b on a.pid=b.id')->count();
//    		$temp[$k]['doing'] = M('taskReceive')->where(['a.uid'=>$v['id']])->alias('a')->join('__TASK__ b on a.pid=b.id')->getField('b.title');
    		$temp[$k]['doing'] = M('taskReceive')->where(['a.uid'=>$v['id']])->alias('a')->join('__TASK__ b on a.pid=b.id')->count();
//    		$temp[$k]['own']   = M('task')->where(['user_id'=>$v['id']])->getField('title');
    		$temp[$k]['own']   = M('task')->where(['user_id'=>$v['id']])->count();
    		unset($temp[$k]['id']);
    	}
    	$data = $temp;
    	$data[0] = ['用户','新建任务','新任务','进行中任务'];
    	
    	export($data,'总览员工任务'.date('Y-m-d',time()));
    }

    /**
     * 获取未接受任务数量
     */
    public function new_task_num()
    {
    	$model = M('taskReceive');
    	$count = $model->where(['uid'=>$this->user_id,'status'=>1])->count();

    	ajax_success('获取成功',$count);
    }
}