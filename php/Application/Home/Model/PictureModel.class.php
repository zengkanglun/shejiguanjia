<?php
namespace Home\Model;
use Think\Model\RelationModel;
class PictureModel extends RelationModel{
    protected $_link = array(
        'user'=>array(
            'mapping_type'      =>  self::BELONGS_TO,
            'class_name'        =>  'user',
            'foreign_key'       =>  'user_id',
            'as_fields'         =>  'nickname',
            //'mapping_fields'    => 'nickname'
        ),
        'participate'=>array(
            'mapping_type'      =>  self::BELONGS_TO,
            'class_name'        =>  'user',
            'foreign_key'       =>  'participate',
            //'as_fields'         =>  'nickname ',
            'mapping_fields'    =>  'id,nickname'
        ),
        'chuchaiType'=>array(
            'mapping_type'      =>  self::BELONGS_TO,
            'class_name'        =>  'chuchaiType',
            'foreign_key'       =>  'type',
            'as_fields'         =>  'name',
            //'mapping_fields'    => 'nickname'
        ),
    );
}

?>