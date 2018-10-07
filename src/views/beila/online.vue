<template>
    <Layout class="main">
        
        <van-nav-bar title="在线支付"  left-text="返回" @click-left="goBack"    left-arrow fixed> </van-nav-bar>
        <div class="content"> 
            <div class="stepBox">
                <van-steps :active="0" class="wd80">
                    <van-step>提交订单</van-step>
                    <van-step>在线付款</van-step>
                </van-steps>
                <p class="num">订单金额：<span>￥<b>{{price}}</b></span></p>
                <p class="info">订单提交成功，请在<span>30</span>分钟内完成支付。</p>
                <p>{{JSON.stringify(userinfo)}}</p>
                <p>{{JSON.stringify(wxinfo)}}</p>
            </div>
               
            <div class="payway">
                支付方式：<img src="/static/images/wx.png" alt=""> <span>微信支付</span>
            </div>
            <div class="gobt">
                    <van-button type="danger" size="large" @click="goWxPay">去付款</van-button>
            </div>
            
        </div> 



        
    </Layout>
    
    
</template>
<script>
import { getPay, getOrderInfo, goPay } from "@/iao/home/query";
import { Toast, NavBar, Icon, Step, Steps, Button } from "vant";
import wx from "weixin-js-sdk";
export default {
  name: "beila",
  computed: {},
  data() {
    return {
      active: 0,
      checked: false,
      result: ["a"],
      imageURL: "/static/images/qq.png",
      wxinfo: null,
      userinfo: null,
      price: null
    };
  },
  mounted() {
    //this.init()

    this.wxinfo = JSON.parse(window.localStorage.getItem("wxinfo"));
    this.userinfo = JSON.parse(window.localStorage.getItem("userinfo"));
    this.crypay();
    this.queryOrder();
  },
  methods: {
    goBack() {
      this.$router.back(-1);
    },
    onSubmit() {
      this.$router.push("/submit");
    },
    crypay() {
      getPay({
        url: "http://yx.jytzn.com/#/online?orderid=" + this.$route.query.orderid
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
              "chooseWXPay",
              "onMenuShareTimeline",
              "onMenuShareAppMessage",
              "onMenuShareQQ",
              "onMenuShareWeibo"
            ]
          });
        } else {
          Toast(res.msg);
        }
      });
    },
    queryOrder() {
      getOrderInfo({
        orderId: this.$route.query.orderid
      }).then(res => {
        if (res.code == 0) {
          if (res.data.deliveryType == 1) {
            this.price = res.data.totalMoney * 0.01;
          } else {
            this.price = (res.data.totalMoney + res.data.despatchMoney) * 0.01;
          }
        }
        console.log(res);
      });
    },
    goWxPay() {
      goPay({
        memberId: this.userinfo.memberId,
        openId: this.wxinfo.openid || this.userinfo.openId,
        orderId: this.$route.query.orderid
      }).then(res => {
        if (res.code == 0) {
          var data = res.data;
          var config = {
            timestamp: data.timeStamp,
            nonceStr: data.nonce_str,
            package: "prepay_id=" + data.prepay_id,
            signType: "MD5",
            paySign: data.sign,
            success: function(res1) {
              this.$router.push(
                "/user?py=" + window.localStorage.getItem("shopcode")
              );
              // alert(1)
              //alert(JSON.stringify(res1))
            },
            cancel: function(res2) {
              //取消支付
              // alert(2)
              //alert(JSON.stringify(res2))
            },
            fail: function(res3) {
              //支付失败
              // alert(3)
              //alert(JSON.stringify(res3))
            }
          };
          //alert(JSON.stringify(config))
          wx.chooseWXPay(config);
        } else {
          alert(3);
          alert(res.msg);
        }
      });
    }
  },
  components: {
    [Step.name]: Step,
    [Steps.name]: Steps,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Button.name]: Button
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

.main {
  background-color: #f1f1f1;
}
.content {
  margin: 45px 0px 0 0;
}
.stepBox {
  background-color: #ecf8e4;
  margin-top: 1px;
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  padding: 10px 0;
  .van-steps {
    background-color: #ecf8e4;
  }
}
.payway {
  background: #fff;
  padding: 10px;
  font-size: 14px;
  margin: 10px 0px;
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  color: #888;
  span {
    color: #333;
  }
  img {
    vertical-align: middle;
  }
}
.gobt {
  padding: 10px;
  position: fixed;
  bottom: 20px;
  width: 100%;
}
.wd80 {
  width: 60%;
  margin: auto;
}
.num {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  text-align: center;
  span {
    color: #ff0000;
    b {
      font-size: 24px;
    }
  }
}
.info {
  text-align: center;
  padding: 5px 0;
  font-size: 14px;
  span {
    color: #ff0000;
  }
}
</style>
<style  rel="stylesheet/scss" lang="scss" >
.van-step--horizontal .van-step__circle-container {
  background-color: #ecf8e4 !important;
}
</style>