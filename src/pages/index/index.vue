<template>
  <div id="app">
    <div class="wrap">
      <div class="top-menu">
        <div class="flex-cont flex-nav">
            <div class="nav-left">
                <i class="icon-logo"></i>
            </div>
            <div class="nav-middle">
                <form @submit.prevent="submitForm">
                    <div class="top-search-div">
                        <i class="icon-search" @click="searchSubmit(searchVal)"></i>
                        <input class="top-search" 
                               type="text"
                               ref="input" 
                               placeholder="输入关键词/标题找优惠券" 
                               v-model="searchVal" 
                               autocomplete="off" 
                               maxlength="20" />
                    </div>
              </form>
            </div>
            <div class="nav-right" @click="getCoupon">
                <i class="icon-qrcode"></i>
            </div>
        </div> 
      </div>
      <div class="top-hr"></div>
      <!-- <div class="banner" @click="adBanner">
        <img src="../../../static/img/banner.jpg" alt="时尚MJ淘宝店" title="时尚MJ淘宝店">
      </div> -->
      <div class="swiper-container">
          <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(banner, index) in banners" :key="index">
                <img :src="banner" class="index-img" @click="adBanner" alt="时尚MJ淘宝店">
              </div>
          </div>
          <div class="swiper-pagination"></div> 
      </div>
      <!-- <swiper :options="swiperOption"  ref="mySwiper">   -->
          <!-- 这部分放你要渲染的那些内容 -->  
          <!-- <swiper-slide v-for="banner in banners" :key="banner"> 
              <img :src="banner" class="index-img" @click="adBanner" alt="时尚MJ淘宝店">
          </swiper-slide>   -->
          <!-- 这是轮播的小圆点 -->  
         <!--  <div class="swiper-pagination" slot="pagination"></div> -->  
      </swiper> 

      <category-list></category-list>

      <div class="list-summary">
        <span>所有商品优惠券</span>
      </div>

      <div @touchstart="touchStart">
        <shop-list :isSearchInitData="isSearchInitData"></shop-list>
      </div>

      <qrcode-pop :isPopup="isPopup" @showPopper="closeBtn">
        <h3>微信打开长按二维码关注公众号</h3>
        <div class="qrcode-img">
          <img src="../../assets/img/qrcode.jpg" class="qrcode">
        </div>
        <div class="close-btn" @click="closeBtn">关闭</div>
      </qrcode-pop>

      <!-- 弹框提示 -->
      <err-notice :isNotice="isNotice">
        <span>{{noticeText}}</span>
      </err-notice>
      
      <jump-coupon :isJumpCoupon="isJumpCoupon" @showPopperCoupon="closeCouponBtn"></jump-coupon>

      <back-top></back-top>

    </div>
  </div>
</template>

<script>
import Export from '@/assets/js/export'
import categoryList from '@/components/categoryList'
import qrcodePop from '@/components/qrcodePop'
import shopList from '@/components/shopList'
import errNotice from '@/components/errNotice'
import jumpCoupon from '@/components/jumpCoupon'
import backTop from '@/components/backTop'

export default {
  components: {
    categoryList,
    shopList,
    qrcodePop,
    errNotice,
    jumpCoupon,
    backTop
  },
  data () {
    return {
      searchVal: '',
      isNotice: false,
      noticeText: '',
      isPopup: false,
      isNotice: false,
      noticeText: '',
      isSearchInitData: false,
      isJumpCoupon: false,
      ua: window.navigator.userAgent.toLowerCase(),
      banners: [
        require('../../../static/img/banner.jpg'), 
        require('../../../static/img/banner2.jpg'), 
        require('../../../static/img/banner3.jpg')
      ],
    }
  },
  watch: {

  },
  methods: {
    searchSubmit (value) {
      let inputVal = Export.trim(value);
      if (inputVal == '') {
        this.isNotice = true;
        this.noticeText = '搜索框不能为空';

        setTimeout(() => {
          this.isNotice = false;
        }, 2000);
      } else {
        this.isSearchInitData = true;
        this.$refs.input.blur();
        window.location.href = '../search/search?word=' + inputVal;
        
      }
    },
    submitForm () {
      this.searchSubmit(this.searchVal);
    },
    getCoupon () {
      this.isPopup = true;
    },
    closeBtn () {
      this.isPopup = false;
    },
    touchStart (e) {
      this.isSearchInitData = false;
      this.$refs.input.blur();
    },
    closeCouponBtn () {
      this.isJumpCoupon = false;
    },
    adBanner () {
      if (this.ua.match(/MicroMessenger/i) == 'micromessenger') {
        this.isJumpCoupon = true;
      } else {
        window.location.href = 'https://blog.csdn.net/qq_15041931';
      }
    },
    initSwiper() {
      let mySwiper = new Swiper('.swiper-container', {
          speed: 1000,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false   //手动滑动后，继续自动滑动
          },
          pagination: {
            el: '.swiper-pagination',
          }, 
          loop: true
       })
    }
  },  
  computed: {  
      swiper() {  // 定义这个sweiper对象
        return this.$refs.mySwiper.swiper;  
      }  
  },
  created () {
    Export.rem();
  },
  mounted () {
    this.initSwiper();
  }
}
</script>

<style scoped>
.nav-left, .nav-right{
  padding: .16rem .3rem;
}
.nav-right a {
  display: block;
}
.top-search{
  display: block;
  width: 4rem;
  height: .6rem;
  padding: .1rem .2rem;
  font-size: .28rem;
  line-height: 1.5;
  background: transparent;
}
.top-search-div {
    position: relative;
    width: 100%;
    height: .6rem;
    border-radius: .08rem;
    -webkit-border-radius: .08rem;
    border: 1px solid #eee;
    background: #fff;
    overflow: hidden;
}
.icon-search {
    position: absolute;
    top: 50%;
    right: 0;
    margin-top: -.36rem;
    z-index: 9;
    width: .72rem;
    height: .72rem;
    background: url(../../assets/img/search.png) no-repeat center;
    background-size: 100%;
    transform: scale(.6);
    -ms-transform: scale(.6);     /* IE 9 */
    -moz-transform: scale(.6);    /* Firefox */
    -webkit-transform: scale(.6); /* Safari 和 Chrome */
    -o-transform: scale(.6);  /* Opera */
}
 .icon-logo{
  width: .99rem;
  height: .55rem;
  display: block;
  background: url(../../assets/img/icon_logo.png) no-repeat center;
  background-size: 100%;
} 
.icon-qrcode{
  width: .55rem;
  height: .55rem;
  display:block;
  background: url(../../assets/img/icon_qrcode.png) no-repeat center;
  background-size: 100%;
}

.list-summary{
  padding: .2rem 0;
  font-size: .24rem;
  border-bottom: 1px solid #eee;
  border-top: 1px solid #eee;
  background: #fff;
}
.list-summary span{
  height: .4rem;
  line-height: .4rem;
  padding-left: .2rem;
  border-left: 2px solid #eb3e42;
  display: block;
  color: #000;
  font-size: .28rem;
}

/* .index-img {
  height: 3.71rem;
} */
</style>
