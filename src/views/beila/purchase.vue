<template>
    <Layout class="main">
        
        <van-nav-bar title="代客下单"  left-text="返回" @click-left="goBack"    left-arrow fixed> </van-nav-bar>
        <div class="content">
          <div class="chooseType">
           
            <van-tabs type="card" v-model="active" @change="changeFun">
            <van-tab  title="自提"></van-tab>
            <van-tab  title="快递"></van-tab>
            </van-tabs>
          </div>
          
            <div class="userInfo" v-if="active==0">
                <p class="hed">提货人：<input type="text" :value="username" placeholder="提货人姓名"> <input type="text" :value="usertel" placeholder="提货人电话"></p>
                <p class="blank" v-if="shopinfo.distributor">提货地点：{{shopinfo.provinceName+shopinfo.cityName+shopinfo.areaName+shopinfo.distributor.address}} {{shopinfo.distributor.name}}</p>
                <p class="red" v-if="shopinfo.distributor">自提点：{{shopinfo.distributor.address+shopinfo.distributor.shopName}} </p>
            </div>
            <div class="userInfo" v-if="active==1">
              <p class="hed">收货人：<input type="text" :value="username" placeholder="收货人姓名"> <input type="text" :value="usertel" placeholder="收货人联系电话"></p>
                <van-cell title="地址" is-link :value="caddress" @click="areashow=true" />
                <van-field v-model="fulladdress" placeholder="详细地址" class="hinput" />
                <van-popup v-model="areashow" position="bottom" :overlay="true">
                <van-area :area-list="areaList" @confirm="chooseOk" @cancel="areashow=false" />
                </van-popup>
                
              
                
            </div>
            <div class="choosebox">
              <van-cell title="添加商品" is-link value="请选择" @click="goodsshow=true" />
                <van-popup v-model="goodsshow" position="bottom" :overlay="true">
                  <div class="goodsBox">
                    <p><span class="left" @click="goodsshow=false">取消</span><span class="right" @click="chooseGood">确认</span></p>
<van-checkbox-group v-model="result">
                  <van-checkbox key="a" name="a" class="good" >
                   <img src="http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqS2qkEHGNWyOJyYbJzNrzPAwvNTpEnSzEgAFZibPdYUpYMDYMp2RE2SItcI4brPOLPpJo6G5EOjpw/132">
                    <span class="sma">产品名称</span>
                    <span class="sma">￥45.00 <del>￥55.00</del> </span>
                  </van-checkbox>
                  
                </van-checkbox-group>
                  </div>
                  
                
                </van-popup>
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
  @submit="goOnline"
/>
    </Layout>
    
    
</template>
<script>
import { getShopDes, addOrder, enterOrder,buyNow ,queryProduct} from "@/iao/home/query";
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
  RadioGroup, Radio,CellGroup,Tabs,Tab ,Field,
  Area
} from "vant";
import AreaList from '@/lib/area';
export default {
  name: "beila",
  computed: {},
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
    [Area.name]: Area,
    [Field.name]: Field,
  },
  data() {
    return {
      active: 0,
      checked: false,
      areashow:  false,
      goodsshow:  false,
      radio:"1",
      username: "",
      usertel: "",
      result: ["a"],
      orderList:[],
      shopinfo: {},
      addressinfo: {},
      imageURL: "/static/images/qq.png",
      wxinfo: null,
      fulladdress: null, 
      // userinfo: {
      //   memberId:2
      // },
      totel:null,
      goodsnumber:null,
      goods:[],
      ems:0,
      you:0,
      areaList:AreaList,
      caddress:'请选择'
    };
  },
  mounted() {

   // this.queryShopDes();

    
  },
  methods: {
    queryShopDes() {
      getShopDes({
        py: this.$route.query.py || window.localStorage.getItem("shopcode")
      }).then(res => {
        //  console.log(res)
        this.shopinfo = res.data;
        document.title = res.data.distributor.shopName;
      });
    },
    chooseOk(e){
      
      this.areashow=false;
      this.caddress=e[0].name+e[1].name+e[2].name
    },
    chooseGood(){
      this.goodsshow=false
        //console.info(e)
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
     // this.show = true;
    },
    goBack() {
      this.$router.back(-1);
    },
    goOnline() {
      
      //this.$router.push("/online?py="+this.$route.query.py)
      let d={
          memberId :this.userinfo.memberId,
          distributorId : this.shopinfo.distributor.distributorId,
          deliveryType :this.radio,
          name:this.radio==2?this.addressinfo.name:this.username,
          mobile:this.radio==2?this.addressinfo.mobile:this.usertel,
          deliveryId:this.radio==2?this.addressinfo.id:'',
          details :this.goods
      }
      
      if(!d.name){
        Toast("请填写收货人姓名");
        return false;
      }
      if(!d.mobile){
        Toast("请填写收货人手机号码");
        return false;
      }
      if (!/^1[34578]\d{9}$/.test(d.mobile)) {
       Toast("收货人手机号码错误");
        return false;
      }
      //this.goodsnumber=JSON.stringify(d)
     // return
      addOrder(d).then(res => {
         
          if(!res.code){
           // alert(JSON.stringify(res))
              this.$router.push("/online?py="+window.localStorage.getItem("shopcode")+"&orderid="+res.data)
          }else{
            Toast(res.msg)
          }
      });
    },
    changeFun(e){ 
      //alert(e)
     // console.log(this.radio)
      if(this.active==1){
       this.ems=this.you
      // this.radio=2
         this.CalcTotel()
      }else{
       // this.radio=1
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
.choosebox{
  padding: 10px;
  background: #fff;
}
.right{
  float: right;
}
.ddes{
  line-height: 30px;
  display: inline;
  font-size: 14px;
  vertical-align: middle
}
.goodsBox{
  height:100vh;
  p{
    padding: 10px;
    font-size: 14px;
    .right{
      color: #333;
    }
    .left{
      color: #888;
    }
  }
  .good{
   
    padding: 10px;
    border-bottom:solid 1px #f1f1f1;
    img{
      width: 45px;
      height: 45px;
      float: left;
    }
    .sma{
      display: block;
      float: left;
      width: 80%;
      padding-left: 5px;
      font-size: 12px;

    }
    .sma:last-child{
      font-size: 14px;
      color: #f00;
      del{
        color: #888;
        font-size: 12px;
      }
    }
  }
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
  padding: 5px 0px;
  border-bottom: 1px solid #f1f1f1;
  margin-bottom: 0px;
  font-size: 12px;  
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
  font-size: 12px !important;
  p {
    line-height: 1.5;
  }
  input {
    width: 120px;
    height: 20px;
    border: solid 1px #eee;
    border-radius: 3px;
    padding: 3px;
    background: #eee;
  }
  .hed {
    color: #333;
    padding: 5px 0px;
    border-bottom: solid 1px #f1f1f1;
  }
  .red {
    color: #ff0000;
  }
  .blank {
    color: #999;
  }
  .hinput{
    input{
      background: #eee;
    }
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
.van-cell:not(:last-child)::after{
     border-bottom-width: 0px;
}
.userInfo .van-field__control{
  background:#eee;
  border-radius: 3px;
  //padding-left:3px;
}
 .van-checkbox__label{
      width: 88% !important; 
    }
</style>