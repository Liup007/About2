var About={scrollIndex:1};
$(function(){
	About.addScrollListener();
	About.init();
//	$(".loading").addClass("finish-loading");
//	alert(GetQueryString("b"));
	
});
/**
 * 注册窗口滚动事件
 */
About.addScrollListener=function(){
	//注册事件FireFox
	if(document.addEventListener){
		document.addEventListener("DOMMouseScroll",About.scrollFnc,false);
	}
	//W3C
	document.onmousewheel=document.onmousewheel=About.scrollFnc;
}
/**
 * 取消窗口滚动事件
 */
About.removeScrollListener=function(){
	if(document.addEventListener){
		document.removeEventListener("DOMMouseScroll",About.scrollFnc);
	}
	document.onmousewheel=null;
}
/**
 * 滚动事件响应事件
 * @param {Object} e
 */
About.scrollFnc=function(e){
	e=e||window.event;
	var dictValue="";
	if(e.wheelDelta){
		dictValue=e.wheelDelta;
	}else if(e.detail){//FireFox
		dictValue=e.detail;
	}
	if(dictValue<0){
		if(About.scrollIndex<$("div[id*=page]").length){
			About.scrollIndex++;
			$("body").animate({"scrollTop":$("#page"+About.scrollIndex).offset().top},{easing:"easeOutSine",duration:600});
		}
	}else{
		if(About.scrollIndex>1){
			About.scrollIndex--;
			$("body").animate({"scrollTop":$("#page"+About.scrollIndex).offset().top},{easing:"easeOutSine",duration:600});
		}
	}
	About.removeScrollListener();
	setTimeout(function(){About.addScrollListener();},600);
	About.addPageAnimate();//加载页面动画
}
/**
 * 页面初始化
 */
 About.init=function(){
 	$("body").animate({"scrollTop":0},10);
 	var offsetTop=$(".loading").offset().top;
	$(".loading").css({"bottom":"auto","top":offsetTop});
	$(".loading").animate({top:"20px"},600,function(){
		$(".back-home a").css({"opacity":"1"});
		setTimeout(function(){$(".loading").fadeOut();},500);
		About.loadHeaderPage();
	});
	$(".loading-description").remove();
	$(".loading-circle").css({"border":"10px solid #93BFDB"});
 }
 /**
  * 加载首页
  */
About.loadHeaderPage=function(){
	var loadSerial=[1,2,0,3,5,4];
	for(var i=0;i<loadSerial.length;i++){
		setTimeout(function(i){
			$($(".fade")[loadSerial[i]]).addClass("fade-in");
		},i*100,i);
	}
}
/**
 * 加载各个页面特效
 */
About.addPageAnimate=function(){
	if(About.scrollIndex=="1"){
		$(".nav-bg").removeClass("nav-bg-header");
		$(".nav").removeClass("nav-toTop");
		$("#page2 div ul li img:first-child").removeClass("fadeInLeft");
		$("#page2 div ul li img:last-child").removeClass("fadeInRight");
	}else if(About.scrollIndex=="2"){
		$(".nav-bg").addClass("nav-bg-header");
		$(".nav").addClass("nav-toTop");
		var arr=About.randomArr(3);
		for(var i=0;i<arr.length;i++){
//			setTimeout($($("#page2 div ul li img:first-child")[arr[i]]).addClass("fadeInLeft");,i*500);
//			setTimeout(function(){$($("#page2 div ul li img:last-child")[arr[i]]).addClass("fadeInRight");},i*500);
			setTimeout("About.addClass('#page2 div ul li img:first-child',"+arr[i]+",'fadeInLeft')",500*i);
			setTimeout("About.addClass('#page2 div ul li img:last-child',"+arr[i]+",'fadeInRight')",500*i);
		}
	}
}
/**
 * 产生随机数组
 */
About.randomArr=function(len){
	var arr=[];
	for(var i=0;i<len;i++){
		arr[i]=i;
	}
	arr.sort(function(){return 0.5-Math.random()});//打乱数组
	return arr;
}
/**
 * 在指定对象上添加类
 */
About.addClass=function(className,i,target){
	$($(className)[i]).addClass(target);
}
