<template>
    <Layout class="main">
       <div>
         <p>{{state}}</p>
         <p>{{datas}}</p>
         <p>{{oid}}</p>
       </div>
    </Layout>


</template>
<script>
import { getWeixinUserInfo, getMemberByOpenId } from "@/iao/home/query";

export default {
  name: "ZeroBatchArea",
  computed: {},
  data() {
    return {
      phone: "",
      error: null,
      pagestate: "", //1 购物车页面 ，2 我的页面
      name: "",
      openid: "",
      oid: "",
      codename: "code",
      headImg: "",
      datas: ""
    };
  },
  mounted() {
    alert(window.location.href)
    this.pagestate = decodeURIComponent((new RegExp("[?|&]" + "state" + "=" + "([^&;]+?)(&|#|;|$)").exec(location.href) || [, ""])[1].replace(/\+/g, "%20"));
    alert(this.pagestate)
    this.queryWeixinUserInfo();
    
  },
  methods: {
    queryWeixinUserInfo() {
     
      getWeixinUserInfo({
        code: decodeURIComponent( (new RegExp( "[?|&]" + this.codename + "=" + "([^&;]+?)(&|#|;|$)" ).exec(location.href) || [, ""])[1].replace(/\+/g, "%20")
        )
      }).then(res => {
        if (!res.code) {
          this.datas=JSON.stringify(res)
          this.name = res.data.nickname;
          this.headImg = res.data.headimgurl;
          this.openid = res.data.openid;
            let a= res.data
            window.localStorage.setItem('wxinfo', JSON.stringify(a));
          this.checkout({
            openId: this.openid
          });

          //  $("#headpic").attr("src", res.data.headimgurl);
          // $("#nickname").text(res.data.nickname);

          // $("#openid").text(res.data.openid);
          // $("#accesstoken").text(res.data.access_token);
        }
      });
    },
    checkout(d) {
      getMemberByOpenId(d).then(res => {
         alert(this.pagestate)
       // this.datas = JSON.stringify(res.data);
      alert(JSON.stringify(res))
      if(!res.code){
        if (this.pagestate == "1") {
          this.$router.push("/mycar?form=limit");
        } else if (this.pagestate == "2") {
          this.$router.push("/user?form=limit");
        }
      }else if(res.code==2){
        this.$router.push("/login?form=limit");
      }else if(res.code==3){
        this.$router.push("/loginment?form=limit&state="+this.state);
      }
        // if (!res.code) {
        //    this.oid=JSON.stringify(res)
        //   if (!res.data) {
        //     alert(res.data)
        //       this.$router.push("/loginment?form=limit&state="+this.state);
        //   } else{
        //  alert(res.data.state)
        //     if (res.data.state == "2" || res.data.state==2) {
        //       alert(this.pagestate)
        //       if (this.pagestate == "1") {
        //         alert("/car?form=limit")
        //         this.$router.push("/mycar?form=limit");
        //       } else if (this.pagestate == "2") {
        //       alert("/user?form=limit")
        //         this.$router.push("/user?form=limit");
        //       }
        //        // this.$router.push("/loginment?form=limit&state="+this.state);
        //       //this.jumpUrl();
        //     } else {
             
        //       this.$router.push("/login?form=limit");
        //     }
        //   }
        // }
      });
    }
  }
};
</script>