<template>
    <Layout class="main">
        
        <van-nav-bar title="个人中心"  left-text="返回" @click-left="goBack" @click-right="onClickRight"    left-arrow fixed>
                <van-icon name="home" slot="right" /> </van-nav-bar>
        <div class="content">
                <div class="userInfo">
                      
                      <div class="infomation clearfix">
                        <template v-if="userinfo">
                            <img :src="userinfo.head" >
                        <p class="bigp">{{userinfo.name}}</p>
                        <p>{{userinfo.mobile}}</p>
                        </template>
                        <template v-else>
                            <img  src="/static/images/qq.png" >
                            <p class="bigp">zhangxueyou</p>
                            <p>15578898765</p>
                        </template>
                       
                        <span @click="show=true"><van-icon name="qr" /></span>
                      </div>
                </div> 
                {{wxinfo}}
                {{userinfo}}
            <van-cell-group>
                    
                <van-cell title="全部订单" icon="pending-orders" is-link to="/orderlist" />
                <van-cell title="未付款" icon="cash-back-record" class="iconred" is-link to="/orderlist" />
                <van-cell title="待提货" icon="clock" class="iconyellow" is-link to="/orderlist" />
                <van-cell title="已提货" icon="passed" class="icongreen" is-link to="/orderlist" />
                    
            </van-cell-group>   
            <div class="bton">
                    <van-button size="large" type="danger" @click="onClickRight" plain class="mg">去购物</van-button>
                    <van-button size="large" class="mg" @click="onClickloginOut" plain >退出当前账号</van-button>
            </div>
            
        </div> 


        <van-popup v-model="show"> 
         
                <div id="qrcode">
                    <qrcode-vue :value="value"></qrcode-vue>
                </div>
           
            
        </van-popup>
    </Layout>
    
    
</template>
<script>

   
    import { loginOut } from '@/iao/home/query'
    import { Toast,Icon,Cell ,NavBar,CellGroup ,Button,Popup   } from 'vant'
    import QrcodeVue from 'qrcode.vue'
	export default {
		name: 'ZeroBatchArea',
        computed: {
            
            
        },
        data() {
			return {
                value:"123465",
				active: 0,
                show:false,
                result:["a"],
                imageURL:"/static/images/qq.png",
                wxinfo:JSON.parse(window.localStorage.getItem("wxinfo")),
                userinfo:JSON.parse(window.localStorage.getItem("userinfo"))
            }
        },
        mounted() {
            //this.init()
           
            this.value="https://www.hao123.com/"
            if(!this.userinfo){
               // this.$router.push('/loginment');
            }
        },
        methods: {
           
            onClickMiniBtn() {
                
            },
            onClickBigBtn(){

            },
            goBack(){
                this.$router.push('/index');
            },
            onSubmit(){
                this.$router.push('/submit');  
            },
            onClickRight(){
               
                this.$router.push('/index');
            },
            onClickloginOut(){
                //alert(JSON.parse(window.localStorage.getItem("wxinfo")).openid) 
               // return
                loginOut({
                   openId :this.wxinfo.openid
                }).then(res=>{
                    //alert(JSON.stringify(res))
                    window.localStorage.removeItem('userinfo');
                    this.$router.push('/loginment');
                    //console.log(res)
                })
            }
            
	        

        },
        components: {
            [Icon.name]: Icon ,
            [NavBar.name]: NavBar ,
            [Button .name]: Button  ,
            [Popup  .name]: Popup   ,
            [Cell .name]: Cell  ,
            [CellGroup .name]: CellGroup,
            QrcodeVue 
        }
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}
    
    .main {
        background-color: #f1f1f1;
        
    }
    .content{
        margin: 45px 0px 0 0;
       
        .infomation{
        background: #fff;
        padding: 10px;
        margin-bottom: 10px;
        position: relative;
        font-size: 14px;
        img {
            width:60px;
            height: 60px;
            border-radius: 50%;
            float: left;
        }
        
        p{
            padding-left: 70px;
            padding-top: 5px;
        font-size: 12px;
            color:#999;
           
        }
        p.bigp{
            color: #333;
            font-size: 14px;
        }   
        span{
            text-align: right;
            position: absolute;
            right: 15px;
            top: 30px;
            color:#999;
            font-size: 20px;
        }
    }
    }
    .bton{
        padding: 12px;
    }
    .mg{
        margin: 5px auto;
    }

</style>
<style  rel="stylesheet/scss" lang="scss">
    .icongreen{
        .van-icon-passed::before{
            color: #55bb22 !important;
        }
    }
    
    .iconred{
        .van-icon-cash-back-record::before{
            color: #ff0000;
        }
    }
    .iconyellow{
        .van-icon-clock::before{
            color: #f7c712;
        }
    }
</style>