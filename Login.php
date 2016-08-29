<?php
    header("Content-type: text/html; charset=utf-8"); 

    //【登录验证】
    //登录信息    logText
    //登录密码    logPwd
    //登录信息判断    logTextCheck 值为0则是学号 为1则是邮箱 为2则是昵称

        
    //此处配置数据库连接信息，注意修改配置。
    $link = new mysqli("localhost","root","","mysql");
    
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

    $sql = "SELECT `logID`, `logEmail`, `logPwd`, `logName` FROM `cnta-web-login` WHERE `logEmail` = '".$_POST['logText']."' ";
    
    $res = mysqli_query( $link, $sql);

    $logInfo = mysqli_fetch_assoc( $res);

    if( $logInfo['logID'] ){
        if($_POST['logPwd'] == $logInfo['logPwd']){
            echo "登陆成功";
        }else{
            echo "密码不正确，请重新输入密码。";
        }
    }else{
        echo "不存在此用户，请输入正确的登录名。";
    }
    
    $link->close();
    
    die();

?>