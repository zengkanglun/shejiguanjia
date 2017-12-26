<?php
/*
项目控制器
 */
namespace Home\Controller;
use Think\Controller;

class ProjectController extends CommonController 
{   
    /**
     * [index 项目信息]
     * @Author   HTL
     * @DateTime 2017-10-12T09:17:46+0800
     * @return   [type]                   [description]
     */
	public function index()
    {
        $user_id = $this->user_id; //用户ID
        $project_id = I('post.project_id'); //项目ID
        if($user_id && !$project_id){
            // 应该先查担任项目主管的项目
            $temp_director = M('project')->where(['director_id'=>$user_id,'status'=>0])->field(['add_time','id','name'])->order('add_time desc')->find();
            
            //查询该用户参与的所有项目 工种负责
            $user = M('project_child_work_type')->field('project_child_id')->group('project_child_id')->where("user_id = $user_id")->select();

            if($user){
                foreach($user as $vo){
                    $id[] = $vo['project_child_id'];
                }
                //获取最新的创建的子项目的项目ID
                $where['id'] = array('IN',$id);
                // $where['status'] = 0;
                $project_id = M('project_child')->where($where)->order("add_time desc")->getField('project_id');
            }
            
            $temp_manager = M('project')->where(['id'=>$project_id,'status'=>0])->field(['id','add_time','name'])->find();
            
            // todo:// 暂时未确定是按照参与人员添加时间区分还是按照具体项目添加时间区分,所以目前先做具体项目区分
            $temp_staff = M('staff')->where(['user_id'=>$user_id])->field(['add_time','project_child_id'])->find();
            $temp_staff = M('projectChild')->alias('a')->join('__PROJECT__ b on a.project_id=b.id')->where(['a.id'=>$temp_staff['project_child_id']])->field(['a.project_id','b.add_time'])->find();
// dump($temp_director);
// dump($temp_manager);
// dump($temp_staff);exit; 
            $temp_arr = [];
            $temp_arr['director'] = $temp_director;
            $temp_arr['managers'] = $temp_manager;
            $temp_arr['staff']    = $temp_staff;
            //dump(($temp_arr));
            // sort($temp_arr);
            //dump($temp_arr);exit;
            // 比较两个项目添加时间
            if($temp_director['add_time'] > $temp_manager['add_time'])
            {
                $project_id = $temp_director['id'];
            }else{
                $project_id = $temp_manager['id'];
            }
            // 如果最近的项目的主管没有该用户并且也没有工种负责
            if(!$temp_director && empty($temp_manager))
            {
                $project_id = $temp_staff['project_id'];
            }
        }
        
        if($project_id){
            $project = $this->projectInfo($project_id);
        }else{
            ajax_success('没有项目');
        }
        
	}

    /**
     * [AddProject 添加项目]
     * @Author   HTL
     * @DateTime 2017-10-12T09:19:09+0800
     */
    public function AddProject()
    {
        if(IS_POST){
            $role = M('user')->where(['id'=>$this->user_id])->field(['is_super','authority'])->find();
            if(!$role['is_super'])
            {
                if(!in_array($role['authority'],[1]))
                {
                    ajax_error('没有新建项目的权限');
                }
            }
            $post = I('post.');

            //自动验证
            $rules = [
                ['number', 'require', '项目编号不能为空'],
                ['name', 'require', '项目名称不能为空'],
                // ['project_time', 'require', '立项时间不能为空'],
                // ['province', 'require', '所属区域省份不能为空'],
                // ['city', 'require', '所属区域市区不能为空'],
                // ['building_type', 'number', '建筑类型不合法'],
                // ['stage', 'number', '阶段类型不合法'],
                // ['address', 'require', '项目地址不能为空'],
                // ['build', 'require', '建设单位不能为空'],
                // ['tel', 'isPhone', '请输入正确的建设单位联系电话',1,'function'],
                // ['email', 'isEmail', '请输入正确的建设单位邮箱',1,'function'],
                // ['contact_address', 'require', '建设单位联系地址不能为空'],
                // ['supervisor', 'require', '请输入建设单位项目主管姓名'],
                // ['supervisor_tel', 'isPhone','请输入正确的项目主管联系电话',1,'function'],
                ['director_id', 'require','请选择项目主管'],
                // ['money', 'require','项目总额不能为空'],
            ];

            $project = M('project');
            $data = $project->validate($rules)->create();
            
            if($data){
                //如果有文件上传
                if($_FILES['contract']['name'] != '' && $_FILES['contract']['size'] > 0){
                    $file = uploads('',array('jpg','gif','bmp','png','jpeg','xlsx','doc','docx','xls','txt'),'','./Uploads/contract/');

                    $project->filename = $_FILES['contract']['name']; //合同原文件名
                    $project->file = $file[0]; //文件路径
                }

                $project->project_time = strtotime($post['project_time']); //将立项时间转化为时间戳
                $project->user_id = $this->user_id;
                $project->add_time = time();
                $project->update_time = time();
                //创建项目
                $add = $project->add();
                if($add){

                    //如果有创建项目阶段 就录入
                    if($add && $post['sche']){
                        foreach($post['sche'] as $val){
                            M('schedule')->add([
                                'name'=>$val['name'],
                                'content'=>$val['content'],
                                'money'=>$val['money'],
                                'project_id'=>$add,
                                'update_time'=>time(),
                                'add_time'=>time()
                            ]);
                        }
                    }
                    //添加日志记录
                    $this->log($this->nickname.'添加了项目'.$post['name'],1);
                    ajax_success('项目创建成功',$add);
                }else{
                    ajax_error('项目创建失败，请稍后重试');
                }
            }else{
                ajax_error($project->getError());
            }
        }
    }

