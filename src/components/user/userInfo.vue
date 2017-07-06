<template>
	<div class="user-info">
		<div class="login" v-if="usersInfo.loginname" >
	        <div class="avertar"><img v-if="usersInfo.avatar_url" :src="usersInfo.avatar_url"></div>
	        <div class="info">
	            <p v-if="usersInfo.loginname" v-text="usersInfo.loginname"></p>
	        	<div class="user-bottom">
	                <span class="user-time" >{{usersInfo.create_at | getTimeShow}}</span>
	                <span class="user-score">积分：{{usersInfo.score}}</span>
	            </div>
	        </div>
	  	</div>
	  	<div class="topics">
	    	<ul class="topics-tabs">
	    		<li class="br" :class='{"selected":selectItem === 1}' @click="changeItem(1)">最新发布</li>
	    		<li :class='{"selected":selectItem === 2}' @click="changeItem(2)">最近回复</li>
	    	</ul>
	    	<div class="topics-info" v-for="current in currentData">
	    		<div class="topics-img">
	    			<router-link class="headurl" :to="{name:'userInfo',params:{loginname:current.author.loginname}}">
	    				<img :src="current.author.avatar_url" />
	    			</router-link>
	    			<router-link class="topics-message" :to="{name:'topic',params:{id:current.id}}">
	    				<div class="t-title">{{current.title}}</div>
	    				<span class="l mt12">
	                        <span class="name">{{current.author.loginname}}</span>
	                    </span>
	                    <span class="r mt12">
	                        <span class="name">{{current.last_reply_at | getTime}}</span>
	                    </span>
	    			</router-link>
	    		</div>
	    	</div>
	    </div>
    </div>
    
</template>

<script>
	export default{
		data(){
			return{
				usersInfo:{},
				userName:'',
				currentData:[],
				selectItem: 1,
			}
		},
		created(){
            this.getInfo()
       	},
//     	mounted() {
//          this.getInfo();
//      },
        methods:{
            getUserInfo(){
            	this.userName=this.$route.params.loginname;
            	console.log(this.$route.params.loginname)
                this.$http.get(`/user/`+this.userName).then((res)=>{
                   	this.usersInfo = res.data.data
                	this.currentData = res.data.data.recent_replies;
                	console.log(res.data.data,this.currentData);
                }).catch((error)=>{
                    console.log(error)
                })
            },
            getInfo(){
            	if(this.$route.params.loginname){
            		this.userName=this.$route.params.loginname;
            		this.getUserInfo();
            	}else{
            		this.$router.push({ path:'/login'});
            	}
            },
            changeItem(index) {
                this.selectItem = index;
                this.currentData = index === 1 ? this.usersInfo.recent_replies : this.usersInfo.recent_topics;
            },
        },
        watch: {
            // 切换页面
            '$route' (to, from) {
                this.getInfo();
            }
        },
	}
</script>

<style>
	.mt12{margin-top:12px;}
	.login{width: 100%;background-color: #e7e7e7;text-align: center;height: 180px;}
/*	.user-info .avertar{width: 100px;height: 100px;border-radius: 50%;margin-top: 15px;display: inline-block;}
*/	.login .avertar img{width: 100px;height: 100px;border-radius: 50%;margin-top: 15px;display: inline-block;}

	
	.user-info .info .user-bottom{background-color: #e7e7e7;width: 100%;margin-top: 20px;overflow: hidden;}
	.user-info .info .user-bottom .user-time{width: 50%;float: left;}
	.user-info .info .user-bottom .user-score{width: 50%;float: left;text-align: right;padding-right: 10px;color: #80bd01;}
	
	.topics-tabs{width: 100%;height: 41px;list-style: none;position: relative;}
	.topics-img{width: 100%;margin: 10px 0;padding: 0 10px;display: flex;}
	
	.topics-tabs .br{border-right: 1px solid #d4d4d4}
	.topics-tabs li{width: 50%;padding: 12.5px 0;float: left;font-size: 16;text-align: center;font-weight: 700;}
	
	.topics-info .topics-img .headurl{display: inline-block;width: 45px;height: 45px;margin-right: 10px;border-radius: 10px;}
	.topics-info .topics-img .headurl img{width: 45px;border: 2px solid #fff6e6;border-radius: 50%;}
	.topics-info .topics-img .topics-message{overflow: hidden;display: block;width: 100%;flex: 1;}
	.topics-info .topics-img .topics-message .t-title{font-size: 16px;font-weight: 700;width: 100%;color: #333;}
	.topics-info .topics-img .topics-message .l{display: inline-block;width: 68%;}
	.topics-info .topics-img .topics-message .r{width: 30%;display: inline-block;text-align: right;}
	.topics-info .topics-img .topics-message .name{color: #626262;}
	.topics-info .topics-img .topics-message .r .name{color: #80bd01;font-size: 12px;}
</style>