<template>
        <Layout class="main">
            
            <van-nav-bar title="我的提成"  left-text="返回" @click-left="goBack"  right-text="搜索"   left-arrow fixed> </van-nav-bar>
            <div class="content">    
                
                
                <div class="outb">
                    <van-tabs type="card" class="tabbox" @change="changeTab">
                        <van-tab title="今日"> </van-tab>
                        <van-tab title="本周"> </van-tab>
                        <van-tab title="本月"> </van-tab>
                        <van-tab title="累计"> </van-tab>
                        
                    </van-tabs>
                </div>
                
                <p class="totel">￥ <b>58.5</b></p>
                <p class="infoma">提成明细</p>
                <van-list v-model="loading" :finished="finished" @load="onLoad">
                    <template v-for="item in list" >
                        <div>
                            <div class="itemO">
                                <van-row>
                                    <van-col span="10">
                                        <p class="p1">日期：2018-09-05</p>
                                        
                                        <p class="p3">洁柔百花无香抽纸 120抽/包 2160张 6</p>
                                    </van-col>
                                    <van-col span="5" class="center">
                                        <p class="p1">提成单位</p>
                                        <p class="p2">0.8</p>
                                        <p class="p3">元/份</p>
                                    </van-col>
                                    <van-col span="5" class="center">
                                        <p class="p1">销售数量</p>
                                        <p class="p2">4</p>
                                        <p class="p3">&nbsp;</p>
                                    </van-col>
                                    <van-col span="4" class="center">
                                        <p class="p1">提成</p>
                                        <p class="p2">1.8</p>
                                        <p class="p3">&nbsp;</p>
                                        
                                    </van-col>
                                </van-row>
                            </div>
                        </div>
                    </template>
                </van-list>
                
                
                
                

                <!-- <p class="nomore">没有更多了~~~</p> -->
            </div> 
            
    
    
            
        </Layout>
        
        
    </template>
    <script>
    
       
        import { querySmallBatch, getBehaviorCate, getBehaviorSupply } from '@/iao/home/query'
        import { Toast,NavBar,Icon,Tab, Tabs,List,Panel,Cell,Search,Row, Col  } from 'vant'
        
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
                    list: [1,2,3,4,5,6,7,8],
                    loading: false,
                    finished: false
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
        .outb{
            background-color: #fff;
            padding: 10px;
        }
        .tabbox{
             background-color: #fff;
        }
        .infoma{
            font-weight: bold;
            border-top: 1px solid #dddddd;
        border-bottom: 1px solid #dddddd;
            margin-top: 10px;
            background-color: #fff;
            padding:  10px;
            text-align: center;
            font-size: 14px;
        }
    .totel{
        padding:15px 10px ; 
        text-align: center;
        background-color: #fff;
        border-top: 1px solid #dddddd;
        border-bottom: 1px solid #dddddd;
        font-size: 16px;
        color: red;
        b{
            font-size: 28px;
        }
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
            color: #333;
            padding-right: 5px;
        }
        .center{
            text-align: center;
            border-left: 1px solid #dddddd;
        }
    
    </style>
    <style  rel="stylesheet/scss" lang="scss" >
    .oitem .van-cell__right-icon{
        line-height: 3 !important;
    }
    </style>