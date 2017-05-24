<template>
  <div class="panel teacher">
    <panel-title :title="$route.meta.title">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
      <router-link :to="{name: 'addTeacher',params:{type:'add'}}" tag="span">
        <el-button type="primary" icon="plus" size="small">添加教师</el-button>
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
          prop="teaName"
          label="教师名称"
          >
        </el-table-column>
        <el-table-column
          prop="teaPho"
          label="联系电话"
          >
        </el-table-column>
        <el-table-column
          prop="teaAddress"
          label="联系地址"
          >
        </el-table-column>
        <el-table-column
          prop="indResume"
          label="个人简介"
          >
        </el-table-column>
        <el-table-column
          prop="subjectId"
          label="所属学科"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          width="250">
          <template scope="props">
            <router-link :to="{name: 'addTeacher', params: {props: props.row,type:'edit'}}" tag="span">
              <el-button type="info" size="small" icon="edit">修改</el-button>
            </router-link>
            <el-button type="danger" size="small" icon="delete" @click="delete_data(props.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <bottom-tool-bar>
        <div slot="page">
          <el-pagination
            @current-change="handleCurrentChange"
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
        select_header:'teaName',
        checkList:[
          {
            label:'教师名称',
            value:'teaName'
          },
          {
            label:'所属学科',
            value:'subjectId'
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
        this.$ajax({
          url:'/tea/queryTeacher.do',
          method:'post'
        }).then(({data:{beans,pb}})=>{
          this.table_data = beans;
          // this.currentPage = parseInt(pb.pageNo),
          // this.total = parseInt(pb.pageDataCount),
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
            this.$ajax({
              url:'/tea/deleteTeah',
              method:'post',
              params:{uuid:item.uuid}
            }).then(res=>{
              if(res.data.result == 'true'){
                this.$message.success(res.data.resultDesc);
                this.get_table_data();
              }else{
                this.$message.success(res.data.resultDesc);
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
          url:'/tea/queryTeacher.do',
          method:'post',
          params:o
        }).then((res)=>{
          this.table_data = res.data.beans;
          this.currentPage = parseInt(res.data.pb.pageNo) || 0,
          this.total = parseInt(res.data.pb.pageDataCount) || 0,
          this.load_data = false;
        })
      }

    }
  }
</script>
<style layout='scss' scoped>

</style>
