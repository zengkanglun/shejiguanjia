<?php
namespace Home\Model;
use Think\Model\RelationModel;
class ProjectChildModel extends RelationModel{
    protected $_link = array(
         'work_type'=>array(
            'mapping_type'      =>  self::HAS_MANY,
            'class_name'        =>  'project_child_work_type',
            'foreign_key'       =>  'project_child_id',
            //'relation_foreign_key' => '',
            //'as_fields'         =>  'nickname',
            //'mapping_fields'    => 'nickname'
        ),
    );
}

?>