<?php
define('ROOT_PATH', dirname(dirname(__FILE__)));

@include_once "../common.php";

$token = $_POST["token"];

if ($token != 'retrocode') {
  returnFail('验证失败,请提交验证参数.');
}

require '../retrocode/start.php';