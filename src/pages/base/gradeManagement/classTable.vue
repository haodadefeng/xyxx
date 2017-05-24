<template>
  <div class="table">
    <div class="toolbar">
      <span></span>
      <el-button type='primary' icon="plus" size="small" class='fr' @click='addClass' :disabled='uuid == ""'>添加班级</el-button>
    </div>
    <el-table
      :data="Datalist"
      v-loading="load_data"
      element-loading-text="拼命加载中"
      border
      class='tableStyle'>
      <el-table-column
        prop="classCode"
        label="班级编号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="className"
        label="班级名称"
        >
      </el-table-column>
      <el-table-column
        prop="classType"
        label="班级类型"
        >
      </el-table-column>
      <el-table-column
        prop="teaNiName"
        label="班主任"
        >
      </el-table-column>
      <el-table-column
        prop="stuCount"
        label="学生人数"
        width="120">
      </el-table-column>
      <el-table-column
        label="操作"
        width="240">
        <template scope="props">
          <el-button type="info" size="small" icon="edit" @click="editClass(props.row,props.$index)" class='fl'>编辑</el-button>
          <el-button type="danger" size="small" icon="delete" @click="delCLass(props.row,props.$index)" class='fl'>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-bind:title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form" v-if='dialogType != "del"'>
        <el-form-item label="班级编号" :label-width="formLabelWidth">
          <el-input v-model="form.classCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级名称" :label-width="formLabelWidth">
          <el-input v-model="form.className" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级类型" :label-width="formLabelWidth">
          <el-input v-model="form.classType" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="班主任" :label-width="formLabelWidth">
          <el-input v-model="form.teaNiName" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <p v-else style='text-align:center'>确定删除此数据</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- <bottom-tool-bar>
      <div slot="page">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </bottom-tool-bar> -->
  </div>
</template>
<script type="text/javascript">
  export default{
    props:['uuid'],
    data(){
      return {
        form:{},
        title:'',
        Datalist:[],
        load_data:false,
        dialogType:'',
        dialogFormVisible:false,
        formLabelWidth:'100px',
        checkedClassIndex:'',
        deleteIndex:''
      }
    },
    created(){
      // console.log(this.classData);
      // this.Datalist = this.classData || [];
      this.uuid = this.uuid || '';
    },
    watch:{
      'uuid':function(){
        this.getClassListByUuid(this.uuid);
      }
    },
    methods:{
      addClass:function(){
        this.dialogType = 'add';
        this.dialogFormVisible = true;
        this.title = '添加班级';
      },
      delCLass:function(item,index){
        this.deleteIndex = item.uuid;
        this.dialogType = 'del'
        this.dialogFormVisible = true;
        this.title = '删除';
      },
      editClass:function(item,index){
        console.log(item);
        this.form = {
          classCode:item.classCode,
          className:item.className,
          classType:item.classType,
          teaNiName:item.teaNiName,
          uuid:item.uuid
        };
        // this.checkedClassIndex = index;
        this.dialogType = 'edit'
        this.dialogFormVisible = true;
        this.title = '编辑';
      },
      confirm:function(){
        this.dialogFormVisible = false;
        switch(this.dialogType){
          case 'add':
            this.$ajax({
              url:'/sys/addClass',
              method:'post',
              params:Object.assign(this.form,{graId: this.uuid})
            }).then((res)=>{
              if(res.data.result == 'true'){
                this.$message.success(res.data.resultDesc);
                this.getClassListByUuid(this.uuid);
                // this.$message.success(res.data.resultDesc);
              }else{
                this.$message.success(res.data.resultDesc);
              }
            })
            break;
          case 'edit':
            this.$ajax({
              url:'/sys/modifyClass',
              method:'post',
              params:this.form
            }).then((res)=>{
              if(res.data.result == 'true'){
                this.$message.success(res.data.resultDesc);
                this.getClassListByUuid(this.uuid);
                // this.$message.success(res.data.resultDesc);
              }else{
                this.$message.success(res.data.resultDesc);
              }
            })
            break;
          case 'del':
          this.$ajax({
            url:'/sys/deleteClass',
            method:'post',
            params:{
              uuid:this.deleteIndex
            }
          }).then((res)=>{
            if(res.data.result == 'true'){
              this.$message.success(res.data.resultDesc);
              this.getClassListByUuid(this.uuid);
              // this.$message.success(res.data.resultDesc);
            }else{
              this.$message.success(res.data.resultDesc);
            }
          })
            break;
          defalut:
            return;
        }
      },
      getClassListByUuid:function(uuid){
        this.load_data = true;
        this.$ajax({
          url:'/sys/queryClass',
          method:'post',
          params:{
            graId:uuid
          }
        }).then((res)=>{
          console.log(res);
          this.load_data = false;
          if(res.data.result == 'true'){
            this.Datalist = res.data.beans;
            this.$message.success(res.data.resultDesc);
          }else{
            this.$message.error(res.data.resultDesc);
          }
        })
      }
    }
  }
</script>
<style lang='scss' scoped>
  .toolbar{
    height: 35px;
    line-height: 35px;
  }
</style>
