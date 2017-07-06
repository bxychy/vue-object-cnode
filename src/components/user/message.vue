<template>
	<div class="message">
		<div class="message-page">
			<ul class="tabs">
                <li class="msg br" :class='{"selected":selectItem === 2}' @click="changeItem(2)">已读消息</li>
                <li class="msg" :class='{"selected":selectItem === 1}' @click="changeItem(1)">未读消息
                    <a href="##" v-show="unreadmessage>0" @click="getMarkAll"><img src="../../../static/img/check-6.png" /></a>
                </li>
            </ul>
            <div class="message-body markdown-body" v-for="mseg in currentData">
            	<div class="message-user">
            		<img class="head" :src="mseg.author.avatar_url" />
	            	<div class="message-info">
	            		<span class="l">
	        				<div class="name">{{mseg.author.loginname}}</div>
	                        <div class="name" v-if="mseg.type==='at'">在回复中@了您</div>
	                        <div class="name" v-if="mseg.type==='reply'">回复了您的话题</div>
	            		</span>
	            		<span class="r">
	            			<span class="name">{{mseg.create_at | getTime}}</span>
	            		</span>
	            	</div>
            	</div>
            	
            	<div class="message-reply_content" v-html="mseg.reply.content"></div>
            	<router-link :to="{name:'topic',params:{id:mseg.topic.id}}">
                    <div class="topic-title">话题：{{mseg.topic.title}}</div>
                </router-link>
            </div>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return{
			selectItem: 2,
			message:{},
			unreadmessage:0,
			currentData: [],
		}
	},
	created(){
		this.getAllMessage();
	},
	methods:{
		changeItem(index) {
            this.selectItem = index;
            this.currentData = index === 1 ? this.message.hasnot_read_messages : this.message.has_read_messages;
        },
        getMarkAll(){
        	if(sessionStorage.getItem("configToken")){
        		this.$http.post('/message/mark_all',{
	               accesstoken: sessionStorage.getItem("configToken")
	           	}).then((res)=>{
	           		if (res && res.data.success) {
                        this.$router.push({ path:'/message'});
                    }
	           		console.log(res,res.data.data,res.data.success);
//	           		this.message = res.data;
	           	}).catch((error)=>{
	                console.log(error)
	            })
        	}else{
        		this.$router.push({ path:'/login'});
        	}
        	
        },
        getAllMessage(){
        	this.$http.get('/messages?accesstoken='+ sessionStorage.getItem("configToken"),{
               accesstoken: sessionStorage.getItem("configToken")
          }).then((res)=>{
           		this.message = res.data.data;
           		this.unreadmessage=res.data.data.hasnot_read_messages.length;
//         		console.log(this.unreadmessage);
           		if (res.data.data.hasnot_read_messages.length > 0) {
                    this.currentData = res.data.data.hasnot_read_messages;
                    this.selectItem = 1;
                } else {
                    this.currentData = res.data.data.has_read_messages;
                }
//              console.log(res.data.data);
           	}).catch((error)=>{
                console.log(error)
            })
        }
	}
}
</script>

<style>
	.message-page .message-body,.message-page .tabs{border-bottom: 1px solid #d4d4d4;}
	.message-page .tabs{width: 100%;list-style: none;position: relative;overflow:hidden;}
	.message-page .tabs a img{width:17px;display:inline-block;}
	.message-page .tabs .msg{width: 50%;padding: 12.5px 0;float: left;font-size: 16px;text-align: center;border:1px solid transparent;}
	.message-page .tabs .msg.br{border-right: 1px solid #d4d4d4;}
	.message-page .tabs .msg.selected{color: #ff5a5f;border-bottom: 2px solid #ff5a5f;}

	/*.markdown-body *{box-sizing: border-box;}*/
	.markdown-body img{max-width: 100%;box-sizing: content-box;background-color: #fff;}
	.message-page .message-body{padding: 10px 0;}
	.message-page .message-body .message-user{width: 100%;margin: 10px 0;padding: 0 10px;display: flex;}
	.message-page .message-body .message-user .head{display: inline-block;width: 45px;height: 45px;margin-right: 10px;border-radius: 10px;}
	.message-page .message-body .message-user .message-info{overflow: hidden;display: block;width: 100%;flex: 1;}
	.message-page .message-body .message-user .message-info .l{display: inline-block;width: 68%;}
	.message-page .message-body .message-user .message-info .r{width: 30%;display: inline-block;text-align: right;}
	.message-page .message-body .message-user .message-info .name{display:inline-block;color: #626262;}
	.message-page .message-body .message-user .message-info .r .name{margin-top: 10px;color: #80bd01;font-size: 12px;}

	.message-reply_content{padding: 0 15px;margin-bottom: 15px;font-size:14px;}
	.topic-title{padding: 5px;margin: 15px;font-size: 18px;color: #2c3e50;line-height: 1.5;background-color: #f0f0f0;border-radius: 5px;}
</style>