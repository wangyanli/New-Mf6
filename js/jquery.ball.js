
//图标拖动
$(function () {
    $("#mf6ball").draggable();
});


//图标触发
$(document).ready(function () {
    $("#maskLayer").fadeOut();
    var isMouseDown = false;
    var isMouseOver = false;
    $("#mf6ball").mousedown(function () {
        isMouseDown = true;
    }).mouseup(function () {

        var x = event.clientX;
        var y = event.clientY;
        if (x > 0 && x < 1024 && y > 0 && y < 768) {
            isMouseOver = true;

        }
        else {
            isMouseOver = false;
        }

        if (isMouseDown && isMouseOver) {
            $("#maskLayer").fadeOut();
            $("#mf6ball").animate({ "width": "0px" },1000, function () { $("#mf6tubiao").hide(); }); //动画效果的缩小
            document.getElementById("myVideo").play();
        }
    });
});

//视频当前播放时间
function currentTime() {
    var pl = document.getElementById("myVideo");
    return pl.currentTime;
}

//视频总时间
function duration() {
    var pl = document.getElementById("myVideo");
    return pl.duration;
}

var times = ["0", "0.5", "5", "6", "8", "9", "10"];   //显示信息的时间
var strs = [
                        "",
                        "MF6，专利六种膳食纤维组合，全面保护肠道。",
                         "MF6中的可溶性膳食纤维通过肠道有益菌的酵解产生的短链",
						 "脂肪酸是结肠粘膜细胞的关键营养物质；",
                         "同时，肠道有益菌的生长依赖于可溶性膳食纤维提供营养；",
						 "因此，保护肠道屏障，防止细菌易位，膳食纤维的作用至关重要。",
                         "MF6中的不溶性膳食纤维，能促进肠道蠕动 维护肠道正常生理功能。"
                         ];    //显示信息
var times_img = ["0", "7", "9.5"];   //显示图片的时间
var strS_imgSrc = ["image/caiseziti.png", "image/caizi3.png", "image/caizi2.png"];     //图片地址

var i = 0;
var j = 0;
var timeer = null;
$(document).ready(function showMsg() {
    if (currentTime() >= times[i]) {
        $("#foottext").html(strs[i]);
        i++;
    }
    if (document.getElementById("myVideo").ended) {
		$("#maskLayer").fadeIn(1000);
        $("#mf6tubiao")[0].style.left = "0px";
        $("#mf6tubiao").show();
        $("#mf6ball").animate({ width: 135 }, 135);
        $("#mf6ball").css({ "left": "696px", "top": "2px" });
        clearTimeout(timeer);
    }
    showImg();
    timeer = setTimeout(showMsg, 1000);
});
function showImg() {
    if (currentTime() >= times_img[j]) {
        $("#caiseziti").attr("src", strS_imgSrc[j]);
        j++;
    }
}

//箭头闪烁
var msecs = 200; //改变时间得到不同的闪烁间隔；
var counter = 0;
function soccerOnload() {
    setTimeout("blink()", msecs);
}
function blink() {
    soccer.style.visibility =
	(soccer.style.visibility == "hidden") ? "visible" : "hidden";
    counter += 1;
    setTimeout("blink()", msecs);
}



//处理apps图标拖动
var getDragClass=(function(){
var SupportsTouches = ("createTouch" in document),//判断是否支持触摸
StartEvent = SupportsTouches ? "touchstart" : "mousedown",//支持触摸式使用相应的事件替代
MoveEvent = SupportsTouches ? "touchmove" : "mousemove",
EndEvent = SupportsTouches ? "touchend" : "mouseup",
$=function(id){
return document.getElementById(id);
},
preventDefault=function(ev){
if(ev)ev.preventDefault();
else window.event.returnValue = false;
},
getMousePoint=function(ev){
var x = y = 0,
doc = document.documentElement,
body = document.body;
if(!ev) ev=window.event;
if (window.pageYoffset) {
x = window.pageXOffset;
y = window.pageYOffset;
}else{
x = (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
y = (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0);
}
if(SupportsTouches){
var evt = ev.touches.item(0);//仅支持单点触摸,第一个触摸点
x=evt.pageX;
y=evt.pageY;
}else{
x += ev.clientX;
y += ev.clientY;
}
return {'x' : x, 'y' : y};
};
function _drag(opt){
this.el=typeof opt.el=='string'?$(opt.el):opt.el;//被拖动节点
this.onstart=opt.start || new Function();//
        this.onmove=opt.move || new Function();
this.onend=opt.end || new Function();
this.action=false;
this.init();
}
_drag.prototype={
init:function(){
this.el.style.position='relative';
this.el['on'+StartEvent]=this.bind(function(e){//绑定节点的 [鼠标按下/触摸开始] 事件
                preventDefault(e);
if(this.action)return false;
else this.action=true;
this.startPoint=getMousePoint(e);
this.onstart();
document['on'+MoveEvent]=this.bind(function(e){
preventDefault(e);//取消文档的默认行为[鼠标移动、触摸移动]
this.nowPoint=getMousePoint(e);
this.el.style.left=this.nowPoint.x-this.startPoint.x+'px';
this.el.style.top=this.nowPoint.y-this.startPoint.y+'px';
this.onmove();
},this);
document['on'+EndEvent]=document['ontouchcancel']=this.bind(function(){
document['on'+EndEvent]=document['ontouchcancel']=document['on'+MoveEvent]=null;
this.action=false;
this.onend();
},this);
},this);
},
bind:function(fn,obj){
return function(){
fn.apply(obj,arguments);
}
}
}
return function(opt){
return new _drag(opt);
}
})();

