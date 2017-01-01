jQuery(document).ready(function($) {
	// 全局变量
	timer = null;
	oNav = $(".nav")[0];
	oNavA = $(".nav a");
	oLogin = $(".nav_login")[0];
	judge = $("#waitToRefresh")[0];


	$(".foot").height($(window).height() - $(".copyright").height());
	var temp = $(".copyright").css('top');
	if ($(".nav_bg")[0]) {
		$(document).on('mousewheel DOMMouseScroll', function(e) { //绑定滚轮事件

			e.preventDefault();

			//WebKit内核，Trident内核 => mousewheel
			//Gecko内核 => DOMMouseScroll
			var value = e.originalEvent.wheelDelta || -e.originalEvent.detail;
			//e.originalEvent.wheelDelta => 120(up) or -120(down) 谷歌IE内核
			//e.originalEvent.detail => -3(up) or 3(down) 火狐内核
			var delta = Math.max(-1, Math.min(1, value));

			// alert($(document).height());
			if (delta == -1) {

				pageTab(-1, $(".nav"));
			}
			if (delta == 1) {

				pageTab(1, $(".nav"));
			}

		});
		$(document).bind('keydown', function(event) { //上下键滚动事件
			/* Act on the event */
			if (event.keyCode == 40) {
				pageTab(-1, $(".nav"));
			};
			if (event.keyCode == 38) {
				pageTab(1, $(".nav"));
			};
		});

		for (var i = 0; i < $(".main_scroll div").length; i++) //给所有右边scroll小圆绑定事件
		{
			$(".main_scroll div")[i].onclick = (function(ii) {

				return function() {
					window.scrollTo(0, window.innerHeight * ii);
					tab(ii);
				}
			})(i);

		}

		if ($(".nav_bg")[0]) {
			oMove = $(".nav_bg")[0];
			oMove.alpha = 0;
			oMove.timer = null;
		}

		//导航栏绑定事件
		$(".nav").on('mouseover', function(event) {
			event.preventDefault();
			/* Act on the event */
			if (judge.className != "Refreshed") {
				navChange(true, oMove, oNavA, oLogin);
			}
		});
		$(".nav").on('mouseout', function(event) {
			event.preventDefault();
			/* Act on the event */
			if (judge.className != "Refreshed") {
				navChange(false, oMove, oNavA, oLogin);
			}
		});
	}

	var oLoginedImg = $(".nav_logined img");

		$(".nav").on('mouseover', function(event) {
			event.preventDefault();
			/* Act on the event */
			navChange(true, oMove, oNavA, oLoginedImg);
		});
		$(".nav").on('mouseout', function(event) {
			event.preventDefault();
			/* Act on the event */
			// if ($(".nav_logined_group")[0].style.display != "block")
				navChange(false, oMove, oNavA, oLoginedImg);
		});

});