<template>
	<div class="login-page">
		<span class="login-title">登录</span>
        <section class="page-body">
            <div class="label">
                <input class="txt" type="text" placeholder="Access Token" v-model="token" maxlength="36">
            </div>
            <div class="label">
                <a class="button" @click="login">登录</a>
            </div>
        </section>
        <transition name="fade">
        	<div v-if="show"  class="login-tip">{{tip}}</div>
        </transition>
    </div>
</template>

<script>
	export default{
		data(){
			return{
				token:'',
				tip:'',
				show:false,
			}
		},
		methods:{
			login(){
				if(this.token.length<36){
					this.tip='令牌格式错误,应为36位UUID字符串';
					this.show=true;
					setTimeout(()=>{this.show=false;},2000);
					return false;
//				}else{
//					this.tip='';
				}
				this.$http.post('/accesstoken/',{
					accesstoken:this.token
				}).then((res)=>{
					localStorage.setItem('username',res.data.loginname);
					sessionStorage.setItem('configToken',this.token);
                    console.log(res,this.$router);
//                  this.$router.push({ path:'/'});
                    this.$router.push({path:'/',query:{tab:'dev'}})
//                  this.$router.params.configToken=this.token;
                    this.$root.eventHub.$emit('judgeLogin', res.data.loginname);
				}).catch((error)=>{
		          	console.log(error);
		          	this.tip='您输入的UUID不正确请重新输入';
					this.show=true;
					setTimeout(()=>{this.show=false;},2000);
		        })
			}
		}
	}
</script>

<style>
.page-body{padding: 100px 15px 0px;min-height: 400px;background-color: #fff;}
.page-body .label{display: inline-block;width: 100%;margin-top: 15px;position: relative;left: 0;top: 0;}
.page-body .label .txt{padding: 12px 0;border: none;border-bottom: 1px solid #4fc08d;background-color: transparent;width: 100%;font-size: 14px;color: #313131;}
.page-body .label .button{display: inline-block;width: 99%;height: 42px;line-height: 42px;border-radius: 3px;color: #fff;font-size: 16px;background-color: #4fc08d;border: none;border-bottom: 2px solid #3aa373;text-align: center;vertical-align: middle;}

.login-tip{background:rgba(0,0,0,0.5);text-align:center;font-size:14px;color:#F1F1F0;padding:20px 0;position: absolute;bottom: 0px;width: 100%;}
.login-title{width: 100%;position: absolute;top: 0;font-size: 16px;text-align: center;padding: 10px 0;border-bottom: 1px solid #e8e8e8;}

.fade-enter-active, .fade-leave-active{transition: opacity .5s}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {opacity: 0}
</style>