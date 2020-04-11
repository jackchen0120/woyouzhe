let Rxports = {
	// 遍历数组与对象，回调的第一个参数为索引或键名，第二个或元素或键值
    each: function (obj, fn) {
    	var me = this;
        if (obj) { // 排除null, undefined
            var i = 0
            if (me.isArrayLike(obj)) {
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
    // 获取url参数
	getUrlParam: function () {
        var url = window.location.search, // 获取url中"?"符后的字串   
        theRequest = new Object();   
        if (url.indexOf("?") != -1) {   
          var str = url.substr(1), strs = str.split("&");   
          for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]); 
          }   
        }   
        return theRequest; 
    },
    // 页面单位rem
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
    // 自定义模态框
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
      		this.srcollBody.scrollTop = this.scrollTop;
            document.body.style.top = '0';
    	 }
    },
    // 去除空格
    trim: function (strs) { 
        return strs.replace(/(^\s*)|(\s*$)/g, ''); 
    }
}

export default Rxports