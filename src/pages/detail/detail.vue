<template>
  <div id="app">
	  <div class="wrap">
	    <div class="top-menu">
	      <div class="flex-cont flex-nav">
	          <div class="nav-left">
	              <a href="javascript:;" @click="gotoBack"><i class="icon-back"></i></a>
	          </div>
	          <div class="nav-middle">
	                <div class="top-title">商品详情</div>
	          </div>
	          <div class="nav-right">
	              <a href="javascript:;" target="_blank" @click="gotoHome"><i class="icon-home"></i></a>
	          </div>
	      </div> 
	    </div>
	    <div class="top-hr"></div>
	    
	    <div class="content" v-show="isShow">
	        <div class="item-good">
	            <div class="img-show">
	                <img :src="detailInfo.ImgUrl" :alt="detailInfo.GoodsName" onerror="../assets/img/lazy_default.png">
	            </div>
	            <div class="normal-list">
	                <h2>{{detailInfo.GoodsName}}</h2>
	                <div class="list-price">
	                    <div class="price-new">
	                      <em class="qhd">用券后</em><i>￥</i><span>{{detailInfo.LastPrice}}</span><i class="del">￥{{detailInfo.GoodsPrice}}</i>
	                    </div>
	                </div>
	            </div>
	            <a href="javascript:;" target="_blank" @click="taobaoDetail(detailInfo.GoodsLink)">图文详情（点击进入淘宝查看）</a>
	        </div>

	      <div class="item-recommend fix">
	          <h4>猜你喜欢</h4>
	          <div class="goods" id="goods">
	            <ul class="goods-list fix">
	              <li v-for="item in detailList">        
	                <a class="goods-a" :title="item.GoodsName" href="javascript:;" target="_blank" @click="gotoDetail(item.GoodsId)">
	                  <div class="goods-main">          
	                    <img class="lazy" :src="item.ImgUrl" onerror="../assets/img/lazy_default.png">
	                    <span class="icon new">热销</span>
	                  </div>
	                  <div class="goods-desc">
	                        <h3>
	                          <span>{{item.ly == 1 ? '天猫' : '淘宝'}}</span><em>|{{item.GoodsName}}</em>
	                        </h3>            
	                        <div class="list-price">                
	                          <span class="price-new"><i>￥</i>{{item.LastPrice}}</span><em class="del">￥{{item.GoodsPrice}}</em>
	                          <span class="only-time">{{item.SaleCount}}人在抢</span>            
	                        </div>
	                    </div>        
	                </a>        
	                <a rel="nofollow" :title="item.GoodsName" href="javascript:;" class="coupon-con" target="_blank" @click="gotoCoupon(item.GoodsId, item.ActLink)">
	                    <p>领券</p>
	                    <div class="quan-money">省<span>{{item.ActMoney}}</span>元</div>
	                    <div class="coupon-tit">去领券</div>
	                </a>    
	              </li>
	            </ul>
	          </div>
	      </div>

	      <div class="coupon-btn">
	          <a href="javascript:;" class="coupon-bottom" @click="gotoCouponBtn(detailInfo.ActLink)">去领券</a>
	      </div>
	    </div>

       <qrcode-pop :isPopup="isPopup" @showPopper="closeBtn">
        <h3>复制购买</h3>
        <div class="layer-cont">
            <div class="kouling-cont">
              <textarea id="textarea" readonly disabled>{{detailInfo.ActLink}}</textarea>
            </div>
            <div class="kouling-tips">
                <p><span>使用说明：</span><span>点击复制后打开<i>手机淘宝</i>，在输入框粘贴后打开哦~</span></p>
                <p class="nber"><span>温馨提示：</span><span>手机无<i>手机淘宝</i>，可在浏览器输入框中粘贴打开哦~</span></p>
            </div>
        </div>
        <div class="better-change">
          <div class="close-btn" @click="closeBtn" style="width:50%">关闭</div>
          <button type="button" class="onecopy" v-clipboard="detailInfo.ActLink" @success="handleSuccess" @error="handleError">一键复制</button>
        </div>
      </qrcode-pop>

	    <loading :isLoading="isLoading"></loading>

	    <sold-out :isOut="isOut">
	      <span>{{outText}}</span>
	    </sold-out>

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
import { 
  getShopDetail, 
  getShopList 
} from '@/assets/js/api'
import qrcodePop from '@/components/qrcodePop'
import loading from '@/components/loading'
import soldOut from '@/components/soldOut'
import errNotice from '@/components/errNotice'
import jumpCoupon from '@/components/jumpCoupon'
import backTop from '@/components/backTop'

