<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/10/12
 * Time: 11:33
 */

namespace Home\Controller;
use Think\Controller;
use Think\Log;

/**
 * Git钩子请求控制器
 *
 * Class GitHooksController
 * @package Home\Controller
 */
class GitHooksController extends Controller
{

    public function hooks() {

        if (IS_POST) {

//            echo shell_exec('cd /data/wwwroot/shejiguanjia && git pull 2>&1'); exit;

            //接收POST的json数据并解析
            $param = json_decode(file_get_contents('php://input'), true);
            if ( $param['password'] != 'shejiguanjia' ) die('非法请求');

            $path = '/data/wwwroot/shejiguanjia';
            switch ($param['hook_name']) {
                case 'push_hooks' :
                    //...
                    try {

                        $flag = exec("cd {$path}  && git pull 2>&1");
                        Log::write('代码更新成功'.$flag, 'INFO');
                        echo $flag;exit;

                    } catch (\Exception $e) {

                        Log::write("代码更新失败：错误信息：{$e->getMessage()}", 'WARN');

                    }
                    break;
                default :
                    die('未知操作');
                    break;
            }

        } else {

            die('请求有误');

        }

    }

}