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
 * 管理->项目计提
 *
 * Class CommissionController
 * @package Home\Controller
 */
class CommissionController extends CommonController
{

    /**
     * 主管/管理员 -> 发起计提(操作详情)
     */
    public function getProjectCommission() {

        $project_id = I('get.project_id', 0, 'intval');     //项目ID
        $project_child_id = I('get.project_child_id', 0, 'intval');     //子项目ID

        if ( $project_id <= 0 ) ajax_error('参数错误');

        $projectMod = M('project');
        $project_info = $projectMod->alias('project')
            ->field([
                'project.id' => 'project_id',       //项目ID
                'project.name' => 'project_name',   //项目名称
                "from_unixtime(project_time, '%Y-%m-%d')" => 'project_time',                     //立项时间
                'schedule.name' => 'stage',         //项目阶段
            ])
            ->join('left join s_schedule schedule on schedule.id = project.sche_id')
            ->where(['project.id' => $project_id])
            ->find();
        if ( !$project_info ) ajax_error('项目信息不存在');

        //获取当前子项目信息
        $project_child_list = M('project_child')->where(['project_id' => $project_id])->order('id asc')->select();
        if ( !$project_child_list ) ajax_error('项目没有创建子项目');
        if ( !$project_child_id ) $project_child_id = $project_child_list[0]['id'];   //默认第一个子项目

        $project_child_info = [];
        foreach ( $project_child_list as $key => $value ) {

            $project_child_info[$key] = [
                'project_id' => $project_id,
                'project_child_id' => $value['id'],
                'project_child_name' => $value['name'],
                'is_current' => false,
            ];
            if ( $value['id'] == $project_child_id ) {
                $project_child_info[$key]['is_current'] = true;
            }
        }

        //当前子项目的工种分配情况
        $current_work_list = M('project_child_work_type')->alias('pcwt')->field([
                'pcwt.project_child_id',    //子项目ID
                'pcwt.work_id',             //工种ID
                'w.name' => 'work_name',    //工种名称
                'u.nickname' => 'username',               //工种负责人
            ])
            ->join('s_work w on w.id = pcwt.work_id')
            ->join('s_user u on u.id = pcwt.user_id')
            ->where(['pcwt.project_child_id' => $project_child_id])
            ->select();

        //查找当前进行中的计提
        $current_commission_list = [
            'project_commission_id' => 0,
            'is_submit' => 0,
            'status' => 0,
            'list' => [],
        ];
        $project_commission_info = M('project_commission')->where(['project_child_id' => $project_child_id, 'is_finish' => 0])->find();
        if ( $project_commission_info ) {

            $current_commission_list = [
                'project_commission_id' => $project_commission_info['id'],
                'is_submit' => $project_commission_info['is_submit'],
                'status' => $project_commission_info['status'],
            ];

            $current_commission_list['list'] = M('project_work_commission')
                ->alias('pwc')
                ->field([
                    'pwc.project_commission_id',
                    "from_unixtime(pc.start_time, '%Y-%m-%d')" => 'start_time',        //计提开始时间
                    "from_unixtime(pc.end_time, '%Y-%m-%d')" => 'end_time',            //计提结束时间
                    'pwc.project_child_id',     //子项目ID
                    'pwc.work_id',              //工种ID
                    'w.name' => 'work_name',    //工种名称
                    'u.nickname' => 'username',               //工种负责人
                    'pwc.commission_rate',      //计提比例
                    'pwc.is_submit',            //工种方案是否已提交
                    'pwc.status',               //工种方案是否已审核
                ])
                ->join('s_project_commission pc on pc.id = pwc.project_commission_id')
                ->join('s_work w on w.id = pwc.work_id')
                ->join('s_user u on u.id = pwc.user_id')
                ->where(['pwc.project_child_id' => $project_child_id, 'pc.is_finish' => 0])
                ->select();

            if ( !$current_commission_list ) $current_commission_list['list'] = [];

        }

        //查找历史计提
        $history_commission_list = M('project_work_commission')
            ->alias('pwc')
            ->field([
                'pwc.project_commission_id',
                "from_unixtime(pc.start_time, '%Y-%m-%d')" => 'start_time',        //计提开始时间
                "from_unixtime(pc.end_time, '%Y-%m-%d')" => 'end_time',            //计提结束时间
                'pwc.project_child_id',     //子项目ID
                'pwc.work_id',              //工种ID
                'w.name' => 'work_name',    //工种名称
                'u.nickname' => 'username',               //工种负责人
                'pwc.commission_rate',      //计提比例
                'pwc.is_submit',            //工种方案是否已提交
                'pwc.status',               //工种方案是否已审核
            ])
            ->join('s_project_commission pc on pc.id = pwc.project_commission_id')
            ->join('s_work w on w.id = pwc.work_id')
            ->join('s_user u on u.id = pwc.user_id')
            ->where(['pwc.project_child_id' => $project_child_id, 'pc.is_finish' => 1])
            ->select();

        ajax_success('数据获取', compact('project_info', 'project_child_info', 'current_work_list', 'current_commission_list', 'history_commission_list'));
    }

