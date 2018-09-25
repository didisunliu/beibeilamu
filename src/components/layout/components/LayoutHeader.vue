<template>
    <van-nav-bar
            :title="title"
            :left-text="leftText"
            :right-text="rightText"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
    />
</template>
<script>
	import { NavBar } from 'vant';
    export default {
        name: 'LayoutHeader',
	    props: {
		    title: {
			    type: String,
			    default: ''
		    },
		    leftText: {
			    type: String,
			    default: ''
		    },
		    rightText: {
			    type: String,
			    default: ''
		    }
	    },
        data() {
            return  {

            }
        },
        methods: {
	        onClickLeft() {
	        	this.$emit('click-left')
            },
	        onClickRight() {
	        	this.$emit('click-right')
            }
        },
        components: {
        	[ NavBar.name ]: NavBar
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>