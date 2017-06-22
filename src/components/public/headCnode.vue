<template>
    <div class="top">
        <div class="logo">
            <img src="../../../static/img/cnodejs_light.svg"/>
        </div>
        <div class="search">
            <form method="get" action="">
                <input type="text" class="search-input" name="wd" autocomplete="off"/>
            </form>
        </div>
        <div class="leder">
            <ul>
                <li v-for="(nav,index) in navs">
                    <router-link :to="nav.path" class="leder-a" tag="a">{{nav.name}}</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
	export default{
		data(){
			return{
				navs: [{
		        	path: '/',
		          	name: '首页'
		        }, {
		          	path: '/topic/create',
		          	name: '发布话题'
		        }, {
		          	path: '/my/message',
		          	name: '消息通知'
		        }]	
			}
		}
	}
</script>

<style>
	.top{position: fixed;top: 0;width: 100%;height: 20%;overflow: hidden;background-color: #444;text-align: center;z-index:100;}
	.top .logo{padding: 10px 0;}
	.top .logo img{width:30%;}
	.top .search .search-input{border-radius: 15px;width: 60%;height: 25px;background:url(../../../static/img/search.png) 5px 3px no-repeat #888;padding-left: 22px;}
	.top .search .search-input:hover{background-color: white;}
	.top .leder li{display: inline-block;padding: 10px 3%;}
	.top .leder li:hover{opacity:0.3;}
	.top .leder li .leder-a{color: white;}
</style>