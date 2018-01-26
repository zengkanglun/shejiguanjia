<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/10/10
 * Time: 20:30
 */
namespace Home\Controller;
use Think\Controller;

/**
 * 财务模块
 * Class FinanceController
 * @package Home\Controller
 */
class FinanceController extends CommonController
{

    public function index() {

    }


    #-------------------------------------------------
    #
    #   项目收入子模块
    #
    #-------------------------------------------------

    /**
     * 项目收入列表
     */
    public function projectReceipt() {

        $status = I('get.status', 0, 'intval'); //状态 0进行中 1是完结 2是中断

        $start_time = strtotime(I('get.start_time'));
        $end_time = strtotime(I('get.end_time'));
        $type = I('get.type', 1, 'intval'); //类型：1-到款日期，2-立项日期
        $project_name = I('get.project_name', '', 'trim');  //项目名称

        $page = I('get.page', 1, 'intval'); //分页
        $num = I('get.num', 10, 'intval');  //条数

        //查询条件
        $map['project.status'] = $status;   //项目状态
        if ( $project_name ) $map['project.name'] = ['like', "%{$project_name}%"];

        //查询字段
        $field = [
            'project.id' => 'project_id',           //项目ID
            'project.name' => 'project_name',       //项目名称
            'project.money' => 'project_money',     //合同总额
//            'project.status',                       //项目状态：0进行中 1是完结 2是中断
//            'schedule.name' => 'stage',             //项目阶段
            'st.name' => 'stage',             //项目阶段
//            'round(sum(schedule.receive), 2)' => 'receive',         //已收款
//            'round(sum(schedule.money)-sum(schedule.receive), 2)' => 'debt',  //未收款
            'schedule.process',     //最新过程记录
            'project.project_time',  //立项日期
            'project.sche_id',
        ];
        
// && strtotime($start_time) < strtotime($end_time)
        if ( $start_time && $end_time && $start_time < $end_time ) {
            if ( $type == 1 ) {
                //根据到款日期查询
//                $map['receive_time'] = [['egt', $start_time], ['elt', $end_time], 'and'];

                $res = M('receipt')->field('s_id')->where(['receive_time' => [['egt', $start_time], ['elt', $end_time], 'and']])->group('s_id')->select();
                $count = 0;
                $list = [];
                if ( $res ) {

                    $s_id = array_column($res, 's_id');
                    $obj = M('schedule')->field('project_id')->where(['id' => ['IN', $s_id]])->group('project_id')->select();
                    if ( $obj ) {

                        $project_id = array_column($obj, 'project_id');
                        $map['project.id'] = ['IN', $project_id];

                        //总条数
                        $count = M('project')->alias('project')->where($map)->count();

                        //总页码
                        $totalPage = ceil( $count / $num );
                        if ( $page <= 0 ) $page = 1;
                        if ( $page > $totalPage ) $page = $totalPage;
                        $pre = ($page - 1) * $num;
                        if($pre < 0)
                            $pre = 0;
                        $list = M('project')->alias('project')
                            ->join('left join s_schedule as schedule on schedule.id = project.sche_id')
                            ->join('left join s_stage_types as st on st.id = project.stage')
                            ->field($field)
                            ->where($map)->order('project.update_time desc')->limit($pre.','.$num)->select();

                    }

                }

            } else {
                //根据立项日期查询
                $map['project.project_time'] = [['egt', $start_time], ['elt', $end_time], 'and'];

                //总条数
                $count = M('project')->alias('project')->where($map)->count();

                //总页码
                $totalPage = ceil( $count / $num );
                if ( $page <= 0 ) $page = 1;
                if ( $page > $totalPage ) $page = $totalPage;
                $pre = ($page - 1) * $num;

                $list = M('project')->alias('project')
                    ->join('left join s_schedule as schedule on schedule.id = project.sche_id')
                    ->join('left join s_stage_types as st on st.id = project.stage')
                    ->field($field)
                    ->where($map)->order('project.update_time desc')->limit($pre.','.$num)->select();
            }
        } else {
            //总条数
            $count = M('project')->alias('project')->where($map)->count();
            //总页码
            $totalPage = ceil( $count / $num );
            if ( $page <= 0 ) $page = 1;
            if ( $page > $totalPage ) $page = $totalPage;
            $pre = ($page - 1) * $num;

            $list = M('project')->alias('project')
                ->join('left join s_schedule as schedule on schedule.id = project.sche_id')
                ->join('left join s_stage_types as st on st.id = project.stage')
                ->field($field)
                ->where($map)->order('project.update_time desc')->limit($pre.','.$num)->select();

        }
//        ajax_success('1',$list);
        if ( $list ) {
            foreach ( $list as $key => $value ) {
                switch($value['sche_id'])
                {
                    case -2:
                    $list[$key]['stage'] = '进行中';
                    break;
                    case -1:
                    $list[$key]['stage'] = '未实施';
                    break;
                    case 0:
                    $list[$key]['stage'] = '已完结';
                    break;
                    default:
                    $list[$key]['stage'] = M('schedule')->where(['id'=>$value['sche_id']])->getField('name');
                    break;
                }
                //收款记录
                $obj = M('schedule')->field(['id','round(sum(receive), 2)' => 'receive', 'round(sum(money)-sum(receive), 2)' => 'debt'])->where(['project_id' => $value['project_id']])->find();
                $list[$key]['receive'] = $obj['receive'] ? $obj['receive'] : 0;
                $list[$key]['debt'] = $obj['debt'] ? $obj['debt'] : 0;
                $list[$key]['project_time'] = date('Y-m-d', $value['project_time']) ? date('Y-m-d', $value['project_time']) : '暂无';
                $list[$key]['process'] = $value['process'] ? $value['process'] : '';
                $schedule_money = M('schedule')->where(['project_id'=>$value['project_id']])->getField('sum(money)');
                $list[$key]['project_money'] = $value['project_moeny'] + $schedule_money;
                $cause = M('receipt')->where(array('s_id'=>$obj['id']))->field('cause')->order('add_time desc')->find();
                $list[$key]['cause']=$cause['cause']?$cause['cause']:'没有记录';
            }
        }
        ajax_success('数据请求成功', compact('count', 'totalPage', 'list'));

    }

    /**
     * 项目收款详情
     */
    public function projectReceiptDetails() {

        $project_id = I('get.project_id', 0, 'intval');    //项目ID
        if ( $project_id <= 0 ) ajax_error('参数错误');

        //项目基本信息
        $arr = D('project')->relation(true)->where(['id' => $project_id])->find();
        if ( !$arr ) ajax_error('项目信息不存在');

        $res = [
            'project_id' => $project_id,
            'project_name' => $arr['name'],
            'project_time' => date('Y-m-d', $arr['project_time']),
            'project_stage' => '',
            'filename' => $arr['filename'],
            'project_money' => $arr['money'],
        ];
        //项目阶段
        $res['child'] = [];
        if ( $arr['child'] ) {

            $obj = [];
            foreach ( $arr['child']  as $key => $value ) {

                if ( $value['id'] == $arr['sche_id'] ) $res['project_stage'] = $value['name']; //当前项目阶段
                $obj[$key] = [
                    'schedule_id' => $value['id'],      //阶段ID
                    'schedule_name' => $value['name'],  //阶段名称
                    'content' => $value['content'],     //阶段内容
                    'money' => $value['money'],         //阶段总金额
                    'receive' => $value['receive'],     //已收款
                    'debt' => $value['money'] - $value['receive'],  //未收款
                    'process' => $value['process'],     //过程纪录
                ];

                //项目阶段收款记录(收款时间倒序)
                $logs = M('receipt')->field(['id as receipt_id', 'receive', 'cause', "from_unixtime(receive_time, '%Y-%m-%d')" => 'receive_time'])->where(['s_id' => $value['id']])->order('receive_time desc')->select();
                $obj[$key]['receipt_log'] = $logs;

            }

            $res['child'] = $obj;
            $res['project_money'] = M('schedule')->where(['project_id'=>$project_id])->getField('sum(money)');

        }

        ajax_success('数据获取成功', $res);

    }