    /**
     * [EditProject 编辑项目]
     * @Author   HTL
     * @DateTime 2017-10-12T09:19:28+0800
     */
    public function EditProject()
    {   
        if(IS_POST){
            $post = I('post.');
            //自动验证
            $rules = [
                ['ject_id', 'number', '项目信息不能为空'],
                // ['building_type', 'number', '建筑类型不合法'],
                // ['stage', 'number', '阶段类型不合法'],
                // ['address', 'require', '项目地址不能为空'],
                // ['build', 'require', '建设单位不能为空'],
                // ['money', 'require', '项目合同总额不能为空'],
                // ['tel', "isPhone", '请输入正确的建设单位联系电话',0,"function"],
                // ['email', "isEmail", '请输入正确的建设单位邮箱',0,"function"],
                // ['contact_address', 'require', '建设单位联系地址不能为空'],
                // ['supervisor', 'require', '请输入建设单位项目主管姓名'],
                // ['supervisor_tel', "isPhone",'请输入正确的项目主管联系电话',0,"function"],
            ];
            $project = M('project');
            
            // 编辑前认证权限
            // 查询该项目项目主管
            $director  = $project->where(['id'=>$post['ject_id']])->getField('director_id');
            $authority = M('user')->where(['id'=>$this->user_id])->getField('authority');
            $is_super  = M('user')->where(['id'=>$this->user_id])->getField('is_super');
            if( ($this->user_id != $director) && !$is_super )
            {
                ajax_error('无权编辑项目');
            }
            $_POST['sche_id'] = $post['sche_id'];
            // $project->project_time = strtotime($post['project_time']);
            $_POST['project_time'] = strtotime($post['project_time']);
            $_POST['city'] = strtotime($post['city']);
            $_POST['province'] = strtotime($post['province']);
            // $project->address = $post['address'];
            $data = $project->validate($rules)->create();
            // $data['sched_id'] = $post['sched_id'];
            //查询项目信息
            $project_name = M('project')->where("id = ".$post['ject_id'])->getField('name');
            if($data){
                //如果有文件上传
                if($_FILES['contract']['name'] != '' && $_FILES['contract']['size'] > 0){
                    $file = uploads('',array('jpg','gif','bmp','png','jpeg','xlsx','doc','docx','xls','txt'),'','./Uploads/contract/');

                    $project->filename = $_FILES['contract']['name']; //合同原文件名
                    $project->file = $file[0]; //文件路径
                }
                $project->update_time = time();
                // $project->sched_id = $post['sched_id'];
                if($project->where('id = '.$post['ject_id'])->save()){
                    // echo $project->getLastSql();exit;
                    //添加日志记录
                    switch($_POST['sche_id'])
                    {
                        case -1:
                        $status = 2;
                        break;
                        case 0:
                        $status = 1;
                        break;
                        default:
                        $status = 0;
                        break;
                    }
                    $project->where(['id'=>$post['ject_id']])->save(['status'=>$status,'update_time'=>time()+30]);
                    $this->log($this->nickname.'编辑了项目'.$project_name,1);
                    ajax_success('项目编辑成功');
                }else{
                    ajax_error('项目编辑失败，请稍后重试');
                }
            }else{
                ajax_error($project->getError());
            }
            
        }
    }

    /**
     * [child 子项目录入]
     * @Author   HTL
     * @DateTime 2017-10-12T11:56:39+0800
     * @return   [type]                   [description]
     */
    public function child(){

        $id = I('get.id');

        if(IS_POST){
            $post = I('post.');

            if($post['ject_id']){
                // 判断是否是项目主管或者是超级管理员
                $director = M('project')->where(['id'=>$post['ject_id']])->getField('director_id');
                $is_super = M('user')->where(['id'=>$this->user_id])->getField('is_super');

                if(!$is_super && $director != $this->user_id)
                {
                    ajax_error('无权操作');
                }

                //添加子项目
                if($post['child'])
                {
                	foreach($post['child'] as $val){
                    $add = M('project_child')->add([
                        'name'  =>  $val['name'],
                        'project_id' => $post['ject_id'],
                        'update_time' => time(),
                        'add_time' => time()
                        ]);
                    //添加成功在添加子项目的工种信息
                    if($add){
                        foreach($val['work'] as $vo){
                            if($vo['user_id'])
                            {
                            M('project_child_work_type')->add([
                                'work_id' => $vo['work_id'], //工种ID
                                'user_id' => $vo['user_id'], //工种负责人ID
                                'project_child_id' => $add, //子项目ID
                                'update_time' => time(),
                                'add_time' => time(),
                                ]);
                            // 需要添加该负责人到staff表
                            // add at 2017年11月1日15:05:28
                            
                                M('staff')->add([
                                    'work_id'   => $vo['work_id'],
                                    'user_id'   => $vo['user_id'],
                                    'labor'     => '',
                                    'project_child_id'  => $add,
                                    'add_time'  => time(),
                                    'update_time'   => time()
                                ]);
                            }

                        }
                    }
                }
                }

                ajax_success('子项目添加成功');
            }else{
                ajax_error('项目信息不能为空');
            }
        }

        if($id){
            //获取项目主管ID
            $data['director_id'] = M('project')->where("id = $id")->getField('director_id');
            //查询项目主管
            $data['nickname'] = M('user')->where("id = ".$data['director_id'])->getField('nickname');
            //获取自定义工种列表
            $data['work'] = M('work')->where("type = 1")->field('id,name')->select();

            ajax_success('成功',$data);
        }
    }

