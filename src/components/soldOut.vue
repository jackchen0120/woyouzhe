<template>
	<!-- 请求数据错误展示占位图 -->
	<div id="soldoutImg" v-show="isOut">
		<div class="soldoutImgContent">
			<div><img src="../assets/img/nodata_img.png" alt=""></div>
			<p>
				<slot></slot>
			</p>
		</div>
	</div>

</template>

<script>
import Export from '@/assets/js/export'

export default{
	data () {
		return {
			
		}
	},
	props: {
		isOut: Boolean
	},
	watch: {
		isOut: function () {
			this.isShow();
		}
	},
	methods: {
		isShow () {
			if (this.isOut) {
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
#soldoutImg {
	width: 100%;
	padding-top: 1rem;
	display: flex;
	justify-content: center;
	align-items: center;
	background: transparent;
}
.soldoutImgContent {
	position: relative;
	height: auto;
	width: auto;
}
.soldoutImgContent > div {
	width: 2rem;
	height: 2rem;
	margin: 0 auto;
	margin-bottom: .3rem;
}
.soldoutImgContent > p {
	display: block;
	font-size: .3rem;
	color: #393939;
	text-align: center;
}
</style>
