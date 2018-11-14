<template>
        <Layout class="main">
            
            <van-nav-bar title="售后申请"  left-text="返回" @click-left="goBack"    left-arrow fixed> </van-nav-bar>
            <div class="content">    
                <!-- <div>
                        <van-search
                        v-model="value"
                        placeholder="搜索"
                        show-action
                        @search="onSearch"
                      >
                        <div slot="action" @click="onSearch">搜索</div>
                      </van-search>
                </div> -->
                
                <van-tabs type="line" class="tabbox" @change="changeTab">
                    <van-tab title="售后申请"> </van-tab>
                    <van-tab title="申请记录"> </van-tab>
                 
                </van-tabs>
                <div class="olist" v-if="active==0">
                    <van-list v-model="loading" :finished="finished" :offset="10" @load="onLoad">
                    <template v-for="item in list" >
                        <div class="oitem">
                        <p class="pbox">订单编号：{{item.orderCode}}<br>下单时间：{{item.createTime}} </p>
                     
                        <van-cell v-for="v in item.details">
                            <div Slot="title" class="goodsItem clearfix">
                                <img :src="v.mainPictureUrl | Imgurl" alt="" class="goodsicon">
                                <p>{{v.title}}</p>
                                <p>价格：￥{{(v.price / 100.0).toFixed(2)}} 数量：{{v.count}} 合计：￥{{((v.price * v.count) / 100.0).toFixed(2)}}</p>
                            </div>
                        </van-cell>
                         <p class="price clearfix">
                             <template v-if="item.deliveryType==2">
                                邮费：￥{{(item.despatchMoney/100.0).toFixed(2)}}
                            </template>
                           <span >5件商品 共：<b class="red">￥ {{(item.totalMoney / 100.0).toFixed(2)}}</b></span></p>
                        <p class="price clearfix">&nbsp;<span>总金额：<b class="red">￥ {{((item.totalMoney + (item.deliveryType == 2 ? item.despatchMoney : 0)) / 100.0).toFixed(2)}}</b></span></p>
                        <p class="price">客户名称：{{item.name}}<span>联系电话：{{item.mobile}}</span></p>
                        <p class="bbox clearfix"><van-button class="fl" size="small"  type="danger" @click="ask(item)" plain>申请售后</van-button></p>
                        
                        </div>
                    </template>
                </van-list>
                    <div class="oitem">
                        <p class="pbox">订单编号：12345678900987654321 <br>下单时间：2018-09-05 15:35:19 </p>
                        
                        <van-cell >
                            <div Slot="title" class="goodsItem clearfix">
                                <img :src="imageURL" alt="" class="goodsicon">
                                <p>商品汨罗一盆带水盆高30公分，长50cm吸水分</p>
                                <p>数量：2</p>
                            </div>
                        </van-cell>
                        <p class="price">邮费：￥8.00  <span >5件商品 共：<b class="red">￥ 16.00</b></span></p>
                        <p class="price">&nbsp;<span>总金额：<b class="red">￥ 16.00</b></span></p>
                        <p class="price">客户名称：小超<span>联系电话：17786759786</span></p>
                        <p class="bbox clearfix">
                            <van-button class="fl" size="small"  type="danger" v-if="!item.saleAfterState"  @click="ask" plain>申请售后</van-button>
                            <van-button class="fl" size="small" disabled   type="primary"v-else plain>{{saleAfterStates[item.saleAfterState] }}</van-button>
                        </p>
                        
                         <!-- <van-dialog v-model="show" show-cancel-button  :before-close="beforeClose"  >
                            <van-field  v-model="reason" label="原因" placeholder="请输入原因"  />
                          </van-dialog> -->
                          <van-popup v-model="show">
                              <div class="popbox">
                                  <p>确定要对该条订单申请售后？</p>
                                <van-field  v-model="reason" label="申请售后说明" placeholder="请输入"  />
                                <van-row>
                                <van-col span="12">
                                    <van-button type="default" size="large" @click="show=false">取消</van-button>
                                </van-col>
                                <van-col span="12">
                                    <van-button type="default" size="large" class="askOk">确认</van-button>
                                </van-col>
                              
                                </van-row>
                              </div>
                              
                          </van-popup>
                        
                    </div>
                    
                    
                </div>
                <div class="olist" v-if="active==1">
                    <van-list v-model="loading1" :finished="finished1" :offset="10" @load="onLoad1">
                        <template v-for="item in list1" >
                           <div class="oitem">
                        <p class="pbox">售后单号：{{item.afterCode}} <br>申请时间：{{item.createTime}} </p>
                        
                        <van-cell v-for="v in item.details">
                            <div Slot="title" class="goodsItem clearfix">
                                <img :src="v.mainPictureUrl | Imgurl" alt="" class="goodsicon">
                                <p>{{v.title}}</p>
                                 <p>价格：￥{{(v.price / 100.0).toFixed(2)}} 数量：{{v.count}} 合计：￥{{((v.price * v.count) / 100.0).toFixed(2)}}</p>
                            </div>
                        </van-cell>
                        <p class="price clearfix">
                             <template v-if="item.deliveryType==2">
                                邮费：￥{{(item.despatchMoney/100.0).toFixed(2)}}
                            </template>
                           <span >5件商品 共：<b class="red">￥ {{(item.totalMoney / 100.0).toFixed(2)}}</b></span></p>
                        <p class="price clearfix">&nbsp;<span>总金额：<b class="red">￥ {{((item.totalMoney + (item.deliveryType == 2 ? item.despatchMoney : 0)) / 100.0).toFixed(2)}}</b></span></p>
                        <p class="price">客户名称：{{item.name}}<span>联系电话：{{item.mobile}}</span></p>
                      <p class="bbox clearfix">
                          <van-button class="fl" size="small" v-if="item.state==1" @click="cancel(item)"  type="danger" plain>取消</van-button>
                         
                        </p>
                        <van-cell class="online" v-if="item.state>=4"  title="已取消"></van-cell>
                        <van-cell class="online" v-if="item.state==3"  :title="'未通过，'+item.reason"></van-cell>
                        <van-cell class="online" v-if="item.state==2"  title="已通过"></van-cell>
                   
                        
                        
                    </div>
                        </template>
                    </van-list>
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
                        <van-cell class="online"  is-link title="退款成功 | 您的售后订单已退款成功">
                            
                        </van-cell>
                        <p class="bbox clearfix">
                          <van-button class="fl" size="small" @click="cancel"  type="danger" plain>取消</van-button>
                         
                        </p>
                        
                    </div>
                </div>
                

                <!-- <p class="nomore">没有更多了~~~</p> -->
            </div> 
            
       
    
            
        </Layout>
        
        
    </template>
    <script>
