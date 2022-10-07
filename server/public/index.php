<?php
require '../vendor/autoload.php';

@include_once "../common.php";

require_once("../sqlite.class.php");
require_once("../env.class.php");
use \retrocode\sqlite\sqliteDB;
use \retrocode\env\Env;

Env::loadFile('../.env');

define('APPKEY',Env::get('getui.APPKEY'));
define('APPID',Env::get('getui.APPID'));
define('MASTERSECRET',Env::get('getui.MASTERSECRET'));
define('URL',Env::get('getui.URL'));
define('PACKAGENAME',Env::get('getui.PACKAGENAME'));

$api = new GTClient(URL,APPKEY,APPID,MASTERSECRET);

pushToSingleByCid();

function pushToSingleByCid(){

    if (!isset($_GET['message'])) {
        echo '推送内容不能为空';
        exit;
    }

    $Content = isset($_GET['message']) ? $_GET['message'] : 'test';
    $Title = isset($_GET['title']) ? $_GET['title'] : $Content;
    $Payload = isset($_GET['level']) ? $_GET['level'] : 0;

    $db = new sqliteDB("../push.db");
    $db->add($Title, $Content, $Payload);
    $cid = $db->getcid();
    $push = getParam($Title,$Content,$Payload);
    $push->setCid($cid);
    global $api;
    $pushresult = $api->pushApi()->pushToSingleByCid($push);
    pushToDingTalkByWebhook($Title,$Content,$Payload);
    echo json_encode([
        'code' => $pushresult['code'],
        'message' => $pushresult['code'] == 0 ? '推送成功' : '推送失败'
    ]);
}

function getParam($Title,$Content,$Payload){

    // 超过长度会推送失败
    $Title = customString($Title, 50);
    $Content = customString($Content, 256);
    $Payload = customString($Payload, 3072);

    $push = new GTPushRequest();
    $push->setRequestId(micro_time());

    //设置setting
    $set = new GTSettings();
    $set->setTtl(3 * 24 * 3600 * 1000);

    // 设置推送类型
    $strategy = new GTStrategy();
    $strategy->setDefault(GTStrategy::STRATEGY_THIRD_FIRST);
    $set->setStrategy($strategy);

    // 设置推送设置
    $push->setSettings($set);
    //设置PushMessage，
    $message = new GTPushMessage();
    //通知
    $notify = new GTNotification();
    $notify->setTitle($Title);
    $notify->setBody($Content);
    $notify->setBigText("bigTdext");

    // 设置通知等级
    $notify->setChannelLevel(4);

    // 设置通知点击操作
    $notify->setClickType("intent");
    $notify->setIntent("intent:#Intent;component=".PACKAGENAME."/io.dcloud.PandoraEntry;S.UP-OL-SU=true;S.title=".$Title.";S.content=".$Content.";S.payload=".$Payload.";end");
    // 设置透传消息
    $notify->setPayload($Payload);
    // APP角标+1
    $notify->setBadgeAddNum(1);
    $message->setNotification($notify);

    // 设置推送消息
    $push->setPushMessage($message);
    //厂商推送消息参数
    $pushChannel = new GTPushChannel();
    //安卓
    $android = new GTAndroid();
    $ups = new GTUps();
    $ups->setNotification($notify);
    $android->setUps($ups);
    $pushChannel->setAndroid($android);
    $push->setPushChannel($pushChannel);

    return $push;
}

function micro_time(){
    list($usec, $sec) = explode(" ", microtime());
    $time = ($sec . substr($usec, 2, 3));
    return $time;
}

function pushToDingTalkByWebhook($Title,$Content,$Payload) {
    $data = [
                'msgtype' => 'markdown',
                'markdown' => [ 'title' => $Title, 'text' => $Content ],
                'at' => [
                        'atMobiles' => ['xxxxxxxxxxxxxxxxxxxxxxxxx'],
                    ]
            ];
    $data_string = json_encode($data);
    $remote_server = "https://oapi.dingtalk.com/robot/send?access_token=xxxxxxxxxxxxxxxxxxxxxxxx";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $remote_server);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array ('Content-Type: application/json;charset=utf-8'));
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    // 线下环境不用开启curl证书验证, 未调通情况可尝试添加该代码
    // curl_setopt ($ch, CURLOPT_SSL_VERIFYHOST, 0);
    // curl_setopt ($ch, CURLOPT_SSL_VERIFYPEER, 0);
    $data = curl_exec($ch);
    curl_close($ch);
    return $data;
}