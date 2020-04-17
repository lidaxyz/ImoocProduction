window.onload=function(){
//封装一个代替getElementById()的方法
function byId(id){
	return typeof(id)==="string"?document.getElementById(id):id;
}
//定义全局变量
var index = 0,
	timer = null,
	navs = byId("nav").getElementsByTagName("div"),
	pics = byId("banner").getElementsByTagName("div"),
	len = pics.length;
	
function slideImg(){
	var main = byId("main");
	//鼠标悬停清除定时器
	main.onmouseover = function(){
		clearInterval(timer);
	}
	//鼠标离开事件
	main.onmouseout = function(){
		timer = setInterval(function(){
			index++;
			if(index >= len){
				index = 0;
			}

			//切换图片
			console.log(index)
			changeImg();
		},1000)
	}
	//自动在main上触发鼠标离开事件
	main.onmouseout();
	
	//遍历所以点击，且绑定点击事件
	for(var d=0;d<len;d++){
		navs[d].id = d;
		navs[d].onclick = function(){
			//改变index为当前div的id值
			index = this.id;

			//调用changImg，实现切换图片
			changeImg();
		}
	}

}

//切换图片
function changeImg(){
	//遍历banner下所有的div，将div隐藏
	for(var i=0;i<len;i++){
		pics[i].style.display = "none";
		navs[i].className = "sub";
	}
	pics[index].style.display = "block";
	navs[index].className = "sub active";
}
slideImg();
}