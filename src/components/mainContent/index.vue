<template>
  <div class="main-content ofh">
    <el-row style='height:100%'>
      <el-col :span="24" style='height:100%'>
        <h-section></h-section>
        <div class="wrapper">
          <div class="pageContent" style='height:100%'>
            <el-row style='height:100%'>
              <el-col :span="24" style='height:100%;position:relative'>
                <slot></slot>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script type="text/javascript">
  import hSection from './headerSection'
  import vFooter from './footer'

  export default{
    name: 'content',
    components: {
      hSection,
      vFooter
    }
  }
</script>
