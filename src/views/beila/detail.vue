<template>
    <Layout class="main">
        
        <van-nav-bar title="优选商品详情"  left-text="返回" @click-left="goBack"    left-arrow fixed> </van-nav-bar>
        <div class="content">
            <div class="divfix">
                <van-tabs v-model="active" fixed>
                    <!-- <van-tab title="直采直播">
                        <div class="pushaur">
                            
                            <div class="new_Producsale clearfix">
                                <div class="l">
                                    <div>
                                    <img :src="img" />
                                    </div> 
                                    <h1></h1>
                                    <h2>由哲童电子商务专供</h2>
                                </div> 
                                <div class="r">
                                    <h1>好韵味茶油野山椒豆豉十蒜香剁辣椒 258g/瓶 2瓶/组</h1> 
                                    <h2>提货时间: 09月03日 16:00</h2> 
                                    <h3><small>￥</small>7.9 <span>￥17</span></h3> 
                                    <span class="button5">立即购买</span>
                                </div>
                            </div>
                            
                        </div>
                        <P class="totle">目前共<b>2089</b>人参与购买，商品共销售<b>3055</b>份</P>
                        <div class="textList">
                            <div class="nr clearfix">
                                <dl>
                                    <dt>
                                            <van-icon name="clock" class="middle" /> <span>13小时前</span> 
                                    </dt>
                                    <dd>
                                    <div class="tit">
                                    商场PK实拍图来了，优选抢购价直降10元一组，只要7.9元2瓶，厂家真的放”大血“了，正宗湖南味，亲们开抢哦
                                    </div>
                                    <ul class="ul0">
                                    <li><img :src="img" style="display: inline;" /></li>
                                    </ul>
                                    <div class="heart clearfix">
                                    <span><van-icon class="middle" name="like-o"></van-icon> <em>赞</em><i></i></span>
                                    </div>
                                    <div class="peopleNumber">
                                            <van-icon class="middle" name="like-o"></van-icon> 捞刀河不捞刀，曲奇，刘有钱，彭伟红，平凡是福17773701098，爱善天使 ,睡莲，幸福年年，思
                                    </div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </van-tab> -->
                    <van-tab title="基本信息" >
                            
                    </van-tab>
                    <van-tab title="购买记录"> 
                        
                    </van-tab>
                </van-tabs>
            </div>
            
            <div class="topN" v-if="active==0">
                    <van-icon name="home" class="homePage" @click="goHome" />
                    <van-icon name="contact" class="userPage" @click="goUser" />
                    <van-swipe :autoplay="3000" class="banner">
                            <van-swipe-item v-for="item in productInfo.pictures">
                                <img :src="item.url | Imgurl" class="tImg" />
                            </van-swipe-item>
                           
                        </van-swipe>
                        <div class="productcontentBox2">
                                <div class="realPrice">
                                 <small>￥</small>{{productInfo.price*0.01}} 
                                </div> 
                                <div class="marketPrice">
                                  ￥{{productInfo.originalPrice*0.01}}
                                </div> 
                                <div class="text" v-if="onling">
                                  距离本商品结束还剩： 
                                </div> 
                                
                                <div class="countDown" v-if="onling">
                                  <span id="product-sec-countdown"></span>
                                 
                                </div> 
                                <div class="text big" v-if="!onling">
                                    已经结束
                                </div>
                                
                        </div> 
                        <div class="productContentBox3">
                            <div class="title">
                                {{productInfo.title}}
                            </div> 
                            <div class="subTitle">
                                <div class="l">
                                    {{productInfo.subtitle}}
                               
                                </div> 
                                <span class="rinkpeople">关注人数:{{productInfo.subscribers}}</span>
                            </div> 
                            <div class="pickUpTime clearfix">
                                <p v-if="productInfo.presellTime">预售时间:{{productInfo.presellTime | formatDate}}</p> 
                                <p v-if="productInfo.pickupTime" >提货时间:{{productInfo.pickupTime | formatDate}} </p> 
                                <div class="number">
                                已售 
                                <span class="red">{{productInfo.soldNumber}}</span> 份 
                              
                                <i v-if="productInfo.numberType==2">/ 限量 <span>{{productInfo.number}}</span> 份</i>                                
                                </div> 
                                <!---->
                            </div>
                        </div>
                        <div class="productContentBox4">
                            <i>数量</i>
                            <span><van-stepper v-model="value" /></span> 
                            
                        </div>
            
                        <div class="productContentBox5"><div class="tit">商品详情</div> <div class="information"><ul class="info"><li>供应商：</li> <li><span>{{productInfo.supplier}}</span></li> <li>品牌：</li> <li><span>{{productInfo.brand}}</span></li> <li>规格：</li> <li><span>{{productInfo.specification}}</span></li> <li>产地：</li> <li><span>{{productInfo.originPlace}}</span></li></ul></div></div>
            
                        <div class="productContentBox5">
                            <div class="tit">图文详情</div> 
                            <div class="desc" v-html="productInfo.description">

                            </div>
                         
                            <!-- <p>强烈推荐：食欲跟随美味，选我所爱、生活有时需要加点辣味。</p>
                            <p>食欲跟随美味，选我所爱、生活有时需要加点辣味。</p>
                            <div class="goodsimgs">
                                <img src="/static/images/s123.jpg" alt="">
                            </div> -->
                          
                        </div>
            </div>
            <div class="record topN" v-if="active==1">
                 <P class="totle">目前共<b>{{members}}</b>人参与购买，商品共销售<b>{{counts}}</b>份</P>
                <ul class="ullist">
                    <li v-for="v in ullist">
                        <span class="c0"></span><img :src="v.head | Imgurl" ></span>
                        <span class="c1">{{v.name}}</span>
                        <span class="c2"><b>{{v.count}}</b>份</span>
                        <span class="c3">{{v.createTime}}</span>
                    </li>
                </ul>
            </div>
        </div> 
        

        
        <van-goods-action> 
            <van-goods-action-mini-btn icon="cart"  :info="carNum" text="购物车" @click="onClickMiniBtn" />
            <van-goods-action-mini-btn :icon="isAdd?'like':'like-o'" :class="isAdd?'yes':''"  :text="isAdd?'已关注':'关注'" @click="onClickLike"  />
            <van-goods-action-big-btn text="加入购物车" @click="addToCar" />
            <van-goods-action-big-btn text="立即购买" @click="clickGobug" primary />
        </van-goods-action>
    </Layout>
    
    
