<?php
    //开启会话
    session_start();
    
    //引用数据库信息文件
    require_once 'DataBaseInfo.php';

    header("Content-type: text/html; charset=utf-8"); 

    //【登录验证】
    //登录信息    logText
    //登录密码    logPwd
    //登录信息判断    logTextCheck 值为0则是学号 为1则是邮箱 为2则是昵称

        
    //此处配置数据库连接信息，注意修改配置。
    $link = mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);
    
    if( !$link ){
        die("连接数据库失败</br>".mysqli_connect_error($link));
    }

    //登录信息判断
    // if( $_POST['logTextCheck'] == 0 ){
    //     $sql = "SELECT `logID`, `logEmail`, `logPwd`, `logName` FROM `cnta-web-login` WHERE `logStuID` = '".$_POST['logText']."' ";
    // }else if ( $_POST['logTextCheck'] == 1 ){
    //     $sql = "SELECT `logID`, `logEmail`, `logPwd`, `logName` FROM `cnta-web-login` WHERE `logEmail` = '".$_POST['logText']."' ";
    // }else if ( $_POST['logTextCheck'] == 2 ){
    //     $sql = "SELECT `logID`, `logEmail`, `logPwd`, `logName` FROM `cnta-web-login` WHERE `logName` = '".$_POST['logText']."' ";
    // }else{
    //     echo "登录值错误，请重试";
    //     die();
    // }

    $sql = "SELECT `logID`, `logEmail`, `logPwd`, `logName` FROM `cnta-web-login` WHERE `logEmail` = '".$_POST['logText']."' AND `logPwd` = '".$_POST['logPwd']."'";
    
    $res = mysqli_query( $link, $sql);

    $logInfo = mysqli_fetch_assoc( $res);

    if( mysqli_num_rows( $res) == 1 ){
            echo "登陆成功";

    }else{
        echo "用户名或密码错误，请重新登陆。";
    }

    mysqli_free_result( $res);
    
    mysqli_close( $link);
    
    die();

?>