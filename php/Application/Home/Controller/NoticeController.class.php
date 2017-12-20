<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/10/10
 * Time: 20:21
 */
namespace Home\Controller;
use Think\Controller;
use Think\Page;
use Org\Net\Http;
/**
 * 通知模块
 * Class NoticeController
 * @package Home\Controller
 */
class NoticeController extends CommonController
{
    /**
     * 获取新通知列表
     */
    public function new_notice()
    {
        $model = D('noticeReceive');
        $count = $model->where(['uid'=>$this->user_id,'status'=>1])->count();
        $page  = new Page($count,5);
        $data['count'] = $count;
        $data['page']  = ceil($count/5);
        $data['data']  = $model
            ->alias('a')
            ->relation(true)
            ->join('__NOTICE__ b on a.pid=b.id')
            ->where(['a.uid'=>$this->user_id,'a.status'=>1])
            ->field(['a.id','b.id'=>'pid','b.title','b.project_id','b.user_id','b.addtime','b.type'])
            ->limit($page->firstRow.','.$page->listRows)
            ->select();

        foreach ($data['data'] as $k=>$v)
        {
            $data['data'][$k]['project_id'] = M('project')->where(['id'=>$v['project_id']])->getField('name');
            $data['data'][$k]['user_id']    = M('user')->where(['id'=>$v['user_id']])->getField('nickname');
            $data['data'][$k]['addtime']    = date('Y-m-d',$v['addtime']);
            $data['data'][$k]['type']       = M('noticeType')->where(['id'=>$v['type']])->getField('name');
        }

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
     * 获取已读通知列表
     */
    public function read_notice()
    {
        $model = M('noticeReceive');
        $count = $model->where(['uid'=>$this->user_id,'status'=>2])->count();
        $page  = new Page($count,5);
        $data['count'] = $count;
        $data['page']  = ceil($count/5);
        $data['data']  = $model
            ->alias('a')
            ->join('__NOTICE__ b on a.pid=b.id')
            ->where(['a.uid'=>$this->user_id,'a.status'=>2])
            ->field(['a.id','b.id'=>'pid','b.title','b.project_id','b.user_id','b.addtime','b.type'])
            ->limit($page->firstRow.','.$page->listRows)
            ->select();

        foreach ($data['data'] as $k=>$v)
        {
            $data['data'][$k]['project_id'] = M('project')->where(['id'=>$v['project_id']])->getField('name');
            $data['data'][$k]['user_id']    = M('user')->where(['id'=>$v['user_id']])->getField('nickname');
            $data['data'][$k]['addtime']    = date('Y-m-d',$v['addtime']);
            $data['data'][$k]['type']       = M('noticeType')->where(['id'=>$v['type']])->getField('name');
        }

        ajax_success('获取成功',$data);
    }

    /**
     * 获取已回复通知列表
     */
    public function reply()
    {
        $model = M('noticeReceive');
        $count = $model->where(['uid'=>$this->user_id,'status'=>1])->count();
        $page  = new Page($count,5);
        $data['count'] = $count;
        $data['page']  = ceil($count/5);
        $data['data']  = $model
            ->alias('a')
            ->join('__NOTICE__ b on a.pid=b.id')
            ->where(['a.uid'=>$this->user_id,'a.status'=>3])
            ->field(['a.id','b.id'=>'pid','b.title','b.project_id','b.user_id','b.addtime','b.type'])
            ->limit($page->firstRow.','.$page->listRows)
            ->select();

        foreach ($data['data'] as $k=>$v)
        {
            $data['data'][$k]['project_id'] = M('project')->where(['id'=>$v['project_id']])->getField('name');
            $data['data'][$k]['user_id']    = M('user')->where(['id'=>$v['user_id']])->getField('nickname');
            $data['data'][$k]['addtime']    = date('Y-m-d',$v['addtime']);
            $data['data'][$k]['type']       = M('noticeType')->where(['id'=>$v['type']])->getField('name');
        }

        ajax_success('获取成功',$data);
    }

    /**
     * 获取已发通知列表
     */
    public function own_reply()
    {
        $model = M('notice');
        $count = $model->where(['user_id'=>$this->user_id])->count();
        $page  = new Page($count,5);
        $data['count'] = $count;
        $data['page']  = ceil($count/5);

        $data['data']  = $model
            ->where(['user_id'=>$this->user_id])
            ->field(['type','project_id','title','user_id','addtime','id'])
            ->limit($page->firstRow.','.$page->listRows)
            ->select();

        foreach ($data['data'] as $k=>$v)
        {
            $data['data'][$k]['project_id'] = M('project')->where(['id'=>$v['project_id']])->getField('name');
            $data['data'][$k]['user_id']    = M('user')->where(['id'=>$v['user_id']])->getField('nickname');
            $data['data'][$k]['addtime']    = date('Y-m-d',$v['addtime']);
            $data['data'][$k]['type']       = M('noticeType')->where(['id'=>$v['type']])->getField('name');
        }

        ajax_success('获取成功',$data);
    }

    /**
     * 获取通知详情
     */
    public function info()
    {
        $id     = I('get.id',0);
//        $data   = M('noticeReceive')
//            ->alias('a')
//            ->join('__NOTICE__ b on a.pid=b.id')
//            ->where(['a.id'=>$id])
//            ->field(['b.type','b.project_id','b.title','b.user_id','b.file_name','b.content','b.reply'])
//            ->find();
        $data = D('notice')
            ->where(['id'=>$id])
            ->field(['type','project_id','title','user_id','file_name','content','reply'])
            ->find();
        if(!$data)
        {
            ajax_error('数据不存在');
        }
        $data['project_id'] = M('project')->where(['id'=>$data['project_id']])->getField('name');
        $data['user_id']    = M('user')->where(['id'=>$data['user_id']])->getField('nickname');
        $data['addtime']    = date('Y-m-d',$data['addtime']);
        $data['type']       = M('noticeType')->where(['id'=>$data['type']])->getField('name');
        ajax_success('获取成功',$data);
    }

    /**
     * 回复通知内容
     */
    public function reply_content()
    {
        if(IS_POST)
        {
            $post       = I('post.');
            // notice receive id
            $id         = $post['id'];
            $content    = $post['content'];
            if(!$id || !$content)
            {
                ajax_error('数据非法');
            }

            $pid        = M('noticeReceive')->where(['id'=>$id])->getField('pid');

            if(M('notice')->where(['id'=>$pid])->save(['reply'=>$content]))
            {
                // 更改状态为已回复
                M('noticeReceive')->where(['id'=>$id])->save(['status'=>3]);
                ajax_success('回复成功');
            }

            ajax_error('回复失败');
        }
    }

    /**
     * 设置为已读
     */
    public function read()
    {
        $id = I('get.id', 0, 'intval');
        if (M('noticeReceive')->where(['id' => $id])->save(['status' => 2]))
        {
            ajax_success();
        }

        ajax_error();
    }

    /**
     * 删除
     */
    public function del()
    {
        $id = I('get.id',0);
        $type = I('get.type',0);
        if(!in_array($type,[1,2,3,4]))
        {
            ajax_error('缺少参数');
        }
        switch ($type)
        {
            case 1:
            case 2:
            case 3:
                $data = M('noticeReceive')->where(['id'=>$id])->field(['uid','pid'])->find();
                if(!$data || $data['user_id'] != $this->user_id)
                {
                    ajax_error('任务不存在或任务不属于你');
                }
                if(M('noticeReceive')->where(['id'=>$id])->save(['status'=>4]))
                {
                    M('recycled')->add(['pid'=>$id,'kind'=>3,'type'=>$type,'del_time'=>time(),'user_id'=>$this->user_id]);
                    $title = M('notice')->where(['id'=>$data['pid']])->getField('title');
                    $this->log("删除了任务{$title}",4);
                    ajax_success();
                }

                ajax_error();
                break;
            case 4:
                break;
        }

    }
    /**
     * 创建通知
     */
    public function create()
    {
        if(!$this->user_id)
        {
            ajax_error('尚未登录');
        }
        if(!$this->max_upload_size)
        {
            ajax_error('尚未设置上传文件大小限制,暂不能上传文件');
        }
        $post = I('post.');
        $model = D('notice');

        if($_FILES['file']['name'])
        {
            $res = uploads('notice/',['jpg','gif','png','rar','zip','doc','xls','txt'],$this->max_upload_size);

            if(!is_array($res))
            {
                ajax_error($res);
            }
            $post['file'] = $res[0];
            $file_name = getUploadFileNameWithoutSuffix($_FILES['file']['name']);
            if(!$file_name)
            {
                ajax_error('上传文件名为空');
            }
            $post['file_name'] = $file_name;
        }
        $post['user_id'] = $this->user_id;
        $post = $model->create($post);

        if($id = $model->add($post))
        {
            $receive = D('noticeReceive');
            foreach(explode(',',$post['receiver']) as $v)
            {
            	$data = [];
            	$data['uid'] = $v;
            	$data['pid'] = $id;
            	$data = $receive->create($data);
            	$receive->add($data);
            
           		unset($data);
            }
            $this->log("新建了通知标题为{$post['title']},内容为{$post['content']}",4);
            ajax_success('新建成功');
        }

        ajax_error($model->getError());
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
        $data = M('notice')->where(['id'=>$id])->field(['file','file_name'])->find();

        if($data['file'])
        {
            $path = strstr($_SERVER['SCRIPT_NAME'],'/index.php',1);
            if(!is_file($_SERVER['DOCUMENT_ROOT'].$path.$data['file']))
            {
                ajax_error('文件不存在');
            }
            $suffix     = getFileSuffix($data['file'])[0];
            Http::download('.'.$data['file'],$data['file_name'].$suffix);
        }
        ajax_error('下载文件不存在');
    }

    /**
     * 获取未读消息条数
     */
    public function get_number()
    {
        $count = M('noticeReceive')->where(['uid'=>$this->user_id,'status'=>1])->count();

        ajax_success($count);
    }
}