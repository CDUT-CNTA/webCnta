<?php
    header("Content-type: text/html; charset=utf-8"); 

    //【网站用户注册】
    //传递变量如下：
    //注册邮箱    reEmail
    //注册密码    rePwd
    //注册昵称    reName
       
    //此处配置数据库连接信息，注意修改配置。
    $link = new mysqli("localhost","root","","CNTA");
    
    if( !$link ){
        die("连接数据库失败</br>".mysqli_connect_error($link));
    }

    $sql = "SELECT `logID` FROM `cnta-web-login` WHERE `logEmail` = '".$_POST['reEmail']."'";
    
    if( !($res = mysqli_query( $link, $sql)) ){
        echo "数据库查询失败，请重试。";
        $link->close();
        die();
    }

    $check_Email_repeat = mysqli_fetch_assoc( $res);

    if( $check_Email_repeat['logID'] ){
        echo "该邮箱已注册，请勿重复注册。";
        $link->close();
        die();
    }

    $sql = "INSERT INTO `cnta-web-login`(`logEmail`, `logPwd`, `logName`) VALUES ('".$_POST['reEmail']."','".$_POST['rePwd']."','".$_POST['reName']."')";
    
    if( !($res = mysqli_query( $link, $sql)) ){
        echo "数据库操作失败，请重试。";
        $link->close();
        die();
    }
    
    $link->close();

    echo "恭喜你！你已成功注册成都理工计协网上会员！";

    die();

?>