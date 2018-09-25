<template>
        <Layout class="main">
            
            <van-nav-bar title="首页"  left-text="返回" @click-left="goBack"    left-arrow fixed> </van-nav-bar>
            <div class="content">
                <div class="toptitle clearfix">
                    <div class="fleft"><img src="/static/images/logo.jpg" alt="">
                        点击修改头像
                    </div>    
                    <div class="fright">
                        <p>(00198658)长沙五一广场2号店</p>
                        <p class="blank">快来设置属于您自己的修改签名吧 <van-icon name="edit" /></p>
                    </div> 
                </div>

                <div class="totle">
                    <div class="title">
                        <h1>今日贝贝姆拉订单数</h1>
                        <p>订单总比：<span>12.5%</span></p>
                        <p>订单排名：<span>第18名</span></p>
                        <van-button type="warning" size="small"  plain class="fl">查看排名</van-button>
                    </div>
                    <div class="point">
                        <van-row>
                            <van-col span="8">
                               <span class="hotol">总订单数：15778</span> </van-col>
                            <van-col span="8" class="center"><van-circle
                                layer-color="#3386fa"
                                color="#f85"
                                v-model="currentRate"
                                :rate="12.5"
                                size="80px"
                                :speed="100"
                                :text="text"
                                :stroke-width="60"
                              /></van-col>
                            <van-col span="8"><span class="your">您的订单数：156</span></van-col>
                        </van-row>
                    </div>
                    <div class="result">
                        <p>今日收益（元）<span>46.5</span></p>
                        <p>累计收益（元）<span>5782.62</span></p>
                        
                    </div>
                </div>
                <div class="menu">
                    <div class="fline">
                        <van-row gutter="20">
                            <van-col span="8"><van-icon name="share c1" class="Iconf" @click="goPage(1)"/>商品分享</van-col>
                            <van-col span="8"><van-icon name="upgrade c2" class="Iconf" @click="goPage(6)"/>代客下单</van-col>
                            <van-col span="8"><van-icon name="after-sale c3" class="Iconf" @click="goPage(3)" />退货售后</van-col>
                        </van-row>
                    </div>
                    <div class="fline">
                        <van-row gutter="20">
                            <van-col span="8"><van-icon name="exchange c4" class="Iconf" @click="goPage(4)"/>我的提成</van-col>
                            <van-col span="8"><van-icon name="gold-coin c5" class="Iconf" @click="goPage(5)" />提现记录</van-col>
                            <van-col span="8"><van-icon name="pending-payment c6" class="Iconf" @click="goPage(6)" />订单管理</van-col>
                        </van-row>
                    </div>
                    <div class="fline">
                        <van-row gutter="20">
                            <van-col span="8"><van-icon name="pending-orders c7" class="Iconf" @click="goPage(7)" />销量比拼</van-col>
                            <van-col span="8"><van-icon name="points-mall c8" class="Iconf" @click="goPage(8)" />门店晒单</van-col>
                            <van-col span="8"><van-icon name="edit-data c9" class="Iconf" @click="goPage(9)" />快捷报单</van-col>
                        </van-row>
                    </div>
                    <div class="fline">
                        <van-row gutter="20">
                            <van-col span="8"><van-icon name="contact c10" class="Iconf" @click="goPage(10)" />查看会员</van-col>
                            <van-col span="8"><van-icon name="qr c11" class="Iconf" @click="goPage(11)"/>扫一扫</van-col>
                            <van-col span="8"><van-icon name="setting c12" class="Iconf" @click="goPage(12)" />修改密码</van-col>
                        </van-row>
                    </div>
                </div>
                <div class="erm">
                    <img src="/static/images/bb.png" alt="">
                </div>
            </div> 
            
    
    
            
        </Layout>
        
        
    </template>
    <script>
    
       
        import { querySmallBatch, getBehaviorCate, getBehaviorSupply } from '@/iao/home/query'
        import { Toast,NavBar,Icon,Button,Circle,Row, Col   } from 'vant'
        
        export default {
            name: 'ZeroBatchArea',
            computed: {
                
                
            },
            data() {
                return {
                    active: 0,
                    value: "",
                    checked:false,
                    result:["a"],
                    imageURL:"/static/images/qq.png",
                    text:"12.5%",
                    currentRate: 0
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
                onSearch(){
    
                },
                goBack(){
                    this.$router.back(-1)
                },
                goPage(d){
                    if(d==4){
                        this.$router.push('/myres'); 
                    }else if(d==3){
                        this.$router.push('/saleafter');  
                    }else if(d==10){
                        this.$router.push('/seeuser');  
                    }else if(d==6){
                        this.$router.push('/shoporder'); 
                    }
                    
                },
                changeTab(e){
                  
                    this.active=e
                }
                
                
    
            },
            components: {
             
                [NavBar.name]: NavBar,
                [Icon .name]: Icon ,
                [Button .name]: Button ,
                [Circle  .name]: Circle ,
                [Row  .name]: Row ,
                [Col  .name]: Col ,
               
              
            }
        }
    </script>
    <style rel="stylesheet/scss" lang="scss" scoped>
        .clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}
        .fl{
            position: absolute;
            right: 0;
            top: 0
          
        }
        .main {
            background-color: #f1f1f1;
            
        }
        .content{
            margin: 45px 0px 0 0 ; 
        }
        .toptitle{
            background: #ffffff;
            padding:10px 15px;
            line-height: 25px;
        }
        .erm{
            padding: 20px;
            text-align: center;
            background: #ffffff;
            img{
                width: 160px;
                height: 160px;
            }
        }
        .fleft{
            float: left;
            width: 60px;
           color: #999;
            img{
                width: 45px;
                margin:auto;
                height: 45px;
                display: block;
            }
        }
        .Iconf{
            font-size: 30px;
            display: block;
            padding-bottom: 10px;
            padding-top: 10px;
        }
        .fright{
            font-size: 14px;
            color: #333333;
        }
        .blank{
            font-size: 12px;
            color: #999;
        }
        .center{
            text-align: center;
        }
        .menu{
            background-color: #fff;
            margin-top: 10px;
        }
        .result{
            border-top: solid 1px #eee;
            margin-top: 10px;
            padding-top: 5px;
            p{
                color: #000;
                font-size: 14px;
                line-height: 22px;
                span{
                    float: right;
                    color: red;
                }
            }
        }
        .totle{
            padding: 10px  15px;
            margin-top: 10px;
            background: #ffffff;
            .title{
                position: relative;
                h1{
                    font-size: 12px;
                    color: #000;

                }
                p{
                    font-size: 12px;
                    span{
                        color: red;
                    }
                }

            }
            .your{
                color: #f85;
                position: relative;
                display: block;
                 width: 100%;
            }
            .your:before{
                position: absolute;
                content: '';
                display: block;
                width: 30%;
                border-top:solid 1px #f85;
                left:-30%;
                bottom: 5px;
            }
            .hotol{
                color: #3386fa;
                line-height: 80px;
                position: relative;
                display: block;
                 width: 100%;
            }
            .hotol::after{
                position: absolute;
                content: '';
                display: block;
                width: 25%;
                border-top:solid 1px #3386fa;
                right: -13%;
                bottom: 40px;
            }
        }
        .fline{
            padding: 10px 0px;
            text-align: center;
            height: 90px;
            font-size: 14px;
            border-bottom: solid 1px #eee;
            margin: 0 15px;
        }
        .c11{
            color: #00ac5e;
        }
        .c12{
            color: #897303;
        }
        .c1{
            color: #14a188;
        }
        .c2{
            color: #f85;
        }
        .c3{
            color: #32e549;
        }
        .c4{
            color: #fa4a04;
        }
        .c5{
            color: #52c046;
        }
        .c6{
            color: #1d8fe3;
        }
        .c7{
            color: #cab35b;
        }
        .c8{
            color: #c24646;
        }
        .c9{
            color: #dbd616;
        }
        .c10{
            color: #e5176b;
        }
        
    
    </style>
    <style  rel="stylesheet/scss" lang="scss" >
 
    </style>