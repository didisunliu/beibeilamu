<template>
    <Layout class="main">
        
        <van-nav-bar title="购物车"  left-text="返回" @click-left="goBack"    left-arrow fixed> </van-nav-bar>
        <div class="content"> 
                <van-swipe-cell :right-width="65" >
                        <van-cell-group>
                          <van-cell >
                                <div class="goods">
                                        <div class="gcheckbox"><van-checkbox v-model="checked"></van-checkbox></div>
                                        <div class="ordergoods">
                                            <van-card
                                        title="标题"
                                        desc="描述"  
                                      
                                        price="2.00"
                                        :thumb="imageURL"
                                      > 
                                        <div slot="footer">
                                            <van-stepper v-model="value" />
                                        </div>
                                      </van-card>
                                        </div>
                                    </div>
                          </van-cell>
                        </van-cell-group>
                        <span slot="right" class="del">删除</span>
                      </van-swipe-cell>
            
            <van-swipe-cell :right-width="65" >
                <van-cell-group>
                  <van-cell >
                        <div class="goods">
                                <div class="gcheckbox"><van-checkbox v-model="checked"></van-checkbox></div>
                                <div class="ordergoods">
                                    <van-card
                                title="标题"
                                desc="描述"  
                              
                                price="2.00"
                                :thumb="imageURL"
                              > 
                                <div slot="footer">
                                    <van-stepper v-model="value" />
                                </div>
                              </van-card>
                                </div>
                            </div>
                  </van-cell>
                </van-cell-group>
                <span slot="right" class="del">删除</span>
              </van-swipe-cell>
            
        </div> 



        <van-submit-bar class=""
            :price="3050"
            button-text="去结算"
            @submit="onSubmit"
            >
            <van-checkbox class="pdleft" v-model="checked">全选</van-checkbox>
            <!-- <span slot="tip">
                您的收货地址不支持同城送, <span>修改地址</span>
            </span> -->
        </van-submit-bar>
    </Layout>
    
    
</template>
<script>

   
    import { querySmallBatch, getBehaviorCate, getBehaviorSupply } from '@/iao/home/query'
    import { Toast,NavBar,Icon,SubmitBar,Checkbox ,Cell,CheckboxGroup ,SwipeCell,Stepper ,Card  } from 'vant'
    
	export default {
		name: 'ZeroBatchArea',
        computed: {
            
            
        },
        data() {
			return {
				active: 0,
                checked:false,
                result:["a"],
                imageURL:"/static/images/qq.png"
            }
        },
        mounted() {
	        //this.init()
        },
        methods: {
            onClickMiniBtn() {
                
            },
            onClickBigBtn(){

            },
            goBack(){
                this.$router.back(-1)
            },
            onSubmit(){
                this.$router.push('/submit');  
            }
            
	        

        },
        components: {
	      
            
            [SubmitBar.name]: SubmitBar,
            [NavBar.name]: NavBar,
            [Icon.name]: Icon ,
            [Card.name]: Card  ,
            [Stepper.name]: Stepper   ,
            [CheckboxGroup.name]: CheckboxGroup ,
            [SwipeCell .name]: SwipeCell  ,
            [Cell .name]: Cell  ,
            [Checkbox.name]: Checkbox 
        }
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}
    
    .main {
        background-color: #f1f1f1;
        
    }
    .content{
        margin: 45px 0px;
       
        
    }
    .pdleft{
        padding-left: 1rem;
    }
    .goods{
        padding:0 10px;
        background: #fff;
       
        .van-card{
            background: #fff;
        }
    }
    .van-cell{
        padding: 10px 0px;
        border-bottom: 1px solid #f1f1f1;
        margin-bottom: 10px;
    }
    .del{
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
    .gcheckbox{
        width:22px;
        float: left;
        margin-right: 0px;
        line-height: 85px;
    }

</style>