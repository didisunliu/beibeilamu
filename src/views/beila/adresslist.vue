<template>
    <Layout class="main">
        
        <van-nav-bar title="地址列表"  left-text="返回" @click-left="goBack"    left-arrow fixed>
               </van-nav-bar>
       <div class="content">
           <van-address-list
            v-model="chosenAddressId"
            :list="list"
            @add="onAdd"
            @edit="onEdit"
            @select="chosenAddress">
            
           </van-address-list>
       </div>

       
    </Layout>
    
    
</template>
<script>

   
    import { loginOut ,queryAddress,setDefAddress} from '@/iao/home/query' 
    import { Toast,Icon,Cell ,NavBar,CellGroup ,Button,Popup ,AddressList,AddressEdit    } from 'vant'
    import QrcodeVue from 'qrcode.vue'
	export default {
		name: 'beila',
        computed: {
            
            
        },
        data() {
			return {
                
                show:false,
                wxinfo:JSON.parse(window.localStorage.getItem("wxinfo")),
                userinfo:JSON.parse(window.localStorage.getItem("userinfo")),
                chosenAddressId: 0,
                list: []
            }
        },
        mounted() {
          //
          this.getAddress()
        },
        methods: {
           
            onClickMiniBtn() {
                
            },
            
            goBack(){
                 this.$router.back(-1);
               // this.$router.push('/index');
            },
             onAdd() {
      //Toast('新增地址');
      //this.show=true
      this.$router.push("/adressedit?py="+window.localStorage.getItem("shopcode"))
    },

    onEdit(item, index) {
        console.log(item)
         this.$router.push("/adressedit?id="+item.id+"&py="+window.localStorage.getItem("shopcode"))
      //Toast('编辑地址:' + index);
    },
    getAddress(){
        queryAddress({
            memberId:this.userinfo?this.userinfo.memberId : ''
        }).then(res=>{
            if(res.code==0){
                res.data.forEach(element => {
                    element.address=element.provinceName+element.cityName+element.areaName+element.address
                    element.tel=element.mobile
                    if(element.def==1){
                         this.chosenAddressId=element.id
                    }
                });
                this.list=res.data
               // this.chosenAddressId=1
            }
        })
    },
    chosenAddress(e){
        //console.log(e)
        setDefAddress({
            id:e.id,
            memberId :this.userinfo?this.userinfo.memberId : ''
        }).then(res=>{
            if(res.code==0){
                //Toast("已经设置为默认地址")
                if(this.$route.query.from=="submit"){
                    //let url="/submit?active=1&py="+window.localStorage.getItem("shopcode")+"&pid="+this.$route.query.pid+"&count="+this.$route.query.count
                       this.$router.push({path:'/submit',query:{
                           active:1,
                           py:window.localStorage.getItem("shopcode"),
                           pid:this.$route.query.pid,
                           count:this.$route.query.count
                       }})
                    //this.$router.push("/submit?active=1&py="+window.localStorage.getItem("shopcode")+"&pid="+this.$route.query.pid+"&count="+this.$route.query.count)
                }
            }
        })
    }
           
            
	        

        },
        components: {
            [Icon.name]: Icon ,
            [NavBar.name]: NavBar ,
            [Button .name]: Button ,
            [Popup  .name]: Popup,
            [Cell .name]: Cell,
            [CellGroup .name]: CellGroup,
            [AddressList.name]: AddressList, 
            [AddressEdit.name]: AddressEdit 
            
        }
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}
    .boxDiv{
        width: 100%;
        height: 100%;
    }
    .main {
        background-color: #f1f1f1;
        
    }
    .content{
        margin: 45px 0px 0 0;
       
        .infomation{
        background: #fff;
        padding: 10px;
        margin-bottom: 10px;
        position: relative;
        font-size: 14px;
        img {
            width:60px;
            height: 60px;
            border-radius: 50%;
            float: left;
        }
        
        p{
            padding-left: 70px;
            padding-top: 5px;
        font-size: 12px;
            color:#999;
           
        }
        p.bigp{
            color: #333;
            font-size: 14px;
        }   
        span{
            text-align: right;
            position: absolute;
            right: 15px;
            top: 30px;
            color:#999;
            font-size: 20px;
        }
    }
    }
    .bton{
        padding: 12px;
    }
    .mg{
        margin: 5px auto;
    }

</style>
<style  rel="stylesheet/scss" lang="scss">
    .icongreen{
        .van-icon-passed::before{
            color: #55bb22 !important;
        }
    }
    
    .iconred{
        .van-icon-cash-back-record::before{
            color: #ff0000;
        }
    }
    .iconyellow{
        .van-icon-clock::before{
            color: #f7c712;
        }
    }
</style>