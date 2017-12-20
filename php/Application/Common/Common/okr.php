<?php
/**
 * Created by PhpStorm.
 * User: okr
 * Date: 2017/4/10
 * Time: 14:00
 */

/**
 * @param string $savePath 保存路径
 * @param array $exts 允许上传后缀
 * @param int $max 最大可上传大小
 * @param string $rootPath 根目录
 * @return array|string 上传错误时返回错误信息,上传成功返回图片路径数组
 */
function uploads($savePath = './',$exts = array('jpg','gif','bmp','png','jpeg'),$max = 3145728,$rootPath = './Uploads/' )
{
    $config = array();
    $config['rootPath'] = $rootPath ? $rootPath : './Uploads/';
    $config['savePath'] = $savePath ? $savePath : './';
    $config['saveName'] = array('uuid','');;
    $config['exts'] = count($exts)>0 ? $exts : array('jpg','gif','bmp','png','jpeg');
    $config['subName'] = array('date','Y-m-d');
    $config['maxSize'] = $max;

    $uploads = new \Think\Upload($config);

    $info = $uploads->upload();
    if(!$info)
    {
        return $uploads->getError();
    }else{
        $imgArr = array();
        foreach ($info  as $key => $value)
        {
            //这样会比较快
            $imgArr[] = str_replace('.','',$rootPath).$value['savepath'].$value['savename'];
//            array_push($imgArr,str_replace('.','',$rootPath).$value['savepath'].$value['savename']);
        }

        return $imgArr;
    }
}

/**
 * 生成一个高强度唯一性的字符串
 * @param int $length
 * @return string
 */
function uuid($length = 20)
{
    $str = '';
    for($i=0;$i<$length;$i++)
    {
        switch (mt_rand(1,2)) {
            case 1:
                $str.=chr(mt_rand(65,90));
                break;
            case 2:
                $str.=chr(mt_rand(97,122));
                break;
            default:
                # code...
                break;
        }
    }
    //先将随机生成的str字符串当做uniqid()函数的前缀
    //uniqid生成之后使用str_shuffle打乱该字符串
    //使用str_rot13()去转换字符串
    $res = str_rot13(str_shuffle(uniqid($str)));

    return $res;
}

/**
 * 获取request header头信息
 */
function getHeaders()
{
    $heaers = [];
    foreach ($_SERVER as $key=> $item) {
        if(preg_match('#HTTP_#',$key))
        {
            $heaers[$key] = $item;
        }
    }
    return $heaers;
}

function getRequestMethod()
{
    return $_SERVER['REQUEST_METHOD'];
}

function isIDCard($card)
{
    if(preg_match('#^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$#',$card))
    {
        return true;
    }elseif(preg_match('#^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$#',$card))
    {
        return true;
    }else{
        return false;
    }
}

/**
 * get audio/video length and seconds
 * @param $file audio/video files
 * @return mixed audio/video length and seconds
 */
function getMp3Seconds($file)
{
    $path = dirname(dirname(dirname(str_replace('\\','/',__DIR__))));
    $file = $path.$file;
    if(!file_exists($file))
        exit('Error Files');

    Vendor('getid3.getid3');

    $getid3 = new getID3();
    $ThisFileInfo = ($getid3->analyze($file));
    $data['seconds'] = $ThisFileInfo['playtime_seconds'];
    $data['format_seconds'] = $ThisFileInfo['playtime_string'];
    return $data;
}

function isUrl($url)
{
    if (preg_match('%(?:https?://)?\w{1,20}\.(?:\w{2,31})\.\w{2,10}%imx', $url)) {
        # Successful match
        return true;
    } else {
        # Match attempt failed
        return false;
    }
}

function getWeekdays()
{
    switch (date('w',time()))
    {
        case 1:
            return '星期一';
            break;
        case 2:
            return '星期二';
            break;
        case 3:
            return '星期三';
            break;
        case 4:
            return '星期四';
            break;
        case 5:
            return '星期五';
            break;
        case 6:
            return '星期六';
            break;
        case 0:
            return '星期天';
            break;
    }
}

function getRootPath()
{
    return str_replace('\\','/',dirname(dirname(dirname(dirname(__FILE__)))));
}

function COSUpload($src,$dst='')
{

    //use qcloudcos\Cosapi;
    import('Vendor.TencentCOS.include','','.php');
    Cosapi::setTimeout(180);
    Cosapi::setRegion('gz');
    $ret = Cosapi::upload('test', $src, $_FILES['file']['name']);
    return $ret;
}