    /**
     * 添加与编辑收款记录
     */
    public function addProjectReceipt() {

        $schedule_id = I('post.schedule_id', 0, 'intval');
        $receipt_id = I('post.receipt_id', 0, 'intval');
        $uid = I('post.uid', 0, 'intval');

        if ( $schedule_id <= 0 ) ajax_error('参数错误');

        //自动验证
        $rules = [
            ['receive', 'require', '收款金额不能为空'],
            ['receive', '/^(([0-9]+)|([0-9]+\.[0-9]{1,2}))$/', '收款金额不合法', 1, 'regex' ],
            ['cause', 'require', '事由不能为空'],
            ['receive_time', 'require', '收款时间不能为空'],
        ];

        $receiptMod = M('receipt');
        $data = $receiptMod->validate($rules)->create();
        if ( !$data ) ajax_error($receiptMod->getError());
        if ( $data['receive'] <= 0 ) ajax_error('金额不能为0');


        //查找当前项目阶段的总额
        $scheduleMod = M('schedule');
        $info = $scheduleMod->field(['money', 'receive', 'project_id'])->where(['id' => $schedule_id])->find();
        if ( !$info ) ajax_error('当前阶段信息不存在');

        //日志
        $nickname = M('user')->where(['id'=>$uid])->getField('nickname');
        $pro_name = M('project')->where(['id'=>$info['project_id']])->getField('name');
        //当前项目阶段未收款
        $debt = $info['money'] - $info['receive'];

        if ( !$debt || $data['receive'] > $debt ) ajax_error("当前可收款金额为{$debt}，请检查");

        if ( $receipt_id ) {
            //编辑收款记录
            $receipt_info = $receiptMod->find($receipt_id);

            if ( !$receipt_info ) ajax_error('收款记录不存在');
            //已收款总数
            $sum = $receiptMod->where(['s_id' => $schedule_id])->where(['id' => ['NEQ', $receipt_id]])->sum('receive');

            $data['id'] = $receipt_id;
            if ( !$receiptMod->save($data) )  ajax_error($receiptMod->getError());
            $this->log($nickname.'在项目：'.$pro_name.'，编辑了一条收款记录',7);

        } else {
            //添加收款记录
            //已收款总数
            $sum = $receiptMod->where(['s_id' => $schedule_id])->sum('receive');
            $data['s_id'] = $schedule_id;
            $data['add_time'] = time();
            if ( !$receiptMod->add($data) ) ajax_error($receiptMod->getError());
            $this->log($nickname.'在项目：'.$pro_name.'，增加了一条收款记录',7);

        }

        //自动切换阶段(项目阶段由主管手动切换)
        $total = $sum + $data['receive'];   //当前收款数据
        $scheduleMod->where(['id' => $schedule_id])->save(['receive' => $total]);

//        if ( $total >= $info['money'] ) {
//            $scheduleMod->where(['id' => $schedule_id])->save(['status' => 1]);
//            $last = $scheduleMod->where(['project_id' => $info['project_id'], 'status' => 0, 'id' => ['NEQ', $schedule_id]])->order('id asc')->find();
//            //把最新阶段更新到项目表
//            if ( $last ) {
//                M('project')->where(['id' => $info['project_id']])->save(['sche_id' => $last['id'], 'update_time' => time()]);
//            } else {
//                //TODO 项目完结
//                //状态 0进行中 1是完结 2是中断
//                M('project')->where(['id' => $info['project_id']])->save(['status' => 1, 'update_time' => time()]);
//            }
//        }


        ajax_success('操作成功');

    }

    /**
     * 增加阶段
     */
    public function addProjectSchedule() {

        //自动验证
        $rules = [
            ['project_id', 'require', '项目ID不能为空'],
            ['name', 'require', '阶段名称不能为空'],
            ['content', 'require', '服务内容不能为空'],
            ['money', 'require', '阶段总额不能为空'],
            ['money', '/^(([0-9]+)|([0-9]+\.[0-9]{1,2}))$/', '阶段总额不合法', 1, 'regex' ],
            ['process', 'require', '过程记录不能为空'],
        ];

        $scheduleMod = M('schedule');
        $data = $scheduleMod->validate($rules)->create();
        if ( !$data ) ajax_error($scheduleMod->getError());
        if ( $data['money'] <= 0 ) ajax_error('阶段总额不能为0');

        $data['status'] = 0;
        $data['add_time'] = $data['update_time'] = time();

        if ( $scheduleMod->add($data) ) {
            $nickname = M('user')->where(['id'=>$this->user_id])->getField('nickname');
            $pro_name = M('project')->where(['id'=>$data['project_id']])->getField('name');
            $this->log($nickname.'在项目：'.$pro_name.'，增加了新阶段',7);
            ajax_success('操作成功');
        } else {
            ajax_error($scheduleMod->getError());
        }

    }

    /**
     * 编辑项目收款
     */
    public function editProjectSchedule() {

        $data = $_POST;

        //if ( $data['money'] <= 0 ) ajax_error('合同金额不能为0');

        $projectMod = M('project');
        $scheduleMod = M('schedule');

        $project = $projectMod->find($data['project_id']);
        if ( !$project ) ajax_error('项目信息不存在');


        //如果有文件上传
        if($_FILES['contract']['name'] != '' && $_FILES['contract']['size'] > 0){
            $file = uploads('',array('jpg','gif','bmp','png','jpeg','xlsx','doc','docx','xls','txt'),'','./Uploads/contract/');

            $arr['filename'] = $_FILES['contract']['name']; //合同原文件名
            $arr['file'] = '/shejiguanjia/php'.$file[0]; //文件路径
//            $project->filename = $_FILES['contract']['name']; //合同原文件名
//            $project->file = $file[0]; //文件路径
        }

        try {

            $bool = true;
            //事务处理
            M()->startTrans();

            //保存项目合同总额
            $arr['money'] = $data['money'];
            if ( $projectMod->where(['id' => $data['project_id']])->save( $arr ) !== false ) {

            } else {
                $bool = false;
            }

            $arr = json_decode($_POST['child']);

            if ( count($arr) > 0 ) {

                foreach ( $arr as $key => $value ) {

                    $temp = (array)json_decode( $value );

                    $res = [
                        'name' => $temp['name'],
                        'content' => $temp['content'],
                        'money' => $temp['money'],
                    ];

                    if ( $scheduleMod->where(['project_id' => $data['project_id'], 'id' => $temp['schedule_id']])->save( $res ) !== false ) $bool = true;
                    else $bool = false;

                }

            }

            if ( $bool ) {
                M()->commit();

                $nickname = M('user')->where(['id'=>$data['uid']])->getField('nickname');
                $this->log($nickname.'编辑了项目收款',7);
                ajax_success('编辑成功');
            } else {
                M()->rollback();
                ajax_error('编辑失败');
            }

        } catch (\Exception $e) {
            ajax_error($e->getMessage());
        }

    }

    #-------------------------------------------------
    #
    #   项目支出子模块
    #
    #-------------------------------------------------
    /**
     * 项目支出列表
     */
    public function expenseList() {

        $status = I('get.status', 0, 'intval'); //状态 0进行中 1是完结 2是中断

        $start_time = strtotime(I('get.start_time'));
        $end_time = strtotime(I('get.end_time'));
        $type = I('get.type', 1, 'intval'); //类型：1-报账日期，2-立项日期
        $project_name = I('get.project_name', '', 'trim');  //项目名称

        $page = I('get.page', 1, 'intval'); //分页
        $num = I('get.num', 10, 'intval');  //条数

        //查询条件
        $map['status'] = $status;   //项目状态
        if ( $project_name ) $map['name'] = ['like', "%{$project_name}%"];

        //查询字段
        $field = [
            'id' => 'project_id',           //项目ID
            'name' => 'project_name',       //项目名称
            'project_time'                  //立项日期
        ];

        $projectMod = M('project');
        $expenseMod = M('expense');

        $count = 0;
        $list = [];
        if ( $start_time && $end_time && $start_time < $end_time ) {

            if ( $type == 1 ) {
                //报账日期查询
                $res = $expenseMod->field(['project_id'])->where(['expense_time' => [['egt', $start_time], ['elt', $end_time], 'and']])->group('project_id')->select();
                if ( $res ) {

                    $project_ids = array_column($res, 'project_id');

                    $map['id'] = ['in', $project_ids];

                    $count = $projectMod->where($map)->count();
                    $totalPage = ceil( $count / $num );
                    if ( $page <= 0 ) $page = 1;
                    if ( $page > $totalPage ) $page = $totalPage;
                    $pre = ( $page - 1 ) * $num;

                    $list = $projectMod->field($field)->where($map)->order('project_time desc')->limit($pre.','.$num)->select();
                }

            } else {
                //立项日期查询
                $map['project_time'] = [['egt', $start_time], ['elt', $end_time], 'and'];

                $count = $projectMod->where($map)->count();
                $totalPage = ceil( $count / $num );
                if ( $page <= 0 ) $page = 1;
                if ( $page > $totalPage ) $page = $totalPage;
                $pre = ( $page - 1 ) * $num;

                $list = $projectMod->field($field)->where($map)->order('project_time desc')->limit($pre.','.$num)->select();
            }

        } else {

            $count = $projectMod->where($map)->count();
            $totalPage = ceil( $count / $num );
            if ( $page <= 0 ) $page = 1;
            if ( $page > $totalPage ) $page = $totalPage;
            $pre = ( $page - 1 ) * $num;

            $list = $projectMod->field($field)->where($map)->order('project_time desc')->limit($pre.','.$num)->select();

        }

        if ( $list ) {
            foreach ( $list as $key => $value ) {

                $amount = $expenseMod->where(['project_id' => $value['project_id']])->sum('amount');
                $list[$key]['total'] = $amount ? $amount : 0.00;
                $obj = $expenseMod->field(['expense_time'])->where(['project_id' => $value['project_id']])->order('expense_time desc')->find();
                $list[$key]['expense_time'] = $obj['expense_time'] ? date('Y-m-d', $obj['expense_time']) : 0;
                $list[$key]['project_time'] = date('Y-m-d', $value['project_time']) ? date('Y-m-d', $value['project_time']) : '暂无';

            }
        }

        ajax_success('获取成功', compact('count', 'totalPage', 'list'));

    }