    /**
     * 确定新建计提
     */
    public function createProjectCommission() {

        if ( !IS_POST ) ajax_error('请求错误');

        $data = I('post.');
        if ( $data['project_child_id'] <= 0 ) ajax_error('参数错误');
        $start_time = strtotime($data['start_time']);
        $end_time = strtotime($data['end_time']);
        if ( !$start_time || $end_time && $start_time >= $end_time ) ajax_error('计提时间有误');
        if ( count($data['commission']) <= 0 ) ajax_error('数据有误');

        //判断当前是否有正在进行中的计提
        $projectCommissionMod = M('project_commission');
        $bool = $projectCommissionMod->where(['project_child_id' => $data['project_child_id'], 'is_finish' => 0])->find();
        if ( $bool ) ajax_error('有未完成的计提任务');

        //查找子项目信息
        $project_child_info = M('project_child')->where(['id' => $data['project_child_id']])->find();
        if ( !$project_child_info ) ajax_error('子项目信息不存在');

        //查找项目信息
        $project_info = M('project')->where(['id' => $project_child_info['project_id']])->find();
        if ( !$project_info ) ajax_error('项目信息不存在');

        //查找工种负责人列表
        $project_work_list = M('project_child_work_type')->where(['project_child_id' => $data['project_child_id']])->select();
        if ( !$project_work_list ) ajax_error('该子项目没有分配工种');


        $time = time();
        //事务处理
        M()->startTrans();
        $flag = true;

        //保存子项目计提信息
        if ( !$project_commission_id = $projectCommissionMod->add([
            'project_id' => $project_info['id'],
            'project_child_id' => $project_child_info['id'],
            'supervisor_id' => $project_info['director_id'],
            'start_time' => $start_time,
            'end_time' => $end_time,
            'is_submit' => 0,
            'status' => 0,
            'is_finish' => 0,
            'add_time' => $time,
            'update_time' => $time,
        ]) ) $flag = false;

        //保存工种计提信息
        $allSql = [];
        $w_id = [];
        foreach ( $data['commission'] as $key => $value ) {

            foreach ($project_work_list as $k => $v) {
                if ( $value['work_id'] == $v['work_id']) {
                    $allSql[] = [
                        'project_id' => $project_info['id'],
                        'project_child_id' => $project_child_info['id'],
                        'project_commission_id' => $project_commission_id,
                        'work_id' => $value['work_id'],
                        'user_id' => $v['user_id'],
                        'commission_rate' => $value['rate'],
                        'is_submit' => 0,
                        'status' => 0,
                        'add_time' => $time,
                        'update_time' => $time,
                    ];
                    $w_id[] = $value['work_id'];
                }
            }

        }

        if ( !M('project_work_commission')->addAll($allSql) ) $flag = false;

        //保存员工计提信息
        //查找员工列表
        $project_staff_list = M('staff')->where(['project_child_id' => $data['project_child_id'],'work_id'=>array('IN',$w_id)])->select();
        if ( !$project_staff_list ) ajax_error('该子项目没有分配员工');

        $staffSql = [];
        foreach ( $project_staff_list as $kk => $vv ) {
            $staffSql[] = [
                'project_id' => $project_info['id'],
                'project_child_id' => $project_child_info['id'],
                'project_commission_id' => $project_commission_id,
                'work_id' => $vv['work_id'],
                'user_id' => $vv['user_id'],
                'labor' => $vv['labor'],
                'content' => $vv['content'],
                'add_time' => $time,
                'update_time' => $time,
            ];
        }

        if ( !M('project_staff_commission')->addAll($staffSql) ) $flag = false;

        if ( $flag == true ) {
            M()->commit();
            ajax_success('操作成功');
        } else {
            M()->rollback();
            ajax_success('操作失败');
        }

    }

    /*修改工种计提比例*/
    public function updateProjectCommission(){
        if(!IS_POST)  ajax_error('请求错误');
        $data = I('post.');
        if ( $data['project_id'] <= 0 ) ajax_error('参数错误');
        if ( $data['project_commission_id'] <= 0 ) ajax_error('参数错误');
        if ( $data['project_child_id'] <= 0 ) ajax_error('参数错误');
        $update_time = time();
        if ( count($data['commission']) <= 0 ) ajax_error('数据有误');
        M()->startTrans();
        $res = 0;
        foreach ( $data['commission'] as $key ) {
            $id = M('project_work_commission')->where(array(
                'project_id' => $data['project_id'],
                'project_child_id' => $data['project_child_id'],
                'project_commission_id' => $data['project_commission_id'],
                'work_id' => $key['work_id']))
                ->getField('id');
            $res = M('project_work_commission')->where(array('id'=>$id))->save([
                'commission_rate' => $key['rate'],
                'update_time' => $update_time,
            ]);
            $res += 1;
        }
        if($res) {
            M()->commit();
            ajax_success('操作成功');
        }else{
            M()->rollback();
            ajax_error('操作失败');
        }
    }

