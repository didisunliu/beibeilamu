<template>
        <Layout class="main">
            
            <van-nav-bar title="我的订单"  left-text="返回" @click-left="goBack"    left-arrow fixed> </van-nav-bar>
            <div class="content">       
                <van-tabs type="line" class="tabbox" v-model="active"  @change="changeTab">
                    <van-tab title="全部"> </van-tab>
                    <van-tab title="未付款"> </van-tab>
                    <van-tab title="待提货"> </van-tab>
                    <van-tab title="已提货"> </van-tab>
                </van-tabs>
                <div class="olist" v-if="active==0">
                    
              <template v-if="allList.length>0">
                <van-list v-model="loading" :finished="finished" @load="onLoad" :offset="10"  class="boxlist"> 
                     <van-cell v-for="item in allList" class="boxlist"  >     
                    <div class="oitem"  >
                        <p class="pbox">订单编号：{{item.orderCode}} <span class="red">{{orderstate[item.state]}}</span></p>
                        <van-cell  is-link >
                            <div Slot="title">
                              <template v-for="v in item.details">
                                <img :src="v.mainPictureUrl" alt="" class="goodsicon">
                              </template>
                             
                            </div>
                        </van-cell>
                        <p class="price">{{item.createTime}} <span>共{{item._num}}件商品 <b>￥{{(item.totalMoney*0.01).toFixed(2)}}</b></span></p>
                        <p class="pbox clearfix">
                          <em  v-if="item.state!=1">提货单号：{{item.pickupCode}}</em>
                           <van-button v-if="item.state==1" @click="goToPay(item)" class="fl" size="small"  type="danger" plain>去付款</van-button>
                        <van-button v-if="item.state==2" class="fl" size="small"  type="danger" plain>确认提货</van-button>
                        <van-button v-if="item.state==3" class="fl" size="small"  type="default" plain>删除</van-button>
                        </p>
                        
                    </div>
                     </van-cell>
            
                      </van-list> 
                      </template>
                    <template  v-else>
                       
                  <div class="nulllist" v-if="loaded">
                    <span> <van-icon name="pending-orders" /></span>
                     <p>还没有相关记录</p>
                     
                  </div>
                  
                </template> 
                   
                </div>
                <div class="olist" v-if="active==1">
                 <template v-if="fList.length>0">
                   <van-list v-model="loading1" :finished="finished1" @load="onLoad1" :offset="10"  class="boxlist"> 
                     <van-cell v-for="item in fList" class="boxlist"  >     
                     <div class="oitem">
                        <p class="pbox">订单编号：{{item.orderCode}} <span class="red">{{orderstate[item.state]}}</span></p>
                        <van-cell  is-link >
                            <div Slot="title">
                                <img :src="imageURL" alt="" class="goodsicon">
                                <img :src="imageURL" alt="" class="goodsicon">
                                <img :src="imageURL" alt="" class="goodsicon">
                            </div>
                        </van-cell>
                        <p class="price">{{item.createTime}} <span>共{{item._num}}件商品 <b>￥{{(item.totalMoney*0.01).toFixed(2)}}</b></span></p>
                        <p class="pbox clearfix "><i  v-if="item.state!=1">提货单号：{{item.pickupCode}}</i><van-button v-if="item.state==1" class="fl" size="small"  type="danger"  @click="goToPay(item)" plain>去付款</van-button>
                        <van-button v-if="item.state==2" class="fl" size="small"  type="danger" plain>确认提货</van-button>
                        <van-button v-if="item.state==3" class="fl" size="small"  type="default" plain>删除</van-button>
                        </p>
                        
                    </div>
                     </van-cell>
            
                      </van-list> 
                    
                    </template>
                    <template  v-else>
                       
                  <div class="nulllist" v-if="loaded">
                    <span> <van-icon name="pending-orders" /></span>
                     <p>还没有相关记录</p>
                     
                  </div>
                  
                </template>
                </div>
                <div class="olist" v-if="active==2">
                   <template v-if="sList.length>0">
                     <van-list v-model="loading2" :finished="finished2" @load="onLoad2" :offset="10"  class="boxlist"> 
                     <van-cell v-for="item in sList" class="boxlist"  >     
                     <div class="oitem">
                        <p class="pbox">订单编号：{{item.orderCode}} <span class="red">{{orderstate[item.state]}}</span></p>
                        <van-cell  is-link >
                            <div Slot="title">
                                <img :src="imageURL" alt="" class="goodsicon">
                                <img :src="imageURL" alt="" class="goodsicon">
                                <img :src="imageURL" alt="" class="goodsicon">
                            </div>
                        </van-cell>
                        <p class="price">{{item.createTime}} <span>共{{item._num}}件商品 <b>￥{{(item.totalMoney*0.01).toFixed(2)}}</b></span></p>
                        <p class="pbox">提货单号：{{item.pickupCode}}<van-button v-if="item.state==1" class="fl" size="small"  type="danger" plain>去付款</van-button>
                        <van-button v-if="item.state==2" class="fl" size="small"  type="danger" plain>确认提货</van-button>
                        <van-button v-if="item.state==3" class="fl" size="small"  type="default" plain>删除</van-button>
                        </p>
                        
                    </div>
                     </van-cell>
            
                      </van-list> 
                     
                   </template>
                    <template  v-else>
                       
                  <div class="nulllist" v-if="loaded">
                    <span> <van-icon name="pending-orders" /></span>
                     <p>还没有相关记录</p>
                     
                  </div>
                  
                </template>
                </div>
                <div class="olist" v-if="active==3">
                    <template v-if="tList.length>0">
                       <van-list v-model="loading3" :finished="finished3" @load="onLoad3" :offset="10"  class="boxlist"> 
                     <van-cell v-for="item in tList" class="boxlist"  >     
                    <div class="oitem" >
                        <p class="pbox">订单编号：{{item.orderCode}} <span class="red">{{orderstate[item.state]}}</span></p>
                        <van-cell  is-link >
                            <div Slot="title">
                                <img :src="imageURL" alt="" class="goodsicon">
                                <img :src="imageURL" alt="" class="goodsicon">
                                <img :src="imageURL" alt="" class="goodsicon">
                            </div>
                        </van-cell>
                        <p class="price">{{item.createTime}} <span>共{{item._num}}件商品 <b>￥{{(item.totalMoney*0.01).toFixed(2)}}</b></span></p>
                        <p class="pbox">提货单号：{{item.pickupCode}} <van-button v-if="item.state==1" class="fl" size="small"  type="danger" plain>去付款</van-button>
                        <van-button v-if="item.state==2" class="fl" size="small"  type="danger" plain>确认提货</van-button>
                        <van-button v-if="item.state==3" class="fl" size="small"  type="default" plain>删除</van-button>
                        </p>
                        
                    </div>
                     </van-cell>
            
                      </van-list> 
                     
                    </template>
                    <template  v-else>
                       
                  <div class="nulllist" v-if="loaded">
                    <span> <van-icon name="pending-orders" /></span>
                     <p>还没有相关记录</p>
                     
                  </div>
                  
                </template>
                </div>
                
                <!-- <p class="nomore">没有更多订单了~~~</p> -->
            </div> 
            
    
    
            
        </Layout>
        
        
    </template>
    <script>