    /**
     * 项目支出详情
     */
    public function expenseDetails() {

        $project_id = I('get.project_id', 0, 'intval');
        if ( $project_id <= 0 ) ajax_error('参数错误');

        $projectMod = M('project');
        $project_info = $projectMod->alias('project')
            ->field([
                'project.id' => 'project_id',
                'project.name' => 'project_name',
                'project.sche_id',
                "from_unixtime(project.project_time, '%Y-%m-%d')" => 'project_time',
                'schedule.name' => 'stage'
            ])
            ->join('left join s_schedule schedule on schedule.id = project.sche_id')
            ->where(['project.id' => $project_id])->find();
        if ( !$project_info ) ajax_error('项目信息不存在');


        $expenseMod = M('expense');
        $project_info['expense_amount'] = $expenseMod->where(['project_id' => $project_id])->sum('amount');     //支出总额
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
        $list = $expenseMod->alias('expense')->join('left join s_user u on u.id = expense.user_id')
            ->join('left join s_overhead_type oh on oh.id = expense.overhead_type_id')
            ->field([
                'expense.id' => 'expense_id',    //支出ID
                'expense.amount',
                'expense.overhead_type_id',
                'oh.name' => 'overhead_type_name',
                "from_unixtime(expense.expense_time, '%Y-%m-%d')" => 'expense_time',
                'expense.expense_content',
                'expense.user_id',
                'u.nickname' => 'username',
            ])->where(['expense.project_id' => $project_id])->select();

        $project_info['logs'] = $list;

        ajax_success('获取成功', $project_info);

    }

    /**
     * 项目支出报账类型
     */
    public function getExpenseType() {

        //type : 1-项目支出 2-行政支出
        $list = M('overhead_type')->field(['id', 'name'])->where(['type' => 1])->select();
        ajax_success('获取成功',  $list);

    }

    /**
     * 添加与编辑项目支出
     */
    public function expenseHandle() {

        if ( !IS_POST ) ajax_error('请求方式有误');

        //自动验证
        $rules = [
            ['project_id', 'require', '项目ID不能为空'],
            ['overhead_type_id', 'require', '报账类型不能为空'],
            ['user_id', 'require', '经手人不能为空'],
            ['amount', 'require', '金额不能为空'],
            ['amount', '/^(([0-9]+)|([0-9]+\.[0-9]{1,2}))$/', '金额不合法', 1, 'regex' ],
            ['expense_time', 'require', '报账时间不能为空'],
            ['expense_content', 'require', '报账内容不能为空'],
        ];

        $expenseMod = M('expense');
        $data = $expenseMod->validate($rules)->create();
        if ( !$data ) ajax_error($expenseMod->getError());
        if ( $data['amount'] <= 0 ) ajax_error('金额不能为0');

        //日志准备
        $nickname = M('user')->where(['id'=>$this->user_id])->getField('nickname');
        $pro_name = M('project')->where((['id'=>$data['project_id']]))->getField('name');

        $data['add_time'] = $data['update_time'] = time();

        $expense_id = I('post.expense_id', 0, 'intval');
        if ( $expense_id ) {
            //编辑
            $info = $expenseMod->find($expense_id);
            if ( !$info ) ajax_error('项目支出信息不存在');

            $data['id'] = $expense_id;
            unset($data['add_time']);

            if ( $expenseMod->save($data) !== false ) {
                $this->log($nickname.'在项目：'.$pro_name.'，编辑了一条项目支出记录',7);
                ajax_success('编辑成功');
            } else {
                ajax_error($expenseMod->getError());
            }

        } else {
            //添加
            if ( $expenseMod->add($data) ) {
                $this->log($nickname.'在项目：'.$pro_name.'，新增了一条项目支出记录',7);
                ajax_success('添加成功');
            } else {
                ajax_error($expenseMod->getError());
            }
        }

    }

    #--------------------------------------------------
    #
    #   行政支出子模块
    #
    #--------------------------------------------------
    /**
     * 行政支出列表
     */
    public function executiveList() {

        $start_time = strtotime(I('get.start_time'));
        $end_time = strtotime(I('get.end_time'));
        $page = I('get.page', 1, 'intval'); //分页
        $num = I('get.num', 10, 'intval');  //条数

        $map = [];
        if ( $start_time && $end_time && ($start_time < $end_time) ) {
            $map['ex.executive_time'] = [['egt', $start_time], ['elt', $end_time], 'and'];
            // $map['ex.executive_time'] = ['between',[$start_time,$end_time]];
        }
        $executiveMod = M('executive');

        $count = $executiveMod->alias('ex')->where($map)->count();
        $totalPage = ceil( $count / $num );
        if ( $page <= 0 ) $page = 1;
        if ( $page > $totalPage ) $page = $totalPage;
        $pre = ($page - 1) * $num;

        $list = $executiveMod->alias('ex')->field([
                'ex.id' => 'executive_id',
                'ex.overhead_type_id',
                'oh.name' => 'overhead_type_name',
                'ex.executive_content',
                "from_unixtime(ex.executive_time, '%Y-%m-%d')" => 'executive_time',
                'ex.user_id',
                'u.nickname' => 'username',
                'ex.amount'
            ])
            ->join('left join s_overhead_type oh on oh.id = ex.overhead_type_id')
            ->join('left join s_user u on u.id = ex.user_id')
            ->where($map)->limit($pre.','.$num)->order('ex.executive_time desc')->select();
        ajax_success('获取成功', compact('count', 'totalPage', 'list'));
    }

    /**
     * 添加与编辑行政支出
     */
    public function executiveHandle() {

        if ( !IS_POST ) ajax_error('请求方式有误');

        //自动验证
        $rules = [
            ['user_id', 'require', '经手人不能为空'],
            ['executive_time', 'require', '报账时间不能为空'],
            ['overhead_type_id', 'require', '报账类型不能为空'],
            ['amount', 'require', '金额不能为空'],
            ['amount', '/^(([0-9]+)|([0-9]+\.[0-9]{1,2}))$/', '金额不合法', 1, 'regex' ],
            ['executive_content', 'require', '报账内容不能为空'],
        ];

        $executiveMod = M('executive');
        $data = $executiveMod->validate($rules)->create();
        if ( !$data ) ajax_error($executiveMod->getError());
        if ( $data['amount'] <= 0 ) ajax_error('金额不能为0');

        $executive_id = I('post.executive_id', 0, 'intval');
        //日志准备
        $nickname = M('user')->where(['id'=>$this->user_id])->getField('nickname');

        $data['add_time'] = $data['update_time'] = time();

        if ( $executive_id ) {
            //编辑
            $info = $executiveMod->find($executive_id);
            if ( !$info ) ajax_error('行政支出信息不存在');

            $data['id'] = $executive_id;
            unset($data['add_time']);

            if ( $executiveMod->save($data) !== false ) {
                $this->log($nickname.'编辑了一条行政支出',7);
                ajax_success('编辑成功');
            } else {
                ajax_error($executiveMod->getError());
            }

        } else {
            //添加
            if ( $executiveMod->add($data) ) {
                $this->log($nickname.'添加了一条行政支出',7);
                ajax_success('添加成功');
            } else {
                ajax_error($executiveMod->getError());
            }
        }

    }

    /**
     * 行政支出报账类型
     */
    public function getExecutiveType() {

        //type : 1-项目支出 2-行政支出
        $list = M('overhead_type')->field(['id', 'name'])->where(['type' => 2])->select();
        ajax_success('获取成功',  $list);

    }


