<?php
class LinuxBackup implements IDatabaseBackup
{
    public function backup()
    {
        // dump(is_file('backupmysql.sh'));exit;
    	if(!is_file('./backupmysql.sh') || !is_file('./backupmysql.conf'))
        {
            return ('backup shell or backup config  cannot found!');
        }

        if(is_executable('./backupmysql.sh'))
        {
            exec('./backupmysql.sh');
            // $file_name = C('DB_NAME').'-'.date('Y-m-d',time()).'mysqlbackup.sql';
            $dir = './backups/mysql/';
            $file_name = 'sheji_test-'.date('Y-m-d',time()).'-mysqlbackup.sql';
            return $dir.$file_name;
            // Http::download($dir.$file_name);
        }

        return ('backup shell cannot execute!please "chmod a+x backupmysql.sh"');
    }

    public function recover($filename)
    {
        if(!is_file('recovermysql.sh') || !is_file($filename))
        {
            return ('recovermysql.sh file not found or sqlbackup file not found');
        }

        if(is_executable('recovermysql.sh') && is_read($filename))
        {
            exec("recovermysql.sh {$filename}");
            return ('recover successed');
        }

        return ('recover fail!');
    }
}