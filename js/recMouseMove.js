function recMouseMove(tag,obj) {	//圆角矩形移入移出函数
	/* Act on the event */

	if(obj.data('znum') == '1'|| obj.data('znum') == '2'){return;}
	if(tag==true)
	{
		obj.stop().animate({
		backgroundPosition: '0px',
		},"fast");
	}
	else{
		obj.stop().animate({
		backgroundPosition: '-188px',
		},"fast");
	}
}