    #-------------------------------------------------
    #
    #   项目计提子模块
    #
    #-------------------------------------------------
    /**
     * 项目计提列表
     */
    public function commissionList() {

        $status = I('get.status', 0, 'intval'); //状态 0进行中 1是完结 2是中断

        $start_time = strtotime(I('get.start_time'));
        $end_time = strtotime(I('get.end_time'));
        $type = I('get.type', 1, 'intval'); //类型：1-计提周期，2-立项日期
        $project_name = I('get.project_name', '', 'trim');  //项目名称

        $page = I('get.page', 1, 'intval'); //分页
        $num = I('get.num', 10, 'intval');  //条数

        //查询条件
        $map['status'] = $status;   //项目状态
        if ( $project_name ) $map['name'] = ['like', "%{$project_name}%"];

        //查询字段
        $field = [
            'id' => 'project_id',           //项目ID
            'name' => 'project_name',       //项目名称
             "from_unixtime(project_time, '%Y-%m-%d')" => 'project_time',   //立项日期
        ];
        $projectMod = M('project');
        $projectCommission = M('project_commission');
        $count = 0;
        $list = [];
        if ( $start_time && $end_time && $start_time < $end_time ) {

            if ( $type ==1 ) {
                //计提周期
                $res = $projectCommission->field(['project_id'])->where(['start_time' => ['egt', $start_time], 'end_time' => ['elt', $end_time]])->group('project_id')->select();
                if ( $res ) {
                    $project_ids = array_column($res, 'project_id');
                    $map['id'] = ['in', $project_ids];

                    $count = $projectMod->where($map)->count();
                    $totalPage = ceil( $count / $num );
                    if ( $page <= 0 ) $page = 1;
                    if ( $page > $totalPage ) $page = $totalPage;
                    $pre = ( $page - 1 ) * $num;

                    $list = $projectMod->field($field)->where($map)->limit($pre.','.$num)->order('project_time desc')->select();
                }
            } else {
                //立项时间
                $map['project_time'] = [['egt', $start_time], ['elt', $end_time], 'and'];
                $count = $projectMod->where($map)->count();
                $totalPage = ceil( $count / $num );
                if ( $page <= 0 ) $page = 1;
                if ( $page > $totalPage ) $page = $totalPage;
                $pre = ( $page - 1 ) * $num;

                $list = $projectMod->field($field)->where($map)->limit($pre.','.$num)->order('project_time desc')->select();
            }

        } else {
            $count = $projectMod->where($map)->count();
            $totalPage = ceil( $count / $num );
            if ( $page <= 0 ) $page = 1;
            if ( $page > $totalPage ) $page = $totalPage;
            $pre = ( $page - 1 ) * $num;

            $list = $projectMod->field($field)->where($map)->limit($pre.','.$num)->order('project_time desc')->select();

        }
        if ( $list ) {
            foreach ( $list as $key => $value ) {

                $total = $projectCommission->where(['project_id' => $value['project_id']])->sum('amount');
                //$expense_total = M('expense')->where(['project_id'=>$value['project_id']])->getField('sum(amount)');
                $list[$key]['total'] = ($total ? $total : 0) ;//+ ($expense_total ? $expense_total : 0);        //计提总支出
                $last_commission = $projectCommission->where(['project_id' => $value['project_id']])->order('end_time desc')->find();
                $last_time = $last_commission['start_time'] ? date('Y/m/d',$last_commission['start_time']) : '暂无';
                $end_time  = $last_commission['end_time'] ? date('Y/m/d',$last_commission['end_time']) : '计提';
                $list[$key]['last_commission'] = $last_time . '-' . $end_time;   //最新计提周期
                // $list[$key]['project_time'] = 

            }
        }
        ajax_success('获取成功', compact('count', 'totalPage', 'list'));
    }

    /**
     * 计提详情
     */
    public function commissionDetails() {

        $project_id = I('get.project_id', 0, 'intval');             //项目ID
        $project_child_id = I('get.project_child_id', 0, 'intval'); //项目子ID

        if ( $project_id <= 0 ) ajax_error('参数错误');

        $projectMod = M('project');
        $project_info = $projectMod->alias('project')
            ->field([
                'project.id' => 'project_id',       //项目ID
                'project.name' => 'project_name',   //项目名称
                "FROM_UNIXTIME(project.project_time, '%Y-%m-%d')" => 'project_time',                     //立项时间
                'schedule.name' => 'stage',         //项目阶段
                'u.nickname' => 'director_name',    //项目主管
            ])
            ->join('left join s_schedule schedule on schedule.id = project.sche_id')
            ->join('left join s_user u on u.id = project.director_id')
            ->where(['project.id' => $project_id])
            ->find();
        if ( !$project_info ) ajax_error('项目信息不存在');

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

        $projectCommissionMod = M('project_commission');

        //查找进行中的计提
        $current_project_commission = $projectCommissionMod
            ->field([
                'id' => 'project_commission_id',
                "from_unixtime(start_time, '%Y-%m-%d')" => 'start_time',        //计提开始时间
                "from_unixtime(end_time, '%Y-%m-%d')" => 'end_time',            //计提结束时间
                'amount',
                'supervisor_rate',
                'group_rate',
                'is_submit'
            ])
            ->where(['project_id' => $project_id, 'project_child_id' => $project_child_id, 'is_finish' => 0])->find();

        if ( !$current_project_commission ) $current_project_commission = '';

        //历史计提
        $history_project_commission = $projectCommissionMod
            ->field([
                'id' => 'project_commission_id',
                "from_unixtime(start_time, '%Y-%m-%d')" => 'start_time',        //计提开始时间
                "from_unixtime(end_time, '%Y-%m-%d')" => 'end_time',            //计提结束时间
                'amount',
                'supervisor_rate',
                'group_rate',
//                'is_submit'
            ])
            ->where(['project_id' => $project_id, 'project_child_id' => $project_child_id, 'is_finish' => 1])->select();

        //计提总支出
        $project_info['total_commission'] = $projectCommissionMod->where(['project_id' => $project_id, 'project_child_id' => $project_child_id, 'status' => 1])->sum('amount');

        ajax_success('获取成功', compact('project_child_info', 'project_info', 'current_project_commission', 'history_project_commission'));

    }

    /**
     * 获取项目组计提详情(工种)
     */
    public function getProjectWorkCommission() {

        $project_commission_id = I('get.project_commission_id', 0, 'intval');
        if ( $project_commission_id <= 0 ) ajax_error('参数错误');

        $list = M('project_work_commission')->alias('pwc')
            ->join('left join s_project_commission pc on pc.id = pwc.project_commission_id')
            ->join('left join s_user u on u.id = pwc.user_id')
            ->join('left join s_work w on w.id = pwc.work_id')
            ->field([
                'FROM_UNIXTIME(pc.start_time)' => 'start_time',
                'FROM_UNIXTIME(pc.end_time)' => 'end_time',
                'pwc.work_id',
                'w.name' => 'work_name',
                'u.nickname' => 'username',
                'pwc.commission_rate',
                'pwc.status',
                'pwc.is_submit',
            ])
            ->where(['pwc.project_commission_id' => $project_commission_id])
            ->select();

        ajax_success('数据获取成功', $list);

    }

    /**
     * 获取项目成员计提详情
     */
    public function getProjectStaffCommission() {

        $project_commission_id = I('get.project_commission_id', 0, 'intval');
        $work_id = I('get.work_id', 0, 'intval');
        if ( $project_commission_id <= 0 || $work_id <= 0 ) ajax_error('参数错误');

        //工种信息
        $info = M('project_work_commission')->alias('pwc')
            ->join('left join s_project_commission pc on pc.id = pwc.project_commission_id')
            ->join('left join s_user u on u.id = pwc.user_id')
            ->join('left join s_work w on w.id = pwc.work_id')
            ->field([
                'FROM_UNIXTIME(pc.start_time, \'%Y-%m-%d\')' => 'start_time',
                'FROM_UNIXTIME(pc.end_time, \'%Y-%m-%d\')' => 'end_time',
                'w.name' => 'work_name',
                'u.nickname' => 'username',
                'pwc.commission_rate',
            ])
            ->where(['pwc.project_commission_id' => $project_commission_id, 'pwc.work_id' => $work_id])
            ->find();

        //员工列表
        $list = M('project_staff_commission')->alias('psc')->join('left join s_user u on u.id = psc.user_id')
            ->field([
                'u.nickname' => 'username',
                'psc.labor',
                'psc.content',
                'psc.commission_rate'
            ])
            ->where(['psc.project_commission_id' => $project_commission_id, 'psc.work_id' => $work_id])
            ->select();

        ajax_success('数据获取成功', compact('info', 'list'));
    }

    /**
     * 确定/退回 项目组方案
     */
    public function confirmProjectWorkCommission() {

        if ( !IS_POST ) ajax_error('请求有误');

        $project_commission_id = I('post.project_commission_id', 0, 'intval');
        $status = I('post.status', 0, 'intval');
        if ( $project_commission_id <= 0 ) ajax_error('参数错误');

        $data = [
            'status' => $status,
        ];
        if ( !$status ) {
            $data['is_submit'] = 0;
        }
        $projectCommissionMod = M('project_commission');
        if ( $projectCommissionMod->where(['id' => $project_commission_id])->save($data) !== false ) {
            ajax_success('操作成功');
        } else {
            ajax_error($projectCommissionMod->getError());
        }

    }

