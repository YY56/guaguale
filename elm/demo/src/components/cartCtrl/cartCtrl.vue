<template>
	<div class="carctrl">
		<transition name="slide-fade">
		    <div class="cart-decrease fa fa-minus-circle" v-show="food.count>0" @click.stop.prevent="decreaseGoods"></div>
		</transition>
		
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-increase  fa fa-plus-circle" @click.stop.prevent="increaseGoods"></div>
	</div>
</template>
<script>
import Vue from 'vue'
	export default {
		props: {
			food: {
				type: Object
			}
		},
		methods: {
			increaseGoods(event) {
				if (!event._constructed) return;
				if (!this.food.count) {
					Vue.set(this.food,'count', 1);
				}else{
					this.food.count++
				}
				this.$emit('cart-add',event.target)
			},
			decreaseGoods() {
				if (!event._constructed) return;
				if (this.food.count) {
					this.food.count--
				}
			},

		}
	}
</script>
<style lang="less">
	.carctrl{
		font-size: 0;
		div{
			display: inline-block;
		}
		/* 可以设置不同的进入和离开动画 */
		/* 设置持续时间和动画函数 */
		.slide-fade-enter-active {
		  transition: all .6s cubic-bezier(1.0, 0.5, 0.8, 1.0);
		}
		.slide-fade-leave-active {
		  transition: all .6s cubic-bezier(1.0, 0.5, 0.8, 1.0);
		}
		.slide-fade-enter, .slide-fade-leave-to
		/* .slide-fade-leave-active for <2.1.8 */ {
		  transform: translateX(30px) rotate(180deg);
		  opacity: 0;
		}
		.cart-decrease,.cart-increase{
			font-size: 22px;
			line-height: 22px;
			padding: 6px;
			color: rgb(0, 160, 220);


		}
		.cart-count{
			font-size: 10px;
			vertical-align: top;
			width: 12px;
			padding-top: 6px;
			line-height: 24px;
			text-align: center;
			color: rgb(147, 153, 159)

		}
	}
	
</style>