<?php

include_once('../common/Db.class.php');
include_once('../common/Post.class.php');
$uid = PostRequest::get('uid', true);

$sql='select id,uname from jimi_user where id<'.$uid;


try {
     $connect = Db::getInstance()->connect();
} catch (Exception $ex) {
     ResponseJson::show(CODE_500, MESS_500, false);
}
$result = mysql_query($sql, $connect);
//$count=mysql_num_rows($result);


//$array=array();
while($row = mysql_fetch_assoc($result)){
//push
$array[]=array(
 'id'=>$row['id'],
 'uname'=>$row['uname'],
 );
}

echo 'jsonpcallback('.json_encode($array).')';

?>