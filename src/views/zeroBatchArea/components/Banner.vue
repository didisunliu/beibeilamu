<template>
    <van-swipe @change="change" class="s-banner" v-show="list.length > 0" :show-indicators="false" :autoplay="vAutoplay" :style="{ height: vHeight}">
        <van-swipe-item v-for="(item, index) in list" :key="'van-swipe-item_' + index">
            <a :href="item.linkUrl">
                <img :src="item.imgUrl" alt="图片">
            </a>
        </van-swipe-item>
    </van-swipe>
</template>
<script>
	import { Swipe, SwipeItem } from 'vant';
	export default {
		name: 'Banner',
        props: {
			list: {
				type: Array,
                default: () => []
            },
            autoplay: {
				type: Number,
                default: 0
            },
            height: {
				type: [Number, String],
                default: 0
            }
        },
        computed: {
			vHeight() {
				return this.$root.height || this.height || '';
            },
            vAutoplay() {
	            return this.$root.autoplay || this.autoplay || 0;
            }
        },
        components: {
			[Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem
        },
        methods: {
	        change(index) {
	        	this.$emit('change', index)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .s-banner {
        height: 100%;
        a {
            display: block;
            width: 100%;
            height: 100%;
        }
        img {
            width: 100%;
            height: 100%;
        }
    }
</style>