<template>
  <div class="panel teacher">
    <panel-title :title="$route.meta.title">
      <!-- <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
      <router-link :to="{name: 'addSchool'}" tag="span">
        <el-button type="primary" icon="plus" size="small">添加教师</el-button>
      </router-link> -->
    </panel-title>
    <div class="search-input">
      <div class="searchBox">
        <el-date-picker
        v-model="date"
        type="daterange"
        placeholder="选择日期范围">
        </el-date-picker>
        <el-select v-model="value" placeholder="消费类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button  type="primary" icon="search"></el-button>
      </div>
    </div>
    <div class="panel-body">
      <div id="echarts-content"></div>
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
        length: 15,
        //请求时的loading效果
        load_data: true,
        //批量选择数组
        batch_select: [],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        date:'',
        value:'',
        options:[
          {
            key:'选项1',
            value:'消费'
          }
        ]
      }
    },
    components: {
      panelTitle,
      bottomToolBar
    },
    mounted(){
      let option = {
          title: {
              text: '堆叠区域图'
          },
          tooltip : {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross',
                  label: {
                      backgroundColor: '#6a7985'
                  }
              }
          },
          legend: {
              data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
          },
          toolbox: {
              feature: {
                  saveAsImage: {}
              }
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis : [
              {
                  type : 'category',
                  boundaryGap : false,
                  data : ['周一','周二','周三','周四','周五','周六','周日']
              }
          ],
          yAxis : [
              {
                  type : 'value'
              }
          ],
          series : [
              {
                  name:'邮件营销',
                  type:'line',
                  stack: '总量',
                  areaStyle: {normal: {}},
                  data:[120, 132, 101, 134, 90, 230, 210]
              }
          ]
      };
      let myChart = this.$echarts.init(document.getElementById('echarts-content'));
      myChart.setOption(option);
    },
    methods: {


    }
  }
</script>
<style layout='scss' scoped>
  #echarts-content{
    flex-grow:1;
    padding:0 40px 40px 40px;
  }
</style>
