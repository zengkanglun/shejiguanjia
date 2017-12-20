<?php
namespace Common\Model;

/**
 * User表模型
 * Class UserModel
 * @package Common\Model
 */
class UserModel extends BaseModel
{
    protected $_validate = [
        ['username','require','账号必须或账号已存在',1,'unique',1],
        ['nickname','require','姓名必须',1,'',1],
        ['mobile','/^(?:^0|\+86)?1[34578]\d{9}$/','手机号不正确',2,'regex'],
        ['qq','/^\d{5,11}$/','QQ不正确',2,'regex'],
        ['work_type','require','缺少工种',1],
        ['edu','require','缺少学历',1]
    ];

    protected $_auto     = [
        ['add_time','time',1,'function'],
    ];

    protected function _before_insert(&$data, $options)
    {
        return $data['password'] = md5($data['password']);
    }
}