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
                <van-search placeholder="请输入搜索关键词" v-model="value" />
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

        <van-list v-model="loading" :finished="finished" @load="onLoad" class="glist">
            
            <van-cell v-for="(item,index) in list" :key="item" class="goodsItem" @click="goDetail" >
                <p class="shoptitle">本商品由优选超市提供</p>
                <p v-if="index==0" class="pos"><img src="/static/images/goods1.png" class="goodsImg" /> <b class="pos1">绵柔舒适，优选进口原生木浆</b> <b class="pos2">十点爆款</b></p>
                <p class="over" v-else-if="index==1"><img src="/static/images/goods2.png" class="goodsImg" />
                    <span>已售罄</span>
                </p>
                <p v-else-if="index==2"><img src="/static/images/goods3.png" class="goodsImg" /></p>
                <p v-else><img src="/static/images/goods1.png" class="goodsImg" /></p>
                <p class="goodsTitle">全成百利包豆奶   188ml/包 </p>
                <p class="redp">预售时间：9月1日<span>已售 <b>5000</b> 份/ 限量5000份</span></p>
                <p class="redp">提货时间：9月2日</p>
                <p class="redp">￥<big>9.9</big> <del>￥20</del></p>
                <b class="like"><van-icon name="like-o"  /> <i>关注</i></b> 
                <a v-if="index==1" class="disable">加入购物车</a>
                <a v-else>加入购物车</a>
                
            </van-cell>
            
        </van-list>
        <van-tabbar v-model="active" fixed @change="goPage">
            <van-tabbar-item icon="shop">店铺</van-tabbar-item>
            <van-tabbar-item icon="shopping-cart" info="5">购物车</van-tabbar-item>
            <van-tabbar-item icon="contact" >我的</van-tabbar-item>
            
        </van-tabbar>
    </Layout>
    
    
</template>
<script>

   
    import { querySmallBatch, getBehaviorCate, getBehaviorSupply } from '@/iao/home/query'
    import { Toast,List,NavBar,Cell,Search,Tabbar, TabbarItem,Icon  } from 'vant'
    
	export default {
		name: 'ZeroBatchArea',
        computed: {
            
            
        },
        data() {
			return {
				active: 0,
				mailSpecial: [],
				sellGoodGoods: [],
                cateList: [],
				behaviorSupply: [],
                list: [],
                loading: false,
                finished: false,
                value:''
            }
        },
        mounted() {
            //this.init()
            document.title = '雨花碧水龙庭店'
           
        },
        watch:{
            // $route(){
            //     document.title="123",this.$route.meta.title
            // }
        },
        methods: {
            onLoad() {
                
                console.info(this.$route.meta.title)
                setTimeout(() => {
                    for (let i = 0; i < 5; i++) {
                    this.list.push(this.list.length + 1);
                    }
                    this.loading = false;

                    if (this.list.length >= 20) {
                    this.finished = true;
                    }
                }, 300);
            },
            onSearch(){

            },
            goDetail(){
                this.$router.push('/detail');
            },
            goPage(a){
                console.log(a)
                if(a==1){
                    this.$router.push('/car');  
                }else if(a==2){
                    this.$router.push('/user');  
                }
                //this.$router.push('/detail');
            },
            goBack(){
                this.$router.back(-1)
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
        }
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
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
            line-height: 20px;
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