<template>
  <div class="table">
    <div class="toolbar">
      <span></span>
      <el-button type='primary' icon="plus" size="small" class='fr' @click='addClass' :disabled='classId == ""'>添加学生</el-button>
    </div>
    <el-table
      :data="Datalist"
      v-loading="load_data"
      element-loading-text="拼命加载中"
      border
      class='tableStyle'>
      <el-table-column
        prop="stuCode"
        label="学生编号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="stuName"
        label="学生姓名"
        >
      </el-table-column>
      <el-table-column
        prop="stuCode"
        label="性别"
        >
      </el-table-column>
      <el-table-column
        prop="mobilePhone"
        label="手机号"
        >
      </el-table-column>
      <el-table-column
        prop="father"
        label="父亲姓名"
        >
      </el-table-column>
      <el-table-column
        prop="mother"
        label="母亲姓名"
        >
      </el-table-column>
      <el-table-column
        prop="faPho"
        label="父亲联系方式"
        >
      </el-table-column>
      <el-table-column
        prop="moPho"
        label="母亲联系方式"
        >
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
        <el-form-item label="学生编号" :label-width="formLabelWidth">
          <el-input v-model="form.stuCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="学生姓名" :label-width="formLabelWidth">
          <el-input v-model="form.stuName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="住址" :label-width="formLabelWidth">
          <el-input v-model="form.stuAddress" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-input v-model="form.sex" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.mobilePhone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="父亲姓名" :label-width="formLabelWidth">
          <el-input v-model="form.father" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="母亲姓名" :label-width="formLabelWidth">
          <el-input v-model="form.mother" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="父亲联系方式" :label-width="formLabelWidth">
          <el-input v-model="form.faPho" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="母亲联系方式" :label-width="formLabelWidth">
          <el-input v-model="form.moPho" auto-complete="off"></el-input>
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
    props:['classId'],
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
      this.classId = this.classId || '';
    },
    watch:{
      classId(){
        this.getClassListByUuid(this.classId);
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
        this.form = {
          stuCode:item.stuCode,
          stuName:item.stuName,
          stuAddress:item.stuAddress,
          sex:item.sex,
          father:item.father,
          mother:item.mother,
          faPho:item.faPho,
          moPho:item.moPho,
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
              url:'/stu/addStudent',
              method:'post',
              params:Object.assign(this.form,{classId: this.classId})
            }).then((res)=>{
              if(res.data.result == 'true'){
                this.$message.success(res.data.resultDesc);
                this.getClassListByUuid(this.classId);
                // this.$message.success(res.data.resultDesc);
              }else{
                this.$message.success(res.data.resultDesc);
              }
            })
            break;
          case 'edit':
            this.$ajax({
              url:'/stu/modifyStudent ',
              method:'post',
              params:this.form
            }).then((res)=>{
              if(res.data.result == 'true'){
                this.$message.success(res.data.resultDesc);
                this.getClassListByUuid(this.classId);
                // this.$message.success(res.data.resultDesc);
              }else{
                this.$message.success(res.data.resultDesc);
              }
            })
            break;
          case 'del':
            this.$ajax({
              url:'/stu/deleteStu',
              method:'post',
              params:{
                uuid:this.deleteIndex
              }
            }).then((res)=>{
              if(res.data.result == 'true'){
                this.$message.success(res.data.resultDesc);
                this.getClassListByUuid(this.classId);
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
          url:'/stu/queryStudent',
          method:'post',
          params:{
            classId:uuid
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
