jQuery(document).ready(function($) {
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

	var oNav=$(".nav")[0];
	var oMove=$(".nav_bg")[0];
	var oNavA=$(".nav a");

	oMove.alpha=0;
	oMove.timer=null;
	//导航栏绑定事件
	var oFun=new Function();

	oNav.onmouseover=function(){
		startFadeBg(oMove,100,function ()
		{
			for(var i=0;i<oNavA.length;i++)
			{
					oNavA[i].style.color="#999";
			}
			if($(".nav_login")[0]){
				$(".nav_login")[0].style.background="url(images/loginhover.png) no-repeat";
				$(".nav_login")[0].style.backgroundSize="70%";
			}
			$(".nav_logined img").attr("src","images/logged_checked.png");
		});
	}
	oNav.onmouseout=function(){
		startFadeBg(oMove,0,function ()	
		{
			for(var i=0;i<oNavA.length;i++)
			{
					oNavA[i].style.color="#fff";
			}
			if($(".nav_login")[0]){
				$(".nav_login")[0].style.background="url(images/login.png) no-repeat";
				$(".nav_login")[0].style.backgroundSize="70%";
			}
			$(".nav_logined img").attr("src","images/logged.png");
		});
	}

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
});