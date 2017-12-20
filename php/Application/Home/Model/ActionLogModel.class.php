<?php
namespace Home\Model;
use Think\Model\RelationModel;

class ActionLogModel extends RelationModel
{
    protected $_link = [
        'user'  =>  [
            'mapping_type'  =>  self::BELONGS_TO,
            'class_name'    =>  'user',
            'foreign_key'   =>  'user_id',
            'as_fields'     =>  'username',
            'mapping_fields'=>  'username'
        ],
        'nickname' => [
            'mapping_type'  =>  self::BELONGS_TO,
            'class_name'    =>  'user',
            'foreign_key'   =>  'user_id',
            'as_fields'     => 'nickname',
            'mapping_fields'=>  'nickname'
        ],
    ];
}
