<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar"> 
				<img :src="seller.avatar" alt="" width="64" height="64">
			</div>  
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					 {{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div v-if="seller.supports" class="support" >
					<icon class="icon" :iconType="seller.supports[0].type" :size="1"></icon>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
				<div v-if="seller.supports" class="support-wrapper" @click="detailShow =!detailShow">
					<span class="count">{{seller.supports.length}}个</span>

					<i class="icon fa fa-angle-right" ></i>
				</div>
			</div>
		</div>
		<div class="bulletin-wrapper" @click="detailShow =!detailShow">
			<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon fa fa-angle-right" ></i>
		</div>
		<div class="bg">
			<img :src="seller.avatar" alt="" width="100%" height="100%">
		</div>
		<transition name="fade">
			<div class="detail clearfix" v-if="detailShow">
				<div class="detail-wrapper">
					<div class="detail-main">
						<div class="name">{{seller.name}}</div>
						<div class="star-wrapper">
							<star :size="48" :score="seller.score"></star>
						</div>
						<div class="title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul v-if="seller.supports" class="supports">
							<li v-for="(index,item) in seller.supports" class="supports-item">
								<icon class="icon" :iconType="index.type" :size="2"></icon>
								<span class="text">{{index.description}}</span>

							</li>
						</ul>
						<div class="title">
							<div class="line"></div>
							<div class="text">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="bulletin">
							<p class="content">{{seller.bulletin}}</p>
						</div>
						
					</div>
				</div>
				<div class="detail-close" @click="detailShow=false">
					<i class="fa fa-times"></i>
				</div>
			</div>
		</transition>
		
	</div>
</template>
<script>
import 'font-awesome/css/font-awesome.css'
import star from '../star/star'
import icon from '../icon/icon'

export default{
	data(){
		return {
			classMap: [],
			detailShow: false,
		}
	},
	props: {
		seller: {
			type: Object,
		}
	},
	mounted:function  () {
	  this.$nextTick(function(){
	    this.classMap = ['decrease','discount','special','invoice','guarantee'];
	    
	  })
	  
	},
	methods:{
		
	},
	components:{
		star,
		icon
	}
	
}
</script>
<style lang="less">
	@import "../../common/less/index.less";

	.header{
		position: relative;
		background: rgba(7, 17, 27, 0.5);
		color: #fff;
		overflow: hidden;
		.content-wrapper{
			position: relative;
			padding: 24px 12px 18px 24px;
			font-size: 0;
			.avatar{
			 	display: inline-block;
			 	vertical-align: top;
			 	img{
			 		border-radius: 2px;
			 	}
			}
			.content{
			 	display: inline-block;
			 	font-size: 14px;
			 	margin-left: 16px;
			 	.title{
			 		margin: 2px 0 8px 0;
			 		font-size: 0;
			 		.brand{
			 			display: inline-block;
			 			vertical-align: top;
						width: 30px;
						height: 18px;
						.bg-image('brand');
						background-size: 30px 18px;
			 		}
			 		.name{
			 			margin-left: 6px;
			 			font-size: 16px;
			 			line-height: 18px;
			 			font-weight: bold;
			 		}
			 	}
			 	.description{
			 		margin-bottom: 10px;
			 		line-height: 12px;
			 		font-size: 12px;
			 	}
			 	.support{
			 		font-size: 0;
			 		.icon{
			 			display: inline-block;
			 			vertical-align: top;
			 			width: 12px;
			 			height: 12px;
			 			margin-right: 4px;
			 			background-size: 12px 12px;
			 			

			 		}
			 		.text{
			 			line-height: 12px;
			 			font-size: 10px;
			 		}
			 	}
			}
			.support-wrapper{
				position: absolute;
				right: 12px;
				bottom: 14px;
				padding: 0 8px;
				height: 24px;
				line-height: 24px;
				font-size: 0;
				border-radius: 14px;
				background-color: rgba(0, 0, 0, 0.2);
				text-align: center;
				.count{
					font-size: 10px;
				}
				.icon{
					font-size: 10px;
					margin-left: 2px;
				}
			}

		}
		.bulletin-wrapper{
			position: relative;
			height: 28px;
			line-height: 28px;
			padding: 0 22px 0 12px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			vertical-align: middle;
			background-color: rgba(7, 17, 27, 0.2);
			.bulletin-title{
				display: inline-block;
				width: 22px;
				height: 12px;
				vertical-align: top;
				margin-top: 9px;
				.bg-image('bulletin');
				background-size: 22px 12px;

			}
			.bulletin-text{
				font-size: 10px;
				line-height: 28px;
				margin: 0 4px;
			}
			.icon{
				position: absolute;
				right: 12px;
				top: 9px;
				font-size: 10px;

			}
		}
		.bg{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			z-index: -1;
			filter: blur(10px);	
		}
		.detail{

			position: fixed;
			top: 0;
			left: 0;
			z-index: 100;
			width: 100%;
			height: 100%;
			overflow: auto;
			background-color: rgba(7, 17, 27, 0.8);
			backdrop-filter: blur(2px);
			&.fade-enter-active, &.fade-leave-active {
			  transition: all .4s
			}
			&.fade-enter, &.fade-leave-to{
			  background-color: rgba(7, 17, 27, 0);
			  opacity: 0;
			}
			.detail-wrapper{
				min-height: 100%;
				width: 100%;
				.detail-main{
					padding-top: 64px;
					padding-bottom: 64px;
					.name{
						text-align: center;
						font-size: 16px;
						line-height: 16px;
						font-weight: 700;
					}
					.star-wrapper{
						margin-top: 18px;
						padding: 2px 0;
						text-align: center;
					}
					.title{
						display: flex;
						width: 80%;
						margin: 28px auto 24px;
						.line{
							flex: 1;
							position: relative;
							top: -6px;
							border-bottom: 1px solid rgba(255, 255, 255, 0.2)
						}
						.text{
							padding: 0 12px;
							font-weight: 700;
							font-size: 14px;
						}
						

					}
					.supports{
						width: 80%;
						margin: 0 auto;
						.supports-item{
							padding: 0 12px;
							margin-bottom: 12px;
							font-size: 0;
							&:last-child{
								margin-bottom: 0;
							}
							.icon{
								display: inline-block;
								width: 16px;
								height: 16px;
								vertical-align: top;
								margin-right: 6px;
								background-size: 16px 16px;
								&.decrease{
									.bg-image('decrease_2')
								}
								&.discount{
									.bg-image('discount_2')
								}
								&.guarantee{
									.bg-image('guarantee_2')
								}
								&.invoice{
									.bg-image('invoice_2')
								}
								&.special{
									.bg-image('special_2')
								}
							
							}
							.text{
								font-size: 12px;
								line-height: 16px;

							}
						}
						
					}
					.bulletin{
						width: 80%;
						margin: 0 auto;
						.content{
							padding: 0 12px;
							line-height: 24px;
							font-size: 12px;
						}
					}
				}
			}
			.detail-close{
				position: relative;
				width: 32px;
				height: 32px;
				margin: -64px auto 0;
				font-size: 32px;
				clear: both;

			}
		}

	}
</style>
