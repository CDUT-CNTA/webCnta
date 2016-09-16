function tab(num) {
	if (num == 4) return; //触底退出

	for (var i = 0; i < $(".main_scroll div").length; i++) {
		$(".main_scroll div")[i].style.background = "transparent"; //清除所有右圆的背景样式
	}
	$(".main_scroll div")[num].style.background = "#fff";
}

function pageTab(watch, obj, callback) { //watch=-1表示向下滚动，watch=1表示向上滚动

	clearInterval(timer);

	if ($(window).scrollTop() < window.innerHeight) {
		i = 1;
	} else {
		if ($(window).scrollTop() < window.innerHeight * 2) {
			i = 2;
		} else {
			if ($(window).scrollTop() < window.innerHeight * 3) {
				i = 3;
			} else {
				if ($(window).scrollTop() < window.innerHeight * 4) {
					i = 4;
				} else {
					if ($(window).scrollTop() < window.innerHeight * 5) {
						i = 5;
					}
				}
			}
		}
	}
	if (watch == 1) {
		i = i - 2;
	}

	timer = setInterval(function() {

		var speed = (window.innerHeight * i - $(window).scrollTop()) / 5;
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

		if ($(window).scrollTop() == 0) {
			if (speed < 0) {
				clearInterval(timer);
				tab(0);
			}
		}

		if (speed == 0) {
			clearInterval(timer);
			tab(i);
		} else {
			if (i >= 0) {
				$(".main_scroll div").css('background', 'transparent');
			}
			if (obj) {

				if ($(document).height() - $(document).scrollTop() - $(window).height() < 50) //到底部的时候隐藏nav
				{
					obj.hide();
				} else {
					obj.show();
				}
			}
			window.scrollBy(0, speed);
		}
	}, 30)

}