<template>
        <Layout class="main">
            
            <van-nav-bar title="售后申请"  left-text="返回" @click-left="goBack"    left-arrow fixed> </van-nav-bar>
            <div class="content">    
                <div>
                        <van-search
                        v-model="value"
                        placeholder="搜索"
                        show-action
                        @search="onSearch"
                      >
                        <div slot="action" @click="onSearch">搜索</div>
                      </van-search>
                </div>
                
                <van-tabs type="line" class="tabbox" @change="changeTab">
                    <van-tab title="售后申请"> </van-tab>
                    <van-tab title="申请记录"> </van-tab>
                 
                </van-tabs>
                <div class="olist" v-if="active==0">
                    <div class="oitem">
                        <p class="pbox">订单编号：12345678900987654321 <br>下单时间：2018-09-05 15:35:19 </p>
                     
                        <van-cell >
                            <div Slot="title" class="goodsItem clearfix">
                                <img :src="imageURL" alt="" class="goodsicon">
                                <p>商品汨罗一盆带水盆高30公分，长50cm吸水分</p>
                                <p>数量：2</p>
                            </div>
                        </van-cell>
                        <p class="price">客户名称：小超<span>联系电话：17786759786</span></p>
                        <p class="bbox clearfix"><van-button class="fl" size="small"  type="danger" plain>申请售后</van-button></p>
                        
                    </div>
                    <div class="oitem">
                        <p class="pbox">订单编号：12345678900987654321 <br>下单时间：2018-09-05 15:35:19 </p>
                     
                        <van-cell >
                            <div Slot="title" class="goodsItem clearfix">
                                <img :src="imageURL" alt="" class="goodsicon">
                                <p>商品汨罗一盆带水盆高30公分，长50cm吸水分</p>
                                <p>数量：2</p>
                            </div>
                        </van-cell>
                        <p class="price">客户名称：小超<span>联系电话：17786759786</span></p>
                        <p class="bbox clearfix"><van-button class="fl" size="small"  type="danger" plain>申请售后</van-button></p>
                        
                    </div>
                    
                </div>
                <div class="olist" v-if="active==1">
                    <div class="oitem">
                        <p class="pbox">订单编号：12345678900987654321 <br>下单时间：2018-09-05 15:35:19 </p>
                        
                        <van-cell >
                            <div Slot="title" class="goodsItem clearfix">
                                <img :src="imageURL" alt="" class="goodsicon">
                                <p>商品汨罗一盆带水盆高30公分，长50cm吸水分</p>
                                <p>数量：2</p>
                            </div>
                        </van-cell>
                        <p class="price">客户名称：小超<span>联系电话：17786759786</span></p>
                        <van-cell class="online"  is-link title="退款成功 | 您的售后订单已退款成功">
                            
                        </van-cell>
                        
                        
                    </div>
                </div>
                

                <p class="nomore">没有更多了~~~</p>
            </div> 
            
    
    
            
        </Layout>
        
        
    </template>
    <script>
    
       
        import { querySmallBatch, getBehaviorCate, getBehaviorSupply } from '@/iao/home/query'
        import { Toast,NavBar,Icon,Tab, Tabs,Button,Panel,Cell,Search  } from 'vant'
        
        export default {
            name: 'beila',
            computed: {
                
                
            },
            data() {
                return {
                    active: 0,
                    value: "",
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
                onSearch(){
    
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
                [Search.name]: Search  ,
              
            }
        }
    </script>
    <style rel="stylesheet/scss" lang="scss" scoped>
        .clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}
        .fl{
            float: right;
            }
        .main {
            background-color: #f1f1f1;
            
        }
        .content{
            margin: 45px 0px 0 0 ; 
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
            padding: 2px;
            border: solid 1px #ddd;
             
        }
        .goodsItem{
            img{
                float: left;
                margin-right: 10px;
            }
            p{
                font-size: 12px;
                line-height: 18px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
        .bbox{
            
            background-color: #fff;
            padding-right: 15px;
            padding-bottom: 10px;
        }
        .pbox{
            padding: 12px  16px;
            border-top: 1px solid #dddddd;
            border-bottom: 1px solid #dddddd;
            background: #ffffff;
            font-size: 12px;
            color: #888;
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
                float: right;
                color:#888;
            }
           
             
        }
        .online{
            background: #fae8c4;
            font-size: 12px;
        }
        .oitem{
            margin-top: 10px;
        }
    
    </style>
  