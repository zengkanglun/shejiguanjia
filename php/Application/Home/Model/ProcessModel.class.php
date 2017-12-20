<?php
namespace Home\Model;
use Think\Model\RelationModel;
class ProcessModel extends RelationModel{
    protected $_link = array(
        'user'=>array(
            'mapping_type'      =>  self::BELONGS_TO,
            'class_name'        =>  'user',
            'foreign_key'       =>  'user_id',
            'as_fields'         =>  'nickname',
            //'mapping_fields'    => 'nickname'
        ),
        'ProcessType'=>array(
            'mapping_type'      =>  self::BELONGS_TO,
            'class_name'        =>  'ProcessType',
            'foreign_key'       =>  'type',
            'as_fields'         =>  'name',
            //'mapping_fields'    => 'nickname'
        ),
    );
}

?>