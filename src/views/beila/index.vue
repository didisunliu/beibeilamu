<template>
    <Layout class="main">
        <div class="topLogo" >
            <img src="/static/images/logo.png" class="logo">
            <img src="/static/images/font.png" class="font">
            <!-- 贝拉优选
            <span class="topfl">一家有爱的社区优选</span> -->
        </div>
        <!-- <van-nav-bar title="标题" fixed class="topLogo" >
            fdf
        </van-nav-bar> -->
        <van-loading type="spinner"  v-show="showLoading" color="white" class="loading" />
        <div class="userInfo">
                <van-search placeholder="请输入搜索关键词" v-model="value" @input="onSearch" />
                
              <div class="infomation clearfix">
                <img :src="shopDes.head " >
                <p><label>ID：</label>{{shopDes.distributorId}}</p>
                <p><label><van-icon name="shop" class="icon" />：</label>{{shopDes.shopName}}</p>
                <p class="t" v-if="shopDes.provinceName"><label><van-icon name="location" class="icon" />：</label>{{shopDes.provinceName+shopDes.cityName+shopDes.areaName+shopDes.address}}</p>
          
                <span>购买指数<br><b>{{soldNum}}</b><br>
                    粉丝数<br><b>{{fansNum}}</b>
                </span>
                
              </div>
        </div>

        <van-list v-model="loading" :finished="finished" @load="onLoad" :offset="10" class="glist">
            
            <van-cell v-for="(item,index) in list"  class="goodsItem" >
                <p class="shoptitle">本商品由{{item.supplier}}专供</p>
                <p class="" :class="item.state==3 ? 'over' : 'pos' "  @click="goDetail(item.productId)"><img :src="item.mainPictureUrl | Imgurl" class="goodsImg" /> <b class="pos1">{{item.subtitle}}</b> <b class="pos2">{{item.tag}}</b>
                <span v-if="item.state==3">已售罄</span>
                </p>
                <p class="goodsTitle"  @click.stop="goDetail(item.productId)">{{item.title}}   <br><span class="guige">{{item.specification}}</span> </p>
                <p class="redp clearfix"><template v-if="item.presellTime">预售时间：{{item.presellTime | formatDate}}</template><span>已售 <b>{{item.soldNumber}}</b> 份<template v-if="item.numberType==2">/ 限量{{item.number}}份</template></span></p>
                <p class="redp clearfix"  v-if="item.pickupTime">提货时间：{{item.pickupTime | formatDate}}</p>
                <p class="redp clearfix">￥<big>{{(item.price*0.01).toFixed(2)}}</big> <del>￥{{(item.originalPrice*0.01).toFixed(2)}}</del></p>
                <b :class="item.isAdd?'like yes':'like'" @click="onClickLike(item)"><van-icon :name="item.isAdd?'like':'like-o'"      /> <i>{{item.isAdd?'已关注':'关注'}}</i></b> 
                <a v-if="item.state==3" class="disable">加入购物车</a>
                <a v-else @click="addToCar(item)">加入购物车 <span class="point"  v-if="usernums[item.productId]">{{usernums[item.productId]}}</span></a>
                
            </van-cell>
            
        </van-list>
        <van-tabbar v-model="active" fixed>
            <van-tabbar-item icon="shop" @click="goPage(0)">店铺</van-tabbar-item>
            <van-tabbar-item icon="shopping-cart" @click="goPage(1)" :info="carNum">购物车</van-tabbar-item>
            <van-tabbar-item icon="contact"  @click="goPage(2)">我的</van-tabbar-item>
            
        </van-tabbar>
        
        
    </Layout>
    
    
