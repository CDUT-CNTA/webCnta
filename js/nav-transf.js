// 导航栏动画实现函数
function startFadeBg(obj,iTarget,callback)  //淡入淡出函数
{
	// if($(window).scrollTop()!=0)return;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var speed=(iTarget-obj.alpha)/4;
		speed=speed>0?Math.ceil(speed):Math.floor(speed);
		if(obj.alpha==iTarget)
		{
			clearInterval(obj.timer);
		}
		else
		{
			obj.alpha+=speed;
			obj.style.filter='alpha(opacity:'+obj.alpha+')';
			obj.style.opacity=obj.alpha/100;
		}
	},30);
	callback();			//执行回调函数
}
function navChange(bool,oMove,oNavA,obj)
{
	if(bool==true){
		
		startFadeBg(oMove,100,function ()	
		{
			oNavA.removeClass();
			oNavA.addClass('nav_change');
			if(obj.className=="nav_login"){
				obj.style.background="url(images/loginhover.png) no-repeat";
				obj.style.backgroundSize="70%";
			}
			else{
				obj.attr('src','images/logged_checked.png');
			}
		});
	}
	else{
		
		startFadeBg(oMove,0,function ()	
		{
			oNavA.removeClass();
			oNavA.addClass('nav_changed');
			if(obj.className=="nav_login"){
				obj.style.background="url(images/login.png) no-repeat";
				obj.style.backgroundSize="70%";
			}
			else{
				obj.attr('src', 'images/logged.png');
			}
		});
	}
}
