<template>
        <Layout class="main">
            
            <van-nav-bar title="查看排行"  left-text="返回" @click-left="goBack"    left-arrow fixed> </van-nav-bar>
            <div class="content">    
                <div>
                        <van-search
                        v-model="keyword"
                        placeholder="店铺名称查询"
                        @search="onSearch"
                        @input="onSearch"
                      >
                        
                      </van-search>
                </div>
                
                
               <van-list v-model="loading" :finished="finished" :offset="10" @load="onLoad">
                    <template v-for="item in list" >
                        <div>
                            <div class="itemO">
                                <van-row>
                                    <van-col span="4">
                                    
                                       <p class="p3">排名</p>
                                        <p class="p2">{{item.idx}}</p>
                                       
                                    </van-col>
                                    <van-col span="10" class="center">
                                          <p class="p3">店铺名称</p>
                                        <p class="p2">{{item.shopName}}</p>
                                  
                                   
                                       
                                    </van-col>
                                    <van-col span="5" class="center">
                                        <p class="p3">粉丝数量</p>
                                        <p class="p2">{{item.fansNum}}</p>
                                       
                                    </van-col>
                                    <van-col span="5" class="center">
                                        <p class="p3">销售指数</p>
                                        <p class="p2">{{item.soldNum}}</p>
                                       
                                        
                                    </van-col>
                                </van-row>
                            </div>
                        </div>
                    </template>
                </van-list>
                       
                    
                            

                <!-- <p class="nomore">没有更多订单了~~~</p> -->
            </div> 
            
    
    
            
        </Layout>
        
        
    </template>
    <script>
import { queryPaihang } from "@/iao/home/query";
import {
  Toast,
  NavBar,
  Icon,
  Tab,
  Tabs,
  List,
  Panel,
  Cell,
  Search,
  Row,
  Col
} from "vant";

export default {
  name: "beila",
  computed: {},
  data() {
    return {
      active: 0,
      value: "",
      checked: false,
      list: [],
      loading: false,
      finished: false,
      result: ["a"],
      keyword: "",
      pageNum: 1,
      pageSize: 10,
      shopinfo:null
    };
  },
  mounted() {
    //this.init()
    this.shopinfo = JSON.parse(window.localStorage.getItem("shopinfo"));
  },
  methods: {
    loadData() {
      queryPaihang({
        keyword: this.keyword,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        if (!res.code) {
          //this.showLoading=false
          if (res.data.length == 0) {
             
            this.finished = true;
             this.loading = false;
          } else {
            this.list = res.data;

            this.pageNum = this.pageNum + 1;
            //  console.log(this.formLine["pager.pageNum"])
            if (res.data.length < 10) {
              this.finished = true;
            }
            this.loading = false;
          }
        } else {
          this.finished = true;
        }
      });
    },
    onClickBigBtn() {},
    onSearch() {
         this.loading = true;
         this.pageNum=1
      this.loadData();
    },
    goBack() {
      this.$router.back(-1);
    },
    onSubmit() {
      this.$router.push("/submit");
    },
    onLoad() {
      this.loadData();
      // setTimeout(() => {
      //     for (let i = 1; i < 7; i++) {
      //     this.list.push(this.list.length + 1);
      //     }
      //     this.loading = false;

      //     if (this.list.length >= 40) {
      //     this.finished = true;
      //     }
      // }, 500);
    },
    changeTab(e) {
      this.active = e;
    }
  },
  components: {
    [Tab.name]: Tab,
    [Cell.name]: Cell,
    [Tabs.name]: Tabs,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [List.name]: List,
    [Panel.name]: Panel,
    [Search.name]: Search,
    [Row.name]: Row,
    [Col.name]: Col
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

.tabbox {
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
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
  line-height: 3;
  padding-right: 5px;
}
.p2 {
  font-size: 14px;
  color: #333;
  font-weight: normal;
  padding-right: 5px;
}
.p3 {
  font-size: 12px;
  color: #888;
  padding-right: 5px;
}
.center {
  text-align: center;
  border-left: 1px solid #dddddd;
}
.pbox {
  padding: 12px 16px;
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  background: #ffffff;
  font-size: 12px;
  span {
    font-size: 14px;
    float: right;
  }
  .red {
    color: red;
  }
  .blank {
    color: #333;
  }
}
.price {
  padding: 12px 16px;
  border-top: 1px solid #dddddd;

  background: #ffffff;
  font-size: 12px;
  span {
    font-size: 12px;
    font-weight: bold;
    float: right;
  }
  b {
    color: red;
    font-size: 14px;
  }
}
.oitem {
  margin-top: 10px;
}
</style>
    <style  rel="stylesheet/scss" lang="scss" >
.oitem .van-cell__right-icon {
  line-height: 3 !important;
}
</style>