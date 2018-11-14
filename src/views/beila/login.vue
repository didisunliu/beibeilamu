<template>
    <Layout class="main">

        <van-nav-bar title="登录" fixed> </van-nav-bar>
        <div class="content">
           
            <!-- <div class="wrigteBg">
                <span>
                    <img :src="headImg" alt="" class="headImg">
                   
                </span>
            
            </div> -->
             <van-cell-group>
                <!-- <van-field v-model="name" label="姓名" /> -->
                <van-field v-model="phone" label="手机号" placeholder="请输入手机号" :error-message="error" />
                <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
                    <van-button slot="button" size="small" @click="sendtoCode" type="primary" :disabled="dis">{{sendtext}}</van-button>
                </van-field>

            </van-cell-group>
            <div class="sub"><van-button size="large" type="primary" @click="onSubmit" :disabled="pass" >登 录</van-button></div>
           

        </div>




    </Layout>


</template>
<script>
import { sendCodes, shoploginAndReg ,getShopByOpenId,getWeixinUserInfo} from "@/iao/home/query";
import { Toast, Field, NavBar, Cell, CellGroup, Button } from "vant";

export default {
  name: "beila",
  computed: {},
  data() {
    return {
      phone: "",
      error: null,
      name: "",
      openid: "",
      headImg: "dd",
      codename: "code",
      sms: "",
      shopinfo: null,
      wxinfo: null,
      dis: false,
      pass: true,
      mm: "",
      pagetitle: "登录",
      sendtext: "发送验证码",
      soureUrl:"shopindex"
    };
  },
  mounted() {
    this.shopinfo = JSON.parse(window.localStorage.getItem("shopinfo"));
    //alert(window.localStorage.getItem("wxinfo"))
    //this.queryWeixinUserInfo();
    //return
    if (!this.shopinfo) {
     
      let Url=this.$route.query.redirect_url
      if(!Url){
        this.soureUrl=Url
      }
      //console.log(Url)
      this.queryWeixinUserInfo();
    } else {
     
      this.$router.push("/shopindex");
      // this.headImg = this.distributor_user.headimgurl;
      // this.name = this.distributor_user.nickname;
      // this.openid = this.distributor_user.openid;
    }
  },
  methods: {
    sendtoCode() {
      if (!/^1[34578]\d{9}$/.test(this.phone)) {
        Toast("手机号码有误，请重填");
        return false;
      }
      
      sendCodes({
        mobile: this.phone,
        tag: "1"
      }).then(res => {
        if (!res.code) {
          this.dis = true;
          this.pass = false;
          Toast("短信已经发出！");
          const TIME_COUNT = 60;
          if (!this.timer) {
            this.count = TIME_COUNT;

            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.sendtext = "重新发送(" + this.count + ")";
                this.count--;
              } else {
                this.dis = false;
                this.sendtext = "发送验证码";
                clearInterval(this.timer);
                this.timer = null;
              }
            }, 1000);
          }
        } else {
          Toast(res.msg);
        }
      });
    },

    goBack() {
      this.$router.back(-1);
    },
    queryWeixinUserInfo() {
      getWeixinUserInfo({
        code: decodeURIComponent(
          (new RegExp(
            "[?|&]" + this.codename + "=" + "([^&;]+?)(&|#|;|$)"
          ).exec(location.href) || [, ""])[1].replace(/\+/g, "%20")
        )
      }).then(res => {
        if (!res.code) {
          this.datas = JSON.stringify(res);
          this.name = res.data.nickname;
          this.headImg = res.data.headimgurl;
          this.openid = res.data.openid;
          let a = res.data;
          window.localStorage.setItem("wxinfo", JSON.stringify(a));
          // this.checkout({
          //   openId: this.openid
          // });
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
        tag: "2"
      };

      shoploginAndReg(d).then(res => {
        if (!res.code) {
          window.localStorage.setItem("shopinfo", JSON.stringify(res.data));
          //this.mm=JSON.stringify(res.data)
        
            this.$router.push("/"+this.soureUrl);
          
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