export default {
  components: { 
    qrcodePop,
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
      detailList: {},
      isLoading: false,
      isShow: false,
      isOut: false,
      outText: '',
      isNotice: false,
      noticeText: '',
      isPopup: false,
      isJumpCoupon: false,
      ua: window.navigator.userAgent.toLowerCase()
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
      window.location.href = '../';
    },
    gotoCouponBtn (url) {
      if (this.ua.match(/MicroMessenger/i) == 'micromessenger') {
        this.isPopup = true;
      } else {
        window.location.href = url;
      }
    },
    closeBtn () {
      this.isPopup = false;
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
    gotoDetail (id) {
      window.location.href = `../detail?id=${id}`;
    },
    taobaoDetail (url) {
      if (this.ua.match(/MicroMessenger/i) == 'micromessenger') {
        this.isJumpCoupon = true;
      } else {
        window.location.href = url;
      }
    },
    gotoCoupon (id, url) {
      console.log('领券===',id)
      if (this.ua.match(/MicroMessenger/i) == 'micromessenger') {
        window.location.href = `../coupon?id=${id}`;
      } else {
        window.location.href = url;
      }
    },
    getDetailData () {
      let me = this;
      me.isLoading = true;
      me.isOut = false;

      getShopDetail(Export.getUrlParam().id)
      .then(res => {
        console.log('detail===', res)
        if (res.error == 0 && typeof(res.data) != undefined) {
          setTimeout(() => {
            me.isLoading = false;
          }, 2000)

          if (res.data) {
            me.isShow = true;
            me.detailInfo = res.data[0];
          } else {
            me.isShow = false;
            me.isOut = true;
            me.outText = '~_~抱歉，木有找到相关商品信息！';
          }
        } else {
          setTimeout(() => {
            me.isLoading = false;
          }, 2000)
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

    },
    getGuessLike() {
      getShopList(
        1, // 页码
        20, // 页数
        5,  // 排序
        0, // 类目
        null // 关键词搜索
      )
      .then(res => {
        console.log('getShopList===', res);
        if (res.error == 0 && typeof(res.data) != undefined) {
          this.detailList = res.data;
        }
      })
    }

  },
  created () {
    Export.rem();
    this.getDetailData();
    this.getGuessLike();
  },
  mounted () {

  }
}
</script>

<style scoped>
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
.content {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.item-good {
  position: relative;
  height: 100%;
  overflow: hidden;
}
.item-good a {
  color: #666;
  font-size: .3rem;
  display: block;
  text-align: left;
  margin: 0 .2rem;
  padding: .25rem 0;
  border-top: 1px solid #eee;
}
.img-show {
  position: relative;
}
.item-good .normal-list {
  margin: 0 .2rem;
}
.item-good h2 {
  color: #666;
  font-size: .3rem;
  font-weight: normal;
  padding-top: .1rem;
  text-align: justify;
}
.item-good .list-price {
  margin: 0 auto;
  text-align: center;
}
.item-good .list-price .price-new {
  font-size: .6rem;
  color: #f8285c;
  padding-bottom: .1rem;
}
.item-good .list-price em {
  color: #fff;
  display: inline-block;
  vertical-align: .1rem;
}
.item-good .list-price .price-new em.qhd {
  font-size: .24rem;
  padding: .02rem .1rem;
  line-height: .35rem;
  background: #F8285C;
  border-radius: .08rem;
}
.item-good .list-price .price-new i {
  font-size: .36rem;
}
.item-good .del {
  font-size: .28rem;
  color: #ababab;
  text-decoration: line-through;
  margin-left: .15rem;
}

.coupon-btn {
  position: fixed;
  bottom: 0;
  z-index: 99;
  width: 100%;
  max-width: 750px;
}
.coupon-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: .88rem;
  color: #fff;
  font-size: .36rem;
  background: #fc0786;
  text-align: center;
}

/* 猜你喜欢 */
.item-recommend {
  padding-bottom: 1rem;
}
.item-recommend h4 {
  font-size: .3rem;
  color: #666;
  text-align: center;
  background: #eee;
  padding: .2rem 0;
  font-weight: normal;
}
.item-recommend h4:before {
  content: '';
  display: inline-block;
  width: .32rem;
  height: .32rem;
  background: url(../../assets/img/link.png) no-repeat center;
  background-size: 100%;
  vertical-align: -2px;
  margin-right: .1rem;
}
.goods {
    width: 100%;
    height: 100%;
}
.goods-list {
    width: 100%;
    background: #fff;
    padding-bottom: 2%;
}
.goods-list li{
  position: relative;
  float: left;
  width: 47%;
  margin: 2% 0 0 2%;
  background: #fff;
}

.goods-list .goods-a {
    display: block;
    position: relative;
}
.goods-list li img {
    width: 100%;
    height: 3.52rem;
    position: relative;
    display: inherit;
}
 .goods-main {
    width: 100%;
    height: 3.52rem;
    background: #eee;
} 
.goods-main .icon{
  display: block;
  width: .56rem;
  height: .32rem;
  line-height: .32rem;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  color: #fff;
  font-size: .24rem;
  letter-spacing: -1px;
}
.goods-main .icon.new{
  background: #66cc99;
}
.goods-list li h3{
  width: 100%;
    font-size: .24rem;
    font-weight: 300;
    color: #808080;
    height: .46rem;
    line-height: .46rem;
    text-indent: .1rem;
    overflow: hidden;
    word-wrap: break-word;
    word-break: break-all;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
}
.goods-desc .list-price {
    width: 100%;
    line-height: 0;
    position: relative;
    bottom: 0;
    padding: 0 0 .6rem;
    background: #fff;
}
.goods-desc .price-new {
    font-size: .32rem;
    color: #F8285C;
}
.goods-desc .del {
    color: #b2b2b2;
    text-decoration: line-through;
    margin-left: .04rem;
    font-size: .24rem;
}

.goods-desc .only-time {
    display: block;
    position: absolute;
    top: .15rem;
    right: .05rem; 
    height: .28rem;
    line-height: .28rem;
    color: #b2b2b2;
    font-size: .2rem;
    text-align: right;
}
.coupon-con {
  display: block;
  position: absolute;
  right: 0;
  top: 0;
  width: 1.5rem;
  text-align: center;
  background: #ff4c66;
}
.coupon-con p {
  font-size: .20rem;
  color: #fff;
  padding: .05rem 0;
}
.coupon-con .coupon-tit {
  font-size: .24rem;
  color: #ff4c66;
  background: #fcff00;
  padding: .05rem 0;
}
.goods-list .quan-money {
  font-size: .24rem;
  padding-bottom: .05rem;
  color: #fff;
  text-align: center;
}
.goods-list .quan-money span {
  font-size: .32rem;
  padding: 0 .05rem;
}
</style>
