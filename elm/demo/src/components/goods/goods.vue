<template>
	<div class="goods">
		<div class="menu-wrapper" ref='menuwrapper' >
			<ul >
				<li v-for="(item,index) in goods" class="menu-item" :class="{'curmenu':index===curIndex}" @click="selectMenu(index, $event)">
					
					<span class="text">
						<icon v-show="item.type>0" :iconType="2" :size="3" class="icon"></icon>
						{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref='foodswrapper'>
			<ul>
				<li v-for="item in goods" class="foods-list foods-list-hook" >
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="it in item.foods" class="foods-item" @click="selecrFood(it,$event)">
							<div class="icon">
								<img :src="it.image" width="57" height="57">
							</div>
							<div class="content">
								<h2>{{it.name}}</h2>
								<p class="desc">{{it.description}}</p>
								<div class="extra">
									<span class="count">月销售{{it.sellCount}}份</span>
									<span class="rating">好评率{{it.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{it.price}}</span>
									<span class="old" v-show="it.oldPrice">￥{{it.oldPrice}}</span>
								</div>
								<div class="cartctrl-wrapper">
									<cartCtrl :food="it" v-on:cart-add="_drop($event)"></cartCtrl>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shopCart ref="shopCart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopCart>
		<foodContent :food="selectedFood" ref="food" v-on:cart-add="_drop($event)"></foodContent>
	</div>
</template>
<script type="text/javascript">
import icon from '../icon/icon';
import shopCart from '../shopCart/shopCart';
import BSrcoll from 'better-scroll';
import cartCtrl from '../cartCtrl/cartCtrl';
import foodContent from '../food/food';


const ERROR_OK = 0
export default{
	props:{
		seller:{
			Object
		}
	},
	
	data() {
		return {
			goods:[],
			listHeight:[],
			scrollY: 0,
			selectedFood: {}
		}
	},
  mounted () {
    this.$nextTick(function(){
      this.getGoodsData();
      
    })
    
  },
  computed:{
  	curIndex() {
  		//计算高度差，判断返回scrollY所在的索引值
  		for( let i = 0; i < this.listHeight.length; i++){
  			let height1 = this.listHeight[i];
  			let height2 = this.listHeight[i+1];
  			if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
  				return i
  			};
  		}
  		return 0;
  	},
  	selectFoods() {
  		let foods = [];
  		this.goods.forEach((item) => {
  			item.foods.forEach((it) => {
  				if (it.count) {
  					foods.push(it)
  				};
  			})
  		})
			
  		return foods
  	}
  },
  methods:{
    getGoodsData() {
      this.$http.get('/api/goods').then((res) => {
        if (res.body.erron === ERROR_OK) {
          this.goods = res.body.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calHeight();
            
          })
        };
      })
    },
    
    _drop(event) {
    	this.$refs.shopCart.drop(event)
    		
    	
    },
    _initScroll() {
    	this.menuScroll = new BSrcoll(this.$refs.menuwrapper, {
    		click:true
    	})
    	this.foodsScroll = new BSrcoll(this.$refs.foodswrapper, {
    		click:true,
    		//开启实时监听滚动位置
    		probeType : 3
    	})
    	this.foodsScroll.on('scroll',(pos) => {
    		//获取监听滚动的位置
    		this.scrollY = Math.abs(Math.round(pos.y))
    	})
    },
    _calHeight() {
    	let footList = this.$refs.foodswrapper.getElementsByClassName('foods-list-hook')
    	let height = 0;
    	//计算每个foods-list的高度累加数组
    	this.listHeight.push(height)
    	for(let i of footList){
    		height+= i.clientHeight;
    		this.listHeight.push(height);
    	}
    	
    },
    selectMenu(index, event) {
    	//better-scroll派发事件的属性，原生的事件没有
    	if (!event._constructed) return;
    	let footList = this.$refs.foodswrapper.getElementsByClassName('foods-list-hook');
    	let el = footList[index]
    	//滚动到指定的位置，传入dom节点
    	this.foodsScroll.scrollToElement(el,300)
    },
    selecrFood(food,event){
    	if (!event._constructed) return;
    	this.selectedFood = food;
    	this.$refs.food.show()

    }


  },
  components: {
  	icon,
  	shopCart,
  	cartCtrl,
  	foodContent
  },
  // events: {
  // 	'cart.add'(target) {
  // 		this._drop(target)
  // 	}
  // }

}
</script>
<style lang="less">
	@import '../../common/less/minxin.less';
	.goods{
		display: flex;
		position: absolute;
		top: 174px;
		bottom: 46px;
		width: 100%;
		overflow: hidden;
		.menu-wrapper{
			flex: 0 0 80px;
			width: 80px;
			background-color: #f3f5f7;
			
			.menu-item{
				display: table;
				height: 54px;
				width: 56px;
				padding: 0 12px;
				line-height: 14px;
				&.curmenu{
					position: relative;
					margin-top: -1px;
					font-weight: 700;
				  background-color: #fff;
				  .text{
				  	.border-none
				  }
				}
				
				.text{
					display: table-cell;
					font-size: 12px;
					width: 56px;
					vertical-align: middle; 
					.border-1px(rgba(7,17,27,0.1));
					.icon{
						display: inline-block;
						width: 12px;
						height: 12px;
						vertical-align: top;
						background-size: 12px 12px;
						
					}
				}
			}
		}
		.foods-wrapper{
			flex: 1; 
			.title{
				padding-left: 14px;
				height: 26px;
				line-height: 26px;
				border-left: 2px solid #d9dde1;
				font-size: 12px;
				color: rgb(147, 153, 159);
				background-color: #f3f5f7;
			}
			.foods-item{
				display: flex;
				margin: 18px;
				padding-bottom: 18px;
				.border-1px(rgba(7,17,27,0.1));
				&:last-child{
					.border-none;
					margin-bottom: 0;
				}
				.icon{
					flex: 0 0 57px;
					margin-right: 10px;
				}
				.content{
					flex: 1;
					.name{
						font-size: 14px;
						height: 14px;
						line-height: 14px;
						margin-top: 2px;
						color: rgb(7, 17, 27)

					}
					.desc,.extra{
						
						line-height: 10px;
						font-size: 0px;
						color: rgb(147, 153, 159); 

					}
					.desc{
						margin: 8px 0;
						font-size: 10px;
						line-height: 12px;
					}
					.extra{
						.count,.rating{
							font-size: 10px;
						}
						.count{
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
						bottom: 12px;
						right: 0;
						z-index: 100
					}
				}
			}

		}
	}
	
</style>
