<template>
	<div class="star" :class="startSize">
		<span v-for="item in itemClass" :class="item" class="star-item"></span>
	</div>
</template>
<script>
	const LENGTH = 5;
	const CLC_ON = 'on';
	const CLC_OFF = 'off';
	const CLC_HALF = 'half'

	export default{
		props: {
			size: {
				type:Number
			},
			score: {
				type:Number
			}
		},
		computed: {
			startSize() {
				return 'star-' + this.size
			},
			itemClass(){
				let res = [];
				let score = Math.floor(this.score*2)/2;
				let hasDecimal = score % 1 !== 0; 
				let integer = Math.floor(score);
				for (let i=0 ;i < integer; i++){
					res.push(CLC_ON)
				}
				if (hasDecimal) {
					res.push(CLC_HALF)
				}
				while(res.length < LENGTH){
					res.push(CLC_OFF)
				}
				return res
				
			}

		}
	}
</script>
<style lang="less">
@import '../../common/less/minxin.less';
	.star{
		font-size: 0;
		.star-item{
			display: inline-block;
			background: no-repeat;
		}
		&.star-48{
			.star-item{
				width: 20px;
				height: 20px;
				margin-right: 22px;
				background-size: 20px 20px;
				&.on{
					.bg-image('star48_on')
				}
				&.off{
					.bg-image('star48_off')
				}
				&.half{
					.bg-image('star48_half')
				}
				&:last-child{
					margin-right: 0;
				}
			}
		}
		&.star-36{
			.star-item{
				width: 15px;
				height: 15px;
				margin-right: 6px;
				background-size: 15px 15px;
				&.on{
					.bg-image('star36_on')
				}
				&.off{
					.bg-image('star36_off')
				}
				&.half{
					.bg-image('star36_half')
				}
				&:last-child{
					margin-right: 0;
				}
			}
		}
		&.star-24{
			.star-item{
				width: 10px;
				height: 10px;
				margin-right: 3px;
				background-size: 10px 10px;
				&.on{
					.bg-image('star24_on')
				}
				&.off{
					.bg-image('star24_off')
				}
				&.half{
					.bg-image('star24_half')
				}
				&:last-child{
					margin-right: 0;
				}
			}
		}
		
	}
	
</style>