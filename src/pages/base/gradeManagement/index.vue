<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body grade">
      <div class="left">
          <div class="error" v-if='!grade.length'>
            暂无数据
          </div>
          <ul v-else>
            <li v-for='(item,$index) in grade' :class='{active: checked == $index}' @click='checkGrande($index,item)'>
              <span>{{item.graName}}</span>
              <span>
                <i class="el-icon-edit" @click='eidtClass($index,item)'></i>
                <i class="el-icon-delete" @click='deleteClass($index,item)'></i>
              </span>
            </li>
          </ul>
          <el-button type='primary' class='fr' icon="plus" size='small' @click='AddClass'>添加年级</el-button>
      </div>
      <div class="right">
        <class-table v-bind:uuid='checkedUuid'></class-table>
      </div>
      <el-dialog v-bind:title="title" :visible.sync="dialogFormVisible">
        <el-form :model="form" v-if='dialogType != "del"'>
          <el-form-item label="请输入年级名" :label-width="formLabelWidth">
            <el-input v-model="form.graName" auto-complete="off" @keyup.enter.native='confirm'></el-input>
          </el-form-item>
        </el-form>
        <p v-else style='text-align:center'>确定删除此数据</p>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle} from 'components'
  import classTable from './classTable'

  export default{
    data(){
      return {
        grade:'',
        checkedUuid:'',
        form:{
          graName:''
        },
        title:'',
        checked:0,
        dialogFormVisible:false,
        dialogType:'',
        formLabelWidth:'auto'
      }
    },
    created(){
      this.getGradeList();
      // if(this.grade.length){
      //   this.checkedUuid = this.grade[0].uuid
      // }
    },
    components: {
      panelTitle,
      classTable
    },
    methods:{
      getGradeList:function(){
        this.$ajax({
          url:'/sys/queryGrade',
          method:'post',
        }).then((res)=>{
          this.grade = res.data.beans;
        })
      },
      checkGrande:function(index,item){
        this.checked = index;
        this.checkedUuid = item.uuid;
      },
      AddClass:function(){
        this.title = '添加年级';
        this.dialogType = 'add'
        this.dialogFormVisible = true;
      },
      eidtClass:function(index,item){
        this.title = '编辑年级';
        this.checked = item;
        this.form.graName = item.graName;
        this.form.uuid = item.uuid;
        this.dialogType = 'edit';
        this.dialogFormVisible = true;
      },
      deleteClass:function(index,item){
        this.title = '确认';
        this.checked = item;
        this.name = item.name;
        this.dialogType = 'del';
        this.dialogFormVisible = true;
      },
      confirm:function(index){
        this.dialogFormVisible = false;
        switch(this.dialogType){
          case 'add':
            this.$ajax({
              url:'/sys/addGrade',
              method:'post',
              params:this.form
            }).then((res)=>{
              console.log(res);
              if(res.data.result == 'true'){
                this.getGradeList();
                this.$message.success(res.data.resultDesc);
              }else{
                this.$message.error(res.data.resultDesc);
              }
            })
            break;
          case 'edit':
            this.$ajax({
              url:'/sys/modifyGrade',
              method:'post',
              params:this.form
            }).then((res)=>{
              console.log(res);
              if(res.data.result == 'true'){
                this.getGradeList();
                this.$message.success(res.data.resultDesc);
              }else{
                this.$message.error(res.data.resultDesc);
              }
            })
            break;
          case 'del':
            this.$ajax({
              url:'/sys/deleteGra',
              method:'post',
              params:{
                graId:this.checked.uuid
              }
            }).then((res)=>{
              if(res.data.result == 'true'){
                this.$message.success(res.data.resultDesc);
                this.getGradeList();
              }else{
                this.$message.error(res.data.resultDesc);
              }
            })
            break;
          defalut:
            return;
        }
      }
    }
  }
</script>
<style lang='scss' scoped>
  .grade{
    display: flex;
    flex-direction: row;
    .active{
      background: rgb(237,247,255);
    }
    .left{
      width:250px;
      margin-top:34px;
      display:inline-block;
      .error{
        border:1px solid rgb(233,240,236);
        color:#5e7382;
        height:40px;
        line-height: 40px;
        text-align: center;
        font-size:14px;
        margin-bottom:10px;
      }
      ul{
        border:1px solid #dfe6ec;
        margin-bottom:20px;
        li{
          height:36px;
          line-height: 36px;
          text-indent:1rem;
          transition: all 0.2s;
          display: flex;
          flex-direction: row;
          font-size:14px;
          span:first-child{
            flex-grow: 1
          }
          i:last-child{
            margin-right:10px;
          }
          i:hover{
            color:#20A0FF;
          }
          &:hover{
            background: rgb(228,232,241);
            cursor:pointer;
          }
        }
      }
    }
    .right{
      flex-grow: 1;
      margin-left:30px;
    }
  }
</style>
