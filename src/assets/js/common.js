import axios from 'axios'
import Mock from '@/mock'

let Rxports = {
	/*遍历数组与对象,回调的第一个参数为索引或键名,第二个或元素或键值*/
    each: function (obj, fn) {
    	var That = this;
        if (obj) { //排除null, undefined
            var i = 0
            if (That.isArrayLike(obj)) {
                for (var n = obj.length; i < n; i++) {
                    if (fn(i, obj[i]) === false)
                        break
                }
            } else {
                for (i in obj) {
                    if (obj.hasOwnProperty(i) && fn(i, obj[i]) === false) {
                        break
                    }
                }
            }
        }
    },
	
	getUrlParam: function () {
        var url = window.location.search, //获取url中"?"符后的字串   
        theRequest = new Object();   
        if (url.indexOf("?") != -1) {   
          var str = url.substr(1), strs = str.split("&");   
          for(var i = 0; i < strs.length; i ++) {   
              //就是这句的问题
             theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]); 
             //之前用了unescape()
             //才会出现乱码  
          }   
        }   
        return theRequest; 
    },

	/*********页面单位Rem*********/
	rem: function () {
        var docEl = document.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth >= 750) {
                docEl.style.fontSize = '100px';
            } else {
                docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            }
        };
        recalc();
        window.addEventListener(resizeEvt, recalc, false);
    },
    /*scrollTop: function (elem) {
        var sum = elem.offsetTop;
        while((elem = elem.offsetParent) != null){
            sum += elem.offsetTop;
        }
        return sum;
    },*/
    modalHelper: {
    	scrollTop: '',
    	bodyCls: 'modal-open',
    	srcollBody: (document.scrollingElement || document.body),
    	afterOpen: function() {
    		var me = this;
      		this.scrollTop = this.srcollBody.scrollTop;
      		document.body.classList.add(me.bodyCls);
      		document.body.style.top = -this.scrollTop + 'px';
    	},
    	beforeClose: function () {
    		var me = this;
      		document.body.classList.remove(me.bodyCls);
     	 // scrollTop lost after set position:fixed, restore it back.
      		this.srcollBody.scrollTop = this.scrollTop;
            document.body.style.top = '0';
    	 }
    },
    trim: function (strs) { 
        return strs.replace(/(^\s*)|(\s*$)/g, ''); 
    }/*,
    downLoadFile: function () {//手机下载
        var confing={
            urlYyb:'//a.app.qq.com/o/simple.jsp?pkgname=com.example.tiantang',
            urlAndroid:'//img.tiantangdongman.com/apk/TianTangDongMan.apk',
            urliOS:'//itunes.apple.com/us/app/tian-tang-dong-man/id1175877843?l=zh&ls=1&mt=8'
        };

        var ua = window.navigator.userAgent.toLowerCase();
        var isAndroid = ua.indexOf('android') > -1 || ua.indexOf('linux') > -1; //android终端或者uc浏览器
        var isIOS = !!ua.match(/\(i[^;]+;( U;)? cpu.+mac os x/); //ios终端
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            window.location.href = confing.urlYyb;
        } else if (isAndroid) {
            window.location.href = confing.urlAndroid;
        } else if (isIOS) {
            window.location.href = confing.urliOS;
        } else {
            window.location.href = confing.urlYyb;
        }
    },
    getScrollTop: function () {//获取body的scrollTop值
　　      var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
　　      if(document.body){
　　　　      bodyScrollTop = document.body.scrollTop;
　　      }
　　      if(document.documentElement){
　　　　      documentScrollTop = document.documentElement.scrollTop;
　　      }
　　      scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
　　      return scrollTop;
     },
    getScrollHeight: function () {//获取整个body的高度
　　      var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
　　      if(document.body){
　　　　      bodyScrollHeight = document.body.scrollHeight;
　　      }
　　      if(document.documentElement){
　　　　      documentScrollHeight = document.documentElement.scrollHeight;
　　       }
　　      scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight:documentScrollHeight;
　　      return scrollHeight;
    }*/
}


export default Rxports