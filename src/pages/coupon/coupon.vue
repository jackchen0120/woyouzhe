<template>
	<div id="app">
	  <div class="wrap">
	    <div class="top-menu" v-show="isShow2">
	      <div class="flex-cont flex-nav">
	          <div class="nav-left">
	              <a href="javascript:;" @click="gotoBack"><i class="icon-back"></i></a>
	          </div>
	          <div class="nav-middle">
	                <div class="top-title">领券优惠券并购买</div>
	          </div>
	          <div class="nav-right">
	              <a href="javascript:;" target="_blank" @click="gotoHome"><i class="icon-home"></i></a>
	          </div>
	      </div> 
	    </div>
	    <div class="top-hr" v-show="isShow2"></div>
	    
	    <div class="coupon-detail" v-show="isShow">
	        <div class="tao-code-header">
	          <div class="text-left text">
	              <h2>￥<span>{{detailInfo.ActMoney}}</span></h2>
	              <p>优惠劵</p>
	              <span class="getcoupon-btn" @click="getCoupon">立即领取</span>
	          </div>
	        </div>
	      <div class="app-detail">
	        <div class="appicon">
	          <img :src="detailInfo.ImgUrl ? detailInfo.ImgUrl : require('@/assets/img/lazy_default.png')" :alt="detailInfo.GoodsName" :onerror="errorImg">
	        </div>
          <div class="kouling-cont">
              <textarea id="textarea" readonly disabled>{{detailInfo.ActLink}}</textarea>
              <div class="better-change">
                  <button type="button" class="onecopy" v-clipboard="detailInfo.ActLink" @success="handleSuccess" @error="handleError">一键复制</button>
              </div>
          </div>
	        <div class="kouling-tips">
	          <p class="msg">
	              <span id="deling">使用说明：<i class="am-text-danger">点击一键复制</i>后打开<i class="am-text-danger">手机淘宝</i>，在输入框粘贴后打开哦~</span>
	          </p>
	          <p class="msg2">
	            <span id="deling">
	              温馨提示：手机无<i class="am-text-warning">手机淘宝</i>，可在浏览器输入框中粘贴打开哦~
	            </span>
	          </p>
	        </div>
	      </div>
	    </div>
	    
	    <loading :isLoading="isLoading"></loading>

	    <sold-out :isOut="isOut">
	      <span>{{outText}}</span>
	    </sold-out>

      <err-notice :isNotice="isNotice">
        <span>{{noticeText}}</span>
      </err-notice>

	    <jump-coupon :isJumpCoupon="isJumpCoupon" @showPopperCoupon="closeCouponBtn"></jump-coupon>
	   
	  </div>
	</div>
</template>

<script>
import Export from '@/assets/js/export'
import { 
  getShopDetail
} from '@/assets/js/api'
import loading from '@/components/loading'
import soldOut from '@/components/soldOut'
import errNotice from '@/components/errNotice'
import jumpCoupon from '@/components/jumpCoupon'
import backTop from '@/components/backTop'
import { url } from '@/assets/js/url'

export default {
  components: {
    loading, 
    soldOut, 
    errNotice,
    jumpCoupon,
    backTop
  },
  data () {
    return {
      detailInfo: {
        ActLink: ''
      },
      isLoading: false,
      isShow: false,
      isShow2: true,
      isOut: false,
      isNotice: false,
      noticeText: '',
      isCouponUrl: false,
      outText: '',
      isJumpCoupon: false,
      errorImg: "this.src='" + require('@/assets/img/lazy_default.png') + "'"
    }
  },
  watch: {
    //'$route':'getDetailData'
  },
  methods: {
    gotoBack () {
      window.history.back(-1);
    },
    gotoHome () {
      window.location.href = `..${url}/`;
    },
    getCoupon () {
      this.isJumpCoupon = true;
    },
    closeCouponBtn () {
      this.isJumpCoupon = false;
    },
    handleSuccess (e) {
      e.trigger.style.backgroundColor = '#9ed29e';
      e.trigger.innerText = '复制成功'; 
    },
    handleError (e) {
      e.trigger.style.backgroundColor = '#bbb';
      e.trigger.innerText = '复制失败';
      this.isNotice = true;
      this.noticeText = '请手动复制链接在浏览器打开';

      setTimeout(() => {
          this.isNotice = false;
      }, 3000);
    },
    getDetailData () {
      let me = this;

      getShopDetail(Export.getUrlParam().id)
      .then(res => {
        console.log('coupon===', res);
        me.isLoading = false;
        let ua = window.navigator.userAgent.toLowerCase();

        if (res.error == 0 && typeof(res.data) != undefined) {
          if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            if (res.data) {
              me.isShow = true;
              me.detailInfo = res.data[0];
            } else {
              me.isShow = false;
              me.isOut = true;
              me.outText = '~_~抱歉，木有找到相关商品信息！';
            }
          } else {
            me.isShow2 = false;
            window.location.href = res.data[0].coupon_url;
          }
        } else {
          me.isShow = false;
          me.isOut = true;
          me.outText = '请求数据失败';
        }
      })
      .catch(err => {
        me.isLoading = false;
        me.isShow = false;
        me.isOut = true;
        me.outText = '网络请求异常，请稍后再试';
      })

    }
  },
  created () {
    Export.rem();
    this.getDetailData();
  },
  mounted () {
    
  }
}
</script>

