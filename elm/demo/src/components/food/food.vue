<template>
	<transition name="move-in">
		<div class="food-wrapper" v-show="showFlag" ref="foodwrapper">
			<div class="food-content">
				<div class="img-header">
					<img :src="food.image" alt="">
					<div class="bac" @click="hide">
						<i class="fa fa-angle-left"></i>
					</div>
				</div>
				<div class="content">
					<h1 class="title">{{food.name}}</h1>
					<div class="detail">
						<span class="sell-count">月销售{{food.sellCount}}份</span>
						<span class="rating">好评{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="now">￥{{food.price}}</span>
						<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
					</div>
					<div class="cartctrl-wrapper">
						<cartCtrl :food="food" v-on:cart-add="_drop($event)"></cartCtrl>
					</div>
					<transition name="fade">
						<div @click.stop.prevent="addFirst($event)" class="buy" v-show="!food.count ||food.count === 0">
							加入购物车
						</div>
					</transition>
					
				</div>
				<split v-show="food.info"></split>
				<div class="info" v-show="food.info">
					<h1 class="title">商品介绍</h1>
					<p class="text">{{food.info}}</p>
				</div>
				<split></split>
				<div class="ratings-wrapper">
					<h1 class="title">商品评价</h1>
					<ratingList :ratings="food.ratings" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" v-on:selectType="_selectType" v-on:onlyContentNew="_onlyContent"></ratingList>
					<div class="ratings-list">
						<ul v-show="food.ratings && food.ratings.length">
							<li v-for="item in food.ratings" class="rating-item" v-show="needShow(item.rateType, item.text)">
								<div class="user-info">
									<span class="user-name">{{item.username}}</span>
									<img class="avatar" :src="item.avatar" alt="" width="12" height="12">
								</div>
								<div class="time">{{item.rateTime | formatDate}}</div>
								<p class="text">
									<i class="fa" :class="{'fa-thumbs-up':item.rateType===0,'fa-thumbs-down':item.rateType===1}"></i>{{item.text}}
								</p>
							</li>
						</ul>
						<div class="no-ratings" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
					</div>
				</div>
				
				
			</div>

			
		</div>
	</transition>
	
</template>
<script>
	import BSrcoll from 'better-scroll';
	import cartCtrl from '../cartCtrl/cartCtrl';
	import split from '../split/split';
	import ratingList from '../ratingList/ratingList';
	import {formatDate} from '../../common/js/date';

	const POSITION = 0;
	const NAGETIVE = 1;
	const ALL = 2;

	export default {
		data() {
			return {
				showFlag: false,
				selectType: ALL,
				onlyContent: false,
				desc: {
					all: '全部',
					positive: '推荐',
					nagetive: '吐槽',
				}
			}
		},
		props: {
			food: {
				Object
			}
		},
		methods: {
			_drop(event) {
				this.$emit('cart-add',event)
			},
			_selectType(type) {
				this.selectType = type;
				this.$nextTick(() => {
					this.scroll.refresh()
				})
			},
			_onlyContent(flag) {
				this.onlyContent = flag;
				this.$nextTick(() => {
					this.scroll.refresh()
				})
			},
			show() {
				this.showFlag = true;
				this.$nextTick(() => {
					if (!this.scroll) {
						this.scroll = new BSrcoll(this.$refs.foodwrapper,{
							click:true,
						})
					}else{
						this.scroll.refresh()
					}
				})
			},
			hide() {
				this.showFlag = false
			},
			addFirst(event) {
				if (!event._constructed) return;
				this.$set(this.food,'count',1);
				this.$emit('cart-add',event.target)
			},
			needShow(type, text) {
				if (this.onlyContent && !text) return false
				if (this.selectType === ALL) {
					return true
				}else{
					return type === this.selectType
				}
			}
		},
		filters: {
			formatDate(time) {
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm');
			}
		},
		components: {
			cartCtrl,
			split,
			ratingList
		}


	}
</script>
<style lang="less">
	@import '../../common/less/minxin.less';

	.move-in-enter-active ,.move-in-leave-active{
		transition: all .4s;
		// transform: translate3d('0,0,0')
	}
	.move-in-enter ,.move-in-leave-to{
		transform: translate3d(100%,0,0) ;
	}
	.food-wrapper{
		position: fixed;
		top: 0;
		left: 0;
		bottom: 48px;
		z-index: 30;
		width: 100%;
		background-color: #fff;
		overflow: hidden;
		.img-header{
			position: relative;
			width: 100%;
			height: 0;
			padding-top: 100%;
			img{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
			.bac{
				position: absolute;
				left: 0;
				top: 0;
				.fa-angle-left{
					display: block;
					color: #fff;
					padding: 18px;
					font-size: 28px;
				}
			}
		}
		.content{
			position: relative;
			padding: 18px;
			.title{
				line-height: 14px;
				margin-bottom: 8px;
				font-size: 14px;
				font-weight: 700;
				color: rgb(7, 17, 27);

			}
			.detail{
				margin-bottom: 18px;
				line-height: 10px;
				font-size: 0;
				height: 10px;
				.sell-count, .rating{
					font-size: 10px;
					color: rgb(147, 153, 159)
				}
				.sell-count{
					margin-right: 12px;
				}
			}
			.price{
				font-weight: 700;
				line-height: 24px;
				font-size: 0;
				.now{
					margin-right: 8px;
					font-size: 14px;
					color: rgb(240, 20, 20)
				}
				.old{
					text-decoration: line-through;
					font-size: 10px;
					color: rgb(147, 153, 159); 
				}

			}
			.cartctrl-wrapper{
			position: absolute;
			right: 12px;
			bottom: 12px;

			}
			.fade-enter-active, .fade-leave-active{
				transition: all .4s
			}
			.fade-enter, .fade-leave-to{
				opacity: 0;
			}
			.buy{
				position: absolute;
				right: 18px;
				bottom: 18px;
				z-index: 10;
				line-height: 24px;
				height: 24px;
				padding: 0 12px;
				font-size: 10px;
				box-sizing: border-box;
				border-radius: 12px;
				color: #fff;
				background-color: rgb(0, 160, 220);
				font-weight: 700;


			}
		}
		.info{
			padding:18px; 
			.title{
				line-height: 14px;
				margin-bottom: 6px;
				font-size: 14px;
				color: rgb(7, 17, 27)
			}
			.text{
				font-size: 12px;
				color: rgb(77, 85, 93);
				line-height: 24px;
				padding: 0 8px;

			}
		}
		.ratings-wrapper{
			padding-top: 18px;
			.title{
				line-height: 14px;
				margin-left: 18px;
				font-size: 14px;
				color: rgb(7, 17, 27)
			}
			.ratings-list{
				padding: 0 18px;
				.rating-item{
					position: relative;
					padding: 16px 0;
					.border-1px(rgba(7,17,27,0.1));
					.user-info{
						position: absolute;
						right: 0;
						top: 16px;
						line-height: 12px;
						font-size: 0;
						.user-name{
							display: inline-block;
							vertical-align: top;
							font-size: 10px;
							margin-right: 6px;
							color: rgb(147, 153, 159)
						}
						.avatar{
							border-radius: 50%;
						}

					}
					.time{
						margin-bottom: 6px;
						line-height: 12px;
						font-size: 10px;
						color: rgb(7, 17, 27);

					}
					.text{
						line-height: 16px;
						font-size: 12px;
						color: rgb(7, 17, 27);
						.fa-thumbs-up, .fa-thumbs-down{
							line-height: 12px;
							margin-right: 4px;
							font-size: 12px;
						}
						.fa-thumbs-up{
							color: rgb(0, 160, 220)
						}
						.fa-thumbs-down {
							color: rgb(147, 153, 159)
						}
					}

				}
				.no-ratings{
					padding: 16px 0;
					font-size: 12px;
					color: rgb(147, 153, 159)
				}
			}  
		}
			

	}
</style>