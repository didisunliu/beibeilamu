<template>
    <div>
        <h1>页面点击埋点(开发环境只会在console打印在控制台，测试环境/线上才会发送请求；页面埋点需要在router/index.js文件中配置对应的peach)</h1>
        <button v-peach-event="{id:'10',name:'社团专供', data: JSON.stringify({a:1,b:23})}">点击</button>
        <h1>Bees中的一些数据</h1>
        this.$app==={{ appData }}==
    </div>
</template>
<script>
    export default {
    	name: 'test',
    	computed: {
    		appData() {
    			console.log(this.$app.settings, '====')
                if (!this.$app.settings) {
    				return null
                }
                let temp = []
                for(let i = 0; i < this.$app.settings.length; i++) {
	                temp.push(this.$app.settings[i])
                }
    			return temp
            }
        },
    	mounted() {
    		console.log(this.$serviceConfig)
            console.log(this.$app.settings)
        }
    }
</script>