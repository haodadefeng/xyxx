<template>
  <div class='panel'>
    <panel-title :title='$route.meta.title'>
      <router-link :to="{name: 'teachingMaterialManagement'}" tag="span">
        <el-button type="primary" size="small"><i class="el-icon-caret-left el-icon--left"></i>返回</el-button>
      </router-link>
    </panel-title>
    <div class="form-content">
      <el-form ref="form" :model="form" :rules="rules" label-width="150px" style='margin:50px;width:350px;'>
        <el-form-item label="教师名称:" prop="teaName">
          <el-input v-model="form.teaName" placeholder="请输入学校标识码"></el-input>
        </el-form-item>
        <el-form-item label="教师联系方式:" prop="teaPho">
          <el-input v-model="form.teaPho" placeholder="请输入学校名字"></el-input>
        </el-form-item>
        <el-form-item label="个人简介:" prop="indResume">
          <el-input v-model="form.indResume" placeholder="请输入学校名字"></el-input>
        </el-form-item>
        <el-form-item label="教师联系地址:" prop="teaAddress">
          <el-input v-model="form.teaAddress" placeholder="请输入学校名字"></el-input>
        </el-form-item>
        <el-form-item label="所属学校" prop="subjectId">
          <el-select v-model="form.subjectId" placeholder="办学类型" style="width:100%">
            <el-option
              v-for="item in graIdList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="on_submit_form" :loading="on_submit_loading">立即提交</el-button>
          <el-button @click="$router.back()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle} from 'components'

  export default{
    data(){
      return {
        form:{
          subjectId:''
        },
        graIdList:[
          {
            label:'一年级',
            value:1
          }
        ],
        rules: {
          teaName:[{required: true, message: '学校标识码不能为空', trigger: 'blur'}],
          teaPho: [{required: true, message: '学校名不能为空', trigger: 'blur'}],
          indResume: [{required: true, message: '学校英文名不能为空', trigger: 'blur'}],
          teaAddress: [{required: true, message: '学校英文名不能为空', trigger: 'blur'}],
          subjectId: [{required: true, message: '学校英文名不能为空', trigger: 'blur'}]
        },
        route_id: this.$route.params.id,
        load_data: false,
        on_submit_loading: false
      }
    },
    created(){
      if(!this.$route.params.hasOwnProperty('type')){
        this.$router.push({name:'schoolManagement'})
        return ;
      }
      if(this.$route.params.type == 'edit'){
        this.form = {
          uuid:this.$route.params.props.uuid,
          teaName:this.$route.params.props.teaName,
          teaPho:this.$route.params.props.teaPho,
          indResume:this.$route.params.props.indResume,
          teaAddress:this.$route.params.props.teaAddress,
          subjectId:this.$route.params.props.subjectId
        }
        this.$route.meta.title = '编辑教师'
      }
    },
    methods: {
      //提交
      on_submit_form(){
        switch(this.$route.params.type){
          case 'add':
            this.$ajax({
              url:'/tea/addTeacher',
              method:'post',
              params:this.form
            }).then(res=>{
              if(res.data.result == 'true'){
                this.$message.success(res.data.resultDesc);
                this.$router.push({name:'teacherManagement'})
              }else{
                this.$message.success(res.data.resultDesc);
              }
            })
            break;
          case 'edit':
            this.$ajax({
              url:'/tea/modifyTeacher',
              method:'post',
              params:this.form
            }).then(res=>{
              if(res.data.result == 'true'){
                this.$message.success(res.data.resultDesc);
                this.$router.push({name:'teacherManagement'})
              }else{
                this.$message.success(res.data.resultDesc);
              }
            })
            break;
        }
      }
    },
    components: {
      panelTitle
    }
  }
</script>

<style lang='scss'>

</style>
