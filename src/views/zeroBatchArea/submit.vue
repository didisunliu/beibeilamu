<template>
    <Layout class="main">
        
        <van-nav-bar title="确认订单"  left-text="返回" @click-left="goBack"    left-arrow fixed> </van-nav-bar>
        <div class="content"> 
            <div class="userInfo">
                <p class="hed">收货人：<input type="text" value="李小龙"> <input type="text" value="15588976565"></p>
                <p class="blank">提货地点：湖南省长沙市芙蓉区五一路 李小姐</p>
                <p class="red">自提点：芙蓉区罗家果店20083号 15618686565</p>
            </div>
                <van-card
                            title="标题"
                            desc="描述"  
                            num="2"
                            price="2.00"
                            :thumb="imageURL"
                          > 
                            <div slot="tags">
                                    <p class="redp">￥<big>9.9</big> <del>￥20</del></p>
                            </div>
                            <div slot="footer">
                                    <p class="redp">09月05日 16:00提货</p>
                            </div>
                          </van-card>
                          <van-card
                            title="标题"
                            desc="描述"  
                            num="1"
                            price="2.00"
                            :thumb="imageURL"
                          > 
                            <div slot="tags">
                                    <p class="redp">￥<big>9.9</big> <del>￥20</del></p>
                            </div>
                            <div slot="footer">
                                    <p class="redp">09月05日 16:00提货</p>
                            </div>
                          </van-card>

                          <div class="orderInfo">
                              <p class="tright">共2件商品 合计：<span>￥<big>9.9</big></span></p>
                              <p class="tright">应付金额：<span>￥<big>9.9</big></span></p>
                          </div>
            
        </div> 



        <van-submit-bar class="bt"
  :price="3050"
  button-text="提交订单"
  @submit="onSubmit"
/>
<van-popup v-model="show" position="bottom" :overlay="true">
    <div class="out">
        <p class="p1">此商品需要您到店自提，请仔细确认地址！</p>
        <p class="p2">提货地址：<b>湖南省长沙市雨花区同升街道碧水龙庭小超</b></p>
        <p class="p3">（自提点：雨花区碧水龙庭店10058店 15211688856）</p>
        <p class="p4">09月05号 16:00提货</p>
        <div class="btbox">
            <van-row gutter="10">
                <van-col span="12"><van-button size="large" type="default" plain>取消付款</van-button></van-col>
                <van-col span="12"><van-button size="large" type="danger" @click="goOnline" plain>确认订单</van-button></van-col>
            </van-row>
                      
            
            
        </div>
    </div>
  </van-popup>
    </Layout>
    
    
</template>
<script>

   
    import { querySmallBatch, getBehaviorCate, getBehaviorSupply } from '@/iao/home/query'
    import { Toast,NavBar,Icon,SubmitBar,Checkbox ,Cell,CheckboxGroup , Row, Col,SwipeCell,Stepper ,Card ,Popup,Button  } from 'vant'
    
	export default {
		name: 'ZeroBatchArea',
        computed: {
            
            
        },
        data() {
			return {
				active: 0,
                checked:false,
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
            onSubmit(){
                this.show=true;
            },
            goBack(){
                this.$router.back(-1)
            },
            goOnline(){
                this.$router.push("/online") 
            }
            
	        

        },
        components: {
	      
            
            [SubmitBar.name]: SubmitBar,
            [NavBar.name]: NavBar,
            [Icon.name]: Icon ,
            [Card.name]: Card  ,
            [Stepper.name]: Stepper   ,
            [CheckboxGroup.name]: CheckboxGroup ,
            [SwipeCell.name]: SwipeCell  ,
            [Cell.name]: Cell  ,
            [Popup.name]: Popup   ,
            [Button.name]: Button   ,
            [Col.name]: Col   ,
            [Row.name]: Row   ,
            [Checkbox.name]: Checkbox 
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
    }
    .out{
        padding: 10px;
        .btbox{
            text-align: center;
        }
        .p1{
            text-align: center;
            padding: 5px 0;
            border-bottom: solid 1px #eee;
            color: #888;
            font-size: 12px;
        }
        .p2{
            text-align: center;
            padding: 5px 0;
            color: #888;
            font-size: 12px;
            b{
                color:#333;

            }
        }
        .p3{
            text-align: center;
            padding: 5px 0;
            color: #888;
            font-size: 12px;
            
        }
        .p4{
            text-align: center;
            padding: 5px 0;
           
            color: #ff0000;
            font-size: 14px;
        }
    }
    .pdleft{
        padding-left: 1rem;
    }
    .goods{
        padding:0 10px;
        background: #fff;
       
        .van-card{
            background: #fff;
        }
    }
    .van-cell{
        padding: 10px 0px;
        border-bottom: 1px solid #f1f1f1;
        margin-bottom: 10px;
    }
    .del{
        background: #ff0000;
        display: inline-block;
        font-size: 1rem;
    width: 65px;
    height: 100%;
    line-height: 1;
    color: #fff;
    text-align: center;
    padding-top: 53px; 
    }
    .gcheckbox{
        width:22px;
        float: left;
        margin-right: 0px;
        line-height: 85px;
    }
    .redp{
            color:#ff0000;
            font-size: 12px;
            line-height: 20px;
            span{
                color:#888;
                float:right;
                b{
                    color: #ff0000;
                }
            }
            del{
                color: #999
            }
        }
    .orderInfo{
        background: #fff;
        padding: 10px;
        margin: 10px 0;
        text-align: right;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        .tright{
            color: #666;
        }
        span{
            color: #ff0000;
            big{
                font-size: 16px;
            }
        }
    }
    .userInfo{
        position: relative;
        background: #fff;
        padding: 10px;
        font-size: 12px;
        p{
            line-height: 1.5;
        }
        input{
            width:120px;
            height: 20px;
            border:solid 1px #eee;
            border-radius: 3px;
            padding: 3px;
        }
        .hed{
            color: #333;
        }
        .red{
            color: #ff0000
        }
        .blank{
            color: #999;
        }
    }
    .userInfo::after{
        content: '';
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    position: absolute;
    background: -webkit-repeating-linear-gradient( 135deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #3283fa 0, #3283fa 45%, transparent 0, transparent 50% );
    background: repeating-linear-gradient( -45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #3283fa 0, #3283fa 45%, transparent 0, transparent 50% );
    background-size: 80px;
    }
    .userInfo::before{
        content: '';
    left: 0;
    right: 0;
    top: 1px;
    height: 2px;
    position: absolute;
    background: -webkit-repeating-linear-gradient( 135deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #3283fa 0, #3283fa 45%, transparent 0, transparent 50% );
    background: repeating-linear-gradient( -45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #3283fa 0, #3283fa 45%, transparent 0, transparent 50% );
    background-size: 80px;
    }
</style>
<style rel="stylesheet/scss" lang="scss" >
.bt .van-button--danger{
        background-color: #5b2 !important;
        border: 1px solid #5b2 !important;
    }
</style>