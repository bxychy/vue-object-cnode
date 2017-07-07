<template>
	<div class="article-detail" ref="articleDetail" @scroll="articleDetailTop($event)">
		<!--标题信息-->
		<div class="article-detail-title">
			<div class="article-title">
				<div class="article-title-header">
					<span class="author">
						作者 {{author.loginname}}
					</span>
                	<span class="origin">
                		来自：{{topics.tab | getTabName}}
                	</span>
				</div>
				<div class="article-title-titles">
	                <span v-show="topics.top || topics.good">
	                	{{topics.tab | getTabName(topics.top,topics.good)}}
	                </span>
	                <span class="title">
	                	{{topics.title}}
	                </span>
	            </div>
	            <div class="footer">
	            	<span>
	            		发布于{{topics.create_at | getTime}}
	            	</span>
	            	<span>
	            		最后编辑于 {{topics.last_reply_at | getTime}}
	            	</span>
	            	<span class="dot">
	            		{{topics.visit_count}}浏览
	            	</span>
	            </div>
			</div>
		</div>
		<!--内容详情-->
        <div class="article-content">
            <div v-html="topics.content"></div>
        </div>
        <!--回复-->
        <div class="article-reply">
        	<span class="reply-altogether">
        		{{replies.length}}条回复
        	</span>
        	<div class="reply-content" v-for="(reply,index) in replies">
        		<div class="reply-content-header">
        			<div class="author-avatar">
        				<img :src="reply.author.avatar_url">
        			</div>
        			<div class="name">
                        {{reply.author.loginname}}
                    </div>
                    <div class="floor">
                    	{{index+1}}楼
                    </div>
                    <div class="time">
                    	{{reply.create_at | getTime}}
                    </div>
                    <div class="icon">
		        		<span @click="replyUps(reply.id,$event)" class="iconfont icon-zan_light"></span>
		        		<span>{{reply.ups.length}}</span>
		            </div>
		            <div class="addReply_icon">
		            	<span class="iconfont icon-huifu1" @click="addReply(reply.id)" ></span>
		            </div>
        		</div>
        		<div class="reply-content-content" v-html="reply.content"></div>
        		<div class="reply-addReplyer" v-if="curReplyId === reply.id">
	            	<textarea v-model="articleCommentText1" placeholder="输入回复内容"></textarea>
	            	<a class="button" @click="addReply(reply.id,reply.author.loginname)">确定</a>
	            </div>
        	</div>
        </div>
		<!--评论-->
		<form class="article-comment">
            <textarea v-model="articleCommentText" placeholder="输入回复内容"></textarea>
            <input  :disabled="!articleCommentText.length" :class="{active:articleCommentText.length}" class="btn" value="提交" @click="addReply()">
        </form>
		<!--返回顶部-->
		<div class="article-top" v-show="articleTop" @click="goTop">回到顶部</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				author:{},
				topics:{},
				replies:[],
				articleTop:false,
				articleCommentText:'',
				articleCommentText1:'',
//				addReplyer:false,
				curReplyId:'',
				contentName:'',
			}
		},
		created(){
	      	this.getArticleDetail();
	    },
		methods:{
			getArticleDetail(){
				this.$http.get(`/topic/${this.$route.params.id}`,{
					params:{
						
		            }
				}).then((data)=>{
//					console.log(data,this.$route.params.id)
					this.author = data.data.data.author;
	             	this.topics = data.data.data;
	             	this.replies = data.data.data.replies;
				}).catch((error)=>{
	            	console.log(error);
	         	})
			},
			addReply(id,name){
				this.curReplyId = id;
				this.contentName = `@${name} `;
				console.log(this.articleCommentText1,id);
				if(id && this.articleCommentText1 && this.contentName){
					console.log('119',this.articleCommentText1,id,this.contentName);
					this.$http.post(`/topic/${this.$route.params.id}/replies`,{
		               accesstoken:sessionStorage.getItem("configToken"),
		               content: this.articleCommentText1+this.contentName,
		               reply_id:id,
		          	}).then((res)=>{
		              	this.articleCommentText1 = ''
		              	this.getArticleDetail();
		              	console.log(res.data)
		              	this.$refs.articleDetail.scrollTop =  this.$refs.articleDetail.scrollHeight
		          	}).catch((error)=>{
		              	console.log(error)
		              	this.$router.push({ path:'/login'});
		          	})
				}else{
					if(this.articleCommentText){
						console.log('133',this.articleCommentText);
						this.$http.post(`/topic/${this.$route.params.id}/replies`,{
			               accesstoken:sessionStorage.getItem("configToken"),
			               content: this.articleCommentText
			          	}).then((res)=>{
			              	this.articleCommentText = ''
			              	this.getArticleDetail();
			              	console.log(res.data)
			              	this.$refs.articleDetail.scrollTop =  this.$refs.articleDetail.scrollHeight
			          	}).catch((error)=>{
			              	console.log(error)
			              	this.$router.push({ path:'/login'});
			          	})
					}
	          	}
	       	},
	       	replyUps(id,event){
	          	this.$http.post(`/reply/${id}/ups`,{
	              accesstoken: sessionStorage.getItem("configToken"),
	          	}).then((res) => {
	             	if(res.data.action == 'up'){
	                	event.target.classList.remove('icon-zan_light')
	                	event.target.classList.add('icon-zan_fill')
	             	}else if(res.data.action == 'down'){
	                	event.target.classList.remove('icon-zan_fill')
	                	event.target.classList.add('icon-zan_light')
	             	}
	             	this.getArticleDetail()
	             	console.log(res.data)
	          	}).catch((error)=>{
	           		console.log(error)
	          	})
	       	},
			articleDetailTop(event){
//				console.log(event);
	          	var e=event.target.scrollTop
	          	if(e > 100) this.articleTop = true
	          	else this.articleTop = false
	       	},
			goTop(){
                var scrollTimer = setInterval(()=>{
	              	var osTop = this.$refs.articleDetail.scrollTop;
	              	var speed = Math.floor(-osTop/6)
//	              	console.log(speed,osTop);
	              	this.$refs.articleDetail.scrollTop = osTop + speed
	              	if(osTop == 0){
	                  	clearInterval(scrollTimer)
	                  	this.articleTop = false
	              	}
          		})
            }
		},
	}