    /**
     * 提交与编辑项目计提（完成计提任务）
     */
    public function submitProjectCommission() {

        if ( !IS_POST ) ajax_error('请求有误');

        $project_commission_id = I('post.project_commission_id', 0, 'intval');
        if ( $project_commission_id <= 0 ) ajax_error('参数错误');

        $amount = I('post.amount', 0, 'intval');
        $supervisor_rate = I('post.supervisor_rate', 0, 'intval');
        $group_rate = I('post.group_rate', 0, 'intval');

        //开启事务
        M()->startTrans();
        $bool = true;
        //项目主管计提金额
        $supervisor_money =  round( ($amount * $supervisor_rate) / 100, 2);
        $group_money = $amount - $supervisor_money;     //项目组金额
        //获取项目ID
        $pid = M('project_commission')->where(['id'=>$project_commission_id])->getField('project_id');
        $data = [
            'supervisor_rate' => $supervisor_rate,
            'supervisor_money' => $supervisor_money,
            'group_rate' => $group_rate,
            'amount' => $amount,
            'is_finish' => 1,
        ];

        //项目主管提成信息保存
        if ( M('project_commission')->where(['id' => $project_commission_id])->save($data) !== false ) {

        } else {
            $bool = false;
        }

        //计算每个工种计提比例与金额
        $projectWorkCommissionMod = M('project_work_commission');
        $projectStaffCommissionMod = M('project_staff_commission');
        $staffMod = M('staff');
        $list = $projectWorkCommissionMod->where(['project_commission_id' => $project_commission_id])->select();
        if ( $list ) {

            foreach ( $list as $key => $value ) {

                //当前工种总计提总额
                $commission_money = round( ($group_money * $value['commission_rate']) / 100, 2 );
                if ( $projectWorkCommissionMod->where(['id' => $value['id']])->save(['commission_money' => $commission_money]) !== false ) {

                } else {
                    $bool = false;
                    break;
                }

                //当前工种下的成员列表
                $staff_list = $projectStaffCommissionMod->where(['work_id' => $value['work_id'], 'project_commission_id' => $value['project_commission_id']])->select();
                if ( $staff_list ) {
                    foreach ( $staff_list as $k => $v ) {

                        //查找分工与工作内容
                        $staff_info = $staffMod->where(['work_id' => $v['work_id'], 'user_id' => $v['user_id'], 'project_child_id' => $v['project_child_id']])->find();
                        $staff_commission_money = round( ($commission_money * $v['commission_rate']) / 100, 2 );
                        $arr = [
                            'commission_money' => $staff_commission_money ? $staff_commission_money : 0,
                            'labor' => $staff_info['labor'] ? $staff_info['labor'] : '',
                            'content' => $staff_info['content'] ? $staff_info['content'] : '',
                        ];
                        if ( $projectStaffCommissionMod->where(['id' => $v['id']])->save($arr) !== false ) {

                        } else {
                            $bool = false;
                            break;
                        }

                     }
                }

            }

        }

        if ( $bool ) {
            M()->commit();
            $nickname = M('user')->where(['id'=>$this->user_id])->getField('nickname');
            $pro_name = M('project')->where(['id'=>$pid])->getField('name');
            $this->log($nickname.'在项目：'.$pro_name.'，确认或修改了一次计提',7);
            ajax_success('操作成功');
        } else {
            M()->rollback();
            ajax_error('操作失败');
        }

    }

    /**
     * 经营统计
     */
    public function census() {

        $status = I('get.status', 0, 'intval'); //状态 0进行中 1是完结 2是中断

        $start_time = strtotime(I('get.start_time'));
        $end_time = strtotime(I('get.end_time'));
        $type = I('get.type', 1, 'intval'); //类型：1-到款日期，2-立项日期
        $project_name = I('get.project_name', '', 'trim');  //项目名称

        $page = I('get.page', 1, 'intval'); //分页
        $num = I('get.num', 10, 'intval');  //条数

        //查询条件
        $map['project.status'] = $status;   //项目状态
        if ( $project_name ) $map['project.name'] = ['like', "%{$project_name}%"];

        //查询字段
        $field = [
            'project.id' => 'project_id',           //项目ID
            'project.name' => 'project_name',       //项目名称
        ];

        if ( $start_time && $end_time && $start_time < $end_time ) {
            if ( $type == 1 ) {
                //根据到款日期查询
                $res = M('receipt')->field('s_id')->where(['receive_time' => [['egt', $start_time], ['elt', $end_time], 'and']])->group('s_id')->select();

                $count = 0;
                $list = [];
                if ( $res ) {

                    $s_id = array_column($res, 's_id');
                    $obj = M('schedule')->field('project_id')->where(['id' => ['IN', $s_id]])->group('project_id')->select();

                    if ( $obj ) {

                        $project_id = array_column($obj, 'project_id');
                        $map['project.id'] = ['IN', $project_id];

                        //总条数
                        $count = M('project')->alias('project')->where($map)->count();

                        //总页码
                        $totalPage = ceil( $count / $num );
                        if ( $page <= 0 ) $page = 1;
                        if ( $page > $totalPage ) $page = $totalPage;
                        $pre = ($page - 1) * $num;

                        $list = M('project')->alias('project')->field($field)
                            ->where($map)->order('project.update_time desc')->limit($pre.','.$num)->select();

                    }

                }

            } else {
                //根据立项日期查询
                $map['project.project_time'] = [['egt', $start_time], ['elt', $end_time], 'and'];

                //总条数
                $count = M('project')->alias('project')->where($map)->count();

                //总页码
                $totalPage = ceil( $count / $num );
                if ( $page <= 0 ) $page = 1;
                if ( $page > $totalPage ) $page = $totalPage;
                $pre = ($page - 1) * $num;

                $list = M('project')->alias('project')->field($field)
                    ->where($map)->order('project.update_time desc')->limit($pre.','.$num)->select();
            }
        } else {

            //总条数
            $count = M('project')->alias('project')->where($map)->count();

            //总页码
            $totalPage = ceil( $count / $num );
            if ( $page <= 0 ) $page = 1;
            if ( $page > $totalPage ) $page = $totalPage;
            $pre = ($page - 1) * $num;

            $list = M('project')->alias('project')->field($field)
                ->where($map)->order('project.update_time desc')->limit($pre.','.$num)->select();

        }

        if ( $list ) {
            foreach ( $list as $key => $value ) {

                //查找项目总收入
                $total_income = M('schedule')->where(['project_id' => $value['project_id']])->sum('receive');
                $total_income = $total_income ? $total_income : 0;
                $list[$key]['total_income'] =  $total_income;
                //查找项目支出
                $total_pay = M('expense')->where(['project_id' => $value['project_id']])->sum('amount');
                $total_pay = $total_pay ? $total_pay : 0;
                $list[$key]['total_pay'] = $total_pay;
                //查找项目计提
                $total_commission = M('project_commission')->where(['project_id' => $value['project_id'], 'is_finish' => 1])->sum('amount');
                $total_commission = $total_commission ? $total_commission : 0;
                $list[$key]['total_commission'] = $total_commission;
                //剩余
                $list[$key]['surplus'] = $total_income - ($total_pay+$total_commission);

            }
        }

        $project_list = M('project')->where(['status' => ['neq', 2]])->select();
        $total_project = count($project_list);

        if ( $total_project > 0 ) {

            $ids = array_column($project_list, 'id');

            //查找项目总收入
            $total_income = M('schedule')->where(['project_id' => ['in', $ids]])->sum('receive');
            $total_income = $total_income ? $total_income : 0;
            //查找项目支出
            $total_pay = M('expense')->where(['project_id' => ['in', $ids]])->sum('amount');
            //加上项目计提
            $jiti_pay  = M('projectCommission')->where(['project_id'=>['in',$ids]])->sum('amount');
            $jiti_pay  = $jiti_pay ? $jiti_pay  : 0;
            $total_pay = ($total_pay ? $total_pay : 0) + $jiti_pay;
            //查找行政支出
            $total_executive = M('executive')->sum('amount');
            $total_executive = $total_executive ? $total_executive : 0;

            //剩余
            $surplus = $total_income - ($total_pay+$total_executive);

            $rate = 0;
            if ( $total_income > 0 ) {

                $rate = round(($surplus / $total_income) * 100 , 2);
            }

        }

        $info = [
            'total_project' => $total_project,
            'total_income' => $total_income ? $total_income : 0,
            'total_pay' => $total_pay ? $total_pay : 0,
            'total_executive' => $total_executive ? $total_executive : 0,
            'surplus' => $surplus ? $surplus : 0,
            'rate' => $rate ? $rate : 0,
        ];

        ajax_success('数据请求成功', compact('count', 'totalPage', 'list', 'info'));

    }

