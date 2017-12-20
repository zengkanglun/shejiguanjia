<?php
namespace Common\Model;
use Think\Model\RelationModel;
/**
 * 基础model
 */
class BaseModel extends RelationModel{

    /**
     * 添加数据
     * @param  array $data  添加的数据
     * @return int          新增的数据id
     */
    public function addData($data){
        // 去除键值首尾的空格
        foreach ($data as $k => $v) {
            $data[$k]=trim($v);
        }
        $id=$this->add($data);
        return $id;
    }

    /**
     * 修改数据
     * @param   array   $map    where语句数组形式
     * @param   array   $data   数据
     * @return  boolean         操作是否成功
     */
    public function editData($map,$data){
        // 去除键值首位空格
        foreach ($data as $k => $v) {
            $data[$k]=trim($v);
        }
        $result=$this->where($map)->save($data);
        return $result;
    }

    /**
     * 删除数据
     * @param   array   $map    where语句数组形式
     * @return  boolean         操作是否成功
     */
    public function deleteData($map){
        if (empty($map)) {
            die('where为空的危险操作');
        }
        $result=$this->where($map)->delete();
        return $result;
    }

    /**
     * 数据排序
     * @param  array $data   数据源
     * @param  string $id    主键
     * @param  string $order 排序字段   
     * @return boolean       操作是否成功
     */
    public function orderData($data,$id='id',$order='order_number'){
        foreach ($data as $k => $v) {
            $v=empty($v) ? null : $v;
            $this->where(array($id=>$k))->save(array($order=>$v));
        }
        return true;
    }

    /**
     * 获取全部数据
     * @param  string $type  tree获取树形结构 level获取层级结构
     * @param  string $order 排序方式   
     * @return array         结构数据
     */
    public function getTreeData($type='tree',$order='',$name='name',$child='id',$parent='pid'){
        // 判断是否需要排序
        if(empty($order)){
            $data=$this->select();
        }else{
            $data=$this->order($order.' is null,'.$order)->select();
        }
        // 获取树形或者结构数据
        if($type=='tree'){
            $data=\Org\Nx\Data::tree($data,$name,$child,$parent);
        }elseif($type="level"){
            $data=\Org\Nx\Data::channelLevel($data,0,'&nbsp;',$child);
        }
        return $data;
    }

    /**
     * 获取分页数据
     * @param  subject  $model  model对象
     * @param  array    $map    where条件
     * @param  string   $order  排序规则
     * @param  integer  $limit  每页数量
     * @param  integer  $field  $field
     * add 2017年6月14日16:38:38
     * @param  string   $join   联表
     * @param  array    $join_map 联表搜索条件 在map条件的基础加上联表搜索的条件
     * end 2017年6月14日16:39:01
     * @return array            分页数据
     */
    public function getPage($model,$map = array(),$order='',$limit=10,$field='',$join='',$join_map = []){
        $count=$model
            ->where($map)
            ->count();
        $page=new_page($count,$limit);
        // 获取分页数据
        if (empty($field)) {
            if(empty($join))
            {
                $list=$model
                    ->relation(true)
                    ->where($map)
                    ->order($order)
                    ->limit($page->firstRow.','.$page->listRows)
                    ->select();
            }else{
                $count = $model
                    ->join($join)
                    ->where($join_map)
                    ->count();
                $page=new_page($count,$limit);
                $list=$model
                    ->relation(true)
                    ->where($join_map)
                    ->order($order)
                    ->limit($page->firstRow.','.$page->listRows)
		    // add at 2017.07.11 16:30
		    // if have problem,just delete "$join"
                    ->join($join)
                    ->select();
            }
        }else{
            if(empty($join))
            {
                $list=$model
                    ->relation(true)
                    ->field($field)
                    ->where($map)
                    ->order($order)
                    ->limit($page->firstRow.','.$page->listRows)
                    ->select();
            }else{
                $count = $model
                    ->join($join)
                    ->where($join_map)
                    ->count();
                $page=new_page($count,$limit);
                $list=$model
                    ->relation(true)
                    ->field($field)
                    ->where($join_map)
                    ->order($order)
                    ->join($join)
                    ->limit($page->firstRow.','.$page->listRows)
                    ->select();
            }
        }
        $data=array(
            'data'=>$list,
            'count' => $count,
            'page'=>$page->show()
            );
        return $data;
    }
}