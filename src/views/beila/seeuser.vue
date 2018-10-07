<template>
        <Layout class="main">
            
            <van-nav-bar title="查看会员"  left-text="返回" @click-left="goBack"    left-arrow fixed> </van-nav-bar>
            <div class="content">    
                <div>
                        <van-search
                        v-model="value"
                        placeholder="提货单号、手机号、收货人、微信昵称查询"
                        show-action
                        @search="onSearch"
                      >
                        <div slot="action" @click="onSearch">搜索</div>
                      </van-search>
                </div>
                
                
               <van-list v-model="loading" :finished="finished" @load="onLoad">
                    <template v-for="item in list" >
                        <div>
                            <div class="itemO">
                                <van-row>
                                    <van-col span="8">
                                        <p class="p1">15575862586</p>
                                       
                                       
                                    </van-col>
                                    <van-col span="5" class="center">
                                        <p class="p1">李明成</p>
                                   
                                       
                                    </van-col>
                                    <van-col span="5" class="center">
                                        <p class="p3">订单数量</p>
                                        <p class="p2">35</p>
                                       
                                    </van-col>
                                    <van-col span="6" class="center">
                                        <p class="p3">订单金额</p>
                                        <p class="p2">1005.8</p>
                                       
                                        
                                    </van-col>
                                </van-row>
                            </div>
                        </div>
                    </template>
                </van-list>
                       
                    
                            

                <!-- <p class="nomore">没有更多订单了~~~</p> -->
            </div> 
            
    
    
            
        </Layout>
        
        
    </template>
    <script>
    
       
        import { querySmallBatch, getBehaviorCate, getBehaviorSupply } from '@/iao/home/query'
        import { Toast,NavBar,Icon,Tab, Tabs,List,Panel,Cell,Search ,Row, Col  } from 'vant'
        
        export default {
            name: 'beila',
            computed: {
                
                
            },
            data() {
                return {
                    active: 0,
                    value: "",
                    checked:false,
                    list: [1,2,3,4,5,6,7,8],
                    loading: false,
                    finished: false,
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
                onLoad() {
                    setTimeout(() => {
                        for (let i = 1; i < 7; i++) {
                        this.list.push(this.list.length + 1);
                        }
                        this.loading = false;

                        if (this.list.length >= 40) {
                        this.finished = true;
                        }
                    }, 500);
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
                [List.name]: List ,
                [Panel.name]: Panel  ,
                [Search.name]: Search  ,
                 [Row.name]: Row, 
                [Col.name]: Col  ,
              
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
            margin: 45px 0px 0 0; 
        }
        
        .tabbox{
            
            border-top: 1px solid #dddddd;
            border-bottom: 1px solid #dddddd;
            
        }
        .itemO{
        padding: 10px;
        background-color: #fff;
        border-bottom: 1px solid #dddddd;
        margin-bottom: 10px;
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
        .p1{
            font-size: 12px;
            color: #888;
            line-height: 3;
            padding-right: 5px;
        }
        .p2{
            font-size: 16px;
            color: #333;
            font-weight: bold;
            padding-right: 5px;
        }
        .p3{
            font-size: 12px;
            color: #888;
            padding-right: 5px;
        }
        .center{
            text-align: center;
            border-left: 1px solid #dddddd;
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