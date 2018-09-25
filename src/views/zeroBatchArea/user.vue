<template>
    <Layout class="main">
        
        <van-nav-bar title="个人中心"  left-text="返回" @click-left="goBack" @click-right="onClickRight"    left-arrow fixed>
                <van-icon name="home" slot="right" /> </van-nav-bar>
        <div class="content">
                <div class="userInfo">
                       
                      <div class="infomation clearfix">
                        <img src="/static/images/qq.png" >
                        <p class="bigp">zhangxueyou</p>
                        <p>15578898765</p>
                       
                        <span @click="show=true"><van-icon name="qr" /></span>
                      </div>
                </div> 
            <van-cell-group>
                    
                <van-cell title="全部订单" icon="pending-orders" is-link to="/orderlist" />
                <van-cell title="未付款" icon="cash-back-record" class="iconred" is-link to="/orderlist" />
                <van-cell title="待提货" icon="clock" class="iconyellow" is-link to="/orderlist" />
                <van-cell title="已提货" icon="passed" class="icongreen" is-link to="/orderlist" />
                    
            </van-cell-group>   
            <div class="bton">
                    <van-button size="large" type="danger" @click="onClickRight" plain class="mg">去购物</van-button>
                    <van-button size="large" class="mg" plain >退出当前账号</van-button>
            </div>
            
        </div> 


        <van-popup v-model="show">
            <img src="/static/images/qq.png" alt="">
        </van-popup>
    </Layout>
    
    
</template>
<script>

   
    import { querySmallBatch, getBehaviorCate, getBehaviorSupply } from '@/iao/home/query'
    import { Toast,Icon,Cell ,NavBar,CellGroup ,Button,Popup   } from 'vant'
    
	export default {
		name: 'ZeroBatchArea',
        computed: {
            
            
        },
        data() {
			return {
				active: 0,
                show:false,
                result:["a"],
                imageURL:"/static/images/qq.png"
            }
        },
        mounted() {
	        //this.init()
        },
        methods: {
            onClickMiniBtn() {
                
            },
            onClickBigBtn(){

            },
            goBack(){
                this.$router.back(-1)
            },
            onSubmit(){
                this.$router.push('/submit');  
            },
            onClickRight(){
                this.$router.push('/index');      
            }
            
	        

        },
        components: {
	      
            
            
            [Icon.name]: Icon ,
            [NavBar.name]: NavBar ,
            [Button .name]: Button  ,
            [Popup  .name]: Popup   ,
          
            [Cell .name]: Cell  ,
            [CellGroup .name]: CellGroup  
        }
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}
    
    .main {
        background-color: #f1f1f1;
        
    }
    .content{
        margin: 45px 0px;
       
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