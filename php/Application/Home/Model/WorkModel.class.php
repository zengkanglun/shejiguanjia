<?php
namespace Home\Model;
use Think\Model\RelationModel;
class WorkModel extends RelationModel{
    protected $_link = array(
         'user'=>array(
            'mapping_type'      =>  self::HAS_MANY,
            'class_name'        =>  'user',
            'foreign_key'       =>  'work_type',
            //'as_fields'         =>  'nickname',
            'mapping_fields'    => 'id,nickname'
        ),
    );
}

?>