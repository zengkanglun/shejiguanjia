<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017-4-22 0022
 * Time: 16:49
 */

use \Admin\Service\VipService;
class VipNotify
{

    public function test()
    {
        $vipService = new VipService;
        $res = $vipService->vipPaySuccess('2017050859024');
        dump($res);exit();
    }

}


$a = new VipNotify();
$a->test();