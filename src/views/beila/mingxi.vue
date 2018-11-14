<template>
        <Layout class="main">
            
            <van-nav-bar title="明细"  left-text="返回" @click-left="goBack"    left-arrow fixed> </van-nav-bar>
            <div class="content">    
                <div class="wbg">
                     <van-row>
                        <van-col span="6" class="centers">
                            <p class="p1">交易时间</p>
                            
                            
                        </van-col>
                        <van-col span="6" class="center">
                            <p class="p1">交易单号</p>
                        
                            
                        </van-col>
                        <van-col span="6" class="center">
                            <p class="p1">商品金额</p>
                            
                            
                        </van-col>
                        <van-col span="6" class="center">
                            <p class="p1">提成金额</p>
                            
                            
                            
                        </van-col>
                    </van-row>   
                </div>
                
                
               <van-list v-model="loading" :finished="finished" @load="onLoad">
                    <template v-for="item in list" >
                        <div>
                            <div class="itemO">
                                <van-row>
                                    <van-col span="6"  class="centers">
                                        <p class="p1">{{item.createTime}}</p>
                                    </van-col>
                                    <van-col span="6" class="centers">
                                        <p class="p1">{{item.orderCode}}</p>
                                    </van-col>
                                    <van-col span="6" class="centers">
                                        <p class="p1">￥{{(item.totalMoney / 100.0).toFixed(2)}}</p>
                                    </van-col>
                                    <van-col span="6" class="centers">
                                        <p class="p1">￥{{(item.totalBrokerage / 100.0).toFixed(2)}}</p>
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
    
       
        import { queryOrder} from '@/iao/home/query'
        import { Toast,NavBar,Icon,Tab, Tabs,List,Panel,Cell,Search ,Row, Col  } from 'vant'
        
        export default {
            name: 'beila',
            computed: {
                
                
            },
            data() {
                return {
                    
                    list: [],
                    loading: false,
                    finished: false,
                    shopinfo: null,
                    pageNum:1,
                    pageSize:10,
                    states:{1:"审核中", 2:"汇款中", 3:"未通过", 4:"已完成"}
                   
                }
            },
            mounted() {
                //this.init()
                this.shopinfo = JSON.parse(window.localStorage.getItem("shopinfo"));
            },
            methods: {
                getKickbackDetail() {
                    queryOrder({
                        'beginCreateTime': this.$route.query.beginTime,
                         'states': '2,3', 
                        'distributorId': this.shopinfo.distributorId, 
                        'pager.pageNum': this.pageNum, 
                        'pager.pageSize': this.pageSize
                    }).then(res=>{
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
                    })
                },
                
                goBack(){
                    this.$router.back(-1)
                },
                onSubmit(){
                    this.$router.push('/submit');  
                },
                onLoad() {
                    this.getKickbackDetail()
                    // setTimeout(() => {
                    //     for (let i = 1; i < 7; i++) {
                    //     this.list.push(this.list.length + 1);
                    //     }
                    //     this.loading = false;

                    //     if (this.list.length >= 40) {
                    //     this.finished = true;
                    //     }
                    // }, 500);
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
        .wbg{
            background: #f5f5f5;
            border-bottom: solid 1px #ddd;
            .p1{
                color: #333;
            }
        }
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
        .centers{
            text-align: center
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