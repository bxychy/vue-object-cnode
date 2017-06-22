<template>
	<div class="create-topic-model" v-show="isSheetShow">
		<div class="create-topic-content">
			<span @click="selectTab(chang.value,chang.name)" v-for="chang in changs">{{chang.name}}</span>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				changs:[{
					name:'分享',
					value:'share'
				},
				{
					name:'问答',
					value:'ans'
				},
				{
					name:'招聘',
					value:'job'
				}]
			}
		},
		props:{
			isSheetShow:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			selectTab(val,name){
              this.$emit('selectTab',val,name)
            }
		}
	}
</script>

<style>
	.create-topic-model{position: fixed;top:0;background: rgba(0,0,0,.4);z-index: 2;width: 100%;height: 100%;}
	.create-topic-model .create-topic-content{width: 100%;height: auto;position: fixed;bottom:0;z-index: 3;background: #fff;}
	.create-topic-model .create-topic-content span{display: block;width: 100%;height: 30px;text-align: center;line-height: 30px;color: #666;}
	.create-topic-model .create-topic-content span:not(:last-child){border-bottom: 1px solid gainsboro;}
</style>