import { queryOrder, querySaleOrder,cancelOrderAfterSale ,saveOrderAfterSale} from "@/iao/home/query";
import {
  Toast,
  NavBar,
  Icon,
  Tab,
  Tabs,
  Button,
  Panel,
  Cell,
  Search,
  List,
  Dialog,
  Field,
  Popup,
  Row, Col
} from "vant";

export default {
  name: "beila",
  components: {
    [Tab.name]: Tab,
    [Cell.name]: Cell,
    [Tabs.name]: Tabs,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Panel.name]: Panel,
    [Search.name]: Search,
    [List.name]: List,
    [List.name]: List,
    [Field.name]: Field,
    "van-dialog": Dialog,
    [Popup.name]: Popup,
    [Row.name]: Row,
    [Col.name]: Col,
  },
  computed: {},
  data() {
    return {
      active: 0,
      value: "",
      checked: false,
      result: ["a"],
      list: [],
      list1: [],
      imageURL: "/static/images/qq.png",
      loading: false,
      finished: false,
      pageNum: 1,
      pageSize: 10,
      pageNum1: 1,
      pageSize1: 10,
      shopinfo: null,
      loading1: false,
      finished1: false,
      show: false,
      askItem:{},
      reason: "",
      saleAfterStates:{1: "处理中", 2: "已通过", 3: "不通过", 4: "已取消", 5: "已删除"}

    };
  },
  mounted() {
    //this.init()
    this.shopinfo = JSON.parse(window.localStorage.getItem("shopinfo"));
  },
  methods: {
    onLoad() {
      //this.loadData();
    },
    onLoad1() {
      //this.loadData1();
    },
    loadData() {
      queryOrder({
        distributorId: this.shopinfo.distributorId || 1,
        states: "2,3",
        "pager.pageNum": this.pageNum,
        "pager.pageSize": this.pageSize
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
    loadData1() {
      querySaleOrder({
          'distributorId': this.shopinfo.distributorId, 
          'pager.pageNum': this.pageNum1, 
          'pager.pageSize': this.pageSize1, 
          'pager.orderType': 'desc'
      }).then(res => {
        if (!res.code) {
          //this.showLoading=false
          if (res.data.length == 0) {
            this.finished1 = true;
            this.loading1 = false;
          } else {
            //this.list1 = res.data;
            this.list1.concat(res.data) ;
            this.pageNum1 = this.pageNum1 + 1;
            //  console.log(this.formLine["pager.pageNum"])
            if (res.data.length < 10) {
              this.finished1 = true;
            }
            this.loading1 = false;
          }
        } else {
          this.finished1 = true;
        }
      });
    },
    goBack() {
      this.$router.back(-1);
    },
    beforeClose(action, done) {
      if (action === 'confirm') {
        setTimeout(done, 1000);
      } else {
        done();
      }
    },
    //申请售后
    ask(el){

        
        this.show=true
        this.askItem=el
        // return
        // Dialog.confirm({
        // title: '申请售后说明',
        // message: '确定要对该条订单申请售后？'
        // }).then(() => {
        // // on confirm
            
        // }).catch(() => {
        // // on cancel
        // });
    },
    askOk(){
        saveOrderAfterSale({
                'orderId': this.askItem.orderId,
                 'distributorId':this.shopinfo.distributorId, 
                 'remark': this.reason,
                id: el.id, 
                distributorId: this.shopinfo.distributorId
            }).then(res=>{
                if(!res.code){
                    Toast("申请已提交，请等耐结果反馈")
                    //this.list1.findI
                    let a = this.list.findIndex(v=>v.orderId==this.askItem.orderId)
                    this.list[a].saleAfterState=1
                    
                }
            })
    },
    cancel(el){
        //取消

        Dialog.confirm({
        title: '',
        message: '是否确定取消该订单的售后申请？'
        }).then(() => {
        // on confirm
            cancelOrderAfterSale({
                id: el.id, 
                distributorId: this.shopinfo.distributorId
            }).then(res=>{
                if(!res.code){
                    Toast("成功取消")
                    //this.list1.findI
                    let a = this.list1.findIndex(v=>v.id==el.id)
                    this.list1[a].state=4
                    
                }
            })
        }).catch(() => {
        // on cancel
        });

    },

    changeTab(e) {
      this.active = e;
    }
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
.popbox{
    width: 260px;
   
    p{
        padding: 10px 0px;
        text-align: center;
        font-size: 14px; 
    }
}
.fl {
  float: right;
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
  padding: 2px;
  border: solid 1px #ddd;
}
.goodsItem {
  img {
    float: left;
    margin-right: 10px;
  }
  p {
    font-size: 12px;
    line-height: 18px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.bbox {
  background-color: #fff;
  padding-right: 15px;
  padding-bottom: 10px;
}
.pbox {
  padding: 12px 16px;
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  background: #ffffff;
  font-size: 12px;
  color: #888;
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
    float: right;
    color: #888;
  }
}
.online {
  background: #fae8c4;
  font-size: 12px;
}
.oitem {
  margin-top: 10px;
}
</style>
  