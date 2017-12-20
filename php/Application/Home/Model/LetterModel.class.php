<?php
namespace Home\Model;
use Think\Model\RelationModel;
class LetterModel extends RelationModel{
    protected $_link = array(
        'user'=>array(
            'mapping_type'      =>  self::BELONGS_TO,
            'class_name'        =>  'user',
            'foreign_key'       =>  'user_id',
            'as_fields'         =>  'nickname',
            //'mapping_fields'    => 'nickname'
        ),
        'LetterType'=>array(
            'mapping_type'      =>  self::BELONGS_TO,
            'class_name'        =>  'LetterType',
            'foreign_key'       =>  'type',
            'as_fields'         =>  'name',
            //'mapping_fields'    => 'nickname'
        ),
        'ArchiveType'=>array(
            'mapping_type'      =>  self::BELONGS_TO,
            'class_name'        =>  'ArchiveType',
            'foreign_key'       =>  'type',
            'as_fields'         =>  'name',
            //'mapping_fields'    => 'nickname'
        ),
    );
}

?>