    /**
     * [childInfo 获取子项目详情]
     * @Author   HTL
     * @DateTime 2017-10-14T17:16:25+0800
     * @return   [type]                   [description]
     */
    public function childInfo(){
        if(IS_POST){
            $post = I('post.');
            if($post['id']){
                //查询子项目
                $child = M('project_child')->where("id = ".$post['id'])->find();
                if($child){
                    //查询项目信息
                    $project = D('project')->relation('user')->where("id = ".$child['project_id'])->find();
                    //添加项目主管信息
                    $data['director'] = [
                        'user_id' => $project['director_id'],
                        'nickname' => $project['nickname'],
                    ];
                    //查询子项目工种负责人
                    $data['work'] = D('ProjectChildWorkType')->relation(true)->where('project_child_id = '.$post['id'])->field('user_id,work_id')->select();
                    //获取全部默认工种
                    $data['allWork'] = M('work')->where(array('type'=>0))->field('id,name')->select();
                    //获取自定义工种
                    foreach($data['work'] as $vo){
                        $id[] = $vo['work_id'];
                    }
                    if(!empty($id))
                    {
                        $where['id'] = array('NOT IN',$id);
                    }
                    $where['type'] = 1;
                    $data['cust_work'] = M('work')->where($where)->select();

                    ajax_success('成功',$data);
                }else{
                    ajax_error('项目不存在');
                }
            }
        }
        
    }

    /**
     * [delechild 删除子项目]
     * @Author   HTL
     * @DateTime 2017-10-26T17:05:12+0800
     * @return   [type]                   [description]
     */
    public function delechild()
    {
        if(IS_POST){
            $post = I('post.');
            if(!$post['child_id']){ ajax_error('缺少项目信息'); }

            // 判断是否是项目主管或者是超级管理员
            $project_id = M('projectChild')->where(['id'=>$post['child_id']])->getField('project_id');
            $director = M('project')->where(['id'=>$project_id])->getField('director_id');
            $is_super = M('user')->where(['id'=>$this->user_id])->getField('is_super');

            if(!$is_super && $director != $this->user_id)
            {
                ajax_error('无权操作');
            }

            $dele = M('project_child')->where("id = ".$post['child_id'])->delete();
            if($dele){
                //删除相应的信息
                M('project_child_work_type')->where("project_child_id =".$post['child_id'])->delete();
                M('staff')->where("project_child_id =".$post['child_id'])->delete();

                ajax_success('删除成功');
            }else{
                ajax_error('删除失败');
            }
        }
    }

    /**
     * [editchild 编辑子项目负责人]
     * @Author   HTL
     * @DateTime 2017-10-14T17:13:13+0800
     * @return   [type]                   [description]
     */
    public function editchild(){
        $post = I('post.');

        if(IS_POST){
            if($post['director_id'] && $post['project_id']){
                //修改项目主管
                $is_super = M('user')->where(['id'=>$this->user_id])->getField('is_super');
                //如果是超级管理员操作就修改
                if($is_super == 1){
                    $director = M('project')->where(['id'=>$post['project_id']])->save(['director_id'=>$post['director_id'],'update_time'=>time()]);
                }
            }

            $user = $post['user'];
            foreach($post['work_id'] as $key=>$vo){
                //查询是否有数据
                $whe['work_id'] = $vo;
                $whe['project_child_id'] = $post['child_id'];
                $is_data = M('project_child_work_type')->where($whe)->find();
                //if($where['work_id'] == 2)
                    //ajax_success($is_data);
                    //ajax_success($post['child_id']);

                //有就修改没有就添加
                if($is_data){
                    M('project_child_work_type')->where($whe)->save([
                        'user_id' => $user[$key], //工种负责人ID
                        'update_time' => time(),
                    ]);

                    //修复修改负责人时员工表更新条件不明确导致的全部人员都为负责人
                    $where['user_id'] = $is_data['user_id'];
                    M('staff')->where($whe)->save([
                        'user_id'   => $user[$key],
                        'update_time'   => time()
                    ]);
                }else{
                    M('project_child_work_type')->add([
                        'work_id' => $vo,
                        'user_id' => $user[$key],
                        'project_child_id' => $post['child_id'],
                        'add_time' => time(),
                        'update_time' => time(),
                        ]);
                    if($user[$key])
                    {
                        M('staff')->add([
                            'work_id'   => $vo,
                            'user_id'   => $user[$key],
                            'labor'     => '',
                            'project_child_id'  => $post['child_id'],
                            'add_time'  => time(),
                            'update_time'   => time()
                        ]);
                    }
                }
            }
            //添加日志记录
            $project_name = M('project')->where(['id'=>$post['project_id']])->getField('name');
            $this->log($this->nickname.'编辑了项目'.$project_name,1);
            ajax_success('修改成功');
        }else{
            ajax_error('非法请求');
        }
    }

