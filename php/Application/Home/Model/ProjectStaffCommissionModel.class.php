<?php
namespace Home\Model;
use Think\Model\RelationModel;
class ProjectStaffCommissionModel extends RelationModel
{
    protected $_link = [
        // 别名
        'project'  => [
            // 关联类型
            'mapping_type'      => self::BELONGS_TO,
            // 关联表
            'class_name'        => 'project',
            // 本表对应外表的字段
            'foreign_key'       => 'project_id',
            // as
            'as_fields'         => 'project_name',
            // 查询字段
            'mapping_fields'    => 'name as project_name',
        ],
        'work_type' => [
            'mapping_type'      => self::BELONGS_TO,
            'class_name'        => 'work',
            'foreign_key'       => 'work_id',
            'as_fields'         => 'work_type',
            'mapping_fields'    => 'name as work_type'
        ],
        'interval' => [
            'mapping_type'      => self::BELONGS_TO,
            'class_name'        => 'project_commission',
            'foreign_key'       => 'project_commission_id',
            'mapping_fields'    => 'start_time,end_time',
        ],
    ];
}