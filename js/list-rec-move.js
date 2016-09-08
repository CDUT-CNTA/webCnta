function recMouseMove(tag,obj) {
	/* Act on the event */
	if(obj.attr('zNum')=='0'){return;}
	if(tag==true)
	{
		obj.attr('zNum','1');
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