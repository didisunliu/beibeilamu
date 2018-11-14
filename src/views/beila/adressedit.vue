<template>
    <Layout class="main">
        
        <van-nav-bar title="编辑地址"  left-text="返回" @click-left="goBack"    left-arrow fixed>
               </van-nav-bar>
       <div class="content">
          <van-cell-group>
            <van-field
                v-model="name"
                required
                clearable
                label="姓名"
            
                placeholder="请输入用户名"
            
            />  

            <van-field
                v-model="mobile"

                label="电话"
                
                placeholder="请输入电话"
                required
            />
            <!-- <van-field
                v-model="areasname"
                label="地区"
                @click="chooseArea"
                 placeholder="请选择地区"
                 disabled
                required
            /> -->
          
            <van-cell title="地区"  required  is-link   @click="chooseArea" :value="areasname">
              
            </van-cell>
            <van-field
                v-model="address"

                label="详细地址"
                placeholder="请输入详细地址"
                required
            />
              <van-cell title="设为默认收货地址"  >
             <van-switch v-model="def" />
              </van-cell>
           
           
            </van-cell-group>
            <div class="padbox">
              <van-button size="large" type="danger" @click="savaAddress"  class="ttb">保 存</van-button>
              <van-button size="large" type="default" @click="deladdress" class="ttb">删 除</van-button>
            </div>
          
       </div>

       <van-popup v-model="show" position="bottom" :overlay="true">
   <!-- <van-picker :columns="columns" @change="onChange" value-key="shortName" :show-toolbar="true" @confirm="chooseOk" @cancel="onCancel"  /> -->
   <van-area :area-list="areaList" value="110101"  @confirm="chooseOk" @cancel="onCancel" />
</van-popup>
    </Layout>
    
    
</template>
<script>
import { getArea,addAddress,updateAddress,queryDefAddress,delDefAddress } from "@/iao/home/query";
import area from "@/lib/area";
import {
  Toast,
  Icon,
  Cell,
  NavBar,
  CellGroup,
  Button,
  Popup,
  Field,
  Switch,
  Picker ,
  Area 
} from "vant";

