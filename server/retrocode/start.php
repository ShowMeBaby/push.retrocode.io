<?php
define('RETRCODOE_MODULE_NAMESPACE', '\\retrocode\\module\\');
define('RETRCODOE_MODULE_PATH', '/controller/');

@include_once "../common.php";

// 自动注册class
function auto_load($class)
{
    $arr = explode('\\', $class);
    if (count($arr) > 0)
    {
        $file = ROOT_PATH.RETRCODOE_MODULE_PATH."{$arr[2]}.php";
        @include_once $file;
    }
}

spl_autoload_register("auto_load");

// 执行接口函数
function runstart()
{
  // 解析URL类名及对应函数
  $url = parse_url($_SERVER['REQUEST_URI']);
  $urlpath = $url['path'];
  $ext = explode('/',trim($urlpath,'/'));
  $className = '';
  $methodName = '';
  if (endswith($ext[0], '.php')) {
    $className = $ext[1];
    $methodName = $ext[2];
  } else {
    $className = $ext[0];
    $methodName = $ext[1];
  }

  // 执行路由函数
  $moduleClass = RETRCODOE_MODULE_NAMESPACE.$className;
  try {
    $class = new $moduleClass();
    $class->$methodName();
  } catch (Throwable $e) {
    returnFail('接口不存在,小朋友没事别乱逛');
  }
}

runstart();