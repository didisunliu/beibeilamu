<template>
    <div class="app-wrapper">
        <slot name="header" v-if="vShowHeader">
            <LayoutHeader :title="title" :leftText="leftText" :rightText="rightText" @click-left="clickLeft" @click-right="clickRight"></LayoutHeader>
        </slot>
        <div class="content" :class="{hasHeader: vShowHeader, hasFooter: hasFooter}">
            <slot></slot>
        </div>
        <slot name="footer" v-if="vShowFooter">
            <LayoutFooter></LayoutFooter>
        </slot>
    </div>
</template>
<script>
	import { LayoutHeader, LayoutFooter } from './components'
	export default {
		name: 'Layout',
        props: {
            hasHeader: {
            	type: Boolean,
                default: false
            },
            hasFooter: {
                type: Boolean,
                default: false
            },
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
        computed: {
	        vShowHeader() {
		        if (this.hasHeader) {
			        this.$app.putData('title', JSON.stringify({
				        show: 0
			        }))
		        } else {
			        this.$app.putData('title', JSON.stringify({
				        titleStr: this.title,
				        show: 1
			        }))
                }
		        return this.hasHeader ? true : false
	        },
            vShowFooter() {
	            return this.hasFooter || this.$root.hasFooter || false
            }
        },
        methods: {
	        clickLeft() {
	        	this.$emit('click-left')
            },
	        clickRight() {
	        	this.$emit('click-right')
            }
        },
		components: {
			LayoutHeader,
			LayoutFooter
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
    @import "src/styles/mixin.scss";
    .app-wrapper {
        @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;
        background-color: #FFF;
        .content {
            width: 100%;
            position: absolute;
            top: 0;
            bottom: 0;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
        }
        .hasHeader {
            top: 46px;
        }
        .hasFooter {
            bottom: 50px;
        }
        .van-nav-bar .van-icon {
            color: #555555;
            font-weight: bold;
            font-size: 14px;
        }
        .van-nav-bar__title{
            color: #1E1E1E;
            font-size: 17px;
        }
        .van-nav-bar__text {
            color: #555555;
        }
    }
</style>
