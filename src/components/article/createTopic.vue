<template>
	<div class="create-topic-wrap">
		<form class="create-form">
			<!--选择版块-->
			<div class="create-form-first">
				<div class="create-form-first-change">
					<label>版块</label>
                    <input @click="showModel" name="tab" :value="changeName" readonly placeholder="请点击选择板块">
				</div>
				<!--提交按钮-->
                <div class="create-form-first-btn">
                    <input :disabled="isDisabled" :class="{active:!isDisabled}" type="submit" value="提交">
                </div>
			</div>
			<!--标题-->
            <div class="create-form-title">
                <label>标题</label>
                <input @blur="checkTitle" type="text" name="title" v-model="topics.title" placeholder="标题不少于6个字" autocomplete="off" >
            </div>
            <!--内容-->
            <div class="create-form-content">
                <textarea @blur="checkContent" name="content" v-model="topics.content" placeholder="输入内容"></textarea>
            </div>
		</form>
		<!--弹框-->
        <action-sheet :isSheetShow="isModelShow" @selectTab="selectCreamTab"></action-sheet>
	</div>
</template>

<script>
	import actionSheet from './actionSheet'
	export default{
		data(){
			return{
				topics:{
					tab:'',
                	title:'',
                	content:''
				},
				changeName:'',
				isDisabled : true,
				isModelShow : false
			}
		},
		methods:{
			showModel(){
            	this.isModelShow = true;
         	},
         	checkTitle(){
            	if(this.topics.tab &&　this.topics.title.length>=6 && this.topics.content){
                 	this.isDisabled=false;
            	}else{
            		this.isDisabled=true;
            	}
         	},
         	checkContent(){
            	if(this.topics.tab && this.topics.title.length>=6 && this.topics.content){
                	this.isDisabled = false;
            	}else{
            		this.isDisabled=true;
            	}
         	},
         	selectCreamTab(val,name){
         		this.topics.tab=val;
         		this.changeName=name;
         		this.isModelShow = false;
         		if(this.topics.tab && this.topics.title.length>=10 && this.topics.content){
	                this.isDisabled = false
	           }
         	}
		},
		components:{
			actionSheet
		}
	}
</script>

<style>
	.create-topic-wrap{width: 100%;height: 100%;overflow-y: scroll;}
	.create-form{width: 100%;height: 100%;padding: 0;margin: 0;}
	
	.create-form-first{width: 100%;padding: 5px 10px;box-sizing: border-box;border-bottom: 1px solid gainsboro;display: flex;flex-flow: row nowrap;align-items: center;justify-content: space-between;}
	.create-form-first div{flex-grow: 1;}
	.create-form-first-change{flex-basis: 70%;display: flex;flex-flow: row nowrap;align-items: center;justify-content: flex-start;font-size: 14px;}
	.create-form-first-change label{flex-grow: 1;flex-basis: 30%;color: #666;}
	.create-form-first-change input{flex-grow: 1;flex-basis: 70%;color: #666;-webkit-tap-highlight-color: transparent;}
	.create-form-first-btn{flex-basis: 30%;text-align: right;}
	.create-form-first-btn input{-webkit-tap-highlight-color: transparent;background: transparent;color:rgba(30, 144, 255, .2);-webkit-tap-highlight-color: transparent;}
	.create-form-first-btn input.active{color: dodgerblue;}
	
	.create-form-title{width: 100%;padding: 5px 10px;box-sizing: border-box;border-bottom: 1px solid gainsboro;display: flex;flex-flow: row nowrap;align-items: center;justify-content: space-between;color:#666;font-size: 14px;}
	.create-form-title label{flex-grow: 1;flex-basis: 21%;}
	.create-form-title input{flex-grow: 1;flex-basis: 79%;color: #666;-webkit-tap-highlight-color: transparent;}
	
	.create-form-content{width: 100%;height: auto;border-bottom: 1px solid gainsboro;}
	.create-form-content textarea{width: 100%;min-height: 100px;padding: 5px 10px;box-sizing: border-box;-webkit-tap-highlight-color: transparent;}
	
</style>