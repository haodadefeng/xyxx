<template>
  <div class="panel teacher">
    <panel-title :title="$route.meta.title">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
      <!-- <router-link :to="{name: 'addSchool'}" tag="span">
        <el-button type="primary" icon="plus" size="small">添加试题</el-button>
      </router-link> -->
      <el-button type="primary" icon="plus" size="small">导入</el-button>
    </panel-title>
    <div class="search-input">
      <div class="searchBox">
        <el-input placeholder="请输入内容" v-model="input">
          <el-select v-model="select" slot="prepend" placeholder="请选择" style='width:150px;'>
            <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
          </el-select>
          <el-button slot="append" icon="search"></el-button>
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
        <el-table-column type="expand">
          <template scope="props">
            <div class="details">
              <div class="">
                <pre>
                  题目: 1+1=?
                        A:1
                        B:2
                        C:3
                        D:4
                </pre>
              </div>
              <div class="">
                <pre>
                  答案:D
                </pre>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          label="试题编号"
          >
        </el-table-column>
        <el-table-column
          prop="name"
          label="题目名称"
          >
        </el-table-column>
        <el-table-column
          prop="sex"
          label="题干"
          >
        </el-table-column>
        <el-table-column
          prop="sex"
          label="答案"
          >
        </el-table-column>
        <el-table-column
          prop="sex"
          label="标签簇"
          >
        </el-table-column>
        <el-table-column
          prop="sex"
          label="年级"
          >
        </el-table-column>
        <el-table-column
          prop="sex"
          label="教材"
          >
        </el-table-column>
        <el-table-column
          prop="sex"
          label="科目"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          width="250">
          <template scope="props">
            <!-- <router-link :to="{name: 'tableUpdate', params: {id: props.row.id}}" tag="span">
              <el-button type="warning" size="small" icon="edit">试卷详情</el-button>
            </router-link> -->
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

  export default{
    data(){
      return {
        table_data: null,
        //当前页码
        currentPage: 1,
        //数据总条目
        total: 0,
        //每页显示多少条数据
        length: 15,
        //请求时的loading效果
        load_data: true,
        //批量选择数组
        batch_select: [],
        height:'500'
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
        this.$fetch.api_table.list({
          page: this.currentPage,
          length: this.length
        })
          .then(({data: {result, page, total}}) => {
            this.table_data = result
            this.currentPage = page
            this.total = total
            this.load_data = false
          })
          .catch(() => {
            this.load_data = false
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
            this.$fetch.api_table.del(item)
              .then(({msg}) => {
                this.get_table_data()
                this.$message.success(msg)
              })
              .catch(() => {
              })
          })
          .catch(() => {
          })
      },
      //页码选择
      handleCurrentChange(val) {
        this.currentPage = val
        this.get_table_data()
      },
      //批量选择
      on_batch_select(val){
        this.batch_select = val
      },
      //批量删除
      on_batch_del(){
        this.$confirm('此操作将批量删除选择数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.load_data = true
            this.$fetch.api_table.batch_del(this.batch_select)
              .then(({msg}) => {
                this.get_table_data()
                this.$message.success(msg)
              })
              .catch(() => {
              })
          })
          .catch(() => {
          })
      }
    }
  }
</script>
<style layout='scss' scoped>
  .details{
    display: flex;
    flex-direction: row;
  }
  .details>div{
    flex-grow:1;
  }
</style>
