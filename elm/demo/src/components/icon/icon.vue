<template>
	<span class="icon-bg" :class="classMap[iconType]"></span>
</template>
<script>
	export default {
		props: {
			iconType: {
				type: Number
			},
			size: {
				type: Number
			}
		},
		data() {
			return {
				classMap:[]
			}
		},
		mounted:function  () {
		  this.$nextTick(function(){

		    this.classMap = ['decrease-'+this.size,'discount-'+this.size,'special-'+this.size,'invoice-'+this.size,'guarantee-'+this.size];
		    
		  })
		  
		},
	}
</script>
<style lang="less">
	@import "../../common/less/index.less";
	

	.icon-bg{
		
		//size=1
		&.decrease-1{
			.bg-image('decrease_1')
		}
		&.discount-1{
			.bg-image('discount_1')
		}
		&.guarantee-1{
			.bg-image('guarantee_1')
		}
		&.invoice-1{
			.bg-image('invoice_1')
		}
		&.special-1{
			.bg-image('special_1')
		}
		//size=2
		&.decrease-2{
			.bg-image('decrease_2')
		}
		&.discount-2{
			.bg-image('discount_2')
		}
		&.guarantee-2{
			.bg-image('guarantee_2')
		}
		&.invoice-2{
			.bg-image('invoice_2')
		}
		&.special-2{
			.bg-image('special_2')
		}
		//size=3
		&.decrease-3{
			.bg-image('decrease_3')
		}
		&.discount-3{
			.bg-image('discount_3')
		}
		&.guarantee-3{
			.bg-image('guarantee_3')
		}
		&.invoice-3{
			.bg-image('invoice_3')
		}
		&.special-3{
			.bg-image('special_3')
		}

	}
</style>