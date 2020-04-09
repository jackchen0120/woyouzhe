<!-- 弹框提示 -->
<template>
	<div id="qrcodePop" class="qrcodePop" v-show="isPopup">
		<div class="qrcode-box">
			<slot></slot>
		</div>
		<div id="mask" @click="closeBtn"></div>
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
		isPopup: Boolean
	},
	watch: {
		isPopup: function () {
			//this.isShow();
		}
	},
	methods: {
		/*isShow () {
			if (this.isPopup){
				Export.modalHelper.afterOpen();
			} else {
				Export.modalHelper.beforeClose();
			}
		},*/
		closeBtn () {
			this.$emit('showPopper');
			//Export.modalHelper.beforeClose();
		}
	},
	mounted () {
		//this.isShow();
	}
}
</script>

<style scoped>
#mask {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	height: 100%;
	width: 100%;
	z-index: 9999;
	background: rgba(0, 0, 0, .7);
}
.qrcode-box {
	position: fixed;
	top: 50%;
	left: 50%;
	width: 6rem;
	height: 7rem;
	margin-top: -3.5rem;
	margin-left: -3rem;
	display: flex;
    justify-content: space-between;
    flex-direction: column;
	background: #fff;
	border-radius: .2rem;
	z-index: 10000;
	overflow: hidden;
    text-align: center;
}
.qrcode-box h3 {
	width: 100%;
	height: auto;
	padding: .2rem 0;
	font-size: .32rem;
	color: #fff;
	background: #fc0786; 
	text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
/* .qrcode-box .qrcode-img {
	padding: .2rem;
} */
.qrcode-box img {
	width: 5.16rem;
	height: 5.16rem;
}
.qrcode-box .close-btn { 
    /* display: -moz-box;
    display: -webkit-box;
    display: box; */
    width: 100%;
    height: auto;
    padding: .2265rem 0;
    font-size: .32rem;
    border-top: 1px solid #ddd;
    background: #f2f2f2;
}
/* .close-btn span {
	display: block;
    -moz-box-flex: 1;
    -webkit-box-flex: 1;
    box-flex: 1;
    font-size: .32rem;
    cursor: pointer;
} */

.layer-cont {
	padding: .2rem .3rem 0 .3rem;
	line-height: .44rem;
    text-align: center;
}
.kouling-cont {
    position: relative;
    background: #fff4f8;
    padding: .2rem;
    margin: 0 auto;
    display: flex;
	align-items: center;
	justify-content: center;
}

#textarea {
	display: block;
    font-size: .24rem;
    width: 100%;
    height: 2.2rem;
    line-height: .28rem;
    color: #fc0786;
    background: #fff;
    resize: none;
    border: none;
　　outline: none;
　　overflow-x: hidden;
    word-wrap: break-word;
    word-break: break-all;
} 
.better-change{
	display: flex;
	align-items: center;
	justify-content: space-around;
}
.onecopy {
	width: 50%;
	padding: .25rem .0;
    background: #f8285c;
    text-align: center;
    margin: 0 auto;
    color: #fff;
    cursor: pointer;
    border-top: 1px solid #ddd;
    font-size: .32rem;
}
.kouling-tips p {
	display: block;
    border-bottom: 1px dotted #e5e5e5;
    padding: .15rem 0;
    text-align: justify;
    font-size: .28rem;
}
.kouling-tips i {
	color: #dd514c;
}
.kouling-tips p.nber {
	border-bottom: none;
}
</style>