    /**
     * [ProjectLabor 子项目员工分工]
     * @Author   HTL
     * @DateTime 2017-10-17T19:59:23+0800
     */
    public function ProjectLabor()
    {
        if(IS_POST){
            $post = I('post.');
            if(!$post['chile_id']){ ajax_error('缺少项目信息'); }

            //查询子项目员工
            $data['user_id'] = $this->user_id;
            $where['project_child_id'] = $post['chile_id'];
            $where['status'] = 0;
            $data['user'] = D('Staff')->relation(true)->where($where)->field('id,user_id,work_id,labor,content')->page($post['p'],10)->select();
            $count = D('Staff')->relation(true)->where($where)->count();
            $data['count'] = $count;
            $data['page'] = ceil($count/10)?ceil($count/10):1;

            ajax_success('成功',$data);
        }
    }

    /**
     * [history 员工历史工作内容]
     * @Author   HTL
     * @DateTime 2017-10-17T20:43:48+0800
     * @return   [type]                   [description]
     */
    public function history(){
        if(IS_POST){
            $post = I('post.');
            if(!$post['id']){ ajax_error('缺少ID'); }
            if(!$post['chile_id']){ ajax_error('缺少子项目信息'); }

            //查询当前分工情况
            $data['staff'] = D('Staff')->relation(true)->where(['user_id'=>$post['id'],'project_child_id'=>$post['chile_id']])->find();
            // dump($data['staff']);
            $data['staff'] = D('staff')->relation(true)->where(['id'=>$post['id'],'project_child_id'=>$post['chile_id']])->find();
            // dump($data['staff']);
            // exit;
            //查询工种负责人
            $project_id = M('project_child')->where("id = ".$post['chile_id'])->getField('project_id');
            $principal = M('project')->where("id = $project_id")->getField('director_id');
            $data['staff']['director'] = M('user')->where("id = $principal")->getField('nickname');

            $data['project_staff'] = M('project_staff_commission')->where(['project_child_id'=>$post['chile_id'],'user_id'=>$post['id']])->field('labor,project_commission_id,content')->select();
            foreach($data['project_staff'] as $key=>$vo){
                $time = M('project_commission')->where("id = ".$vo['project_commission_id'])->field('start_time,end_time')->find();
                $data['project_staff'][$key]['start_time'] = date('Y.m.d',$time['start_time']);
                $data['project_staff'][$key]['end_time'] = date('Y.m.d',$time['end_time']);
            }

            ajax_success('',$data);
        }
    }

       /**
     * [history_2 员工历史工作内容]
     * @Author   HTL
     * @DateTime 2017-10-17T20:43:48+0800
     * @return   [type]                   [description]
     */
    public function history_2(){
        if(IS_POST){
            $post = I('post.');
            if(!$post['id']){ ajax_error('缺少ID'); }
            if(!$post['chile_id']){ ajax_error('缺少子项目信息'); }

            //查询当前分工情况
            $data['staff'] = D('Staff')->relation(true)->where(['user_id'=>$post['id'],'project_child_id'=>$post['chile_id']])->find();
            // dump($data['staff']);
            
            //查询工种负责人
            $project_id = M('project_child')->where("id = ".$post['chile_id'])->getField('project_id');
            $principal = M('project')->where("id = $project_id")->getField('director_id');
            $data['staff']['director'] = M('user')->where("id = $principal")->getField('nickname');

            $data['project_staff'] = M('project_staff_commission')->where(['project_child_id'=>$post['chile_id'],'user_id'=>$post['id']])->field('labor,project_commission_id,content')->select();
            foreach($data['project_staff'] as $key=>$vo){
                $time = M('project_commission')->where("id = ".$vo['project_commission_id'])->field('start_time,end_time')->find();
                $data['project_staff'][$key]['start_time'] = date('Y.m.d',$time['start_time']);
                $data['project_staff'][$key]['end_time'] = date('Y.m.d',$time['end_time']);
            }

            ajax_success('',$data);
        }
    }

    /**
     * [EditLabor 修改工作内容]
     * @Author   HTL
     * @DateTime 2017-10-17T21:04:53+0800
     */
    public function EditLabor(){
        if(IS_POST){
            $post = I('post.');
            if(!$post['id']){ ajax_error('缺少列表ID'); }
            //if(!$post['labor']){ ajax_error('工作内容不能为空'); }

            if($post['labor']){ //修改工作内容
                $data['content'] = $post['labor'];
            }
            if($post['content']){ //修改分工情况
                $data['labor'] = $post['content'];
            }
            $data['update_time'] = time();
            $save = M('staff')->where("id = ".$post['id'])->save($data);
            if($save){
                ajax_success('修改成功');
            }else{
                ajax_error('修改失败');
            }
        }
    }

