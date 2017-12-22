<?php
require_once 'IDatabaseBackup.php';
class Backup
{
    // when use static method , construct will unavailable
    public function __construct()
    {
    	// echo 23;
    }

    static public function backup()
    {
    	$std = self::getOS();
    	return $std->backup();
    }

    static public function recover($filename)
    {
    	$std = self::getOS();
    	return $std->recover($filename);
    }

    static private function getOS()
    {
    	if(preg_match('#win#i',strtolower(PHP_OS)))
    	{
    		include_once 'WindowsBackup.php';
    		return new WindowsBackup();
    	}

    	include_once 'LinuxBackup.php';
    	return new LinuxBackup();
    }
}