    /*删除工种计提*/
    public function delProjectCommission(){
        if(!IS_POST)  ajax_error('请求错误');
        $data = I('post.');
        if ( $data['project_id'] <= 0 ) ajax_error('参数错误');
        if ( $data['project_commission_id'] <= 0 ) ajax_error('参数错误');
        if ( $data['project_child_id'] <= 0 ) ajax_error('参数错误');
        M()->startTrans();
        $pc = M('project_commission')->where(['id'=>$data['project_commission_id']])->setField(['is_finish'=>2,'update_time'=>time()]);
        $pwc = M('project_work_commission')->where(['project_commission_id'=>$data['project_commission_id']])->delete();
        if($pc+$pwc){
            M()->commit();
            ajax_success('操作成功');
        }else{
            M()->rollback();
            ajax_error('操作失败');
        }
    }

    /**
     * 获取工种方案分配详情(工作情况查看)
     */
    public function getProjectWorkCommission() {

        $project_child_id = I('get.project_child_id', 0, 'intval');                 //子项目ID
        $work_id = I('get.work_id', 0, 'intval');                                   //工种ID
        if ( $project_child_id <= 0  || $work_id <= 0 ) ajax_error('参数错误');

        $project_commission_id = I('get.project_commission_id', 0, 'intval');       //当前计提基本信息ID

        //查询工种信息
        $work_info = M('project_child_work_type')->alias('pcwt')->field([
                'w.name' => 'work_name',    //工种名称
                'u.nickname' => 'username',               //工种负责人
            ])
            ->join('s_work w on w.id = pcwt.work_id')
            ->join('s_user u on u.id = pcwt.user_id')
            ->where(['pcwt.project_child_id' => $project_child_id, 'pcwt.work_id' => $work_id])
            ->find();

        if ( !$work_info ) ajax_error('没有该工种信息');

        $work_info['commission_rate'] = 0;    //项目计提占比
        $work_info['start_time'] = 0;
        $work_info['end_time'] = 0;

        $fiels = [
            'u.nickname' => 'username',       //姓名
            'staff.labor',      //分工
            'staff.content',    //工作内容
        ];

        $staffMod = M('staff')->alias('staff')->join('left join s_user u on u.id = staff.user_id');

        if ( $project_commission_id ) {
            //工种方案查看
            array_push($fiels, 'psc.commission_rate');
            $list = $staffMod->join('left join s_project_staff_commission psc on psc.user_id = staff.user_id')
                ->field($fiels)
                ->where(['staff.work_id' => $work_id, 'staff.project_child_id' => $project_child_id, 'psc.project_commission_id' => $project_commission_id, 'staff.status'=>0])
                ->select();

            $res = M('project_work_commission')->alias('pwc')->join('s_project_commission pc on pc.id = pwc.project_commission_id')
                ->field([
                    'pwc.commission_rate',
                    "from_unixtime(pc.start_time, '%Y-%m-%d')" => 'start_time',        //计提开始时间
                    "from_unixtime(pc.end_time, '%Y-%m-%d')" => 'end_time',            //计提结束时间
                ])
                ->where(['pwc.project_child_id' => $project_child_id, 'pwc.work_id' => $work_id, 'pwc.project_commission_id' => $project_commission_id])->find();

            $work_info['commission_rate'] = $res['commission_rate'];    //项目计提占比
            $work_info['start_time'] = $res['start_time'];
            $work_info['end_time'] = $res['end_time'];
        } else {
            //工作情况查看
            $list = $staffMod->field($fiels)->where(['staff.work_id' => $work_id, 'staff.project_child_id' => $project_child_id, 'staff.status'=>0])->select();

        }
        ajax_success('数据获取成功', compact('work_info', 'list'));

    }

    /**
     * 工种成员分配方案审核操作（通过与不通过）
     */
    public function projectWorkCommissionHandle() {

        if ( !IS_POST ) ajax_error('请求有误');

        $project_commission_id = I('post.project_commission_id', 0, 'intval');       //当前计提基本信息ID
        $work_id = I('post.work_id', 0, 'intval');                                   //工种ID
        if ( $project_commission_id <= 0  || $work_id <= 0 ) ajax_error('参数错误');

        $projectWorkCommissionMod = M('project_work_commission');
        $res = $projectWorkCommissionMod->where(['project_commission_id' => $project_commission_id, 'work_id' => $work_id])->find();
        if ( !$res ) ajax_error('信息不存在');
        if ( !$res['is_submit'] ) ajax_error('该工种还未提交方案');

        $status = I('post.status', 0, 'intval');
        $data = [
            'status' => $status,
        ];
        if ( $status == 2 ) {
            $data['is_submit'] = 0;
        }
        if ( $projectWorkCommissionMod->where(['project_commission_id' => $project_commission_id, 'work_id' => $work_id])->save($data) !== false ) {
            ajax_success('操作成功');
        } else {
            ajax_error($projectWorkCommissionMod->getError());
        }

    }