    /**
     * 经营统计详情
     */
    public function censusDetails() {

        $project_id = I('get.project_id', 0, 'intval');
        if ( $project_id <= 0 ) ajax_error('参数错误');

        $type = I('get.type', 0, 'intval'); //当为1时显示首页统计分析

        //查找项目收款列表
        $schedule_list = M('schedule')->field([
            'id' => 'schedule_id',
            'name',
            'receive',
            'round(money-receive, 2)' => 'debat',
            'process'
        ])->where(['project_id' => $project_id])->select();
        foreach ($schedule_list as $k=>$v){
            $schedule_list[$k]['process'] = M('receipt')->where(['s_id'=>$schedule_list[$k]['schedule_id']])->order('id desc')->getfield('cause');
            if (!$schedule_list[$k]['process']){
                $schedule_list[$k]['process'] = '暂无收款记录';
            }
        }

        //ajax_success($schedule_list);
        //查找项目支出列表
        $expense_list = M('expense')->alias('e')->join('left join s_user u on u.id = e.user_id')->join('left join s_overhead_type ot on ot.id = overhead_type_id')->field([
            'e.id' => 'expense_id',
            "from_unixtime(e.expense_time, '%Y-%m-%d')" => 'expense_time',
            'ot.name' => 'type_name',
            'e.amount',
            'e.expense_content',
            'u.nickname' => 'username'
        ])->where(['project_id' => $project_id])->select();

        //查找子项目列表
        $project_child_list = M('project_child')->field(['id' => 'project_child_id', 'name'])->where(['project_id' => $project_id])->select();

        if ( $project_child_list ) {

            if ( $type ) {
                //首页统计分析
                foreach ( $project_child_list as $key => $value ) {
                    //查出每个子项目的历史计提记录
                    $commission_list = M('project_commission')->alias('pc')
                        ->join('left join s_project_work_commission pwc on pwc.project_commission_id = pc.id')
                        ->join('left join s_user u on u.id = pwc.user_id')
                        ->join('left join s_work w on w.id = pwc.work_id')
                        ->field([
                            'pc.id' => 'project_commission_id',
                            "from_unixtime(pc.start_time, '%Y-%m-%d')" => 'start_time',
                            "from_unixtime(pc.end_time, '%Y-%m-%d')" => 'end_time',
                            'pwc.work_id',
                            'w.name' => 'work_name',
                            'u.nickname' => 'username',
                            'pwc.commission_rate'
                        ])->where(['pc.project_child_id' => $value['project_child_id'], 'pc.is_finish' => 1])->select();

                    if ( $commission_list ) {
                        foreach ( $commission_list as $k => $v ) {
                            $user_list = M('project_staff_commission')->distinct(true)->alias('psc')
                                ->join('left join s_user u on u.id = psc.user_id')
                                ->field([
                                    'u.nickname' => 'username',
                                ])
                                ->where(['psc.project_commission_id' => $v['project_commission_id'], 'psc.work_id' => $v['work_id']])->select();
                            $commission_list[$k]['user_list'] = $user_list ? array_column($user_list, 'username') : [];
                        }
                    }

                    $project_child_list[$key]['commission_list'] = $commission_list;

                }
            } else {
                foreach ( $project_child_list as $key => $value ) {
                    //查出每个子项目的历史计提记录
                    $commission_list = M('project_commission')->field([
                        'id' => 'project_commission_id',
                        "from_unixtime(start_time, '%Y-%m')" => 'start_time',
                        "from_unixtime(end_time, '%Y-%m')" => 'end_time',
                        'amount',
                        'supervisor_rate',
                        'group_rate'
                    ])->where(['project_child_id' => $value['project_child_id'], 'is_finish' => 1])->select();

                    $project_child_list[$key]['commission_list'] = $commission_list;

                }
            }

        }
        ajax_success('数据获取成功', compact('schedule_list', 'expense_list', 'project_child_list'));

    }

    /**
     * 经营统计->项目支出（详情）
     */
    public function censusExpenseDetails() {

        $expense_id = I('get.expense_id', 0, 'intval');
        if ( $expense_id <= 0 ) ajax_error('参数错误');

        $res = M('expense')->alias('expense')->join('left join s_user u on u.id = expense.user_id')
            ->join('left join s_overhead_type oh on oh.id = expense.overhead_type_id')
            ->field([
                'expense.id' => 'expense_id',    //支出ID
                'expense.project_id',
                'expense.amount',
                'expense.overhead_type_id',
                'oh.name' => 'overhead_type_name',
                "from_unixtime(expense.expense_time, '%Y-%m-%d')" => 'expense_time',
                'expense.expense_content',
                'expense.user_id',
                'u.nickname' => 'username',
            ])->where(['expense.id' => $expense_id])->find();
        if ( !$res ) ajax_error('支出信息不存在');


        $projectMod = M('project');
        $project_info = $projectMod->alias('project')
            ->field([
                'project.id' => 'project_id',
                'project.name' => 'project_name',
                "from_unixtime(project.project_time, '%Y-%m-%d')" => 'project_time',
            ])
            ->where(['project.id' => $res['project_id']])->find();
        if ( !$project_info ) ajax_error('项目信息不存在');

        $info = [
            'project_name' => $project_info['project_name'],
            'project_time' => $project_info['project_time'],
            'overhead_type_name' => $res['overhead_type_name'],
            'amount' => $res['amount'],
            'username' => $res['username'],
            'expense_time' => $res['expense_time'],
            'expense_content' => $res['expense_content'],
        ];


        ajax_success('获取成功', $info);

    }

    /**
     * 经营统计->项目收入（详情）
     */
    public function censusReceiptDetails() {

        $schedule_id = I('get.schedule_id', 0, 'intval');    //项目ID
        if ( $schedule_id <= 0 ) ajax_error('参数错误');

        $info = M('schedule')->field([
            'id' => 'schedule_id',      //阶段ID
            'name' => 'schedule_name',  //阶段名称
            'content',     //阶段内容
            'money',         //阶段总金额
            'receive',     //已收款
            'money - receive' => 'debt',  //未收款
            'process',     //过程纪录
            'project_id'
        ])->where(['id' => $schedule_id])->find();
        if ( !$info ) ajax_error('信息不存在');

        //项目基本信息
        $arr = M('project')->alias('p')->join('left join s_schedule s on s.id = p.sche_id')->field(['p.*', 's.name as stage_name'])->where(['p.id' => $info['project_id']])->find();
        if ( !$arr ) ajax_error('项目信息不存在');

        $res = [
            'project_id' => $info['project_id'],
            'project_name' => $arr['name'],
            'project_time' => date('Y-m-d', $arr['project_time']),
            'project_stage' => $arr['stage_name'],
            'project_money' => $arr['money'],
        ];


        $logs = M('receipt')->field(['id as receipt_id', 'receive', 'cause', "from_unixtime(receive_time, '%Y-%m-%d')" => 'receive_time'])->where(['s_id' => $schedule_id])->order('receive_time desc')->select();
        $info['receipt_log'] = $logs;

        $res['child'] = $info;

        ajax_success('数据获取成功', $res);

    }