export default {
  name: "beila",
  computed: {},
  data() {
    return {
      show: false,
      wxinfo: JSON.parse(window.localStorage.getItem("wxinfo")),
      userinfo: JSON.parse(window.localStorage.getItem("userinfo")),
      def: false,
      name:'',
      mobile:'',
      areaList:area,
      areasId:null,
      address:'',
      areasname:'',
      // columns: [{
      //   values:[{
      //     shortName:"请选择",
      //     areaId:""
      //   }]
      // },{
      //   values:[{
      //     shortName:"请选择",
      //     areaId:""
      //   }]
      // },{
      //   values:[{
      //     shortName:"请选择",
      //     areaId:""
      //   }]
      // }],
      firstLevel:[],
      secondLevel:[],
      thirtLevel:[]
    };
  },
  mounted() {
    this.queryInfo(0,0)
    if(this.$route.query.id){
      this.queryAddress(this.$route.query.id)
    }
  
  },
  methods: {
    goBack() {
       this.$router.back(-1);
      //this.$router.push("/index");
    },
    onCancel(){
      this.show=false
    },
    chooseArea(){
       // alert(12)
        this.show=true;
    },
    chooseOk(e){
      //console.log(e)
      // this.areasId=e
       this.areasname=e[0].name+e[1].name+e[2].name
       this.show=false
    },

    // onChange(picker, values,index) {
    //   console.log(values[index].areaId)
    //   this.queryInfo(values[index].areaId,index+1)
    //  // picker.setColumnValues(1, citys[values[0]]);
    // },
    queryAddress(d){
      queryDefAddress({
        id:d
      }).then(res=>{
        if(res.code==0){
           this.name=res.data.name 
          this.mobile=res.data.mobile 
        // provinceId  :this.areasId[0].areaId,
        // cityId  :=res.data.name 
        // areaId  :=res.data.name 
        this.areasname=res.data.provinceName+res.data.cityName+res.data.areaName+res.data.address
        this.address=res.data.address
        this.def=res.data.def==1?true:false
        }
      })
    },
    queryInfo(d,type){
      getArea({
        parentId :d
      }).then(res=>{
          if(!res.code){
            //this.columns[type].values=res.data
           if(type==0){
             this.firstLevel=res.data
            //  this.firstLevel.forEach(el=>{
            //    this.columns[0].values.push(el)
            //  })
            
           }else if(type==1){
              this.secondLevel=res.data
           }else if(type==2){
             this.thirtLevel=res.data
           }
          //  this.columns.push({
          //    values:res.data
          //  })
           this.columns=[
            {
              values: this.firstLevel,//Object.keys(citys),
              className: 'column1'
            },
            {
              values: this.secondLevel,
              className: 'column2',
              defaultIndex: 0
            },
            {
              values: this.thirtLevel,
              className: 'column3',
              defaultIndex: 0
            }]
          }
          //console.log(this.columns)
      })
    },
    savaAddress(){
      if(this.$route.query.id){
        this.editorAddress()
      }else{
addAddress({
        memberId :this.userinfo?this.userinfo.memberId : '',
        name  :this.name,
        mobile  :this.mobile,
        provinceName  :this.areasId[0].shortName,
        cityName  :this.areasId[1].shortName,
        areaName  :this.areasId[2].shortName,
        address :this.address,
        def  :this.def?1:0,
      }).then(res=>{
        if(res.code==0){
            Toast("添加成功")
            this.$router.back(-1);
        }
      })
      }
      
    },
    editorAddress(){
      updateAddress({
        id:this.$route.query.id,
         memberId :this.userinfo?this.userinfo.memberId : '',
        name  :this.name,
        mobile  :this.mobile,
        provinceName  :this.areasId[0].shortName,
        cityName  :this.areasId[1].shortName,
        areaName  :this.areasId[2].shortName,
        address :this.address,
        def  :this.def?1:0,
      }).then(res=>{
            Toast("更新成功")
            this.$router.back(-1);
      })
    },
    deladdress(){
      if(this.$route.query.id){
        delDefAddress({
          id:this.$route.query.id,
         memberId :this.userinfo?this.userinfo.memberId : '',

        }).then(rs=>{
          if(rs.code==0){
            Toast("删除成功")
             this.$router.back(-1);
          }
        })
      }else{
        Toast("无地址可删除")
      }
    }
  },
  components: {
    [Icon.name]: Icon,
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Switch.name]: Switch,
    [Picker .name]: Picker ,
    [Field.name]: Field,
    [Area .name]: Area ,
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
.padbox{
  padding: 10px;
  .ttb{
    margin-bottom: 10px;
  }
}
.boxDiv {
  width: 100%;
  height: 100%;
}
.main {
  background-color: #f1f1f1;
}
.content {
  margin: 45px 0px 0 0;

  .infomation {
    background: #fff;
    padding: 10px;
    margin-bottom: 10px;
    position: relative;
    font-size: 14px;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      float: left;
    }

    p {
      padding-left: 70px;
      padding-top: 5px;
      font-size: 12px;
      color: #999;
    }
    p.bigp {
      color: #333;
      font-size: 14px;
    }
    span {
      text-align: right;
      position: absolute;
      right: 15px;
      top: 30px;
      color: #999;
      font-size: 20px;
    }
  }
}
.bton {
  padding: 12px;
}
.mg {
  margin: 5px auto;
}

</style>
<style  rel="stylesheet/scss" lang="scss">
.icongreen {
  .van-icon-passed::before {
    color: #55bb22 !important;
  }
}
.van-picker{
  font-size: 14px;
}
.iconred {
  .van-icon-cash-back-record::before {
    color: #ff0000;
  }
}
.iconyellow {
  .van-icon-clock::before {
    color: #f7c712;
  }
}
</style>