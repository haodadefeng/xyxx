<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body">
      {{msg}}
    </div>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle} from 'components'

  export default{
    data(){
      return {
        msg: '在线测试模块'
      }
    },
    components: {
      panelTitle
    }
  }
</script>
