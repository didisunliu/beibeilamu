<template>
        <Layout class="main">
            
            <van-nav-bar title="首页"  left-text="返回" @click-left="goBack"    left-arrow fixed> </van-nav-bar>
            <div class="content">
                <div class="toptitle clearfix">
                    <div class="fleft"><img :src="imageURL" alt="">
                        点击修改头像
                    </div>    
                    <div class="fright">
                        <p>({{shopCode}}){{shopName}}</p>
                        <!-- <p class="blank">快来设置属于您自己的修改签名吧 <van-icon name="edit" /></p> -->
                    </div> 
                </div>

                <div class="totle">
                    <div class="title">
                        <h1>今日贝贝姆拉订单数</h1>
                        <p>订单总比：<span>{{orderNumRate}}</span></p>
                        <p>订单排名：<span>{{ranking}}</span></p>
                        <van-button type="warning" size="small"  plain class="fl" @click="paihang">查看排名</van-button>
                    </div>
                    <div class="point">
                        <van-row>
                            <van-col span="8">
                               <span class="hotol">总订单数：{{totalOrderNumOfToday}}</span> </van-col>
                            <van-col span="8" class="center leftright"><van-circle
                                layer-color="#3386fa"
                                color="#f85"
                                v-model="currentRate"
                                :rate="points"
                                size="80px"
                                :speed="100"
                                :text="text"
                                :stroke-width="60"
                              /></van-col>
                            <van-col span="8"><span class="your">您的订单数：{{orderNumOfToday}}</span></van-col>
                        </van-row>
                    </div>
                    <div class="result">
                        <p>今日收益（元）<span>{{todayMoneyOfToday}}</span></p>
                        <p>累计收益（元）<span>{{todayMoney}}</span></p>
                        
                    </div>
                </div>
                <div class="menu">
                    <div class="fline">
                        <van-row gutter="20">
                            <van-col span="8"><van-icon name="share c1" class="Iconf" @click="goShare"/>店铺分享</van-col>
                            <van-col span="8"><van-icon name="upgrade c2" class="Iconf" @click="goPage(6)"/>代客下单</van-col>
                            <van-col span="8"><van-icon name="after-sale c3" class="Iconf" @click="goPage(3)" />退货售后</van-col>
                        </van-row>
                    </div>
                    <div class="fline">
                        <van-row gutter="20">
                            <van-col span="8"><van-icon name="exchange c4" class="Iconf" @click="goPage(4)"/>我的提成</van-col>
                            <van-col span="8"><van-icon name="gold-coin c5" class="Iconf" @click="goPage(5)" />结算中心</van-col>
                            <van-col span="8"><van-icon name="pending-payment c6" class="Iconf" @click="goPage(6)" />订单管理</van-col>
                        </van-row>
                    </div>
                    
                    <div class="fline">
                        <van-row gutter="20">
                            <van-col span="8"><van-icon name="contact c10" class="Iconf" @click="goPage(10)" />查看会员</van-col>
                           
                            <van-col span="8"><van-icon name="close c12" class="Iconf" @click="loginOut" />退出登录</van-col>
                        </van-row>
                    </div>
                </div>
              
            </div> 
            
    
    
            
        </Layout>
        
        
    </template>
    <script>
