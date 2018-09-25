<template>
    <div class="title">
        <div class="left">{{ title }}</div>
        <div class="right" v-if="showMore">
            <router-link tag="a" :to="linkParams" target="_blank">更多</router-link>
        </div>
    </div>
</template>
<script>
    export default {
    	props: {
    		title: {
    			type: String,
                default: ''
            },
            showMore: {
    			type: Boolean,
                default: false
            },
            linkParams: {
    			type: Object,
                default: () => {}
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .title {
        background-color: #FFF;
        height: 4rem;
        line-height: 4rem;
        .left {
            float: left;
            color: #444;
            background-image: url("/static/images/line.png");
            background-repeat: no-repeat;
            background-position: 1.4rem center;
            background-size: 0.3rem 1.5rem;
            text-indent: 2.1rem;
            font-size: 1.5rem;
        }
        .right {
            float: right;
            font-size: 1.3rem;
            color: #999;
            background-image: url("/static/images/more.png");
            background-repeat: no-repeat;
            background-position: right center;
            background-size: 1.2rem 1.2rem;
            margin-right: 1.4rem;
            padding-right: 1.6rem;
            height: 100%;
            a {
                display: inline-block;
            }
        }
    }
</style>