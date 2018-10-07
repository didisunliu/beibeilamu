<template>
    <van-list v-model="loading" :finished="finished" @load="onLoad">
        <div class="supply-list" v-for="(item, index) in list" :key="'supply-' + item.supplyId + '_' + index">
            <a class="supply-list_a" :href="restful.supplyAddress + item.supplyId + '&from=1'">
                <div class="left" :style="{ backgroundImage: 'url(' + restful.img + item.url170 +')' }"></div>
                <div class="right">
                    <div class="title">{{ item.title }}</div>
                    <div class="des">{{ item.address + ' ' + item.linkMan }}</div>
                    <div class="auth" v-if="item.certifitionTag && item.certifitionTag.length > 0">
                        <span class="auth-span" v-for="(v, index) in item.certifitionTag" :key="'certifitionTag-' + index" :style="{border: '1px solid #' + v.color, color: '#' + v.color}">
                            {{ v.value }}
                        </span>
                    </div>
                    <div class="right-bottom clearfix">
                        <div class="fl">{{ item.price}}<span class="spec">{{ '元/' + item.unit }}</span></div>
                        <div class="fr">{{ item.timeStr }}</div>
                    </div>
                </div>
            </a>
        </div>
        <div class="no-more_msg">没有更多数据了...</div>
    </van-list>
</template>
<script>
	import { List } from 'vant';
	import { queryHotSmallBatch, querySmallBatch } from '@/iao/home/query'
    import { Toast } from 'vant'
    import config from '@/config'
    export default {
    	name: 'SupplyList',
        props: {
    		isHot: {
    			type: Boolean,
                default: false
            },
	        cateId3: {
    			type: Number,
                default: null
            },
	        isFreeShipping: {
    			type: Boolean,
                default: false
            }
        },
        computed: {
	        queryOptions() {
	        	let cateId3 = this.cateId3
	        	return this.cateId3 ? Object.assign({
			        cateId3: this.cateId3,
			        isFreeShipping: this.isFreeShipping,
			        deviceId: this.$app.settings.deviceId,
			        pageNumber: 0,
			        pageSize: 10,
			        qHnUserId: this.$app.settings.hnUserId
		        },{
			        cateId3
		        }) : {
			        isFreeShipping: this.isFreeShipping,
			        deviceId: this.$app.settings.deviceId,
			        pageNumber: 0,
			        pageSize: 10,
			        qHnUserId: this.$app.settings.hnUserId
		        }
            },
            dataRequest() {
	            return this.isHot ? queryHotSmallBatch : querySmallBatch
            }
        },
        data() {
    		return {
			    restful: config.restful,
			    loading: false,
			    finished: false,
                list: [],
                totalPage: 0
            }
        },
        methods: {
	        onLoad() {
                this.queryOptions.pageNumber++
                this.loading = true
                this.dataRequest(this.queryOptions).then(res => {
                	let response = res.data
	                this.totalPage = response.size !== 0 ? Math.ceil(response.size / this.queryOptions.pageSize) : 0
	                if (res.code) {
                		Toast('查询列表数据异常...')
                    } else {
		                this.list.push(...response.datas)
                		if (response.datas.length === 0 || this.queryOptions.pageNumber >= this.totalPage) {
                            this.finished = true
                        }
                    }
                	this.loading = false
                })
            }
        },
        components: {
    		[List.name]: List
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .no-more_msg {
        text-align: center;
        height: 2.5rem;
        font-size: 1.4rem;
        line-height: 2.5rem;
        background: #FFF;
        border-top: 1px solid #e7e7e7;
    }
    .supply-list {
        background-color: #FFF;
        padding: 0 1.4rem 1rem 0.8rem;
        .supply-list_a {
            width: 100%;
            height: 13.2rem;
            padding: 1.2rem 0;
            display: flex;
            .left {
                width: 10.8rem;
                height: 10.8rem;
                margin-right: 1.1rem;
                background-position: center center;
                background-size: contain;
                background-repeat: no-repeat;
                background-color: rgba(204, 204, 204, .5);
                border-radius: 5px;
            }
            .right {
                flex: 1;
                position: relative;
                overflow: hidden;
                .right-bottom {
                    position: absolute;
                    width: 100%;
                    bottom: 0;
                    left: 0;
                    background-color: #FFF;
                    .fl {
                        font-size: 1.8rem;
                        color: #FF6F1C;
                        .spec {
                            font-size: 1.2rem;
                        }
                    }
                    .fr {
                        color: #999;
                        font-size: 1.2rem;
                    }
                }
                .auth {
                    font-size: 1rem;
                    padding: 5px 0;
                    .auth-span {
                        padding: 1px 2px;
                        margin-right: 5px;
                        border-radius: 4px;
                    }
                }
                .des {
                    font-size: 1.3rem;
                    color: #999;
                    line-height: 1.65rem;
                    max-height: 3.3rem;
                    overflow: hidden;
                }
                .title {
                    font-size: 1.5rem;
                    color: #1D201B;
                    line-height: 1.8rem;
                    max-height: 3.6rem;
                    overflow: hidden;
                }
            }
        }
    }
</style>