<?php
return array(
	//'配置项'=>'配置值'
    'URL_ROUTER_ON'   => true,
    'SMS_PIN_STATUS'  => 1,//1 = 使用短信 , 2 = 使用固定5678
    'URL_ROUTE_RULES'=>array(
        //注册
        'register'          =>  'User/register',
    )
);