<?php
if(isset($_GET['email'])){
  $res = json_encode(['id'=>1, 'name'=>'aa@gmail.com']);
  exit($res);
}
if(isset($_POST['ajaxCrossTest'])){
  header('Access-Control-Allow-Origin: *');
  exit(json_encode(['ajax'=>1]));
}
if(isset($_GET['JSONPcallback'])){
  $function = $_GET['JSONPcallback'];
  header("Content-Type: application/json; charset=UTF-8");
  exit("$function(".json_encode(['ajax'=>'jsonP']).")");
}
