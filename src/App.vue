<template>
  <div id="app">
  	<head-cnode></head-cnode>
  	<div class="router-view">
	  	<transition name="fade-opac">
	  		<router-view></router-view>
	  	</transition>
  	</div>
  </div>
</template>

<script>
import headCnode from './components/public/headCnode.vue'
export default {
  name: 'app',
  components: {
  	headCnode,
	}
}
</script>

<style lang="less">
  @import url("../static/css/m-reset.less");
</style>

<style>
.router-view{position: absolute;top: 20%;height: 80%;background: #fff;width: 100%;overflow-x: hidden;}

.fade-opac-enter-active,.fade-opac-leave-active{transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);}
.fade-opac-enter,.fade-opac-leave-active{opacity: 0;transform: scale(.5);}
</style>