    /**
     * 项目方案提交
     */
    public function submitWorkCommission() {

        if ( !IS_POST ) ajax_error('请求有误');

        $project_commission_id = I('post.project_commission_id', 0, 'intval');       //当前计提基本信息ID

        //查找当前计提是否还有工种未提交方案
        $list = M('project_work_commission')->where(['project_commission_id' => $project_commission_id])->select();
        if ( !$list ) ajax_error('没有工种信息');
        $bool = true;
        foreach ( $list as $key => $value ) {
            if ( !$value['status'] || !$value['is_submit'] ) {
                $bool = false;
                break;
            }
        }
        if ( !$bool ) ajax_error('还有工种未提交计提或计提未审核');

        $projectCommissionMod = M('project_commission');
        if ( $projectCommissionMod->where(['id' => $project_commission_id])->save(['is_submit' => 1]) !== false ) {
            ajax_success('提交成功');
        } else {
            ajax_error($projectCommissionMod->getError());
        }

    }

    /**
     * 退回
     */
    public function rockBack() {

        $project_commission_id = I('post.project_commission_id', 0, 'intval');       //当前计提基本信息ID
        $work_id = I('post.work_id', 0, 'intval');                                   //工种ID
        if ( $project_commission_id <= 0  || $work_id <= 0 ) ajax_error('参数错误');

        $projectWorkCommissionMod = M('project_work_commission');
        $res = $projectWorkCommissionMod->where(['project_commission_id' => $project_commission_id, 'work_id' => $work_id])->find();
        if ( !$res ) ajax_error('信息不存在');
        if ( !$res['is_submit'] ) ajax_error('该工种还未提交方案，退回失败');

        if ( $projectWorkCommissionMod->where(['project_commission_id' => $project_commission_id, 'work_id' => $work_id])->save(['is_submit' => 0, 'status' => 0]) !== false ) {
            ajax_success('操作成功');
        } else {
            ajax_error($projectWorkCommissionMod->getError());
        }

    }

    /**
     * 给工种负责人发通知
     */
    public function sendNotice() {

        $project_child_id = I('post.project_child_id', 0, 'intval');
        $work_id = I('post.work_id', 0, 'intval');

        if ( $project_child_id <= 0 || $work_id <= 0 ) ajax_error('参数错误');

        //查出项目主管
        $project_info = M('project_child')->alias('pc')->join('left join s_project p on p.id = pc.project_id')->field(['p.director_id', 'p.id'])->where(['pc.id' => $project_child_id])->find();
        if ( !$project_info || $project_info['director_id'] <= 0 ) ajax_error('该项目还未设置主管');

        //查出工种负责人
        $project_work = M('project_child_work_type')->field(['user_id'])->where(['work_id' => $work_id, 'project_child_id' => $project_child_id])->find();
        if ( !$project_work || $project_work['user_id'] <= 0 ) ajax_error('该工种未设置负责人');

        $data = [
            'project_id' => $project_info['id'],
            'title' => '【通知】项目发起了计提任务',
            'content' => '你有新的计提任务，请查看。',
            'send_id' => $project_info['director_id'],
            'receiver_id' => $project_work['user_id'],
        ];

        if ( $this->commentNotice($data) ) {
            ajax_success('发送通知信息成功');
        } else {
            ajax_success('发送通知信息失败');
        }

    }

    /**
     * 给工种负责人发催促信息
     */
    public function sendUrge() {

        $project_child_id = I('post.project_child_id', 0, 'intval');
        $work_id = I('post.work_id', 0, 'intval');

        if ( $project_child_id <= 0 || $work_id <= 0 ) ajax_error('参数错误');

        //查出项目主管
        $project_info = M('project_child')->alias('pc')->join('left join s_project p on p.id = pc.project_id')->field(['p.director_id', 'p.id'])->where(['pc.id' => $project_child_id])->find();
        if ( !$project_info || $project_info['director_id'] <= 0 ) ajax_error('该项目还未设置主管');

        //查出工种负责人
        $project_work = M('project_child_work_type')->field(['user_id'])->where(['work_id' => $work_id, 'project_child_id' => $project_child_id])->find();
        if ( !$project_work || $project_work['user_id'] <= 0 ) ajax_error('该工种未设置负责人');

        $data = [
            'project_id' => $project_info['id'],
            'title' => '【催促】你有未完成的计提任务',
            'content' => '你有未完成的计提任务，请查看。',
            'send_id' => $project_info['director_id'],
            'receiver_id' => $project_work['user_id'],
        ];

        if ( $this->commentNotice($data) ) {
            ajax_success('发送催促信息成功');
        } else {
            ajax_success('发送催促信息失败');
        }

    }

