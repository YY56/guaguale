<template>
	<div class="shopCart">
 		<div class="content">
			<div class="content-left" @click="toggleList">
				<div class="logo-wrapper">
					<div class="logo" :class="{'hightlight':totalCount>0}">
						<i class="icon fa fa-cart-plus" :class="{'hightlight':totalCount>0}"></i>
					</div>
					<div class="count" v-show="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'hightlight':totalPrice>0}">￥{{totalPrice}}</div>
				<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right">
				<div class="pay" :class="payClass" @click="pay">{{payDesc}}</div>
			</div>
			<div class="ball-wrapper">
				<transition name="drop-transition" v-for="(item,index) in balls" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter" :key="index" >
					<div class="ball"  v-show="item.show"  >
						<div class="inner inner-hook"></div>
					</div>
				</transition>
			</div>
			<transition name="flod">
				<div class="shopcart-list" v-show="listShow">
					<div class="list-header">
						<h1 class="title">购物车</h1>
						<span class="empty" @click="empty">清空</span>
					</div>
					<div class="list-content" ref="listContent">
						<ul>
							<li v-for="item in selectFoods" class="food">
								<span class="name">{{item.name}}</span>
								<div class="price">
									<span>￥{{item.price*item.count}}</span>
								</div>
								<div class="cartctrl-wrapper">
									<cartCtrl :food="item"></cartCtrl>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</transition>
			
		</div>
		<transition name="fade">
			<div class="list-mask" v-show="listShow" @click="hideList">
				
			</div>
		</transition>
	</div>
	
</template>
<script language= "javaScript ">
	import cartCtrl from '../cartCtrl/cartCtrl';
	import BSrcoll from 'better-scroll';
	export default {
		data(){
			return {
				balls:[
					{
						show:false,
					},
					{
						show:false,
					},
					{
						show:false,
					},
					{
						show:false,
					},
					{
						show:false,
					},
				],
				dropBalls: [],
				flod: true
			}
		},
		props: {
			selectFoods: {
				type: Array,
				default() {
					return [
						{
							price: 8,
							count: 2,
						}
					]
				}
			},
			deliveryPrice: {
				type: Number,
				default: 0
			},
			minPrice: {
				type: Number,
				default: 0
			}

		},
			
		computed: {
			totalPrice() {
				let total = 0;
				this.selectFoods.forEach((item) => {
					total += item.price*item.count
				})
				return total;
			},
			totalCount() {
				let count = 0;
				this.selectFoods.forEach((item) =>{
					count += item.count 
				})
				return count
			},
			payDesc() {
				if (this.totalPrice === 0) {
					return `￥${this.minPrice}元起送`;
				}else if (this.totalPrice < this.minPrice){
					let diff = this.minPrice - this.totalPrice;
					return `还差￥${diff}元起送`;
				}else{
					return '去结算'
				}
			},
			payClass() {
				if (this.totalPrice < this.minPrice) {
					return 'not-enough'
				}else{
					return 'enough'
				}
			},
			listShow() {
				if (!this.totalCount) {
					this.flod = true;
					return false
				}else{
					let show = !this.flod
					if (show) {
						this.$nextTick(() => {
							if (!this.scroll) {
								this.scroll = new BSrcoll(this.$refs.listContent,{
									click: true
								})
							}else{
								this.scroll.refresh()
							}
							
						})
					};
					return show
				}

			}
		},
		methods: {
			toggleList() {
				if (!this.totalCount) return
				this.flod = !this.flod
			},
			hideList() {
				this.flod = true
			},
			empty() {
				this.selectFoods.forEach((item) => {
					item.count = 0;
				})
			},
			pay() {
				if (this.totalPrice < this.minPrice) return
				// this.flod = true;
				window.alert('支付')
			},
			drop(el) {
				for( let i = 1; i< this.balls.length; i++) {
					let ball = this.balls[i];
					if (!ball.show) {
						ball.show = true;
						ball.el = el;
						this.dropBalls.push(ball);
						return
					};
				}
			},
			beforeEnter(el) {
				let count = this.balls.length;
				while(count--) {
					let ball = this.balls[count];
					if (ball.show) {
						let rect = ball.el.getBoundingClientRect();
						let left = (rect.left - 32);
						let top = -(window.innerHeight - rect.top - 22-15);
						el.style.webkitTransform = `translate3d(0,${top}px,0)`
						el.style.transform = `translate3d(0,${top}px,0)`
						let inner = el.getElementsByClassName('inner-hook')[0]
						inner.style.webkitTransform = `translate3d(${left}px,0,0)`
						inner.style.transform = `translate3d(${left}px,0,0)`
					};


				}

			},
			enter(el,done) {
				/* eslint-disable no-unused-vars */
        let rf = el.offsetHeight; //触发重绘html
        this.$nextTick(() => { //让动画效果异步执行,提高性能
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          //处理内层动画
          let inner = el.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done); //Vue为了知道过渡的完成，必须设置相应的事件监听器。
        });
			},
			afterEnter(el) {
				let ball = this.dropBalls.shift();
				if (ball) {
					ball.show = false;
					el.style.display = 'none'
				};
			},

		},
		components:{
			cartCtrl
		}
	}
