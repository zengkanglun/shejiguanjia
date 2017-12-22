<?php
interface IDatabaseBackup
{
    public function backup();
    public function recover($filename);
}