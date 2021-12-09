<?php

namespace retrocode\module;
require_once("../sqlite.class.php");
use \retrocode\sqlite\sqliteDB;

class push
{
    private $db;

    function __construct()
    {
        $this->$db = new sqliteDB("../push.db");
    }

    // function out()
    // {
    //     // echo '2';
    //     for ($i=0; $i < 100; $i++) { 
    //         $this->$db->add('title'.$i, 'content'.$i, 'payload'.$i);
    //     }
    //     $list = $this->$db->getlist(10 , 00);
    //     returnSuccess($list);
    //     // echo getIP().'=======';
    //     // echo 'hello!';
    // }

    // 获取列表
    function getlist()
    {
        $size = $_POST["size"];
        $page = $_POST["page"];
        $list = $this->$db->getlist($size , $size * $page);
        returnSuccess($list);
    }

    // 获取详情
    function getinfo()
    {
        $id = $_POST["id"];
        $list = $this->$db->get($id);
        $this->$db->toread($id);
        returnSuccess($list);
    }

    // 提交CID
    function savecid()
    {
        $cid = $_POST["cid"];
        $this->$db->addcid($cid);
        returnSuccess('更新cid成功');
    }

    // 清除未读
    function allread()
    {
        $this->$db->allread();
    }

    // 清除未读
    function unreadnum()
    {
        $list = $this->$db->unreadnum();
        returnSuccess($list);
    }
}