    /**
     * [Contacts 项目通讯录]
     * @Author   HTL
     * @DateTime 2017-10-13T14:56:16+0800
     * @modify 直接查找staff表即可
     */
    public function contacts(){
        $project_id = I('post.project_id');

        if($project_id){
            //查询项目信息
            $project = M('project')->where("id = $project_id")->find();
            //dump($project);exit;
            if($project){
                //查询项目的所有子项目
                $child = M('project_child')->where("project_id = $project_id")->field('id')->select();

                foreach($child as $vo){
                    $child_id[] = $vo['id'];
                }

                $where['project_child_id'] = array('IN',$child_id);
                //查询项目主管
                $data['director'] = M('user')->where("id = ".$project['director_id'])->field('nickname,mobile,qq')->find();
                //查询项目工种主管
//                $child = D('ProjectChildWorkType')->where($where)->field('id,user_id,work_id')->select();
                //查询所有参加了项目的员工
                $staff = D('Staff')->relation(true)->where($where)->field('id,user_id,work_id')->select();

                //$child = array_merge($child,$staff);
                $child = $staff;
                $sta = [];
                foreach($child as $key=>$val) {

                    $user = M('user')->where("id = ".$val['user_id'])->find();
                    if ( !$user ) continue;
//                        $sta[$key]['nickname'] = $user['nickname'];
//                        $sta[$key]['mobile'] = $user['mobile'];
//                        $sta[$key]['qq'] = $user['qq'];
//                        $sta[$key]['work']['name'] = M('work')->where("id = ".$val['work_id'])->getField('name');
//                    }

                    if ( array_key_exists($val['user_id'], $sta) ) {
                        continue;
                    } else {
                        $sta[$val['user_id']] = [
                            'nickname' => $user['nickname'],
                            'mobile' => $user['mobile'],
                            'qq' => $user['qq'],
                        ];
                        $sta[$val['user_id']]['work']['name'] = M('work')->where("id = ".$val['work_id'])->getField('name');
                    }

                }

                if ( $sta ) sort($sta);

                $data['staff'] = $sta;
//dump($data);exit;
                ajax_success('成功',$data);
            }else{
                ajax_error('项目不存在');
            }
        }
        
    }

    /**
     * [projectInfo 项目详情]
     * @Author   HTL
     * @DateTime 2017-10-13T10:33:21+0800
     * @param    [type]                   $id [项目ID]
     */
    public function projectInfo($id){

        if($id){
            //查询项目信息
            $project = M('project')->where("id = $id")->find();

            $project['is_director'] = 0;
            if ( $project['director_id'] == $this->user_id || $this->is_super ) $project['is_director'] = 1;
            $project['nickname'] = M('user')->where("id = ".$project['director_id'])->getField('nickname');
            $temp_date = date('Y/m/d',$project['project_time']);
            $project['project_time'] = $temp_date ? $temp_date : '暂无';

            //查询建筑类型、阶段类型
            $building = M('build_type')->where("id = ".$project['building_type'])->find();
            $stage = M('stage_types')->where("id = ".$project['stage'])->find();
            $project['building_type'] = $building['name'];
            $project['building_id'] = $building['id'];
            $project['stage'] = $stage['name'];
            $project['stage_id'] = $stage['id'];
            $project['file'] = 'http://' . $_SERVER['SERVER_NAME'] . $project['file'];
            //查询项目进度和收款情况
            $schedule = M('schedule')->where("id = ".$project['sche_id'])->find();
            if(!$schedule)
            {
                switch($project['sche_id'])
                {
                    case -2:
                        $temp_schedule = '进行中';
                        break;
                    case -1:
                        $temp_schedule = '未实施';
                        break;
                    case 0:
                        $temp_schedule = '已完结';
                        break;
                }
            }else{
                $temp_schedule = $schedule['name'];
            }
            $project['sched_name'] = $temp_schedule;
            $project['receipt'] = abs($schedule['receive'])?$schedule['receive']:0;

            //查询子项目
            $project['child'] = D('ProjectChild')->relation(true)->where("project_id = $id")->field('id,name,project_id')->select();

            //返回项目进度信息(下拉列表)
            $project['schedule'] = M('schedule')->where(['project_id'=>$id])->field(['id','name'])->select();
            array_unshift($project['schedule'],['id'=>-2,'name'=>'进行中']);
            array_unshift($project['schedule'],['id'=>-1,'name'=>'未实施']);
            array_push($project['schedule'],['id'=>0,'name'=>'项目完结']);
            //查询工种和工种负责人
            foreach($project['child'] as $key=>$vo){
                foreach($vo['work_type'] as $k=>$val){
                    $nickname = M('user')->where("id = ".$val['user_id'])->getField('nickname');
                    $project['child'][$key]['work_type'][$k]['nickname'] = $nickname?$nickname:'';
                    $project['child'][$key]['work_type'][$k]['work'] = M('work')->where("id = ".$val['work_id'])->getField('name');
                }
            }
            ajax_success('成功',$project);
        }
        
    }

    /**
     * [labor 增加项目员工分工]
     * @Author   HTL
     * @DateTime 2017-10-14T10:08:03+0800
     * @return   [type]                   [description]
     */
    public function labor(){

        if(IS_POST){
            $post = I('post.');

            $work_type = $post['work_id'];
            if(!$post['work_id'])
            {
                ajax_error('缺少项目工种id');
            }
            $user = $this->user_id;
            $user = $post['user_id'];
            if($user){
                //自动验证
                $rules = [
                    ['user_id', 'require', '请选择员工'],
                    ['labor', 'require', '请输入分工情况'],
                    ['project_child_id', 'number', '项目信息不完整'],
                ];

                $staff = M('staff');
                $temp  = $staff->where(['work_id'=>$work_type,'user_id'=>$user,'project_child_id'=>$post['project_child_id']])->find();
                if($temp)
                {
                    // 修改
                    if($staff->where(['work_id'=>$work_type,'user_id'=>$user,'project_child_id'=>$post['project_child_id']])->save(['labor'=>$post['labor'], 'status' => 0]))
                    {
                        ajax_success('修改成功');
                    }
                    ajax_error('修改失败');
                }
                // 添加
                if($staff->validate($rules)->create()){
                    //获取工种ID
//                    $work_type = M('project_child_work_type')->where(['project_child_id'=>$post['project_child_id'],'user_id'=>$user])->getField('work_id');
                    $work_type = $work_type;
                    $staff->add_time = time();
                    $staff->update_time = time();
                    $staff->work_id = $work_type;
                    if($staff->add()){
                        ajax_success('添加成功');
                    }else{
                        ajax_error('添加失败');
                    }
                }else{
                    ajax_error($staff->getError());
                }
            }else{
                ajax_error('缺少用户信息');
            }
        }
    }

