<?php
namespace Home\Model;
use Think\Model\RelationModel;

class TaskReceiveModel extends RelationModel
{
    protected $_auto = [
        ['addtime','time',1,'function']
    ];
}