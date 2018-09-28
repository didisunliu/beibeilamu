<template>
    <Layout class="main" :title="'零批市场'">
        <div class="content-p">
            <p @click="closeWebview">CONTENT</p>
            <p>CONTENT</p>
            <p>CONTENT</p>
            <p>CONTENT</p>
            <p>CONTENT</p>
            <p>CONTENT</p>
            <p>CONTENT</p>
            <p>CONTENT</p>
            <p>CONTENT</p>
            <p>CONTENT</p>
            <p>CONTENT</p>
            <p>CONTENT</p>
            <p>CONTENT</p>
            <p>CONTENT</p>
            <p>CONTENT</p>
            <p>CONTENT</p>
            <p>CONTENT</p>
            <p>CONTENT</p>
            <p>CONTENT</p>
            <p>CONTENT111</p>
        </div>
        <div class="footer">
            <input type="text" placeholder="请输入消息内容">
        </div>
    </Layout>
</template>
<script>
	export default {
		name: 'ZeroBatchArea',
		computed: {

		},
		data() {
			return {
			}
		},
        methods: {
			closeWebview() {
				// business
				this.$app.doAction('closeWebview')
            }
        }
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .content-p {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 46px;
        right: 0;
        overflow-y: auto;
        overflow-x: hidden;
        p {
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid red;
        }
    }
    .footer {
        height: 46px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        input {
            height: 35px;
            border: 1px solid red;
            width: 80%;
        }
    }
</style>