/**
 * 数据导出表格
 * example
 	$data = array(
	    array('用户名', '性别', '出生年月', '加入日期','歌曲'), //title
	    array('测试名字1',   '男',   '1993-09-10',   '2010-10-10',	'七里香'),//datas
	    array('测试名字2',   '女',   '1993-09-10',   '2010-10-10',	'七里香'),
	    array('测试名字3',   '女',   '1993-09-10',   '2010-10-10',	'七里香'),
	    array('测试名字4',   '男',   '1993-09-10',   '2010-10-10',	'七里香'),
	);
 */
function export($data,$filename)
{
	vendor('PHPExcel.PHPExcel');
	$phpexcel = new PHPExcel();
	$filename = str_replace('.xls', '', $filename).'.xls';
	$phpexcel->getProperties()
        ->setCreator("Maarten Balliauw")
        ->setLastModifiedBy("Maarten Balliauw")
        ->setTitle("Office 2007 XLSX Test Document")
        ->setSubject("Office 2007 XLSX Test Document")
        ->setDescription("Test document for Office 2007 XLSX, generated using PHP classes.")
        ->setKeywords("office 2007 openxml php")
        ->setCategory("Test result file");
        $phpexcel->getActiveSheet()->fromArray($data);
		    $phpexcel->getActiveSheet()->setTitle('Sheet1');
		    $phpexcel->setActiveSheetIndex(0);
		    header('Content-Type: application/vnd.ms-excel');
		    header("Content-Disposition: attachment;filename=$filename");
		    header('Cache-Control: max-age=0');
		    header('Cache-Control: max-age=1');
		    header ('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
		    header ('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT'); // always modified
		    header ('Cache-Control: cache, must-revalidate'); // HTTP/1.1
		    header ('Pragma: public'); // HTTP/1.0
		    $objwriter = PHPExcel_IOFactory::createWriter($phpexcel, 'Excel5');
		    $objwriter->save('php://output');
		    exit;
	
}

/**
 * @param $name 原始带文件后缀的文件名
 * @return bool|string 返回最终不带文件后缀的文件名
 */
function getUploadFileNameWithoutSuffix($name)
{
    $position = mb_strrpos($name,'.');
    if(!$position)
    {
        return false;
    }

    return mb_substr($name,0,$position);
}

function download($filename)
{
    if ($filename == ''){
        return FALSE;
    }
    if (FALSE === strpos($filename, '.')){
        return FALSE;
    }
    $x = explode('.', $filename);
    $extension = end($x);
    $mimes =getMimes();
    // Set a default mime if we can't find it
    if ( ! isset($mimes[$extension])){
        $mime = 'application/octet-stream';
    }else{
        $mime = (is_array($mimes[$extension])) ? $mimes[$extension][0] : $mimes[$extension];
    }
    // Generate the server headers
    if (strpos($_SERVER['HTTP_USER_AGENT'], "MSIE") !== FALSE)
    {
        header('Content-Type: "'.$mime.'"');
        header('Content-Disposition: attachment; filename="'.$filename.'"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header("Content-Transfer-Encoding: binary");
        header('Pragma: public');
        header("Content-Length: ".filesize($filename));
    }
    else
    {
        header('Content-Type: "'.$mime.'"');
        header('Content-Disposition: attachment; filename="'.$filename.'"');
        header("Content-Transfer-Encoding: binary");
        header('Expires: 0');
        header('Pragma: no-cache');
        header("Content-Length: ".filesize($filename));
    }
    echo readfile($filename);
}

function getMimes()
{
    return $mimes = array('hqx' => 'application/mac-binhex40',
        'cpt' => 'application/mac-compactpro',
        'csv' => array('text/x-comma-separated-values', 'text/comma-separated-values', 'application/octet-stream', 'application/vnd.ms-excel', 'application/x-csv', 'text/x-csv', 'text/csv', 'application/csv', 'application/excel', 'application/vnd.msexcel'),
        'bin' => 'application/macbinary',
        'dms' => 'application/octet-stream',
        'lha' => 'application/octet-stream',
        'lzh' => 'application/octet-stream',
        'exe' => array('application/octet-stream', 'application/x-msdownload'),
        'class' => 'application/octet-stream',
        'psd' => 'application/x-photoshop',
        'so' => 'application/octet-stream',
        'sea' => 'application/octet-stream',
        'dll' => 'application/octet-stream',
        'oda' => 'application/oda',
        'pdf' => array('application/pdf', 'application/x-download'),
        'ai' => 'application/postscript',
        'eps' => 'application/postscript',
        'ps' => 'application/postscript',
        'smi' => 'application/smil',
        'smil' => 'application/smil',
        'mif' => 'application/vnd.mif',
        'xls' => array('application/excel', 'application/vnd.ms-excel', 'application/msexcel'),
        'ppt' => array('application/powerpoint', 'application/vnd.ms-powerpoint'),
        'wbxml' => 'application/wbxml',
        'wmlc' => 'application/wmlc',
        'dcr' => 'application/x-director',
        'dir' => 'application/x-director',
        'dxr' => 'application/x-director',
        'dvi' => 'application/x-dvi',
        'gtar' => 'application/x-gtar',
        'gz' => 'application/x-gzip',
        'php' => 'application/x-httpd-php',
        'php4' => 'application/x-httpd-php',
        'php3' => 'application/x-httpd-php',
        'phtml' => 'application/x-httpd-php',
        'phps' => 'application/x-httpd-php-source',
        'js' => 'application/x-javascript',
        'swf' => 'application/x-shockwave-flash',
        'sit' => 'application/x-stuffit',
        'tar' => 'application/x-tar',
        'tgz' => array('application/x-tar', 'application/x-gzip-compressed'),
        'xhtml' => 'application/xhtml+xml',
        'xht' => 'application/xhtml+xml',
        'zip' => array('application/x-zip', 'application/zip', 'application/x-zip-compressed'),
        'mid' => 'audio/midi',
        'midi' => 'audio/midi',
        'mpga' => 'audio/mpeg',
        'mp2' => 'audio/mpeg',
        'mp3' => array('audio/mpeg', 'audio/mpg', 'audio/mpeg3', 'audio/mp3'),
        'aif' => 'audio/x-aiff',
        'aiff' => 'audio/x-aiff',
        'aifc' => 'audio/x-aiff',
        'ram' => 'audio/x-pn-realaudio',
        'rm' => 'audio/x-pn-realaudio',
        'rpm' => 'audio/x-pn-realaudio-plugin',
        'ra' => 'audio/x-realaudio',
        'rv' => 'video/vnd.rn-realvideo',
        'wav' => array('audio/x-wav', 'audio/wave', 'audio/wav'),
        'bmp' => array('image/bmp', 'image/x-windows-bmp'),
        'gif' => 'image/gif',
        'jpeg' => array('image/jpeg', 'image/pjpeg'),
        'jpg' => array('image/jpeg', 'image/pjpeg'),
        'jpe' => array('image/jpeg', 'image/pjpeg'),
        'png' => array('image/png', 'image/x-png'),
        'tiff' => 'image/tiff',
        'tif' => 'image/tiff',
        'css' => 'text/css',
        'html' => 'text/html',
        'htm' => 'text/html',
        'shtml' => 'text/html',
        'txt' => 'text/plain',
        'text' => 'text/plain',
        'log' => array('text/plain', 'text/x-log'),
        'rtx' => 'text/richtext',
        'rtf' => 'text/rtf',
        'xml' => 'text/xml',
        'xsl' => 'text/xml',
        'mpeg' => 'video/mpeg',
        'mpg' => 'video/mpeg',
        'mpe' => 'video/mpeg',
        'qt' => 'video/quicktime',
        'mov' => 'video/quicktime',
        'avi' => 'video/x-msvideo',
        'movie' => 'video/x-sgi-movie',
        'doc' => 'application/msword',
        'docx' => array('application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip'),
        'xlsx' => array('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/zip'),
        'word' => array('application/msword', 'application/octet-stream'),
        'xl' => 'application/excel',
        'eml' => 'message/rfc822',
        'json' => array('application/json', 'text/json')
    );
}

function getFileSuffix($file)
{
    preg_match('#\.\w+$#',$file,$res);
    return $res;
}

/**
 * 获取学历
 */
function getEdu($edu)
{
    switch ($edu)
    {
        case 0:
            return '小学';
            break;
        case 1:
            return '初中';
            break;
        case 2:
            return '中专';
            break;
        case 3:
            return '高中';
            break;
        case 4:
            return '大专';
            break;
        case 5:
            return '本科';
            break;
//        case 6:
//            return '研究生';
//            break;
        case 6:
            return '硕士';
            break;
        case 7:
            return '博士';
            break;
        case 8:
        default:
            return '其他';
            break;
    }
}