    /**
     * @param $param
     * @return bool
     */
    protected function commentNotice( $param ) {

        $bool = true;
        M()->startTrans();

        $time = time();
        $data = [
            'type' => 1,
            'project_id' => $param['project_id'],
            'title' => $param['title'],
            'content' => $param['content'],
            'user_id' => $param['send_id'],
            'receiver' => $param['receiver_id'],
            'addtime' => $time,
            'status' => 0,
        ];
        if ( !$obj = M('notice')->add($data) ) $bool = false;

        $arr = [
            'uid' => $param['receiver_id'],
            'pid' => $obj,
            'addtime' => $time,
            'status' => 1,
        ];
        if ( !M('notice_receive')->add($arr) ) $bool = false;

        if ( $bool ) {
            M()->commit();
        } else {
            M()->rollback();
        }

        return $bool;

    }

    /**
     * 工种/管理员 -> 给成员分配计提比例(操作详情)
     */
    public function getProjectStaffCommission() {

        $project_id = I('get.project_id', 0, 'intval');     //项目ID
        $project_child_id = I('get.project_child_id', 0, 'intval');     //子项目ID
        $work_id = I('get.work_id', 0, 'intval');       //工种ID

        if ( $project_id <= 0 ) ajax_error('参数错误');

        $projectMod = M('project');
        $project_info = $projectMod->alias('project')
            ->field([
                'project.id' => 'project_id',       //项目ID
                'project.name' => 'project_name',   //项目名称
                // 'FROM_UNIXTIME(project_time)' => 'project_time',                     //立项时间
                'project.project_time',
                'schedule.name' => 'stage',         //项目阶段
                'u.nickname' => 'username',                        //项目主管
                'project.sche_id'
            ])
            ->join('left join s_schedule schedule on schedule.id = project.sche_id')
            ->join('left join s_user u on u.id = project.director_id')
            ->where(['project.id' => $project_id])
            ->find();
            // echo $projectMod->getLastSql
            // dump($project_info);exit;
        if ( !$project_info ) ajax_error('项目信息不存在');

        if(!$project_info['stage'])
        {
            switch($project_info['sche_id'])
            {
                case -2:
                $project_info['stage'] = '进行中';
                break;
                case -1:
                $project_info['stage'] = '未实施';
                break;
                case 0:
                $project_info['stage'] = '已完结';
                break;
            }
        }
        $project_info['project_time'] = date('Y/m/d',$project_info['project_time']);
        //获取当前子项目信息
        $project_child_list = M('project_child')->where(['project_id' => $project_id])->order('id asc')->select();
        if ( !$project_child_list ) ajax_error('项目没有创建子项目');
        if ( !$project_child_id ) $project_child_id = $project_child_list[0]['id'];   //默认第一个子项目

        $project_child_info = [];
        foreach ( $project_child_list as $key => $value ) {

            $project_child_info[$key] = [
                'project_id' => $project_id,
                'project_child_id' => $value['id'],
                'project_child_name' => $value['name'],
                'is_current' => false,
            ];
            if ( $value['id'] == $project_child_id ) {
                $project_child_info[$key]['is_current'] = true;
            }
        }



        //查找当前正在进行中的计提
        $pwcRes = M('project_work_commission')->field('work_id')->where(array('project_id'=>$project_id,'project_child_id'=>$project_child_id,'work_id'=>$work_id,'commission_rate'=>array('gt',0)))->select();

        if($pwcRes){
            $projectStaffCommissionMod = M('project_staff_commission')->alias('psc');
            $res = $projectStaffCommissionMod->field([
                'psc.id' => 'project_staff_commission_id',
                'psc.project_child_id',
                'psc.user_id',
                'u.nickname' => 'username',
                'psc.labor',
                'psc.commission_rate',
                "from_unixtime(pc.start_time, '%Y-%m-%d')" => 'start_time',        //计提开始时间
                "from_unixtime(pc.end_time, '%Y-%m-%d')" => 'end_time',            //计提结束时间
                'psc.project_commission_id',
            ])
                ->join('left join s_project_commission pc on pc.id = psc.project_commission_id')
                ->join('left join s_user u on u.id = psc.user_id')
                ->where(['pc.is_finish' => 0, 'psc.work_id' => $work_id, 'psc.project_child_id' => $project_child_id])
                ->select();

            $current_staff_commission = [
                'project_work_commission_id' => 0,
                'is_submit' => 0,
                'status' => 0,
                'current_list' => [],
            ];
            if ( $res ) {
                $first = $res[0];
                $obj = M('project_work_commission')->where(['project_commission_id' => $first['project_commission_id'], 'work_id' => $work_id])->find();
                $current_staff_commission = [
                    'project_work_commission_id' => $obj['id'],
                    'is_submit' => $obj['is_submit'],
                    'status' => $obj['status'],
                    'current_list' => $res,
                ];
                $project_info['rate'] = $obj['commission_rate'];
            }else{

            }
        }else{
            $current_staff_commission = [];
        }

        //查找历史计提
        $history_staff_commission = [];
        $project_last_commission = M('project_commission')->where(['project_child_id' => $project_child_id, 'is_finish' => 1])->order('end_time desc')->find();

        $list = M('project_staff_commission')->alias('psc')->join('left join s_user u on u.id = psc.user_id')
            ->field([
                'psc.*',
                'u.nickname' => 'username'
            ])
            ->where(['project_commission_id' => $project_last_commission['id'], 'work_id' => $work_id])->select();
        if ( $list ) {
            foreach ($list as $k => $v) {
                $history_staff_commission[$k] = [
                    'start_time' => date('Y-m-d', $project_last_commission['start_time']),
                    'end_time' => date('Y-m-d', $project_last_commission['end_time']),
                    'project_id' => $v['project_id'],
                    'project_child_id' => $v['project_child_id'],
                    'user_id' => $v['user_id'],
                    'nickname' => $v['username'],
                    'labor' => $v['labor'],
                    'content' => $v['content'],
                    'commission_rate' => $v['commission_rate'],
                ];
            }
        }

        ajax_success('数据获取成功', compact('project_info', 'project_child_info', 'current_staff_commission', 'history_staff_commission'));

    }

