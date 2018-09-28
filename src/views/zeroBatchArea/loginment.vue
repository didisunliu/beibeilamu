<template>
    <Layout class="main">

        <van-nav-bar title="个人信息确认" fixed> </van-nav-bar>
        
        <div class="content" v-if="loginState">
            <div class="wrigteBg">
                <span>
                    <img :src="headImg" alt="" class="headImg">
                    点击修改
                </span>
            
            </div>
             <van-cell-group>
                <van-field v-model="name" label="姓名" />
                <van-field v-model="phone" label="手机号" placeholder="请输入手机号" :error-message="error" />
                <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
                    <van-button slot="button" size="small" @click="sendCode" type="primary">发送验证码</van-button>
                </van-field>

            </van-cell-group>
            <div class="sub"><van-button size="large" type="primary" @click="onSubmit" >确 定</van-button></div>
<p>{{state}}</p>
         <p>{{datas}}</p>
         <p>{{oid}}</p>
        </div>
        <div v-else class="content">
           
             <van-cell-group>
                <van-field v-model="phone" label="手机号" placeholder="请输入手机号" :error-message="error" />
                <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
                    <van-button slot="button" size="small" @click="sendCode" type="primary">发送验证码</van-button>
                </van-field>
            </van-cell-group>
            <div class="sub"><van-button size="large" type="primary" @click="onSubmit" >登 录</van-button></div>
            <p>{{state}}</p>
         <p>{{datas}}</p>
         <p>{{oid}}</p>

        </div>




    </Layout>


</template>
<script>
import {
  sendCode,
  loginAndReg,
  getWeixinUserInfo,
  getMemberByOpenId
} from "@/iao/home/query";
import { Toast, Field, NavBar, Cell, CellGroup, Button } from "vant";

export default {
  name: "ZeroBatchArea",
  computed: {},
  data() {
    return {
      phone: "",
      loginState:false,
      error: null,
      name: "",
      openid: "",
      headImg: "dd",
      codename:"code",
      sms: "",
      info: {},
      state: "",
      datas: "",
      oid: "",
      wxinfo:null
    };
  },
  mounted() {

    

    this.state = decodeURIComponent(
      (new RegExp("[?|&]" + "state" + "=" + "([^&;]+?)(&|#|;|$)").exec(
        location.href
      ) || [, ""])[1].replace(/\+/g, "%20")
    );

    this.wxinfo = JSON.parse(localStorage.getItem("wxinfo"));
     this.queryWeixinUserInfo();
    // if(this.wxinfo){
        
    //     this.headImg = this.wxinfo.headimgurl;
    //     this.name = this.wxinfo.nickname;
    //     this.openid = this.wxinfo.openid;
    // }else{
    //     this.queryWeixinUserInfo();
    // }
    
  },
  methods: {
    sendCode() {
      sendCode({
        mobile: this.phone,
        tag: "1"
      }).then(res => {
        //console.log(res);
        if (!res.code) {
          Toast("短信已经发出！");
        }
      });
    },

    // goBack() {
    //   this.$router.back(-1);
    // },
    queryWeixinUserInfo() {
      getWeixinUserInfo({
        code: decodeURIComponent((new RegExp("[?|&]" + this.codename + "=" + "([^&;]+?)(&|#|;|$)").exec(location.href) || [, ""])[1].replace(/\+/g, "%20")) 
      }).then(res => {
        if (!res.code) {
          this.datas = JSON.stringify(res);
          this.name = res.data.nickname;
          this.headImg = res.data.headimgurl;
          this.openid = res.data.openid;
          let a = res.data;
          window.localStorage.setItem("wxinfo", JSON.stringify(a));
          this.checkout({
            openId: this.openid
          });
        }
      });
    },
    checkout(d) {
       
      getMemberByOpenId(d).then(res => {
        if (!res.code) {
          this.oid = JSON.stringify(res);
          if (!res.data) {
              //没有数据要全部确认信息提交
              this.loginState=true
            //this.$router.push("/loginment?form=limit&state="+this.state);
          } else {
            if (res.data.state == 2) {
                //已经登录  已经登录应该不会进入此页面
              if (this.state == 1) {
                this.$router.push("/car?form=limit");
                //window.location.href="/car?form=limit"
              } else if (this.state == 2) {
                this.$router.push("/user?form=limit");
              }
              
            } else {
                //没有登录 请登录
                this.loginState=false
              //this.$router.push("/login?form=limit");
            }
          }
        }
      });
    },

    onSubmit() {
      let d = {
        head: this.headImg,
        name: this.name,
        mobile: this.phone,
        openId: this.openid,
        code: this.sms,
        tag: "1"
      };

      loginAndReg(d).then(res => {
        if (!res.code) {
          localStorage.setItem("userinfo", JSON.stringify(res.data));
          //this.mm=JSON.stringify(res.data)
          if (this.$router.query.state == 1) {
            this.$router.push("/car?form=limit");
          } else {
            this.$router.push("/user?form=limit");
          }
        } else {
          Toast(res.msg);
        }

        //alert(JSON.stringify(res))
      });
    }
  },
  components: {
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,

    [NavBar.name]: NavBar,
    [Button.name]: Button,

    [Field.name]: Field
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
.sub {
  margin: 12px;
}
.wrigteBg {
  background: #fff;
  padding: 15px;
  text-align: center;
  color: #999;
  line-height: 25px;
}
.headImg {
  width: 60px;
  height: 60px;
  display: block;
  margin: auto;
  border-radius: 50%;
}
.fl {
  float: right;
  margin-top: -15px;
}

.main {
  background-color: #f1f1f1;
}

.content {
  margin: 45px 0px 0 0;
}

.outb {
  background-color: #fff;
  padding: 10px;
}

.tabbox {
  background-color: #fff;
}

.infoma {
  font-weight: bold;
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  margin-top: 10px;
  background-color: #fff;
  padding: 10px;
  text-align: center;
  font-size: 14px;
}

.totel {
  padding: 15px 10px;
  text-align: center;
  background-color: #fff;
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  font-size: 16px;
  color: red;
  b {
    font-size: 28px;
  }
}

.itemO {
  padding: 10px;
  background-color: #fff;
  border-bottom: 1px solid #dddddd;
  margin-bottom: 10px;
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

.p1 {
  font-size: 12px;
  color: #888;
  padding-right: 5px;
}

.p2 {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  padding-right: 5px;
}

.p3 {
  font-size: 12px;
  color: #333;
  padding-right: 5px;
}

.center {
  text-align: center;
  border-left: 1px solid #dddddd;
}
</style>
<style rel="stylesheet/scss" lang="scss">
.oitem .van-cell__right-icon {
  line-height: 3 !important;
}
</style>