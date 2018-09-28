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
        <div class="userInfo">
                <van-search placeholder="请输入搜索关键词" v-model="value" @input="onSearch" />
                <!-- <van-search
                v-model="value"
                placeholder="请输入搜索关键词"
                show-action
                @search="onSearch"
              >
                <div slot="action" @click="onSearch">搜索</div>
              </van-search> -->
              <div class="infomation clearfix">
                <img src="/static/images/qq.png" >
                <p><label>ID：</label>50010036</p>
                <p><label><van-icon name="shop" class="icon" />：</label>雨花碧水龙庭店</p>
                <p class="t"><label><van-icon name="location" class="icon" />：</label>湖南省长沙芙蓉区王府井3楼府井3楼府井3楼</p>
          
                <span>购买指数<br><b>18588</b><br>
                    粉丝数<br><b>588</b>
                </span>
                
              </div>
        </div>

        <van-list v-model="loading" :finished="finished" @load="onLoad" :offset="10" class="glist">
            
            <van-cell v-for="(item,index) in list"  class="goodsItem" >
                <p class="shoptitle">{{item.supplier}}</p>
                <p class="" :class="item.state==3 ? 'over' : 'pos' "  @click="goDetail(item.productId)"><img :src="item.mainPictureUrl | Imgurl" class="goodsImg" /> <b class="pos1">{{item.subtitle}}</b> <b class="pos2">{{item.tag}}</b>
                <span v-if="item.state==3">已售罄</span>
                </p>
                <p class="goodsTitle"  @click="goDetail(item.productId)">{{item.title}}   <br><span class="guige">{{item.specification}}</span> </p>
                <p class="redp"><template v-if="item.presellTime">预售时间：{{item.presellTime | formatDate}}</template><span>已售 <b>{{item.soldNumber}}</b> 份<template v-if="item.numberType==2">/ 限量{{item.number}}份</template></span></p>
                <p class="redp"  v-if="item.pickupTime">提货时间：{{item.pickupTime | formatDate}}</p>
                <p class="redp">￥<big>{{item.price}}</big> <del>￥{{item.originalPrice}}</del></p>
                <b class="like"><van-icon name="like-o"  /> <i>关注</i></b> 
                <a v-if="item.state==3" class="disable">加入购物车</a>
                <a v-else @click="addToCar(item)">加入购物车</a>
                
            </van-cell>
            
        </van-list>
        <van-tabbar v-model="active" fixed @change="goPage">
            <van-tabbar-item icon="shop">店铺</van-tabbar-item>
            <van-tabbar-item icon="shopping-cart" :info="carNum">购物车</van-tabbar-item>
            <van-tabbar-item icon="contact" >我的</van-tabbar-item>
            
        </van-tabbar>
    </Layout>
    
    