    /**
     * 成员计提比例提交
     */
    public function createProjectStaffCommission() {

        $data = I('post.');

        $project_work_commission_id = $data['project_work_commission_id'];
        if ( $project_work_commission_id <= 0 ) ajax_error('参数错误');
        if ( count($data['commission']) <= 0 ) ajax_error('员工计提少于0人');

        //当前工程的状态改为已提交，待审核
        M()->startTrans();
        $bool = true;

        if ( !M('project_work_commission')->where(['id' => $project_work_commission_id])->save(['is_submit' => 1,'status' => 0]) ) $bool = false;

        $projectStaffCommissionMod = M('project_staff_commission');
        foreach ( $data['commission'] as $key => $value ) {

            if ( $projectStaffCommissionMod->where(['id' => $value['project_staff_commission_id']])->save(['commission_rate' => $value['rate']]) !== false ) {

            } else {
                $bool = false;
            }
        }

        if ( $bool ) {
            M()->commit();
            ajax_success('操作成功');
        } else {
            M()->rollback();
            ajax_error('操作失败');
        }

    }

    /**
     * 绩效详情
     */
    public function performanceDetail() {

        $user_id = I('get.user_id', 0, 'intval');
        $start_time = I('get.start_time');
        $end_time = I('get.end_time');

        if($start_time && $end_time){
            $where_com['start_time'] = array('EGT',strtotime($start_time));
            $where_com['end_time'] = array('ELT',strtotime($end_time));
            $pcid = M('project_commission')->where($where_com)->getField('group_concat(id)');
            $pcid = explode(',',$pcid);
        }


        if ( $user_id <= 0 ) ajax_error($user_id);

        //工种成员计提
        $comlist = [];
        if ($pcid){
            for ($i=0; $i<count($pcid);$i++){
                $where['project_commission_id'] = $pcid[$i];
                $where['user_id'] = $user_id;
                $psc = M('project_staff_commission')->where($where)->select();
                $comlist = array_merge($comlist,$psc);
            }
        }else
            $comlist = M('project_staff_commission')->where(['user_id'=>$user_id])->select();
        //ajax_success($comlist);
        $list = [];  //计提详情数组
        $pid = []; //项目ID数组
        $project_info['jiti_count'] = 0;  //计提次数
        $project_info['total_commission'] = 0;  //计提总额
        //项目主管的计提
        $where_com['supervisor_id'] = $user_id;
        $derectorlist = M('project_commission')->where($where_com)
            ->field(['project_id',
                'supervisor_id' => 'user_id',
                'supervisor_rate' => 'commission_rate',
                'supervisor_money' => 'commission_money',
                'id' => 'project_commission_id',
            ])->select();
        $comlist = array_merge($derectorlist,$comlist);
        //var_export($comlist);
        //ajax_success('ww',$derectorlist);

        foreach ($comlist as $k=>$v){
            if($comlist[$k]['commission_money'] > 0){
                $list[$k] =  $comlist[$k];
                //查找项目名称
                $list[$k]['project_name'] = M('project')->where(['id' => $comlist[$k]['project_id'] ])->getField('name');
                //查找参与工种信息
                if (isset($list[$k]['work_id'])){
                    $list[$k]['work_name'] = M('work')->where(['id'=>$comlist[$k]['work_id'] ])->getField('name');
                }else{
                    $list[$k]['work_name'] = '项目主管';
                    $list[$k]['content'] = '';
                }
                //格式化时间
                $timelist = M('project_commission')->where(['id'=>$comlist[$k]['project_commission_id']])->field('start_time,end_time')->find();
                $list[$k]['start_time'] = date("Y.n.d", $timelist['start_time']);
                $list[$k]['end_time'] = date("Y.n.d", $timelist['end_time']);
                //获取项目id
                $pid[$k] = $comlist[$k]['project_id'];
                //计提次数
                $project_info['jiti_count'] ++;
                //计提总额
                $project_info['total_commission'] += $comlist[$k]['commission_money'];
            }
        }

        //参与项目数
        $project_info['p_count'] = count( array_unique($pid) );

        //用户姓名
        $user_info = M('user')->where(['id' => $user_id])->find();
        $project_info['user_name'] = $user_info['nickname'];        //姓名

        ajax_success('数据获取成功', compact('project_info', 'list'));
    }

