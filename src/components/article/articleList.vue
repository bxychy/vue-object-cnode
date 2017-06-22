<template>
	<div class="">
		<div class="article-tab">
			<ul>
				<router-link class="list" :to="{path:'',query:{tab:tablist.tab}}" v-for="(tablist,index) in tabLists" :key="index" active-class="active" tag="li" exact><span>{{tablist.name}}</span></router-link>
			</ul>
		</div>
		<div class="article-list">
			<ul class="article-list-ul">
				<li v-for="(article,index) in articleLists" class="art-li">
					<!--第一行-->
					<div class="list-first">
						<router-link :to="{name:'user',params:{id:article.author.loginname}}" class="user-avatar">
	                        <img :src="article.author.avatar_url" class="headpic"/>
	                    </router-link>
	                    <div class="list-time">
	                    	{{article.last_reply_at | getTime }}
	                    </div>
                    </div>
                    <!--第二行-->
                    <router-link :to="{name:'topic',params:{id:article.id}}" class="list-title" tag="div">{{article.title}}</router-link>
					<!--第三行-->
					<div class="list-line">
						<!--tab-->
	                    <div class="tab">
	                        <span :class="{active:article.good || article.top}">{{article.tab | getTabName(article.top,article.good)}}</span>
	                    </div>
	                    <!--view-count-->
	                    <div class="view-count">
	                        <span>{{article.visit_count}}</span>
	                        <!--<span class="iconfont icon-chakan"></span>-->
	                    </div>
		                <!--reply_count-->
	                    <div class="reply-count">
	                        <span>{{article.reply_count}}</span>
	                        <!--<span class="iconfont icon-huifu"></span>-->
	                    </div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				limit:40,
				articleLists:[],
				tabLists:[{
					tab:"all",
			        name:"全部",
			   	},{
			    	tab:"good",
			        name:"精华",
			    },{
			        tab:"share",
			        name:"分享",
			    },{
			        tab:"ask",
			        name:"问答",
			    }]
			}
		},
		created(){
			this.getArticleList();
		},
		methods:{
			getArticleList(){
				var url=!this.$route.query.tab?`/topics?limit=${this.limit}`:`/topics?limit=${this.limit}&tab=${this.$route.query.tab}`;
//				console.log(url);
				this.$http.get(url).then((res)=>{
					this.$set(this.$data,"articleLists",res.data.data);
				}).catch((error)=>{
					console.log(error);
				})
			},
		},
		watch:{
			'$route' (to, from) {
	          // 对路由变化作出响应...
	//          this.reloadShow = false
	//          this.isListShow = true
	            //this.limit = 40
	            this.getArticleList();
        	}
		}
	}
</script>

<style>
	.article-tab{width: 100%;background: #f6f6f6;z-index:11;}
	.article-tab .list{display: inline-block;padding: 10px 5%;font-size: 15px;}
	.article-tab .list span{color: #80bd01;}
	.article-tab .list.active{background-color: #80bd01;}
	.article-tab .list.active span{color:#fff;}
	
	.article-list{width: 100%;height: 100%;padding-bottom: 42px;box-sizing: border-box;overflow-y: scroll;}
	.article-list .article-list-ul{width: 100%;}
	.article-list .article-list-ul .art-li{width: 100%;border-bottom: 1px solid #e1e1e1;padding: 0 10px;box-sizing: border-box;}
	.article-list .article-list-ul .art-li .list-first{display: flex;flex-flow: row nowrap;justify-content: space-around;align-items: center;padding: 5px 0;box-sizing: border-box;border-bottom: 1px dotted #f0f0f5;}
	.article-list .article-list-ul .art-li .list-first .user-avatar{flex-grow: 1;margin-left: 10px;}
	.article-list .article-list-ul .art-li .list-first .user-avatar .headpic{width: 20px;height: 20px;border-radius: 50%;border: 1px solid #f0f0f5;background: gainsboro;}
	.article-list .article-list-ul .art-li .list-first .list-time{flex-grow: 1;text-align: right;margin-right: 10px;color:#999;}

	.article-list .article-list-ul .art-li .list-title{overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;box-sizing: border-box;color: #666;border-bottom: 1px solid #f0f0f5;padding: 10px;box-sizing: border-box;}
	
	.article-list .article-list-ul .art-li .list-line{display: flex;flex-flow: row nowrap;justify-content: space-around;align-items: center;padding: 5px 0;box-sizing: border-box;}
	.article-list .article-list-ul .art-li .list-line .tab{flex-grow:5;margin-left: 10px;}
	.article-list .article-list-ul .art-li .list-line .tab span{display: inline-block;width: auto;height: auto;padding: 2px 5px;box-sizing: border-box;border-radius: 3px;background: gainsboro;color: #999;font-size: 12px;}
	.article-list .article-list-ul .art-li .list-line .tab span.active{background: #80bd01;color:#fff;}
	.article-list .article-list-ul .art-li .list-line .view-count,.article-list .article-list-ul .art-li .list-line .reply-count{flex-grow: 1;border-right: 1px solid #f0f0f5;text-align: center;color: #999;font-size: 14px;}
	/*.article-list .article-list-ul .art-li .list-line .view-count span.iconfont{font-size: 14px;margin-left: 5px;}*/
	
</style>