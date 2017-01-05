jQuery(document).ready(function($) {

	var oRectan = $(".list_main_left_list ul li p"); //获取背景为圆角矩形的p元素
	var oAllList = $(".list_main_right_content_List ul > li"); //获取全部矩形的li

	//圆角矩形移入移出
	oRectan.bind('mouseover', function() {
		recMouseMove(true, $(this));
	});
	oRectan.bind('mouseout', function() {
		recMouseMove(false, $(this));
	});

	// acT左边菜单
	$(".actList").bind('click', function(event) {
		/* Act on the event */

		var oListWrap = $(this).next('.list_main_right_content_List');
		var oList = oListWrap.children('ul').children('li'); //选中当前this对象的所有子元素li

		//圆角矩形单击移入移出
		oRectan.css('background-position', '-188px');
		$(this).animate({
			backgroundPosition: '0px',
		}, "fast", function() {
			//清除
			$(".list_main_right_content").hide();
			$(".list_main_right_content blockquote").hide();
			//显示
			$(".list_main_right_content").eq(oRectan.index(this)).css('display', 'block');
			$(".list_main_right_content").eq(oRectan.index(this)).children('blockquote').eq(0).show('fast');
		})

		//小矩形进入和消失
		oAllList.data('tag', '1');//置位

		if ($(this).data('znum') == '0'|| $(this).data('znum') == '2') {	//znum用来判断是否弹出小矩形菜单
			oListWrap.css('display', 'block');
			$(".list_main_right_content_List ul li").css({ //全部置位
				'color': '#999',
				'background': '#fff'
			});
			oList.eq(0).css({ //第一个变色
				'color': '#fff',
				'background': '#ff6060'
			});
			oList.eq(0).data('tag', '0');

			for (var i = 0; i < oList.length; i++) { //延时进入
				delay = i * 100;
				oList.eq(i).css({
					'display': 'block',
					'animation-delay': delay + 'ms'
				}).removeClass('flipOutY').addClass('flipInY');
			}
			$('.actList').data('znum', '0');
			$(this).data('znum', '1');
		} else {
			if($(this).data('znum') == '1')
				for (var i = oList.length - 1; i >= 0; i--) {
					delay = i * 100;
					oList.eq(i).css({
						'animation-delay': delay + 'ms'
					}).removeClass('flipInY').addClass('flipOutY');
				}
				oListWrap.css('display', 'none');
				$(this).data('znum', '2');
		}

	});

	//小矩形绑定事件
	$(".list_main_right_content_List ul li").bind('click', function(event) {
		/* Act on the event */
		if ($(this).data('tag') == 0) return;

		var oList = $(this).parent('ul').children('li'); //获取当前div下全部li
		var ocurrentP = $(this).parents(".list_main_right_content_List").siblings('p');//获取当前点击的li是在那个p下面
		var oTag = oRectan.index(ocurrentP); //获取当前点击的li是在p元素的索引

		// 点击另一个p下的li时应移入
		if(ocurrentP.data('znum')!='1'){
			oRectan.css('background-position', '-188px');
			ocurrentP.data('znum', '1');
			$(".list_main_right_content_List ul li").css({ //全部置位
				'color': '#999',
				'background': '#fff'
			});
			ocurrentP.animate({
			backgroundPosition: '0px',
			},"fast");
		}

		oAllList.data('tag', '1') //重新置位
		oAllList.css({
			'color': '#999',
			'background': '#fff'
		});

		//被点击的li变色
		$(this).css({
			'color': '#fff',
			'background': '#ff6060'
		});
		$(this).data('tag', '0');

		// 右侧内容更改
		$(".list_main_right_content").hide();
		$(".list_main_right_content blockquote").hide();

		$(".list_main_right_content").eq(oTag).css('display', 'block');
		$(".list_main_right_content").eq(oTag).children('blockquote').eq(oList.index($(this))).fadeIn("fast");

		event.stopPropagation();
	});
	oAllList.bind('mouseover', function(event) {
		/* Act on the event */
		console.log($(this).data('tag'));
		$(this).css({
			'color': '#fff',
			'background': '#ff6060'
		});
	});
	oAllList.bind('mouseout', function(event) {
		/* Act on the event */
		if ($(this).data('tag') == 0) return;
		else {
			$(this).css({
				'color': '#999',
				'background': '#fff'
			});
		}
	});
});