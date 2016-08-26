function tab(num){
	if(num==4)return;//触底退出

	for(var i=0;i<$(".main_scroll div").length;i++)
	{
		$(".main_scroll div")[i].style.background="transparent";//清除所有右圆的背景样式
	}
	$(".main_scroll div")[num].style.background="#fff";

}