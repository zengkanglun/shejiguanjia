<?php
namespace Home\Model;
use Think\Model\RelationModel;
class StaffModel extends RelationModel{
    protected $_link = array(
        'user'=>array(
            'mapping_type'      =>  self::BELONGS_TO,
            'class_name'        =>  'user',
            'foreign_key'       =>  'user_id',
            'as_fields'         =>  'nickname,mobile,qq',
            'mapping_fields'    =>  'nickname,mobile,qq'
        ),
        'work'=>array(
            'mapping_type'      =>  self::BELONGS_TO,
            'class_name'        =>  'work',
            'foreign_key'       =>  'work_id',
            //'as_fields'         =>  'nickname,mobile,qq,work_type',
            'mapping_fields'    =>  'name'
        ),
        // 'work'=>array(
        //     'mapping_type'      =>  self::MANY_TO_MANY,
        //     'class_name'        =>  'work',
        //     'foreign_key'       =>  'id',
        //     'relation_foreign_key' => 'work_type',
        //     'as_fields'         =>  'name',
        //     'mapping_fields'    =>  'name',
        //     'relation_table'    => 's_user'
        // ),
    );
}

?>