    //二维数组排序算法
    /**
     * @param $array 排序的数组
     * @param $field 排序的字段
     * @param $sort 升序还是降序 SORT_DESC 降序；SORT_ASC 升序
     * @return mixed
     */
    public function arraySequence($array, $field, $sort)
    {
        $arrSort = array();
        foreach ($array as $uniqid => $row) {
            foreach ($row as $key => $value) {
                $arrSort[$key][$uniqid] = $value;
            }
        }
        array_multisort($arrSort[$field], constant($sort), $array);
        return $array;
    }

    /**
     * 总览->人才绩效列表(新)
     */
    public function performanceListV2() {
//        $start_time = I('get.start_time', 0, 'intval');
//        $end_time = I('get.end_time', 0, 'intval');
        $name = I('get.name', '', 'trim');  //用户名
        $sort_field = I('get.amount');
        $page = I('get.page', 1, 'intval'); //分页
        $num = 10;
        $num = I('get.num', 10, 'intval');  //条数
        $start = I('get.start');  //时间区间搜索
        $end = I('get.end');

        $map = [];
        if ( $start && $end && $start < $end ) {
          $map['p.project_time'] = [['egt', strtotime($start)], ['elt', strtotime($end)], 'and'];
        }
        if ( $name ) {
            $res = M('user')->where(['nickname' => ['like', "%{$name}%"]])->select();
            if ( $res ) {
                $map['id'] = ['in', array_column($res, 'id')];
            }
        }

        $count = M('user')->count();//用户数量
        $page = new Page($count,10);

        $data = M('user')->limit($page->firstRow.','.$page->listRows)->field(['id'=>'user_id','nickname'])->select();

        //按照时间搜索
        if($start && $end){
            $where_project['project_time'] = array('BETWEEN',array(strtotime($start),strtotime($end)));
            $time_project = M('project')->where($where_project)->getField('group_concat(id)');
            //时间区间的项目
            if($time_project)
                $time_project = explode(',',$time_project);
            else $time_project[0] = -1;
            //时间区间的计提
            $where_com['start_time'] = array('EGT',strtotime($start));
            $where_com['end_time'] = array('ELT',strtotime($end));
            $pcid = M('project_commission')->where($where_com)->getField('group_concat(id)');
            $pcid = explode(',',$pcid);
        }

        foreach ($data as $k=>$v)
        {
            //作为项目主管参与项目id
            $projects = M('project')->where($where_project)->where(['director_id'=>$v['user_id']])->getField('group_concat(id)');

            //作为员工参与的项目
            $projects_staff = M('staff')->alias('s')->join('left join s_project_child p on p.id = s.project_child_id')
                ->where(['s.user_id'=>$v['user_id']])
                ->getField('group_concat(project_id)');

            if($projects_staff)
                $projects_staff = explode(',',$projects_staff);

            if($start && $end){
                if ($time_project)
                    $projects_staff = array_intersect($time_project,$projects_staff); //取两数组交集
                else $projects_staff ='';
            }

            if ($projects){
                $projects = explode(',',$projects);
                if($projects_staff){
                    $projects = array_merge($projects,$projects_staff); //合并
                    $projects = array_unique($projects);  //去重
                    $projects_id = count($projects);
                }else{
                    $projects_id = count($projects);
                }
            }elseif ($projects_staff){
                $projects = $projects_staff;
                $projects = array_unique($projects);
                $projects_id = count($projects);
            }else{
                $projects = '';
                $projects_id = 0;
            }


            $data[$k]['project_num'] = $projects_id; //参与项目数

            // 主管提成
            $profits_manage = M('projectCommission')->where($where_com)->where(['supervisor_id'=>$v['user_id']])->getField('sum(supervisor_money)');
            // 员工提成
            $profits_staff = 0;
            if($start && $end){
                for ($i = 0;$i<count($pcid);$i++){
                    $where['project_commission_id'] = $pcid[$i];
                    $where['user_id'] = $v['user_id'];
                    if($staff_money = M('project_staff_commission')->where($where)->getField('sum(commission_money)'))
                        $profits_staff += $staff_money;
                }

            }else{
                $profits_staff = M('project_staff_commission')->where(['user_id'=>$v['user_id']])->getField('sum(commission_money)');
            }

            //ajax_success('11',$profits_staff);
            $data[$k]['amount'] = $profits_manage + $profits_staff;
        }

        //汇总排序
        if ($sort_field == 1){
            $data = $this->arraySequence($data,'amount','SORT_DESC');
        }elseif($sort_field == 2){
            $data = $this->arraySequence($data,'amount','SORT_ASC');
        }

        $new_data = [];
        $new_data['list'] = $data;
        $new_data['count'] = $count;
        $new_data['totalPage'] = ceil($count/10);

        ajax_success('success',$new_data);
    }

