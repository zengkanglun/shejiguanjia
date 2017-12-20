<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/10/10
 * Time: 20:28
 */
namespace Home\Controller;
use Common\Controller\HomeBaseController;
/**
 * 公共模块
 * Class UserController
 * @package Home\Controller
 */
class CommonController extends HomeBaseController
{
    public $max_upload_size;
    public function _initialize(){
        parent::_initialize();
        // 获取调用控制器
        $called_class = get_called_class();
        // 根据调用控制器进行权限判断

        // 超级管理员
        $is_super   = M('user')->where(['id'=>$this->user_id])->getField('is_super');
        // 管理层
        $administer = M('user')->where(['id'=>$this->user_id])->getField('administer');
        // 具体权限列表
        $authority  = M('user')->where(['id'=>$this->user_id])->getField('authority');
        //echo CONTROLLER_NAME;exit;
				if($is_super)
				{
					switch (strtolower(CONTROLLER_NAME))
	        {
	            // 后台 数据备份
	            case 'admin':
	            case 'database':
	                if(!$is_super)
	                {
	                    //ajax_error('无权访问模块');
	                }
	                break;
	            // 管理->项目
	            case 'commission':

	                break;
	            // 财务
	            case 'finance':
	                if(!$administer)
	                {
	                    //ajax_error('无权访问模块');
	                }
	                if(!in_array(4,explode(',',$authority)))
	                {
	                    //ajax_error('无权访问模块');
	                }
	                break;
	            // 管理->人员
	            case 'manage':
	                if(!$administer)
	                {
	                    //ajax_error('无权访问模块');
	                }
	                if(!in_array(5,explode(',',$authority)))
	                {
	                    //ajax_error('无权访问模块');
	                }
	                break;
	           case 'task':
	           			if(strtolower(ACTION_NAME) == 'users_task')
	           			{
	           				if(!$is_super)
	           				{
	           					//ajax_error('无权查看');
	           				}
	           			}
	                break;
	        }
				}
        // 获取上传文件最大限制
        $size = M('info')->where(1)->getField('max_upload_size');
        $this->max_upload_size = $size;
    }

    /**
     * [ProcessType 获取过程纪要类型]
     * @Author   HTL
     * @DateTime 2017-10-16T17:53:55+0800
     */
    public function ProcessType()
    {
        $process_type = M('process_type')->select();

        ajax_success('获取成功',$process_type);
    }

    /**
     * [pictureType 获取出图出差类型]
     * @Author   HTL
     * @DateTime 2017-10-17T13:39:52+0800
     * @return   [type]                   [description]
     */
    public function pictureType(){
        $pictureType = M('chuchai_type')->select();

        ajax_success('获取成功',$pictureType);
    }

    /**
     * [LetterType 发函类型]
     * @Author   HTL
     * @DateTime 2017-10-17T16:42:25+0800
     */
    public function LetterType()
    {
        $letter_type = M('letter_type')->select();

        ajax_success('获取成功',$letter_type);
    }

    /**
     * [ArchivingType 获取图纸归档类型]
     * @Author   HTL
     * @DateTime 2017-10-17T18:06:44+0800
     */
    public function ArchivingType(){
        
        $archive_type = M('archive_type')->select();

        ajax_success('获取成功',$archive_type);
    }

    /**
     * [BuildType 获取建筑类型]
     * @Author   HTL
     * @DateTime 2017-10-23T16:40:28+0800
     */
    public function BuildType(){
        $BuildType = M('BuildType')->select();

        ajax_success('获取成功',$BuildType);
    }

    /**
     * [BuildType 获取阶段类型]
     * @Author   HTL
     * @DateTime 2017-10-23T16:40:28+0800
     */
    public function StageTypes(){
        $StageTypes = M('stage_types')->select();

        ajax_success('获取成功',$StageTypes);
    }
}