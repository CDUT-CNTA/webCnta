jQuery(document).ready(function($) {
		// 圆角矩形单击移入移出
	if ($(".list_main_left_list li")) {
		for (var i = 0; i < $(".list_main_left_list li").length; i++) {
			$(".list_main_left_list li")[i].Pindex = i;
		}
		$(".list_main_left_list li").bind('click', function(event) {
			/* Act on the event */

			if ($(this).attr('tag') == "1") return;
			if (($(this).attr('zNum')==0)&&($(".list_main_right_content_List").css('display')=='block')) return;

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
			if($(".list_main_right_content_List ul li").attr("class")=="animated flipInY") return ;
			
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

			// 右侧内容更改
			for (var i = 0; i < $(".list_main_right_content_List ul li").length; i++) {
				$(".list_main_right_content_List ul li")[i].Pindex = i + 1;
			}

			$(".list_main_right_content blockquote").hide();

			oPic = $(this)[0];

			$(".list_main_right_content blockquote:eq(" + oPic.Pindex + ")").fadeIn("fast");

			event.stopPropagation();
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
	}
});