import { queryOrder } from "@/iao/home/query";
import {
  Toast,
  NavBar,
  Icon,
  Tab,
  Tabs,
  Button,
  Panel,
  Cell,
  List
} from "vant";

export default {
  name: "beila",
  computed: {},
  data() {
    return {
      active: this.$route.query.type || 0,
      checked: false,
      loaded: false,
      allList: [],
      fList: [],
      sList: [],
      tList: [],
      d0:this.$route.query.type?true:false,
      d1:this.$route.query.type==1?false:true,
      d2:this.$route.query.type==2?false:true,
      d3:this.$route.query.type==3?false:true,
      orderstate: ["", "待付款", "待提货", "交易完成"],
      imageURL: "/static/images/qq.png",
      loading: false,
      finished: false,
       loading1: false,
      finished1: false,
       loading2: false,
      finished2: false,
       loading3: false,
      finished3: false,
      form: {
        type: 1,
        memberId:null,
        states: null,
        "pager.pageNum": 1,
        "pager.pageSize": 10
      },

      wxinfo: null,
      userinfo: null
    };
  },
  mounted() {
    //this.init()
    this.wxinfo = JSON.parse(window.localStorage.getItem("wxinfo"));
    this.userinfo = JSON.parse(window.localStorage.getItem("userinfo"));
    //this.getOrder(this.form);
    this.form.states=this.$route.query.type?this.$route.query.type:null
    if(this.form.states==1){
      this.onLoad1()
    }else if(this.form.states==2){
      this.onLoad2()
    }else if(this.form.states==3){
      this.onLoad3()
    }else{
      this.form.states=null
      this.onLoad()
    }
    
  },
  methods: {
    onLoad() {
      //alert(1)
      this.form.memberId=this.userinfo?this.userinfo.memberId : 2
      this.getOrder(this.form);
    },
    onLoad1() {
      //alert(1)
      this.form.memberId=this.userinfo?this.userinfo.memberId : 2
      this.getOrder(this.form);
    },
    onLoad2() {
      
      this.form.memberId=this.userinfo?this.userinfo.memberId : 2
      this.getOrder(this.form);
    },
    onLoad3() {
      //alert(1)
      this.form.memberId=this.userinfo?this.userinfo.memberId : 2
      this.getOrder(this.form);
    },
    onClickMiniBtn() {},
    onClickBigBtn() {},
    goBack() {
      this.$router.back(-1);
    },
    onSubmit() {
      this.$router.push("/submit");
    },
    changeTab(e) {
     
      this.active = e;
       this.form["pager.pageNum"]=1
       this.form.states=e==0?null:e
       //console.info(e==3 && this.d3)
      if(e==1 && this.d1){
      this.d1=false
      this.onLoad1()
    }else if(e==2 && this.d2){
       this.d2=false
      this.onLoad2()
    }else if(e==3 && this.d3){
       this.d3=false
      this.onLoad3()
    }else if(e==0 && this.d0 ){
       this.d0=false
      this.onLoad()
     
    }
    },
    goToPay(e){
      this.$router.push("/online?orderid="+e.orderId)
    },
    getOrder(d) {
      
      queryOrder(d).then(res => {
        if (!res.code) {
         
          //this.loaded=true
          if (res.data.length == 0) {
            this.loaded=true
            // console.log("ss"+this.sList.length)
           if(d.states==1){
              this.finished1 = true;
            }else if(d.states==2){
              this.finished2 = true;
            }else if(d.states==3){
              this.finished3 = true;
            }else{
              this.finished = true;
            }
          } else {
            this.loaded=false
            if(d.states==1){
              this.fList = this.fList.concat(res.data);
            }else if(d.states==2){
              
              this.sList = this.sList.concat(res.data);
             
            }else if(d.states==3){
              this.tList = this.tList.concat(res.data);
              
            }else{
              this.allList = this.allList.concat(res.data);
            }
            
            res.data.forEach(element => {
                element._num=0
                element.details.forEach(el=>{
                   element._num +=el.count
                })

                // if(element.state==1){
                //   this.fList.push(element)
                // }else if(element.state==2){
                //   this.sList.push(element)
                // }else if(element.state==3){
                //   this.tList.push(element)
                // }
            });
            this.form["pager.pageNum"] = this.form["pager.pageNum"] + 1;
            //  console.log(this.formLine["pager.pageNum"])
            if (res.data.length < 10) {
              if(d.states==1){
              this.finished1 = true;
            }else if(d.states==2){
              this.finished2 = true;
            }else if(d.states==3){
              this.finished3 = true;
            }else{
              this.finished = true;
            }
            }
            if(d.states==1){
              this.loading1 = false;
            }else if(d.states==2){
              this.loading2 = false;
            }else if(d.states==3){
              this.loading3 = false;
            }else{
               this.loading = false;
            }
             
          }
         
        } else {
          if(d.states==1){
              this.finished1 = true;
            }else if(d.states==2){
              this.finished2 = true;
            }else if(d.states==3){
              this.finished3 = true;
            }else{
              this.finished = true;
            }
             
        }
      });
    }
  },
  components: {
    [Tab.name]: Tab,
    [Cell.name]: Cell,
    [Tabs.name]: Tabs,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Panel.name]: Panel,
    [List.name]: List
  }
};
</script>
    <style rel="stylesheet/scss" lang="scss" scoped>
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.boxlist {
  padding: 0px;
}
.fl {
  float: right;
  margin-top: -7px;
}
.main {
  background-color: #f1f1f1;
}
.content {
  margin: 45px 0px 0 0;
}