</template>
<script>

   
    import { getSupplyList,getMemberByOpenId } from '@/iao/home/query'
    import { Toast,List,NavBar,Cell,Search,Tabbar, TabbarItem,Icon  } from 'vant'
    import { dees } from '../../config'
	export default {
		name: 'ZeroBatchArea',
        computed: {
            
            
        },
        data() {
			return {
                active: 0,
                carNum:null,
				mailSpecial: [],
				sellGoodGoods: [],
                cateList: [],
				behaviorSupply: [],
                list: [],
                loading: false,
                finished: false,
                value:'',
                formLine:{
                    title:null,
                    "pager.pageNum":1,
                    "pager.pageSize":10,
                    "pager.orderBy":null,
                    "pager.orderType":null
                    
                },
                wxinfo:null,
            }
        },
        
        mounted() {
            //this.init()
            document.title = '雨花碧水龙庭店'
            //this.wxinfo=JSON.parse(window.localStorage.getItem("wxinfo"))
      
           
        },
    
        methods: {
            addToCar(e){
                this.carNum +=1
            },
            querySupply(d){
                //console.log(123)
                getSupplyList(d).then(res=>{
                    //console.info(res.data)
                   
                    if(!res.code){
                        if(res.data.length==0){
                            this.finished = true;
                        }else{
                             this.list=res.data
                             this.formLine["pager.pageNum"]=this.formLine["pager.pageNum"]+1
                           //  console.log(this.formLine["pager.pageNum"])
                             if(res.data.length<10){
                                  this.finished = true;
                             }
                            this.loading = false;
                        }
                    }else{
                         this.finished = true;
                    }
                    
                })
            },
            onLoad() { 
              setTimeout(() => {
                this.querySupply(this.formLine)
                }, 100);
                
            },
            onSearch(r){
                //console.log(r)
                this.formLine.title=r
                 this.formLine["pager.pageNum"]=1
                getSupplyList(this.formLine).then(res=>{
                    //console.info(res.data)
                   
                    if(!res.code){
                        this.list=res.data
                    }
                    
                })
            },
            goDetail(d){
                this.$router.push('/detail?pid='+d);
            },
            goPage(a){
                //console.log(a)
                let url="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx43fd4135600dcee3&redirect_uri="+dees.limitUrl+"&response_type=code&scope=snsapi_userinfo&state="+a+"#wechat_redirect"
                
                window.location.href=url
               
                // if(!this.wxinfo){
                   
                // }else{
                //     this.checkout(a)
                // }
                
                //this.$router.push('/detail');
            },
            goBack(){
                this.$router.back(-1)
            },
            checkout(a) {
                getMemberByOpenId({
                    openId: this.wxinfo.openid
                }).then(res => {
                    if (!res.code) {
                   // this.oid = JSON.stringify(res);
                    if (!res.data) {
                        let url=dees.limitUrl
                        //没有数据要全部确认信息提交
                        window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx43fd4135600dcee3&redirect_uri="+url+"&response_type=code&scope=snsapi_userinfo&state="+a+"1#wechat_redirect"
                    } else {
                        if (res.data.state == 2) {
                            localStorage.setItem('userinfo', JSON.stringify(res.data));
                            //已经登录  已经登录应该不会进入此页面
                            if (a == 1) {
                                this.$router.push("/car");
                                //window.location.href="/car?form=limit"
                            } else if (a == 2) {
                                this.$router.push("/user");
                            }
                        
                        } else {
                            //没有登录 请登录
                           //this.loginState=false
                           this.$router.push("/loginment");
                        //this.$router.push("/login?form=limit");
                        }
                    }
                    }
                });
            },
	        

        },
        components: {
	      //Tabbar, TabbarItem
            [List.name]: List,
            [Cell.name]: Cell,
            [Search.name]: Search,
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem,
            [NavBar.name]: NavBar,
            [Icon.name]: Icon
        },
        filters: {
            formatDate: function (value) {
                if (!value) return ''
                let date = new Date(value)
                let year = date.getFullYear()
                let month = date.getMonth() + 1
                let day = date.getDate()
                let h = date.getDate()
                let m = date.getDate()
                let s = date.getDate()
                value = month + '月' + day +"日"+" "+h+":"+m
                return value
            },
            Imgurl: function (value) {
                if (!value) return ''
               
                value ="http://mgr.hnkbmd.com"+value
                return value
            }
        },
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.guige{
    color: #888;
    font-size: 12px;
}
.pos{
    position: relative;
    .pos1{
        position: absolute;
        bottom:0px;
        background-color: rgba(228,5,5,0.6);
        padding:2px 10px 0px 10px;
        line-height: 20px;
        border-top-right-radius:30px;
        color: #fff;
        font-size: 12px;
        font-weight: normal;
    }
    .pos2{
        position: absolute;
        top:0px;
        right: 10px;
        width: 54px;
        background-color:yellow;
        padding:5px 12px;
        font-size: 15px;
        line-height: 18px;
        border-bottom-right-radius:10px;
        border-bottom-left-radius:10px;
        color: #f00;
         
    }
}
    .clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}
    .topfl{
        
       margin-left: 5px;
        font-size: 12px;
        
        font-weight: normal;
    }
    .like{
        position: absolute;
        right: 100px;
        bottom: 0px;
        color: #888;
        font-size: 14px;
        font-weight: normal;
        color: #999;
        background: #fff;
        border: solid 1px #999;
        padding: 1px 12px 0px 12px;
        border-radius: 15px;
        vertical-align: middle;
        i{
            vertical-align: middle;
        }
    }
    .main {
        background-color: #F5F5F5;
        
    }
    .topLogo{
        background: #167108;
        text-align: left;
        color: #fff;
       
        font-size:20px;
        font-weight: 400;
        line-height: 50px;
        height: 45px;
        position: fixed;
        top: 0;
        width: 100%;
        left: 0;
        z-index: 2;
        img.logo{
          width: 40px;
          height: auto;
          margin-left:10px;
          margin-top:-8px;  
        }
        img.font{
            height: 35%;
            margin-left: 20px;
        }
    }
    .userInfo{
        margin-top:45px;
        
    }
    .van-search{
           padding-left: 7px !important; 
           padding-right: 7px !important; 
        }
    .van-tabbar-item--active{
        color: #55bb22;
        
    }
    .glist{
        padding-bottom: 50px;
    }
    .infomation{
        background: #fff;
        padding: 10px;
        margin-bottom: 10px;
        position: relative;
        font-size: 12px;
        img {
            width:60px;
            height: 60px;
            border-radius: 50%;
            float: left;
        }
        p{
            padding-left: 70px;
            line-height: 18px;
            label{
                color:#999;
            }
            .icon{
                font-size: 13px;
                vertical-align: middle;
                margin-right: 0px;
            }
        }
        p.t{
            padding-right: 60px;
            label{
                display: inline-block;
                height: 30px;
                float: left;
            }
        }
        span{
            text-align: right;
            position: absolute;
            right: 10px;
            top: 10px;
            color:#999;
            font-size: 12px;
            b{
                color:#ff0000;
            }
        }
    }
    .goodsItem{
        position: relative;
        margin: 10px 0px;
        img{
            border-radius:8px;
            width:100%;
        }
        .shoptitle{
            text-align: center;
            padding-bottom: 3px;
            color: #888;
            font-size: 12px;
        }
        a{
            position: absolute;
            right: 0px;
            bottom: 0px;
            display: inline-block;
            padding: 2px 8px;
            background: #ff0000;
            color: #fff;
            border-radius: 15px;
        }
        a.disable{
            background: #ddd;
        }
        .redp{
            color:#ff0000;
            font-size: 12px;
            line-height: 26px;
            span{
                color:#888;
                float:right;
                b{
                    color: #ff0000;
                }
            }
        }
        .over{
            position: relative;

            span{
                position: absolute;
                top:50%;
                left: 50%;
                color:#333;
                z-index: 1;
                margin-top:-30px;
                margin-left:-30px;
                display:inline-block;
                width:60px;
                height: 60px;
                line-height:60px;
                border-radius:50%;
                background: rgba(255,255,255,0.8);
                text-align:center;
            }

        }
        .over:after{
            display: block;
            border-radius:8px;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            content: '';
            position: absolute;
            left: 0;
            top: 0px;
           
        }
        del{
            color: #999;
        }
        .goodsTitle{
            border-bottom: solid 1px #f1f1f1;
            padding: 5px 0px;
            margin-bottom: 5px;
        }
    }
</style>