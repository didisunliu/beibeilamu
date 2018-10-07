<template>
    <ul class="hot-category" v-if="list.length > 0">
        <li class="hot-category_item" v-for="(item, index) in list" :key="'hot-category_' + index">
            <router-link class="hot-category_item-a" tag="a" :to="{path: '/list', query: { cateId: item.id }}">
                <div class="pic">
                    <span class="pic-item">{{ item.name.substring(0, 1) }}</span>
                </div>
                <p class="title">{{ item.name }}</p>
            </router-link>
        </li>
    </ul>
</template>
<script>
    export default {
    	name: 'HotCategory',
        props: {
    		list: {
    			type: Array,
                default: () => []
            }
        },
        data() {
    		return {

            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .hot-category {
        padding-top: 1rem;
        display: flex;
        background-color: #FFF;
        .hot-category_item {
            flex: 1;
            .hot-category_item-a {
                display: block;
            }
            .pic {
                width: 4rem;
                height: 4rem;
                margin: 0 auto;
                .pic-item {
                    display: block;
                    border: 1px solid #CCC;
                    width: 100%;
                    height: 100%;
                    border-radius: 4rem;
                    text-align: center;
                    line-height: 4rem;
                    font-size: 2rem;
                    color: #44bb00;
                }
                img {
                    width: 100%;
                    height: 100%;
                }

            }
            .title {
                color: #333;
                text-align: center;
                font-size: 1.5rem;
                line-height: 3.1rem;
                height: 3.1rem;
            }
        }
    }
</style>