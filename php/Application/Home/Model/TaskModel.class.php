<?php
namespace Home\Model;
use Think\Model\RelationModel;

class TaskModel extends RelationModel
{
    protected $_auto = [
        ['add_time','time',1,'function']
    ];

    protected $_validate = [
        ['project_id','require','缺少项目',1,'',1],
        ['type','require','缺少类型',1,'',1],
        ['title','require','缺少标题',1,'',1],
        ['content','require','缺少内容',1,'',1],
        ['to_user','require','缺少接收者',1,'',1]
    ];

    protected $_link = [
        'type'  =>  [
            'mapping_type'      =>  self::BELONGS_TO,
            'class_name'        => 'task_type',
            'foreign_key'       => 'type',
            'as_fields'         => 'type',
            'mapping_fields'    => 'name as type'
        ],
        'create_by'     =>  [
            'mapping_type'      =>  self::BELONGS_TO,
            'class_name'        =>  'user',
            'foreign_key'       =>  'user_id',
            'as_fields'         =>  'create_by',
            'mapping_fields'    =>  'nickname as create_by'
        ],
        'receiver'     =>  [
            'mapping_type'      =>  self::BELONGS_TO,
            'class_name'        =>  'user',
            'foreign_key'       =>  'to_user',
            'as_fields'         =>  'receiver',
            'mapping_fields'    =>  'nickname as receiver'
        ],
    ];
}

?>
