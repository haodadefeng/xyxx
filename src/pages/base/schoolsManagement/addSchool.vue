<template>
  <div class='panel'>
    <panel-title :title='$route.meta.title'>
      <router-link :to="{name: 'schoolManagement'}" tag="span">
        <el-button type="primary" size="small"><i class="el-icon-caret-left el-icon--left"></i>返回</el-button>
      </router-link>
    </panel-title>
    <div class="form-content">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" style='margin:50px;width:350px;'>
        <el-form-item label="学校标识码:" prop="scCode">
          <el-input v-model="form.scCode" placeholder="请输入学校标识码"></el-input>
        </el-form-item>
        <el-form-item label="学校名称:" prop="scName">
          <el-input v-model="form.scName" placeholder="请输入学校名字"></el-input>
        </el-form-item>
        <el-form-item label="学校英文名:" prop="scEnName">
          <el-input v-model="form.scEnName" placeholder="请输入学校英文名"></el-input>
        </el-form-item>
        <el-form-item label="办学类型" prop="scType">
          <el-select v-model="form.scType" placeholder="办学类型" style="width:100%">
            <el-option
              v-for="item in scTypelist"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="教材版本" prop="teachmaterialId">
          <el-select v-model="form.teachmaterialId" placeholder="教材版本" style="width:100%">
            <el-option
              v-for="item in teachmaterialList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="校长姓名" prop="principalName">
          <el-input v-model="form.principalName" placeholder="请输入校长姓名" ></el-input>
        </el-form-item>
        <el-form-item label="校长电话" prop="principalMobilephone">
          <el-input v-model="form.principalMobilephone" placeholder="请输入校长电话" ></el-input>
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
          scType:'',
          teachmaterialId:''
        },
        scTypelist:[
          {
            label:'联合办学',
            value:1
          }
        ],
        teachmaterialList:[
          {
            label:'人民社出版',
            value:1
          }
        ],
        rules: {
          scCode:[{required: true, message: '学校标识码不能为空', trigger: 'blur'}],
          scName: [{required: true, message: '学校名不能为空', trigger: 'blur'}],
          scEnName: [{required: true, message: '学校英文名不能为空', trigger: 'blur'}],
          scType: [{required: true, message: '办学类型不能为空', trigger: 'blur'}],
          teachmaterialId: [{required: true, message: '教材版本不能为空', trigger: 'blur'}],
          principalName: [{required: true, message: '校长姓名不能为空', trigger: 'blur'}],
          principalMobilephone: [{required: true, message: '校长电话不能为空', trigger: 'blur'}]
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
      console.log(this.$route.params);
      if(this.$route.params.type == 'edit'){
        this.form = {
          uuid:this.$route.params.props.uuid,
          scCode:this.$route.params.props.scCode,
          scName:this.$route.params.props.scName,
          scEnName:this.$route.params.props.scEnName,
          scType:this.$route.params.props.scType,
          teachmaterialId:this.$route.params.props.teachmaterialId,
          principalName:this.$route.params.props.principalName,
          principalMobilephone:this.$route.params.props.principalMobilephone
        }
      }
      this.$route.meta.title = '编辑学校'
    },
    methods: {
      //获取数据
      get_form_data(){
        this.load_data = true
        this.$fetch.api_table.get({
          id: this.route_id
        })
          .then(({data}) => {
            this.form = data
            this.load_data = false
          })
          .catch(() => {
            this.load_data = false
          })
      },
      //时间选择改变时
      on_change_birthday(val){
        this.$set(this.form, 'birthday', val)
      },
      //提交
      on_submit_form(){
        // this.$refs.form.validate((valid) => {
        //   if (!valid) return false
        //   this.on_submit_loading = true
        //   this.$fetch.api_table.save(this.form)
        //     .then(({msg}) => {
        //       this.$message.success(msg)
        //       setTimeout(this.$router.back(), 500)
        //     })
        //     .catch(() => {
        //       this.on_submit_loading = false
        //     })
        // })
        switch(this.$route.params.type){
          case 'add':
            this.$ajax({
              url:'/school/addSchool',
              method:'post',
              params:this.form
            }).then(res=>{
              if(res.data.result == 'true'){
                this.$message.success(res.data.resultDesc);
                this.$router.push({name:'schoolManagement'})
              }else{
                this.$message.success(res.data.resultDesc);
              }
            })
            break;
          case 'edit':
            this.$ajax({
              url:'/school/modifySchool',
              method:'post',
              params:this.form
            }).then(res=>{
              if(res.data.result == 'true'){
                this.$message.success(res.data.resultDesc);
                this.$router.push({name:'schoolManagement'})
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
