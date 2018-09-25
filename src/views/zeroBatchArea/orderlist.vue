<template>
        <Layout class="main">
            
            <van-nav-bar title="我的订单"  left-text="返回" @click-left="goBack"    left-arrow fixed> </van-nav-bar>
            <div class="content">       
                <van-tabs type="line" class="tabbox"  @change="changeTab">
                    <van-tab title="全部"> </van-tab>
                    <van-tab title="未付款"> </van-tab>
                    <van-tab title="待提货"> </van-tab>
                    <van-tab title="已提货"> </van-tab>
                </van-tabs>
                <div class="olist" v-if="active==0">
                    <div class="oitem">
                        <p class="pbox">订单编号：12345678900987654321 <span class="red">未付款</span></p>
                        <van-cell  is-link >
                            <div Slot="title">
                                <img :src="imageURL" alt="" class="goodsicon">
                                <img :src="imageURL" alt="" class="goodsicon">
                                <img :src="imageURL" alt="" class="goodsicon">
                            </div>
                        </van-cell>
                        <p class="price">2018-09-05 19:45:08 <span>共1件商品 <b>￥5.9</b></span></p>
                        <p class="pbox">提货单号：12345678900987654321 <van-button class="fl" size="small"  type="danger" plain>去付款</van-button></p>
                        
                    </div>
                    <div class="oitem">
                            <p class="pbox">订单编号：12345678900987654321 <span class="blank">交易关闭</span></p>
                            <van-cell  is-link >
                                <div Slot="title">
                                    <img :src="imageURL" alt="" class="goodsicon">
                                </div>
                            </van-cell>
                            <p class="price">2018-09-05 19:45:08 <span>共1件商品 <b>￥5.9</b></span></p>
                            <p class="pbox">提货单号：12345678900987654321 <van-button class="fl" size="small"  type="default" plain>删除</van-button></p>
                            
                        </div>
                </div>
                <div class="olist" v-if="active==1">
                    <div class="oitem">
                        <p class="pbox">订单编号：12345678900987654321 <span class="red">未付款</span></p>
                        <van-cell  is-link >
                            <div Slot="title">
                                <img :src="imageURL" alt="" class="goodsicon">
                                <img :src="imageURL" alt="" class="goodsicon">
                                <img :src="imageURL" alt="" class="goodsicon">
                            </div>
                        </van-cell>
                        <p class="price">2018-09-05 19:45:08 <span>共1件商品 <b>￥5.9</b></span></p>
                        <p class="pbox">提货单号：12345678900987654321 <van-button class="fl" size="small"  type="danger" plain>去付款</van-button></p>
                        
                    </div>
                    
                </div>
                <div class="olist" v-if="active==2">
                    <div class="oitem">
                        <p class="pbox">订单编号：12345678900987654321 <span class="red">待提货</span></p>
                        <van-cell  is-link >
                            <div Slot="title">
                                <img :src="imageURL" alt="" class="goodsicon">
                                <img :src="imageURL" alt="" class="goodsicon">
                                <img :src="imageURL" alt="" class="goodsicon">
                            </div>
                        </van-cell>
                        <p class="price">2018-09-05 19:45:08 <span>共1件商品 <b>￥5.9</b></span></p>
                        <p class="pbox">提货单号：12345678900987654321 <van-button class="fl" size="small"  type="danger" plain>确认提货</van-button></p>
                        
                    </div>
                   
                </div>
                <div class="olist" v-if="active==3">
                    
                    <div class="oitem">
                            <p class="pbox">订单编号：12345678900987654321 <span class="blank">交易完成</span></p>
                            <van-cell  is-link >
                                <div Slot="title">
                                    <img :src="imageURL" alt="" class="goodsicon">
                                </div>
                            </van-cell>
                            <p class="price">2018-09-05 19:45:08 <span>共1件商品 <b>￥5.9</b></span></p>
                            <p class="pbox">提货单号：12345678900987654321 <van-button class="fl" size="small"  type="default" plain>删除</van-button></p>
                            
                        </div>
                </div>
                
                <p class="nomore">没有更多订单了~~~</p>
            </div> 
            
    
    
            
        </Layout>
        
        
    </template>
    <script>
    
       
        import { querySmallBatch, getBehaviorCate, getBehaviorSupply } from '@/iao/home/query'
        import { Toast,NavBar,Icon,Tab, Tabs,Button,Panel,Cell  } from 'vant'
        
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
                },
                changeTab(e){
                  
                    this.active=e
                }
                
                
    
            },
            components: {
                [Tab.name]: Tab,
                [Cell.name]: Cell,
                [Tabs .name]: Tabs ,
                [NavBar.name]: NavBar,
                [Icon.name]: Icon ,
                [Button.name]: Button ,
                [Panel.name]: Panel  ,
              
            }
        }
    </script>
    <style rel="stylesheet/scss" lang="scss" scoped>
        .clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}
        .fl{
            float: right;
            margin-top: -7px;
        }
        .main {
            background-color: #f1f1f1;
            
        }
        .content{
            margin: 45px 0px 0 0; 
        }
        
        .tabbox{
            
            border-top: 1px solid #dddddd;
            border-bottom: 1px solid #dddddd;
            
        }
        .nomore{
            background-color: #fff;
            text-align: center;
            font-size: 12px;
            padding: 10px 0; 
            margin: 10px 0;
            border-top: 1px solid #dddddd;
            border-bottom: 1px solid #dddddd;
        }
        .goodsicon{
            width: 40px;
            height: 40px;
             
        }
        .pbox{
            padding: 12px  16px;
            border-top: 1px solid #dddddd;
            border-bottom: 1px solid #dddddd;
            background: #ffffff;
            font-size: 12px;
            span{
                font-size: 14px;
                float: right;
            }
            .red{
                color: red;
            }
            .blank{
                color: #333;
            }
        }
        .price{
            padding: 12px 16px;
            border-top: 1px solid #dddddd;
           
            background: #ffffff;
            font-size: 12px;
            span{
                font-size: 12px;
                font-weight:bold;
                float: right;
            }
            b{
                color: red;
                font-size: 14px;
            }
             
        }
        .oitem{
            margin-top: 10px;
        }
    
    </style>
    <style  rel="stylesheet/scss" lang="scss" >
    .oitem .van-cell__right-icon{
        line-height: 3 !important;
    }
    </style>