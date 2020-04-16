<template>
	<!-- loading预加载动画 -->
	<div id="loading" v-show="isLoading">
		<div class="loading-box">
			<div class="load-container load">
				<div class="loader">Loading...</div>
				<div class="loader-tit">正在加载...</div>
			</div>
			<!-- <img src="../assets/img/loading.gif" alt=""> -->
		</div>
	</div>
</template>

<script>
import Export from '@/assets/js/export'

export default {
	data () {
		return {
			
		}
	},
	props: {
		isLoading: Boolean
	},
	watch: {
		isLoading: function () {
			this.isShow();
		}
	},
	methods: {
		isShow () {
			if (this.isLoading) {
				Export.modalHelper.afterOpen();
			} else {
				Export.modalHelper.beforeClose();
			}
		}
	},
	mounted () {
		this.isShow();
	}
}
</script>

<style scoped>
#loading{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: #fff;
	z-index: 100;
}
.loading-box{
	position: absolute; 
	top: 50%;
	width: 100%; 
	height: 1rem;
	margin-top: -.5rem;   
}
.load-container {
    display: flex;
	justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
}
.load .loader {
  font-size: 0;
  text-indent: -9999rem;
  border-top: .05rem solid rgba(0, 0, 0, .1);
  border-right: .05rem solid rgba(0, 0, 0, .1);
  border-bottom: .05rem solid rgba(0, 0, 0, .1);
  border-left: .05rem solid #fc0786;
  -webkit-animation: load 1.1s infinite linear;
  animation: load 1.1s infinite linear;
}
.loader-tit {
  font-size: .36rem;
  color: #545454;
  margin-left: .3rem;
}
.load .loader,
.load .loader:after {
  border-radius: 50%;
  width: .5rem;
  height: .5rem;
}
@-webkit-keyframes load {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>