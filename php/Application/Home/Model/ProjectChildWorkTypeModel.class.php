<?php
namespace Home\Model;
use Think\Model\RelationModel;
class ProjectChildWorkTypeModel extends RelationModel{
    protected $_link = array(
        'user'=>array(
            'mapping_type'      =>  self::BELONGS_TO,
            'class_name'        =>  'user',
            'foreign_key'       =>  'user_id',
            'as_fields'         =>  'nickname,mobile,qq',
            //'mapping_fields'    =>  'nickname'
        ),
        'work'=>array(
            'mapping_type'      =>  self::BELONGS_TO,
            'class_name'        =>  'work',
            'foreign_key'       =>  'work_id',
            'as_fields'         =>  'name',
            //'mapping_fields'    =>  'nickname'
        ),
    );
}

?>