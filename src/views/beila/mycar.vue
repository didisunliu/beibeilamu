<template>
    <Layout class="main">
        
        <van-nav-bar title="购物车"  left-text="返回" :right-text="opertor" @click-left="goBack"  @click-right="Goeditor"    left-arrow fixed> </van-nav-bar>
      
        <div class="content"> 
          <template v-if="cars.length>0">
                <van-swipe-cell :right-width="0" v-for="item in cars" >
                    <van-cell-group>
                        <van-cell >
                        <div class="goods" v-if="item.state!='6' && item.state!='5'">
                                <div class="gcheckbox"><van-checkbox v-model="item.checked" :disabled="(item.state==2 || item.state==3 || item.state==4)?true:false" @change="checkboxClick(item)" ></van-checkbox></div>
                                <div class="ordergoods">
                                    <van-card
                                :title="item.title"
                                :desc="item.specification"  
                                
                                :price="item.price*0.01"
                                :thumb="item.mainPictureUrl"
                                > 
                                <span slot="tags" class="red"  v-if="item.state=='2'">预售</span>
                                <span slot="tags"  v-if="item.state=='3'">售罄</span>
                                <span slot="tags"  v-if="item.state=='4'">下架</span>
                                <div slot="footer">
                                    <van-stepper v-model="item.num" @change="updatetoMyCar(item)" />
                                </div>
                                </van-card>
                                </div>
                            </div>
                        </van-cell>
                    </van-cell-group>
                    <!-- <span slot="right" class="del">删除</span> -->
                </van-swipe-cell>
                </template>
                <template v-else-if="isnull">
                  <div class="carnull">
                    <span> <van-icon name="cart" /></span>
                     <p>还没有添加商品</p>
                     <van-button plain type="danger" class="bbox" @click="goIndex">去购物</van-button>
                  </div>
                  
                </template>

           
        </div> 



        <van-submit-bar v-if="editor" class=""
         
            button-text="删除"
            @submit="onDel"
            >
            
           <span  @click="allCheckdel">
                <van-checkbox class="pdleft" v-model="checkeddel">全选</van-checkbox>
            </span>
            <!-- <span slot="tip">
                您的收货地址不支持同城送, <span>修改地址</span>
            </span> -->
        </van-submit-bar>
        <van-submit-bar v-else class=""
            :price="totel"
            button-text="去结算"
            @submit="onSubmit"
            >
            <span  @click="allCheck">
                <van-checkbox class="pdleft" v-model="checked">全选</van-checkbox>
            </span>
            
           
        </van-submit-bar>
    </Layout>
    
    
</template>
<script>
import { queryMyCar, updateChecked,addMyCar ,delMyCar,updateMyCar,checkoutOrder} from "@/iao/home/query";
import {
  Toast,
  NavBar,
  Icon,
  SubmitBar,
  Checkbox,
  Cell,
  CellGroup,
  CheckboxGroup,
  SwipeCell,
  Stepper,
  Card,
  Button
} from "vant";

