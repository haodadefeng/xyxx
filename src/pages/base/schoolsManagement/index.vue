<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
      <router-link :to="{name: 'addSchool',params:{type:'add'}}" tag="span">
        <el-button type="primary" icon="plus" size="small" :disabled="false">添加学校</el-button>
      </router-link>
    </panel-title>
    <div class="search-input">
      <div class="searchBox">
        <el-input placeholder="请输入内容" v-model="select_input" @keyup.enter.native='on_batch_select'>
          <el-select v-model="select_header" slot="prepend" placeholder="请选择" style='width:120px'>
            <el-option v-for='list in checkList'
            :key="list.value"
            :label="list.label"
            :value="list.value">
          </el-option>
          </el-select>
          <el-button slot="append" icon="search" @click="on_batch_select"></el-button>
        </el-input>
      </div>
    </div>
    <div class="panel-body">
      <el-table
        :data="table_data"
        v-loading="load_data"
        element-loading-text="拼命加载中"
        border
        @selection-change="on_batch_select"
        class='tableStyle'>
        <el-table-column
          prop="scCode"
          label="学校标识码"
          width="120">
        </el-table-column>
        <el-table-column
          prop="scName"
          label="学校名称"
          >
        </el-table-column>
        <el-table-column
          prop="scEnName"
          label="学校英文名"
          >
        </el-table-column>
        <el-table-column
          prop="scType"
          label="办学类型"
          >
        </el-table-column>
        <el-table-column
          prop="teachmaterialId"
          label="教材版本"
          >
        </el-table-column>
        <el-table-column
          prop="principalName"
          label="校长姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="principalMobilephone"
          label="校长电话"
          width="160">
        </el-table-column>
        <el-table-column
          label="操作"
          width="250">
          <template scope="props">
            <!-- <router-link :to="{name: 'tableUpdate', params: {id: props.row.id}}" tag="span">
              <el-button type="warning" size="small" icon="document">详情</el-button>
            </router-link> -->
            <router-link :to="{name: 'addSchool', params: {props: props.row,type:'edit'}}" tag="span">
              <el-button type="info" size="small" icon="edit">修改</el-button>
            </router-link>
            <el-button type="danger" size="small" icon="delete" @click="delete_data(props.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <bottom-tool-bar>
        <div slot="page">
          <el-pagination
            :current-page="currentPage"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </bottom-tool-bar>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle, bottomToolBar} from 'components'
  import $ from 'jquery'

  export default{
    data(){
      return {
        table_data: null,
        //当前页码
        currentPage: 1,
        //数据总条目
        total: 0,
        //每页显示多少条数据
        length: 30,
        //请求时的loading效果
        load_data: true,
        //批量选择数组
        batch_select: [],
        height:'500',
        select_input:'',
        select_header:'scCode',
        checkList:[
          {
            label:'学校标识码',
            value:'scCode'
          },
          {
            label:'学校名称',
            value:'scName'
          },
          {
            label:'校长名字',
            value:'principalName'
          }

        ]
      }
    },
    components: {
      panelTitle,
      bottomToolBar
    },
    created(){
      this.get_table_data()
    },
    methods: {
      //刷新
      on_refresh(){
        this.get_table_data()
      },
      //获取数据
      get_table_data(){
        this.load_data = true
        // this.$fetch.api_table.list({
        //   page: this.currentPage,
        //   length: this.length
        // })
        //   .then(({data: {result, page, total}}) => {
        //     this.table_data = result
        //     this.currentPage = page
        //     this.total = total
        //     this.load_data = false
        //   })
        //   .catch(() => {
        //     this.load_data = false
        //   })
        this.$ajax({
          url:'/school/querySchool.do',
          method:'post'
        }).then(({data:{beans,pb}})=>{
          this.table_data = beans;
          this.currentPage = parseInt(pb.pageNo),
          this.total = parseInt(pb.pageDataCount),
          this.load_data = false;
        })
      },
      //单个删除
      delete_data(item){
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.load_data = true
            // this.$fetch.api_table.del(item)
            //   .then(({msg}) => {
            //     this.get_table_data()
            //     this.$message.success(msg)
            //   })
            //   .catch(() => {
            //   })
            this.$ajax({
              url:'/school/deleteScl',
              method:'post',
              params:{uuid:item.uuid}
            }).then(res=>{
              if(res.data.result == 'true'){
                this.$message.success(res.data.resultDesc);
                this.load_data = false;
                this.get_table_data();
              }else{
                this.$message.success(res.data.resultDesc);
                this.load_data = false
              }
            });
          })
          .catch(() => {
          })
      },
      //页码选择
      handleCurrentChange(val) {
        this.currentPage = val
        this.get_table_data()
      },
      on_batch_select(){
        if(!this.select_header){
          this.$message.warning('请选择要搜索的字段!');
          return;
        }
        let o = {};
        o[this.select_header] = this.select_input;
        this.$ajax({
          url:'/school/querySchool.do',
          method:'post',
          params:o
        }).then((res)=>{
          this.table_data = res.data.beans;
          this.currentPage = parseInt(res.data.pb.pageNo) || 0,
          this.total = parseInt(res.data.pb.pageDataCount) || 0,
          this.load_data = false;
        })
      }
      //批量选择
      // on_batch_select(val){
      //   this.batch_select = val
      // },
      //批量删除
      // on_batch_del(){
      //   this.$confirm('此操作将批量删除选择数据, 是否继续?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   })
      //     .then(() => {
      //       this.load_data = true
      //       this.$fetch.api_table.batch_del(this.batch_select)
      //         .then(({msg}) => {
      //           this.get_table_data()
      //           this.$message.success(msg)
      //         })
      //         .catch(() => {
      //         })
      //     })
      //     .catch(() => {
      //     })
      // }
    }
  }
</script>

<style lang="scss" scoped>
  .tableStyle{
    display: flex;
    flex-direction: column;
    .el-table__header-wrapper{
      flex-grow:1
    }
    .el-table__body-wrapper{
      flex-grow:1
    }
  }
</style>
