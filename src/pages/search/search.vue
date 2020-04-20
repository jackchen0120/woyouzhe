<template>
	<div id="app">
	  <div class="wrap">
	    <div class="top-menu" ref="ht">
	      <div class="flex-cont flex-nav">
	          <div class="nav-left">
	              <a href="javascript:;" @click="gotoBack"><i class="icon-back"></i></a>
	          </div>
	          <div class="nav-middle">
	              <form @submit.prevent="submitForm">
	                  <div class="top-search-div">
	                      <i class="icon-del" @click="delInputTxt" v-show="isIconShow"></i>
	                      <input class="top-search" 
	                             type="text" 
	                             @keyup="onEnter" 
	                             ref="input" 
	                             placeholder="搜索商品" 
	                             v-model="searchVal" 
	                             autocomplete="off"
	                             @focus="getFocus"
	                             maxlength="20" />
	                  </div>
	            </form>
	          </div>
	          <div class="nav-right" @click="searchSubmit(searchVal)">
	              <button class="search-submit">搜索</button>
	          </div>
	      </div> 
	    </div>
	    <div class="top-hr"></div>

	    <div @touchstart="touchStart">
	      <shop-list :isSearchInitData="isSearchInitData"></shop-list>
	    </div>
      
	    <!-- 搜索弹框提示 -->
	    <err-notice :isNotice="isNotice">
	      <span>{{noticeText}}</span>
	    </err-notice>

      <back-top></back-top>

	  </div>
	</div>
</template>

<script>
import Export from '@/assets/js/export'
import shopList from '@/components/shopList'
import errNotice from '@/components/errNotice'
import backTop from '@/components/backTop'

export default {
  components: {
    shopList,
    errNotice,
    backTop
  },
  data () {
    return {
      searchVal: '' || Export.getUrlParam().keyword,
      isIconShow: false,
      isNotice: false,
      noticeText: '',
      isSearchInitData: false
    }
  },
  methods: {
    gotoBack () {
      window.history.back(-1);
      this.isSearchInitData = true;
      this.searchVal = '';
    },
    searchSubmit (value) {
      value = value == undefined ? '' : value;
      let inputVal = Export.trim(value);

      if (inputVal == '') {
        this.isNotice = true;
        this.noticeText = '搜索框不能为空';

        setTimeout(() => {
          this.isNotice = false;
        }, 2000);
      } else {
        this.isIconShow = false;
        this.isSearchInitData = true;
        this.$refs.input.blur();
        window.location.href = `../woyouzhe/search?keyword=${inputVal}`;
      }
    },
    submitForm () {
      this.searchSubmit(this.searchVal);
    },
    delInputTxt () {
      this.searchVal = '';
      this.isIconShow = false;
      this.$refs.input.focus();
    },
    onEnter () {
      if (Export.trim(this.searchVal) != '') {
        this.isIconShow = true;
      } else {
        this.isIconShow = false;
      }
    },
    getFocus () {
      this.searchVal = this.searchVal == undefined ? '' : this.searchVal;
      if (Export.trim(this.searchVal) != '') {
        this.isIconShow = true;
      }
    },
    touchStart (e) {
      this.isSearchInitData = false;
      this.$refs.input.blur();
    }
  },
  created () {
    Export.rem();
    // 0.全部 1.女装 2.男装 3.内衣 4.母婴 5.化妆品 6.居家 7.鞋包配饰 8.美食 9.文体车品 10.数码家电
    if (Export.getUrlParam().category) {
      if (Export.getUrlParam().category == 1) {
        this.searchVal = '女装';
      } else if (Export.getUrlParam().category == 2) {
        this.searchVal = '男装';
      } else if (Export.getUrlParam().category == 3) {
        this.searchVal = '内衣';
      } else if (Export.getUrlParam().category == 4) {
        this.searchVal = '母婴';
      } else if (Export.getUrlParam().category == 5) {
        this.searchVal = '美妆';
      } else if (Export.getUrlParam().category == 6) {
        this.searchVal = '居家';
      } else if (Export.getUrlParam().category == 7) {
        this.searchVal = '鞋包';
      } else {
        this.searchVal = '';
      }
    }
  },
  mounted () {
    
  }
}
</script>

<style scoped>
.nav-left{
  padding: .16rem .3rem;
}
.nav-right {
  padding: .16rem .15rem;
}
.nav-right a {
  display: block;
}
.top-search{
  display: block;
  width: 100%;
  height: .6rem;
  padding: .1rem .7rem .1rem .2rem;
  font-size: .28rem;
  line-height: 1.5;
  border-radius: .08rem;
  -webkit-border-radius: .08rem;
  border: 1px solid #eee;
}
.top-search-div {
    position: relative;
}
.icon-del {
    position: absolute;
    top: 50%;
    right: 0;
    margin-top: -.3rem;
    width: .6rem;
    height: .6rem;
    background: url(../../assets/img/delete.png) no-repeat center;
    background-size: 100%;
    transform: scale(.6);
    -ms-transform: scale(.6);     /* IE 9 */
    -moz-transform: scale(.6);    /* Firefox */
    -webkit-transform: scale(.6); /* Safari 和 Chrome */
    -o-transform: scale(.6);  /* Opera */
}
.icon-back{
  width: .55rem;
  height: .55rem;
  display:block;
  background: url(../../assets/img/back.png) no-repeat center;
  background-size: 100%;
}

.search-submit{
  height: .55rem;
  display: block;
  font-size: .28rem;
  color: #fff;
  background: #fc0786;
  border: 0 none;
  cursor: pointer;
}
</style>

