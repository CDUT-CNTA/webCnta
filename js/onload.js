jQuery(document).ready(function($) {
	// 全局变量
	timer = null;
	oNav = $(".nav")[0];
	oNavA = $(".nav a");
	oLogin = $(".nav_login")[0];
	judge = $("#waitToRefresh")[0];

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
				pageTab(-1,$(".nav"), function() {
					var flag = Math.floor(($(window).scrollTop() - window.innerHeight) / window.innerHeight) + 1;
					tab(flag);
				});
			};
			if (event.keyCode == 38) {
				pageTab(1,$(".nav"), function() {
					var flag = Math.floor(($(window).scrollTop() - window.innerHeight) / window.innerHeight) + 1;
					tab(flag);
				});
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

	//登录注册窗口
	if ($("#nav_login_a")) {
		$("#nav_login_a").on('click', function(event) {
			event.preventDefault();
			/* Act on the event */
			$(".login")[0].style.display = "block";
		});
		$(".login_close").on('click', function(event) {
			event.preventDefault();
			/* Act on the event */
			$(".login")[0].style.display = "none";
			$(".sign_open")[0].style.display = "none";
		});
		$("#sign_open_in").on('click', function(event) {
			event.preventDefault();
			/* Act on the event */
			$(".sign_open")[0].style.display = "block";
		});
		$("#login_open_in").on('click', function(event) {
			event.preventDefault();
			/* Act on the event */
			$(".sign_open")[0].style.display = "none";
		});
	}

	// 登录的ajax提交
	$("#loginIn").on('submit', function(event) {
		event.preventDefault();
		/* Act on the event */
		var val = $(".login_open_name").val();
		var url = "logined_img.php";
		var data = {
			type: 1
		};
		$.ajax({
			type: "get",
			async: false, //同步请求
			url: url,
			data: data,
			timeout: 1000,
			success: function(dates) {
				$("#waitToRefresh").html(dates); //要刷新的div
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

		var oLoginedImg = $(".nav_logined img");

		$(".nav").on('mouseover', function(event) {
			event.preventDefault();
			/* Act on the event */
			navChange(true, oMove, oNavA, oLoginedImg);
		});
		$(".nav").on('mouseout', function(event) {
			event.preventDefault();
			/* Act on the event */
			if ($(".nav_logined_group")[0].style.display != "block")
				navChange(false, oMove, oNavA, oLoginedImg);
		});
	});

	// 圆角矩形单击移入移出
	if ($(".list_main_left_list li")) {
		for (var i = 0; i < $(".list_main_left_list li").length; i++) {
			$(".list_main_left_list li")[i].Pindex = i;
		}
		$(".list_main_left_list li").bind('click', function(event) {
			/* Act on the event */

			if ($(this).attr('tag')) {
				if ($(this).attr('tag') == "1") return;
			}
			$(".list_main_left_list li").css('background-position', '-188px');
			$(".list_main_left_list li").attr('zNum', '1');

			$(this).attr('zNum', '0');
			oPic = $(this)[0];

			$(this).animate({
				backgroundPosition: '0px',
			}, "fast", function() {
				$(".list_main_right_content blockquote").hide();

				$(".list_main_right_content blockquote:eq(" + oPic.Pindex + ")").fadeIn("fast");
			})

		});

		//圆角矩形移入移出

		$(".list_main_left_list li p").bind('mouseover', function() {
			recMouseMove(true, $(this).parent("li"));
		});
		$(".list_main_left_list li p").bind('mouseout', function() {
			recMouseMove(false, $(this).parent("li"));
		});
	}

	// acT左边小栏
	if ($(".list_main_right_content_List")) {
		$("#actClick").bind('click', function(event) {
			/* Act on the event */
			if ($(".list_main_right_content_List ul li:eq(3)").attr('class') != "animated flipInY") {
				for (var i = 0; i < $(".list_main_right_content_List ul li").length; i++) {
					delay = i * 100;
					$(".list_main_right_content_List ul li:eq(" + i + ")").css({
						'display': 'block',
						'animation-delay': delay + 'ms'
					}).removeClass('flipOutY').addClass('flipInY');
				}
			} else {
				for (var i = $(".list_main_right_content_List ul li").length - 1; i >= 0; i--) {
					$(".list_main_right_content_List ul li:eq(" + i + ")").removeClass('flipInY').addClass('flipOutY');
				}
			}
		});
		$("#checkClick").bind('click', function(event) {
			/* Act on the event */
			if ($(".list_main_right_content_List ul li:last").attr('class') == "animated flipInY") {
				for (var i = 0; i < $(".list_main_right_content_List li").length; i++) {
					$(".list_main_right_content_List ul li:eq(" + i + ")").removeClass('flipInY').addClass('flipOutY');
				}
			}
		});

		$(".list_main_right_content_List ul li").bind('click', function(event) {
			/* Act on the event */
			for (var i = 0; i < $(".list_main_right_content_List ul li").length; i++) {
				$(".list_main_right_content_List ul li")[i].tag = 1;
			}
			$(".list_main_right_content_List ul li").css({
				'color': '#999',
				'background': '#fff'
			});
			$(this).css({
				'color': '#fff',
				'background': '#ff6060'
			});
			this.tag = 0;
		});
		$(".list_main_right_content_List ul li").bind('mouseover', function(event) {
			/* Act on the event */
			$(this).css({
				'color': '#fff',
				'background': '#ff6060'
			});
		});
		$(".list_main_right_content_List ul li").bind('mouseout', function(event) {
			/* Act on the event */
			if (this.tag == 0) return;
			else {
				$(this).css({
					'color': '#999',
					'background': '#fff'
				});
			}
		});

		// 小栏绑定事件
		$(".list_main_right_content_List ul li").bind('click', function(event) {
			/* Act on the event */

			for (var i = 0; i < $(".list_main_right_content_List ul li").length; i++) {
				$(".list_main_right_content_List ul li")[i].Pindex = i + 1;
			}

			$(".list_main_right_content blockquote").hide();

			oPic = $(this)[0];

			$(".list_main_right_content blockquote:eq(" + oPic.Pindex + ")").fadeIn("fast");
			event.stopPropagation();
		});
	}

});