// 右侧导航 从左向右效果
$.fn.navFix = function(){

	$('.fix').hover(function(){
		$(this).find('span').stop().animate({
			'right':'40px'
		},500)},function(){

		$(this).find('span').stop().animate({
			'right':'-40px'
		})
	}).mouseover(function(){
		$(this).css({'background':'#71777d'});
	}).mouseout(function(){
		$(this).css({'background':'#b7bbbf'});
	})

};

// 购物车
$.fn.car = function(){
	
	$('.car').mouseenter(function(){
		$(this).css({
			'border':'1px solid #808080',
			'background-color': '#fff',
			'background-image':'url(素材/icon/24.png)',
			'color': '#f00'
		});
		$('.carPic').attr('src','素材/icon/25.png');
		$('.carMenu').show().mouseleave(function(){
			$('.carMenu').hide();
		});
	});
	$('.logo_car').mouseleave(function(){
		$('.carMenu').hide();
		$('.car').css({
			'border':'0',
			'background': 'url(素材/icon/23.png) #f01414 no-repeat 130px center',
			'color': '#fff'
		});
		$('.carPic').attr('src','素材/icon/26.png');
		
	});

};

//左侧导航 隐藏的子菜单
$.fn.navLeft = function(){

	$('.menu .item').hover(function(){
		var index = $(this).index()-1;
		$(this).css({'background':'#fff','color':'#f00'})
		$('.submenu').eq(index).show();

	},function(){
		var index = $(this).index()-1;
		$(this).css({'background':'rgba(232,20,20,0.9)','color':'#fff'});;
		$('.submenu').eq(index).siblings().hide();
	});
	$('.nav_left').mouseleave(function(){
		$('.submenu').hide();
		$('.menu .item').css({'background':'#f00','color':'#fff'});
	});
	// //移入二级菜单时
	// $('.submenu').hover(function(){
	// 	var index = $(this).index();
	// 	//给左侧的菜单项加入背景
	// 	$('.item').eq(index).css({'background':'#fff','color':'#f00'});
		
	// },function(){
	// 	//移入时左侧的菜单项去掉背景
	// 	$('.item').css({'background':'rgba(232,20,20,0.9)','color':'#fff'});
	// 	//二级菜单消失
	// 	$(this).hide();

	// });
	
}

//banner 轮播图
//	1. 左右箭头需要能控制翻页
//	2. 翻页的时候，进度点，要联动进行focus
//  3. 翻到第五页的时候，下一页需要回到 第一页，翻到第一页的时候，同理

//  4. 进度点，在点击的时候，需要切换到对应的页面

//  5. 没有（进度点点击、翻页操作）的时候需要进行自动滚动

//  6. 滚动过程中，屏蔽其他操作（自动滚动、左右翻页、进度点点击）

//	7. 高级-无缝滚动
$.fn.Roll = function(){





	var roll = $(this);

	var focus = $('.focus');

	var left = $('.btn .btn_left',roll);
	var right = $('.btn .btn_right',roll);

	var items = $('.focus .item',roll);
	var tips = $('.dots .item',roll)


	//  预定义

	var current = 0;
	var	size = items.length;
	var width = items.eq(0).width();
	var judge = null;

	//  自动触发
	$(this)
	.on('mouseover',function(){
		judge = false;
	})
	.on('mouseout',function(){
		judge = true;
	})
	

	//  具体操作
	focus
	.on('move_prev',function(){
		if(current <= 0){
			current = size;
		}
		current = current - 1;
		focus.triggerHandler('move',current);
	})
	.on('move_next',function(){
		if(current >= size-1){
			current = -1;
		}
		current = current + 1;
		focus.triggerHandler('move',current);
	})
	.on('move',function(evt,index){
		focus.css('left',index*width*-1);
	})
	.on('move',function(evt,index){
		tips.eq(index).addClass('on').siblings().removeClass('on');
	})
	.on('auto_move',function(){
		
		setInterval(function(){
			judge && focus.triggerHandler('move_next');
		},2000);
	})
	.triggerHandler('auto_move');



	//  事件
	left.on('click',function(){
		focus.triggerHandler('move_prev');
	});
	right.on('click',function(){
		focus.triggerHandler('move_next');
	});
	tips.on('click',function(){
		var index = $(this).index();
		focus.triggerHandler('move',index);
	});


}
		
//  floor导航cut区 span对应对应的content
$.fn.floor = function(){

	var ui = $(this);
	var items = $('.item',ui);
	var content = $('.content',ui);console.log(content)
	var change = $('.change',ui);

	var current = 0;


	content.eq(0).siblings().hide();

	content
	.on('changes',function(evt,index){
		
		content.eq(index).show().siblings().hide();
		items.eq(index).addClass('arrow').siblings().removeClass('arrow');

	})

	items.on('mouseenter',function(){
		var index = $(this).index();
		content.triggerHandler('changes',index);
	})




}

	

//页面脚本逻辑
$(function(){

	$('.navfix').navFix();
	$('.logo_car').car();
	$('.nav_left').navLeft();
	$('.bannerRoll').Roll();
	$('.floorone').floor();
	$('.floortwo').floor();

});