import { getPay, queryShopInfo } from "@/iao/home/query";
import { Toast, NavBar, Icon, Button, Circle, Row, Col,Dialog  } from "vant";
import wx from "weixin-js-sdk";
export default {
  name: "beila",
  computed: {},
  data() {
    return {
      active: 0,
      value: "",
      checked: false,
      result: ["a"],
      imageURL: "/static/images/qq.png",
      text: "0%",
      points:0,
      currentRate: 0,
      shopinfo: null,
      shopName: "",
      shopCode: "",
      orderNumRate:"",
      ranking:"",
      todayMoneyOfToday:"",
      todayMoney:"",
      orderNumOfToday:"",
      totalOrderNumOfToday:"",
    };
  },
  mounted() {
    //this.init()

    this.shopinfo = JSON.parse(window.localStorage.getItem("shopinfo"));

    if (!this.shopinfo) {
      let href = encodeURIComponent(document.location.href);
      let url = window.location.origin + "/login";
      url = encodeURI(url);
      var state = "yx";
      var wx =
        "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx43fd4135600dcee3&redirect_uri=" +
        url +
        "&response_type=code&scope=snsapi_userinfo&state=" +
        state +
        "#wechat_redirect";

      //document.location.href=wx;
      //alert(wx)
      window.location.href = wx;
    } else {
      //console.info(this.shopinfo);
      this.imageURL = this.shopinfo.head;
      this.shopCode = this.shopinfo.shopCode;
      this.shopName = this.shopinfo.shopName;
      this.setWxJssdk();
      this.getShopInfo()
    }
  },
  methods: {
      
    paihang() {
        this.$router.push("/paihang")
    },
    goShare() {
        Dialog.alert({
        message: "<div style='text-align:left'>1.点击右上角菜单(即，三个圆点)，<br>2.选择'发送给朋友'，完成分享</div>"
        }).then(() => {
        // on close
        });
    },
    loginOut() {
        window.localStorage.removeItem('shopinfo');
        this.$router.push("/login")
    },
    goBack() {
      this.$router.back(-1);
    },
    goPage(d) {
      if (d == 4) {
        this.$router.push("/myres");
      } else if (d == 3) {
        this.$router.push("/saleafter");
      } else if (d == 10) {
        this.$router.push("/seeuser");
      } else if (d == 6) {
        this.$router.push("/purchase");
      } else if(d==5){
          this.$router.push("/ordercenter");
          
      }
    },

    setWxJssdk() {
      getPay({
        url: window.location.href //"http://yx.jytzn.com/#/online?orderid=" + this.$route.query.orderid
      }).then(res => {
        if (res.code == 0) {
          //通过config接口注入权限验证配置
          wx.config({
            debug: false,
            appId: "wx43fd4135600dcee3",
            timestamp: res.data.timestamp,
            nonceStr: res.data.nonceStr,
            signature: res.data.signature,
            jsApiList: [
              "onMenuShareTimeline",
              "onMenuShareAppMessage",
              "onMenuShareQQ",
              "onMenuShareAppMessage"
            ]
          });
          var _this = this;
          wx.ready(function() {
            wx.onMenuShareAppMessage(
              {
                title: "五杂优选（今日爆品），" + _this.shopinfo.shopName,
                desc: "亲，所有单品高性价比，正品保证，售后无忧！",
                link: "http://yx.hnkbmd.com/index.html?py=" + _this.shopinfo.py,
                imgUrl: "http://yx.hnkbmd.com/photo/shop.jpg"
              },
              function(res) {
                Toast(JSON.stringify(res));
              }
            );
          });
        } else {
          Toast(res.msg);
        }
      });
    },
    getShopInfo(){
        queryShopInfo({
            distributorId:this.shopinfo.distributorId
        }).then(res=>{
           console.log(res.data)
            if(!res.code){
                    this.orderNumRate=(res.data.orderNumRateOfToday * 100).toFixed(2) + "%"
                    this.ranking=res.data.rankingOfToday == 0 ? "未上榜" : "第" + res.data.rankingOfToday + "名"
                    this.todayMoneyOfToday=(res.data.totalMoneyOfToday / 100.0).toFixed(2) 
                    this.todayMoney=(res.data.totalMoney.totalMoney / 100.0).toFixed(2) 
                    this.orderNumOfToday= res.data.orderNumOfToday
                    this.totalOrderNumOfToday= res.data.totalOrderNumOfToday
                    if(this.totalOrderNumOfToday!=0){
                        this.points=(this.orderNumOfToday*100)/(this.totalOrderNumOfToday*1).toFixed(2)
                        this.text=this.points+"%"
                    }
                    
                    //  $(".ranking").text(data.rankingOfToday == 0 ? "未上榜" : "第" + data.rankingOfToday + "名");
                    // $(".todayMoneyOfToday").text((data.totalMoneyOfToday / 100.0).toFixed(2));
                    // $(".todayMoney").text((data.totalMoney.totalMoney / 100.0).toFixed(2));
            }
        })
    },
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Circle.name]: Circle,
    [Row.name]: Row,
    [Dialog .name]: Dialog ,
    [Col.name]: Col
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
.fl {
  position: absolute;
  right: 0;
  top: 0;
}
.main {
  background-color: #f1f1f1;
}
.content {
  margin: 45px 0px 0 0;
}
.toptitle {
  background: #ffffff;
  padding: 10px 15px;
  line-height: 25px;
}
.erm {
  padding: 20px;
  text-align: center;
  background: #ffffff;
  img {
    width: 160px;
    height: 160px;
  }
}
.fleft {
  float: left;
  width: 60px;
  color: #999;
  img {
    width: 45px;
    margin: auto;
    height: 45px;
    display: block;
  }
}
.Iconf {
  font-size: 30px;
  display: block;
  padding-bottom: 10px;
  padding-top: 10px;
}
.fright {
  font-size: 14px;
  color: #333333;
}
.blank {
  font-size: 12px;
  color: #999;
}
.center {
  text-align: center;
}
.menu {
  background-color: #fff;
  margin-top: 10px;
}
.result {
  border-top: solid 1px #eee;
  margin-top: 10px;
  padding-top: 5px;
  p {
    color: #000;
    font-size: 14px;
    line-height: 22px;
    span {
      float: right;
      color: red;
    }
  }
}
.totle {
  padding: 10px 15px;
  margin-top: 10px;
  background: #ffffff;
  .title {
    position: relative;
    h1 {
      font-size: 12px;
      color: #000;
    }
    p {
      font-size: 12px;
      span {
        color: red;
      }
    }
  }
  .leftright{
      position: relative;
      &:before{
          
     position: absolute;
    content: "";
    display: block;
    width:50%;
    border-top: solid 1px #3386fa;
    left: 1px;
    bottom:2px;
      }
      &:after {
   position: absolute;
    content: "";
    display: block;
    width: 50%;
    border-top: solid 1px #f85;
    right: 0;
    top: 0px;
  }
  }
  .your {
    color: #f85;
    position: relative;
    display: block;
    width: 100%;
    margin-top: -5px;
  }
//   .your:before {
//     position: absolute;
//     content: "";
//     display: block;
//     width: 30%;
//     border-top: solid 1px #f85;
//     left: -37%;
//     bottom: 10px;
//   }
  .hotol {
    color: #3386fa;
    line-height: 12px;
    position: relative;
    display: block;
    width: 100%;
    text-align: right;
    padding-top: 72px;
  }
//   .hotol::after {
//     position: absolute;
//     content: "";
//     display: block;
//     width: 18%;
//     border-top: solid 1px #3386fa;
//     right: -20%;
//     bottom: 40px;
//   }
}
.fline {
  padding: 10px 0px;
  text-align: center;
  height: 90px;
  font-size: 14px;
  border-bottom: solid 1px #eee;
  margin: 0 15px;
}
.c11 {
  color: #00ac5e;
}
.c12 {
  color: #897303;
}
.c1 {
  color: #14a188;
}
.c2 {
  color: #f85;
}
.c3 {
  color: #32e549;
}
.c4 {
  color: #fa4a04;
}
.c5 {
  color: #52c046;
}
.c6 {
  color: #1d8fe3;
}
.c7 {
  color: #cab35b;
}
.c8 {
  color: #c24646;
}
.c9 {
  color: #dbd616;
}
.c10 {
  color: #e5176b;
}
</style>
    <style  rel="stylesheet/scss" lang="scss" >
</style>