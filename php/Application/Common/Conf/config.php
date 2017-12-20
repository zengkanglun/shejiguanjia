<?php
return array(
    //*************************************附加设置***********************************
	'SHOW_PAGE_TRACE'           => false,                           // 是否显示调试面板
    'URL_CASE_INSENSITIVE'      => true,                            // URL不区分大小写
    'LOAD_EXT_CONFIG'           => 'db',            // 加载网站设置文件
    'TMPL_PARSE_STRING'         => array(                           // 定义常用路径
        '__HOME_CSS__'          => __ROOT__.'/Public/Home/css',
        '__HOME_JS__'           => __ROOT__.'/Public/Home/js',
        '__HOME_IMAGES__'       => __ROOT__.'/Public/Home/images',
        '__Wx_CSS__'            => __ROOT__.'/Public/Wx/css',
        '__Wx_JS__'             => __ROOT__.'/Public/Wx/js',
        '__Wx_IMAGES__'         => __ROOT__.'/Public/Wx/images',
        '__ADMIN_CSS__'         => __ROOT__.'/Public/Admin/css',
        '__ADMIN_JS__'          => __ROOT__.'/Public/Admin/js',
        '__ADMIN_IMAGES__'      => __ROOT__.'/Public/Admin/images',
        '__MOBILE_CSS__'        => __ROOT__.'/Public/Mobile/css',
        '__MOBILE_JS__'         => __ROOT__.'/Public/Mobile/js',
        '__MOBILE_IMAGES__'     => __ROOT__.'/Public/Mobile/images',
        '__COM_JS__'            => __ROOT__.'/Public/Com/js',
        '__COM_CSS__'           => __ROOT__.'/Public/Com/css',
        '__COM_IMAGES__'        => __ROOT__.'/Public/Com/images',
        '__LAY_IMAGES__'        => __ROOT__.'/Public/Lay/images',
        '__LAY_CSS__'           => __ROOT__.'/Public/Lay/css',
        '__LAY_JS__'            => __ROOT__.'/Public/Lay/js',
        '__LAY_FONTS__'         => __ROOT__.'/Public/Lay/font',
        '__LAY_ROOT__'          => __ROOT__.'/Public/Lay/',
        '__WX_JS__'             => __ROOT__.'/Application/Wx/View/shengmingshu/js',
        '__WX_CSS__'            => __ROOT__.'/Application/Wx/View/shengmingshu/css',
        '__WX_IMG__'            => __ROOT__.'/Application/Wx/View/shengmingshu/img',
        '__WX_S_AJAX__'         => __ROOT__.'/Application/Wx/View/shengmingshu/s_ajax',
    ),


 
    //***********************************表单令牌设置************************************
    // 'TOKEN_ON'              => true,
    // 'TOKEN_NAME'            => '__hash__',
    // 'TOKEN_TYPE'            => 'md5',
    // 'TOKEN_RESET'           => true,




    //***********************************URL设置**************************************
    'MODULE_ALLOW_LIST'     => array('Home','Admin','Mobile','Api', 'Wechat','Live','Wx','Console'),    //允许访问列表
    'DEFAULT_MODULE'        => 'Home',
    'URL_MODEL'             => 2,

    'TOKEN_SALT'            => 'miaow58cat',

    'DATA_BACKUP_PATH'              => './Uploads/sql/',
    'DATA_BACKUP_PART_SIZE'         => 20971520,
    'DATA_BACKUP_COMPRESS'          => 0,
    'DATA_BACKUP_COMPRESS_LEVEL'    => 9,

);