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
}
]

export default routes