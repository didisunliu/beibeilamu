<template>
    <Layout class="main">
        
        <van-nav-bar title="结算中心"  left-text="返回" @click-left="goBack" right-text="明细"     left-arrow fixed>
              </van-nav-bar>
        <div class="content">

            <div class="odcenter">
                <img src="/static/images/timg.jpg" alt="" class="jb">
                <p class="small">可提现金额（元）</p>
                <p class="rbm"> ￥<b>{{yesrmb}}</b> </p>
                
            </div>
            <p class="small bdor">可提现金额 = 总金额 - 审核中的金额</p>
            <div class="rbminfo">
                    <van-row>
                            <van-col span="12" class="center">
                                <p class="p1">总金额（元）</p>
                                
                                <p class="p3">{{total}}</p>
                            </van-col>
                            <van-col span="12" class="center bdf">
                                <p class="p1">审核中的金额（元）</p>
                              
                                <p class="p3">{{auditing}}</p>
                            </van-col>
                           
                        </van-row>
            </div>
            <div class="bton">
                    <van-button size="large" type="primary" :disabled="btn" @click="applyMoney"  class="mg">申请提现</van-button>
            </div>
            <van-cell-group>
                    
               
                <van-cell title="提现记录" icon="records" class="iconyellow" is-link  />
                <!-- <van-cell title="到账查询" icon="pending-orders" class="iconyellow" is-link  /> -->
                    
            </van-cell-group>   
            
            
        </div> 


    </Layout>
    
    
</template>
<script>

   
    import { getDistributorMoney, getApply } from '@/iao/home/query'
    import { Toast,Icon,Cell ,NavBar,CellGroup ,Row, Col,Button,Dialog   } from 'vant'
    
	export default {
		name: 'beila',
        computed: {
            
            
        },
        data() {
			return {
                yesrmb:0,
                total:0,
                auditing:0,
                shopinfo:null,
                btn:false
            }
        },
        mounted() {
            this.shopinfo = JSON.parse(window.localStorage.getItem("shopinfo"));
	        //this.init()
        },
        methods: {
            queryDistributorMoney() {
                getDistributorMoney({
                    'distributorId': this.shopinfo.distributorId
                }).then(res=>{
                    if(!res.code){
                        let data=res.data
                        this.yesrmb=(data.totalMoeny / 100.0).toFixed(2)
                        this.total =((data.totalMoeny + data.auditingMoney) / 100.0).toFixed(2)
                        this.auditing=(data.auditingMoney / 100.0).toFixed(2)
                        if(data.state == 1 || data.totalMoeny <= 0){
                            this.btn=true
                        }
                    }else{
                        console.log(res.message)
                    }
                })
            },
            applyMoney(){
                Dialog.confirm({
                title: '',
                message: '确定申请提现？'
                }).then(() => {
                // on confirm
                this.queryApply()
                    
                }).catch(() => {
                // on cancel
                });
            },
            queryApply(){
                getApply({
                    'distributorId': this.shopinfo.distributorId
                }).then(res=>{
                    if(!res.code){
                        Toast("申请成功，请等待审核结果。")
                        this.btn=true
                    }else{
                        console.log(res.message)
                    }
                })
            },
            goBack(){
                this.$router.back(-1)
            },
            onSubmit(){
                this.$router.push('/submit');  
            },
            onClickRight(){
                this.$router.push('/index');      
            }
            
	        

        },
        components: {
	      
            
            
            [Icon.name]: Icon ,
            [NavBar.name]: NavBar ,
            [Button .name]: Button  ,
            [Dialog  .name]: Dialog   ,
          
            [Cell .name]: Cell  ,
            [CellGroup .name]: CellGroup ,
            [Row.name]: Row, 
            [Col.name]: Col   
        }
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}
    
    .main {
        background-color: #f1f1f1;
        
    }
    .odcenter{
        background-color: #fff;
        padding: 30px 0px;
        text-align: center;
        border-bottom: 1px solid #dddddd;
    }
    .jb{
        display: block;
        margin: 10px auto;
        width: 100px;
        height: 100px;
    }
    .small{
        font-size: 12px;
        color: #888;
        text-align: center;
    }
    .bdor{
        margin-top: 10px;
        border-top: 1px solid #dddddd;
        border-bottom: 1px solid #dddddd;
        background-color: #fff;
        padding: 10px 0px;
    }
    .rbm{
            font-size: 16px;
            b{
                font-size: 32px;
            }
    }
    .rbminfo{
        background-color: #fff;
        padding: 15px 0px;
        border-bottom: 1px solid #dddddd;
    }
    .p1{
            font-size: 12px;
            color: #888;
            padding-right: 5px;
        }
        .center{
            text-align: center;
           
        }
        .bdf{
            border-left: 1px solid #dddddd;
        }
        .p3{
            font-size: 14px;
            color: #333;
            padding-right: 5px;
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
        background-color: #fff;
        padding: 12px;
    }
    .mg{
        margin: 5px auto;
    }

</style>
<style  rel="stylesheet/scss" lang="scss">
    
    .iconyellow{
        .van-icon-records::before ,.van-icon-pending-orders::before{
            color: #f7c712 !important;
        }
    }
</style>