</script>
<style lang="less">
@import '../../common/less/minxin.less';
	.shopCart{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 48px;
		z-index: 300;
		 
		.content{
			display: flex;
			background-color: #141d27;
			.content-left{
				flex:1;
				font-size: 0;
				.logo-wrapper{
					display: inline-block;
					position: relative;
					top: -10px;
					margin: 0 12px;
					padding: 6px;
					width: 56px;
					height: 56px;
					border-radius: 50%;
					box-sizing: border-box;
					vertical-align: top;
					background-color: #141d27;
					.logo{
						width: 100%;
						height: 100%;
						border-radius: 50%;
						background-color: #2b343c;
						text-align: center;
						&.hightlight{
							background-color: rgb(0, 160, 220);
						}
						.icon{
							font-size: 24px;
							line-height: 44px;
							color: #80858a;
							&.hightlight{
								color: #fff;
							}
						}

					}
					.count{
						position: absolute;
						top: 0;
						right: 0;
						width: 24px;
						height: 16px;
						line-height: 16px;
						text-align: center;
						border-radius: 16px;
						font-size: 9px;
						font-weight: 700;
						color: #fff;
						background-color: rgb(240, 20, 20);
						box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
					}

				}
				.price{
					display: inline-block;
					vertical-align: top;
					margin-top: 12px;
					line-height: 24px;
					box-sizing: border-box;
					padding-right: 6px;
					border-right: 1px solid rgba(255, 255, 255, 0.1);
					font-size: 16px;
					font-weight: 700;
					color: rgba(255, 255, 255, 0.4);
					&.hightlight{
						color: #fff;
						font-size: 20px;
					}


				}
				.desc{
					display: inline-block;
					vertical-align: top;
					line-height: 24px;
					margin: 12px 0 0 2px;
					color: rgba(255, 255, 255, 0.4);
					font-size: 10px;

				}
			}
			.content-right{
				flex: 0 0 105px;
				width: 105px;
				.pay{
					height: 48px;
					font-size: 12;
					line-height: 48px; 
					text-align: center;
					color: rgba(255, 255, 255, 0.4);
					font-weight: 700;
					&.not-enough{
						background-color: #2b333b;
					}
					&.enough{
						background-color: #00ba3c;
						color: #fff;
					}
				}
			}
			.ball-wrapper{
				.ball{
					position: fixed;
					left: 32px;
					bottom: 22px;
					z-index: 200;
					transition: all .4s cubic-bezier(0.49, -0.13, 0.45, 0.41);
					.inner{
						width: 18px;
						height: 18px;
						border-radius: 50%;
						background-color: rgb(0, 160, 220);
						transition: all .4s ;

					}
					

				}
			}
			.flod-enter-active, .flod-leave-active{
				transition: all .5s ;
			}

			.flod-enter, .flod-leave-to{
				transform: translate3d(0,100%,0)
			}
			.shopcart-list{
				position: absolute;
				left: 0;
				bottom:48px;
				z-index: -1;
				width: 100%;
				.list-header{
					height: 40px;
					line-height: 40px;
					padding: 0 18px;
					background-color: #f3f5f7;
					border-bottom: 1px solid rgba(7, 17, 27,0.1);
					.title{
						float: left;
						font-size: 17px;
						color: rgb(7, 17, 27)
					}
					.empty{
						float: right;
						font-size: 12px;
						color: rgb(0, 160, 220)
					}


				}
				.list-content{
					padding: 0 18px;
					max-height: 217px;
					overflow: hidden;
					background-color: #fff;
					.food{
						position: relative;
						padding: 12px 0;
						box-sizing: border-box;
						.border-1px(rgba(7, 17, 27,0.1))
						.name{
							line-height: 24px;
							font-size: 14px;
							color: rgb(7, 17, 27);
						}
						.price{
							position: absolute;
							right: 90px;
							bottom: 12px;
							line-height: 24px;
							font-size: 14px;
							font-weight: 700;
							color: rgb(240, 20, 20)
						}
						.cartctrl-wrapper{
							position: absolute;
							right: 0;
							bottom: 6px
						}
						 
					}


				}

			}
			
		}
	}
	.list-mask{
		position: fixed;
		left: 0;
		top: 0;
		z-index: -2;
		width: 100%;
		height: 100%;
		background-color: rgba(7, 17, 27, 0.6);
		backdrop-filter: blur(2px)	
	}
	.fade-enter-active, .fade-leave-active{
		transition: all .4s;
	}
	.fade-enter ,.fade-leave-to{
		opacity: 0;
		background-color: rgba(7, 17, 27, 0);

	}
</style>