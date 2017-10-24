<template>
	<div class="ratings">
		<div class="ratings-type">
			<span @click="select(2, $event)" class="block positive" :class="{'active':selectTypeNew===2}">
				{{desc.all}}<span class="count">{{ratings.length}}</span>
			</span>
			<span @click="select(0, $event)" class="block positive" :class="{'active':selectTypeNew===0}">
				{{desc.positive}}<span class="count">{{positive.length}}</span>
			</span>
			<span @click="select(1, $event)" class="block nagetive":class="{'active':selectTypeNew===1}">
				{{desc.nagetive}}<span class="count">{{nagetive.length}}</span>
			</span>
		</div>
		<div @click="toggleContent" class="switch" :class="{'on':onlyContentNew}">
			<i class="fa fa-check-circle"></i>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>

</template>
<script>
	const POSITION = 0;
	const NAGETIVE = 1;
	const ALL = 2;
	export default {
		data() {
			return {
				selectTypeNew: this.selectType,
				onlyContentNew: this.onlyContent,
			}
		},
		props: {
			ratings: {
				type: Array,
				default() {
					return []
				}
			},
			selectType: {
				type: Number,
				default: ALL,
			},
			onlyContent: {
				type: Boolean,
				default: false,
			},
			desc: {
				type: Object,
				default() {
					return {
						all: '全部',
						positive: '满意',
						nagetive: '不满意',

					}
				}
			}
		},
		computed: {
			positive() {
			  return this.ratings.filter((item) => {
					return item.rateType === POSITION;
				})
			},
			nagetive() {
				return this.ratings.filter((item) => {
					return item.rateType === NAGETIVE;
				})
			}
		},
		methods: {
			select(type, event) {
	    	if (!event._constructed) return;
	    	this.selectTypeNew = type;
	    	this.$emit('selectType',type)
			},
			toggleContent() {
				if (!event._constructed) return;
				this.onlyContentNew = !this.onlyContentNew;
	    	this.$emit('onlyContentNew',this.onlyContentNew)

			}
		}
	}
</script>
<style lang="less">
	@import '../../common/less/minxin.less';
	.ratings{
		.ratings-type{
			padding: 18px 0;
			margin: 0 18px;
			font-size: 0;
			.border-1px(rgba(7, 17, 27,0.1));
			.block{
				display: inline-block;
				padding: 8px 12px;
				border-radius: 2px;
				margin-right: 8px;
				color: rgb(77, 85, 93);
				font-size: 12px;
				line-height: 16px;
				&.active{
					color: #fff;
				}
				.count{
					font-size: 8px;
					margin-left: 2px;
				}
				&.positive{
					background-color: rgba(0, 160, 220, 0.2);
					&.active{
						background-color: rgb(0, 160, 220);
					}
				}
				&.nagetive{
					background-color: rgba(77, 85, 93, 0.2);
					&.active{
						background-color: rgb(77, 85, 93,);
					}
				}
			}
		}
		.switch{
			padding: 12px 18px;
			line-height: 24px;
			border-bottom: 1px solid rgba(7, 17, 27, 0.1);
			color: rgb(147, 153, 159 );
			font-size: 0;
			&.on{
				.fa-check-circle{
					color: #00c850;
				}
			}
			.fa-check-circle{
				display: inline-block;
				vertical-align: top;
				margin-right: 4px;
				font-size: 24px;
			}
			.text{
				display: inline-block;
				vertical-align: top;
				font-size: 12px;
			}
		}
	}
</style>