    /**
     * [Election 选人]
     * @Author   HTL
     * @DateTime 2017-10-12T16:23:11+0800
     */
    public function election(){

        //获取工种人员
        $user['work'] = D('Work')->relation(true)->field('id,name')->select();
        //获取全部人员
        $user['all'] = M('user')->where('is_del = 0')->field('id,nickname')->select();

        ajax_success('成功',$user);
    }

    /**
     * [project_list 总览项目列表]
     * @Author   HTL
     * @DateTime 2017-10-18T10:05:47+0800
     * @return   [type]                   [description]
     */
    public function project_list()
    {
        if(IS_POST){
            $post = I('post.');
            $user_id = $this->user_id;
            if($user_id){
                //查询用户身份
                $Identity = M('user')->where("id = $user_id")->getField('is_super');
                $authority = M('user')->where(['id'=>$this->user_id])->getField('authority');

                if($Identity != 1  && (!in_array(6,explode(',',$authority)))){
                    //查询项目中项目主管为该用户的项目
                    $temp_ids = M('project')->where(['director_id'=>$user_id])->getField('group_concat(id)');
                    $temp_ids = explode(',',$temp_ids);
                    
                    //dump($temp_ids);exit;
                    //如果不是超级管理员就只能看自己参与的项目
                    $project_child_id = M('staff')->distinct(true)->field('project_child_id')->where("user_id = $user_id")->select();
                
                    //查询项目ID
                    foreach($project_child_id as $k=>$vo){
                        $project_id[$k] = M('project_child')->where("id = ".$vo['project_child_id'])->getField('project_id');
                        if($project_id[$k] == null)
                        {
                            unset($project_id[$k]);
                        }
                    }
                    if($temp_ids)
                    {
                        if($project_id)
                        {
                            $project_id = array_merge($temp_ids,$project_id);
                        }else{
                            $project_id = $temp_ids;
                        }
                    }
                    if($project_id)
                    {
                        $project_id = array_merge($temp_ids,$project_id);
                        $project_id = array_unique($project_id);
                        $where['id'] = array('IN',$project_id);
                    }else{
                        ajax_error('');
                    }
                }

                if($post['go_time'] && $post['end_time']){
                    $where['project_time'] = array('BETWEEN',array(strtotime($post['go_time']),strtotime($post['end_time'])));
                }
                //进行中的项目
                $project['get_on'] = D('project')->relation(['BuildType','user'])->where($where)->where(['status'=>0])->field('id,name,building_type,province,city,build,director_id,project_time,status')->order('add_time desc')->page($post['p1'],10)->select();
                foreach($project['get_on'] as $k=>$v)
                {
                    $pid = M('project')->where(['id'=>$v['id']])->getField('director_id');
                    $build_name = M('build_type')->where(array('id'=>$v['building_type']))->getField('name');
                    $project['get_on'][$k]['build_name'] = $build_name;
                    if(M('user')->where(['id'=>$this->user_id])->getField('is_super'))
                    {
                        $project['get_on'][$k]['edit'] = 1;
                    }else{
                        if($this->user_id == $pid)
                        {
                            $project['get_on'][$k]['edit'] = 1;
                        }else{
                            $project['get_on'][$k]['edit'] = 0;
                        }
                    }
                }
                $project['get_on'] = datetime($project['get_on'],'project_time');
                $count = D('project')->distinct(true)->relation(['BuildType','user'])->where($where)->where(['status'=>0])->count();

                //完结的项目
                $project['end'] = D('project')->relation(['BuildType','user'])->where($where)->where("status = 1")->field('id,name,building_type,province,city,build,director_id,project_time,status')->order('add_time desc')->page($post['p2'],10)->select();
                foreach($project['end'] as $k=>$v)
                {
                    $pid = M('project')->where(['id'=>$v['id']])->getField('director_id');
                    $build_name = M('build_type')->where(array('id'=>$v['building_type']))->getField('name');
                    $project['end'][$k]['build_name'] = $build_name;
                    if(M('user')->where(['id'=>$this->user_id])->getField('is_super'))
                    {
                        $project['end'][$k]['edit'] = 1;
                    }else{
                        if($this->user_id == $pid)
                        {
                            $project['end'][$k]['edit'] = 1;
                        }else{
                            $project['end'][$k]['edit'] = 0;
                        }
                    }
                }
                $project['end'] = datetime($project['end'],'project_time');
                $count2 = D('project')->relation(['BuildType','user'])->where($where)->where("status = 1")->count();
                
                //中断的项目
                $project['Interrupted'] = D('project')->relation(['BuildType','user'])->where($where)->where("status = 2")->field('id,name,building_type,province,city,build,director_id,project_time,status')->order('add_time desc')->page($post['p3'],10)->select();

                foreach($project['Interrupted'] as $k=>$v)
                {
                    $pid = M('project')->where(['id'=>$v['id']])->getField('director_id');
                    $build_name = M('build_type')->where(array('id'=>$v['building_type']))->getField('name');
                    $project['Interrupted'][$k]['build_name'] = $build_name;

                    if(M('user')->where(['id'=>$this->user_id])->getField('is_super'))
                    {
                        $project['Interrupted'][$k]['edit'] = 1;
                    }else{
                        if($this->user_id == $pid)
                        {
                            $project['Interrupted'][$k]['edit'] = 1;
                        }else{
                            $project['Interrupted'][$k]['edit'] = 0;
                        }
                    }
                }
                $project['Interrupted'] = datetime($project['Interrupted'],'project_time');
                $count3 = D('project')->relation(['BuildType','user'])->where($where)->where("status = 2")->count();

                //echo D('project')->getLastSql();exit;
                //获取页数
                $project['count'][] = $count;
                $project['count'][] = $count2;
                $project['count'][] = $count3;
                $project['page'][] = ceil($count/10)?ceil($count/10):1;
                $project['page'][] = ceil($count2/10)?ceil($count2/10):1;
                $project['page'][] = ceil($count3/10)?ceil($count3/10):1;

                ajax_success('成功',$project);
            }else{
                ajax_error('缺少用户信息');
            }
        }
    }

