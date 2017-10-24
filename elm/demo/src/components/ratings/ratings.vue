<template>
	<div class="ratings-content" ref="ratingsContent">
		<div class="overview">
			<div class="overview-left">
				<div class="score">{{seller.score}}</div>
				<div class="title">综合评分</div>
				<div class="rank">高于周边商家{{seller.rankRate}}%</div>
			</div>
			<div class="overview-right">
				<div class="score-wrapper">
					<span class="title">服务态度</span>
					<star :size="36" :score="seller.serviceScore"></star>
					<span class="score">{{seller.serviceScore}}</span>
				</div>
				<div class="score-wrapper">
					<span class="title">商品评分</span>
					<star :size="36" :score="seller.foodScore"></star>
					<span class="score">{{seller.foodScore}}</span>
				</div>
				<div class="delivery-wrapper">
					<span class="title">送达时间</span>
					<span class="delivery-time">{{seller.deliveryTime}}</span>
				</div>
			</div>
		</div>
		<split></split>
		<ratingList :ratings="ratings" :selectType="selectType" :onlyContent="onlyContent"  v-on:selectType="_selectType" v-on:onlyContentNew="_onlyContent"></ratingList>
		<div class="rating-wrapper">
			<ul>
				<li v-for="item in ratings" class="rating-item">
					<div class="avatar">
						<img :src="item.avatar" alt="" width="28" height="28">
					</div>
					<div class="content">
						<h1 class="username">{{item.username}}</h1>
						<div class="star-wrapper">
							<star :size="24" :score="item.score"></star>
							<span class="delivery-time" v-show="item.deliveryTime">item.deliveryTime</span>
						</div>
						<p class="text">{{item.text}}</p>
						<div class="recomend" v-show="item.recomend && item.recomend.length">
							<i class="fa fa-thumbs-up"></i>
							<span v-for="it in item.recomend">{{it}}</span>							
						</div>
						<div class="time">{{item.rateTime | formatDate}}</div>
					</div>
				</li>
			</ul>
		</div>
	</div>

</template>
<script>
import BSrcoll from 'better-scroll';
import star from '../star/star'
import split from '../split/split';
import ratingList from '../ratingList/ratingList';
import {formatDate} from '../../common/js/date';

	const POSITION = 0;
	const NAGETIVE = 1;
	const ALL = 2;
	const ERROR_OK = 0

	export default{
		data() {
			return { 
				ratings: [],  
				selectType: ALL,
				onlyContent: false,
				
			}
		},
		props: {
			seller: {
				type: Object
				
			}
		},
		mounted () {
		  this.$nextTick(function(){
		    this.getRatings();
		    
		  })
		  
		},
		methods: {
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
			_scroll() {
				this.scroll = new BSrcoll(this.$refs.ratingsContent, {
      		click: true,
      	})
			},
			getRatings() {
			  this.$http.get('/api/ratings').then((res) => {
			    if (res.body.erron === ERROR_OK) {
			      this.ratings = res.body.data; 
			      this.$nextTick(() => {
			        this._scroll()
			        console.log()
			      })
			    };
			  })
			},
		},
		filters: {
			formatDate(time) {
				let date = new Date(time)
				return formatDate(date, 'yyyy-MM-dd hh:mm')
			}
		},
		components: {
			star,
			split,
			ratingList,
		}
	}
</script>
<style lang="less">
	.ratings-content{
		position: absolute;
		top: 174px;
		left: 0;
		bottom: 0;
		width: 100%;
		overflow: hidden;
		.overview{
			display: flex;
			padding: 18px 0;
			.overview-left{
				flex: 0 0 137px;
				padding: 6px 0;
				width: 137px;
				border-right: 1px solid rgba(7, 17, 27, 0.1);
				text-align: center;
				@media only screen and (max-width: 320px) {
					flex: 0 0 120px;
					width: 120px;
				}
				.score{
					line-height: 28px;
					font-size: 24px;
					color: rgb(255, 153, 0);
					margin-bottom: 6px;
				}
				.title{
					line-height: 12px;
					font-size: 12px;
					color: rgb(7, 17, 27);
					margin-bottom: 8px;
				}
				.rank{
					font-size: 10px;
					line-height: 10px;
					color: rgb(147, 153, 159);
					
				}
			}
			.overview-right{
				flex: 1;
				padding: 6px 0 6px 24px;
				@media only screen and (max-width: 320px) {
					padding-left: 6px;
				}
				.score-wrapper{
					margin-bottom: 8px;
					font-size: 0;
					.title{
						display: inline-block;
						vertical-align: top;
						line-height: 18px;
						font-size: 12px;
						color: rgb(7, 17, 27);
					}
					.star{
						display: inline-block;
						vertical-align: top;
						margin: 0 12px;
					}
					.score{
						display: inline-block;
						vertical-align: top;
						line-height: 18px;
						font-size: 12px;
						color: rgb(255, 153, 0)
					}
				}
				.delivery-wrapper{
					font-size: 0;
					.title{
						line-height: 12px;
						font-size: 12px;
						color: rgb(7, 17, 27);
						margin-bottom: 8px;
					}
					.delivery-time{
						font-size: 12px;
						color: rgb(147, 153, 159);
						margin-left: 17px;
					}
				}
			}
		}
	}
	
</style>