<template>
        <Layout class="main">
            
            <van-nav-bar title="我的提成"  left-text="返回" @click-left="goBack"   left-arrow fixed> </van-nav-bar>
            <div class="content">    
                
                
                <div class="outb">
                    <van-tabs type="card" v-model="active" class="tabbox" @change="changeTab">
                        <van-tab title="今日"> </van-tab>
                        <van-tab title="本周"> </van-tab>
                        <van-tab title="本月"> </van-tab>
                        <van-tab title="累计"> </van-tab>
                        
                    </van-tabs>
                </div>
                
                <p class="totel">￥ <b>{{myTotel}}</b></p>
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
    
       
        import { sumBrokerage, queryOrder } from '@/iao/home/query'
        import { Toast,NavBar,Icon,Tab, Tabs,List,Panel,Cell,Search,Row, Col  } from 'vant'
        
        export default {
            name: 'beila',
            computed: {
                
                
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
              
            },
            data() {
                return {
                    active: 0,
                    value: "",
                    checked:false,
                    result:["a"],
                    list: [],
                    loading: false,
                    finished: false,
                    shopinfo:null,
                    pageNum: 1,
                    pageSize: 10,
                    myTotel:0
                }
            },
            mounted() {
                this.shopinfo = JSON.parse(window.localStorage.getItem("shopinfo"));
                //我的提成
                this.queryMyres()
            },
            methods: {
                queryMyres() {
                    sumBrokerage({
                        'time': this.active, 
                        'brokerage0': 0, 
                        'states': '2,3',
                         'distributorId': this.shopinfo.distributorId, 
                         'pager.pageNum': this.pageNum,
                          'pager.pageSize': this.pageSize
                    }).then(res=>{
                        if(!res.code){
                            let val=res.data
                            this.myTotel=(val/100.0).toFixed(2)
                        }else{
                            Toast(res.message)
                        }
                    })
                    
                },
                onClickBigBtn(){
    
                },
                onSearch(){
    
                },
                goBack(){
                    this.$router.back(-1)
                },
                onLoad() {
                    queryOrder({
                        'time': this.active, 
                        'brokerage0': 0, 
                        'states': '2,3',
                         'distributorId': this.shopinfo.distributorId, 
                         'pager.pageNum': this.pageNum,
                          'pager.pageSize': this.pageSize
                    }).then(res => {
                        if (!res.code) {
                        //this.showLoading=false
                        if (res.data.length == 0) {
                            this.finished = true;
                            this.loading = false;
                        } else {
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
                    });
                },
                changeTab(e){
                  console.log(e)
                  this.active=e
                  this.pageNum=1
                  this.list=[]
                  this.loading= false
                    this.finished=false
                  
                }
                
                
    
            },
            
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