    /**
     * [project_data 管理模块项目列表]
     * @Author   HTL
     * @DateTime 2017-10-18T20:30:30+0800
     * @return   [type]                   [description]
     */
    public function project_data(){
        if(IS_POST){
            $post = I('post.');
            //dump($post);exit;
            $user_id = $this->user_id;
            if($user_id){
                //查询用户身份
                $Identity = M('user')->where("id = $user_id")->getField('is_super');
                //dump($Identity);exit;
                $stat = true;
                if($Identity != 1){ //不是系统管理员
                    //得到是工种负责人的子项目ID
                    $project_child_id = M('project_child_work_type')->distinct(true)->field('project_child_id')->where("user_id = $user_id")->select();
                    //dump($project_child_id);exit;
                    //查询项目ID
                    $project_id = array();
                    foreach($project_child_id as $vo){
                        $project_id[] = M('project_child')->where("id = ".$vo['project_child_id'])->getField('project_id');
                    }
                    //dump($project_id);exit;
                    //得到是项目主管的项目ID
                    $project_ids = M('project')->where("director_id = $user_id")->getField('id',true);
                    //dump($project_ids);exit;
                    // dump($project_id);
                    // dump($project_ids);
                    //合并数组
                    if($project_ids)
                    {
                        $project_id = array_merge($project_id,$project_ids);
                    }
                    // dump($project_id);exit;
                    if($project_id){
                        $where['id'] = array('IN',$project_id);
                    }else{
                        $stat = false;
                    }
                }
                if($stat){
                    //dump($where);exit;
                    //进行中的项目
                    $project['get_on'] = D('project')->where($where)->where("status = 0")->field('id,name')->order('add_time desc')->page($post['p1'],10)->select();
                    //echo D('project')->getLastSql();exit;
                    $project['get_on'] = $this->Identity($project['get_on'],$this->user_id,$Identity);
//                    dump($project);exit;
                    $count = D('project')->where($where)->where("status = 0")->count();
                    //完结的项目
                    $project['end'] = D('project')->where($where)->where("status = 1")->field('id,name')->order('add_time desc')->page($post['p2'],10)->select();
                    $project['end'] = $this->Identity($project['end'],$this->user_id,$Identity);
                    $count2 = D('project')->where($where)->where("status = 1")->count();
                }else{
                    $project['get_on'] = [];
                    //完结的项目
                    $project['end'] = [];
                }

                //获取页数
                $project['count'][] = $count?$count:0;
                $project['count'][] = $count2?$count2:0;
                $project['page'][] = ceil($count/10)?ceil($count/10):1;
                $project['page'][] = ceil($count2/10)?ceil($count2/10):1;
                

                ajax_success('成功',$project);
            }else{
                ajax_error('缺少用户信息');
            }
        }
    }

    /**
     * [Identity 查询用户对于项目都有什么身份]
     * @Author   HTL
     * @DateTime 2017-10-18T20:57:16+0800
     * @param    [type]                   $data     [数组]
     * @param    [type]                   $user_id  [用户ID]
     */
    public function Identity($data=array(),$user_id,$type){
        //ajax_success('',$user_id);
        $k = 0;
        foreach($data as $key=>$vo){
            if($type != 1){
                $cid = []; //重置
                // 查找项目主管是该用户的项目
                $project = M('project')->where(['director_id'=>$user_id,'id'=>$vo['id']])->find();
                // dump($project);
                //查询出项目的所有子项目ID
                $child_id = M('project_child')->where(['project_id'=>$vo['id']])->field('id')->select();
                // dump($child_id);
                foreach($child_id as $id){
                    $cid[] = $id['id'];
                }
                // dump($cid);
                $where['user_id'] = $user_id;
                // dump($where);
                //查询出所负责的工种
                //如果有子项目时
                if(count($cid))
                {
                    $where['project_child_id'] = ['IN',$cid];
                    $chield_work = D('ProjectChildWorkType')->relation('work')->distinct(true)->field('work_id')->where($where)->select();
                }
                $data[$key]['chield_work'] = $chield_work;
                //如果是项目主管，就添加进去
                if($project){
                    $data[$key]['chield_work'][] = ['work_id'=>0,'name'=>'项目主管'];
                }
            }else{
                $data[$key]['chield_work'][] = ['work_id'=>-1,'name'=>'系统管理员'];
            }
        }
        return $data;
    }