<style scoped>
/* .nav-left, .nav-right{
  padding: .16rem .3rem;
} */
.nav-left a, .nav-right a {
  padding: .16rem .3rem;
  display: block;
}
.top-title{
  font-size: .36rem;
  color: #fff;
  line-height: 2.45;
  text-align: center;
}

.icon-back{
  width: .55rem;
  height: .55rem;
  display:block;
  background: url(../../assets/img/back.png) no-repeat center;
  background-size: 100%;
}
.icon-home{
  width: .55rem;
  height: .55rem;
  display:block;
  background: url(../../assets/img/home.png) no-repeat center;
  background-size: 100%;
}
.coupon-detail {
  margin-top: 1.2rem;
}
.tao-code-header {
  position: relative;
  height: 1.8rem;
  background: #f5a407;
  background:-webkit-gradient(linear, 0 0, 0 bottom, from(rgba(245, 164, 7, 0.6)), to(#f5a407));
  margin: 0 .35rem;
}
.tao-code-header .text {
  color: #fff;
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  -webkit-transform: translate(-50%,-50%);
}
.tao-code-header .text h2 {
  font-size: .36rem;
  margin: 0 .4rem .2rem;
}
.tao-code-header .text p {
  font-size: .36rem;
  margin: .2rem .4rem 0;
}
.getcoupon-btn {
  display: inline-block;
  padding: .12rem .3rem;
  border-radius: .1rem;
  text-align: center;
  color: #fff;
  background: #fc0786;
  text-decoration: none;
  position: absolute;
  top: .4rem;
  right: .35rem;
  font-size: .36rem;
}
.coupon-detail .app-detail {
  margin: .4rem .35rem;
  border: 2px solid #e7eaed;
  border-radius: .15rem;
  background: #fff;
}
.kouling-cont {
  position: relative;
  margin: 0 .2rem;
  padding: .3rem;
  background: #fff4f8;
}
.coupon-detail .app-detail .better-change {
  display: flex;
  align-items: center;
  justify-content: center;
}
.kouling-cont textarea {
  display: block;
  font-size: .24rem;
  width: 100%;
  height: 2rem;
  line-height: .28rem;
  margin-bottom: .3rem;
  color: #fc0786;
  background: #fff;
  resize: none;
  border: none;
　outline: none;
　overflow-x: hidden;
  word-wrap: break-word;
  word-break: break-all;
}
.coupon-detail .app-detail .onecopy {
  padding: .15rem .3rem;
  background: #fc0786;
  text-align: center;
  margin: 0 auto;
  color: #fff;
  border-radius: .1rem;
  cursor: pointer;
  font-size: .32rem;
}
.coupon-detail .app-detail .appicon {
  width: 100%;
  margin: .4rem auto;
  text-align: center;
}
.coupon-detail .app-detail .appicon img {
  width: 5rem;
  height: 5rem;
  border-radius: .5rem;
}
.coupon-detail .app-detail .msg {
  color: #3d495c;
  font-size: .3rem;
  margin: .3rem .2rem .2rem;
  text-align: justify;
}
.coupon-detail .app-detail .msg span {
  width: 100%;
  display: block;
}
.am-text-danger, .am-text-warning {
  color: #dd514c;
}
.coupon-detail .app-detail .msg2 {
  color: #3d495c;
  font-size: .3rem;
  margin: 0 .2rem .4rem;
  text-align: justify;
}


</style>
