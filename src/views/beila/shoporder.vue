<template>
        <Layout class="main">
            
            <van-nav-bar title="订单管理"  left-text="返回" @click-left="goBack"    left-arrow fixed> </van-nav-bar>
            <div class="content">    
                <!-- <div>
                        <van-search
                        v-model="value"
                        placeholder="提货单号、手机号、收货人、微信昵称查询"
                        show-action
                        @search="onSearch"
                      >
                        <div slot="action" @click="onSearch">搜索</div>
                      </van-search>
                </div> -->
                
                <van-tabs type="line" v-model="active" class="tabbox" @change="changeTab">
                    <van-tab title="消费者订单"> </van-tab>
                    <van-tab title="代客下单"> </van-tab>
                    <van-tab title="待提货"> </van-tab>
                   
                </van-tabs>
                <div class="olist" >
                    <van-list v-model="loading" :finished="finished" @load="onLoad">
                    <template v-for="item in list" >
                        <div>
                            <div class="oitem">
                                <p class="pbox">订单编号：{{item.orderCode}} <span class="red">{{states[item.state]}}</span></p>
                                <van-cell  is-link @click="goToDetail(item)" >
                                    <div Slot="title"> 
                                        <img v-for="v in item.details" :src="v.mainPictureUrl | imageURL" class="goodsicon">
                                       
                                    </div>
                                </van-cell>
                                <p class="price">{{item.createTime}} <span>共{{_num}}件商品 <b>￥{{((item.totalMoney + (item.deliveryType == 2 ? item.despatchMoney : 0)) / 100.0).toFixed(2)}}</b></span></p>
                                <p class="pbox" v-if="item.state==2 || item.state==3"> 提货单号：{{item.pickupCode}} <van-button class="fl" size="small"  type="danger" v-if="item.state==2" @click="getOrder(item)" plain>去提货</van-button>
                                <van-button class="fl" size="small"  type="default" v-if="item.state==1 && item.deleted == 1" plain @click="delOrder(item)">删除</van-button>
                                <van-button class="fl" size="small"  type="danger" @click="goToPay(item)" v-if="item.state==1" plain>去付款</van-button>
                                </p>
                                
                            </div>
                        </div>
                    </template>
                </van-list>
                    <!-- <div class="oitem">
                        <p class="pbox">订单编号：12345678900987654321 <span class="red">待提货</span></p>
                        <van-cell  is-link >
                            <div Slot="title">
                                <img :src="imageURL" alt="" class="goodsicon">
                                <img :src="imageURL" alt="" class="goodsicon">
                                <img :src="imageURL" alt="" class="goodsicon">
                            </div>
                        </van-cell>
                        <p class="price">2018-09-05 19:45:08 <span>共1件商品 <b>￥5.9</b></span></p>
                        <p class="pbox"><b>张小小</b> <br> 提货单号：12345678900987654321 <van-button class="fl" size="small"  type="danger" plain>确认提货</van-button></p>
                        
                    </div>
                    <div class="oitem">
                            <p class="pbox">订单编号：12345678900987654321 <span class="blank">交易关闭</span></p>
                            <van-cell  is-link >
                                <div Slot="title">
                                    <img :src="imageURL" alt="" class="goodsicon">
                                </div>
                            </van-cell>
                            <p class="price">2018-09-05 19:45:08 <span>共1件商品 <b>￥5.9</b></span></p>
                            <p class="pbox"><b>张小小</b> <br>   提货单号：12345678900987654321 <van-button class="fl" size="small"  type="default" plain>删除</van-button></p>
                            
                        </div>
                </div> -->
                <!-- <div class="olist" v-if="active==1">
                        
                        <div class="oitem">
                                <p class="pbox">订单编号：12345678900987654321 <span class="blank">交易关闭</span></p>
                                <van-cell  is-link >
                                    <div Slot="title">
                                        <img :src="imageURL" alt="" class="goodsicon">
                                    </div>
                                </van-cell>
                                <p class="price">2018-09-05 19:45:08 <span>共1件商品 <b>￥5.9</b></span></p>
                                <p class="pbox"><b>张小小</b> <br>   提货单号：12345678900987654321 <van-button class="fl" size="small"  type="default" plain>删除</van-button></p>
                                
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
                                <p class="pbox"><b>张小小</b> <br> 提货单号：12345678900987654321 <van-button class="fl" size="small"  type="danger" plain>确认提货</van-button></p>
                                
                            </div>
                            <div class="oitem">
                                    <p class="pbox">订单编号：12345678900987654321 <span class="blank">交易关闭</span></p>
                                    <van-cell  is-link >
                                        <div Slot="title">
                                            <img :src="imageURL" alt="" class="goodsicon">
                                        </div>
                                    </van-cell>
                                    <p class="price">2018-09-05 19:45:08 <span>共1件商品 <b>￥5.9</b></span></p>
                                    <p class="pbox"><b>张小小</b> <br>   提货单号：12345678900987654321 <van-button class="fl" size="small"  type="default" plain>删除</van-button></p>
                                    
                                </div>
                        </div> -->

                <!-- <p class="nomore">没有更多订单了~~~</p> -->
            </div> 
            
    
    
            
        </Layout>
        
        
    </template>
    <script>
    
       
        import { queryOrder,deleteOrder,pickupOrder } from '@/iao/home/query'
        import { Toast,NavBar,Icon,Tab, Tabs,Button,Panel,Cell,Search  } from 'vant'
        
        export default {
            name: 'beila',
            computed: {
                
                
            },
            data() {
                return {
                    active: 0,
                    value: "",
                    list: [],
                    loading: false,
                    finished: false,
                    shopinfo: null,
                    pageNum:1,
                    pageSize:10,
                    imageURL:"/static/images/qq.png",
                    states:{1: '待付款', 2: '待提货', 3: '已提货'}
                }
            },
            mounted() {
                //this.init()
                this.shopinfo = JSON.parse(window.localStorage.getItem("shopinfo"));
            },
            methods: {
                getShopOrder() {
                    var state,type;
                    if(this.active==0){
                        state="1,2,3,4"
                        type="1"
                    }else if(this.active==1){
                        state="1,2,3,4"
                        type="2"
                    }else{
                         state="2"
                    }
                    queryOrder({
                        'deleted':0,
                        'distributorId': this.shopinfo.distributorId, 
                        'pager.pageNum': this.pageNum, 
                        'pager.pageSize': this.pageSize,
                        'states':state,
                        'type':type
                    }).then(res=>{
                        if (!res.code) {
                        //this.showLoading=false
                        if (res.data.length == 0) {
                            this.finished = true;
                            this.loading = false;
                        } else {
                            res.data.forEach(element => {
                                element.details.forEach(el=>{
                                    element._num +=el.count
                                })
                            });
                            this.list.concat(res.data);

                            this.pageNum = this.pageNum + 1;
                            //  console.log(this.formLine["pager.pageNum"])
                            if (res.data.length < 10) {
                            this.finished = true;
                            }
                            this.loading = false;
                        }
                        } else {
                        this.finished = true;
                        }
                    })
                },
                onLoad() {
                    this.getShopOrder()
                  
                },
                delOrder(e){
                    deleteOrder({
                        orderId:e.orderId
                    }).then(res=>{
                        if(!res.code){
                            let m=this.list.findIndex(v=>v.orderId=e.orderId)
                            this.list.splice(m,1)
                        }
                    })
                },
                getOrder(e){
                    pickupOrder({
                       orderId:e.orderId
                    }).then(res=>{
                        if(!res.code){
                            let m=this.list.findIndex(v=>v.orderId=e.orderId)
                            this.list[m].state=3
                        }
                    })
                },
                goToPay(e){
                    this.$router.push("/online?orderid="+e.orderId)
                },
                goBack(){
                    this.$router.back(-1)
                },
               
                goToDetail(e){
                    this.$router.push('/orderdetail?id='+e.orderId);  
                },
                changeTab(e){
                    this.pageNum=1
                    this.list=[]
                    
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
            margin-top: -15px;
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