</template>
<script>
import {
  getSupplyList,
  getMemberByOpenId,
  getShopDes,
  addMyCar,
  queryMyCar,
  unsubscribe,
  subscribe,
  isSubscription
} from "@/iao/home/query";
import {
  Loading,
  Toast,
  List,
  NavBar,
  Cell,
  Search,
  Tabbar,
  TabbarItem,
  Icon
} from "vant";
import { dees } from "@/config";
export default {
  name: "beila",

  data() {
    return {
      isAdd:false,
      showLoading:true, 
      wxname: "wxname",
      active: 0,
      carNum: null,
      mailSpecial: [],
      sellGoodGoods: [],
      cateList: [],
      behaviorSupply: [],
      list: [],
      loading: false,
      finished: false,
      value: "",
      fansNum: null,
      soldNum: null,
      usernums:{},
      formLine: {
        title: null,
        "pager.pageNum": 1,
        "pager.pageSize": 10,
        "pager.orderBy": null,
        "pager.orderType": null
      },
      wxinfo: null,
      userinfo: null,
      mycar:[],
      shopDes: {},
      shopcode:null
    };
  },

  mounted() {
    
    this.wxinfo = JSON.parse(window.localStorage.getItem("wxinfo"));
    this.userinfo = JSON.parse(window.localStorage.getItem("userinfo"));
    if(this.$route.query.py){
      window.localStorage.setItem("shopcode",this.$route.query.py)
    }
    
    if (!this.userinfo) {
      this.mycar = JSON.parse(window.localStorage.getItem("mycar"))?JSON.parse(window.localStorage.getItem("mycar")):[];

      if (this.mycar && this.mycar.length > 0) {
        this.mycar.forEach(el => {
          //console.info(el.num)
          this.carNum += el.num;
          this.usernums[el.productId]=el.num
        });
        
      }
    } else {
      this.getMycar();
    }

    this.queryShopDes();
  },

  methods: {
    onClickLike(e){
    
       if (!this.wxinfo){
          let url =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx43fd4135600dcee3&redirect_uri=" +
          dees.limitUrl +
          "&response_type=code&scope=snsapi_userinfo&state=0#wechat_redirect";
        window.location.href = url;
       }else{
        
          if(!e.isAdd){
           
              this.clickSubscribe(e)
              
          }else{
           
              this.clickUnsubscribe(e)
          }
       }
        
    },
    clickSubscribe(e) {
     
      if (this.wxinfo.openid) {
        subscribe({
          productId: e.productId,
          openId: this.wxinfo.openid
        }).then(res => {
          
            Toast("关注成功")
            //this.list[this.list.findIndex(v=>v.productId==e.productId)].isAdd=ture
           e.isAdd=ture
        });
      }
    },
    clickUnsubscribe(e) {
        if (this.wxinfo.openid) {
        unsubscribe({
          productId: e.productId,
          openId: this.wxinfo.openid
        }).then(res => {
            Toast("取消成功")
           // this.list[this.list.findIndex(v=>v.productId==e.productId)].isAdd=true
         e.isAdd=false
            
        });
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
             this.usernums[el.productId]=el.num
          });
        }
      });
    },
    addToCar(e) {
    
     if(e.number>0){

     
      
      if (!this.userinfo) {
        this.carNum += 1;
        let goodsIndex
          if(this.mycar){
             goodsIndex= this.mycar.findIndex( good => good.productId == e.productId);
          }
          
        
        
        if (goodsIndex === -1 || !this.mycar) {
          this.mycar.push({
            productId: e.productId,
            num: 1
          });
           this.usernums[e.productId]= 1
        } else {
          if(this.mycar[goodsIndex].num<(e.number-e.soldNumber)){
            this.mycar[goodsIndex].num++;
            this.usernums[e.productId]= this.usernums[e.productId]+1
          }else{
            this.carNum=this.carNum-1
            Toast("库存不足")
          }
          
        }
       
        window.localStorage.setItem("mycar", JSON.stringify(this.mycar));

        
        console.log(this.mycar)
      } else {
        //this.usernums[e.productId]=el.num
        if(this.usernums[e.productId]<(e.number-e.soldNumber)){
          this.addtoMyCar(e);
          this.carNum += 1;
        }else{
           Toast("库存不足")
        }
        
      }
      }else{
         Toast("库存不足")
      }
    },
    addtoMyCar(e) {
      addMyCar({
        productId: e.productId,
        memberId: this.userinfo.memberId,
        num: 1
      }).then(res => {
        //Toast(res.code);
      });
    },
    querySupply(d) {
      //console.log(123)
      getSupplyList(d).then(res => {
        //console.info(res.data)

        if (!res.code) {
          this.showLoading=false
          if (res.data.length == 0) {
            this.finished = true;
          } else {
            res.data.forEach(e=>{
              e.isAdd=false
            })
            this.list.concat(res.data) ;
          
            let productIds=res.data.map(v=>v.productId.toString()).join()
            
            if(this.userinfo){
              this.querySubscription({
                'openId': this.userinfo.openId, 
                'productIds': productIds
              })
            }
            this.formLine["pager.pageNum"] = this.formLine["pager.pageNum"] + 1;
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
    onLoad() {
      this.querySupply(this.formLine);
    },
    onSearch(r) {
      //console.log(r)
      this.formLine.title = r;
      this.formLine["pager.pageNum"] = 1;
      getSupplyList(this.formLine).then(res => {
        //console.info(res.data)

        if (!res.code) {
          this.list = res.data;
        }
      });
    },
    goDetail(d) {
      this.$router.push("/detail?pid=" + d);
    },
    goPage(a) {
      //alert(this.userinfo)
      if (!this.wxinfo) {
        //alert(1)
        let url =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx43fd4135600dcee3&redirect_uri=" +
          dees.limitUrl +
          "&response_type=code&scope=snsapi_userinfo&state=" +
          a +
          "#wechat_redirect";
        window.location.href = url;
      } else {
        //alert(2)
        this.checkout(a);
      }

      //this.$router.push('/detail');
    },
    queryShopDes() {
      getShopDes({
        py: window.localStorage.getItem("shopcode")
      }).then(res => {
         
          if(!res.code && res.data){
            this.soldNum = res.data.soldNum;
            this.fansNum = res.data.fansNum;
            document.title = res.data.distributor.shopName;
            this.shopDes = res.data.distributor;
          }
       
      });
    },
    checkout(a) {
      //alert(this.wxinfo)
      getMemberByOpenId({
        openId: this.wxinfo.openid
      }).then(res => {
        if (res.code == 0) {
          window.localStorage.setItem("userinfo", JSON.stringify(res.data));
          if (a == 1) {
            this.$router.push({path:"/mycar?py="+window.localStorage.getItem("shopcode")});
            //window.location.href="/car?form=limit"
          } else if (a == 2) {
            this.$router.push({path:"/user?py="+window.localStorage.getItem("shopcode")}
            // this.$router.push(
            //   "/user?py=" + this.$route.query.py
             );
          }
        } else if (res.code == 2) {
          this.$router.push("/loginment?state=" + a);
        } else if (res.code == 3) {
          let url =
            "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx43fd4135600dcee3&redirect_uri=" +
            dees.limitUrl +
            "&response_type=code&scope=snsapi_userinfo&state=" +
            a +
            "#wechat_redirect";
          window.location.href = url;
        }
      });
    },

    
    //查询是否关注
    querySubscription(data){
     //this.value=data.openId
      isSubscription(data).then(res=>{
       // alert(JSON.stringify())
        for(var key in res.data){  

          let v=this.list.findIndex( good => good.productId == key)
             if(v>-1){
               this.list[v].isAdd=true
             }
        }   
      })
    }
  },
  components: {
    //Tabbar, TabbarItem
    [Loading.name]: Loading,
    [List.name]: List,
    [Cell.name]: Cell,
    [Search.name]: Search,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon
  }
 
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.point{
  display: inline-block;
  width: 14px;
  height: 14px;
  line-height: 14px;
  text-align: center;
  border-radius: 50%; 
  background-color: #fff;
  float: right;
  color:#d30000;
  margin-right: -5px;
}
.guige {
  color: #888;
  font-size: 12px;
}
.pos {
  position: relative;
  .pos1 {
    position: absolute;
    bottom: 0px;
    background-color: rgba(228, 5, 5, 0.6);
    padding: 2px 10px 0px 10px;
    line-height: 20px;
    border-top-right-radius: 30px;
    color: #fff;
    font-size: 12px;
    font-weight: normal;
  }
  .pos2 {
    position: absolute;
    top: 0px;
    right: 10px;
    width: 54px;
    background-color: yellow;
    padding: 5px 12px;
    font-size: 15px;
    line-height: 18px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    color: #f00;
  }
}
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.topfl {
  margin-left: 5px;
  font-size: 12px;

  font-weight: normal;
}
.like {
  position: absolute;
  right: 100px;
  bottom: 0px;
  font-size: 12px;
  font-weight: normal;
  color: #999;
  background: #fff;
  border: solid 1px #999;
  padding: 1px 12px 0px 12px;
  border-radius: 15px;
  vertical-align: middle;
  i {
    vertical-align: middle;
  }
}
.yes{
    color: #f85;border: solid 1px #f85;
}
.main {
  background-color: #f5f5f5;
}
.topLogo {
  background: #167108;
  text-align: left;
  color: #fff;

  font-size: 20px;
  font-weight: 400;
  line-height: 50px;
  height: 45px;
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
  z-index: 2;
  img.logo {
    width: 40px;
    height: auto;
    margin-left: 10px;
    margin-top: -8px;
  }
  img.font {
    height: 35%;
    margin-left: 20px;
  }
}
.userInfo {
  margin-top: 45px;
}
.van-search {
  padding-left: 7px !important;
  padding-right: 7px !important;
}
.van-tabbar-item--active {
  color: #55bb22;
}
.glist {
  padding-bottom: 50px;
}
.infomation {
  background: #fff;
  padding: 10px;
  margin-bottom: 10px;
  position: relative;
  font-size: 12px;
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    float: left;
  }
  p {
    padding-left: 70px;
    line-height: 18px;
    label {
      color: #999;
    }
    .icon {
      font-size: 13px;
      vertical-align: middle;
      margin-right: 0px;
    }
  }
  p.t {
    padding-right: 60px;
    label {
      display: inline-block;
      height: 30px;
      float: left;
    }
  }
  span {
    text-align: right;
    position: absolute;
    right: 10px;
    top: 10px;
    color: #999;
    font-size: 12px;
    b {
      color: #ff0000;
    }
  }
}
.goodsItem {
  position: relative;
  margin: 10px 0px;
  img {
    border-radius: 8px;
    width: 100%;
  }
  .shoptitle {
    text-align: center;
    padding-bottom: 3px;
    color: #888;
    font-size: 12px;
  }
  a {
    position: absolute;
    right: 0px;
    bottom: 0px;
    display: inline-block;
    padding: 2px 8px;
    background: #ff0000;
    color: #fff;
    border-radius: 15px;
    z-index: 1;
    font-size: 12px;
  }
  a.disable {
    background: #ddd;
  }
  .redp {
    color: #ff0000;
    font-size: 12px;
    line-height: 26px;
    span {
      color: #888;
      float: right;
      b {
        color: #ff0000;
      }
    }
  }
  .over {
    position: relative;

    span {
      position: absolute;
      top: 50%;
      left: 50%;
      color: #333;
      z-index: 1;
      margin-top: -30px;
      margin-left: -30px;
      display: inline-block;
      width: 60px;
      height: 60px;
      line-height: 60px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.8);
      text-align: center;
    }
  }
  .over:after {
    display: block;
    border-radius: 8px;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    content: "";
    position: absolute;
    left: 0;
    top: 0px;
  }
  del {
    color: #999;
  }
  .goodsTitle {
    border-bottom: solid 1px #f1f1f1;
    padding: 5px 0px;
    margin-bottom: 5px;
  }
}
.van-loading{
      color: white;
    position: fixed;
    z-index: 9;
    padding: 10px;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, .5);
    width: 60px;
    height: 60px;
    top: 50%;
    left: 50%;
    margin-top: -30px;
    margin-left: -30px;
}
</style>