    public function income_export()
    {
        $status = I('get.status', 0, 'intval'); //状态 0进行中 1是完结 2是中断

        $start_time = strtotime(I('get.start_time'));
        $end_time = strtotime(I('get.end_time'));
        $type = I('get.type', 1, 'intval'); //类型：1-到款日期，2-立项日期
        $project_name = I('get.project_name', '', 'trim');  //项目名称

        $page = I('get.page', 1, 'intval'); //分页
        $num = I('get.num', 10, 'intval');  //条数

        //查询条件
        $map['project.status'] = $status;   //项目状态
        if ( $project_name ) $map['project.name'] = ['like', "%{$project_name}%"];

        //查询字段
        $field = [
            'project.id' => 'project_id',           //项目ID
            'project.name' => 'project_name',       //项目名称
            'project.money' => 'project_money',     //合同总额
//            'project.status',                       //项目状态：0进行中 1是完结 2是中断
//            'schedule.name' => 'stage',             //项目阶段
            'st.name' => 'stage',             //项目阶段
//            'round(sum(schedule.receive), 2)' => 'receive',         //已收款
//            'round(sum(schedule.money)-sum(schedule.receive), 2)' => 'debt',  //未收款
            'schedule.process',     //最新过程记录
            'project.project_time',  //立项日期
            'project.sche_id'
        ];
        
        if ( $start_time && $end_time && $start_time < $end_time ) {
            if ( $type == 1 ) {
                //根据到款日期查询
//                $map['receive_time'] = [['egt', $start_time], ['elt', $end_time], 'and'];

                $res = M('receipt')->field('s_id')->where(['receive_time' => [['egt', $start_time], ['elt', $end_time], 'and']])->group('s_id')->select();
                $count = 0;
                $list = [];
                if ( $res ) {

                    $s_id = array_column($res, 's_id');
                    $obj = M('schedule')->field('project_id')->where(['id' => ['IN', $s_id]])->group('project_id')->select();
                    if ( $obj ) {

                        $project_id = array_column($obj, 'project_id');
                        $map['project.id'] = ['IN', $project_id];

                        //总条数
                        $count = M('project')->alias('project')->where($map)->count();

                        //总页码
                        $totalPage = ceil( $count / $num );
                        if ( $page <= 0 ) $page = 1;
                        if ( $page > $totalPage ) $page = $totalPage;
                        $pre = ($page - 1) * $num;
                        if($pre < 0)
                            $pre = 0;
                        $list = M('project')->alias('project')
                            ->join('left join s_schedule as schedule on schedule.id = project.sche_id')
                            ->join('left join s_stage_types as st on st.id = project.stage')
                            ->field($field)
                            ->where($map)->order('project.update_time desc')->select();

                    }

                }

            } else {
                //根据立项日期查询
                $map['project.project_time'] = [['egt', $start_time], ['elt', $end_time], 'and'];

                //总条数
                $count = M('project')->alias('project')->where($map)->count();

                //总页码
                $totalPage = ceil( $count / $num );
                if ( $page <= 0 ) $page = 1;
                if ( $page > $totalPage ) $page = $totalPage;
                $pre = ($page - 1) * $num;

                $list = M('project')->alias('project')
                    ->join('left join s_schedule as schedule on schedule.id = project.sche_id')
                    ->join('left join s_stage_types as st on st.id = project.stage')
                    ->field($field)
                    ->where($map)->order('project.update_time desc')->select();
            }
        } else {
            //总条数
            $count = M('project')->alias('project')->where($map)->count();
            //总页码
            $totalPage = ceil( $count / $num );
            if ( $page <= 0 ) $page = 1;
            if ( $page > $totalPage ) $page = $totalPage;
            $pre = ($page - 1) * $num;

            $list = M('project')->alias('project')
                ->join('left join s_schedule as schedule on schedule.id = project.sche_id')
                ->join('left join s_stage_types as st on st.id = project.stage')
                ->field($field)
                ->where($map)->order('project.update_time desc')->select();

        }
        if ( $list ) {
            foreach ( $list as $key => $value ) {
                switch($value['sche_id'])
                {
                    case -2:
                    $list[$key]['stage'] = '进行中';
                    break;
                    case -1:
                    $list[$key]['stage'] = '未实施';
                    break;
                    case 0:
                    $list[$key]['stage'] = '已完结';
                    break;
                    default:
                    $list[$key]['stage'] = M('schedule')->where(['id'=>$value['sche_id']])->getField('name');
                    break;
                }
                //收款记录
                $obj = M('schedule')->field(['round(sum(receive), 2)' => 'receive', 'round(sum(money)-sum(receive), 2)' => 'debt'])->where(['project_id' => $value['project_id']])->find();
                $list[$key]['receive'] = $obj['receive'] ? $obj['receive'] : 0;
                $list[$key]['debt'] = $obj['debt'] ? $obj['debt'] : 0;
                $list[$key]['project_time'] = date('Y-m-d', $value['project_time']) ? date('Y-m-d', $value['project_time']) : '暂无';
                $list[$key]['process'] = $value['process'] ? $value['process'] : '';
                $schedule_money = M('schedule')->where(['project_id'=>$value['project_id']])->getField('sum(money)');
                $list[$key]['project_money'] = $value['project_moeny'] + $schedule_money;
                unset($list[$key]['sche_id']);
                unset($list[$key]['project_id']);
            }
        }
        array_unshift($list,['项目名称','合同总额','项目阶段','已收款','未收款','最新过程记录','立项时间']);
        export($list,'项目收入'.date('Y-m-d',time()));
    }


    public function overhead_export()
    {
        $status = I('get.status', 0, 'intval'); //状态 0进行中 1是完结 2是中断

        $start_time = strtotime(I('get.start_time'));
        $end_time = strtotime(I('get.end_time'));
        $type = I('get.type', 1, 'intval'); //类型：1-报账日期，2-立项日期
        $project_name = I('get.project_name', '', 'trim');  //项目名称

        $page = I('get.page', 1, 'intval'); //分页
        $num = I('get.num', 10, 'intval');  //条数

        //查询条件
        $map['status'] = $status;   //项目状态
        if ( $project_name ) $map['name'] = ['like', "%{$project_name}%"];

        //查询字段
        $field = [
            'id' => 'project_id',           //项目ID
            'name' => 'project_name',       //项目名称
            'project_time'                  //立项日期
        ];

        $projectMod = M('project');
        $expenseMod = M('expense');

        $count = 0;
        $list = [];
        if ( $start_time && $end_time && $start_time < $end_time ) {

            if ( $type == 1 ) {
                //报账日期查询
                $res = $expenseMod->field(['project_id'])->where(['expense_time' => [['egt', $start_time], ['elt', $end_time], 'and']])->group('project_id')->select();
                if ( $res ) {

                    $project_ids = array_column($res, 'project_id');

                    $map['id'] = ['in', $project_ids];

                    $count = $projectMod->where($map)->count();
                    $totalPage = ceil( $count / $num );
                    if ( $page <= 0 ) $page = 1;
                    if ( $page > $totalPage ) $page = $totalPage;
                    $pre = ( $page - 1 ) * $num;

                    $list = $projectMod->field($field)->where($map)->order('project_time desc')->select();
                }

            } else {
                //立项日期查询
                $map['project_time'] = [['egt', $start_time], ['elt', $end_time], 'and'];

                $count = $projectMod->where($map)->count();
                $totalPage = ceil( $count / $num );
                if ( $page <= 0 ) $page = 1;
                if ( $page > $totalPage ) $page = $totalPage;
                $pre = ( $page - 1 ) * $num;

                $list = $projectMod->field($field)->where($map)->order('project_time desc')->select();
            }

        } else {

            $count = $projectMod->where($map)->count();
            $totalPage = ceil( $count / $num );
            if ( $page <= 0 ) $page = 1;
            if ( $page > $totalPage ) $page = $totalPage;
            $pre = ( $page - 1 ) * $num;

            $list = $projectMod->field($field)->where($map)->order('project_time desc')->select();

        }

        if ( $list ) {
            foreach ( $list as $key => $value ) {

                $amount = $expenseMod->where(['project_id' => $value['project_id']])->sum('amount');
                $list[$key]['total'] = $amount ? $amount : 0.00;
                $obj = $expenseMod->field(['expense_time'])->where(['project_id' => $value['project_id']])->order('expense_time desc')->find();
                $list[$key]['expense_time'] = $obj['expense_time'] ? date('Y-m-d', $obj['expense_time']) : 0;
                $list[$key]['project_time'] = date('Y-m-d', $value['project_time']) ? date('Y-m-d', $value['project_time']) : '暂无';
                unset($list[$key]['project_id']);
            }
        }
        array_unshift($list,['项目名称','立项时间','支出数额','支出时间']);
        export($list,'项目支出'.date('Y-m-d',time()));
    }

