const routes = [{
	path:'/',
	component: function(resolve){
      require(['../components/article/articleList.vue'],resolve)
    },
},{
	path:'/topic/create',
	name:'topic-create',
	component: function(resolve){
    	require(['../components/article/createTopic.vue'],resolve)
 	}
},{
  	path: '/topic/:id',
  	name:'topic',
  	component: (resolve)=>{
    	require(['../components/article/articleDetail.vue'],resolve)
  	},
},{
  	path: '/login',
  	name:'login',
  	component: (resolve)=>{
    	require(['../components/public/login.vue'],resolve)
  	},
},{
  	path: '/userInfo/:loginname',
  	name:'userInfo',
  	component: (resolve)=>{
    	require(['../components/user/userInfo.vue'],resolve)
  	},
},{
  	path: '/message',
  	name:'message',
  	component: (resolve)=>{
    	require(['../components/user/message.vue'],resolve)
  	},
}
]

export default routes