<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017-4-1 0001
 * Time: 13:45
 */
class wxSendMsg
{

    /*
     * 发送模板消息
     *
     *  数据格式 :
     *  内容主体
     *  $data = ['data'=>[
     *       'first'=>['value'=>'你好'],
     *       'keyword1'=>['value'=>'你好'],
     *      'remark'=>['value'=>'你好']
     *      ]];
     *
     *  数据主体
     *  $reply['touser'] = 'oGNSzwet4NnhFQx2LlLc8wswiNeo'; //用户openid
     *  $reply['template_id']='_2w5xTVSYaJdi-WZEHzisZzGcFBIIuEKk82sCO_h7cg'; //模板id
     *  $reply['url']='http://www.baidu.com'; //回调地址
     *  $reply['data']=$data['data']; //内容主体
     *
     * */
    public function wx_send($reply = null)
    {

//        print_r($this->send_json_encode($reply));exit();

        $accessToken = $this->get_access_token();
        //$accessToken = 'uOLWQazKp_ACI_CVcB04dYedKqhPW43uaJyGBlkW39xrCvkhKtzpTL1-J487b7MSmTaSNDmid_wYrkHd2E5clvDhKEFqeHh27_7TtP5SdIM0hgt-XpilNbSmcn0Pdp7eXKNiAIACPS';
        $result = $this->send_http_post('https://api.weixin.qq.com/cgi-bin/message/template/send?access_token='.$accessToken,$this->send_json_encode($reply));

        if($result)
        {
            $json = json_decode($result,true);
            return $json;
        }
    }


    /**
     * POST 请求
     * @param string $url
     * @param array $param
     * @param boolean $post_file 是否文件上传
     * @return string content
     */
    private function send_http_post($url,$param,$post_file=false){

        $oCurl = curl_init();
        if(stripos($url,"https://")!==FALSE){
            curl_setopt($oCurl, CURLOPT_SSL_VERIFYPEER, FALSE);
            curl_setopt($oCurl, CURLOPT_SSL_VERIFYHOST, false);
            curl_setopt($oCurl, CURLOPT_SSLVERSION, 1); //CURL_SSLVERSION_TLSv1
        }
        if (PHP_VERSION_ID >= 50500 && class_exists('\CURLFile')) {
            $is_curlFile = true;
        } else {
            $is_curlFile = false;
            if (defined('CURLOPT_SAFE_UPLOAD')) {
                curl_setopt($oCurl, CURLOPT_SAFE_UPLOAD, false);
            }
        }
        if (is_string($param)) {
            $strPOST = $param;
        }elseif($post_file) {
            if($is_curlFile) {
                foreach ($param as $key => $val) {
                    if (substr($val, 0, 1) == '@') {
                        $param[$key] = new \CURLFile(realpath(substr($val,1)));
                    }
                }
            }
            $strPOST = $param;
        } else {
            $aPOST = array();
            foreach($param as $key=>$val){
                $aPOST[] = $key."=".urlencode($val);
            }
            $strPOST =  join("&", $aPOST);
        }
        curl_setopt($oCurl, CURLOPT_URL, $url);
        curl_setopt($oCurl, CURLOPT_RETURNTRANSFER, 1 );
        curl_setopt($oCurl, CURLOPT_POST,true);
        curl_setopt($oCurl, CURLOPT_POSTFIELDS,$strPOST);
        $sContent = curl_exec($oCurl);
        $aStatus = curl_getinfo($oCurl);
        curl_close($oCurl);
        if(intval($aStatus["http_code"])==200){
            return $sContent;
        }else{
            return false;
        }
    }

