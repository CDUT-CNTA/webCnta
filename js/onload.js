jQuery(document).ready(function($) {
	if($(".nav_bg")[0])
	{
		$(document).on('mousewheel DOMMouseScroll', function (e) {//绑定滚轮事件
			
			e.preventDefault();

		    //WebKit内核，Trident内核 => mousewheel
		    //Gecko内核 => DOMMouseScroll
		    var value = e.originalEvent.wheelDelta || -e.originalEvent.detail;
		    //e.originalEvent.wheelDelta => 120(up) or -120(down) 谷歌IE内核
		    //e.originalEvent.detail => -3(up) or 3(down) 火狐内核
		    var delta = Math.max(-1, Math.min(1, value));
		   
		    // alert($(document).height());
		    if(delta==-1)
		    {
		    	$(".nav").show();
		    	window.scrollBy(0,window.innerHeight);
		    	if($(document).height()-$(document).scrollTop()-$(window).height()<50)//到底部的时候隐藏nav
				{
				$(".nav").hide();
				}
		    }
		    if(delta==1)
		    {
		    	$(".nav").show();
		    	window.scrollBy(0,-window.innerHeight);
		    }
		    
		    var order=parseInt($(window).scrollTop()/window.innerHeight);
		    
		    if(tab)
		    	tab(order);
		});

	for (var i=0;i<$(".main_scroll div").length;i++)//给所有右边scroll小圆绑定事件
		{
			$(".main_scroll div")[i].onclick=(function(ii){

				return function(){
					window.scrollTo(0,window.innerHeight*ii);
					tab(ii);
				}
			})(i);
		}

		// 全局变量
		oNav=$(".nav")[0];
		oNavA=$(".nav a");
		oLogin=$(".nav_login")[0];
		judge=$("#waitToRefresh")[0];
		
		if($(".nav_bg")[0]){
			oMove=$(".nav_bg")[0];
			oMove.alpha=0;
			oMove.timer=null;
		}
		
		//导航栏绑定事件
		$(".nav").on('mouseover', function(event) {
			event.preventDefault();
			/* Act on the event */
			if(judge.className!="Refreshed"){
				navChange(true,oMove,oNavA,oLogin);
			}
		});
		$(".nav").on('mouseout', function(event) {
			event.preventDefault();
			/* Act on the event */
			if(judge.className!="Refreshed"){
				navChange(false,oMove,oNavA,oLogin);
			}
		});
}

	//if(oLogined) logined(oLogined,oNav,oMove,oLogin,oLoginedImg,oLoginedJq);
	if($("#nav_login_a")){
		$("#nav_login_a").on('click', function(event) {
			event.preventDefault();
			/* Act on the event */
			$(".login")[0].style.display="block";
		});
		$(".login_close").on('click', function(event) {
			event.preventDefault();
			/* Act on the event */
			$(".login")[0].style.display="none";
			$(".sign_open")[0].style.display="none";
		});
		$("#sign_open_in").on('click', function(event) {
			event.preventDefault();
			/* Act on the event */
			$(".sign_open")[0].style.display="block";
		});
		$("#login_open_in").on('click', function(event) {
			event.preventDefault();
			/* Act on the event */
			$(".sign_open")[0].style.display="none";
		});
	}

	$("#loginIn").on('submit', function(event) {
		event.preventDefault();
		/* Act on the event */
		var val=$(".login_open_name").val();
        var url = "logined_img.php";
        var data = {type:1};
        $.ajax({
            type : "get",
            async : false,  //同步请求
            url : url,
            data : data,
            timeout:1000,
            success:function(dates){
                $("#waitToRefresh").html(dates);//要刷新的div
            },
            error: function() {
               alert("失败，请稍后再试！");
            }
        });
		//登录后的交互改变
        $("#waitToRefresh").addClass('Refreshed');

        $(".nav_logined img").on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		$(".nav_logined_group").slideToggle("fast");
		});

        var oLoginedImg=$(".nav_logined img");

		$(".nav").on('mouseover', function(event) {
			event.preventDefault();
			/* Act on the event */
			navChange(true,oMove,oNavA,oLoginedImg);
		});
		$(".nav").on('mouseout', function(event) {
			event.preventDefault();
			/* Act on the event */
			if($(".nav_logined_group")[0].style.display!="block")
			navChange(false,oMove,oNavA,oLoginedImg);
		});
	});


});