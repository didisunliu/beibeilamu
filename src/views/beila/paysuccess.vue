<template>
    <Layout class="main">
        
        <van-nav-bar title="支付成功"     left-arrow fixed> </van-nav-bar>
        <div class="content"> 
          <div class="paysuccess">
            <van-icon name="checked"  class="cion"/>
            <p>支付成功</p>
            <van-button type="default" @click="goIndex">继续购物</van-button>
          </div>
          
        </div> 



        
    </Layout>
    
    
</template>
<script>

import { Toast, NavBar, Icon, Step, Steps, Button } from "vant";
import wx from "weixin-js-sdk";
export default {
  name: "beila",
  computed: {},
  data() {
    return {
    
    };
  },
  mounted() {
   
  },
  methods: {
    goIndex(){
      this.$router.push(
                "/index?py=" + window.localStorage.getItem("shopcode")
              );
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
  background-color: #fff;
}
.content {
  margin: 45px 0px 0 0;
}
.paysuccess{
  padding: 35px 10px;
  text-align: center;
  p{
    padding: 10px 0px;
    font-size: 18px;
    color: red
  }
}
.cion{
  color: #55bb22;
  font-size: 64px;
}

</style>