.tabbox {
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
}
.nulllist{
  padding: 30px 15px;
  text-align: center;
  font-size: 12px;
  color: #999;
  height:100vh  ;
  background-color: #fff;
      padding-top: 30%;
  span{
    display: block;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: #f5f5f5;
    margin: auto;
    line-height: 140px;
    font-size: 56px;
    color: #ddd;
    
  }
  p{
    line-height: 30px ;
  }
}
.nomore {
  background-color: #fff;
  text-align: center;
  font-size: 12px;
  padding: 10px 0;
  margin: 10px 0;
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
}
.goodsicon {
  width: 40px;
  height: 40px;
}
.pbox {
  padding: 12px 16px;
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  background: #ffffff;
  font-size: 12px;
  span {
    font-size: 14px;
    float: right;
  }
  .red {
    color: red;
  }
  .blank {
    color: #333;
  }
}
.price {
  padding: 12px 16px;
  border-top: 1px solid #dddddd;

  background: #ffffff;
  font-size: 12px;
  span {
    font-size: 12px;
    font-weight: bold;
    float: right;
  }
  b {
    color: red;
    font-size: 14px;
  }
}
.oitem {
  margin-top: 10px;
}
</style>
    <style  rel="stylesheet/scss" lang="scss" >
.oitem .van-cell__right-icon {
  line-height: 3 !important;
}
</style>