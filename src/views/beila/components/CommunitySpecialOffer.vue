<template>
    <ul class="community-offer">
        <li class="community-offer_li" v-for="(item, index) in list" :key="'community-offer_' + index">
            <a :href="restful.supplyAddress + item.supplyId + '&from=1'">
                <div class="pic">
                    <img :src="item.url170.indexOf('http') !== -1 ? item.url170 : restful.img + item.url170" :alt="item.title">
                </div>
                <div class="title">{{ item.title }}</div>
                <div class="price">{{ item.price + ' 元/' + item.unit }}</div>
            </a>
        </li>
    </ul>
</template>
<script>
    import config from '@/config'
    export default {
    	name: 'CommunitySpecialOffer',
        props: {
    		list: {
    			type: Array,
                default: () => []
            }
        },
        data() {
    		return {
    			restful: config.restful
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .community-offer {
        background-color: #FFF;
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
        padding: 0 1.4rem 1.2rem;
        .community-offer_li {
            width: 10.4rem;
            margin-right: 1rem;
            a {
                display: block;
            }
            .price {
                color: #FF6F1C;
                font-size: 1.5rem;
            }
            .pic {
                width: 10.4rem;
                height: 10.4rem;
                border-radius: 5px;
                overflow: hidden;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .title {
                margin-top: .5rem;
                font-size: 1.3rem;
                color: #333;
                height: 3.7rem;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                line-height: 1.85rem;
            }
        }
    }
</style>