export default {
  name: "beila",
  computed: {},
  data() {
    return {
      allNull: false,
      editor: false,
      active: 0,
      checked: null,
      checkeddel: null,
      result: ["a"],
      imageURL: "/static/images/qq.png",
      wxinfo: null,
      userinfo: null,
      totel:null,
      cars: [],
      editorCars: [],
      opertor: "编辑",
      allstate: null,
      isnull:false,
      ids:[],
      orderlength:0,
      allids:[]
    };
  },
  mounted() {
    //this.init()
    this.wxinfo = JSON.parse(window.localStorage.getItem("wxinfo"));
    this.userinfo = JSON.parse(window.localStorage.getItem("userinfo"));
    //alert(this.userinfo.memberId)
    this.getMycar();
  },
  methods: {
 
    goIndex() { 
      this.$router.push("/index?py="+window.localStorage.getItem("shopcode"));
    },
    goBack() {
      this.$router.back(-1);
    },
    onSubmit() {
      checkoutOrder({
        memberId :this.userinfo.memberId
      }).then(res=>{
        if(!res.code){
          this.$router.push("/submit?py="+window.localStorage.getItem("shopcode"));
        }else{
          Toast(res.msg)
        }
        
      })
      
    },
   
    Goeditor() {
      if (this.editor) {
        this.editor = false;
        this.opertor = "编辑";
        this.getMycar();
      } else {
        this.cars.forEach((el, index) => {
          el.checked = 0;
        });
        this.editor = true;
        this.opertor = "完成";
      }
    },
    getMycar() {
      queryMyCar({
        memberId:this.userinfo.memberId
      }).then(res => {
        this.cars = res.data;
     // console.log(this.cars.length) 
        let first = null;
        if(this.cars.length==0){
          this.isnull=true
        }

        this.cars.forEach((el, index) => {
        
          if(el.state==1){
            this.orderlength +=1
            this.allids.push(el.cartId)
          }
          if(el.checked==1){
            this.ids.push(el.cartId)
            
          }
          
        });
        
        if(this.ids.length==this.orderlength){
          this.checked = true;
        }
        this.CalcTotel()
      });
    },
    checkboxClick(el) {
     
      let a = el.checked ? 1 : 0;
     //  alert(this.cars)
    
      if(a==1){
        this.ids.push(el.cartId)
      }else{
      
         this.ids.splice(this.ids.findIndex(v=>v==el.cartId),1)
      
      }
     
      if (!this.editor) {
         // alert(this.ids.toString())
          this.updateCheckout({
          memberId:  this.userinfo.memberId,
          cartIds:  this.ids.toString(),
          });
      }else{
          if(!this.ids.toString()){
            //alert(123)
            this.checkeddel=false
          }else{
            
           //alert(this.orderlength)
            if(this.orderlength==this.ids.length){
                this.checkeddel=true
            }else{
               this.checkeddel=false
            }
          }
      }
    },
    allCheckdel(){

    },
    allCheck() {
     
      let vids=''
      if(this.checked){
          //vids=this.allids.toString()
           this.cars.forEach(el=>{
             if(el.state==1){
               el.checked=1
             }
           })
      }else{
         this.cars.forEach(el=>{
             if(el.state==1){
               el.checked=0
             }
           })
      }  
    },
  
            updatetoMyCar(e){
               
                updateMyCar({
                    cartId :e.cartId,
                    memberId :e.memberId,
                    num:e.num
                }).then(res=>{
                    this.CalcTotel();
                   // Toast(res.msg)
                })
            },
    updateCheckout(d) {
      
     
      updateChecked(d).then(res => {
        if(!res.code){
          if(!d.cartIds){
            //alert(123)
            this.checked=false
          }else{
            
           //alert(this.orderlength)
            if(this.orderlength==d.cartIds.split(",").length){
                this.checked=true
            }else{
               this.checked=false
            }
          }
          //this.getMycar();
          this.CalcTotel()
        }
          
      });
    },
    //计算合计价格
    CalcTotel(){
        this.totel=null
        this.cars.forEach((el, index) => {
         if(el.checked==1){
             this.totel +=el.num*el.price
         }
        });
    },
    onDel(){
        console.log(this.cars)
        let d=[]
        this.cars.forEach(el=>{
            if(el.checked){
                d.push(el.cartId)
            }
        })
       
        this.delOncar({
            memberId :this.userinfo.memberId,
            cartIds :d.join(",")
        })
        
    },
    delOncar(d){
        delMyCar(d).then(res=>{
            //this.CalcTotel();
            // Toast(res.msg)
            if(!res.code){
                 this.checkeddel=false
                this.getMycar()
                
            }else{
                Toast(res.msg)
            }
        })
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
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Checkbox.name]: Checkbox
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
.red{
  color: #ff0000;
}
.main {
  background-color: #f1f1f1;
}
.content {
  margin: 45px 0px;
}
.carnull{
  padding: 30px 15px;
  text-align: center;
  font-size: 12px;
  color: #999;
  height: 100%;
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
.bbox{
  height: 37px;
  line-height: 35px;
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
</style>