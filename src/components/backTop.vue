<template>
	<!-- 返回顶部 -->
	<div id="back-top" v-show="isBackTop">
		<div class="back-top" @click="backTop">
			<img src="../assets/img/back_top.png">
		</div>
	</div>

</template>

<script>
import Export from '@/assets/js/export'

export default{
	data () {
		return {
			isBackTop: false,
      		scrolled: ''
		}
	},
	/*props: {
		isBackTop: Boolean
	},*/
	watch: {

	},
	methods: {
		backTop () {
			this.isBackTop = false;
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
		},
	    handleScroll () {
	      this.scrolled = document.body.scrollTop || document.documentElement.scrollTop;
	      if (this.scrolled > 300) {
	      	this.isBackTop = true;
	      } else {
	      	this.isBackTop = false;
	      }
	    }
	},
	mounted () {
		window.addEventListener('scroll', this.handleScroll);
	}
}
</script>

<style scoped>
.back-top {
  position: fixed;
  left: 50%;
  margin-left: 2.55rem;
  bottom: 1rem;
  z-index: 98;
  width: .88rem;
  height: .88rem;
  background: transparent;
}
.back-top img {
  display: block;
  height: .88rem;
}
</style>
