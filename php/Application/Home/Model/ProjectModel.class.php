<?php
namespace Home\Model;
use Think\Model\RelationModel;

/**
 * 项目模型表
 *
 * Class ProjectModel
 * @package Home\Model
 */
class ProjectModel extends RelationModel{

    protected $_link = array(
        'BuildType'=>array(
            'mapping_type'      =>  self::BELONGS_TO,
            'class_name'        =>  'BuildType',
            'foreign_key'       =>  'building_type',
            'as_fields'         =>  'name:build_name',
            //'mapping_fields'    => 'id,nickname'
        ),
        'user'=>array(
            'mapping_type'      =>  self::BELONGS_TO,
            'class_name'        =>  'user',
            'foreign_key'       =>  'director_id',
            'as_fields'         =>  'nickname',
            //'mapping_fields'    => 'id,nickname'
        ),
        'schedule'=>array(
            'mapping_type'      =>  self::HAS_MANY,
            'class_name'        =>  'schedule',
            'foreign_key'       =>  'project_id',
            //'as_fields'         =>  'nickname',
             'mapping_name'  =>  'child',
//            'mapping_fields'    => 'id,nickname'
        ),

    );

}