<template>
	<div class="article-detail">
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
		        		<span>{{reply.ups.length}}</span>
		            </div>
        		</div>
        		<div class="reply-content-content" v-html="reply.content"></div>
        	</div>
        	
        </div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				author:{},
				topics:{},
				replies:[],
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
					console.log(data,this.$route.params.id)
					this.author = data.data.data.author;
	             	this.topics = data.data.data;
	             	this.replies = data.data.data.replies;
				}).catch((error)=>{
	            	console.log(error);
	         	})
			},
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
	
	.article-content{margin: 10px auto;width: 100%;border-top: 1px solid #e5e5e5;}
	blockquote{padding: 0 0 0 15px;margin: 0 0 20px;border-left: 5px solid #eee;font-size:14px;}
	.markdown-text p{font-size: 15px;line-height: 1.7em;overflow: auto;margin:1em auto;}
	.article-content ul{padding-left:20px;}
	.article-content li{font-size: 14px;list-style:disc;}
	
	
	.article-reply{border-top: 1px solid #999;width: 100%;padding-bottom: 32px;box-sizing: border-box;}
	.article-reply span.reply-altogether{display: block;width: 100%;color: #666;margin: 5px auto;font-size: 14px;}
	.article-reply .reply-content{width: 100%;border-bottom: 1px solid gainsboro;}
	.article-reply .reply-content .reply-content-header{padding: 4px 0;box-sizing: border-box;width: 100%;display: flex;flex-flow: row nowrap;align-items: center;}
	.article-reply .reply-content .reply-content-header .author-avatar{flex-grow: 0;width: 30px;height: 30px;text-align: center;line-height: 30px;border-radius: 50%;background: #f1f1f0;}
	.article-reply .reply-content .reply-content-header .author-avatar img{width: 30px;height: 30px;border-radius: 50%;}
	.article-reply .reply-content .reply-content-header .name{flex-grow: 0;margin-right: 10px;margin-left: 10px;font-size:14px;}
	.article-reply .reply-content .reply-content-header .floor{flex-grow: 0;color:  #0088cc;font-size:14px;}
	/*.article-reply .reply-content .reply-content-header .floor:after{content:'';position: absolute;right:-8px;top:8px;background:  #0088cc;width: 5px;height: 5px;border-radius: 50%;}*/
	.article-reply .reply-content .reply-content-header .floor:after{content:"•";}
	.article-reply .reply-content .reply-content-header .time{flex-grow: 0;margin-left: 10px;color: #0088cc;font-size:14px;}
	.article-reply .reply-content .reply-content-header .icon{flex-grow: 1;text-align: right;font-size:14px;}
	.article-reply .reply-content .reply-content-header .icon span{margin: 0;}
	.article-reply .reply-content .reply-content-header .icon span:last-child{margin-left: 10px;}
	
	.article-reply .reply-content .reply-content-content{padding: 4px 0;box-sizing: border-box;}


</style>