<template>
	<!-- 弹框提示 -->
	<div id="errNotice" v-show="isNotice">
		<div class="errNoticeBox">
			<b></b>
			<p><slot></slot></p>
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
		isNotice: Boolean
	},
	watch: {
		isNotice: function(){
			//this.isShow();
		}
	},
	methods: {
		/*isShow () {
			if (this.isNotice) {
				Export.modalHelper.afterOpen();
			} else {
				Export.modalHelper.beforeClose();
			}
		}*/
	},
	mounted () {
		//this.isShow();
	}
}
</script>

<style scoped>
#errNotice {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	height: 100%;
	width: 100%;
	z-index: 10001;
	/* background: rgba(0, 0, 0, .7); */
}
.errNoticeBox {
	position: absolute;
	top: 50%;
	left: 50%;
	width: 3.14rem;
	height: 2rem;
	margin-top: -1rem;
	margin-left: -1.57rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: rgba(0, 0, 0, .8);
	border-radius: .2rem;
	z-index: 5;
	padding: 0 .24rem;
}
 .errNoticeBox > b {
	display: block;
	width: .44rem;
	height: .44rem;
	margin-bottom: .3rem;
	background: url(../assets/img/icon_fail.png) no-repeat center;
	background-size: 100%;
} 
.errNoticeBox > p {
	font-size: .3rem;
	color: #fff;
	letter-spacing: .05px;
	text-align: center;
}
</style>