    /*
     *
     * 微信api不支持中文转义的json结构
     * @param array $arr
     */
    private function send_json_encode($arr) {
        if (count($arr) == 0) return "[]";
        $parts = array ();
        $is_list = false;
        //Find out if the given array is a numerical array
        $keys = array_keys ( $arr );
        $max_length = count ( $arr ) - 1;
        if (($keys [0] === 0) && ($keys [$max_length] === $max_length )) { //See if the first key is 0 and last key is length - 1
            $is_list = true;
            for($i = 0; $i < count ( $keys ); $i ++) { //See if each key correspondes to its position
                if ($i != $keys [$i]) { //A key fails at position check.
                    $is_list = false; //It is an associative array.
                    break;
                }
            }
        }
        foreach ( $arr as $key => $value ) {
            if (is_array ( $value )) { //Custom handling for arrays
                if ($is_list)
                    $parts [] = $this->send_json_encode ( $value ); /* :RECURSION: */
                else
                    $parts [] = '"' . $key . '":' . $this->send_json_encode ( $value ); /* :RECURSION: */
            } else {
                $str = '';
                if (! $is_list)
                    $str = '"' . $key . '":';
                //Custom handling for multiple data types
                if (!is_string ( $value ) && is_numeric ( $value ) && $value<2000000000)
                    $str .= $value; //Numbers
                elseif ($value === false)
                    $str .= 'false'; //The booleans
                elseif ($value === true)
                    $str .= 'true';
                else
//                $str .= '"' . addslashes ( $value ) . '"'; //All other things
                    $str .= '"' .  $value  . '"'; //All other things
                // :TODO: Is there any more datatype we should be in the lookout for? (Object?)
                $parts [] = $str;
            }
        }
        $json = implode ( ',', $parts );
        if ($is_list)
            return '[' . $json . ']'; //Return numerical JSON
        return '{' . $json . '}'; //Return associative JSON
    }


// 获取access_token，自动带缓存功能
    private function get_access_token()
    {
        $key = 'access_token';
        $res = $this->keep_token($key);
        if($res !== false) {
            return $res;
        }
        $info = $this->get_token_appinfo();
        if(empty ($info ['appid']) || empty ($info ['secret'])) {
            return 0;
        }

        $url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='.$info ['appid'].'&secret='.$info ['secret'];
        $tempArr = json_decode(file_get_contents($url), true);

        if(@array_key_exists('access_token', $tempArr)) {
            $this->keep_token($key, $tempArr ['access_token'], 7200);
            return $tempArr ['access_token'];
        } else {
            return 0;
        }
    }



//获取公众号的配置信息
    private function get_token_appinfo()
    {
        if(!class_exists('WxPayConfig'))
        {
            vendor('wxpayapi.lib.WxPay#Config');
        }
        $info=array();
//    $info['token'] = $GLOBALS['_CFG']['public_id'];
        $info['appid'] = \WxPayConfig::APPID;
        $info['secret'] = \WxPayConfig::APPSECRET;

        return $info;
    }

    private function keep_token($name, $value = '', $expireTime = null)
    {
        $cacheFile = ROOT_PATH."public/tempToken";//微信token缓存文件
        $currentTime = time();
        if(!file_exists($cacheFile))
        {
            fopen($cacheFile,'wb');//没有则创建该文件
        }
        $content = file_get_contents($cacheFile);
        $data = json_decode($content, true);
        empty($data) && $data = array();

        if('' === $value) { // 获取缓存
            if(!array_key_exists($name, $data)) {
                return false;
            } elseif(!empty($data[$name]['expire_time']) && $data[$name]['expire_time'] < $currentTime) {
                unset($data[$name]);
                file_put_contents($cacheFile, json_encode($data));

                return false;
            } else {
                return $data[$name]['value'];
            }

        } elseif(is_null($value)) { // 删除缓存
            unset($data[$name]);
        } else { // 缓存数据
            $data[$name]['value'] = $value;
            if(!is_null($expireTime) && is_numeric($expireTime)) {
                $data[$name]['expire_time'] = $currentTime + $expireTime;
            }
        }
        file_put_contents($cacheFile, json_encode($data));

        return true;
    }


}