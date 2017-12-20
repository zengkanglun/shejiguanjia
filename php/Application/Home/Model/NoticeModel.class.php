<?php
namespace Home\Model;

use Think\Model\RelationModel;

class NoticeModel extends RelationModel
{
    protected $_validate = [
        ['type','require','缺少类型',1,'',1],
        ['project_id','require','缺少项目',1,'',1],
        ['title','require','缺少标题',1,'',1],
        ['content','require','缺少内容',1,'',1],
        ['receiver','require','缺少接收者',1,'',1]
    ];

    protected $_auto = [
        ['addtime','time',1,'function']
    ];

    protected $_link = [
        'project' => [
            // 关联类型
            'mapping_type'      =>  self::BELONGS_TO,
            'class_name'        =>  'project',
            // 与project表关联的字段(Notice关联project表的字段)
            'foreign_key'       =>  'project_id',
            'as_fields'         =>  'project',
            // 获取的字段名
            'mapping_fields'    => 'name as project'
        ],
        'type'  => [
            'mapping_type'      =>  self::BELONGS_TO,
            'class_name'        =>  'notice_type',
            'foreign_key'       =>  'type',
            'as_fields'         =>  'type',
            'mapping_fields'    => 'name as type'
        ],
        // 别名
        'create_by'  => [
            // 关联类型
            'mapping_type'      => self::BELONGS_TO,
            // 关联表
            'class_name'        => 'user',
            // 本表对应外表的字段
            'foreign_key'       => 'user_id',
            // as
            'as_fields'         => 'create_by',
            // 查询字段
            'mapping_fields'    => 'nickname as create_by',
        ],
        'receiver'  => [
            'mapping_type'      => self::BELONGS_TO,
            'class_name'        => 'user',
            'foreign_key'       => 'receiver',
            'as_fields'         => 'receiver',
            'mapping_fields'    => 'nickname as receiver'
        ]
    ];
}