    public function performance_export()
    {
        //        $start_time = I('get.start_time', 0, 'intval');
//        $end_time = I('get.end_time', 0, 'intval');
$name = I('get.name', '', 'trim');  //用户名

        $page = I('get.page', 1, 'intval'); //分页
        $num = 10;
        $num = I('get.num', 10, 'intval');  //条数

        $map = [];
//        if ( $start_time && $end_time && $start_time < $end_time ) {
//            $map['p.project_time'] = [['egt', $start_time], ['elt', $end_time], 'and'];
//        }
        if ( $name ) {
            $res = M('user')->where(['nickname' => ['like', "%{$name}%"]])->select();
            if ( $res ) {
                $map['id'] = ['in', array_column($res, 'id')];
            }
        }
        $count = M('user')->where($map)->count();
        $page = new Page($count,5);

        $data = M('user')->where($map)->field(['id'=>'user_id','nickname'])->select();

        foreach ($data as $k=>$v)
        {
            $projects = M('project')->where(['director_id'=>$v['user_id']])->getField('group_concat(id)');
            $projects_staff = M('staff')->where(['user_id'=>$v['user_id']])->getField('group_concat(user_id)');

            $projects = array_unique(explode(',',($projects_id.','.$projects_staff)));
            $projects_id = count($projects);
            $data[$k]['project_num'] = $projects_id;
            // 主管提成
            $profits_manage = M('projectCommission')->where(['supervisor_id'=>$v['user_id']])->getField('sum(supervisor_money)');
            // 员工提成
            $profits_staff = M('projectStaffCommission')->where(['user_id'=>$v['user_id']])->getField('sum(commission_money)');
            $data[$k]['amount'] = $profits_manage + $profits_staff;
        }
        $new_data = [];
        $new_data['list'] = $data;
        $new_data['count'] = $count;
        $new_data['totalPage'] = ceil($count/5);
foreach ($new_data['list'] as $k=>$v)
{
    unset($new_data['list'][$k]['user_id']);
}
array_unshift($new_data['list'],['用户姓名','项目数量','提成总额']);
export($new_data['list'],'人才绩效'.time('Y-m-d',time()));
exit;
        ajax_success('success',$new_data);
        if ( $name ) {
            $res = M('user')->where(['nickname' => ['like', "%{$name}%"]])->select();
            if ( $res ) {
                $map['u.user_id'] = ['in', array_column($res, 'id')];
            }
        }
        $field = [
            'count(DISTINCT(project_id))' => 'project_num',
//            'psc.project_id',
            'psc.user_id',
            'u.nickname',
//            'p.name' => 'project_name',
//            'psc.labor',
            'sum(commission_money)' => 'amount',
//            "from_unixtime(project_time, '%Y-%m-%d')" => 'project_time',
        ];

        $obj = M('project_staff_commission')->alias('psc')
            ->join('right join s_user u on u.id = psc.user_id')
            ->field($field)
            ->where($map)
            ->group('psc.user_id')
            ->select();

        


        $count = count( $obj );
        //总页码
        $totalPage = ceil( $count / $num );
        if ( $page <= 0 ) $page = 1;
        if ( $page > $totalPage ) $page = $totalPage;
        $pre = ($page - 1) * $num;
        $pre < 0 ? $pre = 0 : $pre = $pre;

        $list = M('project_staff_commission')->alias('psc')
            ->join('left join s_user u on u.id = psc.user_id')
            ->field($field)
            ->where($map)
            ->limit($pre.','.$num)
            ->group('psc.user_id')
            ->select();
//
       if ( $list ) {
           foreach ( $list as $key => &$value ) {
            //    $amount = M('project_staff_commission')->where(['project_id' => $value['project_id'], 'user_id' => $value['user_id']])->sum('commission_money');
                $amount_supervisor = M('projectCommission')->where(['supervisor_id'=>$value['user_id']])->getField('sum(supervisor_money)');
                // $value['amount'] = $amount ? $amount : 0;
                $list[$key]['amount'] = $value['amount'] + ($amount_supervisor ? $amount_supervisor : 0.00);
           }
       }

       dump($list);exit;
        ajax_success('数据获取成功', compact('count', 'totalPage', 'list'));
    }

}