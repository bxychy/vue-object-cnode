<template>
	<div class="article-node">
		<!--文章的tab bar-->
    	<article-list></article-list>
    	<!--文章列表路由-->
    	<transition name="fade-left">
        	<router-view :key="$route.query.tab"></router-view>
    	</transition>
	</div>
</template>

<script>
	import articleList from './articleList.vue'
	export default{
		data(){
			return{}
		},
		components: {
	      	articleList
	    }
	}
</script>

<style>
	.fade-left-enter-active,.fade-left-leave-active{transition: all .5s ease-in-out;}
    .fade-left-enter{transform: translate(100%);}
    .fade-left-leave-active{transform: translate(-100%);}
</style>