    public function jiti_export()
    {
        $status = I('get.status', 0, 'intval'); //状态 0进行中 1是完结 2是中断
        
                $start_time = strtotime(I('get.start_time'));
                $end_time = strtotime(I('get.end_time'));
                $type = I('get.type', 1, 'intval'); //类型：1-计提周期，2-立项日期
                $project_name = I('get.project_name', '', 'trim');  //项目名称
        
                $page = I('get.page', 1, 'intval'); //分页
                $num = I('get.num', 10, 'intval');  //条数
        
                //查询条件
                $map['status'] = $status;   //项目状态
                if ( $project_name ) $map['name'] = ['like', "%{$project_name}%"];
        
                //查询字段
                $field = [
                    'id' => 'project_id',           //项目ID
                    'name' => 'project_name',       //项目名称
                     "from_unixtime(project_time, '%Y-%m-%d')" => 'project_time',   //立项日期
                ];
                $projectMod = M('project');
                $projectCommission = M('project_commission');
                $count = 0;
                $list = [];
                if ( $start_time && $end_time && $start_time < $end_time ) {
        
                    if ( $type ==1 ) {
                        //计提周期
                        $res = $projectCommission->field(['project_id'])->where(['start_time' => ['egt', $start_time], 'end_time' => ['elt', $end_time]])->group('project_id')->select();
                        if ( $res ) {
                            $project_ids = array_column($res, 'project_id');
                            $map['id'] = ['in', $project_ids];
        
                            $count = $projectMod->where($map)->count();
                            $totalPage = ceil( $count / $num );
                            if ( $page <= 0 ) $page = 1;
                            if ( $page > $totalPage ) $page = $totalPage;
                            $pre = ( $page - 1 ) * $num;
        
                            $list = $projectMod->field($field)->where($map)->order('project_time desc')->select();
                        }
                    } else {
                        //立项时间
                        $map['project_time'] = [['egt', $start_time], ['elt', $end_time], 'and'];
                        $count = $projectMod->where($map)->count();
                        $totalPage = ceil( $count / $num );
                        if ( $page <= 0 ) $page = 1;
                        if ( $page > $totalPage ) $page = $totalPage;
                        $pre = ( $page - 1 ) * $num;
        
                        $list = $projectMod->field($field)->where($map)->order('project_time desc')->select();
                    }
        
                } else {
                    $count = $projectMod->where($map)->count();
                    $totalPage = ceil( $count / $num );
                    if ( $page <= 0 ) $page = 1;
                    if ( $page > $totalPage ) $page = $totalPage;
                    $pre = ( $page - 1 ) * $num;
        
                    $list = $projectMod->field($field)->where($map)->order('project_time desc')->select();
        
                }
                if ( $list ) {
                    foreach ( $list as $key => $value ) {
        
                        $total = $projectCommission->where(['project_id' => $value['project_id']])->sum('amount');
                        $expense_total = M('expense')->where(['project_id'=>$value['project_id']])->getField('sum(amount)');
                        $list[$key]['total'] = ($total ? $total : 0) + ($expense_total ? $expense_total : 0);        //计提总支出
                        $last_commission = $projectCommission->where(['project_id' => $value['project_id']])->order('end_time desc')->find();
                        $last_time = $last_commission['start_time'] ? date('Y/m/d',$last_commission['start_time']) : '暂无';
                        $end_time  = $last_commission['end_time'] ? date('Y/m/d',$last_commission['end_time']) : '计提';
                        $list[$key]['last_commission'] = $last_time . '-' . $end_time;   //最新计提周期
                        // $list[$key]['project_time'] = 
                        unset($list[$key]['project_id']);
                    }
                }
                array_unshift($list,['项目名称','立项时间','计提总额','上次计提']);
                export($list,'项目计提'.date('Y-m-d',time()));
    }
    public function admin_overhead_export()
    {
        $start_time = strtotime(I('get.start_time'));
        $end_time = strtotime(I('get.end_time'));
        $page = I('get.page', 1, 'intval'); //分页
        $num = I('get.num', 10, 'intval');  //条数

        $map = [];
        if ( $start_time && $end_time && ($start_time < $end_time) ) {
            $map['ex.executive_time'] = [['egt', $start_time], ['elt', $end_time], 'and'];
            // $map['ex.executive_time'] = ['between',[$start_time,$end_time]];
        }
        $executiveMod = M('executive');

        $count = $executiveMod->alias('ex')->where($map)->count();
        $totalPage = ceil( $count / $num );
        if ( $page <= 0 ) $page = 1;
        if ( $page > $totalPage ) $page = $totalPage;
        $pre = ($page - 1) * $num;

        $list = $executiveMod->alias('ex')->field([
                'ex.id' => 'executive_id',
                'ex.overhead_type_id',
                'oh.name' => 'overhead_type_name',
                'ex.executive_content',
                "from_unixtime(ex.executive_time, '%Y-%m-%d')" => 'executive_time',
                'ex.user_id',
                'u.nickname' => 'username',
                'ex.amount'
            ])
            ->join('left join s_overhead_type oh on oh.id = ex.overhead_type_id')
            ->join('left join s_user u on u.id = ex.user_id')
            ->where($map)->order('ex.executive_time desc')->select();
            foreach($list as $k=>$v)
            {
                unset($list[$k]['executive_id']);
                unset($list[$k]['overhead_type_id']);
                unset($list[$k]['user_id']);
            }
        array_unshift($list,['支出类型','内容','支出时间','相关用户','数额']);
        export($list,'行政支出'.date('Y-m-d',time()));
    }

    public function total_export()
    {
        $status = I('get.status', 0, 'intval'); //状态 0进行中 1是完结 2是中断
        
                $start_time = strtotime(I('get.start_time'));
                $end_time = strtotime(I('get.end_time'));
                $type = I('get.type', 1, 'intval'); //类型：1-到款日期，2-立项日期
                $project_name = I('get.project_name', '', 'trim');  //项目名称
        
                $page = I('get.page', 1, 'intval'); //分页
                $num = I('get.num', 10, 'intval');  //条数
        
                //查询条件
                $map['project.status'] = $status;   //项目状态
                if ( $project_name ) $map['project.name'] = ['like', "%{$project_name}%"];
        
                //查询字段
                $field = [
                    'project.id' => 'project_id',           //项目ID
                    'project.name' => 'project_name',       //项目名称
                ];
        
                if ( $start_time && $end_time && $start_time < $end_time ) {
                    if ( $type == 1 ) {
                        //根据到款日期查询
                        $res = M('receipt')->field('s_id')->where(['receive_time' => [['egt', $start_time], ['elt', $end_time], 'and']])->group('s_id')->select();
        
                        $count = 0;
                        $list = [];
                        if ( $res ) {
        
                            $s_id = array_column($res, 's_id');
                            $obj = M('schedule')->field('project_id')->where(['id' => ['IN', $s_id]])->group('project_id')->select();
        
                            if ( $obj ) {
        
                                $project_id = array_column($obj, 'project_id');
                                $map['project.id'] = ['IN', $project_id];
        
                                //总条数
                                $count = M('project')->alias('project')->where($map)->count();
        
                                //总页码
                                $totalPage = ceil( $count / $num );
                                if ( $page <= 0 ) $page = 1;
                                if ( $page > $totalPage ) $page = $totalPage;
                                $pre = ($page - 1) * $num;
        
                                $list = M('project')->alias('project')->field($field)
                                    ->where($map)->order('project.update_time desc')->select();
        
                            }
        
                        }
        
                    } else {
                        //根据立项日期查询
                        $map['project.project_time'] = [['egt', $start_time], ['elt', $end_time], 'and'];
        
                        //总条数
                        $count = M('project')->alias('project')->where($map)->count();
        
                        //总页码
                        $totalPage = ceil( $count / $num );
                        if ( $page <= 0 ) $page = 1;
                        if ( $page > $totalPage ) $page = $totalPage;
                        $pre = ($page - 1) * $num;
        
                        $list = M('project')->alias('project')->field($field)
                            ->where($map)->order('project.update_time desc')->select();
                    }
                } else {
        
                    //总条数
                    $count = M('project')->alias('project')->where($map)->count();
        
                    //总页码
                    $totalPage = ceil( $count / $num );
                    if ( $page <= 0 ) $page = 1;
                    if ( $page > $totalPage ) $page = $totalPage;
                    $pre = ($page - 1) * $num;
        
                    $list = M('project')->alias('project')->field($field)
                        ->where($map)->order('project.update_time desc')->select();
        
                }
        
                if ( $list ) {
                    foreach ( $list as $key => $value ) {
        
                        //查找项目总收入
                        $total_income = M('schedule')->where(['project_id' => $value['project_id']])->sum('receive');
                        $total_income = $total_income ? $total_income : 0;
                        $list[$key]['total_income'] =  $total_income;
                        //查找项目支出
                        $total_pay = M('expense')->where(['project_id' => $value['project_id']])->sum('amount');
                        $total_pay = $total_pay ? $total_pay : 0;
                        $list[$key]['total_pay'] = $total_pay;
                        //查找项目计提
                        $total_commission = M('project_commission')->where(['project_id' => $value['project_id'], 'is_finish' => 1])->sum('amount');
                        $total_commission = $total_commission ? $total_commission : 0;
                        $list[$key]['total_commission'] = $total_commission;
                        //剩余
                        $list[$key]['surplus'] = $total_income - ($total_pay+$total_commission);
                        unset($list[$key]['project_id']);
                    }
                }
        
                $project_list = M('project')->where(['status' => ['neq', 2]])->select();
                $total_project = count($project_list);
        
                if ( $total_project > 0 ) {
        
                    $ids = array_column($project_list, 'id');
        
                    //查找项目总收入
                    $total_income = M('schedule')->where(['project_id' => ['in', $ids]])->sum('receive');
                    $total_income = $total_income ? $total_income : 0;
                    //查找项目支出
                    $total_pay = M('expense')->where(['project_id' => ['in', $ids]])->sum('amount');
                    //加上项目计提
                    $jiti_pay  = M('projectCommission')->where(['project_id'=>['in',$ids]])->sum('amount');
                    $jiti_pay  = $jiti_pay ? $jiti_pay  : 0;
                    $total_pay = ($total_pay ? $total_pay : 0) + $jiti_pay;
                    //查找行政支出
                    $total_executive = M('executive')->sum('amount');
                    $total_executive = $total_executive ? $total_executive : 0;
        
                    //剩余
                    $surplus = $total_income - ($total_pay+$total_executive);
        
                    $rate = 0;
                    if ( $total_income > 0 ) {
        
                        $rate = round(($surplus / $total_income) * 100 , 2);
                    }
        
                }
        
                $info = [
                    'total_project' => $total_project,
                    'total_income' => $total_income ? $total_income : 0,
                    'total_pay' => $total_pay ? $total_pay : 0,
                    'total_executive' => $total_executive ? $total_executive : 0,
                    'surplus' => $surplus ? $surplus : 0,
                    'rate' => $rate ? $rate : 0,
                ];
        
                array_unshift($list,['项目名称','总收入','总支出','计提总额','剩余']);
                export($list,'经营统计'.date('Y-m-d',time()));
    }
}