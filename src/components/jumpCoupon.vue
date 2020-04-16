<template>
	<div id="jumpCoupon" v-show="isJumpCoupon" @click="closeCouponBtn">
		<div class="jumpCouponContent">
			<div><img src="../assets/img/jump_coupon.png" alt=""></div>
		</div>
	</div>
</template>

<script>

export default{
	data () {
		return{
			
		}
	},
	props: {
		isJumpCoupon: Boolean
	},
	methods: {
		closeCouponBtn () {
			this.$emit('showPopperCoupon');
		}
	},
	mounted () {
		
	}
}
</script>

<style scoped>
#jumpCoupon {
	position: fixed;	
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(0, 0, 0, .8);
	z-index: 100;
}
.jumpCouponContent {
	position: relative;
	height: auto;
	width: auto;
}
.jumpCouponContent > div {
    position: fixed;
    top: .2rem;
    right: 0;
    z-index: 101;
}

</style>
