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
			$("body").animate({"scrollTop":$("#page"+About.scrollIndex).offset().top},{easing:"easeOutSine",duration:800});
		}
	}else{
		if(About.scrollIndex>1){
			About.scrollIndex--;
			$("body").animate({"scrollTop":$("#page"+About.scrollIndex).offset().top},{easing:"easeOutSine",duration:800});
		}
	}
	About.removeScrollListener();
	setTimeout(function(){About.addScrollListener();},500);
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
		setTimeout(function(){$(".loading").remove();},500);
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
	}else if(About.scrollIndex=="2"){
		$(".nav-bg").addClass("nav-bg-header");
		$(".nav").addClass("nav-toTop");
	}
}