</script>

<style>
	.article-detail{width: 100%;height: 100%;overflow-y: scroll;padding: 5px 10px;box-sizing: border-box;}
	
	.article-detail .article-title{border-bottom: 1px solid #f0f0fe}
	.article-detail .article-title .article-title-header{display: flex;flex-flow: row nowrap;align-items: center;justify-content: space-between;align-content: center;}
	.article-detail .article-title .article-title-header span{color: #999;font-size: 10px;}
	.article-detail .article-title .article-title-titles{margin: 6px auto;}
	.article-detail .article-title .article-title-titles span{font-size: 12px;display: inline-block;}
	.article-detail .article-title .article-title-titles span:first-child{display: inline-block;width: auto;height: auto;padding: 2px 5px;box-sizing: border-box;border-radius: 3px;background: #80bd01;color: #fff;}
	.article-detail .article-title .article-title-titles span:last-child{font-weight: bold;color: #666;}
	.article-detail .article-title .footer{color: #999;font-size: 12px;margin-bottom: 5px;}
	/*.article-detail .article-title .footer span{margin-right: 15px;position:relative;}*/
	.article-detail .article-title .footer span:before,.article-detail .article-title .footer span.dot:after{content:"•";}
	/*.article-detail .article-title .footer span.dot:after{position: absolute;top: 6px;right: -10px;content: "";display: block;width: 4px;height: 4px;border-radius: 50%;background: #999;}*/
	
	.article-content{margin: 10px auto;width: 100%;}
	blockquote{padding: 0 0 0 15px;margin: 0 0 20px;border-left: 5px solid #eee;font-size:14px;}
	.markdown-text p{font-size: 15px;line-height: 1.7em;overflow: auto;margin:1em auto;}
	.article-content ul{padding-left:20px;}
	.article-content li{font-size: 14px;list-style:disc;}
	
	
	.article-reply{border-top: 1px solid #999;width: 100%;padding-bottom: 32px;box-sizing: border-box;}
	.article-reply span.reply-altogether{display: block;width: 100%;color: #666;margin: 5px auto;font-size: 14px;}
	.article-reply .reply-content{width: 100%;border-bottom: 1px solid gainsboro;}
	 .reply-content-header{padding: 4px 0;box-sizing: border-box;width: 100%;display: flex;flex-flow: row nowrap;align-items: center;}
	 .reply-content-header .author-avatar{flex-grow: 0;width: 30px;height: 30px;text-align: center;line-height: 30px;border-radius: 50%;background: #f1f1f0;}
	 .reply-content-header .author-avatar img{width: 30px;height: 30px;border-radius: 50%;}
	 .reply-content-header .name{flex-grow: 0;margin-right: 10px;margin-left: 10px;font-size:14px;}
	 .reply-content-header .floor{flex-grow: 0;color:  #0088cc;font-size:14px;}
	/*.article-reply .reply-content .reply-content-header .floor:after{content:'';position: absolute;right:-8px;top:8px;background:  #0088cc;width: 5px;height: 5px;border-radius: 50%;}*/
	 .reply-content-header .floor:after{content:"•";}
	 .reply-content-header .time{flex-grow: 0;margin-left: 10px;color: #0088cc;font-size:14px;}
	 .reply-content-header .icon{flex-grow: 1;text-align: right;font-size:14px;}
	 .reply-content-header .addReply_icon{flex-grow: 0.2;font-size:14px;}
	 .reply-content-header .icon span{margin: 0;}
	 /*.reply-content-header .icon span:last-child{margin-left: 10px;}*/
	 .reply-content-header .addReply_icon span{color:#000;opacity:.8;display: block;text-align: center;}
	 .reply-content-content{padding: 4px 0;box-sizing: border-box;}
	.reply-addReplyer{}
	.reply-addReplyer textarea{display: block;width: 100%;flex: 1;border: 1px solid #d5dbdb;background-color: #fff;font-size: 14px;padding: 15px;color: #313131;}
	.reply-addReplyer .button{display: inline-block;width: 20%;height: 35px;margin: 15px 0;line-height: 35px;color: #fff;font-size: 16px;background-color: #08c;border: none;text-align: center;vertical-align: middle;}
	
	.article-top{width: 24px;color: gray;padding: 12px 0 12px 5px;display: block;position: fixed;cursor: pointer;text-align: center;z-index: 20;background-color: #fff;border-radius: 12px 0 0 12px;bottom:60px;right:0px;background-color: #f5f5f5;border: 1px solid #ccc;border-right: 0;}

	.article-comment{position: fixed;bottom: 0;width: 100%;height: 32px;margin-left: -10px;display: -webkit-flex; /* Safari */display: flex;}
	.article-comment textarea{flex-basis: 75%;height: 32px;width:75%;padding: 5px;box-sizing: border-box;border: 1px solid gainsboro;border-radius: 0;-webkit-tap-highlight-color: transparent;box-shadow: none;outline: none;resize: none;overflow: auto;}
	.article-comment input{height:32px;flex-basis: 25%;width:25%;border: none;background: rgba(29, 146, 237, 0.5);color: #fff;border-radius: 0;-webkit-tap-highlight-color: transparent;text-align:center;}
	.article-comment input.active{background: #1d92ed;color: #fff;}
</style>