    /**
     * [chield_work 获取子项目工种]
     * @Author   HTL
     * @DateTime 2017-10-30T10:07:50+0800
     * @return   [type]                   [description]
     */
    public function chile_work()
    {
        $post = I('post.');
        if($post['chile_id']){
            $work = D('ProjectChildWorkType')->relation('work')->where(['project_child_id'=>$post['chile_id']])->field('work_id')->select();

            ajax_success('获取成功',$work);
        }else{
            ajax_error('缺少子项目信息');
        }
    }
    
    /**
     * 根据子项目id+用户id获取相应的工种列表
     **/
    public function work_list(){
    	$id    = I('get.id');//子项目id
        $uid   = $this->user_id;
    	$model = M('projectChildWorkType');
    	$where = [];
    	if(!M('user')->where(['id'=>$uid])->getField('is_super'))
        {
            $where['user_id'] = $uid;
        }
        $where['project_child_id'] = $id;
    	$temp  = $model->where($where)->getField('group_concat(work_id)');
//    	echo $model->getLastSql();
//    	dump($temp);exit;
//    	file_put_contents('lastsql.txt',$model->getLastSql());
    	if($temp)
    	{
    		$data = M('work')->where(['id'=>['in',$temp]])->field(['id','name'])->select();
    		
    		ajax_success('获取成功',$data);
    	} 
    	
    	ajax_error('该项目暂未选择工种负责人');
    }

    /**
     * 根据子项目id+工种id显示工种员工列表
     */
    public function user_list()
    {
        $id   = I('get.id');// 子项目id
        $work = I('get.work_id'); // 工种id
        $uid  = $this->user_id;
//        $page = I('get.p',1);
        if(!$id)
        {
            ajax_error('缺少项目信息');
        }

        $data['user_id']            = $uid;
        $where['project_child_id']  = $id;
        $where['status']            = 0;
        $where['work_id']           = $work;

        $data['user']               = D('staff')->relation(true)->where($where)->field(['id','user_id','work_id','labor','content'])->select();
        $count                      = D('staff')->relation(true)->where($where)->count();
//        $data['count']              = $count;
//        $data['page']               = ceil($count/10) ? ceil($count/10) : 1;

        ajax_success('成功',$data);
    }


    
    public function export()
    {
        $user_id = $this->user_id;
        if($user_id){
            //查询用户身份
            $Identity = M('user')->where("id = $user_id")->getField('is_super');

            if($Identity != 1){
                //查询项目中项目主管为该用户的项目
                $temp_ids = M('project')->where(['director_id'=>$user_id])->getField('group_concat(id)');
                $temp_ids = explode(',',$temp_ids);
                //dump($temp_ids);exit;
                //如果不是超级管理员就只能看自己参与的项目
                $project_child_id = M('staff')->distinct(true)->field('project_child_id')->where("user_id = $user_id")->select();
            
                //查询项目ID
                foreach($project_child_id as $k=>$vo){
                    $project_id[$k] = M('project_child')->where("id = ".$vo['project_child_id'])->getField('project_id');
                    if($project_id[$k] == null)
                    {
                        unset($project_id[$k]);
                    }
                }
                if($temp_ids)
                {
                    $project_id = array_merge($temp_ids,$project_id);
                }
                if($project_id)
                {
                    $project_id = array_merge($temp_ids,$project_id);
                    $where['id'] = array('IN',$project_id);
                }
            }

            if($post['go_time'] && $post['end_time']){
                $where['project_time'] = array('BETWEEN',array(strtotime($post['go_time']),strtotime($post['end_time'])));
            }
            //进行中的项目
            $project['get_on'] = D('project')->relation(['BuildType','user'])->where($where)->where(['status'=>0])->field('id,name,building_type,province,city,build,director_id,project_time,status')->order('add_time desc')->select();
            
            $project['get_on'] = datetime($project['get_on'],'project_time');
            

            //完结的项目
            $project['end'] = D('project')->relation(['BuildType','user'])->where($where)->where("status = 1")->field('id,name,building_type,province,city,build,director_id,project_time,status')->order('add_time desc')->select();
            
            $project['end'] = datetime($project['end'],'project_time');
            
            
            //中断的项目
            $project['Interrupted'] = D('project')->relation(['BuildType','user'])->where($where)->where("status = 2")->field('id,name,building_type,province,city,build,director_id,project_time,status')->order('add_time desc')->select();
            
            $project['Interrupted'] = datetime($project['Interrupted'],'project_time');
           
            $type = I('get.type',1);

            switch($type)
            {
                case 1:
                // get on
                break;
                case 2:
                //end
                break;
                case 3:
                //Interrupted
                break;
            }
    }
    }

    public function project_export_doing()
    {
        
    }
}