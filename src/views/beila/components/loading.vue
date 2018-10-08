<template>
	<div id="loading">
		<van-loading type="spinner" color="white" />
	</div>
</template>
<script>
import { Loading } from 'vant';
    export default {
components: {
    [Loading.name]:Loading
   
  }
    }
  
</script>