<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body">
      <div class="" style='width:50%'>
        <el-tree
          :data="data" :props="defaultProps"
          @node-click="handleNodeClick"
          :highlight-current=true
          :render-content="renderContent">
        </el-tree>
      </div>
    </div>
  </div>
</template>
<script>
  import {panelTitle, bottomToolBar} from 'components'
  let id = 1000;

  export default {
    data() {
      return {
        data: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    components:{
      panelTitle
    },
    methods: {
      append(store, data) {
        store.append({ id: id++, label: 'testtest', children: [] }, data);
      },

      remove(store, data) {
        store.remove(data);
      },

      handleNodeClick(data){
        console.log(data);
      },

      clickHandler(){
        console.log('plus')
      },

      renderContent(h, { node, data, store }) {
        var o = h(
          'span',[
            h('span',
              node.label),
            h('span',{},[
              h('i',{
                class:{
                  fr:true,
                  'el-icon-delete':true,
                  iconstyle:true
                }
              },''),
              h('i',{
                class:{
                  fr:true,
                  'el-icon-edit':true,
                  iconstyle:true
                }
              },''),
              h('i',{
                class:{
                  fr:true,
                  'el-icon-plus':true,
                  iconstyle:true
                },
                on: {
                  click: this.clickHandler(data)
                }
              },'')
            ])
          ]
        );

        return o;
      }
    }
  };
</script>
<style lang='scss'>
.iconstyle{
  line-height:36px;
  margin-right:10px;
  color:rgb(32,160,255);
  &:hover{
    color:rgb(77,179,255);
  }
}
</style>
