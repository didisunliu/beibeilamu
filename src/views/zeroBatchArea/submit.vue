<template>
    <Layout class="main">
        
        <van-nav-bar title="确认订单"  left-text="返回" @click-left="goBack"    left-arrow fixed> </van-nav-bar>
        <div class="content">
          <div class="chooseType">
            <!-- <van-radio-group v-model="radio" @change="changeFun">
              <van-radio name="1" class="ddes">自提</van-radio>
              <van-radio name="2" class="ddes">快递</van-radio>
            </van-radio-group>  -->
            <van-tabs type="card" v-model="active" @change="changeFun">
            <van-tab  title="自提"></van-tab>
            <van-tab  title="快递"></van-tab>
            </van-tabs>
          </div>
          
            <div class="userInfo" v-if="active==0">
                <p class="hed">收货人：<input type="text" :value="username"> <input type="text" :value="usertel"></p>
                <p class="blank" v-if="shopinfo.distributor">提货地点：{{shopinfo.provinceName+shopinfo.cityName+shopinfo.areaName+shopinfo.distributor.address}} {{shopinfo.distributor.name}}</p>
                <p class="red" v-if="shopinfo.distributor">自提点：{{shopinfo.distributor.address+shopinfo.distributor.shopName}} {{shopinfo.distributor.mobile}}</p>
            </div>
            <div class="userInfo" v-if="active==1">
              <van-cell-group>
                  <van-cell  @click="chooseAddress" is-link >
                    <span slot="title"  v-if="addressinfo.name">
                        收货人：{{addressinfo.name}}<br>
                        手机：{{addressinfo.mobile}}<br>
                        收件地址：{{addressinfo.provinceName+addressinfo.cityName+addressinfo.areaName+addressinfo.address}}
                    </span>
                  </van-cell>

                </van-cell-group>
                
            </div>
                <van-card  v-for="item in orderList" :title="item.title"
                            :desc="item.specification"  
                            :num="item.num"
                            :price="item.price*0.01"
                            :thumb="item.mainPictureUrl"
                          > 
                            <div slot="tags">
                                    <p class="redp">￥<big>{{item.price*0.01}}</big> <del>￥{{item.originalPrice*0.01}}</del></p>
                            </div>
                            <div slot="footer">
                                    <!-- <p class="redp">09月05日 16:00提货</p> -->
                            </div>
                          </van-card>
                      

                          <div class="orderInfo">
                              <p class="tright">共{{goodsnumber}}件商品 合计：<span>￥<big>{{(totel*0.01).toFixed(2)}}</big></span></p>
                              <p class="tright" v-if="active==1">邮费：<span>￥<big>{{(ems*0.01).toFixed(2)}}</big></span></p>
                              <p class="tright">应付金额：<span>￥<big>{{((totel+ems)*0.01).toFixed(2)}}</big></span></p>
                          </div>
            
        </div> 



        <van-submit-bar class="bt"
  :price="totel+ems"
  button-text="提交订单"
  @submit="onSubmit"
/>
<van-popup v-model="show" position="bottom" :overlay="true">
    <div class="out">
        <p class="p1" v-if="radio==1">此商品需要您到店自提，请仔细确认地址！</p>
        <p class="p1" v-if="radio==2">此商品需要您要求邮寄，请仔细确认地址！</p>
        <p class="p2" v-if="radio==1 && shopinfo.distributor">提货地点：{{shopinfo.provinceName+shopinfo.cityName+shopinfo.areaName+shopinfo.distributor.address}} {{shopinfo.distributor.name}}</p>
        <p class="p3" v-if="radio==1 && shopinfo.distributor">（自提点：{{shopinfo.distributor.address+shopinfo.distributor.shopName}} {{shopinfo.distributor.mobile}}）</p>
        <p class="p2" v-if="radio==2" > 收货人：{{addressinfo.name}} 
                        手机：{{addressinfo.mobile}}<br>
                        收件地址：{{addressinfo.provinceName+addressinfo.cityName+addressinfo.areaName+addressinfo.address}} </p>
        
        
        <p class="p4" v-if="radio==1">09月05号 16:00提货</p>
        <div class="btbox">
            <van-row gutter="10">
                <van-col span="12"><van-button size="large" type="default" plain @click="show=false">取消付款</van-button></van-col>
                <van-col span="12"><van-button size="large" type="danger" @click="goOnline" plain>确认订单</van-button></van-col>
            </van-row>
                      
            
            
        </div>
    </div>
  </van-popup>
    </Layout>
    
    