</template>
<script>
import { getProductInfo, getMemberByOpenId,subscribe,unsubscribe,addMyCar,queryMyCar,buyRecord,buyRecordTotal,isSubscription } from "@/iao/home/query";
import {
  Toast,
  NavBar,
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn,
  Icon,
  Tab,
  Tabs,
  Swipe,
  SwipeItem,
  Stepper
} from "vant";
import { dees } from "@/config";
export default {
  name: "beila",

  data() {
    return {
      onling: true,
      active: 0,
      carNum: null,
      mailSpecial: [],
      sellGoodGoods: [],
      cateList: [],
      behaviorSupply: [],
      list: [],
      loading: false,
      finished: false,
      value: 1,
      timeD: "",
      isAdd:false,
      productInfo: {},
      img: "/static/images/qq.png",
      wxinfo: null,
      userinfo: null,
      mycar: [],
      members:0,
      counts:0,
      ullist:[]
    };
  },
  filters: {
    Imgurl: function(value) {
      if (!value) return "";

      value = "http://mgr.hnkbmd.com" + value;
      return value;
    }
  },
  mounted() {
    //this.init()
    this.queryProductInfo();
    this.wxinfo = JSON.parse(window.localStorage.getItem("wxinfo"));
    this.userinfo = JSON.parse(window.localStorage.getItem("userinfo"));
    if(this.userinfo){
        
        this.getMycar();
        isSubscription({
          'openId': this.userinfo.openId, 
          'productIds': this.$route.query.pid
        }).then(res=>{
          for(var key in res.data){  

          let v=this.$route.query.pid== key
             if(v){
               this.isAdd=true
             }
          } 
        })

    }
    this.value=this.$route.query.count?this.$route.query.count:1
    this.queryRecordTotal()
    this.queryRecord()
  },
  methods: {
    queryRecordTotal(){
      buyRecordTotal({'productId': this.$route.query.pid}).then(res=>{
          if(!res.code){
            this.members=res.data.members
            this.counts=res.data.counts?res.data.counts:0
          }
      })
    },
    queryRecord(){
      buyRecord({'productId': this.$route.query.pid}).then(res=>{
        if(!res.code){
            this.ullist=res.data
          }
      })
    },
    countdown(sec) {
      setTimeout(function() {
        var hour = 0;
        var minute = 0;
        var second = 0;
        var day = 0;
        setInterval(function() {
          if (sec >= 60) {
            minute = Math.floor(sec / 60);
            second = Math.floor(sec % 60);
            if (minute >= 60) {
              hour = Math.floor(minute / 60);
              minute = minute % 60;
              // if(hour>=24){
              //     day = Math.floor(hour / 24)
              //     hour = hour % 24
              // }
            } else {
              hour = 0;
            }
          } else {
            second = sec;
            hour = 0;
            minute = 0;
          }

          hour = hour * 1 < 10 && hour * 1 > 0 ? "0" + hour : hour;
          minute = minute * 1 < 10 && minute * 1 > 0 ? "0" + minute : minute;
          second = second * 1 < 10 && second * 1 > 0 ? "0" + second : second;
          var countdownStr = hour + "：" + minute + "：" + second;
          if(document.getElementById("product-sec-countdown")){
              document.getElementById("product-sec-countdown").innerHTML = countdownStr;
          }
          
          //this.timeD=countdownStr
          sec--;
          if (sec <= 0) {
            window.location.reload();
          }
        }, 1000);
      }, 1000);
    },
    queryProductInfo() {
      getProductInfo({
        productId: this.$route.query.pid
      }).then(res => {
        this.productInfo = res.data;
        let date = new Date(res.data.offShelfTime);
        let d = (date.getTime() - res.data.currentTimeMillis) / 1000;

        this.$nextTick(() => {
          if (d > 0) {
           
            this.countdown(d); //结束时间到开始时间的时间差，单位秒
          } else {
            this.onling=false
            //document.getElementById('product-sec-countdown').innerHTML="已结束"
          }
        });
        console.log(res);
      });
    },
    onClickMiniBtn() {
      //this.$router.push('/car');
      if (!this.wxinfo) {
        let url =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx43fd4135600dcee3&redirect_uri=" +
          dees.limitUrl +
          "&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
        window.location.href = url;
      } else {
        //alert(2)
        this.checkout(1);
      }
    },
    getMycar() {
       
      queryMyCar({
        memberId: this.userinfo.memberId
      }).then(res => {
        this.mycar = res.data;
           
        if (this.mycar && this.mycar.length > 0) {
          this.mycar.forEach(el => {
            //console.info(el.num)
            this.carNum += el.num;
          });
        }
      });
    },
    addToCar() {
      this.carNum += this.value;
      if (!this.userinfo) {
        let goodsIndex = this.mycar.findIndex(
          good => good.productId == this.$route.query.pid
        );
        if (goodsIndex === -1) {
          this.mycar.push({
            productId: this.$route.query.pid,
            num: this.value
          });
        } else {
          this.mycar[goodsIndex].num +=this.value;
        }
        console.info(window.localStorage.getItem("mycar"));
        window.localStorage.setItem("mycar", JSON.stringify(this.mycar));
      } else {
        this.addtoMyCar();
      }
    },
    addtoMyCar() {
      addMyCar({
        productId: this.$route.query.pid,
        memberId: this.userinfo.memberId,
        num: this.value
      }).then(res => {
        //Toast(res.code);
      });
    },
    onClickLike(){
       
       if (!this.wxinfo.openid){
          let url =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx43fd4135600dcee3&redirect_uri=" +
          dees.limitUrl +
          "&response_type=code&scope=snsapi_userinfo&state=0#wechat_redirect";
        window.location.href = url;
       }
        if(this.isAdd){
          
            this.clickSubscribe()
        }else{
           
            this.clickUnsubscribe()
        }
    },
    clickSubscribe() {
      if (this.wxinfo.openid) {
        subscribe({
          productId: this.$route.query.pid,
          openId: this.wxinfo.openid
        }).then(res => {
this.isAdd=!this.isAdd
        });
      }
    },
    clickUnsubscribe() {
        
        if (this.wxinfo.openid) {
        unsubscribe({
          productId: this.$route.query.pid,
          openId: this.wxinfo.openid
        }).then(res => {
            this.isAdd=!this.isAdd
        });
      }
     
     
    },
    clickGobug(){
        if(this.wxinfo.openid){
          
            if(!this.userinfo) {
               
                this.$router.push("/loginment?state=0&pid="+this.$route.query.pid+"&count="+this.value);
                
            }else{
               
                 this.$router.push("/submit?from=mast&pid="+this.$route.query.pid+"&count="+this.value);
            }

        }else{
             let url =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx43fd4135600dcee3&redirect_uri=" +
          dees.limitUrl +
          "&response_type=code&scope=snsapi_userinfo&state=0#wechat_redirect";
        window.location.href = url;
        }
        
    },
    goBack() {
      this.$router.back(-1);
    },
    goHome() {
      this.$router.push(
        "/index?py=" + window.localStorage.getItem("shopcode")
      );
    },
    goUser() {
      // this.$router.push('/user');
      if (!this.wxinfo) {
        let url =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx43fd4135600dcee3&redirect_uri=" +
          dees.limitUrl +
          "&response_type=code&scope=snsapi_userinfo&state=2#wechat_redirect";
        window.location.href = url;
      } else {
        //alert(2)
        this.checkout(2);
      }
    },
    checkout(a) {
      //alert(this.wxinfo)
      getMemberByOpenId({
        openId: this.wxinfo.openid
      }).then(res => {
        if (res.code == 0) {
          window.localStorage.setItem("userinfo", JSON.stringify(res.data));
          if (a == 1) {
              this.$router.push( "/mycar?py=" + window.localStorage.getItem("shopcode"));
          }
          if (a == 2) {
            this.$router.push(
              "/user?py=" + window.localStorage.getItem("shopcode")
            );
          }
          // this.$router.push( "/mycar?py=" + window.localStorage.getItem("shopcode"));
          //window.location.href="/car?form=limit"
        } else if (res.code == 2) {
          this.$router.push("/loginment?state="+a);
        } else if (res.code == 3) {
          let url =
            "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx43fd4135600dcee3&redirect_uri=" +
            dees.limitUrl +
            "&response_type=code&scope=snsapi_userinfo&state="+a+"#wechat_redirect";
          window.location.href = url;
        }
      });
    }
  },
  components: {
    //Tabbar, TabbarItem
    [GoodsAction.name]: GoodsAction,
    [GoodsActionBigBtn.name]: GoodsActionBigBtn,
    [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [SwipeItem.name]: SwipeItem,
    [Swipe.name]: Swipe,
    [Stepper.name]: Stepper,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon
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
.record,
.pushaur {
  background: #fff;
}
.desc {
  font-size: 12px;
  padding: 10px;
  color: #666;
  img {
    display: block;
  }
}
.yes{
    color: #f85;
}
.main {
  background-color: #f1f1f1;
}
.topN {
  margin-top: 45px;
}
.content {
  margin: 45px 0px;
}
.totle {
  border-bottom: solid 1px #f1f1f1;
  padding: 10px;
  text-align: center;
  font-size: 1.2rem;
  background: #fff;
  b {
    color: #ff0000;
  }
}
.banner {
  border-top: solid #f9f9f9 6px;
}

.divfix {
  position: fixed;
  z-index: 2;
  width: 100%;
}
.userPage {
  position: fixed;
  top: 100px;
  right: 20px;
  font-size: 18px;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 10px;
  border-radius: 50%;
}
.homePage {
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 10px;
  border-radius: 50%;
  position: fixed;
  top: 100px;
  left: 20px;
  font-size: 18px;
  z-index: 1;
}
.ullist {
  li {
    margin: 10px;
    box-sizing: border-box;
    img {
      vertical-align: middle;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      margin-right: 10px;
    }
    span {
      vertical-align: middle;
      display: inline-block;
    }

    .c1 {
      width: 25%;
    }
    .c2 {
      width: 15%;
    }
    .c3 {
      width: 40%;
      text-align: right;
    }
    b {
      color: #ff0000;
    }
  }
}
.tImg {
  width: 100%;
  height: 220px;
}
.productcontentBox2 {
  clear: both;
  width: 100%;
  height: 44px;
  background: url(/static/images/product.jpg);
  background-size: cover;
  position: relative;
}
.productcontentBox2 .realPrice {
  position: absolute;
  left: 10px;
  top: 10px;
  color: #fff;
  font-size: 24px;
  line-height: 100%;
}
.productcontentBox2 .realPrice small {
  font-size: 16px;
}
.productcontentBox2 .marketPrice {
  position: absolute;
  left: 100px;
  top: 20px;
  color: #fff;
  font-size: 14px;
  line-height: 100%;
  text-decoration: line-through;
}
.productcontentBox2 .text {
  position: absolute;
  right: 5px;
  top: 1rem;
  font-size: 1.2rem;
  line-height: 1.2rem;
  color: #ffffff;
}
.productcontentBox2 .countDown {
  position: absolute;
  width: 10rem;
  height: 1.6rem;
  bottom: 0.6rem;
  right: 0rem;
  color: #ffffff;
}
.productcontentBox2 .countDown span {
  font-size: 1.25rem;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
}
.productcontentBox2 .countDown i {
  font-style: normal;
  font-size: 0.7rem;
}
.productContentBox3 {
  background: #fff;
  width: 100%;
  border-bottom: 1px solid #e7e7e7;
  margin-bottom: 0.375rem;
}
.productContentBox3 .title {
  padding: 1rem 1rem;
  color: #404040;
  font-size: 1.25rem;
  line-height: 1.25rem;
  margin-bottom: 0.2rem;
  width: 100%;
  margin: 0 auto;
}
.productContentBox3 .subTitle {
  color: #909090;
  font-size: 1rem;
  line-height: 1rem;
  margin-bottom: 0.2rem;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 0.6rem;
  position: relative;
  padding-left: 1rem;
}
.productContentBox3 .pickUpTime {
  font-size: 1rem;
  color: #e70a1b;
  border-top: 1px solid #e7e7e7;
  position: relative;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
  margin: 0 0.8rem;
  min-height: 2.5rem;
}
.productContentBox3 .number {
  font-size: 0.55rem;
  color: #404040;
  position: absolute;
  right: 0rem;
  top: 0.45rem;
}
.productContentBox3 .number i {
  font-style: normal;
}
.productContentBox3 .subTitle {
  min-height: 1rem;
}
.productContentBox3 .subTitle .l {
  margin-top: 0.5rem;
  line-height: 1.2rem;
  padding-right: 12rem;
  word-wrap: break-word;
}
.productContentBox3 .subTitle .rinkpeople {
  position: absolute;
  background: #fcae04;
  padding: 0.45rem 0.4rem;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  color: #fff;
  right: 0.8rem;
  top: -0.3rem;
  font-size: 0.45rem;
  text-decoration: none;
}
.red {
  color: #ff0000;
}
.productContentBox4 {
  background: #fff;
  width: 100%;
  border-bottom: 1px solid #e7e7e7;
  margin-bottom: 0.375rem;
  height: 5rem;
  position: relative;
  border-top: 1px solid #e7e7e7;
  text-align: center;
}
.productContentBox4 span {
  display: inline-block;
  margin-top: 0.9rem;
}
.productContentBox4 i {
  position: absolute;
  left: 0.8rem;
  top: 1.8rem;
  font-style: normal;
  color: #909090;
  font-size: 1rem;
}
.productContentBox5 {
  background: #fff;
  width: 100%;
  border-bottom: 1px solid #e7e7e7;
  margin-top: 0.3rem;
  border-top: 1px solid #e7e7e7;
  padding: 0.675rem 0px;
  overflow: hidden;
}
.productContentBox5 .tit {
  width: 100%;
  height: 2.5rem;
  background: url(/static/images/r50_c16.jpg) center no-repeat;
  background-size: 80% auto;
  margin: 0 auto;
  text-align: center;
  font-size: 1.25rem;
  line-height: 1.5rem;
  overflow: hidden;
}
.productContentBox5 .information {
  width: 80%;
  margin: 0 auto;
}
.productContentBox5 .information ul.info {
  margin-top: 0.75rem;
}
.productContentBox5 .information ul.info li {
  float: left;
  height: 2.625rem;
  border: 1px solid #e6e6e6;
  overflow: hidden;
  font-size: 1.25rem;
  margin-top: -1px;
}
.productContentBox5 .information ul.info li:nth-child(2n + 1) {
  width: 30%;
  text-align: center;
  line-height: 2.625rem;
  color: #999;
}
.productContentBox5 .information ul.info li:nth-child(2n) {
  width: 70%;
  line-height: 2.625rem;
  margin-left: -1px;
  color: #404040;
}
.productContentBox5 .information ul.info li:nth-child(2n) span {
  padding-left: 0.9rem;
}
.productContentBox5 p {
  padding: 0.5rem 0.8rem;
  color: #888888;
}
.productContentBox5 .goodsimgs img {
  width: 100%;
}
.new_Producsale {
  background: #fff;
  height: auto;
  border-top: 1px solid #e9e9e9;
  margin-top: 0.6rem;
  margin-bottom: 0.6rem;
  border-bottom: 1px solid #e9e9e9;
}
.new_Producsale .l {
  float: left;
  margin: 0.4rem 0.825rem 0px 0.45rem;
  width: 8rem;
  height: 8rem;
  position: relative;
}
.new_Producsale .l img {
  width: 8rem;
  height: 8rem;
}
.new_Producsale .l h1 {
  position: absolute;
  font-weight: normal;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 1.5rem;
  background: rgba(253, 143, 92, 0.8);
  z-index: 1;
}
.new_Producsale .l h2 {
  position: absolute;
  font-weight: normal;
  overflow: hidden;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 1.5rem;
  z-index: 2;
  text-align: center;
  color: #fff;
  line-height: 1.5rem;
  font-size: 0.95rem;
}
.new_Producsale .r {
  padding-left: 8.8rem;
  position: relative;
}
.new_Producsale .r h1 {
  font-size: 1.2rem;
  color: #232323;
  line-height: 1.2;
  font-weight: normal;
  padding-top: 0.8rem;
  padding-bottom: 0.6rem;
}
.new_Producsale .r h2 {
  font-size: 1.2rem;
  color: #da0000;
  font-weight: normal;
  padding-bottom: 0.6rem;
}
.new_Producsale .r h3 {
  font-size: 1.8rem;
  color: #da0000;
  font-weight: normal;
}
.new_Producsale .r h3 small {
  font-size: 0.5rem;
}
.new_Producsale .r h3 span {
  font-size: 0.5rem;
  color: #949494;
  text-decoration: line-through;
  margin-left: 0.3rem;
}
.new_Producsale .r .button5 {
  font-size: 1.2rem;
  padding: 0.6rem 1rem;
  background: #e40017;
  border-radius: 5px;
  -moz-border-radius: 0.5rem;
  -webkit-border-radius: 5px;
  color: #fff;
  line-height: 1.65rem;
  position: absolute;
  bottom: 10px;
  right: 15px;
}
.textList {
  background: #fff;
  padding: 0.8rem;
  font-size: 1.3rem;
  vertical-align: middle;
  margin-top: 0.6rem;
}
.textList dd {
  padding: 0;
  margin: 0;
}
.textList img {
  width: 100%;
}
.productcontentBox2 .big {
  font-size: 1.6rem;
  line-height: 2.3rem;
  right: 10px;
}
.middle {
  vertical-align: middle;
  font-size: 14px;
}
.ul0 {
  li {
    width: 30%;
  }
}
dt {
  color: #247df5;
  vertical-align: middle;
}
.tit {
  line-height: 1.5;
  font-size: 1.2rem;
  padding: 0.5rem;
}
.heart span {
  background: rgba(255, 0, 0, 0.1);
  padding: 0.3rem 0.8rem 0.15rem 0.8rem;
  border-radius: 4px;
  float: right;
  color: #f00;
  em {
    font-style: normal;
  }
}
dd .peopleNumber {
  padding: 0.4rem;
  background: #e6e6e6;
  border-radius: 8px;
  -moz-border-radius: 8px;
  -webkit-border-radius: 8px;
  overflow: hidden;
  margin-top: 0.8rem;
  float: left;
  font-size: 1rem;
  color: #576b95;
  line-height: 1.5;
  .middle {
    color: #247df5;
  }
}
</style>