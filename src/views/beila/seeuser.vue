<template>
        <Layout class="main">
            
            <van-nav-bar title="查看会员"  left-text="返回" @click-left="goBack"    left-arrow fixed> </van-nav-bar>
            <div class="content">    
                <div>
                    <van-search placeholder="手机号、微信昵称查询" v-model="value" @input="onSearch" />
                </div> 
                
                
               <van-list v-model="loading" :finished="finished" @load="onLoad">
                   <template v-for="item in list" >
                        <div>
                            <div class="itemO">
                                <van-row>
                                    <van-col span="8">
                                        <p class="p1">{{item.mobile}}</p>
                                       
                                       
                                    </van-col>
                                    <van-col span="5" class="center">
                                        <p class="p1">{{item.name}}</p>
                                   
                                       
                                    </van-col>
                                    <van-col span="5" class="center">
                                        <p class="p3">订单数量</p>
                                        <p class="p2">{{item.orderNum}}</p>
                                       
                                    </van-col>
                                    <van-col span="6" class="center">
                                        <p class="p3">订单金额</p>
                                        <p class="p2">{{item.totalMoney.toMoney()}}</p>
                                       
                                        
                                    </van-col>
                                </van-row>
                            </div>
                        </div>
                    </template>
                    <!-- <template v-for="item in list" >
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
                    </template> -->
                </van-list>
                       
                    
                            

                <!-- <p class="nomore">没有更多订单了~~~</p> -->
            </div> 
            
    
    
            
        </Layout>
        
        
    </template>
    <script>
    
       
        import { seeUser } from '@/iao/home/query'
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
                    list: [],
                    loading: false,
                    finished: false,
                    shopinfo: null,
                    pageNum:1,
                    pageSize:10,
                    
                }
            },
            mounted() {
                //this.init()
                this.shopinfo = JSON.parse(window.localStorage.getItem("shopinfo"));
            },
            methods: {
                querySeeuser() {
                    seeUser({
                        'distributorId': this.shopinfo.distributorId, 
                        'keyword': this.value, 
                        'pageNum': this.pageNum, 
                        'pageSize': this.pageSize
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
                
                onSearch(){
                    this.pageNum=1
                    this.list=[]
                    this.querySeeuser()
    
                },
                goBack(){
                    this.$router.back(-1)
                },
                onSubmit(){
                    this.$router.push('/submit');  
                },
                onLoad() {
                    this.querySeeuser()
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