</template>
<script>
import { getShopDes, addOrder, enterOrder,buyNow } from "@/iao/home/query";
import {
  Toast,
  NavBar,
  Icon,
  SubmitBar,
  Checkbox,
  Cell,
  CheckboxGroup,
  Row,
  Col,
  SwipeCell,
  Stepper,
  Card,
  Popup,
  Button,
  RadioGroup, Radio,CellGroup,Tabs,Tab 
} from "vant";

export default {
  name: "ZeroBatchArea",
  computed: {},
  data() {
    return {
      active: 0,
      checked: false,
      show: false,
      radio:"1",
      username: "",
      usertel: "",
      result: ["a"],
      orderList:[],
      shopinfo: {},
      addressinfo: {},
      imageURL: "/static/images/qq.png",
      wxinfo: null,
      userinfo: null,
      totel:null,
      goodsnumber:null,
      goods:[],
      ems:0,
      you:0
    };
  },
  mounted() {
    //this.init()
    
    //this.goodsnumber=window.location.href
    this.wxinfo = JSON.parse(window.localStorage.getItem("wxinfo"));
    this.userinfo = JSON.parse(window.localStorage.getItem("userinfo"));
    if(this.userinfo){
 this.username = this.userinfo.name;
    this.usertel = this.userinfo.mobile;
    }
    this.active=this.$route.query.active
    this.radio=this.$route.query.active==1?2:1
    this.queryShopDes();
    if(this.$route.query.from=="mast"){
     
      this.goToBuy()
    }else{
      this.getMycar()
    }
    
  },
  methods: {
    queryShopDes() {
      getShopDes({
        py: this.$route.query.shopdescode || window.localStorage.getItem("shopcode")
      }).then(res => {
        //  console.log(res)
        this.shopinfo = res.data;
        document.title = res.data.distributor.shopName;
      });
    },
    chooseAddress(){
      this.$router.push("/adresslist?from=submit&shopdescode="+window.localStorage.getItem("shopcode")+"&pid="+this.$route.query.pid+"&count="+this.$route.query.count)
    },
    goToBuy(){
      
      buyNow({
        memberId :this.userinfo.memberId,
        productId :this.$route.query.pid,
        num :this.$route.query.count
      }).then(res=>{
       
        if(res.code==0){
          if(this.active==1){
            this.ems=res.data.despatchMoney
          }
           this.you=res.data.despatchMoney
         this.addressinfo=res.data.deliveryAddress
        res.data.products.forEach((el, index) => {

              this.orderList.push(el)
              this.goodsnumber +=el.num
              this.goods.push({
                  productId:el.productId,
                  count:el.num
              })
          
        });
       this.CalcTotel();
       
        }

      })
    },
    getMycar() {
 
      enterOrder({
        memberId:this.userinfo.memberId
      }).then(res => {
       // this.orderList = res.data;
       if(this.active==1){
            this.ems=res.data.despatchMoney
          }

       this.you=res.data.despatchMoney
       this.addressinfo=res.data.deliveryAddress
        res.data.products.forEach((el, index) => {
          if(el.checked){
              this.orderList.push(el)
              this.goodsnumber +=el.num
              this.goods.push({
                  productId:el.productId,
                  count:el.num
              })
          }
        });
       
        this.CalcTotel();
      });
    },
    onSubmit() {
      this.show = true;
    },
    goBack() {
      this.$router.back(-1);
    },
    goOnline() {
      //this.$router.push("/online?shopdescode="+this.$route.query.shopdescode)
    //return
      let d={
          memberId :this.userinfo.memberId,
          distributorId : this.shopinfo.distributor.distributorId,
          deliveryType :this.radio,
          name:this.radio==2?this.addressinfo.name:this.username,
          mobile:this.radio==2?this.addressinfo.mobile:this.usertel,
          deliveryId:this.radio==2?this.addressinfo.id:'',
          details :this.goods
      }
      //this.goodsnumber=JSON.stringify(d)
     // return
      addOrder(d).then(res => {
         
          if(!res.code){
           // alert(JSON.stringify(res))
              this.$router.push("/online?shopdescode="+window.localStorage.getItem("shopcode")+"&orderid="+res.data)
          }
      });
    },
    changeFun(e){ 
      //alert(e)
     // console.log(this.radio)
      if(this.active==1){
       this.ems=this.you
       this.radio=2
         this.CalcTotel()
      }else{
        this.radio=1
        this.ems=0
        this.CalcTotel()
      }
      
    },
     //计算合计价格
    CalcTotel(){
      
        this.totel=null
        this.orderList.forEach((el, index) => {
        
             this.totel +=el.num*el.price
         
        });
    }
  },
  components: {
    [SubmitBar.name]: SubmitBar,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Card.name]: Card,
    [Stepper.name]: Stepper,
    [CheckboxGroup.name]: CheckboxGroup,
    [SwipeCell.name]: SwipeCell,
    [Cell.name]: Cell,
    [Popup.name]: Popup,
    [Button.name]: Button,
    [Col.name]: Col,
    [Row.name]: Row,
    [Checkbox.name]: Checkbox,
    [RadioGroup.name]: RadioGroup,
    [CellGroup.name]: CellGroup,
    [Radio.name]: Radio,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
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

.ddes{
  line-height: 30px;
  display: inline;
  font-size: 14px;
  vertical-align: middle
}
.chooseType{
  background: #fff;
  padding: 10px;
  text-align: center
}
.main {
  background-color: #f1f1f1;
}
.content {
  margin: 45px 0px;
}
.out {
  padding: 10px;
  .btbox {
    text-align: center;
  }
  .p1 {
    text-align: center;
    padding: 5px 0;
    border-bottom: solid 1px #eee;
    color: #888;
    font-size: 12px;
  }
  .p2 {
    text-align: center;
    padding: 5px 0;
    color: #888;
    font-size: 12px;
    b {
      color: #333;
    }
  }
  .p3 {
    text-align: center;
    padding: 5px 0;
    color: #888;
    font-size: 12px;
  }
  .p4 {
    text-align: center;
    padding: 5px 0;

    color: #ff0000;
    font-size: 14px;
  }
}
.pdleft {
  padding-left: 1rem;
}
.goods {
  padding: 0 10px;
  background: #fff;

  .van-card {
    background: #fff;
  }
}
.van-cell {
  padding: 10px 0px;
  border-bottom: 1px solid #f1f1f1;
  margin-bottom: 10px;
}
.del {
  background: #ff0000;
  display: inline-block;
  font-size: 1rem;
  width: 65px;
  height: 100%;
  line-height: 1;
  color: #fff;
  text-align: center;
  padding-top: 53px;
}
.gcheckbox {
  width: 22px;
  float: left;
  margin-right: 0px;
  line-height: 85px;
}
.redp {
  color: #ff0000;
  font-size: 12px;
  line-height: 20px;
  span {
    color: #888;
    float: right;
    b {
      color: #ff0000;
    }
  }
  del {
    color: #999;
  }
}
.orderInfo {
  background: #fff;
  padding: 10px;
  margin: 10px 0;
  text-align: right;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  .tright {
    color: #666;
  }
  span {
    color: #ff0000;
    big {
      font-size: 16px;
    }
  }
}
.userInfo {
  position: relative;
  background: #fff;
  padding: 10px;
  font-size: 12px;
  p {
    line-height: 1.5;
  }
  input {
    width: 120px;
    height: 20px;
    border: solid 1px #eee;
    border-radius: 3px;
    padding: 3px;
  }
  .hed {
    color: #333;
  }
  .red {
    color: #ff0000;
  }
  .blank {
    color: #999;
  }
}
.userInfo::after {
  content: "";
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  position: absolute;
  background: -webkit-repeating-linear-gradient(
    135deg,
    #ff6c6c 0,
    #ff6c6c 20%,
    transparent 0,
    transparent 25%,
    #3283fa 0,
    #3283fa 45%,
    transparent 0,
    transparent 50%
  );
  background: repeating-linear-gradient(
    -45deg,
    #ff6c6c 0,
    #ff6c6c 20%,
    transparent 0,
    transparent 25%,
    #3283fa 0,
    #3283fa 45%,
    transparent 0,
    transparent 50%
  );
  background-size: 80px;
}
.userInfo::before {
  content: "";
  left: 0;
  right: 0;
  top: 1px;
  height: 2px;
  position: absolute;
  background: -webkit-repeating-linear-gradient(
    135deg,
    #ff6c6c 0,
    #ff6c6c 20%,
    transparent 0,
    transparent 25%,
    #3283fa 0,
    #3283fa 45%,
    transparent 0,
    transparent 50%
  );
  background: repeating-linear-gradient(
    -45deg,
    #ff6c6c 0,
    #ff6c6c 20%,
    transparent 0,
    transparent 25%,
    #3283fa 0,
    #3283fa 45%,
    transparent 0,
    transparent 50%
  );
  background-size: 80px;
}
</style>
<style rel="stylesheet/scss" lang="scss" >
.bt .van-button--danger {
  background-color: #5b2 !important;
  border: 1px solid #5b2 !important;
}
.van-radio__input{
  height: 26px !important;
}
</style>