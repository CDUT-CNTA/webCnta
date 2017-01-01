jQuery(document).ready(function($) {
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
	$("#ajaxLogin").on('click', function(event) {
		event.preventDefault();
		/* Act on the event */

		var Domain=window.location.href;
		var DomainArr=Domain.split('/');

		var logText=$("[name='logText']").val();
		var logPwd=$("[name='logPwd']").val();
		var dataJson={'logText':logText,'logPwd':logPwd,'domain':DomainArr[DomainArr.length-1]};;
		$.ajax({
			type: "post",
			async: false, //同步请求
			url: "login.php",
			data: dataJson,
			dataType: "html",
			cache: false,
			timeout: 1000,
			success: function(dates) {
				alert(dates);
				//登录后的交互改变
				$("#waitToRefresh").html(dates); //要刷新的div
				$(".login")[0].style.display = "none";

				$("#waitToRefresh").addClass('Refreshed');

				$(".nav_logined img").on('click', function(event) {
					event.preventDefault();
					/* Act on the event */
					$(".nav_logined_group").slideToggle("fast");
				});
			},
			error: function() {
				alert("失败，请稍后再试！");
			}
		});
	});
});