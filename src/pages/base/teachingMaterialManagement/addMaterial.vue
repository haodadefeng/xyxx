<template>
  <div class='panel'>
    <panel-title :title='$route.meta.title'>
      <router-link :to="{name: 'teachingMaterialManagement'}" tag="span">
        <el-button type="primary" size="small"><i class="el-icon-caret-left el-icon--left"></i>返回</el-button>
      </router-link>
    </panel-title>
    <div class="form-content">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" style='margin:50px;width:350px;'>
        <el-form-item label="教材编码:" prop="thmCode">
          <el-input v-model="form.thmCode" placeholder="请输入学校标识码"></el-input>
        </el-form-item>
        <el-form-item label="教材名称:" prop="thmName">
          <el-input v-model="form.thmName" placeholder="请输入学校名字"></el-input>
        </el-form-item>
        <el-form-item label="所属年级" prop="graId">
          <el-select v-model="form.graId" placeholder="办学类型" style="width:100%">
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
          graId:''
        },
        graIdList:[
          {
            label:'一年级',
            value:1
          }
        ],
        rules: {
          thmCode:[{required: true, message: '学校标识码不能为空', trigger: 'blur'}],
          thmName: [{required: true, message: '学校名不能为空', trigger: 'blur'}],
          graId: [{required: true, message: '学校英文名不能为空', trigger: 'blur'}]
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
          thmCode:this.$route.params.props.thmCode,
          thmName:this.$route.params.props.thmName,
          graId:this.$route.params.props.graId
        }
      }
      this.$route.meta.title = '编辑教材'
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
        console.log('type',this.$route.params.type);
        switch(this.$route.params.type){
          case 'add':
            this.$ajax({
              url:'/que/addTMaterial',
              method:'post',
              params:this.form
            }).then(res=>{
              if(res.data.result == 'true'){
                this.$message.success(res.data.resultDesc);
                this.$router.push({name:'teachingMaterialManagement'})
              }else{
                this.$message.success(res.data.resultDesc);
              }
            })
            break;
          case 'edit':
            this.$ajax({
              url:'/que/modifyTMaterial',
              method:'post',
              params:this.form
            }).then(res=>{
              if(res.data.result == 'true'){
                this.$message.success(res.data.resultDesc);
                this.$router.push({name:'teachingMaterialManagement'})
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
