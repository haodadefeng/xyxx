<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body grade">
      <div class="student">
        <div class="left">
          <el-tree
          class="filter-tree"
          :data="classData"
          :props="defaultProps"
          default-expand-all
          :highlight-current='true'
          @node-click="handleNodeClick"
          ref="tree2">
          </el-tree>
        </div>
        <div class="right">
            <add-student :classId='chackedClass'></add-student>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle} from 'components'
  import addStudent from './addStudent'

  export default{
    data(){
      return {
          filterText: '',
          chackedClass:'',
          classData: [{

          }],
           defaultProps: {
             children: 'children',
             label: 'label'
           }
      }
    },
    components: {
      panelTitle,
      addStudent
    },
    methods:{
      handleNodeClick:function(data){
        if(!data.hasOwnProperty('children')){
          this.chackedClass = data.id;
        }
      },
      get_table_data(){
        this.$ajax({
          url:'/sys/queryGrals',
          method:'post'
        }).then(res=>{
          console.log(res);
          if(res.data.result == 'true'){
            this.load_data = false;
            let o = [];
            res.data.beans.map(data=>{
              let z = {};
              z.id = data.uuid,
              z.label = data.graName;
              z.children = []
              if(data.hasOwnProperty('sclass') && data.sclass.length){
                data.sclass.map(childData=>{
                  let n = {}
                  n.id = childData.uuid;
                  n.label = childData.className;
                  z.children.push(n)
                })
              }
              o.push(z);
            })
            // this.classData = res.data.beans;
            console.log(o)
            this.classData = o;
          }else{
            this.load_data = false
          }
        });
      }
    },
    created(){
      this.get_table_data();
    }
  }
</script>
<style lang='scss' scoped>
  .student{
    flex:1;
    position: relative;
    display: flex;
    flex-direction: row;
    .left{
      margin-top:34px;
      width:200px
    }
    .right{
      margin-left:20px;
      flex-grow: 1;
      align-items:stretch;
    }
  }
</style>
