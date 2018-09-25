<template>
    <Layout class="main">
        
        <van-nav-bar title="在线支付"  left-text="返回" @click-left="goBack"    left-arrow fixed> </van-nav-bar>
        <div class="content"> 
            <div class="stepBox">
                <van-steps :active="0" class="wd80">
                    <van-step>提交订单</van-step>
                    <van-step>在线付款</van-step>
                </van-steps>
                <p class="num">订单金额：<span>￥<b>5.9</b></span></p>
                <p class="info">订单提交成功，请在<span>30</span>分钟内完成支付。</p>
            </div>
               
            <div class="payway">
                支付方式：<img src="/static/images/wx.png" alt=""> <span>微信支付</span>
            </div>
            <div class="gobt">
                    <van-button type="danger" size="large">去付款</van-button>
            </div>
            
        </div> 



        
    </Layout>
    
    
</template>
<script>

   
    import { querySmallBatch, getBehaviorCate, getBehaviorSupply } from '@/iao/home/query'
    import { Toast,NavBar,Icon,Step, Steps,Button } from 'vant'
    
	export default {
		name: 'ZeroBatchArea',
        computed: {
            
            
        },
        data() {
			return {
				active: 0,
                checked:false,
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
            }
            
	        

        },
        components: {
	        [Step.name]: Step,
            [Steps .name]: Steps ,
            [NavBar.name]: NavBar,
            [Icon.name]: Icon ,
            [Button.name]: Button ,
          
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
    }
    .stepBox{
        background-color: #ecf8e4;
        margin-top: 1px;
        border-top: 1px solid #dddddd;
        border-bottom: 1px solid #dddddd;
        padding: 10px 0;
        .van-steps{
            background-color: #ecf8e4; 
        }
        
        
    }
    .payway{
        background: #fff;
        padding: 10px;
        font-size: 14px;
        margin: 10px 0px;
        border-top: 1px solid #dddddd;
        border-bottom: 1px solid #dddddd;
        color: #888;
        span{
            color:#333;
        }
        img{
            vertical-align: middle;
        }
    }
    .gobt{
        padding: 10px;
        position: fixed;
        bottom: 20px;
        width: 100%;
    }
    .wd80{
        width: 60%;
        margin: auto
    }
    .num{
        font-size: 16px;
        font-weight: bold;
        color: #333;
        text-align: center;
        span{
            color:#ff0000;
            b{
                font-size: 24px;
            }
        }
    }
    .info{
        text-align: center;
        padding: 5px 0;
        font-size: 14px;
        span{
            color:#ff0000;
        }
    }
    

</style>
<style  rel="stylesheet/scss" lang="scss" >
.van-step--horizontal .van-step__circle-container{
            background-color:#ecf8e4 !important;
        }
</style>